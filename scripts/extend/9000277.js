/*
 * 菜菜製作 奇幻楓之谷工作室所有
 * 聯繫QQ：537050710
 * 歡迎定制各種腳本
 * OX問答副本  個人版進入NPC
 * 
 */

var status = 0;
var maxPlay = 50;
var em;
var emgate;
var Eventstatus;

function start() {
    status = -1;
    em = cm.getEventManager("OXEvent");
    emgate = cm.getEventManager("OXEventOpen");
    Eventstatus = "#r關閉狀態。#k";
    if (em.getProperty("start") == "3") {//已經關閉入口了
        Eventstatus = "#e#r正在進行中。#n"
    }
    if (em.getProperty("start") == "1") {//
        Eventstatus = "#e#r開放入口中。#n"
    }
    if (em.getProperty("start") == "2") {//
        Eventstatus = "#e#r等待入場中。#n"
    }
    if (em.getProperty("start") == "0") {//已經關閉入口了
        Eventstatus = "#e#r等待入場。#n"
    }
    if (emgate.getProperty("open") == "false") {//
        Eventstatus = "#e#r管理員已關閉入口，禁止進入。#n"
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
            if (cm.getMap().getId() == 910048100) {
                if (cm.getPlayer().isGm()) {
                    cm.sendSimple("你想做什麼呢？\r\n目前的活動狀態：" + Eventstatus + "\r\n#b#L1# 我想查看活動介紹。\r\n#L2# 我想放棄挑戰離開這裡。#r#e\r\n#L3# 關閉入口！（管理員可見）\r\n#L4# 開啟入口！（管理員可見）");
                } else {
                    cm.sendSimple("你想做什麼呢？\r\n目前的活動狀態：" + Eventstatus + "\r\n#b#L1# 我想查看活動介紹。\r\n#L2# 我想放棄挑戰離開這裡。");
                }
            } else if (cm.getMap().getId() == 910048200) {
                cm.sendOk("你好~");
                cm.dispose();
            } else {
                em = cm.getEventManager("OXEvent");
                emgate = cm.getEventManager("OXEventOpen");
                if (emgate.getProperty("open") == "false") {//已經關閉入口了
                    if (cm.getPlayer().isGm()) {
                        status = 2;
                        cm.sendYesNo("尊敬的管理員，您想開放OX賓果活動的入口嗎？");
                    } else {
                        cm.sendOk("已經開始，或現在不是活動時間。\r\n請稍後再試。");
                        cm.dispose();
                    }
                    return;
                }
                if (cm.getPQLog("OX賓果活動") >= maxPlay) {
                    cm.sendOk("今天你已經參與了" + maxPlay + "次，不能再參與該副本了！請明天趕早~");
                    cm.dispose();
                    return;
                }
                if (cm.getPlayerCount(910048100) == 0 && (em.getProperty("start") == "3" || em.getProperty("start") == "4")) {//已經關閉入口了 但是裡面已經沒人了，重置
                    em.setProperty("OXEventState", "0");
                    em.setProperty("start", "0");
                    em.setProperty("question", "0");
                    em.setProperty("RightAnwser", "0");//得到問題的正確答案
                    cm.sendOk("請重新打開我哦~~");
                    cm.dispose();
                    return;
                }
                if (em.getProperty("start") == "3") {//已經關閉入口了
                    cm.sendOk("已經開始了OX賓果活動，請稍後再來。");
                    cm.dispose();
                    return;
                }

                if (em == null) {
                    cm.sendOk("出現錯誤，請重新進入副本。");
                } else {
                    if (cm.getPlayer().isGm()) {
                        cm.sendSimple("#e#r[●ω●提示]：#n#b\r\n\t\t\t\t#e<OX問答活動>#n\r\n\r\n#dOX賓果活動就要開始啦！現在還有幾分鐘的等待時間……\r\n目前的活動狀態：" + Eventstatus + "\r\n\r\n\r\n#b#L0#我想參加<OX賓果活動>。#l\r\n#L1#我想瞭解一下該活動的說明。#l \r\n#L3# 關閉活動入口！(GM可見)")

                    }
                    else if (em.getProperty("start") == "2" || em.getProperty("start") == "1") {//等待狀態
                        cm.sendSimple("#e#r[●ω●提示]：#n#b\r\n\t\t\t\t#e<OX問答活動>#n\r\n\r\n#dOX賓果活動就要開始啦！現在還有幾分鐘的等待時間……\r\n目前的活動狀態：" + Eventstatus + "\r\n\r\n\r\n#b#L0#我想參加<OX賓果活動>。#l\r\n#L1#我想瞭解一下該活動的說明。#l")
                    } else {//第一個人進入的
                        cm.sendSimple("#e#r[●ω●提示]：#n#b\r\n\t\t\t\t#e<OX問答活動>#n\r\n\r\n#dOX賓果活動就要開始啦！……\r\n目前的活動狀態：" + Eventstatus + "\r\n\r\n\r\n#b#L0#我想執行<OX賓果活動>。#l\r\n#L1#我想瞭解一下該活動的說明。#l")
                    }
                }
            }
        } else if (status == 1) {
            if (selection == 0) {
                if (em.getProperty("start") == "0") {
                    em.setProperty("start", "1");//設置開關，已經可以進入了。 之後一個倒計時60秒，等候後面的玩家進來
                    cm.warp(910048100, "sp");
                    cm.setPQLog("OX賓果活動");
                    cm.getMap().startMapEffect("現在有3分鐘的時間等候其它玩家，請稍後！", 5121052);
                    cm.sendOk("[歡迎來到OX問答活動！]\r\n大家好，歡迎來到這裡！\r\n在這我們將回答二十道問答題，它們涉及到很多方面，但問題只有兩種答案，#b#eO正確，X錯誤#n#k。\r\n題目出現的時，選擇正確答案，站在正確的位置吧！\r\n#e（站在中間的位置不算，將會被視為錯誤答案）\r\n#n#r 在前5道題目答錯不受到影響，但是在後面錯的話，會被請出該地圖不再作答。\r\n\r\n如果你通過了我的考驗的話，，將贈送#i2432971# #t2432971# 一個。");
                } else if (em.getProperty("start") == "1") {//入口已經開放
                    cm.warp(910048100, "sp");
                    cm.setPQLog("OX賓果活動");
                    cm.getMap().startMapEffect("現在有3分鐘的時間等候其它玩家，請稍後！", 5121052);
                    cm.sendOk("[歡迎來到OX問答活動！]\r\n大家好，歡迎來到這裡！\r\n在這我們將回答二十道問答題，它們涉及到很多方面，但問題只有兩種答案，#b#eO正確，X錯誤#n#k。\r\n題目出現的時，選擇正確答案，站在正確的位置吧！\r\n#e（站在中間的位置不算，將會被視為錯誤答案）\r\n#n#r 在前5道題目答錯不受到影響，但是在後面錯的話，會被請出該地圖不再作答。\r\n\r\n如果你通過了我的考驗的話，，將贈送#i2432971# #t2432971# 一個。");
                } else {//等待狀態
                    cm.warp(910048100, "sp");
                    cm.setPQLog("OX賓果活動");
                    cm.sendOk("[歡迎來到OX問答活動！]\r\n大家好，歡迎來到這裡！\r\n在這我們將回答二十道問答題，它們涉及到很多方面，但問題只有兩種答案，#b#eO正確，X錯誤#n#k。\r\n題目出現的時，選擇正確答案，站在正確的位置吧！\r\n#e（站在中間的位置不算，將會被視為錯誤答案）\r\n#n#r 在前5道題目答錯不受到影響，但是在後面錯的話，會被請出該地圖不再作答。\r\n\r\n如果你通過了我的考驗的話，將贈送#i2432971# #t2432971# 一個。");
                    cm.getPlayer().dropMessage(1, "活動馬上開始，請等候後面的玩家！");
                }
                // cm.getNpcNotice(1540104, "[歡迎來到OX問答活動！]\r\n大家好，歡迎來到這裡！\r\n#b讓我們先等候3分鐘來歡迎後面到來的冒險家吧！#k\r\n在這我們將回答二十道問答題，它們涉及到很多方面，但問題只有兩種答案，#b#eO正確，X錯誤#n#k。\r\n題目出現的時，選擇正確答案，站在正確的位置吧！\r\n#e（站在中間的位置不算，將會被視為錯誤答案）\r\n#n#r 在前5道題目答錯不受到影響，但是在後面錯的話，會被請出該地圖不再作答。", 9);//顯示180秒的活動介紹
                cm.safeDispose();
            } else if (selection == 1) {
                cm.sendOk("[歡迎來到OX問答活動！]\r\n大家好，歡迎來到這裡！\r\n在這我們將回答二十道問答題，它們涉及到很多方面，但問題只有兩種答案，#b#eO正確，X錯誤#n#k。\r\n題目出現的時，選擇正確答案，站在正確的位置吧！\r\n#e（站在中間的位置不算，將會被視為錯誤答案）\r\n#n#r 在前5道題目答錯不受到影響，但是在後面錯的話，會被請出該地圖不再作答。")
                cm.safeDispose();
            } else if (selection == 2) {
                cm.sendYesNo("真的要離開這裡嗎？這樣就不能和大家一起玩了呢！");
            } else if (selection == 3) {
                emgate.setProperty("open", "false");
                cm.sendOk("已經關閉了入口！");
                cm.spouseMessage(0x24, "[OX賓果活動] 現在管理員已經關閉了活動入口。");
                //cm.worldBrodcastEffect(5121052, "[OX賓果活動] 現在管理員已經關閉了活動入口。");
                cm.dispose();
            } else if (selection == 4) {
                emgate.setProperty("open", "true");
                cm.sendOk("已經開啟入口！");
                cm.spouseMessage(0x24, "[OX賓果活動] 現在管理員已經開啟了活動入口。");
                //cm.worldBrodcastEffect(5121052, "[OX賓果活動] 現在管理員已經開啟了活動入口。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.warp(910000000, 0);
            cm.dispose();
        } else if (status == 3) {
            emgate.setProperty("open", "true");
            cm.sendOk("已經開啟了入口！");
            cm.spouseMessage(0x24, "[OX賓果活動] 管理員已經開放了活動入口，請大家速度從拍賣處的副本入口進來哦！");
            //cm.worldBrodcastEffect(5121052, "管理員已經開放了活動入口，請大家速度從拍賣處的副本入口進來哦！");
            cm.dispose();
        }
    }
}