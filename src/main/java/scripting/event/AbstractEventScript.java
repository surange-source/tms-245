package scripting.event;

import client.MapleCharacter;
import configs.BossConfig;
import server.maps.MapleMap;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class AbstractEventScript implements EventScript {
    private final Map<String, Method> methodMap = new HashMap<>();
    protected EventManager em;

    @Override
    public final void put(Object em) {
        assert em instanceof EventManager;
        this.em = (EventManager) em;
    }

    @Override
    public void init() {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }

    @Override
    public EventInstanceManager setup(int value, int value2) {
        em.setProperty("leader", "true");
        em.setProperty("state", "1");
        return em.newInstance(em.getName());
    }

    @Override
    public void playerEntry(EventInstanceManager eim, MapleCharacter player) {
    }

    @Override
    public void changedMap(EventInstanceManager eim, MapleCharacter player, int mapID) {
    }

    @Override
    public void enterField(EventInstanceManager eim, MapleCharacter player) {
    }

    @Override
    public void playerExit(EventInstanceManager eim, MapleCharacter player) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow((byte) 0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }

    @Override
    public void scheduledTimeout(EventInstanceManager eim) {
        end(eim);
    }

    @Override
    public void allMonstersDead(EventInstanceManager eim) {
    }

    @Override
    public void playerDead(EventInstanceManager eim, MapleCharacter player) {
    }

    @Override
    public boolean playerRevive(EventInstanceManager eim, MapleCharacter player) {
        return true;
    }

    @Override
    public int playerDisconnected(EventInstanceManager eim, MapleCharacter player) {
        return 0;
    }

    @Override
    public int monsterValue(EventInstanceManager eim, int mobID) {
        return 1;
    }

    @Override
    public void monsterKilled(EventInstanceManager eim, MapleCharacter chr, int mobID) {
    }

    @Override
    public void leftParty(EventInstanceManager eim, MapleCharacter player) {
        playerExit(eim, player);
    }

    @Override
    public void disbandParty(EventInstanceManager eim) {
        end(eim);
    }

    @Override
    public void cancelSchedule() {
    }

    @Override
    public void pickupItem(EventInstanceManager eim, MapleCharacter player, int itemID) {

    }

    @Override
    public void monsterDamaged(EventInstanceManager eim, MapleCharacter player, int mobID, long damage) {

    }

    @Override
    public void clearPQ(EventInstanceManager eim) {
        end(eim);
    }

    @Override
    public void startAutoInstance(EventInstanceManager eim, MapleMap map) {
    }

    protected void end(EventInstanceManager eim) {
    }

    @Override
    public final Object invokePrivateMethod(String name, Object[] args) throws NoSuchMethodException {
        try {
            if (methodMap.containsKey(name)) {
                return methodMap.get(name).invoke(this, args);
            } else {
                Method[] methods = this.getClass().getDeclaredMethods();
                for (Method method : methods) {
                    if (name.equals(method.getName())) {
                        methodMap.put(name, method);
                        return method.invoke(this, args);
                    }
                }
            }
        } catch (IllegalAccessException | InvocationTargetException ignore) {
        }
        throw new NoSuchMethodException("Function '" + name + "' is not exist.");
    }
}