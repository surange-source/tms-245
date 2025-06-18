var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var IconA = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//
var IconB = "#fUI/GuildMark/BackGround/00001003/5#";//信封圖標[紅]
var IconD = "#fUI/GuildMark/BackGround/00001003/12#";//信封圖標[藍]
var IconC = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#"; 

var status = 0;
var typed=0;
var twd = 0;
var weaponId = null;
var weaponList = Array(
    2431510,
    3015182,
    3015224,
    3015144,
    3010756,
    3015178,
    3010757,
    3015131
);

//-----------需材料------------//
var needItemList = Array(
    Array(4000133, 1666),
    Array(4000188, 1666),
    Array(4000187, 1666),
    Array(4021015, 666),
    Array(4310088, 1500),
    Array(4001137, 30),
    Array(4310030, 588)
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
            var selStr = ""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +""+ IconB +"\r\n\t\t\t\t\t　" + IconC + "\r\n\r\n#r\t　管理員提示：#b請選擇製作#r椅子#b的類型 - 模型\r\n";    
            for(var key in weaponList) {
                var item = weaponList[key];
                selStr += "#d#L"+key+"#" + IconD + " [ 查 - 該類型信息 ]#r#z"+item+"#\r\n";
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
            text+="#k\r\n\r\n- #e#d管理提示：#n#b點是進行製作。點否返回上一頁.#k- \r\n\r\n";
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
                cm.sendOk("恭喜您合成#z"+weaponList[weaponId]+"#一個.");
                cm.worldSpouseMessage(0x20, "[任務公告] : 恭喜 " + cm.getChar().getName() + " 製作了 <"+cm.getItemName(weaponList[weaponId])+">.");
                cm.dispose();
            } else {
                cm.sendOk("材料不足，無法完成製作！");
                cm.dispose();
            }
        }
    }
}