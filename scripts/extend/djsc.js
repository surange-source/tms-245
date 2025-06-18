var status = 0;       //很簡略，無聊做的，反震能用。 Q
var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品圖標
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
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
    if (status == 0) {
        var selStr = "請選擇您需要的功能：\r\n#k#n#b#L0# 功能道具 #b#L1# 傷害皮膚 #b#L2# 特效戒指 #b#L3# 購買寵物\r\n#b#L4# 傷害皮膚\r\n";
 cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
      cm.dispose();
      //cm.warp(865000001);
      cm.openNpc(9010047, "gndj");
            break;
        case 1:
      cm.dispose();
      cm.openNpc(9010047, "shpf");
            break;
        case 2:
      cm.dispose();
      cm.openNpc(9310470,"txjz");
            break;
        case 3:
      cm.dispose();
    cm.openNpc(9310470,"0");
            break;
        case 4:
             if (cm.haveItem(4310177, 100)) {
                cm.gainItem(4310177, -100);
        cm.gainItem(1004595, 1);
                cm.sendOk("兌換成功：獲得#b1個#v1004595#，請聯繫客服即可得到30全屬性!");
         // cm.worldSpouseMessage(0x20, "[星星交換] : 恭喜 " + cm.getChar().getName() + " 在市場相框兌換了1000個星星交換物品！");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有100個#v4310177#!")
            cm.dispose();
            }
            break;
        case 5:
      cm.dispose();
      cm.openNpc(9310555,"tmdh1");
            break;
        }
    }
}