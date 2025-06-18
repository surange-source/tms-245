var Icon ="#fEffect/ItemEff/1112811/0/0#";//黃金音符GuildMark/Mark/Animal/00002006/16#";
var status = 0;
var 購買的屬性裝備 = 1662092; 
var 需要樂豆點 = 000000;
var 需要道具ID_4 = 2433167;
var 需要數量_4 = 1;


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
newEquip = cm.getEquipBySlot(1);
    if(newEquip != null){
    cm.sendOk("第一個格子不能擁有裝備!請檢查!!");
    cm.dispose();
    return;
}
            var txt = Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + "\r\n";
            txt += "#r [ #h # ] 您好 歡迎來到 # 機器人潛能賦予中心 #k\r\n";
            txt += "#b   分別 - 全屬性裝備 #r#z"+購買的屬性裝備+"# #k\r\n"
            txt += "#d       當前擁有#i" + 需要道具ID_4 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_4) + "#d#k#b需要1個\r\n\r\n";
            txt += "　　　　　　　　　　　　 #i"+ 購買的屬性裝備 +"# 　　　　　　　　　　\r\n\r\n";
            txt += "　　　　#b確認是否擁有以上物品 [ #r是#b ]  否則 [ #r否#b ]#k\r\n\r\n\r\n";
            txt += Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + "\r\n\r\n";
            cm.sendYesNo(txt);
        } else if (status == 1) {
            if (cm.getItemQuantity(需要道具ID_4) >= 需要數量_4) {
               
                    var ii = cm.getItemInfo();
                    var toDrop = cm.getNewEquip(1662092); // 生成一個Equip類 耳環
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setHp(2000);
                    toDrop.setAcc(100); //命中率
                    toDrop.setMatk(50); //魔法攻擊
                    toDrop.setWatk(50); //攻擊攻擊 
                    cm.addFromDrop(toDrop);
                    cm.gainItem(需要道具ID_4, -需要數量_4);                    
                    cm.changePotential(1,1, 40603, false);
                    cm.changePotential(1,2, 40603, false);
                    cm.changePotential(1,3, 40603, false);
                    cm.dispose();
             
            } else {
                //var ount = 6000 - revenue;
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
