/*原創作者AND3812049

    優化版中介兌換
*/
var status = -1;
var beauty = 0;
var tosend = 0;
var sl;
var PD;
var PD1 = 0;
var item2;
var z = "#fEffect/ItemEff/1112811/0/0#";//"+z+"//美化
var item = Array(Array(5000,1),//樂豆點：中介
                Array(1,5000),//中介：樂豆點
                Array(1,4),//中介：楓幣（單位為：千萬）
                Array(4,1)//楓幣（單位為：千萬）：中介
                );//這些為會員玩家比例

var item1 = Array(Array(5000,1),//樂豆點：中介
                Array(1,4000),//中介：樂豆點
                Array(1,3),//中介：楓幣（單位為：千萬）
                Array(4,1)//楓幣（單位為：千萬）：中介
                );//這些為普通玩家比例

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            cm.sendOk("#r#e　　很高興為您服務 歡迎您的下次光臨！", 1033210);
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendOk("#r#e　　很高興為您服務 歡迎您的下次光臨！", 1033210);
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            var TXT = "";
            if (cm.haveItem(2430865)) {
                PD1 = PD1+1;
                TXT += "#r#e★★★★★★★★★『會員玩家』★★★★★★★★★\r\n\r\n";
                TXT += ""+z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z +"\r\n";
                TXT += "#d尊敬的「#h #」 請選擇您需辦理的業務\r\n";
                TXT += "#d行情：樂豆點 [#r "+item[0][0]+"："+item[0][1]+" #d] 反向 [#r "+item[1][0]+"："+item[1][1]+" #d] 中介\r\n"
                TXT += "中介 [#r "+item[2][0]+":"+(item[2][1])+"KW #d] \r\n";
                TXT += "#r當前樂豆點數量：#d" + cm.getPlayer().getCSPoints(1) + "#r\r\n";
                TXT += "當前貨幣數量：#d" + cm.getItemQuantity(4000313) + "\r\n";
                TXT += "#r當前楓幣數量：#d"+(cm.getMeso()/100000000).toFixed(2)+"億\r\n";
                TXT += ""+ z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z +"\r\n\r\n";
                TXT += "#L0##i4000313#樂豆點購#z4000313# [中介通用貨幣]#l\r\n";
                TXT += "#L1##i4000313##z4000313#購樂豆點 [中介通用貨幣]#l\r\n";
                //TXT += "#L2##i4000313##z4000313#購楓幣 [中介通用貨幣]#l\r\n";
                TXT += "#L3##i4000313#楓幣購中介 [中介通用貨幣]#l\r\n";
            } else {
                TXT += "#r#e☆☆☆☆☆☆☆☆☆『普通玩家』☆☆☆☆☆☆☆☆☆\r\n\r\n";
                TXT += ""+z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z +"\r\n";
                TXT += "#d尊敬的「#h #」 請選擇您需辦理的業務\r\n";
                                TXT += "#b注意:開通會員即可享受無手續費用兌換!!!!\r\n";
                TXT += "#d行情：樂豆點 [#r "+item1[0][0]+"："+item1[0][1]+" #d] 反向 [#r "+item1[1][0]+"："+item1[1][1]+" #d] 中介\r\n"
                TXT += "中介 [#r "+item1[2][0]+":"+(item1[2][1])+"KW #d]  反向 [#r "+(item1[3][0])+"KW："+item1[3][1]+" #d] 楓幣[關閉]\r\n";
                TXT += "#r當前樂豆點數量：#d" + cm.getPlayer().getCSPoints(1) + "#r\r\n";
                TXT += "當前貨幣數量：#d" + cm.getItemQuantity(4000313) + "\r\n";
                TXT += "#r當前楓幣數量：#d"+(cm.getMeso()/100000000).toFixed(2)+"億\r\n";
                TXT += ""+ z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z + z +"\r\n\r\n";
                TXT += "#L0##i4000313#樂豆點購#z4000313# [中介通用貨幣]#l\r\n";
                TXT += "#L1##i4000313##z4000313#購樂豆點 [中介通用貨幣]#l\r\n";
                //TXT += "#L2##i4000313##z4000313#購楓幣 [中介通用貨幣]#l\r\n";
                TXT += "#L3##i4000313#楓幣購中介 [中介通用貨幣]#l\r\n";
            }
            cm.sendSimple(TXT);
        } else if (status == 1) {
            PD = selection;
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM不能參與兌換.");
                cm.dispose();
            }
            if(PD1 == 1){
                item2 = item;
            }else{
                item2 = item1;
            }
            if (selection == 0) {
                cm.sendGetNumber("#r#e★★★★★★★★★★『玩家』★★★★★★★★★★#d\r\n\r\n請入你需購買#z4000313#的數量 [ "+item2[0][0]+"："+item2[0][1]+" ]\r\n\r\n", 1, 1, cm.getPlayer().getCSPoints(1) / item2[0][0]);
            } else if (selection == 1) {
                cm.sendGetNumber("#r#e★★★★★★★★★★『玩家』★★★★★★★★★★#d\r\n\r\n請入你需購買樂豆點的數量 [ "+item2[1][0]+"："+item2[1][1]+" ]\r\n\r\n", 1, 1, cm.getItemQuantity(4000313));
            } else if (selection == 2) {
                cm.sendGetNumber("#r#e★★★★★★★★★★『玩家』★★★★★★★★★★#d\r\n\r\n#r請輸入你要#g''用多少中介幣對換楓幣''#k [ "+item2[2][0]+"："+item2[2][1]+"KW ]\r\n\r\n", 1, 1, cm.getItemQuantity(4000313));
            } else if (selection == 3) {
                cm.sendGetNumber("#r#e★★★★★★★★★★『玩家』★★★★★★★★★★#d\r\n\r\n#r請輸入你要#g''用楓幣兌換多少個中介''#k [ "+item2[3][0]+"KW："+item2[3][1]+" ]\r\n\r\n", 1, 1, 9999);
            }else{
                cm.sendOk("出錯");
            }
        } else if (status == 2) {
            if (selection <= 0) {
                cm.sendOk("#r#e您輸入的數量有誤 請整理思緒重新輸入！");
                cm.dispose();
            }
            if(PD == 0){
                if (!cm.canHold(4000313,selection)){
                        cm.sendOk("#e#r你背包「其它」空間不足!請至少有" + selection + "個空間以上.\r\n如果上面有出現小數的話請入位!\r\n如：出現<至少有7.5個空間以上>那麼您就需要留8個空間!", 1033210);
                        cm.dispose();
                } else if (cm.getPlayer().getCSPoints(1) >= selection * item2[PD][0]) {
                        cm.gainNX(-selection * item2[PD][0]);
                        cm.gainItem(4000313, (selection*item2[PD][1]));
                        cm.sendOk("#r#e[ #h # ] 恭喜您\r\n\r\n您成功用#r " + (selection * item2[PD][0]) + " 樂豆點\r\n購買了#z4000313# #i4000313# x #r" + (selection*item2[PD][1]), 1033210)
                        cm.worldSpouseMessage(0x15, "[ 金融中心 ] 恭喜 " + cm.getChar().getName() + " 用 " + (selection * item2[PD][0]) + " 樂豆點購買了 " + (selection*item2[PD][1]) + " 枚中介幣 ");
                        cm.dispose();
                }
            }else if(PD == 1){
                if (cm.haveItem(4000313, selection)) {
                    cm.gainItem(4000313, -(selection*item2[PD][0]));
                    cm.gainNX(+item2[PD][1] * selection);
                    cm.gainNX(-100);
                    cm.sendOk("#r#e[ #h # ]恭喜您\r\n\r\n您成功用#z4000313# #v4000313# x #r" + (selection*item2[PD][0]) + " #k\r\n購買了#r " + (item2[PD][1] * selection) + " #k樂豆點", 1033210);
                    cm.worldSpouseMessage(0x15, "[ 金融中心 ] 恭喜 " + cm.getChar().getName() + " 用 " + (selection*item2[PD][0]) + " 枚中介幣購買了 " + (item2[PD][1] * selection) + " 樂豆點 [ -100 手續費用 ]");
                    cm.dispose();
                } else {
                    cm.sendNext("#r#e抱歉 [ #h # ] \r\n\r\n您輸入的數量錯誤 請檢查輸入有誤重新輸入！", 1033210);
                    cm.dispose();
                }
            }else if(PD == 2){
                if ((cm.getMeso()+(selection*item2[PD][1]*10000000))>=9999999999){
                        cm.sendOk("對不起，你購買的楓幣太多了，個人錢包楓幣上線為99E", 1033210);
                        cm.dispose();
                }else{
                    if (cm.haveItem(4000313, selection)) {
                        cm.gainItem(4000313, -(selection*item2[PD][0]));
                        cm.gainMeso(+item2[PD][1]* selection*10000000);
                        cm.sendOk("#r#e[ #h # ]恭喜您\r\n\r\n您成功用#z4000313# #v4000313# x #r" + (selection*item2[PD][0]) + " #k\r\n購買了#r " + (selection*item2[PD][1]) + " #kKW楓幣", 1033210);
                        cm.worldSpouseMessage(0x15, "[ 金融中心 ] 恭喜 " + cm.getChar().getName() + " 用 " + (selection*item2[PD][0]) + " 枚中介幣購買了 " + (selection*item2[PD][1]) + " KW楓幣 ");
                        cm.dispose();
                    } else {
                        cm.sendNext("#r#e抱歉 [ #h # ] \r\n\r\n您輸入的數量錯誤 請檢查輸入有誤重新輸入！", 1033210);
                        cm.dispose();
                    }
                }
            }else if(PD == 3){
                if (cm.getMeso()<(selection*item2[PD][0])*10000000){
                        cm.sendOk("對不起，你沒有那麼多錢", 1033210);
                        cm.dispose();
                }else{
                    if (cm.canHold(4000313, selection)) {
                        cm.gainItem(4000313, selection*item2[PD][1]);
                        cm.gainMeso(-item2[PD][0]* selection*10000000);
                        cm.sendOk("#r#e[ #h # ]恭喜您\r\n\r\n您成功用" + (selection*item2[PD][0]) + " #kW楓幣兌換 " + selection*item2[PD][1] + "個#z4E000463# #v4000313# ", 1033210);
                        cm.worldSpouseMessage(0x15, "[ 金融中心 ] 恭喜 " + cm.getChar().getName() + " 用 " + (selection*item2[PD][0]) + " Kw楓幣購買了 " + (selection*item2[PD][1]) + " 中介 ");
                        cm.dispose();
                    } else {
                        cm.sendNext("#r#e抱歉 [ #h # ] \r\n\r\n請檢查背包能帶這麼多不！", 1033210);
                        cm.dispose();
                    }
                }
            }else{
                cm.sendOk("出錯了，聯繫管理員詢問！");
                cm.dispose();
            }
        }
     }
}
