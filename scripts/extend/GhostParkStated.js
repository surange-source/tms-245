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
            cm.sendNextN("#b鬼魂公園#k是繼怪物公園之後開張的第二個休彼德蔓主題公園! \r\n在這個讓人毛骨悚然的地方可以體驗到童話村的各種鬼, 呵呵. ");
            break;
        case 1: //
            cm.sendNextN("#b鬼魂公園#k並不僅僅只像是個鬼屋, \r\n這裡的鬼是集聚毀掉童話村的#r邪惡氣息#k並將其實體化後製作而成的.");
            break;
        case 2:
            cm.sendNextN("你若是消滅了鬼, 也算是淨化了童話村的#r邪惡氣息#k. \r\n光是享受#b鬼魂公園#k的樂趣, 也算是對童話村的安定做出了貢獻! \r\n怎麼樣, 是不是很厲害啊? 哈哈!");
            break;
        case 3:
            cm.sendNextN("你問我是如何將#r邪惡氣息#k實體化後變成鬼的? \r\n這是#d我專屬的秘密#k, 我可不能告訴你, 呵呵, \r\n而我會將你淨化的氣息收集起來……");
            break;
        case 4:
            cm.sendNextN("呵呵, 我越說越多了呢. \r\n總之, 好好享受吧, 呵呵. ");
            cm.dispose();
            break;
    }
}
