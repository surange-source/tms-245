//女神之淚
var status = 0;
var itemPosition=0;
//基礎成功率
var rate = 90;
//成功率的遞減值
var decreaseRate = 20;
//升級消耗的個數
var expendNum = 10;
var typed = 0;

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
        var text = "你想做什麼？\r\n";
        text+= "#b#L1#升級神話耳環#l\r\n";
        text+= "#b#L2#合成女神之血滴#l\r\n";
        im.sendSimple(text);
    } else if (status == 1) {
        if (selection == 1) {
            typed = 1;
            if (!im.haveItem(2432013, expendNum))
            {
                im.sendOk("你需要"+expendNum+"滴#b女神之淚#k才可以進行神話耳環升級");
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
            text+="\r\n\r\n#d不同復原程度升級時成功率不同，失敗時裝備不損壞";
            if (indexof==0)
                text = "沒有可以進行升級的神話耳環";
            im.sendSimple(text);
        } else if (selection == 2) {
            typed = 2;
            if (!im.haveItem(2432013, 100))
            {
                im.sendOk("你沒有#r100#k滴女神之淚，無法進行合成！");
                im.dispose();
                return;
            }
            im.sendYesNo("是否使用#r100#k滴#b女神之淚#k合成一個#r女神之血滴#k？");
        }
    } else if (status == 2) {
        if (typed == 1) {
            itemPosition = selection;
            itemId = im.getInventory(1).getItem(itemPosition).getItemId();
            if (itemId == 1032209) {
                im.sendOk("#b神話耳環復原第4階段#k需要#r女神之血滴#k才能進行升級.");
                im.dispose();
                return;
            }
            var chance = Math.floor(Math.random()*100);
            rate = rate-(Math.floor(itemId%1032200)-5)*decreaseRate;
            //java.lang.System.out.println(rate);
            if (chance <= rate) {
            //成功
                var upgradeItemId = (itemId == 1032209) ? parseInt(itemId)+10 : parseInt(itemId)+1;
                im.removeSlot(1, itemPosition, 1);
                im.gainItem(upgradeItemId, 1);
                if (upgradeItemId == 1032219)
                    im.worldSpouseMessage(0x15, "[神話耳環] : 恭喜 " + im.getChar().getName() + " 成功將 神話耳環復原第4階段 升級為 遺忘之神話耳環！");
                im.sendOk("恭喜你，得到了#v"+upgradeItemId+"#");
            } else {
            //失敗
                im.sendOk("真遺憾，升級失敗了。");
            }
            im.gainItem(2432013, -expendNum);
            im.safeDispose();
        } else if (typed==2) {
            im.gainItem(2432013, -100);
            im.gainItem(2432014, 1);
            im.sendOk("恭喜你獲得了一個#b#v2432014##t2432014##k。");
            im.safeDispose();
        }
    }
}