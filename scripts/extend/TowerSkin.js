/*
 *  城鎮護膚
 */
var status = -1;
var skin = Array(0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13);
var isAngel;
var isZero;
var isSecond = 0;
var ticketID = 5153013;

function start() {
    isAngel = cm.getBeginner() == 6001;
    isZero = cm.getBeginner() == 10000;
    if (isAngel) {
        cm.askAngelicBuster();
    } else if (isZero) {
        cm.sendSimple("請選擇要接受變更的角色.#b\r\n\r\n#b#L0#神之子阿爾法#l\r\n#L1#神之子蓓塔#l\r\n#L2#神之子阿爾法 + 神之子蓓塔#l");
    } else {
        action(1, 0, 0);
    }
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
            var str = "";
            if (isAngel) {
                if (selection == -1) {
                    cm.dispose();
                    return;
                }
                isSecond = selection != 0 ? 1 : 0;
            } else if (isZero) {
                isSecond = selection;
                if (isSecond == 0) {
                    str += "#b只有阿爾法要保養.#k\r\n";
                } else if (isSecond == 1) {
                    str += "#b只有蓓塔要保養.#k\r\n";
                } else if (isSecond == 2) {
                    str += "#b阿爾法和蓓塔都要保養.#k\r\n";
                }
            }
            cm.sendNext("歡迎!歡迎你來到我們" + cm.getMap().getMapName() + ".你想要像我這樣吹彈可破的肌膚嗎?只要有 #b#t" + ticketID + "##k,我就可以幫你保養你的肌膚.要不要交給我們,試一次看看?");
            break;
        case 1:
            var msg = "可以在我們店裡看到使用特殊開發機器管理皮膚後的樣子。你想要哪種皮膚呢?請選擇~";
            if (isSecond == 2) {
                cm.askAvatarZero(ticketID, skin, skin, msg);
            } else {
                cm.askAvatar(msg, skin, ticketID, isSecond != 0);
            }
            break;
        case 2:
            if (!cm.haveItem(ticketID)) {
                cm.sendOk("嗯…好像沒有我們店的皮膚管理員會員卡。很抱歉，如果沒有會員卡的話，就沒有辦法幫你做皮膚治療。");
                cm.dispose();
                return;
            }
            cm.gainItem(ticketID, -1);
            if (cm.setAvatar(skin[selection], isSecond == 1) == -1) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            if (isSecond == 2 && cm.setAvatar(skin[cm.getNumber()], isSecond == 2) == -1) {
                cm.sendOk("出現未知錯誤。");
                cm.dispose();
                return;
            }
            cm.sendOk("完成了,讓朋友們讚歎你的新膚色吧!");
            cm.dispose();
        default:
            cm.dispose();
            break;
    }
}