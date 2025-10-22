package handling.channel.handler;

import auth.Auth;
import client.*;
import client.anticheat.CheatingOffense;
import client.force.MapleForceAtom;
import client.force.MapleForceFactory;
import client.inventory.*;
import client.skills.*;
import client.stat.DeadDebuff;
import client.stat.PlayerStats;
import configs.ServerConfig;
import constants.*;
import constants.enums.*;
import constants.skills.*;
import database.mapper.LobbyRankMapper;
import database.tools.SqlTool;
import handling.channel.ChannelServer;
import handling.opcode.EffectOpcode;
import handling.opcode.RecvPacketOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.*;
import packet.familiar.InnerGlareSkillsPacket;
import scripting.npc.NPCScriptManager;
import server.*;
import server.buffs.MapleStatEffect;
import server.collection.SoulCollectionEntry;
import server.events.DimensionMirrorEvent;
import server.events.MapleLobbyRank;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.*;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.shop.MapleShop;
import server.shop.MapleShopFactory;
import server.unknown.B2BodyAttackInfo;
import tools.*;
import tools.types.*;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.*;

public class PlayerHandler {

    private static final Logger log = LogManager.getLogger(PlayerHandler.class);

    public static void ChangeSkillMacro(MaplePacketReader slea, MapleCharacter chr) {
        int num = slea.readByte();
        String name;
        int shout, skill1, skill2, skill3;
        SkillMacro macro;

        for (int i = 0; i < num; i++) {
            name = slea.readMapleAsciiString();
            shout = slea.readByte();
            skill1 = slea.readInt();
            skill2 = slea.readInt();
            skill3 = slea.readInt();
            macro = new SkillMacro(skill1, skill2, skill3, name, shout, i);
            chr.updateMacros(i, macro);
        }
    }

    public static void ChangeKeymap(MaplePacketReader slea, MapleCharacter chr) {
        if (slea.available() > 8 && chr != null) { // else = pet auto pot
            slea.skip(4); //0
            int slot = slea.readInt();
            int numChanges = slea.readInt();
            for (int i = 0; i < numChanges; i++) {
                int key = slea.readInt();
                byte type = slea.readByte();
                int action = slea.readInt();
                if (type == 1 && action >= 1000) { //0 = normal key, 1 = skill, 2 = item
                    Skill skil = SkillFactory.getSkill(action);
                    if (skil != null) { //not sure about aran tutorial skills..lol
                        if (!skil.isFourthJob() && !skil.isBeginnerSkill() && !(skil.getId() == 80011261) && skil.isInvisible() && chr.getSkillLevel(skil) <= 0 || SkillConstants.isLinkedAttackSkill(action)) { //cannot put on a key
                            continue;
                        }
                    }
                }
                chr.changeKeybinding(slot, key, type, action);
            }
        } else if (chr != null) {
            int type = slea.readInt(), data = slea.readInt();
            switch (type) {
                case 1: //自動加HP設置
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.HP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.HP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 2: //自動加MP設置
                    if (data <= 0) {
                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.MP_ITEM));
                    } else {
                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.MP_ITEM)).setCustomData(String.valueOf(data));
                    }
                    break;
                case 3: // 鍵盤欄位
                    if (data >= 0 && data < 3) {
                        chr.updateOneInfo(GameConstants.KEYSET_SLOT, "no", String.valueOf(data));
                    }
                    //自動加BUFF狀態設置
//                    if (data <= 0) {
//                        chr.getQuestRemove(MapleQuest.getInstance(GameConstants.BUFF_SKILL));
//                    } else {
//                        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.BUFF_SKILL)).setCustomData(String.valueOf(data));
//                    }
                    break;
                case 4:
//                    chr.send(MaplePacketCreator.sendTestPacket("32 00 00 02 00 03 05 0B 00 00 05 0B 00 02 B0 CD 4F 00 01 AF 52 94 01 00 00 00 00 00 80 05 BB 46 E6 17 02 FF FF FF FF 01 00 00 00 00 00 00 00"));
                    break;
            }
        }
    }

    public static void UseChair(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        int itemId = slea.readInt();
        short slot = (short) slea.readInt();
        if (itemId > 0 && slot <= -1) {
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserSetActivePortableChair(chr), chr.getPosition());
            c.sendEnableActions();
            return;
        }
        Item item = chr.getInventory(MapleInventoryType.SETUP).getItem(slot);
        if (item == null || item.getItemId() != itemId || itemId / 10000 != 301) {
            c.sendEnableActions();
            return;
        }
        Map<Integer, Map<Integer, SpecialChairTW>> var20 = chr.getMap().getSpecialChairTWs();
        SpecialChairTW var6 = null;
        if (var20 != null) {
            OUTER:
            for (Map<Integer, SpecialChairTW> it : var20.values()) {
                for (SpecialChairTW specialChairTW : it.values()) {
                    if (specialChairTW.vs().contains(chr.getPosition())) {
                        var6 = specialChairTW;
                        break OUTER;
                    }
                }
            }
        }

        PortableChair chair = new PortableChair(itemId);
        if (var6 != null) {
            chr.setSpecialChairTW(var6);
            chr.setChair(chair);
            if (!var6.lj() && var6.getItemId() == itemId) {
                chr.getMap().specialChair$C(var6.getItemId(), var6.V(), chr.getId());
            } else {
                chr.getMap().specialChair$D(var6.getItemId(), var6.V(), chr.getId());
            }
        } else {
            boolean var22 = slea.readBool();
            int var26 = slea.readInt();
            int var29 = slea.readInt();
            String msg = "";
            ChairType type = ItemConstants.getChairType(itemId);
            switch (type) {
                case MESO:
                    long var10 = slea.readLong();
                    break;
                case TEXT:
                    msg = slea.readMapleAsciiString();
                    break;
                case LV:
                    if (slea.readBool()) {
                        chair.setUn2(slea.readInt());
                        int arrSize = slea.readInt();
                        if (arrSize > 0) {
                            Triple[] var35 = new Triple[arrSize];
                            for (int i = 0; i < arrSize; i++) {
                                int var14 = slea.readInt();
                                int var15 = slea.readInt();
                                String var34 = slea.readMapleAsciiString();
                                AvatarLook avatarLook = null;
                                AvatarLook avatarLook2 = null;
                                if (slea.readBool()) {
                                    avatarLook = AvatarLook.decode(slea);
                                }
                                if (slea.readBool()) {
                                    avatarLook2 = AvatarLook.decode(slea);
                                }
                                Triple var37 = new Triple(var14, var34, new Pair<>(avatarLook, avatarLook2));
                                var35[i] = var37;
                            }
                            chair.setArr(var35);
                        }
                        slea.readInt();
                    }
                    break;
                case HASH_TAG:
                case TRAITS:
                    c.sendEnableActions();
                    c.announce(MaplePacketCreator.PortableChairUseResult(0, 0));
                    return;
                case NORMAL:
                case TOWER:
                default:
                    chair.setMeso(slea.readInt());
                    chair.setUn4(slea.readInt());
                    chair.setUn5(slea.readByte());
                    break;
            }
            if (itemId / 10000 == 302) {
                slea.readLong();
            }
//            chair.setUn3(slea.readInt());
//            chair.setType(slea.readInt());
//            chair.setUnk(slea.readByte());
            chair.setMsg(msg);
            chr.setChair(chair);
        }
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserSetActivePortableChair(chr), chr.getPosition());
        c.sendEnableActions();
        c.announce(MaplePacketCreator.PortableChairUseResult(0, 0));
    }

    public static void CancelChair(short id, MapleClient c, MapleCharacter chr) {
        if (id == -1 && chr != null) { // Cancel Chair
            chr.cancelFishingTask();
            chr.setChair(null);
            c.announce(MaplePacketCreator.UserSitResult(chr.getId(), -1));
            if (chr.getMap() != null) {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserSetActivePortableChair(chr), false);
            }
        } else { // Use In-Map Chair
            if (chr != null) {
                chr.setChair(new PortableChair(id));
            }
            c.announce(MaplePacketCreator.UserSitResult(id, -1));
        }
    }

    /*
     * 使用縮地石
     */
    public static void TrockAddMap(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        byte type = slea.readByte();
        byte vip = slea.readByte(); //普通的是1 高級的是2 專屬的是3
        if (type == 0x00) {
            int mapId = slea.readInt();
            if (vip == 0x01) {
                chr.deleteFromRegRocks(mapId);
            } else if (vip == 0x02) {
                chr.deleteFromRocks(mapId);
            } else if (vip == 0x03) {
                chr.deleteFromHyperRocks(mapId);
            }
            c.announce(MTSCSPacket.getTrockRefresh(chr, vip, true));
        } else if (type == 0x01) {
            if (!FieldLimitType.TELEPORTITEMLIMIT.check(chr.getMap().getFieldLimit())) {
                if (vip == 0x01) {
                    chr.addRegRockMap();
                } else if (vip == 0x02) {
                    chr.addRockMap();
                } else if (vip == 0x03) {
                    chr.addHyperRockMap();
                }
                c.announce(MTSCSPacket.getTrockRefresh(chr, vip, false));
            } else {
                chr.dropMessage(1, "你可能沒有保存此地圖.");
            }
        }
    }

    public static void CharInfoRequest(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        slea.readInt();
        int objectId = slea.readInt();
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MapleCharacter player;
        if (objectId == 0) {
            player = chr.getMap().getPlayerObject(chr.getId());
        } else {
            player = chr.getMap().getPlayerObject(objectId);
        }
        c.sendEnableActions();
        if (player != null) {
            if (!player.isGm() || chr.isGm()) {
                c.announce(MaplePacketCreator.showCharacterInfo(player, chr.getId() == objectId));
            }
        }
    }

    public static void AranCombo(MapleClient c, MapleCharacter chr, int toAdd) {
        if (chr != null && JobConstants.is狂狼勇士(chr.getJob())) {

            if (toAdd > 0) {
                int combo = chr.getAranCombo() + toAdd;
                if (combo >= 1000) {
                    chr.setAranCombo(500, true);
                    int skilllevel = chr.getSkillLevel(狂狼勇士.鬥氣爆發);
                    if (skilllevel > 0) {
                        SkillFactory.getSkill(狂狼勇士.鬥氣爆發).getEffect(skilllevel).applyTo(chr);
                    }
                } else {
                    chr.setAranCombo(combo, true);
                }
            } else {
                chr.gainAranCombo(toAdd, true);
            }
        }
    }

    /*
     * 使用物品效果
     */
    public static void UseItemEffect(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int itemId = slea.readInt();
        int itemType = slea.available() >= 4 ? slea.readInt() : 0;
        if (itemId == 0) {
            chr.setItemEffect(0);
            chr.setItemEffectType(0);
        } else {
            Item toUse = chr.getInventory(MapleInventoryType.CASH).findById(itemId); //現金欄道具
            if (toUse == null || toUse.getItemId() != itemId || toUse.getQuantity() < 1) {
                c.sendEnableActions();
                return;
            }
            if (itemId != 5510000) { //原地復活術
                chr.setItemEffect(itemId);
                chr.setItemEffectType(itemType);
            }
        }
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.itemEffect(chr.getId(), itemId, itemType), false);
    }

    /*
     * 使用稱號物品效果
     */
    public static void UseTitleEffect(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || chr.hasBlockedInventory()) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int itemId = slea.readInt();
        int slot = slea.readInt();
        if (itemId == 0) {
//            chr.setTitleEffect(0);
            chr.updateOneQuestInfo(19019, "id", "0");
            chr.updateOneQuestInfo(19019, "date", "0");
            chr.updateOneQuestInfo(19019, "expired", "1");
            chr.getQuestRemove(MapleQuest.getInstance(124000));
        } else {
            Item toUse = chr.getInventory(MapleInventoryType.SETUP).getItem((short) slot); //裝飾欄道具
            final String questInfo = chr.getQuestInfo(19019, "id");
            if (toUse != null && toUse.getItemId() == itemId && !String.valueOf(itemId).equals(questInfo) && itemId / 10000 == 370) {
                chr.updateOneQuestInfo(19019, "id", String.valueOf(itemId));
                if (toUse.getExpiration() >= 0) {
                    chr.updateOneQuestInfo(19019, "expired", "1");
                    chr.updateOneQuestInfo(19019, "date", DateUtil.getFormatDate(new Date(toUse.getExpiration())).replace("-", "/") + " 00:00:00:000");
                } else {
                    chr.updateOneQuestInfo(19019, "expired", "0");
                    chr.updateOneQuestInfo(19019, "date", "2079/01/01 00:00:00:000");
                }
            } else {
                chr.updateOneQuestInfo(19019, "id", "0");
                chr.updateOneQuestInfo(19019, "date", "0");
                chr.updateOneQuestInfo(19019, "expired", "1");
                c.sendEnableActions();
                return;
            }
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.NickSkillExpired);
        mplew.writeInt(0);//V.160 new
        c.announce(mplew.getPacket());
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.showTitleEffect(chr.getId(), itemId), false);
    }

    public static void CancelItemEffect(int id, MapleCharacter chr) {
        if (-id == Reborn.REBORN_BUFF_ITEM) {
            return;
        }
        chr.cancelEffect(MapleItemInformationProvider.getInstance().getItemEffect(-id), false, -1);
    }

    public static void SpecialSkillUse(MaplePacketReader slea, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int skillid = slea.readInt();
        int mode = slea.readByte();
        MapleStatEffect effect = chr.getSkillEffect(skillid);
        if (effect == null) {
            return;
        }
        Skill skill = SkillFactory.getSkill(skillid);
        if (skill != null && skill.isChargeSkill()) {
            chr.setKeyDownSkill_Time(0);
            if (effect.getCooldown() > 0) {
                if (SkillConstants.isKeydownSkillCancelGiveCD(skillid) && !chr.isSkillCooling(skillid)) {
                    chr.registerSkillCooldown(chr.getSkillEffect(skillid), true);
                }
                if (!chr.isSkillCooling(skillid)) {
                    chr.send(MaplePacketCreator.skillCooltimeSet(skillid, 0));
                }
            }
        }
        switch (skillid) {
            case 重砲指揮官.ICBM:
                chr.dispelEffect(重砲指揮官.ICBM);
                break;
            case 亞克.根源的記憶:
            case 亞克.永無止盡的痛苦:
            case 卡蒂娜.鏈之藝術_鎖鏈風暴:
                break;
            default:
                if (SkillConstants.getKeydownSkillCancelReduceTime(skillid, 30000) <= 0) {
                    if (chr.isDebug()) {
                        chr.dropDebugMessage(1, "[Special Skill Use] SkillID:" + skillid + ", SkillName:" + SkillFactory.getSkillName(skillid) + ", mode:" + mode);
                    }
                    effect.applyTo(chr);
                }
                break;
        }
        if (skillid == 凱殷.暗地狙擊) {
            effect = chr.getSkillEffect(skillid);
            if (effect != null) {
                int maxValue = effect.getW();
                int timeout = effect.getU() * 1000;
                Pair<Integer, Long> skillInfo = (Pair<Integer, Long>) chr.getTempValues().get("MultiSkill" + skillid);
                if (skillInfo != null) {
                    skillInfo.left -= 1;
                    if (skillInfo.left < 0) {
                        skillInfo.left = 0;
                    }
                    skillInfo.right = System.currentTimeMillis();
                    chr.getTempValues().put("MultiSkill" + skillid, skillInfo);
                    chr.send(MaplePacketCreator.multiSkillInfo(skillid, skillInfo.left, maxValue, timeout));
                }
            }
        }
    }

    public static void CancelBuffHandler(int sourceid, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        Skill skill = SkillFactory.getSkill(sourceid);
        //如果技能為空就返回不做操作
        if (skill == null) {
            return;
        }
        int totalSkillLevel = chr.getTotalSkillLevel(skill);
        MapleStatEffect effect = skill.getEffect(totalSkillLevel > 0 ? totalSkillLevel : 1);
        if (effect == null) {
            return;
        }
        if (chr.isDebug()) {
            chr.dropDebugMessage(1, "[BUFF信息] 客戶端取消技能BUFF 技能ID:" + sourceid + " 技能名字:" + SkillFactory.getSkillName(sourceid));
        }
        if (skill.isChargeSkill()) {
            chr.setKeyDownSkill_Time(0);
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.skillCancel(chr, sourceid), false);
            MapleStatEffect eff = chr.getSkillEffect(sourceid);
            if (eff != null && eff.getCooldown() > 0) {
                if (SkillConstants.isKeydownSkillCancelGiveCD(sourceid) && !chr.isSkillCooling(sourceid)) {
                    chr.registerSkillCooldown(chr.getSkillEffect(sourceid), true);
                }
                if (!chr.isSkillCooling(sourceid)) {
                    chr.send(MaplePacketCreator.skillCooltimeSet(sourceid, 0));
                }
            }
        } else {
            chr.getClient().announce(MaplePacketCreator.skillCancel(chr, sourceid));
        }
        if (sourceid == 主教.神之懲罰) {
            return;
        } else if (sourceid == 幻影俠盜.幻影斗蓬) {
            chr.registerSkillCooldown(effect, true);
        }
        MapleBuffStatValueHolder mbsvh = chr.getBuffStatValueHolder(sourceid);
        if (mbsvh != null) {
            switch (sourceid) {
                case 聖騎士.神域護佑:
                    chr.reduceSkillCooldown(sourceid, (mbsvh.getLeftTime() / effect.getY()) * effect.getX());
                    break;
                case 黑騎士.黑暗靈氣:
                    if (mbsvh.getLeftTime() > 0) {
                        ExtraSkill eskill = new ExtraSkill(黑騎士.黑暗靈氣_1, chr.getPosition());
                        MapleBuffStatValueHolder m = chr.getBuffStatValueHolder(MapleBuffStat.黑暗靈氣);
                        if (m == null) {
                            eskill.Value = 1;
                        } else {
                            eskill.Value = Math.max(1, m.z / 3);
                        }
                        chr.send(MaplePacketCreator.RegisterExtraSkill(sourceid, Collections.singletonList(eskill)));
                    }
                    break;
            }
        }
        int reduceTime = SkillConstants.getKeydownSkillCancelReduceTime(mbsvh);
        if (reduceTime > 0) {
            chr.reduceSkillCooldown(sourceid, reduceTime);
        }
        if (effect.getStatups() != null) {
            chr.cancelEffect(skill.getEffect(1), false, -1);
        }
        for (MapleBuffStat stat : effect.getStatups().keySet()) {
            if (!stat.canStack()) {
                chr.dispelEffect(stat);
            }
        }
        if (sourceid == 夜光.黑暗之眼) {
            chr.send(BuffPacket.temporaryStatReset(Collections.singletonList(MapleBuffStat.KeyDownAreaMoving), chr));
            chr.send_other(BuffPacket.cancelForeignBuff(chr, Collections.singletonList(MapleBuffStat.KeyDownAreaMoving)), false);
        }
        if (sourceid == 幻影俠盜.命運鬼牌) {
            int[] arrn = {幻影俠盜.鬼牌_2, 幻影俠盜.鬼牌_3, 幻影俠盜.鬼牌_4, 幻影俠盜.鬼牌_5, 幻影俠盜.鬼牌_6};
            chr.getSkillEffect(arrn[Randomizer.nextInt(arrn.length)]).applyTo(chr, chr.getPosition());
        }
        if (sourceid == 傑諾.超載模式) {
            if (chr.getBuffedIntValue(MapleBuffStat.SurplusSupply) > 20) {
                chr.getSkillEffect(傑諾.蓄能系統).unprimaryPassiveApplyTo(chr);
            }
        }
        if (sourceid == 菈菈.山環抱) {
            MapleStatEffect eff = chr.getSkillEffect(菈菈.山環抱_額外護盾);
            if (eff != null) {
                mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.IndieShield, eff.getSourceId());
                if (mbsvh != null) {
                    int shield = mbsvh.value;
                    eff.applyTo(chr, eff.getDuration());
                    mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.IndieShield, eff.getSourceId());
                    if (mbsvh != null) {
                        mbsvh.value = shield;
                        chr.send(BuffPacket.giveBuff(chr, mbsvh.effect, Collections.singletonMap(MapleBuffStat.IndieShield, mbsvh.effect.getSourceId())));
                    }
                }
            }
        }
    }

    public static void CancelMech(MaplePacketReader slea, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        int sourceid = slea.readInt();
        if (sourceid % 10000 < 1000 && SkillFactory.getSkill(sourceid) == null) {
            sourceid += 1000;
        }
        Skill skill = SkillFactory.getSkill(sourceid);
        if (skill == null) { //not sure
            return;
        }
        if (sourceid == 煉獄巫師.黑暗閃電) {
            return;
        }
        if (skill.isChargeSkill()) {
            chr.setKeyDownSkill_Time(0);
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.skillCancel(chr, sourceid), false);
        } else {
            MapleStatEffect effect = skill.getEffect(chr.getSkillLevel(skill));
            if (effect == null) {
                return;
            }
            chr.cancelEffect(effect, false, -1);
        }
    }

    public static void QuickSlot(MaplePacketReader slea, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        chr.getQuickSlot().resetQuickSlot();
        for (int i = 0; i < 32; i++) {
            chr.getQuickSlot().addQuickSlot(i, slea.readInt());
        }
    }

    public static void UserSkillPrepareRequest(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int skillId = slea.readInt(); //技能ID
        byte level = slea.readByte(); //技能等級
        byte display = slea.readByte(); //技能效果
        if (skillId == 烈焰巫師.無盡之炎燄) {
            slea.readInt();
        }
        byte direction = slea.readByte(); //攻擊方向
        byte speed = slea.readByte(); //速度
        slea.readByte();
        Point position = null; //技能坐標
        if (slea.available() >= 4L) {
            position = slea.readPos();
        }
        Skill skill = SkillFactory.getSkill(skillId);
        if (skill == null) {
            return;
        }
        MapleStatEffect effect = skill.getEffect(chr.getSkillLevel(SkillConstants.getLinkedAttackSkill(skillId)));
        if (effect == null) {
            return;
        }
        if (chr.isDebug()) {
            chr.dropMessage(5, "[Skill Use] Prepare Effect:" + effect.toString());
        }
        if (skillId == 虎影.仙技_降臨怪力亂神_1) {
            chr.dispelEffect(effect.getSourceId());
            return;
        }
        if (skillId == 墨玄.神功_破空拳 || skillId == 墨玄.神功_無影腳) {
            int godPower = 0;
            int time = 30000;
            if (chr.getSkillLevel(墨玄.入神) > 0) {
                godPower = (int) chr.getTempValues().getOrDefault("GodPower", 0);
                godPower = Math.min(5, ++godPower);
                chr.getTempValues().put("GodPower", godPower);
                if (chr.getSkillLevel(墨玄.入神_時間持續) > 0) {
                    time += 10000;
                }
            }
            c.announce(MaplePacketCreator.encodeMoxuanPower(1, godPower, time, 0, null));
            c.announce(MaplePacketCreator.encodeMoxuanPower(0, 0, 3000, 1, null));
        }
        if (skill.isChargeSkill()) {
            switch (skillId) {
                case 虎影.仙技_夢遊桃源:
                case 幻影俠盜.命運鬼牌:
                case 暗影神偷.音速狂襲:
                case 機甲戰神.合金盔甲_火力全開:
                case 亞克.根源的記憶: {
                    effect.applyTo(chr);
                    break;
                }
                case 亞克.暗中蠕動的恐懼:
                case 亞克.永無止盡的痛苦: {
                    final MapleStatEffect skillEffect = chr.getSkillEffect(亞克.幽靈侵蝕);
                    if ((skillEffect) != null) {
                        skillEffect.applyTo(chr);
                    }
                    effect.applyTo(chr, true);
                    break;
                }
                case 神射手.能量弩矢:
                case 主教.神之懲罰:
                    break;
                default: {
                    effect.applyTo(chr, true);
                    break;
                }
            }
        } else if (skillId == 卡蒂娜.鏈之藝術_追擊_向上發射 || skillId == 卡蒂娜.鏈之藝術_追擊_向下發射) {
            chr.registerSkillCooldown(chr.getSkillEffect(卡蒂娜.鏈之藝術_追擊), true);
        } else if (effect.getCooldown(chr) > 0 && skillId != 暗夜行者.闇黑天魔 && skillId != 神射手.能量弩矢) {
            if (skillId == 亞克.根源的記憶 || 墨玄.神功_無影腳 == skillId) {
                effect.applyTo(chr);
            } else if (skillId == 凱殷.死亡降臨_2) {
                effect.applyTo(chr, true);
            }
            chr.registerSkillCooldown(effect, true);
        }
        if (skillId == 槍神.鯨魚號突擊) {
            if (chr.getSkillEffect(槍神.戰艦鯨魚號) != null && chr.getCooldownLeftTime(槍神.戰艦鯨魚號) < 8000) {
                chr.registerSkillCooldown(槍神.戰艦鯨魚號, 8000, true);
            }
        }
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserSkillPrepare(chr.getId(), skillId, level, display, direction, speed, position), false);

        chr.setKeyDownSkill_Time(System.currentTimeMillis());
    }

    /*
     * 特殊攻擊效果
     */
    public static void UserThrowGrenade(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            c.sendEnableActions();
            return;
        }
        int pos_x = slea.readInt();
        int pos_y = slea.readInt();
