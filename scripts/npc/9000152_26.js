/* global cm */

var status = 0;
var select = -1;
var selected = -1;
var select0= -1;
var select1= -1;
//選擇商店
var 選擇商店 = "黃金色楓葉商店";
var 商店標誌 = 4033247;
//商店選項
var 商店選項 = Array(
    //"墜飾欄位",
    "保護卷軸",
    "裝備卷軸",
    "彩虹色楓葉",
    "楓點"
);


//黃金色楓葉換墜飾欄位
var 黃金色楓葉換墜飾欄位道具 = Array(5550001,5550000);
var 黃金色楓葉換墜飾欄位天數 = Array(7,30);
var 黃金色楓葉換墜飾欄位花費道具數量 = Array([[4033247,2]],[[4033247,8]]);

//黃金色楓葉換保護卷軸
var 黃金色楓葉換保護卷軸獲得道具 = Array(2531000,2530000,5064100,5068100,5064003,5064300,2049605,2049604,2049600);
var 黃金色楓葉換保護卷軸獲得數量 = Array(6,6,5,5,5,3,3,2,1);
var 黃金色楓葉換保護卷軸花費道具 = Array([[4033247,1]],[[4033247,1]],[[4033247,1]],[[4033247,1]],[[4033247,1]],[[4033247,1]],[[4033247,1]],[[4033247,1]])
//黃金色楓葉換裝備卷軸
var 黃金色楓葉換裝備卷軸獲得道具 = Array(2049780,2613062,2613063,2612074,2612075,2616072,2616073,2615041,2615042,2048819,2048820);
var 黃金色楓葉換裝備卷軸獲得道具數量 = Array(5,3,3,3,3,3,3,3,3,3,3);
var 黃金色楓葉換裝備卷軸花費道具 = Array([[4033247,1]]);
//黃金色楓葉兌換彩虹色楓葉
var 黃金色楓葉換彩虹色楓葉花費道具 = Array([[4033247,10]]);
//黃金色楓葉兌換楓點
var 黃金色楓葉兌換楓點花費道具 = Array([[4033247,1]]);


