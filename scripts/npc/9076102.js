var status = -1;
function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
        cm.sendSimple("你好, 我是興兒,我想要 #b年糕#k...#b\r\n#L0#我給你帶來了年糕!#l\r\n#L1#在這裡需要做些什麼?#l#k");
    } else if (status == 1) {
        if (selection == 0) {
            if (!cm.isLeader()) {
                cm.sendNext("我只接受組隊長的年糕..");
            } else {
                if (cm.haveItem(4001101, 30)) {
                    cm.achievement(100);
                    cm.givePartyItems(4001101, -30, true);
                    cm.givePartyItems(4000884, -30, true);
                    cm.givePartyExp_PQ(70, 1.5);
                    cm.givePartyNX(150);
                    var random = new java.util.Random();
                    var count = random.nextInt(5) + 5;
                    cm.givePartyItems(4310176, count);
                    cm.addPartyTrait("will", 5);
                    cm.addPartyTrait("sense", 1);
                    cm.endPartyQuest(1200);
                    cm.warpParty(933009000);
                } else {
                    cm.sendNext("你們沒有收集到30個年糕.. ");
                }
            }
        } else if (selection == 1) {
            cm.sendNext("這裡是迎月花山丘,月妙會在滿月的時候製作#b年糕#k.,在月亮周圍種下迎月花的種子,就會出現滿月了.,  The #r你必須保護他,防止其他怪物來攻擊他#k. 如果#b月妙#k死亡了, 任務將會失敗...我會再次變得飢餓...");
        }
        cm.dispose();
    }
}
