/* global cm */



var status = 0;
var select = -1;

var time = new Date();
var year = time.getFullYear(); //獲得年份
var month = time.getMonth()+1; //獲得月份
var day = time.getDate();//獲取日
var today = year+"-"+month+"-"+day;

var 上次包月日期 = null;
var 是否包月 = null;
var 檢查包月 = false;


function start() {
    上次包月日期 = cm.getPlayer().getWorldShareInfo(999999999,"date");
    是否包月 = cm.getPlayer().getWorldShareInfo(999999999,"enable");
    
    if( 是否包月 == 1 && DateDiff(上次包月日期,today) <= 30 )
        檢查包月 = true;
    
    var str = "便宜#r每日#k大方送!每人期間內限購2包喔!!!!(限樂豆點)\r\n";    
    //str += "#L99##b點我購買包月去#k#l\r\n\r\n";
    str += "         #d#e普通折扣禮包專區#k#n\r\n";
    str += "#L0##b每日限購 1000點 小禮包#k\r\n";
    str += "#L1##b每日限購 5000點 中禮包#k#l\r\n";
    str += "#L2##b每週限購 10000點 大禮包#k#l\r\n";
    str += "#L3##b每月限購 50000點 傳說禮包#k#l\r\n\r\n";
    
    str += "         #d#e包月折扣禮包專區#k#n\r\n";
    str += "#L4##b每日限購 1000點 包月小禮包#k\r\n";
    str += "#L5##b每日限購 5000點 包月中禮包#k#l\r\n";
    str += "#L6##b每週限購 10000點 包月大禮包#k#l\r\n";
    str += "#L7##b每月限購 50000點 包月傳說禮包#k#l\r\n";
    str += "#L8##b每月限購 100000點 包月至尊傳說禮包#k#l\r\n";
    cm.sendSimple( str );
}

