/* 
 5th Job Quests.
 Made by Kent
 */
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
         qm.sendOk("考慮好後再來找我吧。");
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("據說，在太初的黑暗時期，女神們借助艾爾達斯創造了現在的世界。\r\n\r\n而且，聽說無論是人類，還是精靈、魔族和龍族，其中都有極少數人獲得了女神所傳授的#b控制艾爾達斯的能力#k。");
        } else if (status == 1) {
            qm.sendYesNo("#fUI/tutorial.img/5skill/0/0#\r\n\r\n楓之谷的女神位於#b弓箭手村的弓箭手培訓中心#k，格蘭蒂斯的女神位於#b萬神殿的大神殿內部#k，緋紅的女神位於#b墮落世界樹的廢棄營地#k。我想你肯定能找到女神的所在地。");
        } else if (status == 2) {
            qm.sendNext("如果你迷路了，可以隨時來找我。\r\n\r\n#b(去見見分散在楓之谷各處的女神，然後再回來吧。)#k");
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            qm.sendNext("你已經去見過女神啦。我就知道你能通過女神的考驗。");
        } else {
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}
