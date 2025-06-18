/* NPC版權: 至上楓之谷
    NPC名稱:         
    MAP(地圖ID):             ()
    NPC類型:         
   製作人：至上                 創建公會
*/

var status = 0;
var sel;

function start() {
    status = -1;
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
        if (status == 1) {
            cm.sendNext("擁有公會特有的紋章，可以增加成員的歸屬感，提高凝聚力。你還沒做好製作公會徽章的準備嗎？那就這麼辦吧。等你什麼時候做好了準備，到時再來找我。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
            cm.sendSimple("你好！我是負責管理#b公會徽章#k的#b蕾雅#k。\r\n#b#L0#我想製作公會徽章。#l\r\n#L1#我想刪除公會徽章。#l");
        } else {
            cm.sendOk("咦？你好像不是公會會長啊？公會徽章相關事務只有#r公會會長#k#r可以#k處理。");
            cm.dispose();
        }
    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            if (cm.getPlayerStat("GRANK") == 1) {
                cm.sendYesNo("生成公會徽章需要 #b1,500,000 楓幣#k的費用。我來跟你說明一下，公會徽章是每個公會特有的紋章，會出現在公會名稱的左邊。怎麼樣？你想製作公會徽章嗎？");
            } else {
                cm.sendOk("咦？你好像不是公會會長啊？公會徽章相關事務只有#r公會會長#k#r可以#k處理。");
                cm.dispose();
            }
        } else if (selection == 1) {
            cm.sendOk("還未完成.");
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel == 0) {
            cm.genericGuildMessage(18);
            cm.dispose();
        }
    }
}
