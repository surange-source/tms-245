/*
    
*/

var status;
var reward = Array(
                    Array(1062165, 1, 1),     //魔術師劍士短褲
                    Array(1062166, 1, 1),    //魔術師丹維奇短褲    
                    Array(1062167, 1, 1),    //魔術師遊俠短褲    
                    Array(1062168, 1, 1),   //魔術師刺客短褲       
                    Array(1062169, 1, 1),    //魔術師流浪者短褲   
                    Array(1003797, 1, 1),    //    高貴劍士頭盔
                    Array(1003798, 1, 1),    //高貴流丹維奇帽
                    Array(1003799, 1, 1),    //高貴遊俠貝雷帽
                    Array(1003800, 1, 1),    //高貴刺客軟帽
                    Array(1003801, 1, 1),    //高貴流浪者帽
                    Array(1042254, 1, 1),    //鷹眼劍士盔甲
                    Array(1042255, 1, 1),    //鷹眼丹維奇長袍
                    Array(1042256, 1, 1),    //鷹眼遊俠斗篷
                    Array(1042257, 1, 1),    //鷹眼刺客襯衣
                    Array(1042258, 1, 1)    //鷹眼流浪者外衣
                    );

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        im.dispose();
        return;
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
    }

    if (status == 0) {
        if (!im.haveSpace(2)) {
            im.sendOk("消耗欄空間不足，請整理後再打開");
            im.dispose();
            return;
        }
        var index = Math.floor(Math.random() * reward.length);
        var quantity = Math.floor(Math.random() * reward[index][2] + reward[index][1]);
        im.gainItem(2431926, -1);
        im.gainItem(reward[index][0], quantity);
        im.dispose();
    }
}
