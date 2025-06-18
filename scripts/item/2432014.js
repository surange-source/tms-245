//女神之血滴
var status = 0;
var itemPosition=0;
//升級消耗的個數
var expendNum = 3;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (!im.haveItem(2432014, expendNum))
        {
            im.sendOk("你需要"+expendNum+"滴#b女神之血滴#k才可以進行神話耳環升級");
            im.dispose();
            return;
        }
        var itemList = im.getInventory(1).list().iterator();
        var text = "請選擇您要升級的耳環：\r\n";
        var indexof = 0;
        while(itemList.hasNext()) {
            var item = itemList.next();
            var flag = false;
            switch(item.getItemId()) {
                case 1032205: // 神話耳環 - (無描述)
                case 1032206: // 神話耳環復原第1階段 - (無描述)
                case 1032207: // 神話耳環復原第2階段 - (無描述)
                case 1032208: // 神話耳環復原第3階段 - (無描述)
                case 1032209: // 神話耳環復原第4階段 - (無描述)
                    flag = true;
                    break;
                //1032219 // 遺忘之神話耳環 - (無描述)
            }
            if (!flag)
                continue;
            if (indexof > 1 && indexof % 5 == 0) {
                text += "\r\n";
            }
            indexof++;
            text += "#L"+item.getPosition()+"##v"+item.getItemId()+"##l";
        }
        text+="\r\n\r\n#d升級成功率#r100%#k";
        if (indexof==0)
            text = "沒有可以進行升級的神話耳環";
        im.sendSimple(text);
    } else if (status == 1) {
        itemPosition = selection;
        itemId = im.getInventory(1).getItem(itemPosition).getItemId();
        var upgradeItemId = (itemId == 1032209) ? parseInt(itemId)+10 : parseInt(itemId)+1;
        im.removeSlot(1, itemPosition, 1);
        im.gainItem(upgradeItemId, 1);
        if (upgradeItemId == 1032219)
            im.worldSpouseMessage(0x15, "[神話耳環] : 恭喜 " + im.getChar().getName() + " 成功將 神話耳環復原第4階段 升級為 遺忘之神話耳環！");
        im.sendOk("恭喜你，得到了#v"+upgradeItemId+"#");
        im.gainItem(2432014, -expendNum);
        im.safeDispose();
    }
}