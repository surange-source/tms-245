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
var yun ="#fUI/UIWindow/Quest/icon7/0#";////紅沙漏
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////紅色圓
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標
var yun3 ="#fUI/UIWindow/Quest/prob#";////機率獲得
var yun4 ="#fUI/UIWindow/Quest/reward#";////獎勵
var yun5 ="#fUI/UIWindow/Quest/summary#";////任務簡潔
var yun6 ="#fUI/UIWindow/PartySearch2/BtPrev/mouseOver/0#";////左指標
var yun7 ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////右指標
var yun8 ="#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指標
var yun9 ="#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指標
var yun12 ="#fUI/UIWindow/Megaphone/2#";////骷髏
var xiaoyun1 ="#fUI/UIWindow/AriantMatch/characterIcon/0#";////紅方
var xiaoyun2 ="#fUI/UIWindow/AriantMatch/characterIcon/1#";////藍方
var xiaoyun3 ="#fUI/UIWindow/AriantMatch/characterIcon/2#";////綠方
var xiaoyun4 ="#fUI/UIWindow/AriantMatch/characterIcon/3#";////黃方
var xiaoyun5 ="#fUI/UIWindow/AriantMatch/characterIcon/4#";////紫方
var xiaoyun6 ="#fUI/UIWindow/AriantMatch/characterIcon/5#";////橙方
var xiaoyun7 ="#fUI/UIWindow/Minigame/Common/btStart/mouseOver/0#";////開始
var xiaoyun8 ="#fUI/UIWindow/Minigame/Common/mark#";////楓之谷圖標

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
        var selStr = "#e#k         "+yun8+"☆冰封獨家軍銜勳章系統☆"+yun9+"\r\n"+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+""+xiaoyun5+"\r\n#e#r      請把勳章取下來放背包裡在領取\r\n#e#g         #L1##i1142318#領取每日[少校]軍餉#i1142318##l\r\n#e#r         #L2##i1142319#領取每日[中校]軍餉#i1142319##l\r\n\#e#b         #L3##i1142320#領取每日[上校]軍餉#i1142320##l\r\n\#e#d         #L4##i1142321#領取每日[#r團#b長#d]軍餉#i1142321##l\r\n\r\n#i1142311##i1142312##i1142313##i1142314##i1142315##i1142316##i1142317##i1142318##i1142319##i1142320##i1142321#\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
                    case 1:
            if (cm.haveItem(1142318, 1) && cm.getPlayer().getLevel() > 200 && cm.getPQLog("少校") < 1) {
                cm.setPQLog("少校");
                cm.gainItem(2340000,20);
                cm.gainItem(4001126,50);
                cm.gainItem(4000463,1);
                cm.gainItem(4001714,1);
                cm.gainItem(4001839,5);
                cm.sendOk("#r#e尊敬的少校，\r\n#k祝你遊戲愉快!");
                cm.worldSpouseMessage(0x20, "『軍事新聞』 : " + cm.getChar().getName() + "[少校] 領取了軍餉，妹子們在哪裡！☆☆☆☆☆☆");
                cm.dispose();
            } else {
                cm.sendOk("信不信我分分鐘槍斃你？");
                cm.dispose();
            }
            break;
            case 100:
            cm.dispose();
            cm.openNpc(9310376,110);
            break;
                    case 2:
            if (cm.haveItem(1142319, 1) && cm.getPlayer().getLevel() > 220 && cm.getPQLog("中校") < 1) {
                cm.setPQLog("中校");
                            cm.gainItem(4001126,80);
                cm.gainItem(4000463,2);
                cm.gainItem(4001714,2);
                cm.gainItem(4001839,10);
                cm.gainItem(5062009,10);
                cm.gainItem(5220040,10);
                cm.gainItem(2430069,1);
                cm.sendOk("#r#e尊敬的中校，\r\n#k祝你遊戲愉快!");
                cm.worldSpouseMessage(0x20, "『軍事新聞』 : " + cm.getChar().getName() + "[中校] 領取了軍餉，妹子們在哪裡！☆☆☆☆☆☆");
                cm.dispose();
            } else {
                cm.sendOk("信不信我分分鐘槍斃你？");
                cm.dispose();
            }
            break;
                    case 3:
            if (cm.haveItem(1142320, 1) && cm.getPlayer().getLevel() > 230 && cm.getPQLog("上校") < 1) {
                cm.setPQLog("上校");
                           cm.gainItem(4001126,120);
                cm.gainItem(4000463,3);
                cm.gainItem(4001714,3);
                cm.gainItem(4001839,15);
                cm.gainItem(5062009,20);
                cm.gainItem(5220040,20);
                cm.gainItem(2430069,2);
                cm.sendOk("#r#e尊敬的上校，\r\n#k祝你遊戲愉快!");
                cm.worldSpouseMessage(0x20, "『軍事新聞』 : " + cm.getChar().getName() + "[上校] 領取了軍餉，妹子們在哪裡！☆☆☆☆☆☆");
                cm.worldSpouseMessage(0x20, "『軍事新聞』 : " + cm.getChar().getName() + "[上校] 領取了軍餉，妹子們在哪裡！☆☆☆☆☆☆");
                cm.dispose();
            } else {
                cm.sendOk("信不信我分分鐘槍斃你？");
                cm.dispose();
            }
            break;
                    case 4:
           if (cm.haveItem(1142321, 1) && cm.getPlayer().getLevel() > 240 && cm.getPQLog("團長") < 1) {
                cm.setPQLog("團長");
                  cm.gainItem(4001126,200);
                cm.gainItem(4000463,3);
                cm.gainItem(4001714,3);
                cm.gainItem(4001839,20);
                cm.gainItem(5062009,30);
                cm.gainItem(5220040,30);
                cm.gainItem(2430069,3);
                cm.sendOk("#r#e尊敬的團長，\r\n#k祝你遊戲愉快!");
                cm.worldSpouseMessage(0x20, "『軍事新聞』 : " + cm.getChar().getName() + "[團長] 領取了軍餉，妹子們在哪裡！☆☆☆☆☆☆");
                cm.worldSpouseMessage(0x20, "『軍事新聞』 : " + cm.getChar().getName() + "[團長] 領取了軍餉，妹子們在哪裡！☆☆☆☆☆☆");
            } else {
                cm.sendOk("信不信我分分鐘槍斃你？");
                cm.dispose();
            }
            break;
                    case 5:
            cm.dispose();
            cm.openNpc(9310376,6);
            break;
                    case 6:
            cm.dispose();
            cm.openNpc(9310376,3);
            break;
                    case 7:
            cm.dispose();
            cm.openNpc(9310376,7);
            break;
                    case 8:
            cm.dispose();
            cm.openNpc(9310376,8);
            break;
                    case 9:
            cm.dispose();
            cm.openNpc(9310376,9);
            break;
            case 10:
            cm.dispose();
            cm.openNpc(9310376,10);
            break;
            case 11:
            cm.dispose();
            cm.openNpc(9310376,11);
            break;
        }
    }
}
