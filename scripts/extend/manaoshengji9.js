var Icon ="#fEffect/ItemEff/1112811/0/0#";//黃金音符GuildMark/Mark/Animal/00002006/16#";
var status = 0;
var 購買的屬性裝備 = 1114227; 
var 需要樂豆點 = 000000;
var 需要道具ID_5 = 2431319;  var 需要數量_5 = 1;
var 需要道具ID_4 = 1114212;  var 需要數量_4 = 1;


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
            txt += "#r [ #h # ] 您好 歡迎來到 #b瑪瑙戒指升階系統 #k\r\n";
            txt += "#b  初見瑪瑙戒指 [ 500 ] 分別 - 全屬性裝備 #r#z"+購買的屬性裝備+"# #k\r\n"
            txt += "#d       當前擁有#i" + 需要道具ID_4 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_4) + "#d#k#b需要1個\r\n\r\n";
            txt += "#d      當前擁有#i" + 需要道具ID_5 + "#數量 :#r" + cm.getItemQuantity(需要道具ID_5) + "#d#k#b需要1個\r\n\r\n";
            txt += "　　　　　　　　　　　　 #i"+購買的屬性裝備+"# 　　　　　　　　　　\r\n\r\n";
            txt += "　　　　#b確認收集齊了物品點擊 [ #r是#b ]  否則 [ #r否#b ]#k\r\n\r\n\r\n";
            txt += Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + "\r\n\r\n";
            cm.sendYesNo(txt);
        } else if (status == 1) {
            if (cm.getItemQuantity(需要道具ID_5) >= 需要數量_5&&cm.getItemQuantity(需要道具ID_4) >= 需要數量_4) {
               
                    var ii = cm.getItemInfo();
                    var toDrop = cm.getNewEquip(1114227); // 生成一個Equip類 耳環
                    toDrop.setStr(600); //裝備力量
                    toDrop.setDex(600); //裝備敏捷
                    toDrop.setInt(600); //裝備智力
                    toDrop.setLuk(600); //裝備運氣
                    toDrop.setHp(6000);
                    toDrop.setAcc(100); //命中率
                    toDrop.setMatk(390); //魔法攻擊
                    toDrop.setWatk(390); //攻擊攻擊 
                    toDrop.setWdef(100);//物理防禦
                    toDrop.setMdef(100);//魔攻防禦
                    toDrop.setSpeed(10);//移動速度
                    toDrop.setJump(10);//跳躍
                    toDrop.setBossDamage(40);//Boss 攻擊百分比%
                    toDrop.setIgnorePDR(30);//無視怪物防禦
                    toDrop.setUpgradeSlots(13);
                    //toDrop.setTotalDamage(30);//總傷害
                    //toDrop.setAllStat(25);//所有屬性
                    //toDrop.setLimitBreak(3000000);//傷害上限
                    cm.addFromDrop(toDrop);
                    cm.gainItem(需要道具ID_4, -需要數量_4);
                cm.gainItem(需要道具ID_5, -需要數量_5);                    
                    cm.playerMessage(1, "　" + cm.getChar().getName() + "\r\n\r\n恭喜你兌換成功!\r\n\r\n感謝你對幸運的支持 祝您遊戲愉快");
                    cm.worldSpouseMessage(0x26, "[系統提示] : 玩家 "+cm.getPlayer().getName()+"通過使用專屬色子,終於將瑪瑙戒指封印解除了,提升至  『8』階");
cm.changePotential(1,1, 60002, false);

cm.changePotential(1,4, 60002, false);
cm.changePotential(1,6, 60002, false);
cm.changePotential(1,5, 60002, false);

              
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
