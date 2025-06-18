var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fEffect/CharacterEff/1082565/2/0#";
var vvv = "#fUI/Basic/BtHide3/mouseOver/0#";
var vvv4 = "#fUI/UIWindow4/PQRank/rank/gold#";
var z1 = "#fEffect/ItemEff/1112811/0/0#";//黃金音符
var z5 = "#fEffect/CharacterEff/1112904/2/1#";//五角花
cztp = 0;

var time = new Date();
var year = time.getFullYear(); //獲得年份
var month = time.getMonth()+1; //獲得月份
var day = time.getDate();//獲取日
var today = year+"-"+month+"-"+day;

// 儲值比率
var chargeRate = 10;
// 邀請成功額度
var refAmount = 1000;
// 邀請返利最低需邀請成功用戶個數
var refMinCount = 5;
// 邀請返利每幾個算增加一次返利率
var eachRefCount = 5;
// 邀請返利每次增加多少返利率
var eachRefRate = 5;
// 邀請返利最大返利率
var maxRefRate = 40;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

	var 上次包月日期 = cm.getPlayer().getWorldShareInfo(999999999,"date");
	var 是否包月 = cm.getPlayer().getWorldShareInfo(999999999,"enable");

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

        var txt = "\r\n#d┌═══════════贊助中心══════════┐#k\r\n";
        //txt += "#r\t▲ 贊助比例 [ 1:3000 ]#k[金額返利 贊助方式返利] ▲\r\n";
		txt += "\t#b [ #d尊敬的玩家 #r#h ##d 歡迎來到" + cm.getServerName() + "贊助中心  ] #k\r\n";
		txt += "\t#b 目前您持有餘額 #r" + cm.getHyPay(1) + "#d 元 您已累積贊助  #r" +cm.getHyPay(2)+"#d 元#k\r\n";
		if (cm.getClient().getRefCode() != null) {
            txt += "\t#L11##b 您的邀請碼是：" + cm.getClient().getRefCode() + "#k(點擊複製)#l\r\n\t#L11##b 目前已成功邀請: " + cm.getClient().getRefCount(refAmount) +"名用戶消費#l\r\n\r\n";
		}
        //txt += "\t#b 除餘額獎勵外,還可領取對應金額的累計贊助禮包 #k\r\n";
		//txt += "\t#b 單筆任意金額樂豆點比例 #b1:2 #k\r\n";
		//txt += "\t#b 單筆金額超過1000元餘額比例 #g1:2 #k\r\n";
		txt += "#L1#" + vvv4 + "#r贊助管道#k#l\r\n";
        txt += "#L4#" + vvv4 + "#r我已儲值!點我刷點!#k#l\r\n";
		txt += "#L2#" + vvv4 + "#r累積贊助獎勵#k#l\r\n";
		txt += "#L7#" + vvv4 + "#r購買包月 (感謝您對" + cm.getServerName() + "的支持)#k#l\r\n";
		txt += "#L9#" + vvv4 + "#r折扣禮包#k#l\r\n";
		if( 是否包月 == 1 && DateDiff(上次包月日期,today) <= 30 )
			txt += "#L10#" + vvv4 + "#b我是包月會員，分身補領包月禮盒#k#l\r\n";
		//txt += "#L5#" + vvv4 + "#r樂豆套裝商店#k#l\r\n\r\n";
		//txt += "　#L8#" + vvv4 + " #r理財商城#k#l\r\n";
		//txt += "  #L7#" + vvv4 + "#r 開通理財#l#k  \r\n\r\n";
        txt += "\r\n#d└═════════════════════════┘#k\r\n\r\n";
        cm.sendSimple(txt);
    } else if (status == 1) {
        switch (selection) {
            case 0://抽獎
                cm.dispose();
                //cm.sendOk("\r\n\r\n\t\t\t#e#r修復細節問題");
               cm.openNpc(9000269);
                break;
            case 1://贊助
                cm.dispose();
                cm.openNpc(cm.getNpc(), "donate");
                break;
            case 2://累計贊助
                cm.dispose();
                //cm.sendOk("\r\n\r\n\t\t\t#e#r敬請期待");
                cm.openNpc(cm.getNpc(), "leijichongzhi");
                break;
            case 3://中介系統
                cm.dispose();
                cm.openNpc(9900004, 41);
                break;
            case 4://金額樂豆點
                cztp = 1;
                var revenue0 = cm.getHyPay(1);
                var text = z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + "\r\n\r\n";
                text += "#d尊敬的玩家 #r#h ##d 在這裡可以用餘額兌換樂豆點\r\n\r\n";
                text += "- 當前玩家持有可用餘額：#r" + revenue0.formatMoney(0, "") + "#d 元\r\n- 樂豆點持有#r"+cm.getNX(1)+"#d 點\r\n\r\n";
                text += "\t\t\t　#r#L0#" + z5 + " 我已儲值，點我刷點 " + z5 + "#l\r\n\r\n\r\n";
                text += z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + z1 + "\r\n";
                cm.sendYesNoS(text, 2);
                break;
            case 5://贊助禮包
                cm.dispose();
                cm.openNpc(cm.getNpc(), "yelb");
                break;
            case 6://理財系統
                cm.dispose();
                cm.openNpc(cm.getNpc(),"yelb1");
                break;
			case 7:
				cm.dispose();
                cm.openNpc(cm.getNpc(),"VIP");
				break;
			case 8:
				cm.dispose();
                cm.openNpc(cm.getNpc(),"vipshop");
				break;
			case 9:
				cm.dispose();
                cm.openNpc(cm.getNpc(),"MoneyToNx");
				break;
			case 10:
				if(cm.haveItem(2430865) < 1)
					cm.gainItem(2430865,1);
				cm.dispose();
                break;
			case 11:
				cm.dispose();
			    if (cm.getClient().getRefCode() == null) {
			        return;
			    }
			    cm.sendGetText("被邀請的用戶消費滿" + refAmount + "算成功邀請用戶"
			    + "\r\n需要成功邀請" + refMinCount + "名用戶才會開始返利"
			    + "\r\n每成功邀請" + eachRefCount + "名用戶會獲得" + eachRefRate + "%的儲值返利最高可得" + maxRefRate + "%返利"
			    + "\r\n#r※該返利是對方儲值然後你獲得對應比率的獎勵#k"
			    + "\r\n\r\n您的邀請碼是：", cm.getClient().getRefCode(), 6, 20);
                break;
        }
    } else if (status == 2) {
        if (cztp == 1) {
            switch (selection) {
                case 10://金額贊助樂豆點
                    if (cm.getHyPay(1) < 1) {
                        cm.sendOk("#r#e抱歉 ！您的餘額數目 [0] 不能進行贊助 ");
                        status = -1;
                    } else {
                        var revenue0 = cm.getHyPay(1);
                        cm.sendGetText("#r#e★★★★★★★★★『贊助中心』★★★★★★★★★#d\r\n\r\n請入你需贊助樂豆點的數量 [ 1：3000 ]\r\n\r\n當前 [ #r#h ##d ] 玩家持有金額：" + revenue0.formatMoney(0, "") + " 元\r\n\r\n#k ");
                    }
                    break;
            case 0://理財系統
                var revenue0 = cm.getHyPay(1);
                if (cm.getHyPay(1) < 1) {
				    cm.sendOk("#r#e抱歉 ！您的餘額數目 [0] 不能進行贊助 ");
				    status = -1;
                } else {
                    cm.gainNX(revenue0 * chargeRate);
                    cm.getPlayer().addPayUsed(revenue0);
                    var upRefCount = cm.getClient().getUpRefCount(refAmount);
                    if (upRefCount >= refMinCount) {
                        var refRate = Math.min(Math.floor(upRefCount / eachRefCount) * eachRefRate, maxRefRate);
                        if (refRate > 0 && cm.getClient().getUpId() > -1) {
                            cm.gainACash(cm.getClient().getUpId(), revenue0 * chargeRate * (refRate / 100.0));
                        }
                    }
                    cm.sendOk("#d#e恭喜您\r\n\r\n以兌換樂豆點數量：#r" + revenue0 * chargeRate + "#k#n\r\n ");
                    cm.addHyPay(revenue0);
                    cm.dispose();
				}
                break;
            }
        }
    } else if (status == 3) {
        if (cm.getHyPay(1) - cm.getText() < 0) {
            cm.sendOk("#r#e 你並沒有儲值哦! ");
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
}


function DateDiff (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
  var oDate1 = new Date(sDate1);
  var oDate2 = new Date(sDate2);
  var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return iDays;
}