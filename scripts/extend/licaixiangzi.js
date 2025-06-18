/*
    里諾赫
    祖母綠抽獎寶箱購買NPC
*/

var status = -1;
var cost = 3000;
function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("瞧一瞧看一看，老夫從海外帶回來的珍寶，一個只要#r"+cost+"樂豆點#k，能夠獲得#b強化卷、藍調、必成卷、風暴套裝、150級武器.稀有椅子等高級物品#v3010519##v3010520##v3012011##v3010621##r各種圖騰#k，打開寶箱就送你#r5個#k#b運動會幣#k，運動會幣能兌換#b必成卷軸#k和#b運動會裝備#k哦！！！買個玩玩吧，小兄弟！ \r\n#L0##b買1個寶箱玩玩吧#k#l\r\n#L1##b買10個寶箱玩玩吧#k#l\r\n#L2##r老闆，我要100個！#k#l");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getPlayer().getCSPoints(1)>=cost) {
                cm.gainItem(2430070,1);
                cm.gainItem(4310030,5);
                cm.gainNX(1, -cost);
                cm.sendOk("寶貝已經到手，快打開看看有什麼吧！")
            } else {
                cm.sendOk('喂喂，小兄弟，你好像沒有這麼多樂豆點噢！');
            }
        } else if (selection == 1) {
            if (cm.getPlayer().getCSPoints(1)>=cost*10) {
                cm.gainItem(2430070,10);
                cm.gainItem(4310030,50);
                cm.gainNX(1, -cost*10);
                cm.sendOk("嘿，拿10個去試試手氣吧，祝你好運！")
            } else {
                cm.sendOk('喂喂，小兄弟，你好像沒有這麼多樂豆點噢！');
            }
        } else if (selection == 2) {
            if (cm.getPlayer().getCSPoints(1)>=cost*100) {
                cm.gainItem(2430070,100);
                cm.gainItem(4310030,500);
                cm.gainNX(1, -cost*100);
                cm.sendOk("好勒，給你100個寶箱，祝你好運，小兄弟！！")
            } else {
                cm.sendOk('喂喂，小兄弟，你好像沒有這麼多樂豆點噢！');
            }
        }
       // cm.sendOk("送你10個金蛋,到包裹裡看看吧!");
        cm.dispose();
    }
}