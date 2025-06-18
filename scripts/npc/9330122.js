var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("你想去哪裡釣魚呢？\r\n#b#L0# 外層空間釣魚場#l\r\n#L1# 夢幻王國釣魚場\r\n#b#L2# 精靈釣魚場#l#k");
    } else if (status == 1) {
        if (selection <= 2 && selection >= 0) {
            if (cm.getPlayer().getMapId() < 749050500 || cm.getPlayer().getMapId() > 749050502) {
                cm.saveLocation("FISHING");
            }
            cm.warp(749050500 + selection);
        }
        cm.dispose();
    }
}
