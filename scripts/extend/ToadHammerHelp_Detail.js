/*      
 *  
 *  
 */
﻿var status;

function start() {
    status = -1;
    cm.sendSimple("你有什麼想知道的嗎? \r\n\r\n#b#L0#額外屬性提取/傳授方式#l\r\n#b#L1#卷軸升級提取/傳授方式#l\r\n#b#L2#潛在(附加)屬性提取/傳授方式#l\r\n#b#L3#星之力強化提取/傳授方式#l\r\n#b#L4#靈魂提取/傳授方式#l\r\n#b#L5#其它事項#l")
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

    switch (selection) {
        case 0:
            cm.sendOk("#e[額外屬性]#n\r\n\r\n-不#r提取#k/#b傳授#k. #k\r\n-直接保留#b接受傳授的裝備#k的額外屬性#b#k. \r\n");
            break;
        case 1: 
            cm.sendOk("#e[卷軸升級]#n\r\n\r\n-不#r提取#k. \r\n\r\n-與#r進行提取的裝備#k使用了哪種卷軸無關, 只要#b接受傳授的裝備#k還存在可升級次數,  就會全部消耗#r100%卷軸#k對道具進行強化. \r\n\r\n-不想要100%卷軸強化時, 在完成#b接受傳授的裝備#k的卷軸升級後使用托德之錘. \r\n");
            break;
        case 2:
            cm.sendOk("#e[潛在屬性(附加)]\r\n\r\n-#n到#bA級#k之前原樣#r提取#k/#b傳授#k. \r\n\r\n-#r進行提取的裝備#k的潛在屬性在#rS級以上#k時, 等級降到#rA級#k. #k\r\n\r\n-就算等級下降, 屬性的種類也保持為#b相同種類#k. \r\n\r\n-只不過, 當A級#b沒有相應種類的屬性#k, 又或者#b相應部位無法進行添加#k時, 會在相應屬性範圍內#r隨機重新設置#k. ");
            break;
        case 3:
            cm.sendOk("#e[星之力強化等級]#n\r\n\r\n-按照比#r進行提取的裝備的星之力強化等級#k低一個等級的數值進行#r提取#k和#b傳授#k. \r\n\r\n-當#b接受傳授的裝備#k進行了星之力強化時, 用提取來#b替換. #k\r\n");
            break;
        case 4:
            cm.sendOk("#e[靈魂]#n\r\n\r\n-按照原樣#r提取#k/#b傳授#k. \r\n\r\n-與#b接受傳授的裝備#k的靈魂或者是否使用靈魂附魔石\r\n");
            break;
        case 5:
            cm.sendOk("#e[可交換狀態]、[剪刀使用次數]等#n\r\n\r\n-不傳授#r進行提取的裝備#k的固有狀態. \r\n\r\n-#b接受傳授的裝備#k的內容#b保持原樣. #k\r\n");
            break;
    }
    cm.dispose();
}
