/* 泡點兌換 */

var status = -1;
var itemList = Array(
// 在線點為 1 - 60 的獎勵
        Array(2001512, 1, 10, 0), //西瓜
        Array(2001513, 1, 10, 0), //棒棒冰
        Array(2001514, 1, 10, 0), //紅豆刨冰
        Array(2000012, 5, 10, 0), //特殊藥水
        Array(2000019, 5, 10, 0), //超級藥水
        Array(2040000, 20, 1, 0), //頭盔防禦卷軸100%
        Array(2040003, 20, 1, 0), //頭盔體力卷軸100%
        Array(2040500, 20, 1, 0), //全身鎧甲敏捷卷軸100%
        Array(2040600, 20, 1, 0), //褲/裙防禦卷軸100%
        Array(2040700, 30, 1, 0), //鞋子敏捷度卷軸100%
        Array(2040703, 30, 1, 0), //鞋子跳躍卷軸100%
        Array(2043000, 40, 1, 0), //單手劍攻擊卷軸100%
        Array(2043100, 40, 1, 0), //單手斧攻擊卷軸100%
        Array(2043200, 40, 1, 0), //單手棍攻擊卷軸100%
        Array(2044000, 40, 1, 0), //雙手劍攻擊卷軸100%
        Array(2044100, 40, 1, 0), //雙手斧攻擊卷軸100%
        Array(2044200, 40, 1, 0), //雙手棍攻擊卷軸100%
        Array(2044300, 40, 1, 0), //槍攻擊卷軸100%
        Array(2044400, 40, 1, 0), //矛攻擊卷軸100%
        Array(2043300, 40, 1, 0), //短劍攻擊卷軸100%
        Array(2044700, 40, 1, 0), //拳套攻擊卷軸100%
        Array(2044900, 40, 1, 0), //火槍攻擊卷軸100%
        Array(2045200, 40, 1, 0), //雙弩槍攻擊力卷軸100%
        Array(2045300, 40, 1, 0), //手炮攻擊力卷軸100%
        Array(2043600, 40, 1, 0), //手杖攻擊力卷軸100%
// 在線點為 61 - 180 的獎勵
        Array(2004004, 61, 1, 0), //5級力量藥水
        Array(2004024, 61, 1, 0), //5級敏捷藥水
        Array(2004044, 61, 1, 0), //5級智力藥水
        Array(2004064, 61, 1, 0), //5級運氣藥水
        Array(2004084, 61, 1, 0), //5級防禦藥水
        Array(2004104, 61, 1, 0), //5級攻擊力藥水
        Array(2004114, 61, 1, 0), //5級魔力藥水
        Array(2049301, 70, 1, 0), //裝備強化卷軸
        Array(2049401, 70, 1, 0), //潛能附加卷軸
        Array(2040001, 70, 1, 0), //頭盔防禦卷軸60%
        Array(2040401, 70, 1, 0), //上衣防禦卷軸60%
        Array(2040601, 70, 1, 0), //褲裙防禦卷軸60%
        Array(2040621, 70, 1, 0), //褲裙體力卷軸60%
        Array(2040901, 70, 1, 0), //盾牌防禦卷軸60%
        Array(2041001, 70, 1, 0), //披風魔防卷軸60%
        Array(2041004, 70, 1, 0), //披風防禦卷軸60%
        Array(2040004, 70, 1, 0), //頭盔體力卷軸60%
        Array(2040421, 70, 1, 0), //上衣體力卷軸60%
        Array(2040824, 70, 1, 0), //手套體力卷軸60%
        Array(2040618, 70, 1, 0), //褲裙跳躍卷軸60%
        Array(2041007, 70, 1, 0), //披風體力卷軸60%
        Array(2041010, 70, 1, 0), //披風魔力卷軸60%
        Array(2040326, 70, 1, 0), //耳環裝飾體力卷軸60%
        Array(2040504, 70, 1, 0), //全身鎧甲防禦卷軸60%
        Array(2040029, 80, 1, 0), //頭盔敏捷卷軸60%
        Array(2040418, 80, 1, 0), //上衣力量卷軸60%
        Array(2040425, 80, 1, 0), //上衣運氣卷軸60%
        Array(2040501, 80, 1, 0), //全身鎧甲敏捷卷軸60%
        Array(2040513, 80, 1, 0), //全身鎧甲智力卷軸60%
        Array(2040516, 80, 1, 0), //全身鎧甲運氣卷軸60%
        Array(2040532, 80, 1, 0), //全身盔甲力量卷軸60%
        Array(2040701, 80, 1, 0), //鞋子敏捷度卷軸60%
        Array(2040704, 80, 1, 0), //鞋子跳躍卷軸60%
        Array(2040707, 80, 1, 0), //鞋子速度卷軸60%
        Array(2040924, 90, 1, 0), //盾牌運氣卷軸60%
        Array(2040927, 90, 1, 0), //盾牌體力卷軸60%
        Array(2040931, 90, 1, 0), //盾牌力量卷軸60%
        Array(2041013, 90, 1, 0), //披風力量卷軸60%
        Array(2041016, 90, 1, 0), //披風智力卷軸60%
        Array(2041019, 90, 1, 0), //披風敏捷卷軸60%
        Array(2041022, 90, 1, 0), //披風運氣卷軸60%
        Array(2043001, 100, 1, 0), //單手劍攻擊卷軸60%
        Array(2043101, 100, 1, 0), //單手斧攻擊卷軸60%
        Array(2043201, 100, 1, 0), //單手棍攻擊卷軸60%
        Array(2043301, 100, 1, 0), //短劍攻擊卷軸60%
        Array(2043401, 100, 1, 0), //刀攻擊力卷軸60%
        Array(2043601, 100, 1, 0), //手杖攻擊力卷軸60%
        Array(2043701, 100, 1, 0), //短杖魔力卷軸60%
        Array(2043801, 100, 1, 0), //長杖魔力卷軸60%
        Array(2044001, 100, 1, 0), //雙手劍攻擊卷軸60%
        Array(2044101, 100, 1, 0), //雙手斧攻擊卷軸60%
        Array(2044201, 100, 1, 0), //雙手棍攻擊卷軸60%
        Array(2044301, 100, 1, 0), //槍攻擊卷軸60%
        Array(2044401, 100, 1, 0), //矛攻擊卷軸60%
        Array(2044501, 100, 1, 0), //弓攻擊卷軸60%
        Array(2044601, 100, 1, 0), //弩攻擊卷軸60%
        Array(2044701, 100, 1, 0), //拳套攻擊卷軸60%
        Array(2044801, 100, 1, 0), //拳甲攻擊卷軸60%
        Array(2044901, 100, 1, 0), //火槍攻擊卷軸60%
        Array(2045201, 100, 1, 0), //雙弩槍攻擊力卷軸
        Array(2045301, 100, 1, 0), //手炮攻擊力卷軸
        Array(2040301, 100, 1, 0), //耳環智力卷軸60%
        Array(2040317, 120, 1, 0), //耳環敏捷卷軸60%
        Array(2040321, 120, 1, 0), //耳環裝飾運氣卷軸60%
        Array(2040801, 120, 1, 0), //手套敏捷卷軸60%
        Array(2040804, 130, 1, 0), //手套攻擊卷軸60%
        Array(2022529, 140, 1, 1), //金達萊花語 - 金達萊的花語是愛。30分鐘內楓幣掉落率提高2倍。
        Array(2022530, 150, 1, 1), //迎春花花語 - 迎春花的花語是希望。30分鐘內物品掉落率提高2倍。
        Array(2022531, 160, 1, 1), //四葉草花語 - 四葉草的花語是幸運。1小時內物品掉落率提高2倍。
        Array(2049300, 160, 1, 1), //高級裝備強化卷軸
        Array(2049400, 160, 1, 1), //高級潛能附加卷軸
        Array(2430578, 160, 1, 2), //直升機3天交換券
        Array(2430582, 160, 1, 2), //透明巴洛古3天交換券
        Array(2430584, 160, 1, 2), //熱氣球3天交換券
        Array(2430586, 160, 1, 2), //騎士團戰車3天交換券
        Array(2430587, 160, 1, 2), //妮娜的魔法陣3天交換券
        Array(2430589, 160, 1, 2), //魔法掃帚3天交換券
        Array(2430591, 160, 1, 2), //貓頭鷹3天交換券
        Array(2430593, 160, 1, 2), //警車3天交換券
        Array(2430594, 160, 1, 2), //觔斗雲3天交換券
        Array(2430595, 160, 1, 2), //玩具坦克3天交換券
        Array(2430596, 160, 1, 2), //鋼鐵變形俠3天交換券
        Array(2430597, 160, 1, 2), //飛船3天交換券
        Array(2430598, 160, 1, 2), //超能套裝3天交換券
        Array(2430599, 160, 1, 2), //巴洛古3天交換券
        Array(2430602, 160, 1, 2), //暴風摩托3天交換券
        Array(2430603, 160, 1, 2), //冒險騎士團高速電車3天交換券
// 在線點為 181 - 300 的獎勵
        Array(2049300, 181, 1, 1), //高級裝備強化卷軸
        Array(2049400, 181, 1, 1), //高級潛能附加卷軸
        Array(2290285, 181, 1, 2), //[能手冊]神秘能手冊
        Array(2028061, 181, 1, 2), //不可思議的卷軸卷
        Array(4021011, 181, 1, 2), //純潔靈魂的火花
        Array(4021012, 181, 1, 2), //強烈靈魂的淨水
        Array(4020013, 181, 1, 2), //夢碎片
        Array(4021019, 181, 1, 2), //夢之石
        Array(4021020, 181, 1, 2), //混沌碎片
        Array(4021021, 181, 1, 2), //賢者之石
        Array(4021022, 181, 1, 2), //太初精髓
        Array(4310015, 181, 1, 2), //鬥神證物
        Array(2028062, 181, 1, 2), //不可思議的配方卷
        Array(2430585, 181, 1, 2), //企鵝3天交換券
        Array(2430588, 181, 1, 2), //拿破侖的白馬3天交換券
        Array(2430590, 181, 1, 2), //夢魘3天交換券
        Array(2430579, 190, 1, 3), //GO兔冒險3天交換券
        Array(2430580, 190, 1, 3), //熊貓3天交換券
        Array(2430583, 190, 1, 3), //天馬3天交換券
        Array(2430600, 190, 1, 3), //暗光龍3天交換券
        Array(2430601, 190, 1, 3), //聖獸提拉奧斯3天交換券
        Array(2511040, 230, 1, 3), //新月腰帶製作配方    70級
        Array(2511079, 230, 1, 3), //新月戒指製作配方    70級
        Array(2511097, 230, 1, 3), //新月耳環製作配方    70級
        Array(2511115, 240, 1, 3), //半月戒指製作配方    70級
        Array(2511116, 240, 1, 3), //半月耳環製作配方    70級
        Array(2511117, 240, 1, 3)  //半月腰帶製作配方    70級
        );

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var zyms = "";
        zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n";
        zyms += "當前在線信息: #r" + cm.getGamePoints() + "#k 點。\r\n\r\n";
        zyms += "                 #L0##b查看規則#l \r\n\r\n";
        zyms += "       #L1##b領取獎勵#l    #fMob/0130101.img/move/0##L2##r兌換物品#k#l\r\n";
        //zyms += "                 #L3##r領取禮包#l \r\n";
        //cm.sendSimple("親愛的#b#h0##k您好，您有什麼需要我幫忙的嗎？\r\n\r\n#L0##b查看本NPC詳細規則#k#l\r\n#L1##b領取獎勵#k#l\r\n#L2##r兌換特別獎勵#k#l");
        cm.sendSimple(zyms);
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendOk("#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n規則如下：\r\n#b1#k、每日0時到24時，只要您在線，就可以獲得在線時間點數，每1分鐘可獲得1點在線點數。\r\n#b2#k、可以用在線時間點數兌換道具，各種極品道具等您來拿！\r\n#b3#k、若您當日24時內不兌換在線時間點數，則第二天0點在線時間點數會自動清零，請您注意。\r\n#b4#k、若不小心掉線，您可以重新登陸，時間會累計。\r\n#b5#k、各種獎勵是隨機的，也可能隨時增加或者取消某些道具，在線時間點數越大，兌換的道具會越好！\r\n#b6#k、在線6小時以上，都有超極品道具送。而且如果您在線時間超過了12小時，那麼將獲得一份豐富的大禮。如果在線能到23小時，那麼最好的道具將會給您。#k\r\n#b7#k、在線點數為#b 301#k到#b 700#k點可以兌換獲得#r1#k個#v4031504##k\r\n#b8#k、在線點數為#b1381#k到#b1440#k點可以兌換獲得#r1#k個#v4031506#\r\n#b9#k、在線點數為#b1381#k到#b1440#k點可以兌換獲得#r1#k個#v4031506#");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendYesNo("您目前的在線時間點數為#b " + cm.getGamePoints() + " #k點，請問您是否要兌換獎勵？");
        } else if (selection == 2) {
            status = 2;
            cm.sendSimple("#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k禮盒數量:#v4031504#:#r" + cm.itemQuantity(4031504) + " #k個  #v4031505#: #r" + cm.itemQuantity(4031505) + " #k個 #v4031506#: #r" + cm.itemQuantity(4031506) + " #k個\r\n#L0##b使用#v4031504#兌換物品#k#l \r\n#L1##b使用#v4031505#兌換物品#k#l \r\n#L2##b使用#v4031506#兌換物品#l");
        }
    } else if (status == 2) {
        if (cm.getSpace(1) < 1 || cm.getSpace(2) < 1 || cm.getSpace(3) < 1 || cm.getSpace(4) < 1) {
            cm.sendOk("兌換獎勵失敗，請您確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
        } else {
            var chance = cm.getGamePoints();
            if (chance > 0 && chance <= 60) { //在線1小時
                var finalitem = Array();
                for (var i = 0; i < itemList.length; i++) {
                    if (itemList[i][1] <= 60) {
                        finalitem.push(itemList[i]);
                    }
                }
                if (finalitem.length != 0) {
                    var item;
                    var random = new java.util.Random();
                    var finalchance = random.nextInt(finalitem.length);
                    var itemId = finalitem[finalchance][0];
                    var quantity = finalitem[finalchance][2];
                    var notice = finalitem[finalchance][3];
                    item = cm.gainGachaponItem(itemId, quantity, "在線獎勵", notice);
                    if (item != -1) {
                        cm.resetGamePoints();
                        cm.sendOk("恭喜您成功兌換獎勵，獲得了 #b#t" + item + "##k " + quantity + "個。");
                    } else {
                        cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
                    }
                }
            } else if (chance > 60 && chance <= 180) {
                var finalitem = Array();
                for (var i = 0; i < itemList.length; i++) {
                    if (itemList[i][1] > 60 && itemList[i][1] <= 180) {
                        finalitem.push(itemList[i]);
                    }
                }
                if (finalitem.length != 0) {
                    var item;
                    var random = new java.util.Random();
                    var finalchance = random.nextInt(finalitem.length);
                    var itemId = finalitem[finalchance][0];
                    var quantity = finalitem[finalchance][2];
                    var notice = finalitem[finalchance][3];
                    item = cm.gainGachaponItem(itemId, quantity, "在線獎勵", notice);
                    if (item != -1) {
                        cm.resetGamePoints();
                        cm.sendOk("恭喜您成功兌換獎勵，獲得了 #b#t" + item + "##k " + quantity + "個。");
                    } else {
                        cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
                    }
                }
            } else if (chance > 180 && chance <= 300) {
                var finalitem = Array();
                for (var i = 0; i < itemList.length; i++) {
                    if (itemList[i][1] > 180 && itemList[i][1] <= 300) {
                        finalitem.push(itemList[i]);
                    }
                }
                if (finalitem.length != 0) {
                    var item;
                    var random = new java.util.Random();
                    var finalchance = random.nextInt(finalitem.length);
                    var itemId = finalitem[finalchance][0];
                    var quantity = finalitem[finalchance][2];
                    var notice = finalitem[finalchance][3];
                    item = cm.gainGachaponItem(itemId, quantity, "在線獎勵", notice);
                    if (item != -1) {
                        cm.resetGamePoints();
                        cm.sendOk("恭喜您成功兌換獎勵，獲得了 #b#t" + item + "##k " + quantity + "個。");
                    } else {
                        cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
                    }
                }
            } else if (chance > 300 && chance <= 700) {
                var item = cm.gainGachaponItem(4031504, 1, "在線獎勵", 3);
                if (item != -1) {
                    cm.resetGamePoints();
                    cm.sendOk("恭喜您成功兌換獎勵，獲得了 #b#t" + item + "##k " + 1 + "個。");
                } else {
                    cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
                }
            } else if (chance > 700 && chance <= 1380) {
                var item = cm.gainGachaponItem(4031505, 1, "在線獎勵", 3);
                if (item != -1) {
                    cm.resetGamePoints();
                    cm.sendOk("恭喜您成功兌換獎勵，獲得了 #b#t" + item + "##k " + 1 + "個。");
                } else {
                    cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
                }
            } else if (chance > 1380) {
                var item = cm.gainGachaponItem(4031506, 1, "在線獎勵", 3);
                if (item != -1) {
                    cm.resetGamePoints();
                    cm.sendOk("恭喜您成功兌換獎勵，獲得了 #b#t" + item + "##k " + 1 + "個。");
                } else {
                    cm.sendOk("兌換獎勵失敗，請您確認在背包所有欄目窗口中是否有一格以上的空間。");
                }
            } else {
                cm.sendOk("兌換獎勵失敗，您當前的在線點數還不能兌換獎勵。");
            }
        }
        cm.dispose();
    } else if (status == 3) {
        if (selection == 0) {
            cm.dispose();
            cm.openNpc(9000030, 2);
        } else if (selection == 1) {
            cm.dispose();
            cm.openNpc(9000030, 3);
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9000030, 4);
        }
    }
}
