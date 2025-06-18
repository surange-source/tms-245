/*WSY工作室小妤*/
var status = 0;
var a = "#fEffect/CharacterEff/1003271/0/0#";  //紅色心心
var a1 = "#fEffect/CharacterEff/1112904/0/0#";  //紅色心心
var a2 = "#fEffect/CharacterEff/1082229/0/0#";  //紅色心心
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var z1 = "#fEffect/ItemEff/1112811/0/0#";//黃金音符
var z2 = "#fEffect/ItemEff/1004139/effect/jump/0#";
var z3 = "#fEffect/ItemEff/1048000/0/0#";//蘋果紅心
var ca = java.util.Calendar.getInstance();//
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK); //獲得星期
var time = new Date();
var sjr = time.getDay();
var tp = 0;

var minLevel = 180;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 6;
var maxenter = 5;
var PQLog = "情侶副本";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;
    if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3) {
        if (status == 0) {
        var selStr = "\t\t#r#e情侶" + z2 + "副本\r\n";
        selStr += z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3;
        //selStr += a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + "\r\n\r\n";
        //selStr += "#r#e　情深似海 情比金堅 生死相隨 至死不渝 只為Ta#k#n\r\n";
        selStr += "#L0##r" + a1 + " 情侶檔-挑戰甜蜜小屋副本∥需伴侶在同一地圖 " + a1 + "#l#k#n\r\n\r\n";
        selStr += z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3 + z3;
        //selStr += a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + a + "\r\n";
        cm.sendSimple(selStr);
        } else if (status == 1) {
            if (selection == 0) {
            if (cm.getParty() == null) { //判斷組隊
                cm.sendYesNo("你並沒有組隊，請創建組建一個隊伍在來吧。");
            } else if (!cm.isLeader()) { // 判斷組隊隊長
                cm.sendOk("請讓你們的組隊長和我對話。");
                        cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                        cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                cm.sendNext("組隊成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
                        cm.dispose();
            } else if (!cm.isAllPartyMembersHaveItem(1112308, 1)) {
                cm.sendNext("你的隊員#r#e \"" + cm.getNotHaveItemMemberName(1112308, 1) + "\" #k#n沒有1個#i1112308##t1112308#,請確認!");
                        cm.dispose();
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
                        cm.dispose();
            } else if (cm.getMap(889100001).getCharactersSize() > 0) {
                cm.sendOk("本次森林保衛戰已經在進行中。請等待或者換線後嘗試..");
                    cm.dispose();
                    } else  {
        if (cm.getPQLog("情侶副本") <= 5){
        //if (cm.checkPartyEventCount("森林副本")){
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("LoveRsEvent");
                        if (em == null) {
                            cm.sendOk("此任務正在建設當中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), 198);
                                cm.setPQLog("情侶副本");
                                cm.worldSpouseMessage(0x19,"[愛情 - 甜蜜小屋] ：玩家 "+ cm.getChar().getName() +"帶領他/她的伴侶 進入了愛情 - 甜蜜小屋。");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("怪任務裡面已經有人了，請稍等！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                        cm.dispose();
                    }
               // } else {
        //    cm.sendOk("請檢查隊伍中是否存在已完成次數#b隊員#k。");
        //    cm.dispose();
        //    }
                } else {
            cm.sendOk("對不起，該帳號每天只能進入5次。\r\n");
            cm.dispose();
            }
        } //判斷組隊
            } else if (selection == 1) {
                cm.sendOk("請確認你的組隊員：\r\n\r\n#b1、組隊員必須要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、組隊員等級必須要在" + minLevel + "級以上。\r\n\r\n（#r如果仍然錯誤, 重新下線,再登陸 或者請重新組隊。#k#b）");
                cm.dispose();
            }
        }
         } else {
                cm.dispose();
                cm.sendOk("只有在1,2,3頻道才可以參加任務。");
    }
    }
}