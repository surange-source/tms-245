/*
 完成時間：2014年8月9日 20:15:06
 更新時間：2015年7月18日 22:29:45
 腳本功能：無限火力挑戰關卡
 */

var EventDataBase;
var Times = 0;
var GiftTimes = 0;
var charid = 0;
var MobList =
        Array(
                9303006, // - 
                9303095, // - 偉大的阿卡伊農
                9303092, // - 偉大的西格諾斯
                9303087, // - 偉大的皮卡啾
                9303085, // - 偉大的凡雷恩
                9303083, // - 偉大的巴洛古
                9303103, // - 偉大的毛莫
                9303104, // - 迷你毛莫劍士
                9303105, // - 迷你毛莫魔法師
                9303106, // - 迷你毛莫弓箭手
                9303107, // - 迷你毛莫盜賊
                9303108,// - 迷你毛莫海盜
                9410161,
                9300293,
                9300294,
                9300291,
                9300290,
                9300289,
                9300288,
                9300287
                );
function init() {
    em.setProperty("started", "false");
    em.setProperty("Gift", "false");
    em.setProperty("Times", "0");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    var eim = em.newInstance("Limitless");
    var map = eim.setInstanceMap(923020100);
    eim.startEventTimer(1000 * 60 * 10);//10 min
    var players = map.getCharacters().iterator();
    while (players.hasNext()) {
        var player = players.next();
        eim.registerPlayer(player);
    }
    Times = 0;
    GiftTimes = 0;
    map.killAllMonsters(true);
    em.setProperty("started", "true");
    em.setProperty("Gift", "false");

    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
    /*charid = map.getCharacters().get(0).getId();
    var conn = em.getConnection();
    var pstmt = conn.prepareStatement("SELECT times FROM limitlessEvent where charid = " + charid + "");
    EventDataBase = pstmt.executeQuery();
    while (EventDataBase.next()) {
        Times = EventDataBase.getString("times");
    }
    EventDataBase.close();
    pstmt.close();*/
    Times = parseInt(em.getProperty("Times"));
    eim.broadcastPlayerMsg(1, "歡迎來到 <無限副本>!!\r\n現在是第" + (Times + 1) + "關！\r\n 每通關10層後可獲得大量道具獎勵! ");
    //eim.broadcastPlayerMsg(1, charid);
    SpwnMobForPlayer(eim)
}

function SpwnMobForPlayer(eim) {
    if (GiftTimes != 0) {
        var map = eim.getMapInstance(0);
        var players = map.getCharacters().iterator();
        while (players.hasNext()) {
            var player = players.next();
            player.changeMap(map, map.getPortal(0));
            if ((GiftTimes % 10) == 0) {
                em.setProperty("Gift", "true");
                em.setProperty("guanka", ""+GiftTimes);
                player.openNpc(2060103,"wuxianhuoli");
            }
        }
        eim.startEventTimer(1000 * 60 * 1);//10 min 重置時間
        eim.broadcastPlayerMsg(-1, "[無限戰鬥] 現在是第" + (Times + 1) + "關！ 你有1分鐘的時間消滅怪物! ");
    }
    var mobid = MobList[Math.floor(Math.random() * MobList.length)];
    var mob = em.getMonster(mobid);
    mob.getStats().setChange(true);
    mob.changeLevel(200);
    if (Times <= 50){
        mob.getChangedStats().setOHp(5000000+(Times*5000000));
        mob.setHp(5000000+Times*5000000);
    }else if (Times > 50 && Times <= 70){
        mob.getChangedStats().setOHp(10000000+(Times*20000000));
        mob.setHp(10000000+Times*20000000);
    }else if (Times > 70 && Times <= 150){
        mob.getChangedStats().setOHp(300000000+(Times*500000000));
        mob.setHp(30000000+Times*500000000);
    }else{
        mob.getChangedStats().setOHp(500000000+(Times*1000000000));
        mob.setHp(500000000+Times*1000000000);
    }
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(923020100);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(490, 152));
}

function playerDead(eim, player) {
    em.setProperty("started", "false");
    em.setProperty("Times", "0");
    eim.disposeIfPlayerBelow(100, 923020000);
}

function playerRevive(eim, player) {
}

function scheduledTimeout(eim) {
    em.setProperty("started", "false");
    em.setProperty("Times", "0");
    eim.disposeIfPlayerBelow(100, 923020000);
}

function changedMap(eim, player, mapid) {
    if (mapid == 923020100) {
        return;
    }
    em.setProperty("Times", "0");
    em.setProperty("started", "false");
    eim.unregisterPlayer(player);
}

function playerDisconnected(eim, player) {
    em.setProperty("started", "false");
    em.setProperty("Times", "0");
    eim.disposeIfPlayerBelow(100, 923020000);
    return 0;
}

function leftParty(eim, player) {
    // If only 2 players are left, uncompletable:
    playerExit(eim, player);
}

function disbandParty(eim) {//組隊解散後果
    em.setProperty("started", "false");
    em.setProperty("Times", "0");
    eim.disposeIfPlayerBelow(100, 923020000);
}

function playerExit(eim, player) {
    em.setProperty("started", "false");
    em.setProperty("Times", "0");
    eim.unregisterPlayer(player);
    var map = eim.getMapFactory().getMap(923020000);
    player.changeMap(map, map.getPortal(0));
}

function clearPQ(eim) {
    em.setProperty("started", "false");
    em.setProperty("Times", "0");
    eim.disposeIfPlayerBelow(100, 923020000);
}

function allMonstersDead(eim) {
    /*var conn = em.getConnection();
    var UpDateData = conn.prepareStatement("update limitlessEvent set times=? where charid = " + charid + "");
    UpDateData.setString(1, parseInt(Times) + 1);
    UpDateData.executeUpdate();//更新;*/
    var map = eim.getMapInstance(0);
    var players = map.getCharacters().iterator();
        while (players.hasNext()) {
            var player = players.next();
            player.openNpc(2060103,"wuxianhuoli1");
        }
    em.setProperty("Times",""+(parseInt(em.getProperty("Times"))+1));
    Times = parseInt(em.getProperty("Times"));
    GiftTimes++;
    //UpDateData.close();
    //conn.close();
    eim.broadcastPlayerMsg(-1, "[無限戰鬥] 消滅了怪物！請等待10秒進入下一關！");
    eim.startEventTimer(1000 * 5);//10 min
    em.schedule("SpwnMobForPlayer", 1000 * 4, eim);//10秒後傳送
}

function cancelSchedule() {
    em.setProperty("started", "false");
    em.setProperty("Times", "0");
}

function pickUpItem(eim, player, itemID) {
}