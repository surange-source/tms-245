package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleStat;
import client.stat.PlayerStats;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import configs.ServerConfig;
import constants.GameConstants;
import constants.JobConstants;
import constants.SkillConstants;
import constants.skills.凱內西斯;
import packet.MaplePacketCreator;
import tools.types.Pair;
import tools.data.MaplePacketReader;

import java.util.*;
import java.util.Map.Entry;

public class StatsHandling {

    public static void DistributeAP(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        final Map<MapleStat, Long> statupdate = new EnumMap<MapleStat, Long>(MapleStat.class);
        c.announce(MaplePacketCreator.updatePlayerStats(statupdate, true, chr));
        chr.updateTick(slea.readInt());

        PlayerStats stat = chr.getStat();
        int job = chr.getJob();
        int statLimit = ServerConfig.CHANNEL_PLAYER_MAXAP;
        if (chr.getRemainingAp() > 0) {
            switch (slea.readInt()) {
                case 64: // 力量
                    if (stat.getStr() >= statLimit) {
                        return;
                    }
                    stat.setStr((short) (stat.getStr() + 1), chr);
                    statupdate.put(MapleStat.力量, (long) stat.getStr());
                    break;
                case 128: // 敏捷
                    if (stat.getDex() >= statLimit) {
                        return;
                    }
                    stat.setDex((short) (stat.getDex() + 1), chr);
                    statupdate.put(MapleStat.敏捷, (long) stat.getDex());
                    break;
                case 256: // 智力
                    if (stat.getInt() >= statLimit) {
                        return;
                    }
                    stat.setInt((short) (stat.getInt() + 1), chr);
                    statupdate.put(MapleStat.智力, (long) stat.getInt());
                    break;
                case 512: // 幸運
                    if (stat.getLuk() >= statLimit) {
                        return;
                    }
                    stat.setLuk((short) (stat.getLuk() + 1), chr);
                    statupdate.put(MapleStat.幸運, (long) stat.getLuk());
                    break;
                case 2048: // HP
                    if (chr.getHpApUsed() >= 10000 || stat.getMaxHp() >= ServerConfig.CHANNEL_PLAYER_MAXHP) {
                        return;
                    }
                    chr.useHpAp(1);
                    break;
                case 8192: // MP
                    if (chr.getMpApUsed() >= 10000 || stat.getMaxMp() >= ServerConfig.CHANNEL_PLAYER_MAXMP) {
                        return;
                    }
                    if (!JobConstants.is零轉職業(job) && JobConstants.isNotMpJob(job)) {  //惡魔和天使不能洗
                        return;
                    } else {
                        chr.useMpAp(1);
                    }
                    break;
                default:
                    c.sendEnableActions();
                    return;
            }
            chr.setRemainingAp((short) (chr.getRemainingAp() - 1));
            statupdate.put(MapleStat.AVAILABLEAP, (long) chr.getRemainingAp());
            c.announce(MaplePacketCreator.updatePlayerStats(statupdate, true, chr));
        }
    }

