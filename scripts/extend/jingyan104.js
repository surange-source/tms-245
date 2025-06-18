var status = 0;
var choice;
var scrolls = Array(
Array("月妙3倍巨人秘藥", 2003552, 20),
Array("月妙5倍巨人秘藥", 2003553, 50),
Array("火紅玫瑰", 2022956, 20),
Array("皇家理發券", 5150040, 50),
Array("皇家整容券", 5152053, 50),
Array("幻影殘像", 5010044, 55),
Array("超級暴風升級", 2430979, 5000),
Array("防爆卷軸", 5064000, 20),
//Array("15星強化", 2049349, 888),
Array("繽紛喇叭", 5077000, 20),
Array("熾熱情景喇叭", 5390000, 20),
Array("絢爛情景喇叭", 5390001, 20),
Array("愛心情景喇叭", 5390002, 20),
Array("新年慶祝喇叭1", 5390003, 20),
Array("新年慶祝喇叭2", 5390004, 20),
Array("小老虎情景喇叭", 5390005, 20),
Array("球進了!情景喇叭", 5390007, 20),
Array("世界盃情景喇叭", 5390008, 20),
Array("咆哮老虎情景喇叭", 5390006, 20),
Array("鬼出沒情景喇叭", 5390010, 20),
Array("赤兔馬情景喇叭", 5390018, 20),
Array("道具喇叭", 5076000, 20),
Array("餡餅高級喇叭", 5079002, 20),
Array("蛋糕高級喇叭", 5079001, 20),
Array("心臟高級喇叭", 5073000, 20), 
Array("白骨高級喇叭", 5074000, 20), 
Array("高質地喇叭", 5072000, 20),
Array("紅心巧克力", 5110000, 10)
);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) cm.dispose();
    else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("好吧，歡迎下次繼續光臨！.");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            choices = "\r\n兔兔幣餘額：#r" + cm.getHyPay(1) + "#k個 (#r買後不支持退貨喲親#k)";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#　#d需要#r" + scrolls[i][2] + "#d兔兔幣#k#l";
            }
            cm.sendSimpleS("歡迎來到精品玩具店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
        } else if (status == 1) {
            cm.sendYesNo("你確定需要購買#v" + scrolls[selection][1] + "##t" + scrolls[selection][1] + "#?");
        choice = selection;
        } else if (status == 2) {
            var money = scrolls[choice][2];
            if (cm.getHyPay(1) < money) {
                cm.sendOk("抱歉，你沒足夠的兔兔幣！");
                cm.dispose();
            } else {
                cm.addHyPay(money);
                cm.gainItem(scrolls[choice][1], 1);
                cm.sendOk("購買成功.");
                cm.dispose();
            }
        }
    }
}
