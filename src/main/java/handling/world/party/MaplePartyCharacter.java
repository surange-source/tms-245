package handling.world.party;

import client.MapleCharacter;
import server.maps.TownPortal;

import java.awt.*;
import java.lang.ref.WeakReference;
import java.util.List;

/*
 * 隊伍的成員信息設置
 */
public class MaplePartyCharacter {

    private final String name;
    private int id;
    private int level;
    private int channel;
    private int jobid;
    private int mapid;
    private int doorTown = 999999999;
    private int doorTarget = 999999999;
    private int doorSkill = 0;
    private Point doorPosition = new Point(0, 0);
    private boolean online;
    private WeakReference<MapleCharacter> chr;

    public MaplePartyCharacter(MapleCharacter maplechar) {
        this.name = maplechar.getName();
        this.level = maplechar.getLevel();
        this.channel = maplechar.getClient().getChannel();
        this.id = maplechar.getId();
        this.jobid = maplechar.getJob();
        this.mapid = maplechar.getMapId();
        MaplePartyCharacter mchr = null;
        if (maplechar.getParty() != null) {
            mchr = maplechar.getParty().getMemberById(maplechar.getId());
        }
        this.online = mchr == null || mchr.online;
        this.chr = new WeakReference<>(maplechar);

        List<TownPortal> doors = maplechar.getTownPortals();
        if (doors.size() > 0) {
            TownPortal door = doors.get(0);
            this.doorTown = door.getTownMap().getId();
            this.doorTarget = door.getFieldMap().getId();
            this.doorSkill = door.getSkillId();
            this.doorPosition = door.getFieldPosition();
        } else {
            this.doorPosition = maplechar.getPosition();
        }
    }

    public MaplePartyCharacter() {
        this.name = "";
    }

    public void updateInfo(MaplePartyCharacter maplechar) {
        this.level = maplechar.level;
        this.channel = maplechar.channel;
        this.id = maplechar.id;
        this.jobid = maplechar.jobid;
        this.mapid = maplechar.mapid;
        this.online = maplechar.online;
        this.chr = new WeakReference<>(maplechar.chr.get());
        this.doorTown = maplechar.doorTown;
        this.doorTarget = maplechar.doorTarget;
        this.doorSkill = maplechar.doorSkill;
        this.doorPosition = maplechar.doorPosition;
    }

    public int getLevel() {
        return level;
    }

    public int getChannel() {
        return channel;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public int getMapid() {
        return mapid;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public int getJobId() {
        return jobid;
    }

    public int getDoorTown() {
        return doorTown;
    }

    public int getDoorTarget() {
        return doorTarget;
    }

    public int getDoorSkill() {
        return doorSkill;
    }

    public Point getDoorPosition() {
        return doorPosition;
    }

    public MapleCharacter getChr() {
        return chr.get();
    }

    public void setChr(MapleCharacter chr) {
        this.chr = new WeakReference<>(chr);
    }
}
