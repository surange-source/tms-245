/*
    名稱：運營員
    內容：快速轉職
*/

var status = -1;
var jobData = new Array(
        Array("劍士", 100, 999),
        Array("狂戰士", 110, 999),
        Array("十字軍", 111, 999),
        Array("英雄", 112, 999),
        Array("見習騎士", 120, 999),
        Array("騎士", 121, 999),
        Array("聖騎士", 122, 999),
        Array("槍騎兵", 130, 999),
        Array("嗜血狂騎", 131, 999),
        Array("黑騎士", 132, 999),
        Array("法師", 200, 999),
        Array("火毒巫師", 210, 999),
        Array("火毒魔導士", 211, 999),
        Array("火毒大魔導士", 212, 999),
        Array("冰雷巫師", 220, 999),
        Array("冰雷魔導士", 221, 999),
        Array("冰雷大魔導士", 222, 999),
        Array("僧侶", 230, 999),
        Array("祭司", 231, 999),
        Array("主教", 232, 999),
        Array("弓箭手", 300, 999),
        Array("獵人", 310, 999),
        Array("遊俠", 311, 999),
        Array("箭神", 312, 999),
        Array("弩弓手", 320, 999),
        Array("狙擊手", 321, 999),
        Array("神射手", 322, 999),
        Array("盜賊", 400, 999),
        Array("刺客", 410, 999),
        Array("暗殺者", 411, 999),
        Array("夜使者", 412, 999),
        Array("俠盜", 420, 999),
        Array("神偷", 421, 999),
        Array("暗影神偷", 422, 999),
        Array("海盜", 500, 999),
        Array("打手", 510, 999),
        Array("格鬥家", 511, 999),
        Array("拳霸", 512, 999),
        Array("槍手", 520, 999),
        Array("神槍手", 521, 999),
        Array("槍神", 522, 999),
        Array("聖魂劍士（一轉）", 1100, 9),
        Array("聖魂劍士（二轉）", 1110, 9),
        Array("聖魂劍士（三轉）", 1111, 9),
        Array("聖魂劍士（四轉）", 1112, 9),
        Array("烈焰巫師（一轉）", 1200, 9),
        Array("烈焰巫師（二轉）", 1210, 9),
        Array("烈焰巫師（三轉）", 1211, 9),
        Array("烈焰巫師（四轉）", 1212, 9),
        Array("破風使者（一轉）", 1300, 9),
        Array("破風使者（二轉）", 1310, 9),
        Array("破風使者（三轉）", 1311, 9),
        Array("破風使者（四轉）", 1312, 9),
        Array("暗夜行者（一轉）", 1400, 9),
        Array("暗夜行者（二轉）", 1410, 9),
        Array("暗夜行者（三轉）", 1411, 9),
        Array("暗夜行者（四轉）", 1412, 9),
        Array("閃雷悍將（一轉）", 1500, 9),
        Array("閃雷悍將（二轉）", 1510, 9),
        Array("閃雷悍將（三轉）", 1511, 9),
        Array("閃雷悍將（四轉）", 1512, 9),
        Array("狂狼勇士（一轉）", 2100, 0),
        Array("狂狼勇士（二轉）", 2110, 0),
        Array("狂狼勇士（三轉）", 2111, 0),
        Array("狂狼勇士（四轉）", 2112, 0),
        Array("砲手", 501, 0),
        Array("重砲兵（二轉）", 530, 0),
        Array("重砲兵隊長（三轉）", 531, 0),
        Array("重砲指揮官（四轉）", 532, 0),
        Array("精靈遊俠（一轉）", 2300, 1),
        Array("精靈遊俠（二轉）", 2310, 1),
        Array("精靈遊俠（三轉）", 2311, 1),
        Array("精靈遊俠（四轉）", 2312, 1),
        Array("幻影俠盜（一轉）", 2400, 2),
        Array("幻影俠盜（二轉）", 2410, 2),
        Array("幻影俠盜（三轉）", 2411, 2),
        Array("幻影俠盜（四轉）", 2412, 2),
        Array("夜光（一轉）", 2700, 3),
        Array("夜光（二轉）", 2710, 3),
        Array("夜光（三轉）", 2711, 3),
        Array("夜光（四轉）", 2712, 3),
        Array("惡魔殺手（一轉）", 3100, 4),
        Array("惡魔殺手（二轉）", 3110, 4),
        Array("惡魔殺手（三轉）", 3111, 4),
        Array("惡魔殺手（四轉）", 3112, 4),
        Array("惡魔復仇者（初級）", 3101, 0),
        Array("惡魔復仇者（中級）", 3120, 0),
        Array("惡魔復仇者（高級）", 3121, 0),
        Array("惡魔復仇者（究級）", 3122, 0),
        Array("煉獄巫師（一轉）", 3200, 999),
        Array("煉獄巫師（二轉）", 3210, 999),
        Array("煉獄巫師（三轉）", 3211, 999),
        Array("煉獄巫師（四轉）", 3212, 999),
        Array("狂豹獵人（一轉）", 3300, 999),
        Array("狂豹獵人（二轉）", 3310, 999),
        Array("狂豹獵人（三轉）", 3311, 999),
        Array("狂豹獵人（四轉）", 3312, 999),
        Array("機甲戰神（一轉）", 3500, 999),
        Array("機甲戰神（二轉）", 3510, 999),
        Array("機甲戰神（三轉）", 3511, 999),
        Array("機甲戰神（四轉）", 3512, 999),
        Array("傑諾（一轉）", 3600, 5),
        Array("傑諾（二轉）", 3610, 5),
        Array("傑諾（三轉）", 3611, 5),
        Array("傑諾（四轉）", 3612, 5),
        Array("米哈逸（一轉）", 5100, 6),
        Array("米哈逸（二轉）", 5110, 6),
        Array("米哈逸（三轉）", 5111, 6),
        Array("米哈逸（四轉）", 5112, 6),
        Array("凱撒（一轉）", 6100, 7),
        Array("凱撒（二轉）", 6110, 7),
        Array("凱撒（三轉）", 6111, 7),
        Array("凱撒（四轉）", 6112, 7),
        Array("天使破壞者（一轉）", 6500, 8),
        Array("天使破壞者（二轉）", 6510, 8),
        Array("天使破壞者（三轉）", 6511, 8),
        Array("天使破壞者（四轉）", 6512, 8),
        Array("傑特（一轉）", 508, 0),
        Array("傑特（二轉）", 570, 0),
        Array("傑特（三轉）", 571, 0),
        Array("傑特（四轉）", 572, 0),
        Array("隱月（一轉）", 2500, 0),
        Array("隱月（二轉）", 2510, 0),
        Array("隱月（三轉）", 2511, 0),
        Array("隱月（四轉）", 2512, 0)
        ); //比較規範的職業ID統一在這個腳本裡面轉職
