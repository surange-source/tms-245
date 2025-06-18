var status = -1;
var winTimes = 0;
var uiFPaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";
var uiFRock = "#fUI/UIWindow.img/RpsGame/Frock#";
var uiFScissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var uiPaper = "#fUI/UIWindow.img/RpsGame/paper#";
var uiRock = "#fUI/UIWindow.img/RpsGame/rock#";
var uiScissor = "#fUI/UIWindow.img/RpsGame/scissor#";
var uiWin = "#fUI/UIWindow.img/RpsGame/charWin#";
var uiLose = "#fUI/UIWindow.img/RpsGame/charLose#";
var FpictureArr=Array(uiFRock, uiFScissor, uiFPaper);
var pictureArr=Array(uiRock, uiScissor, uiPaper);
var step = -1;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text="嘿嘿，想挑戰一下我的猜拳技術嗎？";
        text+="\r\n#b#L1#玩法說明#l\r\n";
        text+="#b#L2#開始遊戲#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1) {
        if (step>0)
            selection = step;
        if (selection == 1) {
            var text = "#d#e遊戲說明：#n#k\r\n";
            text+="\t1. 目前猜拳遊戲每天可以進行無數次。\r\n";
            text+="\t2. 每一輪至多可以進行10次，輸了則結束該輪遊戲。\r\n";
            text+="\t3. 獲得連勝的獎勵是倍增的。\r\n";
            text+="\t4. 中途退出遊戲將無法獲得獎勵。\r\n";
            text+="\t5. 如果第一把就輸了，也可以獲得安慰獎勵。";
            status=-1;
            cm.sendSimple(text);
        } else if (selection == 2) {
            var text = "出招吧！少年！\r\n";
            text+="#L0#"+uiFRock+"#l";
            text+="#L1#"+uiFScissor+"#l";
            text+="#L2#"+uiFPaper+"#l";
            cm.sendSimple(text);
        }
    } else if (status == 2) {
        var playerHand = selection;
        var npcHand = Math.floor(Math.random()*3);
        var result =  playerHand - npcHand;
        if (result == -1 || result == 2) {
            //win
            winTimes+=1;
            if (winTimes>=10) {
                cm.sendSimple(uiWin+"\r\n你已經連勝了10局，我無地自容，領取你的獎勵去吧！\r\n#b#L999#領取獎勵#l");
            } else {
                status = 0;
                step = 2;
                cm.sendSimple(uiWin+"\r\n有點意思，你已經連勝"+winTimes+"把了，戰鬥到底！\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]);
            }
        } else if (result == 0) {
            //tie
            status = 0;
            step = 2;
            cm.sendSimple("差點就被你贏了，來吧，放馬過來！\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]);
        } else {
            //lose
            cm.sendSimple(uiLose+"\r\n呵呵呵，你還是太年輕了。\r\n"+FpictureArr[playerHand]+" "+pictureArr[npcHand]+"\r\n#b#L999#領取獎勵，退出遊戲#l");
        }
    } else if (status == 3) {
        //領取獎勵
        if (winTimes>=3) {
            cm.worldMessage(0x18, "『猜拳能手』 : 玩家 " + cm.getChar().getName() + " 在猜拳遊戲中連勝"+winTimes+"把，獲得了豐厚的獎勵。");
        }
        var meso = 10000*Math.pow(2,winTimes);
        cm.gainMeso(meso);
        cm.gainItem(4310057, winTimes*2);
        cm.sendOk("獲得了"+meso+"遊戲幣和"+(winTimes*2)+"個#v4310057##t4310057#");
        cm.dispose();
    }
}

function isWin(playerHand) {

}