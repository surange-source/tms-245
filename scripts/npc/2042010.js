/*
怪物嘉年華
 */
var status = -1;
var select = -1;
function start() {
    cm.sendSimple("#e<競爭內容 : 怪物嘉年華>#n\r\n覺得技癢的冒險家可以試試參加怪物嘉年華。\r\n\r\n#b#L0#我想要參加怪物嘉年華。\r\n#L1#我想瞭解下怪物嘉年華。\r\n#L2#我想用閃光的楓之谷硬幣交換其他道具。");
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status < 1) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        if (select == -1)
            select = selection;
        if (select == 0) {
            cm.sendOk("#b怪物嘉年華#k暫時關閉");
        } else if (select == 1) {
            cm.sendNext("#b怪物嘉年#k是和其他人自動分配組隊進行的活動，比比誰能在更短的時間內抓到更多的怪物，在更短的時間內抓住更多怪物的人將獲得高分。和其他人組成一組，召喚出怪物，使用技能抓住怪物就行了。");
        } else if (select == 2) {
            cm.sendOk("什麼？一個#t4001254#都沒有啊？想要得到#i1012373:# #t1012373#或者#i1102556:# #t1102556#，#i1122248:# #t1122248#的話，請搜集#b#i4001254# #t4001254##k。");
        }
    } else if (status == 1) {
        if (select == 0) {
            cm.dispose();
        } else if (select == 1) {
            cm.sendNextPrev("你問一個人可以參加嗎？呵呵呵，不用擔心那個。我會幫你找到合適的人一起參加的。你現在只要說你願意參加就行。找到人之後，我會通知你的。\r\n - #e等級#n : 110以上 ~ 130以下\r\n - #e獲得道具#n : \r\n#i1012373:# #t1012373#\r\n#i1102556:# #t1102556#\r\n#i1122248:# #t1122248#");
        } else if (select == 2) {
            cm.dispose();
        }
    } else if (status == 2) {
        if (select == 1) {
            cm.dispose();
        }
    }
}
