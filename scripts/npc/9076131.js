function action(mode, type, selection) {
    if (cm.getPlayer().getMapId() == 920011200) { //exit
        for (var i = 4001044; i < 4001064; i++) {
            cm.removeAll(i); //holy
        }
        cm.warp(933030000);
        cm.dispose();
        return;
    }
    var em = cm.getEventManager("OrbisPQ");
    var eim = cm.getEventInstance();
    if (em == null || eim == null) {
        cm.sendOk("請稍後再試.");
        cm.dispose();
        return;
    }

    if (!cm.isLeader()) {
        cm.sendOk("請讓隊長跟我對話!");
        cm.dispose();
        return;
    }
    if (eim.getProperty("pre").equals("0")) {
        cm.sendNext("為了解救雅典娜女神,需要收集到被破環的女神的碎片.還有生命草.那麼開始對女神塔進行搜索吧.");
        eim.setProperty("pre", "1");
        cm.dispose();
        return;
    }
    switch (cm.getPlayer().getMapId()) {
        case 933031000://女神之塔 - &lt;中央塔>
            cm.sendNext("為了解救雅典娜女神,需要收集到被破環的女神的碎片.還有生命草.那麼開始對女神塔進行搜索吧.");
            cm.dispose();
            break;
        case 933032000://女神之塔 - &lt;休息室>
            if (eim.getProperty("stage").equals("0")) {
                cm.sendOk("請找到今天所屬的LP唱片,並放到女神留聲機那邊播放\r\n#v4001056#星期天\r\n#v4001057#星期一\r\n#v4001058#星期二\r\n#v4001059#星期三\r\n#v4001060#星期四\r\n#v4001061#星期五\r\n#v4001062#星期六\r\n");
            } else if (eim.getProperty("stage").equals("1")) {
                if (cm.canHold(4001046, 1)) {
                    cm.gainItem(4001046, 1); //third piece
                    cm.givePartyExp(3500);
                    clear();
                    eim.setProperty("stage", "2");
                } else {
                    cm.sendOk("請確認你有足夠的空間!");
                }
            } else {
                cm.sendOk("非常感謝你!");
            }
            break;
        case 933033000:// 女神之塔 - &lt;倉庫>
            if (!cm.haveItem(4001051, 15)) {
                cm.sendOk("消滅怪物收集碎片並交給我,我將把它們修復好");
            } else {
                cm.removeAll(4001051);
                cm.gainItem(4001045, 1); //second piece
                cm.givePartyExp(3500);
                clear();
            }
            //消滅了所有的獨角獅.請隊長和幫傭易克對話,執行下一階段>.
            break;
        case 933034000:// 女神之塔 - &lt;散步路>
            if (!cm.haveItem(4001050, 30)) {
                cm.sendOk("在這個階段需要從怪物身上收集到30快小碎片,然後帶回來給我,我將把它們修復好!");
            } else {
                cm.removeAll(4001050);
                cm.gainItem(4001048, 1); //first piece
                cm.givePartyExp(3500);
                clear();
            }
            break;
        case 933035000:// 女神之塔 - &lt;向上通道>
            if (em.getProperty("stage6").equals("0")) {
                var react = Array();
                var total = 0;
                for (var i = 0; i < 3; i++) {
                    if (cm.getMap().getReactorByName("" + (i + 1)).getState() > 0) {
                        react.push("1");
                        total += 1;
                    } else {
                        react.push("0");
                    }
                }
                if (total != 2) {
                    cm.sendOk("地圖頂部有開關,請開啟正確的2個開關.");
                } else {
                    var num_correct = 0;
                    for (var i = 0; i < 3; i++) {
                        if (em.getProperty("stage62_" + i).equals("" + react[i])) {
                            num_correct++;
                        }
                    }
                    if (num_correct == 3) {
                        if (cm.canHold(4001049, 1)) {
                            clear();
                            cm.gainItem(4001049, 1); //sixth
                            cm.givePartyExp(3500);
                            em.setProperty("stage6", "1");
                        } else {
                            cm.sendOk("請確認你有足夠的背包空間!");
                        }
                    } else {
                        cm.showEffect(true, "quest/party/wrong_kor");
                        cm.playSound(true, "Party1/Failed");
                        if (num_correct >= 1) { //this should always be true
                            cm.sendOk("其中一個錯了.");
                        } else {
                            cm.sendOk("全部都錯了....");
                        }
                    }
                }
            } else {
                cm.sendOk("非常感謝你!!");
            }
            break;
        case 933036000://女神之塔 - &lt;中央塔>
            if (em.getProperty("stage").equals("4")) {
                if (em.getProperty("finished").equals("0")) {
                    cm.warpParty(920010800); //GARDEN.    
                } else {
                    cm.sendOk("謝謝你救了雅典娜女神! 請和她對話!");
                }
            } else {
                cm.sendOk("請救救雅典娜女神!收集4塊碎片,並帶回來復原女神像.!");
            }
            break;
        case 933037000:// 女神之塔 - &lt;庭園>
            cm.sendNext("請找到消滅精靈爸爸的方法! 消滅食人花找到種子,並種下去,一旦你發現黑色的邪惡食人花,打敗他,就會召喚出精靈爸爸,打敗精靈爸爸來獲得拯救雅典娜女神的生命草!!!");
            //消滅了遠古精靈.請隊長去幫傭易克那裡領取生命草,移動到中央房間.
            break;
        case 933038000:// 女神之塔 - &lt;女神之祝福>
            break;
    }
    cm.dispose();
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}
