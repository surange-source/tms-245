var status = -1;
var slotType = -1;
var sSlot = "";
var nSlot = 4;

function start() {
    if (im.getItemQuantity(im.getItemId()) > 1) {
        im.sendYesNo("已經有很多個#t" + im.getItemId() + "#了耶。 這時會不管有效期限，直接使用最前面那一個道具，這樣也沒關係嗎？");
    } else {
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        if (status === -1) {
            im.sendNext("想要確認有效期限的話，就試著開啟物品欄吧。 寫在道具工具提示中。");
            im.dispose();
            return;
        } else if (status === 0) {
            im.dispose();
            return;
        } else if (status === 1) {
            im.sendNext("喳喳？" + sSlot + "不是擴充欄位的喔？");
            im.dispose();
            return;
        }
        status--;
    }

    if (status === 0) {
        im.sendSimple("好！ 我可以利用我的擴充券，來增加#b#e" + nSlot + "格#n#k欄位。 想擴充哪一種欄位？ 喔嘰？\r\n\r\n#L1# #e#b道具裝備欄！#n#k#l\r\n#L2# #e#b道具消耗欄！#n#k#l\r\n#L3# #e#b道具裝飾欄！#n#k#l\r\n#L4# #e#b道具其他欄！#n#k#l\r\n\r\n#L5# #e...讓我再苦惱一下。#n#l");
    } else if (status === 1) {
        if (selection === 5) {
            im.sendNext("嗚嘰？ 我知道了。嗚嘰嘰…");
            im.dispose();
            return;
        }
        if (slotType === -1) {
            slotType = selection;
        }
        var slot = 0 < slotType && slotType < 5 ? im.getInventory(slotType).getSlotLimit() : 128;
        switch (slotType) {
            case 1:
                sSlot = "裝備";
                break;
            case 2:
                sSlot = "消耗";
                break;
            case 3:
                sSlot = "裝飾";
                break;
            case 4:
                sSlot = "其他";
                break;
        }
        if (slot < 128) {
            im.sendYesNo(sSlot + "可以再增加" + nSlot + "格欄位。 其他要擴充欄位嗎？ " + sSlot + "是欄位嗎？");
        } else {
            im.sendNext("欄位已達到上限");
            im.dispose();
        }
    } else if (status === 1) {
        if (im.used()) {
            var slot = 0;
            switch (slotType) {
                case 1:
                case 2:
                case 3:
                case 4:
                    im.expandInventory(slotType, nSlot);
                    slot = im.getInventory(slotType).getSlotLimit();
                    break;
            }
            im.sendNext("成功了！ " + sSlot + "欄位增加了" + slot + "格呢？");
        }
        im.dispose();
    }
}