var status = -1;

function start() {
    var onFight = false;
    for each(cid in cm.getPlayer().getMapleUnion().getFightingUnions().keySet()) {
        if (cid == cm.getPlayer().getId()) {
            onFight = true;
            break;
        }
    }
    if (!onFight) {
        cm.sendOk("勇士您沒加入#r攻擊隊喔？#k\r\n只有攻擊隊員才能參加#r聯盟團戰。請在#k\r\n\r\n#b透過配置攻擊隊#k把角色拖進戰鬥地圖，\r\n#b加入攻擊隊#k後再試。");
        cm.dispose();
    } else {
        cm.sendYesNo("#r#e巨龍決戰#n#k正等著勇士您挑戰！\r\n#b#e是否進入聯盟團戰#n#k？");
    }
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status === i++) {
        cm.dispose();
    } else if (status === i++) {
        cm.sendOk("因不明原因無法送您進場。請稍後再試。");
    } else {
        cm.dispose();
    }
}