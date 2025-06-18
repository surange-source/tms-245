package scripting.portal;

import client.MapleClient;
import scripting.AbstractPlayerInteraction;
import server.MaplePortal;
import server.quest.MapleQuest;

public class PortalPlayerInteraction extends AbstractPlayerInteraction {

    private final MaplePortal portal;

    /**
     * @param c
     * @param portal
     */
    public PortalPlayerInteraction(MapleClient c, MaplePortal portal) {
        super(c, portal.getId(), String.valueOf(c.getPlayer().getMapId()), null);
        this.portal = portal;
    }

    /**
     * @return
     */
    public MaplePortal getPortal() {
        return portal;
    }

    public String getPortalName() {
        return portal.getName();
    }

    public void inFreeMarket() {
        if (getMapId() != 910000000) {
            if (getPlayer().getLevel() > 10) {
                saveLocation("FREE_MARKET");
                playPortalSE();
                warp(910000000, "out00");
            } else {
                playerMessage(5, "你必須10級以上才能進入自由市場。");
            }
        }
    }


    public void inArdentmill() {
        if (getMapId() != 910001000) {
            if (getPlayer().getLevel() >= 10) {
                MapleQuest.getInstance(7860).forceStart(getPlayer(), 0, "link");
                getPlayer().updateOneInfo(7860, "returnMap", String.valueOf(getMapId()));
                playPortalSE();
                warp(910001000, "st00");
            } else {
                playerMessage(5, "你必須10級以上才能進入技術村。");
            }
        }
    }

    // summon one monster on reactor location

    /**
     * @param id
     */
    @Override
    public void spawnMonster(int id) {
        spawnMonster(id, 1, portal.getPosition());
    }

    // summon monsters on reactor location

    /**
     * @param id
     * @param qty
     */
    @Override
    public void spawnMonster(int id, int qty) {
        spawnMonster(id, qty, portal.getPosition());
    }
}
