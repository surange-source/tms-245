var status = 0;
var skinId;
var oldSkinId;
var oldSkinItemID;

function start() {
    var ii = im.getItemInfo();
    skinId = ii.getDamageSkinBox().get(im.getItemId());
    oldSkinId = im.getCustomData(7291);
    if (oldSkinId != null && oldSkinId.equals(skinId.toString())) {
        im.topMsg("無法重複使用相同傷害皮膚道具" + oldSkinId + skinId);
        im.dispose();
        return;
    }
    if (oldSkinId == null) {
        oldSkinId = 0;
    }
    oldSkinItemID = ii.getDamageSkinItemId(oldSkinId);
    if (oldSkinItemID == -1) {
        im.sendOk("發生未知錯誤");
        im.dispose();
        return;
    }
    im.askYesNo("將要目前套用的\r\n#b#i" + oldSkinItemID + "# #t" + oldSkinItemID + "##k 取代套用成\r\n#b#i" + im.getItemId() + "# #t" + im.getItemId() + "##k 嗎？", false);
}

function action(mode, type, selection) {
    im.topMsg(mode + "-" + type + "-" + selection);
    if (mode == 1) status++;
    else status--;

    var i = 1;
    if (status == i++) {
        if (!im.getPlayer().getDamSkinList().contains(java.lang.Integer.parseInt(oldSkinId))) {
            im.askText("目前套用的#b#i" + oldSkinItemID + "# #t" + oldSkinItemID + "##k\r\n並未儲存於傷害字型儲存欄位，\r\n因此若要變更成新的傷害字型時，#r則無法再次使用！#k\r\n\r\n想要變更成新的傷害字型，請於下列視窗內輸入\r\n#e#b變更#k#n。\r\n\r\n（若想重新使用目前套用的傷害字型，\r\n則請先將傷害字型儲存在儲存欄位之後再重新嘗試。）", 0, 255);
        } else {
            oldSkinId = -1;
            action(1, 0, 0);
        }
    } else if (status == i++) {
        if ((oldSkinId == -1 || "變更".equals(im.getText())) && im.used()) {
            im.changeDamageSkin(skinId);
        } else {
            if (oldSkinId != -1) {
                im.sendOk("並未輸入成\r\n#b變更#k，\r\n已取消使用傷害字型！");
            } else {
                im.sendOk("發生未知錯誤");
            }
        }
        im.dispose();
    } else {
        im.dispose();
    }
}