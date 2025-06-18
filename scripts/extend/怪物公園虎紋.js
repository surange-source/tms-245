/*      
 *  
 *  功能：怪物公園：虎紋
 *  
 */
var status = -1;
var dayEventNames = Array("成長的星期日", "創造的星期一", "強化的星期二", "性向的星期三", "名譽的星期四", "黃金的星期五", "慶典的星期六");
var mapNames = Array("廢棄的都市", "死亡森林", "監視之塔", "龍之巢穴", "忘卻的神殿", "騎士團的要塞", "幽靈峽谷", "消逝的旅途", "啾啾艾爾蘭");
var maps = Array(954000000, 954010000, 954020000, 954030000, 954040000, 954050000, 954060000, 954070000, 954080000);
var minLevel = Array(160, 170, 175, 180, 185, 190, 200, 200, 210);
var maxLevel = Array(169, 179, 184, 189, 194, 199, 209, 209, 219);
var reqQuest = Array(0, 0, 0, 0, 0, 0, 0, 34120, 34218);
var lvRand = [160, -1];
var today;
var id = -1;
function start() {
    if (cm.getParty() != null) {
        cm.sendOk("怪物公園無法以組隊狀態進入，\r\n請解除組隊後入場。");
        cm.dispose();
        return;
    }
    var str = "";
    if (cm.getLevel() < lvRand[0] || (lvRand[1] != -1 && cm.getLevel() >= lvRand[1])) {
        str += lvRand[0] + "級以上";
        if (lvRand[1] != -1) {
            str += "，未滿" + lvRand[1];
        }
    }
    if (str != "") {
        cm.sendOk("高級副本 #b" + str + "#k的玩家才能使用。");
        cm.dispose();
        return;
    }
    var date = new java.text.SimpleDateFormat("yy/MM/dd").format(new java.util.Date());
    var sDate = cm.getWorldShareInfo(18805, "date");
    if (sDate != date) {
        cm.updateWorldShareInfo(18805, "count", "0");
        cm.updateWorldShareInfo(18805, "Td", date);
        cm.updateWorldShareInfo(18805, "date", date);
    }
    var nCount = cm.getWorldShareInfo(18805, "count");
    if (nCount == null || nCount.isEmpty()) {
        nCount = 0;
    } else {
        nCount = parseInt(nCount)
    }
    if (nCount >= 7) {
        cm.sendOk("今天已完成7次怪物公園，請明天再來。");
        cm.dispose();
        return;
    }
    var selStr = "<今天完成的次數#b" + nCount + " / 7次#k (目前伺服器基準)>\r\n<我的楓點：" + cm.getNX(2) + ">\r\n\r\n";
    if (nCount < 2) {
        selStr += "今天的免費過關次數剩下#b" + (2 - nCount) + "次#k。";
    } else if (cm.haveItem(4001864)) {
        selStr += "完成副本時，會使用#b#t" +4001864 + "##k。";
    } else if (cm.getNX(2) >= 10) {
        selStr += "完成副本時，會使用#b10 新楓之谷點數#k。";
    } else {
        cm.sendOk("#e" + selStr + "#n今天免費可以完成的次數2次都已經使用完了。\r\n要繼續完成的話，需要消耗#b10楓點#k。");
        cm.dispose();
        return;
    }
    selStr += "#n#b";
    for (var i = 0; i < mapNames.length; i++) {
        if (reqQuest[i] > 0 && !cm.isQuestFinished(reqQuest[i])) {
            continue;
        }
        selStr += "\r\n#L" + i + "#" + mapNames[i] + "(Lv." + minLevel[i] + "~" + maxLevel[i] + ")#l";
    }
    today = new Date().getDay();
    cm.sendSimple("#e<今天是#b" + dayEventNames[today] + "#k>\r\n" + selStr);
}

function action(mode, type, selection) {
    status++;

    var i = -1;
    if (status == i++ || mode != 1) {
        cm.dispose();
    } else if (status == i++) {
        if (id == -1) {
            id = selection;
        }
        cm.askYesNo("#e<今天是#b" + dayEventNames[today] + "#k>\r\n\r\n選擇副本 : #b" + mapNames[id] + "(Lv." + minLevel[id] + "~" + maxLevel[id] + ")#k\r\n\r\n要進入副本嗎？");
    } else if (status == i++) {
        var em = cm.getEventManager("MonsterPark");
        if (em == null) {
            cm.sendOk("配置不存在。");
        } else {
            if (em.getInstance("MonsterPark" + cm.getPlayer().getId()) != null) {
                em.getInstance("MonsterPark" + cm.getPlayer().getId()).dispose();
            }
            em.startInstance_Solo(maps[id], cm.getPlayer());
        }
        cm.dispose();
    } else {
        cm.dispose();
    }
}
