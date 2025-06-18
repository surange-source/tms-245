var status;
var newhandMap = 910000000;        //  進入地圖
var SteppedSnailMap = 915010101;  //   羊羊地圖
var changeJobMap = 910000000;    //    出去地圖
var text;
var freetimes = 1;             // 免費次數
var basemeso = 300000000;    // 起步收費
var needmeso = 0;
var icon = "#fEffect/CharacterEff.img/1082565/2/0#";
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
        if (mode == 1)
            status++;
        else {
            cm.dispose();
            return;
        }

        if (status == 0) {
            var times = cm.getPQLog("星星副本");
            text = "#e#r\t\t\t狂虐 羊羊 星星 進行曲#k#n\r\n";
            text += "#d　　　當日已進入副本：[ #r" + times + "#d ] - 玩家「 #r#h # 」#d#k#n\r\n\r\n";
            text += "#d#e-副本介紹\r\n#k#n";
            text += "#d\t\t\t\t副本時間限制 #r10#d 分鐘\r\n";
            text += "\t經驗按照時間遞增 [但若積累過多羊羊會崩潰遊戲]\r\n";
            text += "\t盡量多消滅羊羊-星星與方塊的數量在於消滅小綿羊\r\n";
            text += "\t經驗值的信息:▲採用遞增方式星星經驗互不耽誤▲\r\n";
            text += "\t星星方塊信息:▲每隻都必出星星　方塊屬於概率▲\r\n";
            text += "#r\t\t\t　福利豐富玩家不容錯過\r\n#k#n";
            text += "　#i1142813# #i5062009# #i5062002# #i3015034# #i2340000# #i2614017# #i2531000# #i1402014#\r\n";
            cm.sendOkS(text, 1);
            if (cm.getMapId() != newhandMap) {
                cm.dispose();
                return;
            }
        } else if (status == 1) {
            var times = cm.getPQLog("星星副本");
            needmeso = getNeedMeso(times);
            text = "#d\r\n\r\nAre you ready? \r\n\r\n一起狂虐羊羊吧！經驗 星星 方塊 讓你爽到不要不要的#k#n\r\n\r\n";
            text += "#r羊羊土豪門票：50\r\n羊羊楓幣門票：300000000\r\n#b下回楓幣門票：" + needmeso + "#k\r\n\r\n";
            text += "#L0#" + icon + " 楓幣參與 " + icon + "#l　\t\t　#L1#" + icon + " 土豪參與 " + icon + "#l\r\n";
            cm.sendYesNo(text);
        } else if (status == 2) {
            if (selection == 0) {
                var canenter = true;
                if (cm.getPlayer().getLevel() < 150) {
                    cm.sendOk("死亡可不會憐憫你的，150級後再來吧！");
                    canenter = false;
                } else if (cm.getParty() != null) {
                    cm.sendOk("請退出當前隊伍");
                    canenter = false;
                } else if (cm.getMeso() < needmeso) {
                    cm.sendOk("您的楓幣不足#r" + needmeso + "#k，無法再次挑戰");
                    canenter = false;
                }

                if (canenter) {
                    var em = cm.getEventManager("xxevent");
                    if (em == null) {
                        cm.sendOk("副本出錯，請聯繫GM");
                        cm.dispose();
                        return;
                    }
                    var eim = em.newInstance(cm.getPlayer().getName());
                    var map = eim.createInstanceMapS(SteppedSnailMap);
                    var player = cm.getPlayer();
                    var tomap = em.getMapFactory().getMap(changeJobMap);
                    eim.registerPlayer(player);
                    player.changeMap(map, map.getPortal(0));
                    eim.startEventTimer(60000*10);
                    cm.setPQLog("星星副本");
                    cm.gainMeso(-needmeso);
                    cm.worldSpouseMessage(0x25,"[羊羊提示] : 玩家[" + cm.getPlayer().getName() + "] 參與了 羊羊進行曲 ※ 星星 方塊 享不停 ※ - 加油吧");
                    cm.dispose();
                } else {
                    cm.dispose();
                    return;
                }
            } else if (selection == 1) {
                var canenter = true;
                if (cm.getPlayer().getLevel() < 150) {
                    cm.sendOk("死亡可不會憐憫你的，150級後再來吧！");
                    canenter = false;
                } else if (cm.getParty() != null) {
                    cm.sendOk("請退出當前隊伍");
                    canenter = false;
                } else if (cm.getHyPay(1) < 50) {
                    cm.sendOk("您的餘額小於 #r50#k 無法再次挑戰");
                    canenter = false;
                }

                if (canenter) {
                    var em = cm.getEventManager("xxevent");
                    if (em == null) {
                        cm.sendOk("副本出錯，請聯繫GM");
                        cm.dispose();
                        return;
                    }
                    var eim = em.newInstance(cm.getPlayer().getName());
                    var map = eim.createInstanceMapS(SteppedSnailMap);
                    var player = cm.getPlayer();
                    var tomap = em.getMapFactory().getMap(changeJobMap);
                    eim.registerPlayer(player);
                    player.changeMap(map, map.getPortal(0));
                    eim.startEventTimer(60000*10);
                    cm.setPQLog("星星副本");
                    cm.addHyPay(50);
                    cm.worldSpouseMessage(0x25,"[羊羊副本] : 玩家[" + cm.getPlayer().getName() + "] 參與了 羊羊進行曲 ※ 星星 方塊 享不停 ※ - 加油吧");
                    cm.dispose();
                } else {
                    cm.dispose();
                    return;
                }
            }
        }
    }
}
function getNeedMeso(times) {
    // 50 100 150 250 400 650 1050……  (單位：萬)
    if (times < freetimes) {
        return 0;
    } else {
        times -= freetimes - 1;
    }
    var meso = 0;
    var lastmeso = new Array();
    for (var i = 0; i < times; i++) {
        if (lastmeso.length < 2) {
            meso += basemeso;
        } else {
            meso = lastmeso[i - 2] + lastmeso[i - 1];
        }
        lastmeso.push(meso);
    }
    return meso;
}