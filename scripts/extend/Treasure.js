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
        Array(700000000, "紅鸞宮 - 紅鸞宮入口"),
        Array(702100000, "東方神州 - 大雄寶殿"),
        Array(702020000, "東方神州 - 山路1"),
        Array(701010000, "東方神州 - 上海郊外"),
        Array(701010100, "東方神州 - 上海北部平原"),
        Array(701010200, "東方神州 - 上海北部小山"),
        Array(701010300, "東方神州 - 徐州岔道"),
        Array(701010310, "東方神州 - 中原山丘地帶1"),
        Array(701010320, "東方神州 - 中原山丘地帶2"),
        Array(701210120, "上少林 - 山腰"),
        Array(701100000, "魔都上海 - 豫園村"),
        Array(865020200, "凱梅爾茲共和國 - 運河3"),
        //Array(701010324, "東方神州 - 可怕的山丘"),
        Array(701010400, "東方神州 - 徐州平原1"),
        Array(701010500, "東方神州 - 徐州平原2"),
        Array(701010600, "東方神州 - 徐州平原3"),
        Array(100000200, "弓箭手村 - 弓箭手村公園"),
        Array(100000201, "弓箭手村 - 弓箭手培訓中心"),
        Array(100000202, "弓箭手村 - 寵物公園"),
        Array(100010000, "弓箭手村 - 弓箭手村北部小山"),
        Array(100010001, "弓箭手村 - 奇怪的山丘"),
        Array(100010100, "弓箭手村 - 夢境小道"),
        Array(100000001, "弓箭手村 - 瑪亞的家"),
        Array(100000002, "弓箭手村 - 長老斯坦的家"),
        Array(100000003, "弓箭手村 - 麗娜的家"),
        Array(500000000, "泰國 - 水上市場"),
        Array(500010000, "泰國 - 青蛙蓮花池"),
        Array(500010100, "泰國 - 癩蛤蟆蓮花池"),
        Array(500020000, "泰國 - 沼澤"),
        Array(500020100, "泰國 - 孤立的屋子"),
        Array(500020101, "泰國 - 東區外"),
        Array(500020200, "泰國 - 小叢林"),
        Array(500020300, "泰國 - 赤叢林"),
        Array(500020400, "泰國 - 深叢林"),
        Array(102000000, "勇士部落 - 勇士部落"),
        Array(102000003, "勇士部落 - 劍士聖殿"),
        Array(102030000, "火焰之地 - 野豬的領土"),
        Array(102030100, "火焰之地 - 野生豬豬的領土"),
        Array(102030200, "火焰之地 - 鐵甲豬豬的領土"),
        Array(102030300, "火焰之地 - 燃燒的熱氣"),
        Array(102030400, "火焰之地 - 灰燼之地"),
        Array(103000000, "廢棄都市 - 廢棄都市"),
        Array(103000001, "廢棄都市 - 廢都武器店"),
        Array(103000002, "廢棄都市 - 廢都藥店"),
        Array(103000003, "廢棄都市 - 廢都爵士酒吧"),
        Array(103000004, "廢棄都市 - 廢都醫院"),
        Array(103000005, "廢棄都市 - 廢都美發店"),
        Array(103000006, "廢棄都市 - 廢都修理店"),
        Array(104010000, "維多利亞 - 維多利亞港郊外"),
        Array(100000204, "弓箭手村 - 弓箭手的殿堂"),
        Array(101000004, "魔法密林 - 魔法師的殿堂"),
        Array(102000004, "勇士部落 - 劍士的殿堂"),
        //Array(103000007, "廢棄都市 - 廢都夜市"),
        Array(103000008, "廢棄都市 - 盜賊的殿堂"),
        Array(800000000, "江戶村 - 古代神社"),
        Array(800010000, "江戶村 - 櫻花山林"),
        Array(800010100, "江戶村 - 天皇殿堂"),
        Array(800010001, "江戶村 - 雲狐山坡"),
        Array(800020000, "江戶村 - 烏鴉樹林"),
        Array(800020101, "江戶村 - 烏鴉樹林2"),
        Array(800020110, "江戶村 - 林野的松林"),
        Array(800020120, "江戶村 - 從地圖中失蹤的村莊"),
        Array(800020130, "江戶村 - 大佛的邂逅"),
        Array(800020100, "江戶村 - 前往墓地之路"),
        Array(800020200, "江戶村 - 死靜的墓地"),
        Array(800020300, "江戶村 - 漂浮幽靈墓地"),
        Array(800020400, "江戶村 - 彎曲地獄路"),
        Array(800030000, "江戶村 - 妖獸之林"),
        Array(220000001, "玩具城 - 雜貨店"),
        Array(220000002, "玩具城 - 藥店"),
        Array(220000003, "玩具城 - 玩具城整形醫院"),
        Array(220000004, "玩具城 - 玩具城美發店"),
        Array(220000005, "玩具城 - 玩具城護膚中心"),
        Array(220000006, "玩具城 - 玩具城寵物訓練場"),
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
                cm.sendYesNo("是否要花費#r1000#k點購買一個黃金羅盤？");
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
            if (cm.getPlayer().getCSPoints(1) >= 1000)
            {
                if (cm.getSpace(2) < 1) {
                    cm.sendOk("消耗欄不足");
                    cm.dispose();
                    return;
                }
                cm.gainNX(-1000);
                cm.gainItem(2430030, 1);
                cm.sendOk("購買成功");
            } else {
                cm.sendOk("樂豆點不足！");
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