var noAdvance = "對不起，現在你不能轉職。你的等級必須在 ";
var advance = "#r - 小助手主頁 >> 轉職功能 #k\r\n\r\n你好哦，我這裡可以提供快速轉職哦~";
var unable = "好像你已經通過了全部的轉職了，你的冒險生活怎麼樣？如果遇到不開心的事，笑笑就過了。以後還有很多事情等著你去面對。";
var noThanks = "\r\n\r\n#L1#謝謝，但是我現在暫時不想轉職。#l";
var check = "你確定你想成為一個 ";
var congrats = "你想成為一個 ";
var first;
var newJobName;
var newJob;

function start () {
    status = -1;
    action(1, 0, 0);
}


function action (mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == -1) {
        cm.dispose();
        return;
    }

    if (cm.getPlayer().getSubcategory() == 1) {
        sdchangejob();
        return;
    } else if (cm.getPlayer().getSubcategory() == 2) {
        hpchangejob();
        return;
    } else if (cm.getPlayer().getSubcategory() == 10) {
        lrchangejob();
        return;
    }

    if (cm.haveItem(2431305)) { // 如果有火光武器箱，那麼提示玩家使用後才能轉職
        cm.sendOk("#r您還有上次轉職未使用的火光武器箱，請使用後再轉職。");
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (cm.getJob() % 100 == 0) {
            noAdvance += cm.getJob() % 1000 == 0 ? "10級以上" : "30級以上";
        } else {
            noAdvance += cm.getJob() % 10 == 0 ? "60級以上" : "100級以上";
            noAdvance += " 才能轉職，你現在的等級為 " + cm.getPlayerStat("LVL") + " 級。";
        }
        if (cm.getJob() % 10 == 2 && cm.getJob() != 2002 && cm.getJob() != 3002) {//四轉不允許轉職
            cm.sendOk(unable);
            cm.dispose();
            return;
        } else {
            if (cm.getJob() % 1000 == 0 || cm.getJob() == 0 || cm.getJob() == 3000 || cm.getJob() == 2002 || cm.getJob() == 2003 || cm.getJob() == 2004 || cm.getJob() == 2005 || cm.getJob() == 2000 || cm.getJob() == 6001 || cm.getJob() == 3001 || cm.getJob() == 3002) {
                if (cm.getPlayerStat("LVL") == 8 || cm.getPlayerStat("LVL") == 9) {//如果是法師
                    for (var i = 0; i < jobData.length; i++)
                        if (jobData[i][1] == (200 + cm.getJob()))
                            advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
                } else if (cm.getPlayerStat("LVL") >= 10) {//其他職業
                    if (cm.getJob() == 2000) {
                        advance += "\r\n#b#L" + 2100 + "# 狂狼勇士（一轉）#l";
                    } else if (cm.getJob() == 2002) {
                        advance += "\r\n#b#L" + 2300 + "# 精靈遊俠（一轉）#l";
                    } else if (cm.getJob() == 2003) {
                        advance += "\r\n#b#L" + 2400 + "# 幻影俠盜（一轉）#l";
                    } else if (cm.getJob() == 2004) {
                        advance += "\r\n#b#L" + 2700 + "# 夜光（一轉）#l";
                    } else if (cm.getJob() == 2005) {
                        advance += "\r\n#b#L" + 2500 + "# 隱月（一轉）#l";
                    } else if (cm.getJob() == 3002) {
                        advance += "\r\n#b#L" + 3600 + "# 傑諾（一轉）#l";
                    } else if (cm.getJob() == 6000) {
                        advance += "\r\n#b#L" + 6100 + "# 凱撒（一轉）#l";
                    } else if (cm.getJob() == 6001) {
                        advance += "\r\n#b#L" + 6500 + "# 天使破壞者（一轉）#l";
                    } else if (cm.getJob() == 3001) {
                        advance += "\r\n#b#L" + 3100 + "# 惡魔殺手（一轉）#l";
                        advance += "\r\n#b#L" + 3101 + "# 惡魔復仇者（一轉）#l";
                    } else {
                        for (var i = 0; i < jobData.length; i++) {
                            if ((jobData[i][1] % 100 == 0) && (jobData[i][1] > cm.getJob()) && (jobData[i][1] < (600 + cm.getJob()))) {
                                advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
                            } else if (cm.getJob() == 0 & jobData[i][1] % 100 == 0 && (jobData[i][1] > cm.getJob()) && (jobData[i][1] < (600 + cm.getJob()))) {
                                advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
                            }
                        }
                    }
                } else {
                    cm.sendOk(noAdvance);
                    cm.dispose();
                    return;
                }
                first = true;
            } else if (cm.getJob() % 100 == 0 || cm.getJob() == 3101) { //第二次轉職
                if (cm.getPlayerStat("LVL") >= 30) {
                    if (cm.getJob() == 3101) {
                        advance += "\r\n#b#L" + 3120 + "# 惡魔復仇者（中級）#l";
                    } else {
                        for (var i = 0; i < jobData.length; i++)
                            if (((jobData[i][1] % 10 == 0 && jobData[i][1] % 100 != 0)) && (jobData[i][1] > cm.getJob() && jobData[i][1] <= (cm.getJob() + 30)))
                                advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
                    }
                } else {
                    cm.sendOk(noAdvance);
                    cm.dispose();
                    return;
                }
            } else if (cm.getJob() % 10 == 0 || cm.getJob() % 10 == 1 || cm.getJob() == 3120 || cm.getJob() == 3121) { // 第三次\4次轉職
                if (cm.getPlayerStat("LVL") >= (cm.getJob() % 10 == 1 ? 100 : 60)) {
                    for (var i = 0; i < jobData.length; i++)
                        if (jobData[i][1] - 1 == cm.getJob())
                            advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
                } else {
                    cm.sendOk(noAdvance);
                    cm.dispose();
                    return;
                }
            } else {
                cm.sendOk(unable);
                cm.dispose();
                return;
            }
            advance += noThanks;
            cm.sendSimple(advance);
        }
    } else if (status == 1) {
        if (selection == 1) {
            cm.sendOk("你現在不想轉職嗎？那好吧。等你想要轉職可以來找我，我時時刻刻在這裡。");
            cm.dispose();
        } else {
            if (cm.getSpace(2) >= 1) {
                newJob = selection;
                for (var i = 0; i < jobData.length; i++) {
                    if (jobData[i][1] == newJob) {
                        newnewJobName = jobData[i][0];
                    }
                }
                cm.sendNext("你確定想好要成為一個 #b" + newnewJobName + "#k 嗎？\r\n\r\n#r - 狂狼勇士轉職、四轉轉職、影武者轉職，因為有學習技能操作，可能會延遲2~3秒，請不要關閉對話框。造成的技能異常不能恢復。\r\n\r\n#r - 轉職後，會贈送道具。請確認你的道具欄每格都有2個以上的空格。如果轉職後因背包格數不足而領取不到道具，不能恢復。")
            } else {
                cm.sendNext("繼續轉職的話，請讓裝備欄和消耗欄各騰出兩個格子。")
                cm.dispose();
            }
        }//selection
    } else if (status == 2) {
        cm.changeJob(newJob);
        cm.gainItem(2431305, 1); //火光武器箱 根據角色情況而贈送道具
        cm.playerMessage(-1, "贈送給你 >>> 火光武器箱 一個，可以根據你的角色等級獲取相應的道具！")
//        if (first) {
//            cm.resetAp();
//        }//如果是一轉，重置AP
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
            case 3300:
            case 3310:
            case 3311:
            case 3312: {
                if (!cm.hasSkill(30001061)) {
                    cm.teachSkill(30001061, 1);
                }
                if (!cm.hasSkill(30001062)) {
                    cm.teachSkill(30001062, 1);
                }
                break;
            }

        }
        cm.sendOk("經過小助手的辛苦培養。從現在開始你已經是#b" + newnewJobName + "#k了！\r\n贈送給你#b火光武器箱#k一個，可以根據你的角色等級獲取相應的道具！");
        cm.dispose();
    }
}

