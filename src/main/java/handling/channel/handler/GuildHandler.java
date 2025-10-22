package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.skills.Skill;
import client.skills.SkillFactory;
import configs.ServerConfig;
import handling.opcode.GuildOpcode;
import handling.world.WorldAllianceService;
import handling.world.WorldFindService;
import handling.world.WorldGuildService;
import handling.world.guild.MapleGuild;
import handling.world.guild.MapleGuildCharacter;
import server.buffs.MapleStatEffect;
import tools.types.Pair;
import packet.GuildPacket;
import tools.data.MaplePacketReader;

import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class GuildHandler {

    private static final Map<String, Pair<Integer, Long>> invited = new HashMap<>(); //[角色名字] [[公會ID] [邀請的時間]]
    private static final List<Integer> ApplyIDs = new ArrayList<>(); //在申請中的角色ID
    private static final ReentrantReadWriteLock applyIDsLock = new ReentrantReadWriteLock();
    private static long nextPruneTime = System.currentTimeMillis() + 60 * 1000;

    public static void addApplyIDs(int id) {
        applyIDsLock.readLock().lock();
        try {
            ApplyIDs.add(id);
        } finally {
            applyIDsLock.readLock().unlock();
        }
    }

    public static void removeApplyIDs(int id) {
        applyIDsLock.readLock().lock();
        try {
            if (ApplyIDs.contains(id)) {
                ApplyIDs.remove(Integer.valueOf(id));
            }
        } finally {
            applyIDsLock.readLock().unlock();
        }
    }

    /*
     * 拒絕公會邀請
     */
    public static void DenyGuildRequest(String from, MapleClient c) {
        MapleCharacter cfrom = c.getChannelServer().getPlayerStorage().getCharacterByName(from);
        if (cfrom != null && invited.remove(c.getPlayer().getName().toLowerCase()) != null) {
            cfrom.getClient().announce(GuildPacket.denyGuildInvitation(c.getPlayer().getName()));
        }
    }

    /*
     * 玩家自己申請加入公會
     * 如果公會沒有同意或者拒絕你的申請
     * 申請後無法向其他公會進行申請 持續時間48小時
     */
    public static void GuildApply(MaplePacketReader slea, MapleClient c) {
        if (c.getPlayer().getGuildId() > 0) {
            c.getPlayer().dropMessage(1, "您已經有公會了，無需重複申請.");
            return;
        }
        if (ApplyIDs.contains(c.getPlayer().getId())) {
            c.getPlayer().dropMessage(1, "您已經在公會申請列表中，暫時無法進行此操作.");
            removeApplyIDs(c.getPlayer().getId());
            return;
        }
        int guildId = slea.readInt(); //公會ID
        String info = slea.readMapleAsciiString();
        MapleGuildCharacter guildMember = new MapleGuildCharacter(c.getPlayer());
        guildMember.setGuildId(guildId);
        int ret = WorldGuildService.getInstance().addGuildApplyMember(guildMember, info);
        if (ret == 1) {
            addApplyIDs(c.getPlayer().getId());
            c.announce(GuildPacket.newGuildMember(guildMember, info));
            // c.announce(GuildPacket.genericGuildMessage((byte) GuildOpcode.GuildRes_JoinRequest_Done.getValue()));
        } else {
//            c.announce(GuildPacket.genericGuildMessage((byte) GuildOpcode.GuildRes_JoinRequest_Unknown.getValue()));
            c.getPlayer().dropMessage(1, "申請加入公會出現錯誤，請稍後再試.");
        }
    }

    /*
     * 接受公會申請
     * [29 01] [01] [37 75 00 00]
     * 應該是同時 接受 多少角色的公會申請
     */
    public static void AcceptGuildApply(MaplePacketReader slea, MapleClient c) {
        if (c.getPlayer().getGuildId() <= 0 || c.getPlayer().getGuildRank() > 2) { //1 == 會長, 2 == 副會長
            return;
        }
        int guildId = c.getPlayer().getGuildId();
        byte amount = slea.readByte();
        int fromId;
        MapleCharacter from;
        for (int i = 0; i < amount; i++) {
            fromId = slea.readInt(); //角色ID
            from = c.getChannelServer().getPlayerStorage().getCharacterById(fromId);
            //暫時只能處理在線的角色申請的信息
            if (from != null && from.getGuildId() <= 0) {
                from.setGuildId(guildId);
                from.setGuildRank((byte) 5);
                int ret = WorldGuildService.getInstance().addGuildMember(from.getMGC());
                if (ret == 0) {
                    from.setGuildId(0);
                    continue;
                }
                from.getClient().announce(GuildPacket.showGuildInfo(from));
                MapleGuild gs = WorldGuildService.getInstance().getGuild(guildId);
                for (byte[] pack : WorldAllianceService.getInstance().getAllianceInfo(gs.getAllianceId(), true)) {
                    if (pack != null) {
                        from.getClient().announce(pack);
                    }
                }
                from.saveGuildStatus();
                respawnPlayer(from);
            }
            if (ApplyIDs.contains(fromId)) {
                removeApplyIDs(fromId);
                break;
            }
        }
    }

    /*
     * 拒絕公會申請
     * [2A 01] [01] [37 75 00 00]
     * 應該是同時 拒絕 多少角色的公會申請
     */
    public static void DenyGuildApply(MaplePacketReader slea, MapleClient c) {
        if (c.getPlayer().getGuildId() <= 0 || c.getPlayer().getGuildRank() > 2) { //1 == 會長, 2 == 副會長
            return;
        }
        int guildId = c.getPlayer().getGuildId();
        byte amount = slea.readByte();
        int fromId;
        for (int i = 0; i < amount; i++) {
            fromId = slea.readInt(); //角色ID
            WorldGuildService.getInstance().denyGuildApplyMember(guildId, fromId);
            if (ApplyIDs.contains(fromId)) {
                removeApplyIDs(fromId);
            }
        }
    }

    /*
     * 公會操作
     */
    public static void Guild(MaplePacketReader slea, MapleClient c) {
        long currentTime = System.currentTimeMillis();
        if (currentTime >= nextPruneTime) {
            Iterator<Entry<String, Pair<Integer, Long>>> itr = invited.entrySet().iterator();
            Entry<String, Pair<Integer, Long>> inv;
            while (itr.hasNext()) {
                inv = itr.next();
                if (currentTime >= inv.getValue().right) {
                    itr.remove();
                }
            }
            nextPruneTime += 5 * 60 * 1000;
        }
        MapleCharacter chr = c.getPlayer();
        byte mode = slea.readByte();
        GuildOpcode op = GuildOpcode.getByAction(mode);
        if (op == null) {
            System.err.println("未知的公會操作：0x" + Integer.toHexString(mode));
            return;
        }
        if (chr.isDebug()) {
            chr.dropMessage(6, "[Guild Req] OptType: " + op);
        }
        GuildOpcode zt = null;
        String name;
        switch (op) {
            case GuildReq_InviteGuild: { // 226
                if (chr.getGuild() == null) {
                    zt = GuildOpcode.GuildRes_JoinGuild_Set_Refuse;
                }
                name = slea.readMapleAsciiString();
                final MapleCharacter other = WorldFindService.getInstance().findCharacterByName(name.toLowerCase());
                if (other.getGuild() != null) {
                    zt = GuildOpcode.GuildRes_JoinGuild_AlreadyJoined;
                }
                if (zt == null) {
                    other.send(GuildPacket.inviteGuildDone(chr.getGuild(), chr, other));
                    chr.send(GuildPacket.guildInvitationDone(name));
                    break;
                }
                break;
            }
            case GuildReq_WithdrawGuild: {
                final int chrId = slea.readInt();
                name = slea.readMapleAsciiString();
                if (chrId != chr.getId() || !name.equals(chr.getName()) || chr.getGuild() == null) {
                    zt = GuildOpcode.GuildRes_WithdrawGuild_NotJoined;
                }
                if (zt == null) {
                    WorldGuildService.getInstance().leaveGuild(chr.getMGC());
                }
                break;
            }
            case GuildReq_LoadGuild: //別人加入公會
                c.announce(GuildPacket.showGuildInfo(chr));
                break;
            case GuildReq_FindGuildByCid: //看其他玩家的公會信息
                int fromId = slea.readInt(); //角色ID有時是公會ID
                MapleGuild guild;
                //先查找角色信息
                MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterById(fromId);
                if (target == null) {
                    //如果角色為空就找公會ID
                    guild = WorldGuildService.getInstance().getGuild(fromId);
                    if (guild == null) {
                        chr.dropMessage(1, "找不到玩家或公會的信息.");
                        return;
                    }
                    c.announce(GuildPacket.showPlayerGuildInfo(guild));
                    return;
                }
                //角色信息不為空 判斷是否有公會
                if (target.getGuildId() <= 0) {
                    chr.dropMessage(1, "玩家[" + target.getName() + "]沒有公會.");
                    return;
                }
                //獲得公會的信息
                guild = WorldGuildService.getInstance().getGuild(target.getGuildId());
                if (guild == null) {
                    chr.dropMessage(1, "玩家[" + target.getName() + "]還沒有公會.");
                    return;
                }
                c.announce(GuildPacket.showPlayerGuildInfo(guild));
                break;
            case GuildReq_FindGuildByGID: // 查看公會信息
                MapleGuild tmpguild = WorldGuildService.getInstance().getGuild(slea.readInt());
                if (tmpguild != null) {
                    c.announce(GuildPacket.showPlayerGuildInfo(tmpguild));
                }
                break;
            case GuildReq_LoadMyApplicationList:
                c.announce(GuildPacket.showGuildLoadApplyList(null));
                break;
            case GuildReq_CheckGuildName: // 創建公會
                int cost = ServerConfig.CHANNEL_CREATEGUILDCOST;
                if (chr.getGuildId() > 0 || chr.getMapId() != 200000301) {
                    chr.dropMessage(1, "不能創建公會\r\n已經有公會或沒在公會中心");
                    return;
                } else if (chr.getMeso() < cost) {
                    chr.dropMessage(1, "你沒有足夠的楓幣創建一個公會。當前創建公會需要: " + cost + " 的楓幣.");
                    return;
                }
                String guildName = slea.readMapleAsciiString();
                if (!isGuildNameAcceptable(guildName)) {
                    chr.dropMessage(1, "你不能使用這個名字。");
                    return;
                }
                int guildId = WorldGuildService.getInstance().createGuild(chr.getId(), guildName);
                if (guildId == 0) {
                    chr.dropMessage(1, "創建公會出錯\r\n請重試一次.");
                    return;
                }
                chr.gainMeso(-cost, true, true);
                chr.setGuildId(guildId);
                chr.setGuildRank((byte) 1);
                chr.saveGuildStatus();
                WorldGuildService.getInstance().setGuildMemberOnline(chr.getMGC(), true, c.getChannel());
                c.announce(GuildPacket.createGuild(chr.getGuild()));
                chr.updateOneInfo(26011, "GuildID", String.valueOf(guildId));

                c.announce(GuildPacket.showGuildInfo(chr));
                WorldGuildService.getInstance().gainGP(chr.getGuildId(), 500, chr.getId());
                chr.dropMessage(1, "恭喜你成功創建公會.");
                respawnPlayer(chr);
                break;
            case GuildRes_CreateGuildAgree_Reply: // 接受公會邀請
                if (chr.getGuildId() > 0) {
                    return;
                }
                guildId = slea.readInt();
                fromId = slea.readInt();
                if (fromId != chr.getId()) {
                    return;
                }
                name = chr.getName().toLowerCase();
                Pair<Integer, Long> gid = invited.remove(name);
                if (gid != null && guildId == gid.left) {
                    chr.setGuildId(guildId);
                    chr.setGuildRank((byte) 5);
                    int ret = WorldGuildService.getInstance().addGuildMember(chr.getMGC());
                    if (ret == 0) {
                        chr.dropMessage(1, "嘗試加入的公會成員數已到達最高限制。");
                        chr.setGuildId(0);
                        return;
                    }
                    c.announce(GuildPacket.showGuildInfo(chr));
                    MapleGuild gs = WorldGuildService.getInstance().getGuild(guildId);
                    for (byte[] pack : WorldAllianceService.getInstance().getAllianceInfo(gs.getAllianceId(), true)) {
                        if (pack != null) {
                            c.announce(pack);
                        }
                    }
                    chr.saveGuildStatus();
                    respawnPlayer(c.getPlayer());
                }
                break;
            case GuildReq_KickGuild: // 公會驅除玩家
                int kickChrId = slea.readInt();
                String KickChrName = slea.readMapleAsciiString();
                if (chr.getGuildRank() > 2 || chr.getGuildId() <= 0) {
                    zt = GuildOpcode.GuildRes_KickGuild_Unknown;
                    break;
                }
                WorldGuildService.getInstance().expelMember(chr.getMGC(), KickChrName, kickChrId);
//                c.announce(GuildPacket.showGuildInfo(null));
                break;
            case GuildReq_RemoveGuild: // 公會驅除玩家
                if (chr.getGuildRank() > 2 || chr.getGuildId() <= 0) {
                    return;
                }
                WorldGuildService.getInstance().leaveGuild(chr.getMGC());
                break;
            case GuildReq_SetGradeNameAndAuthority: { // 公會職位職稱和權限修改
                if (chr.getGuildId() <= 0 || chr.getGuildRank() != 1) {
                    return;
                }
                byte index = slea.readByte();
                String rankName = slea.readMapleAsciiString();
                int authority = slea.readInt();
                WorldGuildService.getInstance().changeGradeNameAndAuthority(chr.getGuildId(), chr.getId(), index, rankName, authority);
                break;
            }
            case GuildReq_SetMemberGrade: // 職位變化
                fromId = slea.readInt();
                byte newRank = slea.readByte();
                if ((newRank <= 1 || newRank > 5) || chr.getGuildRank() > 2 || (newRank <= 2 && chr.getGuildRank() != 1) || chr.getGuildId() <= 0) {
                    return;
                }
                WorldGuildService.getInstance().changeRank(chr.getGuildId(), fromId, newRank);
                break;
            case GuildReq_SetNotice: // 更改公會介紹
                String notice = slea.readMapleAsciiString();
                if (chr.getGuildId() <= 0 || chr.getGuildRank() != 1) {
                    return;
                }
                WorldGuildService.getInstance().setGuildNotice(chr.getGuildId(), chr.getId(), notice);
                break;
            case GuildReq_InputMark: // 更改入會設定
                if (chr.getGuildId() <= 0 || chr.getGuildRank() != 1) {
                    return;
                }
                chr.getGuild().setAllowJoin(slea.readBool());
                chr.getGuild().setActivities(slea.readInt());
                chr.getGuild().setOnlineTime(slea.readInt());
                chr.getGuild().setAge(slea.readInt());
                chr.getGuild().broadcast(GuildPacket.changeJoinSetting(chr.getId(), chr.getGuild()));
                break;
            case GuildReq_SetMark: // 公會徽章修改
                if (chr.getGuildId() <= 0 || chr.getGuildRank() != 1) {
                    return;
                }
                if (chr.getMeso() < 1500000) {
                    chr.dropMessage(1, "楓幣不足 1500000。");
                    return;
                }
                boolean image = slea.readBool();
                if (!image) {
                    short bg = slea.readShort();
                    byte bgcolor = slea.readByte();
                    short logo = slea.readShort();
                    byte logocolor = slea.readByte();
                    WorldGuildService.getInstance().setGuildEmblem(chr.getGuildId(), chr.getId(), bg, bgcolor, logo, logocolor);
                    chr.gainMeso(-1500000, true, true);
                } else {
                    byte[] imageMark;
                    imageMark = slea.read(slea.readInt());
                    if (imageMark == null || imageMark.length <= 0 || imageMark.length > 60000) {
                        return;
                    }
                    WorldGuildService.getInstance().setGuildEmblem(chr.getGuildId(), chr.getId(), imageMark);
                    chr.gainMeso(-1500000, true, true);
                }
                respawnPlayer(c.getPlayer());
                break;
            case GuildReq_SkillLevelSetUp: // 升級公會技能
                int skillId = slea.readInt();
                byte level = slea.readByte();
                if (skillId > 0) {
                    chr.dropMessage(1, "當前暫不支持公會技能升級.");
                    return;
                }
                Skill skill = SkillFactory.getSkill(skillId);
                if (chr.getGuildId() <= 0 || skill == null || skill.getId() < 91000000) {
                    return;
                }
                //檢測新的技能等級
                int newLevel = WorldGuildService.getInstance().getSkillLevel(chr.getGuildId(), skill.getId()) + level;
                if (newLevel > skill.getMaxLevel()) {
                    return;
                }
                MapleStatEffect skillid = skill.getEffect(newLevel);
                if (skillid.getReqGuildLevel() <= 0 || chr.getMeso() < skillid.getPrice()) {
                    return;
                }
                if (WorldGuildService.getInstance().purchaseSkill(chr.getGuildId(), skillid.getSourceId(), chr.getName(), chr.getId())) {
                    chr.gainMeso(-skillid.getPrice(), true);
                }
                break;
//            case 0x3E: // 激活使用公會技能
//                skill = SkillFactory.getSkill(slea.readInt());
//                if (c.getPlayer().getGuildId() <= 0 || skill == null) {
//                    return;
//                }
//                newLevel = WorldGuildService.getInstance().getSkillLevel(chr.getGuildId(), skill.getId());
//                if (newLevel <= 0) {
//                    return;
//                }
//                MapleStatEffect skillii = skill.getEffect(newLevel);
//                if (skillii.getReqGuildLevel() < 0 || chr.getMeso() < skillii.getExtendPrice()) {
//                    return;
//                }
//                if (WorldGuildService.getInstance().activateSkill(chr.getGuildId(), skillii.getSourceid(), chr.getName())) {
//                    chr.gainMeso(-skillii.getExtendPrice(), true);
//                }
//                break;
            case GuildReq_ChangeGuildMaster: // 改變公會會長
                fromId = slea.readInt();
                if (chr.getGuildId() <= 0 || chr.getGuildRank() > 1) {
                    return;
                }
                WorldGuildService.getInstance().setGuildLeader(chr.getGuildId(), fromId);
                break;
            case GuildReq_BattleSkillOpen: // 顯示初心者技能信息
                if (chr.getGuildId() <= 0) {
                    return;
                }
                c.announce(GuildPacket.showGuildBeginnerSkill());
                break;
            case GuildReq_Search: { // 公會搜索
                int type = slea.readByte(); // 4 - 廣告
                slea.readByte();
                String searchInfo = slea.readMapleAsciiString();
                boolean equals = slea.readBool();
                boolean bUnk1 = slea.readBool();
                boolean bUnk2 = slea.readBool();
                boolean bUnk3 = slea.readBool();
                List<Pair<Integer, MapleGuild>> gui = WorldGuildService.getInstance().getGuildList();
                List<MapleGuild> guilds = new ArrayList<>();
                List<MapleGuild> guilds_list = new ArrayList<>();
                for (Pair<Integer, MapleGuild> g : gui) {
                    MapleGuildCharacter leaderObj = g.getRight().getLeader();
                    String gname = g.getRight().getName().toLowerCase();
                    if (((type == 1 || type == 3) && (equals ? gname.equals(searchInfo) : gname.contains(searchInfo.toLowerCase()))) || (leaderObj != null && (type == 2 || type == 3) && (equals ? leaderObj.equals(searchInfo) : leaderObj.getName().toLowerCase().contains(searchInfo.toLowerCase())))) {
                        guilds.add(g.getRight());
                    }
                }
                c.announce(GuildPacket.guildSearch_Results(type, searchInfo, equals, bUnk1, bUnk2, bUnk3, guilds, guilds_list)); //搜索公會
                break;
            }
            default:
                System.err.println("未處理的公會操作: " + op);
                break;
        }
        if (zt != null) {
            c.announce(GuildPacket.guildResult(zt));
        }
    }

    private static boolean isGuildNameAcceptable(String name) {
        return !(name.getBytes().length < 3 || name.getBytes().length > 12);
    }

    private static void respawnPlayer(MapleCharacter chr) {
        if (chr.getMap() == null) {
            return;
        }
        chr.getMap().broadcastMessage(GuildPacket.loadGuildName(chr));
        chr.getMap().broadcastMessage(GuildPacket.loadGuildIcon(chr));
    }
}
