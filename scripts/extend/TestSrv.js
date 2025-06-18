var status = -1;
var select = -1;
var nStyle = -1;
var isAngel;
var isZero;
var isSecond = false;

function start() {
    cm.EnableUI(0);
    cm.showEffect("Map002/Effect3.img/BossLucid/Lucid/lusi");
    
    
    
    if (!cm.getConfig("tespia").equalsIgnoreCase("true")) {
        cm.dispose();
        return;
    }
    isAngel = cm.getBeginner() == 6001;
    isZero = cm.getBeginner() == 10000;
    cm.sendSimple("#b#L0#每日獎勵#l\r\n#L1#楓點換樂豆#l\r\n#L2#自定臉型#l\r\n#L3#自定髮型#l#k");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    var i = 0;
    if (status == i++) {
        if (select == -1) {
            select = selection;
        }
        switch (select) {
            case 0:
                if (cm.getSpace(4) < 18) {
                    cm.sendOk("您的道具空間不足。");
                    cm.dispose();
                    return;
                }
                if (cm.getEventCount("測試服每日獎勵") != 0) {
                    cm.sendOk("您今天已經領取獎勵。");
                    cm.dispose();
                    return;
                }
                cm.setEventCount("測試服每日獎勵");
                cm.gainItem(4310039, 100); // 春天硬幣
                cm.gainItem(4310040, 100); // 夏天硬幣
                cm.gainItem(4310041, 100); // 秋天硬幣
                cm.gainItem(4310042, 100); // 冬天硬幣
                cm.gainItem(4310218, 20); // 妖怪硬幣
                cm.gainItem(4310156, 20); // 航海師硬幣
                cm.gainItem(4310058, 50); // 梅格耐斯金幣
                cm.gainItem(4310097, 100); // 培羅德硬幣
                cm.gainItem(4310036, 20); // 征服者硬幣
                cm.gainItem(4001126, 21000); // 楓葉
                cm.gainItem(4033079, 1); // 黃金楓葉鑽石
                cm.gainItem(4033247, 10); // 黃金色楓葉
                cm.gainNX(2, 50000);
                cm.sendOk("領取每日獎勵成功");
                cm.dispose();
                break;
            case 1:
                cm.sendGetNumber("兌換樂豆點(1000點)需要10000點楓點, 你需要兌換多少呢?",1,1,100);
                break;
            case 2:
                cm.sendGetText("請輸入需要更變的臉型ID:");
                break;
            case 3:
                cm.sendGetText("請輸入需要更變的髮型ID:");
                break;
            default:
                cm.dispose();
        }
    } else if (status == i++) {
        switch (select) {
            case 1:
                if (cm.getNX(2) < (selection * 10000)) {
                    cm.sendOk("楓點不足");
                } else {
                    cm.gainNX(2, -(selection * 10000));
                    cm.gainNX(1, selection * 1000);
                    cm.sendOk("兌換成功");
                }
                cm.dispose();
                break;
            case 2:
                if (nStyle == -1) {
                    nStyle = Number(cm.getText());
                }
                if (!cm.canChangeFace(nStyle)) {
                    cm.sendOk("你輸入的臉型代碼有誤");
                    cm.dispose();
                    return;
                }
                var gender = cm.getItemGender(nStyle);
                if (gender == 2 || gender == cm.getPlayer().getGender()) {
                    var mix = nStyle.toString().length() > 7;
                    cm.sendStyle("你輸入的臉型為" + (mix ? "混合 " : "") + "#t" + (mix ? Math.floor(nStyle / 1000) : nStyle) + "#, 是否需要更變", [nStyle], 0, false);
                } else {
                    cm.sendOk("你輸入的臉型與你的性別不符");
                    cm.dispose();
                }
                break;
            case 3:
                if (nStyle == -1) {
                    nStyle = Number(cm.getText());
                }
                if (!cm.canChangeHair(nStyle)) {
                    cm.sendOk("你輸入的髮型代碼有誤");
                    cm.dispose();
                    return;
                }
                var gender = cm.getItemGender(nStyle);
                if (gender == 2 || gender == cm.getPlayer().getGender()) {
                    cm.sendStyle("你輸入的髮型為#t" + nStyle + "#, 是否需要更變", [nStyle], 0, false);
                } else {
                    cm.sendOk("你輸入的髮型與你的性別不符");
                    cm.dispose();
                }
                break;
            default:
                cm.dispose();
        }
    } else if (status == i++) {
        switch (select) {
            case 2:
            case 3:
                if (isAngel) {
                    cm.askAngelicBuster();
                } else if (isZero) {
                    cm.sendSimple("請選擇要接受變更的角色.#b\r\n\r\n#b#L0#神之子阿爾法#l\r\n#L1#神之子蓓塔#l\r\n#L2#神之子阿爾法 + 神之子蓓塔#l");
                } else {
                    action(1, 0, 0);
                }
                break;
            default:
                cm.dispose();
        }
    } else if (status == i++) {
        switch (select) {
            case 2:
            case 3:
                if (isAngel) {
                    if (selection == -1) {
                        cm.dispose();
                        return;
                    }
                    isSecond = selection != 0;
                } else if (isZero) {
                    isSecond = selection == 1;
                }
                cm.setAvatar(nStyle, isSecond);
                if (isZero && selection == 2) {
                    cm.setAvatar(nStyle, true);
                }
                cm.dispose();
                break;
            default:
                cm.dispose();
        }
    } else {
        cm.dispose();
    }
}