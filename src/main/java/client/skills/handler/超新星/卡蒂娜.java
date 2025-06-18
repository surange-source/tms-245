package client.skills.handler.超新星;

import client.MapleBuffStat;
import client.MapleBuffStatValueHolder;
import client.MapleCharacter;
import client.MapleJob;
import client.skills.ExtraSkill;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.SkillConstants;
import handling.channel.handler.AttackInfo;
import handling.opcode.SendPacketOpcode;
import packet.BuffPacket;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.quest.MapleQuest;
import tools.data.MaplePacketLittleEndianWriter;

import java.lang.reflect.Field;
import java.util.Collections;
import java.util.Map;

import static constants.skills.卡蒂娜.*;

public class 卡蒂娜 extends AbstractSkillHandler {

    public 卡蒂娜() {
        jobs = new MapleJob[] {
                MapleJob.卡蒂娜,
                MapleJob.卡蒂娜1轉,
                MapleJob.卡蒂娜2轉,
                MapleJob.卡蒂娜3轉,
                MapleJob.卡蒂娜4轉
        };

        for (Field field : constants.skills.卡蒂娜.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int baseSkills(MapleCharacter chr, SkillClassApplier applier) {
        Skill skil;
        final int[] ss = {獨門咒語, 商團回歸, 議價};
        for (int i : ss) {
            if (chr.getLevel() < 200 && i == 獨門咒語) {
                continue;
            }
            skil = SkillFactory.getSkill(i);
            if (skil != null && chr.getSkillLevel(skil) <= 0) {
                applier.skillMap.put(i, new SkillEntry(1, skil.getMaxMasterLevel(), -1));
            }
        }
        if (chr.getQuestStatus(34624) != 2) {
            MapleQuest.getInstance(34624).forceComplete(chr, 0);
        }
        return -1;
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 武器變換Ⅰ_攻擊:
                return 武器變換Ⅰ;
            case 武器變換Ⅱ_攻擊:
                return 武器變換Ⅱ;
            case 武器變換Ⅲ_攻擊:
                return 武器變換Ⅲ;
            case 間諜移動_1:
                return 間諜移動;
            case 召喚_切割彎刀_1:
                return 召喚_切割彎刀;
            case 召喚_AD大砲_1:
                return 召喚_AD大砲;
            case 鏈之藝術_護佑_1:
                return 鏈之藝術_護佑;
            case 鏈之藝術_束縛鎖鏈_1:
            case 鏈之藝術_束縛鎖鏈_2:
            case 鏈之藝術_束縛鎖鏈_3:
            case 鏈之藝術_束縛鎖鏈_4:
            case 鏈之藝術_束縛鎖鏈_5:
            case 鏈之藝術_束縛鎖鏈_6:
            case 鏈之藝術_束縛鎖鏈_7:
                return 鏈之藝術_束縛鎖鏈;
            case 召喚_狼牙棒_1:
            case 召喚_狼牙棒_2:
                return 召喚_狼牙棒;
            case 召喚_重擊磚頭_1:
            case 召喚_重擊磚頭_2:
            case 召喚_重擊磚頭_3:
                return 召喚_重擊磚頭;
            case 召喚_炸彈投擲_1:
                return 召喚_炸彈投擲;
            case 召喚_炸裂迴旋_1:
                return 召喚_炸裂迴旋;
            case 鏈之藝術_追擊_向上發射:
            case 鏈之藝術_追擊_向下發射:
            case 鏈之藝術_追擊_向前攻擊:
            case 鏈之藝術_追擊_向上攻擊:
            case 鏈之藝術_追擊_向下攻擊:
            case 鏈之藝術_追擊_1:
                return 鏈之藝術_追擊;
            case 鏈之藝術_鞭擊_1:
                return 鏈之藝術_鞭擊;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 獨門咒語:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.MaxLevelBuff, effect.getX());
                return 1;
            case 鏈之藝術_鞭擊:
                effect.getInfo().put(MapleStatInfo.time, 1000);
                statups.put(MapleBuffStat.NextAttackEnhance, effect.getLevel());
                return 1;
            case 武器推進器:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 鏈之藝術_鎖鏈風暴:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.KeyDownMoving, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 超新星勇士:
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 職業代理人:
                statups.put(MapleBuffStat.元素精靈, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 武器變換Ⅰ:
            case 武器變換Ⅱ:
            case 武器變換Ⅲ:
                statups.put(MapleBuffStat.武器變換, 1);
                return 1;
            case 鏈之藝術_追擊_向下攻擊:
            case 鏈之藝術_追擊_向上攻擊:
                effect.getInfo().put(MapleStatInfo.time, 500);
                statups.put(MapleBuffStat.DarkSight, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 召喚_紫焱幻刀:
                monsterStatus.put(MonsterStatus.PDR, effect.getW());
                return 1;
            case 鏈之藝術_束縛鎖鏈:
                effect.getInfo().put(MapleStatInfo.time, 90000);
                monsterStatus.put(MonsterStatus.Freeze, 1);
                return 1;
            case 鏈之藝術_護佑:
                statups.put(MapleBuffStat.鏈之藝術_護佑, effect.getInfo().get(MapleStatInfo.w2));
                return 1;
            case 召喚_狼牙棒_2:
                effect.getInfo().put(MapleStatInfo.time, 15000);
                monsterStatus.put(MonsterStatus.Stun, 1);
                return 1;
            case 武器變換終章:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.武器變換終章, 0);
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 商團回歸: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
            case 武器變換Ⅰ: {
                applier.localstatups.put(MapleBuffStat.武器變換, Math.min(3, applyto.getBuffedIntValue(MapleBuffStat.武器變換) + 1));
                if (applyto.getCheatTracker().canNextBonusAttack(500)) {
                    applyto.getClient().announce(MaplePacketCreator.userBonusAttackRequest(武器變換Ⅰ_攻擊, 0, Collections.emptyList()));
                }
                return 1;
            }
            case 武器變換Ⅱ: {
                applier.localstatups.put(MapleBuffStat.武器變換, Math.min(6, applyto.getBuffedIntValue(MapleBuffStat.武器變換) + 1));
                if (applyto.getCheatTracker().canNextBonusAttack(500)) {
                    applyto.getClient().announce(MaplePacketCreator.userBonusAttackRequest(武器變換Ⅱ_攻擊, 0, Collections.emptyList()));
                }
                return 1;
            }
            case 武器變換Ⅲ: {
                applier.localstatups.put(MapleBuffStat.武器變換, Math.min(8, applyto.getBuffedIntValue(MapleBuffStat.武器變換) + 1));
                if (applyto.getCheatTracker().canNextBonusAttack(500)) {
                    applyto.getClient().announce(MaplePacketCreator.userBonusAttackRequest(武器變換Ⅲ_攻擊, 0, Collections.emptyList()));
                }
                return 1;
            }
            case 鏈之藝術_追擊_向下攻擊:
            case 鏈之藝術_追擊_向上攻擊: {
                applier.b3 = true;
                return 1;
            }
            case 武器變換終章: {
                if (!applier.primary) {
                    return 0;
                }
                applier.buffz = 0;
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyAttackEffect(MapleCharacter applyfrom, MapleMonster applyto, SkillClassApplier applier) {
        if (applyto != null) {
            if (applyfrom.getEffectForBuffStat(MapleBuffStat.鏈之藝術_護佑) != null && applyfrom.getCheatTracker().canNextElementalFocus()) {
                final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
                mplew.writeShort(SendPacketOpcode.ChainRageAction.getValue());
                mplew.writeInt(applyto.getPosition().x);
                mplew.writeInt(applyto.getPosition().y);
                applyfrom.getClient().announce(mplew.getPacket());
            }
            if (applier.effect != null && applier.effect.getSourceId() == 鏈之藝術_追擊_向前攻擊) {
                applyfrom.getClient().announce(EffectPacket.showBuffEffect(applyfrom, false, 鏈之藝術_追擊_向前攻擊, applier.effect.getLevel(), applyto.getObjectId(), applyto.getPosition()));
                applyfrom.getMap().broadcastMessage(applyfrom, EffectPacket.showBuffEffect(applyfrom, true, 鏈之藝術_追擊_向前攻擊, applier.effect.getLevel(), applyto.getObjectId(), applyfrom.getPosition()), applyto.getPosition());
            }
        }
        return 1;
    }


    public static boolean eG(final int n) {
        switch (n) {
            case 召喚_切割彎刀:
            case 召喚_黑焰鉤爪:
            case 召喚_炸裂迴旋:
            case 召喚_散彈射擊:
            case 召喚_紫焱幻刀:
            case 召喚_炸彈投擲:
            case 召喚_重擊磚頭:
            case 召喚_狼牙棒: {
                return true;
            }
            default: {
                return false;
            }
        }
    }

    @Override
    public int onAfterAttack(MapleCharacter player, SkillClassApplier applier) {
        int linkId = SkillConstants.getLinkedAttackSkill(applier.effect.getSourceId());
        if (eG(linkId)) {
            MapleStatEffect weaponChangeEffect;
            if (player.getSkillEffect(武器變換Ⅲ) != null) {
                weaponChangeEffect = player.getSkillEffect(武器變換Ⅲ);
            } else if (player.getSkillEffect(武器變換Ⅱ) != null) {
                weaponChangeEffect = player.getSkillEffect(武器變換Ⅱ);
            } else {
                weaponChangeEffect = player.getSkillEffect(武器變換Ⅰ);
            }
            if (weaponChangeEffect != null && !player.isSkillCooling(weaponChangeEffect.getSourceId())) {
                int lastId = SkillConstants.getLinkedAttackSkill(player.getCheatTracker().getLastAttackSkill());
                if (lastId != linkId) {
                    weaponChangeEffect.applyTo(player);
                }
            }
        }
        MapleBuffStatValueHolder mbsvh = player.getBuffStatValueHolder(MapleBuffStat.武器變換終章);
        if (applier.totalDamage > 0 && mbsvh != null && mbsvh.effect != null) {
            if (linkId == 鏈之藝術_鎖鏈風暴 || linkId == 鏈之藝術_束縛鎖鏈 || linkId == 鏈之藝術_強化撞擊 || linkId == 鏈之藝術_護佑) {
                mbsvh.startTime -= linkId == 鏈之藝術_護佑 ? 1000 : 2000;
            }
            if (linkId == 武器變換Ⅰ || linkId == 武器變換Ⅱ || linkId == 武器變換Ⅲ) {
                boolean update = false;
                if (mbsvh.z >= 3) {
                    if (mbsvh.value > 0) {
                        mbsvh.value = Math.max(0, mbsvh.value - 1);
                        mbsvh.startTime = System.currentTimeMillis();
                        mbsvh.z = 0;
                        update = true;
                        ExtraSkill eskill = new ExtraSkill(武器變換終章, player.getPosition());
                        eskill.Value = 5;
                        eskill.FaceLeft = player.isFacingLeft() ? 0 : 1;
                        player.send(MaplePacketCreator.RegisterExtraSkill(武器變換終章, Collections.singletonList(eskill)));
                    }
                } else {
                    mbsvh.z = Math.min(3, mbsvh.z + 1);
                    update = true;
                }
                if (update) {
                    player.send(BuffPacket.giveBuff(player, mbsvh.effect, Collections.singletonMap(MapleBuffStat.武器變換終章, mbsvh.effect.getSourceId())));
                }
            }
        }
        return 1;
    }
}
