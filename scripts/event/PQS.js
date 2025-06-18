/* 
 * 
   
   
 */
var setupTask;
var setupTask9;
var eim;
var map;
function init() {
    eim = em.newInstance("PQS");
    map = eim.getMapInstance(932200100);
    ResetProperty();
    newtime();
    scheduleNew();
}
function ResetProperty(){
    em.setProperty("rank", "0");
    em.setProperty("gate", "0");
    em.setProperty("time", "0");
}
function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    var hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
    var min = cal.get(java.util.Calendar.MINUTE);
    var second = cal.get(java.util.Calendar.SECOND); //獲得秒
    refreshDates(cal);
    if (hour < 21){
        date = year + "-" + month + "-" + day + " 21:00:00.0";
        timeStamp = java.sql.Timestamp.valueOf(date).getTime();
        setupTask = em.scheduleAtTimestamp("newopen", timeStamp);
        em.broadcastServerMsg("[公會跑旗活動] 活動將在"+date+"開始，希望大家積極參加。");
        em.setProperty("rank", "0");
        em.setProperty("gate", "0");
        em.setProperty("time", "0");
    }else if(hour==21 && min==00 && second==00){
        setupTask = em.scheduleAtTimestamp("newopen", 1000);
        em.broadcastServerMsg(5121033, "[公會跑旗活動] 活動開始，希望大家積極參加。" ,true);
        em.setProperty("rank", "0");
        em.setProperty("gate", "0");
        em.setProperty("time", "0");
    }else{
        date = year + "-" + month + "-" + (day+1) + " 21:00:00.0";
        timeStamp = java.sql.Timestamp.valueOf(date).getTime();
        setupTask = em.scheduleAtTimestamp("newopen", timeStamp);
        em.broadcastServerMsg("[公會跑旗活動] 活動將在"+date+"開始，希望大家積極參加。");
        em.setProperty("rank", "0");
        em.setProperty("gate", "0");
        em.setProperty("time", "0");
    }
}
function refreshDates(calendar) {
    year = calendar.get(java.util.Calendar.YEAR);
    month = calendar.get(java.util.Calendar.MONTH) + 1;
    if (Math.floor(month / 10) == 0) {
        month = "0" + month;
    }
    day = calendar.get(java.util.Calendar.DATE);
    if (Math.floor(day / 10) == 0) {
        day = "0" + day;
    }
}
function newtime(){//這個計時器檢查GM是否手動開啟活動
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 1;
    }
    setupTask9 = em.scheduleAtTimestamp("start", nextTime);
}
function newopen(){
    if (em.getProperty("gate")!="2","3"){
        em.setProperty("gate", "1");
    em.schedule("start", 1000, eim);
    }
}
function setup(eim) {
    if (em.getProperty("time")=="1"){
        eim.startEventTimer(60000); // 10 min
    }else if (em.getProperty("time")=="2"){
        eim.startEventTimer(600000); // 10 min
    }else if (em.getProperty("time")=="3"){
        eim.startEventTimer(30000); // 10 min
    }else{
        map.startMapEffect("計時器錯誤", 5121050);
    }
    return eim;
}
function start(eim) {
    eim = em.newInstance("PQS");
    if (em.getProperty("gate")=="0"||em.getProperty("gate")==null){//0代表沒有開啟狀態
        newtime();
        em.setProperty("rank", "0");
        em.setProperty("gate", "0");
        em.setProperty("time", "0");
    }else if(em.getProperty("gate")=="1"){//1代表開啟入口並且等待
        if (em.getMapFactoryMap(932200100).getCharactersSize() < 5&&em.getProperty("gate")=="1") {
            map.startMapEffect("目前活動少於5人，請等待！", 5121050);
            newtime();//如果活動地圖少於5人，直接再等。
            //setupTask9.cancel(true);
        }else{
            map.startMapEffect("現在有1分鐘的時間繼續等候其它玩家，請稍後！", 5121050);
            //em.worldSpouseMessage(0x09,"[跑旗賽]：跑旗賽3分鐘後開始進行");
            //em.setProperty("gate", "2");//等待狀態
            em.setProperty("time","1");
            em.schedule("setup", 1000, eim);
        }
        return;
    }else{//2代表正在進行
        newtime();
    }
}
function startgame(eim){
    var players = map.getCharacters().iterator();
            while (players.hasNext()) {
                var player = players.next();
                eim.registerPlayer(player);
            }
    em.setProperty("time","2");
    em.setProperty("gate", "2");
    em.schedule("setup", 1000, eim);
    em.broadcastServerMsg(5121033, "[跑旗賽]：跑旗賽開始進行啦！" ,true);
    //em.worldSpouseMessage(0x09,"[跑旗賽]：跑旗賽開始進行啦！");
    //return eim;
}
/*function overgame(){
    for (var i = 0; i < eim.getMapFactoryMap(932200100).getCharactersSize(); i++) {
        if (eim.getMapFactoryMap(932200100).getCharactersSize() != 0) {
            eim.getMapFactoryMap(932200100).getCharactersThreadsafe().get(i).getChar().warp(932200002, 0);//傳送到定點上
        }
    }
    eim.getMapInstance(932200002).startMapEffect("請玩家在下次活動開啟前領取獎勵！否則無獎勵", 5121050);
    em.setProperty("gate","0");//rank（round）+名字 由離開的腳本來清除
    em.setProperty("rank","0");
    em.schedule("newtime", 1000, eim);
}*/
function cancelSchedule() {
    if(setupTask!=null){
        setupTask.cancel(true);
    }else if(setupTask9!=null){
        setupTask9.cancel(true);
    }
}
function playerEntry(eim, player) {}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    if (mapid != 932200100) {
        eim.unregisterPlayer(player);
    }
    return ;
}

function scheduledTimeout(eim) {
    var eim = em.newInstance("PQS");
    var map = eim.getMapInstance(932200100);
    if(em.getProperty("time")=="1"){
        em.schedule("startgame", 1000, eim);
    }else{
        em.setProperty("time", "0");
        em.schedule("timeout", 1000, eim);
        eim.getMapInstance(932200002).startMapEffect("請玩家在下次活動開啟前領取獎勵！否則無獎勵", 5121050);
        scheduleNew();
    }
}
function timeout(eim){
    var players = map.getCharacters().iterator();
    while (players.hasNext()) {
       var player = players.next();
       eim.registerPlayer(player);
    }
    em.warpAllPlayer(932200100, 932200002);
}
function clearPQ(eim) {
    em.setProperty("rank", "0");
    em.setProperty("gate", "0");
    em.setProperty("time", "0");
    scheduledTimeout(eim);
}
function allMonstersDead(eim) {}
function playerDisconnected(eim, player) {}
function playerExit(eim, player) {}
function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function monsterDrop(eim,player,mob){}