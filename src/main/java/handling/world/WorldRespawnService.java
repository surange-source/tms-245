/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.world;

import client.MapleBuffStat;
import client.MapleBuffStatValueHolder;
import client.MapleCharacter;
import client.force.MapleForceFactory;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import client.inventory.PetDataFactory;
import client.stat.DeadDebuff;
import configs.ServerConfig;
import constants.JobConstants;
import constants.skills.*;
import handling.channel.ChannelServer;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.BuffPacket;
import packet.EffectPacket;
import packet.ForcePacket;
import packet.MaplePacketCreator;
import server.MapleItemInformationProvider;
import server.Timer.WorldTimer;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleRandomPortal;
import tools.Pair;
import tools.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author admin
 */
public class WorldRespawnService {

    private static final Logger log = LogManager.getLogger();

    private WorldRespawnService() {
        log.info("正在啟動[WorldRespawnService]");
        Integer[] chs = ChannelServer.getAllInstance().toArray(new Integer[0]);
        for (int i = 1; i <= chs.length; i++) {
            WorldTimer.getInstance().register(new Respawn(i), 1000);
        }
    }

    public static WorldRespawnService getInstance() {
        return SingletonHolder.instance;
    }

    public static void handleMap(MapleMap map, int numTimes, int size, long now) {
        // 檢測地圖上面的道具消失時間
        if (map.getItemsSize() > 0) {
            map.checkMapItemExpire(now);
        }
        // 檢測地圖上面的隨機傳點消失時間
        for (MapleMapObject obj : map.getAllRandomPortalThreadsafe()) {
            MapleRandomPortal portal = (MapleRandomPortal) obj;
            if (portal.getStartTime() + portal.getDuration() <= now) {
                map.disappearMapObject(obj);
            }
        }
        // 如果地圖上面有玩家或者地圖為: 931000500 秘密地圖 - 美洲豹棲息地
        if (size > 0 || map.getId() == 931000500) {
            map.handleMapObject();
            // 該地圖是否能刷新怪物
            if (map.canSpawn(now)) {
                map.respawn(false, now);
            }
            boolean hurt = map.canHurt(now);
            for (MapleCharacter chr : map.getCharacters()) {
                handleCharacter(chr, numTimes, hurt, now);
            }

            // 對地圖裡面的怪物進行檢測
            if (map.getMobsSize() > 0) {
                for (MapleMonster mons : map.getMonsters()) {
                    if (mons.isAlive() && mons.shouldKill(now)) {
                        map.killMonster(mons);
                    }
                    if (mons.isAlive()) {
                        //檢測怪物buff，取消過期的buff
                        mons.checkEffectExpiration();

                        //刷新怪物仇恨對像
                        map.updateMonsterController(mons);
                    }
                }
            }
        }

        if (size > 0) {
            // 符文輪詛咒
            if (map.getRunesSize() > 0) {
                long runeTime = System.currentTimeMillis() - map.getRuneTime();
                if (runeTime >= 4 * 60 * 1000) {
                    if (runeTime >= 5 * 60 * 1000) {
                        if (numTimes % 10 == 0) {
                            int curseStage = (int) (runeTime / (5 * 60 * 1000));
                            curseStage = Math.min(4, Math.max(1, curseStage));
                            if (curseStage != map.getRuneCurseStage()) {
                                map.setRuneCurseStage(curseStage);
                                map.showRuneCurseStage();
                            }
                        }
                    } else if (runeTime >= (4 * 60 * 1000 + 50 * 1000)) {
                        int curseTime = 10 - (int) ((runeTime - (4 * 60 * 1000 + 50 * 1000)) / 1000);
                        map.broadcastRuneCurseMessage(MaplePacketCreator.sendRuneCurseMsg("需要解放輪來解開精英Boss的詛咒！！\\n" + curseTime + "秒後地圖上開始精英Boss的詛咒！！"));
                    } else if (runeTime <= (4 * 60 * 1000 + 2000)) {
                        map.broadcastRuneCurseMessage(MaplePacketCreator.sendRuneCurseMsg("需要解放輪來解開精英Boss的詛咒！！\\n稍後就會開始菁英Boss的詛咒！！"));
                    }
                }
            }

            // 燃燒場地更新
            if (numTimes % 60 == 0) {
                map.updateBreakTimeField();
            }

            // 防搶圖剩餘時間檢測
            if (map.getOwner() != -1 && numTimes % 60 == 0) {
                long ownerTime = System.currentTimeMillis() - map.getOwnerStartTime();
                if (ownerTime >= 30 * 60 * 1000) {
                    map.setOwner(-1);
                } else if (ownerTime >= 25 * 60 * 1000) {
                    int ownerSurplusTime = 5 - (int) ((ownerTime - (25 * 60 * 1000)) / (60 * 1000));
                    map.broadcastMessage(EffectPacket.showCombustionMessage("#fn哥德 ExtraBold##fs26#          " + ownerSurplusTime + "分鐘後解除防搶圖！！   ", 4000, -100));
                }
            }
        } else {
            if (map.getBreakTimeFieldStep() > ServerConfig.MAX_BREAKTIMEFIELD_STEP || (!map.isBreakTimeField() && map.getBreakTimeFieldStep() > 0)) {
                map.setBreakTimeFieldStep(!map.isBreakTimeField() ? 0 : ServerConfig.MAX_BREAKTIMEFIELD_STEP);
            }
        }

        // 廣播菁英BOSS位置
        if (numTimes % 30 == 0 && map.getAreaBroadcastMobId() > 0) {
            map.broadcastAreaMob(2);
        }
    }

