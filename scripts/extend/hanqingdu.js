var status = 0;
var i = java.lang.Math.floor(Math.random() * 80);

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
            cm.sendSimple("#b<看你敢不敢賭 - 我這裡有大把中介幣與正義火種>\r\n\r\n#k#L1#一千萬楓之谷幣賭上中介幣#l\r\n#L2#五百萬楓之谷幣賭上正義火種");
        } else if (status == 1) {
            if (selection == 1) {
                if (cm.getMeso() >= 10000000) {
                    if (i >= 0 && i <= 4) {
                        cm.gainItem(4000463, 1);
                        cm.dispose();
                        cm.sendOk("你贏了，獲得了1個中介幣...我不服，在來！！！");
                        cm.worldMessage("" + cm.getChar().getName() + "在新年聚賭 一千萬籌碼中獲得了大量的中介幣，大家恭喜他(她)。");
                    } else if (i >= 5 && i <= 9) {
                        cm.gainItem(4000463, 2);
                        cm.dispose();
                        cm.sendOk("你贏了，獲得了2個中介幣...我不服，在來！！！");
                        cm.worldMessage("" + cm.getChar().getName() + "在新年聚賭 一千萬籌碼中獲得了一定的中介幣，大家恭喜他(她)。");
                    } else {
                        cm.dispose();
                        cm.gainMeso(-10000000);
                        cm.sendOk("你輸了，還敢來嗎？怕什麼。我等你！！！");
                    }
                } else {
                    cm.dispose();
                    cm.sendOk("你的楓幣不夠兩百萬");
                }
            }
            if (selection == 2) {
                if (cm.getMeso() >= 5000000) {
                    if (i >= 0 && i <= 4) {
                        cm.gainItem(4033356, 1);
                        cm.dispose();
                        cm.sendOk("你贏了，獲得了1個正義火種...我不服，在來！！！");
                        cm.worldMessage("" + cm.getChar().getName() + "在新年聚賭 五百萬籌碼中獲得了大量的正義火種，大家恭喜他(她)。");
                    } else if (i >= 5 && i <= 9) {
                        cm.gainItem(4033356, 2);
                        cm.dispose();
                        cm.sendOk("你贏了，獲得了2個正義火種...我不服，在來！！！");
                        cm.worldMessage("" + cm.getChar().getName() + "在新年聚賭 五百萬籌碼中獲得了一定的正義火種，大家恭喜他(她)。");
                    } else {
                        cm.dispose();
                        cm.gainMeso(-5000000);
                        cm.sendOk("你輸了，還敢來嗎？怕什麼。我等你！！！");
                    }
                } else {
                    cm.dispose();
                    cm.sendOk("你的楓幣不夠500萬");
                }
            }
        }
    }
}