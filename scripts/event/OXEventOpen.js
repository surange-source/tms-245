var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    em.setProperty("open", "false");
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 10);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000; //設置多久開啟
    }
   // setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
   // 人工開啟的話，屏蔽上面的就可以了。
}

function startEvent() {
    em.setProperty("open", "true");
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 10);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 3; //設置多久結束
    }
    setupTask = em.scheduleAtTimestamp("finishEvent", nextTime);
    em.broadcastServerMsg(5120026, "OX賓果活動已經開始拉！請大家速度從副本入口進來哦！", true);
    em.broadcastServerMsg("[OX賓果活動]  活動入口已經開啟，請大家速度從副本入口進來哦！");
}

function finishEvent() {
    em.broadcastServerMsg("[OX賓果活動] 活動入口已經關閉，將在50分鐘後再次開放！");
    scheduleNew();
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}