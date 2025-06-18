var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，只要給我以下材料#v4000009#x200#v4000021#x200#v4000017#x200#v4000010#x200#v4000644#x200#v4000289#x200#v4000181#x200#v4000057#x200#v4000352#x200#v4000268#x200#v4000611#x200#v4000601#x200#v4000497#x200\r\n\#r外加1W樂豆點#b\r\n我可以給你兌換白天使限量禮物#v2430980#，可隨機開出十二星座椅子哦~~~:#v3015015##v3015016##v3015017##v3015018##v3015019##v3015020##v3015021##v3015022##v3015023##v3015024##v3015025##v3015026#\r\n#b#L11#我要兌換白天使限量禮物#v2430980##l\r\n#b#L11#我要兌換白天使限量禮物#v2430980##l\r\n#b#L11#我要兌換白天使限量禮物#v2430980##l";////////////////\r\n#L0##v4031631#如果你給我鮭魚x100 我可以兌換 #v1142813##l
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 10:
            if (cm.getNX(1)>=10000&&cm.getMeso() >= 5000 && cm.haveItem(4000009,200) && cm.haveItem(4000021,200) && cm.haveItem(4000017,200) && cm.haveItem(4000010,200) && cm.haveItem(4000644,200) && cm.haveItem(4000289,200) && cm.haveItem(4000181,200) && cm.haveItem(4000057,200) && cm.haveItem(4000352,200) && cm.haveItem(4000268,200) && cm.haveItem(4000611,200) && cm.haveItem(4000601,200) && cm.haveItem(4000497,200)) {
                cm.gainMeso( - 5000);
                cm.gainItem(4000009, -200);//藍蘑菇蓋1
        cm.gainItem(4000021, -200);//動物皮2
        cm.gainNX(1,-10000);
                cm.gainItem(4000017, -200);//豬頭3
                cm.gainItem(4000010, -200);//綠水靈珠4
                cm.gainItem(4000644, -200);//變異的綠水靈珠5
                cm.gainItem(4000289, -200);//貓咪娃娃6
                cm.gainItem(4000181, -200);//冷凍魚翅7
                cm.gainItem(4000057, -200);//黑企鵝王的嘴8
                cm.gainItem(4000352, -200);//沙漠的火花9
                cm.gainItem(4000268, -200);//飛龍的翅膀10
                cm.gainItem(4000611, -200);//推車熊的推車11
                cm.gainItem(4000601, -200);//偷水賊的水瓶12
                cm.gainItem(4000497, -200);//呆呆雪精靈的毛團13
                cm.gainItem(2430980,1);
                cm.sendOk("兌換成功\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("想坑我做夢吧,我那麼機智~嗯哼,你不夠材料");
            }
            break;
        case 11:
            if (cm.getNX(1)>=10000&&cm.getMeso() >= 5000 && cm.haveItem(4000009,200) && cm.haveItem(4000021,200) && cm.haveItem(4000017,200) && cm.haveItem(4000010,200) && cm.haveItem(4000644,200) && cm.haveItem(4000289,200) && cm.haveItem(4000181,200) && cm.haveItem(4000057,200) && cm.haveItem(4000352,200) && cm.haveItem(4000268,200) && cm.haveItem(4000611,200) && cm.haveItem(4000601,200) && cm.haveItem(4000497,200)) {
                cm.gainMeso( - 5000);
                cm.gainNX(1,-10000);
                cm.gainItem(4000009, -200);//藍蘑菇蓋1
        cm.gainItem(4000021, -200);//動物皮2
                cm.gainItem(4000017, -200);//豬頭3
                cm.gainItem(4000010, -200);//綠水靈珠4
                cm.gainItem(4000644, -200);//變異的綠水靈珠5
                cm.gainItem(4000289, -200);//貓咪娃娃6
                cm.gainItem(4000181, -200);//冷凍魚翅7
                cm.gainItem(4000057, -200);//黑企鵝王的嘴8
                cm.gainItem(4000352, -200);//沙漠的火花9
                cm.gainItem(4000268, -200);//飛龍的翅膀10
                cm.gainItem(4000611, -200);//推車熊的推車11
                cm.gainItem(4000601, -200);//偷水賊的水瓶12
                cm.gainItem(4000497, -200);//呆呆雪精靈的毛團13
                cm.gainItem(2430980,1);
                cm.sendOk("兌換成功\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("想坑我做夢吧,我那麼機智~嗯哼,你不夠材料");
            }
            break;
        case 11:
            if (cm.getMeso() >= 5000000 && cm.haveItem(4031631,100)) {
                cm.gainMeso( - 5000000);
        cm.gainItem(4031631, -100);
                cm.gainItem(1142813,5);
                cm.sendOk("兌換成功\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("想坑我做夢吧,你不夠錢");
            }
            break;
        }
        cm.dispose();
    }
}