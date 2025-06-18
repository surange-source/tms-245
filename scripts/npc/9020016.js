var status = 0;
var minLevel = 130;
var maxLevel = 275;
var minPlayers = 1;
var maxPlayers = 6;
var maxenter = 10;
var PQLog = "御龍魔";
var sel = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.sendOk("讓你的朋友加入你的隊伍. 你也可以使用組隊搜索功能來搜索隊伍."); // gms has spelling mistakes.. 
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (cm.getPlayer().getClient().getChannel() == 1) {
            if (status == 0) {
                if (cm.getMapId() == 910002000 || cm.getMapId() == 240080000) {
                    cm.sendSimple("#e<組隊任務：御龍魔>#n\r\n\r\n年輕人，你能不能幫我做件事？麻煩你去消滅攪亂神木村平靜生活的御龍魔吧。\r\n#b#L0# 1. 我要進入天渡。（130以上/1名以上）#l\r\n#L1# 2. 我要尋找一起組隊的同伴。#l\r\n#L2# 3. 我想聽介紹。#l\r\n#L3# 4. 我想知道今天的剩餘挑戰次數。#l\r\n#L4# 5. 我想學習#r[飛翔]#b技能。#l");
                } else {
                    cm.sendYesNo("#e<組隊任務：御龍魔>#n\r\n\r\n你想要就此放棄了嗎?");
                }
            } else if (status == 1) {
                if (cm.getMapId() == 910002000 && selection == 0) {
                    sel = 0;
                    cm.sendNext("如果你要挑戰一下，我將會把你送到天渡……");
                } else if (cm.getMapId() != 910002000 && cm.getMapId() != 240080000) {
                    cm.removeAll(4001528);
                    cm.warp(240080050, 0);
                    cm.dispose();
                    return;
                } else if (selection == 0) {
                    if (cm.getParty() == null) { // 沒有組隊
                        cm.sendOk("需要有一個隊伍在可以入場。");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // 不是隊長
                        cm.sendOk("隊長必須在這裡。請讓他和我說話。");
                        cm.dispose();
                    } else if (!cm.isAllPartyMembersAllowedLevel(minLevel, maxLevel)) {
                        cm.sendOk("在你或者隊員中存在" + minLevel + "級以下，" + maxLevel + "級以上的角色。請注意等級限制。");
                        cm.dispose();
                    } else if (!cm.isAllPartyMembersAllowedPQ(PQLog, maxenter)) {
                        cm.sendNext("你的隊員#r#e \"" + cm.getNotAllowedPQMemberName(PQLog, maxenter) + "\" #k#n次數已經達到上限了。");
                        cm.dispose();
                    } else if (!cm.allMembersHere()) {
                        cm.sendOk("你的組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                        cm.dispose();
                    } else {
                        var party = cm.getParty().getMembers();
                        var next = true;
                        if (!cm.isAdmin() && (party.size() > maxPlayers || party.size() < minPlayers)) {
                            next = false;
                        }
                        if (next) {
                            var em = cm.getEventManager("Dragonica");
                            if (em == null) {
                                cm.sendOk("此任務正在建設當中。");
                            } else {
                                var prop = em.getProperty("state");
                                if (prop.equals("0") || prop == null) {
                                    em.startInstance(cm.getParty(), cm.getMap(), 170);
                                    cm.gainMembersPQ(PQLog, 1);
                                    cm.dispose();
                                    return;
                                } else {
                                    cm.sendOk("御龍魔任務裡面已經有人了，請稍等！");
                                }
                            }
                        } else {
                            cm.sendYesNo("你需要有一個 " + minPlayers + " - " + maxPlayers + " 人的隊伍. 請您組好隊員後再試.");
                        }
                        cm.dispose();
                    } //判斷組隊
                } else if (selection == 1) {
                    cm.sendOk("請向周圍的朋友們請求組隊。使用尋找組隊(快捷鍵O)功能，可以在任何時間任何地點尋找組隊。敬請參考。");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e<組隊任務：御龍魔>#n\r\n\r\n前往#b<天空之門 >#k，搞清楚#r御龍魔#k的真實身份吧。使用#b飛翔#k技能在天空中飛翔，消滅飛龍並進行追蹤，就可以找到御龍魔。\r\n - #e等級#n：130級以上 \r\n - #e規定時間#n：30分鐘\r\n - #e參加人員#n：3～6名\r\n - #e參加條件#n：學習飛翔技能");
                    cm.dispose();
                } else if (selection == 3) {
                    var pqtry = maxenter - cm.getPQLog(PQLog);
                    if (pqtry <= maxenter) {
                        cm.sendOk("今天剩餘挑戰次數是" + pqtry + "次.");
                        cm.dispose();
                    }
                } else if (selection == 4) {
                    sel = 4;
                    cm.sendYesNo("學習[飛翔]技能必須付出一定的楓幣喲!大約需要:#r2000000#k,那麼你想現在就學習麼?");
                }
            } else if (status == 2) {
                if (sel == 4) {
                    var skillid = (cm.getBeginner() * 10000) + 1026;
                    if (cm.getSkillLevel(skillid) <= 0) {
                        if (cm.getMeso() >= 2000000) {
                            cm.gainMeso(-2000000);
                            cm.teachSkill(skillid, 1);
                            cm.sendOk("恭喜,你學習了[飛翔]技能!");
                        } else {
                            cm.sendOk("您似乎沒有那麼多的楓幣喲！在去努力攢錢吧！");
                        }
                    } else {
                        cm.sendOk("你已經獲得了[飛翔]技能了!!!");
                    }
                } else {
                    cm.saveLocation("MULUNG_TC"); // not sure if correct..?
                    cm.warp(240080000, 0);
                    cm.dispose();
                }
                cm.dispose();
            }
        } else {
            cm.dispose();
            cm.sendOk("只有在1頻道才可以參加御龍魔任務。");
        }
    }
}