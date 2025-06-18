var status;

function start() {
    status = -1;
    cm.sendYesNo("是否要移動到六叉路口?");
    //cm.sendSlideMenu(6, "#0#六岔路口#1#弓箭手村#2#魔法密林#3#勇士部落#4#廢棄都市#5#維多利亞港#6#林中之城#7#諾特勒斯號#8#聖地#9#裡恩#10#天空之城#11# 冰峰雪域#12#玩具城#15#水下世界#16#神木村#17#武陵#18#百草堂#19# 納希沙漠#20#馬加提亞#21#埃德爾斯坦#22#埃歐雷#23# 克裡蒂亞斯#24# 避風港");
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
            cm.warp(104020000, 4);
            cm.dispose();
            break;
        case 1: //
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
