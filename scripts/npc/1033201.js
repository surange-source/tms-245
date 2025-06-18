var status = -1;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendPlayerToNpc("阿弗利埃！你沒事吧？普力特呢！？……呼，只是昏過去了……");
    } else if (status == 1) {
        cm.sendNextNoESC("精靈遊俠……你還活著啊。");
    } else if (status == 2) {
        cm.sendPlayerToNpc("當然！封印成功了，總不能一直坐在這裡吧！但是……你看上去好像不太好？沒事吧？其他人呢？大家去哪兒了？");
    } else if (status == 3) {
        cm.sendNextNoESC("雖然#b封印黑魔法師成功了#k，但是因為他最後使用的魔法引起的爆炸，所有的東西都分崩離析。我們能在相同的地方，好像只是偶然。");
    } else if (status == 4) {
        cm.sendPlayerToNpc("啊，是啊。飛了好遠。但還好沒事……");
    } else if (status == 5) {
        cm.sendNextNoESC("是因為放鬆下來了嗎？沒有力氣……不，不僅僅是沒有力氣……感覺很冷。");
    } else if (status == 6) {
        cm.sendPlayerToNpc("這裡原來就是經常下雪的地方嗎？四周都在燃燒，卻在下雪……真奇怪…");
    } else if (status == 7) {
        cm.sendNextNoESC("……你沒有感覺到嗎，精靈遊俠？這#r可怕的詛咒#k……黑魔法師對你和普力特，以及所有其他人的詛咒。");
    } else if (status == 8) {
        cm.sendPlayerToNpc("詛……咒？");
    } else if (status == 9) {
        cm.sendNextNoESC("我看到可怕的寒氣在包圍你。在體力充沛的時候也許還好……但是戰鬥讓我們變弱了，現在非常危險……黑魔法師好像不會那麼輕易放過我們……");
    } else if (status == 10) {
        cm.sendPlayerToNpc("其他人都會沒事的，因為大家都很強壯！但是我擔心普力特……那個傢伙，體力本來就很弱。");
    } else if (status == 11) {
        cm.sendNextNoESC("普力特由我來照顧，別擔心……不過，我更擔心的是你，精靈遊俠。你是#b精靈之王#k。對你的詛咒……#r就是對所有精靈的詛咒#k，不是嗎？");
    } else if (status == 12) {
        cm.sendPlayerToNpc("...!");
    } else if (status == 13) {
        cm.sendNextNoESC("你快到#b埃歐雷#k去。如果#b黑魔法師的詛咒真的會給全體精靈造成影響#k的話……身為國王的你必須去看一看。");
    } else if (status == 14) {
        cm.sendPlayerToNpc("知道了！阿弗利埃……我們還能再見面嗎？..");
    } else if (status == 15) {
        cm.sendNextNoESC("……希望如此。");
    } else if (status == 16) {
        cm.sendPlayerToNpc("(雖然很擔心同伴們……但是現在只能相信他們。使用回城技能，回村子去吧。)");
    } else if (status == 17) {
        cm.dispose();
        cm.warp(910150001,0);
    }
    
}











