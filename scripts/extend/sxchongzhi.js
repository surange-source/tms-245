
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
    var v = getVIP(cm);
    var selStr = "尊敬的" + ((v==0)?"":"#rVIP"+v+"#g") + "玩家#r#h ##k您好,請選擇您所需要的功能\r\n#r兔兔幣：#r" + cm.getHyPay(1) + " #e楓幣：#e" + cm.getMeso() + "\r\n#b樂豆點：#b" + cm.getPlayer().getCSPoints(1) + " #e楓點：#b" + cm.getPlayer().getCSPoints(2) + "\r\n          #L16##r洗能力值";
    cm.sendSimple(selStr);
    } else if(status == 1) {
    switch (selection){
    case 11:
        if (cm.getPlayer().getMapId() >= 910000000 && cm.getPlayer().getMapId() <= 910000022)
            cm.sendOk("你不是正在自由市場嗎，想去哪兒呢");
        else
            cm.warp(910000000);
        cm.dispose();
        break;

    case 16:
        var apx = 0;
        switch (getFSdj(cm)) {
        case 0:
            apx = 4;
        case 1:
            apx = 4;
        case 2:
            apx = 4;
        case 3:
            apx = 4;
        case 4:
            apx = 4;
        }
        cm.resetStats(apx,apx,apx,apx);
        cm.sendOk("已經將你的能力值初始化");
        cm.dispose();
        break;


    case 21:
        cm.dispose();
        cm.openNpc(9330362, 3);
            break;

    default:
        cm.sendOk("default");
        cm.dispose();
        break;
    }

    }
}

//獲得VIP等級
function getVIP(cm){
    var v_p = 4031331;
    for (var i = 7;i >= 1;i--){
        if (cm.itemQuantity(v_p + i)!=0) return i;
    }
    return 0;
}

//飛昇等級
function getFSdj(cm){
    var f_p = 4032516;
    for (var i = 4;i >= 1;i--){
        if (cm.itemQuantity(f_p + i)!=0) return i;
    }
    return 0;
}
