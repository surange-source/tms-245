
/*      
 
 NPC版權:                追憶楓之谷
 NPC類型:                 綜合NPC
 製作人：故事、
 
 */

var status = 0;
var typede = 0;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n";
            zyms += "    #L100##e#r>>>>>>追憶楓之谷新手指導員<<<<<<#k#n#l\r\n\r\n";
            zyms += "#L2##b每日簽到#l #L3#福利項目#l #L4#學習技能#l #L5##r金卷中介#k#l\r\n";
            zyms += "#L6##b等級突破#l                         #L9##b公會管理#l\r\n";
            zyms += "#L7##r終冒險家#l     #L1##g職業武器商店#k#l     #L8##b道具刪除#k#l\r\n";
            zyms += "#L10##r楓幣服務#l     #L18##g金卷現金商店#k#l     #L13##b追憶銀行#l\r\n";
            zyms += "#L11##r副本重置#l                         #L12##r會員系統#l\r\n";
            zyms += "#L14##r終極無限#l #L15##r免費道具#l #L16##b活躍系統#l #L17##b在線獎勵#l";
            cm.sendSimple(zyms);



        } else if (selection == 18) { //金卷商店
            cm.dispose();
            cm.openNpc(2140005);

        } else if (selection == 1) { //集市
            cm.dispose();
            cm.openNpc(1012121);
            //cm.sendOk("集市的商店應有盡有,慢慢逛吧~總有你喜歡的。");

        } else if (selection == 2) { //簽到
            cm.dispose();
            cm.openNpc(9010060, 1);

        } else if (selection == 3) { //免費福利
            cm.dispose();
            cm.openNpc(9010060, 2);

        } else if (selection == 4) { //技能學習
            cm.dispose();
            cm.openNpc(9010060, 3);

        } else if (selection == 5) { //金卷中介
            cm.dispose();
            cm.openNpc(9010060, 4);

        } else if (selection == 6) { //突破等級限制
            if (cm.getPlayer().getLevel() < 199) {
                cm.sendOk("突破等級限制等級200才可以進行,請200級後在來找我。");
            } else if (cm.getBossLog("等級突破", 1) > 1) {
                cm.sendOk("你已經完成了等級突破。");
            } else if (cm.getMeso() > 49999999) {
                cm.setBossLog("等級突破");
                cm.gainMeso(-50000000);
                cm.sendOk("等級突破成功,您現在最高可升至255級。");
            } else {
                cm.sendOk("突破等級限制需要收取5000W楓幣,你沒有足夠的楓幣。");
            }
            status = -1;

        } else if (selection == 7) { //終極冒險家
            cm.dispose();
            cm.openNpc(1105000, 1);



        } else if (selection == 8) { //道具刪除
            cm.dispose();
            cm.openNpc(9010060, 5);

        } else if (selection == 9) { //公會管理
            cm.dispose();
            cm.openNpc(9010060, 6);

        } else if (selection == 10) { //楓幣服務
            cm.dispose();
            cm.openNpc(9010060, 7);

        } else if (selection == 11) { //副本管理
            cm.dispose();
            cm.openNpc(9010060, 8);


        } else if (selection == 12) { //開通周卡
            cm.dispose();
            cm.openNpc(9010060, 9);

        } else if (selection == 13) { //銀行系統
            cm.dispose();
            cm.openNpc(9010060, 10);
        
        } else if (selection == 14) { //終極無限
            cm.dispose();
            cm.openNpc(9010060, 11);
        
        
        } else if (selection == 15) { //組隊點數
            cm.dispose();
            //cm.sendOk("添加中。");
            cm.openNpc(9010060, 12);
        
        } else if (selection == 16) { //活躍系統
            cm.dispose();
            cm.sendOk("緊急添加中。");
            //cm.openNpc(9010060, 13);
        
        
        } else if (selection == 17) { //在線獎勵
            cm.dispose();
            //cm.sendOk("緊急添加中。");
            cm.openNpc(9000030, 1);
        
        
        } else if (selection == 100) { //新手嚮導
            cm.dispose();
            cm.openNpc(9062004);






        }
    }
}

