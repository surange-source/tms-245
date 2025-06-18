function action(mode, type, selection) {
    var em = cm.getEventManager("ZChaosPQ3");
    if (em == null) {
        cm.sendOk("請稍後再試。");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
    case 261000021:
    cm.dispose();
    cm.openNpc(2112003,1);
        return;
    case 926110000:
        cm.sendOk("你應該嘗試調查這裡。看看#b文件庫#k中的內容。直到找到可以進入實驗室的入口。");
        break;
    case 926110001:
        cm.sendOk("請消滅所有的怪物！我會支持你的。");
        break;
    case 926110100:
        cm.sendOk("這些燒杯有洩漏。我們必須把#b可疑的液體#k倒入燒杯裡邊，一段時間不把#b可疑的液體#k倒入燒杯內，燒杯裡的液體會流失光。請抓緊了！");
        break;
    case 926110400:
        cm.sendOk("你什麼時候準備好，我們要去拯救我的愛情。");
        break;
    case 926110401:
    if(!cm.haveMonster(9300139)){
          cm.gainPlayerEnergy(10);
       cm.gainMeso(+20000000);
           cm.worldSpouseMessage(0x17,"[日常活動] 恭喜玩家 "+ cm.getChar().getName() +" 在拯救羅和朱活動中獲得2000W楓幣的獎勵 。");
       cm.setEventCount("羅朱");
       cm.setPartyEventCount("羅朱1");
       cm.gainPlayerPoints(50);
       cm.warp(910000000);
       cm.dispose();
    }else{
    cm.sendOk("請確認地圖上否還存在怪物!");
    }
        break;
    }
    cm.dispose();
}