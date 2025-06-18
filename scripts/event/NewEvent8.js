/* Team For WSY
 * 測試腳本
 */
var BOSS = Array(
                  Array(9300304,300000000000,"SS"),//SS級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9390868,300000000000,"SS"),//強力的海龍
                  Array(9410301,300000000000,"SS"),//楓之谷GM
                  Array(9601031,600000000000,"SSS"),//雙頭蛇召喚怪
                  Array(9601020,600000000000,"SSS"),//黃龍
                  Array(9601019,300000000000,"SS"),//宋達
                  Array(9601018,300000000000,"SS"),//悟空
                  Array(9601017,300000000000,"SS"),//鳳仙
                  Array(9601016,300000000000,"SS"),//阿狼
                  Array(9390867,300000000000,"SS"),//兇猛的深海巨妖
                  //Array(2600715,300000000000,"SS"),//雷卡
                  Array(2600311,300000000000,"道具類"),//阿狼
                  Array(9300865,300000000000,"SS"),//凡雷恩
                  Array(9601016,300000000000,"SS"),//阿狼
                  Array(9601016,300000000000,"SS"),//阿狼

                  Array(9300293,100000000000,"S"),//S級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9300294,100000000000,"S"),//S級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9410293,100000000000,"S"),//漂亮可愛貝魯米諾米MK2
                  Array(9300294,100000000000,"S"),
                  Array(9300294,100000000000,"S"),
                  Array(9300294,100000000000,"S"),
                  Array(9300293,100000000000,"S"),//S級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9300294,100000000000,"S"),//S級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9410293,100000000000,"S"),//漂亮可愛貝魯米諾米MK2
                  Array(9300294,100000000000,"S"),
                  Array(9300294,100000000000,"S"),
                  Array(9300294,100000000000,"S"),

                  Array(9300291,30000000000,"A"),//A級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9300292,30000000000,"A"),//A級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9300291,30000000000,"A"),//A級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9410292,30000000000,"A"),//匈奴皮埃爾
                  Array(9410291,30000000000,"A"),//咆哮女王
                  Array(9410290,30000000000,"A"),//小雞半半
                  Array(9390911,30000000000,"A"),//神秘參賽選手
                  Array(9300786,30000000000,"A"),//艾利傑
                  Array(9300787,30000000000,"A"),//艾菲尼婭
                  Array(9300788,30000000000,"A"),//遠古精靈
                  Array(9390911,30000000000,"A"),//神秘參賽選手

                  Array(9300291,30000000000,"A"),//A級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9300292,30000000000,"A"),//A級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9300291,30000000000,"A"),//A級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9410292,30000000000,"A"),//匈奴皮埃爾
                  Array(9410291,30000000000,"A"),//咆哮女王
                  Array(9410290,30000000000,"A"),//小雞半半
                  Array(9390911,30000000000,"A"),//神秘參賽選手
                  Array(9300786,30000000000,"A"),//艾利傑
                  Array(9300787,30000000000,"A"),//艾菲尼婭
                  Array(9300788,30000000000,"A"),//遠古精靈
                  Array(9390911,30000000000,"A"),//神秘參賽選手

                  Array(9801002,2000000000,"B"),//B級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9801003,2000000000,"B"),//B級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9601004,20000,"B"),//BIG蘑菇王
                  Array(9400923,199999,"B"),//仲博拉大帝
                  Array(9400922,199999,"B"),//圓滑的溫死
                  Array(9600187,400000,"B"),//夕
                  Array(9390918,2000000000,"B"),//維克特
                  Array(9390917,2000000000,"B"),//文森特
                  Array(9390916,2000000000,"B"),//比奇
                  Array(2600208,2000000000,"B"),//蘑菇王
                  Array(9300815,2000000000,"B"),//蘑菇王
                  Array(9309096,2000000000,"B"),//蘑菇王
                  Array(9309097,2000000000,"B"),//蘑菇王
                  Array(2600208,2000000000,"B"),//蘑菇王
                  Array(9600226,2000000000,"B"),//梅格耐斯
                   Array(9801004,2000000000,"B"),//B級怪物ID、怪物血量、怪物物傷、怪物魔傷

                   Array(9801002,2000000000,"B"),//B級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9801003,2000000000,"B"),//B級怪物ID、怪物血量、怪物物傷、怪物魔傷
                  Array(9601004,20000,"B"),//BIG蘑菇王
                  Array(9400923,199999,"B"),//仲博拉大帝
                  Array(9400922,199999,"B"),//圓滑的溫死
                  Array(9600187,400000,"B"),//夕
                  Array(9390918,2000000000,"B"),//維克特
                  Array(9390917,2000000000,"B"),//文森特
                  Array(9390916,2000000000,"B"),//比奇
                  Array(2600208,2000000000,"B"),//蘑菇王
                  Array(9300815,2000000000,"B"),//蘑菇王
                  Array(9309096,2000000000,"B"),//蘑菇王
                  Array(9309097,2000000000,"B"),//蘑菇王
                  Array(2600208,2000000000,"B"),//蘑菇王
                  Array(9600226,2000000000,"B"),//梅格耐斯
                   Array(9801004,2000000000,"B"),//B級怪物ID、怪物血量、怪物物傷、怪物魔傷

                  Array(9801005,2000000000,"B")//B級怪物ID、怪物血量、怪物物傷、怪物魔傷
);
var BOSSMAP = Array(322042000,-10,-146);//亂入出現的地圖、X坐標、Y坐標
var BOSSChance = 25;//（數字÷500）×100%
function init() {
    em.setProperty("state", "0");//state = 為1代表有沒有人，2代表是否有BOSS亂入,3代表有沒有通行證
    em.setProperty("leader", "false");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    var eim = em.newInstance("NewEvent8");
    eim.setInstanceMap(322040000).resetPQ(level);
    eim.setInstanceMap(322041000).resetPQ(level);
    eim.setInstanceMap(322042000).resetPQ(level);
    eim.setInstanceMap(322043000).resetPQ(level);
    eim.setInstanceMap(322044000).resetPQ(level);
    eim.setInstanceMap(322045000).resetPQ(level);
    eim.setInstanceMap(322046000).resetPQ(level);
    var map = eim.setInstanceMap(322046000);
    map.resetFully();
    var mob = em.getMonster(9500471);
    mob.changeLevel(level);
    mob.getChangedStats().setOHp(1150000000);
    mob.setHp(1150000000);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-21,-146));
    //----以下為BOSS亂入召喚
    var A =  Math.floor(Math.random()*BOSS.length);
    var C = BOSS[A];//取到怪物行
    var chance = Math.floor(Math.random() * 500);
    if (chance<BOSSChance||em.getProperty("leader")=="true"){
        em.setProperty("haha", ""+C[2]);//加1
        var map1 = eim.setInstanceMap(BOSSMAP[0]);
        var mob1 = em.getMonster(C[0]);
        mob1.changeLevel(level);
        mob1.getChangedStats().setOHp(C[1]);
        mob1.setHp(C[1]);
        eim.registerMonster(mob1);
        map1.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(BOSSMAP[1], BOSSMAP[2]));
        eim.getMapInstance(0).startMapEffect("注意： "+C[2]+" 級BOSS亂入", 5120031);
    }
    eim.startEventTimer(1000 * 60 * 30); //60 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    if (mapid < 322040000 || mapid > 322046000) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "false");
        }
    }
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 910340700);
    em.setProperty("state", "0");
    em.setProperty("leader", "false");
    return 0;
}

