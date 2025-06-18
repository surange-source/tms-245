var status = 0;
var yaoshi = 10;

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
        cm.sendSimple("#r#e<哈比斯鑰匙商人>#n\r\n#k通往魯塔比斯巨大樹根內部需要的鑰匙.\r\n#b#L1#免費領取#v4033611#古樹鑰匙。("+yaoshi+"次)");//\r\n#L2#樂豆點購買#v4033611#古樹鑰匙。(15000樂豆點)
    } else if (status == 1) {
        switch (selection) {
        case 1:
            if(cm.getPQLog("古樹鑰匙") < yaoshi)
            {
            cm.gainItem(4033611,1);
            cm.setPQLog("古樹鑰匙");
            }else{
            cm.sendOk("每天只能免費領取#v4033611#古樹鑰匙："+yaoshi+"次。");
                    cm.dispose();
            }
            break;
        case 2:
            if(cm.getPlayer().getCSPoints(1) >= 15000 && cm.getPQLog("古樹鑰匙")<7)
            {
            cm.setPQLog("古樹鑰匙");
            cm.gainItem(4033611,1);
            cm.gainNX( -15000);
            }else{
            cm.sendOk("請確認是否足夠15000樂豆點。\r\n且每日購買鑰匙次數不能超過5次!");
                    cm.dispose();
}
            break;
        }
        cm.dispose();
    }
}
