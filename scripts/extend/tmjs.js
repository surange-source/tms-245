//var status = 0;       //很簡略，無聊做的，反震能用。 Q
//var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品圖標
//var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
//var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
//var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
//var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
//var bbb = "#fUI/UIWindow.img/Shop/meso#";
//function start() {
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
        var selStr = "\r\n" + bbb + " 你目前擁有：#r" + cm.itemQuantity(4310177) + " #k個 #b<#z4310177#>#k#n\r\n\r\n#k " + wn1 + " 被世人所遺忘的魔都上海卷圖重來，殭屍王還在搗亂，快幫我一起消滅它~！#n\r\n#b#L0#" + yun + "立即進入魔都上海！\r\n#b#L1#" + yun + "#r前往殭屍王所在地圖，發起挑戰！\r\n#b#L4#" + yun + "享受勝利成果，製作#r#z1004595##b（未鑒定，全屬30）\r\n#b#L3#" + yun + "享受勝利成果，製作#r#z1052986##b（未鑒定，全屬30）\r\n#b#L2#" + yun + "享受勝利成果，兌換豐富獎勵！\r\n#b#L5#" + yun + "殭屍王大人，兌換絕版殭屍象徵圖騰\r\n";
 cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
      cm.dispose();
      cm.warp(701100000);
            break;
        case 1:
      cm.dispose();
      cm.warp(701103030);
            break;
        case 2:
      cm.dispose();
      cm.openNpc(9310555,"tmdh");
            break;
        case 3:
             if (cm.haveItem(4310177, 100)) {
                cm.gainItem(4310177, -100);
        cm.gainItem(1052986, 1);
                cm.sendOk("兌換成功：獲得#b1個#v1052986#，請聯繫客服即可得到30全屬性!");
       //cm.worldSpouseMessage(0x20, "[星星交換] : 恭喜 " + cm.getChar().getName() + " 在市場相框兌換了1000個星星交換物品！");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有100個#v4310177#!")
            cm.dispose();
            }
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