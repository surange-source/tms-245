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
        if (cm.getVipLevel() == 0) {
            var vip0 = "" + (1440 - cm.getVipExp()) + "";//vip升級經驗
            var vip01 = "1440";//vip升級需要的經驗
            var vip02 = "" + cm.getVipLevel() + 1 + "";
        }
        if (cm.getVipLevel() == 1) {
            var vip0 = "" + (1440 - cm.getVipExp()) + "";//vip升級經驗
            var vip01 = "1440";//vip升級需要的經驗
            var vip02 = "" + (cm.getVipLevel() + 1) + "";
        }
        if (cm.getVipLevel() == 2) {
            var vip0 = ""+ (4320 - cm.getVipExp()) +"" ;//vip升級經驗
            var vip01 = "4320";//vip升級需要的經驗
            var vip02 = "" + (cm.getVipLevel() + 1) + "";
        }
        
        if (cm.getVipLevel() == 3) {
            var vip0 = "" + (10080 - cm.getVipExp()) + "";//vip升級經驗
            var vip01 = "10080";//vip升級需要的經驗
            var vip02 = "" + (cm.getVipLevel() + 1) + "";
        }
        
        if (cm.getVipLevel() == 4) {
            var vip0 = "" + (21600 - cm.getVipExp()) + "";//vip升級經驗
            var vip01 = "21600";//vip升級需要的經驗
            var vip02 = "" + (cm.getVipLevel() + 1) + "";
        }
        
        if (cm.getVipLevel() == 5) {
            var vip0 = "" + (36000 - cm.getVipExp()) + "";//vip升級經驗
            var vip01 = "36000";//vip升級需要的經驗
            var vip02 = "" + (cm.getVipLevel() + 1) + "";
        }
        
        if (cm.getVipLevel() == 6) {
            var vip0 = "" + (57600 - cm.getVipExp()) + "";//vip升級經驗
            var vip01 = "57600";//vip升級需要的經驗
            var vip02 = "" + (cm.getVipLevel() + 1) + "";
        }

        if (cm.getVipLevel() == 7) {
            var vip0 = "最高等級";//vip升級經驗
            var vip01 = "最高等級";//vip升級需要的經驗
            var vip02 = "最高等級";
        }




        if (status == 0) {
            var vipjy = cm.getVipExp();
            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k";
            zyms += "您的超級VIP信息如下：\r\n";
            zyms += "VIP等級: #r" + cm.getVipLevel() + "               #kVIP名稱: #b" + cm.getPlayer().getVipName() + "#k\r\n";
            zyms += "VIP到期時間: #r" + cm.getVipTimeShow() + "#k\r\n";
            zyms += "#kVIP經驗: #r" + cm.getVipExp() + "/" + vip01 + "#k           \r\n升級VIP：#r" + vip02 + "     #k還需經驗：#r" + vip0 + "#b#n\r\n";
            zyms += "                    #L1##b查看規則#l \r\n\r\n";
            zyms += "           #L2##b開通VIP#l  #fMob/0130101.img/move/0##L3##rVIP續費#k#l\r\n";
            zyms += "    #L4##rVIP等級送禮#l               #L5##rVIP每日福利#l\r\n";

            cm.sendSimple(zyms);









        } else if (selection == 1) {
            var zyms = "";
            zyms += "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#kVIP規則如下:\r\nVIP等級分7個階段,每個階段的福利都不同(等級越高福利越好)。\r\n開通VIP後遊戲在線每5分鐘VIP經驗增加1,達到要求VIP等級自動升級。\r\n#r注意:#kVIP過期後每天會自動扣除經驗點數200,VIP等級也會降低。\r\nVIP福利詳解:\r\nVIP1、基礎爆率x1.3 上線炫酷廣播 專屬每日福利\r\n";
            zyms += "VIP2、基礎爆率x1.4 上線炫酷廣播 專屬每日福利\r\n";
            zyms += "VIP3、基礎爆率x1.5 上線炫酷廣播 專屬每日福利\r\n";
            zyms += "VIP4、基礎爆率x1.6 上線炫酷廣播 專屬每日福利\r\n";
            zyms += "VIP5、基礎爆率x1.7 上線炫酷廣播 專屬每日福利\r\n";
            zyms += "VIP6、基礎爆率x1.8 上線炫酷廣播 專屬每日福利\r\n";
            zyms += "VIP7、基礎爆率x2.0 上線炫酷廣播 專屬每日福利\r\n";
            zyms += "購買VIP時間為30天,續費時間為30天。續費時間可以和基礎時間疊加,完美實現提前續費。\r\n";
            cm.sendOk(zyms);
            cm.dispose();

        } else if (selection == 2) {
            if (cm.getVipLevel() > 0) {
                cm.sendOk("您已經開通了超級VIP,無法重複開通。\r\n\r\n如果您的超級VIP過期請使用VIP續費進行再次開通。");
            } else if (cm.getJQ() >= 500) {
                cm.addJQ(-500);
                cm.setVip(30);
                cm.sendOk("超級VIP開通成功。\r\n\r\n您的VIP到期時間: #r" + cm.getVipTimeShow() + "#k");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 開通了超級VIP，有了他(她)的贊助追憶MS會為大家帶來更加完美的遊戲體驗。");
            } else {
                cm.sendOk("開通失敗,開通超級VIP需要#b500金卷#k。\r\n\r\n賬戶金卷: #r" + cm.getJQ() + "");
            }
            cm.dispose();

        } else if (selection == 3) {
            if (cm.getVipLevel() == 0) {
                cm.sendOk("您沒有開通VIP,請先開通VIP在續費。\r\n\r\n如果您VIP到期沒時間續費,可以提前續費VIP。VIP時間會疊加！");
            } else if (cm.getJQ() >= 500) {
                cm.addJQ(-500);
                cm.addVip(30);
                cm.sendOk("續費VIP成功,您的VIP時間增加了30天。\r\n\r\nVIP到期時間: #r" + cm.getVipTimeShow() + "#k");
                cm.worldSpouseMessage(0x20, "玩家 " + cm.getChar().getName() + " 續費了超級VIP，有了他(她)的贊助追憶MS會為大家帶來更加完美的遊戲體驗。");
            } else {
                cm.sendOk("續費失敗,續費超級VIP需要#b500金卷#k。\r\n\r\n賬戶金卷: #r" + cm.getJQ() + "");
            }
            cm.dispose();

        } else if (selection == 4) {
            cm.dispose();
            cm.openNpc(9010002);
        
        } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(9010002,1);
           





        }

    }
}

