var status = -1;
var selectedType = 0;
var selectedMeso = 0;
var moneyMeso = 100000000;
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
            if (status == 2) {
                cm.sendNext("如果您需要存款或者取款的話請找我，那麼請下次來找我！");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請選擇您需要操作的項目:\r\n\r\n您目前身上有#r " + cm.getMeso() + " #k楓幣\r\n銀行存款為#r " + cm.getMoney() + " #k億楓幣\r\n#b#L0#我要存款#l\r\n#L1#我要取款#l");
        } else if (status == 1) {
            selectedType = selection;
            if (selectedType == 0) {
                cm.sendGetNumber("請輸入您要存款的金額(單位: 億 ):\r\n", 1, 1, 23);
            } else if (selectedType == 1) {
                cm.sendGetNumber("請輸入您要取款的金額(單位: 億 ):\r\n", 1, 1, 5);
            }
        } else if (status == 2) {
            selectedMeso = selection;
            if (selectedType == 0) {
                cm.sendYesNo("您是否要存入#r " + selectedMeso + " #k億楓幣。");
            } else if (selectedType == 1) {
                cm.sendYesNo("您是否要取出#r " + selectedMeso + " #k億楓幣。");
            }
        } else if (status == 3) {
            if (selectedType == 0) {
                if (cm.getMeso() < selectedMeso * moneyMeso) {
                    cm.sendNext("您的楓幣不夠。");
                } else if (cm.addMoney(selectedMeso, 0) > 0) {
                    cm.gainMeso( - selectedMeso * moneyMeso);
                    cm.sendOk("好的，已經存入！");
                } else {
                    cm.sendOk("存款出現錯誤，請反饋給管理員！");
                }
                cm.dispose();
            } else if (selectedType == 1) {
                if (cm.getMoney() < selectedMeso) {
                    cm.sendNext("您沒有存那麼多錢。");
                } else if (cm.getMeso() > 1500000000) {
                    cm.sendNext("您身上的楓幣超過了 15 億，領取失敗。請將楓幣存入倉庫後來找我領取吧！");
                } else if (cm.addMoney( - selectedMeso, 1) > 0) {
                    cm.gainMeso(selectedMeso * moneyMeso);
                    cm.sendOk("好的，請收好您的錢！");
                } else {
                    cm.sendOk("取款出現錯誤，請反饋給管理員！");
                }
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    }
}