/**
 *楓之谷運營員
 **/
var status = -1;

function start() {
    status = -1;
    var menu = "";
    menu += "#L0#SP初始化\r\n";
    menu += "#L1#結束對話。\r\n";
    if (cm.getPlayer().isIntern()) {
        menu += "#L2#我要進寵物化\r\n";
        menu += "#L3#我要進行寵物染色\r\n";
    }
    cm.sendSimple("您好嗎？在楓之谷旅行愉快嗎？\r\n\r\n\r\n#b" + menu +"#k");
}

function action(mode, type, selection) {

    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    switch (status) {
        case 0: //這是status
            cm.dispose();
            switch (selection) {
                case 0:
                    cm.getPlayer().spReset();
                    cm.sendOk("初始化完成");
                    return;
                case 2:
                    if (!cm.getPlayer().isIntern()) {
                        return;
                    }
                    cm.openNpc(9102001, "PetEvolution");
                    return;
                case 3:
                    if (!cm.getPlayer().isIntern()) {
                        return;
                    }
                    cm.openNpc(9102001, "ChangePetcolor");
                    return;
            }
            break;
        case 1: //
            cm.dispose();//這是結束腳本，請按照實際情況使用
            break;
    }
}
