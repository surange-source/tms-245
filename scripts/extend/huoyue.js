/*
    根據每日活躍度完成進度領取獎勵
*/

var status;


function start () {
    status = -1;
    action(1, 0, 0);
}

function action (mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }

    if (status == 0) {
         所有活躍度任務：任務名稱，對齊格式需填充的空格數量，任務ID，每日可接受次數，每次完成可獲得活躍度
        var task = new Array(
                            Array("每日簽到(自由市場)", 13, 120101),
                            Array("給裝備砸卷", 21, 120102),
                            Array("使用方塊", 23, 120103),
                            Array("廢棄任務", 23, 120104),
                            Array("挑戰殘暴炎魔", 23, 120105),
                            Array("挑戰皮卡啾", 21, 120106),
                            Array("擊殺任意BOSS", 19, 120107),
                            Array("在線360分鐘", 20, 120108),
                            Array("在線720分鐘", 20, 120109),
                            Array("跑環任務", 23, 120110),
                            Array("連續簽到", 23, 120111),
                            Array("兌換中介", 23, 4000463),
                            Array("兌換樂豆點", 23, 120113),
                            Array("提升裝備品級", 19, 120114)
            );
        var activity = cm.getActivity();
        var isreceive = cm.getRecevieReward();
        var text = "#e┌\t\t\t   ─ 今日活躍進度 ─   \t\t\t┐#n\r\n\r\n";
        if (isreceive == -1) {
            text += "      #e#r活躍度：" + activity;
            if (activity >= cm.getMaxActivity()) {
                text += "(您已經領取了今日所有活躍獎勵)";
            } else {
                text += "(距離領取下階段獎勵還需點)";
            }
        } else {
            text += "      " + "#L100#" + "#e#r活躍度：" + activity + "(點擊領取第" + isreceive + "階段的活躍獎勵)#l";
        }
        text += "#k#n\r\n\r\n   任務名稱                        活躍度(次)    完成進度\r\n\r\n";
        for (var i=0; i<task.length; i++) {
            var completecount = cm.getPlayer().MissionGetFinish(cm.getPlayer().getId(), task[i][2]);
            if (completecount - cm.getAQMaxTimes(task[i][2]) == 0) { // 如果該任務全部完成，將該任務的描述改為綠色
                text += "#g";
            }

             任務名稱
            text += "   " + task[i][0];

             對其格式
            for (var j = task[i][1]; j > 0; j--) {
                text += " ";
            }
             推薦等級
            text += getStar(task[i][1]);

             活躍度(次)
            text += cm.getAQActivity(task[i][2]) + "點";
            
             對其格式
            if (cm.getAQActivity(task[i][2]) - 10 < 0) {
                text += " ";
            }

             任務可完成次數
            text += "       " + completecount +"/" + cm.getAQMaxTimes(task[i][2]) + "次\r\n#k";
        }
        text += "#e\r\n└\t\t\t\t\t\t\t\t\t\t\t┘#n";

        cm.sendOkS(text, 2);
    } else if (status == 1) {
        if (selection == 100) {
            if (!cm.haveSpace(2)) {
                cm.sendOk("消耗欄空間不足，請整理後再試。");
                cm.dispose();
                return;
            }
            var recevieStage = cm.getRecevieReward();
            cm.gainItem(2431977 + (recevieStage - 1), 1);
            cm.setPQLog("活躍度禮包" + recevieStage);
            cm.sendOk("#r第" + recevieStage + "階段活躍度禮包領取成功，快看看有什麼好東西吧~");
            cm.worldMessage(0x18, "[活躍度系統] : 恭喜 " + cm.getChar().getName() + " 完成 " + recevieStage + " 階段活躍度成功領取禮包。");
        }
        cm.dispose();
    }
}