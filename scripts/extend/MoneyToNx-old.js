/* global cm */



var status = 0;
var select = -1;
var selected = -1;
var select0= -1;
var select1= -1;

var time = new Date();
var year = time.getFullYear(); //獲得年份
var month = time.getMonth()+1; //獲得月份
var day = time.getDate();//獲取日
var today = year+"-"+month+"-"+day;

function start() {
    
    var str = "你好，請問您需要買什麼呢？\r\n";    
    str += "#L2##b購買包月#k#l\r\n";
    str += "#L0##b普通折扣禮包#k#l\r\n";
    str += "#L1##b包月折扣禮包#k#l\r\n";
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
        
    var i = -1;
    
    if (select === -1) {
        select = selection;
    }
    
    switch (select){
        case (0):            
            普通折扣禮包( selection,mode );
            break;
        case (1):
            if ( !cm.getPlayer().isGm()){
                cm.sendOk("管理員專用");
                cm.dispose();
                return;
            }    
            包月折扣禮包( selection,mode );
            break;
        case (2):            
            cm.dispose();
            cm.openNpc(1530635, "VIP");
            break;
    }
}

function 普通折扣禮包(selection,mode){
    var i = 0;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        var str = "便宜#r每日#k大方送!每人期間內限購1包喔!!!!(限樂豆點)\r\n";    
        str += "#L0##b每日限購 1000點 小禮包#k\r\n";
        str += "#L1##b每日限購 5000點 中禮包#k#l\r\n";
        str += "#L2##b每週限購 10000點 大禮包#k#l\r\n";
        str += "#L3##b每月限購 50000點 傳說禮包#k#l\r\n";
        cm.sendSimple( str );
    } else if (status === i++) {
        selected = selection;
        
        //每日 1000點 小禮包
        if ( selected == 0 ){
            cm.sendYesNo( show([[5060048,12],[4000814,300]],1000));            
        }
        
        //每日 5000點 中禮包
        if ( selected == 1 ){
            cm.sendYesNo( show([[5060048,60],[4033247,2],[5062017,2],[5062020,2]],5000));
        }
        
        //每週 10000點 大禮包
        if ( selected == 2 ){
            cm.sendYesNo( show([[5060048,140],[4033247,5],[5062017,10],[5062020,10]],10000));
        }
        
        //每月 50000點 傳說大禮包        
        if ( selected == 3 ){
            cm.sendYesNo( show([[5060048,1000],[4033247,30],[5062017,60],[5062020,60]],50000));            
        }
        
    } else if (status === i++) {
        selected1 = selection;
        //每日 1000點 小禮包
        if ( selected == 0 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999991000,"date");
            
            if ( 上次購買日期 == today ){
                cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 1000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.canHold(5060048,12) != true ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(999991000,"name","每日1000點小禮包",false);
                cm.getPlayer().updateWorldShareInfo(999991000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(999991000,"count",1,false);
                
                cm.gainNX(-1000);
                cm.gainNX(2,300);
                cm.gainItem(5060048,12);
                cm.sendOk("感謝您購買我們的#b小禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『小禮包』，" + cm.getServerName() + "感謝您");
                cm.dispose();
            }
            return;
        }
        
        //每日 5000點 中禮包
        if ( selected == 1 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999995000,"date");
            
            
            
            if ( 上次購買日期 == today ){
                cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 5000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.canHoldSlots(4) != true ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(999995000,"name","每日5000點中禮包",false);
                cm.getPlayer().updateWorldShareInfo(999995000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(999995000,"count",1,false);
                
                
                cm.gainNX(-5000);
                cm.gainItem(5060048,60);
                cm.gainItem(4033247,2);
                cm.gainItem(5062017,2);
                cm.gainItem(5062020,2);
                cm.sendOk("感謝您購買我們的#b中禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『中禮包！』，" + cm.getServerName() + "感謝您");
                cm.dispose();
            }
            
        }
        
        //每週 10000點 大禮包
        if ( selected == 2 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999910000,"date");
            
            
            if ( DateDiff(上次購買日期,today) <= 7 ){
                cm.sendOk("#r您這週已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 10000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.canHoldSlots(4) != true ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(999910000,"name","每週10000點大禮包",false);
                cm.getPlayer().updateWorldShareInfo(999910000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(999910000,"count",1,false);
                
                
                
                cm.gainNX(-10000);
                cm.gainItem(5060048,140);
                cm.gainItem(4033247,5);
                cm.gainItem(5062017,10);
                cm.gainItem(5062020,10);
                cm.sendOk("感謝您購買我們的#b大禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『大禮包！！』，" + cm.getServerName() + "感謝您");
                cm.dispose();
            }
            
        }
        
        //每月 50000點 傳說大禮包
        
        if ( selected == 3 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(999950000,"date");
            
            if ( DateDiff(上次購買日期,today) <= 30 ){
                cm.sendOk("#r您這週已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 50000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.canHoldSlots(4) != true ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(999950000,"name","每月50000點傳說大禮包",false);
                cm.getPlayer().updateWorldShareInfo(999950000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(999950000,"count",1,false);
                
                cm.gainNX(-50000);
                cm.gainItem(5060048,1000);
                cm.gainItem(4033247,30);
                cm.gainItem(5062017,60);
                cm.gainItem(5062020,60);
                cm.sendOk("感謝您購買我們的#b傳說大禮包！！#k\r\n歡迎再次光臨！！");
                cm.worldSpouseMessage(0x15,"『超值禮包』 ：玩家 "+ cm.getChar().getName() +" 感謝您所購買『傳說大禮包！！！』，" + cm.getServerName() + "感謝您");
                cm.dispose();
            }
        }
    } else {
        cm.dispose();
    }
    
}

function 包月折扣禮包(selection,mode){
    var i = 0;
    
    var 上次包月日期 = cm.getPlayer().getWorldShareInfo(999999999,"date");
    var 是否包月 = cm.getPlayer().getWorldShareInfo(999999999,"enable");
    var 檢查包月 = false;
    if( 是否包月 == 1 && DateDiff(上次包月日期,today) <= 30 )
        檢查包月 = true;
    
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        
        var str = "便宜#r每日#k大方送!每人期間內限購1包喔!!!!(限樂豆點)\r\n";    
        str += "#L0##b每日限購 1000點 包月小禮包#k\r\n";
        str += "#L1##b每日限購 5000點 包月中禮包#k#l\r\n";
        str += "#L2##b每週限購 10000點 包月大禮包#k#l\r\n";
        str += "#L3##b每月限購 50000點 包月傳說禮包#k#l\r\n";
        str += "#L4##b每月限購 100000點 包月至尊傳說禮包#k#l\r\n";
        cm.sendSimple( str );
    } else if (status === i++) {
        selected = selection;
        
        //每日 1000點 包月小禮包
        if ( selected == 0 ){
            cm.sendYesNo( show([[5060048,20],[4033247,1]],1000));            
        }
        
        //每日 5000點 包月中禮包
        if ( selected == 1 ){
            cm.sendYesNo( show([[5060048,70],[4033247,6],[5062017,5],[5062020,5]],5000));
        }
        
        //每週 10000點 包月大禮包
        if ( selected == 2 ){
            cm.sendYesNo( show([[5060048,1250],[4033247,40],[5062017,80],[5062020,80]],10000));
        }
        
        //每月 50000點 包月傳說禮包        
        if ( selected == 3 ){
            cm.sendYesNo( show([[5060048,6000],[4033247,300],[5062017,500],[5062020,500]],50000));            
        }
        
        //每月 100000點 包月至尊傳說大禮包        
        if ( selected == 4 ){
            cm.sendYesNo( show([[2711000,1400],[2711003,650],[2711004,650],[5537000,270],[5743003,270],[5062020,65],[5062019,65],[5390029,250]],100000));            
        }
        
    } else if (status === i++) {
        selected1 = selection;
        //每日 1000點 包月小禮包
        if ( selected == 0 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888881000,"date");
            
            if ( 檢查包月 == false ){
                cm.sendOk("#r只有包月用戶可以買喔");
                cm.dispose();
            }else if ( 上次購買日期 == today ){
                cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 1000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.canHold(5060048,20) != true && cm.canHold(4033247,1) != true){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(888881000,"name","每日1000點包月小禮包",false);
                cm.getPlayer().updateWorldShareInfo(888881000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(888881000,"count",1,false);
                
                cm.gainNX(-1000);
                cm.gainNX(2,300);
                cm.gainItem(5060048,20);
                cm.gainItem(4033247,1);
                cm.sendOk("感謝您購買我們的#b包月小禮包！！#k\r\n歡迎再次光臨！！");
                cm.dispose();
            }
            return;
        }
        
        //每日 5000點 包月中禮包
        if ( selected == 1 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888885000,"date");
            
            
            
            if ( 檢查包月 == false ){
                cm.sendOk("#r只有包月用戶可以買喔");
                cm.dispose();
            }else if ( 上次購買日期 == today ){
                cm.sendOk("#r您今天已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 5000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.getSpace(2) => 1 && cm.getSpace(3) => 1 && cm.getSpace(5) => 2 ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(888885000,"name","每日5000點包月中禮包",false);
                cm.getPlayer().updateWorldShareInfo(888885000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(888885000,"count",1,false);
                
                
                cm.gainNX(-5000);
                cm.gainItem(5060048,70);
                cm.gainItem(4033247,6);
                cm.gainItem(5062017,5);
                cm.gainItem(5062020,5);
                cm.sendOk("感謝您購買我們的#b包月中禮包！！#k\r\n歡迎再次光臨！！");
                cm.dispose();
            }
            
        }
        
        //每週 10000點 包月大禮包
        if ( selected == 2 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888810000,"date");
            
            
            if ( 檢查包月 == false ){
                cm.sendOk("#r只有包月用戶可以買喔");
                cm.dispose();
            }else if ( DateDiff(上次購買日期,today) <= 7 ){
                cm.sendOk("#r您這週已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 10000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.getSpace(2) => 1 && cm.getSpace(3) => 1 && cm.getSpace(5) => 2 ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(888810000,"name","每週10000點包月大禮包",false);
                cm.getPlayer().updateWorldShareInfo(888810000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(888810000,"count",1,false);
                
                
                
                cm.gainNX(-10000);
                cm.gainItem(5060048,1250);
                cm.gainItem(4033247,40);
                cm.gainItem(5062017,80);
                cm.gainItem(5062020,80);
                cm.sendOk("感謝您購買我們的#b包月大禮包！！#k\r\n歡迎再次光臨！！");
                cm.dispose();
            }
            
        }
        
        //每月 50000點 傳說大禮包        
        if ( selected == 3 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888850000,"date");
            
            if ( DateDiff(上次購買日期,today) <= 30 ){
                cm.sendOk("#r您這週已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 50000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.getSpace(2) => 2 && cm.getSpace(3) => 1 && cm.getSpace(5) => 2 ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(888850000,"name","每日50000點傳說大禮包",false);
                cm.getPlayer().updateWorldShareInfo(888850000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(888850000,"count",1,false);
                
                cm.gainNX(-50000);
                cm.gainItem(5060048,6000);
                cm.gainItem(4033247,300);
                cm.gainItem(5062017,500);
                cm.gainItem(5062020,500);
                cm.sendOk("感謝您購買我們的#b傳說大禮包！！#k\r\n歡迎再次光臨！！");
                cm.dispose();
            }
        }
        
        //每月 100000點 至尊傳說大禮包        
        if ( selected == 4 ){
            
            var 上次購買日期 = cm.getPlayer().getWorldShareInfo(888100000,"date");
            
            if ( DateDiff(上次購買日期,today) <= 30 ){
                cm.sendOk("#r您這週已經買過了喔#k\r\n上次購買日期 "+上次購買日期);
                cm.dispose();
            }else if ( cm.getNX(1) < 50000 ){
                cm.sendOk("#r您樂豆點不足喔#k");
                cm.dispose();
            }else if ( cm.getSpace(2) => 3 && cm.getSpace(5) => 5 ){
                cm.sendOk("#r您包包空間不足喔#k");
                cm.dispose();
            }else{
                cm.getPlayer().updateWorldShareInfo(888100000,"name","每日100000點至尊傳說大禮包",false);
                cm.getPlayer().updateWorldShareInfo(888100000,"date",today,false);
                cm.getPlayer().updateWorldShareInfo(888100000,"count",1,false);
                
                cm.gainNX(-100000);
                cm.gainItem(2711000,1400);
                cm.gainItem(2711003,650);
                cm.gainItem(2711004,650);
                cm.gainItem(5537000,270);
                cm.gainItem(5743003,270);
                cm.gainItem(5062020,65);
                cm.gainItem(5062019,65);
                cm.gainItem(5390029,25);
                cm.sendOk("感謝您購買我們的#b至尊傳說大禮包！！#k\r\n歡迎再次光臨！！");
                cm.dispose();
            }
        }
    } else {
        cm.dispose();
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




