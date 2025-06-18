function start() {
    var msg = "";
    msg += "\r\n#r#L0##v4001126#楓葉#l";
    msg += "\r\n#fcFFCC5500##L1##v4033247#金楓#l";
    msg += "\r\n#fc0xFF006677##L2##v4033248#彩楓#l";
    msg += "\r\n#fc0xFFEECC22##L3##v4033079#楓鑽#l";
    cm.sendSimple("請選擇需要兌換的類型。#e" + msg);
}

function action(mode, type, selection) {
    cm.dispose();
    if (mode != 1) {
        return;
    }
    switch (selection) {
        case 0: //  楓葉兌換
            cm.openNpc(cm.getNpc(), 25);
            break;
        case 1: //  金楓兌換
            cm.openNpc(cm.getNpc(), 26);
            break;
        case 2: //  彩楓兌換
            cm.openNpc(cm.getNpc(), 27);
            break;
        case 3: //  楓鑽兌換
            cm.openNpc(cm.getNpc(), 28);
            break;
    }
}