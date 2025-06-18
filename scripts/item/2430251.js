/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  尋寶便簽
 *  每日尋寶任務
 *  @Author Kent 
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        if (im.isQuestActive(200100)) {
            var mapid = im.getMapId();
            var qinfo = im.getCustomData(200102);
            im.sendPlayerToNpc("\t\t\t\t#e里諾赫給我的線索#n\r\n\r\n寶藏可能藏在這些地方：\n\r " + qinfo);
        } else {
            im.sendPlayerToNpc("#好像並沒有開始尋寶任務哦#n");
            im.used(1);
        }
        im.dispose();
    }
}
