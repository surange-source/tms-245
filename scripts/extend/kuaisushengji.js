var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var typed = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "#e親愛的 #g#h0##k, 歡迎來到 #r糖糖楓之谷萌新指引系統#k\r\n\r\n";
        selStr += "#b如何快速升級：#k\r\n";
        selStr += "升級前，您需要準備的物品：\r\n#v5211060#(#v2432667#--所有商店--樂豆點商舖--雙倍)\r\n";
        selStr += "#v2450064#(#v2432667#--所有商店--樂豆點商舖--消耗)\r\n";
        selStr += "#v1112918#(#v2432667#--所有商店--樂豆點商舖--雙倍)\r\n";
        selStr += "有條件者，還可使用增加經驗值得#g角色卡#k及#gLINK技能#k\r\n";
        selStr += "#r【 1 -155級】#k\r\n(#v2432667#--萬能傳送--萬能地圖傳送--快速練級)\r\n";
        selStr += "參照裡面的對應等級內容即可快速升至155+\r\n";
        selStr += "#r【155-200級】#k\r\n#g優先考慮#k:#dBOSS闇黑龍王#k\r\n(#v2432667#--萬能傳送--BOSS傳送--闇黑龍王)\r\n";
        selStr += "#r【155-200級】#k\r\n#dBOSS品客繽#k\r\n(#v2432667#--萬能傳送--BOSS傳送--品客繽)\r\n";
        selStr += "#r注意#k由於BOSS難度可能超出新手範疇，建議向老玩家求助！\r\n面板足夠#d(8W-20W即可)#k或是#d職業強勢#k的玩家也可選擇自己磨死BOSS\r\n";
        selStr += "#b【200-220級】#k\r\n[重置]BOSS闇黑龍王 BOSS皮卡啾\r\n(#v2432667#--BOSS重置)\r\n #r升級地圖#k--天際線\r\n";
        selStr += "#b【220-250級】#k\r\n#r楓幣副本  方塊副本#k 地圖\r\n(#v2432667#--萬能傳送--副本傳送--楓幣副本、方塊副本)\r\n";
      cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
        cm.dispose();      
    cm.openNpc(9310378, "kuaisushengji");
            break;
        case 2:
        cm.dispose();      
    cm.openNpc(9310378, "tigaomianban");
            break;
        case 3:
        cm.dispose();      
    cm.openNpc(9310378, "zhuanqian");
            break;
        case 4:
        cm.dispose();      
    cm.openNpc(9310378, "huafeiyue");
            break;

        }
    } 
}