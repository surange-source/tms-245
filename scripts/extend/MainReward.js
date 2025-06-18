var raffleItem = Array(
    5060048, // 黃金蘋果
    2028394, // 幸運的金色箱子
    5060049, // 傷害字型
    5537000, // 萌獸卡牌包
    5222138, // 寵物隨機箱
    5222123 // 時尚隨機箱
);

function start() {
    var msg = "請選擇要查看主打的抽獎類型\r\n\r\n";
    for (var i = 0; i < raffleItem.length; i++) {
        msg += "#L" + i + "##v" + raffleItem[i] + "##t" + raffleItem[i] + "##l\r\n";
    }
    cm.sendSimple(msg);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    var msg = "";
    var type = raffleItem[selection];
    var mainReward = cm.getRaffleMainReward(selection == 1 ? raffleItem[0] : type);
    for (var i = 0; i < mainReward.size(); i++) {
        msg += "#i" + mainReward.get(i).getItemId() + ":# #z" + mainReward.get(i).getItemId() + "#\r\n";
    }
    if (msg == "") {
        cm.sendOk("#v" + raffleItem[selection] + "##t" + raffleItem[selection] + "# 暫時無主打訊息");
    } else {
        cm.sendOk("#v" + raffleItem[selection] + "##t" + raffleItem[selection] + "# 本期主打訊息如下:\r\n" + msg);
    }
    cm.dispose();
}