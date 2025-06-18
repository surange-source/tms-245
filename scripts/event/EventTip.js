/*  
 *  
 *  功能：活動開始時間提示
 *  
 */
var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 50);
    cal.set(java.util.Calendar.SECOND, 0);

    var nextTime = cal.getTimeInMillis();

    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60;
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    if (setupTask != null)
        setupTask.cancel(true);
}

function start() {
    var cal = java.util.Calendar.getInstance();
    var hour = cal.get(java.util.Calendar.HOUR);
    var min = cal.get(java.util.Calendar.MINUTE);
    var sec = cal.get(java.util.Calendar.SECOND);
    var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
    var month = cal.get(java.util.Calendar.MONTH) + 1; //獲得月份
    var day = cal.get(java.util.Calendar.DATE); //獲取日
    weekday = weekday - 1;
    scheduleNew();
    if (hour == 19 && (minute == 40) && (weekday == 6 || weekday == 5 || weekday == 0)) {
        //em.broadcastServerMsg(5121028, "20分鐘後將開啟 < 擠牛奶活動 >，大家抓緊時間做好準備吧！", true);
    }
    /*if (hour == 13 && (min >= 0 && min <= 20)) {
     //em.broadcastServerMsg(5120074, "下午13點的無限火力關卡開始了。20分鐘後將關閉了，請抓緊挑戰。", true);
     } else*/
    if (min >= 30 && min < 40) {
        em.broadcastServerMsg(5120074, "[數字猜猜猜] 活動開始了。 " + (40 - min) + "分鐘後將關閉，請抓緊來來【凱茜】處參與吧。", true);
    } else if (min == 48 || min == 49 || min == 50) {
        if (min == 55) {
            em.broadcastServerMsg(5120074, "< 答題 > 在市場【凱茜】處開放了,小夥伴們抓緊時間做作業吧..", true);
        } else {
            em.broadcastServerMsg(5120074, "< 答題 > 活動將在" + (50 - min) + "分鐘後開始,小夥伴們趕緊準備喲...", true);
        }
    } else if (min == 0) {
        em.broadcastServerMsg(5120074, " < 答題 > 活動結束了，請期待下個小時55分的時候繼續回來答題哦.", true);
    } else if (hour == 1 && (min == 55 || min == 57 || min == 59)) {
        //em.broadcastPlayerMsg(6, "伺服器IP將在2點後進行更新,請玩家安全下線等待幾分鐘後再上線.");
    }
    //if ((month == 2 || month == 3) && (day == 27 || day == 28 || (day >=1 && day<=5)) && hour == 16 && min == 30) {
    //    em.broadcastServerMsg(5120074,"裂空之鷹開服紅包開搶啦，只有5分鐘時間，速速前往領取！",true);
    //}
}