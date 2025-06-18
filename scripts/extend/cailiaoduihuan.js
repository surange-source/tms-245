var status = 0;
var L 
var H 
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //愛心
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //彩虹帶
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var pp1 = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var pp2 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
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
        var selStr = "#e            "+axx+"材料兌換處"+axx+" \r\n\r\n";
           selStr +="#r#L0#"+xxx+"兌換 騎寵#l\r\n";
           selStr +="#r#L1#"+xxx+"兌換 星座椅子#l\r\n";
           selStr +="#r#L2#"+xxx+"兌換 冒險之心#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
        cm.openNpc(2012012,"duihuanqichong");
            break;
    case 1:
            cm.dispose();
    cm.openNpc(2012012);
            break;
    case 2:
            cm.dispose();
    cm.openNpc(2012012,"maoxianzhixin");
            break;
        case 3:
           cm.dispose();
            break;
        case 4:
            break;
            case 5:

            cm.dispose();
            break;
        }
    }
}
