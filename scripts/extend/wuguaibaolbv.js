/* 查看怪物爆率 */

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        var txt = "請選擇要使用的功能\r\n\r\n";
            txt +="#e#L0#打開萬能NPC#l\r\n\r\n";
            txt +="#e#L1#查看地圖怪物掉寶#l\r\n";
            cm.sendSimple(txt);
    } else if (status == 1) {
        if (selection == 0){
            cm.dispose();
            cm.openNpc(9310362);
        }else if(selection == 1){
        if (cm.getMap().getAllMonstersThreadsafe().size() <= 0) {
            cm.sendOk("當前地圖沒有刷新怪物，無法查看掉寶。");
            cm.dispose();
            return;
        }
        var selStr = "請選擇你要查看怪物的掉寶。\r\n\r\n#b";
        if (cm.getPlayer().isIntern()) {
            selStr += "#L0# #r查看地圖掉寶#k#l\r\n";
        }
        var iz = cm.getMap().getAllUniqueMonsters().iterator();
        while (iz.hasNext()) {
            var zz = iz.next();
            selStr += "#L" + zz + "##o" + zz + "##l\r\n";
        }
        cm.sendSimple(selStr);
        }
    } else if (status == 2) {
        cm.sendNext(cm.checkDrop(selection));
        cm.dispose();
    }
}