function start() {
    if ( cm.getPlayerStat("GM") == 0 ||  cm.getPlayerStat("ADMIN") == 0){
        //cm.dispose();
        //return;
    }    
    var str = "你好，請問您需要買什麼呢？\r\n";
    for(k=0;k<商店選項.length;k++){
        str += "#L"+k+"##i4033247# 兌換 #b"+商店選項[k]+"#k#l\r\n";
    }
    str += "#L"+商店選項.length+"##b楓點#k 兌換 #i4033247##l\r\n";
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
            黃金色楓葉兌換保護卷軸( selection,mode );
            break;
        case (1):
            黃金色楓葉兌換裝備卷軸( selection,mode );
            break;
        case (2):
            黃金色楓葉兌換彩虹色楓葉( selection,mode );
            break;
        case (3):
            黃金色楓葉兌換楓點( selection,mode );
            break;
        default:
            if (select == 商店選項.length) {
                楓點兌換黃金色楓葉( selection,mode );
            }
            break;
    }
}
function 黃金色楓葉兌換墜飾欄位(selection,mode){
    var i = 1;
    
    
    
    if (status < i) {
        cm.sendOk("兌換成功");
        cm.dispose();
        
        
        
    } else if (status === i++) {
        //addPendantSlot(int day);增加墜飾欄位
        var str = "";
        str += "#r#e請注意!!墜飾欄位時間並不會疊加!!#k#n\r\n"
        for(i=0;i<黃金色楓葉換墜飾欄位道具.length;i++){
            str += "#L" + i + "##r" +黃金色楓葉換墜飾欄位花費道具數量[i][0][1]+"個#k #i4033247:# 兌換 #b增加墜飾欄位("+(黃金色楓葉換墜飾欄位天數[i]) +")天#k\r\n" ;
        }
        cm.sendSimple( str ); 
        
        
        
    } else if (status === i++) {
        select0 = selection;
        cm.sendYesNo("#b墜飾欄位         : "+(黃金色楓葉換墜飾欄位天數[select0])+"天#k\r\n"+show(0,0,0,0,0,黃金色楓葉換墜飾欄位花費道具數量[select0]));
    
    
    
    } else if (status === i++) {
        
        if(buy(0,0,0,0,0,黃金色楓葉換墜飾欄位花費道具數量[select0])==true){
            //cm.addPendantSlot(黃金色楓葉換墜飾欄位天數[select0]);
            
            cm.sendOk("兌換成功");
        }
    
    
    
    } else {
        cm.dispose();
    }
}
function 黃金色楓葉兌換全圖寵物拾取(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = "您需要哪件道具呢？\r\n";
        for(i=0;i<黃金色楓葉換全圖寵物拾取道具天數.length;i++){
            str += "#L" + i + "##i" +黃金色楓葉換全圖寵物拾取道具+":# 全圖寵物拾取 #b持續"+黃金色楓葉換全圖寵物拾取道具天數[i] +"天#k\r\n" ;
        }
        cm.sendSimple( str );
    } else if (status === i++) {
        select0 = selection;
        cm.sendYesNo(show(黃金色楓葉換全圖寵物拾取道具,1,0,0,0,黃金色楓葉換全圖寵物拾取道具需求道具[select0]));
    } else if (status === i++) {
        if(cm.canHold(黃金色楓葉換全圖寵物拾取道具,1)==true ){
            if(buy(0,0,0,0,0,黃金色楓葉換全圖寵物拾取道具需求道具[select0])==true){
                cm.gainItemPeriod(4000813,1,黃金色楓葉換全圖寵物拾取道具天數[select0],false);
                cm.sendOk("兌換成功");                
            }            
        }else{
            cm.sendOk("兌換失敗，您已擁有此道具");
        }
    } else {
        cm.dispose();
    }
}
function 黃金色楓葉兌換保護卷軸(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = "您需要哪件道具呢？\r\n";
        for(i=0;i<黃金色楓葉換保護卷軸獲得道具.length;i++){
            str += "#L" + i + "##i" +黃金色楓葉換保護卷軸獲得道具[i]+":# #b#z"+黃金色楓葉換保護卷軸獲得道具[i]+"##k\r\n" ;
        }
        cm.sendSimple( str ); 
    } else if (status === i++) {
        select0 = selection;
        cm.sendYesNo(show(黃金色楓葉換保護卷軸獲得道具[select0],黃金色楓葉換保護卷軸獲得數量[select0],0,0,0,黃金色楓葉換保護卷軸花費道具[select0]));
    } else if (status === i++) {
        if(buy(黃金色楓葉換保護卷軸獲得道具[select0],黃金色楓葉換保護卷軸獲得數量[select0],0,0,0,黃金色楓葉換保護卷軸花費道具[select0])==true)
            cm.sendOk("兌換成功");
    } else {
        cm.dispose();
    }
}
function 黃金色楓葉兌換裝備卷軸(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = "您需要哪件道具呢？\r\n";
        for(i=0;i<黃金色楓葉換裝備卷軸獲得道具.length;i++){
            str += "#L" + i + "##i" +黃金色楓葉換裝備卷軸獲得道具[i]+":# #b#z"+黃金色楓葉換裝備卷軸獲得道具[i]+"##k\r\n" ;
        }
        cm.sendSimple( str );
    } else if (status === i++) {
        select0 = selection;
        var str = ""
        str += "請問您要花多少黃金色楓葉呢?\r\n";
        str += "#r黃金色楓葉#k ：#b#z"+黃金色楓葉換裝備卷軸獲得道具[select0]+"##k = #r1#k ：#b"+黃金色楓葉換裝備卷軸獲得道具數量[select0]+"#k\r\n";
        str += "請輸入#i4033247:#數量"
        cm.sendGetNumber(str,1,1,100);
    } else if (status === i++) {
        select1 = selection;
        黃金色楓葉換裝備卷軸花費道具[0][0][1] = 黃金色楓葉換裝備卷軸花費道具[0][0][1]*select1;
        黃金色楓葉換裝備卷軸獲得道具數量[select0] = 黃金色楓葉換裝備卷軸獲得道具數量[select0]*select1;
        cm.sendYesNo(show(黃金色楓葉換裝備卷軸獲得道具[select0],黃金色楓葉換裝備卷軸獲得道具數量[select0],0,0,0,黃金色楓葉換裝備卷軸花費道具[0]));
    } else if (status === i++) {
        if(buy(黃金色楓葉換裝備卷軸獲得道具[select0],黃金色楓葉換裝備卷軸獲得道具數量[select0],0,0,0,黃金色楓葉換裝備卷軸花費道具[0]))
            cm.sendOk("兌換成功");
    } else {
        cm.dispose();
    }
}
function 黃金色楓葉兌換彩虹色楓葉(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = ""
        str += "請問您要換多少彩虹色楓葉呢?\r\n";
        str += "#r黃金色楓葉#k ：#b彩虹色楓葉#k = #r10#k ：#b1#k\r\n";
        str += "請輸入#i4033248:#數量"
        cm.sendGetNumber(str,1,1,100);
    } else if (status === i++) {
        select0 = selection;
        黃金色楓葉換彩虹色楓葉花費道具[0][0][1] = 黃金色楓葉換彩虹色楓葉花費道具[0][0][1]*select0;
        cm.sendYesNo(show(4033248,select0,0,0,0,黃金色楓葉換彩虹色楓葉花費道具[0]));
    } else if (status === i++) {
        if(buy(4033248,select0,0,0,0,黃金色楓葉換彩虹色楓葉花費道具[0]))
            cm.sendOk("兌換成功");
    } else {
        cm.dispose();
    }
}
function 黃金色楓葉兌換楓點(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = ""
        str += "請問您要換多少楓點呢?\r\n";
        str += "#r黃金色楓葉#k ：#b楓點#k = #r1#k ：#b1,000#k\r\n";
        str += "請輸入#i4033247:#數量"
        cm.sendGetNumber(str,1,1,100);
    } else if (status === i++) {
        select0 = selection;
        黃金色楓葉兌換楓點花費道具[0][0][1] = select0;
        cm.sendYesNo(show(0,0,0,0,-select0*1000,黃金色楓葉兌換楓點花費道具[0]));
    } else if (status === i++) {
        if(buy(0,0,0,0,-select0*1000,黃金色楓葉兌換楓點花費道具[0]))
            cm.sendOk("兌換成功");
        cm.dispose();
    } else {
        cm.dispose();
    }
}

