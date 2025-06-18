var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "#r想兌換什麼:#d\r\n#L1#回歸戒指（經驗加80% 5天）需要7個出席圖章\r\n#L2#神奇方塊x20 需要3個出席圖章\r\n#L3#高級方塊x20 需要4個出席圖章\r\n#L4#防暴捲軸x10 需要10個出席圖章\r\n#L5#國慶紀念幣x150 需要15個出席圖章\r\n#L6#FFN防具自選 需要15個出席圖章\r\n#L7#50個中介幣 需要7個出席圖章\r\n#L8#FFN武器自選 需要21個出席圖章\r\n#L9#暴君自選 需要30個出席圖章";
 cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
            if (cm.itemQuantity(4032398) >=7){
                cm.gainItem(1112918, 1, 5);
        cm.gainItem(4032398, -7);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，出席圖章不足#v4032398#x7。");
        cm.dispose();
            }
            break;
        case 2:
            if (cm.itemQuantity(4032398) >=3){
        cm.gainItem(5062000,20);
        cm.gainItem(4032398, -3);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x3。");
        cm.dispose();
            }
            break;
        case 3:
            if (cm.itemQuantity(4032398) >=4){
        cm.gainItem(5062002,50);
        cm.gainItem(4032398, -4);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x4。");
        cm.dispose();
            }
            break;
        case 4:
            if (cm.itemQuantity(4032398) >=10){
        cm.gainItem(5064000,10);
        cm.gainItem(4032398, -10);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x10。");
        cm.dispose();
            }
            break;
        case 5:
            if (cm.itemQuantity(4032398) >=15){
        cm.gainItem(4000463,10);
        cm.gainItem(4032398, -15);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x15。");
        cm.dispose();
            }
            break;
        case 6:
            if (cm.itemQuantity(4032398) >=15){
        cm.gainItem(2430885,1);
        cm.gainItem(4032398, -15);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x15。");
        cm.dispose();
            }
            break;
        case 7:
            if (cm.itemQuantity(4032398) >=7){
        cm.gainItem(4000463,50);
        cm.gainItem(4032398, -7);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x20。");
        cm.dispose();
            }
            break;
        case 8:
            if (cm.itemQuantity(4032398) >=21){
        cm.gainItem(2434666,1);
        cm.gainItem(4032398, -21);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x25。");
        cm.dispose();
            }
            break;
        case 9:
            if (cm.itemQuantity(4032398) >=30){
        cm.gainItem(2433418,1);
        cm.gainItem(4032398, -30);
        cm.sendOk("兌換成功！");
        cm.dispose();
            } else {
                cm.sendOk("對不起，簽到圖章不足#v4032398#x30。");
        cm.dispose();
            }
            break;
        }
    }
}