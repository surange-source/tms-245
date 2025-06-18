
/*  
 *  
 *  功能：納希沙漠競技場
 *  
 */
var MobList =
        Array(
                2600422, // - 強化防禦系統
                2600421, // - 防禦系統
                2600423, // - AF型智能機器人
                2600424, // - 出故障的DF型智能機器人
                2600418, // - 礦石吞噬者
                9500618, // - 黑色比恩寶寶
                9500617, // - 綠色比恩寶寶
                9500614 // - 紅色比恩寶寶
                );
var MobBossList =
        Array(
                7220001, // - 九尾狐
                6300005, // - 殭屍蘑菇王
                2220000, // - 紅蝸牛王
                3220000, // - 樹妖王
                9303085, // - 偉大的凡雷恩
                6130101, // - 蘑菇王
                8220007, // - 藍蘑菇王
                9600009 // - 大王蜈蚣
                );

var mobid;
var mob;
var modified;


function init() {
    em.setProperty("FriendlyTips", "0");
    em.setProperty("playing", "false");
}


function setup() {
    var eim = em.newInstance("AliantSystem");
    var map = eim.setInstanceMap(980010101);
    //map.resetFully();
    //map.killAllMonsters(true);
    map.respawn(false);
    eim.startEventTimer(1000 * 60 * 6);//縮短為5分鐘
    em.setProperty("FriendlyTips", "0");
    em.setProperty("playing", "true");
    openMessageBoxInBattle(eim);

    //開始的時候先召喚5只高級怪
    for (var i = 0; i < 15; i++) {
        mobid = MobList[Math.floor(Math.random() * MobList.length)];
        mob = em.getMonster(mobid);
        mob.getStats().setHp(500000);
        mob.getStats().setMp(mob.getMobMaxMp());
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(980010101);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-328, -85));
    }
    //em.schedule("EndThisBattle", 13250000, eim);// 4m50s
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[納希沙漠競技場] 進入到了挑戰地圖。");
    player.changeMap(map, map.getPortal(0));
    player.openNpc(2101014);
}


function scheduledTimeout(eim) {
    finish();
    eim.broadcastPlayerMsg(1, "[納希沙漠競技場] 真遺憾！已超過限定挑戰時間，本次挑戰失敗！別氣餒，期待更加強大的您前來挑戰~");
    eim.disposeIfPlayerBelow(100, 910000000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}




function playerRevive(eim, player) {
    var map = em.getMapFactoryMap(910000000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 910000000);
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 980010100:
        case 980010101:
            return;
    }
    player.dropMessage(6, "[納希沙漠競技場] 已退出挑戰。");
    eim.dispose();
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 910000000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
}



function playerDisconnected(eim, player) {
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 910000000);
        eim.dispose();
    }
    return 0;
}


function monsterValue(eim, mobid) {
    return 1;
}


function monsterKilled(eim, player, cp) {
}


function allMonstersDead(eim) {
    for (var i = 0; i < 5; i++) {
        mobid = MobList[Math.floor(Math.random() * MobList.length)];
        mob = em.getMonster(mobid);
        modified = em.newMonsterStats();
        modified.setOHp(500000);
        modified.setOMp(mob.getMobMaxMp());
        mob.setOverrideStats(modified);
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(980010101);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-328, -85));
    }
    for (var i = 0; i < 5; i++) {
        mobid = MobList[Math.floor(Math.random() * MobList.length)];
        mob = em.getMonster(mobid);
        modified = em.newMonsterStats();
        modified.setOHp(500000);
        modified.setOMp(mob.getMobMaxMp());
        mob.setOverrideStats(modified);
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(980010101);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-691, 95));
    }
    for (var i = 0; i < 5; i++) {
        mobid = MobList[Math.floor(Math.random() * MobList.length)];
        mob = em.getMonster(mobid);
        modified = em.newMonsterStats();
        modified.setOHp(500000);
        modified.setOMp(mob.getMobMaxMp());
        mob.setOverrideStats(modified);
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(980010101);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-832, 275));
    }
    mobid = MobBossList[Math.floor(Math.random() * MobList.length)];
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(5000000);
    modified.setOMp(mob.getMobMaxMp());
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(980010101);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-311, 275));
}


function monsterDamaged(eim, player, mobid, damage) {
}


function leftParty(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
}


function onMapLoad(eim, player) {
}

function finish() {
    em.setProperty("playing", "false");
}

