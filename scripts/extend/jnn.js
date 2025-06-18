var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
var status = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {   
    if (mode == -1) {
        cm.dispose();
    }else {
        if (status >= 0 && mode == 0) {
           cm.dispose();
           return;                    
        }
        if (mode == 1) {
           status++;
        }else {
           status--;
        }
        if (status == 0) {
            weekday-=1;
            var text = "你好，#r#h ##k，每#r週二、週四、週六#k晚上的#b08:10至08:15#k舉行擠牛奶活動，每擠一次即可獲得#r2點#k樂豆點~還有幾率獲得#b封印解除卷、方塊、防爆、祝福卷軸、極品勳章#k哦！";
            if(hour == 20 && (minute >= 10 && minute <= 15) && (weekday == 6 || weekday == 4 || weekday == 2)){// || cm.getPlayer().getName() == "管理員哈士奇"){
                var random = Math.floor(Math.random()*4000);
                if (random == 1258)
                {
                    cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 額外獲得【封印解除卷】一張。", 5120012);
                    cm.worldSpouseMessage(0x23, "[奶牛媽媽] : 恭喜 【" + cm.getChar().getName() + "】 在擠牛奶的時候額外獲得【封印解除卷】一張.");
                    cm.gainItem(2610001, 1);
                } else if (random >= 1000 && random <= 1050) {
                    var itemList = Array(5062000,5062002,5062500,5064000,2430481,2340000,2431893,2430112,2340000,2049100,1142500,1142501,1142502,1142503,1142504,4310030,4310036,1142505);
                    var itemIdx = Math.floor(Math.random()*itemList.length);
                    cm.worldSpouseMessage(0x15, "[奶牛媽媽] : 恭喜 【" + cm.getChar().getName() + "】 在擠牛奶的時候額外獲得【"+cm.getItemName(itemList[itemIdx])+"】一個.");
                    cm.gainItem(itemList[itemIdx], 1);
                }
                cm.gainNX(10);
                cm.dispose();
            } else {
                cm.sendOk(text);
                cm.dispose();
            }
        }
    }
}
