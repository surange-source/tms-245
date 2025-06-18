var status = -1;
function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        var b = qm.getPlayer().getKeyValue("EquipTransmitTimes");
        if (b == null || b == "" || parseInt(b) < 1) {
            qm.forceCompleteQuest();
            qm.dispose();
            return;
        }
        qm.sendNext("#h0#目前可以變換下方武器。\r\n\r\n\r\n#b烏特卡勒、俠客圖斯、夫尼爾、航海師、神秘冥界、克梅勒茲、波賽頓、戰國時代、梅斯特武器#k內的1個 #r(各伺服器1次)#k\r\n\r\n#r※ #fs18#完成轉換時不會萃取成精髓，而是會將轉換的武器立即配發至目前角色的背包當中，且呈現不可交易狀態。");
    } else if (status == i++) {
        qm.showSpecialUI(true, "UIEquipTransmit_Extract");
        qm.dispose();
    } else {
        qm.dispose();
    }
}