var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        if (!qm.isQuestFinished(qm.getQuest())) {
            qm.forceCompleteQuest(true);
        }
        if (!qm.isQuestFinished(16173)) {
            qm.forceCompleteQuest(16173, true);
        }
        if (!"1".equals(qm.getWorldShareInfo(18793, "q0"))) {
            var date = new java.text.SimpleDateFormat("yy/MM/dd").format(new java.util.Date());
            qm.updateWorldShareInfo(18793, "q0=1;q1=0;q2=0;pq=0;q1Date=" + date + "q2Date=" + date + "pqDate=" + date);
        }
        qm.sendNext("勇士！\r\n你現在可以製作#b#e<楓之谷聯盟>#k#n。");
    } else if (status == i++) {
        qm.sendNextPrev("<楓之谷聯盟>指的是#b相同世界內角色#k間的集團，#r等級60以上／完成2轉角色#k才可參與聯盟。");
    } else if (status == i++) {
        qm.sendNextPrev("<楓之谷聯盟>所屬的角色配置於#b戰鬥地圖#k可配置#r特殊效果#k。\r\n根據角色配置的方式不同，可獲得不同效果。");
    } else if (status == i++) {
        qm.sendNextPrev("戰鬥地圖內配置的攻擊隊員還可合力挑戰#b巨大龍#k取得#r聯盟戰地硬幣#k。\r\n聯盟戰地硬幣商店內可取得珍貴的道具。");
    } else if (status == i++) {
        qm.sendNextPrev("好，現在請進一步成長到#b團結力量大#k！\r\n\r\n<楓之谷聯盟>可從畫面下端的#b選單鍵#k裡開始！");
    } else {
        qm.openUI(1148);
        qm.showProgressMessageFont("從現在起，您可在詳細選單中管理楓之谷聯盟。", 3, 20, 20, 0);
        qm.dispose();
    }
}