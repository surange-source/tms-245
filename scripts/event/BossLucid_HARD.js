try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.露希妲;

var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var MapList = Array(
    450004100,
    450004150,
    450004550,
    450004850,
    450004500
);

function init() {
    em.setProperty("state", "0");
}

function setup(level, leaderid) {
    var eim = em.newInstance("BossLucid_HARD");
    var map;
    for (var i = 0; i < MapList.length; i++) {
        map = eim.setInstanceMap(MapList[i]);
        map.resetPQ(level);
        map.resetFully();
        map.killAllMonsters(true);
    }

    em.setProperty("state", "1");
    
    if (EventConfig.EventTime != null) {
        eim.startEventTimer(EventConfig.EventTime);
    }
    if (EventConfig.EventReviveCount != null && EventConfig.EventReviveCount > 0) {
        eim.setReviveCount(EventConfig.EventReviveCount);
    }

    return eim;
}

function playerEntry(eim, player) {
    /*
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
    }
    if (i <= 1) {
        eim.setProperty("Name", "[困難]露希妲");
        eim.setProperty("PlayerName", eim.getPlayers().get(0).getName());
    }
    */
    player.restReviveCount();
    
    if (EventConfig.ReviveCount != null && EventConfig.ReviveCount > 0) {
        player.setReviveCount(EventConfig.ReviveCount);
    }
    //em.showCombustionMessage(player.getClient(), "#fn哥德 ExtraBold##fs26# [露希妲]進入到了挑戰地圖，請小心行事!", 5, -70);
    
    var map = eim.getMapInstance(450004100);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    //eim.broadcastPlayerMsg(1, "[露希妲] 真遺憾！已超過限定挑戰時間，本次挑戰失敗！別氣餒，期待更加強大的您前來挑戰〜");
    eim.disposeIfPlayerBelow(100, 450003600);
}

function cancelSchedule() {
}

function playerDead(eim, player) {
	if(player.getEventReviveCount()<1){
        var map = eim.getMapInstance(450003600);
        player.changeMap(map, map.getPortal(0));
	}
}

function playerRevive(eim, player) {
    return false;
}


function changedMap(eim, player, mapid) {
    //player.dropMessage(6, "[露希妲副本] 已退出挑戰");
    var isEventMap = false;
    for (var i = 0; i < MapList.length; i++) {
        if( mapid==MapList[i]){
            isEventMap = true;
        }
    }
    if(!isEventMap){
        eim.unregisterPlayer(player);
    }    
    
    if( mapid == 450004150 && eim.isLeader(player)){
        eim.schedule("階段1", 0);
    }
    
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 450003600);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
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
            var map = eim.getMapInstance(450004150);
            map.killAllMonsters(true);
            eim.schedule("階段1結束", 3000);
            em.setProperty("state", "2");
            eim.schedule("階段2", 3000);            
            break;        
        case 8880151:
            //eim.schedule("階段2結束", 3000);
            em.setProperty("state", "3");
            eim.schedule("階段3", 3000);            
            break;
		case 8880153:	
            eim.schedule("階段3結束", 3000);
            em.setProperty("state", "4");
            eim.schedule("完成階段", 3000);           
            break;
    }
    return 1;
}

function monsterKilled(eim, player, cp) {
    return 1;
}

function allMonstersDead(eim) {
}

function monsterDamaged(eim, player, mobid, damage) {
}


function leftParty(eim, player) {
    eim.disposeIfPlayerBelow(100, 450003600);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 450003600);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function onMapLoad(eim, player) {
}

function monsterDrop(eim, player, mob) {
}

function 階段1(eim){
    
    eim.schedule("刷新石頭", 1000); 
    eim.schedule("刷新蘑菇", 1000); 
    eim.schedule("刷新蝴蝶", 1000);     
    
    var map = eim.setInstanceMap(450004150);
    for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
        var mob = getMonster(monsterStatus, em);        
        if (mob != null) {
            if ( mob.getId()==8880140 || mob.getId()==8880166 ) {
                if (map.getEvent() != null) {
                    map.getEvent().registerMonster(mob);
                }
                map.spawnMonsterOnGroundBelow(mob, mob.getPosition());                    
            }            
        }
    }
}

function 階段2(eim){
    
    eim.schedule("刷新石頭2", 1000); 
    
    map = eim.setInstanceMap(450004550);
    for each(monsterStatus in EventConfig.Monsters[450004550]) {
        var mob = getMonster(monsterStatus, em);        
        if (mob != null) {
            if ( mob.getId()==8880151) {
                if (map.getEvent() != null) {
                    map.getEvent().registerMonster(mob);
                }
                map.spawnMonsterOnGroundBelow(mob, mob.getPosition());                    
            }            
        }
    }
}

function 階段3(eim){
    eim.restartEventTimer(46*1000);
    map = eim.setInstanceMap(450004550);
    map.killAllMonsters(false);
    for each(monsterStatus in EventConfig.Monsters[450004550]) {
        var mob = getMonster(monsterStatus, em);            
        if (mob != null) {
            if ( mob.getId()==8880153) {
                mob.disableSpawnRevives();
                if (map.getEvent() != null) {
                    map.getEvent().registerMonster(mob);
                }
                map.spawnMonsterOnGroundBelow(mob, mob.getPosition());                    
            }            
        }
    }
}

