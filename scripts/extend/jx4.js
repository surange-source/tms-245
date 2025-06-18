var Icon ="#fEffect/ItemEff/1112811/0/0#";//黃金音符GuildMark/Mark/Animal/00002006/16#";
var status = 0;
var 購買的屬性裝備 = 1142321;  var 全屬性數值 = 25;
var 需要樂豆點 = 000000;

var 需要道具ID_1 = 4000000;  var 需要數量_1 = 600;//藍色蝸牛殼
var 需要道具ID_2 = 4000016;  var 需要數量_2 = 600;//紅色蝸牛殼
var 需要道具ID_3 = 4310030;  var 需要數量_3 = 500;//運動幣
var 需要道具ID_4 = 4310036;  var 需要數量_4 = 1000;//征服幣
var 需要道具ID_5 = 1142312;  var 需要數量_5 = 1;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.sendOk("\r\n\r\n\r\n\t#b當前累計儲值：#r" + revenue.formatMoney(0, "") + " #b元 請繼續加油！");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var txt = Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + "\r\n";
            txt += "#r [ #h # ] 您好 歡迎來到 #b勳章升級系統 #k\r\n";
            txt += "#b  團長勳章全屬性 [ 25 ] 分別 - 全屬性裝備 #r#z"+購買的屬性裝備+"# #k\r\n"
            txt += "#d       當前擁有#i" + 需要道具ID_1 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_1) + "#d#k#b需要600個\r\n\r\n";
            txt += "#d       當前擁有#i" + 需要道具ID_2 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_2) + "#d#k#b需要600個\r\n\r\n";
            txt += "#d       當前擁有#i" + 需要道具ID_3 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_3) + "#d#k#b需要500個\r\n\r\n";
            txt += "#d       當前擁有#i" + 需要道具ID_4 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_4) + "#d#k#b需要1000個\r\n\r\n";
            txt += "#d       當前擁有#i" + 需要道具ID_5 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_5) + "#d#k#b需要1個\r\n\r\n";
            txt += "　　　　　　　　　　　　 #i"+購買的屬性裝備+"# 　　　　　　　　　　\r\n\r\n";
            txt += "　　　　#b確認收集齊了物品點擊 [ #r是#b ]  否則 [ #r否#b ]#k\r\n\r\n\r\n";
            txt += Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + "\r\n\r\n";
            cm.sendYesNo(txt);
        } else if (status == 1) {
            if (cm.getItemQuantity(需要道具ID_1) >= 需要數量_1 && cm.getItemQuantity(需要道具ID_2) >= 需要數量_2 && cm.getItemQuantity(需要道具ID_3) >= 需要數量_3 && cm.getItemQuantity(需要道具ID_4) >= 需要數量_4 && cm.getItemQuantity(需要道具ID_5) >= 需要數量_5) {
               
                    var ii = cm.getItemInfo();
                    var toDrop = cm.getNewEquip(1142321); // 生成一個Equip類 耳環
                    toDrop.setStr(全屬性數值); //裝備力量
                    toDrop.setDex(全屬性數值); //裝備敏捷
                    toDrop.setInt(全屬性數值); //裝備智力
                    toDrop.setLuk(全屬性數值); //裝備運氣
                    toDrop.setAcc(全屬性數值); //命中率
                    toDrop.setMatk(全屬性數值); //魔法攻擊
                    toDrop.setWatk(全屬性數值); //攻擊攻擊 
                    toDrop.setWdef(全屬性數值);//物理防禦
                    toDrop.setMdef(全屬性數值);//魔攻防禦
                    toDrop.setSpeed(10);//移動速度
                    toDrop.setJump(10);//跳躍
                    //toDrop.setBossDamage(25);//Boss 攻擊百分比%
                    //toDrop.setIgnorePDR(25);//無視怪物防禦
                    //toDrop.setTotalDamage(25);//總傷害
                    //toDrop.setAllStat(25);//所有屬性
                    //toDrop.setLimitBreak(3000000);//傷害上限
                    cm.addFromDrop(toDrop);
                    //cm.sendOkS("\r\n\r\n\t#b恭喜 [ #r#h ##b ] 玩家 領到了極品道具\r\n\r\n　 如道具丟失請聯繫客服並且需交納 [ #r100 #b] 金額", 2);
                    //cm.spouseMessage(0x23, "※累計超值※：恭喜玩家 " + cm.getChar().getName() + " 領到了超值累計 4000 金額的極品道具【神聖拯救者耳環】土豪阿");
                    cm.gainItem(需要道具ID_1, -需要數量_1);
                  cm.gainItem(需要道具ID_2, -需要數量_2);
                  cm.gainItem(需要道具ID_3, -需要數量_3);
                  cm.gainItem(需要道具ID_4, -需要數量_4);
                  cm.gainItem(需要道具ID_5, -需要數量_5);
                  
                    
                    cm.playerMessage(1, "　" + cm.getChar().getName() + "\r\n\r\n恭喜你兌換成功!\r\n\r\n感謝你對幸運的支持 祝您遊戲愉快");
                    cm.worldSpouseMessage(0x26, "[系統提示] : 玩家 "+cm.getPlayer().getName()+" 成功兌換團長勳章,每日福利多多噢！");
                    //cm.setEventCount("累計獎品道具神聖拯救者耳環", 1);
                    cm.dispose();
             
            } else {
                cm.sendOkS("請檢查您的物品是否符合要求!", 3);
                cm.dispose();
                return;
            }
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
