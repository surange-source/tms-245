var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fEffect/CharacterEff/1082565/2/0#";
var vvv = "#fUI/Basic/BtHide3/mouseOver/0#";
var vvv4 = "#fUI/UIWindow4/PQRank/rank/gold#";
var z1 = "#fEffect/ItemEff/1112811/0/0#";//黃金音符
var z5 = "#fEffect/CharacterEff/1112904/2/1#";//五角花
cztp = 0;
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
        var txt = "\r\n#d┌═══════════儲值中心══════════┐#k\r\n";
        //txt += "\t儲值 [  50 ] - [  99 ] 元 #r ▲△ 贈予 5   餘額#k\r\n";
        //txt += "\t儲值 [ 100 ] - [ 199 ] 元 #r ▲△ 贈予 30  餘額#k\r\n";
        //txt += "\t#b儲值 [ 200 ] - [ 499 ] 元 #r ▲△ 贈予 100 餘額#k\r\n";
        //txt += "\t#b儲值 [ 500 以上不限  ] 元 #r ▲△ 贈予 300 餘額#k\r\n";
        //txt += "#d\t▲ 網銀儲值返利10%　　　　儲值卡儲值返利5% ▲\r\n";
        //txt += "#r\t▲ 儲值比例 [ 1:2 ]#k[金額返利 儲值方式返利] ▲\r\n";
        //txt += "#r\t\t\t\t#L0#累計儲值抽獎系統#l\r\n";
          txt += "　#L1#" + vvv4 + " #r儲值餘額#k#l　            　  #L3#" + vvv4 + " 中介系統#k#l\r\n";
        txt += "　#L4#" + vvv4 + " #r餘額樂豆點#k#l　                #L5#" + vvv4 + " #b儲值禮包#k#l\r\n\r\n";
        txt += "#d└═════════════════════════┘#k\r\n\r\n";
        cm.sendSimple(txt);
    } else if (status == 1) {
        switch (selection) {
            case 0://抽獎
                cm.dispose();
                //cm.sendOk("\r\n\r\n\t\t\t#e#r修復細節問題");
               cm.openNpc(9900002, "leijicj");
                break;
            case 1://儲值
                cm.dispose();
                 cm.sendOk("\r\n\r\n\t\t\t#e#r唯一儲值客服QQ：43430950 ");
                cm.openWeb("http://sae.kmmmhh.com/GPays.html?g=1021");
                break;
            //case 2://累計儲值
                cm.dispose();
                //cm.sendOk("\r\n\r\n\t\t\t#e#r敬請期待");
                cm.openNpc(9900004, "leijijl");
                break;
            case 3://中介系統
                cm.dispose();
                cm.openNpc(9900004, yuecj);
                break;
            case 4://金額樂豆點
                cztp = 1;
                var revenue0 = cm.getTWD(1);
                var text = z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + "\r\n\r\n";
                text += "#d尊敬的玩家 #r#h ##d 在這裡可以用餘額儲值樂豆點\r\n\r\n";
                text += "- 當前玩家持有餘額：#r" + revenue0.formatMoney(0, "") + "#d 元\r\n\r\n\r\n";
                text += "\t\t\t　#r#L0#" + z5 + " 遊戲餘額儲值樂豆點 " + z5 + "#l\r\n\r\n\r\n";
                text += z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + "\r\n";
                cm.sendYesNoS(text, 2);
                break;
            case 5://儲值禮包
                cm.dispose();
                cm.openNpc(9900004, "czlj");
                break;
            case 6://理財系統
                cm.dispose();
                cm.openNpc(9000111,"chuanqilicai");
                break;

        }
    } else if (status == 2) {
        if (cztp == 1) {
            switch (selection) {
                case 10://金額儲值樂豆點
                    if (cm.getHyPay(1) < 1) {
                        cm.sendOk("#r#e抱歉 ！您的餘額數目 [0] 不能進行儲值 ");
                        status = -1;
                    } else {
                        var revenue0 = cm.getHyPay(1);
                        cm.sendGetText("#r#e★★★★★★★★★『儲值中心』★★★★★★★★★#d\r\n\r\n請入你需儲值樂豆點的數量 [ 1：3000 ]\r\n\r\n當前 [ #r#h ##d ] 玩家持有金額：" + revenue0.formatMoney(0, "") + " 元\r\n\r\n#k ");
                    }
                    break;
            case 0://理財系統
                cm.dispose();
                cm.openNpc(9000111,"yue");
                break;
            }
        }
    } else if (status == 3) {
        if (cm.getHyPay(1) - cm.getText() < 0) {
            cm.sendOk("#r#e抱歉 ！儲值後餘額低於 [ 0 ] ");
            cm.dispose();
        } else {
            cm.addHyPay(+cm.getText());
            cm.gainNX(cm.getText() * 3000);
            cm.sendOk("#d#e恭喜您\r\n\r\n購買樂豆點數量：#r" + cm.getText() * 3000 + "#k#n\r\n ");
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