function 楓點兌換黃金色楓葉(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = ""
        str += "請問您要換多少#i4033247#呢?\r\n";
        str += "#r點數#k ：#b黃金色楓葉#k = #r3,300#k ：#b1#k\r\n";
        str += "請輸入#i4033247#數量"
        cm.sendGetNumber(str,1,1,100);
    } else if (status === i++) {
        select0 = selection;
        cm.sendYesNo(show(4033247,select0,0,0,select0*3300,0));
    } else if (status === i++) {
        if(buy(4033247,select0,0,0,select0*3300,0)==true)
            cm.sendOk("兌換成功");
        cm.dispose();
    } else {
        cm.dispose();
    }
}




function show(獲得道具,獲得數量,獲得經驗,花費楓幣,花費楓點,花費道具陣列){
    var str = "";
    if(獲得道具 != 0 || 獲得數量!= 0){
        str += "#b獲得道具　　　  : #i" + 獲得道具 + ":##z"+獲得道具+"#\r\n";
        str += "#b獲得道具數量　  : " + 獲得數量 + "\r\n";
    }
    if (獲得經驗!=0)
        str += "#b獲得經驗        : " + 獲得經驗 + "\r\n";
    switch((花費楓幣<0)?-1:(花費楓幣==0)?0:(花費楓幣>0)?1:0){
        case 1:
            str += "#r花費楓幣　　　  : " + formatNumber(花費楓幣) + "\r\n";
            break;
        case -1:
            str += "#b獲得楓幣　　　  : " + formatNumber(-花費楓幣) + "\r\n";
            break;
        case 0:
    }
    switch((花費楓點<0)?-1:(花費楓點==0)?0:(花費楓點>0)?1:0){
        case 1:
            str += "#r花費楓點/樂豆點 : " + formatNumber(花費楓點) + "\r\n";
            break;
        case -1:
            str += "#b獲得楓點/樂豆點 : " + formatNumber(-花費楓點)+ "\r\n";
            break;
        case 0:
    }    
    if (花費道具陣列!=0){
        for(i=0;i<花費道具陣列.length;i++){
            str += "#r花費道具        : #i"+花費道具陣列[i][0]+":##z" + 花費道具陣列[i][0] +"# "+ 花費道具陣列[i][1]+ "個\r\n";
        }
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











