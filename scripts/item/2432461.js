/*  This is mada by Jackson    
 *  This source is made by Funms Team
 *  
 *  功能：阿麗莎靈魂連接器
 *  
 *  @Author Jackson 
 */

/* global im, java */

var status = -1;
var sel = -1;
function start() {
    action(1, 0, 0);
}


function action(mode, type, selection) {
    var em = im.getEventManager("PQ_LobbyQuest");
    var eim = im.getEventInstance();
    if (em != null && eim != null) {
        var qwe = parseInt(eim.getProperty("tiaoguo"));
    }
    switch (mode) {
        case 0://上一步
            status--;
            break;
        case 1://下一步
            status++;
            break;
    }
    switch (status) {
        case 0:
            var mapRoot = parseInt(im.getMapId() / 1000);
            if (mapRoot >= 992001 && mapRoot <= 992050) {
                //起源之塔副本中
                im.askMenu("你有什麼事? 只要是我力所能及的, 我都願意幫忙。#b\r\n\r\n#L0#我想離開這裡了。#l\r\n#L3#跳過此關卡#d（剩餘機會：" + (5 - qwe) + "）#b。#l\r\n"
                    + (im.getMapId() == 992023000 ? "#L1#我掉下去了。#l\r\n" : "")
                    + (im.getMapId() == 992033000 ? "#L2#鑰匙全部用完了(第一次免費領鑰匙)。#l\r\n" : "")
                    + (im.getMapId() == 992036000 ? "#L3#跳過36,43,49層(免費)#l\r\n" : "")
                    + (im.getMapId() == 992043000 ? "#L3#跳過36,43,49層(免費)#l\r\n" : "")
                    + (im.getMapId() == 992049000 ? "#L3#跳過36,43,49層(免費)#l\r\n" : "")
                    + (im.isAdmin() ? "#L9999#(測試專用)完成當前階段。#l\r\n#L10000#(測試專用)進入下一個階段。#l" : ""));
            } else if (im.getMapId() == 992000000) {
                im.sendOk("不就在這裡嗎？有什麼事情不能當面說的！！");
            } else {
                im.dispose();
                im.openNpc(2540000);
            }
            break;
        case 1:
            sel = selection;
            switch (sel) {
                case 0:
                    im.sendNext("你一刻也不想在這裡待下去了？那就送你回去吧！");
                    break;
                case 1:
                    im.sendNext("哎呀呀，你怎麼那麼笨呢！那我送你回到原來的地方吧！");
                    break;
                case 2:
                    var em = im.getEventManager("PQ_LobbyQuest");
                    var eim = im.getEventInstance();
                    if (em != null && eim != null) {
                        if ("0".equals(eim.getProperty("stage33_cms"))) {
                            im.removeAll(2432459);
                            im.removeAll(2432460);
                            im.gainItemP(2432459, 2);
                            im.gainItemP(2432460, 2);
                            var s1_damage = parseInt(eim.getProperty("stage33_cms1"));
                            s1_damage += 2;
                            eim.setProperty("stage33_cms1", String(s1_damage));
                            eim.setProperty("stage33_cms", "1");
                            im.dispose();
                        } else {
                            im.sendNext("鑰匙都已經用完了，還沒能走到最後嗎？");
                        }
                    }
                    break;
                case 3:
                    im.sendNext("哎呀呀，你怎麼這麼菜呢！那我就幫你這麼一次吧！");
                    break;
                case 9999:
                    var em = im.getEventManager("PQ_LobbyQuest");
                    var eim = im.getEventInstance();
                    if (em != null && eim != null) {
                        if (im.isAdmin()) {
                            var stage = parseInt(eim.getProperty("stage"));
                            eim.setProperty("stage" + stage, "clear");
                            im.broadcastScreenEffect("quest/party/clear");
                            eim.broadcastWeatherEffectNotice("你現在可以前往下一層了。", 147, 15000);
                        }
                    }
                    im.dispose();
                    break;
                case 10000:
                    im.dispose();
                    var em = im.getEventManager("PQ_LobbyQuest");
                    var eim = im.getEventInstance();
                    if (em != null && eim != null) {
                        var stage = parseInt(eim.getProperty("stage"));
                        var rData = im.getQuestInfo(42011, "time");
                        var tData = im.getQuestInfo(42011, "totalTime");
                        var totalTime = parseInt(tData);
                        var time = parseInt(rData);

                        var startData = im.getQuestInfo(42011, "start");
                        var startTime = parseInt(startData);

                        var diffTime = java.lang.System.currentTimeMillis() - startTime;//消耗的時間 毫秒
                        time = time - diffTime;
                        im.updateOneQuestInfo(42011, "time", String(time));
                        eim.setProperty("stage", String(stage + 1))
                        im.updateOneQuestInfo(42001, "stage", String(stage + 1));
                        var map = eim.getMapInstance(stage);
                        im.getPlayer().changeMap(map, map.getPortal(0));
                    }
                    break;
                default:
                    im.dispose();
                    break;
            }
            break;
        case 2:
            switch (sel) {
                case 0:
                    im.warp(992000000, 0);
                    im.dispose();
                    break;
                case 1:
                    var em = im.getEventManager("PQ_LobbyQuest");
                    var eim = im.getEventInstance();
                    if (em != null && eim != null) {
                        var s1_damage = parseInt(eim.getProperty("stage23_cms"));
                        s1_damage += 1;
                        eim.setProperty("stage23_cms", String(s1_damage));
                        im.teleport(1);
                        im.dispose();
                    }
                    break;
                case 2:
                    im.sendNext("哎呀。看來這次要麼是你運氣不好，要麼是你沒動腦筋。你要慎重使用鑰匙。如果你支付#b33起源點數#k的話，我就讓你重新進入第33層。那麼你想重新進入嗎？");
                    break;
                case 3:
                    if (im.getMapId() == 992013000 || im.getMapId() == 992050000) {
                        im.sendOk("該關卡無法跳過。");
                        im.dispose();
                        return;
                    }
                    if (qwe == 5) {
                        im.sendOk("跳過關卡的次數已用完。無法使用。");
                        im.dispose();
                        return;
                    }
                    if (em != null && eim != null) {
                        if (im.getMapId() == 992036000 || im.getMapId() == 992043000 || im.getMapId() == 992049000) {
                        } else {
                            qwe += 1;
                        }
                        eim.setProperty("tiaoguo", String(qwe));
                        var stage = parseInt(eim.getProperty("stage"));
                        eim.setProperty("stage" + stage, "clear");
                        im.broadcastScreenEffect("quest/party/clear");
                        eim.broadcastWeatherEffectNotice("你現在可以前往下一層了。", 147, 15000);
                        im.askMenuNoESC("你現在可以前往下一層了。");
                    }
                    //im.dispose();
                    break;
                default:
                    im.dispose();
                    break;
            }
            break;
        case 3:
            switch (sel) {
                case 0:
                    im.dispose();
                    im.warp(992000000, 0);
                    break;
                case 1:
                    var em = im.getEventManager("PQ_LobbyQuest");
                    var eim = im.getEventInstance();
                    if (em != null && eim != null) {
                        var s1_damage = parseInt(eim.getProperty("stage23_cms"));
                        s1_damage += 1;
                        eim.setProperty("stage23_cms", String(s1_damage));
                        im.teleport(1);
                        im.dispose();
                    }
                    break;
                case 2:
                    var em = im.getEventManager("PQ_LobbyQuest");
                    var eim = im.getEventInstance();
                    if (im.getQuestPoint(42003) < 33) {
                        im.sendOk("起源點數好像不夠了呢~！");
                        im.dispose();
                        return;
                    }
                    if (em != null && eim != null) {
                        eim.setProperty("stage33_cms", "0");
                        im.gainQuestPoint(42003, -33);
                        im.teleport(1);
                        im.dispose();
                    }
                    im.dispose();
                    break;
                case 3:
                    im.dispose();
                    var em = im.getEventManager("PQ_LobbyQuest");
                    var eim = im.getEventInstance();
                    if (em != null && eim != null) {
                        var stage = parseInt(eim.getProperty("stage"));
                        var rData = im.getQuestInfo(42011, "time");
                        var tData = im.getQuestInfo(42011, "totalTime");
                        var totalTime = parseInt(tData);
                        var time = parseInt(rData);

                        var startData = im.getQuestInfo(42011, "start");
                        var startTime = parseInt(startData);

                        var diffTime = java.lang.System.currentTimeMillis() - startTime;//消耗的時間 毫秒
                        time = time - diffTime;
                        im.updateOneQuestInfo(42011, "time", String(time));
                        eim.setProperty("stage", String(stage + 1))
                        im.updateOneQuestInfo(42001, "stage", String(stage + 1));
                        var map = eim.getMapInstance(stage);
                        im.getPlayer().changeMap(map, map.getPortal(0));
                    }
                    break;
                default:
                    im.dispose();
                    break;
            }
            break;
    }
}
