/*
 * 名稱：楓幣服務NPC
 * 作者：故事
 * 版本：1.0
 
 
 */

var status = -1;
var beauty = 0;
var tosend = 0;

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
                cm.sendOk("歡迎下次在來。");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#b#h0# #k這裡可以使用遊戲楓幣進行特殊項目。\r\n您當前楓幣額度:" + cm.getMeso() + "。\r\n";
            zyms += "#L0##b購買人氣#l\r\n";
            zyms += "#L1##b點播市場音樂#l\r\n";
            zyms += "#L2##b領取影武者面巾#l\r\n";
            zyms += "#L3##r楓幣現金商店#l\r\n";
            //zyms += "#L4##r楓幣重置組隊任務進行次數(New)#l\r\n";
            cm.sendSimple(zyms);
        } else if (status == 1) {
            if (selection == 0) {

                beauty = 1;
                cm.sendGetNumber("#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n購買比例為 #r150萬楓幣 #k: #b1點人氣#k\r\n您當前楓幣額度:#r" + cm.getMeso() + "  #b人氣點數:#b" + cm.getFame() + " #b點#k\r\n#k請輸入您想要兌換#r人氣#b的數量:", 1, 1, cm.getMeso());

            } else if (selection == 1) {
                cm.dispose();
                cm.openNpc(9000100);

            } else if (selection == 2) {
                if (cm.getPlayer().getJob() != 434) {
                    cm.sendOk("只有影武者職業才可以進行此項目。");
                } else if (cm.getMeso() < 1500000) {
                    cm.sendOk("進行當前項目需要支付1500000楓幣才可以進行，你沒有足夠的楓幣。");
                 } else if (cm.getSpace(1) < 2) {
                    cm.sendOk("背包裝備欄有2個空間才可以領取。");
                } else if (cm.getBossLog("影武面巾", 1) < 1) {
                    cm.gainMeso(-1500000);
                    cm.setBossLog("影武面巾", 1);
                    cm.gainItem(1012191, 1);
                    cm.sendOk("領取成功,祝您遊戲愉快。");
                } else {
                    cm.sendOk("您已經領取過了。");
                }
                status = -1;
            } else if (selection == 3) {
                 cm.dispose();
                 cm.openShop(328);

            } else if (selection == 4) {
                cm.dispose();
                cm.sendOk("正在開發此項目。");
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (cm.getMeso() >= selection * 1500000) {
                    cm.gainMeso(-selection * 1500000);
                    cm.gainFame(1 * selection);
                    cm.sendOk("購買成功,您獲得了" + selection + "#k點人氣。");
                } else {
                    cm.sendOk("購買" + selection + "點人氣需要" + selection * 1500000 + "楓幣,你沒有足夠的楓幣。");

                }

            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}
