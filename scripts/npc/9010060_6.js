
/* NPC版權: 彩雲島
 NPC名稱:         小幫手
 MAP(地圖ID):             (910000000)
 NPC類型:         綜合NPC
 製作人：故事、
 */

var status = -1;
var sel;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (cm.getPlayerStat("GID") < 0) {
            var text = "";
            text = "#e<#v3991051# #v3991050# #v3991038# #v3991044#-公會管理員>#n\r\n你想做什麼。\r\n";
            text += "#L0##b增加公會人數#l\r\n";
            text += "#L1##b我想解散公會#l\r\n";
            text += "#L2##b製作公會徽章#l\r\n";
            text += "#L3##b查看公會排行榜#l\r\n";
            //text += "#L4##r參加公會遺跡大會#l\r\n";
            cm.sendSimple(text);
        } else {
            cm.sendOk("你現在還沒有公會,無法使用公會管理。");
            cm.dispose();
        }

    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("你不是會長，因此你將不能增加公會成員的人數上限.");
                cm.dispose();
            } else {
                cm.sendYesNo("公會成員人數每增加#b5人#k，需要的手續費是#b5000萬楓幣#k。怎麼樣？你想增加公會人數嗎？");
            }
        } else if (selection == 1) {
            if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
                cm.sendOk("你不是會長，因此你不能解散該公會。");
                cm.dispose();
            } else {
                cm.sendYesNo("你真的要解散公會嗎？哎呀……哎呀……解散之後，你的公會就會被永久刪除。很多公會特權也會一起消失。你真的要解散嗎？");
            }

        } else if (selection == 2) {
            sel = selection;
            if (cm.getPlayerStat("GRANK") == 1) {
                cm.sendYesNo("生成公會徽章需要 #b1,500,000 楓幣#k的費用。我來跟你說明一下，公會徽章是每個公會特有的紋章，會出現在公會名稱的左邊。怎麼樣？你想製作公會徽章嗎？");
            } else {
                cm.sendOk("咦？你好像不是公會會長啊？公會徽章相關事務只有#r公會會長#k#r可以#k處理。");
                cm.dispose();
            }

        } else if (selection == 3) {
            if (cm.getPlayerStat("GID") > 0) {
                cm.dispose();
                cm.openNpc(9310153, 14);
            } else {
                cm.sendOk("你現在還沒有公會,無法使用公會服務。");
                cm.dispose();
            }
        }

    } else if (selection == 4) {
        cm.warp(102040200, 0);
        cm.dispose();
    } else if (status == 2) {
        if (sel == 0 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.increaseGuildCapacity(false);
            cm.dispose();
        } else if (sel == 2) {
            cm.genericGuildMessage(18);
            cm.dispose();
            //}
        } else if (sel == 1 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.disbandGuild();
            cm.dispose();
        }


    }
}
//}
