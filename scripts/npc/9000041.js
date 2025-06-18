/* 
 Donations
 Donation Box
 Made by Kent
 */
var year;
var month;
var day;
var calendar;
var date;
var starDate = "2015-10-22";
var endDate = "2015-12-31";
function start() {
    status = -1;
    calendar = java.util.Calendar.getInstance();
    year = calendar.get(java.util.Calendar.YEAR);
    month = calendar.get(java.util.Calendar.MONTH) + 1;
    if (Math.floor(month / 10) == 0) {
        month = "0" + month;
    }
    day = calendar.get(java.util.Calendar.DATE);
    if (Math.floor(day / 10) == 0) {
        day = "0" + day;
    }
    date = year + "-" + month + "-" + day;
    if (date >= starDate && date <= endDate || cm.isAdmin()) {
        cm.sendSimple("現在可以用楓葉來兌換獎品喲!\r\n\r\n#L0#我要兌換\r\n");
    } else {
        cm.sendOk("下次楓葉兌換開放時間:" + starDate + " 至 " + endDate + " ,我會對收集到的楓葉進行兌換,現在兌換活動還沒有開始!。");
        cm.dispose();
    }
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if (selection == 0) {
            cm.dispose();
            cm.openNpc(9000041, "maple");
            return;
        }

    }
    cm.dispose();
}
