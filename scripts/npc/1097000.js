/*
 唐雲的料理講座
 */
var select = -1;
var status = -1;
var minLevel = 60;
var maxLevel = 275;
var maxenter = 10;
var PQLog = "唐雲的料理講座";
var minPlayers = 1;
var maxPlayers = 6;
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
    }
    if (status == 0) {
        cm.sendSimple("#e<組隊任務 : 唐雲的料理講座>#n..你願意為諾特勒斯的船員做美味的料理嗎？我唐雲將親自教你做料理。#b\r\n#L0#進入唐雲的料理講座。#l \r\n#L1#領取唐雲的廚師服。#l \r\n#L2#聽取關於唐雲的料理講座的說明#l \r\n#L3#詢問今天剩餘的挑戰次數。#l");
    } else if (status == 1) {
        if (select == -1)
            select = selection;
        if (select == 0) {
            if (cm.getParty() == null || !cm.isLeader()) { // 沒有組隊
                cm.sendOk("製作料理並不容易。想進去的話，最好和3人以下的隊員一起進去。不過如果有自信的話，以1人組隊進去也沒關係。你可以通過自己所屬組隊的隊長申請進入。");
            } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                cm.sendNext("組隊成員等級 " + minLevel + " 以上 " + maxLevel + " 以下才可以入場。");
            } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
            } else {
                var party = cm.getParty().getMembers();
                var next = true;
                if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("Cooking");
                    if (em == null) {
                        cm.sendOk("當前伺服器未開啟此功能，請稍後在試...");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop.equals("0") || prop == null) {
                            em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 170);
                            cm.gainMembersPQ(PQLog, 1);
                        } else {
                            cm.sendOk("當前頻道已有玩家在進行任務中，請稍後在試。");
                        }
                    }
                } else {
                    cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                }
            }
            cm.dispose();
        } else if (select == 1) {
            cm.sendSimple("哦，是製作了很多料理，可以領取廚師服裝的人嗎？那我當然應該把廚師服裝給你。廚師資格證帶來了嗎？\r\n#L0#請給我廚師服(廚師資格證3個以上)。#l \r\n#L1#請給我廚師帽(廚師資格證5個以上)。#l");
        } else if (select == 2) {
            cm.sendNext("你好。我唐雲是負責管理海盜船諾特勒斯號的廚房的廚師長。我製作的料理色香味俱全，人們都稱我是料理大師，哈哈哈哈哈！誰說的？是誰來著？那個很重要嗎？哈哈哈哈！");
        } else if (select == 3) {
            cm.sendOk("你今天的剩餘次數是10次。");
            cm.dispose();
        }
    } else if (status == 2) {
        if (select == 1) {
            if (selection == 0) {
                if (cm.haveItem(4033668, 3) && cm.canHold(1052578)) {
                    cm.gainItem(4033668, -3);
                    cm.gainItem(1052578, 1);
                } else {
                    cm.sendNext("你確定有3個廚師資格證嗎？還是背包裝備欄滿了？請確認一下，然後再來和我說話。");
                }
            } else if (selection == 1) {
                if (cm.haveItem(4033668, 5) && cm.canHold(1003762)) {
                    cm.gainItem(4033668, -5);
                    cm.gainItem(1003762, 1);
                } else {
                    cm.sendNext("你確定有5個廚師資格證嗎？還是背包裝備欄滿了？請確認一下，然後再來和我說話。");
                }
            }
            cm.dispose();
        } else if (select == 2) {
            cm.sendNextPrev("雖然我很能幹，但最近也遇到了一些問題。海盜們的胃總是那麼好，不管吃多少東西都不見底，我就算是長著三頭六臂也不夠用。但是我又不能讓他們節食。");
        }
    } else if (status == 3) {
        if (select == 2) {
            cm.sendNextPrev("所以我正在招人到廚房來幫著製作料理。料理方法很簡單。只要召喚出料理所需的材料，然後努力翻炒就行。雖然必須調節一下火候，但那並不難。");
        }
    } else if (status == 4) {
        if (select == 2) {
            cm.sendNextPrev("料理做得好的話，會有很多人搶著吃。但是，如果做得不好的話，就等於是垃圾。這一切都取決於你的實力。怎麼樣？我覺得你看起來很有料理天分，你願意試一下嗎？一天最多只能做十次。\r\n - #e等級#n : 60以上#r( 推薦等級: 60 ~ 90 )#k \r\n - #e限定時間#n : 20分鐘\r\n - #e參加人員#n : 1~3名\r\n - #e獲得道具#n :\r\n#i1052578:# #t1052578#\r\n#i1003762:# #t1003762#\r\n");
        }
    } else if (status == 5) {
        if (select == 2) {
            cm.dispose();
        }
    }
}
