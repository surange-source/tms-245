var status = -1
var questid = [1460, 1461, 1462, 1463, 1464, 1465, 1466, 1478]

function start() {
    action(1, 0, 0)
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose()
    } else {
        if (mode == 1)
            status++
        else
            status--

        if (status == 0) {
            cm.sendOk("請選擇功能:\r\n\r\n" + (cm.isQuestFinished(1465) ? "" : "#L0#完成所有五轉任務 100元寶#l\r\n") + "#L1#購買1000個V核心 10元寶#l\r\n#L2#打開V核心UI#l");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getTWD() > 100) {
                    cm.gainTWD(-100)
                    cm.forceCompleteQuest(1465)
                    cm.gainVCraftCore(1000);
                    cm.sendOk("轉職完成，免費獲取1000個V核心，消耗100元寶");
                    cm.playerMessage(5, "[元寶消費提示] 消耗100元寶，剩餘元寶：" + cm.getTWD())
                } else {
                    cm.sendOk("元寶餘額不足！");
                }

            } else if (selection == 1) {
                if (cm.getTWD() > 10) {
                    cm.gainTWD(-10)
                    cm.gainVCraftCore(1000);
                    cm.sendOk("領取完成,獲得1000個V核心，消耗10元寶");
                    cm.playerMessage(5, "[元寶消費提示] 消耗10元寶，剩餘元寶：" + cm.getTWD())
                } else {
                    cm.sendOk("元寶餘額不足！");
                }

            } else if (selection == 2) {
                if (cm.isQuestFinished(1465)) {
                    cm.openUI(1131);
                } else {
                    cm.sendOk("我還無法為你提供服務。！");
                }
            }
            cm.dispose();
        }
    }
}