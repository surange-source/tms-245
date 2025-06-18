/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  
 *  NPC名稱：維多利亞港中巴
 *  功能：傳送
 *  @Author Kent 
 */

var status = 0;
var maps = Array(120000000, 102000000, 100000000, 103000000);
var show;
var sCost;
var selectedMap = -1;


function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2) {
            cm.sendNext("如果你想移動到其他村莊, 請隨時使用我們的出租車~");
            cm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendNext("你好~!我是#p1012000#。你想快速又安全地移動到其他村莊嗎? 那麼就請使用令客戶百分百滿意的#b#p1012000##k吧。這次我給你免費優待!我將會送你去想去的地方。");
    } else if (status == 1) {
        var job = cm.getJob();
        var selStr = "請選擇目的地。#b";
        for (var i = 0; i < maps.length; i++) {
            selStr += "\r\n#L" + i + "##m" + maps[i] + "##l";
        }
        cm.sendSimple(selStr);
    } else if (status == 2) {
        cm.sendYesNo("看樣子, 你好像已經沒有什麼事情需要在這裡做了。確定要移動到 #b#m" + maps[selection] + "##k? ");
        selectedMap = selection;
    } else if (status == 3) {
        cm.warp(maps[selectedMap]);
        cm.dispose();
    }
}
