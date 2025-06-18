/* NPC版權: 彩雲島
 NPC名稱:         小幫手
 MAP(地圖ID):
 NPC類型:         綜合NPC
 製作人：故事、
 */

var status = 0;
var typede = 0;
var slot = Array();
var dsa = "";
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
            var text = "";
            text = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n";
            text += "#L1##b超級藥水#r(免費)#k#l\r\n";
            text += "#L2##b僱傭商人#r(24小時)#l\r\n";
            text += "#L3##b皇家理發#r(免費)#l\r\n";
            text += "#L4##b管理員的祝福#r(BUFF)#l\r\n";
            cm.sendSimple(text);

        } else if (selection == 1) { //免費福利
            if (cm.getPlayer().getLevel() > 120) {
                cm.sendOk("等級120以下的玩家才可以領取。");
            } else if (cm.getSpace(2) < 1) {
                cm.sendOk("消耗道具欄空間不足,無法領取。");
            } else if (cm.getBossLog("免費藥水") == 0) {
                cm.gainItemPeriod(2000005, 100, 1);
                cm.setBossLog("免費藥水");
                cm.sendOk("領取成功,祝您遊戲愉快");
            } else {
                cm.sendOk("#k今天已經領取了,請明天再來。");

            }
            cm.dispose();
        } else if (selection == 2) { //僱傭商人
            if (cm.getSpace(5) < 1) {
                cm.sendOk("現金道具欄空間不足,無法領取。");
            } else if (cm.getBossLog("每日僱傭") == 0) {
                cm.gainItemPeriod(5030019, 1, 1);
                cm.setBossLog("每日僱傭");
                cm.sendOk("領取成功,祝您遊戲愉快");
            } else {
                cm.sendOk("#k今天已經領取了,請明天再來。");

            }
            cm.dispose();

        } else if (selection == 3) { //皇家理發
            if (cm.getPlayer().getLevel() < 150) {
                cm.sendOk("等級150以上的玩家才可以領取。");
            } else if (cm.getSpace(5) < 1) {
                cm.sendOk("特殊道具欄空間不足,無法領取。");
            } else if (cm.getBossLog("皇家理發") == 0) {
                cm.gainItemPeriod(5150040, 1, 1);
                cm.setBossLog("皇家理發");
                cm.sendOk("領取成功,祝您遊戲愉快");
            } else {
                cm.sendOk("#k今天已經領取了,請明天再來。");

            }
            cm.dispose();

        } else if (selection == 4) { //BUFF
            cm.sendOk("#k敬請期待。");
            cm.dispose();
        }
    }
}
