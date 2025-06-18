/*      
 *  
 *  寵物染色
 *  
 */

        var status;
var temp;
var cast;
var intype;
var pets;
var str = "";
function start() {
    status = -1;
    pets = cm.getSummonedPet();
    for (var i = 0; i < pets.size(); i++) {
        if (pets.get(i) != null) {
            str += "#L" + i + "#[" + pets.get(i).getName() + "]#k\r\n";
        }
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    switch (status) {
        case 0:
            if (pets.size() <= 0) {
                cm.sendOk("我可以為你的寵物進行染色喲，但是我需要一些回報喲。染色是隨機的哦！一次2000樂豆點。 \r\n#r但是你沒有召喚出寵物來呀。#k.");
                cm.dispose();
            } else {
                var selStr = "我可以為你的寵物進行染色喲，但是我需要一些回報喲。染色是隨機的哦！一次2000樂豆點。要的現在請選擇你要進行染色的寵物。\r\n" + str;
                cm.sendSimple(selStr);
            }

            break;
        case 1: //4310085
            intype = selection;
            if (cm.getNX(1) < 2000) {
                cm.sendOk("請確認你有足夠多的樂豆點.");
            } else {
                cm.changePetColor(selection);
                cm.gainNX(-2000);
                cm.sendOk("染色好啦！看看是不是你喜歡的顏色，不喜歡可以繼續進行染色喲，歡迎下次再來");
            }
            cm.dispose();
            break;
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
