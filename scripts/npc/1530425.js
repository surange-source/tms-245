var status = 0;
var icon1 = "#fEffect/CharacterEff/1082565/4/0#";
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";

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
        var text = "你好，我是花園管理使者。\r\n";
        text += "#b#L0#" + icon2 + " 瞭解什麼是花園？#l\r\n";
        text += "#b#L2#" + icon2 + " 領取今日免費活力值#l\r\n";
        text += "#r#L1#" + icon1 + " 進入我的花園#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            var text = "\t每個角色初生花園技術等級為1級。可以擁有1個花盆，提升等級之後可以擴建花園增加花盆，花園技術等級決定你能的花種。每當收穫時可以獲得經驗和花的產物。任何的花只要超過一天沒有採摘就會枯萎。\r\n";
            text += "\t每天可以為的花進行一次澆水、施肥，澆水消耗10點活力值值，可以減少1小時的作物成長時間，施肥消耗20點活力值值，可以減少2小時的作物成長時間。";
            status -= 2;
            cm.sendOk(text);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9330065, 1);
            break;
        case 2:
            if (cm.getBossLog("花園活力值") == 0) {
                cm.setBossLog("花園活力值");
                cm.setEnergy(cm.getEnergy() + 50);
                cm.sendOk("成功領取了50點活力值值，活力值值可通過市場掛機#k獲取。");
                cm.dispose();
            } else {
                cm.sendOk("您今天已經領取過了活力值值！");
                cm.dispose();
            }

        }
    }
}