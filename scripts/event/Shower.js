/*  創新型副本  
 *  組隊任務副本
 *  功能：玩家進行答題、保護MOB、跳跳、消滅BOSS
 *  作者：AND 3812049
 */
var reviveCount = 1;//自定義復活次數
function init() {
    em.setProperty("state", "0");
    em.setProperty("Next", "0");
    em.setProperty("leader", "false");
}

function setup(eim, leaderid) {
    em.setProperty("state","1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("Shower");
    var map = eim.setInstanceMap(911006100);//跳躍吧，楓幣SHOWER
    em.setProperty("opendati","0");//0為暫時不開啟答題
    eim.setInstanceMap(911006100).resetFully();
    eim.setInstanceMap(922000000).resetFully();//玩具工廠<第4地區>
    eim.setInstanceMap(931050431).resetFully();//閃光的時間神殿
    eim.getMapInstance(911006100).spawnNpc(2142900, new java.awt.Point(-609, -22));
    eim.getMapInstance(922000000).spawnNpc(2142900, new java.awt.Point(5111, 161));
    eim.getMapInstance(931050431).spawnNpc(2142900, new java.awt.Point(-848,-571));
    eim.startEventTimer(1000*60*30); //30分鐘
    em.schedule("Start1", 1000 * 50,eim);//1分鐘後觸發事件
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.setReviveCount(reviveCount);
    player.changeMap(map, map.getPortal(0));
    map.startMapEffect("遊戲將在1分鐘後開始！請爬到繩子上方，大家快點保護長老！", 5120026);
}
function register(eim) {
    var map = em.getMapFactoryMap(911006100);
    var players = map.getCharacters().iterator();
    while (players.hasNext()) {
        var player = players.next();
        eim.registerPlayer(player);
    }
}
function Start1(eim){//召喚怪物
    var XYList = Array(//Array(-634,-22),
                        //Array(-541,-22),
                        //Array(-451,-22),
                        Array(-359,-22),
                        //Array(-272,-22),
                        //Array(-178,-22),
                        //Array(-89,-22),
                        //Array(-1,-22),
                        //Array(93,-22),
                        //Array(183,-22),
                        //Array(268,-22),
                        Array(359,-22)
                        //Array(454,-22),
                        //Array(547,-22),
                        //Array(637,-22)
                        );
    for (var i = 0;i<XYList.length ;i++ ){
        var mob = em.getMonster(8240004);
        var stats = mob.getStats();
        mob.getStats().setChange(true);
        mob.changeLevel(250);
        stats.setHp(99999999999);
        stats.setMp(mob.getMobMaxMp());
        stats.setPhysicalAttack(10000000);
        stats.setMagicAttack(10000000);
        mob.disableDrops();
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(911006100);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(XYList[i][0],XYList[i][1]));//待定9
    }
    em.setProperty("Round","0");//循環物品出貨
    var map = eim.getMapInstance(0);
    map.startMapEffect("啊！怪物召喚出來好怕怕，碰一下就死了。", 5120026);
    em.schedule("Start2", 1000 * 5,eim);//5s後觸發事件
    em.schedule("Start3", (1000 * 60*3)+5000,eim);//3分鐘後觸發事件檢測是否到達指定任務
}
function Start2(eim){//召喚物品
    var map = eim.getMapInstance(0);
    var XYItemList = Array(Array(-634,-22),
                        Array(-541,-22),
                        Array(-451,-22),
                        Array(-359,-22),
                        Array(-272,-22),
                        Array(-178,-22),
                        Array(-89,-22),
                        Array(-1,-22),
                        Array(93,-22),
                        Array(183,-22),
                        Array(268,-22),
                        Array(359,-22),
                        Array(454,-22),
                        Array(547,-22),
                        Array(637,-22));
    var A = Math.floor(Math.random()*XYItemList.length);
    if(parseInt(em.getProperty("Round"))==0){
        em.schedule("Start2", 1000 * 1,eim);//15s後觸發事件
        em.setProperty("Round",(parseInt(em.getProperty("Round"))+1)+"");
        em.setProperty("opendati","1");//1為標記可以開始答題
        em.setProperty("dati","0");
        map.startMapEffect("所有隊員點NPC答題！限時3分鐘，勳章將在26分05秒開始消失,抓緊哦！", 5120026);
    }else if(parseInt(em.getProperty("Round"))<=10&&parseInt(em.getProperty("opendati"))==1){
        em.setProperty("Round",(parseInt(em.getProperty("Round"))+1)+"");
        em.getMapFactoryMap(911006100).spawnAutoDrop(4031994, new java.awt.Point(XYItemList[A][0],XYItemList[A][1]));//4031994為蘑菇金牌
        em.schedule("Start2", 1000 * 3,eim);//3s後觸發事件
    }else if(parseInt(em.getProperty("Round"))<=15&&parseInt(em.getProperty("opendati"))==1){
        em.setProperty("Round",(parseInt(em.getProperty("Round"))+1)+"");
        em.getMapFactoryMap(911006100).spawnAutoDrop(4031994, new java.awt.Point(XYItemList[A][0],XYItemList[A][1]));//4031994為蘑菇金牌
        em.schedule("Start2", 1000 * 10,eim);//10s後觸發事件
    }else if(parseInt(em.getProperty("Round"))<=20&&parseInt(em.getProperty("opendati"))==1){
        em.setProperty("Round",(parseInt(em.getProperty("Round"))+1)+"");
        em.getMapFactoryMap(911006100).spawnAutoDrop(4031994, new java.awt.Point(XYItemList[A][0],XYItemList[A][1]));//4031994為蘑菇金牌
        em.schedule("Start2", 1000 * 15,eim);//15s後觸發事件
    }
}
function Start3(eim){//執行答題模塊檢測
    var map = eim.getMapInstance(0);
    var Count = 80;//設置需要答題數
    if(parseInt(em.getProperty("dati"))>=Count &&parseInt(em.getProperty("opendati"))!=2){//判斷是否答題達到50題
        em.setProperty("opendati","2");//2為標記答題結束
        em.schedule("Start4", 1000 * 3,eim);//執行開啟寶藏亂飛
        map.startMapEffect("過關成功!", 5120026);
        eim.getMapFactoryMap(911006100).killAllMonsters(true);
    }else if(parseInt(em.getProperty("dati"))<Count){
        map.startMapEffect("闖關失敗!", 5120026);
        em.setProperty("opendati","0");
        scheduledTimeout(eim);
    }
}
function Start4(eim){
    var finalitem = Array();
    var ItemList = Array(
        Array(4031994,1000),
        Array(5062000,1000),
        Array(5062002,1000),
        Array(5062500,1000),
        Array(5062002,1000),
        Array(5062024,100),
        Array(2048700,1000),
        Array(2048701,700),
        Array(2048702,600),
        Array(2048703,500),
        Array(2048704,400),
        Array(2048705,300),
        Array(2048724,100),
        Array(2048723,100),
        Array(4310143,1000),
        Array(4310014,300),
        Array(4033356,500));//這裡設置亂飛的物品
    var chance = Math.floor((Math.random()*999)+1);
    for (var a = 0;a<ItemList.length ;a++ ){
        if(chance<=ItemList[a][1]){
            finalitem.push(ItemList[a]);
        }
    }
    var map = eim.getMapInstance(0);
    map.startMapEffect("我擦勒！寶藏開始亂飛了！趕緊揀待會還要保護長老呢！", 5120026);
    for (var i = 0;i<6 ;i++ ){
        var X = Math.floor((Math.random()*1200)-600);//整圖隨機
        var Y = -(Math.floor((Math.random()*504)+22));
        em.getMapFactoryMap(911006100).spawnAutoDrop(finalitem[Math.floor(Math.random()*finalitem.length)][0], new java.awt.Point(X,Y));
    }
    em.schedule("Start5", 1000 * 10,eim);
}
function Start5(eim){//先召喚要保護的怪物
        var mobid =9402011;//膽怯的長老斯坦
        var mob = em.getMonster(mobid);
        mob.getStats().setChange(true);
        mob.changeLevel(200);
        mob.getChangedStats().setOHp(2000);
        mob.setHp(2000);
        mob.disableDrops();
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(911006100);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-103,-22));//待定9
        var mobid =9402011;//膽怯的長老斯坦
        var mob8 = em.getMonster(mobid);
        mob8.getStats().setChange(true);
        mob8.changeLevel(200);
        mob8.getChangedStats().setOHp(2000);
        mob8.setHp(2000);
        mob8.disableDrops();
        eim.registerMonster(mob8);
        var mapForMob8 = eim.getMapInstance(911006100);
        mapForMob8.spawnMonsterOnGroundBelow(mob8, new java.awt.Point(103,-22));//待定9
        var map = eim.getMapInstance(0);
        map.startMapEffect("20秒後怪物來襲，請保護好長老呀！", 5120026);
        em.schedule("Start6", 1000 * 20,eim);
}

