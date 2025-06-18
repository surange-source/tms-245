/*
 *    阿斯旺 - 宰相
 */

var status = -1;
var beauty = 0;
var next = true;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("雖然被希拉搶走了很多東西，但是在阿斯旺還是能獲得很多東西。如果你能為我們而戰，我就告訴你可以獲得哪些東西。");
        } else if (status == 1) {
            qm.sendSimple("你想知道什麼呢？\r\n\r\n\r\n#b#L0#我想知道個人獎勵有哪些。#k#l");
        } else if (status == 2) {
            qm.sendSimple("有以下個人獎勵。說說你想知道什麼。\r\n\r\n\r\n#b#L0#請介紹一下內在能力。#k#l\r\n#b#L1#怎樣可以獲得購買物品時所需的紀念幣？#k#l");
        } else if (status == 3) {
            if (selection == 0) {
                beauty = 1;
                qm.sendNext("#b內在能力#k是指隱藏在體內的力量。#b每日最多可進行5次#k，只要幫助消滅阿斯旺裡剩餘的希拉的餘黨，就能獲得名聲值。");
            } else if (selection == 1) {
                beauty = 2;
                qm.sendNext("#b每日可進行5次#k，在消滅阿斯旺裡殘餘的希拉的餘黨的過程中，消滅血牙或貓頭鷹塔、守護塔後，有一定概率可獲得紀念幣。");
            }
        } else if (status == 4) {
            if (beauty == 1) {
                qm.sendNextPrev("通過積累名聲值，提升名譽等級後，每達到#b2級、30級、70級#k時各可以獲得一種內在能力。#b用於更改內在能力的還原器#k可以在每次名譽等級提升的時候獲得，也可以使用在解放戰中獲得的紀念幣進行購買。");
            } else if (beauty == 2) {
                qm.sendNextPrev("還有，每次完成消滅餘黨時，扎比埃爾那裡會有新的物品出現。可能是阿斯旺的珍奇卷軸，也可能是可以改變內在力量的各種等級的還原器。此外，還有藥水或阿斯旺裝備，以及可以製作裝備的配方等各種物品。所以#r收到扎比埃爾的悄悄話時#k，一定要去看一看。");
            }
            if (!next) {
                status = 5;
            }
        } else if (status == 5) {
            var selStr = "有關個人獎勵的說明還沒有結束，想知道什麼的話，就跟我說。\r\n\r\n\r\n#b"
            if (beauty == 1) {
                selStr += "#L1#怎樣可以獲得購買物品時所需的紀念幣？#k#l";
            } else if (beauty == 2) {
                selStr += "#L0#請介紹一下內在能力。#k#l";
            }
            status = 2;
            next = false;
            qm.sendSimple(selStr);
        } else if (status == 6) {
            qm.sendYesNo("希望我的說明已經足夠詳細了。我要送你幾件禮物。做好領取的準備了嗎？");
        } else if (status == 7) {
            qm.gainItem(2700000, 1);
            qm.gainItem(4310036, 1);
            qm.forceCompleteQuest();
            qm.sendOk("我送了你10品還原器和1個征服者幣。如果記不住可以獲得哪些東西的話，可以再去問右邊的#b財務大臣伍德萬#k，他會一一跟你說明。好了，祝你好運。");
            qm.dispose();
        }
    }
}
