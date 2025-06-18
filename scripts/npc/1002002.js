/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  
 *  NPC名稱:  佩森    
 *  功能： 傳送
 *  @Author Kent 
 */
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status <= 1) {
            cm.sendNext("看來你在這裡有些事還沒有辦完嘛？身心疲憊的時候到這黃金海灘休息放鬆一下也不錯。");
            cm.safeDispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("你聽說過的海灘，一個壯觀的海洋稱為黃金海灘，位於附近的維多利亞港？我可以帶你過去.但是你必須得支付#b1500 楓幣#k或者你有貴賓卡我可以免費帶你過去, 怎麼樣？\r\n\r\n#L0##b支付楓幣前往黃金沙灘#l\r\n#L1#使用貴賓卡#l\r\n#L2#如何獲得貴賓卡#l");
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendYesNo("確定支付#r1500楓幣#k前往黃金沙灘嗎？");
        } else if (selection == 1) {
            status = 2;
            cm.sendYesNo("確定使用#r貴賓卡#k前往黃金沙灘嗎？");
        } else if (selection == 2) {
            status = 4;
            cm.sendNext("你一定很好奇 #b貴賓卡吧？#k. 哈哈，這是可以理解的。貴賓卡是前往黃金海灘一個項目，只要有你在，你可以你對弗洛裡納海灘免費。這是一個罕見的項目，即使我們買了這些，但不幸的是我失去了我幾個星期前在我珍貴的暑假。");
        }
    } else if (status == 2) {
        if (cm.getMeso() < 1500) {
            cm.sendNext("什麼~ 沒錢還想去? 你真個奇怪的傢伙!...");
            cm.safeDispose();
        } else {
            cm.gainMeso(-1500);
            cm.saveLocation("FLORINA");
            cm.warp(120030000, 0);
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031134)) {
            cm.saveLocation("FLORINA");
            cm.warp(120030000, 0);
            cm.dispose();
        } else {
            cm.sendNext("什麼~你沒有貴賓卡？那我就不能幫你了！");
            cm.safeDispose();
        }
    } else if (status == 4) {
        cm.sendNext("你一定很好奇 #b貴賓卡吧？#k. 哈哈，這是可以理解的。貴賓卡是前往黃金海灘一個項目，只要有你在，你可以你對弗洛裡納海灘免費。這是一個罕見的項目，即使我們買了這些，但不幸的是我失去了我幾個星期前在我珍貴的暑假。");
    } else if (status == 5) {
        cm.sendNextPrev("我回來了，沒有它，它只是感覺不擁有它。希望有人把它撿起來，把它放在一個安全的地方。無論如何，這是我的故事，誰知道，你可以把它撿起來，把它很好的利用。如果你有什麼問題，儘管問我！");
    } else if (status == 6) {
        cm.dispose();
    }
}
