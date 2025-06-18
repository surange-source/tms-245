/* 
 * 西班牙鬥牛
 */
   //-----------------//
  //　Careless 製作  //
 // qq 50009219     //
//-----------------//
var status = -1;
var minLevel = 120;
var maxLevel = 275;
var minPartySize = 1;
var maxPartySize = 6;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getEventCount("西班牙鬥牛") <= 10) {
            cm.sendYesNoS("\t\t\t\t#r#e西班牙鬥牛\r\n\r\n#n#d小技巧 - 不一定要殺死鬥牛！您可以選擇躲避三分鐘\r\n每天前十回免費 -後續 會員-500楓點 普通-1000楓點進入\r\n\t\t\t　確認進入鬥牛場嗎？#k#n\r\n", 4, 9390474);
        } else if (cm.haveItem(2430865)) {
            if (cm.getPlayer().getCSPoints(2) >= 500) {
                cm.sendYesNoS("\t\t\t\t#r#e西班牙鬥牛\r\n\r\n#n#d小技巧 - 不一定要殺死鬥牛！您可以選擇躲避三分鐘\r\n每天前十回免費 -後續 會員-500楓點 普通-1000楓點進入\r\n\t\t\t　確認進入鬥牛場嗎？#k#n\r\n", 4, 9390474);
            } else {
                cm.sendOk("\r\n\r\n\r\n#e#d抱歉！您的楓點數量不足！無法進入鬥牛場！！#k#n");
                cm.dispose();
            }
        } else {
            if (cm.getPlayer().getCSPoints(2) >= 1000) {
                cm.sendYesNoS("\t\t\t\t#r#e西班牙鬥牛\r\n\r\n#n#d小技巧 - 不一定要殺死鬥牛！您可以選擇躲避三分鐘\r\n每天前十回免費 -後續 會員-500楓點 普通-1000楓點進入\r\n\t\t\t　確認進入鬥牛場嗎？#k#n\r\n", 4, 9390474);
            } else {
                cm.sendOk("\r\n\r\n\r\n#e#d抱歉！您的楓點數量不足！無法進入鬥牛場！！#k#n");
                cm.dispose();
            }
        }
    } else if (status == 1) {
        if (cm.getPlayer().getParty() == null) {
            cm.sendOkS("#d#e抱歉!請組隊並且保持一人！！#k#n", 0, 9390474);
        } else if (!cm.isLeader()) {
            cm.sendOkS("\r\n\r\n\t#e#d請確認您是否是此隊伍的隊長！如若不是,請喊隊長來對話！#k#n", 0, 9390474);
        } else {
            var party = cm.getPlayer().getParty().getMembers();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var levelValid = 0;
            var inMap = 0;
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (ccPlayer != null) {
                    if (ccPlayer.getLevel() >= minLevel && ccPlayer.getLevel() <= maxLevel) {
                        levelValid += 1;
                    }
                    if (ccPlayer.getMapId() == mapId) {
                        inMap += (ccPlayer.isGm() ? 3 : 1);
                    }
                    if (cPlayer.getChannel() != cm.getPlayer().getClient().getChannel() || cPlayer.getMapid() != cm.getMapId() || cm.getPlayer().getClient().getChannel() != 1) {
                        next = false;
                    }
                } else {
                    next = false;
                }
            }
            if (party.size() > maxPartySize || inMap < minPartySize) {
                next = false;
            }
            if (next) {
                var em = cm.getEventManager("xbydn");
                if (em == null) {
                    cm.sendOkS("腳本錯誤，請聯繫管理員", 0, 9390474);
                    cm.dispose();
                    return;
                }
                var prop = em.getProperty("state");
                if (prop == null || prop.equals("0")) {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                    if (cm.getEventCount("西班牙鬥牛") > 10) {
                        if (cm.haveItem(2430865)) {
                            cm.gainNX(2, -500);
                        } else {
                            cm.gainNX(2, -1000);
                        }
                    }
                    cm.worldSpouseMessage(0x8, "≡時代怪獸新聞≡　　玩家 " + cm.getChar().getName() + " 等級 " + cm.getChar().getLevel() + "　挑戰單人副本[ 西班牙鬥牛 ★★★ ]");
                    cm.sendOk("#d#e尊敬的勇士 [ #r#h ##d ]\r\n\r\n預祝您 旗開得勝！！！");
                } else {
                    cm.sendOkS("\r\n\r\n\r\n\t\t#d#e當前頻道已有人再鬥牛!請等待或變更頻道！！#k#n", 0, 9390474);
                }
            } else {
                cm.sendOkS("你所屬的組隊人數在" + minPartySize + "人以下，沒辦法進去。必須有" + minLevel + "級以上的角色" + minPartySize + "個以上才能進去。並且隊員要在相同頻道和地圖,並且該怪物只能在1線挑戰！\r\n請確認一下，然後再來找我。", 0, 9390474);
            }
        }
        cm.dispose();
    }
}