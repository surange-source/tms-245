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
        if (cm.getChar().isGm()==true){
        var selStr = "#e        點太快，容易掉線哦。 \r\n";
           selStr +="#r#L0#開始搶樓#l\r\n";
        cm.sendSimple(selStr);
        }else{
            cm.dispose();
            cm.openNpc(9010049,"qianglou");
        }
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9010049,"qianglou");
                break;
        }
    }
}