function 完成階段(eim){
    eim.restartEventTimer(5*60*1000);
    map = eim.setInstanceMap(450004500);
    for each(monsterStatus in EventConfig.Monsters[450004500]) {
        var mob = getMonster(monsterStatus, em);        
        if (mob != null) {
            if (map.getEvent() != null) {
                map.getEvent().registerMonster(mob);
            }
            map.spawnMonsterOnGroundBelow(mob, mob.getPosition());     
        }
    }
}

function 刷新石頭(eim){
    /*
    
    if( parseInt( em.getProperty("state") ) != 1)
        return;
    */
    var posY = [150,1770];//生成橫向座標範圍
    var num = 5;//每次數量
    var cycle = 6;//刷新間隔秒
    var mobid = 8880161;//惡夢石頭人
    var map = eim.getMapInstance(450004150);
    //先清光石頭人
    map.killMonster(8880160);
    map.killMonster(8880161);
    //map.killMonster(mobid+1);
    var xlength = Math.floor((posY[1]-posY[0])/num);
    
    for(i=0;i<num;i++){
        for each(monsterStatus in EventConfig.Monsters[450004150]) {
            var mob = getMonster(monsterStatus, em);
            mob.disableSpawnRevives();
            if( mob.getId()==mobid ){            
                if (mob != null) {                
                    if (map.getEvent() != null) {
                        map.getEvent().registerMonster(mob);
                    }                
                    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point( posY[0]+xlength*Math.floor( Math.random()*num ), 48));
                }            
            }
        }
    } 
    
    eim.schedule("刷新石頭", cycle*1000);
    
}

function 刷新石頭2(eim){
    
    
    if( em.getProperty("state") != 2)
        return;
    
    var pos = [
        [327,-855],
        [1011,-842],
        [87,-693],
        [543,-685],
        [1102,-619],
        [157,-550],
        [716,-490],
        [365,-375],
        [967,-331],
        [1214,-378],
        [134,-267],
        [800,-194],
        [1169,-143],
        [332,-125],
        [617,-48]
    ];
    
    var num = 5;//每次數量
    var cycle = 6;//刷新間隔秒
    var mobid = 8880161;//惡夢石頭人
    var map = eim.getMapInstance(450004550);
    //先清光石頭人
    map.killMonster(8880160);
    map.killMonster(8880161);
    
    
    for(i=0;i<num;i++){
        var posnum = Math.floor( Math.random()*pos.length );
        for each(monsterStatus in EventConfig.Monsters[450004150]) {
            var mob = getMonster(monsterStatus, em);
            mob.disableSpawnRevives();
            if( mob.getId()==mobid ){            
                if (mob != null) {                
                    if (map.getEvent() != null) {
                        map.getEvent().registerMonster(mob);
                    }                
                    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point( pos[posnum][0],pos[posnum][1] ));
                }            
            }
        }
    } 
    
    eim.schedule("刷新石頭2", cycle*1000);
    
}

function 刷新蘑菇(eim){    
    /*
    if( parseInt( em.getProperty("state") ) != 1)
        return;
    */
    var posY = [150,1770];//生成橫向座標範圍
    var num = 3;//每次數量
    var cycle = 10;//刷新間隔秒
    var mobid = 8880164;//惡夢蘑菇
    var map = eim.getMapInstance(450004150);
    //清光蘑菇
    map.killMonster(mobid);
    var xlength = Math.floor((posY[1]-posY[0])/num);
    
    for(i=0;i<num;i++){
        for each(monsterStatus in EventConfig.Monsters[450004150]) {
            var mob = getMonster(monsterStatus, em);
            //mob.disableSpawnRevives();
            if( mob.getId()==mobid ){            
                if (mob != null) {                
                    if (map.getEvent() != null) {
                        map.getEvent().registerMonster(mob);
                    }                
                    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point( posY[0]+xlength*Math.floor( Math.random()*num ), 48));
                }            
            }
        }
    } 
    
    eim.schedule("刷新蘑菇", cycle*1000);
    
}

function 刷新蝴蝶(eim){    
    /*
    if( parseInt( em.getProperty("state") ) != 1)
        return;
    */
    var posY = [150,1770];//生成橫向座標範圍
    var num = 4;//每次數量
    var cycle = 10;//刷新間隔秒
    var mobid = 8880165;//惡夢蝴蝶
    var map = eim.getMapInstance(450004150);
    //清光蝴蝶
    map.killMonster(mobid);
    var xlength = Math.floor((posY[1]-posY[0])/num);
    
    for(i=0;i<num;i++){
        for each(monsterStatus in EventConfig.Monsters[450004150]) {
            var mob = getMonster(monsterStatus, em);
            //mob.disableSpawnRevives();
            if( mob.getId()==mobid ){            
                if (mob != null) {                
                    if (map.getEvent() != null) {
                        map.getEvent().registerMonster(mob);
                    }                
                    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point( posY[0]+xlength*Math.floor( Math.random()*num ), -300));
                }            
            }
        }
    } 
    
    eim.schedule("刷新蝴蝶", cycle*1000);
    
    
}


function 階段1結束(eim){
    var mapA = eim.getMapInstance(450004550);
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
        eim.getPlayers().get(i).changeMap(mapA, mapA.getPortal(0))
    }
}

function 階段2結束(eim){
    var mapA = eim.getMapInstance(450004850);
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
        eim.getPlayers().get(i).changeMap(mapA, mapA.getPortal(0))
    }
}

function 階段3結束(eim){
    var mapA = eim.getMapInstance(450004500);
    for (var i = 0; i < eim.getPlayerCount() ; i++) {
        eim.getPlayers().get(i).changeMap(mapA, mapA.getPortal(0))
    }
}