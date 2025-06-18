var status = -1;

function start() {

    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        if (status == 0 && mode == 0) {
            cm.sendNext("請重新考慮一下，然後再和我說話。");
        }
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        if (cm.getMapId() == 260020000 || cm.getMapId() == 260000000)
            cm.sendYesNo("你想乘坐#b駱駝中巴#k，到煉金術的村莊#b瑪加提亞#k去嗎？價格是#b1500楓幣#k。");
        else if (cm.getMapId() == 260020700 || cm.getMapId() == 261000000)
            cm.sendYesNo("你想乘坐#b駱駝中巴#k，到綠洲裡的村莊#b納希沙漠#k去嗎？價格是#b1500楓幣#k。");
    } else if (status == 1) {
        if(cm.getMeso() >= 1500){
            cm.gainMeso(-1500);
            cm.warp((cm.getMapId() == 260020000 || cm.getMapId() == 260000000) ? 261000000 : (cm.getMapId() == 260020700 || cm.getMapId()) == 261000000 ? 260000000 : 260000000);
        } else {
            cm.sendNext("你好像沒帶夠錢啊。");
        }
        cm.dispose();
    }
}
