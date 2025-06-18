
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
    if (cm.itemQuantity(4033248)>0) {
        cm.sendNext("你身上怎麼會有#v4033248#,是不是你偷得....\r\n開個玩笑，哈哈，感謝你帶來了#v4033248#，需要我幫你換成兔幣嗎？");
    } else {
        cm.sendOk("我這輩子最恨的就是小偷了,你身上沒有#v4033248#");
            cm.dispose();
            return;
    }
    } else if (status == 1) {
    cm.sendGetNumber("你要兌換多少個呢?(#r#v4033248#=1兔兔幣#k)",cm.itemQuantity(4033248),1,cm.itemQuantity(4033248));
    } else if (status == 2) {
    sl = selection;
    cm.sendYesNo("你真的要兌換#r" + sl + "#k個#v4033248#嗎？\r\n兌換後你可以獲得#r" + (sl * 1) + "#k兔幣");
    } else if (status == 3) {
    if (cm.itemQuantity(4033248)>=sl){
        cm.addHyPay(-sl * 1);
        cm.gainItem(4033248, -sl);
        cm.sendOk("兌換成功");
                cm.worldSpouseMessage(0x20,"『可可熊運營商』：恭喜[" + cm.getChar().getName() + "]使用 "+ sl +"個金色楓葉 "+ sl * 1 +"兔兔幣");
    } else {
        cm.sendOk("您確定有#r" + sl  + "#k個#v4033248#嗎？");
    }
    cm.dispose();
    }
}