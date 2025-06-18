var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("好久不見。這段時間你真的強了很多。現在冒險騎士團幾乎找不到比你更強的人了。騎士團長們好像也不是你的對手了……客套話就說到這裡，下面我就直話直說了。");
        } else if (status == 1) {
            qm.sendNextPrev("有一個新任務。根據前不久收到的情報，#r黑色之翼#k的某個成員妄圖對女皇不利。為了阻止他，騎士團的高級騎士#b#p1103000##k正在採取行動，但他一個人好像有點困難。");
        } else if (status == 2) {
            qm.sendNextPrev("維多利亞島還行，而神秘島是連騎士團的情報員都不太瞭解的地方，因此需要支援。你能去支援#p1103000#嗎？她最後一次和我們聯繫是在#b#m211000000##k，你先去那裡找找#p1103000#。");
        } else if (status == 3) {
            qm.forceStartQuest();
            qm.sendYesNo("最後忘記告訴你的是，杜納米斯最後是在#b冰峰雪域#k失去聯繫的，去冰峰雪域應該就能找到他……");
            qm.dispose();
        }
    }
}
