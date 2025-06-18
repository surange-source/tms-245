/*
裝備出售
 */
var icon0 = "#fUI/Basic.img/VScr7/enabled/thumb0#";//小圖標
var icon1 = "#fUI/ChatBalloon.img/pet/16/nw#";//小黃雞
var icon2 = "#fUI/ChatBalloon.img/pet/16/ne#";//小黃雞
var icon3 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/7#";//發呆
var icon4 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/6#";//憤怒
var icon5 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/3#";//大笑
var icon6 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/1#";//大笑
var status;
var text;
var itemList = new Array();
var inventoryType;
var deleteSlot;
var deleteQuantity;
var typed=0;
var beDeletedArr = new Array();
var listq = Array(
    2, 5, 10
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
            var txt = "#e#b\t\t\t\t　道具分解中心#k#n\r\n\r\n";
            txt += icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + "\r\n";
            txt += "　　　　 #d#L0#" + icon3 + " 分解說明    [ #r新手必看#d ]  " + icon3 + "#l#k\r\n";
            txt += "　　　　 #d#L1#" + icon6 + " 單項分解  [ #r□140-149□#d ] " + icon6 + "#l#k\r\n";
            //txt += "　　　　 #d#L3#" + icon3 + " 一鍵分解  [ #r□140-149□#d ] " + icon3 + "#l#k\r\n";
            //txt += "　　　　 #d#L2#" + icon4 + " 一鍵分解  [ #r□120-139□#d ] " + icon4 + "#l#k\r\n";
            txt += "　　　　 #d#L1000#" + icon6 + " 方塊回收 [ #r□楓點回收□#d ] " + icon6 + "#l#k\r\n";
            txt += "　　　　 #d#L1001#" + icon6 + " 石頭兌換 [ #r□換成百萬□#d ] " + icon6 + "#l#k\r\n";
            txt += "　　　　 #d#L999#" + icon3 + " FFN回收  [ #r□樂豆點回收□#d ] " + icon3 + "#l#k\r\n\r\n";
            //txt += "　　　　 #d#L1000#" + icon6 + " 埃蘇分解 [ #r□樂豆點回收□#d ] " + icon6 + "#l#k\r\n\r\n";
            //txt += "　　　　 #d#L3#" + icon5 + " 回購道具 [ #r□道具□#d ] " + icon5 + "#l#k\r\n";
            
            txt += icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + icon1 + icon2 + "\r\n\r\n";
            cm.sendSimpleS(txt, 2);
        } else if (status == 1) {
            switch (selection) {
                case 0:
                    text = icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + "\r\n";
                    text += icon6 + "　　　　　　　　　　　　　　　　　　　　　　　　" + icon6 + "\r\n";
                    text += icon6 + "　　　　　　#b分解說明 -  仔細閱讀 #k　　　　　　　 " + icon6 + "\r\n";
                    text += "     #d[120] 到 [139] 一鍵分解 #r予#d2個#v4001839#和2個#v4001713#   \r\n";
                    text += "     #d[140] 到 [149] 一鍵每件 #r予#d5個#v4001839#和5個#v4001713#   \r\n";
                    text += "     #d[140] 到 [149] 單項分解 #r予#d5個#v4001839#和5個#v4001713#   \r\n";
                    text += icon6 + "#d       每分解一個法弗納武器可獲得10W樂豆點        " + icon6 + "\r\n";
                    //text += icon6 + " #d每分解一個AS武器可獲得30W樂豆點  \t          " + icon6 + "\r\n";
                    //text += icon6 + " #e#r註：#z4000082#是製作FFN防具材料！\t    " + icon6 + "\r\n";
                    text += icon6 + "　　　　　　　　　　　　　　　　　　　　　　    " + icon6 + "\r\n";
                    text += icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + icon6 + "\r\n";
                    cm.sendOkS(text, 2);
                    status = -1;
                    break;
                    case 999:
                    cm.dispose();
                                            cm.openNpc(2470018,"huandian");
                    break;
                    case 1000:
                    cm.dispose();
                                            cm.openNpc(2470018,"huishou1");
                    break;
                    case 1001:
                    cm.dispose();
                                            cm.openNpc(2470018,"huishou2");
                    break;
                case 1:
                    inventoryType = 1;
                    var list = cm.getInventory(inventoryType).list();
                    itemList = list.iterator();
                    text = "\t\t#e- 請選擇要出售的裝備 -#n\r\n\r\n#b";
                    var indexof = 1;
                    var newItemList = Array();
                    while (itemList.hasNext()) {
                        var item = itemList.next();
                        if (cm.isCash(item.getItemId()))
                            continue;
                        var reqLevel = cm.getReqLevel(item.getItemId());
                        if (reqLevel < 140  ||  reqLevel > 149)
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
                        if (item.getItemId() >= 1202001 && item.getItemId() <= 1202220 )
                            continue;
                            if (item.getItemId() == null)
                {
                    cm.sendOk("選擇的裝備錯誤，請重新對話。");
                    cm.dispose();
                    return;
                }

                        var reqLevel = cm.getReqLevel(item.getItemId());
                        if (reqLevel >= 120 && reqLevel <140) {
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
                    cm.sendSimple(text);
                break;
                case 3:
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
                        if (item.getItemId() >= 1202001 && item.getItemId() <= 1202220 )
                            continue;
                        if (item == null)
                            continue;

                        var reqLevel = cm.getReqLevel(item.getItemId());
                        if (reqLevel >= 140 && reqLevel <149) {
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
                    typed=3;
                    cm.sendSimple(text);
                break;
            }
        } else if (status == 2) {
            if (typed==1) {
                var item = cm.getInventory(inventoryType).getItem(selection);
                if (item == null)
                {
                    cm.sendOk("選擇的裝備錯誤，請重新對話。");
                    cm.dispose();
                    return;
                }
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
                cm.sendSimple(text);
            } else if (typed==2) {
                itemq=2;
                var count = beDeletedArr.length*itemq;
                for(var key in beDeletedArr) {
                    cm.removeSlot(1, beDeletedArr[key], 1);
                }
                cm.gainItem(4001839, count);
                cm.gainItem(4001713, count);
                text="分解成功，獲得了#v4001839#和#v4001713#每種"+count+"個";
                cm.sendOk(text);
                cm.dispose();
                } else if (typed==3) {
                itemq=5;
                var count = beDeletedArr.length*itemq;
                for(var key in beDeletedArr) {
                    cm.removeSlot(1, beDeletedArr[key], 1);
                }
                cm.gainItem(4001839, count);
                cm.gainItem(4001713, count);
                text="分解成功，獲得了#v4001839#和#v4001713#每種"+count+"個";
                cm.sendOk(text);
                cm.dispose();
            }
        } else if (status == 3) {
            if (typed==1) {
                cm.removeSlot(inventoryType, deleteSlot, deleteQuantity);
                cm.gainItem(4001713, itemq);
                cm.gainItem(4001839, itemq);
                text="分解成功，獲得了#v4001839#和#v4001713#每種"+itemq+"個";
                cm.sendOk(text);
                cm.dispose();
            }
        }
    }
}

function getType(reqLevel) {
    if (reqLevel >= 130 && reqLevel < 139) {
        return listq[0];
    } else if (reqLevel >= 140 && reqLevel < 149) {
        return listq[1];
    } else if (reqLevel >= 150 && reqLevel < 159) {
        return listq[2];
    } else {
        return 0;
    }
}