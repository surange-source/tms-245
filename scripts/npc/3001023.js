function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (status == 1 && mode == 0) {
            cm.sendNext("？？？？");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#e<Boss - 梅格耐斯>#n\r\n\r\n#b#h0# \n#k你想進入哪裡?\r\n#b#L0#暴君模擬戰鬥[簡單]#l#k\r\n#b#L1#赫裡希安最上層入口#l#k");
        } else if (status == 1) {
            if(selection ==0){
                cm.warp(401060399, 1);
            }else{
                cm.warp(401060000, 2);
            }
            cm.dispose();
        }
    }
}
