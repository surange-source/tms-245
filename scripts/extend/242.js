var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var twd = 0;
var weaponId = null;
var weaponList = Array(
//劍士
1542015, // 劍豪
1552015, // 陰陽師
1432086, // 獅心長槍, // (無描述)
1442116, // 獅心矛
1302152, // 獅心彎刀, // (無描述)
1232014, // 獅心痛苦命運, // (無描述)
1322096, // 獅心震雷釘, // (無描述)
1402095, // 獅心戰鬥彎刀, // (無描述)

//精靈
1522018, // 龍翼巨弩槍, // (無描述)
//影武
1342036, // 精靈角暗影刀, // (無描述)
//法師
1372084, // 龍尾精靈短杖, // (無描述)
1382104, // 龍尾戰鬥長杖, // (無描述)
1212014, // 龍尾黑甲凶靈, // (無描述)
//弓箭
1452111, // 鷹翼組合弓, // (無描述)
1462099, // 鷹翼重弩, // (無描述)

//傑諾
1242042, // 渡鴉之魂女王意志之劍, // (無描述)
1332130, // 渡鴉之魂短劍, // (無描述)
1362019, // 渡鴉之魂真紅手杖, // (無描述)
1472122, // 干貼全套
//槍神
1482084, // 鯊齒巨鷹爪, // (無描述)
1492085, // 鯊齒銳利手銃, // (無描述)
1532018, // 鯊齒火焰炮, // (無描述)
1222014, // 鯊齒靈魂汲取者, // (無描述)
1242014 // 鯊齒女王意志之劍, // (無描述)
);
var needItemList = Array(
    Array(4310036, 3000),
    Array(4000021, 150),
    Array(4021016, 500),
    Array(4021015, 500),
    Array(4004000, 75),
    Array(4004001, 75),
    Array(4004002, 75),
    Array(4004003, 75)
);
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = "#d我這裡可以製作140級武器，請選擇想要製作的裝備：#n#k\r\n";    
            for(var key in weaponList) {
                var item = weaponList[key];
                selStr += "#r#L"+key+"#製作 #b#z"+item+"# #r[查看詳情]\r\n";
            }
            cm.sendSimple(selStr);    
        } else if (status == 1) {
            weaponId = selection;
            var text = "- #e#d#z"+weaponList[weaponId]+"#需要的材料：#n#k\r\n\r\n#b";
            for(var key in needItemList) {
                var itemName = cm.getItemName(needItemList[key][0]);
                text+=itemName;
                for(var i=0; i<=25-itemName.getBytes().length; i++)
                {
                    text+=" ";
                }
                var currentItemQuantity = cm.getItemQuantity(needItemList[key][0]);
                var color="#g";
                if (currentItemQuantity<needItemList[key][1])
                    color="#r";
                text+=color+currentItemQuantity+" / "+needItemList[key][1]+" 個#b\r\n";
            }
            text+="#k\r\n\r\n- #e#d管理提示：#n#b點是進行製作。點否返回上一頁.#k";
            cm.sendYesNo(text);
        } else if (status == 2) {
            flag=true;
            for(var key in needItemList) {
                var itemId = needItemList[key][0];
                var itemQuantity = needItemList[key][1];
                if (!cm.haveItem(itemId, itemQuantity))
                {
                    flag=false;
                    break;
                }
            }
            if (flag) {
                if (cm.getSpace(1)<1) {
                    cm.sendOk("裝備欄空間不足，請整理後重新製作！");
                    cm.dispose();
                    return;
                }
                for(var key in needItemList) {
                    var itemId = needItemList[key][0];
                    var itemQuantity = needItemList[key][1];
                    cm.gainItem(itemId, -itemQuantity);
                }
                cm.gainItem(weaponList[weaponId], 1);
                cm.sendOk("恭喜您合成#z"+weaponList[weaponId]+"#一把.");
                cm.worldSpouseMessage(0x20, "[任務公告] : 恭喜 " + cm.getChar().getName() + " 製作了一件 <"+cm.getItemName(weaponList[weaponId])+">.");
                cm.dispose();
            } else {
                cm.sendOk("材料不足，無法完成製作！");
                cm.dispose();
            }
        }
    }
}