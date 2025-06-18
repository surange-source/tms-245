/WSY工作室小妤*/
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
        var selStr = "        #d#e歡迎來到"+cm.getServerName()+"時裝店!\r\n"+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+""+eff+"\r\n   #L11##e#b"+tz+"新時裝1"+tz+"#k#n#l #L12##e#b"+tz+"新時裝2"+tz+"#k#n#l #L66##e#b"+tz+"新時裝3"+tz+"#k#n#l\r\n              #L1##e#r"+tz1+"武器"+tz1+"#l #L2##e#r"+tz1+"披風"+tz1+"#l\r\n            #L3##e#r"+tz1+"帽子"+tz1+"#l #L4##e#r"+tz1+"衣服"+tz1+"#l\r\n            #L5##e#r"+tz1+"褲子"+tz1+"#l #L6##e#r"+tz1+"鞋子"+tz1+"#l\r\n            #L7##e#r"+tz1+"手套"+tz1+"#l #L8##e#r"+tz1+"效果"+tz1+"#l\r\n            #L9##e#b"+tz1+"戒指"+tz1+"#l#L10##e#b"+tz1+"情侶專賣"+tz1+"#l\r\n\t\t\t#L17##e#d"+tz1+"特色全套套裝禮包"+tz1+"#l\r\n\r\n\r\n"+dxxx+"#g 本周時裝推薦#v1102778##v1702581##v1050361##v1051431##v1051410##v1051411#           \r\n"; //\r\n\r\n
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
                    case 1:
            cm.dispose();
            cm.openNpc(9310376,"9310376_1");
            break;
            case 100:
            cm.dispose();
            cm.openNpc(9310376,110);
            break;
                    case 2:
            cm.dispose();
            cm.openNpc(9310376,"9310376_2");
            break;
                    case 3:
            cm.dispose();
            cm.openNpc(9310376,"9310376_4");
            break;
                    case 4:
            cm.dispose();
            cm.openNpc(9310376,"9310376_5");
            break;
                    case 5:
            cm.dispose();
            cm.openNpc(9310376,"9310376_6");
            break;
                    case 6:
            cm.dispose();
            cm.openNpc(9310376,"9310376_3");
            break;
                    case 7:
            cm.dispose();
            cm.openNpc(9310376,"9310376_7");
            break;
                    case 8:
            cm.dispose();
            cm.openNpc(9310376,"9310376_8");
            break;
                    case 9:
            cm.dispose();
            cm.openNpc(9310376,"9310376_9");
            break;
            case 10:
            cm.dispose();
            cm.openNpc(9310376,"9310376_10");
            break;
            case 11:
            cm.dispose();
            cm.openNpc(9310376,"9310376_11");
            break;
            case 12:
            cm.dispose();
            cm.openNpc(9310376,"9310376_12");
            break;
            case 66:
            cm.dispose();
            cm.openNpc(9310376,"9310376_66");
            break;
            case 13:
            cm.dispose();
            cm.openNpc(9310376,"zpbb");
            break;
            case 15:
            cm.dispose();
            cm.openNpc(9310376,"zpb");
            break;
            case 17:
            cm.dispose();
            cm.openNpc(9310376,"taozhuang");
            break;
        }
    }
}
