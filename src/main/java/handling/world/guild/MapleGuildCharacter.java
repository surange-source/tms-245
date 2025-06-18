package handling.world.guild;

import client.MapleCharacter;
import packet.PacketHelper;
import tools.DateUtil;
import tools.data.MaplePacketLittleEndianWriter;

import java.io.Serializable;

public class MapleGuildCharacter implements Serializable {

    public static final long serialVersionUID = 2058609046116597760L;
    private byte channel = -1, guildrank, allianceRank;
    private int level;
    private int id, jobid, guildid, guildContribution;
    private boolean online;
    private String name;

    public MapleGuildCharacter() {
    }

    /*
     * 從在線角色讀取信息
     */
    public MapleGuildCharacter(MapleCharacter chr) {
        name = chr.getName();
        level = chr.getLevel();
        id = chr.getId();
        if (chr.getClient() != null) {
            channel = (byte) chr.getClient().getChannel();
        }
        jobid = chr.getJob();
        guildrank = chr.getGuildRank();
        guildid = chr.getGuildId();
        guildContribution = chr.getGuildContribution();
        allianceRank = chr.getAllianceRank();
        online = true;
    }

    /*
     * 從數據庫中讀取公會成員信息時需要這個
     */
    public MapleGuildCharacter(int id, short lv, String name, byte channel, int job, byte rank, int guildContribution, byte allianceRank, int guildid, boolean on) {
        this.level = lv;
        this.id = id;
        this.name = name;
        if (on) {
            this.channel = channel;
        }
        this.jobid = job;
        this.online = on;
        this.guildrank = rank;
        this.allianceRank = allianceRank;
        this.guildContribution = guildContribution;
        this.guildid = guildid;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int l) {
        level = l;
    }

    public int getId() {
        return id;
    }

    public int getChannel() {
        return channel;
    }

    public void setChannel(byte ch) {
        channel = ch;
    }

    public int getJobId() {
        return jobid;
    }

    public void setJobId(int job) {
        jobid = job;
    }

    public int getGuildId() {
        return guildid;
    }

    public void setGuildId(int gid) {
        guildid = gid;
    }

    public byte getGuildRank() {
        return guildrank;
    }

    public void setGuildRank(byte rank) {
        guildrank = rank;
    }

    public int getGuildContribution() {
        return guildContribution;
    }

    public void setGuildContribution(int c) {
        this.guildContribution = c;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean f) {
        online = f;
    }

    public String getName() {
        return name;
    }

    public byte getAllianceRank() {
        return allianceRank;
    }

    public void setAllianceRank(byte rank) {
        allianceRank = rank;
    }

    public void encodeData(MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(id);
        mplew.writeAsciiString(name, 15);
        mplew.writeInt(jobid);
        mplew.writeInt(level);
        mplew.writeInt(guildrank); //should be always 5 but whatevs
        mplew.writeInt(online ? 1 : 0); //should always be 1 too 申請列表:0
        mplew.writeLong(PacketHelper.getTime(-2));
        mplew.writeInt(allianceRank); //? could be guild signature, but doesn't seem to matter 申請列表:3
        mplew.writeInt(guildContribution); //should always 3 申請列表:0
        mplew.writeInt(0); //未知 V.117.1 新增
        mplew.writeLong(PacketHelper.getTime(-2));
        mplew.writeInt(DateUtil.getTime(System.currentTimeMillis()));
        mplew.writeLong(PacketHelper.getTime(-2)); //00 40 E0 FD 3B 37 4F 01
        mplew.writeLong(PacketHelper.getTime(-2));
    }
}
