
var status = 0;
var sl = 0;//兌換數量

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
    if (cm.itemQuantity(4001126)>0) {
        cm.sendNext("你身上怎麼會有#v4001126#,是不是你偷得....\r\n開個玩笑，哈哈，感謝你帶來了#v4001126#，需要我幫你換成遊戲幣嗎？");
    } else {
        cm.sendOk("我這輩子最恨的就是小偷了");
            cm.dispose();
            return;
    }
    } else if (status == 1) {
    cm.sendGetNumber("你要兌換多少個呢?(#r#v4001126#=10000遊戲幣#k)",cm.itemQuantity(4001126),1,cm.itemQuantity(4001126));
    } else if (status == 2) {
    sl = selection;
    cm.sendYesNo("你真的要兌換#r" + sl + "#k個#v4001126#嗎？\r\n兌換後你可以獲得#r" + (sl * 10000) + "#k遊戲幣");
    } else if (status == 3) {
    if (cm.itemQuantity(4001126)>=sl){
        cm.gainMeso(-sl * 10000);
        cm.gainItem(4001126, -sl);
        cm.sendOk("兌換成功");
                cm.worldSpouseMessage(0x19,"『楓之谷運營員』：恭喜[" + cm.getChar().getName() + "]使用 "+ sl +"個楓葉換取 "+ sl * 10000 +"遊戲幣");
    } else {
        cm.sendOk("您確定有#r" + sl  + "#k個#v4001126#嗎？");
    }
    cm.dispose();
    }
}