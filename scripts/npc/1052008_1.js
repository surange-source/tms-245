var q = 1000;
function start() {
    if (cm.getLevel() < 180) {
        cm.sendOk("你真棒，跳上來了呀，等你達到180級就可以領取獎勵了。");
        cm.dispose();
        return;
    }
    if (cm.getEventCount("跳跳"+cm.getPlayer().getMapId())<1)
    {
        cm.setEventCount("跳跳"+cm.getPlayer().getMapId());
        cm.dispose();
        cm.warp(910000000);
        cm.gainNX(2,q);
        cm.sendOk("恭喜你獲得了"+q+"楓點");
        
        
    } else {
        cm.sendOk("你今天已經領取過獎勵了哦~每天只有一次領獎機會，可不要太貪心呢！");
        cm.dispose();
    }
}

