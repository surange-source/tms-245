/*
 *    阿斯旺 - 阿斯旺解放戰
 */

var status = -1;
var minLevel = 40;
var maxCount = 5;
var minPartySize = 1;
var maxPartySize = 4;

function start() {
    cm.sendSimple("#e<阿斯旺解放戰>#n\r\n你願意去掃蕩仍然在阿斯旺地區徘徊的希拉的殘黨嗎?#b\r\n\r\n\r\n#L0#掃蕩希拉的殘黨#l\r\n#L1#直接消滅希拉 (120級以上)#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (selection == 0) {
            cm.playerMessage("阿斯旺解放戰暫時處於和平狀態。請等到下一季的解放戰。");
            cm.dispose();
        } else if (selection == 1) {
            if (cm.getLevel() >= 120) {
                cm.sendNext("現在你將到達希拉之塔入口，請務必消滅希拉吧。");
            } else {
                cm.sendOk("以你現在的實力，對戰希拉有些勉強。必須達到120級以上才能進行挑戰。");
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    } else if (status == 1) {
        cm.warp(262030000, 0); //希拉之塔 - 希拉之塔入口
        cm.dispose();
    } else {
        cm.dispose();
    }
}
