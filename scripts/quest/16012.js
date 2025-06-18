var status = -1;

function start(mode, type, selection) {
    status++;

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        qm.sendNext("您好，勇士！您有好好經營\r\n#b楓之谷聯盟#k嗎？看著\r\n勇士您和您的#b楓之谷聯盟#k一同成長的樣子，是我最大的喜悅。");
    } else if (status == i++) {
        qm.sendYesNo("為了幫助勇士成長，我準備了一個#r任務#k。聽說擊退保護\r\n\r\n#r巨龍#k的#b小龍#k時，會有非常偶～爾的機會出現稀有的#r黃金翼龍#k。擊退#b20隻#k黃金翼龍再來找我，就送您#b#i4310229:##t4310229# 20個#k作為獎勵。\r\n是否執行任務？\r\n\r\n#r※此任務每個世界只能執行1次。#k");
    } else if (status == i++) {
        if (mode == 1) {
            qm.forceStartQuest(true);
            qm.sendOk("您果然很懂得享受挑戰呢！\r\n您可在#r龍之戰場#k中透過#b聯盟團戰#k來獵捕#r黃金翼龍#k。\r\n另外，如果想完成每日任務，您必須親自到村莊裡來找我。\r\n那麼祝您好運囉！");
        } else {
            qm.sendOk("如果想接取#b任務#k請隨時來找我～");
        }
    } else {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;

    var i = -1;
    if (status == i++) {
        qm.dispose();
    } else if (status == i++) {
        qm.getPlayer().gainMapleUnionPoint(20);
        var pt = qm.getWorldShareInfo(18797, "PT");
        if (pt == null || pt.isEmpty()) {
            pt = 0;
        } else {
            pt = parseInt(pt);
        }
        qm.updateWorldShareInfo(18793, "q2", "1");
        qm.forceCompleteQuest(true);
        qm.sendNext("哇！謝謝！勇士您的#b楓之谷聯盟#k真的很強！送您#b#i4310229:##t4310229# 20個#k作為獎勵。\r\n明天也一定要來執行任務喔～我這就幫您更新\r\n\r\n#b每週累積聯盟硬幣排名#k！\r\n#b本週的累積硬幣#k#e:" + pt + "#n");
    } else {
        qm.dispose();
    }
}