function equip(itemId) {
    cm.gainItemAndEquip(itemId, -10);
}

function sdchangejob() {
    if (status == 0) {
        if (cm.getJob() == 434) {//已經轉職完畢
            cm.sendOk("影武的生活怎麼樣？如果生活遇到困難笑一笑就過了，沒有什麼的。")
            cm.dispose();
        } else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {//第一次轉職
            newJob = 400;
            newJobName = "盜賊（影武）";
        } else if (cm.getJob() == 400 && cm.getPlayerStat("LVL") >= 20) {//第二次轉職
            newJob = 430;
            newJobName = "下忍";
        } else if (cm.getJob() == 430 && cm.getPlayerStat("LVL") >= 30) {//第三次轉職
            newJob = 431;
            newJobName = "中忍";
        } else if (cm.getJob() == 431 && cm.getPlayerStat("LVL") >= 45) {//第四次轉職
            newJob = 432;
            newJobName = "上忍";
        } else if (cm.getJob() == 432 && cm.getPlayerStat("LVL") >= 60) {//第五次轉職
            newJob = 433;
            newJobName = "隱忍";
        } else if (cm.getJob() == 433 && cm.getPlayerStat("LVL") >= 100) {//第六次轉職
            newJob = 434;
            newJobName = "影武者";
        } else {
            cm.sendOk("你現在還不符合條件哦，影武者的轉職等級是：#r\r\n10>>20>>30>>45>>60>>100!")
            cm.dispose();
        }
        cm.sendNext("你確定你想成為一個#b" + newJobName + "#k嗎？");
    } else if (status == 1) {
//        if (newJob == 400) {
//            cm.resetAp();
//        }
        cm.changeJob(newJob);
        cm.gainItem(2431305, 1); //火光武器箱 根據角色情況而贈送道具
        cm.playerMessage(-1, "贈送給你 >>> 火光武器箱 一個，可以根據你的角色等級獲取相應的道具！")
        cm.sendOk("已經成功轉職成了#b" + newJobName + "#k")
        cm.dispose();
    }
}

