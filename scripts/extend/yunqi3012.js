var status = 0;
var i = java.lang.Math.floor(Math.random() * 100);

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
            if(cm.getMeso() >= 20000000){
            cm.sendSimple(">運氣活動：#b<豪情賭拿中介>\r\n\r\n#k>活動目標：#b<看你敢不敢賭 - 我這裡有大把中介幣>\r\n\r\n#k#L1#2000萬楓之谷幣賭上#l");
            } else {
            cm.sendOk("楓幣不足2000萬。");
            cm.dispose();
            }
        } else if (status == 1) {
            if (selection == 1) {
            if(i <= 10){
                    cm.gainMeso(-20000000);
            cm.gainItem(4000463,1);
                        cm.dispose();
            cm.sendOk("你贏了，獲得了1個中介幣...我不服，敢不敢在來！！！");
            cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + " 在豪情賭拿中介 2000萬籌碼中獲得了一定的中介幣，大家恭喜他(她)。");
            }else{
                    cm.gainMeso(-20000000);
                        cm.dispose();
            cm.sendOk("你輸了，還敢來嗎？大過年的，怕什麼。我等你！！！");
            }
            }
        }
    }
}