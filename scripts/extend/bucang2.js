var status = 0;
var bossid = "補償禮包";
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE); //獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE); //獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
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
        var text = "";
                        if(minute >= 0 && minute <= 59){
            text += "#b兔花花補償禮包，做為老玩家我們將給予補償作為獎勵。#n\r\n#e#d要求：只要等級達到#r200#d級!\r\n";
            text+="#r#L1#領取補償禮包#l\r\n";
            //text+="#b#L2#領取360分鐘獎勵【15000樂豆點和15000楓點】#l";
            cm.sendSimple(text);
        } else {
            cm.sendOk("#b兔花花補償禮包，做為老玩家我們將給予補償作為獎勵。#n\r\n#r只要等級到達需要200級!\r\n領取#b#e10個#d超級神奇方塊#b，#b10個#d大師附加神奇方塊#n，#r300000#n#b樂豆點，#v2431725#5個。");
            cm.dispose();
        }
    } else if (status == 1) {
        typed = selection;
        cm.sendYesNo("是否現在就領取補償禮包，每個賬號只能領取一次，並且角色等級需要大於等於200級。");
    } else if (status == 2) {
        
        var needtime = 200;
        
        //if (cm.getOnlineTime()>=0) {
                if (cm.getChar().getLevel()>=[needtime]) {
            if (cm.getPQLog("補償禮包20", 1) == 0) {
                //cm.setPQLog(bossid+typed, -2);
                cm.gainItem(5062009, 10);
                cm.gainItem(5062500, 10);
                cm.gainItem(2431725, 5);//熱力四射禮物盒
                cm.gainNX(300000);
                //cm.gainNX(2, 300000);
                                cm.setPQLog("補償禮包20", 1);
                cm.sendOk("#b領取成功！您獲得了10個#d超級神奇方塊#b，#b10個#d大師附加神奇方塊#n，#r300000#n樂豆點，#v2431725#5個。");
cm.worldSpouseMessage(0x15,"[補償公告] 玩家"+ cm.getChar().getName() +" 領取10個超級神奇方塊，10個大師附加神奇方塊，300000樂豆點，熱力四射禮物盒5個。");                cm.dispose();
            } else {
                cm.sendOk("領取失敗，您已經領取過了");
                cm.dispose();
            }
        } else {
                        cm.sendOk("您的等級沒達到160級,無法領取補償！");
            //cm.sendOk("您的在線時間不足"+cm.getOnlineTime()+"分鐘！");
            cm.dispose();
        }
    }
}