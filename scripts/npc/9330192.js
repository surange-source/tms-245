var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("好吧，你繼續玩吧。從光標也可以直接出去哦");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
            cm.sendYesNo("你如果把這裡清理乾淨了那我可以送你出去");
    } else if (status == 1) {
        if (cm.getMonsterCount(744000001)==0){
            for (var i =0;i<5 ;i++ ){
            if (cm.getPQLog('楓之高校')==i){
                cm.gainItem(4310105,3+(i*2));
                break;
            }
        }
        cm.setPQLog('楓之高校');
        cm.warp(910000000);
        }else{
            cm.sendOk("請把怪物清理掉吧");
        }
        cm.playerMessage(5,"提示：每日可獲得真棒次數為5次");
        cm.dispose();
    }
}
