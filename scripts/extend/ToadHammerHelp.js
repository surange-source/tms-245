/*      
 *  
 *  
 */
﻿var status;
var sel;

function start() {
    status = -1;
    cm.sendSimple("你有什麼想要知道的嗎? \r\n\r\n#b#L0#什麼是托德之錘? #l\r\n#b#L1#各能力的提取/傳授詳細說明#l\r\n#b#L2#無法使用托德之錘的裝備#l\r\n#b#L3#幫助結束#l");
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
            switch (selection) {
                case 0:
                    cm.sendNext("#b托德之錘#k是一種會對強化的#b低級裝備的能力進行提取#k後#b傳授給高級裝備#k的神秘魔法錘. ");
                    break;
                case 1:
                    cm.dispose();
                    cm.openNpc(9220050, "ToadHammerHelp_Detail");
                    break;
                case 2:
                    cm.dispose();
                    cm.openNpc(9220050, "ToadHammerHelp_Unuse");
                    break;
                case 3:
                    cm.dispose();
                    break;
            }
            break;
        case 1:
            cm.sendNextPrev("但是並不是所有裝備都可以使用#b托德之錘#k。\r\n只有滿足#b三個#k條件的裝備才可以傳遞能力。\r\n\r\n#e1. #n進行提取的裝備的#r星之力強化#k必須進行到#r1星以上#k。\r\n#e2.#n提取/傳授的道具需要有#r+1~+10#k級的差異。#k\r\n(只不過，#r99級以下#k的裝備可以傳授給#r+1~+20#k級)\r\n\r\n#e3.#n提取/傳授只能對#r相同部位#k的裝備進行。\r\n(不過，#r一套衣服和上下裝#k可以相互提取/傳授能力。)\r\n");
            break;
        case 2:
            cm.sendNextPrev("#b滿足#k所有條件後, 就可以按照下面的順序提取/傳授裝備的能力了. \r\n\r\n#e1.#n選擇要#r提取能力的裝備#k. \r\n\r\n#e2.#n選擇要#r傳授能力的裝備#k. \r\n\r\n#e3.#n當接受傳授的裝備#r還存在可升級次數時#k, 將剩餘的次數#r全部耗盡#k, 選擇要強化裝備的#r卷軸. #k\r\n#r(只可以選擇100%卷軸, 不消耗咒語痕跡. )#k\r\n\r\n#e4.#n形成傳授能力的#r裝備#k/破壞提取能力的#r裝備#k\r\n");
            break;
        case 3:
            cm.sendNextPrev("使用過一次托德之錘, 對裝備的能力進行了#r提取/傳授#k後, #r就無法再次逆轉. #k\r\n\r\n一定要將#r鼠標懸停在上方的大圖標#k上, 仔細確認過#r變化的能力值#k之後再做決定. \r\n\r\n如果你還想知道有關托德之錘更詳細的內容, 也可以查看其它幫助, 我會親切為你指引的. ");
            cm.dispose();
            break;
    }
}
