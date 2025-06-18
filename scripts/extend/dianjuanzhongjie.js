var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var eff ="#fUI/UIWindow/Quest/icon6/7#";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("如果您需要樂豆點中介的話，那麼請下次來找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n#r(樂豆點<-1500樂豆點/個--中介費為100樂豆點->#v4000463#國慶紀念幣)\r\n#k#l請想好了再兌換哦!!!\r\n\r\n您當前樂豆點為:#r " + cm.getPlayer().getCSPoints(1) + " #k點\r\n國慶紀念幣為:#r " + cm.getItemQuantity(4000463) + " #k個\r\n#b#L0#" + eff + "我要兌換物品#l\r\n#L1#" + eff + "我要兌換樂豆點#l");
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能參與兌換.");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getPlayer().getCSPoints(1) / 1500 == 0) {
                    cm.sendNext("您的樂豆點不足，無法兌換國慶紀念幣。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("請輸入樂豆點兌換國慶紀念幣的數量:\r\n兌換比例為 1500 : 1\r\n", 1, 1, cm.getPlayer().getCSPoints(1) / 1500);
                }
            } else if (selection == 1) {
                if (cm.getItemQuantity(4000463) == 0) {
                    cm.sendNext("您的國慶紀念幣不足，無法兌換樂豆點。");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("請輸入國慶紀念幣兌換樂豆點的數量:\r\n兌換比例為 1 : 1400\r\n", 1, 1, cm.getItemQuantity(4000463));
                }
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (selection <= 0) {
                    cm.sendOk("輸入的兌換數字錯誤.");
                    cm.dispose();
                }else if(selection>=200){
                    sl=(selection/200)+1;
                } else{
                    sl=3;
                }
                if (cm.getSpace(4) < sl) {
                    cm.sendOk("你的背包「其它」空間不足!請至少有"+sl+"個空間以上.\r\n如果上面有出現小數的話請入位!\r\n如：出現<至少有7.5個空間以上>那麼您就需要留8個空間!");
                    cm.dispose(); 

                }else if (cm.getPlayer().getCSPoints(1) >= selection * 1500) {
                    cm.gainNX( - selection * 1500);
                    cm.gainItem(4000463, selection);
                    cm.sendOk("您成功將#r " + (selection * 1500) + " #k樂豆點換為國慶紀念幣#v4000463# x #r" + selection + " #k")
                    cm.dispose();
                } else {
                    cm.sendNext("您的輸入的數量錯誤，無法兌換國慶紀念幣。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4000463, selection)) {
                    cm.gainItem(4000463, -selection);
                    cm.gainNX( + 1400 * selection);
                    cm.sendOk("您成功將國慶紀念幣#v4000463# x #r" + selection + " #k換為#r " + (1400 * selection) + " #k樂豆點。");
                    cm.dispose();
                } else {
                    cm.sendNext("您的輸入的數量錯誤，無法兌換樂豆點。");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}