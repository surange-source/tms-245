/*
 * 芬芬時尚潮流 
 * R.E.D幣兌換楓葉
 */
var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var eff ="#fUI/UIWindow/Quest/icon6/7#";
var eff1 ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，歡迎使用R.E.D幣兌換:\r\n" + eff1 + "#v4310088##z4310088#1:1#v4001126##z4001126#\r\n" + eff1 + "目前#z4310088#:#r" + cm.getItemQuantity(4310088) + "#k個\r\n" + eff1 + "目前#z4001126#:#r" + cm.getItemQuantity(4001126) + "#k個\r\n\r\n#b#L0#" + eff1 + "R.E.D兌換楓葉#l\r\n#L1#" + eff1 + "楓葉兌換R.E.D幣#l#l");
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能參與兌換.");
                cm.dispose();
            }
            if (selection == 0) {
               //if (cm.getPlayer().getCSPoints(1) / 1500 == 0) {
                if (cm.getItemQuantity(4310088) == 0) {    
                    cm.sendNext("您的R.E.D幣不足，無法兌換楓葉。");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("請輸入R.E.D兌換楓葉的數量:\r\n兌換比例為 1 : 1\r\n", 1, 1, cm.getItemQuantity(4310088));
                }
            } else if (selection == 1) {
                if (cm.getItemQuantity(4001126) == 0) {
                    cm.sendNext("您的楓葉不足，無法R.E.D幣。");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("請輸入楓葉兌換R.E.D幣的數量:\r\n兌換比例為 1 : 1\r\n", 1, 1, cm.getItemQuantity(4001126));
                }
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (selection <= 0) {
                    cm.sendOk("輸入的兌換數字錯誤.");
                    cm.dispose();
                }else if(selection >= 200){
                    sl=(selection/200)+1;
                } else{
                    sl=3;
                }
                if (cm.getSpace(4) < sl) {
                    cm.sendOk("你的背包「其它」空間不足!請至少有"+sl+"個空間以上.\r\n如果上面有出現小數的話請入位!\r\n如：出現<至少有7.5個空間以上>那麼您就需要留8個空間!");
                    cm.dispose(); 

                }else if (cm.getItemQuantity(4310088) >= selection * 1) {
                    //cm.gainNX( - selection * 1);
                    cm.gainItem(4310088, -selection);
                    cm.gainItem(4001126, selection);
                    cm.sendOk("您成功將#r " + (selection * 1) + " #k個#z4310088##v4310088#換為#z4001126##v4001126# x #r" + selection + " #k")
                    cm.dispose();
                } else {
                    cm.sendNext("您的輸入的數量錯誤，無法兌換楓葉。");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4001126, selection)) {
                    cm.gainItem(4001126, -selection);
                    cm.gainItem(4310088, selection);
                   // cm.gainNX( + 1400 * selection);
                 //   cm.sendOk("您成功將#z4001126##v4001126# x #r" + selection + " #k換為#r " + (1400 * selection) + " #k樂豆點。");
                    cm.sendOk("您成功將#r " + (selection * 1) + " #k個#z4001126##v4001126#換為#z4310088##v4310088# x #r" + selection + " #k")
                    cm.dispose();
                } else {
                    cm.sendNext("您的輸入的數量錯誤，無法兌換R.E.D幣。");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}