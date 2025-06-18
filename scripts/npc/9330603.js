/*
裝備出售
 */

var status;
var text;
var itemList = new Array();
var inventoryType;
var deleteSlot;
var deleteQuantity;
var typed=0;
var beDeletedArr = new Array();
var listq = Array(
    2, 5, 20
);
var itemq = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            text = "您好，在我這裡可以直接分解130~200的裝備，分解裝備可以獲得#v2435824#\r\n打開後可隨機獲得:#v4310210##v5062009##v4000313##v2049606##v2614000#。\r\n\r\n";
            text += "#b#L0#瞭解分解說明#l\r\n";
            text += "#b#L1#我要分解裝備#l\r\n";
            text += "#b#L2#一鍵分解130~139裝備#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1){
            if (selection == -1)
                selection = 1;
            switch(selection) {
                case 0:
                    text = "#e#d分解說明#n#k：\r\n";
                    text += "130-139裝備分解後可獲得#v2435824#*2\r\n";
                    //text += "140-159裝備分解後可獲得8個#v2435824#\r\n";
                    text += "140-180裝備分解後可獲得#v2435824#*8\r\n";
                    cm.sendOk(text);
                    cm.dispose();
                break;
                case 1:
                    inventoryType = 1;
                    var list = cm.getInventory(inventoryType).list();
                    itemList = list.iterator();
                    text = "\t\t#e- 請選擇要分解的裝備 -#n\r\n\r\n#b";
                    var indexof = 1;
                    var newItemList = Array();
                    while (itemList.hasNext()) {
                        var item = itemList.next();
                        if (cm.isCash(item.getItemId()))
                            continue;
                        var reqLevel = cm.getReqLevel(item.getItemId());
                        if (reqLevel < 140 || reqLevel > 180)
                            continue;
                        newItemList[item.getPosition()]=item.getItemId();
                    }
                    for(var key in newItemList) {
                        text += "#L" + key + "##v" + newItemList[key] + "#";
                        if (indexof > 1 && indexof % 5 == 0) {
                            text += "\r\n";
                        }
                        indexof++;
                    }
                    typed=1;
                    cm.sendSimple(text);
                break;
                case 2:
                    inventoryType = 1;
                    var list = cm.getInventory(inventoryType).list();
                    itemList = list.iterator();
                    text = "\t\t#e- 以下是準備分解的裝備,請核對仔細 -#n\r\n\r\n#b";
                    var indexof = 1;
                    var newItemList = Array();
                    while (itemList.hasNext()) {
                        var item = itemList.next();
                        if (cm.isCash(item.getItemId()))
                            continue;
                        var reqLevel = cm.getReqLevel(item.getItemId());
                        if (reqLevel >= 130 && reqLevel <140) {
                            newItemList[item.getPosition()]=item.getItemId();
                            beDeletedArr.push(item.getPosition());
                        }
                    }
                    for(var key in newItemList) {
                        text += "#v" + newItemList[key] + "#";
                        if (indexof > 1 && indexof % 5 == 0) {
                            text += "\r\n";
                        }
                        indexof++;
                    }
                    text+="\r\n#r#e分解操作不可逆，請確認是否要分解以上裝備？#n#k";
                    typed=2;
                    cm.sendYesNo(text);
                break;
            }
        } else if (status == 2) {
            if (typed==1) {
                var item = cm.getInventory(inventoryType).getItem(selection);
                deleteSlot = selection;
                deleteQuantity = item.getQuantity();
                var reqLevel = cm.getReqLevel(item.getItemId());
                itemq = getType(reqLevel);
                if (cm.getSpace(4)<2) {
                    cm.sendOk("其他欄格子不足，請整理後分解。");
                    cm.dispose();
                    return ;
                }
                text = "#e確定要分解#r#v" + item.getItemId() + "##z" + item.getItemId() + "# " + deleteQuantity + "個 #k嗎？#k";
                cm.sendNextPrev(text);
            } else if (typed==2) {
                itemq=getType(130);
                var count = beDeletedArr.length*itemq;
                for(var key in beDeletedArr) {
                    cm.removeSlot(1, beDeletedArr[key], 1);
                }
                cm.gainItem(2435824, count);
                text="分解成功，獲得了#v2435824#"+count+"個";
                cm.sendOk(text);
                cm.dispose();
            }
        } else if (status == 3) {
            if (typed==1) {
                cm.removeSlot(inventoryType, deleteSlot, deleteQuantity);
                cm.gainItem(2435824, 8);
                text="分解成功，獲得了#v2435824# 8個";
                cm.sendOk(text);
                cm.dispose();
            }
        }
    }
}

function getType(reqLevel) {
    if (reqLevel >= 130 && reqLevel < 139) {
        return listq[0];
    } else if (reqLevel >= 140 && reqLevel < 159) {
        return listq[1];
    } else if (reqLevel >= 140 && reqLevel < 180) {
        return listq[2];
    } else {
        return 0;
    }
}