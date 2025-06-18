try{load("scripts_custom/config/BossStatus.js");}catch(e){load("scripts/config/BossStatus.js");}
var MaxRandom;
var setupTask;
var itemList=Array(
    Array(5062000, 700),
    Array(5062002, 700),
    Array(5062500, 700),
    Array(5062001, 700)
);
function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}


function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("GoldTempleBoss");
    var map = eim.setInstanceMap(252030100);
    map.resetFully();
    map.killAllMonsters(true);
    
    //載入BOSS自訂數值        
    BossStatu = Boss("sixhands",em);
    var mob = em.getMonster(BossStatu.ID);
    mob.getStats().setHp(BossStatu.HP);
    mob.getStats().setMp(BossStatu.MP);
    mob.getStats().setPhysicalAttack(BossStatu.PAD);
    mob.getStats().setMagicAttack(BossStatu.MAD);
    mob.getStats().setPDRate(BossStatu.PDRate);
    mob.getStats().setMDRate(BossStatu.MDRate);
    mob.getStats().setLevel(BossStatu.LEVEL);    
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(984, 513));
    eim.startEventTimer(1000 * 60 * 60);// 30 min
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function scheduledTimeout(eim) {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    eim.disposeIfPlayerBelow(100, 252030000);
}

function cancelSchedule() {
}

function playerDead(eim, player) {
}

function changedMap(eim, player, mapid) {
    if (mapid != 252030100) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function playerDisconnected(eim, player) {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    eim.disposeIfPlayerBelow(100, 252030000);
    return 0;
}

function monsterValue(eim, mobid) {
    return 1;
}


function monsterKilled(eim, player, cp) {
}


function allMonstersDead(eim) {
}

function roll(eim) {
    MaxRandom = 0;
    var count = eim.getProperty("giftcount");
    var rewardPlayer = null;
    //第二次開始,統計上一次ROLL點玩家結果，並發放獎勵。
    if ((count*1)>=1) {
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            var charName = eim.getPlayers().get(i).getName();
            var charId = eim.getPlayers().get(i).getId();
            //推送ROLL點信息
            for (var j = 0; j < eim.getPlayerCount(); j++) {
                var notice =  "[副本] 玩家 "+charName+" 擲出了 "+eim.getProperty("charid_"+charId)+"點";
                if ((eim.getProperty("charid_"+charId)*1)==0) {
                    notice =  "[副本] 玩家 "+charName+" 放棄了擲點";
                }
                eim.getPlayers().get(j).dropMessage(6,notice);
            }
            //不斷重置最大值
            if ((eim.getProperty("charid_"+charId)*1)>MaxRandom) {
                MaxRandom = eim.getProperty("charid_"+charId);
                //置換玩家名稱
                eim.setProperty("rewardplayer", charName);
                //置換玩家ID
                eim.setProperty("rewardplayerid", charId);
            } 
           }
        for (var j = 0; j < eim.getPlayerCount(); j++) {
            //操作NPC 發放獎勵
            eim.getPlayers().get(j).openNpc(1052008, "huangjin");
        }
    }
    for (var j = 0; j < eim.getPlayerCount(); j++) {
        //重置所有玩家ROLL點點數為零
        eim.setProperty("charid_"+eim.getPlayers().get(j).getId(),"0");
    }
    //次數+1
    eim.setProperty("giftcount", (count*1+1));
    //重新讀入次數
    count = eim.getProperty("giftcount");
    count = (count*1);
    //退出戰場
    if ((count*1)>10) {
        EndThisBattle(eim);
        return;
    }
    //創建幾率
    var chance = Math.floor(Math.random()*600);
    //最終物品列表
    var finalItemList = Array();
    for(var m=0; m<itemList.length; m++) {
        if (itemList[m][1] >= chance) {
            finalItemList.push(itemList[m][0]);
        }
    }
    var currentItem = finalItemList[Math.floor(Math.random()*finalItemList.length)];
    switch(count) {
        case 8:
        case 9:
        case 10:
            currentItem = 2000005;
        break;
    }
    eim.setProperty("rewarditem", currentItem);
    //延遲10秒打開ROLL點NPC
    setupTask = em.schedule("openRollNpc", 1000 * 10 * 1, eim);
}

function openRollNpc(eim) {
    for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).openNpc(1052008,"huangjin1");
    }
    //10秒後繼續ROLL點
    setupTask = em.schedule("roll", 1000 * 10 * 1, eim);
}

function EndThisBattle(eim) {
    for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[BOSS副本] 挑戰成功！");
    }
    em.setProperty("state", "0");
    eim.disposeIfPlayerBelow(100, 252030000);
    if (setupTask!=null){
        setupTask.cancel(true);
        }
    eim.dispose();
}

function monsterDamaged(eim, player, mobid, damage) {
}

function cancelSchedule() {
    if (setupTask!=null){
        setupTask.cancel(true);
        }
}

function leftParty(eim, player) {
    eim.disposeIfPlayerBelow(100, 252030000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 252030000);
}


function onMapLoad(eim, player) {
}
function pickUpItem(eim, player, itemID) {
}