var Item = new Array(
        4033602, 4033603, 4033604, 4033606, 4033607, 4033608
        );
function start() {
    var rand = Math.floor(Math.random() * Item.length);
    if (cm.getSpace(4) < 1) {
        cm.dispose();
        return;
    }
    cm.sendOk("消滅了怪物，獲取：\r\n#b#i"+Item[rand]+"# #t"+Item[rand]+"# x1！！")
    cm.gainItem(Item[rand], 1);
    cm.dispose();
}