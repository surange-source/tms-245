var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayer().getMapId() == 863010600) {
            cm.sendYesNo("哇哇哇!!!你既然成功平息了培羅德的憤怒,請讓我為勇士頒發獎勵吧!!!");
        } else {
            cm.sendOk("哼！旁邊的老頭搶了我的貨物，我非常氣憤。");
            cm.safeDispose();
        }
    } else if (status == 1) {
        if ((cm.getSpace(1) > 1||cm.getSpace(2) > 1||cm.getSpace(3) > 1||cm.getSpace(4) > 1)) {
            var item;
        var chance1 = Math.floor(Math.random() * 500);
        if(chance1 >= 0 && chance1 <= 440){
         var itemList = new Array(
1113072, //低級培羅德戒指
1032220, //低級培羅德耳環
1122264, //低級培羅德吊墜
1132243  //低級培羅德腰帶
            );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "培羅德", 3);
        } else if(chance1 >= 441 && chance1 <= 470){
         var itemList = new Array(
1113073, //中級培羅德戒指
1032221, //中級培羅德耳環
1122265, //中級培羅德吊墜
1132244  //中級培羅德腰帶
            );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "培羅德", 3);
        } else if(chance1 >= 471 && chance1 <= 490){
         var itemList = new Array(
1113074, //高級培羅德戒指
1032222, //高級培羅德耳環
1122266, //高級培羅德吊墜
1132245  //高級培羅德腰帶
            );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "培羅德", 3);
        }else{
         var itemList = new Array(
1113075, //最高級培羅德戒指
1032223, //最高級培羅德耳環
1122267, //最高級培羅德吊墜
1132246  //最高級培羅德腰帶
            );
                item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "培羅德", 3);
}
            if (item != -1) {
        cm.warp(863000100);
        cm.dispose();
            } else {
                cm.sendOk("請你確認在背包的裝備,消耗,其他窗口中是否有一格以上的空間?");
            }
        } else {
            cm.sendOk("xx錯誤");
        }
        cm.safeDispose();
    }
}