function hpchangejob() {
    if (status == 0) {
        if (cm.getJob() == 532) {
            cm.sendOk("重砲指揮官的生活怎麼樣？如果生活遇到困難笑一笑就過了，沒有什麼的。");
            cm.dispose();
        } else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {
            newJob = 501;
            newJobName = "砲手";
        } else if (cm.getJob() == 501 && cm.getPlayerStat("LVL") >= 30) {
            newJob = 530;
            newJobName = "重砲兵（二轉）";
        } else if (cm.getJob() == 530 && cm.getPlayerStat("LVL") >= 60) {
            newJob = 531;
            newJobName = "重砲兵隊長（三轉）";
        } else if (cm.getJob() == 531 && cm.getPlayerStat("LVL") >= 100) {
            newJob = 532;
            newJobName = "重砲指揮官（四轉）";
        }
        cm.sendNext("你確定你想成為一個#b" + newJobName + "#k嗎？");
    } else if (status == 1) {
//        if (newJob == 501) {
//            cm.resetAp();
//        }
        cm.changeJob(newJob);
        cm.gainItem(2431305, 1); //火光武器箱 根據角色情況而贈送道具
        cm.playerMessage(-1, "贈送給你 >>> 火光武器箱 一個，可以根據你的角色等級獲取相應的道具！")
        cm.sendOk("已經成功轉職成了#b" + newJobName + "#k")
        cm.dispose();
    }
}

