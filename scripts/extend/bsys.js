var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var eff1 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
            cm.dispose();
        } else if (status == 0) {
        var selStr = "";
           selStr += "#L10#" + eff + "#r特殊 BOOS變身藥水#l\r\n\r\n";
           selStr += "#L0#" + eff + "#r迷你 BOOS變身藥水#l\r\n\r\n";
        selStr += "#L1#" + eff + "BOOS變身藥水#l\r\n\r\n";    
        selStr += "#L2#" + eff + "職業變身藥水#l\r\n\r\n";    
        selStr += "#L3#" + eff + "其他變身藥水#l\r\n\r\n";
        //selStr += "#L4#" + eff + "  結婚地圖#l\n\n\n";
        //selStr += "#L5#" + eff + "  道具刪除#l\r\n\r\n";
        //selStr += "#L6#" + eff + "  裝備分解#k#l\n\n\n";
        //selStr += "#L7#" + eff + "#r  競技積分#k#l\n\n\n";
        //selStr += "#L8#" + eff + "#r  楓點商城#k#l\n\n\n\r\n";
        //selStr += "#L9#" + eff + "#r  數字猜猜猜#k#l\n\n\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 10:
            cm.dispose();
            cm.openNpc(9900004,"bsys1");
            break;
        case 0:
            cm.dispose();
            cm.openNpc(9900004,"bsys2");
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9900004,"bsys3");
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900004,"bsys4");
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9900004,"bsys5");
            break;
        case 4://管理僱傭商店
            cm.dispose();
            if (cm.getMapId() == 680000000) {
                cm.sendOk("你已經在結婚地圖了.");
            } else {
                cm.warp(680000000);
                cm
                        .sendOk("已經將你傳送到結婚地圖。\r\n請查看左上角NPC結婚流程.\r\n請帶上你的愛人.邀請你的朋友來吧!\r\n祝你新婚快樂!!!");
                break;
            }
            break;
        case 5://累積儲值
            cm.dispose();
        cm.openNpc(9900002,55);
            break;
        case 6://免費10級
             cm.dispose();
        cm.openNpc(9900003,503);
         /*   cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=37438");
        cm.sendOk("已經為您打開贊助網站！");*/
    //if(cm.getPlayer().getLevel() <= 10){
        //cm.gainExp( + 50000);
        //cm.worldMessage("恭喜新玩家"+ cm.getChar().getName() +"在拍賣NPC處領取5W經驗");
        //cm.sendOk("恭喜您領取成功,10級下都能在我這裡領取經驗");
        //}else{
        //cm.sendOk("你的等級大於10");
    //}
    //cm.dispose();
            break;    
      case 7://競技積分
            cm.dispose();
        cm.openNpc(9900003,501);
            break;
      case 8://楓點商場
            cm.dispose();
        cm.openNpc(9900003,16);
            break;
      case 9://楓點商場
            cm.dispose();
        cm.openNpc(9900003,"szccc");
            break;
    }
    }
}