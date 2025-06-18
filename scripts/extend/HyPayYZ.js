status = -1;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var Star = "#fEffect/CharacterEff/1112904/2/1#";
/***************************************/
var cost = 66;  //每次消耗的HyPay額度
var itemList = Array(
/* 餘額抽 */
Array(3010824, 250, 1, 1), //水星椅子
Array(3010825, 250, 1, 1), //金星椅子
Array(3010826, 250, 1, 1), //地球椅子
Array(3010827, 250, 1, 1), //火星椅子
Array(3010828, 250, 1, 1), //木星椅子
Array(3010832, 100, 1, 1), //太陽椅子
Array(3010217, 250, 1, 1), //香橙果凍布丁
Array(3010829, 250, 1, 1), //土星椅子
Array(3010830, 250, 1, 1), //天王星椅子
Array(3015263, 250, 1, 1), //海王星椅子
Array(3010119, 250, 1, 1), //羊羊椅子    
Array(3015809, 250, 1, 1), //啾啾島椅子    
Array(3016203, 250, 1, 1), //夢幻旋轉木馬椅子    
Array(3015584, 250, 1, 1), //楓之谷主播椅子
Array(3015609, 250, 1, 1), //音樂盛典全明星椅子    
Array(3015529, 250, 1, 1), //我和小雞雞椅子    
Array(3015544, 250, 1, 1), //水晶冰河椅子
Array(3020000, 100, 1, 1),
Array(3016000, 100, 1, 1),
Array(3015785, 100, 1, 1),
Array(3015784, 100, 1, 1),
Array(3015783, 100, 1, 1),
Array(3015780, 100, 1, 1),
Array(3015779, 100, 1, 1),
Array(3015778, 100, 1, 1),
Array(3015766, 100, 1, 1),
Array(3015276, 100, 1, 1),
Array(3015277, 100, 1, 1),
Array(3015278, 100, 1, 1),
Array(3015636, 100, 1, 1),
Array(3014019, 100, 1, 1),
Array(3010698, 100, 1, 1),
Array(3015183, 100, 1, 1),
Array(3015160, 100, 1, 1),
Array(3015118, 100, 1, 1),
Array(3015100, 100, 1, 1),
Array(3010980, 100, 1, 1),
Array(3014005, 100, 1, 1),
Array(3015001, 100, 1, 1),
Array(3010845, 100, 1, 1),
Array(3010864, 100, 1, 1),
Array(3010879, 100, 1, 1),
Array(3010938, 100, 1, 1),
Array(3010512, 100, 1, 1),
Array(3010675, 100, 1, 1),
Array(3010937, 100, 1, 1),
Array(3010513, 100, 1, 1),
Array(3015579, 100, 1, 1),
Array(3015598, 100, 1, 1),
Array(3015623, 100, 1, 1),
Array(3015408, 100, 1, 1),
Array(3015437, 100, 1, 1),
Array(3014011, 100, 1, 1),
Array(3015529, 100, 1, 1),
Array(3015051, 100, 1, 1),
Array(3015349, 100, 1, 1),
Array(3015262, 100, 1, 1),
Array(3015224, 100, 1, 1),
Array(3015662, 100, 1, 1)
);
var itemList2 = Array(
Array(3015031, 100, 1, 1),
Array(3015246, 100, 1, 1),
Array(3010779, 100, 1, 1),
Array(3015245, 100, 1, 1),
Array(3010955, 100, 1, 1),
Array(3010651, 100, 1, 1),
Array(3010652, 100, 1, 1),
Array(3010653, 100, 1, 1),
Array(3010654, 100, 1, 1),
Array(3010655, 100, 1, 1),
Array(3010656, 100, 1, 1),
Array(3015298, 100, 1, 1),
Array(3015627, 100, 1, 1),
Array(3015440, 100, 1, 1),
Array(3015279, 100, 1, 1),
Array(3015449, 100, 1, 1),
Array(3012020, 100, 1, 1),
Array(3015637, 100, 1, 1),
Array(3015712, 100, 1, 1),
Array(3015711, 100, 1, 1),
Array(3015710, 100, 1, 1),
Array(3015708, 100, 1, 1),
Array(3015722, 100, 1, 1),
Array(3015755, 100, 1, 1),
Array(3015754, 100, 1, 1),
Array(3015756, 100, 1, 1),
Array(3015757, 100, 1, 1),
Array(3015758, 100, 1, 1),
Array(3015759, 100, 1, 1),
Array(3015779, 100, 1, 1),
Array(3015797, 100, 1, 1),
Array(3015795, 100, 1, 1),
Array(3015799, 100, 1, 1),
Array(3015760, 100, 1, 1),
Array(3015800, 100, 1, 1),
Array(3015808, 100, 1, 1),
Array(3015811, 100, 1, 1),
Array(3016000, 100, 1, 1),
Array(3015610, 100, 1, 1), 
Array(3015645, 100, 1, 1),
Array(3015646, 100, 1, 1),
Array(3015642, 100, 1, 1), 
Array(3015614, 100, 1, 1),   
Array(3015613, 100, 1, 1), 
Array(3015612, 100, 1, 1), 
Array(3015648, 100, 1, 1),
Array(3015649, 100, 1, 1),
Array(3015650, 100, 1, 1),
Array(3015651, 100, 1, 1),
Array(3015667, 100, 1, 1),
Array(3015663, 100, 1, 1),
Array(3015600, 100, 1, 1),
Array(3015687, 100, 1, 1),
Array(3015689, 100, 1, 1),
Array(3015688, 100, 1, 1),
Array(3015619, 100, 1, 1),
Array(3015661, 100, 1, 1),
Array(3015693, 100, 1, 1),
Array(3015665, 100, 1, 1),
Array(3015670, 100, 1, 1),
Array(3015662, 100, 1, 1),
Array(3015313, 100, 1, 1),
Array(3015234, 100, 1, 1),    
Array(3015544, 250, 1, 1) //水晶冰河椅子
);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("不想使用嗎？…我的肚子裡有各類#b奇特座椅或卷軸、裝備、新奇道具#k哦！");
            cm.dispose();
        }
        status--;

    }
    if (status == 0) {
        var txt = Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + "\r\n";
        txt += "#d想抽獎嗎？精品道具入誰家？我這裡有150-160不等高級道具\r\n";
        txt += "限量椅子 絕版椅子 土豪椅子 等酷炫椅子  [ #r還在等待嗎#d ]\r\n\r\n#k";
        txt += "#d[ #r#h ##d ] 玩家餘額：#r" + cm.getHyPay(1) + "　#b[ 66餘額抽一回 ]\r\n#k";
        txt += "#b#L0#開始抽獎 [ 可抽 #r" + parseInt(cm.getHyPay(1) / cost) + "#b 次 ]\t\t#r☆獎品圖鑒如下☆#l#k\r\n\r\n";
        txt += Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + Star + "\r\n";
        txt += "#i3015785##i3015234##i3015313##i3015755##i3015693##i3015661##i3015795##i3015642##i3015797##i3010779##i3015031##i3015662##i3015224##i3015262##i3015183##i3015623##i3015408##i3015277##i3010845##i3010698#";
        cm.sendSimple(txt);
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getHyPay(1) < cost) {
                cm.sendOk("你好像沒有" + cost + "點餘額");
                cm.dispose();
                return;
            }
            var chance = Math.floor(Math.random() * 0);
            var finalitem = Array();
            if (chance >250){
                cm.sendOk("很遺憾未中獎");
                cm.dispose();
                return;
            }
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        for (var i = 0; i < itemList2.length; i++) {
            if (itemList2[i][1] >= chance) {
                finalitem.push(itemList2[i]);
            }
        }
        if (finalitem.length != 0) {
                var item;
                var random = new java.util.Random();
                var finalchance = random.nextInt(finalitem.length);
                var itemId = finalitem[finalchance][0];
                var quantity = finalitem[finalchance][2];
                var notice = finalitem[finalchance][3];
                item = cm.gainGachaponItem(itemId, quantity, "[餘額座椅抽獎寶箱]", notice);
                if (item != -1) {
                    cm.addHyPay(cost);
                    cm.sendOk("你獲得了 #b#z" + item + "##k " + quantity + "個。");
                } else {
                    cm.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
                }
                cm.safeDispose();
            } else {
                cm.sendOk("今天的運氣可真差，什麼都沒有拿到");
                cm.addHyPay(cost);
                cm.safeDispose();
            }
        }
    }
}

