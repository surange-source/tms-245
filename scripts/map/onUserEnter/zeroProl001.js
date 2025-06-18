var status = -1;

function action(mode, type, selection) {
    if (mode == 0) {
        status--;
    } else {
        status++;
    }

    switch (ms.getMapId()) {        
        case 321000001:
            if (status == 0) {
                ms.setInGameCurNodeEventEnd(true);
                ms.EnableUI(1);
                ms.DisableUI(true);
                ms.playMovie("zero1.avi");
        ms.teachSkill(101120204, 0, 10); // 秈頂忌吊闌
        ms.teachSkill(101120104, 0, 10); // 秈頂窯瞨闌
                ms.teachSkill(101110203, 0, 10); // 秈頂臂輔腑辟
                ms.teachSkill(101110200, 0, 10); // 秈頂臂鑼舠
                ms.teachSkill(101110102, 0, 10); // 秈頂臂
                ms.teachSkill(101100201, 0, 10); // 秈頂癹臂
                ms.teachSkill(101100101, 0, 10); // 秈頂猌竟耏
                ms.teachSkill(101000101, 0, 10); // 秈頂綺闌
            } else {
                ms.EnableUI(0);
                ms.dispose();
                ms.warp(321000000, 0);
            }
            break;
        default:
            ms.dispose();
    }
}