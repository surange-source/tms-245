/*
 腳本功能：納希沙漠競技場相關
 */
var status = 0;
var result = Array();
var resultAll = Array();
var aaa = Array();//後面得不到resultAll數據 用這個來轉
var em;
var eim;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            em = cm.getEventManager("AliantSystem");
            eim = em.getInstance("AliantSystem")
            if (em.getProperty("FriendlyTips") == "done" || cm.getPlayer().isGm()) {//如果到了統計階段
                text = "#e<納希沙漠競技場>#n\r\n#d現在我來公佈競技場結果：\r\n\r\n#b"
                for (var i = 0; i < parseInt(eim.getProperty("PlayerCount")); i++) {
                    result.push(eim.getPlayers().get(i).getName())//一維載入名字
                    result.push(eim.getKillCount(eim.getPlayers().get(i)))//三維載入怪物數量
                    resultAll.push(result)//集合成一個數組
                    result = Array();
                }

                //冒泡排序法開始，取最大
                for (var i = 0; i < resultAll.length; i++) {
                    for (var j = 0; j < resultAll.length; j++) {
                        var temp;
                        if (resultAll[i][1] > resultAll[j][1]) {
                            temp = resultAll[j];
                            resultAll[j] = resultAll[i];
                            resultAll[i] = temp;
                        }
                    }
                }

                var sort;
                for (var i = 0; i < resultAll.length; i++) {
                    sort = i + 1;
                    text += "第" + sort + "名：" + resultAll[i][0] + "  消滅怪物總數：" + resultAll[i][1] + "\r\n"
                    aaa.push(resultAll[i][0]);
                }
                text += "#b#L99# 知道了排名，領取積分離開地圖。"
                cm.sendSimpleS(text, 9)
            } else {
                if (cm.getMapId() == 980010100) {//如果是在等待地圖
                    cm.openNpc(2101017, 1);
                } else if (cm.getMapId() == 980010101) {//如果是在戰鬥地圖
                    status = 1;
                    cm.sendSimple("納希沙漠競技場開始了，你想做什麼呢？#b\r\n#L0# 我想離開這裡放棄獎勵!");
                }
            }
        } else if (status == 1) {
            var em = cm.getEventManager("AliantSystem");
            if (cm.MissionStatus(cm.getPlayer().getId(), 105, 0, 4) == false) {
                cm.MissionMake(cm.getPlayer().getId(), 105, 0, 0, 0, 999999)//記錄競技場積分
            }
            var count = eim.getKillCount(cm.getPlayer());
            cm.warp(910000000, 0)
            em.setProperty("FriendlyTips", "0");
            cm.MissionAddMinNum(cm.getPlayer().getId(), 105, count)
            var text = "獲得了競技場　" + count + "。\r\n你可以用征服幣在小秘書(拍賣處)#b[競技積分]#k處兌換禮品."

            if (sort != 1) {
                var sort = 0;
                for (var i = 0; i < 1; i++) {//前1名
                    sort = i + 1;
                    if (aaa[i] == cm.getPlayer().getName()) {
                        text += "\r\n由於你排在第" + sort + "名，額外獲得了100競技場積分。"
                        cm.MissionAddMinNum(cm.getPlayer().getId(), 105, 100)//贈送100競技場積分
                    }
                }
            }
            cm.sendOk(text);
            cm.worldMessage("[納希沙漠競技場] 截至現在" + cm.getChar().getName() + "  玩家共獲得了" + cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) + "競技場積分。");
            //cm.warp(910000000, 0);
            cm.dispose();
        } else if (status == 2) {
            if (selection == 0) {
                cm.warp(910000000, 0);
                cm.sendOk("好吧！再見");
                cm.dispose();
            }
        }
    }
}