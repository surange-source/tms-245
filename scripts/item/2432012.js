status = -1;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var Star = "#fEffect/CharacterEff/1112904/2/1#";
/***************************************/
var cost = 100;  //每次消耗的HyPay額度
var itemList = Array(
Array(1152174, 50, 1, 3), //埃蘇萊布斯騎士護肩
Array(1152176, 100, 1, 3), //埃蘇萊布斯法師護肩
Array(1152177, 100, 1, 3), //埃蘇萊布斯弓箭手護肩
Array(1152178, 100, 1, 3), //埃蘇萊布斯盜賊護肩
Array(1152179, 300, 1, 3), //埃蘇萊布斯海盜護肩
Array(1004422, 50, 1, 3), //埃蘇萊布斯騎士頭盔
Array(1004423, 100, 1, 3), //埃蘇萊布斯法師帽
Array(1004424, 100, 1, 3), //埃蘇萊布斯弓箭手帽
Array(1004425, 100, 1, 3), //埃蘇萊布斯盜賊帽
Array(1004426, 300, 1, 3), //埃蘇萊布斯海盜帽
Array(1102775, 100, 1, 3), //埃蘇萊布斯騎士披風
Array(1102794, 100, 1, 3), //埃蘇萊布斯魔法師披風
Array(1102795, 100, 1, 3), //埃蘇萊布斯弓箭手披風
Array(1102796, 100, 1, 3), //埃蘇萊布斯盜賊披風
Array(1102797, 300, 1, 3),  //埃蘇萊布斯海盜披風
Array(1082636, 50, 1, 3),  //埃蘇萊布斯騎士手套
Array(1082637, 300, 1, 3),  //埃蘇萊布斯法師手套
Array(1082638, 300, 1, 3),  //埃蘇萊布斯弓箭手手套
Array(1082639, 300, 1, 3),  //埃蘇萊布斯盜賊手套
Array(1082640, 300, 1, 3),  //埃蘇萊布斯海盜手套
Array(1052882, 300, 1, 3),  //埃蘇萊布斯騎士套裝
Array(1052887, 300, 1, 3),  //埃蘇萊布斯魔法師套裝
Array(1052888, 300, 1, 3),  //埃蘇萊布斯弓箭手套裝
Array(1052889, 300, 1, 3),  //埃蘇萊布斯盜賊套裝
Array(1052890, 300, 1, 3),  //埃蘇萊布斯海盜套裝
Array(1073030, 50, 1, 3),  //埃蘇萊布斯騎士鞋
Array(1073032, 300, 1, 3),  //埃蘇萊布斯法師鞋
Array(1073033, 300, 1, 3),  //埃蘇萊布斯弓箭手鞋
Array(1073034, 300, 1, 3),  //埃蘇萊布斯盜賊鞋
Array(1073035, 300, 1, 3)  //埃蘇萊布斯海盜鞋
);

var itemList2 = Array(
Array(1212115, 90, 1, 3), // 埃蘇萊布斯閃亮克魯
Array(1222109, 250, 1, 3), // 埃蘇萊布斯靈魂射手
Array(1232109, 90, 1, 3), // 埃蘇萊布斯魔劍
Array(1402251, 90, 1, 3), // 埃蘇萊布斯寬大刀
Array(1242116, 90, 1, 3), // 埃蘇萊布斯能量劍
Array(1262017, 500, 1, 3), // 埃蘇萊布斯ESP限製器
Array(1302333, 500, 1, 3), // 埃蘇萊布斯軍刀
Array(1312199, 90, 1, 3), // 埃蘇萊布斯戰斧
Array(1322250, 90, 1, 3), // 埃蘇萊布斯戰錘
Array(1332274, 90, 1, 3), // 埃蘇萊布斯屠龍斬
Array(1342101, 90, 1, 3), // 埃蘇萊布斯之刃
Array(1362135, 250, 1, 3), // 埃蘇萊布斯折疊手杖
Array(1372222, 90, 1, 3), // 埃蘇萊布斯短杖
Array(1382259, 90, 1, 3), // 埃蘇萊布斯長杖
Array(1412177, 90, 1, 3), // 埃蘇萊布斯大斧
Array(1422184, 90, 1, 3), // 埃蘇萊布斯大錘
Array(1432214, 90, 1, 3), // 埃蘇萊布斯穿透矛
Array(1442268, 90, 1, 3), // 埃蘇萊布斯巨靈開山斧
Array(1452252, 90, 1, 3), // 埃蘇萊布斯弓
Array(1462239, 100, 1, 3), // 埃蘇萊布斯弩
Array(1472261, 500, 1, 3), // 埃蘇萊布斯復仇鬥拳
Array(1482216, 90, 1, 3), // 埃蘇萊布斯拳甲
Array(1492231, 500, 1, 3), // 埃蘇萊布斯槍
Array(1522138, 50, 1, 3), // 埃蘇萊布斯雙弩槍
Array(1532144, 500, 1, 3), // 埃蘇萊布斯大炮
Array(1252093, 250, 1, 3), // 埃蘇萊布斯魔法棒
Array(1542108, 350, 1, 3) // 埃蘇萊布斯太刀

);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("不想使用嗎？…我的肚子裡有各類#b奇特座椅或卷軸、裝備、新奇道具#k哦！");
            im.dispose();
        }
        status--;

    }
    if (status == 0) {
    var txt = "#d六一兒童節來啦!\r\n";
        txt += "方塊 卷軸  埃蘇 隨即裝備 等道具 [ #r還在等待嗎#d ]\r\n\r\n#k";
        txt +="#L0#我要開禮包啦!#l";
        im.sendSimple(txt);
    } else if (status == 1) {
        if (selection == 0) {
            var chance = Math.floor(Math.random() * 500);
            var finalitem = Array();
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
                if(im.getSpace(2)>=4&&im.getSpace(5)>=3&&im.getSpace(4)>=1&&im.getSpace(1)>=1){
                var item;
                var random = new java.util.Random();
                var finalchance = random.nextInt(finalitem.length);
                var itemId = finalitem[finalchance][0];
                var quantity = finalitem[finalchance][2];
                var notice = finalitem[finalchance][3];
                item = im.gainGachaponItem(itemId, quantity, "[6.1直充138元寶箱]", notice);
                if (item != -1) {
                        im.sendOk("你獲得了 #b#z" + item + "##k " + quantity + "個。");
                        im.gainItem(2049124,50);//正向
                        im.gainItem(2340000,50);//祝福
                        im.gainItem(2430068,4);//永遠的火花
                        im.gainItem(4001839,10000);//星星
                        im.gainItem(5064000,50);//防爆
                        im.gainItem(5062009,200);//超級神奇方塊
                        im.gainItem(5062500,200);//大師方塊
                        im.gainItem(5062024,100);//閃炫
                        im.gainItem(2432012,-1);
                    im.safeDispose();
                } else {
                    im.sendOk("請你確認在背包的裝備，消耗，其他窗口中是否有一格以上的空間。");
                    im.safeDispose();
                }    
            } else {
                    im.sendOk("請你確認在背包的裝備(1格)，消耗(4格)，其他(1格)，特殊(1格)窗口中是否有一格以上的空間。");
                    im.safeDispose();
            }
        }
    }
}
}