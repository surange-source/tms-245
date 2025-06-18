/*
 完成時間：2014年8月10日 15:31:48
 更新時間：2015年7月18日 22:17:02
 腳本功能：霧海無限挑戰
 */




var time = new Date();

var hour = time.getHours(); //獲得小時
var minute = time.getMinutes();//獲得分鐘
var second = time.getSeconds(); //獲得秒
var status = 0;
var ItemList = Array(5062009,5);//道具ID、數量
var ItemList1 = Array(5062500,5);//道具ID、數量
var ItemListA = Array(Array(5062009,30,50),
                      Array(5062500,30,100),
                      Array(5062009,30,150),
                      Array(5062500,30,150),
                      Array(5062024,10,200),
                      Array(5062009,50,250),
                      Array(5062500,50,250),
                      Array(5062024,20,300)

);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("嗯... 我猜你還有什麼別的事情要在這裡做吧？");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMapId() == 923020100) {
                var em = cm.getEventManager("Limitless");
                if (em.getProperty("Gift") == "true") {
                    var ItemQuality = 0;
                    var conn = cm.getConnection();
                    var pstmt = conn.prepareStatement("SELECT ItemQuality FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
                    var EventDataBase = pstmt.executeQuery();
                    while (EventDataBase.next()) {
                        ItemQuality = EventDataBase.getString("ItemQuality");
                    }
                    EventDataBase.close();
                    pstmt.close();
                    //conn.close();
                    var UpDateData = cm.getConnection().prepareStatement("update limitlessEvent set ItemQuality=? where charid=" + cm.getPlayer().getId() + "")
                    UpDateData.setString(1, parseInt(ItemQuality) + 5);
                    UpDateData.executeUpdate();//更新;
                    cm.gainItem(ItemList[0],ItemList[1]);
                    cm.gainItem(ItemList1[0],ItemList1[1]);
                    for (var i =0 ;i <ItemListA.length ;i++ ){
                        if (parseInt(em.getProperty("Times"))==ItemListA[i][2]){
                            cm.gainItem(ItemListA[i][0],ItemListA[i][1]);
                            cm.playerMessage(5, "[無限戰鬥] 通關"+em.getProperty("Times")+"層 額外獲得#i"+ItemListA[i][0]+"# X"+ItemListA[i][1]+"個");
                            }
                    }
                    cm.playerMessage(-1, "[無限戰鬥] 截止目前已經獲取到了" + (parseInt(ItemQuality)+5) + "個超級神奇方塊\大師附加方塊。");
                    em.setProperty("Gift", "false");
                    cm.dispose();
                } else {
                    status = 1;
                    cm.sendYesNo("你想放棄挑戰離開這裡嗎？");
                }
            } else {
                cm.sendSimple("#e#d   無盡深淵之中，BOSS無限來襲，冒險家們帶上您們的勇氣去消滅他們吧。為了您今後在楓之谷世界中的強大與否，請在此鍛煉您的能力吧。#n#k\r\n\r\n#L0# #r我想進行挑戰無限挑戰副本！\r\n#L1# 我想查看排行榜  \r\n#L2# 我想查看副本介紹。")
            }
        } else if (status == 1) {
            if (selection == 0) {
                var cal = java.util.Calendar.getInstance();
                var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
                var A = cm.getEventCount('無限副本');
                if (cm.getChar().isGm()){
                    A = 0;
                }
                //hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
                //refreshDates(cal);
                //if (weekday == 1 || weekday == 7) {
                if (weekday == 1,3,5,7) {//(hour == 13 && (minute >= 0 && minute <= 20)) || (hour == 20 && (minute >= 0 && minute <= 20))) {
                    if (cm.getParty() == null) { // 沒有組隊
                        cm.sendOk("請組隊後和我談話。");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // 不是隊長
                        cm.sendOk("請叫隊長和我談話。");
                        cm.dispose();
                    } else if (A >= 1) {
                        cm.sendOk("你不能進去。該賬號每天只能進入一次。")
                        cm.dispose();
                    } else {
                        var party = cm.getParty().getMembers().size();
                        var mapId = cm.getPlayer().getMapId();
                        if (party != 1) {
                            cm.sendOk("對不起，無限挑戰只能一個人進去。\r\n請開設只有你一個人的組隊。")
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Limitless");
                            if (em == null) {
                                cm.sendOk("此任務正在建設當中。");
                            } else {
                                var conn = cm.getConnection();
                                var pstmt = conn.prepareStatement("SELECT * FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
                                var EventDataBase = pstmt.executeQuery();
                                var insert = conn.prepareStatement("INSERT INTO limitlessEvent(id,charid,times,ItemQuality,name) VALUES(?,?,?,?,?)"); // 載入數據
                                var prop = em.getProperty("started");
                                var x = 0;
                                if (/*prop == "false" || prop == null || */cm.getMap(923020100).getCharactersSize() == 0) {
                                    cm.setEventCount('無限副本');
                                    //cm.worldSpouseMessage(0x15, "『無限關卡挑戰』：玩家 " + cm.getChar().getName() + " 氣勢洶洶的去挑戰極限之無限關卡去了。");
                                    while (EventDataBase.next()) {
                                        x++;
                                    }
                                    EventDataBase.close();
                                    pstmt.close();
                                    //conn.close();
                                    if (x == 0) {
                                        insert.setString(1, null); //載入記錄ID
                                        insert.setString(2, cm.getPlayer().getId());
                                        insert.setString(3, 0);
                                        insert.setString(4, 0);
                                        insert.setString(5, cm.getPlayer().getName());
                                        insert.executeUpdate(); //更新
                                        insert.close();
                                    } else {
                                        //重置關數
                                        var update = conn.prepareStatement("UPDATE limitlessEvent set times = 0, ItemQuality = 0 where charid = " + cm.getPlayer().getId() + "");
                                        update.executeUpdate();
                                        update.close();
                                    }
                                    //conn.close();
                                    em.startInstance(cm.getParty(), cm.getMap());
                                    cm.dispose();
                                    return;
                                } else {
                                    cm.sendOk("對不起，此頻道已經有人在無限副本裡面了。");
                                    cm.dispose();
                                }
                            }
                        }
                    }
                } else {
                    cm.sendOk("該副本只在每週一、三、五、七開啟");
                    cm.dispose();
                }
            } else if (selection == 1) {//排名
                Ranking();//排名
                cm.dispose();
            } else if (selection == 2) {//副本介紹
                //TODO 
                cm.sendOk("- #e#d副本介紹：#k#n\r\n\r\n#b進入該副本後，地圖會有一個BOSS等待著您，但是第一關卡的BOSS血量比較少，只有10萬HP，當您消滅後之後關卡會以遞增方式比前一個BOSS血量高出500萬HP，因此請帶足夠藥水和萬能藥水，小心不要死亡了。在副本裡可以輸入 #r@mob#b 來查看怪物剩餘HP，當您在副本裡不小心死亡後可以使用 #r@fh#b 來復活自己從而戰鬥，當您消滅BOSS以後會有10秒間隙時間會自動進入下一關，當時間到了BOSS還未消滅，則副本失敗。每通關十層則可以獲得5個高級神奇方塊獎勵。#k\r\n\r\n#e#d關卡提示：#n#k#r建議您先達到200級，面板超過5萬以上再進入。#k");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.warp(923020000);
            cm.dispose();
        }
    }
}

