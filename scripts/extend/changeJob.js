/*
製作：Pungin
功能：快速轉職
時間：2021年9月27日
 */

var status = -1;
var job;
var jobNeedLv;
var newJob = new Array();

var noAdvance = "私密馬賽，現在你不能轉職。你的等級必須在 ";
var advance = "#r - 小助手主頁 >> 轉職功能 #k\r\n\r\n你好哦，我這裡可以提供快速轉職哦~";
var unable = "好像你已經通過了全部的轉職了，你的冒險生活怎麼樣？如果遇到不開心的事，笑笑就過了。以後還有很多事情等著你去面對。";
var noThanks = "\r\n\r\n#L100#謝謝，但是我現在暫時不想轉職。#l";

function start() {
    job = cm.getMapleJob();
    var jobNumber = job.getNumber();
    var maxJobNumber = job.getSub() == 1 ? 6 : 4;

    if (jobNumber >= maxJobNumber) {
        if (cm.isQuestFinished(1465)) {
            cm.dispose();
            cm.openNpc(cm.getNpc(), "quickchange5job");
        } else {
            if (cm.getLevel() < 200) {
                cm.sendOk("您的等級不足200無法進行V轉職");
                cm.dispose();
            } else {
                cm.sendOk("恭喜你，勇士！現在你可以進行V轉職了...\r\n#L11#快速V轉");
            }
        }
        return;
    }

    if (cm.haveItem(2431305)) { // 如果有火光武器箱，那麼提示玩家使用後才能轉職
        cm.sendOk("#r您還有上次轉職未使用的火光武器箱，請使用後再轉職。");
        cm.dispose();
        return;
    }

    if (cm.getSpace(1) < 1 || cm.getSpace(2) < 1) {
        cm.sendOk("轉職的話，請讓裝備欄和消耗欄各騰出1個格子");
        cm.dispose();
        return;
    }

    if (job.getSub() == 1) {
        jobNeedLv = jobNumber == 0 ? 10 : jobNumber == 1 ? 20 : jobNumber == 2 ? 30 : jobNumber == 3 ? 45 : jobNumber == 4 ? 60 : 100;
    } else if (job.getId() == 10000) {
        jobNeedLv = 100;
    } else {
        jobNeedLv = jobNumber == 0 ? 10 : jobNumber == 1 ? 30 : jobNumber == 2 ? 60 : 100;
    }

    if (cm.getPlayerStat("LVL") < jobNeedLv) {
        cm.sendOk(noAdvance + "等級 " + jobNeedLv + " 以上才能轉職，你現在的等級為 " + cm.getPlayerStat("LVL") + " 級。");
        cm.dispose();
        return;
    }

    if (jobNumber == 0) {
        // 一轉處理
        switch (Math.floor(job.getId() / 1000)) {
            case 2:
                switch (job.getId() % 10) { // 英雄團一轉
                    case 0:
                        newJob.push(cm.getMapleJobById(2100));
                        break;
                    case 1:
                        newJob.push(cm.getMapleJobById(2200));
                        break;
                    case 2:
                        newJob.push(cm.getMapleJobById(2300));
                        break;
                    case 3:
                        newJob.push(cm.getMapleJobById(2400));
                        break;
                    case 4:
                        newJob.push(cm.getMapleJobById(2700));
                        break;
                    case 5:
                        newJob.push(cm.getMapleJobById(2500));
                        break;
                }
                break;
            case 4:
                switch (job.getId() % 10) { // 曉之陣一轉
                    case 1:
                        newJob.push(cm.getMapleJobById(4100));
                        break;
                    case 2:
                        newJob.push(cm.getMapleJobById(4200));
                        break;
                }
                break;
            case 6:
                switch (job.getId() % 10) { // 超新星一轉
                    case 0:
                        newJob.push(cm.getMapleJobById(6100));
                        break;
                    case 1:
                        newJob.push(cm.getMapleJobById(6500));
                        break;
                    case 2:
                        newJob.push(cm.getMapleJobById(6400));
                        break;
                    case 3:
                        newJob.push(cm.getMapleJobById(6300));
                        break;
                }
                break;
            case 10:
                newJob.push(cm.getMapleJobById(10112));
                break;
            case 11:
                newJob.push(cm.getMapleJobById(11212));
                break;
            case 13:
                switch (job.getId() % 10) { // 怪物一轉
                    case 0:
                        newJob.push(cm.getMapleJobById(13100));
                        break;
                    case 1:
                        newJob.push(cm.getMapleJobById(13500));
                        break;
                }
                break;
            case 15:
                switch (job.getId() % 10) { // 雷普族一轉
                    case 0:
                        newJob.push(cm.getMapleJobById(15200));
                        break;
                    case 1:
                        newJob.push(cm.getMapleJobById(15500));
                        break;
                    case 2:
                        newJob.push(cm.getMapleJobById(15100));
                        break;
                }
                break;
            case 16:
                switch (job.getId() % 10) { // 阿尼瑪一轉
                    case 0:
                        newJob.push(cm.getMapleJobById(16400));
                        break;
                    case 1:
                        newJob.push(cm.getMapleJobById(16200));
                        break;
                }
                break;
            default:
                for each(j in cm.getAllMapleJobs()) {
                    if (j.getId() == 800 || j.getId() == 900 || j.getId() == 910 || Math.floor(job.getId() / 1000) != Math.floor(j.getId() / 1000)) {
                        continue;
                    }
                    if (j.getNumber() == 1 && j.getSub() == job.getSub()) {
                        if (Math.floor(job.getId() / 1000) == 3) { // 反抗軍一轉
                            if ((Math.floor(j.getId() / 100) != 31 && Math.floor(j.getId() / 100) != 36 && job.getId() == 3000) || (Math.floor(j.getId() / 100) == 31 && job.getId() == 3001) || (Math.floor(j.getId() / 100) == 36 && job.getId() == 3002)) {
                                newJob.push(j);
                            }
                        } else {
                            newJob.push(j);
                        }
                    }
                }
                break;
        }
    } else if (jobNumber == 1) { //第二次轉職
        if (job.getId() == 3100) {
            newJob.push(cm.getMapleJobById(3110));
        } else if (cm.getJob() == 3101) {
            newJob.push(cm.getMapleJobById(3120));
        } else {
            for each(j in cm.getAllMapleJobs()) {
                if (j.getNumber() == 2 && j.getSub() == job.getSub() && Math.floor(j.getId() / 100) == Math.floor(job.getId() / 100)) {
                    newJob.push(j);
                }
            }
        }
    } else if (jobNumber < maxJobNumber) {
        for each(j in cm.getAllMapleJobs()) {
            if (j.getNumber() == (jobNumber + 1) && j.getSub() == job.getSub() && Math.floor(j.getId() / 10) == Math.floor(job.getId() / 10)) {
                newJob.push(j);
            }
        }
    }

    if (newJob.length > 0) {
        var menu = "";
        for(var i = 0; i < newJob.length; i++) {
            menu += "\r\n#b#L" + i + "#" + newJob[i].getName() + "#l";
        }
        cm.sendSimple(advance + menu + noThanks);
    } else {
        cm.sendOk(unable);
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = 0;
    if (status == i++) {
        if (selection == 100) {
            cm.sendOk("你現在不想轉職嗎？那好吧。等你想要轉職可以來找我，我時時刻刻在這裡。");
            cm.dispose();
        } else if (selection == 10) {
            cm.warp(270010111);
            cm.dispose();
        } else if (selection == 11) {
            cm.dispose();
            cm.openNpc(cm.getNpc(), "quickchange5job");
        } else if (selection == 12) {
            cm.dispose();
            cm.openNpc(cm.getNpc(), "5jobweapons");
        } else if (selection < 0 || selection >= newJob.length) {
            cm.sendOk("發生未知錯誤。");
            cm.dispose();
        } else {
            if (cm.getSpace(1) >= 1 && cm.getSpace(2) >= 1) {
                job = newJob[selection];
                cm.sendNext("你確定想好要成為一個 #b" + job.getName() + "#k 嗎？\r\n\r\n#r - 狂狼勇士轉職、四轉轉職、影武者轉職，因為有學習技能操作，可能會延遲2~3秒，請不要關閉對話框。造成的技能異常不能恢復。\r\n\r\n#r - 轉職後，會贈送道具。請確認你的道具欄每格都有2個以上的空格。如果轉職後因背包格數不足而領取不到道具，不能恢復。")
            } else {
                cm.sendNext("繼續轉職的話，請讓裝備欄和消耗欄各騰出兩個格子。")
                cm.dispose();
            }
        }
    } else if (status == i++) {
        cm.changeJob(job.getIdWithSub());
        cm.gainItem(2431305, 1); //火光武器箱 根據角色情況而贈送道具
        cm.playerMessage(-1, "贈送給你 >>> 火光武器箱 一個，可以根據你的角色等級獲取相應的道具！")
        switch (newJob) {
            case 2700:
                equip(1352400); // Lv10 - 閃電寶珠(無描述)
                break;
            case 2710:
                equip(1352401); // Lv30 - 耀眼寶珠(無描述)
                break;
            case 2711:
                equip(1352402); // Lv60 - 閃耀寶珠(無描述)
                break;
            case 2712:
                equip(1352403); // Lv100 - 命運寶珠(無描述)
                break;
            case 6100:
                equip(1352500); // Lv10 - 諾巴精髓(無描述)
                break;
            case 6110:
                equip(1352501); // Lv30 - 守護之諾巴精髓(無描述)
                break;
            case 6111:
                equip(1352502); // Lv60 - 正義之諾巴精髓(無描述)
                break;
            case 6112:
                equip(1352503); // Lv100 - 真理之諾巴精髓(無描述)
                break;
            case 6500:
                equip(1352601); // Lv10 - 粉色靈魂手鐲(無描述)
                break;
            case 6510:
                equip(1352602); // Lv30 - 紫色靈魂手鐲(無描述)
                break;
            case 6511:
                equip(1352603); // Lv60 - 藍色靈魂手鐲(無描述)
                break;
            case 6512:
                equip(1352604); // Lv100 - 綠色靈魂手鐲(無描述)
                break;
        }

        if (newJob == 3101) {
            cm.getPlayer().fakeRelog();
        }
        cm.sendOk("經過小助手的辛苦培養。從現在開始你已經是#b" + job.getName() + "#k了！\r\n贈送給你#b火光武器箱#k一個，可以根據你的角色等級獲取相應的道具！");
        cm.dispose();
    } else {
        cm.dispose();
    }
}

function equip(itemId) {
    cm.gainItemAndEquip(itemId, -10);
}
