var availableKills = 0;
var maxNum = 0;
var lvMobExp;
var maxLv = 220;

function start() {
    var checked = false;
    if (cm.getMap() == null || !cm.getMap().isTown()) {
        cm.sendOk("葫蘆裡的經驗值只能在村莊中獲得的喔！");
    } else if (cm.getWorldShareInfo(500605, "subName") == null) {
        cm.sendOk("由於不是#e弟子角色#n所以，所以無法再獲得經驗值。");
        cm.gainItem(2630031, -1);
        cm.updateWorldShareInfo(500605, null);
    } else if (cm.getWorldShareInfo(500605, "mainLv") == null || cm.getLevel() >= parseInt(cm.getWorldShareInfo(500605, "mainLv"))) {
        cm.sendOk("由於等級比師父角色等級 (最初登錄時間) 高，所以無法再獲得經驗值。");
        cm.gainItem(2630031, -1);
        cm.updateWorldShareInfo(500605, null);
    } else if (cm.getLevel() >= 220) {
        cm.sendOk("由於等級大於220，所以無法再獲得經驗值。");
        cm.gainItem(2630031, -1);
        cm.updateWorldShareInfo(500605, null);
    } else if (!cm.haveItem(2630031) || cm.getWorldShareInfo(500605, "availableKills") == null) {
        cm.sendOk("發生未知錯誤。");
    } else {
        checked = true;
    }
    if (!checked) {
        cm.showSpecialUI(checked, "UIExpBottle");
        cm.dispose();
    } else {
        maxLv = Math.max(220, parseInt(cm.getWorldShareInfo(500605, "mainLv")));
        availableKills = parseInt(cm.getWorldShareInfo(500605, "availableKills"));
        var level = cm.getLevel();
        var need = 0;
        var baseExp = cm.getPlayer().getExp();
        lvMobExp = cm.getLvMobExp();
        var lvNeedNum = 0;
        var mobExp = 0;
        for (var i = level; i < level + 10; i++) {
            if (maxLv == i) {
                break;
            }
            need = cm.getExpNeededForLevel(i);
            mobExp = i >= 200 ? 32900 : (lvMobExp[i - 1] * 5);
            lvNeedNum = parseInt(Math.ceil((need - baseExp) / mobExp));
            baseExp = lvNeedNum * mobExp - (need - baseExp);
            maxNum += lvNeedNum;
            if (maxNum >= availableKills) {
                maxNum = availableKills;
                break;
            }
        }
        cm.sendGetNumber("目前儲存在葫蘆的擊殺數量是 #b" + availableKills + "隻#k。\r\n要收領幾隻的經驗值呢？\r\n\r\n#r※ 目前可使用的擊殺數量： 1 ～ " + maxNum + " 隻 (最多提升 10 等級份量 )#k", maxNum, 1, maxNum);
    }
}

var status = -1;
var select = -1;
var mainName = "";
var exp = 0;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
        if (status == 0) {
            cm.dispose();
            return;
        }
    }

    var i = -1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        if (select == -1) {
            select = selection;
            if (select > maxNum) {
                select = maxNum;
            } else if (select < 1) {
                select = 1;
            }
            maxNum = select;
            if (availableKills < select) {
                cm.sendOk("發生未知錯誤。");
                cm.dispose();
                return;
            }
        }
        cm.sendYesNo("總共使用 " + select + " 隻的擊殺數量時，此角色看來可以成長到 #b10等級#k 呢！\r\n葫蘆的擊殺數量應該會剩下 #b" + (availableKills - select) + "隻#k 。\r\n要這樣獲得經驗值嗎？\r\n\r\n#r※ 注意：使用一次#b最多可成長 10等級#k，且一旦使用到獲得完經驗值前無法取消。#k");
    } else if (status == i++) {
        if (maxNum > 0) {
            var need = 0;
            var baseExp = cm.getPlayer().getExp();
            var lvNeedNum = 0;
            var gainExp = 0;
            var mobExp = 0;
            while (maxNum > 0) {
                var level = cm.getLevel();
                need = cm.getExpNeededForLevel(level);
                mobExp = level >= 200 ? 32900 : (lvMobExp[level - 1] * 5);
                lvNeedNum = parseInt(Math.ceil((need - baseExp) / mobExp));
                if (maxNum >= lvNeedNum) {
                    baseExp = lvNeedNum * mobExp - (need - baseExp);
                    gainExp = lvNeedNum * mobExp;
                    exp += gainExp;
                    cm.gainExp(gainExp);
                    maxNum -= lvNeedNum;
                } else {
                    gainExp = maxNum * mobExp;
                    exp += gainExp;
                    cm.gainExp(gainExp);
                    maxNum = 0;
                    break;
                }
            }

            mainName = cm.getWorldShareInfo(500605, "mainName");
            availableKills -= select;
            cm.getPlayer().updateWorldShareInfo(500605, "availableKills", availableKills);
            if (availableKills <= 0 || cm.getLevel() >= maxLv) {
                cm.gainItem(2630031, -1);
                cm.updateWorldShareInfo(500605, null);
                cm.showSpecialUI(false, "UIExpBottle");
            }
        }
        cm.sendNext("太優秀了！\r\n#b從師父角色 " + mainName + "#k所累積怪物數量的經驗值中， #b弟子角色 " + cm.getName() + "#k獲得了 #b" + select + "隻#k 的經驗值呢！\r\n這是 " + cm.getName() + " 角色#b狩獵等級範圍怪物 " + select + "隻#k的 500% 效果喔！\r\n\r\n獲得的經驗值：" + exp);
        if (availableKills > 0 && cm.getLevel() < maxLv) {
            cm.dispose();
        }
    } else if (status == i++) {
        if (availableKills > 0) {
            cm.sendNextPrev("已經超過可使用等級了！\r\n現在這葫蘆已經沒有用了，所以我就拿去吧。之後填滿新的葫蘆時，我們再見吧！");
        } else {
            cm.sendNextPrev("已經消耗葫蘆裡剩下的所有擊殺數量呢！\r\n現在這葫蘆已經沒有用了，所以我就拿去吧。之後填滿新的葫蘆時，我們再見吧！");
        }
    } else {
        cm.dispose();
    }
}