//        int pos_unk = slea.readInt();
        slea.skip(4);
        slea.skip(4);//V.163 new
        int display = slea.readInt(); //延時 默認好像都是800
        int skillId = slea.readInt(); //技能ID
        int i3 = slea.readInt();
        boolean isLeft = slea.readByte() > 0; //攻擊方向 1 = 左邊 0 = 右邊
        int speed = slea.readInt(); //速度
        int tickCount = slea.readInt(); //貌似這個數字是增長的
        Skill skill = SkillFactory.getSkill(SkillConstants.getLinkedAttackSkill(skillId));
        int skilllevel = chr.getTotalSkillLevel(skill);
        if (chr.isDebug()) {
            chr.dropDebugMessage(1, "[Throw Grenade] 技能: " + SkillFactory.getSkillName(skillId) + "(" + skillId + ") 技能等級: " + skilllevel);
        }
        if (skill == null || skilllevel <= 0) {
            c.sendEnableActions();
            return;
        }
        MapleStatEffect effect = skill.getEffect(chr.getTotalSkillLevel(skill));
        effect.applyTo(chr);
        chr.getMap().broadcastMessage(chr, EffectPacket.onUserEffectRemote(chr, skillId, EffectOpcode.UserEffect_SkillUse, chr.getLevel(), skilllevel), false);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.showSpecialAttack(chr.getId(), tickCount, pos_x, pos_y, display, skillId, skilllevel, isLeft, speed), chr.getPosition());
    }

    public static void UserDestroyGrenade(MaplePacketReader slea, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        slea.readInt(); // 1
        slea.readByte(); // 1
        int skillId = slea.readInt();
        if (skillId == 開拓者.渡鴉風暴) {
            MapleStatEffect effect = chr.getSkillEffect(開拓者.渡鴉召喚);
            if (effect != null) {
                effect.applyTo(chr);
            }
        }
    }

    /**
     * 處理所有類型的"攻擊"封包
     *
     * @param slea
     * @param c
     * @param header
     */
    public static void attackProcessing(MaplePacketReader slea, MapleClient c, RecvPacketOpcode header) {
        MapleCharacter chr = c.getPlayer();
        if (chr == null || chr.getMap() == null) {
            return;
        } else if (chr.hasBlockedInventory()) {
            chr.dropMessage(5, "現在還不能進行攻擊。如有疑問請輸入[@ea]解卡!");
            c.sendEnableActions();
            return;
        }
        switch (header) {
            case CP_UserMeleeAttack://近距離攻擊 CP_UserMeleeAttack
                PlayerHandler.UserMeleeAttack(slea, c, chr);
                break;
            case CP_UserShootAttack://遠距離攻擊 CP_UserShootAttack
                PlayerHandler.UserShootAttack(slea, c, chr);
                break;
            case CP_UserMagicAttack://魔法攻擊 CP_UserMagicAttack
                PlayerHandler.UserMagicAttack(slea, c, chr);
                break;
            case CP_SummonedAttack://召喚獸攻擊
                SummonHandler.UserSummonAttack(slea, c, chr);
                break;
            case CP_UserBodyAttack: //CP_UserBodyAttack
                PlayerHandler.UserBodyAttack(slea, c, chr);
                break;
            case CP_UserAreaDotAttack: //CP_UserAreaDotAttack
                PlayerHandler.UserAreaDotAttack(slea, c, chr);
                break;
            case UserSpotlightAttack:
                PlayerHandler.UserSpotlightAttack(slea, c, chr);
                break;
            case UserNonTargetForceAtomAttack:
                PlayerHandler.UserNonTargetForceAtomAttack(slea, c, chr);
                break;
        }
    }

    /**
     * 某些情況下玩家被動近距離攻擊.例如:怪物主動攻擊某個玩家導致觸發該玩家的某個被動攻擊技能來還擊該怪物
     */
    public static void UserBodyAttack(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        final AttackInfo attack = DamageParse.parseAttack(RecvPacketOpcode.CP_UserBodyAttack, slea, chr);
        if (attack == null) {
            c.sendEnableActions();
            return;
        }
        int skillLevel = 0;
        int attackCount = 1;
        attack.attackType = AttackInfo.AttackType.BodyAttack;
        final boolean hasMoonBuff = chr.getBuffedIntValue(MapleBuffStat.PoseType) == 1;
        final boolean hasShadow = chr.getBuffedValue(MapleBuffStat.ShadowPartner) != null;
        MapleStatEffect effect = null;
        Skill skill = null;
        if (attack.skillId != 0) {
            final int linkSkillId = SkillConstants.getLinkedAttackSkill(attack.skillId);
            if ((skill = SkillFactory.getSkill(attack.skillId)) == null) {
                c.sendEnableActions();
                return;
            }
            skillLevel = chr.getSkillLevel(linkSkillId);
            effect = skill.getEffect(skillLevel);
            if (skillLevel <= 0 || effect == null) {
                chr.dropMessage(3, "[Body Attack] " + skill + " Skill Lv: " + skillLevel + " Effect is Null!");
                c.sendEnableActions();
                return;
            }
            attackCount = effect.getAttackCount(chr);
        }
        DamageParse.calcDamage(attack, chr, attackCount * (hasShadow ? 2 : 1), effect);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserBodyAttack(chr, skillLevel, 0, attack, hasMoonBuff), chr.getPosition());
        DamageParse.applyAttack(attack, skill, chr, effect, true);
    }

    public static void UserAreaDotAttack(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        AttackInfo attack = DamageParse.parseAttack(RecvPacketOpcode.CP_UserAreaDotAttack, slea, chr);
        if (attack == null) {
            c.sendEnableActions();
            return;
        }
        int skillLevel = 0;
        int attackCount = 1;
        attack.attackType = AttackInfo.AttackType.AreaDotAttack;
        final boolean hasMoonBuff = chr.getBuffedIntValue(MapleBuffStat.PoseType) == 1;
        MapleStatEffect effect = null;
        Skill skill = null;
        if (attack.skillId != 0) {
            final int linkSkillId = SkillConstants.getLinkedAttackSkill(attack.skillId);
            if ((skill = SkillFactory.getSkill(attack.skillId)) == null) {
                c.sendEnableActions();
                return;
            }
            skillLevel = chr.getSkillLevel(linkSkillId);
            effect = skill.getEffect(skillLevel);
            if (skillLevel <= 0 || effect == null) {
                chr.dropMessage(3, "[AreaDot Attack] " + skill + " Skill Lv: " + skillLevel + " Effect is Null!");
                c.sendEnableActions();
                return;
            }
            attackCount = effect.getAttackCount(chr);
        }
        DamageParse.calcDamage(attack, chr, attackCount, effect);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserBodyAttack(chr, skillLevel, 0, attack, hasMoonBuff), chr.getPosition());
        DamageParse.applyAttack(attack, skill, chr, effect, true);
    }

    public static void UserSpotlightAttack(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        AttackInfo attack = DamageParse.parseAttack(RecvPacketOpcode.UserSpotlightAttack, slea, chr);
        if (attack == null) {
            c.sendEnableActions();
            return;
        }
        attack.attackType = AttackInfo.AttackType.MeleeAttack;
        boolean hasMoonBuff = chr.getBuffedIntValue(MapleBuffStat.PoseType) == 1;
        boolean hasShadow = chr.getBuffedValue(MapleBuffStat.ShadowPartner) != null;
        double maxdamage = chr.getStat().getCurrentMaxBaseDamage();
        Item shield = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        int attackCount = shield != null && shield.getItemId() / 10000 == 134 && shield.getItemId() != 1342069 ? 2 : 1;
        int skillLevel = 0;
        MapleStatEffect effect = null;
        Skill skill = null;
        int linkSkillId = 0;
        if (attack.skillId != 0) {
            linkSkillId = SkillConstants.getLinkedAttackSkill(attack.skillId);
            if ((skill = SkillFactory.getSkill(attack.skillId)) == null) {
                c.sendEnableActions();
                return;
            }
            skillLevel = chr.getSkillLevel(linkSkillId);
            effect = skill.getEffect(skillLevel);
            if (skillLevel <= 0 || effect == null) {
                chr.dropMessage(3, "[Spotlight Attack] " + skill + " Skill Lv: " + skillLevel + " Effect is Null!");
                c.sendEnableActions();
                return;
            }
            attackCount = effect.getAttackCount(chr);
        }
        DamageParse.calcDamage(attack, chr, attackCount * (hasShadow ? 2 : 1), effect);
        chr.checkFollow();
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserMeleeAttack(chr, skillLevel, 0, attack, hasMoonBuff), chr.getPosition(), false);
        DamageParse.applyAttack(attack, skill, chr, effect, SkillConstants.isPassiveAttackSkill(linkSkillId));
    }

    /**
     * 玩家近距離攻擊怪物
     */
    public static void UserMeleeAttack(MaplePacketReader slea, MapleClient c, final MapleCharacter chr) {

        AttackInfo attack = DamageParse.parseAttack(RecvPacketOpcode.CP_UserMeleeAttack, slea, chr);
        if (attack == null) {
//            c.sendEnableActions();
            if (JobConstants.is墨玄(chr.getJob())) {
                c.announce(MaplePacketCreator.encodeEnableActions());
            }
            return;
        }
        int comboStage = -1;
        switch (attack.skillId) {
            case 墨玄.玄山_招式進行_1:
            case 墨玄.玄山_招式進行_2:
            case 墨玄.玄山_招式進行_5:
                comboStage = 1;
                break;
            case 墨玄.玄山_招式進行_3:
            case 墨玄.玄山_招式進行_6:
                comboStage = 2;
                break;
            case 墨玄.玄山_招式進行_4:
            case 墨玄.玄山_招式進行_7:
                comboStage = 3;
                break;
            case 墨玄.玄山_招式進行_8:
                comboStage = 4;
                break;
            case 墨玄.神功_粉碎拳:
            case 墨玄.神功_旋風腳:
            case 墨玄.神功_旋風腳_1:
            case 墨玄.神功_鐵衫功:
            case 墨玄.神功_亂打連拳:
            case 墨玄.神功_亂打連拳_1:
            case 墨玄.神功_大地崩塌:
            case 墨玄.神功_大地崩塌_1:
            case 墨玄.神功_大地崩塌_2:
            case 墨玄.神功_破空拳神力的氣息:
                comboStage = 0;
                break;
        }
        if (comboStage > -1 && comboStage < 6) {
            c.announce(MaplePacketCreator.encodeMoxuanPower(0, comboStage, 3000, 1, null));
        }
        switch (attack.skillId) {
            case 墨玄.神功_粉碎拳:
            case 墨玄.神功_旋風腳:
            case 墨玄.神功_鐵衫功:
            case 墨玄.神功_亂打連拳_1:
            case 墨玄.神功_大地崩塌:
                int godPower = 0;
                int time = 30000;
                if (chr.getSkillLevel(墨玄.入神) > 0) {
                    godPower = (int) chr.getTempValues().getOrDefault("GodPower", 0);
                    godPower = Math.min(5, ++godPower);
                    chr.getTempValues().put("GodPower", godPower);
                    if (chr.getSkillLevel(墨玄.入神_時間持續) > 0) {
                        time += 10000;
                    }
                }
                c.announce(MaplePacketCreator.encodeMoxuanPower(1, godPower, time, 0, null));
                break;
        }
        if (SkillFactory.isBlockedSkill(attack.skillId)) {
            chr.dropMessage(5, "由於<" + SkillFactory.getSkillName(attack.skillId) + ">技能數據異常,暫未開放使用.");
            c.sendEnableActions();
            return;
        }
        if (attack.skillId != 0 && chr.isDebug()) {
            chr.dropDebugMessage(1, "[近距離攻擊] 技能: " + SkillFactory.getSkillName(attack.skillId) + "(" + attack.skillId + ") 技能等級: " + attack.skllv + " 攻擊次數: " + attack.mobCount + " 傷害次數: " + attack.hits);
        }
        attack.attackType = AttackInfo.AttackType.MeleeAttack;
        boolean hasMoonBuff = chr.getBuffedIntValue(MapleBuffStat.PoseType) == 1;
        boolean hasShadow = chr.getBuffedValue(MapleBuffStat.ShadowPartner) != null;
        Item shield = c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        int attackCount = shield != null && shield.getItemId() / 10000 == 134 && shield.getItemId() != 1342069 ? 2 : 1;
        int skillLevel = 0;
        MapleStatEffect effect = null;
        Skill skill = null;
        int linkSkillId = 0;
        if (attack.skillId != 0) {
            linkSkillId = SkillConstants.getLinkedAttackSkill(attack.skillId);
            skill = SkillFactory.getSkill(attack.skillId);
            if (skill == null) {
                c.sendEnableActions();
                return;
            }
            skillLevel = chr.getSkillLevel(linkSkillId);
            effect = skill.getEffect(skillLevel);
            if (effect == null) {
                MapleBuffStatValueHolder holder = chr.getBuffStatValueHolder(linkSkillId);
                if (holder != null && holder.effect != null) {
                    effect = holder.effect;
                    skillLevel = holder.effect.getLevel();
                }
            }
            if (effect == null || skillLevel < 0) {
                chr.dropDebugMessage(2, "[Melee Attack] Effect is null 玩家[" + chr.getName() + " 職業： " + chr.getJob() + "] 技能： " + skill.getId() + " 等級： " + skillLevel);
                c.sendEnableActions();
                return;
            }
            attackCount = effect.getAttackCount(chr);
        }
        DamageParse.calcDamage(attack, chr, attackCount * (hasShadow ? 2 : 1), effect);
        chr.checkFollow();
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserMeleeAttack(chr, skillLevel, 0, attack, hasMoonBuff), chr.getPosition(), false);
        DamageParse.applyAttack(attack, skill, chr, effect, SkillConstants.isPassiveAttackSkill(linkSkillId));
    }

    public static void UserShootAttack(MaplePacketReader slea, final MapleClient c, final MapleCharacter chr) {
        AttackInfo attack = DamageParse.parseAttack(RecvPacketOpcode.CP_UserShootAttack, slea, chr);
        if (attack == null) {
            c.sendEnableActions();
            return;
        }
        if (SkillFactory.isBlockedSkill(attack.skillId)) {
            chr.dropMessage(5, "由於<" + SkillFactory.getSkillName(attack.skillId) + ">技能數據異常,暫未開放使用.");
            c.sendEnableActions();
            return;
        }
//        if (chr.isShowPacket()) {
//            chr.dropDebugMessage(1, "[遠距離攻擊] 技能: " + SkillFactory.getSkillName(attack.skillId) + "(" + attack.skillId + ") 打怪數量: " + attack.numAttacked + " 打怪次數: " + attack.numDamage);
//        }
        /* 初始化子彈數量和技能等級信息 */
        int bulletCount = 1, skillLevel = 0;
        int linkSkillId = 0;
        int attackCount = 1;
        MapleStatEffect effect = null;
        Skill skill = null;
        final boolean hasShadow = chr.getBuffedValue(MapleBuffStat.ShadowPartner) != null;
        attack.attackType = AttackInfo.AttackType.ShootAttack;
        int itemId = 0;

        /* 判斷攻擊的技能是否為普通攻擊 */
        if (attack.skillId != 0) {
            linkSkillId = SkillConstants.getLinkedAttackSkill(attack.skillId);
            skill = SkillFactory.getSkill(attack.skillId);
            /* 獲取技能數據 */
            if (skill == null) {
                c.sendEnableActions();
                return;
            }
            /* 獲取技能等級信息 */
            skillLevel = chr.getTotalSkillLevel(linkSkillId);
            /* 獲取技能攻擊效果信息 */
            effect = skill.getEffect(skillLevel);
            if (skillLevel <= 0 || effect == null) {
                Skill.log.error("遠距離攻擊效果為空 玩家[" + chr.getName() + " 職業: " + chr.getJob() + "] 使用技能: " + skill.getId() + " - " + skill.getName() + " 技能等級: " + skillLevel);
                c.sendEnableActions();
                return;
            }
            int n4 = effect.getAttackCount(chr);
            if (effect.getBulletCount() > 1) {
                bulletCount = effect.getBulletCount(chr) * (hasShadow ? 2 : 1);
                final MapleStatEffect effecForBuffStat;
                if ((effecForBuffStat = chr.getEffectForBuffStat(MapleBuffStat.RideVehicle)) != null) {
                    switch (effecForBuffStat.getSourceId()) {
                        case 狂豹獵人.美洲豹騎乘: {
                            n4 *= bulletCount;
                            break;
                        }
                    }
                }
                n4 = Math.max(n4, bulletCount);
            }
            /* 如果當前技能所需的子彈數量大於或等於當前角色的攻擊次數，那麼最終按技能所需的子彈數量賦值 */
            attackCount = n4 * (hasShadow ? 2 : 1);
        } else if (chr.getBuffSource(MapleBuffStat.RideVehicle) == 機甲戰神.合金盔甲_人型) {
            attackCount = 2;
        }
        final Item item;
        if (attack.starSlot > 0) {
            if ((item = chr.getInventory(MapleInventoryType.USE).getItem(attack.starSlot)) == null) {
                return;
            }
            itemId = item.getItemId();
        }
        if (attack.cashSlot > 0) {
            final Item item2;
            if ((item2 = chr.getInventory(MapleInventoryType.CASH).getItem(attack.cashSlot)) == null) {
                return;
            }
            itemId = item2.getItemId();
        }
        DamageParse.calcDamage(attack, chr, attackCount, effect);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserShootAttack(chr, skillLevel, itemId, attack), chr.getPosition());
        DamageParse.applyAttack(attack, skill, chr, effect, SkillConstants.isPassiveAttackSkill(linkSkillId));
    }

    /**
     * 處理終極攻擊
     *
     * @param chr
     * @param skillId
     */
    public static void handleFinalAttack(MapleCharacter chr, int skillId) {
        int finalSkillId = 0, finalSkillLevel = 0;
        for (int id : SkillFactory.getFinalAttackSkills()) {
            int level = chr.getTotalSkillLevel(id);
            if (level > 0) {
                finalSkillId = id;
                finalSkillLevel = level;
                break;
            }
        }
        if (finalSkillId == 0 || finalSkillId == skillId) {
            return;
        }
        MapleWeapon weaponType;
        Item item = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((JobConstants.is神之子(chr.getJob()) && chr.isBeta()) ? (short) -10 : -11);
        if (item == null) {
            weaponType = MapleWeapon.沒有武器;
        } else {
            weaponType = MapleWeapon.getByItemID(item.getItemId());
        }
        if (weaponType == MapleWeapon.沒有武器) {
            return;
        }
        Skill finalSkill = SkillFactory.getSkill(finalSkillId);
        MapleStatEffect effect = finalSkill.getEffect(finalSkillLevel);
        boolean use = effect.makeChanceResult();
//        chr.send(MaplePacketCreator.FinalAttack(chr, skillId, weaponType.getWeaponType(), use));
    }

    public static void UserMagicAttack(MaplePacketReader slea, final MapleClient c, final MapleCharacter chr) {

        AttackInfo attack = DamageParse.parseAttack(RecvPacketOpcode.CP_UserMagicAttack, slea, chr);
        if (attack == null) {
            c.sendEnableActions();
            return;
        }
        if (SkillFactory.isBlockedSkill(attack.skillId)) {
            chr.dropMessage(5, "由於<" + SkillFactory.getSkillName(attack.skillId) + ">技能數據異常,暫未開放使用.");
            c.sendEnableActions();
            return;
        }
        if (chr.isDebug()) {
            chr.dropDebugMessage(1, "[魔法攻擊] 技能: " + SkillFactory.getSkillName(attack.skillId) + "(" + attack.skillId + ") 打怪數量: " + attack.mobCount + " 打怪次數: " + attack.hits);
        }
        int linkSkillId = 0;
        int skillLevel = 0;
        int attackCount = 1;
        attack.attackType = AttackInfo.AttackType.MagicAttack;
        MapleStatEffect effect = null;
        Skill skill = null;
        if (attack.skillId != 0) {
            linkSkillId = SkillConstants.getLinkedAttackSkill(attack.skillId);
            if ((skill = SkillFactory.getSkill(attack.skillId)) == null) {
                c.sendEnableActions();
                return;
            }
            skillLevel = chr.getSkillLevel(linkSkillId);
            effect = skill.getEffect(skillLevel);
            if (skillLevel <= 0 || effect == null) {
                chr.dropMessage(3, "[Magic Attack] " + skill + " Skill Lv: " + skillLevel + " Effect is Null!");
                c.sendEnableActions();
                return;
            }
            attackCount = effect.getAttackCount(chr);
        }
        DamageParse.calcDamage(attack, chr, attackCount, effect);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserMagicAttack(chr, skillLevel, 0, attack), chr.getPosition());
        DamageParse.applyAttack(attack, skill, chr, effect, SkillConstants.isPassiveAttackSkill(linkSkillId));
    }

    public static void UserNonTargetForceAtomAttack(MaplePacketReader slea, final MapleClient c, final MapleCharacter chr) {
        AttackInfo attack = DamageParse.parseAttack(RecvPacketOpcode.UserNonTargetForceAtomAttack, slea, chr);
        if (attack == null) {
            c.sendEnableActions();
            return;
        }
        if (SkillFactory.isBlockedSkill(attack.skillId)) {
            chr.dropMessage(5, "由於<" + SkillFactory.getSkillName(attack.skillId) + ">技能數據異常,暫未開放使用.");
            c.sendEnableActions();
            return;
        }
        int skillLevel = 0;
        int attackCount = 1;
        attack.attackType = AttackInfo.AttackType.MagicAttack;
        MapleStatEffect effect = null;
        Skill skill = null;
        if (attack.skillId != 0) {
            final int linkSkillId = SkillConstants.getLinkedAttackSkill(attack.skillId);
            if ((skill = SkillFactory.getSkill(attack.skillId)) == null) {
                c.sendEnableActions();
                return;
            }
            skillLevel = chr.getSkillLevel(linkSkillId);
            effect = skill.getEffect(skillLevel);
            if (skillLevel <= 0 || effect == null) {
                chr.dropMessage(3, "[Atom Attack] " + skill + " Skill Lv: " + skillLevel + " Effect is Null!");
                c.sendEnableActions();
                return;
            }
            attackCount = effect.getAttackCount(chr);
        }
        DamageParse.calcDamage(attack, chr, attackCount, effect);
        chr.getMap().broadcastMessage(chr, MaplePacketCreator.UserMagicAttack(chr, skillLevel, 0, attack), chr.getPosition());
        DamageParse.applyAttack(attack, skill, chr, effect, true);
    }

    public static void DropMeso(int meso, MapleCharacter chr) {
        if (!chr.isAlive() || meso < 10 || meso > 50000 || meso > chr.getMeso()) {
            chr.getClient().sendEnableActions();
            return;
        }
        chr.gainMeso(-meso, false, true);
        chr.getMap().spawnMesoDrop(meso, chr.getPosition(), chr, chr, true, (byte) 0);
        chr.getCheatTracker().checkDrop(true);
    }

    public static void UserSupserCannotRequest(MaplePacketReader lea, MapleCharacter player) {
        if (player == null || player.getMap() == null || !JobConstants.is傑諾(player.getJob())) {
            return;
        }
        byte mode = lea.readByte();
        MapleStatEffect effect = player.getSkillEffect(傑諾.滅世雷射光);
        if (effect != null && mode == 0 && player.getBuffedIntValue(MapleBuffStat.滅世雷射光) < 0) {
            effect.applyTo(player, true);
        }
    }

    /*
     * 改變機器人的表情?
     */
    public static void ChangeAndroidEmotion(int emote, MapleCharacter chr) {
        if (emote > 0 && chr != null && chr.getMap() != null && !chr.isHidden() && emote <= 17 && chr.getAndroid() != null) { //O_o
            chr.getMap().broadcastMessage(AndroidPacket.showAndroidEmotion(chr.getId(), 0, emote));
        }
    }

    /*
     * 機器人移動
     */
    public static void MoveAndroid(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        slea.readInt();
        final int gatherDuration = slea.readInt();
        final int nVal1 = slea.readInt();
        final Point mPos = slea.readPos();
        final Point oPos = slea.readPos();
        List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 9);
        if (res != null && chr != null && !res.isEmpty() && chr.getMap() != null && chr.getAndroid() != null) { // map crash hack
            chr.getAndroid().updatePosition(res);
            chr.getMap().broadcastMessage(chr, AndroidPacket.moveAndroid(chr.getId(), gatherDuration, nVal1, mPos, oPos, res), false);
        }
    }

    /*
     * 面部表情
     */
    public static void ChangeEmotion(final int emote, MapleCharacter chr) {
        if (chr != null) {
            if (emote > 7) {
                int emoteid = 5159992 + emote;
                MapleInventoryType type = ItemConstants.getInventoryType(emoteid);
                if (type != null && chr.getInventory(type).findById(emoteid) == null) {
                    chr.getCheatTracker().registerOffense(CheatingOffense.USING_UNAVAILABLE_ITEM, Integer.toString(emoteid));
                    return;
                }
            }
            if (emote > 0 && chr.getMap() != null && !chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.facialExpression(chr, emote), false);
            }
        }
    }

    public static void Heal(MaplePacketReader slea, MapleCharacter chr) {
        //[8F 00] [32 ED 2F 00] [00 14 00 00] [00 00 00 00] [0A 00] [00 00] 00 E2 36 30 00
        //[8F 00] [7E FB 2F 00] [00 14 00 00] [00 00 00 00] [00 00] [03 00] 00 2B 45 30 00
        if (chr == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        slea.skip(4); // 00 14 00 00
        slea.skip(4); // 00 00 00 00
        int healHP = slea.readShort();
        int healMP = slea.readShort();
        PlayerStats stats = chr.getStat();
        if (stats.getHp() <= 0) {
            return;
        }
        long now = System.currentTimeMillis();
        if (healHP != 0 && chr.canHP(now + 1000)) {
            if (healHP > stats.getHealHP()) {
                //chr.getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_HP, String.valueOf(healHP));
                healHP = (int) stats.getHealHP();
            }
            chr.addHPMP(healHP, 0);
        }
        if (healMP != 0 && !JobConstants.isNotMpJob(chr.getJob()) && chr.canMP(now + 1000)) { //just for lag
            if (healMP > stats.getHealMP()) {
                //chr.getCheatTracker().registerOffense(CheatingOffense.REGEN_HIGH_MP, String.valueOf(healMP));
                healMP = (int) stats.getHealMP();
            }
            chr.addHPMP(0, healMP);
        }
    }

    public static void MovePlayer(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        final Point Original_Pos = chr.getPosition();
        slea.readByte();
        slea.readInt();
        slea.readInt();
        slea.readByte();
        final int gatherDuration = slea.readInt();
        final int nVal1 = slea.readInt();
        final Point mPos = slea.readPos();
        final Point oPos = slea.readPos();
        List<LifeMovementFragment> res;
        try {
            res = MovementParse.parseMovement(slea, 1);
        } catch (ArrayIndexOutOfBoundsException e) {
            MovementParse.log.error("parseMovementError type1:" + slea.toString(true), e);
            return;
        }
        if (res != null) {
            final MapleMap map = c.getPlayer().getMap();

            MovementParse.updatePosition(res, chr, 0);
            final Point pos = chr.getPosition();
            map.objectMove(chr.getId(), chr, MaplePacketCreator.movePlayer(chr.getId(), res, gatherDuration, nVal1, mPos, oPos));
            if (chr.getFollowId() > 0 && chr.isFollowOn() && chr.isFollowInitiator()) {
                final MapleCharacter fol = map.getPlayerObject(chr.getFollowId());
                if (fol != null) {
                    final Point original_pos = fol.getPosition();
                    fol.getClient().announce(MaplePacketCreator.moveFollow(gatherDuration, nVal1, Original_Pos, original_pos, pos, res));
                    MovementParse.updatePosition(res, fol, 0);
                    map.objectMove(fol.getId(), fol, MaplePacketCreator.movePlayer(fol.getId(), res, gatherDuration, nVal1, mPos, oPos));
                } else {
                    chr.checkFollow();
                }
            }
        }
    }

    public static void ChangeMapSpecial(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        slea.skip(1);
        String portal_name = slea.readMapleAsciiString();
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MaplePortal portal = chr.getMap().getPortal(portal_name);
        if (portal != null && !chr.hasBlockedInventory()) {
            portal.enterPortal(c);
        } else {
            c.sendEnableActions();
        }
    }

    public static void ChangeMap(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        if (chr.isBanned()) {
            MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(910000000);
            chr.changeMap(to, to.getPortal(0));
            c.sendEnableActions();
            return;
        }
        if (slea.available() != 0) {
            slea.readByte();
            int targetid = slea.readInt();
            switch (targetid) {
                case -1: {
                    final MaplePortal portal = chr.getMap().getPortal(slea.readMapleAsciiString());
                    final Point pos = slea.readPos();
                    if (portal == null/* || portal.getPosition().distance(pos) > 350.0*/) {
                        c.sendEnableActions();
                        return;
                    }
                    portal.enterPortal(c);
                    return;
                }
                case 0: {
                    slea.readShort();
                    slea.readByte();
                    final byte type = slea.readByte();
                    boolean protectBuff = slea.readBool();
                    slea.readBool(); // 是否有buff
                    OnRevive(chr, type, protectBuff);
                    break;
                }
                default: {
                    if (chr.isInGameCurNode()) {
                        chr.changeMap(targetid, 0);
                        return;
                    }
                    chr.sendEnableActions();
                    break;
                }
            }
        }

        //修復更換地圖無法顯示連擊
        if (chr.getAranCombo() > 0) {
            chr.gainAranCombo(0, true);
        }
    }

    public static void EventReviveRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        byte type = slea.readByte();
        boolean protectBuff = slea.readBool();
        slea.readBool(); // 是否有buff
        slea.readByte();
        OnRevive(player, type, protectBuff);
    }

    public static void OnRevive(MapleCharacter chr, byte type, boolean protectBuff) {
        if (type == 11) {
            protectBuff = false;
        } else if (protectBuff) {
            int itemID = -1;
            if (chr.getEventInstance() != null && chr.getEventInstance().isPractice()) {
                itemID = 5133000;
            } else if (MapleInventoryManipulator.removeById(chr.getClient(), MapleInventoryType.CASH, 5133000, 1, true, false)) {
                itemID = 5133000;
            } else if (MapleInventoryManipulator.removeById(chr.getClient(), MapleInventoryType.CASH, 5133001, 1, true, false)) {
                itemID = 5133001;
            }
            if (itemID == -1) {
                chr.send(EffectPacket.ProtectBuffGain(5133000, 2));
                protectBuff = false;
            } else {
                chr.send(EffectPacket.ProtectBuffGain(itemID, 1));
            }
        }
        boolean eventRevive = false;
        if (chr.getEventInstance() != null) {
            eventRevive = chr.getEventInstance().revivePlayer(chr);
        }
        if (chr.getPyramidSubway() != null) {
            chr.getStat().setHp((short) 50, chr);
            chr.getPyramidSubway().fail(chr);
            return;
        }
        chr.disappearSummons(true);
        chr.removeDebuffs();
        MapleMap map = chr.getMap().getReturnMap();
        Point pos = null;
        switch (type) {
            case 1: { // 高級服務
                if (chr.haveItem(5420008)) {
                    map = chr.getMap();
                    pos = chr.getPosition();
                }
                break;
            }
            case 2: { // 楓點原地復活
                if (chr.getCSPoints(2) >= 200) {
                    chr.modifyCSPoints(2, -200, true);
                    map = chr.getMap();
                    pos = chr.getPosition();
                }
                break;
            }
            case 3: { // 組隊點數復活
                if (chr.getPQPoint() >= 10) {
                    chr.gainPQPoint(-10);
                    map = chr.getMap();
                    pos = chr.getPosition();
                }
                break;
            }
            case 4: { // 原地復活術復活
                if (MapleInventoryManipulator.removeById(chr.getClient(), MapleInventoryType.CASH, 5510000, 1, true, false)) {
                    chr.send(MTSCSPacket.useWheel((byte) chr.getItemQuantity(5510000, false)));
                    map = chr.getMap();
                    pos = chr.getPosition();
                }
                break;
            }
            case 5: { // 靈魂之石復活
                if (chr.getEffectForBuffStat(MapleBuffStat.SoulStone) != null) {
                    chr.dispelEffect(MapleBuffStat.SoulStone);
                    map = chr.getMap();
                    pos = chr.getPosition();
                }
                break;
            }
            case 10: { // 女神的紡車復活
                if (MapleInventoryManipulator.removeById(chr.getClient(), MapleInventoryType.CASH, 5511001, 1, true, false)) {
                    chr.send(MTSCSPacket.useWheel((byte) chr.getItemQuantity(5511001, false)));
                    map = chr.getMap();
                    pos = chr.getPosition();
                }
                break;
            }
            case 8: { // UIReviveType_PremiumUser2
                if (chr.getBossLog("原地復活") < ServerConfig.CHANNEL_PLAYER_RESUFREECOUNT) {
                    map = chr.getMap();
                    pos = chr.getPosition();
                    chr.setBossLog("原地復活");
                    chr.dropMessage(5, "恭喜您原地復活成功，您今天還可以使用: " + (ServerConfig.CHANNEL_PLAYER_RESUFREECOUNT - chr.getBossLog("原地復活")) + " 次。");
                }
                break;
            }
            case 11: { // 戰鬥機器人復活
                if (chr.getAndroid() != null && (chr.getAndroid().getItemId() == 1662072 || chr.getAndroid().getItemId() == 1662073)) {
                    DeadDebuff.cancelDebuff(chr, true);
                    chr.send(MTSCSPacket.useCharm(4, (byte) 0, (byte) 0, chr.getAndroid().getItemId()));
                    MapleItemInformationProvider.getInstance().getItemEffect(2002100).applyTo(chr);
                    map = chr.getMap();
                    protectBuff = true;
                }
                break;
            }
            case 6: // 伊露納的幸運機會
            case 9: // UIReviveType_PremiumUser2 - 否
            case 12: // 戰鬥機器人復活 - 否
            case 0:
            default: {
                break;
            }
        }

        if (chr.inEvent()) {
            if (chr.getEventReviveCount() > 0) {
                map = chr.getMap();
                if (chr.getReviveCount() > 0) {
                    chr.setReviveCount(chr.getReviveCount() - 1);
                } else {
                    chr.getEventInstance().setReviveCount(chr.getEventInstance().getReviveCount() - 1);
                }
                chr.sendDathCount();
            } else if (pos == null) {
                protectBuff = true;
                final int forcedReturnMapId;
                if (chr.getMap() != null && (forcedReturnMapId = chr.getMap().getForcedReturnId()) > 0 && forcedReturnMapId < 999999999) {
                    map = chr.getClient().getChannelServer().getMapFactory().getMap(forcedReturnMapId);
                }
            }
        }

        if (!protectBuff) {
            chr.removeBuffs(false);
        }

        chr.getStat().hp = chr.getStat().getCurrentMaxHP();
        chr.getStat().mp = chr.getStat().getCurrentMaxMP();
        if (!eventRevive) {
            if (chr.inEvent() && chr.getMap() == map) {
                chr.send(MaplePacketCreator.userTeleportOnRevive(chr.getId(), pos == null ? map.getPortal(0).getPosition() : pos));
            } else {
                if (pos == null) {
                    chr.reviveMap(map, map.getPortal(0));
                } else {
                    chr.changeMap(map, pos);
                }
            }
        }
        chr.updateHPMP(false);
    }

    public static void InnerPortal(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        slea.skip(1);
        MaplePortal portal = chr.getMap().getPortal(slea.readMapleAsciiString());
        int toX = slea.readShort();
        int toY = slea.readShort();
        Point pos = slea.readPos();

        if (portal == null) {
            return;
        } else if (portal.getPosition().distance(chr.getPosition()) > 150 && !chr.isGm()) {
            chr.getCheatTracker().registerOffense(CheatingOffense.USING_FARAWAY_PORTAL);
            return;
        }
        chr.setPosition(pos);
        chr.getMap().objectMove(-1, chr, null);
//        chr.getMap().movePlayer(chr, new Point(toX, toY));
        if (chr.getAndroid() != null) {
            chr.getAndroid().setPos(pos);
            chr.getMap().objectMove(-1, chr, null);
        }
        chr.checkFollow();
    }

    /*
     * 重新領取勳章的操作
     */
    public static void ReIssueMedal(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int questId = slea.readShort();
        int itemId = slea.readInt();
        MapleQuest quest = MapleQuest.getInstance(questId);
        if (quest != null & quest.getMedalItem() > 0 && chr.getQuestStatus(quest.getId()) == 2 && quest.getMedalItem() == itemId) { //檢測角色是否完成這個任務 且這個任務是存在的 這個任務是有勳章的
            if (!chr.haveItem(itemId)) { //檢測角色是否擁有這個勳章道具
                int price = 100; //默認第1次領取為 100 楓幣
                int infoQuestId = GameConstants.重新領取勳章; //重新領取勳章的任務ID
                String infoData = "count=1"; //第1次領取的更新數據
                if (chr.containsInfoQuest(infoQuestId, "count=")) { //如果角色的這個任務有
                    String line = chr.getInfoQuest(infoQuestId); //獲取任務數據
                    String[] splitted = line.split("="); //分割文本
                    if (splitted.length == 2) { //判斷數組是否為2
                        int data = Integer.parseInt(splitted[1]);
                        infoData = "count=" + (data + 1);
                        if (data == 1) { //第2次領取
                            price = 1000;
                        } else if (data == 2) { //第3次領取
                            price = 10000;
                        } else if (data == 3) { //第4次領取
                            price = 100000;
                        } else {  //第5次或5次以上領取
                            price = 1000000;
                        }
                    } else {
                        chr.dropMessage(1, "重新領取勳章出現錯誤");
                        c.sendEnableActions();
                        return;
                    }
                }
                if (chr.getMeso() < price) {
                    chr.dropMessage(1, "本次重新需要楓幣: " + price + "\r\n請檢查楓幣是否足夠");
                    c.sendEnableActions();
                    return;
                }
                chr.gainMeso(-price, true, true); //減少楓幣
                MapleInventoryManipulator.addById(c, itemId, 1, ""); //給玩家道具
                chr.updateInfoQuest(infoQuestId, infoData);
                c.announce(MaplePacketCreator.updateMedalQuestInfo((byte) 0x00, itemId)); //發送顯示給了勳章的信息
            } else {
                c.announce(MaplePacketCreator.updateMedalQuestInfo((byte) 0x03, itemId)); //返回擁有這個勳章的封包
            }
        } else { //當玩家沒有完成這個任務或者任務不存在就送這個
            c.sendEnableActions();
        }
    }

    /*
     * 玩家更新數據
     */
    public static void PlayerUpdate(MapleClient c, MapleCharacter chr) {
        boolean autoSave = true;
        if (!autoSave || chr == null || chr.getMap() == null) {
            return;
        }
        if (chr.getCheatTracker().canSaveDB()) {
//            chr.saveToCache();
            chr.saveToDB(false, false);
        }
    }

    public static void DelTeachSkill(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        Skill skill = SkillFactory.getSkill(skillid);
        if (skill == null || !chr.getLinkSkills().containsKey(skillid) && SkillConstants.getTeamTeachSkillId(skillid) <= 0) {
            c.sendEnableActions();
            c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillid, 6));
            return;
        }
        int toSkillId = SkillConstants.getTeachSkillId(skillid);
        SkillEntry skillEntry = chr.getSkills().get(skillid);
        int[] skills = SkillConstants.getTeamTeachSkills(skillid);
        if (skills != null) {
            toSkillId = skillid;
        }
        if (toSkillId > 0 && skillEntry != null && chr.teachSkill(skillid, skillEntry.teachId, true) > -1) {
            chr.changeTeachSkill(skillid, skillEntry.teachId, skillEntry.skillevel, true);
        }
        c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillid, 0));
    }

    /*
     * 傳授技能
     */
    public static void SetTeachSkill(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int skillId = slea.readInt();
        if (chr == null || chr.getMap() == null || chr.hasBlockedInventory()) {
            c.sendEnableActions();
            c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillId, 7));
            return;
        }
        if (chr.getSkillLevel(skillId) > 0) {
            c.sendEnableActions();
            c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillId, 3));
            return;
        }
        int toChrId = slea.readInt();
        Pair<String, Integer> toChrInfo = MapleCharacterUtil.getNameById(toChrId, chr.getWorld());
        if (toChrInfo == null) {
            c.sendEnableActions();
            c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillId, 6));
            return;
        }
        int toChrAccId = toChrInfo.getRight();
        MapleQuest quest = MapleQuest.getInstance(7783); //鏈接技能對像更改用
        if (quest != null && chr.getAccountID() == toChrAccId) { //&& chr.getQuestStatus(quest.getId()) != 2
            //進行傳授鏈接技能的技能檢測
            int toSkillId = SkillConstants.getTeachSkillId(skillId);
            Pair<Integer, SkillEntry> skillPair = chr.getSonOfLinkedSkills().get(skillId);
            if (toSkillId <= 0 || !chr.getSonOfLinkedSkills().containsKey(skillId) || skillPair == null) {
                c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillId, 5));
                c.sendEnableActions();
                return;
            }
            if (chr.teachSkill(skillId, toChrId, false) > 0) {
                chr.changeTeachSkill(skillId, toChrId, skillPair.getRight().skillevel, false);
                quest.forceComplete(chr, 0);
                int tSkillId = SkillConstants.getTeamTeachSkillId(skillId);
                if (tSkillId > 1) {
                    Map<Integer, SkillEntry> skills = chr.getSkills();
                    if (skills != null && skills.containsKey(tSkillId)) {
                        c.announce(MaplePacketCreator.updateSkills(Collections.singletonMap(tSkillId, skills.get(tSkillId))));
                    }
                }
                c.announce(MaplePacketCreator.SetLinkSkillResult(skillId, new Pair<>(toChrId, chr.getLinkSkills().get(skillId)), tSkillId, chr.getTotalSkillLevel(tSkillId)));
                c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillId, 1));
