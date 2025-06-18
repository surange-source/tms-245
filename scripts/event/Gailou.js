var hour;
var min;
var year;
var month;
var day;
var date;
var timeStamp;
var setupTask;
function init() {
    scheduleNew();
}

function scheduleNew() {
    em.setProperty("state", "false");
    em.setProperty("endEvent", "true");
    em.setProperty("check", "0");
    em.setProperty("maxCheck", "9999999");
    var cal = java.util.Calendar.getInstance();
    hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
    min = cal.get(java.util.Calendar.MINUTE);
    refreshDates(cal);
    if (hour < 12){
        date = year + "-" + month + "-" + day + " 12:00:00.0";
        timeStamp = java.sql.Timestamp.valueOf(date).getTime();
        setupTask = em.scheduleAtTimestamp("startEvent", timeStamp);
        em.broadcastServerMsg("[搶樓活動] 活動將在"+date+"再次開始，希望大家積極參加。");
    }else if (hour >= 12&& hour<=22){
        date = year + "-" + month + "-" + day + " "+(hour+1)+":00:00.0";
        timeStamp = java.sql.Timestamp.valueOf(date).getTime();
        setupTask = em.scheduleAtTimestamp("startEvent", timeStamp);
        em.broadcastServerMsg("[搶樓活動] 活動將在"+date+"再次開始，希望大家積極參加。");
    }else{
        date = year + "-" + month + "-"+(day+1)+" 12:00:00.0";
        timeStamp = java.sql.Timestamp.valueOf(date).getTime();
        setupTask = em.scheduleAtTimestamp("startEvent", timeStamp);
        em.broadcastServerMsg("[搶樓活動] 活動將在"+date+"再次開始，希望大家積極參加。");
        //em.broadcastServerMsg("[搶樓活動] 活動每天12點~23點整時開啟現在時間 "+ hour +":"+ min+"，希望大家積極參加。");
    }
    
    /*while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 60 * 2; //設置多久開啟
    }*/
    

}

function startEvent() {
    em.setProperty("state", "true");
    em.setProperty("endEvent", "false");
    em.setProperty("check", 0);
    em.setProperty("maxCheck", "" + getMaxCheck(Math.floor(Math.random() * 2)));
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 10);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 10; //設置多久結束
    }
    setupTask = em.scheduleAtTimestamp("finishEvent", nextTime);
    em.broadcastServerMsg(5120116, "搶樓活動已經開始，請到市場18洞門口找 阿爾法 開搶吧",true);
    em.broadcastServerMsg("[搶樓活動]  活動已經開啟。10分鐘後結束，第1個達到 " + em.getProperty("maxCheck") + " 樓的玩家將獲得豐厚的獎勵。");
}

function finishEvent() {
    if (em.getProperty("endEvent").equals("false")) {
        em.broadcastServerMsg("[搶樓活動] 活動已經結束。活動每天12點~23點整時開。本次活動未開出所有獎勵，請大家再接再厲。");
    } else {
        em.broadcastServerMsg("[搶樓活動] 本次活動所有獎勵已經發放，活動每天12點~23點整時開，希望大家積極參加。");
    }
    scheduleNew();
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}

function getMaxCheck(type) {
    switch (type) {
    case 0:
        return 88;
    case 1:
        return 99;
    case 2:
        return 111;
    }
    return 122;
}

function rand(lbound, ubound) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
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