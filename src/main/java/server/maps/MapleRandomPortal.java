package server.maps;

import client.MapleClient;
import constants.GameConstants;
import packet.MaplePacketCreator;

import java.awt.*;

public class MapleRandomPortal extends MapleMapObject {

    private byte portalType;
    private int mapid;
    private int owerid;
    private long startTime;
    private long duration;

    MapleRandomPortal(byte portalType, int mapid, int owerid, int duration, Point position) {
        setPosition(position);
        this.portalType = portalType;
        this.mapid = mapid;
        this.owerid = owerid;
        this.startTime = System.currentTimeMillis();
        this.duration = duration;
    }

    public byte getPortalType() {
        return portalType;
    }
    public void setPortalType(byte portalType) {
        this.portalType = portalType;
    }

    public int getMapid() {
        return mapid;
    }

    public void setMapid(int mapid) {
        this.mapid = mapid;
    }

    public int getOwerid() {
        return owerid;
    }

    public void setOwerid(int owerid) {
        this.owerid = owerid;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.RANDOM_PORTAL;
    }

    @Override
    public int getRange() {
        return Integer.MAX_VALUE;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.announce(MaplePacketCreator.getRandomPortalCreated(this));
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.announce(MaplePacketCreator.getRandomPortalRemoved(this));
    }
}
