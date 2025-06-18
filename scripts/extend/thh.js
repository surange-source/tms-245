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
        var selStr = "親愛的#r#h ##k您好，兔花花瘋狂的要送樂豆點啦，繼續支持我們 支持自己請點擊下面的「支持兔花花」！:\r\n\r\n#b#L0#支持兔花花#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                var dj=Math.floor(Math.random() * 99);
                if(dj==0){
                    cm.gainNX(+1000);
            cm.gainMeso(- 1000000);
        cm.worldSpouseMessage(0x20,"[瘋狂點擊]恭喜玩家！"+ cm.getChar().getName() +"  獲得5000樂豆點. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！");
                   //cm.worldMessage("恭喜玩家" + cm.getChar().getName() + "支持兔花花 獲得5000樂豆點. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！" );
            cm.sendOk("感謝你支持兔花花 我們贈送您了5000點。");
            cm.dispose();
                }else if(dj>=1 && dj<=10){
            cm.gainMeso(- 1);
                    cm.gainNX(+dj);
        cm.worldSpouseMessage(0x20,"[瘋狂點擊]恭喜玩家！"+ cm.getChar().getName() +"  獲得"+dj+"樂豆點. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！");
                    //cm.worldMessage("恭喜玩家" + cm.getChar().getName() + "支持兔花花 獲得"+dj+"樂豆點. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！" );
            cm.sendOk("感謝你支持兔花花 我們贈送您了"+dj+"點。");
            cm.dispose();
                }else if(dj>=1 && dj<=19){
        dj=dj*666;
            cm.gainMeso(- 1);
                    cm.gainMeso(dj);
        cm.worldSpouseMessage(0x20,"[瘋狂點擊]恭喜玩家！"+ cm.getChar().getName() +"  獲得"+dj+"楓幣. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！");
                    //cm.worldMessage("恭喜玩家" + cm.getChar().getName() + "支持兔花花 獲得"+dj+"楓幣. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！" );
            cm.sendOk("感謝你支持兔花花 我們贈送您了"+dj+"楓幣。");
            cm.dispose();
                }else{
            cm.gainMeso(- 8);
                    cm.gainNX(+dj);
        cm.worldSpouseMessage(0x20,"[瘋狂點擊]恭喜玩家！"+ cm.getChar().getName() +"  獲得"+dj+"樂豆點. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！");
                    //cm.worldMessage("恭喜玩家" + cm.getChar().getName() + "支持兔花花 獲得"+dj+"樂豆點. 活動請在聖誕樹-瘋狂點擊 - 兔花花參加！" );
            cm.sendOk("感謝你支持兔花花 我們贈送您了"+dj+"點。");
            cm.dispose();
                }
                break;
        }
    }
}