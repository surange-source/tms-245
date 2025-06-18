/*
    Made by XiaoBin and Kent
*/
var status = -1;

function start() {
    var getCustomData = im.getCustomData(7291);
    var getDamageHpCustomData = im.getDamageHpCustomData();
    if (getCustomData == getDamageHpCustomData) {
        im.topMsg("無法重複使用相同傷害皮膚道具");
        im.enableActions();
        im.dispose();
    } else {
        im.topMsg("使用傷害皮膚道具成功。");
        im.ShowDamageHp();
        im.enableActions();
        im.DeleteItem();
        im.enableActions();
        im.dispose();
    }
}
