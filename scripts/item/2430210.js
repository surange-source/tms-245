/* 吉祥紅包 */

var status = 0;

function start() {
    if ( !im.getPlayer().isGm()){
        //im.sendOk("維修中");
        //im.dispose();
        //return;
    }    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if ( !im.canHold(2001529,500) ){
            im.sendOk("消耗欄位不夠");
            im.safeDispose();
            return;
        }
        if ( !im.canHold(5000945,1) ){
            im.sendOk("特殊欄位不夠");
            im.safeDispose();
            return;
        }
        if(im.used()){
            im.gainItem(5000945,1);
            im.gainItem(2001529,500);
            im.gainNX(2,250);
            im.safeDispose();
            im.getMap().startMapEffect("恭喜玩家 "+im.getChar().getName()+" 打開『新手禮包』，歡迎你加入" + im.getServerName() + "！", 5120012);
            im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：打開『新手禮包』，歡迎你加入" + im.getServerName() + "！");
        }
        
        
    }
           im.dispose();
}
