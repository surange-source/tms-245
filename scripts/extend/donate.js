var status = 0;
var donteChannel = -1;

function start() {
    var menu = "";
    menu += "\r\n#L0#綠界#l";
//    menu += "\r\n#L1#藍新#l";
//    menu += "\r\n#L2#萬事達#l";
    cm.askMenu("請選擇贊助管道:" + menu);
}

function action(mode, type, selection) {
    if (donteChannel == -1) {
        donteChannel = selection;
    }
    switch (donteChannel) {
        case 0:
            ecpay(mode, type, selection);
            break;
        default:
            cm.sendOk("暫未支援這個贊助管道");
            cm.dispose();
            break;
    }
}

var ecpay_url = "";
var ecpay_payMethod = -1;
var ecpay_payAmount = -1;
function ecpay(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 1;
    if (status == i++) {
        var menu = "";
//        menu += "\r\n#L0#信用卡#l";
//        menu += "\r\n#L1#ATM櫃員機#l";
        menu += "\r\n#L2#超商代碼#l";
        cm.askMenu("請選擇付款方式:#b" + menu);
    } else if (status == i++) {
        if (ecpay_payMethod == -1) {
            ecpay_payMethod = selection;
        }
        switch (ecpay_payMethod) {
            case 2:
                var min_donate = cm.getConfig("min_donate");
                cm.askNumber("請輸入贊助金額:", min_donate, min_donate, 6000);
                break;
            default:
                cm.sendOk("暫未支援這個付款方式");
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        if (ecpay_payAmount == -1) {
            ecpay_payAmount = selection;
        }
        switch (ecpay_payMethod) {
            case 2:
                var result = cm.getPayInfoCVS(ecpay_payAmount);
                if (!result.contains("\r\n")) {
                    cm.sendOk(result);
                } else {
                    var info = result.split("\r\n");
                    var menu = "";
                    for each (s in info) {
                        if (s.contains("http")) {
                            ecpay_url = s;
                        } else {
                            menu += "\r\n" + s;
                        }
                    }
                    if (!ecpay_url.isEmpty()) {
                        menu += "#b" + "#L0#開啟付款頁面#l";
                    }
                    cm.askMenu("訂單資訊:\r\n" + menu);
                }
                break;
            default:
                cm.sendOk("暫未支援這個付款方式");
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (ecpay_payMethod) {
            case 2:
                cm.openWeb(ecpay_url);
                cm.askText("如果付款頁面未成功開啟請手動複製連結後通過瀏覽器打開", ecpay_url, 0, 255);
                break;
            default:
                cm.sendOk("暫未支援這個付款方式");
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}