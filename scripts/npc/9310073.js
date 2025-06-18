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
        var selStr = "              #v1142321##e#r軍銜勳章系統#v1142321##l\r\n#v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488##v4000488#              #r#L4#我要升級我的軍銜#l\r\n               #r#L6#基礎軍銜領取#l\r\n \r\n\r\n #v1142318##v1142318##v1142319##v1142319##v1142320##v1142320##v1142320##v1142321##v1142321#";

        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1500032,"junxianjs"); //雙倍道具
            break;
        case 4:
            cm.dispose();
            cm.openNpc(1500032,"shengjijx"); //暴君
            break;
        //case 5:
            //cm.dispose();
            //cm.openNpc(1500032,"junxianfl"); //各種椅子
            //break;
        case 6:
            //var ii = cm.getItemInfo();
            var equip = cm. getNewEquip(1142312); // 生成一個Equip類      
            //toequip.setEnhance(10)              
            equip.setStr(5); //裝備力量
            equip.setDex(5); //裝備敏捷
            equip.setInt(5); //裝備智力
            equip.setLuk(5); //裝備運氣
            equip.setMatk(1); //物理攻擊
            equip.setWatk(1); //魔法攻擊 
            //toequip.setOwner("指北針管理員");
            cm.addFromDrop(equip);
            cm.sendOk("恭喜您獲得 #r十字旅團高等兵勳章,丟失可以點我補領#k 。");
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