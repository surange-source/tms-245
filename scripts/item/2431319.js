status = -1;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var avail = "";
                             avail+="#r注意：不要將瑪瑙戒指放入裝備欄第一格！\r\n\r\n\r\n#k";
            im.sendOk("#b用來提升瑪瑙戒指的材料!!!\r\n#b"+avail);
            im.dispose();
    }
}