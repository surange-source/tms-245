package scripting.event;

import client.MapleCharacter;
import scripting.DefaultScript;
import server.maps.MapleMap;

import javax.script.Invocable;
import javax.script.ScriptException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public interface EventScript extends DefaultScript {

    /**
     * 初始化，僅在腳本加載時執行一次
     */
    void init();

    /**
     * 開啟新副本前設置，返回一個新的副本實例
     * @param value 數值1
     * @param value2 數值2
     * @return EventInstanceManager 實例
     */
    EventInstanceManager setup(int value, int value2);

    /**
     * 註冊玩家並進入到副本中
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     */
    void playerEntry(EventInstanceManager eim, MapleCharacter player);

    /**
     * 玩家切換地圖時的處理
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     * @param mapID 地圖id
     */
    void changedMap(EventInstanceManager eim, MapleCharacter player, int mapID);

    /**
     * 玩家進入地圖時的處理
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     */
    void enterField(EventInstanceManager eim, MapleCharacter player);

    /**
     * 移除玩家的時候執行
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     */
    void playerExit(EventInstanceManager eim, MapleCharacter player);

    /**
     * 事件計時結束後執行
     * @param eim EventInstanceManager 實例
     */
    void scheduledTimeout(EventInstanceManager eim);

    /**
     * 所有註冊在事件裡面的怪物都死亡後執行
     * @param eim EventInstanceManager 實例
     */
    void allMonstersDead(EventInstanceManager eim);

    /**
     * 玩家在副本中死亡後執行
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     */
    void playerDead(EventInstanceManager eim, MapleCharacter player);

    /**
     * 處理玩家死亡後復活
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     * @return 是否在副本內復活
     */
    boolean playerRevive(EventInstanceManager eim, MapleCharacter player);

    /**
     * 玩家掉線後執行
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     * @return 0 - Deregister player normally Dispose instance if there are zero player left <br>
     * x that is > 0 - Deregister player normally + Dispose instance if there x player or below <br>
    // x that is < 0 - Deregister player normally + Dispose instance if there x player or below, if it's leader = boot all
     *
     */
    int playerDisconnected(EventInstanceManager eim, MapleCharacter player);

    /**
     * 殺死註冊的怪物時執行
     * @param eim EventInstanceManager 實例
     * @param mobID 怪物id
     * @return amount for this player - "Saved Points"
     */
    int monsterValue(EventInstanceManager eim, int mobID);

    /**
     * 殺死註冊的怪物時執行
     * @param eim EventInstanceManager 實例
     * @param chr 殺死怪物的角色實例
     * @param mobID 怪物id
     * @return amount for this player - "Saved Points"
     */
    void monsterKilled(EventInstanceManager eim, MapleCharacter chr, int mobID);

    /**
     * 隊員離開組隊時執行
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     */
    void leftParty(EventInstanceManager eim, MapleCharacter player);

    /**
     * 解散隊伍時執行
     * @param eim EventInstanceManager 實例
     */
    void disbandParty(EventInstanceManager eim);

    /**
     * 事件重新加載時執行
     */
    void cancelSchedule();

    /**
     * 拾取道具時執行
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     * @param itemID 物品id
     */
    void pickupItem(EventInstanceManager eim, MapleCharacter player, int itemID);

    /**
     * 攻擊註冊的怪物時執行
     * @param eim EventInstanceManager 實例
     * @param player 角色實例
     * @param mobID 怪物id
     */
    void monsterDamaged(EventInstanceManager eim, MapleCharacter player, int mobID, long damage);

    /**
     * 調用<code>EventManager.finishPQ()</code>時執行
     * @param eim EventInstanceManager 實例
     */
    void clearPQ(EventInstanceManager eim);

    void startAutoInstance(EventInstanceManager eim, MapleMap map);

    @Override
    default Object invokeFunction(String name, Object... args) throws ScriptException, NoSuchMethodException {
        try {
            switch (name) {
                case "init":
                    init();
                    return null;
                case "setup":
                    if (args == null || args.length == 0) {
                        return setup(-1, -1);
                    } else if (args.length == 1) {
                        return setup((int) args[0], -1);
                    } else {
                        return setup((int) args[0], (int) args[1]);
                    }
                case "playerEntry":
                    check(name, args, 2);
                    playerEntry((EventInstanceManager) args[0], (MapleCharacter) args[1]);
                    return null;
                case "changedMap":
                    check(name, args, 3);
                    changedMap((EventInstanceManager) args[0], (MapleCharacter) args[1], (int) args[2]);
                    return null;
                case "enterField":
                    check(name, args, 2);
                    enterField((EventInstanceManager) args[0], (MapleCharacter) args[1]);
                    return null;
                case "playerExit":
                    check(name, args, 2);
                    playerExit((EventInstanceManager) args[0], (MapleCharacter) args[1]);
                    return null;
                case "scheduledTimeout":
                    check(name, args, 1);
                    scheduledTimeout((EventInstanceManager) args[0]);
                    return null;
                case "allMonstersDead":
                    check(name, args, 1);
                    allMonstersDead((EventInstanceManager) args[0]);
                    return null;
                case "playerDead":
                    check(name, args, 2);
                    playerDead((EventInstanceManager) args[0], (MapleCharacter) args[1]);
                    return null;
                case "playerRevive":
                    check(name, args, 2);
                    return playerRevive((EventInstanceManager) args[0], (MapleCharacter) args[1]);
                case "playerDisconnected":
                    check(name, args, 2);
                    return playerDisconnected((EventInstanceManager) args[0], (MapleCharacter) args[1]);
                case "monsterValue":
                    check(name, args, 2);
                    return monsterValue((EventInstanceManager) args[0], (int) args[1]);
                case "monsterKilled":
                    check(name, args, 3);
                    monsterKilled((EventInstanceManager) args[0], (MapleCharacter) args[1], (int) args[2]);
                    return null;
                case "leftParty":
                    check(name, args, 2);
                    leftParty((EventInstanceManager) args[0], (MapleCharacter) args[1]);
                    return null;
                case "disbandParty":
                    check(name, args, 1);
                    disbandParty((EventInstanceManager) args[0]);
                    return null;
                case "cancelSchedule":
                    cancelSchedule();
                    return null;
                case "pickUpItem":
                    check(name, args, 3);
                    pickupItem((EventInstanceManager) args[0], (MapleCharacter) args[1], (int) args[2]);
                    return null;
                case "monsterDamaged":
                    check(name, args, 4);
                    monsterDamaged((EventInstanceManager) args[0], (MapleCharacter) args[1], (int) args[2], (long) args[3]);
                    return null;
                case "clearPQ":
                    check(name, args, 1);
                    clearPQ((EventInstanceManager) args[0]);
                    return null;
                case "startAutoInstance":
                    check(name, args, 2);
                    startAutoInstance((EventInstanceManager) args[0], (MapleMap) args[1]);
                    return null;
                default:
                    return invokePrivateMethod(name, args);
            }
        } catch (IllegalArgumentException | ClassCastException e) {
            throw new RuntimeException("[Event Script] Function '" + name + "' args are not correct.", e);
        } catch (NoSuchMethodException e) {
            throw new NoSuchMethodException("[Event Script] Function '" + name + "' does not exist.");
        } catch (Exception e) {
            throw new ScriptException(e);
        }
    }
}
