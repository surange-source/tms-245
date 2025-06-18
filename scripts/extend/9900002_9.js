var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var itemlist = Array(

                                        Array(5072000, 500),// 高質地喇叭
                                        Array(5079002, 1000),// 餡餅高級喇叭
                                        Array(5079001, 1000),// 蛋糕高級喇叭
                    Array(5073000, 1000),// 心臟高級喇叭
                    Array(5074000, 1000),// 白骨高級喇叭
                    Array(5076000, 1000),// 道具喇叭
                    Array(5077000, 1500),// 繽紛喇叭
                                        Array(5390000, 3000),// 熾熱情景喇叭
                    Array(5390001, 3000),// 絢爛情景喇叭
                    Array(5390002, 3000),// 愛心情景喇叭
                    Array(5390003, 5000),// 新年慶祝喇叭1
                    Array(5390004, 5000),// 新年慶祝喇叭2
                    Array(5390005, 5000),// 小老虎情景喇叭
                    Array(5390007, 10000),// 球進了!情景喇叭
                    Array(5390008, 10000),// 世界盃情景喇叭
                    Array(5390010, 10000),// 鬼出沒情景喇叭
                    Array(5390019, 12000),// 新聞主播室情景喇叭
                    Array(5390020, 12000),// 我的演唱會情景喇叭
                    Array(5390018, 12000),// 赤兔馬情景喇叭
                    Array(5390022, 20000),// 追趕小羊的狼情景喇叭
                                        Array(5390013, 10000),// 白銀VIP專署喇叭
                                        Array(5390012, 20000),// 黃金VIP專署喇叭
                                        Array(5390011, 30000),// 鑽石VIP專署喇叭
                    Array(5390006, 50000)// 咆哮老虎情景喇叭

);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "#h0#,你好！在這裡可以選擇你想要購買的物品,點擊圖片購買\r\n#b";
            for (var i=0; i<itemlist.length; i++) {
                text += "#L" + i + "##i" + itemlist[i] + ":# #t" + itemlist[i] + "# 需要 "+itemlist[i][1]+"樂豆點\r\n";
                if (i != 0 && (i+1) % 5 == 0) {
                    text += "\r\n";
                }
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendGetNumber("請輸入你請你輸入想要購買的數量\r\n\r\n#r1個需要" + itemlist[selects][1] + "樂豆點", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想購買" + buynum + "個#r#i" + itemlist[selects][0] + "##k？\r\n你將使用掉" + (buynum * itemlist[selects][1]) + "樂豆點。");
        } else if (a == 3) {
            if (cm.getChar().getCSPoints(1) >= buynum * itemlist[selects][1]) {
                cm.getChar().modifyCSPoints(1, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("購買成功了！");
                cm.dispose();
            } else {
                cm.sendOk("對不起，你沒有足夠的樂豆點。");
                cm.dispose();
            }
        }
    }
}