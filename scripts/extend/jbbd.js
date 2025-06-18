
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化會員
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
            cm.dispose();
        } 
    else if (status == 0) {
        var selStr = "\r\n#e#d#L33#回憶楓之谷歡迎您。如果您對本服不瞭解請點這裡#n#l#k\r\n";
        selStr +="\r\n#d======================================================#k\r\n";
        selStr +="    因玩家反應傑諾導彈在遇到反傷的BOSS時經常給自己帶來困擾，特推出刪除傑諾導彈技能的功能，當然您也可以在這裡進行免費的恢復。\r\n"
        //selStr +="\r\n大部分的操作都在拍賣裡進行，我已經累飛了。使用#r@pm#k命令可以快速呼叫拍賣NPC\r\n";
        //selStr +="#L15##r"+ttt6+"在線獎勵#l#L17#"+ttt6+"儲值獎勵#l#k#b#L3#"+ttt6+"組隊任務#l#L5#"+ttt6+"元寶兌換#l\r\n\r\n";
        //selStr +="#b#L11#"+ttt6+"挑戰首領#l#L12##r"+ttt6+"重置副本#l#L4##b"+ttt6+"美容美發#l#L14#"+ttt6+"解鎖密碼#l\r\n\r\n";
        //selStr +="#b#L9#"+ttt6+"娛樂副本#l#L19#"+ttt6+"裝備製作#l#b#L16#"+ttt6+"活動獎勵#l#b#L20#"+ttt6+"點裝覺醒#l\r\n\r\n";
        //selStr +="#b#L21#"+ttt6+"隨身會員#l#r#L18#"+ttt6+"飛昇洗髓#l#k#r#L22#"+ttt6+"爆率物品出處查詢#l\r\n\r\n";
        selStr +="#b#L23#"+ttt6+"刪除宙斯盾系統#l#L24#"+ttt6+"恢復宙斯盾系統#l\r\n\r\n";
        //selStr +="#b#L1#"+ttt6+"每日尋寶#l#L2#"+ttt6+"現金購物#l#L3#"+ttt6+"組隊任務#l#L5#"+ttt6+"樂豆點中介#l\r\n\r\n";
        //selStr +="#L4#"+ttt6+"美容美發#l#L10##r"+ttt6+"遊戲寶貝#l#L9##r"+ttt6+"魔法物品#l#L11##b"+ttt6+"挑戰首領#l\r\n\r\n";
        //selStr +="#b#L13#"+ttt6+"樂豆點任務#l#L12#"+ttt6+"重置副本#l#L14#"+ttt6+"解鎖密碼#l#k#L15##r"+ttt6+"在線獎勵#l#k\r\n\r\n";
        //selStr +="#b#L16#"+ttt6+"楓幣商城#l#r#L17#"+ttt6+"儲值獎勵#l#b#L18#"+ttt6+"怪物幣店#l#r#L19#"+ttt6+"RED幣商店#l\r\n";
        selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(9310144, 1);
            break;
        case 1:
            cm.dispose();
            cm.openNpc(9310144, 9);
            break;
        case 8:
            cm.dispose();
            cm.openNpc(9310144, 3);
            break;
        case 4:
            cm.dispose();
            cm.openNpc(9900003, 9);
            break;
        case 2:
            cm.dispose();
            cm.openNpc(9900003, 15);
            break;
        case 5:
            cm.dispose();
            cm.openNpc(9310144, 101);
            break;
        case 3:
            cm.dispose();
            cm.openNpc(9310144, 6);
            break; 
        case 6:
            cm.dispose();
            cm.openNpc(9020000);
            break; 
        case 7:
            cm.dispose();
            cm.openNpc(2040034);
            break;
        case 10:
            cm.dispose();
            cm.openNpc(9900003, 10);
            break;
        case 9:
            cm.dispose();
            cm.openNpc(9900003, 108);
            break;
        case 11:
            cm.dispose();
            cm.openNpc(9900003, 13);
            break;
        case 12:
            cm.dispose();
            cm.openNpc(9900004, 3);
            break;
        case 13:
            cm.dispose();
            cm.openNpc(9900003, 110);
            break;
        case 14:
            cm.dispose();
            cm.openNpc(9900003, 111);
            break;
        case 15:
            cm.dispose();
            cm.openNpc(9900003, 608);
            break;
        case 16:
        //cm.sendOk("近期開放");
            cm.dispose();
        cm.openNpc(9310144, 1);
            //cm.openShop(500);
            break;
        case 17:
            cm.dispose();
            cm.openNpc(9310144, 8);
            break;
        case 18:
        //cm.sendOk("近期開放");
            cm.dispose();
            cm.openNpc(9000174, 1);
            break;
        case 19:
            cm.dispose();
            cm.openNpc(9900003, 24);
            break;
        case 20:
            cm.dispose();
            cm.openNpc(9000069);
            break;
        case 21:
            cm.dispose();
            cm.openNpc(9310144, 17);
            break;
        case 22:
            cm.dispose();
            cm.openNpc(9310144, 100);
            break;
        case 23:
        if (cm.getJob() >= 3600 && cm.getJob() <= 3612){        
            cm.teachSkill(36110004, 0, 0);
            cm.sendOk("恭喜您，操作成功");
            cm.dispose();
        } else {
            cm.sendOk("你又不是傑諾，找蓋？");
            cm.dispose();
        }
            break;
            case 24:
        if (cm.getJob() >= 3600 && cm.getJob() <= 3612){        
            cm.teachSkill(36110004, 10, 10);
            cm.sendOk("恭喜您，操作成功");
            cm.dispose();
        } else {
            cm.sendOk("你又不是傑諾，找蓋？");
            cm.dispose();
        }
            break;
        case 33:
            cm.dispose();
            cm.openNpc(9330006);
            break;       













}
    }
}
