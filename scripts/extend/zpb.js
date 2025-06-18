var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var z = "#fEffect/ItemEff/1112811/0/0#";//"+z+"//美化

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            cm.sendOk("#r#e　　很高興為您服務 歡迎您的下次光臨！", 1033210);
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendOk("#r#e　　很高興為您服務 歡迎您的下次光臨！", 1033210);
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var revenue = cm.getPlayer().getCSPoints(1);
            var revenueS = cm.getItemQuantity(4310066);
            cm.sendOk("#r#e☆☆☆☆☆☆☆☆☆『珍品銀行』☆☆☆☆☆☆☆☆☆\r\n\r\n" + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + "\r\n#d尊敬的「#h #」 請選擇您需辦理的業務\r\n#d行情：樂豆點 [#r 3000：1 #d] 反向 [#r 1：3000 #d] 貨幣\r\n#r當前樂豆點數量：#d" + revenue.formatMoney(0, "") + " 券#r\r\n當前貨幣數量：#d" + revenueS.formatMoney(0, "") + " 個\r\n" + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + "\r\n#L1##i4310066##z4310066#購樂豆點 [珍品通用貨幣]#l", 1033210); //\r\n\r\n#L0##i4310066#樂豆點購#z4310066# [珍品通用貨幣]#l
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能參與兌換.");
                cm.dispose();
            }
            if (selection == 0) {
                    if (cm.getPlayer().getCSPoints(1) / 3000 == 0) {
                        cm.sendNext("#r#e抱歉 ！您的樂豆點不足 不能進行購買 請儲值");
                        status = -1;
                    } else {
                        beauty = 1;
                        cm.sendGetNumber("#r#e★★★★★★★★★『珍品銀行』★★★★★★★★★#d\r\n\r\n請入你需購買#z4310066#的數量 [ 3000：1 ]\r\n\r\n", 1, 1, cm.getPlayer().getCSPoints(1) / 3000);
                    }
            } else if (selection == 1) {
                if (cm.getItemQuantity(4310066) == 0) {
                        cm.sendNext("#r#e抱歉 ！您的#z4310066#不足 不能進行購買 請儲值");
                        status = -1;
                    } else {
                        beauty = 2;
                        cm.sendGetNumber("#r#e★★★★★★★★★『珍品銀行』★★★★★★★★★#d\r\n\r\n請入你需購買樂豆點的數量 [ 1：3000 ]\r\n\r\n", 1, 1, cm.getItemQuantity(4310066));
                    }
            }
        } else if (status == 2) {
                if (beauty == 1) {
                    if (selection <= 0) {
                        cm.sendOk("#r#e您輸入的數量有誤 請整理思緒重新輸入！");
                        cm.dispose();
                    } else if (selection >= 200) {
                        sl = (selection / 200) + 1;
                    } else {
                        sl = 3;
                    }
                    if (cm.getSpace(4) < sl) {
                        cm.sendOk("#e#r你的背包「其它」空間不足!請至少有" + sl + "個空間以上.\r\n如果上面有出現小數的話請入位!\r\n如：出現<至少有7.5個空間以上>那麼您就需要留8個空間!", 1033210);
                        cm.dispose();

                    } else if (cm.getPlayer().getCSPoints(1) >= selection * 3000) {
                        cm.gainNX(-selection * 3000);
                        cm.gainItem(4310066, selection);
                        cm.sendOk("#r#e[ #h # ] 恭喜您\r\n\r\n您成功用#r " + (selection * 3000) + " 樂豆點\r\n購買了#z4310066# #i4310066# x #r" + selection, 1033210)
                        cm.worldSpouseMessage(0x15, "[ 珍品商舖 ] 恭喜 " + cm.getChar().getName() + " 用 " + (selection * 3000) + " 樂豆點購買了 " + selection + " 枚珍品時裝幣 ");
                        cm.dispose();
                    } else {
                        cm.sendNext("#r#e抱歉 [ #h # ] \r\n\r\n您輸入的數量錯誤 請檢查輸入有誤重新輸入！", 1033210);
                        cm.dispose();
                    }
                } else if (beauty == 2) {
                    if (cm.haveItem(4310066, selection)) {
                        cm.gainItem(4310066, -selection);
                        cm.gainNX(+3000 * selection);
                        cm.sendOk("#r#e[ #h # ]恭喜您\r\n\r\n您成功用#z4310066# #v4310066# x #r" + selection + " #k\r\n購買了#r " + (3000 * selection) + " #k樂豆點", 1033210);
                        cm.worldSpouseMessage(0x15, "[ 珍品商舖 ] 恭喜 " + cm.getChar().getName() + " 用 " + selection + " 枚珍品時裝幣 購買了 " + (3000 * selection) + " 樂豆點 ");
                        cm.dispose();
                    } else {
                        cm.sendNext("#r#e抱歉 [ #h # ] \r\n\r\n您輸入的數量錯誤 請檢查輸入有誤重新輸入！", 1033210);
                        cm.dispose();
                    }
                }

            status = -1;
        } else {
            cm.dispose();
        }
    }
}

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "　";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};