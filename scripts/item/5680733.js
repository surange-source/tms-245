var status = -1;
var maxSlot = 102;

function start() {
    im.sendYesNo("點擊接受時，可擴充1格美容相簿的整形欄位。\r\n\r\n要#e立即使用1個#t" + im.getItemId() + "#並擴充1格整形欄位嗎？#r#n\r\n\r\n（包含免費提供的3個欄位在內，欄位最多可使用" + maxSlot +"格。）");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == -2) {
        im.sendOk("如果您改變心意的話，隨時都可以再來找我。");
    } else if (status == i++) {
        var slot = im.getFaceSlot() + 1;
        if (slot > maxSlot) {
            im.sendOk("已經無法繼續擴充欄位了。");
        } else if (im.setFaceSlot(slot) && im.used()) {
            im.sendOk("已擴充1格整形欄位，可以繼續保管模特兒了~！");
        } else {
            im.sendOk("發生未知錯誤。");
        }
    } else {
        im.dispose();
    }
}