function action(mode, type, selection) {
    
    if (mode === 1) {
        status++;
    } else if (mode === 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
        
    var i = 1;
    
    if (select === -1) {
        select = selection;
    }
    
    switch (select){
        case (0):            
            if (status === i++) {
                cm.sendYesNo( show([[5060048,12],[4000814,300]],1000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999991000,"date");    
                var 購買次數 = cm.getPlayer().getWorldShareInfo(999991000,"count");
                
                if ( 上次購買日期 == today ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }
                }
                if ( cm.getNX(1) < 1000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.canHold(5060048,12) != true ){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                }
                
                cm.getPlayer().updateWorldShareInfo(999991000,"name","每日1000點小禮包",false);
                cm.getPlayer().updateWorldShareInfo(999991000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(999991000,"count",購買次數+1,false);
                
                cm.gainNX(-1000);
                cm.gainNX(2,300);
                cm.gainItem(5060048,12);
                cm.sendOk("感謝您購買我們的#b小禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『小禮包』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                                
            }
            break;
        case (1):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,60],[4033247,2],[5062017,2],[5062020,2]],5000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999995000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(999995000,"count");
                
                if ( 上次購買日期 == today ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }        
                }
                if ( cm.getNX(1) < 5000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.getSpace(2) < 1 || cm.getSpace(3) < 1 || cm.getSpace(5) < 2 ){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }
                
                cm.getPlayer().updateWorldShareInfo(999995000,"name","每日5000點中禮包",false);
                if ( 上次購買日期 == today ){
                    cm.getPlayer().updateWorldShareInfo(999995000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(999995000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(999995000,"count",1,false);
                }            
                
                cm.gainNX(-5000);
                cm.gainItem(5060048,60);
                cm.gainItem(4033247,2);
                cm.gainItem(5062017,2);
                cm.gainItem(5062020,2);
                cm.sendOk("感謝您購買我們的#b中禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『中禮包！』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                
                
            }
            break;
        case (2):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,140],[4033247,5],[5062017,10],[5062020,10]],10000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999910000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(999910000,"count");
                
                if ( DateDiff(上次購買日期,today) < 7 ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您這週已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }        
                }
                if ( cm.getNX(1) < 10000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.getSpace(2) < 1 || cm.getSpace(3) < 1 || cm.getSpace(5) < 2 ){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }
                
                cm.getPlayer().updateWorldShareInfo(999910000,"name","每週10000點大禮包",false);
                if ( DateDiff(上次購買日期,today) < 7 ){
                    cm.getPlayer().updateWorldShareInfo(999910000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(999910000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(999910000,"count",1,false);
                }
                    
                
                cm.gainNX(-10000);
                cm.gainItem(5060048,140);
                cm.gainItem(4033247,5);
                cm.gainItem(5062017,10);
                cm.gainItem(5062020,10);
                cm.sendOk("感謝您購買我們的#b大禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『大禮包！！』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                return;
            }
            break;
        case (3):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,800],[4033247,30],[5062017,60],[5062020,60]],50000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999950000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(999950000,"count");
                
                if ( DateDiff(上次購買日期,today) < 30 ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您這個月已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }
                }
                if ( cm.getNX(1) < 50000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.getSpace(2) < 2 || cm.getSpace(3) < 1 || cm.getSpace(5) < 2 ){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }
                
                cm.getPlayer().updateWorldShareInfo(999950000,"name","每月50000點傳說大禮包",false);
                if ( DateDiff(上次購買日期,today) < 30 ){
                    cm.getPlayer().updateWorldShareInfo(999950000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(999950000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(999950000,"count",1,false);
                }
                
                cm.gainNX(-50000);
                cm.gainItem(5060048,800);
                cm.gainItem(4033247,30);
                cm.gainItem(5062017,60);
                cm.gainItem(5062020,60);
                cm.sendOk("感謝您購買我們的#b傳說大禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『傳說大禮包！！！』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                
            }
            break;
        case (4):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,20],[4033247,1]],1000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888881000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(888881000,"count");
                
                if ( 檢查包月 == false ){
                    cm.sendOk("#r只有包月用戶可以買喔");
                    cm.dispose();
                    return;
                }
                if ( 上次購買日期 == today ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }
                }
                if ( cm.getNX(1) < 1000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.canHold(5060048,20) != true && cm.canHold(4033247,1) != true){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }                
                cm.getPlayer().updateWorldShareInfo(888881000,"name","每日1000點包月小禮包",false);
                if ( 上次購買日期 == today ){
                    cm.getPlayer().updateWorldShareInfo(888881000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(888881000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(888881000,"count",1,false);
                }
                
                cm.gainNX(-1000);
                cm.gainNX(2,300);
                cm.gainItem(5060048,20);
                cm.gainItem(4033247,1);
                cm.sendOk("感謝您購買我們的#b包月小禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『包月小禮包』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                return;
            }
            break;
        case (5):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,115],[4033247,6],[5062017,5],[5062020,5]],5000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888885000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(888885000,"count");
                
                if ( 檢查包月 == false ){
                    cm.sendOk("#r只有包月用戶可以買喔");
                    cm.dispose();
                    return;
                }
                if ( 上次購買日期 == today ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }
                }
                if ( cm.getNX(1) < 5000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.getSpace(2) <= 1 || cm.getSpace(3) <= 1 || cm.getSpace(5) <= 2 ){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }
                
                cm.getPlayer().updateWorldShareInfo(888885000,"name","每日5000點包月中禮包",false);
                if ( 上次購買日期 == today ){
                    cm.getPlayer().updateWorldShareInfo(888885000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(888885000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(888885000,"count",1,false);
                }
                
                cm.gainNX(-5000);
                cm.gainItem(5060048,115);
                cm.gainItem(4033247,6);
                cm.gainItem(5062017,5);
                cm.gainItem(5062020,5);
                cm.sendOk("感謝您購買我們的#b包月中禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『包月中禮包』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                return;
                
            }
            break;
        case (6):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,160],[4033247,20],[5062017,12],[5062020,12]],10000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888810000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(888810000,"count");
                
                if ( 檢查包月 == false ){
                    cm.sendOk("#r只有包月用戶可以買喔");
                    cm.dispose();
                    return;
                }
                if ( DateDiff(上次購買日期,today) < 7 ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您這週已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }
                }
                if ( cm.getNX(1) < 10000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.getSpace(2) <= 1 || cm.getSpace(3) <= 1 || cm.getSpace(5) <= 2 ){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }
                
                cm.getPlayer().updateWorldShareInfo(888810000,"name","每週10000點包月大禮包",false);
                if ( DateDiff(上次購買日期,today) < 7 ){
                    cm.getPlayer().updateWorldShareInfo(888810000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(888810000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(888810000,"count",1,false);
                }
                cm.gainNX(-10000);
                cm.gainItem(5060048,160);
                cm.gainItem(4033247,20);
                cm.gainItem(5062017,12);
                cm.gainItem(5062020,12);
                cm.sendOk("感謝您購買我們的#b包月大禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『包月大禮包』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                return;
            }
            break;
        case (7):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,850],[4033247,115],[5062017,75],[5062020,75],[4033079,1]],50000));
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888850000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(888850000,"count");
                
                if ( 檢查包月 == false ){
                    cm.sendOk("#r只有包月用戶可以買喔");
                    cm.dispose();
                    return;
                }
                if ( DateDiff(上次購買日期,today) < 30 ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您這月已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }
                }
                if ( cm.getNX(1) < 50000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.getSpace(2) < 2 || cm.getSpace(3) < 2 || cm.getSpace(5) < 2 ){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }
                cm.getPlayer().updateWorldShareInfo(888850000,"name","每月50000點傳說大禮包",false);
                if ( DateDiff(上次購買日期,today) < 30 ){
                    cm.getPlayer().updateWorldShareInfo(888850000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(888850000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(888850000,"count",1,false);
                }
                cm.gainNX(-50000);
                cm.gainItem(5060048,850);
                cm.gainItem(4033247,115);
                cm.gainItem(5062017,75);
                cm.gainItem(5062020,75);
                cm.gainItem(4033079,1);
                cm.sendOk("感謝您購買我們的#b傳說大禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『包月傳說大禮包』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                return;
                
            }
            break;
        case (8):
            if (status === i++) {
                cm.sendYesNo( show([[5060048,2000],[4033247,265],[5062017,200],[5062020,200],[4033079,3]],100000));    
            } else if (status === i++) {
                var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888100000,"date");
                var 購買次數 = cm.getPlayer().getWorldShareInfo(888100000,"count");
                if ( 檢查包月 == false ){
                    cm.sendOk("#r只有包月用戶可以買喔");
                    cm.dispose();
                    return;
                }
                if ( DateDiff(上次購買日期,today) < 30 ){
                    if ( 購買次數 >= 2 ){
                        cm.sendOk("#r您這月已經買過了喔#k\r\n上次購買日期 "+上次購買日期+"\r\n購買次數 "+購買次數);
                        cm.dispose();
                        return;
                    }
                }
                if ( cm.getNX(1) < 100000 ){
                    cm.sendOk("#r您樂豆點不足喔#k");
                    cm.dispose();
                    return;
                }
                if ( cm.getSpace(2) < 3 || cm.getSpace(5) < 5 || cm.getSpace(3) < 1){
                    cm.sendOk("#r您包包空間不足喔#k");
                    cm.dispose();
                    return;
                }
                
                cm.getPlayer().updateWorldShareInfo(888100000,"name","每月100000點至尊傳說大禮包",false);
                if ( DateDiff(上次購買日期,today) < 30 ){
                    cm.getPlayer().updateWorldShareInfo(888100000,"count",購買次數+1,false);
                }else{
                    cm.getPlayer().updateWorldShareInfo(888100000,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(888100000,"count",1,false);
                }
                
                cm.gainNX(-100000);
                cm.gainItem(5060048,2000);
                cm.gainItem(4033247,265);
                cm.gainItem(5062017,200);
                cm.gainItem(5062020,200);
                cm.gainItem(4033079,3);
                cm.sendOk("感謝您購買我們的#b至尊傳說大禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『包月至尊傳說大禮包』，" + cm.getServerName() + "感謝您");
                cm.dispose();
                return;
            }
            break;
        case (99):            
            cm.dispose();
            cm.openNpc(1530635, "VIP");
            break;
    }
}



