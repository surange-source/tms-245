var status = -1;

function start(mode, type, selection) {
    if (mode == 0) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.askAcceptDecline("由我來說明讓強化萌獸的一些方法吧。");
        } else if (status == 1) {
            qm.sendNext("有些可以讓萌獸強化的方法唷。您可以在萌獸圖鑒的強化分頁上進行萌獸的強化。");
        } else if (status == 2) {
            qm.sendNext("#i3801010#\r\n請先把要進行強化的萌獸放在 Base 格。之後再配置用來強化的萌獸們。配置數量最少為 1隻，最多為 4隻。");
        } else if (status == 3) {
            qm.sendNext("#i3801010#\r\n配置完成後點擊強化按鈕，要強化的目標就會得到其他萌獸們的力量了。強化最高能進行到 Lv5為止。");
        } else if (status == 4) {
            qm.sendNext("#i3801010#\r\n強化有可能會成功也有可能會失敗，成功幾率會依照強化用萌獸的階級不同而有所變化。");
        } else if (status == 5) {
            qm.sendNext("#i3801010#\r\n我是覺得…更高等級的強化萌獸應該會有比較好的強化幾率吧？");
        } else if (status == 6) {
            qm.sendNext("#i3801010#\r\n至於強化的順序是依照配置強化用萌獸的順序來進行，由左至右。在完成強化後，強化用萌獸們的力量會消失並回歸自然。");
        } else if (status == 7) {
            qm.sendNext("#i3801010#\r\n若在得到所有強化用萌獸的力量前目標就抵達最高等級時，剩下的強化用萌獸則會回到圖鑒中。");
        } else {
            qm.forceStartQuest();
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        qm.dispose();
    }
}