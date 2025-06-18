status = -1;
var selectJob = Array("劍士","法師","弓箭手","盜賊","海盜");
var itemList = Array(
    //劍士
    Array(
        //Array(1102476, 300), // 諾巴西亞戴斯披風 // (無描述)
        //Array(1072737, 300), // 諾巴西亞戴斯靴 // (無描述)
        //Array(1132169, 300), // 諾巴西亞戴斯腰帶 // (無描述)
        //Array(1082543, 220), // 暴君西亞戴斯手套 // (無描述)
        //Array(1102481, 220), // 暴君西亞戴斯披風 // (無描述)
        //Array(1072743, 220), // 暴君西亞戴斯靴 // (無描述)
        //Array(1132174, 220), // 暴君西亞戴斯腰帶 // (無描述)
        Array(1122122, 220)
    ),
    //魔法師
    Array(
        //Array(1102477, 300), // 諾巴赫爾梅斯披風 // (無描述)
        //Array(1072738, 300), // 諾巴赫爾梅斯靴 // (無描述)
        //Array(1132170, 300), // 諾巴赫爾梅斯腰帶 // (無描述)
        //Array(1082544, 220), // 暴君赫爾梅斯手套 // (無描述)
        //Array(1102482, 220), // 暴君赫爾梅斯披風 // (無描述)
        //Array(1072744, 220), // 暴君赫爾梅斯靴 // (無描述)
        //Array(1132175, 220), // 暴君赫爾梅斯腰帶 // (無描述)
        Array(1122123, 220)
    
    ),
    //弓箭手
    Array(
        //Array(1102478, 300), // 諾巴凱倫披風 // (無描述)
        //Array(1072739, 300), // 諾巴凱倫靴 // (無描述)
        //Array(1132171, 300), // 諾巴凱倫腰帶 // (無描述)
        //Array(1082545, 220), // 暴君凱倫手套 // (無描述)
        //Array(1102483, 220), // 暴君凱倫披風 // (無描述)
        //Array(1072745, 220), // 暴君凱倫靴 // (無描述)
        //Array(1132176, 220), // 暴君凱倫腰帶 // (無描述)
        Array(1122124, 220)// -
    
    ),
    //盜賊
    Array(
        //Array(1102479, 300), // 諾巴利卡昂披風 // (無描述)
        //Array(1072740, 300), // 諾巴利卡昂靴 // (無描述)
        //Array(1132172, 300), // 諾巴利卡昂腰帶 // (無描述)
        //Array(1082546, 220), // 暴君利卡昂手套 // (無描述)
        //Array(1102484, 220), // 暴君利卡昂披風 // (無描述)
        //Array(1072746, 220), // 暴君利卡昂靴 // (無描述)
        //Array(1132177, 220),// 暴君利卡昂腰帶 // (無描述)
        Array(1122125, 220)//  - 
    
    ),
    //海盜
    Array(
        //Array(1102480, 300), // 諾巴阿爾泰披風 // (無描述)
        //Array(1072741, 300), // 諾巴阿爾泰靴 // (無描述)
        //Array(1132173, 300), // 諾巴阿爾泰腰帶 // (無描述)
        //Array(1082547, 220), // 暴君阿爾泰手套 // (無描述)
        //Array(1102485, 220), // 暴君阿爾泰披風 // (無描述)
        //Array(1072747, 220), // 暴君阿爾泰靴 // (無描述)
        //Array(1132178, 220),// 暴君阿爾泰腰帶 // (無描述)
        Array(1122126, 220)//  -
    )
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
       if (mode == 0 && status == 0) {
            im.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text = "";
        for(var i=0; i<selectJob.length; i++) {
            text+="#L"+i+"#"+selectJob[i]+"#l\t";
            if (!((i+1)%3)) {
                text+="\r\n\r\n";
            }
        }
        im.sendSimple("打開箱子可以獲得真·覺醒冒險之心，請選擇你要的裝備職業：\r\n#b"+text);
    } else if(status == 1) {
        var _itemList = itemList[selection];
        var chance = Math.floor(Math.random() * 220);
        var finalitem = Array();
        for (var i = 0; i < _itemList.length; i++) {
            if (_itemList[i][1] >= chance) {
                finalitem.push(_itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = 1;
            var notice = 3;
            item = im.gainGachaponItem(itemId, quantity, "神裝箱子", notice);
            if (item != -1) {
            im.gainItem(2431996, -1);
                im.sendOk("你獲得了 #b#t" + item + "##k " + quantity + "個。");
            } else {
                im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
            }
            im.safeDispose();
        } else {
            im.sendOk("今天的運氣可真差，什麼都沒有拿到。");
            im.safeDispose();
        }
    }
}