/**
 廢棄組隊任務
 **/


var status;
var curMap;
var playerStatus;
var chatState;
var questions = Array("第一個問題：3轉最低等級是多少？#b\r\n（打倒怪物，獲取相應數量的證書。）",
        "第一個問題：4轉最低等級是多少？#b\r\n（打倒怪物，獲取相應數量的證書。）",
        "第一個問題：中國有幾個省級行政區域？#b\r\n（打倒怪物，獲取相應數量的證書。）",
        "第一個問題：3年前楓之谷3轉最低等級是多少？#b\r\n（打倒怪物，獲取相應數量的證書。）",
        "第一個問題：5月份一共有多少天？#b\r\n（打倒怪物，獲取相應數量的證書。）",
        "第一個問題：2008北京奧運會中國總共拿了多少枚金牌？#b\r\n（打倒怪物，獲取相應數量的證書。）");
var qanswers = Array(60, 100, 34, 70, 31, 59);
var party;
var preamble;
var stage2combos = Array(Array(0, 0, 1, 1), Array(1, 0, 0, 1), Array(1, 1, 0, 0), Array(1, 0, 1, 0), Array(0, 1, 0, 1), Array(0, 1, 1, 0));
var stage3combos = Array(Array(1, 1, 0, 0, 0), Array(1, 0, 1, 0, 0), Array(1, 0, 0, 1, 0), Array(1, 0, 0, 0, 1), Array(0, 1, 1, 0, 0), Array(0, 1, 0, 1, 0), Array(0, 1, 0, 0, 1), Array(0, 0, 1, 0, 1), Array(0, 0, 1, 1, 0), Array(0, 0, 0, 1, 1));
var prizeIdScroll = Array(2040502, 2040505, // Overall DEX and DEF
        2040802, // Gloves for DEX
        2040002, 2040402, 2040602);                        // Helmet, Topwear and Bottomwear for DEF
var prizeIdUse = Array(2000001, 2000002, 2000003, 2000006, // Orange, White and Blue Potions and Mana Elixir
        2000004, 2022000, 2022003);                        // Elixir, Pure Water and Unagi
var prizeQtyUse = Array(80, 80, 80, 50,
        5, 15, 15);
var prizeIdEquip = Array(1032004, 1032005, 1032009, // Level 20-25 Earrings
        1032006, 1032007, 1032010, // Level 30 Earrings
        1032002, // Level 35 Earring
        1002026, 1002089, 1002090);                        // Bamboo Hats
var prizeIdEtc = Array(4010000, 4010001, 4010002, 4010003, // Mineral Ores
        4010004, 4010005, 4010006, // Mineral Ores
        4020000, 4020001, 4020002, 4020003, // Jewel Ores
        4020004, 4020005, 4020006, // Jewel Ores
        4020007, 4020008, 4003000);                        // Diamond and Black Crystal Ores and Screws
var prizeQtyEtc = Array(15, 15, 15, 15,
        8, 8, 8,
        8, 8, 8, 8,
        8, 8, 8,
        3, 3, 30);

