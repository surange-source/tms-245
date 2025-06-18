/*
 筆芯製作★風雲工作室所有
 完成時間：2013年10月28日 16:34:19
 腳本功能：挑戰首領
 */

var a = 0;
var selects;
var BossList = Array(
        Array("[普通] 挑戰拉圖斯！", 220080000),
        Array("[普通] 暴力熊、心疤獅王！", 551030100),
        Array("[簡單/進階] 2線為普通殘暴炎魔、3線為進階殘暴炎魔！", 211042200),
        Array("[普通/進階] 3線為進階黑龍王，2和4線為普通黑龍王", 240040700),
        Array("[普通/混沌] 1線為普通皮卡啾，2線為混沌皮卡啾", 270050000),
        Array("[普通] 次元縫隙-阿卡伊農祭壇", 272030000),
        Array("[普通] 妖精女王-艾菲尼婭", 300030300),
    Array("[騎士團] 女皇 - 西格諾斯的庭院", 271040000),
        //Array("#r[泰坦級] 強化鑽機,弱小勿進(New~)", 703020000),
        Array("#r[巨大樹根] 魯塔比斯 - 四大天王BOSS 。", 105200000),
        Array("[世界BOSS] 新加坡 - 千年樹精王遺跡Ⅱ", 541020800),
        Array("[凡雷恩] 獅子王之城 - 接見室走廊", 211070000),
        Array("#d[噩夢的牢籠] 心樹守護者之地 - 培羅德入口(New~)", 863000100),
        Array("[噩夢的牢籠] 暴君城堡戰場 - 暴君梅格耐斯(New~)", 401072000)
        )

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
            var text = "為了更方便的遊戲，在這裡可以傳送到BOSS的傳送點。\r\n#b"
            for (var i = 0; i < BossList.length; i++) {
                text += "#L" + i + "# " + BossList[i][0] + "\r\n"
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo("你現在想出發到" + BossList[selects][0] + "嗎？")
        } else if (a == 2) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(BossList[selects][1], 0)
            cm.dispose();
        }//a
    }//mode
}//f