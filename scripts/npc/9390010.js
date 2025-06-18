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
            cm.sendOk("你聽說了嗎？據說和宇宙船內部的外星生命體戰鬥，可以獲得非常好的飾品。\r\n   #b#i1113038:# #t1113038##k\r\n   #b#i1122256:# #t1122256##k\r\n   #b#i1032191:# #t1032191##k\r\n   #b#i1132230:# #t1132230##k\r\n裡面的這種頭盔，只有偶爾現身的#r#e「稀有的外星訪客」#k#n才會掉落。是不是很不錯？\r\n   #b#i1003893:# #t1003893##k");
            cm.dispose();
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