function Start6(eim){//第1波
    var map = eim.getMapInstance(0);
    for(var i = 0;i<3;i++){//兩側各5只
        var mob = em.getMonster(9300384);
        mob.getStats().setChange(true);
        mob.changeLevel(200);
        mob.getChangedStats().setOHp(2000);
        mob.setHp(2000);
        eim.registerMonster(mob);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-572,-22));
    }
    for(var i = 0;i<3;i++){//兩側各5只
        var mob1 = em.getMonster(9300384);
        mob1.getStats().setChange(true);
        mob1.changeLevel(200);
        mob1.getChangedStats().setOHp(2000);
        mob1.setHp(2000);
        eim.registerMonster(mob1);
        map.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(572,-22));
    }
        map.startMapEffect("5秒後怪物來襲，注意不明飛行物", 5120026);
        em.schedule("Start7", 1000 * 5,eim);
}

function Start7(eim){//第2波
    var map = eim.getMapInstance(0);
    for(var i = 0;i<5;i++){//兩側各5只
        var mob = em.getMonster(9500186);//怪物名稱：藍色魔法書
        mob.getStats().setChange(true);
        mob.changeLevel(200);
        mob.getChangedStats().setOHp(2000);
        mob.setHp(2000);
        eim.registerMonster(mob);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-572,-22));
    }
    for(var i = 0;i<5;i++){//兩側各5只
        var mob1 = em.getMonster(9500186);//怪物名稱：藍色魔法書
        mob1.getStats().setChange(true);
        mob1.changeLevel(200);
        mob1.getChangedStats().setOHp(2000);
        mob1.setHp(2000);
        eim.registerMonster(mob1);
        map.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(572,-22));
    }
        map.startMapEffect("5秒後怪物來襲，注意不明飛行物", 5120026);
        em.schedule("Start8", 1000 * 5,eim);

}
function Start8(eim){//第3波
    var map = eim.getMapInstance(0);
    for(var i = 0;i<5;i++){//兩側各5只
        var mob = em.getMonster(9500186);//怪物名稱：藍色魔法書
        mob.getStats().setChange(true);
        mob.changeLevel(200);
        mob.getChangedStats().setOHp(2000);
        mob.setHp(2000);
        eim.registerMonster(mob);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-572,-22));
    }
    for(var i = 0;i<5;i++){//兩側各5只
        var mob1 = em.getMonster(9500186);//怪物名稱：藍色魔法書
        mob1.getStats().setChange(true);
        mob1.changeLevel(200);
        mob1.getChangedStats().setOHp(2000);
        mob1.setHp(2000);
        eim.registerMonster(mob1);
        map.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(572,-22));
    }
    for(var i = 0;i<5;i++){//兩側各5只
        var mob2 = em.getMonster(9500186);//怪物名稱：藍色魔法書
        mob2.getStats().setChange(true);
        mob2.changeLevel(200);
        mob2.getChangedStats().setOHp(2000);
        mob2.setHp(2000);
        eim.registerMonster(mob2);
        map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-1,-353));
    }
        map.startMapEffect("5秒後怪物來襲，注意上方不明飛行物", 5120026);
        em.schedule("Start9", 1000 * 5,eim);
}
function Start9(eim){//第4波
    var map = eim.getMapInstance(0);
    for(var i = 0;i<3;i++){//兩側各5只
        var mob = em.getMonster(9300384);//怪物名稱：紅水靈
        mob.getStats().setChange(true);
        mob.changeLevel(200);
        mob.getChangedStats().setOHp(2000);
        mob.setHp(2000);
        eim.registerMonster(mob);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-572,-22));
    }
    for(var i = 0;i<3;i++){//兩側各5只
        var mob1 = em.getMonster(9300384);//怪物名稱：紅水靈
        mob1.getStats().setChange(true);
        mob1.changeLevel(200);
        mob1.getChangedStats().setOHp(2000);
        mob1.setHp(2000);
        eim.registerMonster(mob1);
        map.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(572,-22));
    }
    for(var i = 0;i<5;i++){//兩側上方各5只
        var mob2 = em.getMonster(9500186);//怪物名稱：藍色魔法書
        mob2.getStats().setChange(true);
        mob2.changeLevel(200);
        mob2.getChangedStats().setOHp(2000);
        mob2.setHp(2000);
        eim.registerMonster(mob2);
        map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-359,-317));
    }
    for(var i = 0;i<5;i++){//兩側上方各5只
        var mob3 = em.getMonster(9500186);//怪物名稱：藍色魔法書
        mob3.getStats().setChange(true);
        mob3.changeLevel(200);
        mob3.getChangedStats().setOHp(2000);
        mob3.setHp(2000);
        eim.registerMonster(mob3);
        map.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(359,-317));
    }
        map.startMapEffect("10秒後怪物來襲，最後一戰", 5120026);
        em.schedule("Start10", 1000 * 10,eim);
}
function Start10(eim){//第5波
    var map = eim.getMapInstance(0);
    for(var i = 0;i<1;i++){//兩側BOSS
        var mob = em.getMonster(9450019);//怪物名稱：翁羅將軍
        mob.getStats().setChange(true);
        mob.changeLevel(200);
        mob.getChangedStats().setOHp(2000000000);
        mob.setHp(2000000000);
        eim.registerMonster(mob);
        map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-572,-22));
    }
    for(var i = 0;i<1;i++){//兩側BOSS
        var mob1 = em.getMonster(9450019);//怪物名稱：翁羅將軍
        mob1.getStats().setChange(true);
        mob1.changeLevel(2000000000);
        mob1.getChangedStats().setOHp(2000000000);
        mob1.setHp(2000000000);
        eim.registerMonster(mob1);
        map.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(572,-22));
    }
    for(var i = 0;i<1;i++){//兩側上方各5只
        var mob2 = em.getMonster(9450011);//怪物名稱：翁羅將軍的召喚獸
        mob2.getStats().setChange(true);
        mob2.changeLevel(200);
        mob2.getChangedStats().setOHp(200);
        mob2.setHp(200);
        eim.registerMonster(mob2);
        map.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-359,-317));
    }
    for(var i = 0;i<1;i++){//兩側上方各5只
        var mob3 = em.getMonster(9450011);//怪物名稱：翁羅將軍的召喚獸
        mob3.getStats().setChange(true);
        mob3.changeLevel(200);
        mob3.getChangedStats().setOHp(200);
        mob3.setHp(200);
        eim.registerMonster(mob3);
        map.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(359,-317));
    }
    em.setProperty("Next", "1");//Next為1來讓NPC判定能否通過保護長老任務
        map.startMapEffect("最後時刻來了！趕緊防下它！然後再找長老對話！", 5120026);
}//由於被保護的長老死後自動傳送角色出去，所以不用判斷
function Start11(eim){//上面完成後用NPC來執行這塊
    var finalitem = Array();
    var ItemList = Array(
        Array(4031994,1000),
        Array(5062000,1000),
        Array(5062002,1000),
        Array(5062500,1000),
        Array(5062002,1000),
        Array(5062024,100),
        Array(2048700,1000),
        Array(2048701,700),
        Array(2048702,600),
        Array(2048703,500),
        Array(2048704,400),
        Array(2048705,300),
        Array(2048724,100),
        Array(2048723,100),
        Array(4310143,1000),
        Array(4310014,300),
        Array(4033356,500));//這裡設置亂飛的物品
    var chance = Math.floor((Math.random()*1000)+1);
    for (var a = 0;a<ItemList.length ;a++ ){
        if(chance<ItemList[a][1]){
            finalitem.push(ItemList[a]);
        }
    }
    var map = eim.getMapInstance(0);
    map.startMapEffect("長老走的太快！這是長老落下的東西！拿完找長老", 5120026);
    var A = Math.floor((Math.random()*6)+2);
    for (var i = 0;i<A ;i++ ){
        var X = Math.floor((Math.random()*1200)-600);//整圖隨機
        var Y = -(Math.floor((Math.random()*504)+22));
        em.getMapFactoryMap(911006100).spawnAutoDrop(finalitem[Math.floor(Math.random()*finalitem.length)][0], new java.awt.Point(X,Y));
    }
    eim.getMapFactoryMap(911006100).killAllMonsters(true);
    em.setProperty("Next", "2");//打開傳送點，傳到下一個圖
    em.setProperty("JQCount","0");
}
function Start12(eim){//召喚BOSS
    var mobid =9400289;//9400289  怪物名稱：奧芙赫班(199,201)
    var mob8 = em.getMonster(mobid);
    var stats = mob8.getStats();
    stats.setHp(99999999999);
    stats.setMp(mob8.getMobMaxMp());
    stats.setPhysicalAttack(99999);
    stats.setMagicAttack(99999);
    eim.registerMonster(mob8);
    var mapForMob8 = eim.getMapInstance(931050431);
    mapForMob8.spawnMonsterOnGroundBelow(mob8, new java.awt.Point(349,-571));//待定9
}
function Start13(eim){//最後的獎勵
    var XYItemList = Array(Array(-356,-571),
                        Array(-256,-571),
                        Array(-156,-571),
                        Array(-56,-571),
                        Array(44,-571),
                        Array(144,-571),
                        Array(244,-571),
                        Array(344,-571),
                        Array(444,-571),
                        Array(544,-571),
                        Array(644,-571));
    var finalitem = Array();
    var ItemList = Array(
        Array(4031994,1000),
        Array(5062000,1000),
        Array(5062002,1000),
        Array(5062500,1000),
        Array(5062002,1000),
        Array(5062024,100),
        Array(2048700,1000),
        Array(2048701,700),
        Array(2048702,600),
        Array(2048703,500),
        Array(2048704,400),
        Array(2048705,300),
        Array(2048724,100),
        Array(2048723,100),
        Array(4310143,1000),
        Array(4310014,300),
        Array(4033356,500));//這裡設置亂飛的物品
    var chance = Math.floor((Math.random()*1000)+1);
    for (var a = 0;a<ItemList.length ;a++ ){
        if(chance<ItemList[a][1]){
            finalitem.push(ItemList[a]);
        }
    }
    var map = eim.getMapInstance(0);
    map.startMapEffect("謝謝成功保護長老,這是一點心意!", 5120026);
    //var A = Math.floor((Math.random()*9)+1);
    for (var i = 0;i<XYItemList.length ;i++ ){
        em.getMapFactoryMap(931050431).spawnAutoDrop(finalitem[Math.floor(Math.random()*finalitem.length)][0], new java.awt.Point(XYItemList[i][0],XYItemList[i][1]));
    }
}
function changedMap(eim, player, mapid) {
    if (mapid != 911006100 && mapid != 922000000 && mapid != 931050431) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(100, 911006500)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
            em.setProperty("Next", "0");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 911006500);
    em.setProperty("state", "0");
    em.setProperty("Next", "0");
    em.setProperty("leader", "true");
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(100, 911006500)) {
        em.setProperty("state", "0");
        em.setProperty("Next", "0");
        em.setProperty("leader", "true");
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function allMonstersDead(eim) {
}

function playerRevive(eim, player) {
    if (player.getEventReviveCount() > 0) {
        return false;
    }
    var map = eim.getMapFactoryMap(911006500);
    player.changeMap(map, map.getPortal(0));
    return true;
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}
function leftParty(eim, player) {
}
function disbandParty(eim) {
}
function playerDead(eim, player) {
}
function cancelSchedule() {
}
function pickUpItem(eim, player, itemID) {
}
