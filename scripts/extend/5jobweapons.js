/* global cm */

var status = -1;
var select = -1;
var selected = -1;
var select0= -1;
var select1= -1;

var 五轉用武器 = new Array(1212117,1222111,1232111,1242118,1252097,1262037,1302336,1312201,1322253,1332277,1342103,1362137,1372225,1382263,1402253,1412180,1422187,1432216,1442270,1452255,1462241,1472263,1482218,1492233,1522140,1532146,1542116,1552118,1582028);


function start() {
    if ( cm.getPlayerStat("GM") == 0 ||  cm.getPlayerStat("ADMIN") == 0){
        //如果不是GM則關閉NPC
        //cm.dispose();
        //return;
    }
    if ( cm.getPQLog("領取五轉用武器", 1) == 1){
        cm.sendOk("您已經領過了喔～");
        cm.dispose();
        return;
    }    
    var str = "";
    str += "為了讓您五轉更加快速!\r\n從直這裡挑一把你喜歡的吧！挑錯不負責哦！\r\n";
    for (var i = 0; i < 五轉用武器.length; i++){
        str += "#L" + i + "##i" +五轉用武器[i]+":##z"+五轉用武器[i]+"#\r\n" ;
    }
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

    if (select === -1) {
        select = selection;
    }


    武器(selection,mode);
}

function 武器(selection,mode) {
    var i = -1;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++){
        cm.sendYesNo( show(五轉用武器[select],1,0,0,0,0) );
    } else if (status === i++){
        if( mode == 1){
            if( buy(五轉用武器[select],1,0,0,0,0) == true)
                cm.setPQLog("領取五轉用武器", 1, 1);
                cm.sendOk("兌換成功");      
            cm.dispose();
        } else if( mode == 0){
            cm.dispose();
        }        
        cm.dispose();
    }
}

//以下勿動

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

