//                c.announce(MaplePacketCreator.giveCharacterSkill(skillId, toChrId, toChrName));
            } else {
                c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillId, 5));
//                chr.dropMessage(1, "傳授技能失敗角色[" + toChrName + "]已經獲得該技能");
            }
        } else {
            c.announce(MaplePacketCreator.UpdateLinkSkillResult(skillId, 6));
//            chr.dropMessage(1, "傳授技能失敗。");
        }
        c.sendEnableActions();
    }

    /*
     * 自由市場換圖和頻道
     */
    public static void ChangeMarketMap(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        /*
         * Send CHANGE_MARKET_MAP [0104] (11)
         * 04 01
         * 01 - 頻道
         * 83 7F 3D 36 - 地圖
         * 6C 09 AC 01
         * ...?=6l.?
         */
        if (chr == null || chr.getMap() == null || chr.hasBlockedInventory()) {
            c.sendEnableActions();
            return;
        }
        int chc = slea.readByte() + 1;
        int toMapId = slea.readInt();
        //System.out.println("自由市場換圖角色當前頻道: " + c.getChannel() + " 換圖的頻道: " + chc);
        if (toMapId >= 910000001 && toMapId <= 910000022) {
            if (c.getChannel() != chc) {
                if (chr.getMapId() != toMapId) {
                    //chr.dropMessage(1, "遊戲當前暫不支持不同頻道不同地圖的切換。");
                    MapleMap to = ChannelServer.getInstance(chc).getMapFactory().getMap(toMapId);
                    chr.setMap(to);
                    chr.changeChannel(chc);
                } else {
                    chr.changeChannel(chc);
                }
            } else {
                MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(toMapId);
                chr.changeMap(to, to.getPortal(0));
            }
        } else {
            c.sendEnableActions();
        }
    }

    /*
     * 按U楓之谷新手教學飛行
     */
    public static void UseContentMap(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            c.sendEnableActions();
            return;
        }
        short op = slea.readShort();
        if (op != 0) {
            c.sendEnableActions();
            return;
        }
        int toMapId = slea.readInt();
        if (chr.hasBlockedInventory()) {
            c.sendEnableActions();
            return;
        }
        if (MapConstants.isBossMap(toMapId)) {
            c.announce(MTSCSPacket.getTrockMessage((byte) 11));
            c.sendEnableActions();
            return;
        }
        MapleMap moveTo = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(toMapId);
        if (moveTo == null || FieldLimitType.TELEPORTITEMLIMIT.check(moveTo.getFieldLimit())) {
            c.announce(MTSCSPacket.getTrockMessage((byte) 11));
            c.sendEnableActions();
            return;
        }
        if (chr.getLevel() < moveTo.getLevelLimit()) {
            chr.dropMessage(1, "只有" + moveTo.getLevelLimit() + "等級可以移動的地區。");
            c.sendEnableActions();
            return;
        }
        chr.changeMap(moveTo);
    }

    /*
     * 按W查看世界地圖點擊飛行
     */
    public static void UseChronosphere(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            c.sendEnableActions();
            return;
        }
        chr.updateTick(slea.readInt());
        int toMapId = slea.readInt();
        if (chr.hasBlockedInventory()) {
            c.sendEnableActions();
            return;
        }
        if (MapConstants.isBossMap(toMapId)) {
            c.announce(MTSCSPacket.getTrockMessage((byte) 11));
            c.sendEnableActions();
            return;
        }
        MapleMap moveTo = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(toMapId);
        if (moveTo == null || FieldLimitType.TELEPORTITEMLIMIT.check(moveTo.getFieldLimit())) {
            c.announce(MTSCSPacket.getTrockMessage((byte) 11));
            c.sendEnableActions();
            return;
        }
        if (moveTo == chr.getMap()) {
            c.announce(MTSCSPacket.getTrockMessage((byte) 9));
            c.sendEnableActions();
            return;
        }
        if (chr.getLevel() < moveTo.getLevelLimit()) {
            chr.dropMessage(1, "只有" + moveTo.getLevelLimit() + "等級可以移動的地區。");
            c.sendEnableActions();
            return;
        }
        if (moveTo.getQuestLimit() > 0 && chr.getQuestStatus(moveTo.getQuestLimit()) != 2) {
            if (moveTo.getBarrierArc() > 0 || moveTo.getBarrierAut() > 0) {
                c.announce(MTSCSPacket.getTrockMessage((byte) 11));
                c.sendEnableActions();
                chr.dropMessage(5, "目標地區需要完成任務「" + MapleQuest.getInstance(moveTo.getQuestLimit()).getName() + "」才能傳送。");
                return;
            }
        }
        if (chr.getChronosphere() > 0) {
            chr.setPQLog("免費強化任意門");
            chr.initChronosphere();
            chr.dropMessage(5, "您使用了" + c.getChannelServer().getServerName() + "免費傳送功能從 " + chr.getMap().getMapName() + " --> " + moveTo.getMapName() + " 今天還可以使用: " + chr.getChronosphere() + " 次。");
            chr.changeMap(moveTo);
            if (chr.getChronosphere() == 0) {
                chr.dropMessage(1, "本周已無剩餘免費強化任意門\r\n再次使用將消耗強化任意門。");
            }
        } else if (chr.getCSPoints(2) >= 5) {
            chr.dropMessage(5, "您使用了" + c.getChannelServer().getServerName() + "傳送功能從 " + chr.getMap().getMapName() + " --> " + moveTo.getMapName() + " 楓點減少 5 點。");
            chr.changeMap(moveTo);
            chr.modifyCSPoints(2, -5);
        } else {
            chr.dropMessage(5, "傳送失敗，您今天的免費傳送次數已經用完或者您的楓點不足5點。");
        }
    }

    /*
     * 使用劍刃之壁
     */
    public static void useTempestBlades(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int skillId = slea.readInt();
        int mobCount = slea.readInt(); //攻擊怪物的數量
        List<Integer> moboids = new ArrayList<>();
        for (int i = 0; i < mobCount; i++) {
            int moboid = slea.readInt(); //怪物的工作ID
            moboids.add(moboid);
        }
        MapleStatEffect effect = chr.getEffectForBuffStat(MapleBuffStat.StopForceAtomInfo);
        if (effect != null) {
            if (skillId == 凱撒.意志之劍_重磅出擊) {
                effect = chr.getSkillEffect((effect.getSourceId() == 天使破壞者.索魂精通) ? 凱撒.意志之劍_重磅出擊_1 : 凱撒.意志之劍_重磅出擊);
            }
            chr.dispelEffect(MapleBuffStat.StopForceAtomInfo);
            chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(MapleForceFactory.getInstance().getMapleForce(chr, effect, 0, moboids)), true);
        }
    }

    /*
     * 顯示角色樂豆點信息
     */
    public static void showPlayerCash(MaplePacketReader slea, MapleClient c) {
//        int accId = slea.readInt();
//        int playerId = slea.readInt();
    }

    /*
     * 快速擴充和購買商城道具
     */
    public static void quickBuyCashShopItem(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int accId = slea.readInt();
        int playerId = slea.readInt();
        int mode = slea.readInt();
//        int cssn = slea.readInt();
        slea.skip(4);
        int toCharge = slea.readByte() == 1 ? 1 : 2;
        switch (mode) {
            case 0x0A: //倉庫
                if (chr == null || chr.getMap() == null) {
                    c.sendEnableActions();
                    return;
                }
                if (chr.getId() != playerId || chr.getAccountID() != accId) {
                    c.sendEnableActions();
                    return;
                }
                if (chr.getCSPoints(toCharge) >= 600 && chr.getTrunk().getSlots() < 93) {
                    chr.modifyCSPoints(toCharge, -600, false);
                    chr.getTrunk().increaseSlots((byte) 4);
                    chr.getTrunk().saveToDB();
                    c.announce(MaplePacketCreator.playerCashUpdate(mode, toCharge, chr));
                } else {
                    chr.dropMessage(5, "擴充失敗，點數餘額不足或者倉庫欄位已超過上限。");
                }
                break;
            case 0x0B: //裝備欄 1
            case 0x0C: //消耗欄 2
            case 0x0D: //裝飾欄 3
            case 0x0E: //其他欄 4
            case 0x0F: //特殊欄 5
            case 9111001: // 裝備欄 8格
            case 9112001: // 消耗欄 8格
            case 9113002: // 裝飾欄 8格
            case 9114001: // 其他欄 8格
                if (chr == null || chr.getMap() == null) {
                    c.sendEnableActions();
                    return;
                }
                if (chr.getId() != playerId || chr.getAccountID() != accId) {
                    c.sendEnableActions();
                    return;
                }
                int iv;
                switch (mode) {
                    case 0x0B:
                    case 9111001:
                        iv = 1;
                        break;
                    case 0x0C:
                    case 9112001:
                        iv = 2;
                        break;
                    case 0x0D:
                    case 9113002:
                        iv = 3;
                        break;
                    case 0x0E:
                    case 9114001:
                        iv = 4;
                        break;
                    case 0x0F:
                        iv = 5;
                        break;
                    default:
                        iv = -1;
                }
                int cost = mode > 0x10 ? 180 : 90;
                if (iv > 0) {
                    MapleInventoryType tpye = MapleInventoryType.getByType((byte) iv);
                    if (chr.getCSPoints(toCharge) >= cost && chr.getInventory(tpye).getSlotLimit() < 127) {
                        chr.modifyCSPoints(toCharge, -cost, false);
                        chr.getInventory(tpye).addSlot((byte) (mode > 0x10 ? 8 : 4));
                        c.announce(MaplePacketCreator.playerCashUpdate(mode, toCharge, chr));
                    } else {
                        chr.dropMessage(1, "擴充失敗，點數餘額不足或者欄位已超過上限。");
                    }
                } else {
                    chr.dropMessage(1, "擴充失敗，擴充的類型不正確。");
                }
                break;
            case 5430001:
            case 5790002:
                int neednx = mode == 5430001 ? 3000 : 1000;
                if (c.modifyCSPoints(toCharge, -neednx) && (mode == 5430001 && c.gainAccCharSlot() || mode == 5790002 && c.gainAccCardSlot())) {
                    c.announce(MaplePacketCreator.playerSoltUpdate(mode, c.getCSPoints(1), c.getCSPoints(2)));
                    return;
                }
                c.dropMessage("擴充失敗，點數餘額不足或者欄位已超過上限。");
                break;
        }
    }

    public static void zeroTag(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || !JobConstants.is神之子(chr.getJob())) {
            return;
        }
        chr.zeroTag();
    }

    /**
     * 神之子角色切換 changeZeroLook
     */
    public static void changeZeroLook(MaplePacketReader slea, MapleClient c, MapleCharacter chr, boolean end) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        //上面還有 8位  應該是藍
        int type = slea.readInt();
        boolean b = slea.readByte() == 1;
        String oneInfo = chr.getOneInfo(52999, "zeroMask");
        int mask = oneInfo == null ? 0 : Integer.valueOf(oneInfo);
        ZeroMask zm = ZeroMask.getByType(type);
        if (zm == null) {
            return;
        }
        if (b && !zm.check(mask)) {
            mask |= zm.getValue();
        } else if (zm.check(mask)) {
            mask -= zm.getValue();
        }
        chr.updateOneInfo(52999, "zeroMask", String.valueOf(mask));
        c.announce(MaplePacketCreator.zeroInfo(chr, 0x100, chr.isBeta()));
    }

    //額外攻擊
    public static void ExtraAttack(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int skillId = slea.readInt();//攻擊技能ID
        if (skillId == 傑諾.三角列陣 && slea.available() <= 2) { // B5 FE 26 02 05 01
            return;
        } else if (slea.available() < 12) { // 暗影神偷.暗影霧殺
            if (player.isDebug()) {
                player.dropDebugMessage(1, "[額外攻擊] 額外技能長度異常，技能：" + skillId);
            }
            return;
        }
        int type = slea.readInt();//類型
        int modOid = slea.readInt();
        int tick = slea.readInt();
        if (player.isDebug()) {
            player.dropDebugMessage(1, "[額外攻擊] 開始解析額外技能，技能：" + skillId + " 類型：" + type);
        }
        player.updateTick(tick);
        Item weapon = player.getInventory(MapleInventoryType.EQUIPPED).getItem((JobConstants.is神之子(player.getJob()) && player.isBeta()) ? -10 : (byte) -11);
        MapleWeapon wt = weapon == null ? MapleWeapon.沒有武器 : MapleWeapon.getByItemID(weapon.getItemId());
        int finalskill = player.getStat().getFinalAttackSkill();
        if (finalskill > 0 && wt != MapleWeapon.沒有武器) {
            c.announce(MaplePacketCreator.FinalAttack(tick, player.isFacingLeft(), skillId, finalskill, wt.getWeaponType(), Collections.emptyList()));
        }
    }

    public static void MoveEnergyBall(final MaplePacketReader slea, final MapleClient c) {
        MapleCharacter player = c.getPlayer();
        if (player == null || player.getMap() == null) {
            return;
        }
        B2BodyAttackInfo ai = new B2BodyAttackInfo();
        ai.type = slea.readShort();
        ai.fromId = slea.readInt();
        ai.oid = slea.readInt();
        ai.mapId = player.getMapId();
        switch (ai.type) {
            case 4: {
                ai.pos = slea.readPos();
                slea.readPos();
                ai.skillid = slea.readInt();
                ai.dir = (slea.readByte() > 0);
                ai.time = 900;
                slea.skip(1);
                if (slea.readByte() == 1) {
                    slea.readMapleAsciiString();
                }
                slea.readInt();
                slea.readInt();
                ai.t0 = slea.readShort();
                ai.t1 = slea.readShort();
                ai.t2 = slea.readShort();
                slea.readByte();
                ai.un1 = slea.readInt();
                slea.readInt();
                slea.readInt();
                ai.dirx = slea.readInt();
                ai.diry = slea.readInt();
                break;
            }
            case 0: {
                ai.enerhe = slea.readByte();
                ai.pos = slea.readPos();
                if (ai.enerhe == 5) {
                    ai.dirx = slea.readShort();
                    ai.oidy = slea.readShort();
                } else if (ai.enerhe == 6) {
                    ai.dirx = slea.readInt();
                }
                ai.diry = slea.readShort();
                ai.skillid = slea.readInt();
                ai.level = slea.readShort();
                slea.skip(2);
                ai.t0 = slea.readShort();
                ai.t1 = slea.readShort();
                ai.t2 = slea.readShort();
                break;
            }
            case 3: {
                ai.akl = ai.fromId;
                ai.skillid = slea.readInt();
                ai.level = slea.readInt();
                ai.dirx = slea.readInt();
                ai.diry = slea.readInt();
                break;
            }
            case 5: {
                ai.skillid = slea.readInt();
                ai.level = slea.readInt();
                break;
            }
//            default:{
//                log.warn("Unknown B2BodyAttackType:" + l171.type);
//            }
        }
        if (ai.skillid == 箭神.箭座) {
            player.addHPMP(0, -player.getSkillEffect(ai.skillid).getMpCon(), false);
        }
        final MapleMap map = player.getMap();
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_UserB2BodyResult);
        mplew.writeShort(ai.type);
        mplew.writeInt(ai.fromId);
        mplew.writeInt(ai.mapId);
        switch (ai.type) {
            case 4: {
                mplew.writeShort(1);
                for (int i = 0; i <= 0; ++i) {
                    mplew.write(0);
                    mplew.writePos(ai.pos);
                    mplew.writeInt(ai.time);
                    mplew.writeShort(ai.t0);
                    mplew.writeShort(ai.t1);
                    mplew.writeShort(ai.t2);
                    mplew.write(0);
                    mplew.writeInt(0);
                    mplew.writeInt(ai.skillid);
                    mplew.writeBool(ai.dir);
                    mplew.writeInt(ai.un1);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.write(0);
                    mplew.writeInt(ai.dirx * (ai.dir ? -1 : 1));
                    mplew.writeInt(ai.diry);
                }
                break;
            }
            case 3: {
                mplew.writeInt(ai.akl);
                mplew.writeInt(ai.skillid);
                mplew.writeInt(ai.dirx);
                mplew.writeInt(ai.diry);
                break;
            }
            case 5: {
                mplew.writeInt(ai.skillid);
                mplew.writeInt(ai.level);
                break;
            }
            case 0: {
                mplew.writeShort(1);
                for (int j = 0; j <= 0; ++j) {
                    mplew.writeInt(ai.oid);
                    mplew.write(ai.enerhe);
                    mplew.writeBool(false);
                    mplew.writePos(ai.pos);
                    if (ai.enerhe == 5) {
                        mplew.writeShort(ai.dirx);
                        mplew.writeShort(ai.oidy);
                    } else if (ai.enerhe == 6) {
                        mplew.writeInt(ai.dirx);
                    }
                    mplew.writeShort(ai.diry);
                    mplew.writeShort(ai.t0);
                    mplew.writeShort(ai.t1);
                    mplew.writeShort(ai.t2);
                    mplew.writeInt(ai.skillid);
                    mplew.writeShort(ai.level);
                    mplew.write(0);
                }
                break;
            }
        }
        map.broadcastMessage(player, mplew.getPacket(), ai.type != 4);
        if (ai.type == 4) {
            mplew = new MaplePacketLittleEndianWriter();
            mplew.writeOpcode(SendPacketOpcode.UserB2BodyTarget);
            mplew.writeInt(4);
            mplew.writeInt(ai.oid);
            c.announce(mplew.getPacket());
        }
    }

    public static void SpawnArrowsTurret(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        byte side = slea.readByte();
        Point pos = slea.readPosInt();

        MapleStatEffect effect = chr.getSkillEffect(箭神.箭座);
        if (effect != null) {
            MapleFieldAttackObj tospawn = new MapleFieldAttackObj(1, chr.getId(), effect.getU() * 1000);
            tospawn.setPosition(pos);
            tospawn.setSide(side > 0);
            for (MapleFieldAttackObj obj : chr.getMap().getFieldAttackObject(chr)) {
                obj.cancel();
                chr.getMap().disappearMapObject(obj);
            }
            chr.getMap().createdFieldAttackObject(tospawn);

            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            mplew.writeShort(SendPacketOpcode.LP_FIELDATTACKOBJ_SETATTACK.getValue());
            mplew.writeInt(tospawn.getObjectId());
            mplew.writeInt(0);
            c.announce(mplew.getPacket());
        }
    }

    public static void showTrackFlames(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int skillId = slea.readInt();
        slea.skip(1);
        int skillLevel = chr.getSkillLevel(skillId);
        Skill skill = SkillFactory.getSkill(skillId);
        MapleStatEffect effect = skill.getEffect(skillLevel);
        if (effect != null) {
            int[] skills = {烈焰巫師.元素_火焰IV, 烈焰巫師.元素_火焰III, 烈焰巫師.元素_火焰II, 烈焰巫師.元素_火焰};
            for (int s : skills) {
                skillLevel = chr.getSkillLevel(s);
                if (skillLevel > 0) {
                    skill = SkillFactory.getSkill(s);
                    effect = skill.getEffect(skillLevel);
                    if (effect != null) {
                        effect.applyTo(chr);
                        break;
                    }
                }
            }
        }
    }

    public static void selectJaguar(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        slea.skip(4);
        int id = slea.readInt();
        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.JAGUAR)).setCustomData(String.valueOf((id + 1) * 10));
        c.announce(MaplePacketCreator.updateJaguar(chr));
    }

    public static void updateSoulEffect(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        boolean open = slea.readByte() == 1;
        int questid = 26535;
        MapleQuest q = MapleQuest.getInstance(questid);
        if (q == null) {
            return;
        }
        MapleQuestStatus status = chr.getQuestNAdd(q);
        if (status.getCustomData() == null || status.getCustomData().equalsIgnoreCase("effect=1")) {
            open = false;
        } else {
            open = true;
        }
        String data = open ? "effect=1" : "effect=0";
        status.setCustomData(data);
        chr.updateInfoQuest(questid, data);
        chr.getMap().broadcastMessage(MaplePacketCreator.updateSoulEffect(chr.getId(), open));
    }

    public static void onReward(MaplePacketReader slea, MapleClient c) {
        slea.readInt();
        int id = slea.readInt();
        slea.readInt(); // type
        slea.readInt(); // ItemID
        slea.readInt(); // Item Quantity
        slea.readInt(); // no idea
        slea.readLong(); // no idea
        slea.readInt(); // no idea
        slea.readInt(); // MaplePoint Amount
        slea.readLong(); // Meso Amount
        slea.readInt(); // Exp Amount
        slea.readInt(); // no idea
        slea.readInt(); // no idea
        slea.readMapleAsciiString(); // no idea
        slea.readMapleAsciiString(); // no idea
        slea.readMapleAsciiString(); // no idea
        slea.readInt();
        slea.readInt();
        slea.readInt();
        slea.readByte();
        slea.readShort();
        slea.readByte();
        byte mode = slea.readByte();
        if (mode == 1) {
            slea.readByte();
        }
        if (slea.available() > 0) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropDebugMessage(2, "[領取獎勵] 有未讀完數據");
            }
            return;
        }
        if (mode == 1) { // 接收禮物
            MapleReward reward = c.getPlayer().getReward(id);
            if (reward == null) {
                c.announce(MaplePacketCreator.receiveReward(id, (byte) 0x21, 0));
                c.sendEnableActions();
                return;
            }
            if (reward.getReceiveDate() > 0 && reward.getReceiveDate() > System.currentTimeMillis()) {
                c.announce(MaplePacketCreator.receiveReward(id, (byte) 0x21, 0));
                c.sendEnableActions();
                return;
            }
            if (reward.getExpireDate() > 0 && reward.getExpireDate() <= System.currentTimeMillis()) {
                c.getPlayer().deleteReward(reward.getId());
                c.announce(MaplePacketCreator.receiveReward(id, (byte) 0x21, 0));
                c.sendEnableActions();
                return;
            }
            final MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            byte msg = 0x21;
            long quantity = 0;
            switch (reward.getType()) {
                case MapleReward.道具:
                case MapleReward.現金道具:
                    quantity = reward.getAmount();
                    if (!MapleInventoryManipulator.checkSpace(c, reward.getItemId(), (int) quantity, "")) {
                        msg = (byte) (!ii.isCash(reward.getItemId()) ? 0x15 : 0x16);
                        break;
                    }
                    msg = (byte) (!ii.isCash(reward.getItemId()) ? 0x0C : 0x0D);
                    int period = 0;
                    if (ItemConstants.getInventoryType(reward.getItemId(), false).equals(MapleInventoryType.EQUIP) && !ItemConstants.類型.可充值道具(reward.getItemId())) {
                        quantity = 1;
                        Equip item = ii.getEquipById(reward.getItemId());
                        if (period > 0) {
                            item.setExpiration(System.currentTimeMillis() + (period * 24 * 60 * 60 * 1000));
                        }
                        item.setGMLog("從獎勵箱中獲得, 時間 " + DateUtil.getCurrentDate());
                        final String name = ii.getName(reward.getItemId());
                        if (reward.getItemId() / 10000 == 114 && name != null && name.length() > 0) { // medal
                            final String str = "<" + name + ">獲得稱號。";
                            c.getPlayer().dropMessage(-1, str);
                            c.getPlayer().dropMessage(5, str);
                        }
                        item.setSN(MapleInventoryManipulator.getUniqueId(item.getItemId(), -1));
                        MapleInventoryManipulator.addbyItem(c, item.copy());
                    } else {
                        final MaplePet pet;
                        if (ItemConstants.類型.寵物(reward.getItemId())) {
                            pet = MaplePet.createPet(reward.getItemId());
                            period = ii.getLife(reward.getItemId());
                        } else {
                            pet = null;
                        }
                        MapleInventoryManipulator.addById(c, reward.getItemId(), (int) quantity, "", pet, period, "從獎勵箱中獲得, 時間 " + DateUtil.getCurrentDate());
                    }
                    c.getPlayer().deleteReward(reward.getId(), false);
                    break;
                case MapleReward.楓點:
                    if (c.getPlayer().getCSPoints(2) + (int) reward.getAmount() >= 0) {
                        c.getPlayer().modifyCSPoints(2, (int) reward.getAmount(), false);
                        c.getPlayer().deleteReward(reward.getId(), false);
                        quantity = (int) reward.getAmount();
                        msg = 0x0B;
                    } else {
                        msg = 0x14;
                    }
                    break;
                case MapleReward.楓幣:
                    if (c.getPlayer().getMeso() + reward.getAmount() < Long.MAX_VALUE && c.getPlayer().getMeso() + reward.getAmount() > 0) {
                        c.getPlayer().gainMeso(reward.getAmount(), true, true);
                        c.getPlayer().deleteReward(reward.getId(), false);
                        quantity = (int) reward.getAmount();
                        msg = 0x0E;
                    } else {
                        msg = 0x17;
                    }
                    break;
                case MapleReward.經驗:
                    if (c.getPlayer().getLevel() < ServerConfig.CHANNEL_PLAYER_MAXLEVEL) {
                        c.getPlayer().gainExp(reward.getAmount(), true, true, true);
                        c.getPlayer().deleteReward(reward.getId(), false);
                        quantity = (int) reward.getAmount();
                        msg = 0x0F;
                    } else {
                        msg = 0x18;
                    }
                    break;
                default:
                    if (c.getPlayer().isAdmin()) {
                        c.getPlayer().dropDebugMessage(2, "[領取獎勵] 未處理領取類型[" + reward.getType() + "]");
                    }
                    break;
            }
            c.announce(MaplePacketCreator.receiveReward(reward.getId(), msg, quantity));
        } else if (mode == 2) { // 拒絕禮物
            c.getPlayer().deleteReward(id);
            c.sendEnableActions();
            return;
        } else if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropDebugMessage(2, "[領取獎勵] 未處理操作類型[" + mode + "]");
        }
    }

    public static void effectSwitch(MaplePacketReader slea, MapleClient c) {
        int pos = slea.readInt();
        c.getPlayer().updateEffectSwitch(pos);
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), EffectPacket.getEffectSwitch(c.getPlayer().getId(), c.getPlayer().getEffectSwitch()), false);

        //更新自己看到的效果
        c.announce(EffectPacket.getEffectSwitch(c.getPlayer().getId(), c.getPlayer().getEffectSwitch()));

        c.sendEnableActions();
    }

    public static void DailyGiftRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        final MapleDailyGift mdg = MapleDailyGift.getInstance();
        final int today = Calendar.getInstance().get(Calendar.MONTH) + 1;
        int itemid = slea.readInt();
        int day = Integer.valueOf(player.getWorldShareInfo(7, "day"));
        final int count = Integer.valueOf(player.getWorldShareInfo(7, "count"));
        final int date = Integer.valueOf(player.getWorldShareInfo(7, "date"));
        final int n2 = date / 100 % 100;
        final String current = DateUtil.getFormatDate(System.currentTimeMillis(), "yyyyMMdd");
        final int intValue4 = Integer.valueOf(current);
        final String mobDate = player.getQuestInfo(16700, "date");
        final int mobCount = Integer.valueOf(player.getQuestInfo(16700, "count"));
        if (!current.equals(mobDate)) {
            player.updateOneQuestInfo(16700, "date", current);
            player.updateOneQuestInfo(16700, "count", "0");
            c.announce(DailyGiftPacket.dailyGiftResult(2, 14, itemid, 15 - player.getOnlineTime()));
            return;
        }
        if (mobCount < 999) {
            c.announce(DailyGiftPacket.dailyGiftResult(2, 14, itemid, 15 - player.getNowOnlineTime()));
            return;
        }
        boolean b1316 = intValue4 > date;
        if (n2 != today) {
            day = 0;
            b1316 = true;
        }
        final MapleDailyGift.DailyGiftMonth cx = mdg.getRewards();
        if (b1316 && cx != null) {
            final MapleDailyGift.DailyGiftInfo b1317;
            if ((b1317 = cx.dailyGifts.get(day + 1)) != null) {
                final int akt = b1317.itemId;
                final int akv = b1317.term;
                if (akt != itemid) {
                    c.announce(DailyGiftPacket.dailyGiftResult(2, 6, itemid, 0));
                    return;
                }
                player.updateWorldShareInfo(7, "date", String.valueOf(intValue4));
                player.updateWorldShareInfo(7, "count", String.valueOf(count + 1));
                player.updateWorldShareInfo(7, "day", String.valueOf(day + 1));
                MapleInventoryManipulator.addById(c, itemid, b1317.count, "", null, (long) (akv * 24 * 60 * 60 * 1000), "通過每日簽到獲得!");
                c.announce(DailyGiftPacket.dailyGiftResult(2, 2, itemid, 0));
                c.announce(DailyGiftPacket.dailyGiftResult(2, 0, itemid, 0));
            } else {
                c.announce(DailyGiftPacket.dailyGiftResult(2, 6, itemid, 0));
            }
            return;
        }
        c.announce(DailyGiftPacket.dailyGiftResult(2, 5, itemid, 0));
        c.sendEnableActions();
    }

    public static void spawnSpecial(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        slea.readInt();
        MapleStatEffect effect = chr.getSkillEffect(skillid);
        if (effect == null) {
            return;
        }
        Point pos;
        switch (skillid) {
            default:
                if (effect.getLt2() != null) {
                    pos = effect.getLt2();
                } else {
                    pos = effect.getLt();
                }
                break;
        }
        int total = slea.readInt();
        for (int i = 0; i < total; i++) {
            slea.readInt();
            slea.readShort();
            int x1 = slea.readInt();
            int y1 = slea.readInt();
            int x2 = slea.readInt();
            int y2 = slea.readInt();
            Rectangle bounds = new Rectangle(x1, y1, x2 - x1, y2 - y1);
            MapleAffectedArea mist = new MapleAffectedArea(bounds, chr, effect, new Point(x1 - pos.x, y1 - pos.y));
            chr.getMap().createAffectedArea(mist);
        }
    }

    public static void showKSPsychicGrabHanlder(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int skillId = slea.readInt();
        short skilllevel = slea.readShort();
        int n1 = slea.readInt();
        int n2 = slea.readInt(); // 6
        if (chr.getSkillEffect(skillId) == null) {
            return;
        }
        List<KSPsychicSkillEntry> infos = new LinkedList<>();
        int count = chr.getSkillLevel(凱內西斯.擷取心靈2) > 0 ? 5 : 3;
        for (int i = 0; i < count; i++) {
            KSPsychicSkillEntry ksse = new KSPsychicSkillEntry();
//            ksse.setOid(chr.getMap().getKSPsychicOid());
            slea.skip(1);
            ksse.setOid(slea.readInt());
            slea.skip(4);
            ksse.setMobOid(slea.readInt());
            ksse.setObjectid(slea.readShort());
            ksse.setN5(slea.readInt());
            slea.readShort();
            slea.readByte();
            ksse.setN1(slea.readInt());
            ksse.setN2(slea.readInt());
            ksse.setN3(slea.readInt());
            ksse.setN4(slea.readInt());
            infos.add(ksse);
        }

        chr.getMap().addKSPsychicObject(chr.getId(), skillId, infos);

        if (!infos.isEmpty()) {
            chr.getMap().broadcastMessage(EffectPacket.showKSPsychicGrab(chr.getId(), skillId, skilllevel, infos, n1, n2), chr.getPosition());
        }
        infos.clear();
    }

    public static void showKSPsychicAttackHanlder(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        short skilllevel = slea.readShort();
        int n1 = slea.readInt();
        int n2 = slea.readInt();
        byte n3 = slea.readByte();
        int n4 = slea.readInt();
        int n5 = -1, n6 = -1;
        if (n4 != 0) {
            n5 = slea.readInt();
            n6 = slea.readInt();
        }
        int n8 = -1, n9 = -1;
        int n7 = slea.readInt();
        if (n7 != 0) {
            n8 = slea.readInt();
            n9 = slea.readInt();
        }
        int n10 = -1, n11 = -1;
//        if (skillid == 凱內西斯.猛烈心靈2_ || skillid == 凱內西斯.猛烈心靈2_最後一擊 || skillid == 凱內西斯.終極技_心靈射擊) {
//            n10 = slea.readInt();
//            n11 = slea.readInt();
//        }
//        int n8 = (int) slea.readLong();
//        int n9 = (int) slea.readLong();
//        int n10 = (int) slea.readLong();
//        int n11 = -1, n12 = -1;
//        if (skillid == 凱內西斯.猛烈心靈2_ || skillid == 凱內西斯.猛烈心靈2_最後一擊 || skillid == 凱內西斯.終極技_心靈射擊) {
//            n11 = (int) slea.readLong();
//            n12 = (int) slea.readLong();
//        }

        if (chr.getSkillLevel(SkillConstants.getLinkedAttackSkill(skillid)) != skilllevel) {
            return;
        }
        MapleStatEffect effect = SkillFactory.getSkill(skillid).getEffect(skilllevel);
        int ppcon = effect.getPPCon();
        if (ppcon > 0) {
            chr.gainPP(-ppcon);
        }
//        else {
//            chr.dropMessage(5, "使用技能所需的超自然能量不足。");
//            return;
//        }
        chr.getMap().broadcastMessage(chr, EffectPacket.showKSPsychicAttack(chr.getId(), skillid, skilllevel, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11), false);

    }

    public static void showKSPsychicReleaseHanlder(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int skillid = slea.readInt();
        int skilllevel = slea.readInt();
        int moboid = slea.readInt();
        int objectid = slea.readInt();
        if (chr.getSkillEffect(skillid) == null) {
            return;
        }
        int oid = chr.getMap().removeKSPsychicObject(chr.getId(), skillid, moboid != 0 ? moboid : objectid);
        if (oid > 0) {
            chr.getMap().broadcastMessage(EffectPacket.showKSPsychicRelease(chr.getId(), oid), chr.getPosition());
        }
    }

    public static void showGiveKSUltimate(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int mode = slea.readInt();
        int type = slea.readInt();
        slea.skip(4);
        int oid = slea.readInt();
        int skillid = slea.readInt();
        short skilllevel = slea.readShort();
        int n1 = slea.readInt();
        byte n2 = slea.readByte();
        short n3 = slea.readShort();
        short n4 = slea.readShort();
        short n5 = slea.readShort();
        int n6 = slea.readInt();
        int n7 = slea.readInt();
        Skill skill = SkillFactory.getSkill(skillid);
        if (skill == null) {
            return;
        }
        MapleStatEffect effect = skill.getEffect(skilllevel);
        int ppcon = effect.getPPCon();
        if (ppcon > 0) {
            if (chr.getSpecialStat().getPP() >= ppcon) {
                chr.gainPP(-ppcon);
            } else {
                chr.dropMessage(5, "施展技能所需的心魂點數不足。");
                return;
            }
        }
        if (chr.getSkillEffect(skillid) == null) {
            return;
        }
        if (skillid == 凱內西斯.終極技_BPM) {
            chr.getMap().addKSUltimateSkill(chr.getId(), Math.abs(oid));
        } else if (skillid == 凱內西斯.永恆壞滅) {
            chr.gainPP(30);
        } else if (skillid == 凱內西斯.心靈龍捲風) {
            chr.registerSkillCooldown(凱內西斯.心靈龍捲風_1, 0, true);
            chr.registerSkillCooldown(凱內西斯.心靈龍捲風_2, 0, true);
            chr.registerSkillCooldown(凱內西斯.心靈龍捲風_3, 0, true);
            chr.getSkillEffect(凱內西斯.心靈龍捲風).applyTo(chr);
        }
        chr.send_other(EffectPacket.showGiveKSUltimate(chr.getId(), mode, type, oid, skillid, skilllevel, n1, n2, n3, n4, n5, n6, n7), true);
    }

    public static void showAttackKSUltimate(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int oid = slea.readInt();
        short type = slea.readShort();
        slea.readInt();
        slea.readInt();
        if (chr.getMap().isKSUltimateSkill(chr.getId(), oid)) {
            chr.gainPP(-1); //每次攻擊扣除1點PP
        }
        chr.getMap().broadcastMessage(EffectPacket.showAttackKSUltimate(oid, type), chr.getPosition());
    }

    public static void showKSMonsterEffect(MaplePacketReader lea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        if (!JobConstants.is凱內西斯(chr.getJob())) {
            return;
        }
        int skillid = lea.readInt();
        short skilllevel = lea.readShort();
        int areaid = lea.readInt();
        lea.skip(1);
        lea.skip(8);
        short size = lea.readShort();
        Skill skill = SkillFactory.getSkill(skillid);
        MapleMonster monster;
        if (skill != null && skillid != 凱內西斯.心靈龍捲風) {
            MapleStatEffect effect = skill.getEffect(skilllevel);
            if (effect != null) {
                for (int i = 0; i < size; i++) {
                    monster = chr.getMap().getMonsterByOid(lea.readInt());
                }
            }
        }
    }

    public static void showCancelKSUltimate(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int oid = slea.readInt();
        if (!JobConstants.is凱內西斯(chr.getJob())) {
            return;
        }
        chr.getMap().removeKSUltimateSkill(chr.getId(), oid);
        chr.getMap().broadcastMessage(EffectPacket.showCancelKSUltimate(chr.getId(), Math.abs(oid)), chr.getPosition());
    }

    public static void showTornadoKSUltimate(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int oid = slea.readInt();
        if (!JobConstants.is凱內西斯(chr.getJob())) {
            return;
        }
        chr.getMap().broadcastMessage(EffectPacket.showAttackKSUltimate(oid, 1), chr.getPosition());
    }

    public static void selectChair(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        chr.dropMessage(1, "該功能暫未開放。");
        c.sendEnableActions();
    }

    public static void startBattleStatistics(MaplePacketReader slea, MapleClient c) {
        if (slea.readByte() == 1) {
            c.announce(MaplePacketCreator.startBattleStatistics());
        }
    }

    public static void callFriends(MaplePacketReader lea, MapleClient c, MapleCharacter chr) {
        lea.skip(1);
        int skillid = lea.readInt();
        if (skillid == 幻獸師.帶朋友來) {
            MapleParty party = chr.getParty();
            if (party != null) {
                party.getMemberList().parallelStream().filter(p -> p.isOnline() && p.getChannel() == chr.getClient().getChannel() && p.getMapid() != chr.getMapId()).forEach(m -> {
                    MapleCharacter member = ChannelServer.getCharacterById(m.getId());
                    if (member != null) {
                        member.changeMap(chr.getMap(), chr.getPosition());
                    }
                });
            }
        }
    }

    public static void specialOperation(MaplePacketReader lea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        lea.skip(1);
        int nPacketSize = lea.readShort();
        int useType = lea.readInt();
        SpecialPacket.SpecialPacketType spType = SpecialPacket.SpecialPacketType.NONE;
        for (SpecialPacket.SpecialPacketType sType : SpecialPacket.SpecialPacketType.values()) {
            if (sType.ordinal() == useType) {
                spType = sType;
                break;
            }
        }
        switch (spType) {
            case NONE:
            case SKILL_INNER_STORM:
            default: {
                if (player.isGm()) {
                    player.dropDebugMessage(2, "[SpecialOperation] 操作錯誤" + spType.name() + "(" + useType + ")");
                }
                break;
            }
            case SKILL_INNER_GLARE: {
                short mode = lea.readShort();
                switch (mode) {
                    case 3: {
                        int size = lea.readReversedVarints();
                        List<Integer> skillIds = new ArrayList();
                        StringBuilder sb = new StringBuilder();
                        for (int i = 0; i < size; i++) {
                            int skillId = lea.readInt();
                            if (player.getSkillLevel(skillId) > 0) {
                                skillIds.add(skillId);
                                sb.append(skillId).append(",");
                            }
                        }
                        if (sb.length() > 0) {
                            player.setKeyValue("InnerGlareBuffs", sb.substring(0, sb.length() - 1));
                        }
                        c.announce(SpecialPacket.singleSpecialResult(player.getId(), SpecialPacket.SpecialPacketType.SKILL_INNER_GLARE, new InnerGlareSkillsPacket(skillIds)));
                    }
                }
                break;
            }
            case FAMILIAR_CARDS: {
                short mode = lea.readShort();
                switch (mode) {
                    case 1: { // 召喚萌獸
                        final int int1 = lea.readInt();
                        if (player.getFamiliars().containsKey(int1)) {
                            player.spawnFamiliar(player.getFamiliars().get(int1));
                            player.setFamiliarsChanged(true);
                            return;
                        }
                        break;
                    }
                    case 2: { // 收回萌獸
                        player.removeFamiliar();
                        player.setFamiliarsChanged(true);
                        break;
                    }
                    case 3: {
                        short slot = lea.readShort();
                        Item item = player.getInventory(MapleInventoryType.USE).getItem(slot);
                        if (item == null) {
                            break;
                        }
                        if (item.getQuantity() < 1 || item.getItemId() / 10000 != 287) {
                            c.sendEnableActions();
                            return;
                        }
                        int familiarID = ItemConstants.getFamiliarByItemID(item.getItemId());
                        if (familiarID == 0) {
                            player.dropMessage(1, "這個萌獸卡無法使用。");
                            c.sendEnableActions();
                            return;
                        }
                        if (player.getFamiliars().size() >= 60) {
                            player.dropMessage(1, "萌獸圖鑒數量已經達到最大值!");
                            c.sendEnableActions();
                            return;
                        }
                        if (item.getFamiliarCard() == null) {
                            item.setFamiliarCard(new FamiliarCard((byte) 0));
                        }
                        MonsterFamiliar mf = new MonsterFamiliar(c.getPlayer().getId(), familiarID, item.getFamiliarCard());
                        mf.setIndex(player.getFamiliars().size());
                        player.addFamiliarsInfo(mf);
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false, false);
                        player.updateFamiliars();
//                        c.announce(FamiliarPacket.addFamiliarCard(player, mf));
                        break;
                    }
                    case 6: {
                        final int int2 = lea.readInt();
                        lea.skip(4);
                        short exp = 0;
                        int fee = 0;
                        final byte b1316 = (byte) (lea.readByte() / 2);
                        final HashMap<Integer, Integer> hashMap = new HashMap<>();
                        final MonsterFamiliar t311;
                        if ((t311 = player.getFamiliars().get(int2)) == null) {
                            break;
                        }
                        int[] C_upgradeR = new int[]{30, 35, 40, 50, 60};
                        int[] B_upgradeR = new int[]{20, 30, 35, 40, 50};
                        int[] A_upgradeR = new int[]{5, 10, 15, 20, 30};
                        int[] S_upgradeR = new int[]{2, 5, 10, 15, 20};
                        int[] SS_upgradeR = new int[]{1, 2, 5, 10, 15};
                        int[] upgradeR;
                        for (byte b1317 = 0; b1317 < b1316; ++b1317) {
                            final int int3 = lea.readInt();
                            lea.skip(4);
                            final MonsterFamiliar t312;
                            if ((t312 = player.getFamiliars().get(int3)) == null) {
                                return;
                            }
                            switch (t311.getGrade()) {
                                case 1:
                                    upgradeR = B_upgradeR;
                                    break;
                                case 2:
                                    upgradeR = A_upgradeR;
                                    break;
                                case 3:
                                    upgradeR = S_upgradeR;
                                    break;
                                case 4:
                                    upgradeR = SS_upgradeR;
                                    break;
                                case 0:
                                default:
                                    upgradeR = C_upgradeR;
                                    break;
                            }
                            final short shortValue = (short) (ii.getFamiliarTable_rchance().get(t312.getGrade()).get(t311.getGrade()) + 1);
                            final short addExp = (short) (Randomizer.nextInt(100) < upgradeR[t312.getGrade()] ? 100 : (Randomizer.nextInt(100) < shortValue * 10) ? (shortValue * 10) : shortValue);
                            exp += addExp;
                            hashMap.put(int3, (int) addExp);
                            fee += 50000 * (t311.getGrade() + 1);
                            if ((5 - t311.getLevel()) * 100 <= exp) {
                                break;
                            }
                        }
                        if (player.getMeso() >= fee) {
                            for (Integer integer : hashMap.keySet()) {
                                player.removeFamiliarsInfo(integer);
                            }
                            t311.gainExp(exp);
                            player.gainMeso(-fee, false);
                            c.announce(SpecialPacket.familiarGainExp(player.getId(), hashMap));
                            player.updateFamiliars();
                            return;
                        }
                        break;
                    }
                    case 8: {
                        final int int4 = lea.readInt();
                        lea.skip(4);
                        final int int5 = lea.readInt();
                        lea.skip(4);
                        if (!player.getFamiliars().containsKey(int4) || !player.getFamiliars().containsKey(int5)) {
                            break;
                        }
                        final MonsterFamiliar t313 = player.getFamiliars().get(int4);
                        final MonsterFamiliar t314 = player.getFamiliars().get(int5);
                        if (t313 == null || t314 == null) {
                            c.sendEnableActions();
                            return;
                        }
                        final int n4 = (50000 * (t313.getGrade() + 1) << 1);
                        if (t313.getGrade() == t314.getGrade() && t314.getLevel() == 5 && t314.getLevel() == 5 && player.getMeso() >= n4) {
                            final MonsterFamiliar t316;
                            final MonsterFamiliar t315 = t316 = t313;
                            t315.setGrade((byte) (t315.getGrade() + 1));
                            t316.setLevel((byte) 1);
                            if (t316.getGrade() >= 4) {
                                t316.setGrade((byte) 4);
                            }
                            player.removeFamiliarsInfo(int5);
                            player.gainMeso((long) (-n4), true);
                            c.announce(SpecialPacket.upgradeFamiliar(player.getId()));
                            player.updateFamiliars();
                        }
                        break;
                    }
                    case 11: {
                        final int int6 = lea.readInt();
                        lea.skip(4);
                        if (player.getFamiliars().containsKey(int6)) {
                            int size = lea.readByte() >> 1;
                            if (size < 4 || size > 13) {
                                player.dropMessage(1, "不適用於萌獸名稱的長度。");
                                return;
                            }
                            player.getFamiliars().get(int6).setName(lea.readAsciiString(size));
                            player.setFamiliarsChanged(true);
                            player.updateFamiliars();
                            return;
                        }
                        break;
                    }
                    case 12: {
                        final int int7 = lea.readInt();
                        lea.skip(4);
                        if (player.getFamiliars().containsKey(int7)) {
                            player.removeFamiliarsInfo(int7);
                            player.updateFamiliars();
                            return;
                        }
                        break;
                    }
                    case 13: {
                        int oid = lea.readInt();
                        lea.readInt();
                        if (player.getFamiliars().containsKey(oid)) {
                            int price = ServerConfig.FAMILIAR_SEAL_COST;
                            if (price > 0) {
                                if (player.getCSPoints(2) >= price) {
                                    if (player.getSpace(2) >= 1) {
                                        player.modifyCSPoints(2, -price);
                                        MonsterFamiliar familiar = c.getPlayer().getFamiliars().remove(oid);
                                        if (familiar != null) {
                                            int monsterCardID = ii.getFamiliar(familiar.getFamiliar()).getMonsterCardID();
                                            Item card = new Item(monsterCardID, (byte) 0, (short) 1);
                                            card.setFamiliarCard(familiar.createFamiliarCard());
                                            MapleInventoryManipulator.addbyItem(c, card, false);
                                            player.updateFamiliars();
                                            player.setFamiliarsChanged(true);
                                            //c.announce(FamiliarPacket.addFamiliarCard(player, familiar));
                                        }
                                    } else {
                                        player.dropAlertNotice("消耗欄空間不足!");
                                    }
                                } else {
                                    player.dropAlertNotice("沒有足夠的楓點!");
                                }
                            } else {
                                player.dropAlertNotice("未知錯誤2");
                            }
                        } else {
                            player.dropAlertNotice("未知錯誤1");
                        }
                        break;
                    }
                    case 14: {
                        short slot = lea.readShort();
                        lea.skip(2);
                        int index = lea.readInt();
                        Item item = player.getInventory(MapleInventoryType.CASH).getItem(slot);
                        MonsterFamiliar mf = c.getPlayer().getFamiliars().get(index);
                        if (item == null || item.getItemId() != 5743003 || mf == null) {
                            c.sendEnableActions();
                            return;
                        }
                        if (Auth.checkPermission("FamiliarCubeScript")) {
                            player.getTempValues().put("resetOptionsFamiliar", mf);
                            NPCScriptManager.getInstance().start(c, 9310362, "洗萌獸方塊");
                            c.sendEnableActions();
                        } else {
                            mf.initOptions();
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, slot, (short) 1, false, false);
                            player.setFamiliarsChanged(true);
                            player.updateFamiliars();
                        }
                        break;
                    }
                    case 16: { // 選擇萌獸組合技能
                        final int selected = lea.readInt();
                        if (!player.setSelectedFamiliarTeamStat(selected)) {
                            return;
                        }
                        c.announce(SpecialPacket.changeTeamStatSelected(player, selected));
                        break;
                    }
                    case 17: { // 裝備萌獸組合技能
                        final int optionIndex = lea.readInt();
                        if (!player.changeFamiliarTeamStat(optionIndex)) {
                            return;
                        }
                        c.announce(SpecialPacket.changeTeamStats(player, player.getFamiliarTeamStats()));
                        break;
                    }
                }
                break;
            }
            case FAMILIAR_LIFE: {
                switch (lea.readShort()) {
                    case 1: {
                        lea.readReversedVarints(); // PacketSize
                        final int gatherDuration = lea.readInt();
                        final int nVal1 = lea.readInt();
                        final Point oPos = lea.readPos();
                        final Point mPos = lea.readPos();
                        try {
                            List<LifeMovementFragment> res = MovementParse.parseMovement(lea, 6);
                            if (res == null) {
                                log.error("ParseMovement Null - Familiar Card");
                                if (player.isDebug()) {
                                    player.dropMessage(-1, "萌獸移動包出錯 - ParseMovement Null");
                                }
                            } else if (player.getSummonedFamiliar() != null && res.size() > 0) {
                                MovementParse.updatePosition(res, player.getSummonedFamiliar(), 0);
                                byte[] packet = SpecialPacket.familiarMove(player.getId(), gatherDuration, nVal1, oPos, mPos, res);
                                player.getMap().objectMove(player.getId(), player.getSummonedFamiliar(), packet);
                            }
                        } catch (Exception e) {
                            log.error("ParseMovement Error - Familiar Card", e);
                            if (player.isDebug()) {
                                player.dropMessage(-1, "萌獸移動包出錯 - ParseMovement Error");
                            }
                        }
                        break;
                    }
                    case 3: {
                        lea.readInt();
                        final byte b1317 = (byte) (lea.readByte() / 2);
                        final MonsterFamiliar summonedFamiliar = player.getSummonedFamiliar();
                        final HashMap<Integer, Integer> hashMap = new HashMap<>();
                        if (summonedFamiliar != null) {
                            for (byte i = 0; i < b1317 && i < 8; ++i) {
                                final int int1 = lea.readInt();
                                final MapleMonster mobObject;
                                if ((mobObject = player.getMap().getMobObject(int1)) != null && mobObject.isAlive()) {
                                    hashMap.put(int1, (int) Math.min(player.getCalcDamage().getRandomDamage(player, true) * summonedFamiliar.getPad() * (Math.max(0.1, 100 - mobObject.getStats().getPDRate()) / 100.0), 9.9999999E7));
                                }
                            }
                            lea.readByte();
//                            final ArrayList<FamiliarPacket.FamiliarPacketList> list2 = new ArrayList<>();
//                            final FamiliarPacket.FamiliarPacketList a1270 = new FamiliarPacket.FamiliarPacketList(3, player.getFamiliarOpIdx().get());
//                            (a1270).packetList.add(new FamiliarPacket.FamiliarAttackPacket(0, hashMap));
//                            list2.add(a1270);
                            final MapleMap map = player.getMap();
//                            map.broadcastMessage(player, FamiliarPacket.showFamiliarInfo(player.getId(), list2), true);
                            for (final Map.Entry<Integer, Integer> entry : hashMap.entrySet()) {
                                final MapleMonster mobObject2;
                                if ((mobObject2 = player.getMap().getMobObject(entry.getKey())) != null) {
//                                    mobObject2.damage(player, 0, (long)entry.getValue(), false);
                                }
                            }
                            break;
                        }
                        break;
                    }
                }
                break;
            }
        }
    }

    public static void UseTowerChairSetting(MaplePacketReader lea, MapleClient c, MapleCharacter player) {
        lea.skip(4);
        for (int i = 0; i < 6; ++i) {
            int n2 = lea.readInt();
            if (player.haveItem(n2)) {
                player.updateOneInfo(7266, String.valueOf(i), String.valueOf(n2));
                continue;
            }
            player.updateOneInfo(7266, String.valueOf(i), "0");
        }
        player.getClient().announce(MaplePacketCreator.useTowerChairSetting());
    }

    public static void VCoreOperation(final MaplePacketReader slea, MapleClient c, final MapleCharacter player) {
        if (player == null || player.getMap() == null || player.getLevel() < 200) {
            return;
        }
        int action = slea.readInt();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        switch (action) {
            case 0: {
                int vcoreoid = slea.readInt();
                slea.readInt();
                slea.readInt();
                int index = slea.readInt();
                VCoreSkillEntry vcoreskill = player.getVCoreSkill().get(vcoreoid);
                if (vcoreskill == null || vcoreskill.getSlot() != 1) {
                    break;
                }
                if (player.checkVCoreSkill(vcoreskill.getSkill(1))) {
                    c.sendEnableActions();
                    return;
                }
                if (index < 0 && (index = player.getNextVMatrixSlot()) < 0) {
                    c.sendEnableActions();
                    return;
                }
                VMatrixSlot slot = player.getVMatrixSlot().get(index);
                final int left = (player.getLevel() - 200) / 5 + VMatrixOption.EquipSlotMin;
                final int n2 = index - left;
                final boolean b = (index < left || (index >= left && n2 >= 0 && n2 <= 1 && index < VMatrixOption.EquipSlotMax));
                if (slot == null || !b) {
                    c.sendEnableActions();
                    return;
                } else if (slot.getIndex() != -1) {
                    player.send(VCorePacket.updateVCoreList(player, true, 0, vcoreoid));
                    return;
                }
                if (index < left || slot.getUnlock() == 1) {
                    vcoreskill.setIndex(index);
                    player.setVCoreSkillSlot(vcoreoid, 2);
                    slot.setIndex(vcoreoid);
                    int extend = slot.getExtend();
                    for (int i = 1; i <= 3; ++i) {
                        if (vcoreskill.getSkill(i) > 0) {
                            player.changeSingleSkillLevel(vcoreskill.getSkill(i), player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                            // 沒有幸運骰子技能的職業，將遙控骰子技能替換為幸運骰子
                            if (vcoreskill.getSkill(i) == 通用V核心.海盜通用.滿載骰子 && (JobConstants.is傑諾(player.getJob()) || JobConstants.is隱月(player.getJob()) || JobConstants.is天使破壞者(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is閃雷悍將(player.getJob()))) {
                                player.changeSingleSkillLevel(通用V核心.海盜通用.幸運骰子, player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                            }
                        }
                    }
                    player.send(VCorePacket.updateVCoreList(player, true, 0, vcoreoid));
                }
                break;
            }
            case 1: {
                int vcoreoid = slea.readInt();
                slea.readInt();
                VCoreSkillEntry vcoreskill = player.getVCoreSkill().get(vcoreoid);
                if (vcoreskill == null || vcoreskill.getSlot() != 2) {
                    break;
                }
                player.setVCoreSkillSlot(vcoreoid, 1);
                VMatrixSlot slot = player.getVMatrixSlot().get(vcoreskill.getIndex());
                if (slot != null && vcoreoid == slot.getIndex()) {
                    slot.setIndex(-1);
                    for (int i = 1; i <= 3; ++i) {
                        if (vcoreskill.getSkill(i) > 0) {
                            player.changeSingleSkillLevel(vcoreskill.getSkill(i), player.getVCoreSkillLevel(vcoreskill.getSkill(i)) > 0 ? player.getVCoreSkillLevel(vcoreskill.getSkill(i)) : -1, (byte) (vcoreskill.getType() == 2 ? 1 : vcoreskill.getType() == 0 ? 25 : 50));
                            // 沒有幸運骰子技能的職業，將遙控骰子技能替換為幸運骰子
                            if (vcoreskill.getSkill(i) == 通用V核心.海盜通用.滿載骰子 && (JobConstants.is傑諾(player.getJob()) || JobConstants.is隱月(player.getJob()) || JobConstants.is天使破壞者(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is墨玄(player.getJob()) || JobConstants.is閃雷悍將(player.getJob()))) {
                                player.changeSingleSkillLevel(通用V核心.海盜通用.幸運骰子, player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                            }
                        }
                    }
                    player.send(VCorePacket.updateVCoreList(player, true, 1, vcoreoid));
                    break;
                }
            }
            case 4: {
                int allExp = 0;
                int vcoreoid_1 = slea.readInt();
                int size = slea.readInt();
                VCoreSkillEntry vcoreskill_1 = player.getVCoreSkill().get(vcoreoid_1);
                if (vcoreskill_1 == null || vcoreskill_1.getSlot() <= 0) {
                    break;
                }
                int currLevel = vcoreskill_1.getLevel();
                for (int k = 1; k <= size; ++k) {
                    int vcoreoid_x = slea.readInt();
                    VCoreSkillEntry vcoreskill_x = player.getVCoreSkill().get(vcoreoid_x);
                    Triple<Integer, Integer, Integer> vcoredata = ii.getVcores(vcoreskill_1.getType()).get(vcoreskill_1.getLevel());
                    int expEnforce = ii.getVcores(vcoreskill_x.getType()).get(vcoreskill_x.getLevel()).getMid();
                    if (vcoreskill_1.getLevel() < 25) {
                        vcoreskill_1.gainExp(expEnforce);
                        allExp += expEnforce;
                        if (vcoreskill_1.getExp() >= vcoredata.getLeft()) {
                            vcoreskill_1.levelUP();
                            if (vcoreskill_1.getLevel() >= 25) {
                                vcoreskill_1.setLevel(25);
                                vcoreskill_1.setExp(0);
                            } else {
                                vcoreskill_1.setExp(vcoreskill_1.getExp() - vcoredata.getLeft());
                            }
                        }
                        VMatrixSlot slot = player.getVMatrixSlot().get(vcoreskill_1.getIndex());
                        if (slot != null) {
                            int extend = slot.getExtend();
                            for (int i = 1; i <= 3; ++i) {
                                if (vcoreskill_1.getSkill(i) > 0) {
                                    player.changeSingleSkillLevel(vcoreskill_1.getSkill(i), player.getVCoreSkillLevel(vcoreskill_1.getSkill(i)), (byte) ((vcoreskill_1.getType() == 2) ? 1 : ((vcoreskill_1.getType() == 0) ? 25 : 50)));
                                    // 沒有幸運骰子技能的職業，將遙控骰子技能替換為幸運骰子
                                    if (vcoreskill_1.getSkill(i) == 通用V核心.海盜通用.滿載骰子 && (JobConstants.is傑諾(player.getJob()) || JobConstants.is隱月(player.getJob()) || JobConstants.is天使破壞者(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is閃雷悍將(player.getJob()))) {
                                        player.changeSingleSkillLevel(通用V核心.海盜通用.幸運骰子, player.getVCoreSkillLevel(vcoreskill_1.getSkill(i)), (byte) ((vcoreskill_1.getType() == 2) ? 1 : ((vcoreskill_1.getType() == 0) ? 25 : 50)));
                                    }
                                }
                            }
                        }
                        player.setVCoreSkillSlot(vcoreoid_x, 0);
                    } else {
                        player.dropMessage(1, "最多可強化到25級！");
                    }
                }
                player.send(VCorePacket.showVCoreSkillExpResult(vcoreoid_1, allExp, currLevel, vcoreskill_1.getLevel()));
                player.send(VCorePacket.updateVCoreList(player, true, 3, 0));
                break;
            }
            case 5: {
                int vcoreoid = slea.readInt();
                VCoreSkillEntry vcoreskill = player.getVCoreSkill().get(vcoreoid);
                if (vcoreskill != null && vcoreskill.getSlot() > 0) {
                    player.removeVCoreSkill(vcoreoid);
                    for (int i = 1; i <= 3; ++i) {
                        if (vcoreskill.getSkill(i) > 0) {
                            player.changeSingleSkillLevel(vcoreskill.getSkill(i), player.getVCoreSkillLevel(vcoreskill.getSkill(i)) > 0 ? player.getVCoreSkillLevel(vcoreskill.getSkill(i)) : -1, (byte) (vcoreskill.getType() == 2 ? 1 : 50));
                            // 沒有幸運骰子技能的職業，將遙控骰子技能替換為幸運骰子
                            if (vcoreskill.getSkill(i) == 通用V核心.海盜通用.滿載骰子 && (JobConstants.is傑諾(player.getJob()) || JobConstants.is隱月(player.getJob()) || JobConstants.is天使破壞者(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is閃雷悍將(player.getJob()))) {
                                player.changeSingleSkillLevel(通用V核心.海盜通用.幸運骰子, player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                            }
                        }
                    }
                    Triple<Integer, Integer, Integer> vcoredata = ii.getVcores(vcoreskill.getType()).get(vcoreskill.getLevel());
                    player.gainVCraftCore(vcoredata.getRight());
                    player.send(VCorePacket.updateVCoreList(player, true, 5, 0));
                    player.send(VCorePacket.addVCorePieceResult(vcoredata.getRight()));
                }
                break;
            }
            case 6: {
                final int size = slea.readInt();
                int total = 0;
                for (int k = 0; k < size; ++k) {
                    final int vcoreoid = slea.readInt();
                    final VCoreSkillEntry vcoreskill = player.getVCoreSkill().get(vcoreoid);
                    if (vcoreskill != null && vcoreskill.getSlot() > 0) {
                        player.removeVCoreSkill(vcoreoid);
                        for (int i = 1; i <= 3; ++i) {
                            if (vcoreskill.getSkill(i) > 0) {
                                player.changeSingleSkillLevel(vcoreskill.getSkill(i), player.getVCoreSkillLevel(vcoreskill.getSkill(i)) > 0 ? player.getVCoreSkillLevel(vcoreskill.getSkill(i)) : -1, (byte) (vcoreskill.getType() == 2 ? 1 : 50));
                                // 沒有幸運骰子技能的職業，將遙控骰子技能替換為幸運骰子
                                if (vcoreskill.getSkill(i) == 通用V核心.海盜通用.滿載骰子 && (JobConstants.is傑諾(player.getJob()) || JobConstants.is隱月(player.getJob()) || JobConstants.is天使破壞者(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is閃雷悍將(player.getJob()))) {
                                    player.changeSingleSkillLevel(通用V核心.海盜通用.幸運骰子, player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                                }
                            }
                        }
                        Triple<Integer, Integer, Integer> vcoredata = ii.getVcores(vcoreskill.getType()).get(vcoreskill.getLevel());
                        total += vcoredata.right;
                    }
                }
                player.gainVCraftCore(total);
                player.send(VCorePacket.updateVCoreList(player, true, 5, 0));
                player.send(VCorePacket.addVCorePieceResult(total));
                break;
            }
            case 7: {
                final int vcoreoid = slea.readInt();
                final int nCount = slea.readInt();
                final VCoreDataEntry vcoredata = ii.getCoreData(vcoreoid);
                if (vcoredata == null) {
                    return;
                }
                final int type = vcoredata.getType();
                final int needCore = (type == 0 ? 140 : type == 1 ? 70 : 250) * nCount;
                if (player.isAdmin()) {
                    player.dropMessage(5, "[VMatrix] V核心ID：" + vcoreoid + "(" + nCount + "個)需要：" + needCore + "個核心碎片。");
                }
                final String oneInfo = player.getOneInfo(1477, "count");
                if (oneInfo == null) {
                    return;
                }
                int count = Integer.valueOf(oneInfo);
                if (count >= needCore && player.gainVCoreSkill(vcoreoid, nCount, true)) {
                    player.updateOneInfo(1477, "count", String.valueOf(count - needCore));
                }
                break;
            }
            case 9: {
                final int index = slea.readInt();
                final VMatrixSlot slot = player.getVMatrixSlot().get(index);
                if (slot == null || slot.getExtend() >= VMatrixOption.EquipSlotEnhanceMax) {
                    c.sendEnableActions();
                    return;
                }
                if (player.getVMatrixPoint() > 0) {
//                    player.gainVCraftCore(-VMatrixOption.CraftEnchantCoreCost);
                    slot.setExtend(Math.min(slot.getExtend() + 1, VMatrixOption.EquipSlotEnhanceMax));
                    player.setVCoreSkillChanged(true);
                    for (VCoreSkillEntry vcoreskill : player.getVCoreSkill().values()) {
                        if (vcoreskill.getSlot() == 2 && vcoreskill.getIndex() == index) {
                            int extend = slot.getExtend();
                            for (int i = 1; i <= 3; ++i) {
                                if (vcoreskill.getSkill(i) > 0) {
                                    player.changeSingleSkillLevel(vcoreskill.getSkill(i), player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                                    // 沒有幸運骰子技能的職業，將遙控骰子技能替換為幸運骰子
                                    if (vcoreskill.getSkill(i) == 通用V核心.海盜通用.滿載骰子 && (JobConstants.is傑諾(player.getJob()) || JobConstants.is隱月(player.getJob()) || JobConstants.is天使破壞者(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is閃雷悍將(player.getJob()))) {
                                        player.changeSingleSkillLevel(通用V核心.海盜通用.幸運骰子, player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                                    }
                                }
                            }
                            break;
                        }
                    }
                } else {
                    player.dropAlertNotice("矩陣點數不足。");
                }
                player.send(VCorePacket.updateVCoreList(player, false, 0, 0));
                break;
            }
            case 10: {
                final int index = slea.readInt();
                slea.readInt();
                final int n26;
                if ((n26 = index - (player.getLevel() - 200) / 5 - VMatrixOption.EquipSlotMin) < 0 || n26 > 1 || index >= VMatrixOption.EquipSlotMax) {
                    break;
                }
                final VMatrixSlot slot = player.getVMatrixSlot().get(index);
                if (slot == null) {
                    c.sendEnableActions();
                    return;
                }
                final Map<Integer, Long> map = VMatrixOption.SlotExpansionMeso.get(player.getLevel());
                if (slot.getUnlock() != 1 && (map) != null && map.containsKey(n26)) {
                    player.gainMeso(-map.get(n26), false);
                    slot.setUnlock(1);
                    player.setVCoreSkillChanged(true);
                }
                c.announce(VCorePacket.updateVCoreList(player, false, 0, 0));
                break;
            }
            case 11: {
                if (player.getMeso() >= VMatrixOption.MatrixPointResetMeso) {
                    player.gainMeso(-VMatrixOption.MatrixPointResetMeso, false);
                    player.getVMatrixSlot().values().forEach(k1027 -> k1027.setExtend(0));
                    for (VCoreSkillEntry vcoreskill : player.getVCoreSkill().values()) {
                        if (vcoreskill.getSlot() == 2) {
                            for (int i = 1; i <= 3; ++i) {
                                if (vcoreskill.getSkill(i) > 0) {
                                    player.changeSingleSkillLevel(vcoreskill.getSkill(i), player.getVCoreSkillLevel(vcoreskill.getSkill(i)) > 0 ? player.getVCoreSkillLevel(vcoreskill.getSkill(i)) : -1, (byte) (vcoreskill.getType() == 2 ? 1 : 50));
                                    // 沒有幸運骰子技能的職業，將遙控骰子技能替換為幸運骰子
                                    if (vcoreskill.getSkill(i) == 通用V核心.海盜通用.滿載骰子 && (JobConstants.is傑諾(player.getJob()) || JobConstants.is隱月(player.getJob()) || JobConstants.is天使破壞者(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is蒼龍俠客(player.getJob()) || JobConstants.is閃雷悍將(player.getJob()))) {
                                        player.changeSingleSkillLevel(通用V核心.海盜通用.幸運骰子, player.getVCoreSkillLevel(vcoreskill.getSkill(i)), (byte) ((vcoreskill.getType() == 2) ? 1 : ((vcoreskill.getType() == 0) ? 25 : 50)));
                                    }
                                }
                            }
                        }
                    }
                    player.setVCoreSkillChanged(true);
                }
                c.announce(VCorePacket.updateVCoreList(player, false, 0, 0));
                break;
            }
            default: {
                player.dropMessage(5, "[VMatrix] Unhandle OpCode：" + action);
                break;
            }
        }
    }

    // VMATRIX_HELP_REQUEST
    public static void VmatrixHelpRequest(MaplePacketReader lea, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        player.openNpc(1540945, "VMatrixHelp");
    }

    public static void VmatrixVerify(MaplePacketReader lea, MapleClient c) {
        if (c == null || lea.available() < 6) {
            return;
        }
        lea.readInt();
        String secondPwd = lea.readMapleAsciiString();
        c.announce(VCorePacket.showVCoreWindowVerifyResult(c.CheckSecondPassword(secondPwd)));
    }

    public static void MicroBuffEndTime(MaplePacketReader lea, MapleCharacter player) {
//        int skillId = lea.readInt();
//        player.updateTick(lea.readInt());
//        Skill skill = SkillFactory.getSkill(skillId);
//        int skillLevel = player.getTotalSkillLevel(SkillConstants.getLinkedAttackSkill(skillId));
//        MapleStatEffect effect = skill.getEffect(player.getSkillLevel(skill));
    }

    public static void UseActivateDamageSkin(MaplePacketReader lea, MapleCharacter player) {
        int skinId = lea.readInt();
        player.getMap().broadcastMessage(InventoryPacket.showDamageSkin(player.getId(), skinId), player.getPosition());
    }

    public static void UseActivateDamageSkinPremium(MaplePacketReader lea, MapleCharacter player) {
        int skinId = lea.readInt();
        player.getMap().broadcastMessage(InventoryPacket.showDamageSkin_Premium(player.getId(), skinId), player.getPosition());
    }

    public static void DemianObjectMakeEnterAck(MaplePacketReader lea, MapleCharacter player) {
        int n2 = lea.readInt();
        player.getMap().swordNodeAck(n2, false);
    }

    public static void DemianObjectNodeEnd(MaplePacketReader lea, MapleCharacter player) {
        int n2 = lea.readInt();
        player.getMap().swordNodeEnd(n2);
    }

    public static void MultiSkillAttackRequest(MaplePacketReader lea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int skillid = lea.readInt();
        int display = lea.readInt();//V.162 byte=>int
        DamageParse.readAttackUnknown2(lea, player, null);
        lea.readInt();
        lea.readInt();
        lea.readInt();
        lea.readInt();
        lea.readShort();
        lea.readShort();
        lea.readInt();
        Point p = lea.readPos();
        byte b = lea.readByte();
        if (b > 0) {
            lea.readInt();
            lea.readInt();
            lea.readInt();
            lea.readInt();
            lea.readInt();
            lea.readByte();
            lea.readInt();
        }
        int length = lea.readInt();
        List<Integer> infoList = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            int skillId = lea.readInt();
            int skillLevel = lea.readInt();
            int oid = lea.readInt();
            lea.readShort();
            lea.readPos();
            lea.readInt();
            lea.readByte();
            byte b2 = lea.readByte();
            if (b2 > 0) {
                lea.readInt();
                lea.readInt();
            }
            byte b3 = lea.readByte();
            if (b3 > 0) {
                lea.readInt();
                lea.readInt();
            }
            infoList.add(oid);
        }
        if (凱殷.散射箭 == skillid || 凱殷.崩壞爆破 == skillid) {
            MapleStatEffect effect = player.getSkillEffect(skillid);
            if (effect != null) {
                int maxValue = effect.getW();
                int timeout = effect.getU() * 1000;
                Pair<Integer, Long> skillInfo = (Pair<Integer, Long>) player.getTempValues().get("MultiSkill" + skillid);
                if (skillInfo != null) {
                    skillInfo.left -= 1;
                    if (skillInfo.left < 0) {
                        skillInfo.left = 0;
                    }
                    skillInfo.right = System.currentTimeMillis();
                } else {
                    player.dropMessage(5, "沒有準備好的崩壞爆破元件。");
                    return;
                }
                player.getTempValues().put("MultiSkill" + skillid, skillInfo);
                player.send(MaplePacketCreator.multiSkillInfo(skillid, skillInfo.left, maxValue, timeout));
            } else {
                return;
            }
        }
        MapleStatEffect effect = player.getSkillEffect(skillid);
        if (effect != null && (!player.isSkillCooling(skillid) || skillid == 開拓者.三重衝擊 || skillid == 開拓者.古代神矢_爆破 || skillid == 開拓者.究極炸裂)) {
            switch (SkillConstants.getLinkedAttackSkill(skillid)) {
                case 開拓者.基本爆破:
                case 開拓者.基本爆破強化:
                case 開拓者.進階基本之力:
                    break;
                default:
                    effect.applyTo(player, p);
                    break;
            }
            c.announce(MaplePacketCreator.VSkillObjectAction(skillid, display, infoList));
            if (JobConstants.is伊利恩(player.getJob())) {
                final MapleStatEffect eff = SkillFactory.getSkill(伊利恩.祝福標誌_1).getEffect(Math.min(10, player.getBuffedIntValue(MapleBuffStat.祝福標誌) + 1));
                if (eff != null) {
                    eff.applyTo(player, p);
                }
            }
//            player.getMap().broadcastMessage(MaplePacketCreator.MultiSkillResult(player.getId(), skillid, display, direction, stance, Type, itemid, infoList), player.getPosition());
        }
    }

    public static void UserGrowthHelperRequest(MaplePacketReader lea, MapleClient c, MapleCharacter player) { // todo 驗證更多資料
        if (player == null || player.hasBlockedInventory() || player.getMap() == null || player.getMapId() == GameConstants.JAIL) {
            c.sendEnableActions();
            return;
        }
        lea.skip(2);
        int mapId = lea.readInt();
        if (mapId == 0) {
            c.sendEnableActions();
            return;
        }
        player.changeMap(ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(mapId));
        switch (mapId) {
            case 102000003:
                NPCScriptManager.getInstance().start(c, 10202);
                break;
        }
    }

    public static void DotHealHPMPRequest(MapleCharacter player) {
        if (!player.isAlive()) {
            return;
        }
        int value = player.getBuffedIntValue(MapleBuffStat.DotHealHPPerSecond);
        if (value > 0 && player.getEffectForBuffStat(MapleBuffStat.DotHealHPPerSecond) != null && player.getStat().getHp() < player.getStat().getCurrentMaxHP()) {
            player.healHP(player.getStat().getCurrentMaxHP() * value / 100);
        }
        value = player.getBuffedIntValue(MapleBuffStat.DotHealMPPerSecond);
        if (value > 0 && player.getEffectForBuffStat(MapleBuffStat.DotHealMPPerSecond) != null && player.getStat().getMp() < player.getStat().getCurrentMaxMP()) {
            player.healMP(player.getStat().getCurrentMaxMP() * value / 100);
        }
        MapleBuffStatValueHolder mbsvh;
        if (JobConstants.is主教(player.getJob()) && (mbsvh = player.getBuffStatValueHolder(MapleBuffStat.聖靈祈禱)) != null) {
            int healR = 1;
            int intValue = player.getStat().getTotalInt();
            if (intValue >= mbsvh.effect.getY()) {
                healR = Math.max(healR + (mbsvh.effect.getY() / intValue), mbsvh.effect.getZ());
            }
            for (MapleCharacter tchr : player.getMap().getCharactersInRect(mbsvh.effect.calculateBoundingBox(player.getPosition()))) {
                if (tchr != null && tchr != player && tchr.getParty() == player.getParty()) {
                    if (tchr.getStat().getHp() < tchr.getStat().getCurrentMaxHP()) {
                        tchr.addHPMP(healR, healR);
                    }
                    List<MapleBuffStatValueHolder> mbsvhs = new LinkedList<>();
                    for (Map.Entry<MapleBuffStat, List<MapleBuffStatValueHolder>> entry : tchr.getAllEffects().entrySet()) {
                        if (!entry.getKey().isNormalDebuff() && !entry.getKey().isCriticalDebuff()) {
                            continue;
                        }
                        entry.getValue().stream().filter(mb -> mb.effect instanceof MobSkill).forEach(mbsvhs::add);
                    }
                    if (mbsvhs.size() > 0) {
                        mbsvhs.forEach(mb -> tchr.cancelEffect(mb.effect, mb.startTime));
                    }
                }
            }
        }
    }

    //USER_HOWLING_STORM_STACK
    public static void UserHowlingStormStack(MaplePacketReader lea, MapleCharacter player) {
        if (JobConstants.is破風使者(player.getJob())) {
            MapleStatEffect effect = SkillFactory.getSkill(破風使者.狂風呼嘯).getEffect(player.getTotalSkillLevel(破風使者.狂風呼嘯));
            if (effect != null) {
                effect.applyTo(player, true);
            }
        }
    }

    //AUTO_USE_JUDGEMENT
    public static void UserJudgement(MaplePacketReader lea, MapleCharacter player) {
        if (JobConstants.is幻影俠盜(player.getJob())) {
            MapleStatEffect eff = player.getSkillEffect(幻影俠盜.審判);
            int maxJS = player.getSkillEffect(幻影俠盜.炫目卡牌) == null ? 20 : 40;
            if (eff == null) {
                eff = player.getSkillEffect(幻影俠盜.卡牌審判);
            }
            if (player.getJudgementStack() >= maxJS) {
                if (eff.applyTo(player)) {
                    player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(MapleForceFactory.getInstance().getMapleForce(player, eff, 0)), true);
                    player.setJudgementStack(0);
                    player.getClient().announce(MaplePacketCreator.updateCardStack(0));
                }
            }
        }
    }

    // MULTI_SKILL_CHARGE_REQUEST
    public static void MultiSkillChargeRequest(MaplePacketReader lea, MapleCharacter player) {
        int skillid = lea.readInt();
        MapleStatEffect effect = player.getSkillEffect(skillid);
        if (effect != null) {
            MapleBuffStatValueHolder mbsvh = null;
            MapleBuffStat stat = null;
            if (effect.getStatups().containsKey(MapleBuffStat.Bullet_Count) && (mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Bullet_Count)) != null) {
                stat = MapleBuffStat.Bullet_Count;
            } else if (effect.getStatups().containsKey(MapleBuffStat.Bullet_Count2) && (mbsvh = player.getBuffStatValueHolder(MapleBuffStat.Bullet_Count2)) != null) {
                stat = MapleBuffStat.Bullet_Count2;
            }
            if (mbsvh != null && stat != null) {
                final int value = mbsvh.value + 1;
                int t = effect.getT() * 1000;
                int maxValue = effect.getY();
                if (value < 0/* || System.currentTimeMillis() < mbsvh.startTime + t*/ || value > maxValue) {
                    return;
                }
                mbsvh.value = value;
                mbsvh.startTime = System.currentTimeMillis();
                player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(stat, mbsvh.effect.getSourceId())));
            } else {
                switch (skillid) {
                    case 開拓者.基本轉移:
                    case 開拓者.基本轉移4轉:
                        effect.unprimaryPassiveApplyTo(player);
                        break;
                    default:
                        effect.applyTo(player, true);
                }
            }
        }
    }

    public static void MultiSkillTimeoutChargeRequest(MaplePacketReader lea, MapleCharacter player) {
        int skillid = lea.readInt();
        MapleStatEffect effect = player.getSkillEffect(skillid);
        if (effect != null) {
            int value = 0;
            int maxValue = effect.getW();
            int timeout = effect.getU() * 1000;
            Pair<Integer, Long> skillInfo = (Pair<Integer, Long>) player.getTempValues().get("MultiSkill" + skillid);
            if (skillInfo != null) {
                value = skillInfo.left + 1;
                if (value < 0 || System.currentTimeMillis() < skillInfo.right + timeout || value > maxValue) {
                    return;
                }
                skillInfo.left = value;
                skillInfo.right = System.currentTimeMillis();
            } else {
                skillInfo = new Pair<>(0, System.currentTimeMillis());
            }
            player.getTempValues().put("MultiSkill" + skillid, skillInfo);
            player.send(MaplePacketCreator.multiSkillInfo(skillid, value, maxValue, timeout));
        }
    }

    /**
     * USER_TRUMP_SKILL_ACTION_REQUEST
     */
    public static void UserTrumpSkillActionRequest(MaplePacketReader lea, MapleCharacter player) {
        if (player == null || player.getMap() == null || !JobConstants.is幻影俠盜(player.getJob())) {
            return;
        }
        MapleStatEffect effect = player.getSkillEffect(幻影俠盜.命運鬼牌);
        if (effect != null) {
            for (MapleMapObject mapleMapObject : player.getMap().getMapObjectsInRect(effect.calculateBoundingBox(player.getPosition(), player.isFacingLeft(), 250), Collections.singletonList(MapleMapObjectType.MONSTER))) {
                player.handleCarteGain(mapleMapObject.getObjectId(), true);
                break;
            }
//            for (int i = 0; i < 8; i++) {
//                player.getMap().broadcastMessage(player, ForcePacket.showForceAtom(MapleForceFactory.getInstance().getMapleForce(player, effect, 0)), true);
//            }
        }

    }

    /**
     * 烈焰巫師.無盡之炎燄 CHARGE_INFINITE_FLAME
     */
    public static void ChargeInfiniteFlame(MaplePacketReader lea, MapleClient c) {
        Skill skill = SkillFactory.getSkill(烈焰巫師.無盡之炎燄);
        if (c.getPlayer().getTotalSkillLevel(skill) > 0) {
            int currentCharge = lea.readInt(); // 目前累積次數
            c.announce(BuffPacket.setInfinitiFlameCharge(c.getPlayer(), currentCharge));
        }
    }

    /**
     * 400031032 CHARGE_PRIMAL_GRENADE
     */
    public static void ChargePrimalGrenade(MaplePacketReader lea, MapleClient c) {
        Skill skill = SkillFactory.getSkill(狂豹獵人.狂暴榴彈);
        if (skill != null) {
            if (c.getPlayer().getTotalSkillLevel(skill) > 0) {
                lea.readInt(); // tick
                int currentCharge = lea.readInt();
                MapleStatEffect effect = skill.getEffect(c.getPlayer().getTotalSkillLevel(skill));
                if (effect != null) {
                    effect.applyTo(c.getPlayer(), true);
                    final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                    mplew.writeOpcode(SendPacketOpcode.ENABLE_PRIMAL_GRENADE_CHARGE);
                    mplew.write(1);
                    c.announce(mplew.getPacket());
                }
            }
        }
    }

    public static void MaliceChargeRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        slea.readInt(); // tick

        MapleStatEffect effect = player.getSkillEffect(凱殷.主導II);
        if (effect == null) {
            effect = player.getSkillEffect(凱殷.主導);
        }
        if (effect != null) {
            player.handleMaliceCharge(effect.getY());
        }

        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.MaliceChargeResult);
        mplew.write(1);
        c.announce(mplew.getPacket());
    }

    public static void LaraSkillChargeRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int skillId = slea.readInt();
        slea.readInt(); // tick
        MapleStatEffect effect = player.getSkillEffect(skillId);
        if (effect != null) {
            MapleBuffStat buff;
            int subTime;
            int maxValue;
            int bufft;
            switch (skillId) {
                case 菈菈.山之種子:
                    buff = MapleBuffStat.山之種子;
                    subTime = effect.getZ() * 1000;
                    maxValue = effect.getW2();
                    bufft = 0;
                    break;
                case 菈菈.龍脈的痕跡:
                    buff = MapleBuffStat.龍脈的痕跡;
                    subTime = effect.getS2() * 1000;
                    maxValue = effect.getV();
                    bufft = 1;
                    break;
                case 菈菈.自由龍脈:
                    buff = MapleBuffStat.自由龍脈;
                    subTime = effect.getW() * 1000;
                    maxValue = effect.getU();
                    bufft = 0;
                    break;
                default:
                    return;
            }
            final int value;
            final MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(buff);
            if (mbsvh == null) {
                value = 1;
                switch (bufft) {
                    case 1:
                        effect.applyTo(player, null, true);
                        break;
                    default:
                        effect.unprimaryPassiveApplyTo(player);
                        break;
                }
            } else {
                value = Math.min(Math.max(mbsvh.value + 1, 0), maxValue);
//                if (/* || System.currentTimeMillis() < mbsvh.startTime + subTime*/) {
//                    return;
//                }
                mbsvh.value = value;
                mbsvh.startTime = System.currentTimeMillis();
                player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(buff, mbsvh.effect.getSourceId())));
            }

            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            mplew.writeShort(SendPacketOpcode.LaraSkillChargeResult.getValue());
            mplew.writeInt(skillId);
            mplew.write(value);
            player.send(mplew.getPacket());
        }
    }

    /**
     * 玩家關閉客戶端
     *
     * @param c
     */
    public static void GameExit(MapleClient c) {
        NPCScriptManager.getInstance().dispose(c);
    }

    public static void openMapleUnionRequest(MapleCharacter chr) {
        chr.checkMapleUnion(false);
    }

    public static void handleMapleUnion(MaplePacketReader slea, MapleCharacter chr) {
        int presetIdx = slea.readInt();
        for (int teamSize = slea.readInt(), i = 0; i < teamSize; ++i) {
            chr.updateWorldShareInfo(18791, String.valueOf(i), String.valueOf(slea.readInt()));
        }
        final int unionSize = slea.readInt();
        slea.readShort();
        slea.readByte();
        Map<Integer, MapleUnionEntry> fightingUnions = chr.getMapleUnion().getFightingUnions();
        fightingUnions.clear();
        chr.setMapleUnionChanged(true);
        for (int j = 0; j < unionSize; ++j) {
            int type = slea.readInt();
            int chrid = slea.readInt();
            int level = slea.readInt();
            int job = slea.readInt();
            slea.readInt();
            int rotate = slea.readInt();
            int boardIndex = slea.readInt();
            int local = slea.readInt();
            String name = slea.readMapleAsciiString();
            if (type == 2) {
                slea.readMapleAsciiString();
            }
            MapleUnionEntry union = new MapleUnionEntry(chrid, name, level, job);
            union.setType(type);
            union.setRotate(rotate);
            union.setBoardIndex(boardIndex);
            union.setLocal(local);
            fightingUnions.put(chrid, union);
        }
        chr.getMapleUnion().update();
        chr.send(MaplePacketCreator.updateMapleUnion(chr.getMapleUnion()));
    }

    public static void handleRemoteControlDice(MaplePacketReader slea, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int dice = slea.readInt();
        if (!chr.isSkillCooling(通用V核心.海盜通用.滿載骰子)) {
            MapleStatEffect effect = chr.getSkillEffect(通用V核心.海盜通用.滿載骰子);
            if (effect != null) {
                chr.getSpecialStat().setRemoteDice(dice);
                effect.applyTo(chr);
            }
        }
    }

    public static void GhostArrowHandler(MaplePacketReader slea, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int mobOid = slea.readInt();
        slea.readInt();
        if (player.getMap().getMobObject(mobOid) != null) {
            MapleStatEffect effect = player.getSkillEffect(箭神.殘影之矢);
            if (effect != null) {
                player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(MapleForceFactory.getInstance().getMapleForce(player, effect, 0, mobOid, Collections.emptyList(), player.getPosition())), true);
            }
        }
        //額外攻擊
    }

    public static void PassiveSkillInfoUpdate(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null) {
            return;
        }
//        player.updateTick(slea.readInt());
//        slea.readShort();
//        slea.readInt();
        player.getStat().recalcLocalStats(false, player);
        Pair<Integer, Integer> pair = player.getStat().getEquipSummon();
        if (pair.left > 0) {
            MapleStatEffect effect = SkillFactory.getSkill(pair.left).getEffect(1);
            if (effect != null) {
                if (pair.right > 0) {
                    effect.applyTo(player, null, true);
                    return;
                }
                player.dispelEffect(pair.left);
                int n = SkillConstants.eM(pair.left);
                if (n > 0) {
                    player.dispelEffect(n);
                }
            }
        }

    }

    public static void VAddSkillAttackRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        slea.readInt();
        c.announce(MaplePacketCreator.userBonusAttackRequest(40001000, 0, Collections.emptyList()));

    }

    public static void OverloadModeResult(MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        final MapleStatEffect effect = player.getEffectForBuffStat(MapleBuffStat.超載模式);
        if (effect != null) {
            final int mpcost = player.getStat().getCurrentMaxMP() * effect.getQ() / 100 + effect.getY();
            if (player.getStat().getMp() < mpcost) {
                player.dispelEffect(MapleBuffStat.超載模式);
                if (player.getBuffedIntValue(MapleBuffStat.SurplusSupply) > 20) {
                    player.getSkillEffect(傑諾.蓄能系統).unprimaryPassiveApplyTo(player);
                }
                return;
            }
            player.addHPMP(0, -mpcost, false, false);
        }
    }

    public static void RequestSetHpBaseDamage(MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        MapleStatEffect effect = player.getSkillEffect(惡魔復仇者.血之限界);
        if (effect != null) {
            effect.unprimaryPassiveApplyTo(player);
        }
    }

    public static void RequestSetBlessOfDarkness(MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        MapleStatEffect effect = player.getSkillEffect(夜光.黑暗祝福);
        if (effect != null && player.getCheatTracker().canNext黑暗祝福(3000) && player.getBuffedIntValue(MapleBuffStat.BlessOfDarkness) < 3) {
            effect.applyTo(player);
        }
    }

    public static void UserForceAtomCollision(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int forceCount = slea.readInt();
        int forceSkillId = slea.readInt();
        for (int i = 0, len = slea.readInt(); i < len; i++) {
            slea.readInt();
            slea.readInt();
            slea.readInt();//V.163 new
            slea.readInt();
        }
        MapleStatEffect effect = player.getSkillEffect(forceSkillId);
        MapleMap map = player.getMap();
        MapleForceFactory mff = MapleForceFactory.getInstance();
        for (int i = 0; i < forceCount; i++) {
//            boolean b = slea.available() == 25 * (forceCount - i);
            int nowCount = slea.readInt() % 100;
            boolean b = slea.readByte() != 0;
            int oid = slea.readInt();
            slea.readInt();
            int oid2 = slea.readInt();
            slea.readInt();
            slea.readInt();
            slea.readByte();
            int skillID2 = slea.readInt();
            if (forceSkillId == 煉獄巫師.冥界死神) {
                slea.readInt();
            }
            if (player.isDebug()) {
                player.dropSpouseMessage(UserChatMessageType.聯盟群組, "[Force Atom] Now Count " + nowCount);
            }
            MapleMonster mob = map.getMonsterByOid(oid);
            switch (forceSkillId) {
                case 0: {
                    if (skillID2 == 虎影.魔封葫蘆符) {
                        break;
                    }
                    mob = map.getMonsterByOid(oid2);
                    if (mob != null) {
                        if (player.getSkillEffect(伊利恩.完成詛咒之印) != null) {
                            effect = player.getSkillEffect(伊利恩.完成詛咒之印);
                        } else if (player.getSkillEffect(伊利恩.熟練詛咒之印) != null) {
                            effect = player.getSkillEffect(伊利恩.熟練詛咒之印);
                        } else if (player.getSkillEffect(伊利恩.詛咒之印) != null) {
                            effect = player.getSkillEffect(伊利恩.詛咒之印);
                        }
                        if (effect != null && (effect = SkillFactory.getSkill(伊利恩.詛咒之印_怪物狀態).getEffect(effect.getLevel())) != null) {
                            effect.applyMonsterEffect(player, mob, effect.getMobDebuffDuration(player));
                        }
                    }
                    break;
                }
                case 暗夜行者.暗影蝙蝠_攻擊: {
                    if (mob != null && nowCount < effect.getMobCount(player)) {
                        final List<MapleMapObject> objects = map.getMapObjectsInRange(mob.getPosition(), 633, Collections.singletonList(MapleMapObjectType.MONSTER));
                        if (!objects.isEmpty()) {
                            if (nowCount == 1) {
                                player.addHPMP(1, 0);
                            }
                            final MapleForceAtom force = mff.getMapleForce(player, effect, nowCount + 1, oid);
                            force.setForcedTarget(mob.getPosition());
                            player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(force), true);
                        }
                        break;
                    }
                    break;
                }
                case 天使破壞者.靈魂探求者_攻擊:
                    if (mob != null && effect != null && effect.getSourceId() == 天使破壞者.靈魂探求者_攻擊 && nowCount < 8 && Randomizer.isSuccess(player.getSkillEffect(天使破壞者.靈魂探求者).getS())) {
                        final MapleForceAtom force = mff.getMapleForce(player, effect, nowCount + 1, oid);
                        force.setForcedTarget(mob.getPosition());
                        player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(force), true);
                    }
                    break;
                case 隱月.小狐仙精通_1:
                case 隱月.火狐精通_1:
                case 惡魔復仇者.盾牌追擊_攻擊:
                case 烈焰巫師.烈炎爆發_3: {
                    int ef = effect.getZ();
                    if (forceSkillId == 惡魔復仇者.盾牌追擊_攻擊 && player.getSkillEffect(惡魔復仇者.盾牌追擊_追加目標) != null) {
                        ef += 2;
                    }
                    if (mob != null && nowCount < ef) {
                        if (!map.getMapObjectsInRange(mob.getPosition(), 633, Collections.singletonList(MapleMapObjectType.MONSTER)).isEmpty()) {
                            final MapleForceAtom force = mff.getMapleForce(player, effect, nowCount + 1, oid);
                            force.setForcedTarget(mob.getPosition());
                            player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(force), true);
                        }
                    }
                    break;
                }
                case 凱撒.意志之劍_重磅出擊:
                case 凱撒.意志之劍_重磅出擊_1: {
                    if (mob != null) {
                        player.getSkillEffect((forceSkillId == 凱撒.意志之劍_重磅出擊) ? 凱撒.意志之劍_重磅出擊_2 : 凱撒.意志之劍_重磅出擊_3).applyAffectedArea(player, mob.getPosition());
                        break;
                    }
                    break;
                }
                case 幻影俠盜.黑傑克_1: {
                    slea.readInt();
                    if (mob == null) {
                        break;
                    }
                    if (nowCount >= 20) {
                        c.announce(MaplePacketCreator.LiftSkillAction(幻影俠盜.黑傑克_2, 1, 1, mob.getPosition().x, mob.getPosition().y));
                        break;
                    }
                    if (map.getMapObjectsInRange(mob.getPosition(), 347, Collections.singletonList(MapleMapObjectType.MONSTER)).size() > 1) {
                        final int n6 = nowCount + 1;
                        player.getMap().broadcastMessage(player, ForcePacket.forceAtomCreate(mff.getMapleForce(player, effect, n6, oid)), true);
                        break;
                    }
                    c.announce(MaplePacketCreator.LiftSkillAction(幻影俠盜.黑傑克_2, 1, 1, mob.getPosition().x, mob.getPosition().y));
                    break;
                }
                case 亞克.逼近的死亡_1: {
                    final MapleMonster mobObject3;
                    if ((mobObject3 = map.getMobObject(oid2)) != null) {
                        final MapleStatEffect skillEffect2;
                        if ((skillEffect2 = player.getSkillEffect(亞克.歸來的憎恨)) != null && player.getEvanWreckages().size() < skillEffect2.getZ() && skillEffect2.makeChanceResult(player)) {
                            final int addWreckages = player.addWreckages(new Point(mobObject3.getPosition()), skillEffect2.getDuration());
                            player.getMap().broadcastMessage(player, EffectPacket.DragonWreckage(player.getId(), mobObject3.getPosition(), skillEffect2.getDuration() / 1000, addWreckages, skillEffect2.getSourceId(), 0, player.getEvanWreckages().size()), true);
                        }
                        break;
                    }
                    break;
                }
                case 亞克.深淵技能: {
                    if (map.getMobObject(oid2) != null) {
                        final MapleStatEffect skillEffect3;
                        if ((skillEffect3 = player.getSkillEffect(亞克.深淵加持效果)) != null) {
                            skillEffect3.unprimaryPassiveApplyTo(player);
                        }
                        break;
                    }
                    break;
                }
                case 亞克.迸發技能: {
                    if (map.getMobObject(oid2) != null) {
                        final MapleStatEffect skillEffect4;
                        if ((skillEffect4 = player.getSkillEffect(亞克.迸發加持)) != null) {
                            skillEffect4.unprimaryPassiveApplyTo(player);
                        }
                        break;
                    }
                    break;
                }
                case 亞克.緋紅技能: {
                    if (map.getMobObject(oid2) != null) {
                        final MapleStatEffect skillEffect5;
                        if ((skillEffect5 = player.getSkillEffect(亞克.緋紅加持)) != null) {
                            skillEffect5.unprimaryPassiveApplyTo(player);
                        }
                        break;
                    }
                    break;
                }
                case 亞克.原始技能: {
                    final MapleStatEffect skillEffect6;
                    if (map.getMobObject(oid2) != null && (skillEffect6 = player.getSkillEffect(亞克.原始加持)) != null) {
                        skillEffect6.unprimaryPassiveApplyTo(player);
                        break;
                    }
                    break;
                }
            }
        }
    }

    public static void UserSaveDamageSkin(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory()) {
            return;
        }
        int action = slea.readByte();
        switch (action) {
            case 0: {
                String customData = player.getQuestNAdd(MapleQuest.getInstance(7291)).getCustomData();
                final String count = player.getOneInfo(56829, "count");
                final int maxSize = count == null ? ServerConfig.defaultDamageSkinSlot : Integer.valueOf(count);
                if (customData != null && player.getDamSkinList().size() < maxSize && !player.getDamSkinList().contains(Integer.valueOf(customData))) {
                    player.getDamSkinList().add(0, Integer.valueOf(customData));
                    final StringBuilder sb = new StringBuilder();
                    player.getDamSkinList().forEach(n -> sb.append(n).append(","));
                    player.setKeyValue("DAMAGE_SKIN", sb.substring(0, sb.toString().length() - 1));
                    c.announce(InventoryPacket.UserDamageSkinSaveResult(2, 4, player));
                }
                break;
            }
            case 1: {
                int skinId = slea.readShort();
                if (player.getDamSkinList().contains(skinId)) {
                    player.getDamSkinList().remove(player.getDamSkinList().indexOf(skinId));
                    final StringBuilder sb = new StringBuilder();
                    player.getDamSkinList().forEach(n -> sb.append(n).append(","));
                    player.setKeyValue("DAMAGE_SKIN", sb.substring(0, sb.toString().length() - 1));
                    c.announce(InventoryPacket.UserDamageSkinSaveResult(2, 4, player));
                }
                break;
            }
            case 2: {
                int skinId = slea.readShort();
                if (!player.getDamSkinList().contains(skinId)) {
                    player.dropMessage(1, "傷害皮膚應用出錯!你並沒有這個傷害皮膚!");
                    break;
                }
                player.changeDamageSkin(skinId);
                MapleQuest.getInstance(7291).forceStart(player, 0, String.valueOf(skinId));
                c.announce(InventoryPacket.UserDamageSkinSaveResult(2, 4, player));
                player.getMap().broadcastMessage(player, InventoryPacket.showDamageSkin(player.getId(), skinId), false);
                break;
            }
            default: {
                player.dropMessage(5, "Unhandled UserSaveDamageSkin Action");
            }
        }
    }

    public static void DimensionMirrorMove(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory()) {
            return;
        }
        player.updateTick(slea.readInt());
        int id = slea.readInt();
        for (DimensionMirrorEvent event : DimensionMirrorEvent.values()) {
            if (event.getID() == id && event.getMapID() > 0 && player.getLevel() >= event.getLimitLevel()) {
                player.saveLocation(SavedLocationType.MULUNG_TC);
                player.changeMap(event.getMapID(), 0);
                return;
            }
        }
    }

    public static void DevilFrenzyResult(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        MapleStatEffect effect = player.getEffectForBuffStat(MapleBuffStat.惡魔狂亂);
        if (effect != null) {
            int cost = effect.getY();
            player.getBuffedIntZ(MapleBuffStat.惡魔狂亂);
            if (player.getStat().getHp() > cost && player.getStat().getHPPercent() >= 2) {
                if (player.getBuffedValue(MapleBuffStat.Thaw) == null) {
                    player.addHPMP(-cost, 0, false, false);
                }
                effect.unprimaryPassiveApplyTo(player);
                player.getSkillEffect(惡魔復仇者.惡魔狂亂_魔族之血).applyAffectedArea(player, null);
            }
        }
    }

    public static void UserChangeSoulCollectionRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory()) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int id = slea.readInt();
        short slot = slea.readShort();
        SoulCollectionEntry soul = ii.getSoulCollection(id);
        Item item = player.getInventory(MapleInventoryType.USE).getItem(slot);
        if (soul == null || item == null || item.getQuantity() <= 0) {
            c.sendEnableActions();
            return;
        }
        int itemId = item.getItemId();
        if (soul.getItems().containsKey(itemId)) {
            int n = (int) Math.pow(2, soul.getItems().get(itemId));
            player.getSoulCollection().merge(id, n, (a, b) -> a | b);
            player.setSoulCollectionChanged(true);
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, true, false);
            MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
            mplew.writeOpcode(SendPacketOpcode.LP_ChangeSoulCollectionResult);
            mplew.writeInt(id);
            mplew.writeInt(player.getSoulCollection().get(id));
            c.announce(mplew.getPacket());
        }
        c.sendEnableActions();
    }

    public static void ComboCheckRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int quest = slea.readInt();
        int value = slea.readInt();
        slea.readInt();
        player.updateOneQuestInfo(quest, "ComboK", String.valueOf(value));
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_CompleteSpecialCheckSuccess);
        mplew.writeInt(quest);
        c.announce(mplew.getPacket());
    }

    public static void JobFreeChangeRequest(MaplePacketReader slea, MapleCharacter player) {
        int jobId = slea.readInt();
        if (!JobConstants.is冒險家(player.getJob()) || !JobConstants.is冒險家(jobId) || jobId / 100 != player.getJob() / 100) {
            return;
        }
        byte unknown = slea.readByte();
        player.freeJobChange(jobId);
    }

    public static void ErosionsrReduce(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || !JobConstants.is亞克(player.getJob())) {
            return;
        }
        slea.readInt();
        if (player.getBuffedValue(MapleBuffStat.侵蝕控制) != null && player.getBuffSource(MapleBuffStat.IndieInvincible) != 亞克.根源的記憶) {
            player.addErosions(-19);
            if (player.getErosions() <= 0) {
                player.dispelEffect(MapleBuffStat.侵蝕控制);
                player.registerSkillCooldown(player.getSkillEffect(亞克.精神力枯竭), true);
            }
        }
    }

    public static void SelflessState(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        slea.readInt();
        MapleStatEffect effect = player.getSkillEffect(slea.readInt());
        if (effect != null) {
            effect.applyTo(player);
        }
    }

    public static void ReqMakingSkillEff(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int skillId = slea.readInt();
        int n = skillId / 10000 % 10;
        if (player.getSkillLevel(skillId) >> 24 >= 12) {
            if (player.getMeisterSkillEff() > 0) {
                player.updateOneQuestInfo(25948, "E", "0");
            } else {
                player.updateOneQuestInfo(25948, "E", String.valueOf(n));
            }
            player.updateOneQuestInfo(25948, "E", (player.getMeisterSkillEff() > 0) ? String.valueOf(n) : "0");
        } else {
            player.updateOneQuestInfo(25948, "E", "0");
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_UserMakingMeisterSkillEff);
        mplew.writeInt(player.getId());
        mplew.writeInt(player.getMeisterSkillEff());
        player.getMap().broadcastMessage(player, mplew.getPacket(), true);
    }

    public static void UserSetCustomizeEffect(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int skillId = slea.readInt();
        int n2 = 0;
        slea.readInt();
        MapleQuest quest = MapleQuest.getInstance(7292);
        final String custom = player.getQuestNAdd(quest).getCustomData();
        if (skillId == 0 && custom != null) {
            n2 = skillId = Integer.valueOf(custom);
        }
        switch (skillId) {
            case 3110003: {
                if (n2 != 0) {
                    quest.forceStart(player, 0, "0");
                    player.changeSingleSkillLevel(80011504, -1, (byte) -1);
                    return;
                }
                quest.forceStart(player, 0, String.valueOf(skillId));
                player.changeSingleSkillLevel(80011504, 1, (byte) 0);
            }
            case 3110004: {
                if (n2 != 0) {
                    quest.forceStart(player, 0, "0");
                    player.changeSingleSkillLevel(80000269, -1, (byte) -1);
                    return;
                }
                quest.forceStart(player, 0, String.valueOf(skillId));
                player.changeSingleSkillLevel(80000269, 1, (byte) 0);
                break;
            }
        }
    }

    public static void TowerRankRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        List<MapleLobbyRank> lobbyRanks = SqlTool.queryAndGetList("SELECT * FROM `zrank_lobby` WHERE `world` = ? ORDER BY `stage` DESC, `time` ASC LIMIT 50", new LobbyRankMapper(), player.getWorld());
        List<MapleLobbyRank> list = new ArrayList<>();
        for (MapleLobbyRank rank : lobbyRanks) {
            final Calendar instance = Calendar.getInstance();
            final Calendar instance2 = Calendar.getInstance();
            instance.setFirstDayOfWeek(Calendar.MONDAY);
            instance2.setFirstDayOfWeek(Calendar.MONDAY);
            instance.setTimeInMillis(System.currentTimeMillis());
            instance2.setTimeInMillis(rank.logtime);
            final int n = instance.get(Calendar.YEAR) - instance2.get(Calendar.YEAR);
            if (n == 0 || n == 1 && instance2.get(Calendar.MONTH) == 11) {
                if (instance.get(Calendar.WEEK_OF_YEAR) == instance2.get(Calendar.WEEK_OF_YEAR)) {
                    list.add(rank);
                }
            } else if (n == -1 && instance.get(Calendar.MONTH) == 11 && instance.get(Calendar.WEEK_OF_YEAR) == instance2.get(Calendar.WEEK_OF_YEAR)) {
                list.add(rank);
            }
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeOpcode(SendPacketOpcode.LP_TopTowerRankResult);
        mplew.writeInt(list.size());
        for (final MapleLobbyRank rank : list) {
            mplew.writeInt(rank.playerID);
            mplew.writeInt(rank.world);
            mplew.writeAsciiString(rank.playerName, 15);
            mplew.writeInt(rank.stage);
            mplew.writeLong(rank.time);
            PacketHelper.addExpirationTime(mplew, rank.logtime);
        }
        c.announce(mplew.getPacket());
    }

    public static void UserCalcDamageStatSetRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null) {
            return;
        }
        player.getStat().recalcLocalStats(false, player);
    }

    public static void UserCharacterPotentialRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory()) {
            return;
        }
        player.updateTick(slea.readInt());
        if (slea.readByte() == 1) {
            for (InnerSkillEntry ise : player.getTempInnerSkills()) {
                player.changeInnerSkill(ise);
            }
        }
        player.getTempInnerSkills().clear();
    }

    public static void UserTemporaryStatUpdateRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        final MapleStatEffect effecForBuffStat;
        if ((effecForBuffStat = player.getEffectForBuffStat(MapleBuffStat.PickPocket)) != null) {
            effecForBuffStat.unprimaryPassiveApplyTo(player);
        }
        if (JobConstants.is爆拳槍神(player.getJob())) {
            player.dispelEffect(MapleBuffStat.RWMovingEvar);
        }
    }

    /*
     * 林之靈隱藏耳朵或者尾巴
     * Tail = 尾巴
     * Ear = 耳朵
     * 59300 = 林之靈的耳朵和尾巴的任務ID
     *
     * 5012000 - 林之靈透明耳朵 - 只有#c林之靈#可以使用的透明耳朵。雙擊可以遮住林之靈的耳朵或重現顯示。
     * 5012001 - 林之靈透明尾巴 - 只有#c林之靈#可以使用的透明尾巴。雙擊可以遮住林之靈的尾巴或重現顯示。
     */
    public static void HideTailAndEar(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory()) {
            return;
        }
        int itemId = slea.readInt();
        String key = itemId == 5012000 ? "bEar" : itemId == 5012001 ? "bTail" : null;
        if (!JobConstants.is幻獸師(player.getJob())) {
            player.dropAlertNotice("當前職業無法使用此道具");
            return;
        }
        if ((itemId == 5012000 || itemId == 5012001) && key != null && player.haveItem(itemId) && MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, itemId, (short) 1, false, true)) {
            int questId = 59300;
            //檢測當前角色是否有這個任務的信息
            if ("1".equals(player.getQuestInfo(questId, key))) {
                player.updateOneQuestInfo(questId, key, "0");
            } else {
                player.updateOneQuestInfo(questId, key, "1");
            }
            player.getMap().broadcastMessage(player, InventoryPacket.hiddenTailAndEar(player.getId(), itemId == 5012001, player.getQuestInfo(questId, key).equals("1")), true);
        }
        c.sendEnableActions();
    }

    public static void CrystalCharge(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || !JobConstants.is伊利恩(player.getJob())) {
            return;
        }
        final int skillId = slea.readInt();
        final MapleSummon summon = player.getSummonBySkillID(伊利恩.古代水晶);
        if (summon == null) {
            return;
        }
        int n = 0;
        if (player.getSkillEffect(伊利恩.完成水晶衝刺) != null) {
            n = 150;
        } else if (player.getSkillEffect(伊利恩.熟練水晶衝刺) != null) {
            n = 150;
        } else if (player.getSkillEffect(伊利恩.水晶衝刺) != null) {
            n = 30;
        }
        final int acState1 = summon.getAcState1();
        final int acState2 = summon.getAcState2();
        int n2 = 1;
        switch (skillId) {
            case 伊利恩.技藝_子彈:
            case 伊利恩.技藝_子彈Ⅱ: {
                n2 = 2;
                break;
            }
        }
        if (player.getBuffedValue(MapleBuffStat.快速充能) != null) {
            n2 <<= 1;
        }
        summon.setAcState1(Math.min(acState1 + n2, n));
        if (summon.getAcState1() >= 0 && summon.getAcState1() < 30) {
            summon.setAcState2(0);
        } else if (summon.getAcState1() >= 30 && summon.getAcState1() < 60) {
            summon.setAcState2(1);
            if (acState2 != 1) {
                c.announce(SummonPacket.SummonedSkillState(summon, 2));
            }
        } else if (summon.getAcState1() >= 60 && summon.getAcState1() < 90) {
            summon.setAcState2(2);
            if (acState2 != 2) {
                c.announce(SummonPacket.SummonedSkillState(summon, 2));
            }
        } else if (summon.getAcState1() >= 90 && summon.getAcState1() < 150) {
            summon.setAcState2(3);
            if (acState2 != 3) {
                c.announce(SummonPacket.SummonedSkillState(summon, 2));
            }
        } else if (summon.getAcState1() >= 150) {
            summon.setAcState2(4);
            if (acState2 != 4) {
                c.announce(SummonPacket.SummonedSkillState(summon, 2));
            }
            final MapleStatEffect g = SkillFactory.getSkill(伊利恩.完成水晶衝刺).getEffect(1);
            if (g != null) {
                g.applyTo(player);
            }
        }
        player.getMap().broadcastMessage(player, SummonPacket.SummonedStateChange(summon, 2, summon.getAcState1(), summon.getAcState2()), true);
        player.getMap().broadcastMessage(player, SummonPacket.SummonedSpecialEffect(summon, 2), true);
        player.getMap().broadcastMessage(player, SummonPacket.SummonedStateChange(summon, 3, 0, 0), true);

    }

    public static void RunScript(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory()) {
            return;
        }
        short script = slea.readShort();
        int mapId = slea.readInt();
        if (player.isAdmin()) {
            player.dropSpouseMessage(UserChatMessageType.遊戲描述, "[Run Script] ID:" + script + " MapID:" + mapId);
        }
        int npc = 0;
        switch (script) {
            case 18:
            case 19:
                npc = 9010106;
                break;
        }
        NPCScriptManager.getInstance().start(c, npc, "RunScript_" + script);
    }

    public static void MapleUnionPresetRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory()) {
            return;
        }
        if (player.getMapleUnion() == null) {
            return;
        }
        int idx = slea.readInt();
        c.announce(MaplePacketCreator.MapleUnionPresetResult(idx, player.getMapleUnion()));
    }

    public static void cashItemOpRequest(MaplePacketReader slea, MapleClient c) {
        int magicNumber = slea.readInt();
        short type1 = slea.readShort();
        switch (type1) {
            case 0: {
                byte type2 = slea.readByte();
                switch (type2) {
                    case 7: { // 丟棄道具
                        String secondPwd = slea.readMapleAsciiString();
                        byte iv = slea.readByte();
                        byte slot = slea.readByte();
                        if (!c.CheckSecondPassword(secondPwd)) {
                            c.getPlayer().dropMessage(1, "第二組密碼不正確");
                            c.sendEnableActions();
                            return;
                        }
                        Item item = c.getPlayer().getInventory(iv).getItem(slot);
                        if (item != null) {
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.getByType(iv), slot, item.getQuantity(), true, false);
                            c.getPlayer().dropMessage(1, "你丟掉了" + item.getName() + "。");
                        } else {
                            c.getPlayer().dropMessage(1, "發生未知錯誤");
                        }
                        c.sendEnableActions();
                        break;
                    }
                }
                break;
            }
            case 1: {
                byte type2 = slea.readByte();
                switch (type2) {
                    case 3: { // 交換(寵物硬幣)
                        byte iv = slea.readByte();
                        byte slot = slea.readByte();
                        Item item = c.getPlayer().getInventory(iv).getItem(slot);
                        if (item == null || !ItemConstants.類型.寵物(item.getItemId()) || !ItemAttribute.RegressScroll.check(item.getCAttribute())) {
                            c.getPlayer().dropMessage(1, "發生未知錯誤");
                        } else if (MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.getByType(iv), slot, item.getQuantity(), true, false) && MapleInventoryManipulator.addById(c, 2434162, 1, "用寵物交換")) {
                            c.getPlayer().dropMessage(1, "獲得寵物硬幣。");
                        } else {
                            c.getPlayer().dropMessage(1, "發生未知錯誤");
                        }
                        c.sendEnableActions();
                        break;
                    }
                }
                break;
            }
            case 5: {
                int type2 = slea.readInt();
                switch (type2) {
                    case 0: { // 睿智葫蘆操作
                        if (NPCScriptManager.getInstance().getCM(c) != null) {
                            c.getPlayer().dropMessage(1, "無法使用，請嘗試使用@ea解卡後再試。");
                            return;
                        }
                        int type3 = slea.readInt();
                        switch (type3) {
                            case 0: { // 開啟睿智葫蘆幫助
                                NPCScriptManager.getInstance().start(c, 2091005, "睿智葫蘆幫助");
                                break;
                            }
                            case 1: { // 接受睿智葫蘆經驗
                                if (c.getPlayer().haveItem(2630031)) {
                                    NPCScriptManager.getInstance().start(c, 2091005, "睿智葫蘆經驗");
                                } else {
                                    c.getPlayer().dropMessage(1, "發生未知錯誤。");
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
            case 25: {
                int eqpPos = slea.readInt();
                int usePos = slea.readInt();
                byte type2 = slea.readByte();
                switch (type2) {
                    case 1: { // 結合方塊隨機潛能
                        if (eqpPos <= 0) {
                            c.sendEnableActions();
                            return;
                        }
                        final Equip eq = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((short) eqpPos);
                        final Item toUse = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem((short) usePos);
                        if (eq == null || toUse == null || toUse.getQuantity() < 1 || eq.getState(false) < 17 || EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff())) {
                            c.sendEnableActions();
                            return;
                        }
                        if (toUse.getItemId() != 5062026) { // 結合方塊
                            if (c.getPlayer().isAdmin()) {
                                c.getPlayer().dropDebugMessage(2, "[使用方塊] 此方塊未處理");
                            }
                            c.sendEnableActions();
                            return;
                        }
                        c.getPlayer().updateOneQuestInfo(65132, "n", String.valueOf(eq.getSN()));
                        int line = Randomizer.rand(0, eq.getPotential(3, false) > 0 ? 2 : 1);
                        c.getPlayer().updateOneQuestInfo(65132, "i", String.valueOf(line));
                        c.announce(MaplePacketCreator.getUniCubeRes(slea.readShort(), slea.readInt(), line));
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, toUse.getPosition(), (short) 1, false);
                        break;
                    }
                }
                break;
            }
            case 26: {
                byte type2 = slea.readByte();
                slea.readByte();
                switch (type2) {
                    case 1: // 進行結合方塊
                        int line = Integer.parseInt(c.getPlayer().getOneInfo(65132, "i"));
                        long sn = Long.parseLong(c.getPlayer().getOneInfo(65132, "n"));
                        Equip eq = null;
                        for (Item it : c.getPlayer().getInventory(MapleInventoryType.EQUIP).list()) {
                            if (sn == it.getSN()) {
                                eq = (Equip) it;
                                break;
                            }
                        }
                        if (eq != null) {
                            eq.useCube(5062026, c.getPlayer(), line + 1);
                        }
                    case 0: // 取消結合方塊
                        c.announce(MaplePacketCreator.getUniCubeRes(slea.readShort(), slea.readInt(), 1));
                        c.getPlayer().removeInfoQuest(65132);
                        break;
                }
                break;
            }
            case 31: {
                byte type2 = slea.readByte();
                switch (type2) {
                    case 1: // 日蝕裝備預覽
                        Item item = PacketHelper.GW_ItemSlotBase_Decode(slea);
                        int cid = slea.readInt();
                        int job = slea.readInt();
                        int itemId = slea.readInt();
                        if (c.getPlayer().getId() != cid || !JobConstants.is墨玄(job) || item.getItemId() != itemId || !(item instanceof Equip)) {
                            return;
                        }
                        Map<Integer, Integer> itemMap = new LinkedHashMap<>();
                        itemMap.put(1492212, 1403014); // 烏特卡勒
                        itemMap.put(1492085, 1403015); // 俠客圖斯
                        itemMap.put(1492237, 1403027); // 俠客圖斯
                        itemMap.put(1492179, 1403016); // 夫尼爾
                        itemMap.put(1492243, 1403035); // 夫尼爾
                        itemMap.put(1492246, 1403036); // 夫尼爾
                        itemMap.put(1492250, 1403036); // 夫尼爾
                        itemMap.put(1492231, 1403017); // 航海師
                        itemMap.put(1492236, 1403028); // 航海師
                        itemMap.put(1492235, 1403018); // 神秘冥界
                        itemMap.put(1492247, 1403030); // 神秘冥界
                        itemMap.put(1492244, 1403021); // 封印的創世武器
                        itemMap.put(1492245, 1403022); // 創世武器
                        itemMap.put(1492200, 1403033); // 克梅勒茲
                        itemMap.put(1492199, 1403032); // 波賽頓
                        itemMap.put(1492154, 1403031); // 戰國時代
                        itemMap.put(1492188, 1403019); // 梅斯特武器
                        if (!itemMap.containsKey(itemId)) {
                            return;
                        }
                        Equip eqp = (Equip) item;
                        int iType = slea.readByte();
                        boolean bUnk = slea.readBool();
                        slea.skip(21);
                        eqp.transmit(itemMap.get(itemId), job, false);
                        c.announce(MaplePacketCreator.getEquipTransmitRes(slea.readShort(), slea.readInt(), 1, eqp));
                        break;
                }
                break;
            }
            case 34: {
                String sCount = c.getPlayer().getKeyValue("EquipTransmitTimes");
                if (sCount == null || sCount.isEmpty() || Integer.parseInt(sCount) <= 0) {
                    return;
                }
                int slot = slea.readInt();
                slea.skip(21);
                Equip eqp = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((short) slot);
                if (eqp == null) {
                    return;
                }
                Map<Integer, Integer> itemMap = new LinkedHashMap<>();
                itemMap.put(1492212, 1403014); // 烏特卡勒
                itemMap.put(1492085, 1403015); // 俠客圖斯
                itemMap.put(1492237, 1403027); // 俠客圖斯
                itemMap.put(1492179, 1403016); // 夫尼爾
                itemMap.put(1492243, 1403035); // 夫尼爾
                itemMap.put(1492246, 1403036); // 夫尼爾
                itemMap.put(1492250, 1403036); // 夫尼爾
                itemMap.put(1492231, 1403017); // 航海師
                itemMap.put(1492236, 1403028); // 航海師
                itemMap.put(1492235, 1403018); // 神秘冥界
                itemMap.put(1492247, 1403030); // 神秘冥界
                itemMap.put(1492244, 1403021); // 封印的創世武器
                itemMap.put(1492245, 1403022); // 創世武器
                itemMap.put(1492200, 1403033); // 克梅勒茲
                itemMap.put(1492199, 1403032); // 波賽頓
                itemMap.put(1492154, 1403031); // 戰國時代
                itemMap.put(1492188, 1403019); // 梅斯特武器
                eqp.transmit(itemMap.get(eqp.getItemId()), c.getPlayer().getJob());
                c.getPlayer().forceUpdateItem(eqp);
                c.getPlayer().updateInfoQuest(501246, null);
                int nCount = Integer.parseInt(sCount) - 1;
                c.getPlayer().setKeyValue("EquipTransmitTimes", nCount <= 0 ? null : String.valueOf(nCount));
                c.announce(MaplePacketCreator.getEquipTransmitResult(slea.readShort(), slea.readInt(), 0));
                break;
            }
            case 37: { // 墨玄 技能
                int skillId = slea.readInt();
                MapleCharacter chr = c.getPlayer();
                if (chr == null) {
                    break;
                }
                if (skillId == 墨玄.神功_移形換位_1 || skillId == 墨玄.絕技_無我之境) {
                    MapleBuffStatValueHolder holder;
                    if ((holder = chr.getBuffStatValueHolder(MapleBuffStat.IndieCooldownR, skillId)) == null || holder.value < 1) {
                        chr.dispelBuff(skillId);
                        break;
                    }

                    if (--holder.value < 1) {
                        chr.dispelBuff(skillId);
                    } else {
                        chr.send(BuffPacket.giveBuff(chr, holder.effect, Collections.singletonMap(MapleBuffStat.IndieCooldownR, holder.sourceID)));
                    }

                    Skill skill = null;
                    if (skillId == 墨玄.神功_移形換位_1) {
                        skill = SkillFactory.getSkill(墨玄.神功_移形換位_2);
                    } else {
                        skill = SkillFactory.getSkill(墨玄.絕技_無我之境_1);
                    }

                    MapleStatEffect attackEffect;
                    if (skill == null || (attackEffect = chr.getSkillEffect(skill.getId())) == null) {
                        break;
                    }
                    final MapleForceFactory mff = MapleForceFactory.getInstance();
                    chr.getMap().broadcastMessage(chr, ForcePacket.forceAtomCreate(mff.getMapleForce(chr, attackEffect, 0, 0, Collections.emptyList(), chr.getPosition())), true);
                }
                break;
            }
            case 38: { // 墨玄 連擊重置/武神力量減少
                int powerType = slea.readInt();
                if (powerType == 0) {
                    c.announce(MaplePacketCreator.encodeMoxuanPower(powerType, 0, 3000, 1, null));
                } else {
                    int godPower = 0;
                    int time = 30000;
                    if (c.getPlayer().getSkillLevel(墨玄.入神) > 0) {
                        godPower = (int) c.getPlayer().getTempValues().getOrDefault("GodPower", 0);
                        godPower = Math.max(0, --godPower);
                        c.getPlayer().getTempValues().put("GodPower", godPower);
                        if (c.getPlayer().getSkillLevel(墨玄.入神_時間持續) > 0) {
                            time += 10000;
                        }
                    }
                    c.announce(MaplePacketCreator.encodeMoxuanPower(powerType, godPower, time, 0, null));
                }
                break;
            }
            case 39: { // 墨玄 神功指令鍵
                MapleCharacter chr = c.getPlayer();
                if (chr == null) {
                    break;
                }
                int godSkillMacroLine = slea.readInt();
                int godSkillMacroNumber = slea.readInt();
                int godSkillMacroSkillType = slea.readInt();
                if (godSkillMacroLine < 1 || godSkillMacroLine > 6 || godSkillMacroNumber < 1 || godSkillMacroNumber > 4 || godSkillMacroSkillType < 0 || godSkillMacroSkillType > 2) {
                    break;
                }
                chr.updateOneInfo(65899, String.format("%d-%d", godSkillMacroLine, godSkillMacroNumber), godSkillMacroSkillType == 0 ? null : String.valueOf(godSkillMacroSkillType));
                break;
            }
        }
    }

    public static void tmsSpecialRequest(MaplePacketReader slea, MapleClient c) {
        int magicNumber = slea.readInt();
        short type1 = slea.readShort();
        byte type2 = slea.readByte();
        switch (type1) {
            case 0: {
                switch (type2) {
                    case 1: {
                        // 楓方塊-設置道具
                        int src = slea.readInt();
                        slea.readByte(); // [01]
                        final Equip eq = (Equip) c.getPlayer().getInventory(src > 0 ? MapleInventoryType.EQUIP : MapleInventoryType.EQUIPPED).getItem((short) src);
                        if (EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff())) {
                            c.sendEnableActions();
                            return;
                        }
                        if (c.getPlayer().getInventory(MapleInventoryType.SETUP).findById(3994895) == null || eq == null) {
                            c.sendEnableActions();
                            return;
                        }
                        showAnimaCubeCost(slea.readShort(), slea.readInt(), c, eq);
                        break;
                    }
                    case 3: {
                        if (slea.available() <= 11) { // 方塊-洗潛能
                            final short slot = slea.readShort();
                            final short dst = slea.readShort();
                            final Item toUse = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(slot);
                            final Equip eq = (Equip) c.getPlayer().getInventory(dst > 0 ? MapleInventoryType.EQUIP : MapleInventoryType.EQUIPPED).getItem(dst);
                            if (toUse.getItemId() != 5062017 && toUse.getItemId() != 5062019 && toUse.getItemId() != 5062020 && toUse.getItemId() != 5062021 || eq == null) {//閃耀方塊 閃耀鏡射方塊 閃炫方塊 新對等方塊
                                if (c.getPlayer().isAdmin()) {
                                    c.getPlayer().dropDebugMessage(2, "[使用方塊] 此方塊未處理");
                                }
                                c.sendEnableActions();
                                return;
                            }
                            if (EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff()) || eq.getState(false) < 17) {
                                c.sendEnableActions();
                                return;
                            }

                            slea.readByte(); // [01]

                            if (eq.useCube(slea.readShort(), slea.readInt(), toUse.getItemId(), c.getPlayer())) {
                                MapleInventoryManipulator.removeFromSlot(c.getPlayer().getClient(), MapleInventoryType.CASH, slot, (short) 1, false, true);
                            }
                        } else { // 楓方塊-洗潛能
                            final short dst = (short) slea.readInt();
                            slea.readInt(); // [00 00 00 00]
                            slea.readByte(); // [01]
                            final Equip eq = (Equip) c.getPlayer().getInventory(dst > 0 ? MapleInventoryType.EQUIP : MapleInventoryType.EQUIPPED).getItem(dst);
                            if (EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff())) {
                                c.sendEnableActions();
                                return;
                            }
                            final Item cube = c.getPlayer().getInventory(MapleInventoryType.SETUP).findById(3994895);
                            if (cube == null || eq == null) {
                                c.sendEnableActions();
                                return;
                            }
                            if (!useAnimaCube(slea.readShort(), slea.readInt(), c, eq)) {
                                c.sendEnableActions();
                            }
                        }
                        break;
                    }
                    case 0xF: { // 洗方塊-女神之力
                        final Item toUse;
                        final Equip eq;
                        if (slea.available() == 19) {
                            final short slot = slea.readShort();
                            final short dst = slea.readShort();
                            toUse = c.getPlayer().getInventory(MapleInventoryType.CASH).getItem(slot);
                            eq = (Equip) c.getPlayer().getInventory(dst > 0 ? MapleInventoryType.EQUIP : MapleInventoryType.EQUIPPED).getItem(dst);
                        } else {
                            final short dst = (short) slea.readLong();
                            toUse = c.getPlayer().getInventory(MapleInventoryType.SETUP).findById(3994895);
                            eq = (Equip) c.getPlayer().getInventory(dst > 0 ? MapleInventoryType.EQUIP : MapleInventoryType.EQUIPPED).getItem(dst);
                        }
                        if (eq == null || toUse == null || EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff())) {
                            c.sendEnableActions();
                            return;
                        }
                        final int code = slea.readInt();
                        final short slot = (short) slea.readInt();
                        slea.readByte();

                        final Item rock = c.getPlayer().getInventory(MapleInventoryType.ETC).getItem(slot);
                        if (rock == null || rock.getQuantity() < 1) {
                            c.sendEnableActions();
                            return;
                        }
                        int rockId = rock.getItemId();
                        int toLock = 0;
                        boolean free = false;
                        if (rockId == 4132000) {
                            free = true;
                        } else {
                            toLock = code + 1;
                        }
                        boolean used = false;
                        if (toUse.getItemId() == 3994895) { // 楓方塊
                            used = useAnimaCube(slea.readShort(), slea.readInt(), c, eq, toLock, free);
                        } else if (toUse.getItemId() == 5062017) { // 閃耀方塊
                            if (eq.getState(false) < 17) {
                                c.sendEnableActions();
                                break;
                            }
                            used = eq.useCube(slea.readShort(), slea.readInt(), toUse.getItemId(), c.getPlayer(), toLock) && !free;
                            if (used) {
                                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, toUse.getPosition(), (short) 1, false);
                            }
                        }
                        if (used) {
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, slot, (short) 1, false);
                        } else {
                            c.sendEnableActions();
                        }
                        break;
                    }
                }
                break;
            }
            case 1: {
                switch (type2) {
                    case 1: { // 方塊-選擇潛能
                        int cubeId = Integer.parseInt(c.getPlayer().getOneInfo(GameConstants.台方塊, "u"));
                        if (cubeId == 5062017) { // 閃耀方塊
                            int selected = slea.readInt();
                            slea.readByte(); // 01
                            short opcode = slea.readShort();
                            int action = slea.readInt();
                            if (selected == 1) {
                                Equip eq = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(Short.valueOf(c.getPlayer().getOneInfo(GameConstants.台方塊, "p")));
                                if (eq.getItemId() != Integer.valueOf(c.getPlayer().getOneInfo(GameConstants.台方塊, "i"))) {
                                    c.announce(MaplePacketCreator.getAnimusCubeRes(opcode, action, 1, cubeId));
                                    c.sendEnableActions();
                                    return;
                                }
                                if (EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff())) {
                                    c.announce(MaplePacketCreator.getAnimusCubeRes(opcode, action, 1, cubeId));
                                    c.sendEnableActions();
                                    return;
                                }
                                eq.setState(Byte.valueOf(c.getPlayer().getOneInfo(GameConstants.台方塊, "s")), false);
                                String[] s = c.getPlayer().getOneInfo(GameConstants.台方塊, "o").split(",");
                                eq.setPotential(Integer.valueOf(s[0]), 1, false);
                                eq.setPotential(Integer.valueOf(s[1]), 2, false);
                                if (s.length == 3) {
                                    eq.setPotential(Integer.valueOf(s[2]), 3, false);
                                }
                                c.getPlayer().forceUpdateItem(eq);
                                c.getPlayer().removeInfoQuest(GameConstants.台方塊);
                            }
                            c.announce(MaplePacketCreator.getAnimusCubeRes(opcode, action, 1, cubeId));
                        } else if (cubeId == 5062020) { // 閃炫方塊
                            int line = slea.readByte() / 2;
                            int pots[] = new int[line];
                            for (int i = 0; i < line; i++) {
                                pots[i] = slea.readInt();
                            }
                            slea.readByte();
                            short opcode = slea.readShort();
                            int action = slea.readInt();
                            if (Integer.valueOf(c.getPlayer().getOneInfo(GameConstants.台方塊, "c")) == line) {
                                Equip eq = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(Short.valueOf(c.getPlayer().getOneInfo(GameConstants.台方塊, "p")));
                                if (eq.getItemId() != Integer.valueOf(c.getPlayer().getOneInfo(GameConstants.台方塊, "i"))) {
                                    c.announce(MaplePacketCreator.getTmsCubeRes(opcode, action, 1));
                                    c.sendEnableActions();
                                    return;
                                }
                                if (EnhanceResultType.EQUIP_MARK.check(eq.getEnchantBuff())) {
                                    c.announce(MaplePacketCreator.getTmsCubeRes(opcode, action, 1));
                                    c.sendEnableActions();
                                    return;
                                }
                                List<Integer> potList = new ArrayList<>();
                                for (String p : c.getPlayer().getOneInfo(GameConstants.台方塊, "o").split(",")) {
                                    potList.add(Integer.parseInt(p));
                                }
                                for (int pot : pots) {
                                    if (!potList.contains(pot)) {
                                        c.announce(MaplePacketCreator.getTmsCubeRes(opcode, action, 1));
                                        c.sendEnableActions();
                                        return;
                                    } else {
                                        potList.remove(potList.indexOf(pot));
                                    }
                                }
                                for (int i = 0; i < pots.length; i++) {
                                    eq.setPotential(pots[i], i + 1, false);
                                }
                                c.getPlayer().forceUpdateItem(eq);
                                c.getPlayer().removeInfoQuest(GameConstants.台方塊);
                            }
                            c.announce(MaplePacketCreator.getTmsCubeRes(opcode, action, 0));
                        }
                        break;
                    }
                }
                break;
            }
        }
    }

    private static boolean showAnimaCubeCost(short opcode, int action, MapleClient c, Equip eq) {
        return animaCubeAction(opcode, action, c, eq, false, 0, false);
    }

    private static boolean useAnimaCube(short opcode, int action, MapleClient c, Equip eq) {
        return animaCubeAction(opcode, action, c, eq, true, 0, false);
    }

    private static boolean useAnimaCube(short opcode, int action, MapleClient c, Equip eq, int toLock, boolean free) {
        return animaCubeAction(opcode, action, c, eq, true, toLock, false);
    }

    private static boolean animaCubeAction(short opcode, int action, MapleClient c, Equip eq, boolean use, int toLock, boolean free) {
        String[] potStates = {"n", "r", "e", "u", "l"};// 無潛能,特殊,稀有,罕見,傳說
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        DateFormat fmt = new SimpleDateFormat("yyyyMMdd");
        Date dateQuest;
        Date dateNow = new Date();
        try {
            dateQuest = c.getPlayer().getOneInfo(GameConstants.楓方塊, "d") != null ? fmt.parse(c.getPlayer().getOneInfo(GameConstants.楓方塊, "d")) : new Date();
        } catch (ParseException ex) {
            dateQuest = new Date();
        }
        if (Integer.parseInt(sdf.format(dateNow)) - Integer.parseInt(sdf.format(dateQuest)) > 0) {
            c.getPlayer().updateOneInfo(GameConstants.楓方塊, "d", sdf.format(dateNow), false);
            for (String s : potStates) {
                c.getPlayer().updateOneInfo(GameConstants.楓方塊, s, "0", false);
            }
        }

        Map<String, Integer> animaCubePotTimes = new HashMap<>();
        for (String s : potStates) {
            animaCubePotTimes.put(s, c.getPlayer().getOneInfo(GameConstants.楓方塊, s) == null ? 0 : Integer.parseInt(c.getPlayer().getOneInfo(GameConstants.楓方塊, s)));
        }

        int potentialState = eq.getState(false);
        if (potentialState >= 17) {
            potentialState -= 16;
        }

        if (eq.getCurrentUpgradeCount() == 0 && eq.getRestUpgradeCount() == 0 && !ItemConstants.類型.副手(eq.getItemId()) && !ItemConstants.類型.能源(eq.getItemId()) && !ItemConstants.類型.特殊潛能道具(eq.getItemId()) || MapleItemInformationProvider.getInstance().isCash(eq.getItemId()) || ItemConstants.類型.無法潛能道具(eq.getItemId())) {
            c.getPlayer().dropMessage(1, "在這道具無法使用。");
            c.announce(MaplePacketCreator.getAnimaCubeRes(opcode, action, 3, 0));
            return false;
        }

        if (ItemConstants.類型.特殊潛能道具(eq.getItemId()) && potentialState == 0) {
            c.getPlayer().dropMessage(1, "此道具只能透過專用潛能捲軸來進行潛能設定.請設定潛能後再使用.");
            c.announce(MaplePacketCreator.getAnimaCubeRes(opcode, action, 3, 0));
            return false;
        }

        String state = potStates[potentialState];
        int value = 0;
        if (use) {
            value = 2;

            long price = ItemConstants.方塊.getMapleCubeCost(animaCubePotTimes.get(state), potentialState);
            if (c.getPlayer().getMeso() < price && !free) {
                return false;
            }

            if (potentialState == 0) {
                eq.renewPotential(false);
                eq.magnify();
                c.getPlayer().forceUpdateItem(eq);
                eq.addAttribute(ItemAttribute.TradeBlock.getValue());
            } else if (!eq.useCube(3994895, c.getPlayer(), toLock)) {
                return false;
            }

            eq.addAttribute(ItemAttribute.AnimaCube.getValue());

            if (!free) {
                c.getPlayer().gainMeso(-price, false);
            }
            c.getPlayer().updateOneInfo(GameConstants.楓方塊, state, String.valueOf(animaCubePotTimes.get(state) + 1), false);
            for (String s : potStates) {
                animaCubePotTimes.put(s, c.getPlayer().getOneInfo(GameConstants.楓方塊, s) == null ? 0 : Integer.parseInt(c.getPlayer().getOneInfo(GameConstants.楓方塊, s)));
            }
            potentialState = eq.getState(false);
            if (potentialState >= 17) {
                potentialState -= 16;
            }
            state = potStates[potentialState];
        }
        c.announce(MaplePacketCreator.getAnimaCubeRes(opcode, action, value, ItemConstants.方塊.getMapleCubeCost(animaCubePotTimes.get(state), potentialState)));
        return true;
    }

    public static void AvatarEffectSkillOnOff(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        int skillId = slea.readInt();
        if (c.getPlayer().getSkillEffect(skillId) == null) {
            return;
        }
        String statData = c.getPlayer().getOneInfo(1544, String.valueOf(skillId));
        if (statData == null || statData.equals("0")) {
            statData = String.valueOf(1);
        } else {
            statData = String.valueOf(0);
        }
        c.getPlayer().updateOneInfo(1544, String.valueOf(skillId), statData, true);

        MapleBuffStat stat = null;
        switch (skillId) {
            case 英雄.鬥氣集中:
                stat = MapleBuffStat.ComboCounter;
                break;
        }

        if (stat != null) {
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(stat);
            if (mbsvh != null) {
                player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(stat, mbsvh.effect.getSourceId())));
            }
        }
    }

    public static void handleSkillOnOff(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        int skillId = slea.readInt();
        String skillTag = null;
        int questID = 21770;
        switch (skillId) {
            case 狂狼勇士.猛擲之矛:
                skillTag = "1";
                break;
            case 狂狼勇士.突刺之矛:
                skillTag = "2";
                break;
            case 狂狼勇士.挑飛:
                skillTag = "3";
                break;
            case 狂狼勇士.旋風斬:
                skillTag = "4";
                break;
            case 狂狼勇士.鬥氣審判:
                skillTag = "5";
                break;
            case 狂狼勇士.一網打盡:
                skillTag = "6";
                break;
            case 狂狼勇士.終極之矛:
                skillTag = "7";
                break;
            case 狂狼勇士.極速巔峰_恐懼風暴:
                skillTag = "8";
                break;
            case 狂狼勇士.極速巔峰_目標鎖定:
                skillTag = "9";
                break;
            case 惡魔.惡魔跳躍:
                skillTag = "ds0";
                break;
            case 阿戴爾.懸浮:
                skillTag = "lw0";
                break;
            default:
                questID = 1544;
                skillTag = String.valueOf(skillId);
                break;
        }
        String statData = c.getPlayer().getOneInfo(questID, skillTag);
        if (statData == null || statData.equals("0")) {
            statData = String.valueOf(1);
        } else {
            statData = String.valueOf(0);
        }
        c.getPlayer().updateOneInfo(questID, skillTag, statData, true);

        MapleBuffStatValueHolder holder;
        if (80011993 == skillId && (holder = player.getBuffStatValueHolder(skillId)) != null) {
            player.send(BuffPacket.giveBuff(player, holder.effect, Collections.singletonMap(MapleBuffStat.艾爾達斯的祝福, holder.sourceID)));
        }
    }

    public static void AndroidShop(MaplePacketReader slea, MapleCharacter chr) {
        int cid = slea.readInt();
        int androidType = slea.readInt();
        int unk1 = slea.readInt();
        int unk2 = slea.readInt();
        MapleAndroid android = chr.getAndroid();
        if (android == null || android.getType() != androidType || chr.getId() != cid) {
            chr.getClient().sendEnableActions();
            return;
        }

        if (!MapleItemInformationProvider.getInstance().getAndroidInfo(androidType).shopUsable && android.getShopTime() < System.currentTimeMillis()) {
            chr.getClient().sendEnableActions();
            return;
        }

        MapleShop shop = MapleShopFactory.getInstance().getShop(9330194);
        if (shop == null) {
            chr.dropMessage(1, "商店不存在，請回報給管理員。");
            chr.getClient().sendEnableActions();
            return;
        }
        shop.sendShop(chr.getClient());
    }

    public static void CompleteNpcSpeech(MaplePacketReader slea, MapleCharacter chr) {
        int questID = slea.readInt();
        int npcID = slea.readInt();
        byte questStatus = slea.readByte();
        int npcOID = slea.readInt();
        if (chr == null || chr.getMap() == null || chr.getMap().getNPCByOid(npcOID) == null || chr.getMap().getNPCByOid(npcOID).getId() != npcID || chr.getQuestStatus(questID) != questStatus) {
            return;
        }
        // TODO
        if (questID == 34307) {
            MapleQuest.getInstance(questID).forceComplete(chr, npcID);
        }
    }

    public static void ChangeAndroidAntenna(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getAndroid() == null) {
            return;
        }
        int slot = slea.readInt();
        int itemId = slea.readInt();
        Item toUse = player.getInventory(MapleInventoryType.USE).getItem((short) slot);
        if (toUse == null || toUse.getItemId() != itemId || (itemId != 2892000 && itemId != 2892001) || player.getAndroid().getItemId() == 1662033 || player.getAndroid().getItemId() == 1662034) {
            player.dropMessage(1, "無法使用。");
            c.sendEnableActions();
            return;
        }
        if (MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, (short) slot, (short) 1, true)) {
            player.getAndroid().setAntennaUsed(!player.getAndroid().isAntennaUsed());
            player.setAndroid(player.getAndroid());
            c.sendEnableActions();
            player.dropMessage(1, "更變完成。");
        } else {
            player.dropMessage(1, "無法使用。");
            c.sendEnableActions();
        }
    }

    public static void HoYoungHealRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        int skillID = slea.readInt();
        int skillID2 = slea.readInt();
        MapleStatEffect eff = null;
        if ((eff = player.getEffectForBuffStat(MapleBuffStat.太乙仙丹)) != null) {
            player.handleHoYoungValue(eff.getX(), eff.getY());
        }
        switch (skillID) {
            case 黑騎士.黑暗靈氣: {
                MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.IndieShield, skillID);
                if (mbsvh == null) {
                    return;
                }
                int maxHP = player.getStat().getCurrentMaxHP();
                int shield = Math.min(maxHP * mbsvh.effect.getY() / 100, maxHP);
                if (mbsvh.value < shield) {
                    return;
                }
                mbsvh.value = shield;
                player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(MapleBuffStat.IndieShield, mbsvh.effect.getSourceId())));
                break;
            }
            case 菈菈.山環抱: {
                MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.IndieShield, 菈菈.山環抱_額外護盾);
                if (mbsvh == null) {
                    return;
                }
                int maxHP = player.getStat().getCurrentMaxHP();
                int shield = Math.min(mbsvh.value + (maxHP * mbsvh.effect.getX() / 100), maxHP);
                if (mbsvh.value >= shield) {
                    return;
                }
                mbsvh.value = shield;
                player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(MapleBuffStat.IndieShield, mbsvh.effect.getSourceId())));
                break;
            }
        }
    }

    public static void BossPartyCheckRequest(MaplePacketReader slea, MapleClient c) {
        int bossType = slea.readInt();
        BossList boss = BossList.getType(bossType);
        int difficulty = slea.readInt();
        int unk_2 = slea.readInt();
        if (c.getPlayer() == null || boss == null) {
            c.announce(MaplePacketCreator.getBossPartyCheckDone(6, difficulty, unk_2));
            return;
        }
        if (c.getPlayer().getParty() == null) {
            c.announce(MaplePacketCreator.getBossPartyCheckDone(0, difficulty, unk_2));
            return;
        }
        for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMemberList()) {
            if (!mpc.isOnline()) {
                c.announce(MaplePacketCreator.getBossPartyCheckDone(3, difficulty, unk_2));
                return;
            }
            if (boss.getQuestId(difficulty) > 0 && mpc.getChr().getQuestStatus(boss.getQuestId(difficulty)) != 2) {
                c.announce(MaplePacketCreator.getBossPartyCheckDone(2, difficulty, unk_2));
                return;
            }
            if (boss.getMinLevel(difficulty) > mpc.getLevel()) {
                c.announce(MaplePacketCreator.getBossPartyCheckDone(4, difficulty, unk_2));
                return;
            }
        }
        if (c.getPlayer().inEvent()) {
            c.announce(MaplePacketCreator.getBossPartyCheckDone(5, difficulty, unk_2));
            return;
        }
        c.announce(MaplePacketCreator.getBossPartyCheckDone(1, difficulty, unk_2));
    }

    public static void WaitQueueRequest(MaplePacketReader slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        BossListType type = BossListType.getType(slea.readByte());
        int unk1 = slea.readInt();
        int bossType = slea.readInt();
        BossList boss = BossList.getType(bossType); // 要打的BOSS難度
        int difficulty = slea.readInt();
        if (boss == null) {
            c.getPlayer().dropMessage(1, "BOSS傳送錯誤[" + bossType + "]請反饋給管理員.");
            return;
        }
        if (boss.getQuestId(difficulty) > 0 && c.getPlayer().getQuestStatus(boss.getQuestId(difficulty)) != 2) {
            c.getPlayer().dropMessage(1, "確認BOSS需要出現的任務.");
            return;
        }
        if (boss.getMinLevel(difficulty) > c.getPlayer().getLevel()) {
            c.getPlayer().dropMessage(1, "確認是否可進入的等級.");
            return;
        }
        switch (type) {
            case FindPart:
                c.announce(MaplePacketCreator.getShowBossListWait(c.getPlayer(), 11, new int[]{2, unk1, boss.getValue(), boss.getMapId(difficulty)}));
                c.announce(MaplePacketCreator.getShowBossListWait(c.getPlayer(), 20, new int[]{2}));
                c.announce(MaplePacketCreator.getShowBossListWait(c.getPlayer(), 18, new int[]{0, unk1, boss.getValue()}));
                break;
            case Waiting:
                c.announce(MaplePacketCreator.getShowBossListWait(c.getPlayer(), 11, new int[]{5, unk1, boss.getValue(), 0}));
                break;
            case Join:
                c.announce(MaplePacketCreator.getShowBossListWait(c.getPlayer(), 11, new int[]{12, unk1, boss.getValue(), 0}));
                c.announce(MaplePacketCreator.updateInfoQuest(GameConstants.BossList, "mapR=" + c.getPlayer().getMapId()));
                c.sendEnableActions();
                c.getPlayer().saveLocation(SavedLocationType.BPReturn);
                if (boss.getSkillId() > 0) {
                    Skill skill = SkillFactory.getSkill(boss.getSkillId());
                    if (skill != null) {
                        MapleStatEffect effect = skill.getEffect(1);
                        if (effect != null) {
                            effect.applyTo(c.getPlayer());
                        }
                    }
                }
                c.getPlayer().changeMap(boss.getMapId(difficulty), 0);
                break;
            case Exit:
                c.announce(MaplePacketCreator.getShowBossListWait(c.getPlayer(), 11, new int[]{5, unk1, boss.getValue(), 0}));
                break;
            default:
                break;
        }
    }

    public static void fieldTransferRequest(final MaplePacketReader lea, MapleCharacter chr) {
        if (chr.getMap() == null || chr.checkEvent() || chr.getMap().isBossMap()) {
            chr.dropMessage(1, "所在區域無法執行該動作！");
            return;
        }
        int questID = lea.readInt();
        int toMap = 0;
        String mapID = String.valueOf(chr.getMapId());
        switch (questID) {
            case 7860:
                toMap = 910001000;
                if (chr.getMapId() == toMap) {
                    chr.dropMessage(1, "所在區域無法執行該動作！");
                    return;
                }
                String cooltime = chr.getOneInfo(questID, "coolTime");
                long timeNow = System.currentTimeMillis();
                if (cooltime != null && !"".equals(cooltime) && DateUtil.getStringToTime(cooltime, "yyyy/MM/dd HH:mm:ss") > timeNow) {
                    chr.dropMessage(1, "現在還無法使用。");
                    return;
                }
                MapleQuest.getInstance(questID).forceStart(chr, 0, "link");
                chr.updateOneInfo(questID, "returnMap", mapID);
                chr.updateOneInfo(questID, "coolTime", DateUtil.getPreTime("m", 30));
                break;
            case 26015:
                toMap = 200000301;
                if (chr.getMapId() == toMap) {
                    chr.dropMessage(1, "所在區域無法執行該動作！");
                    return;
                }
                MapleQuest.getInstance(questID).forceStart(chr, 0, "link");
                chr.updateOneInfo(questID, "returnMap", mapID);
                MapleQuest.getInstance(26010).forceStart(chr, 0, mapID);
                break;
        }
        if (toMap == 0) {
            return;
        }
        MapleMap map = chr.getClient().getChannelServer().getMapFactory().getMap(toMap);
        chr.changeMap(map);
    }

    public static void previewChoiceBeautyCard(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int slot = slea.readInt();
        int cardItemID = slea.readInt();

        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean success = cardItemID / 10000 == 515 && ii.isChoice(cardItemID);
        int nGender;

        boolean isAngel = false;
        boolean isZero = false;
        boolean isBeta = false;
        long androidSN = 0;
        if (slot > 0) {
            isZero = slea.readBool();
            boolean nUnk = slea.readBool();
            isAngel = slea.readBool() && !isZero && JobConstants.is天使破壞者(chr.getJob());
            isBeta = slea.readBool() && !isZero && JobConstants.is神之子(chr.getJob());
            Item card = chr.getInventory(MapleInventoryType.CASH).getItem((short) slot);
            success = success && card.getItemId() == cardItemID && card.getQuantity() > 0;
            nGender = isBeta ? 1 : chr.getGender();
        } else {
            byte b1 = slea.readByte(); // 0
            byte b2 = slea.readByte(); // 1
            androidSN = slea.readLong();
            success = success && chr.getAndroid() != null && chr.getAndroid().getUniqueId() == androidSN;
            nGender = chr.getAndroid().getGender();
        }

        List<Integer> beautyList = new LinkedList<>();
        List<Integer> beautyList2 = new LinkedList<>();
        if (success) {
            if (cardItemID / 1000 == 5151) {
                int base = (int) Math.floor((slot == 0 ? chr.getAndroid().getHair() : !isAngel ? chr.getHair() : chr.getSecondHair()) / 10) * 10;
                int base2 = (int) Math.floor(chr.getSecondHair() / 10) * 10;
                for (int i = 0; i < 10; i++) {
                    if (ii.isHairExist(base + i)) {
                        beautyList.add(i);
                    }
                    if (!isZero) {
                        continue;
                    }
                    if (ii.isHairExist(base2 + i)) {
                        beautyList2.add(i);
                    }
                }
            } else {
                List<RaffleItem> itemList = RafflePool.getItems(cardItemID);
                for (RaffleItem item : itemList) {
                    if (item.getItemId() / 1000 == 0 || item.getItemId() / 1000 == 2 || item.getItemId() / 1000 == 12) {
                        beautyList.add(item.getItemId() % 1000);
                        if (!isZero) {
                            continue;
                        }
                        beautyList2.add(item.getItemId() % 1000);
                    } else {
                        if (ItemConstants.類型.getGender(item.getItemId()) == nGender || ItemConstants.類型.getGender(item.getItemId()) >= 2) {
                            beautyList.add(item.getItemId());
                        }
                        if (!isZero) {
                            continue;
                        }
                        if (ItemConstants.類型.getGender(item.getItemId()) == 1 || ItemConstants.類型.getGender(item.getItemId()) >= 2) {
                            beautyList2.add(item.getItemId());
                        }
                    }
                }
            }
        }
        if (!success || beautyList.size() <= 0 || (isZero && beautyList2.size() <= 0)) {
            c.announce(MaplePacketCreator.getBeautyListFailed(cardItemID));
            return;
        }

        if (slot > 0) {
            if (isZero) {
                c.announce(MaplePacketCreator.getBeautyListZero(slot, cardItemID, beautyList, beautyList2));
            } else {
                c.announce(MaplePacketCreator.getBeautyList(slot, cardItemID, isAngel, isBeta, beautyList));
            }
        } else {
            c.announce(MaplePacketCreator.getBeautyListAndroid(cardItemID, androidSN, beautyList));
        }
    }

    public static void ChangeNameRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (c == null || player == null || player.getMap() == null) {
            c.announce(InventoryPacket.ChangeNameResult(1, 0));
            return;
        }
        int cid = slea.readInt();
        if (!slea.readBool()) {
            return;
        }
        int itemID = slea.readInt();
        String oldName = slea.readMapleAsciiString();
        String newName = slea.readMapleAsciiString();
        if (player.getId() != cid || !player.getName().equals(oldName) || oldName.equals(newName)) {
            c.announce(InventoryPacket.ChangeNameResult(2, 0));
            return;
        }
        if (!player.haveItem(itemID)) {
            c.announce(InventoryPacket.ChangeNameResult(3, 0));
            return;
        }
        if (!MapleCharacterUtil.canCreateChar(newName, player.isIntern())) {
            if (MapleCharacterUtil.getIdByName(newName) == -1) {
                c.announce(InventoryPacket.ChangeNameResult(6, 0));
            } else {
                c.announce(InventoryPacket.ChangeNameResult(7, 0));
            }
            return;
        }
        player.removeItem(itemID, 1);
        player.setName(newName);
        c.announce(InventoryPacket.ChangeNameResult(0, 0));
    }

    public static void ChangeNamePwCheck(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (c == null || player == null || player.getMap() == null) {
            c.announce(InventoryPacket.ChangeNameResult(1, 0));
            return;
        }
        String secondPw = slea.readMapleAsciiString();
        if (!c.CheckSecondPassword(secondPw)) {
            c.announce(InventoryPacket.ChangeNameResult(10, 0));
            return;
        }
        int itemID = slea.readInt();
        if (!player.haveItem(itemID)) {
            c.announce(InventoryPacket.ChangeNameResult(3, 0));
            return;
        }
        c.announce(InventoryPacket.ChangeNameResult(9, itemID));
    }

    public static void CombingRoomActionReq(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        int styleType = slea.readByte();
        int base = 3 - styleType;

        int action = slea.readByte();
        int pos = slea.readByte();
        boolean isSecond = slea.readBool();

        Map<Integer, List<Pair<Integer, Integer>>> combingRoomInventorys = chr.getSalon();
        switch (action) {
            case 2: // 梳化間儲存造型
                slea.readByte();
                if (base < 1 || base > 3) {
                    chr.dropMessage(1, "因未知錯誤，儲存失敗。");
                } else {
                    int styleID = base == 1 ? chr.getSkinColor() : base == 2 ? chr.getFace() : chr.getHair();
                    int nMixValue = -1000;
                    if (base == 3) {
                        nMixValue = chr.getHairBaseColor();
                        nMixValue = (byte) Math.min(Math.max(nMixValue, -1), 9);
                        String sMixValue = String.valueOf(nMixValue);
                        nMixValue = chr.getHairMixedColor();
                        nMixValue = (byte) Math.min(Math.max(nMixValue, 0), 9);
                        sMixValue += String.valueOf(nMixValue);
                        nMixValue = chr.getHairProbColor();
                        nMixValue = (byte) Math.min(Math.max(nMixValue, 0), 99);
                        sMixValue += StringUtil.getLeftPaddedStr(String.valueOf(nMixValue), '0', 2);
                        nMixValue = Integer.valueOf(sMixValue);
                    }
                    if (JobConstants.is天使破壞者(chr.getJob()) || JobConstants.is神之子(chr.getJob())) {
                        if (isSecond) {
                            styleID = base == 1 ? chr.getSecondSkinColor() : base == 2 ? chr.getSecondFace() : chr.getSecondHair();
                            if (base == 3) {
                                nMixValue = chr.getSecondHairBaseColor();
                                nMixValue = (byte) Math.min(Math.max(nMixValue, -1), 9);
                                String sMixValue = String.valueOf(nMixValue);
                                nMixValue = chr.getSecondHairMixedColor();
                                nMixValue = (byte) Math.min(Math.max(nMixValue, 0), 9);
                                sMixValue += String.valueOf(nMixValue);
                                nMixValue = chr.getSecondHairProbColor();
                                nMixValue = (byte) Math.min(Math.max(nMixValue, 0), 99);
                                sMixValue += StringUtil.getLeftPaddedStr(String.valueOf(nMixValue), '0', 2);
                                nMixValue = Integer.valueOf(sMixValue);
                            }
                        }
                    }
                    if (combingRoomInventorys != null && combingRoomInventorys.containsKey(base) && combingRoomInventorys.get(base).size() > pos && combingRoomInventorys.get(base).get(pos).getLeft() == 0) {
                        Pair<Integer, Integer> pair = new Pair(styleID, nMixValue);
                        combingRoomInventorys.get(base).remove(pos);
                        combingRoomInventorys.get(base).add(pos, pair);
                        c.announce(MaplePacketCreator.encodeUpdateCombingRoomSlotRes(styleType, action, pos, pair));
                    }
                }
                c.announce(MaplePacketCreator.encodeCombingRoomActionRes(styleType, action, 1));
                break;
            case 3: // 梳化間移除造型
                slea.readByte();
                if (combingRoomInventorys != null && combingRoomInventorys.containsKey(base) && combingRoomInventorys.get(base).size() > pos && combingRoomInventorys.get(base).get(pos).getLeft() != 0) {
                    slea.readInt(); // styleId
                    slea.readByte(); // mix
                    slea.readByte();
                    slea.readByte();

                    combingRoomInventorys.get(base).remove(pos);
                    combingRoomInventorys.get(base).add(pos, new Pair<>(0, -1000));
                    c.announce(MaplePacketCreator.encodeUpdateCombingRoomSlotRes(styleType, action, pos, new Pair<>(0, -1000)));
                } else {
                    chr.dropMessage(1, "因未知錯誤，刪除失敗。");
                }
                c.announce(MaplePacketCreator.encodeCombingRoomActionRes(styleType, action, 1));
                break;
            case 4: // 梳化間套用造型
                if (combingRoomInventorys == null || !combingRoomInventorys.containsKey(base) || combingRoomInventorys.get(base).size() < pos) {
                    chr.dropMessage(1, "因未知錯誤，套用失敗。");
                } else {
                    int value = combingRoomInventorys.get(base).get(pos).getLeft();
                    int nMixValue = combingRoomInventorys.get(base).get(pos).getRight();
                    int chrValue = base == 1 ? chr.getSkinColor() : base == 2 ? chr.getFace() : chr.getHair();
                    if (!JobConstants.is天使破壞者(chr.getJob()) && !JobConstants.is神之子(chr.getJob())) {
                        isSecond = false;
                    }
                    if (isSecond) {
                        chrValue = base == 1 ? chr.getSecondSkinColor() : base == 2 ? chr.getSecondFace() : chr.getSecondHair();
                    }
                    int chrMixValue = -1000;
                    if (base == 3) {
                        if (isSecond) {
                            chrMixValue = chr.getSecondHairBaseColor();
                            chrMixValue = (byte) Math.min(Math.max(chrMixValue, -1), 9);
                            String sMixValue = String.valueOf(chrMixValue);
                            chrMixValue = chr.getSecondHairMixedColor();
                            chrMixValue = (byte) Math.min(Math.max(chrMixValue, 0), 9);
                            sMixValue += String.valueOf(chrMixValue);
                            chrMixValue = chr.getSecondHairProbColor();
                            chrMixValue = (byte) Math.min(Math.max(chrMixValue, 0), 99);
                            sMixValue += StringUtil.getLeftPaddedStr(String.valueOf(chrMixValue), '0', 2);
                            chrMixValue = Integer.valueOf(sMixValue);
                        } else {
                            chrMixValue = chr.getHairBaseColor();
                            chrMixValue = (byte) Math.min(Math.max(chrMixValue, -1), 9);
                            String sMixValue = String.valueOf(chrMixValue);
                            chrMixValue = chr.getHairMixedColor();
                            chrMixValue = (byte) Math.min(Math.max(chrMixValue, 0), 9);
                            sMixValue += String.valueOf(chrMixValue);
                            chrMixValue = chr.getHairProbColor();
                            chrMixValue = (byte) Math.min(Math.max(chrMixValue, 0), 99);
                            sMixValue += StringUtil.getLeftPaddedStr(String.valueOf(chrMixValue), '0', 2);
                            chrMixValue = Integer.valueOf(sMixValue);
                        }
                    }
                    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                    if ((ItemConstants.類型.getGender(value) < 2 && (JobConstants.is神之子(chr.getJob()) && isSecond ? 1 : chr.getGender()) != ItemConstants.類型.getGender(value))
                            || (value == chrValue && nMixValue == chrMixValue) || (base == 1 && !ii.isSkinExist(value)) || (base == 2 && !ii.isFaceExist(value)) || (base == 3 && !ii.isHairExist(value))) {
                        chr.dropMessage(1, "因未知錯誤，套用失敗。");
                    } else {
                        if (base == 1) {
                            if (isSecond) {
                                chr.setSecondSkinColor((byte) value);
                                if (JobConstants.is天使破壞者(chr.getJob())) {
                                    c.announce(MaplePacketCreator.DressUpInfoModified(chr));
                                } else if (JobConstants.is神之子(chr.getJob())) {
                                    c.announce(MaplePacketCreator.zeroInfo(chr, 0x8, true));
                                }
                            } else {
                                chr.setSkinColor((byte) value);
                                chr.updateSingleStat(MapleStat.皮膚, value);
                            }
                        } else if (base == 2) {
                            if (isSecond) {
                                chr.setSecondFace(value);
                                if (JobConstants.is天使破壞者(chr.getJob())) {
                                    c.announce(MaplePacketCreator.DressUpInfoModified(chr));
                                } else if (JobConstants.is神之子(chr.getJob())) {
                                    c.announce(MaplePacketCreator.zeroInfo(chr, 0x20, true));
                                }
                            } else {
                                chr.setFace(value);
                                chr.updateSingleStat(MapleStat.臉型, value);
                            }
                        } else if (base == 3) {
                            if (isSecond) {
                                chr.setSecondHair(value);
                                chr.setSecondHairBaseColor((byte) (nMixValue / 1000));
                                nMixValue = Math.abs(nMixValue % 1000);
                                chr.setSecondHairMixedColor((byte) (nMixValue / 100));
                                chr.setSecondHairProbColor((byte) (nMixValue % 100));
                                if (JobConstants.is天使破壞者(chr.getJob())) {
                                    c.announce(MaplePacketCreator.DressUpInfoModified(chr));
                                } else if (JobConstants.is神之子(chr.getJob())) {
                                    c.announce(MaplePacketCreator.zeroInfo(chr, 0x210, true));
                                }
                            } else {
                                chr.setHair(value);
                                chr.setHairBaseColor((byte) (nMixValue / 1000));
                                nMixValue = Math.abs(nMixValue % 1000);
                                chr.setHairMixedColor((byte) (nMixValue / 100));
                                chr.setHairProbColor((byte) (nMixValue % 100));
                                chr.updateSingleStat(MapleStat.髮型, value);
                            }
                        }
                        Pair<Integer, Integer> pair = new Pair(chrValue, chrMixValue);
                        combingRoomInventorys.get(base).remove(pos);
                        combingRoomInventorys.get(base).add(pos, pair);
                        c.announce(MaplePacketCreator.encodeUpdateCombingRoomSlotRes(styleType, action, pos, pair));
                        chr.equipChanged();
                    }
                }
                c.announce(MaplePacketCreator.encodeCombingRoomRes(styleType, action, 4));
                c.sendEnableActions();
                break;
        }
    }

    public static void updateBulletCount(MaplePacketReader slea, MapleCharacter chr) {
        int skillid = slea.readInt();
        final MapleBuffStatValueHolder mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.Bullet_Count, skillid);
        if (mbsvh == null) {
            return;
        }
        final int value = mbsvh.value - 1;
        if (value < 0) {
            return;
        }
        mbsvh.value = value;
        mbsvh.startTime = System.currentTimeMillis();
        chr.send(BuffPacket.giveBuff(chr, mbsvh.effect, Collections.singletonMap(MapleBuffStat.Bullet_Count, mbsvh.effect.getSourceId())));
    }

    public static void Auto5thRevenant_ReduceAnger(MaplePacketReader slea, MapleCharacter chr) {
        int a1 = slea.readInt();
        if (a1 == 1) {
            return;
        }
        MapleBuffStatValueHolder mbsvh;
        if ((mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.亡靈)) != null) {
            if (mbsvh.z > 0) {
                mbsvh.z = Math.max(0, mbsvh.z - (int) Math.ceil(mbsvh.z * mbsvh.effect.getQ2() / 100.0));
                chr.send(BuffPacket.giveBuff(chr, mbsvh.effect, Collections.singletonMap(MapleBuffStat.亡靈, mbsvh.effect.getSourceId())));
            }
        }
    }

    public static void Auto5thRevenantReduceHP(MaplePacketReader slea, MapleCharacter chr) {
        int a1 = slea.readInt();
        if (a1 == 1) {
            return;
        }
        int a2 = slea.readInt();
        int a3 = slea.readInt();
        int skillid = slea.readInt();
        int a4 = slea.readInt();
        int a5 = slea.readInt();
        MapleBuffStatValueHolder mbsvh;
        if (skillid == 惡魔復仇者.亡靈_1 && (mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.亡靈_受傷)) != null) {
            if (mbsvh.x > 0) {
                PlayerStats stats = chr.getStat();
                if (stats.getHp() > 1) {
                    int hpChange = Math.min(stats.getHp() - 1, (mbsvh.z + stats.getCurrentMaxHP() * mbsvh.effect.getY() / 100) / 25);
                    chr.addHPMP(-hpChange, 0, true);
                }
                mbsvh.x -= 1;
                if (mbsvh.x <= 0) {
                    chr.dispelEffect(MapleBuffStat.亡靈_受傷);
                } else {
                    chr.send(BuffPacket.giveBuff(chr, mbsvh.effect, Collections.singletonMap(MapleBuffStat.亡靈_受傷, mbsvh.effect.getSourceId())));
                }
            }
        }
    }

    public static void UseJupiterThunder(MaplePacketReader slea, MapleCharacter chr) {
        int skillid = slea.readInt();
        MapleStatEffect effect;
        if (skillid != 冰雷.眾神之雷 || chr.isSkillCooling(skillid) || (effect = chr.getSkillEffect(skillid)) == null) {
            return;
        }
        int a1 = slea.readInt();
        int a2 = slea.readInt();
        int a3 = slea.readInt();
        Point pos = slea.readPosInt();
        int a4 = slea.readInt();
        int a5 = slea.readInt();
        if (!effect.applyTo(chr)) {
            return;
        }
        chr.getMap().broadcastMessage(MaplePacketCreator.createJupiterThunder(chr.getId(), pos, a4, a5, skillid, 30, a1, a2, a3));
    }

    public static void JupiterThunderAction(MaplePacketReader slea, MapleCharacter chr) {
        int a1 = slea.readInt();
        int a2 = slea.readInt();
        int cid = slea.readInt();
        if (cid != chr.getId()) {
            return;
        }
        int skillid = slea.readInt();
        if (skillid != 冰雷.眾神之雷) {
            return;
        }
        int a3 = slea.readInt();
        int a4 = 0;
        int a5 = 0;
        int a6 = 0;
        int a7 = 0;
        if (a1 == 1) {
            a4 = slea.readInt();
            a5 = slea.readInt();
            a6 = slea.readInt();
            a7 = slea.readInt();
        }
        chr.getMap().broadcastMessage(MaplePacketCreator.jupiterThunderAction(chr.getId(), a1, a2, a3, a4, a5, a6, a7));
    }

    public static void JupiterThunderEnd(MaplePacketReader slea, MapleCharacter chr) {
        int a1 = slea.readInt();
        int a2 = slea.readInt();
        int bulletCount = slea.readInt();
        MapleStatEffect effect = chr.getSkillEffect(冰雷.眾神之雷);
        if (effect != null && bulletCount > 0) {
            chr.reduceSkillCooldown(冰雷.眾神之雷, bulletCount * (int) (effect.getInfoD().get(MapleStatInfo.t) * 1000));
        }
        chr.getMap().broadcastMessage(MaplePacketCreator.jupiterThunderEnd(chr.getId(), a1, a2));
    }

    public static void SurplusSupplyRecover(MaplePacketReader slea, MapleCharacter chr) {
        final MapleStatEffect effect = chr.getSkillEffect(傑諾.蓄能系統);
        final int buffedIntValue = chr.getBuffedIntValue(MapleBuffStat.超載模式);
        if (effect != null && chr.getCheatTracker().canNextRecoverPower(buffedIntValue > 0)) {
            int value = chr.getBuffedIntValue(MapleBuffStat.SurplusSupply);
            if (value < SkillConstants.dY(chr.getJob()) * 5 + buffedIntValue) {
                chr.setBuffStatValue(MapleBuffStat.SurplusSupply, 傑諾.蓄能系統, value + 1);
                effect.unprimaryPassiveApplyTo(chr);
            }
        }
    }

    public static void Auto5thGoddessBless(MaplePacketReader slea, MapleCharacter chr) {
        int a1 = slea.readInt();
        MapleBuffStatValueHolder mbsvh = chr.getBuffStatValueHolder(MapleBuffStat.光子射線);
        if (mbsvh != null) {
            mbsvh.z = a1;
            chr.send(BuffPacket.giveBuff(chr, mbsvh.effect, Collections.singletonMap(MapleBuffStat.光子射線, mbsvh.effect.getSourceId())));
        }
    }

    public static void handleRevolvingCannon(MaplePacketReader slea, MapleCharacter chr) {
        slea.readByte();
        int skillId = slea.readInt();
        if (skillId == 爆拳槍神.旋轉加農砲 && chr.getSkillEffect(skillId) != null) {
            chr.send(MaplePacketCreator.encodeSetItemNextTime(4658201885006282455L, System.currentTimeMillis()));
        }
    }

    public static void CreateForceAtomObject(MaplePacketReader lea, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.getMap().isTown() || player.getBuffStatValueHolder(MapleBuffStat.龍脈讀取) == null) {
            return;
        }
        int idk1 = lea.readByte();
        int idx = lea.readInt();
        int b1 = lea.readByte();
        Point pos = lea.readPosInt();
        int b2 = lea.readInt();
        ForceAtomObject obj = new ForceAtomObject(player.getSpecialStat().gainForceCounter(), 20, 0, player.getId(), 0, 菈菈.龍脈讀取);
        obj.Idk1 = idk1;
        obj.Position = new Point(0, 1);
        obj.Idk2 = b2;
        obj.ObjPosition = pos;
        obj.B1 = true;
        obj.addX(b1);
        obj.addX(idx);
        player.getForceAtomObjects().put(obj.Idx, obj);
        player.send(AdelePacket.ForceAtomObject(player.getId(), Collections.singletonList(obj), 0));
    }

    public static void SkillStageChangeRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        int skillID = slea.readInt();
        int duration = slea.readInt();
        MapleBuffStat stat = null;
        switch (skillID) {
            case 聖騎士.聖十字架:
                stat = MapleBuffStat.SKILL_STAGE;
                break;
        }
        if (stat != null) {
            MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(stat);
            if (mbsvh != null && mbsvh.effect != null) {
                mbsvh.value += 1;
                player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(stat, mbsvh.effect.getSourceId())));
            }
        }
    }

    public static void ForceAtomNextTarget(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        slea.readInt();
        slea.readInt();
        int oid = slea.readInt();
        slea.readInt();
        slea.readInt();
    }

    public static void DivineJudgmentStatReset(MaplePacketReader slea, MapleCharacter player) {
        if (player == null) {
            return;
        }

        Map<Integer, Pair<Long, Integer>> divineJudgmentInfos = (Map<Integer, Pair<Long, Integer>>) player.getTempValues().computeIfAbsent("神聖審判計數", k -> new LinkedHashMap<>());
        int nCount = slea.readInt();
        for (int i = 0; i < nCount; i++) {
            divineJudgmentInfos.remove(slea.readInt());
        }
    }

    public static void ReincarnationModeSelect(MaplePacketReader slea, MapleCharacter player) {
        if (player == null) {
            return;
        }
        int mode = slea.readInt();
        if (mode < 1 || mode > 3) {
            return;
        }
        MapleStatEffect effect = player.getSkillEffect(黑騎士.轉生契約);
        if (effect == null || player.isSkillCooling(effect.getSourceId())) {
            return;
        }
        player.getTempValues().put("ReincarnationMode", mode);
        effect.applyTo(player);
    }

    public static void PoisonAreaCreate(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        MapleStatEffect effect = player.getSkillEffect(火毒.劇毒領域);
        if (player.getSummonBySkillID(火毒.劇毒領域) == null || effect == null) {
            return;
        }
        int action = slea.readByte();
        int nCount = slea.readInt();
        for (int i = 0; i < nCount; i++) {
            effect.applyAffectedArea(player, slea.readPosInt());
        }
    }

    public static void PoisonAreaRemove(MaplePacketReader slea, MapleCharacter player) {
        int oid = slea.readInt();
        int unknown = slea.readInt(); // 4
        MapleAffectedArea area = player.getMap().getAffectedAreaByOid(oid);
        if (area != null) {
            area.cancel();
            player.getMap().disappearMapObject(area);
        }
    }

    public static void ApplyAffectAreaEffect(MaplePacketReader slea, MapleCharacter player) {
        if (player == null || player.getMap() == null) {
            return;
        }
        MapleAffectedArea area = player.getMap().getAffectedAreaByOid(slea.readInt());
        if (area == null || area.getOwnerId() != player.getId() || area.getSkillID() != slea.readInt()) {
            return;
        }
        area.handleMonsterEffect(player.getMap(), -1);
    }

    public static void SpeedMirageObjectCreate(MaplePacketReader slea, MapleCharacter player) {
        if (player == null) {
            return;
        }
        MapleStatEffect effect = player.getSkillEffect(箭神.閃光幻象II);
        MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.閃光幻象);
        if (mbsvh == null || (effect == null && (effect = mbsvh.effect) == null)) {
            return;
        }
        slea.readByte();
        int nCount = slea.readInt();
        if (nCount > effect.getW()) {
            return;
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(SendPacketOpcode.LP_UserEffectLocal);
        mplew.write(EffectOpcode.UserEffect_SpeedMirage.getValue());
        mplew.writeInt(箭神.閃光幻象);
        mplew.writeInt(player.getId());
        mplew.writeInt(nCount);
        mplew.writePosInt(slea.readPosInt());
        for (int i = 0; i < nCount; i++) {
            int x = slea.readByte();
            mplew.write(x);
            mplew.writeInt(slea.readInt()); // index
            MapleMonster mob = player.getMap().getMobObject(slea.readInt());
            if (mob != null) {
                ForceAtomObject obj = new ForceAtomObject(player.getSpecialStat().gainForceCounter(), 39, 0, player.getId(), Randomizer.isSuccess(50) ? 90 : -90, 箭神.閃光幻象_1);
                obj.Target = mob.getObjectId();
                obj.CreateDelay = 480;
                obj.EnableDelay = 30;
                obj.Expire = 3000;
                obj.Position = new Point(0, 6);
                obj.ObjPosition = new Point(mob.getPosition());
                obj.addX(x);
                player.getMap().broadcastMessage(AdelePacket.ForceAtomObject(player.getId(), Collections.singletonList(obj), 0), player.getPosition());
            }
            mplew.writeInt(slea.readInt()); // 不知
            if (i + 1 < nCount) {
                mplew.writePosInt(slea.readPosInt());
            }
        }
        if (slea.available() > 0) {
            if (player.isDebug()) {
                player.dropDebugMessage(0, "閃光幻象處理出錯");
            }
        } else {
            player.getMap().broadcastMessage(player, mplew.getPacket(), true);
        }
        mbsvh.value = 0;
        mbsvh.effect.unprimaryPassiveApplyTo(player);
    }

    public static void SilhouetteMirageCharge(MaplePacketReader slea, MapleCharacter chr) {
        int skillid = slea.readInt();
        MapleStatEffect effect;
        if (skillid != 箭神.殘影幻象 || (effect = chr.getSkillEffect(skillid)) == null) {
            return;
        }
        effect.applyBuffEffect(chr, chr, effect.getBuffDuration(chr), false, false, true, null);
    }
}
