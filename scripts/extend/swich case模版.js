var status = 0;
var L 
var H 



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
        var selStr = "#e        歡迎來到眾籌中心 \r\n";
           selStr +="      藍方:#b"+L+"#k\r\n\r\n";
           selStr +="      紅方:#r"+H+"#k\r\n\r\n\r\n";
           selStr +="#r#L0#我要捐獻#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            break;
    case 1:
            cm.dispose();
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
