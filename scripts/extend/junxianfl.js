var status = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var giftContent = Array(
 
  Array("50%力量瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632108, 1)
    )),
  Array("50%敏捷瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632109, 1)
    )),
  Array("50%智力瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632110, 1)
    )),
  Array("50%運氣瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632111, 1)
    )),
  Array("50%體力瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632112, 1)
    )),
  Array("50%均衡瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632113, 1)
    )),
  Array("50%破壞瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632114, 1)
    )),
  Array("50%魔力瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 10, Array(
        Array(2632115, 1)
    )),
  Array("100%力量瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643002, 1)
    )),
  Array("100%敏捷瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643003, 1)
    )),
  Array("100%智力瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643004, 1)
    )),
  Array("100%運氣瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643005, 1)
    )),
  Array("100%體力瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643006, 1)
    )),
  Array("100%均衡瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643007, 1)
    )),
  Array("100%破壞瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643106, 1)
    )),
  Array("100%魔力瑪瑙石 X 5--只能用於成長型瑪瑙戒指", 20, Array(
        Array(2643107, 1)
    )),
  Array("100%強大的力量瑪瑙石 X 10--只能用於完成型瑪瑙戒指", 30, Array(
        Array(2643116, 1)
    )),
  Array("100%強大的敏捷瑪瑙石 X 10--只能用於完成型瑪瑙戒指", 30, Array(
        Array(2643117, 1)
    )),
  Array("100%強大的智力瑪瑙石 X 10--只能用於完成型瑪瑙戒指", 30, Array(
        Array(2643118, 1)
    )),
  Array("100%強大的運氣瑪瑙石 X 10--只能用於完成型瑪瑙戒指", 30, Array(
        Array(2643119, 1)
    )),
  Array("100%強大的體力瑪瑙石 X 10--只能用於完成型瑪瑙戒指", 30, Array(
        Array(2643120, 1)
    )),
  Array("100%強大的均衡瑪瑙石 X 10--只能用於完成型瑪瑙戒指", 30, Array(
        Array(2643121, 1)
    ))
);
var giftId = -1;
var gifts = null;
var price = 999;
var column = new Array("裝備", "消耗", "設置", "其他", "商城");
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
        var conn = cm.getConnection();
        var pstmt = conn.prepareStatement("select leiji from hypay where accname = '"+cm.getC().getAccountName()+"'");
        var result = pstmt.executeQuery();
        result.next();
        var revenue = result.getString("leiji");
        var text = "";
        text = ""+iconHR+"尊敬的玩家#b#h ##k，歡迎來到#b#e神秘的瑪瑙商店！#n#k\r\n";
        //text += "#e#b歡迎來到套裝禮包商城，點擊可以查看禮包內容哦！\r\n";
        text += ""+icon2+"您當前餘額為：#r"+cm.getHyPay(1)+"#k "+"\t\t"+icon2+"累計儲值：#r"+revenue+"#k\r\n";
        for(var key in giftContent) {
            text+="#b#L"+key+"#購買【#r#e"+giftContent[key][0]+"#n#b】 #e#d需要"+giftContent[key][1]+"餘額#n#b#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        price = giftContent[giftId][1];
        gifts = giftContent[giftId][2];
        var text="#r#e"+giftContent[giftId][0]+"#n#b內容：\r\n";
        for(var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text+="#i"+itemId+":##b" + (itemId == -1 ? "贈送樂豆點" : "#z" + itemId + "#") + "#k #rx "+itemQuantity+"#k\r\n";
        }
        text+="\r\n#d是否花費#e#r"+price+"#n#d餘額購買該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId!=-1 && gifts != null) {
            var needslot = new Array(0, 0, 0, 0, 0);
            for (var i in gifts) {
                var type = Math.floor(gifts[i][0] / 1000000);
                if (type == -1) {
                    continue;
                }
                needslot[type - 1] = needslot[type - 1] + 1;
            }
            for (var i = 0; i < 5; i++) {
                if (cm.getSpace(i + 1) < needslot[i]) {
                    cm.sendOk("您的" + column[i] + "欄位空間不足" + needslot[i] + "格，請清理後再來。");
                    cm.dispose();
                    return;
                }
            }
            if (cm.getHyPay(1) < price) {
                cm.sendOk("您的餘額不足，請先儲值後再購買。");
                cm.dispose();
                return ;
            }
            for(var key in gifts) {
                var itemId = gifts[key][0];
                var itemQuantity = gifts[key][1];
                if (itemId == -1) {
                    cm.gainNX(itemQuantity);
                } else {
                    cm.gainGachaponItem(itemId, itemQuantity,"土豪餘額商城",3);
                }
            }
            cm.addHyPay(price);
            cm.sendOk("恭喜您，購買成功！");
            //cm.worldSpouseMessage(0x0F,"[餘額商城] 土豪玩家 "+ cm.getChar().getName() +" 從商城裡掏走了價值"+price+"的["+giftContent[giftId][0]+"]裝備！！！");
            cm.dispose();
        } else {
            cm.sendOk("購買錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}