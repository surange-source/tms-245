package scripting.map;

import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.npc.NPCConversationManager;
import scripting.npc.INPCScript;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;

public abstract class AbstractMapScript implements INPCScript {

    protected NPCConversationManager ms;

    @Override
    public final void put(Object ms) {
        assert ms instanceof NPCConversationManager;
        this.ms = (NPCConversationManager) ms;
    }

    @Override
    public void start() {
        action(1, 0, 0);
    }

    @Override
    public void action(int mode, int type, int selection) {

    }

    protected final boolean checkEvent(String eventName, EventInstanceManager eim) {
        EventManager em = ms.getEventManager(eventName);
        return em != null && eim != null && eim.getEventManager() == em;
    }

//    protected final void spawnMonster(int mobId, int x, int y) {
//        MapleMonster monster = MapleLifeFactory.getMonster(mobId);
//        if (monster != null) {
//            EventInstanceManager eim = ms.getEventInstance();
//            if (eim != null) {
//                eim.registerMonster(monster);
//            }
//            ms.getMap().spawnMonsterOnGroundBelow(monster, new java.awt.Point(x, y));
//        }
//    }

    protected final void spawnMonster(EventInstanceManager eim, int mobId, int x, int y) {
        MapleMonster monster = MapleLifeFactory.getMonster(mobId);
        if (monster != null) {
            eim.registerMonster(monster);
            ms.getMap().spawnMonsterOnGroundBelow(monster, new java.awt.Point(x, y));
        }
    }

    protected final void spawnMonsterChangeHP(EventInstanceManager eim, int mobID, int x, int y, long changedHP) {
        MapleMonster monster = MapleLifeFactory.getMonster(mobID);
        if (monster != null) {
            monster.setChangeHP(changedHP);
            eim.registerMonster(monster);
            ms.getMap().spawnMonsterOnGroundBelow(monster, new java.awt.Point(x, y));
        }
    }
}