    public static void DistributeSP(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        // DE 00 A8 68 C9 09 EA 03 00 00 00 00 00 00 01 00 00 00
        c.getPlayer().updateTick(slea.readInt());
        int skillid = slea.readInt();
        int amount = slea.readInt();
        amount = amount == 0 ? 1 : amount;

        Skill skill = SkillFactory.getSkill(skillid);
        if (skill == null) {
            chr.dropMessage(5, "[技能點] 伺服器無當前所處理技能!當前技能ID:" + skillid);
            c.sendEnableActions();
            return;
        }
        if (chr.isAdmin()) {
            chr.dropMessage(5, "[技能點] 開始加技能點 - 技能ID: " + skillid + " 等級: " + amount);
        }
        boolean isBeginnerSkill = false;
        int remainingSp;
        if (JobConstants.notNeedSPSkill(skillid / 10000)) {
            if (skillid == 凱內西斯.第六感知 || skillid % 10000 == 1000 || skillid % 10000 == 1001 || skillid % 10000 == 1002 || skillid % 10000 == 2) {
                final boolean resistance = skillid / 10000 == 3000 || skillid / 10000 == 3001;
                remainingSp = Math.min(chr.getLevel() - 1, resistance ? 9 : 6) - chr.getSkillLevel(SkillFactory.getSkill(skillid / 10000 * 10000 + 1000)) - chr.getSkillLevel(SkillFactory.getSkill(skillid / 10000 * 10000 + 1001)) - chr.getSkillLevel(SkillFactory.getSkill(skillid / 10000 * 10000 + (resistance ? 2 : 1002)));
                isBeginnerSkill = true;
            } else {
                if (JobConstants.notNeedSPSkill(skillid / 10000)) {
                    if (chr.isAdmin()) {
                        chr.dropMessage(5, "[技能點] 處理技能失敗，" + skillid + "為新手技能!需要再次檢測核對!");
                    }
                    c.sendEnableActions();
                    return;
                }
                remainingSp = chr.getRemainingSp(JobConstants.getSkillBookBySkill(skillid));
            }
        } else {
            if (JobConstants.notNeedSPSkill(skillid / 10000)) {
                if (chr.isAdmin()) {
                    chr.dropMessage(5, "[技能點] 處理技能失敗，" + skillid + "為新手技能!需要再次檢測核對!");
                }
                c.sendEnableActions();
                return;
            }
            remainingSp = chr.getRemainingSp(JobConstants.getSkillBookBySkill(skillid));
//            if (JobConstants.is暗影雙刀(chr.getJob())) {
//                int skillbook = JobConstants.getSkillBookBySkill(skillid);
//                if (skillbook == 0 || skillbook == 1) {
//                    remainingSp = chr.getRemainingSp(0) + chr.getRemainingSp(1);
//                } else if (skillbook == 2 || skillbook == 3) {
//                    remainingSp = chr.getRemainingSp(2) + chr.getRemainingSp(3);
//                } else {
//                    remainingSp = chr.getRemainingSp(JobConstants.getSkillBookBySkill(skillid));
//                }
//            } else {
//                remainingSp = chr.getRemainingSp(JobConstants.getSkillBookBySkill(skillid));
//            }
        }
        for (Pair<String, Byte> ski : skill.getRequiredSkills()) {
            if (ski.left.equalsIgnoreCase("level")) { //需要的等級
                if (chr.getLevel() < ski.right) {
                    if (chr.isAdmin()) {
                        chr.dropMessage(5, "加技能點錯誤 - 技能要求等級: " + ski.right + " 當前角色等級: " + chr.getLevel());
                    }
                    c.sendEnableActions();
                    return;
                }
            } else if (ski.left.equalsIgnoreCase("reqAmount")) { //需要投入的技能點數
                int reqAmount = chr.getBeastTamerSkillLevels(skillid);
                if (reqAmount < ski.right) {
                    if (chr.isAdmin()) {
                        chr.dropMessage(5, "加技能點錯誤 - 技能要求投入點數: " + ski.right + " 當前投入點數: " + reqAmount);
                    }
                    c.sendEnableActions();
                    return;
                }
            } else { //需要前置技能的等級
                int left = Integer.parseInt(ski.left);
                if (chr.getSkillLevel(SkillFactory.getSkill(left)) < ski.right) {
                    if (chr.isAdmin()) {
                        chr.dropMessage(5, "加技能點錯誤 - 前置技能: " + left + " - " + SkillFactory.getSkillName(left) + " 的技能等級不足.");
                    }
                    c.sendEnableActions();
                    return;
                }
            }
        }
        int maxlevel = skill.isFourthJob() ? chr.getMasterLevel(skill) : skill.getMaxLevel(); //技能的最大等級
        int curLevel = chr.getSkillLevel(skill); //當前技能的等級

        if (skill.isInvisible() && chr.getSkillLevel(skill) == 0) {
            if ((skill.isFourthJob() && chr.getMasterLevel(skill) == 0) || (!skill.isFourthJob() && maxlevel < 10 && !isBeginnerSkill && chr.getMasterLevel(skill) <= 0 && !JobConstants.is影武者(chr.getJob()))) {
                if (chr.isAdmin()) {
                    chr.dropMessage(5, "加技能點錯誤 - 3 檢測 -> isFourthJob : " + skill.isFourthJob() + " getMasterLevel: " + chr.getMasterLevel(skill) + " 當前技能最大等級: " + maxlevel);
                }
                c.sendEnableActions();
                return;
            }
        }
        for (int i : GameConstants.blockedSkills) {
            if (skill.getId() == i) {
                chr.dropMessage(1, "這個技能未修復，暫時無法加點.");
                c.sendEnableActions();
                return;
            }
        }
        if (chr.isAdmin()) {
            chr.dropMessage(5, "開始加技能點 - 當前Sp: " + remainingSp + " 當前技能等級: " + curLevel + " 該技能最大等級: " + maxlevel + " 所加的等級: " + amount + " 是否為該職業技能: " + skill.canBeLearnedBy(chr.getJob()));
        }
        if ((remainingSp >= amount && curLevel + amount <= maxlevel) && skill.canBeLearnedBy(chr.getJob())) {
            if (!isBeginnerSkill) {
                int skillbook = JobConstants.getSkillBookBySkill(skillid);
                chr.setRemainingSp(chr.getRemainingSp(skillbook) - amount, skillbook);
            }
            chr.updateSingleStat(MapleStat.AVAILABLESP, 0);
            chr.changeSingleSkillLevel(skill, (byte) (curLevel + amount), chr.getMasterLevel(skill));
        } else {
            if (chr.isAdmin()) {
                chr.dropMessage(5, "加技能點錯誤 - SP點數不足夠或者技能不是該角色的技能.");
            }
            c.sendEnableActions();
        }
        // 檢測並開啟名流爆擊
//        chr.AutoCelebrityCrit();
    }

