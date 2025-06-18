/*      
 *  
 *  
 *  功能：每日尋寶
 *  備註：任務初始ID 200100，子任務依次加1，新任務分類的初始ID需間隔100，如100200
 *  
 */

var status = 0;
var text = "";
var questid = 200100;
var maxtimes = 5;
var playerid = 0;
var accepttimes = 0;
var questitemid = 0;
var questitemcs = 0;
var mapid = 0;
var qinfo = "";
var lastMapList = Array();
var maplist = Array(
        Array(865020200, "克梅勒茲共和國 - 運河3"),
        Array(100000200, "弓箭手村 - 丘比特公園"),
        Array(100000201, "弓箭手村 - 弓箭手培訓中心"),
        Array(100000202, "弓箭手村 - 寵物公園"),
        Array(100010000, "弓箭手村 - 弓箭手村北邊山丘"),
        Array(100010001, "弓箭手村 - 可疑的山丘"),
        Array(100010100, "弓箭手村 - 做夢的森林小徑"),
        Array(100000001, "弓箭手村 - 瑪亞的家"),
        Array(100000002, "弓箭手村 - 傑伊的家"),
        Array(100000003, "弓箭手村 - 麗娜的家"),
        Array(102000000, "勇士之村 - 勇士之村"),
        Array(102000003, "勇士之村 - 勇士聖殿"),
        Array(102030000, "火焰之地 - 黑肥肥領土"),
        Array(102030100, "火焰之地 - 野豬領土"),
        Array(102030200, "火焰之地 - 鐵甲豬領土"),
        Array(102030300, "火焰之地 - 燃燒的熱氣"),
        Array(102030400, "火焰之地 - 碳屑之地"),
        Array(103000000, "墮落城市 - 墮落城市"),
        Array(103000001, "墮落城市 - 墮落城市武器店"),
        Array(103000002, "墮落城市 - 墮落城市藥店"),
        Array(103000003, "墮落城市 - 秘密據點"),
        Array(103000004, "墮落城市 - 墮落城市醫院"),
        Array(103000005, "墮落城市 - 墮落城市美髮店"),
        Array(103000006, "墮落城市 - 墮落城市修理店"),
        Array(104010000, "砲台路 - 維多利亞港外圍"),
        Array(100000204, "弓箭手村 - 弓箭手之殿"),
        Array(101000004, "魔法森林 - 法師之殿"),
        Array(102000004, "勇士之村 - 戰士之殿"),
        Array(103000008, "墮落城市 - 盜賊之殿"),
        Array(220000001, "玩具城 - 玩具城武防店"),
        Array(220000002, "玩具城 - 玩具城雜貨店"),
        Array(220000003, "玩具城 - 玩具城整形外科"),
        Array(220000004, "玩具城 - 玩具城美髮店"),
        Array(220000005, "玩具城 - 玩具城護膚中心"),
        Array(220000006, "玩具城 - 玩具城寵物散步路"),
        Array(220000100, "玩具城 - 玩具城售票處"),
        Array(220000110, "玩具城 - 碼頭<開往天空之城>"),
        Array(220000111, "玩具城 - 候船室<開往天空之城>"),
        Array(240000001, "神木村 - 村長之家"),
        Array(240000002, "神木村 - 藥水商店"),
        Array(240000003, "神木村 - 亞可之家"),
        Array(240000004, "神木村 - 依托之家"),
        Array(240000005, "神木村 - 庫摩之家"),
        Array(240000006, "神木村 - 潘姆之家")
        );
