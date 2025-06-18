var status = 0;
var L 
var H 
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //愛心

var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花樣音符
//----------------------------------------------------變量切割
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
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.");
            cm.dispose();
        } 
    else if (status == 0) {
        var selStr = "#e            "+axx+"#d美容美發中心#k"+axx+" \r\n\r\n";
           selStr +="#b             換色請到美容店進行!#k\r\n\r\n";
           if (cm.haveItem(2430865)){
               selStr +="#r#L2#"+tz15+"我要隨 自選髮型#l";
           selStr +="#r#L3#"+tz15+"我要隨 自選臉型#l\r\n";
           }else{
           selStr +="#r#L0#"+tz15+"我要隨 髮型#l";
           selStr +="#r#L1#"+tz15+"我要隨 臉型#l\r\n";
           }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
        cm.warp(100000104,0);
        //cm.openNpc(1012117);
            break;
    case 1:
        cm.warp(100000103,0);
            cm.dispose();

    //cm.openNpc(9201148);
            break;
    case 2:
        cm.dispose();
        cm.openNpc(9201148,"zixuanfaxing");
            
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9201148,"zixuanlianxing");

            break;
        case 4:
            break;
            case 5:

            cm.dispose();
            break;
        }
    }
}
