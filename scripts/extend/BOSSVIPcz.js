var status = 0;
var eff ="#fUI/UIWindow/Quest/icon6/7#";
var ef = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var List = Array(
                Array("簡單殘暴炎魔",0,0,2,0,5000),//事件名次、所需樂豆點、所需楓幣、能重置的次數、餘額、楓點
                Array("普通殘暴炎魔",5000,0,1,0,1000),
                Array("進階殘暴炎魔",15000,0,2,0,0),
                Array("闇黑龍王",9000,0,2,0,0),
                Array("進階闇黑龍王",11000,0,1,0,0),
                Array("梅格耐斯[簡單]",17777,0,1,0,0),
                Array("梅格耐斯[普通]",30000,0,1,0,0),
                Array("梅格耐斯[困難]",30000,0,1,5,0),
                Array("魔王巴洛古[簡單]",0,0,2,0,5000),
                Array("魔王巴洛古[困難]",0,0,1,0,10000),
                Array("希拉",18000,0,1,0,1000),
                Array("希拉[困難]",20000,0,1,0,2000),
                Array("獅子王:凡雷恩[簡單]",0,0,1,0,7000),
                Array("獅子王:凡雷恩[普通]",19000,0,1,0,0),
                Array("鑽機",5000,0,1,0,0),
                Array("強化鑽機",11000,0,2,0,0),
                Array("皮埃爾",15000,0,1,0,0),
                Array("進階皮埃爾",0,0,1,10,0),
                Array("腥血女王",15000,0,1,0,0),
                Array("進階腥血女王",0,0,1,10,0),
                Array("貝倫",15000,0,1,0,0),
                Array("進階貝倫",0,0,1,10,0),
                Array("半半",15000,0,1,0,0),
                Array("進階半半",0,0,1,10,0),
                Array("皮卡啾",10000,0,2,0,0),
                Array("混沌皮卡啾",10000,0,1,0,0),
                Array("拉圖斯",0,0,2,0,3000),
                Array("妖精女王",9000,0,2,0,2000),
                Array("黃金寺院",9000,0,1,0,1000),
                Array("阿卡伊農[普通]",10000,0,1,0,0),
                Array("女皇：西格諾斯",19000,0,1,0,5000),
                Array("森蘭丸",18000,0,2,0,0),
                Array("桃樂絲",30000,0,2,0,0),
                Array("貝勒·德",28000,0,1,0,0),
                Array("史烏",0,0,3,20,0)
);
var round = Array();
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
        var txt = ef+"親愛的#r#h ##k您好，請選擇要重置的BOSS副本\r\n\r\n";
        for (var i = 0;i<List.length ;i++ ){
            var a = " [#r"+List[i][1]+"#k]#b樂豆點#k/";
            var b = " [#r"+(List[i][2]/10000)+"W#k]楓幣/";
            var d = " [#r"+List[i][5]+"#k]楓點/";
            var c = " [#r"+List[i][4]+"#k]#g餘額#k ";
            if (List[i][1]==0){
                a = "";
            }
            if(List[i][2]==0){
                b = "";
            }
            if(List[i][4]==0){
                c = "";
            }
            if(List[i][5]==0){
                d = "";
            }
            round[i] = (List[i][3] - cm.getPQLog(List[i][0]+""+cm.getName()));
            if (round[i] == 0){
                continue;
            }else{
            txt += "#L"+i+"##d"+List[i][0]+"#k"+a+""+b+""+d+""+c+"  剩餘次數[#r"+round[i]+"#k]次\r\n";
            }
        }
         cm.sendSimple(txt);
    } else if (status == 1) {
        if (List[selection][0]=="貝勒·德"){
            cm.resetPQLog("培羅德入場卷");
        }
        if(cm.getPlayer().getCSPoints(1)<List[selection][1]){
            cm.sendOk("對不起，你的樂豆點不夠");
            cm.dispose();
        }else if(cm.getMeso()<List[selection][2]){
            cm.sendOk("對不起，你的楓幣不夠");
            cm.dispose();
        }else if(round[selection]<=0){
            cm.sendOk("對不起，你今天的重置次數用完了");
            cm.dispose();
        }else if(cm.getHyPay(1)<List[selection][4]){
            cm.sendOk("對不起，你的餘額不夠，請儲值");
            cm.dispose();
        }else{
            cm.gainNX(1,-List[selection][1]);
            cm.gainNX(2,-List[selection][5]);
            cm.gainMeso(-List[selection][2]);
            cm.addHyPay(List[selection][4]);
            cm.resetPQLog(List[selection][0]);
            cm.setPQLog(List[selection][0]+""+cm.getName());
            cm.sendOk("溫馨提示：#b\r\n副本重置成功，勇士行動起來吧！");
            cm.worldSpouseMessage(0x20, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 成功在拍賣處重置 "+List[selection][0]+" BOSS次數.");
            cm.dispose();
        }
    }
}