function monsterValue(eim, mobId) {
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "false");
    }
}
function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 910340700);
    em.setProperty("state", "0");
    em.setProperty("leader", "false");
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}

function allMonstersDead(eim) {
        var mob;
    var mobid;
    var mapid = 322046000;
    var X= -21;
    var Y= -146;
    if(em.getProperty("leader")=="true"){
        if (em.getProperty("haha")=="B"){
            mobid = 9500426;
            mob = em.getMonster(mobid);
        }else if(em.getProperty("haha")=="A"){
            mobid = 9500431;
            mob = em.getMonster(mobid);
        }else if(em.getProperty("haha")=="S"){
            mobid = 9500432;
            mob = em.getMonster(mobid);
        }else if(em.getProperty("haha")=="SS"){
            mobid = 9500433;
            mob = em.getMonster(mobid);
        }else if(em.getProperty("haha")=="SSS"){
            mobid = 9500434;
            mob = em.getMonster(mobid);
        }
        eim.registerMonster(mob);
        eim.getMapInstance(mapid).spawnMonsterOnGroundBelow(mob, new java.awt.Point(X, Y));
        eim.getMapInstance(mapid).startMapEffect("亂入BOSS 的寶箱化成情侶蘑菇 出現在 NPC 旁了!趕緊看看!", 5120026);
        em.setProperty("leader","false");
    }
    eim.getMapInstance(322046000).spawnNpc(9390445, new java.awt.Point(-21,-146));
}

function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}
function monsterDrop(eim, player, mob) {}