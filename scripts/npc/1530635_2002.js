var status = 0;
//被選擇的裝備列表
var selectedList = Array();
//篩選後的背包裝備列表
var newItemList = Array();
var itemBorder = "#fUI/UIWindow.img/Item/New/inventory/0#";
var itemMaster = "#fUI/UIWindow.img/Item/activeExpChairIcon#"
var itemIcon = "#fUI/Basic.img/Cursor/32/0#";
var numArr = Array(
        "#fUI/Basic.img/LevelNo/0#",
        "#fUI/Basic.img/LevelNo/1#",
        "#fUI/Basic.img/LevelNo/2#",
        "#fUI/Basic.img/LevelNo/3#",
        "#fUI/Basic.img/LevelNo/4#",
        "#fUI/Basic.img/LevelNo/5#",
        "#fUI/Basic.img/LevelNo/6#",
        "#fUI/Basic.img/LevelNo/7#",
        "#fUI/Basic.img/LevelNo/8#",
        "#fUI/Basic.img/LevelNo/9#"
        );
var btnOk = "#fUI/CashShop.img/CSCoupon/BtOK/normal/0#";
var btnOk_disabled = "#fUI/CashShop.img/CSCoupon/BtOK/disabled/0#";
var startIcon = "#fUI/Basic.img/icon/arrow#";
//裝備槽順序
var selectedPosition = 0;
//標記位
var step = 0;
//成功率
var successRate = 0;
//費用
var cost = 0;
var haveLuck = false;
var useLuck = false;
var sflag = false;
//裝備等級
var grade = Array(
        "★普通★",
        "★精緻★",
        "★無暇★",
        "★靈動★",
        "★純潔★",
        "★完美★",
        "★神聖★"
        );
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (haveLuck && mode == 0) {
            useLuck = false;
            status = 0;
            mode = 1;
        } else if (haveLuck && mode == 1) {
            useLuck = true;
        }
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 0 && status == -1) {
            cm.dispose();
            return;
        }
        //如果擁有黃金魚，並且點了否

        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (step == 1) {
                //清除副裝備
                if (selectedPosition == 0)
                    selectedList.splice(0, 4);
                //加入到被選裝備列表
                if (selection != -1)
                    selectedList[selectedPosition] = Array(selection, newItemList[selection]);
                //重置標記
                step = 0;
                //計算成功率
                successRate = getSuccessRate();
                //計算費用
                cost = getCost();
            }
            var text = "#e┌\t\t     ─ " + itemIcon + "裝備強化 ─   \t\t\t┐#n\r\n\r\n";
            for (var i = 0; i < 5; i++) {
                if (selectedList[i] != null)
                    text += "#L" + i + "##v" + selectedList[i][1] + "##l";
                else
                if (i == 0)
                    text += "#L" + i + "#" + itemMaster + "#l";
                else
                    text += "#L" + i + "#" + itemBorder + "#l";
            }
            text += "#e\r\n\r\n\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
            //顯示已經選擇的裝備信息
            if (selectedList.length >= 1) {
                text += "#k\r\n#e┌\t\t     ─ 已經選擇的裝備信息 ─   \t\t┐#n\r\n\r\n";
                for (var key in selectedList) {
                    var item = cm.getInventory(1).getItem(selectedList[key][0]);
                    var owner = item.getOwner();
                    var flag = 0;
                    for (var i = 0; i < grade.length; i++) {
                        if (owner == grade[i])
                            break;
                        flag++;
                    }
                    if (flag >= grade.length)
                        owner = grade[0];
                    var itemSeq = "主";
                    if (key >= 1)
                        itemSeq = "#k副";
                    var itemLevel = item.getLevel();
                    var itemLevelStr = "";
                    if (itemLevel != 0)
                        itemLevelStr = " (+" + itemLevel + ")";
                    text += "\t" + itemSeq + ": #r[" + owner + "]#n Lv." + cm.getReqLevel(item.getItemId()) + " #d#e" + cm.getItemName(item.getItemId()) + "#n" + itemLevelStr + "\r\n";
                }
                text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
            }
            //顯示計算後的合成成功率以及所需要的費用
            text += "\r\n#b" + startIcon + " 強化成功率：" + successRate + "%\t\t\t" + startIcon + " 所需費用：" + cost + "樂豆點\r\n";
            //顯示確定按鈕
            var lastBtn = btnOk_disabled;
            if (selectedList.length >= 2) {
                lastBtn = btnOk;
            }
            text += "#k\t\t\t\t#L999##d#e" + lastBtn + "#l\r\n\r\n";
            //操作幫助
            text += "#k\r\n#e┌\t\t\t     ─ 操作幫助 ─   \t\t\t┐#n\r\n";
            text += "\t#b" + numArr[1] + " 合成前，請先仔細閱讀合成說明。\r\n\t" + numArr[2] + " 第一個位置選擇需要提升品級的主裝備。\r\n\t#r" + numArr[3] + " 如果主裝備變動，副裝備需要重新選擇。\r\n\t" + numArr[4] + " 選擇裝備時，裝備的排列順序是依據背包裡的順序。\r\n\t" + numArr[5] + " 選擇結束後，點擊「確認」進行裝備合成#k";
            text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";
            cm.sendSimple(text);
        } else if (status == 1) {
            //裝備合成邏輯運算
            if (sflag)
                selection = 999;
            if (selection == 999) {
                sflag = true;
                if (selectedList.length < 2) {
                    cm.sendPrev("無法合成，請至少放入一件副裝備");
                } else {
                    if (cm.haveItem(4000517) && !haveLuck) {
                        status = 0;
                        haveLuck = true;
                        cm.sendYesNo("您的背包中擁有#v4000517##b黃金魚#k道具，是否使用#b黃金魚#k將成功率提升至#b#e" + (successRate + 15) + "%#n#k？\r\n\r\n#d#e選擇否則以#r" + successRate + "%#d的成功率繼續強化。#n#k");
                    } else {
                        if (cm.getPlayer().getCSPoints(1) < cost) {
                            cm.sendOk("您的樂豆點不足");
                            cm.dispose();
                            return;
                        }
                        //主裝備信息
                        var masterItemId = selectedList[0][1];
                        var masterItemPosition = selectedList[0][0];
                        var masterItemReqLevel = cm.getReqLevel(masterItemId);
                        //裝備將提升的品級
                        var nextGrade = Math.floor(getGrade(masterItemPosition)) + 1;
                        if (nextGrade >= (grade.length)) {
                            cm.sendOk("您的裝備已經達到最高品級，無法再進行合成。");
                            cm.dispose();
                            return;
                        }
                        //活躍
                        cm.finishActivity(120114);
                        //扣除費用
                        cm.gainNX(1, -cost);
                        //合成失敗
                        var chance = Math.floor(Math.random() * 100);
                        successRate = (useLuck) ? successRate + 15 : successRate;
                        if (useLuck) {
                            cm.gainItem(4000517, -1);
                        }
                        if (chance > successRate) {
                            var indexof = 0;
                            for (var key in selectedList) {
                                if (key == 0)
                                    continue;
                                var breakRate = Math.floor(Math.random() * 100);
                                if (breakRate <= 50) {
                                    indexof++;
                                    cm.removeSlot(1, selectedList[key][0], 1);
                                }
                            }
                            var text = "慶幸的是，副裝備都還在~繼續努力吧！";
                            if (indexof > 0)
                                text = "#r" + indexof + "#k件副裝備消失了，別灰心，後面的日子還長呢！";
                            cm.sendOk("真不辛，合成失敗了。" + text);
                            cm.dispose();
                            return;
                        }
                        //合成成功部分
                        var item = cm.getInventory(1).getItem(masterItemPosition);
                        var ii = cm.getItemInfo();
                        var toDrop = item.copy();
                        //裝備攻擊力增幅計算
                        var atkPoints = nextGrade * Math.round((masterItemReqLevel / 30));
                        //設置裝備屬性
                        toDrop.setOwner(grade[nextGrade]);
                        toDrop.setStr(item.getStr() + nextGrade);
                        toDrop.setDex(item.getDex() + nextGrade);
                        toDrop.setInt(item.getInt() + nextGrade);
                        toDrop.setLuk(item.getLuk() + nextGrade);
                        toDrop.setWatk(item.getWatk() + atkPoints);
                        toDrop.setMatk(item.getMatk() + atkPoints);
                        for (var key in selectedList) {
                            cm.removeSlot(1, selectedList[key][0], 1)
                        }
                        cm.addFromDrop(cm.getC(), toDrop, false);
                        var text = "#b力量#r+" + nextGrade + "\r\n";
                        text += "#b敏捷#r+" + nextGrade + "\r\n";
                        text += "#b智力#r+" + nextGrade + "\r\n";
                        text += "#b運氣#r+" + nextGrade + "\r\n";
                        text += "#b攻擊力#r+" + atkPoints + "\r\n";
                        text += "#b魔法力#r+" + atkPoints + "\r\n";
                        cm.sendOk("#r#e強化成功！#n#k本次強化為您的裝備#d[#v" + masterItemId + "#]#k提升了\r\n#k" + text);
                        sflag = false;
                        if (nextGrade > 3)
                            cm.worldMessageItem("[裝備合成] : " + "恭喜[" + cm.getPlayer().getName() + "]合成出 " + grade[nextGrade] + "的 " + cm.getItemName(masterItemId), toDrop);
                        //cm.worldSpouseMessage(0x15, "[裝備合成] : 恭喜 " + cm.getChar().getName() + " 合成出 " + grade[nextGrade] + "的 "+cm.getItemName(masterItemId));
                        cm.dispose();
                    }
                }
            } else {
                //選擇裝備過程
                selectedPosition = selection;
                if (selectedPosition != 0 && selectedList[0] == null) {
                    cm.sendPrev("請先選擇主裝備！");
                } else {
                    inventoryType = 1;
                    var list = cm.getInventory(inventoryType).list();
                    var itemList = list.iterator();
                    text = "#e經過篩選，以下為所有符合強化合成條件的#r副裝備#n\r\n\r\n#b";
                    if (selectedPosition == 0) {
                        text = "#e#d請選擇需要進行強化合成的#r主裝備：#n\r\n\r\n#b";
                    }
                    var indexof = 1;
                    newItemList = new Array();
                    while (itemList.hasNext()) {
                        var item = itemList.next();
                        cm.getPlayer().dropMessage(0, item)
                        //過濾現金裝備
                        if (cm.isCash(item.getItemId()))
                            continue;
//                        // 過濾不能參與合成部位
//                        if (getItemType(item.getItemId()) == -1)
//                            continue;
                        //過濾小於50級的裝備
                        var getViceReqLevel = cm.getReqLevel(item.getItemId());
                        if (getViceReqLevel < 50)
                            continue;
//                        //過濾等級差裝備
//                        if (selectedPosition != 0) {
//                            var getMasterReqLevel = cm.getReqLevel(selectedList[0][1]);
//                            var getMasterGrade = getGrade(selectedList[0][0]);
//                            var getViceGrade = getGrade(item.getPosition());
//                            if (getViceGrade < getMasterGrade)
//                                continue;
//                            var levelDifference = (getMasterReqLevel - getViceReqLevel);
//                            //過濾等級差
//                            if (levelDifference > 10 || levelDifference < -10)
//                                continue;
//                            var getMasterItemType = getItemType(selectedList[0][1]);
//                            //過濾品級
//                            var getViceItemType = getItemType(item.getItemId());
//                            if (getMasterItemType != getViceItemType)
//                                continue;
//                        }
                        //過濾已選裝備
                        var flag = 0;
                        for (var key in selectedList) {
                            if (item.getPosition() == selectedList[key][0])
                            {
                                flag = 1;
                                break;
                            }
                        }
                        if (flag == 1)
                            continue;
                        newItemList[item.getPosition()] = item.getItemId();

                    }
                    var xx = 0;
                    for (var key in newItemList) {
                        xx++;
                        text += "#L" + key + "##v" + newItemList[key] + "#";
                        if (indexof > 1 && indexof % 5 == 0) {
                            text += "\r\n";
                        }
                        indexof++;
                    }
                    status = -1;
                    step = 1;
                    if (xx <= 0) {
                        text = "#r沒有可以進行合成的副裝。#k"
                    }
                    cm.sendSimple(text);
                }
            }
        }
    }
}
//獲取裝備類型
function getItemType(itemid) {
    var type = Math.floor(itemid / 10000);
    switch (type) {
        case 100:
            return 0;  //帽子
        case 104:
            return 1;  //上衣
        case 105:
            return 2;  //套裝
        case 106:
            return 3;  //褲裙
        case 107:
            return 4;  //鞋子
        case 108:
            return 5;  //手套
        case 110:
            return 6;  //披風
        default:
            if (type == 120)
                return -1;
            if (type == 135)
                return -1;
            var type = Math.floor(type / 10);
            if (type == 12 || type == 13 || type == 14 || type == 15 || type == 17) {
                return 7;  //武器
            }
            return -1;
    }
}
//計算成功率
function getSuccessRate() {
    var count = 0;
    for (var key in selectedList) {
        if (selectedList[key] != null && selectedList[key] != "")
            count++;
    }
    switch (count) {
        case 2:
            return 24;
        case 3:
            return 36;
        case 4:
            return 58;
        case 5:
            return 85;
        default:
            return 0;
    }
}
//計算費用
function getCost() {
    //裝備的數量*主裝備等級*品級+1
    var itemTotalReqLevel = 0;
    for (var i in selectedList) {
        //java.lang.System.out.println("xx:"+selectedList[i][1]);
        itemTotalReqLevel += cm.getReqLevel(selectedList[i][1]) * 1;
    }
    var baseCost = (itemTotalReqLevel) + cm.getReqLevel(selectedList[0][1]) * (parseInt(getGrade(selectedList[0][0])) + 1) * 2;
    return baseCost;
}
//獲取裝備品級
function getGrade(equipPosition) {
    if (equipPosition != null) {
        var item = cm.getInventory(1).getItem(equipPosition);
        var itemGrade = item.getOwner();
        if (itemGrade == null || itemGrade == "")
            return 0;
        for (var k in grade) {
            if (itemGrade == grade[k])
                return k;
        }
    }
    return 0;
}