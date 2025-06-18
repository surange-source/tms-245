try{load("scripts_custom/config/BossStatus.js");}catch(e){load("scripts/config/BossStatus.js");}

var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var MapList = Array(
        450004150, //梦幻森林 挑战路西德
        450004550,
        450004500
        );
var moblevel = 220;
var smallMobHp = 10000000000;

function init() {
    em.setProperty("state", "0");
}

function setup(level, leaderid) {
	level = moblevel;
    var eim = em.newInstance("BossLucid_EASY");
    for (var i = 0; i < MapList.length; i++) {
        var map = eim.setInstanceMap(MapList[i]);
        map.resetPQ(level);
        map.resetFully();
        map.killAllMonsters(true);
    }
    em.setProperty("state", "1");
    //梦幻森林 

    mobid = 8880184;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(805, 48));

    //載入BOSS自訂數值        
    BossStatu = Boss("Lucid_1_easy",em);
    var mob = em.getMonster(BossStatu.ID);
    mob.getStats().setHp(BossStatu.HP);
    mob.getStats().setMp(BossStatu.MP);
    mob.getStats().setPhysicalAttack(BossStatu.PAD);
    mob.getStats().setMagicAttack(BossStatu.MAD);
    mob.getStats().setPDRate(BossStatu.PDRate);
    mob.getStats().setMDRate(BossStatu.MDRate);
    mob.getStats().setLevel(BossStatu.LEVEL);  
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1239, 43));

    mobid = 8880184;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1030, 48));

    mobid = 8880184;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(925, 48));

    mobid = 8880184;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(797, 48));

    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(346, 48));

    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1341, 48));

    mobid = 8880184;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(374, 48));

    mobid = 8880184;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1648, 48));


    mobid = 8880166;//路西德之花
    var mob = em.getMonster(mobid);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1239, 43));

    mobid = 8880164;//噩梦蘑菇
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    mob.getStats().setMp(smallMobHp*2);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(608, 43));

    mobid = 8880164;//噩梦蘑菇
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    mob.getStats().setMp(smallMobHp*2);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004150);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1428, 43));

    mobid = 8880167;//最后的音乐盒
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(9527);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004500);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(73, 36));


    //載入BOSS自訂數值        
    BossStatu = Boss("Lucid_2_easy",em);
    var mob = em.getMonster(BossStatu.ID);
    mob.getStats().setHp(BossStatu.HP);
    mob.getStats().setMp(BossStatu.MP);
    mob.getStats().setPhysicalAttack(BossStatu.PAD);
    mob.getStats().setMagicAttack(BossStatu.MAD);
    mob.getStats().setPDRate(BossStatu.PDRate);
    mob.getStats().setMDRate(BossStatu.MDRate);
    mob.getStats().setLevel(BossStatu.LEVEL);  
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(657, -490));


    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(122, -550));

    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(122, -550));


    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(537, -685));

    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1211, -378));


    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(786, -194));

    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(329, -125));

    mobid = 8880160;//噩梦石头人
    var mob = em.getMonster(mobid);
    mob.getStats().setHp(smallMobHp);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(450004550);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(117, -267));



    eim.startEventTimer(1000 * 60 * 40);// 40分钟 
    return eim;
}

function playerEntry(eim, player) {
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
    }
    if (i <= 1) {
        eim.setProperty("Name", "[簡單]露希妲");
        eim.setProperty("PlayerName", eim.getPlayers().get(0).getName());
    }
    var map = eim.getMapInstance(0);
    player.restReviveCount();
    player.setReviveCount(5);
    //player.dropMessage(6, "[露希妲]進入到了挑戰地圖，請小心行事!");    
    player.changeMap(map, map.getPortal(0));
    em.showCombustionMessage(player.getClient(), "#fn哥德 ExtraBold##fs26# [露希妲]進入到了挑戰地圖，請小心行事!", 5, -70);
}

function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[露希妲副本] 真遺憾！已超過限定挑戰時間，本次挑戰失敗！別氣餒，期待更加強大的您前來挑戰〜");
    eim.disposeIfPlayerBelow(100, 910000000);
}

function cancelSchedule() {
}

function playerDead(eim, player) {
	if(player.getEventReviveCount()<1){
        var map = eim.getMapInstance(910000000);
        player.changeMap(map, map.getPortal(0));
	}
}

function playerRevive(eim, player) {
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 450004150: // 梦幻森林
            em.setProperty("state", "1");
            var map = eim.getMapInstance(450004150);
            em.showCombustionMessage(player.getClient(), "#fn哥德 ExtraBold##fs26# 好像存在些什麼什麼未知的力量-讓我們同心協力消滅惡夢女王吧", 5, -70);
            break;

        case 450004550:
            em.setProperty("state", "2");
            var map = eim.getMapInstance(450004550);
            em.showCombustionMessage(player.getClient(), "#fn哥德 ExtraBold##fs26# 想不到你還能通過我的測驗？哼哼……", 5, -70);
            break;
            
        case 450004500:
            em.setProperty("state", "3");
            var map = eim.getMapInstance(450004600);
            em.showCombustionMessage(player.getClient(), "#fn哥德 ExtraBold##fs26# 你們成功阻止了新軍團長露希妲的入侵-請領你們的獎品吧", 10, -70);
            break;
    }

    switch (mapid) {
        case 450004150:
        case 450004500:
        case 450004550:
        case 450004600:
            return;
    }
    player.dropMessage(6, "[露希妲副本] 已退出挑戰");
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 910000000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
}

function playerDisconnected(eim, player) {
    eim.unregisterPlayer(player);
    return 0;
}


function openNpc(eim, npcid, mode) {
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
        eim.getPlayers().get(i).openNpc(npcid, mode);
    }
}
function monsterValue(eim, mobid) {
    switch (mobid) {
        case 8880140:
            var mapA = eim.getMapInstance(450004550);
            for (var i = 0; i < eim.getPlayerCount() ; i++) {
                eim.getPlayers().get(i).changeMap(mapA, mapA.getPortal(0))
            }
            break;

        case 8880151:
            var mapA = eim.getMapInstance(450004500);
            for (var i = 0; i < eim.getPlayerCount() ; i++) {
              eim.getPlayers().get(i).changeMap(mapA, mapA.getPortal(0))
            }
			
			eim.setProperty("Name", "[簡單]露希妲");
			eim.setProperty("PlayerName", eim.getPlayers().get(0).getName());
			var TimeA = 1000 * 60 * 40;
			eim.setProperty("MiA", Math.floor((TimeA - eim.getTimeLeft()) / (60 * 1000)));
			eim.setProperty("MiX", Math.floor((TimeA - eim.getTimeLeft()) % (60 * 1000) / 1000));
			openNpc(eim, 1540008, "TimCareU");
			
            if (eim.getMapInstance(0).getMonsterById(8880167) == null) {
                //eim.getMapInstance(450004500).spawnNpc(9000056, new java.awt.Point(73, 36));
            }
            break;
    }
    return 1;
}

function monsterKilled(eim, player, cp) {
}

function allMonstersDead(eim) {
}

function openNpc(eim, npcid, mode) {
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
        eim.getPlayers().get(i).openNpc(npcid, mode);
    }
}

function monsterDamaged(eim, player, mobid, damage) {
}

function cancelSchedule() {
    if (setupTask != null)
        setupTask.cancel(true);
}

function leftParty(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
}

function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
}

function onMapLoad(eim, player) {
}

function monsterDrop(eim, player, mob) {
}
function monsterKilled(eim, player, mobID) {
    // 可留空，主要处理怪物死亡后的逻辑代码
}