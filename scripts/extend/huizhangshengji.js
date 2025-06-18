var status = -1;
var count = 4;//當前神秘徽章種數
var equips = [];//神秘徽章數組

function start() {
    action(1, 0, 0)
}

function action(mode, type, selection) {
    if (mode === 0) {
        cm.dispose();
        return;
    } else if (mode === 1){
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0: {
            var msg1 = "在我這裡可以升級神秘徽章\r\n";
            msg1 += "每消耗#r#e1#n#k個同名徽章可以提升#r#e1#n#k點成長值，每#r#e12#n#k點成長值可以提升1級" +
                "每提升一級可以獲得：#r#e+10 arc；+1000 allstats#n\r\n" +
                "#r請把要升級的神秘徽章裝備在身上#k\r\n" +
                "現在就要升級神秘徽章嗎？";
            cm.sendYesNo(msg1);
            break;
        }
        case 1: {
            for (var i = 0; i < count; i++) {
                var equip = cm.getEquippedBySlot(-1600 - i);//這幾個是神秘徽章的slot
                if (equip !== null && equip.getItemId() > 1712000 && equip.getItemId() <= 1712000 + count) {
                    equips.push(equip);//如果是可以升級的神秘徽章就放到數組e裡
                }
            }
            var size = equips.length;
            if (size === 0) {
                cm.sendOk("沒有檢測到可以升級的神秘徽章！請將需要升級的神秘徽章裝備在身上！");
                cm.dispose();
                return;
            }
            var msg2 = "請選擇要升級的神秘徽章：\r\n";
            for (i = 0; i < size; i++) {
                var itemId = equips[i].getItemId();
                msg2 += "#L" + i + "##v" + itemId + "##z" + itemId + "##l\r\n";
            }
            cm.sendSimple(msg2);
            break;
        }
        case 2: {
            equip = equips[selection];
            var level = equip.getARCLevel();
            if (level >= 15) {
                cm.sendOk("這個神秘徽章已經到達滿級15級，不能再繼續升級！");
                cm.dispose();
                return;
            }
            if (!cm.haveItem(equip.getItemId())) {
                cm.sendOk("你沒有與選擇的徽章同名的徽章作為升級材料，無法升級！")
                cm.dispose();
                return;
            }
            cm.gainItem(equip.getItemId(), -1);
            equip.setARCExp(equip.getARCExp() + 1);
            if (equip.getARCExp() >= 12) {
                equip.setARCExp(0);
                equip.setARC(equip.getARC() + 10);
                equip.setARCLevel(level + 1);
                equip.setStr(equip.getStr() + 1000);
                equip.setDex(equip.getDex() + 1000);
                equip.setInt(equip.getInt() + 1000);
                equip.setLuk(equip.getLuk() + 1000);
                cm.sendOk("成功將徽章等級由#r#e" + level + "#n#k級提升到#r#e" + (level + 1) + "#n#k級");
            } else {
                cm.sendOk("獲得1點成長值！距離提升等級還需#r#e" + (12 - equip.getARCExp()) + "#n#k點成長值！");
            }
            cm.updateEquip(equip);
            cm.dispose();
            break;
        }
    }
}