/*      
 *  
 *  功能：自由轉職
 *  
 */
var status = -1;
function start() {
    if (cm.getCustomData(25957) == new java.text.SimpleDateFormat("yyyyMMdd").format(new java.util.Date())) {
        cm.sendOk("今天已經自由轉職過了.自由轉職1天只能1次. 凌晨12點後請再試一次.");
        cm.dispose();
    } else if (cm.getPlayer().getLevel() < 105) {
        cm.sendOk("自由轉職需要等級達到105。");
        cm.dispose();
    } else {
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        cm.sendNext("那麼為了新的職業,在轉職前說明一些注意事項.");
    } else if (status == i++) {
        cm.sendNextPrev("使用自由轉職的話,現在已分配的所有技能SP都將初始化.使用技能書提升的各技能等級也都將初使化.注意目前得到的加持也都會初始化.");
    } else if (status == i++) {
        cm.sendNextPrev("轉職需要自由轉職金幣.沒有金幣的話也可支付楓幣,如果有金幣的話會優先收取金幣.");
    } else if (status == i++) {
        cm.sendNextPrev("轉職消耗的楓幣會依照您的等級和自由轉職次數而增加.轉換成悠閒一點的職業也可以減少一點壓力.");
    } else if (status == i++) {
        cm.sendNextPrev("最後,自由轉職一天只能1次.每天凌晨12點會初始化,想轉換成其它職業請等隔天.");
    } else if (status == i++) {
        cm.sendNextPrev("最後，在武陵道場內，如果進入可以獲得獎勵的排名，但沒有領取就進行自由轉職的話，就無法再獲得獎勵。請留意。");
    } else if (status == i++) {
        cm.sendNextPrev("說明有點長,那看看你可以轉職的職業有哪些吧.");
    } else if (status == i++) {
        cm.openUI(164);
        cm.dispose();
    } else {
        cm.dispose();
    }
}

