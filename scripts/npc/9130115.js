/* 樂豆點商店 */

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "               #v1114231##e#r瑪瑙戒指升級系統#v1114231##l\r\n#v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488#             #L0##d瑪瑙戒指介紹(推薦)#l#k\r\n             #r#L4#將我的瑪瑙戒指升階#l\r\n             #b#L5#購買瑪瑙升級石/卷軸#l\r\n             #r#L6#免費領取[1]階瑪瑙#l\r\n \r\n\r\n #v1114219##v1114220##v1114222##v1114223##v1114223##v1114208##v1114210##v1114226##v1114231#";

        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1500032,"manaojs"); //雙倍道具
            break;
        case 4:
            cm.dispose();
            cm.openNpc(1500032,"manaoshengji"); //暴君
            break;
        case 5:
            cm.dispose();
            cm.openNpc(1500032,"manaojuanzhou"); //各種椅子
            break;
        case 6:
            //var ii = cm.getItemInfo();
            var equip = cm. getNewEquip(1114219); // 生成一個Equip類      
            //toequip.setEnhance(10)              
            equip.setStr(30); //裝備力量
            equip.setDex(30); //裝備敏捷
            equip.setInt(30); //裝備智力
            equip.setLuk(30); //裝備運氣
                        equip.setHp(200);
            equip.setMatk(10); //物理攻擊
            equip.setWatk(10); //魔法攻擊 
            //toequip.setOwner("指北針管理員");
            cm.addFromDrop(equip);
            cm.sendOk("恭喜您獲得 #r初遇[1]階瑪瑙戒指#k 。");
                    cm.dispose();
                        break;
        case 0:
        case 7:
            cm.dispose();
            cm.openNpc(9310071, 2); //洗樂豆點軸
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9900002, 24); //玩具商店
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9110103); //騎寵商店
            break;
    case 10:
            cm.dispose();
            cm.openNpc(9110114); //破攻石頭
            break;
    case 11:
            cm.dispose();
            cm.openNpc(9900002, 5); //一鍵潛能
            break;
    case 12:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一鍵潛能
            break;
    case 13:
            cm.dispose();
            cm.openNpc(9270096, 13); //一鍵潛能
            break;
    case 14:
            cm.dispose();
            cm.openNpc(9900002, 1301); //一鍵潛能
            break;
    case 15:
            cm.dispose();
            cm.openNpc(9270096, 15); //一鍵潛能
            break;
        }
    }
}