function openMessageBoxInBattle(eim) {
    var map = eim.setInstanceMap(980010101)
    if (em.getProperty("FriendlyTips") == "0") {
        map.startMapEffect("[納希沙漠競技場] 競技場的戰鬥已經開始了! 請趕快消滅怪物吧!", 5120026);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 競技場的戰鬥已經開始了! 請趕快消滅怪物吧!");
        }
        em.setProperty("FriendlyTips", "1");
        em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
    } else if (em.getProperty("FriendlyTips") == "1") {
        map.startMapEffect("[納希沙漠競技場] 幹的不錯！消滅越多的怪物得到的獎勵也就越豐厚！", 5120026);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場]  幹的不錯！消滅越多的怪物得到的獎勵也就越豐厚！");
        }
        em.setProperty("FriendlyTips", "2");
        em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
    } else if (em.getProperty("FriendlyTips") == "2") {
        map.startMapEffect("[納希沙漠競技場] 如果不努力一點的話。到最後可是什麼獎勵都沒有。", 5120026);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場]  如果不努力一點的話。到最後可是什麼獎勵都沒有。");
        }
        em.setProperty("FriendlyTips", "3");
        em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
    } else if (em.getProperty("FriendlyTips") == "3") {
        map.startMapEffect("[納希沙漠競技場] 中途退出戰役的話，就不能領取到任何的獎勵。", 5120026);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 中途退出戰役的話，就不能領取到任何的獎勵。");
        }
        em.setProperty("FriendlyTips", "4");
        em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
        /*} else if (em.getProperty("FriendlyTips") == "4") {
         map.startMapEffect("[納希沙漠競技場] 戰役考驗就要結束了！再努力加把勁！！", 5120026);
         for (var i = 0; i < eim.getPlayerCount(); i++) {
         eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 戰役考驗就要結束了！再努力加把勁！！");
         }
         em.setProperty("FriendlyTips", "5");
         em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
         } else if (em.getProperty("FriendlyTips") == "5") {
         map.startMapEffect("[納希沙漠競技場] 戰役結束後，將會自動報告戰役結果。", 5120026);
         for (var i = 0; i < eim.getPlayerCount(); i++) {
         eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 戰役結束後，將會自動報告戰役結果。");
         }
         em.setProperty("FriendlyTips", "6");
         em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
         } else if (em.getProperty("FriendlyTips") == "6") {
         map.startMapEffect("[納希沙漠競技場] 還有4分鐘！！堅持就是勝利！！", 5120026);
         for (var i = 0; i < eim.getPlayerCount(); i++) {
         eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 還有4分鐘！！堅持就是勝利！！");
         }
         em.setProperty("FriendlyTips", "7");
         em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
         } else if (em.getProperty("FriendlyTips") == "7") {
         map.startMapEffect("[納希沙漠競技場] 還有3分鐘！勝利是屬於你的！", 5120026);
         for (var i = 0; i < eim.getPlayerCount(); i++) {
         eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 還有3分鐘！勝利是屬於你的！");
         }
         em.setProperty("FriendlyTips", "8");
         em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);
         } else if (em.getProperty("FriendlyTips") == "8") {
         map.startMapEffect("[納希沙漠競技場] 還有2分鐘！", 5120026);
         for (var i = 0; i < eim.getPlayerCount(); i++) {
         eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 還有2分鐘！");
         }
         em.setProperty("FriendlyTips", "9");
         em.schedule("openMessageBoxInBattle", 1000 * 60 * 1, eim);*/
    } else if (em.getProperty("FriendlyTips") == "4") {
        map.startMapEffect("[納希沙漠競技場] 還有1分鐘就結束戰役了，請大家抓緊時間。", 5120026);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 還有1分鐘就結束戰役了，請大家抓緊時間。");
        }
        em.setProperty("FriendlyTips", "5");
        //em.schedule("openMessageBoxInBattle", 1000 * 55 * 1, eim);
        em.schedule("openMessageBoxInBattle", 1000 * 55 * 1, eim);
    } else if (em.getProperty("FriendlyTips") == "5") {
        EndThisBattle(eim)
    }
}

function EndThisBattle(eim) {
    em.setProperty("FriendlyTips", "done");
    em.setProperty("PlayerCount", "" + eim.getPlayerCount() + "");
    var map = eim.setInstanceMap(980010100)
    for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).changeMap(map, map.getPortal(0));
        map.startMapEffect("[納希沙漠競技場] 現在公佈結果，1分鐘後自動離開此地圖。", 5120026);
        eim.getPlayers().get(i).dropMessage(6, "[納希沙漠競技場] 現在公佈結果，1分鐘後自動離開此地圖。");
        eim.getPlayers().get(i).openNpc(2101017);
    }
    eim.startEventTimer(1000 * 60 * 1);
}
function monsterDrop(eim, player, mob) {
}
function pickUpItem(eim, player, itemID) {
}