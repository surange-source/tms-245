
/*      
 
 NPC版權:                追憶楓之谷
 NPC類型:                 綜合NPC
 製作人：故事、
 
 */
var hour;
var status = 0;
var typede = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {

            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#e#k伺服器時間：#b" + cm.getHour() + ":" + cm.getMin() + ":" + cm.getSec() + "#n\r\n";
            zyms += "#L1##b離線掛機#r (獨家特色系統)#k#l\r\n";
            zyms += "#L2##b2014夏季運動會火爆開幕#r (各種道具等著你來拿)#k#l\r\n";
            zyms += "#L3##b免費皇家理發隨意抽#r (活動每日晚: 20 ：00進行)#k#l\r\n";
            zyms += "#L4##b免費皇家整容隨意抽#r (活動每日晚: 21 ：00進行)#k#l\r\n";
            zyms += "#L5##b每晚轉點活動進行中#r (活動每日晚: 00 ：00進行)#k#l\r\n";
            zyms += "#L6##b管理員的邀請#g (參與活動隨機可獲得1000-5000樂豆點)#k#l\r\n";
            cm.sendSimple(zyms);




        } else if (selection == 1) { //簽到
            cm.dispose();
            cm.sendOk("預計13日晚上系統正式開啟。");
            //cm.openNpc(9010060, 1);

        } else if (selection == 2) { //免費福利
            cm.dispose();
            cm.sendOk("即將開啟。");

        } else if (selection == 3) { //免費福利
            if (cm.getHour() == 20 && cm.getMin() < 2) {
                cm.dispose();
                cm.openNpc(9000159, 1);
            } else {
                cm.sendOk("#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k\r\n現在還沒有到活動時間,你還不能參加。\r\n參加#b活動#k時間每天\r\n#b晚上20：00開始 20：02結束\r\n#k每次你有#b2分鐘#k的時間可以免費抽取#b皇家髮型#k,不要錯過了哦。#k\r\n當前伺服器時間：#e" + cm.getHour() + "點" + cm.getMin() + "分" + cm.getSec() + "秒 #n");
                cm.dispose();
            }

        } else if (selection == 4) { //免費福利
            if (cm.getHour() == 21 && cm.getMin() < 2) {
                cm.dispose();
                cm.openNpc(9000159, 2);
            } else {
                cm.sendOk("#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k\r\n現在還沒有到活動時間,你還不能參加。\r\n參加#b活動#k時間每天\r\n#b晚上21：00開始 21：02結束\r\n#k每次你有#b2分鐘#k的時間可以免費抽取#b皇家臉型#k,不要錯過了哦。#k\r\n當前伺服器時間：#e" + cm.getHour() + "點" + cm.getMin() + "分" + cm.getSec() + "秒 #n");
                cm.dispose();
            }

        } else if (selection == 5) { //免費福利
            cm.dispose();
            cm.sendOk("活動內容：\r\n\r\n每晚整點00 : 00只要上線遊戲就有機會獲得管理員贈送的禮物。#b活動地圖：1頻道自由市場#k\r\n\r\n裝備、道具、金卷、樂豆點統統都有。\r\n\r\n當然這得看你的人品,不是人人都有的哦~~");

        } else if (selection == 6) { //管理員的邀請
            cm.dispose();
            cm.sendOk("即將開啟。");




        }
    }
}

