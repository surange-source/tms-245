/* global cm */

var status, str, select, list;
var setItemArrays = null;
var check = true;
var isAngel;
var isZero;
var isSecond = false;

function start() {
    isAngel = cm.getBeginner() == 6001;
    isZero = cm.getBeginner() == 10000;
    status = -1;
    select = -1;
    str = "";
    str += "================#e高級檢索工具#n================";
    str += "\r\n#L1#道具#l";
    str += "\r\n#L2#NPC#l";
    str += "\r\n#L3#地圖#l";
    str += "\r\n#L4#怪物#l";
    str += "\r\n#L5#任務#l";
    str += "\r\n#L6#技能#l";
    str += "\r\n#L13#V核心#l";
    str += "\r\n#L7#職業#l";
    str += "\r\n#L8#裝備套裝#l";
    str += "\r\n#L9#伺服器包頭#l";
    str += "\r\n#L10#用戶端包頭#l";
    str += "\r\n#L14#膚色#l";
    str += "\r\n#L11#髮型#l";
    str += "\r\n#L12#臉型#l";
    cm.sendSimple(str);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        if (status == 2) {
            status += 2;
            selection = -1
        } else {
            status--;
            cm.dispose();
            return;
        }
    }
    switch (status) {
        case 0:
            str = selection;
            cm.sendGetText("請輸入需要檢索的訊息:");
            break;
        case 1:
            switch (str) {
                case 11:
                case 12:
                case 14:
                    list = cm.getSearchData(str, cm.getText());
                    if (list === null) {
                        cm.sendOk("搜尋不到訊息");
                        cm.dispose();
                        return;
                    }
                    cm.sendStyle("", list, 0, false);
                    break;
                default:
                    cm.sendOk(cm.searchData(str, cm.getText()));
            }
            break;
        case 2:
            if (check && !cm.foundData(str, cm.getText())) {
                cm.dispose();
                return;
            }
            if (select === -1) {
                select = selection;
            }
            switch (str) {
                case 1:
                    if (select < 1000000) {
                        if (isAngel) {
                            cm.askAngelicBuster();
                        } else if (isZero) {
                            cm.sendSimple("請選擇要接受變更的角色.#b\r\n\r\n#b#L0#神之子阿爾法#l\r\n#L1#神之子蓓塔#l\r\n#L2#神之子阿爾法 + 神之子蓓塔#l");
                        } else {
                            action(1, 0, 0);
                        }
                    } else if (select < 2000000) {
                        if (cm.canHold(select)) {
                            cm.getItem("高級檢索", select, 1);
                        }
                        cm.dispose();
                    } else if (select >= 5000000 && select < 5010000) {
                        cm.sendYesNo("選中的寵物為#i" + select + ":# #z" + select + "#\r\n是否需要自定義生命時間(不設定則根據原道具時間給)?");
                    } else {
                        cm.sendGetNumber("選中的道具為#i" + select + ":# #z" + select + "#\r\n請輸入製作數量:", 1, 1, 32767);
                    }
                    break;
                case 2:
                    cm.dispose();
                    cm.playerMessage(5, "打開NPC,ID:" + select);
                    cm.openNpc(select);
                    break;
                case 3:
                    cm.playerMessage(5, "傳送到地圖,ID:" + select);
                    cm.warp(select, 0);
                    cm.dispose();
                    break;
                case 4:
                    cm.sendGetNumber("選中的怪物為#o" + select + "#\r\n請輸入召喚數量:", 1, 1, 100);
                    break;
                case 5:
                    cm.sendSimple("選中的任務ID為" + select + "\r\n請選擇需要執行的操作:\r\n#L0#開始任務#l\r\n#L1#完成任務#l");
                    break;
                case 6:
                    cm.sendGetNumber("選中的技能ID為" + select + "\r\n請輸入使用等級:", 1, 0, 30);
                    break;
                case 13:
                    cm.sendGetNumber("選中的V核心ID為" + select + "\r\n請輸入製作數量:", 1, 1, 200);
                    break;
                case 7:
                    cm.playerMessage(5, "轉職,職業代碼:" + select);
                    cm.changeJob(select);
                    cm.dispose();
                    break;
                case 8:
                    setItemArrays = cm.getSetItems(select);
                    var sel = "";
                    for (var num = 0 ; num < setItemArrays.length ; num++) {
                        var i = setItemArrays[num];
                        sel += "\r\n#L" + i + "##i" + i + ":# #z" + i + "#(" + i + ")#l";
                    }
                    cm.sendSimple("選中的套裝ID為" + select + sel);
                    str = 1;
                    status = 1;
                    select = -1;
                    check = false;
                    break;
                case 9:
                case 10:
                    cm.dispose();
                    break;
                case 11:
                case 12:
                case 14:
                    if (isAngel) {
                        cm.askAngelicBuster();
                    } else if (isZero) {
                        cm.sendSimple("請選擇要接受變更的角色.#b\r\n\r\n#b#L0#神之子阿爾法#l\r\n#L1#神之子蓓塔#l\r\n#L2#神之子阿爾法 + 神之子蓓塔#l");
                    } else {
                        action(1, 0, 0);
                    }
                    break;
                default:
                    cm.dispose();
            }
            break;
        case 3:
            switch (str) {
                case 1:
                    if (select < 1000000) {
                        if (isAngel) {
                            if (selection == -1) {
                                cm.dispose();
                                return;
                            }
                            isSecond = selection != 0;
                        } else if (isZero) {
                            isSecond = selection == 1;
                        }
                        cm.setAvatar(select, isSecond);
                        if (isZero && selection == 2) {
                            cm.setAvatar(select, true);
                        }
                        cm.dispose();
                    } else if (select < 2000000) {
                        if (cm.canHold(select)) {
                            cm.getItem("高級檢索", select, 1);
                        }
                    } else if (select >= 5000000 && select < 5010000) {
                        cm.sendGetNumber("選中的寵物為#i" + select + ":# #z" + select + "#\r\n請輸入生命時間(天 0為永久):", 1, 0, 365);
                        return;
                    } else {
                        if (cm.canHold(select)) {
                            cm.getItem("高級檢索", select, selection);
                        }
                    }
                    cm.dispose();
                    break;
                case 4:
                    cm.spawnMonster(select, selection);
                    cm.dispose();
                    break;
                case 5:
                    cm.dispose();
                    switch (selection) {
                        case 0:
                            cm.forceStartQuest(select);
                            break;
                        case 1:
                            cm.forceCompleteQuest(select);
                            break;
                    }
                    break;
                case 6:
                    cm.useSkill(select, selection);
                    cm.dispose();
                    break;
                case 13:
                    cm.gainVCoreSkill(select, selection);
                    cm.dispose();
                    break;
                case 11:
                case 12:
                case 14:
                    if (str == 14) {
                        cm.playerMessage(5, "更變膚色, 膚色代碼:" + list[select]);
                    } else {
                        var type = str == 11 ? "髮型" : str == 12 ? "臉型" : "膚色";
                        cm.playerMessage(5, "更變" + type + "為 " + cm.getItemName(list[select]) + "(" + list[select] + ")");
                    }
                    if (isAngel) {
                        if (selection == -1) {
                            cm.dispose();
                            return;
                        }
                        isSecond = selection != 0;
                    } else if (isZero) {
                        isSecond = selection == 1;
                    }
                    cm.setAvatar(select, isSecond);
                    if (isZero && selection == 2) {
                        cm.setAvatar(select, true);
                    }
                    cm.dispose();
                    break;
                default:
                    cm.dispose();
            }
        case 4:
            switch (str) {
                case 1:
                    if (select >= 5000000 && select < 5010000) {
                        if (cm.canHold(select)) {
                            cm.getItem("高級檢索", select, 1, selection);
                        }
                    }
                    cm.dispose();
                    break;
                default:
                    cm.dispose();
            }
        default:
            cm.dispose();
    }
}