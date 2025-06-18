var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else 
        if (status == 0) {
            cm.sendNext("看來你還有其他的事情沒有處理完,下次再來找我吧。");
            cm.dispose();
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("你想乘坐前往維多利亞港的航班？...一旦前往就不能再回到這裡,你現在確定前往嗎？");
    } else if (status == 1) {
        cm.warp(104000000,0);
        cm.dispose();
    }
  }
