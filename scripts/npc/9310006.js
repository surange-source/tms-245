var status = 0;
function start() {
var em = cm.getEventManager("wugong");
    if (em == null) {
        cm.sendOk("請聯繫管理員開通此副本。");
        cm.dispose;
    } else {
        cm.sendNext("你好:請帶來給我#v4021016##r#z4021016##k #bX300#k\r\n\r\n裡面很危險，祖國人民的幸福就靠你來創造了，打敗這變異蜈蚣妖怪吧。\r\n如果你沒有#v4021016##r#z4021016##k我不能讓你進去");
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (cm.getParty()==null||cm.getParty()>=2 ) {
            cm.sendOk("請先自己開個組,而且只能自己一個人.完成後再來跟我說話");
            cm.dispose();
            return;
        }else if(!cm.haveItem(4021016,300)){
            cm.sendOk("請帶來給我#v4021016##r#z4021016##k #bX300#k");
            cm.dispose();
            return;
        }else{
        var em = cm.getEventManager("wugong");
        var prop = em.getProperty("state");
        if  (prop.equals("0") || prop == null) {
            em.startInstance(cm.getPlayer().getParty(), cm.getMap(), 210);
            cm.gainItem(4021016,-300);
            cm.dispose();
            return;
        } else {
            cm.sendOk("裡面已經有人開始戰鬥了。");

        }
      }
    }
    cm.dispose();
}