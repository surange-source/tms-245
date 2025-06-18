var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
            cm.sendOk("你好啊~ 我聞到了一股甜蜜蜜的新婚味道哦~ 哎喲，怎麼還戴著訂婚戒指啊？結了婚就要換漂亮的結婚戒指才行嘛！你願意的話，我可以給你們換，怎麼樣？\r\n\r\n#L0# 把訂婚戒指換成結婚戒指。#l");
            break;
        case 1: //
            cm.dispose();//這是結束腳本，請按照實際情況使用
            break;
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
