var status = 0;
var L 
var H 
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //愛心


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
        var selStr = "#e            "+axx+"楓點商城"+axx+" \r\n\r\n";
           selStr +="#r#L0#"+axx+"楓點商城 1號店#l\r\n";
           //selStr +="#r#L1#"+axx+"楓點商城 2號店#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
        cm.openNpc(9310362,"diyongjuan");
            break;
    case 1:
            cm.dispose();
    cm.openNpc(9310362,"diyongjuan1");
            break;
    case 2:
            cm.dispose();
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
