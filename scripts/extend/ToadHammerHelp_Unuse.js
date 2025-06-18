/*      
 *  
 *  
 */
﻿var status;
var sel;

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
            cm.sendNext("使用托德之錘的基本條件已經在#e[什麼是托德之錘? ]#n中進行了說明, 但是除了這些情況之外, 還存在無法使用托德之錘的情況. ");
            break;
        case 1:
            cm.sendNextPrev("以下裝備無法使用托德之錘#r. #k\r\n\r\n#e1.#n擁有#r固定潛在屬性#k的裝備. \r\n#e2.#n #r有期限#k的裝備\r\n#e3.#n #r現金#k裝備\r\n#e4.#n #r極真#k裝備\r\n#e5.#n 使用了#r驚人裝備強化卷軸#k的裝備\r\n#e6.#n #r不可以卷軸升級的#k裝備\r\n#e7.#n 擁有#r固有技能#k的裝備\r\n#e8.#n #r登出時消失的#k裝備\r\n#e9.#n #r無法添加潛在屬性的#k裝備\r\n#e10.#n #r拉比斯/拉茲麗#k");
            break;
        case 2:
            cm.dispose();
            break;
    }
}