function lrchangejob() {
    if (status == 0) {
        if (cm.getJob() == 572) {
            cm.sendOk("傑特怎麼樣？如果生活遇到困難笑一笑就過了，沒有什麼的。");
            cm.dispose();
        } else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {
            newJob = 508;
            newJobName = "傑特（一轉）";
        } else if (cm.getJob() == 508 && cm.getPlayerStat("LVL") >= 30) {
            newJob = 570;
            newJobName = "傑特（二轉）";
        } else if (cm.getJob() == 570 && cm.getPlayerStat("LVL") >= 60) {
            newJob = 571;
            newJobName = "傑特（三轉）";
        } else if (cm.getJob() == 571 && cm.getPlayerStat("LVL") >= 100) {
            newJob = 572;
            newJobName = "傑特（四轉）";
        }
        cm.sendNext("你確定你想成為一個#b" + newJobName + "#k嗎？");
    } else if (status == 1) {
//        if (newJob == 508) {
//            cm.resetAp();
//        }
        cm.changeJob(newJob);
        cm.gainItem(2431305, 1); //火光武器箱 根據角色情況而贈送道具
        cm.playerMessage(-1, "贈送給你 >>> 火光武器箱 一個，可以根據你的角色等級獲取相應的道具！")
        cm.sendOk("已經成功轉職成了#b" + newJobName + "#k")
        cm.dispose();
    }
}