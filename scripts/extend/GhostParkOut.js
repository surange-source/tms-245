var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
            cm.sendYesNoN("#b怎麼? 這就要走了嗎? 你難道是因為害怕才要走的嗎? ");
            break;
        case 1: //
            cm.warp(956100000);
            cm.dispose();
            break;
    }
}