    public static void handleCharacter(MapleCharacter chr, int numTimes, boolean hurt, long now) {
        if (chr == null) {
            return;
        }
        if (numTimes % 5 == 0) {
            DeadDebuff.getDebuff(chr, 1);
        }
        MapleStatEffect effect;
        MapleBuffStatValueHolder mbsvh;
        if (numTimes % 3 == 0 && JobConstants.is冒險家法師(chr.getJob()) && (mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.Infinity)) != null) {
            mbsvh.value++;
            chr.send(BuffPacket.giveBuff(chr, mbsvh.effect, Collections.singletonMap(MapleBuffStat.Infinity, mbsvh.effect.getSourceId())));
            chr.addHPMP(mbsvh.effect.getY(), mbsvh.effect.getY());
        }
        if (JobConstants.is火毒(chr.getJob())) {
            if (numTimes % 4 == 0) {
                if ((effect = chr.getSkillEffect(火毒.元素吸收)) != null) {
                    effect.unprimaryPassiveApplyTo(chr);
                }
            }
        } else if (JobConstants.is主教(chr.getJob())) {
            if (numTimes % 5 == 0) {
                if ((effect = chr.getSkillEffect(主教.祝福福音)) != null) {
                    effect.unprimaryPassiveApplyTo(chr);
                }
            }
            chr.checkTownPortalLeave();
        } else if (JobConstants.is神射手(chr.getJob())) {
            client.skills.handler.冒險家.神射手.sendSnipeStatSet(chr);
        } else if (JobConstants.is拳霸(chr.getJob())) {
            client.skills.handler.冒險家.拳霸.sendViperMark(chr);
        } else if (JobConstants.is夜光(chr.getJob()) && chr.isAlive()) {
            if ((effect = chr.getSkillEffect(夜光.光暗轉換)) != null && chr.getStat().getLifeTidal() != chr.getBuffedIntValue(MapleBuffStat.LifeTidal)) {
                effect.unprimaryPassiveApplyTo(chr);
            }
        } else if (JobConstants.is惡魔殺手(chr.getJob()) && chr.isAlive()) {
            if (numTimes % 4 == 0 && chr.getEffectForBuffStat(MapleBuffStat.InfinityForce) != null && chr.getSkillEffect(惡魔殺手.高貴血統) != null && chr.isSkillCooling(惡魔殺手.高貴血統)) {
                chr.reduceSkillCooldown(惡魔殺手.高貴血統, 2000);
            }
        } else if (JobConstants.is狂豹獵人(chr.getJob())) {
            if (chr.getEffectForBuffStat(MapleBuffStat.JaguarSummoned) != null && chr.getCheatTracker().canNextPantherAttackS()) {
                chr.getClient().announce(MaplePacketCreator.openPantherAttack(false));
            }
            if (chr.getSkillEffect(狂豹獵人.美洲豹連接) != null) {
                final String keyValue;
                if ((keyValue = chr.getKeyValue("JaguarCount")) != null) {
                    final int min = Math.min(6, Integer.valueOf(keyValue));
                    if (min != chr.getBuffedIntValue(MapleBuffStat.JaguarCount)) {
                        chr.getSkillEffect(狂豹獵人.美洲豹連接).unprimaryPassiveApplyTo(chr);
                    }
                }
            }
        } else if (JobConstants.is爆拳槍神(chr.getJob())) {
            if ((effect = chr.getEffectForBuffStat(MapleBuffStat.RWBarrier)) != null) {
                effect.unprimaryPassiveApplyTo(chr);
            }
        } else if (JobConstants.is凱內西斯(chr.getJob())) {
            if (chr.getEffectForBuffStat(MapleBuffStat.KinesisPsychicOver) != null) {
                chr.handlePPCount(2);
            }
        } else if (JobConstants.is伊利恩(chr.getJob()) && chr.getEffectForBuffStat(MapleBuffStat.榮耀之翼) != null) {
            final List<MapleMapObject> mapObjectsInRange = chr.getMap().getMapObjectsInRange(chr.getPosition(), 742, Collections.singletonList(MapleMapObjectType.MONSTER));
            final List<Integer> moboids = mapObjectsInRange.stream().map(MapleMapObject::getObjectId).collect(Collectors.toList());
            if ((effect = chr.getSkillEffect(伊利恩.榮耀之翼_強化暗器_2)) != null) {
                chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(MapleForceFactory.getInstance().getMapleForce(chr, effect, 0, moboids, chr.getPosition())), true);
            }
        } else if (JobConstants.is亞克(chr.getJob())) {
            if (chr.getJob() >= 15510 && !chr.isSkillCooling(亞克.精神力枯竭) && chr.getBuffedValue(MapleBuffStat.侵蝕控制) == null) {
                chr.addErosions(8);
            }
        } else if (JobConstants.is煉獄巫師(chr.getJob())) {
            if ((effect = chr.getEffectForBuffStat(MapleBuffStat.BMageAura)) != null) {
                effect.applyToParty(chr.getMap(), chr);
            }
        } else if (JobConstants.is神之子(chr.getJob())) {
            if ((effect = chr.getEffectForBuffStat(MapleBuffStat.ZeroAuraStr)) != null) {
                effect.applyToParty(chr.getMap(), chr);
            }
            if ((effect = chr.getEffectForBuffStat(MapleBuffStat.ZeroAuraSpd)) != null) {
                effect.applyToParty(chr.getMap(), chr);
            }
        } else if (JobConstants.is卡蒂娜(chr.getJob())) {
            mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.武器變換終章);
            if (mbsvh != null && mbsvh.effect != null && mbsvh.value < 3 && (effect = chr.getSkillEffect(mbsvh.effect.getSourceId())) != null && System.currentTimeMillis() - mbsvh.startTime >= (effect.getX() * 1000)) {
                mbsvh.value = Math.min(3, mbsvh.value + 1);
                mbsvh.startTime = System.currentTimeMillis();
                chr.send(BuffPacket.giveBuff(chr, effect, Collections.singletonMap(MapleBuffStat.武器變換終章, effect.getSourceId())));
            }
        }

        if (numTimes % 4 == 0) {
            client.skills.handler.冒險家.冰雷大魔導士.handleIceReiki(chr);
        }
        client.skills.handler.冒險家.主教.handlePassive(chr, numTimes);

        if (chr.getBuffedValue(MapleBuffStat.FinalCut) != null && chr.getCheatTracker().canNext絕殺刃()) {
            chr.getCheatTracker().setNext絕殺刃(0L);
            if ((effect = chr.getSkillEffect(影武者.絕殺刃)) != null) {
                effect.applyBuffEffect(chr, chr, effect.getBuffDuration(chr), false, false, true, chr.getPosition());
            }
        }
        if (chr.getBuffedValue(MapleBuffStat.GuidedBullet) != null && chr.getMap().getMobObject(chr.getLinkMobObjectID()) == null) {
            chr.setLinkMobObjectID(0);
            chr.dispelEffect(MapleBuffStat.GuidedBullet);
        }
        if (chr.getBuffedValue(MapleBuffStat.AdeleCurse) != null && chr.getMap().getMobObject(chr.getLinkMobObjectID()) == null) {
            chr.setLinkMobObjectID(0);
            chr.dispelEffect(MapleBuffStat.AdeleCurse);
        }
        if (chr.getBuffedValue(MapleBuffStat.致命暗殺_殺數點數) != null && chr.getMap().getMobObject(chr.getBuffedIntZ(MapleBuffStat.致命暗殺_殺數點數)) == null) {
            chr.dispelEffect(MapleBuffStat.致命暗殺_殺數點數);
        }
        if (chr.getStat().mpcon_eachSecond != 0 && chr.getStat().getMp() <= 0) {
            if (chr.getBuffedValue(MapleBuffStat.BMageAura) != null) {
                chr.dispelEffect(MapleBuffStat.BMageAura);
            } else if (chr.getBuffedValue(MapleBuffStat.IceAura) != null) {
                chr.dispelEffect(MapleBuffStat.IceAura);
            } else if (chr.getBuffedValue(MapleBuffStat.FireAura) != null) {
                chr.dispelEffect(MapleBuffStat.FireAura);
            }
        }
        if (hurt && chr.isAlive() && chr.getInventory(MapleInventoryType.EQUIPPED).findById(chr.getMap().getProtectItem()) == null) {
            Integer value = chr.getBuffedValue(MapleBuffStat.Thaw);
            final int n3 = value == null ? 0 : value;
            if (chr.getMap().getDecHP() > 0) {
                chr.addHPMP(-Math.max(0, chr.getMap().getDecHP() - n3), 0, false, false);
            }
            if (chr.getMap().getDecHPr() > 0) {
                chr.addHPMP(-chr.getMap().getDecHPr(), 0);
            }
        }
        // 如果角色沒有死亡
        if (chr.isAlive()) {

//            if (chr.canHPRecover(now)) {
//                chr.addHP((int) chr.getStat().getHealHP());
//            }
//            if (chr.canMPRecover(now)) {
//                chr.addMP((int) chr.getStat().getHealMP());
//                if (chr.getJob() == 3111 || chr.getJob() == 3112) {
//                    chr.addDemonMp((int) chr.getStat().getHealMP());
//                }
//            }
            chr.doHealPerTime();
            if (chr.getLevel() >= 200) {
                chr.check5thJobQuest();
            }
            //處理林之靈組隊被動BUFF
            if (chr.canPartyPassiveBuff(now)) {
                chr.doPartyPassiveBuff();
            }
            if (chr.canFairy(now)) {
                chr.doFairy();
            }
            if (chr.canFish(now)) {
                chr.doFish(now);
            }
            if (chr.canExpiration(now)) {
                chr.expirationTask(false);
            }
            if (numTimes % 5 == 0) {
                chr.checkFairy();
                if (chr.getBuffStatValueHolder(80011248) != null) {
                    chr.addHPMP(-5, 0);
                }
                MapleStatEffect eff = chr.getSkillEffect(菈菈.龍脈的迴響_效果強化);
                if (eff != null && chr.getBuffStatValueHolder(菈菈.龍脈的迴響) != null) {
                    chr.addHPMP(eff.getW(), 0);
                }
            }
            if (numTimes % 2 == 0) {
                if (chr.getBuffStatValueHolder(80001756) != null) {
                    List<MapleMapObject> objs = chr.getMap().getMonstersInRange(chr.getPosition(), 196);
                    if (objs != null && objs.size() > 0) {
                        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                        mplew.writeShort(SendPacketOpcode.LP_UserRandAreaAttackRequest.getValue());
                        mplew.writeInt(80001762);
                        mplew.writeInt(1); // Count
                        mplew.writePosInt(objs.get(0).getPosition());
                        mplew.writeInt(objs.get(0).getObjectId());
                        chr.send(mplew.getPacket());
                    }
                }
            }
        }
        if (numTimes % 2 == 0 && chr.getInnerStormValue() > 0) {
            chr.checkInnerStormValue();
        }

        if (chr.getBuffedValue(MapleBuffStat.ChangeFoxMan) == null) {
            if (chr.getBuffStatValueHolder(MapleBuffStat.BlessEnsenble, 陰陽師.幽玄氣息) != null) {
                chr.dispelBuff(陰陽師.幽玄氣息);
            }
            if (chr.getBuffStatValueHolder(MapleBuffStat.BlessEnsenble, 陰陽師.幽玄氣息2) != null) {
                chr.dispelBuff(陰陽師.幽玄氣息2);
            }
        }

        mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.HAKU_BLESS);
        if (mbsvh != null) {
            boolean dispel;
            if (chr.getId() == mbsvh.fromChrID) {
                dispel = chr.getBuffedValue(MapleBuffStat.ChangeFoxMan) == null;
            } else {
                MapleCharacter fromChr;
                dispel = chr.getParty() == null || chr.getParty().getMemberById(mbsvh.fromChrID) == null || (fromChr = chr.getMap().getPlayerObject(mbsvh.fromChrID)) == null || fromChr.getBuffedValue(MapleBuffStat.ChangeFoxMan) == null;
            }

            if (dispel) {
                chr.dispelEffect(MapleBuffStat.HAKU_BLESS);
            }
        }

        /*
         * 對角色坐騎進行檢測
         */
        if (numTimes % 7 == 0 && chr.getMount() != null && chr.getMount().canTire(now)) {
            chr.getMount().increaseFatigue();
        }
        if (ServerConfig.JMS_SOULWEAPON_SYSTEM && numTimes % 10 == 0 && chr.checkSoulWeapon()) {
            if (now - 600000 >= chr.getLastFullSoulMP() && chr.getSoulMP() > 0) {
                chr.addSoulMP(-Randomizer.rand(10, 11));
            }
        }
        if (numTimes % 60 == 0) { //we're parsing through the characters anyway (:
            for (MaplePet pet : chr.getSummonedPets()) {
                if (MapleItemInformationProvider.getInstance().getLimitedLife(pet.getPetItemId()) > 0) {
                    pet.setSecondsLeft(Math.max(pet.getSecondsLeft() - 60, 0));
                    if (pet.getSecondsLeft() == 0) {
                        chr.unequipSpawnPet(pet, true, (byte) 2);
                        return;
                    }
                }
                int newFullness = pet.getFullness() - PetDataFactory.getHunger(pet.getPetItemId());
                if (newFullness <= 5) {
                    pet.setFullness(15);
                    chr.unequipSpawnPet(pet, true, (byte) 1);
                } else {
                    pet.setFullness(newFullness);
                    chr.petUpdateStats(pet, true);
                }
            }
        }
    }

    private static class Respawn implements Runnable {

        private final ChannelServer cserv;
        private int numTimes = 0;

        public Respawn(int ch) {
            String sb = "[Respawn Worker] Registered for channel " + ch;
            cserv = ChannelServer.getInstance(ch);
            log.info(sb);
        }

        @Override
        public void run() {
            numTimes++;
            long now = System.currentTimeMillis();
            if (!cserv.hasFinishedShutdown()) {
                for (MapleMap map : cserv.getMapFactory().getAllLoadedMaps()) { //iterating through each map o_x
                    try {
                        handleMap(map, numTimes, map.getCharactersSize(), now);
                    } catch (Exception e) {
                        log.error("[WorldRespawnService] Exception occurred in method handleMap.", e);
                    }
                }
            }
        }
    }

    private static class SingletonHolder {

        protected static final WorldRespawnService instance = new WorldRespawnService();
    }
}
