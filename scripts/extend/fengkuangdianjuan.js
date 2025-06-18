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
        var selStr = "親愛的#r#h ##k您好，我是點擊使者 本次活動時間為5分鐘.\r\n你每次點擊可以獲得1-50的點數.\r\n那就看你運氣啦 開始吧:\r\n\r\n#b#L0#開始點擊#l";//\r\n\r\n#b#L0#開始點擊#l
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                var dj=Math.floor(Math.random() * 60);
                if(dj==0){
                    cm.gainNX(+100);
                    cm.worldMessage("恭喜玩家" + cm.getChar().getName() + "在瘋狂點擊中獲得100樂豆點." );
            cm.sendOk("恭喜你獲得了100點。");
            cm.dispose();
                }else if(dj>=60){
                    cm.gainNX(+dj);
                    cm.worldMessage("恭喜玩家" + cm.getChar().getName() + "在瘋狂點擊中獲得"+dj+"樂豆點." );
            cm.sendOk("恭喜你獲得了"+dj+"點。");
            cm.dispose();
                }else{
                    cm.gainNX(+dj);
            cm.sendOk("恭喜你獲得了"+dj+"點。");
            cm.dispose();
                }
                break;
        }
    }
}