function show(獲得道具陣列,花費樂豆點){
    var str = "";
    
    
    
    if( 獲得道具陣列 != 0 ){
        for(i=0;i<獲得道具陣列.length;i++){
            str += "#b獲得道具        : #i"+獲得道具陣列[i][0]+":##z" + 獲得道具陣列[i][0] +"# "+ 獲得道具陣列[i][1]+ "個\r\n";
        }        
    }
        
    switch((花費樂豆點<0)?-1:(花費樂豆點==0)?0:(花費樂豆點>0)?1:0){
        case 1:
            str += "#r花費樂豆點      : " + formatNumber(花費樂豆點) + "\r\n";
            break;
        case -1:
            str += "#b獲得樂豆點      : " + formatNumber(-花費樂豆點)+ "\r\n";
            break;
        case 0:
    }    
    
    str += "                                      #d#e是否確定購買？#k#n";
    return str ;
}




function buy(獲得道具,獲得數量,獲得經驗,花費楓幣,花費楓點,花費道具陣列){
    var str = "";    
    if ( cm.getPlayer().getCSPoints(2)+cm.getPlayer().getCSPoints(1)< 花費楓點){
        str += "#r楓點/樂豆點不足: 少 #e"+formatNumber(花費楓點-(cm.getPlayer().getCSPoints(2)+cm.getPlayer().getCSPoints(1)))+"#n元#k\r\n";
    }    
    if (cm.getMeso() < 花費楓幣){
        str += "#r楓幣不足       : 少 #e"+formatNumber(花費楓幣-cm.getMeso())+"#n元#k\r\n";
    }
    if (花費道具陣列!=0){
        for(i=0;i<花費道具陣列.length;i++){
            if( cm.haveItem( 花費道具陣列[i][0],花費道具陣列[i][1]) == false ){
                str += "#r道具不足       : #i"+花費道具陣列[i][0] +":#少 #e"+　(花費道具陣列[i][1]-cm.itemQuantity(花費道具陣列[i][0]))+"#n個\r\n";
            }
        }
    }
    if (cm.canHold(獲得道具,獲得數量)==false && 獲得道具 != 0)
        str += "#r空間不足       : 無法獲得 #i"+獲得道具+"# #e"+獲得數量+"#n個";
        
    if( str != "" ){
        //確認失敗，顯示缺少物品
        cm.sendOk( str );
        return false;
    }else{
        //確認成功，開始購買
        //扣除楓點與樂豆點
        if (花費楓點>0){
            if(cm.getPlayer().getCSPoints(2)>=花費楓點){
                cm.getPlayer().modifyCSPoints(2,-花費楓點);
            }else if (cm.getPlayer().getCSPoints(2)+cm.getPlayer().getCSPoints(1) >= 花費楓點){
                var 現有楓點　=　cm.getPlayer().getCSPoints(2);
                cm.getPlayer().modifyCSPoints(2,- 現有楓點);
                cm.getPlayer().modifyCSPoints(1,- (花費楓點-現有楓點));
            }
        } else if (花費楓點<0){
            cm.getPlayer().modifyCSPoints(2,-花費楓點);
        }
        //扣除楓幣
        cm.gainMeso(-花費楓幣);
        //扣除裝備
        if (花費道具陣列!=0){
            for(i=0;i<花費道具陣列.length;i++){
                cm.gainItem(花費道具陣列[i][0],-Math.abs(花費道具陣列[i][1]));
            }
        }
        //給予裝備
        if(獲得道具 != 0 || 獲得數量!= 0){
            cm.gainItem(獲得道具,獲得數量);
        }
        //給予經驗
        cm.gainExp(獲得經驗);
        return true;
    }
}
function formatNumber(num, precision, separator) {
    var parts;
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        num = Number(num);
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        parts = num.split('.');
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        return parts.join('.');
    }
    return NaN;
}


function DateDiff (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
  var oDate1 = new Date(sDate1);
  var oDate2 = new Date(sDate2);
  var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return iDays;
}





