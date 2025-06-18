var status = 0;

var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //愛心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //愛心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子藍
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var Crown = "#fUI/UIWindow4/PQRank/rank/gold#";
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
var ck = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);


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
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
            cm.dispose();
        } 
    else if (status == 0) {
        var conn = cm.getConnection();
        var pstmt = conn.prepareStatement("select leiji from hypay where accname = '"+cm.getC().getAccountName()+"'");
        var result = pstmt.executeQuery();
        result.next();
        var revenue = result.getString("leiji");
        var selStr = "#b親愛的#r#h ##k#b您好，這裡是稀有點裝商城.\r\n#d目前樂豆點：#r" + cm.getNX(1) + " #k#d點,您累計儲值金額為：#r" + revenue + "#k 元\r\n#r請選擇你需要的服務:#n\r\n#L11##r"+ck+" 最新時裝#l    #L12#"+ck+" 最新時裝2#l    #L9#"+ck+" 絕版戒指#l\r\n#b#L1#"+ck+" 稀有武器#l    #L2#"+ck+" 稀有披風#l    #L3#"+ck+" 稀有帽子#l\r\n#L4#"+ck+" 稀有衣服#l    #L5#"+ck+" 稀有褲子#l    #L6#"+ck+" 稀有鞋子#l\r\n#L7#"+ck+" 稀有手套#l    #L8#"+ck+" 稀有效果#l    #L10#"+ck+" #r情侶專賣#k#l\r\n\r\n   #L99##e#r"+ck+" 本周特價大優惠絕版套裝(第一期) #l\r\n\r\n"+dxxx+"#g 本周時裝推薦#v1702565##v1004450##v1050356##v1102809##v1073041#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
                    case 1:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang1");
            break;
            case 100:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang110");
            break;
                    case 2:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang2");
            break;
                    case 3:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang4");
            break;
                    case 4:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang5");
            break;
                    case 5:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang6");
            break;
                    case 6:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang3");
            break;
                    case 7:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang7");
            break;
                    case 8:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang8");
            break;
                    case 9:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang9");
            break;
            case 10:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang10");
            break;
            case 11:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang11");
            break;
            case 12:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang13");
            break;
            case 99:
            cm.dispose();
            cm.openNpc(9310376,"dianzhuang12");
            break;
        }
    }
}


