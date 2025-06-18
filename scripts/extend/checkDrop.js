/*      
 *  
 *  功能：查看怪物掉寶
 *  
 */
var status = -1;

function start() {
    if (cm.getMap().getAllMonster().size() <= 0) {
        cm.sendOk("當前地圖沒有刷新怪物，無法查看掉寶。");
        cm.dispose();
        return;
    }
    var selStr = "請選擇你要查看怪物的掉寶。\r\n\r\n#b";
    if (cm.getPlayer().isIntern()) {
        selStr += "#L0##e查看地圖掉寶#n#l\r\n";
    }
    var iz = cm.getMap().getAllUniqueMonsters().iterator();
    while (iz.hasNext()) {
        var zz = iz.next();
        selStr += "#L" + zz + "##o" + zz + "#";
        if (cm.getPlayer().isIntern()) {
            selStr += "(" + zz + ")";
        }
        selStr += "#l\r\n";
    }
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    status++;
    if (status == 0) {
        cm.sendNext(cm.checkDrop(selection));
    } else {
        cm.dispose();
    }
}
