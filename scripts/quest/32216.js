/* RED 1st impact
    Job selection
    Sugar
    Made by Daenerys
*/

var status = -1;
var sel = 0;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 7) {
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNextS("你那樣幫我，而且剛才還打倒了怪物。看來#h # 你已經是一個像模像樣的冒險家了。你決定好選擇哪個職業了嗎？",1);
    } else if (status == 1) {
        qm.sendNextPrevS("#b哪個職業？#k",17);
    } else if (status == 2) {
        qm.sendNextPrevS("恩，現在開始，你要去的維多利亞島中，有另外五種職業可以進行轉職。嗯，我記得是……劍士、魔法師、弓箭手、盜賊和海盜。有這五種職業。",1);
    } else if (status == 3) {
        qm.sendNextPrevS("#b那些職業各有什麼不同呢？#k",17);
    } else if (status == 4) {
        qm.sendNextPrevS("首先，劍士的力量和體力很強，適合近距離戰鬥。同時，防禦力也相當出色，所以不會輕易倒下。魔法師與劍士不同，通過魔法進行戰鬥，所以相比力量，智力更加重要。因為使用魔法，所以可在遠距離一次攻擊多個敵人。",1);
    } else if (status == 5) {
        qm.sendNextPrevS("說到遠距離攻擊，弓箭手才是最適合的。其可以在遠距離使用箭矢，並且控制距離的能力也相當出色。盜賊雖有不亞於劍士的近距離戰鬥能力，但在戰鬥時往往以速度為主，而非力量。",1);
    } else if (status == 6) {
        qm.sendNextPrevS("最後一個，海盜……其特徵很難用一句話來概括。海盜既能用體術發動近身攻擊，又能在遠距離用手槍或大炮進行攻擊。而且，無論哪種攻擊方式，都相當華麗和富有個性。",1);
    } else if (status == 7) {
        qm.sendSimple("船長已經跟轉職官聯繫過了，只要你現在先決定好的話，待會兒一到港口就能立即收到轉職官的聯繫。#h #你要選擇什麼職業呢？\r\n#b#L1# 具備強大力量和防禦力的劍士#l\r\n#L2# 利用高超的智力使用魔法的魔法師#l\r\n#L3# 善於遠距離攻擊和控制距離的弓箭手#l\r\n#L4# 進行快速攻擊的盜賊#l \r\n#L5# 戰鬥風格華麗獨特的海盜#l#k");
    } else if (status == 8) {
        sel = selection;
        if (selection == 1) {        
           qm.sendNextS("嗯！#h #你一定能夠成為帥氣的劍士！",1);
        } else if (selection == 2) {
            qm.sendNextS("嗯！#h #你一定能夠成為帥氣的法師！",1);
        } else if (selection == 3) {
            qm.sendNextS("嗯！#h #你一定能夠成為帥氣的弓箭手！",1);
        } else if (selection == 4) {
            qm.sendNextS("嗯！#h #你一定能夠成為帥氣的盜賊！",1);
        } else if (selection == 5) {
            qm.sendNextS("嗯！#h #你一定能夠成為帥氣的海盜！",1);
        }
    } else if (status == 9) {
        if (sel == 1) {
            qm.sendNextS("#h #成為劍士的話，那我要不要成為法師呢？雖然可能還做得不夠好，但也許能在遠處用魔法幫助別人。",1);
        } else {
            qm.sendNextS("我想成為劍士。我不想一味接受別人的幫助，而是想在將來成為能夠獨當一面的冒險家。當然，如果我的力量可以幫到別人的話，那就更好了。",1);
        }
    } else if (status == 10) {
        qm.forceStartQuest(1406, sel);
        qm.showAdvanturerBoatScene();
        qm.dispose();
    }
}
