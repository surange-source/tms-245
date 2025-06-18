/*  This is mada by Jackson
 *  This source is made by Funms Team
 *
 *  功能：NPC 功能演示
 *
 *  @Author Jackson
 */

/* global cm */

﻿var status = -1;
var content = Array(
    "sendOk"
);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;//上一步
    } else {
        status--;//下一步
    }

    switch (status) {
        case 0:
            cm.setInGameCurNodeEventEnd(true);
            cm.setStandAloneMode(true);
            cm.setInGameDirectionMode(true, true, true, false);
            cm.setLayerBlind(true, 200, 1500);
            cm.setForcedInput(0);
            cm.setDelay(30);
            break;
        case 1: //
            cm.setMonologue("#fs30##h0#歡迎你使用#e#r<本程序>#n#k\r\n\r\n\r\n#fs20#現在在這裡簡單介紹下腳本的部分功能。\r\n\r\n\r\n#fs23#以便您能更快的熟悉腳本的使用。\r\n\r\n\r\n#fs26#歡迎大家提出自己的意見與建議。", true);
            break;
        case 2:
            cm.setMonologue("#fs30#好吧！那麼現在就開始吧！\r\n\r\n當前您看到的方法為 \r\n\r\n#rsetMonologue(String,Boolean)#k \r\n\r\n這個方法需要設置遊戲動畫腳本，\r\n\r\n具體請參照本腳本內容。", true);
            break;
        case 3:
            cm.setMonologue("#fs20#嗯先說說發現與臉型皮膚類轉換的腳本\n\r\n\r\n這些腳本可以在各城鎮的相對應的美容店裡找到，\n\r\n\r\n不在多闡述。", true);
            break;
        case 4:
            cm.setMonologue("#fs20#那我們進入正題吧！\n\r\n\r\n現在將會詳細介紹NPC腳本函數方法\n\r\n\r\n如有疑問可在#fs45#QQ群：#r****，中進行提問。", true);
            break;
        case 5:
            cm.setInGameDirectionMode(false, false, false, false);
            cm.setLayerBlind(false, 0, 1500);
            cm.setStandAloneMode(false);
            var text = "請選擇想要查看的方法，點擊進行查看！\r\n#r";
            for (var i = 0; i < content.length; i++) {
                text += "#L" + i + "#" + content[i] + "\r\n";
            }
            cm.askMenuS(text);
            break;
        case 6:
            cm.dispose();
            cm.openNpc(9400401, "AC_Demo_" + content[selection]);
            break;
        default:
            cm.dispose();
            break;
    }
}
