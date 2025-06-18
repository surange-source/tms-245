var status = 0;
var text;
var sel;
var credits;
var itemlist = new Array(
    // 禮包金額，道具ID，全屬性數值
    Array(10, 1112915, 1),        //藍調戒指
    Array(1000, 1112668, 10),    //傳說戒指
    Array(3000, 1012057, 10),    //透明面具
    Array(3000, 1022048, 10),    //透明眼飾
    Array(5000, 1112178, 20),    //夢幻雪景名片戒指
    Array(5000, 1112290, 20),    //夢幻雪景聊天戒指
    Array(10000, 1182140, 50),    //楓之谷潮流徽章
    Array(10000, 1003719, 50),    //進階精靈帽
    Array(10000, 1112012, 20)    //紅玫瑰戒指
    );
var hypay = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }

    if (status == 0) {
        credits = new Array();
        for (var i in itemlist) {
            var contain = false;
            for (var j in credits) {
                if (itemlist[i][0] == credits[j]) {
                    contain = true;
                }
            }
            if (!contain) {
                credits.push(itemlist[i][0]);
            }
        }
        hypay = im.getHyPay(3);
        text = "充點小錢玩玩吧。您當前儲值總額為：" + im.getHyPay(3) + "\r\n\r\n#b";
        for (var i in credits) {
            text += "#L" + i + "#查看" + credits[i] + "元禮包\r\n";
        }
        im.sendSimple(text);
    } else if (status == 1) {
        sel = selection;
        text = "以下是" + credits[sel] + "元禮包的內容：\r\n\r\n#r";
        for (var i in itemlist) {
            if (itemlist[i][0] == credits[sel]) {
                text += "#i" + itemlist[i][1] + "# #z" + itemlist[i][1] + "# 全屬性+" + itemlist[i][2] + "\r\n";
            }
        }
        text += "\r\n\r\n#b#L0#領取禮包#l";
        im.sendSimple(text);
    } else if (status == 2) {
        if (hypay < credits[sel]) {
            im.sendOk("您當前儲值總額不足" + credits[sel] + "元。");
            im.dispose();
            return;
        }
        if (im.getBossLogAcc("毛莫的口袋" + credits[sel] + "元禮包") == -1) {
            im.sendOk("您已經領取過該獎勵。");
            im.dispose();
            return;
        }
        if (im.getSpace(1) < getSize(credits[sel])) {
            im.sendOk("裝備欄空間不足" + getSize(credits[sel]) + "格");
            im.dispose();
            return;
        }

        var ii = im.getItemInfo();
        for (var i in itemlist) {
            if (itemlist[i][0] == credits[sel]) {
                var itemid = itemlist[i][1];
                var stat = itemlist[i][2];
                var toDrop = ii.randomizeStats(ii.getEquipById(itemid)).copy();
                toDrop.setStr(stat);
                toDrop.setDex(stat);
                toDrop.setInt(stat);
                toDrop.setLuk(stat);
                toDrop.setWatk(stat);
                toDrop.setMatk(stat);
                im.addFromDrop(im.getC(), toDrop, true);
            }
        }
        im.setBossLogAcc("毛莫的口袋" + credits[sel] + "元禮包", -2);
        im.sendOk("領取成功");
        im.worldSpouseMessage(0x20,"『毛莫的口袋』：玩家 "+ im.getChar().getName() +" 領取了" + credits[sel] + "元禮包！");
        im.dispose();
    }
}

function getSize(edu) {
    var ret = 0;
    for (var i in itemlist) {
        if (itemlist[i][0] == edu) {
            ret++;
        }
    }
    return ret;
}
