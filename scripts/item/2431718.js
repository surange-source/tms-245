status = -1;
position = Array();
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("不想使用嗎？");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
    im.getEquipBySlot(1);
    im.dispose();
    return;
        im.sendSimple("我能為你穿戴在身上的裝備附魔，增加你的戰鬥力！\r\n#b#L1#玩法說明#l\r\n#L2#開始附魔#l\r\n");
    } else if (status == 1) {
        if (selection==1) {
            status=-1;
            var text="附魔能夠隨機為你穿戴在身上的裝備進行#r1-3#k點的屬性值加成，能夠加成的屬性值有#b力、敏、智、運、攻擊、魔攻、防禦、魔防、命中值、迴避值、HP、MP#k，附魔時請保證身上穿戴的裝備超過15件（包含15件）。";
            im.sendSimple(text);
        } else {
            var list = im.getInventory(-1).list();
            var itemList = list.iterator();
            while (itemList.hasNext()) {
                var item = itemList.next();
                if (im.isCash(item.getItemId()))
                    continue; //過濾點裝
                position.push(item.getPosition());
            }
            if (im.getPQLog("裝備附魔") >= 30) {
                im.sendOk("裝備附魔每天只能進行30次，您今天已經沒有次數繼續附魔了。");
                im.dispose();
                return ;
            }
            if (position.length<1) {
                im.sendOk("身上的裝備少於15件，無法進行附魔！");
                im.dispose();
                return ;
            }
            im.sendYesNo("附魔成功的裝備將會被脫放到#e#b裝備欄#n#k，附魔操作無法還原。\r\n\r\n#d是否繼續附魔？");
        }
    } else {
        var ii = im.getItemInfo();
        var pos = Math.floor(Math.random()*position.length);
        var item = im.getInventory(-1).getItem(position[pos]);
        var toDrop = item.copy();
        var attrName = "";
        var attr = Math.floor(Math.random()*12);
        var upgradeNum = Math.floor(Math.random()*3+1);
        switch(attr) {
            case 0:
                toDrop.setStr(item.getStr()+upgradeNum);
                attrName = "力量";
                break;
            case 1:
                toDrop.setDex(item.getDex()+upgradeNum);
                attrName = "敏捷";
                break;
            case 2:
                toDrop.setInt(item.getInt()+upgradeNum);
                attrName = "智力";
                break;
            case 3:
                toDrop.setLuk(item.getLuk()+upgradeNum);
                attrName = "運氣";
                break;
            case 4:
                toDrop.setHp(item.getHp()+upgradeNum);
                attrName = "HP";
                break;
            case 5:
                toDrop.setMp(item.getMp()+upgradeNum);
                attrName = "MP";
                break;
            case 6:
                toDrop.setWatk(item.getWatk()+upgradeNum);
                attrName = "攻擊力";
                break;
            case 7:
                toDrop.setMatk(item.getMatk()+upgradeNum);
                attrName = "魔法力";
                break;
            case 8:
                toDrop.setWdef(item.getWdef()+upgradeNum);
                attrName = "防禦力";
                break;
            case 9:
                toDrop.setMdef(item.getMdef()+upgradeNum);
                attrName = "魔法防禦力";
                break;
            case 10:
                toDrop.setAcc(item.getAcc()+upgradeNum);
                attrName = "命中值";
                break;
            case 11:
                toDrop.setAvoid(item.getAvoid()+upgradeNum);
                attrName = "迴避值";
                break;
        }
        im.removeSlot(-1, position[pos], 1)
        im.addFromDrop(im.getC(), toDrop, true);
        im.setPQLog("裝備附魔");
        var text = "恭喜你，成功使#v"+item.getItemId()+"#增加了#r"+upgradeNum+"#k點#b"+attrName+"#k，請打開背包#e#b裝備欄#n#k查看並自行穿戴。";
        im.sendOk(text);
        im.remove(1);
        im.dispose();
    }
}