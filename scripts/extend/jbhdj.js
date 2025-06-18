var status = 0;       //很簡略，無聊做的，反震能用。 Q
var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品圖標
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
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
        var selStr = "" + wn22 + " #r#e歡迎使用遊戲幣兌換樂豆點功能！#n\r\n\r\n#b#L0#" + yun + "1E遊戲幣換取1000樂豆點\r\n\r\n#b#L1#" + yun + "10E遊戲幣換取10000樂豆點\r\n";
 cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.getMeso() >= 100000000){
                cm.gainMeso( - 100000000);
        cm.gainNX(5*200)
                cm.sendOk("兌換成功：獲得#b1E遊戲幣換取的 1000 樂豆點");
          cm.worldSpouseMessage(0x20, "[楓幣交換] : 恭喜 " + cm.getChar().getName() + " 在市場「雪人凱利」楓幣交換，兌換了1000樂豆點！");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的遊戲幣(1E)!");
            cm.dispose();
            }
            break;
        case 1:
            if (cm.getMeso() >= 1000000000){
                cm.gainMeso( - 1000000000);
        cm.gainNX(50*200)
                cm.sendOk("兌換成功：獲得#b10E遊戲幣換取的 10000 樂豆點");
 cm.worldSpouseMessage(0x20, "[楓幣交換] : 恭喜 " + cm.getChar().getName() + " 在市場「雪人凱利」楓幣交換，兌換了10000樂豆點！");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的遊戲幣(10E)!");
            cm.dispose();
            }
            break;
        case 2:
            if (cm.getMeso() >= 60000000){
                cm.gainMeso( - 60000000);
        cm.gainNX(15*200)
                cm.sendOk("兌換成功：獲得#b5E遊戲幣換取的 3000 樂豆點");
            cm.dispose();
            } else {
                cm.sendOk("#r兌換失敗:\r\n#b1.你沒有足夠的遊戲幣(6000W)!");
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