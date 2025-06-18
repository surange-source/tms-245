var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }

    switch (status) {
        case 0:
            cm.sendNextN("#b#e<入場條件>#k#n\r\n為了安全使用鬼魂公園, 身高要在125cm……不對, 得#b超過125級#k才可以, 隻身一人進去太可怕了, 還是得#b組隊#k入場. \r\n一天可以入場的次數為#b5次#k.");
            break;
        case 1: //
            cm.sendNextN("#b#e<入場條件>#k#n\r\n鬼魂公園的推薦等級是#b125級到170級#k, 就算超過了170級, 鬼魂公園的鬼也不會超過這個等級, 所以得留心著點.\r\n");
            break;
        case 2:
            cm.sendNextN("#b#e<符咒設置>#k#n\r\n進入時的匹配性服務已經準備好, 可以通過休彼德蔓牌特製符咒#b按照口味強化邪惡氣息#k.");
            break;
        case 3:
            cm.sendNextN("#b#e<符咒設置>#k#n\r\n公園會根據邪惡氣息的種類對固定的#b妨礙要素#k進行激活, 越是強化邪惡氣息, 妨礙得就越嚴重, 如此淨化也得加速才行吧? #b經驗值#k也會提升呢! 哈哈! ");
            break;
        case 4:
            cm.sendNextN("#b#e<內部規則>#k#n\r\n為了能夠在鬼魂公園內部暢快使用, 限制外帶飲食的攝入. 也就是#b禁止使用藥水類道具#k, 不過#b防止經驗值下降#k的基本服務還是會提供的.");
            break;
        case 5:
            cm.sendNextN("#b#e<內部規則>#k#n\r\n另外驚悚的氣息可能會讓你的#bHP恢復能力#k變得沒有用武之地, \r\n就算使用HP恢復技能, 也不會有什麼用的.");
            break;
        case 6:
            cm.sendNextN("#b#e<經驗值>#k#n\r\n要麼是根據累計打獵數, 經驗值量會逐漸增加, 要麼是根據HP狀態產生額外的經驗值, 甚至還有符咒強化加成, 我們準備了#b豐富多樣的經驗值加成#k, 能拿多少就拿多少哦, 呵呵.");
            break;
        case 7:
            cm.sendNextN("是使用方法太複雜了嗎?  \r\n我相信你既然達到了" + cm.getLevel() + "級, 就一定能夠理解的. \r\n那就讓我們拭目以待你能撐到什麼時候吧! 呵呵! ");
            cm.dispose();
            break;
    }
}
