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
        cm.sendNext("你好？我是賞金獵人#b#e普里托#n#k。\r\n正努力和大哥#r#e波羅#n#k一起名揚天下中呢！哈哈！");
    } else if (status == i++) {
        cm.sendSimple("雖然別人覺得我傻呼呼，但其實我擁有非常驚人的實力。怎樣，要不要跟我一起冒險？\r\n#b(進場時終止召喚類技能與部分技能。)\r\n#b#L0#同行。#l\r\n#b#L1#不同行。");
    } else if (status == i++) {
        cm.dispose();
        if (selection == 0) {
            if (portal != null) {
                cm.getMap().disappearMapObject(portal);
            }
            cm.getPlayer().getTempValues().remove("BountyHunterNpc");

            // todo Event Code
            cm.topMsg("暫時不支援這個副本");
        }
    } else {
        cm.dispose();
    }
}