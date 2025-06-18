var status = -1;
var portal = null;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        if (portal == null) {
            portal = cm.getMap().getRandomPortalObject(selection);
            if (portal == null) {
                cm.showSystemMessage("發生未知錯誤");
                cm.dispose();
                return;
            }
        }
        cm.sendNext("我是楓之谷世界最厲害的賞金獵人#r#e波羅#n#k。正和\r\n弟弟#b#e普里托#n#k一起擊退魔物們。");
    } else if (status == i++) {
        cm.sendSimple("我們兄弟終於找到追擊好長一段時間的最強怪物#r#e烈燄戰狼#n#k的巢穴。那傢伙只要遇到楓之谷的旅行者就會掠奪，實在非常毒辣…怎樣，要不要跟我一起消滅那傢伙？\r\n#b#L0#同行。#l\r\n#b#L1#不同行。");
    } else if (status == i++) {
        cm.dispose();
        if (selection == 0) {
            if (portal != null) {
                cm.getMap().disappearMapObject(portal);
            }

            // todo Event Code
            cm.topMsg("暫時不支援這個副本");
        }
    } else {
        cm.dispose();
    }
}