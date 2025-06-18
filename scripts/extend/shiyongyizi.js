var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var itemlist = Array(
Array(3010832,500), // 太陽椅子 
Array(3010788,450), // 巨無霸年夜飯 
Array(3010658,450), // 夏日西瓜冰椅子 
Array(3010621,450), // 蛤蛤仙人椅 

Array(3010842,260), // 貓貓郊遊房車 
Array(3010843,260), // 兔兔郊遊房車 
Array(3010876,260), // 楓之谷行星椅子
Array(3010936,260), // 青蛙跳樓機
Array(3012025,260), // 小雞彈簧床椅子 
Array(3010696,230), // 大黃鴨 
Array(3010718,200), // 初戀雲朵朵沙發 
Array(3010519,200), // 巨大白雪人椅子 // 
Array(3010520,200), // 巨大企鵝王椅子 
Array(3010070,200),
Array(3012011,100), // 我愛巧克力火鍋 
Array(3012019,100), // 愛琴海椅子 
Array(3012010,100), // 巧克力蛋糕戀人
Array(3012001,100), // 篝火 
Array(3012025,100), // 小雞彈簧床椅子 
Array(3010736,100), // 萌萌育嬰搖籃 
Array(3012024,100), // 沙灘排球椅子 
Array(3012020,100), // 紫籐花吊籃椅 
Array(3010528,50), // 跑步機椅子 
Array(3010877,20), // 人魚珊瑚礁 
Array(3010813,20), // 愛情水晶球的回憶 
Array(3010660,20), // 夢幻公主城堡椅子 
Array(3010661,20), // 歡樂相框椅子 // 
Array(3010715,20), // 幸福9週年蛋糕氣球椅 
Array(3010716,20), // 
Array(3010717,20),// Marry me // 
Array(3010527,20) // 深海章魚 // MP1000
);

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "#h0#,您可以在這裡兌換#e#b稀有椅子#r(試用模式)#n#k,所購買物品#r試用時間為5分鐘#k，請選擇你想要購買的物品\r\n";  //#b#L0#點我進入到永久模式#l\r\n\r\n#b
            for (var i=1; i<=itemlist.length; i++) {
                text += "#L" + (i) + "##i" + itemlist[i-1] + ":##t" + itemlist[i-1] + "# - #r"+(itemlist[i-1][1]*10)+"#b楓點  \r\n";
                if (i != 0 && (i+1) % 5 == 0) {
                    text += "\r\n";
                }
            }
            cm.sendSimple(text);
        
            
        } else if (a == 1) {
            if (selection == 0) {
                cm.dispose();
                cm.openNpc(9000069, 2);

                return;
            }  else {
            selects = (selection-1);
           // cm.sendGetNumber("請輸入你請你輸入想要購買的數量#v"+itemlist[selects]+"#\r\n\r\n#r1個需要" + (itemlist[selects][1]*10) + "個#b楓點#k", 0, 0, 999999);
            }
            buynum = 1;
            cm.sendYesNo("你想購買" + buynum + "個#r#i" + itemlist[selects][0] + "##k？\r\n你將使用掉" + (buynum * itemlist[selects][1]*10) + "楓點。");
        } else if (a == 2) {
            if (cm.getPlayer().getCSPoints(2) >= buynum * itemlist[selects][1] * 10) {
                cm.gainNX(2, -buynum * itemlist[selects][1]*10);
                cm.gainItemPeriod(itemlist[selects][0], buynum, 5*60*1000);
                cm.sendOk("購買成功了！#r試穿時間為5分鐘#k");
                cm.dispose();
            } else {
                cm.sendOk("對不起，你沒有足夠的楓點。");
                cm.dispose();
            }
        }
    }//mode
}//f