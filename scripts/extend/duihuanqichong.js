var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var itemlist = Array(
Array(2430249, 300),//木飛機3天使用券
Array(2430259, 300),//蝙蝠魔騎寵卷
Array(2430260, 300),//花蘑菇騎寵卷
Array(2430261, 300),//超能套裝騎寵卷
Array(2430262, 300),//雄獅騎寵卷
Array(2430265, 300),//騎士團戰車騎寵卷
Array(2430266, 300),//走路雞騎寵卷
Array(2430271, 300),//貓頭鷹騎寵卷
Array(2430578, 300),//直升機3天使用券
Array(2430579, 300),//GO兔冒險3天使用券
Array(2430580, 300),//熊貓3天使用券
Array(2430583, 300),// 天馬3天使用券
Array(2430582, 300),//透明巴洛古3天使用券
//Array(2430586, 300),//騎士團戰車3天使用券
Array(2430587, 300),//妮娜的魔法陣3天使用券
Array(2430588, 300),//拿破侖的白馬3天使用券
Array(2430589, 300),//魔法掃帚3天使用券
Array(2430590, 300),//夢魘3天使用券
//Array(2430591, 300),//貓頭鷹3天使用券
Array(2430592, 300),//萊格斯的豺犬3天使用券
Array(2430593, 300),///警車3天使用券
Array(2430594, 300),//觔斗雲3天使用券
Array(2430595, 300),//玩具坦克3天使用券
Array(2430596, 300),///鋼鐵變形俠3天使用券
Array(2430597, 300), //飛船3天使用券
//Array(2430598, 300), //超能套裝3天使用券
Array(2430599, 300), //巴洛古3天使用券
Array(2430600, 300), ///暗光龍3天使用券
Array(2430601, 300),//聖獸提拉奧斯3天使用券
Array(2430602, 300)//暴風摩托3天使用券
//Array(2290886, 200), 
//Array(2290887, 200), 
//Array(2290468, 200), 
//Array(2290571, 200),
//Array(2290914, 200),
//Array(2290723, 200),
//Array(2290889, 200),
//Array(2290602, 200),
//Array(2291137, 200),
//Array(2290724, 200)
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
            text = "#h0#,您可以在這裡兌換#e#b本服可愛騎寵哦#n#k,請選擇你想要兌換的物品\r\n#e#r注意背包是否有空格 \r\n#r#e注意背包是否有空格#k#n\r\n#b";
            for (var i=0; i<itemlist.length; i++) {
                text += "#L" + i + "##i" + itemlist[i] + ":##t" + itemlist[i] + "# 需要  x  #r"+itemlist[i][1]+"#b#v4000645##l\r\n";
                if (i != 0 && (i+1) % 5 == 0) {
                    text += "\r\n";
                }
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendGetNumber("請輸入你請你輸入想要購買的數量\r\n\r\n#r1個需要" + itemlist[selects][1] + "個#b#v4000645##l#k", 0, 0, 999999);
        } else if (a == 2) {
            buynum = selection;
            cm.sendNext("你想購買" + buynum + "個#r#i" + itemlist[selects][0] + "##k？\r\n你將使用掉" + (buynum * itemlist[selects][1]) + "變異的漂漂豬脖子肉#v4000645##l。");
        } else if (a == 3) {
            if (cm.haveItem(4000645,buynum * itemlist[selects][1])) {
                cm.gainItem(4000645, -buynum * itemlist[selects][1]);
                cm.gainItem(itemlist[selects][0], buynum);
                cm.sendOk("購買成功了！");
                cm.dispose();
            } else {
                cm.sendOk("對不起，你沒有足夠的變異的漂漂豬脖子肉#v4000645##l。");
                cm.dispose();
            }
        }
    }//mode
}//f