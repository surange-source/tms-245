/* 龍紋紅包 */

var status = 0;

function start() {
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
    if (status == 0 && im.used()) {
    var random = new java.util.Random();
    var mesos = (random.nextInt(50)+30) * 1;
        im.addHyPay(-[mesos]);
        im.sendOk("恭喜你獲得了 " + mesos + " 餘額");
        im.safeDispose();
        im.getMap().startMapEffect("恭喜玩家 "+im.getChar().getName()+" 通過打開『龍紋紅包』獲得"+mesos+" 餘額!", 5120012);
        im.worldSpouseMessage(0x0A,""+ im.getChar().getName() +" ：我通過打開『龍紋紅包』獲得  "+mesos+" 餘額!");
        
    }
           im.dispose();
}
