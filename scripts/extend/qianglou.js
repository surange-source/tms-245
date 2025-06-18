status = -1;
var event;

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
    event = cm.getEventManager("Gailou"); //獲取活動腳本的名稱 test 對應 event 目錄裡面的 gailou.js 文件
    if (status == 0) {
        if (event == null) {
            cm.sendOk("活動腳本錯誤...請聯繫管理員修復！或重新打開。");
            cm.dispose();
        } else if (cm.getPlayer().getClient().getChannel() != 1) {
            cm.sendOk("活動只能在1頻道進行！親！");
        cm.dispose();
        } else if (event != null && event.getProperty("state").equals("true")) {
            cm.sendYesNo("親愛的#r#h ##k您好，我是蓋樓活動員，本次活動時間為10分鐘.\r\n活動分一等獎，二等獎和三等獎.\r\n一等獎：第一個到達建樓高度的玩家獲得一等獎。\r\n二等獎：一等獎之後後續補樓的8個玩家為二等獎\r\n三等獎：為結束活動獎勵只限1人隨機獲得 1000 - 2000樂豆點\r\n那就看你運氣啦 開始吧？");
        } else {
            cm.sendOk("活動還未開啟或者活動已經結束，活動結束後獎勵會立即發放\r\n請關注我們蓋樓活動，多多參加。\r\n活動分一等獎，二等獎和三等獎.\r\n一等獎：第一個到達建樓高度的玩家獲得一等獎。\r\n二等獎：一等獎之後後續補樓的8個玩家為二等獎\r\n三等獎：為結束活動獎勵只限1人隨機獲得 1000 - 2000樂豆點");
            cm.dispose();
        }
    } else if (status == 1) {
        if (event != null && event.getProperty("state").equals("true")) {
            event.setProperty("check", "" + (parseInt(event.getProperty("check")) + 1)); //設置點擊次數+1
            var count = parseInt(event.getProperty("check")); //獲得總點擊次數
            var max = parseInt(event.getProperty("maxCheck"));
            var dj = rand(2000, 4000);
            var dj3= rand(1000, 2000);
            if (count == max) {
                cm.gainNX( + 100000);
                cm.worldMessage("[搶樓活動]： 恭喜玩家 " + cm.getName() + " 在激情搶樓活動中獲得一等獎 5000樂豆點.");
                cm.sendOk("[搶樓活動] 恭喜你獲得了5.1激情搶樓活動一等獎。\r\n獎金5000點。");
            } else if (count > max && count <= (max + 8)) {
                cm.gainNX( + dj);
                cm.worldMessage("[搶樓活動]： 恭喜玩家 " + cm.getName() + " 在激情搶樓活動中獲得二等獎 " + dj + "樂豆點.");
                cm.sendOk("恭喜你獲得了5.1激情搶樓活動二等獎。\r\n獎金 2000 - 4000 點不等。");
            } else if (count == (max + 9)) {
                cm.gainNX( + dj3);
                event.setProperty("state", "false");
                event.setProperty("endEvent", "true");
                cm.worldMessage("[搶樓活動]： 恭喜玩家 " + cm.getName() + " 在激情搶樓活動中獲得三等獎 " + dj3 + "樂豆點.本次搶樓活動已經結束...");
                cm.sendOk("恭喜你獲得了激情搶樓活動三等獎。\r\n獎金 1000 - 2000 點不等。\r\n本次搶樓活動已經結束...");
            } else {
                cm.sendOk("當前樓層: " + parseInt(event.getProperty("check")) + " 樓。");
            }
        } else {
            cm.sendOk("活動還未開啟或者活動已經結束，所有獎勵均已經發放，請下次在參加。");
        }
        cm.dispose();
    }
}

function rand(lbound, ubound) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}