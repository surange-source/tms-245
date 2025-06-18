
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
        else
            status--;
        if (status == 0) {
            var text="您好，在這裡可以製作140、150的裝備，請選擇您需要製作的裝備類型：\r\n";
            text+="#b#L241#製作140級防具#l\r\n";
            text+="#b#L242#製作140級武器#l\r\n";
            text+="#b#L244#製作150級防具#l\r\n";
            text+="#b#L243#製作150級武器#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1){
            cm.dispose();
            cm.openNpc(9900003, selection);
        }
    }
}