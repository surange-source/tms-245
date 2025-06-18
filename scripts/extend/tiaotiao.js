var status = 0;
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化會員
var z = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化
var tt ="#fEffect/ItemEff/1112811/0/0#";//音符
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("     #e#v4033248##z4033248#：#e#r" + cm.getItemQuantity(4033248) + "#k個        #e積分：#r"+cm.getPlayerPoints()+"\r\n#L0##b#e查看階段線上人數#n#l\r\n\r\n#L1##b射手跳跳#k#n#d#e [#r5#k#d個#z4033248#,#r5#k#d積分]#k#n            在線:#e#r"+ cm.getPlayerCount(100000202) +"#n#k人#l\r\n#L2##b玩具城跳跳#k#n#d#e [#r6#k#d個#z4033248#,#r5#k#d積分]#k#n          在線:#e#r"+ cm.getPlayerCount(220000006) +"#n#k人#l\r\n#L3##b火山心藏Ⅰ#k#n#d#e [#r15#k#d個#z4033248#,#r30#k#d積分]#k#n        在線:#e#r"+ cm.getPlayerCount(280020000) +"#n#k人#l\r\n#L4##b高地第1階段#k#n#d#e [#r25#k#d個#z4033248#,#r30#k#d積分]#k#n       在線:#e#r"+ cm.getPlayerCount(109040001) +"#n#k人#l#L5##b忍苦樹林#k#n#d#e [#r30#k#d個#z4033248#,#r30#k#d積分]#k#n          在線:#e#r" + cm.getPlayerCount(910130000) +"#n#k人#l#L8##b地鐵B1#k#n#d#e [#r15#k#d個#z4033248#,#r10#k#d積分]#k#n            在線:#e#r"+ cm.getPlayerCount(910360000) +"#n#k人#l#L9##b地鐵B2#k#n#d#e [#r20#k#d個#z4033248#,#r20#k#d積分]#k#n            在線:#e#r"+ cm.getPlayerCount(910360100) +"#n#k人#l#L10##b地鐵B3#k#n#d#e [#r25#k#d個#z4033248#,#r30#k#d積分]#k#n            在線:#e#r"+ cm.getPlayerCount(910360200) +"#n#k人#l");
        } else if (status == 1) {
            if (selection == 0) {
                        cm.dispose();
                cm.sendOk("#d#e火山心藏Ⅰ#n#k 在線:#e#r"+ cm.getPlayerCount(280020000) +"#n#k人\r\n#d#e火山心藏Ⅱ#n#k 在線:#e#r"+ cm.getPlayerCount(280020001) +"#n#k人\r\n\r\n#d#e向高地第1階段#n#k 在線:#e#r"+ cm.getPlayerCount(109040001) +"#n#k人\r\n#d#e向高地第2階段#n#k 在線:#e#r"+ cm.getPlayerCount(109040002) +"#n#k人\r\n#d#e向高地第3階段#n#k 在線:#e#r"+ cm.getPlayerCount(109040003) +"#n#k人\r\n#d#e向高地第4階段#n#k 在線:#e#r"+ cm.getPlayerCount(109040004) +"#n#k人\r\n\r\n#d#e忍苦樹林第1階段#n#k 在線:#e#r"+ cm.getPlayerCount(910130000) +"#n#k人\r\n#d#e忍苦樹林第2階段#n#k 在線:#e#r"+ cm.getPlayerCount(910130001) +"#n#k人\r\n#d#e忍苦樹林第3階段#n#k 在線:#e#r"+ cm.getPlayerCount(910130100) +"#n#k人\r\n#d#e忍苦樹林第4階段#n#k 在線:#e#r"+ cm.getPlayerCount(910130101) +"#n#k人\r\n#d#e忍苦樹林第5階段#n#k 在線:#e#r"+ cm.getPlayerCount(910130102) +"#n#k人\r\n");
            }
            if (selection == 1) {
                        cm.dispose();
                cm.warp(100000202,0);
            }
            if (selection == 2) {
                        cm.dispose();
                 cm.warp(220000006,0);
            }
            if (selection == 3) {
                        cm.dispose();
                 cm.warp(280020000,0);
            }
            if (selection == 4) {
                        cm.dispose();
                 cm.warp(109040001,0);
            }
            if (selection == 5) {
                        cm.dispose();
                 cm.warp(910130000,0);
            }
            if (selection == 6) {
                        cm.dispose();
                cm.warp(109030001,0);
            }
            if (selection == 7) {
                        cm.dispose();
                cm.warp(109040001);
            }
            if (selection == 8) {
                        cm.dispose();
                cm.warp(910360000,0);
            }
            if (selection == 9) {
                        cm.dispose();
                cm.warp(910360100,0);
            }
            if (selection == 10) {
                        cm.dispose();
                cm.warp(910360200,0);
            }
            if (selection == 16) {
                        cm.dispose();
                cm.openNpc(9000038,3);
            }
            if (selection == 17) {
                        cm.dispose();
                cm.openNpc(9000038,4);
            }
            if (selection == 18) {
                        cm.dispose();
                cm.openNpc(9100000,14);
            }
            if (selection == 19) {
                        cm.dispose();
                cm.openNpc(9310471);
            }
            if (selection == 20) {
                        cm.dispose();
                cm.openNpc(9900001,3014);
            }
            if (selection == 21) {
                        cm.dispose();
                cm.openNpc(9900001,90);
            }
            if (selection == 22) {
                        cm.dispose();
                cm.openNpc(9120106,3);
            }
            if (selection == 25) {
                        cm.dispose();
                cm.openNpc(9000154,25);
            }
            if (selection == 23) {
                        cm.dispose();
                cm.openNpc(9000154,26);
            }
            if (selection == 53) {
            //if(minute >= 1 && minute <= 59){
                    cm.dispose();
            cm.openNpc(9000154,3);
            //}else{
                        //cm.dispose();
            //cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n#b 註：每小時30分開啟，時限5分鐘。");
            //}
            }
            if (selection == 54) {
            if(minute >= 40 && minute <= 45){
                    cm.dispose();
            cm.openNpc(9000154,4);
            }else{
                        cm.dispose();
            cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n#b 註：每小時40分開啟。時限5分鐘。");
            //cm.sendOk("該活動已經結束！");
            }
            }
            if (selection == 55) {
            if(hour == 10 && minute <= 2 ){
                    cm.dispose();
            cm.openNpc(9900006,5);
            }else{
                        cm.dispose();
            cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n #b註：大轉盤活動每早上晚上10點開啟。時限2分鐘。");
            }
            }
            if (selection == 56) {
            if(minute >= 1 && minute <= 59){
                    cm.dispose();
            cm.openNpc(9000154,6);
            }else{
                        cm.dispose();
            cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n#b 註：每小時40分開啟。時限5分鐘。");
            //cm.sendOk("該活動已經結束！");
            }
            }
        }
    }
}