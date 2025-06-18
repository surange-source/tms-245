/* 
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC (the one and only)
 */

var status = -1;
var selectedType;
var scrolls;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendSimple("...#b\r\n#L0#我應該做些什麼呢？#l\r\n#L1#我找到#t4001018#了#l\r\n#L2#我想出去#l");
    } else if (status == 1) {
        selectedType = selection;
        if (selection == 0) {
            cm.sendNext("揭示殘暴炎魔的力量，你將不得不重新創建它的核心。隱藏在這個地牢的地方是一個「#t4001018#」是一種製作核心的必要材料。找到它，並把它帶回給我。\r\n\r\n哦，你能幫我一個忙嗎？也有許多卷軸壓在這裡的岩石下面。如果你能得到30個，我會給予你獎勵。")
            cm.safeDispose();
        } else if (selection == 1) {
            if (!cm.haveItem(4001018)) { //documents
                cm.sendNext("請把#t4001018#帶過來")
                cm.safeDispose();
            } else {
                if (!cm.haveItem(4001015, 30)) { //documents
                    cm.sendYesNo("你確定要把#t4001018#製作成#t4031061#嗎？");
                    scrolls = false;
                } else {
                    cm.sendYesNo("你確定要把#t4001018#製作成#t4031061#嗎？你也給我帶來了30個卷軸，我會遵守承諾給予你相應的獎勵的。");
                    scrolls = true;
                }
            }
        } else if (selection == 2) {
            cm.sendYesNo("你確定要出去嗎？如果你是隊長你的隊伍也會被一起傳送出去的！")
        }
    } else if (status == 2) {
        var eim = cm.getEventInstance();
        if (selectedType == 1) {
                    
            cm.gainItem(4001018, -1);
            if (scrolls) {
                cm.gainItem(4001015, -30);
            }
            //give items/exp
            cm.givePartyItems(4031061, 1);
            if (scrolls) {
                cm.givePartyItems(2030007, 5);
                cm.givePartyExp(20000);
            } else {
                cm.givePartyExp(12000);
            }
                    
            //clear PQ

            if (eim != null) {
                eim.finishPQ();
            }
            cm.dispose();
        } else if (selectedType == 2) {
            if (eim != null) {
                if (cm.isLeader())
                    eim.disbandParty();
                else
                    eim.leftParty(cm.getChar());
            } else {
                cm.warp(280090000, 0);
            }
            cm.dispose();
        }
    }
}