    public static void AutoAssignAP(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        /*
         * Send AUTO_ASSIGN_AP [8E] (34)
         * 8E 00 - 包頭
         * 8F 82 2B 00 - 未知
         * 02 00 00 00 - 這個應該是有幾個能力點要加
         * 80 00 00 00 00 00 00 00
         * 0E 00 00 00
         * 40 00 00 00 00 00 00 00
         * 2A 00 00 00
         * ?弬+.....?..........@.......*...
         */
        if (chr == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        int autoSpSize = slea.readInt();
        if (slea.available() < autoSpSize * 12) {
            return;
        }
        int PrimaryStat = (int) slea.readLong();
        int amount = slea.readInt();
        int SecondaryStat = autoSpSize > 1 ? (int) slea.readLong() : 0;
        int amount2 = autoSpSize > 1 ? slea.readInt() : 0;
        if (amount < 0 || amount2 < 0) {
            return;
        }
        PlayerStats playerst = chr.getStat();
        boolean usedAp1 = true, usedAp2 = true;
        final Map<MapleStat, Long> statupdate = new EnumMap<MapleStat, Long>(MapleStat.class);
//        c.announce(MaplePacketCreator.updatePlayerStats(statupdate, true, chr, true));
        int statLimit = ServerConfig.CHANNEL_PLAYER_MAXAP;
        if (chr.getRemainingAp() >= amount + amount2) {
            switch (PrimaryStat) {
                case 64: // 力量
                    if (playerst.getStr() + amount > statLimit) {
                        return;
                    }
                    playerst.setStr((short) (playerst.getStr() + amount), chr);
                    statupdate.put(MapleStat.力量, (long) playerst.getStr());
                    break;
                case 128: // 敏捷
                    if (playerst.getDex() + amount > statLimit) {
                        return;
                    }
                    playerst.setDex((short) (playerst.getDex() + amount), chr);
                    statupdate.put(MapleStat.敏捷, (long) playerst.getDex());
                    break;
                case 256: // 智力
                    if (playerst.getInt() + amount > statLimit) {
                        return;
                    }
                    playerst.setInt((short) (playerst.getInt() + amount), chr);
                    statupdate.put(MapleStat.智力, (long) playerst.getInt());
                    break;
                case 512: // 幸運
                    if (playerst.getLuk() + amount > statLimit) {
                        return;
                    }
                    playerst.setLuk((short) (playerst.getLuk() + amount), chr);
                    statupdate.put(MapleStat.幸運, (long) playerst.getLuk());
                    break;
                case 2048: //最大HP
                    if (chr.getHpApUsed() >= 10000 || playerst.getMaxHp() >= ServerConfig.CHANNEL_PLAYER_MAXHP || !JobConstants.is惡魔復仇者(chr.getJob())) {
                        return;
                    }
                    chr.useHpAp(amount);
                    break;
                default:
                    usedAp1 = false;
                    break;
            }
            switch (SecondaryStat) {
                case 64: // 力量
                    if (playerst.getStr() + amount2 > statLimit) {
                        return;
                    }
                    playerst.setStr((short) (playerst.getStr() + amount2), chr);
                    statupdate.put(MapleStat.力量, (long) playerst.getStr());
                    break;
                case 128: // 敏捷
                    if (playerst.getDex() + amount2 > statLimit) {
                        return;
                    }
                    playerst.setDex((short) (playerst.getDex() + amount2), chr);
                    statupdate.put(MapleStat.敏捷, (long) playerst.getDex());
                    break;
                case 256: // 智力
                    if (playerst.getInt() + amount2 > statLimit) {
                        return;
                    }
                    playerst.setInt((short) (playerst.getInt() + amount2), chr);
                    statupdate.put(MapleStat.智力, (long) playerst.getInt());
                    break;
                case 512: // 幸運
                    if (playerst.getLuk() + amount2 > statLimit) {
                        return;
                    }
                    playerst.setLuk((short) (playerst.getLuk() + amount2), chr);
                    statupdate.put(MapleStat.幸運, (long) playerst.getLuk());
                    break;
                default:
                    usedAp2 = false;
                    break;
            }
            if ((!usedAp1 || !usedAp2) && chr.isAdmin()) {
                chr.dropMessage(5, "自動分配能力點 - 主要: " + usedAp1 + " 次要: " + usedAp2);
            }
            chr.setRemainingAp((short) (chr.getRemainingAp() - ((usedAp1 ? amount : 0) + (usedAp2 ? amount2 : 0))));
            statupdate.put(MapleStat.AVAILABLEAP, (long) chr.getRemainingAp());
            c.announce(MaplePacketCreator.updatePlayerStats(statupdate, true, chr, true));
        }
    }

    public static void DistributeHyperAP(int slot, int skillid, MapleClient c, MapleCharacter chr) {
        if (slot != 0) {
            chr.dropMessage(1, "暫時還無法使用");
            return;
        }
        Skill skill = SkillFactory.getSkill(skillid);
        int skillLevel;
        if (skill != null && skill.isHyperStat() && (skillLevel = chr.getSkillLevel(skill)) < skill.getMaxLevel()) {
            skillLevel += 1;
            int hyperAP = SkillConstants.getHyperAP(chr);
            if (hyperAP <= 0 || hyperAP < SkillConstants.getHyperStatAPNeedByLevel(skillLevel)) {
                chr.dropMessage(1, "到下個升級所需要的\r\n極限屬性點數不足。");
                return;
            }
            if (skillid == 80000406 && !(JobConstants.is惡魔殺手(chr.getJob()) || JobConstants.is神之子(chr.getJob()) || JobConstants.is陰陽師(chr.getJob()))) { //DF
                chr.dropMessage(1, "該技能只有惡魔殺手/神之子可以使用.");
            } else {
                chr.changeSingleSkillLevel(skill, skillLevel, (byte) skill.getMaxLevel());
            }
        }
        c.sendEnableActions();
    }

    public static void DistributeHyperSP(int skillid, MapleClient c, MapleCharacter chr) {
        Skill skill = SkillFactory.getSkill(skillid);
        if (skill != null && skill.isHyperSkill() && chr.getLevel() >= skill.getReqLevel() && skill.canBeLearnedBy(chr.getJob()) && chr.getSkillLevel(skill) == 0) {
            chr.changeSingleSkillLevel(skill, (byte) 1, (byte) skill.getMaxLevel());
        }
        c.sendEnableActions();
    }

    public static void ResetHyperSP(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        chr.updateTick(slea.readInt());
        int amount = slea.readShort();
        if (amount > 0) {
            Map<Integer, SkillEntry> oldList = new HashMap<>(chr.getSkills());
            Map<Integer, SkillEntry> newList = new HashMap<>();
            for (Entry<Integer, SkillEntry> toRemove : oldList.entrySet()) {
                Skill skill = SkillFactory.getSkill(toRemove.getKey());
                if (skill != null && skill.isHyperSkill() && chr.getSkillLevel(toRemove.getKey()) == 1) {
                    if (skill.canBeLearnedBy(chr.getJob())) {
                        newList.put(toRemove.getKey(), new SkillEntry((byte) 0, toRemove.getValue().masterlevel, toRemove.getValue().expiration));
                    } else {
                        newList.put(toRemove.getKey(), new SkillEntry((byte) 0, (byte) 0, -1));
                    }
                }
            }
            if (!newList.isEmpty() && chr.getMeso() >= amount * 1000000) {
                chr.gainMeso(-amount * 1000000, true, true);
                chr.changeSkillsLevel(newList);
                chr.dropMessage(1, "超級技能初始化完成\r\n本次消費楓幣: " + amount * 1000000);
            } else {
                chr.dropMessage(1, "超級技能初始化失敗，您的楓幣不足。本次需要楓幣: " + amount * 1000000);
            }
            oldList.clear();
            newList.clear();
        }
        c.sendEnableActions();
    }

    public static void ResetHyperAP(MapleClient c, MapleCharacter chr, boolean auto) {
        Map<Integer, SkillEntry> oldList = new HashMap<>(chr.getSkills());
        Map<Integer, SkillEntry> newList = new HashMap<>();
        for (Entry<Integer, SkillEntry> toRemove : oldList.entrySet()) {
            Skill skill = SkillFactory.getSkill(toRemove.getKey());
            if (skill != null && skill.isHyperStat() && chr.getSkillLevel(toRemove.getKey()) > 0) {
                newList.put(toRemove.getKey(), new SkillEntry((byte) 0, (byte) 0, -1));
            }
        }
        if (auto) {
            chr.changeSkillsLevel(newList);
        } else {
            if (!newList.isEmpty() && chr.getMeso() >= 10000000) {
                chr.gainMeso(-10000000, true, true);
                chr.changeSkillsLevel(newList);
                chr.dropMessage(1, "極限屬性點數初始化完成\r\n本次消費楓幣: " + 10000000);
            } else {
                chr.dropMessage(1, "極限屬性點數初始化失敗，您的楓幣不足。本次需要楓幣: " + 10000000);
            }
        }
        oldList.clear();
        newList.clear();
        c.sendEnableActions();
    }
}
