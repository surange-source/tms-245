/* 傳說時空石 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        im.dispose();
    } else {
        if (mode == 0) {
            im.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (im.getPlayerStat("LVL") < 30) {
                im.playerMessage("等級小於30級無法使用。");
                im.dispose();
            } else {
                im.askMapSelection("#0#弓箭手村#1#魔法密林#2#勇士部落#3#廢棄都市#4#維多利亞港#5#林中之城#6#諾特勒斯號#7#聖地#8#裡恩#9#天空之城#10#冰峰雪域#11#玩具城#12#地球防禦本部#13#童話村#14#水下世界#15#神木村#16#武陵#17#百草堂#18#納希沙漠#19#瑪加提亞#20#埃德爾斯坦");
            }
        } else if (status == 1) {
            switch (selection) {
            case 0:
                im.warp(100000000, 0);
                break;
            case 1:
                im.warp(101000000, 0);
                break;
            case 2:
                im.warp(102000000, 0);
                break;
            case 3:
                im.warp(103000000, 0);
                break;
            case 4:
                im.warp(104000000, 0);
                break
            case 5:
                im.warp(105000000, 0);
                break;
            case 6:
                im.warp(120000000, 0);
                break;
            case 7:
                im.warp(130000101, 0);
                break;
            case 8:
                im.warp(140000000, 0);
                break;
            case 9:
                im.warp(200000000, 0);
                break;
            case 10:
                im.warp(211000000, 0);
                break;
            case 11:
                im.warp(220000000, 0);
                break;
            case 12:
                im.warp(221000000, 0);
                break;
            case 13:
                im.warp(222000000, 0);
                break;
            case 14:
                im.warp(230000000, 0);
                break;
            case 15:
                im.warp(240000000, 0);
                break;
            case 16:
                im.warp(250000000, 0);
                break;
            case 17:
                im.warp(251000000, 0);
                break;
            case 18:
                im.warp(260000000, 0);
                break;
            case 19:
                im.warp(261000000, 0);
                break;
            case 20:
                im.warp(310000000, 0);
                break;
            }
            im.dispose();
        }
    }
}