function start() {
    status = -1;
    mapId = cm.getMapId();
    if (mapId == 910340100)
        curMap = 1;
    else if (mapId == 910340200)
        curMap = 2;
    else if (mapId == 910340300)
        curMap = 3;
    else if (mapId == 910340400)
        curMap = 4;
    else if (mapId == 910340500)
        curMap = 5;
    playerStatus = cm.isLeader();
    preamble = null;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (curMap == 1) { // First Stage.
        if (playerStatus) { // Check if player is leader
            if (status == 0) {
                var eim = cm.getEventInstance();
                party = eim.getPlayers();
                preamble = eim.getProperty("leader1stpreamble");

                if (preamble == null) {
                    cm.sendNext("你好，歡迎來到第一個階段，在這裡你可能會看到很多凶狠的鱷魚，跟我對話，我會給你們每一個人出一道題目，你們再打倒凶狠的鱷魚獲取相應數目的證書卡交給我，就行了。之後我會給你們一張通行證，你們把通行證全部交給組隊長，組隊長再和我講話，就可以順利通關了，那麼祝你一切順利！");
                    eim.setProperty("leader1stpreamble", "done");
                    cm.dispose();
                } else { // Check how many they have compared to number of party members
                    // Check for stage completed
                    var complete = eim.getProperty(curMap.toString() + "stageclear");
                    if (complete != null) {
                        cm.sendNext("現在可以到下一個關卡了，如果不快點的話，門可能就關閉了。");
                        cm.dispose();
                    } else {
                        var numpasses = party.size() - 1;
                        var strpasses = "#b" + numpasses.toString() + "#k";
                        if (!cm.haveItem(4001008, numpasses)) {
                            cm.sendNext("你們還需要" + strpasses + "通行證才可以過關。");
                            cm.dispose();
                        } else {
                            cm.sendNext("你們成功收集了 " + strpasses + "通行證。 已經成功完成了第一階段。好了，我將開啟通往下一個關卡的結界，時間不多了，你們趕快到那裡進行第二階段的挑戰吧。");
                            clear(1, eim, cm);
                            cm.givePartyExp(100, party);
                            cm.gainItem(4001008, -numpasses);
                            cm.dispose();
                            // TODO: Make the shiny thing flash
                        }
                    }
                }
            }
        } else { // Not leader
            var eim = cm.getChar().getEventInstance();
            pstring = "member1stpreamble" + cm.getChar().getId().toString();
            preamble = eim.getProperty(pstring);
            if (status == 0 && preamble == null) {
                var qstring = "member1st" + cm.getChar().getId().toString();
                var question = eim.getProperty(qstring);
                if (question == null) {
                    // Select a random question to ask the player.
                    var questionNum = Math.floor(Math.random() * questions.length);
                    eim.setProperty(qstring, questionNum.toString());
                }
                cm.sendNext("你必須收集到的通行證的數量為問題的答案.");
            } else if (status == 0) { // Otherwise, check for stage completed
                var complete = eim.getProperty(curMap.toString() + "stageclear");
                if (complete != null) {
                    cm.sendNext("傳送口已經打開,快點進入下一個階段吧!");
                    cm.dispose();
                } else {
                    // Reply to player correct/incorrect response to the question they have been asked
                    var qstring = "member1st" + cm.getChar().getId().toString();
                    var numcoupons = qanswers[parseInt(eim.getProperty(qstring))];
                    var qcorr = cm.haveItem(4001007, (numcoupons + 1));
                    var enough = false;
                    if (!qcorr) { // Not too many
                        qcorr = cm.haveItem(4001007, numcoupons);
                        if (qcorr) { // Just right
                            cm.sendNext("回答正確,請收好通行證,並把它交給隊長!.");
                            cm.gainItem(4001007, -numcoupons);
                            cm.gainItem(4001008, 1);
                            enough = true;
                        }
                    }
                    if (!enough) {
                        cm.sendNext("你給我的通行證和問題的答案不符合,請在想想。");
                    }
                    cm.dispose();
                }
            } else if (status == 1) {
                if (preamble == null) {
                    var qstring = "member1st" + cm.getChar().getId().toString();
                    var question = parseInt(eim.getProperty(qstring));
                    cm.sendNextPrev(questions[question]);
                } else { // Shouldn't happen, if it does then just dispose
                    cm.dispose();
                }
            } else if (status == 2) { // Preamble completed
                eim.setProperty(pstring, "done");
                cm.dispose();
            } else { // Shouldn't happen, but still...
                eim.setProperty(pstring, "done"); // Just to be sure
                cm.dispose();
            }
        } // End first map scripts
    } else if (2 <= curMap && 3 >= curMap) {
        rectanglestages(cm);
    } else if (curMap == 4) {
        var eim = cm.getChar().getEventInstance();
        var stage5done = eim.getProperty("4stageclear");
        if (stage5done == null) {
            if (playerStatus) { // Leader
                var passes = cm.getMap().getAllMonster().size() <= 0;
                if (passes) {
                    // Clear stage
                    cm.sendNext("恭喜,你們成功的通過第4階段。趕快進入下一個階段吧。");
                    party = eim.getPlayers();
                    clear(4, eim, cm);
                    cm.givePartyExp(700, party);
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("歡迎來到第4階段,消滅地圖上所有的怪物即可通關。時間已經不多了,趕緊抓緊時間。");
                }
                cm.dispose();
            } else { // Members
                cm.sendNext("歡迎來到第4階段,消滅地圖上所有的怪物即可通關。時間已經不多了,趕緊抓緊時間。");
                cm.dispose();
            }
        } else { // Give rewards and warp to bonus
            cm.sendNext("傳送口已經打開,快點進入下一個階段吧!");
            cm.dispose();
        }
    } else if (curMap == 5) { // Final stage
        var eim = cm.getChar().getEventInstance();
        if (eim == null) {
            cm.dispose();
            return;
        }
        var stage5done = eim.getProperty("5stageclear");
        if (stage5done == null) {
            if (playerStatus) { // Leader
                var passes = cm.haveItem(4001008, 1);
                if (passes) {
                    // Clear stage
                    cm.sendNext("恭喜,你們成功的通過第5階段。趕快進入下一個階段吧。");
                    party = eim.getPlayers();
                    cm.gainItem(4001008, -1);
                    clear(5, eim, cm);
                    cm.addPartyTrait("will", 8);
                    cm.dispose();
                } else { // Not done yet
                    cm.sendNext("歡迎來到第5階段,你們需要收集一張#v4001008#才可以通關。");
                }
                cm.dispose();
            } else { // Members
                cm.sendNext("歡迎來到第5階段,你們需要收集一張#v4001008#才可以通關。");
                cm.dispose();
            }
        } else { // Give rewards and warp to bonus
            if (status == 0) {
                cm.sendNext("恭喜你們已經完成了所有階段的任務。我會給你們獎勵,你們準備好接受獎勵了嗎？");
            }
            if (status == 1) {
                getPrize(eim, cm);
                cm.dispose();
            }
        }
    } else { // No map found
        cm.sendNext("Invalid map, this means the stage is incomplete.");
        cm.dispose();
    }
}

