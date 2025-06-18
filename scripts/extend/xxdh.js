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
        var selStr = "\r\n" + bbb + " 你目前擁有：#r" + cm.itemQuantity(4001839) + " #k個 #b<#z4001839#>#k#n\r\n\r\n#e#r " + wn1 + " 注意：兌換1000個背包需要有10個空格才行，不然會獲取不到！#n\r\n\r\n#b#L0#" + yun + "100個#v4001839#兌換100個#v4220180#\r\n\r\n#b#L2#" + yun + "500個#v4001839#兌換500個#v4220180#\r\n\r\n#b#L1#" + yun + "1000個#v4001839#兌換1000個#v4220180#\r\n";
 cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.haveItem(4001839, 100)) {
                cm.gainItem(4001839, -100);
        cm.gainItem(4220180, 100);
                cm.sendOk("兌換成功：獲得#b100個#v4220180#!");
          cm.worldSpouseMessage(0x20, "[星星交換] : 恭喜 " + cm.getChar().getName() + " 在市場相框兌換了100個星星交換物品！");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的#v4001839#!");
            cm.dispose();
            }
            break;
        case 1:
             if (cm.haveItem(4001839, 1000)) {
                cm.gainItem(4001839, -1000);
        cm.gainItem(4220180, 1000);
                cm.sendOk("兌換成功：獲得#b1000個#v4220180#!");
          cm.worldSpouseMessage(0x20, "[星星交換] : 恭喜 " + cm.getChar().getName() + " 在市場相框兌換了1000個星星交換物品！");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的#v4001839#!")
            cm.dispose();
            }
            break;
        case 2:
             if (cm.haveItem(4001839, 500)) {
                cm.gainItem(4001839, -500);
        cm.gainItem(4220180, 500);
                cm.sendOk("兌換成功：獲得#b500個#v4220180#!");
          cm.worldSpouseMessage(0x20, "[星星交換] : 恭喜 " + cm.getChar().getName() + " 在市場相框兌換了500個星星交換物品！");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的#v4001839#!")
            cm.dispose();
            }
            break;
        case 3:
            if (cm.getMeso() >= 800000000){
                cm.gainMeso( - 800000000);
        cm.gainNX(20*200)
                cm.sendOk("兌換成功：獲得#b8000W遊戲幣換取的 4000 樂豆點");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的遊戲幣(8000W)!");
            cm.dispose();
            }
            break;
        case 4:
            if (cm.getMeso() >= 100000000){
                cm.gainMeso( - 100000000);
        cm.gainNX(25*200)
                cm.sendOk("兌換成功：獲得#b1E遊戲幣換取的 5000 樂豆點");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的遊戲幣(1E)!");
            cm.dispose();
            }
            break;
        case 5:
            if (cm.getMeso() >= 200000000){
                cm.gainMeso( - 200000000);
        cm.gainNX(50*200)
                cm.sendOk("兌換成功：獲得#b2E遊戲幣換取的 1W 樂豆點");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的遊戲幣(2E)!");
            cm.dispose();
            }
            break;
        }
    }
}