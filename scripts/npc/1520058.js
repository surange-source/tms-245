var hh5= "#fEffect/ItemEff/3012023/1/9#";//擬人化星星
var hh7= "#fEffect/ItemEff/3994441/8#";//小精靈
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("#e真的要放棄這次獲取以下物品的機會了麼?"+hh7+"\r\n#v4031859#   #v2049376#*5#v2614002#*40#v5062024#*200#v2435153#*7#v2616051#*30#v2430453#*20\r\n#v4021016#*9000#v4032733#*4#v1143024##v5062402#*3#v2570002#*2#v3015449##k\r\n");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("#e#v2436384##g戰力禮包#rV#k#bI#k  (價值約13700餘額)\r\n"+"打開該禮包,將獲取終極獎勵#v4031859#,憑借此證明可在管理員-夜處增加一次轉職機會!!\r\n#v2049376#*5#v2614002#*40#v5062024#*200#v2435153#*7#v2616051#*30#v2430453#*20\r\n#v4021016#*9000#v4032733#*4#v1143024##v5062402#*3#v2570002#*2#v3015449##k\r\n#r警告#k:一定要保持背包每欄至少留有#g30#k個空位喲,否則東西少了我是不負責的喲~\r\n\r\n是否花費#r5666#k餘額打開該禮包？#k");
    } else if (status == 1) {
        if(cm.getHyPay(1)> 5666){
     cm.sendOk("恭喜你成功打開了戰力禮包I,快去背包裡查看把!");
        cm.addHyPay(5666);
        cm.gainItem(4031859, 1);
        cm.gainItem(2436384, -1);
        cm.gainItem(2049376, 5);
        cm.gainItem(2614002, 40);
        cm.gainItem(5062024, 200);
        cm.gainItem(2435153, 7);
        cm.gainItem(2616051, 30);
        cm.gainItem(2430453, 20);
        cm.gainItem(4032733, 4);
        cm.gainItem(4021016, 9000);
        cm.gainItem(1143024, 1);
        cm.gainItem(5062402, 3);
        cm.gainItem(2570002, 2);
        cm.gainItem(3015449, 1);
        cm.dispose();
            }
        else {
        cm.sendOk(hh5+"\r\n#e您的#r餘額#k不足喲~~是否考慮消費一下下來起飛呢?");
        cm.dispose();
        }
    }
}
