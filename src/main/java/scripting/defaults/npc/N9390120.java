package scripting.defaults.npc;

import scripting.defaults.event.BossGiantVellud;
import scripting.event.EventManager;
import scripting.npc.AbstractNPCScript;

public class N9390120 extends AbstractNPCScript {

    boolean Open = true;
    String EventScriptName = BossGiantVellud.class.getSimpleName();
    String PQLogName = "培羅德";
    //boolean Practice = true;
    int StartMap = 863010000;
    int MinLevel = 140;
    int MaxLevel = 300;
    int MaxEnter = 1;
    int RefreshDayOfWeek = 0;
    int MinPlayers = 1;
    int MaxPlayers = 6;
    //int EventTime = 30*60*1000;
    //int ReviveCount = 3;
    //int practiceMaxEnter = 5;

    int chs = -1;

    @Override
    public void start() {
        if (cm.getMapId() == StartMap) {
            cm.askMenu("#r#e<前往培羅德>#n#k\r\n因愛心樹的憤怒而墮落變化的#r培羅德#k。\r\n使用#i4033981##t4033981#從培羅德的腳下開始進攻，或使用#i4033982##t4033982#立即移動到培羅德較危險的頭部。\r\n#L1# 使用 #b #i4033981##t4033981##n#k入場。\r\n#L2# 使用 #b #i4033982##t4033982##n#k入場。#r#e(注意：極度危險)#n#k");
        } else {
            cm.askYesNo("你現在確定放棄任務,從這裡出去?");
        }
    }

    @Override
    public void action(int mode, int type, int selection) {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (cm.getMapId() == StartMap) {
            if (status == 0) {
                if (chs == -1) {
                    chs = selection;
                }
                EventManager em = cm.getEventManager(EventScriptName);
                if (em == null || !Open) {
                    cm.sendOk("副本暫未開啟，敬請期待。");
                    cm.dispose();
                    return;
                }
                String rwpz = "#e<Boss - 培羅德>#n\r\n#k\r\n#e#r";
                rwpz += "\r\n#e推薦人數：" + MinPlayers + " - " + MaxPlayers + "#n#e    推薦等級：" + MinLevel + " - " + MaxLevel + "#k#n";
                rwpz += "\r\n當前累計擊敗：#r#e" + cm.getDayOfWeekPQLog(PQLogName, RefreshDayOfWeek) + "#n#k 次";
                rwpz += "    剩餘擊敗次數：#r#e" + ((MaxEnter - cm.getDayOfWeekPQLog(PQLogName, RefreshDayOfWeek)) + "#n#k 次#n") + "#k\r\n\r\n";
                cm.askYesNo(rwpz + "           #b#h0# \n#k#e是否現在就進入？#n");
            } else if (status == 1) {
                if (cm.getParty() == null) {
                    cm.sendNext("需要組隊才可以入場。");
                } else if (!cm.isLeader()) { // 判斷組隊隊長
                    cm.sendOk("請讓你們的組隊長和我對話。");
                } else if (!cm.isAllPartyMembersAllowedLevel(MinLevel, MaxLevel)) {
                    cm.sendNext("組隊成員等級 " + MinLevel + " 以上 " + MaxLevel + " 以下才可以入場。");
                } else if (!cm.isAllPartyMembersAllowedDayOfWeekPQ(PQLogName, MaxEnter, RefreshDayOfWeek) && !cm.getPlayer().isIntern()) {
                    cm.sendNext("有隊員今天已經擊敗過培羅德，所以無法入場。請重新組成隊伍。");
                } else if (!cm.allMembersHere()) {
                    cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                } else {
                    EventManager em = cm.getEventManager(EventScriptName);
                    if (em == null || !Open) {
                        cm.sendOk("副本暫未開啟，敬請期待。");
                    } else {
                        cm.gainMembersPQ(PQLogName, 1);
                        cm.dispose();
                        em.setProperty("HeadMap", chs == 2 ? "1" : "0");
                        em.startInstance(cm.getParty(), cm.getMap());
                    }
                }
                cm.dispose();
            } else {
                cm.dispose();
            }
        } else {
            if (status == 0) {
                cm.warp(StartMap, 0);
            }
            cm.dispose();
        }
    }
}