function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == -1) {
            cm.dispose();
        } else if (status == 0) {
            playerid = cm.getPlayer().getId();
            accepttimes = maxtimes - cm.getEventCount("尋寶任務");
            text = "\t\t\t#e每日尋寶 - 里諾赫的黃金袋子#n\r\n\r\n";
            text += "我的財富，遍佈世界各地……\r\n";
            text += "今日剩餘尋寶次數：#r" + accepttimes + "#k 次\r\n";
            text += "#r#L999#尋寶任務簡介#l#k\r\n\r\n";
            if (cm.isQuestActive(questid)) {  // 判斷是否接取了任務
                if (cm.isQuestFinished(questid)) { // 判斷是否完成任務
                    if (accepttimes <= 0) { // 判斷是否超過完成次數
                        text += "您已經完成了今天的尋寶任務，請明天0點後再來吧~\r\n";
                    } else {
                        text += "#b#L0#接受任務#l#k\r\n";
                    }
                } else {
                    text += "#r#L2#放棄任務 (無法獲得任何獎勵，且會消耗一次任務次數)#l\r\n";
                }
            } else if (accepttimes > 0) {
                text += "#b#L3#接受任務#l\r\n";
            } else {
                text += "  您已經完成了今天的尋寶任務，請明天0點後再來吧~\r\n";
            }
            text += "#b#L222#購買黃金羅盤#l#k";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 999) {
                status = -1;
                text = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n\r\n#e#d什麼是尋寶任務？#n#k\r\n";
                text += "\t接受尋寶任務之後，你將會獲得一個#b尋寶便簽#k，我會告訴你可能藏有寶藏的5個地圖，並且會保存在尋寶便簽中，其中只有一個地圖裡面會有一個寶箱，你需要在#r10分鐘之內#k找到這個#b正確的地圖#k並打開寶箱就能獲得一個#b里諾赫的黃金袋子#k，打開袋子能獲得豐厚的獎勵，如果超出了時間，就只能#r放棄任務#k咯。\r\n";
                text += "#e#d什麼是黃金羅盤？#n#k\r\n";
                text += "\t使用黃金羅盤，可以幫助你直接尋找到正確的寶藏地圖。您可以通過購買獲得黃金羅盤，同時尋寶過程中有幾率獲得黃金羅盤。\r\n";
                cm.sendSimple(text);
            } else if (selection == 222) {
                cm.sendYesNo("是否要花費#r30#k楓點購買一個黃金羅盤？");
            } else if (selection == 0) {            // 重新接受任務 初始化
                if (cm.getLevel() < 160) {
                    cm.sendOk("等級不足160級，無法領取任務。");
                    cm.dispose();
                    return;
                }
                if (cm.getSpace(2) < 1) {
                    cm.sendOk("你的消耗欄格子不足，請先整理一下吧。");
                    cm.dispose();
                    return;
                }
                getRandomArray();
                var questrandid = Math.floor(Math.random() * lastMapList.length);
                mapid = lastMapList[questrandid][0];// 任務地圖ID
                cm.gainItem(2430251, 1, 1000 * 60 * 10);
                text = "寶箱有可能藏匿在一下幾個地圖，你有#b10分鐘#k的時間尋找到正確的地圖並打開寶箱！\r\n";
                for (var key in lastMapList) {
                    qinfo += "#b" + lastMapList[key][1] + "\r\n";
                    text += "#b" + lastMapList[key][1] + "\r\n";
                }
                spawnNpc(mapid);
                text += "#r#e提示記錄在尋寶便簽裡，找到寶箱並打開有一定機率發現黃金袋子！！#n#k";
                // 重新接受任務
                cm.forceStartQuest(questid, mapid + "");
                cm.forceStartQuest(questid + 2, qinfo);
                cm.setEventCount("尋寶任務");
                cm.sendOk(text);
                cm.dispose();
            } else if (selection == 2) {    // 放棄任務
                cm.removeNpcforQ(cm.getCustomData(200100), 1052008);
                cm.forceCompleteQuest(200100);
                if (cm.haveItem(2430251)) {
                    cm.gainItem(2430251, -cm.getItemQuantity(2430251));
                }
                text = "任務已放棄……";
                cm.sendOk(text);
                cm.dispose();
            } else if (selection == 3) {    // 接受任務
                if (cm.getLevel() < 160) {
                    cm.sendOk("等級不足160級，無法領取任務。");
                    cm.dispose();
                    return;
                }
                if (cm.getSpace(2) < 1) {
                    cm.sendOk("你的消耗欄格子不足，請先整理一下吧。");
                    cm.dispose();
                    return;
                }
                getRandomArray();
                var questrandid = Math.floor(Math.random() * lastMapList.length);
                mapid = lastMapList[questrandid][0] // 任務地圖ID
                cm.gainItem(2430251, 1, 1000 * 60 * 10);
                text = "寶箱有可能藏匿在一下幾個地圖，你有#b10分鐘#k的時間尋找到正確的地圖並打開寶箱！\r\n";
                for (var key in lastMapList) {
                    qinfo += "#b" + lastMapList[key][1] + "\r\n";
                    text += "#b" + lastMapList[key][1] + "\r\n";
                }
                spawnNpc(mapid);
                text += "#r#e提示記錄在尋寶便簽裡，找到寶箱並打開有一定機率發現黃金袋子！！#n#k";
                cm.forceStartQuest(questid, mapid + "");
                cm.forceStartQuest(questid + 2, qinfo);
                cm.setEventCount("尋寶任務");
                cm.sendOk(text);
                cm.dispose();
            } else {
                cm.sendOk('此功能尚未開放，敬請期待！');
                cm.dispose();
            }
        } else if (status == 2) {
            if (cm.getPlayer().getCSPoints(2) >= 30) {
                if (cm.getSpace(2) < 1) {
                    cm.sendOk("消耗欄不足");
                    cm.dispose();
                    return;
                }
                cm.gainNX(2, -30);
                cm.gainItem(2430030, 1);
                cm.sendOk("購買成功");
            } else {
                cm.sendOk("楓點不足！");
            }
            cm.dispose();
        }
    }
}

function spawnNpc(mapid) {
    var point;
    do {
        point = cm.getSpawnPoint(mapid);
        if (cm.canSpawn(mapid, point)) {
            break;
        }
    } while (1);
    cm.spawnNpcForPlayer(mapid, 1052008, point);
}


function getRandomArray() {
    if (lastMapList.length >= 5)
        return true;
    var newMapId = maplist[Math.floor(Math.random() * maplist.length)];
    for (var key in lastMapList) {
        if (lastMapList[key] == newMapId) {
            getRandomArray();
            return false;
        }
    }
    lastMapList.push(newMapId);
    getRandomArray();
}
