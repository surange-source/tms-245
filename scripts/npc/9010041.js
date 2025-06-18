var status = -1;

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
        cm.sendSimple("你好。你想用自己的努力換取報酬嗎？有關打工的一切，我#b出納小姐#k都可以幫你。#b#e\r\n#L0#領取打工獎勵。#l");
    } else if (status == 1) {
        cm.sendNext("嗯～你確實完成打工了嗎？現在帳號內沒有獎勵。請先去打工，然後再來找我。#r- 當前暫不支持次功能。#k");
        cm.dispose();
    }
}
