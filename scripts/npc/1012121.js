/*
 *  @收納衣類箱
 */
function start() {
    cm.sendYesNo("要打開舊衣回收箱嗎？");
}

function action(mode, type, selection) {
    if (mode == 1) {
        cm.openUI(1121);
    } else {
        cm.sendNext("請將要丟棄的衣服放置舊衣回收箱！");
    }
    cm.dispose();
}