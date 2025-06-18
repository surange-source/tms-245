var status = 0;
var typed = 0;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var monstermaps = Array(Array(50000, "適合 #r#e1級 ~ 10級#n#b 的玩家"), Array(100010100, "適合 #r#e3級 ~ 10級#n#b 的玩家"), Array(101020100, "適合 #r#e8級 ~ 30級#n#b 的玩家"), 
//Array(102030000, "適合 #r#e30級 ~ 60級#n#b 的玩家"),
Array(551000200, "適合 #r#e50級 ~ 70級#n#b 的玩家"), Array(600020300, "適合 #r#e70級 ~ 90級#n#b 的玩家"),
Array(541010010, "適合 #r#e90級 ~ 100級#n#b 的玩家"),
Array(251010402, "適合 #r#e120級 ~ 150級#n#b 的玩家"),
Array(270030100, "適合 #r#e150級#n#b以上 的玩家"), Array(703001200, "適合 #r#e160級#n#b以上 的玩家"), Array(273060300, "適合 #r#e190級#n#b以上 的玩家")
);
var startTime = "2016-04-15 21:00:00";
var endTime = "2016-04-15 22:00:00";
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
        if (status == 0) {
            var text = head + "";
            if (cm.getMapId() != 910000000) {
                text = head + "\t親愛的#r#h ##k您好，我是WSY新手引導人，當然，你也可以在#b自由市場#k中找到我。\r\n";
            }
            text += "#r#L1#" + icon + " 新手成長系統簡介#l\r\n\r\n#b";
            text += "   " + icon + "#k 樂豆點：#r" + cm.getPlayer().getCSPoints(1) + "#k 點  " + icon + " 活力值：#r" + cm.getPlayerEnergy() + "#k 點 \r\n   " + icon + " 今天在線：#r" + cm.getOnlineTime() + "#k 分鐘#b\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0# #n\r\n";
            text += "#L5#" + icon + " #r[免費]#b練級引導地圖傳送#l\r\n";
            //text += "#L2#" + icon + " #r[免費]#b等級獎勵禮包#l\r\n";
            text += "#L6#" + icon + " #r[福利]#b新人七天登錄獎勵#n#k#l\r\n";
            //text += "#L7#" + icon + " #r[福利]#b領取伴隨等級禮包#n#k#l\r\n";
            //text += "#L4#" + icon + " #r[必須]#b新人6階段等級獎勵#l\r\n";
            //text += "#L3#" + icon + " #r[必須]#b領取25星星之力助力徽章#l\r\n";
            
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 1) {
                cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,我是新手成長系統簡介:\r\n  職業: 所有\r\n  等級: 10 30 60 100 150 200\r\n  推薦升級地圖: 系統引導地圖練級\r\n  引導使用某道具: 系統引導使用某道具\r\n  贈送道具: 當前職業對應等級防具,武器\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#該角色達到等級要求即可完成1次階段功能.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：角色不能超過等級範圍或必須與等級對應轉職數.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：裝備 消耗 設置 其它 特殊 背包欄 預留 5 格以上.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：若達到等級未達到轉職數,無法領取武器(後果自負).");
                cm.dispose();
            } else if (selection == 2) {
                cm.dispose();
                cm.openNpc(1530635, "dengji1001");
            } else if (selection == 3) {
                if (cm.getBossLog("送裝備", 1) == 0) {
                    if (!cm.haveItem(1190400)) {
                        var ii = cm.getItemInfo();
                        var toDrop = ii.randomizeStats(ii.getEquipById(1190400)).copy();
                        toDrop.setStr(5); //裝備力量
                        toDrop.setDex(5); //裝備敏捷
                        toDrop.setInt(5); //裝備智力
                        toDrop.setLuk(5); //裝備運氣
                        toDrop.setMatk(5); //物理攻擊
                        toDrop.setWatk(5); //魔法攻擊
                        toDrop.setEnhance(25); //強化等級
                        var timeStamp = java.lang.System.currentTimeMillis();
                        var expirationDate = timeStamp + 30 * 86400 * 1000;
                        toDrop.setExpiration(expirationDate);
                        toDrop.setOwner("30天");
                        cm.addFromDrop(cm.getC(), toDrop, false);
                        cm.setBossLog("送裝備", 1);
                        cm.sendOk("領取成功！超強裝備已經給您發放.感謝您的支持.");
                    } else {
                        cm.sendOk("您身上已經有#v1190400#了");
                    }
                } else {
                    cm.sendOk("您已經領取過該裝備，無法重複領取。");
                    cm.dispose();
                }
                cm.dispose();
            } else if (selection == 4) {
                cm.dispose();
                cm.openNpc(9300011, 1);
            } else if (selection == 5) {
                var text = "請選擇你要接連的地方：\r\n#b";
                for (var i = 0; i < monstermaps.length; i++) {
                    text += "#L" + i + "# " + icon + " #m" + monstermaps[i][0] + "# (" + monstermaps[i][1] + ")\r\n"
                }
                cm.sendSimple(text);
            } else if (selection == 6) {
                cm.dispose();
                cm.openNpc(1530635, 14);
            } else if (selection == 7) {
                cm.dispose();
                cm.openNpc(1530635, "Levelreward");
            }
        } else if (status == 2) {
            var sel = selection;
            cm.warp(monstermaps[sel][0]);
        }
    }
}

function getEvent(name, channel) {
    var cserv = cm.getChannelServer().getInstance(channel);
    var event = cserv.getEventSM().getEventManager(name);
    return event;
}