function clear(stage, eim, cm) {
    eim.setProperty(stage.toString() + "stageclear", "true");

    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
    cm.environmentChange(true, "gate");

    var mf = eim.getMapFactory();
    map = mf.getMap(910340100 + (stage * 100));
    var nextStage = eim.getMapFactoryMap(910340100 + (stage * 100));
    var portal = nextStage.getPortal("next00");
    if (portal != null) {
        portal.setScriptName("kpq" + (stage + 1).toString());
    }
}

function failstage(eim, cm) {
    cm.showEffect(true, "quest/party/wrong_kor");
    cm.playSound(true, "Party1/Failed");
}

function rectanglestages(cm) {
    // Debug makes these stages clear without being correct
    var eim = cm.getChar().getEventInstance();
    if (curMap == 2) {
        var nthtext = "3";
        var nthobj = "ropes";
        var nthverb = "hang";
        var nthpos = "hang on the ropes too low";
        var curcombo = stage2combos;
        var objset = [0, 0, 0, 0];
    } else if (curMap == 3) {
        var nthtext = "3";
        var nthobj = "platforms";
        var nthverb = "stand";
        var nthpos = "stand too close to the edges";
        var curcombo = stage3combos;
        var objset = [0, 0, 0, 0, 0];
    }
    if (playerStatus) { // Check if player is leader
        if (status == 0) {
            // Check for preamble
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            if (preamble == null) {
                cm.sendNext("歡迎來到第 " + nthtext + " 階段。 第3階段需要成員2個人找出答案才能過關,趕緊抓緊時間。");
                eim.setProperty("leader" + nthtext + "preamble", "done");
                var sequenceNum = Math.floor(Math.random() * curcombo.length);
                eim.setProperty("stage" + nthtext + "combo", sequenceNum.toString());
                cm.dispose();
            } else {
                // Otherwise, check for stage completed
                var complete = eim.getProperty(curMap.toString() + "stageclear");
                if (complete != null) {
                    var mapClear = curMap.toString() + "stageclear";
                    eim.setProperty(mapClear, "true"); // Just to be sure
                    cm.sendNext("恭喜,你們成功的通過第3階段。現在即將達到下一階段!");
                } else { // Check for people on ropes and their positions
                    var totplayers = 0;
                    for (i = 0; i < objset.length; i++) {
                        var present = cm.getMap().getNumPlayersItemsInArea(i);
                        if (present != 0) {
                            objset[i] = objset[i] + 1;
                            totplayers = totplayers + 1;
                        }
                    }
                    // Compare to correct positions
                    // First, are there 2 players on the correct positions?
                    if (totplayers == 2) {
                        var combo = curcombo[parseInt(eim.getProperty("stage" + nthtext + "combo"))];
                        // Debug
                        // Combo = curtestcombo;
                        var testcombo = true;
                        for (i = 0; i < objset.length; i++) {
                            if (combo[i] != objset[i]) {
                                testcombo = false;
                            }
                        }
                        if (testcombo) {
                            // Do clear
                            clear(curMap, eim, cm);
                            var exp = (Math.pow(2, curMap) * 50);
                            cm.givePartyExp(exp, party);
                            cm.dispose();
                        } else { // Wrong
                            // Do wrong
                            failstage(eim, cm);
                            cm.dispose();
                        }
                    } else {
                        cm.sendNext("你們還沒有找出正確的答案,沒關係。時間還很充足,讓你的隊友換下位置在找找答案(一次2個人)。");
                        cm.dispose();
                    }
                }
            }
        } else {
            var complete = eim.getProperty(curMap.toString() + "stageclear");
            if (complete != null) {
                var target = eim.getMapInstance(910340100 + (curMap * 100));
                var targetPortal = target.getPortal("st00");
                cm.getChar().changeMap(target, targetPortal);
            }
            cm.dispose();
        }
    } else { // Not leader
        if (status == 0) {
            var complete = eim.getProperty(curMap.toString() + "stageclear");
            if (complete != null) {
                cm.sendNext("傳送口已經打開,快點進入下一個階段吧!!");
            } else {
                cm.sendNext("請讓組隊長與我對話.");
                cm.dispose();
            }
        } else {
            var complete = eim.getProperty(curMap.toString() + "stageclear");
            if (complete != null) {
                var target = eim.getMapInstance(910340100 + (curMap * 100));
                var targetPortal = target.getPortal("st00");
                cm.getChar().changeMap(target, targetPortal);
            }
            cm.dispose();
        }
    }
}

function getPrize(eim, cm) {
    var itemSetSel = Math.random();
    var itemSet;
    var itemSetQty;
    var hasQty = false;
    if (itemSetSel < 0.3)
        itemSet = prizeIdScroll;
    else if (itemSetSel < 0.6)
        itemSet = prizeIdEquip;
    else if (itemSetSel < 0.9) {
        itemSet = prizeIdUse;
        itemSetQty = prizeQtyUse;
        hasQty = true;
    } else {
        itemSet = prizeIdEtc;
        itemSetQty = prizeQtyEtc;
        hasQty = true;
    }
    var sel = Math.floor(Math.random() * itemSet.length);
    var qty = 1;
    if (hasQty)
        qty = itemSetQty[sel];
    cm.gainItem(itemSet[sel], qty);
    /*  if (cm.isGMS()) { //TODO JUMP
     cm.gainItem(4001531, 1);
     }*/

    //cm.gainPlayerEnergy(3);
    //cm.gainExp_PQ(70, 1.5);
    //cm.removeAll(4001007);
    //cm.removeAll(4001008);
    //cm.getPlayer().endPartyQuest(1201);
    cm.warp(910340600, 0);
}
