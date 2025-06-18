var status = 0;
var text = "";
var questid = 100100;
var maxtimes = 20;
var playerid = 0;
var accepttimes = 0;
var questitemid = 0;
var questitemcs = 0;
var hitemid = 0;
var hitemcs = 0;
var questitems = Array(
        Array(4000000, -1, "藍色蝸牛的殼."), // 藍色蝸牛殼 - 藍色蝸牛的殼.
        Array(4000001, -1, "花蘑菇的蓋"), // 藍色蝸牛殼 - 藍色蝸牛的殼.
        Array(4000014, -1, "龍的頭骨"), // 是龍的頭骨 - 是龍的頭骨
        Array(4000034, -1, "蛇皮"), // 青蛇的外皮. - 青蛇的外皮.
        Array(4000048, -1, "小白雪人皮"), // 小白雪人皮 - 小白雪人的外皮，由白色軟毛構成.
        Array(4000331, -1, "聽說有人在#r仙人掌爸爸#k身上見到過這種東西"), // 能從仙人掌爸爸那兒得到的仙人掌的花，因為花的植物液體比較甜，能作為茶的材料。
        Array(4000330, -1, "聽說有人在#r仙人掌媽媽#k身上見到過這種東西"), // 是龍的頭骨 - 是龍的頭骨
        Array(4004000, -1, "力量母礦"), // 力量母礦 - 力量母礦
        Array(4004002, -1, "敏捷母礦"), // 是龍的頭骨 - 是龍的頭骨
        Array(4004003, -1, "幸運母礦"), // 是龍的頭骨 - 是龍的頭骨
        Array(4000014, -1, "龍的頭骨"), // 是龍的頭骨 - 是龍的頭骨
        Array(4000269, -1, "聽說有人在#r藍飛龍#k身上見到過這種東西"), //飛龍的腮
        Array(4000268, -1, "聽說有人在#r紅飛龍#k身上見到過這種東西"), // 飛龍的翅膀 - 紅飛龍的紅色翅膀
        Array(4000270, -1, "聽說有人在#r黑飛龍#k身上見到過這種東西"), // 飛龍的指甲 - 附在黑飛龍翅膀兩端的尖銳指甲
        Array(4000190, -1, "聽說在#r上海郊外#k有人看到山羊出沒"), // - 山羊角 - 山羊的角，不那麼鋒利，但有點危險。
        Array(4000194, -1, "聽說在#r上海郊外#k有人看到山羊出沒"), // 黑羊毛 - 黑綿羊的毛，有點粗糙。
        Array(4000187, -1, "聽說在#r上海郊外#k有很多農場，你到那兒或許會有所發現"), // 雞爪 - 鬥雞的腳,可以交換玉米或糖葫蘆
        Array(4000188, -1, "聽說在#r上海郊外#k有很多農場，你到那兒或許會有所發現"), // 鴨蛋 - 大頭鴨的蛋,可以交換玉米或糖葫蘆
        Array(4000252, -1, "聽說在#r上海郊外#k有很多農場，你到那兒或許會有所發現"), // 雞肉 - 雞毛都退掉的整理好的雞肉
        Array(4001017, 1, "到#r雜貨店#k裡買一個給我吧"), // 火焰的眼 - 把被封印的殘暴炎魔樹的種子人工製作的。用於殘暴炎魔祭壇祭物的材料。
        Array(4001242, 1, "去吧，去擊敗#r心疤獅王#k"), // 心疤獅王足 - 心疤獅王神奇的腳。
        Array(4000021, -1, "也許你可以想想#r火野豬#k什麼的"), // 動物皮 - 是動物的外皮.
        Array(4000052, -1, "在#r冰封雪域#k有人看見過這種東西"), // 白狼之尾 - 白狼的尾，由白色軟毛構成.
        Array(4000595, -1, "在#r埃德爾斯坦#k有人看見過這種東西"), // 嫩芽
        Array(4000596, -1, "在#r埃德爾斯坦#k有人看見過這種東西"), // 喇叭花.
        Array(4000597, -1, "在#r埃德爾斯坦#k有人看見過這種東西"), // 軟木塞
        Array(4000598, -1, "在#r埃德爾斯坦#k有人看見過這種東西"), // 巡邏機器人的記憶芯片
        Array(4000601, -1, "在#r埃德爾斯坦#k有人看見過這種東西"), // 偷水賊的水平
        Array(4000602, -1, "在#r埃德爾斯坦#k有人看見過這種東西"), // 塵粒
        Array(4000156, -1, "在#r水下世界#k有人看見過這種東西"), // 海象尖牙
        Array(4000157, -1, "在#r水下世界#k有人看見過這種東西"), // 海豹的肉
        Array(4000182, -1, "在#r水下世界#k有人看見過這種東西"), // 石灰粉瓶
        Array(4031209, -1, "在#r水下世界#k有人看見過這種東西"), // 求救信
        Array(4000167, -1, "在#r水下世界#k有人看見過這種東西"), // 堅硬的鱗片
        Array(4000106, -1, "在#r玩具塔#k有人看見過這種東西"), // 玩具熊貓的棉花
        Array(4000073, -1, "在#r天空之城#k有人看見過這種東西"), // 獨角獅的硬角
        Array(4000232, -1, "聽說這是#r火焰半人馬#k之力量的來源"), // 半人馬的火花 - 火焰半人馬之力量的來源。
        Array(4000233, -1, "聽說這是#r寒冰半人馬#k之力量的來源"), // 半人馬的淨水 - 寒冰半人馬之力量的來源。
        Array(4000234, -1, "聽說這是#r暗黑半人馬#k之力量的來源"), // 半人馬的骨頭 - 暗黑半人馬之力量的來源。
        Array(4000238, -1, "聽說這是#r哈維#k身上掉下的尾羽毛"), // 哈維羽毛 - 哈維身上掉下的尾羽毛。外觀很美，用於裝飾品。
        Array(4000239, -1, "聽說這是#r血腥哈維#k帶著的王冠"), // 血腥哈維的王冠 - 血腥哈維帶著的王冠。顏色顯得十分的鮮艷。
        Array(4001241, 1, "擊敗#r暴力熊#k，或許你能獲取到它的熊足"), // 暴力熊足 - 暴力熊神奇的腳。
        Array(4160000, 1, "或許你可以到#r寵物飼料商#k那兒去看看。"), // 寵物指令：小狗系列 // 記載著可對小狗使用的指令說明書。\n#c快速雙擊該道具，便可開啟書本。#
        //Array(4160011, 1, "或許你可以到#r寵物飼料商#k那兒去看看。"), // 寵物能力值轉移卷軸 // 記載著可轉移寵物能力值的卷軸。\n#c快速雙擊該道具，便可知道詳細內容。#
        Array(4160012, 1, "或許你可以到#r寵物飼料商#k那兒去看看。"), // 寵物指令：小白雪人 // 記載著可對小白雪人使用的指令說明書。\n#c快速雙擊該道具，便可開啟書本。#
        Array(4160013, 1, "或許你可以到#r寵物飼料商#k那兒去看看。"), // 寵物指令：小白虎 // 記載著可對小白虎使用的指令說明書。\n#c快速雙擊該道具，便可開啟書本。#
        Array(4160014, 1, "或許你可以到#r寵物飼料商#k那兒去看看。"), // 寵物指令：小企企 // 記載著可對小企企使用的指令說明書。\n#c快速雙擊該道具，便可開啟書本。#
        Array(4160015, 1, "或許你可以到#r寵物飼料商#k那兒去看看。"), // 寵物指令：巴洛古 // 記載著可對巴洛古使用的指令說明書。\n#c快速雙擊該道具，便可開啟書本。#
        Array(3010001, 1, "或許你可以到#r維多利亞港#k看一看，那兒似乎有賣。"), // 藍色木椅 - 只有在維多利亞港製作販賣的藍色木椅。坐在上面每10秒可恢復HP 35
        Array(2000003, -1, "各大藥房均有銷售。"), // 藍色藥水 - 青色藥草研磨作成的藥水.\n恢復MP約100.
        //Array(2000004, -1, "各大藥房均有銷售。"), // 特殊藥水 - 傳說中的秘藥。\n使HP、MP恢復約50%。但最大HP、MP超過99,999時，HP、MP恢復49,999。
        Array(2000006, -1, "各大藥房均有銷售。") // 活力神水 - 傳說中的秘藥.\n恢復MP約300.
        //Array(2000007, -1, "各大藥房均有銷售。"), // 紅色藥丸 - 用紅色藥水做的藥丸。 HP恢復50。因為體積小，能帶更多藥
        //Array(2000008, -1, "各大藥房均有銷售。") // 橙色藥丸 - 用橙色藥水做的藥丸。 HP恢復150。因為體積小，能帶更多藥
//    Array(-1,-1, "我想我需要買一些東西慰勞自己。"), //遊戲幣
//    Array(-2,-1,"我想我需要買一些東西慰勞自己。") //楓點
        );

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == -1) {
            cm.dispose();
        } else if (status == 0) {
            playerid = cm.getPlayer().getId();
            var info = cm.getPlayer().getOneInfo(questid, "COUNT");
            accepttimes = cm.getEventCount("RINGQUSTION");
            if (info == null || accepttimes <= 0) {
                info = cm.getPlayer().updateInfoQuest(questid, "COUNT=1;DONE=0;AC=0;ITEM=0;REQ=0;ID=0");
            }
            text = "\t\t\t\t#e日常任務 - 每日任務20環#n\r\n\r\n";
            text += "您今日可領取次數：#r" + (maxtimes - accepttimes) + "#k 次\r\n";
            text += "完成每環任務會獲得如下獎勵：\r\n";
            text += "#r200點楓點、大量遊戲經驗、100個星星、200樂豆點#k\r\n";
            text += "每#r5、10、15、20#k環為#b雙倍獎勵#k，並有幾率獲得#b#r#z2430069##k一個！\r\n#k";
            text += "#e#r注意:每天晚上12點會重置任務!不管有沒有完成!#n#k\r\n\r\n";

            if (cm.getPlayer().getLevel() < 59) {
                cm.sendOk("連續跑環任務需要角色等級大於#r60#k級");
                cm.dispose();
                return;
            } else if (cm.getEventCount("連續跑環") > 1) {
                cm.sendOk("該帳號跑環任務已經做完請明天再來!");
                cm.dispose();
                return;
            } else if (cm.getPlayer().getOneInfo(questid, "AC").equals("1")) {  // 判斷是否接取了任務
                if (accepttimes <= maxtimes) { // 判斷是否超過完成次數
                    hitemid = parseInt(cm.getPlayer().getOneInfo(questid, "ITEM"));
                    hitemcs = parseInt(cm.getPlayer().getOneInfo(questid, "REQ"));
                    text += "\t\t#e當前第#r" + Math.max(1, accepttimes) + "#k環  收集 #r#z" + hitemid + "# " + hitemcs + "#k個#n\r\n\r\n\r\n";
                    if (cm.haveItem(hitemid, hitemcs)) {    // 判斷是否滿足任務條件
                        text += "#b#L1#完成任務#l\r\n";
                    } else {
                        text += "#e怎麼了？還沒找到我要的東西嗎？#n\r\n";
                    }
                    text += "#r#L2#放棄任務 (無法獲得任何獎勵，且會消耗一次任務次數)#l\r\n";
                } else {
                    text += "#e該帳號跑環任務已經做完請明天再來!#n\r\n";
                }
            } else {
                text += "#b#L3#接受任務#l\r\n";
            }
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 0) {            // 重新接受任務 初始化
                var questrandid = Math.floor(Math.random() * questitems.length);
                questitemid = questitems[questrandid][0];    // 任務道具ID
                if (questitems[questrandid][1] < 0) {
                    questitemcs = Math.floor(Math.random() * 20) + 5 + Math.floor(Math.random() * cm.getReborns());    // 任務道具數量
                } else {
                    questitemcs = questitems[questrandid][1];
                }
                text = "#e第#r" + (accepttimes + 1) + "#k環：#n\r\n\r\n請幫我找到#b" + questitemcs + "#k個#r#z" + questitemid + "##k\r\n" + questitems[questrandid][2] + "\r\n#k感激不盡，快去快回~";
                // 重新接受任務
                cm.getPlayer().updateOneInfo(questid, "AC", "1");
                cm.getPlayer().updateOneInfo(questid, "DONE", "0");
                // 寫入任務道具ID
                cm.getPlayer().updateOneInfo(questid, "ITEM", questitemid + "");
                // 寫入任務道具數量
                cm.getPlayer().updateOneInfo(questid, "REQ", questitemcs + "");
                cm.sendOk(text);
                cm.dispose();
            } else if (selection == 1) {    // 完成任務
                var doneCount = accepttimes + 1;
                //完成任務
                cm.getPlayer().updateOneInfo(questid, "DONE", "1");
                cm.getPlayer().updateOneInfo(questid, "AC", "0");
                cm.getPlayer().updateOneInfo(questid, "COUNT", doneCount + "");
                //經驗值獎勵
                var baseExp = 0.02;
                if (cm.getPlayer().getLevel() > 220) {
                    baseExp = 0.01;
                } else if (cm.getPlayer().getLevel() > 240) {
                    baseExp = 0.001;
                }
                var calcExp = Math.floor(cm.getPlayer().getExpNeededForLevel() * baseExp) + Math.floor(Math.random() * 100000 + 100000);
                if (!(accepttimes % 5)) {
                    cm.gainExp(calcExp);
                    //cm.gainItem(4310036, 30);
                    cm.gainItem(4034252, 10);
                    //cm.gainItem(4310019, 1, 1);
                    if (cm.getEventCount("RINGQUSTION") <= maxtimes) {
                        cm.gainNX(2, 400);
                        cm.gainNX(1, 400);
                    }
                    if (Math.round(Math.random() * 1)) {
                        cm.gainItem(2430069, 1);
                        cm.worldSpouseMessage(0x18, "[每日任務]" + " : " + "真是好運，玩家【" + cm.getChar().getName() + "】獲得了一個祖母綠抽獎箱。");
                    }
                } else {
                    cm.gainExp(calcExp);
                    //cm.gainItem(4310036, 15);
                    if (cm.getEventCount("RINGQUSTION") <= maxtimes) {
                        cm.gainNX(2, 200);
                        cm.gainNX(1, 200);
                    }
                }
                cm.gainItem(hitemid, -hitemcs);
                text = "恭喜您完成了任務~~";
                cm.sendOk(text);
                cm.gainNX(2, 1000);
                cm.gainItem(4001839, 20);
                cm.worldSpouseMessage(0x18, "[每日任務]" + " : " + "恭喜玩家【" + cm.getChar().getName() + "】,完成了【第" + accepttimes + "環】任務獲得了豐厚的獎勵。");
                cm.playerMessage(-1, "獲得星星20個");
                //cm.playerMessage(-1, "獲得高級魔法1個");
                //cm.playerMessage(-1, "獲得50樂豆點");
                if (doneCount >= maxtimes) {
                    cm.setEventCount("連續跑環");
                    text = "您已經完成了今天的任務，請明天0點後再來吧~";
                }
                cm.dispose();
            } else if (selection == 2) {    // 放棄任務
                var doneCount = accepttimes + 1;
                //完成任務
                cm.getPlayer().updateOneInfo(questid, "DONE", "0");
                cm.getPlayer().updateOneInfo(questid, "AC", "0");
                cm.getPlayer().updateOneInfo(questid, "COUNT", doneCount + "");
                text = "任務已放棄……";
                if (doneCount >= maxtimes) {
                    cm.setEventCount("連續跑環");
                }
                cm.sendOk(text);
                cm.dispose();
            } else if (selection == 3) {    // 接受任務
                var questrandid = Math.floor(Math.random() * questitems.length);
                questitemid = questitems[questrandid][0];    // 任務道具ID
                if (questitems[questrandid][1] < 0) {
                    questitemcs = Math.floor(Math.random() * 20 * cm.getPlayer().getLevel() / 10) + 30 + Math.floor(Math.random());    // 任務道具數量
                } else {
                    questitemcs = questitems[questrandid][1];
                }
                text = "#e第#r" + (accepttimes + 1) + "#k環：#n\r\n\r\n請幫我找到#b" + questitemcs + "#k個#r#z" + questitemid + "##k\r\n" + questitems[questrandid][2] + "\r\n#k快去快回~";
                cm.getPlayer().updateOneInfo(questid, "AC", "1");
                cm.getPlayer().updateOneInfo(questid, "DONE", "0");
                // 寫入任務道具ID
                cm.getPlayer().updateOneInfo(questid, "ITEM", questitemid + "");
                // 寫入任務道具數量
                cm.getPlayer().updateOneInfo(questid, "REQ", questitemcs + "");
                cm.setEventCount("RINGQUSTION");
                cm.sendOk(text);
                cm.dispose();
            }
        }
    }
}