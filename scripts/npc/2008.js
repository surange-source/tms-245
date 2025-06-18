var level;

function start () {
    var menu = "";
    level = cm.getPlayer().getLevel();
    if (cm.getPlayer().getBurningChrType() > 0 && level <= 10) {
        menu += "\r\n#L0#幫我取消套用的燃燒效果#l";
    }
    if (menu != "") {
        cm.sendSimple("請問需要#p" + cm.getNpc() + "#做什麼" + menu);
    } else {
        cm.showPopupSay(cm.getNpc(), 800, "你好啊，我叫#p" + cm.getNpc() + "#", "");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (selection == 0) {
        if (cm.getPlayer().getBurningChrType() > 0 && level <= 10) {
            cm.getPlayer().setBurningChrType(0);
            cm.getPlayer().setBurningChrTime(-2);
            cm.showPopupSay(cm.getNpc(), 6000, "#p" + cm.getNpc() + "#不知道你為什麼要這麼做，但#p" + cm.getNpc() + "#已經按照您的吩咐#r取消燃燒效果#k囉。", "");
        }
    }
    cm.dispose();
}