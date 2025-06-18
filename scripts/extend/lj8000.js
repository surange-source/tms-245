var Icon ="#fEffect/ItemEff/1112811/0/0#";//黃金音符GuildMark/Mark/Animal/00002006/16#";
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var revenue = cm.getHyPay(3);
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
            txt += "#r [ #h # ] 累計儲值達到 [ 8000 ] 將有豐厚禮品#k\r\n";
            txt += "#b  獎品道具全屬性 [ #e#r200#n#b ] 分別 - #r#z1112941# #k\r\n#e#r 　　　3條潛能+3條附加潛能可自選-聯繫客服#n\r\n\r\n"
            txt += "#d 　　　　　當前累計儲值：#r" + revenue.formatMoney(0, "") + "#d 元#k\r\n\r\n";
            txt += "　　　　　　　　　　　　 #i1112941# 　　　　　　　　　　\r\n\r\n";
            txt += "　　　　#b確認累計達標單擊 [ #r是#b ]  否則 [ #r否#b ]#k\r\n\r\n\r\n";
            txt += Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + "\r\n\r\n";
            cm.sendYesNo(txt);
        } else if (status == 1) {
            if (cm.getHyPay(3) >= 8000) {
                if (cm.getEventCount("累計獎品道具WelcomeBack戒指",1) < 1) {
                            cm.gainItem(1112941,1);
                  //  var ii = cm.getItemInfo();
                   // var toDrop = ii.randomizeStats(ii.getEquipById(1182136)).copy(); // 生成一個Equip類 耳環
                  //  toDrop.setStr(150); //裝備力量
                 //   toDrop.setDex(150); //裝備敏捷
                 //   toDrop.setInt(150); //裝備智力
                  //  toDrop.setLuk(150); //裝備運氣
                  //  toDrop.setAcc(150); //命中率
                 //   toDrop.setMatk(150); //魔法攻擊
                //    toDrop.setWatk(150); //攻擊攻擊 
                 //   toDrop.setEnhance(20); //星級
                //    toDrop.setWdef(150);//物理防禦
                //    toDrop.setMdef(150);//魔攻防禦
                //    toDrop.setAvoid(100);//迴避率
               //     toDrop.setHands(100);//手技
               //     toDrop.setSpeed(10);//移動速度
               //     toDrop.setJump(10);//跳躍
               //     toDrop.setOwner("累計儲值");//簽名
               //     toDrop.setBossDamage(30);//Boss 攻擊百分比%
               //     toDrop.setIgnorePDR(30);//無視怪物防禦
              //      toDrop.setTotalDamage(30);//總傷害
               //     toDrop.setAllStat(30);//所有屬性
                    //toDrop.setLimitBreak(1000000);//傷害上限
               //     cm.addFromDrop(cm.getC(), toDrop, false);
                    
                    //cm.sendOkS("\r\n\r\n\t#b恭喜 [ #r#h ##b ] 玩家 領到了極品道具\r\n\r\n　 如道具丟失請聯繫客服並且需交納 [ #r100 #b] 金額", 2);
                    cm.spouseMessage(0x23, "※累計超值※：恭喜玩家 " + cm.getChar().getName() + " 領到了超值累計 8000 金額的極品道具【WelcomeBack戒指】土豪阿");
                    cm.spouseMessage(0x23, "※累計超值※：恭喜玩家 " + cm.getChar().getName() + " 領到了超值累計 8000 金額的極品道具【WelcomeBack戒指】土豪阿");
                    cm.spouseMessage(0x23, "※累計超值※：恭喜玩家 " + cm.getChar().getName() + " 領到了超值累計 8000 金額的極品道具【WelcomeBack戒指】土豪阿");
                    cm.spouseMessage(0x23, "※累計超值※：恭喜玩家 " + cm.getChar().getName() + " 領到了超值累計 8000 金額的極品道具【WelcomeBack戒指】土豪阿");
                    cm.playerMessage(1, "　" + cm.getChar().getName() + "\r\n\r\n恭喜領到累計超值道具【WelcomeBack戒指】\r\n\r\n請聯繫客服幫你設置全200屬性\r\n\r\n感謝你對兔花花的支持 祝您遊戲愉快");
                    cm.setEventCount("累計獎品道具WelcomeBack戒指", 1);
                    cm.dispose();
                } else {
                    cm.sendOkS("\r\n\r\n#r\t\t尊敬的玩家 - 此項獎品終身只能一回", 3);
                    cm.dispose();
                    return;
                }
            } else {
                var ount = 8000 - cm.getHyPay(3);
                cm.sendOkS("\r\n\r\n#r　　　　　尊敬的玩家 - 當前累計未達標\r\n\r\n　　當前累計：#b" + cm.getHyPay(3) + "#r 元 還需儲值：#b" +  ount + "#r 元 即可達標", 3);
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