function Ranking() {
    var Text = "無盡副本的排名如下：(1~10名次)\r\n\r\n#d"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM limitlessEvent ORDER BY times DESC LIMIT 10");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        Text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# 名次:" + i + "\r\n角色名:" + RankDataBase.getString("name") + "\r\n最終通關卡:" + RankDataBase.getString("times") + "\r\n獲得方塊數:" + RankDataBase.getString("ItemQuality") + "\r\n"
        Text += "~~~~~~~~~~~~~~~~~~~\r\n"
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(Text);
}

function getItemQty() {
    var ItemQuality = 0;
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT ItemQuality FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
    var EventDataBase = pstmt.executeQuery();
    while (EventDataBase.next()) {
        ItemQuality = EventDataBase.getString("ItemQuality");
    }
    EventDataBase.close();
    pstmt.close();
    //conn.close();
    cm.playerMessage(-1, "[無限戰鬥] 截止目前已經獲取到了" + ItemQuality + "個高級神器方塊。");
}

function getTimes() {
    var Times = 0;
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT times FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
    var EventDataBase = pstmt.executeQuery();
    while (EventDataBase.next()) {
        Times = EventDataBase.getString("times");
    }
    EventDataBase.close();
    pstmt.close();
    //conn.close();
    return Times;
}

function UpateTimes() {
    var conn = cm.getConnection();
    //var pstmt = conn.prepareStatement(
    var UpDateData = conn.prepareStatement("update limitlessEvent set times=? where charid = " + cm.getPlayer().getId() + "");
    UpDateData.setString(1, parseInt(getTimes()) + 1);
    UpDateData.executeUpdate();//更新;
    UpDateData.close();
    //conn.close();
}
