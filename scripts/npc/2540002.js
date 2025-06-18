var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var twd = 0;
var weaponId = null;
var weaponList = Array(
1003797,
1003798,
1003799,
1003800,
1003801,
1042254,
1042255,
1042256,
1042257,
1042258,
1062165,
1062166,
1062167,
1062168,
1062169
);
var needItemList = Array(
    Array(2210006, 200),
    Array(4000313, 500),
    Array(4000021, 500),
    Array(4003005, 500),
        Array(4310143, 2000),
        Array(4001126, 30000)

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
            var selStr = "#d我這裡可以製作各類畢業裝：#n#k\r\n";    
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
                text+= itemName;
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
                cm.sendOk("恭喜您合成#z"+weaponList[weaponId]+"#一枚.");
                cm.worldSpouseMessage(0x20, "[任務公告] : 恭喜 " + cm.getChar().getName() + " 製作了一枚 <"+cm.getItemName(weaponList[weaponId])+">.");
                cm.dispose();
            } else {
                cm.sendOk("材料不足，無法完成製作！");
                cm.dispose();
            }
        }
    }
}