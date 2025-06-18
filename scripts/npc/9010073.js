
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else{
            cm.dispose();
            return;            
        }
            

        if (status == 0) {            
            cm.sendYesNo("是否要回到自由市場?");
        } else if (status == 1) {
            cm.sendYesNo("是否確定要回到自由市場?");
        } else if (status == 2) {
            cm.warp(9100000000);
            cm.dispose();
            return;
        } 
    }
}
