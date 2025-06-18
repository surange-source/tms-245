/*
 * AND製作 
 * 聯繫QQ：358122354
 * 歡迎定制各種腳本
 * 跑旗賽副本
 * 
 */

var status = 0;
var maxPlay = 1;
var em;
var Eventstatus;
var GP = Array(0,1,2,3,4,5);//這裡設置獲得公會點數第一格代表不在前5名獲得的點數，之後從第一名到第五名依次類推，如果不給就填0
function start() {
    status = -1;
    em = cm.getEventManager("PQS");
    Eventstatus = "#r關閉狀態。#k";
    if (em.getProperty("gate") == "2") {//已經關閉入口了
        Eventstatus = "#e#r正在進行中。#n"
    }
    if (em.getProperty("gate") == "1") {//
        Eventstatus = "#e#r開放入口中。#n"
    }
    if (em.getProperty("gate") == "3") {//已經關閉入口了
        Eventstatus = "#e#r管理員已關閉入口，禁止進入。#n"
    }
    if (em.getProperty("gate") == "4") {//已經關閉入口了
        Eventstatus = "#e#r活動結束了。#n"
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status >= 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMap().getId() == 932200002) {
                if (cm.getPlayer().isGm()) {
                    cm.sendSimple("你想做什麼呢？\r\n目前的活動狀態：" + Eventstatus + "\r\n#b#L1# 我想查看活動介紹。\r\n#L2# 我想放棄挑戰離開這裡。#r#e\r\n#L3# 關閉入口！（管理員可見）\r\n#L4# 開啟入口！（管理員可見）");
                } else {
                    cm.sendSimple("你想做什麼呢？\r\n目前的活動狀態：" + Eventstatus + "\r\n#b#L1# 我想查看活動介紹。\r\n#L2# 我想放棄挑戰離開這裡。");
                }

            } else if(cm.getMap().getId() == 910000000){
                status = 3;
                cm.sendYesNo("這裡 可以帶你進入跑旗賽等候地圖哦，現在進入嗎？");
            } else {
                em = cm.getEventManager("PQS");
                if (em.getProperty("gate") == "0") {//已經關閉入口了
                    if (cm.getPlayer().isGm()) {
                        status = 2;
                        cm.sendYesNo("尊敬的管理員，您想開放 跑旗賽 活動的入口嗎？");
                    } else {
                        cm.sendOk("已經開始，或現在不是活動時間。\r\n請稍後再試。");
                        cm.dispose();
                    }
                    return;
                }
                if (cm.getGuild()==null) {
                    cm.sendOk("對不起，你目前沒有公會，我不能讓你進去");
                    cm.dispose();
                    return;
                }
                if (cm.getEventCount("公會跑旗賽") >= maxPlay) {
                    cm.sendOk("今天你已經參與了" + maxPlay + "次，不能再參與該副本了！請明天趕早~");
                    cm.dispose();
                    return;
                }
                if (em.getProperty("gate") == "2") {//已經關閉入口了
                    cm.sendOk("已經開始了公會跑旗賽活動，請稍後再來。");
                    cm.dispose();
                    return;
                }

                if (em == null) {
                    cm.sendOk("出現錯誤，請重新進入副本。");
                } else {
                    if (cm.getPlayer().isGm()) {
                        cm.sendSimple("#e#r[提示]"+em.getProperty("gate")+"：#n#b\r\n\t\t\t\t#e<公會活動>#n\r\n\r\n#d跑旗賽就要開始啦！現在還有幾分鐘的等待時間……\r\n目前的活動狀態：" + Eventstatus + "\r\n\r\n\r\n#b#L0#我想參加<跑旗賽>。#l\r\n#L1#我想瞭解一下該活動的說明。#l \r\n#L3# 關閉活動入口！(GM可見)\r\n#L4# 開啟入口！（管理員可見）\r\n#L2#我想離開這裡。#l")

                    }
                    else if (em.getProperty("gate") == "2" || em.getProperty("gate") == "1") {//等待狀態
                        cm.sendSimple("#e#r[提示]：#n#b\r\n\t\t\t\t#e<公會活動>#n\r\n\r\n#d跑旗賽就要開始啦！現在還有幾分鐘的等待時間……\r\n目前的活動狀態：" + Eventstatus + "\r\n\r\n\r\n#b#L0#我想參加<跑旗賽>。#l\r\n#L2#我想離開這裡。#l\r\n#L1#我想瞭解一下該活動的說明。#l")
                    } else {//第一個人進入的
                        cm.sendSimple("#e#r[提示]：#n#b\r\n\t\t\t\t#e<公會活動>#n\r\n\r\n#d跑旗賽就要開始啦！……\r\n目前的活動狀態：" + Eventstatus + "\r\n\r\n\r\n#b#L0#我想參加<跑旗賽>。#l\r\n#L2#我想離開這裡。#l\r\n#L1#我想瞭解一下該活動的說明。#l")
                    }
                }
            }
        } else if (status == 1) {
            var em = cm.getEventManager("PQS");
            if (selection == 0) {
                if (em.getProperty("gate") == "1") {
                    cm.warp(932200100, 0);
                    cm.setPQLog("公會跑旗賽");
                    //cm.getMap().startMapEffect("現在有3分鐘的時間等候其它玩家，請稍後！", 5121052);
                    cm.getPlayer().dropMessage(1, "活動馬上開始，請等候後面的玩家！");
                    cm.sendOk("[歡迎來到公會跑旗活動！]\r\n大家好，歡迎來到這裡！\r\n首先，本次活動會在每晚9點開放入口，開放時間為3分鐘。註釋：管理員可手動開啟，注意群動態）\r\n其次，本活動規則是玩家必須要有公會並且玩家人數要5人及其以上，遊戲開始後的8分鐘內跑完3圈的前五名有獎勵。\r\n最後，前五名跑完後活動結束，後續完成的沒有獎勵。");
                } else {//等待狀態
                    cm.sendOk("跑旗賽並沒有開啟");
                }
                cm.safeDispose();
            } else if (selection == 1) {
                cm.sendOk("[歡迎來到公會跑旗活動！]\r\n大家好，歡迎來到這裡！\r\n首先，本次活動會在每晚9點開放入口，開放時間為3分鐘。註釋：管理員可手動開啟，注意群動態）\r\n其次，本活動規則是玩家必須要有公會並且玩家人數要5人及其以上，遊戲開始後的8分鐘內跑完3圈的前五名有獎勵。\r\n最後，前五名跑完後活動結束，後續完成的沒有獎勵。");
                cm.safeDispose();
            } else if (selection == 2) {
                cm.sendYesNo("真的要離開這裡嗎？這樣就不能和大家一起玩了呢！");
            } else if (selection == 3) {
                em.setProperty("gate", "3");
                cm.sendOk("已經關閉了入口！");
                cm.spouseMessage(0x23, "[公會跑旗賽活動] 現在管理員已經關閉了活動入口。");
                //cm.worldBrodcastEffect(5121053, "[公會活動] 現在管理員已經關閉了活動入口。");
                cm.dispose();
            } else if (selection == 4) {
                em.setProperty("gate", "1");
                cm.sendOk("已經開啟入口！");
                cm.spouseMessage(0x23, "[公會跑旗賽活動] 現在管理員已經開啟了活動入口。");
                //cm.worldBrodcastEffect(5121053, "[公會跑旗賽活動] 現在管理員已經開啟了活動入口。");
                cm.dispose();
            }
        } else if (status == 2) {
        var em = cm.getEventManager("PQS");
            em.setProperty("Round"+cm.getName(),"0");
            cm.gainGP(GP[0]);
            cm.warp(910000000, 0);
            cm.dispose();
        } else if (status == 3) {
            var em = cm.getEventManager("PQS");
            em.setProperty("gate", "1");
            cm.sendOk("已經開啟了入口！");
            cm.spouseMessage(0x23, "[公會跑旗賽活動] 管理員已經開放了活動入口，請大家速度從拍賣處的副本入口進來哦！");
            //cm.worldBrodcastEffect(5121053, "[公會跑旗賽活動]管理員已經開放了活動入口，請大家速度從拍賣處的副本入口進來哦！");
            cm.dispose();
        } else if (status == 4) {
            cm.warp(932200001, 0);
            cm.dispose();
        }
    }
}