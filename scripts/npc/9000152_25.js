/* global cm */

var status = -1;
var select = -1;
var selected = -1;


//兌換 9週年楓葉裝備
var 楓葉裝 = Array (1003863,1012376,1052612,1102562,1113034,1122252,1132228,1212066,1222061,1232060,1242065,1252064,1592030,1302277,1312155,1322205,1332227,1352806,1352814,1352825,1362092,1372179,1382211,1402199,1412137,1422142,1432169,1442225,1452207,1462195,1472216,1482170,1492181,1522096,1532100,1542070,1552070,1342092,1262047,1353104,1582041,1272019,1282036,1252064,1592030,1099010,1098005,1352605,1352008,1352108,1352405,1352505,1352705,1352205,1352215,1352225,1352235,1352245,1352255,1352265,1352275,1352285,1352295,1352905,1352915,1352927,1352934,1352944,1352955,1352965,1352974,1353005,1353706,1353506,1353307);
var 楓葉裝花費道具 = Array([4001126,5000]);
var 楓葉裝花費楓幣    = 3500000;

//兌換 萬能療傷藥
var 萬能療傷藥 = 2022178;
var 萬能療傷藥數量 = 1;
var 萬能療傷藥花費道具 = Array(Array(4001126,500));

//兌換 經驗值
var 經驗值花費道具 = Array(Array(4001126,1));
var 獲得經驗值　= 100;

//兌換 技能精通秘笈
var 技能精通秘笈 = Array(2431789,2431790);
var 技能精通秘笈花費道具 = Array(Array(Array(4001126,800)),Array(Array(4001126,800)));
var 技能精通秘笈花費楓幣 = Array(3000000,5000000);

//兌換 獵人的幸運
var 獵人的幸運 = 2450000;
var 獵人的幸運數量 = 1;
var 獵人的幸運花費道具 = Array(Array(4001126,5000));

function start() {
        
    var str = "你好，請問您需要什麼服務呢？\r\n";
    str += "#L0##i4001126# 兌換 #b9週年楓葉裝備#k#l\r\n";
    str += "#L2##i4001126# 兌換 #b技能精通秘笈#k#l\r\n";
    //str += "#L3##i4001126# 兌換 #b經驗值#k#l\r\n";
    str += "#L4##i4001126# 兌換 #b萬能療傷藥#k#l\r\n";
    str += "#L5##i4001126# 兌換 #b獵人的幸運#k#l\r\n";
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

    switch (select) {
        case 0:
            兌換9週年楓葉裝備(selection,mode);
            break;
        case 2:
            兌換技能精通秘笈(selection,mode);
            break;        
        case 3: 
            兌換經驗值(selection,mode);
            break;
        case 4:
            兌換萬能療傷藥(selection,mode);
            break;        
        case 5: 
            兌換獵人的幸運(selection,mode);
            break;
        default :
            cm.dispose();
    }
}

function 兌換9週年楓葉裝備(selection,mode) {
    var i = -1;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        var str = "您需要哪件楓葉裝呢？\r\n";
        str += "防具價格為"+" #b楓幣 100萬元 與 " + "#i4001126##b5,000個#k\r\n";
        str += "武器價格為"+" #b楓幣 350萬元 與 " + "#i4001126##b5,000個#k\r\n";
        for(i=0;i<楓葉裝.length;i++){
            str += "#L" + i + "##i" +楓葉裝[i]+":#" ;
            if(i%5==4)
                str += "\r\n";
        }
        cm.sendSimple( str );
        
    } else if (status === i++){
        selected = selection;
        if( selected>=0 && selected<=6){
            楓葉裝花費楓幣 = 1000000;
        }
        cm.sendYesNo( show(楓葉裝[selection],1,0,楓葉裝花費楓幣,0,楓葉裝花費道具) );
    } else if (status === i++){
        if( mode == 1){
            if( buy(楓葉裝[selected],1,0,楓葉裝花費楓幣,0,楓葉裝花費道具) == true)
                cm.sendOk("兌換成功");      
            cm.dispose();
        } else if( mode == 0){
            cm.dispose();
        }        
        cm.dispose();
    }
}

function 兌換技能精通秘笈(selection,mode){
    var i = -1;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        var str = "您需要哪本技能精通秘笈呢？\r\n";        
        for(i=0;i<技能精通秘笈.length;i++){
            str += "#L" + i + "##i" +技能精通秘笈[i]+":##z"+技能精通秘笈[i]+"#" ;
            if(i%2==1)
                str += "\r\n";
        }
        cm.sendSimple( str );        
    } else if (status === i++) {
        selected = selection;
        cm.sendYesNo( show(技能精通秘笈[selection],1,0,技能精通秘笈花費楓幣[selection],0,技能精通秘笈花費道具[selection]) );
    } else if (status === i++) {
        if (buy(技能精通秘笈[selected],1,0,技能精通秘笈花費楓幣[selected],0,技能精通秘笈花費道具[selected]) == true)
            cm.sendOk("兌換成功");      
        cm.dispose();
    }else {
        cm.dispose();
    }

}

function 兌換經驗值(selection,mode){
    var i = -1;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        var str = ""
        str += "請問您要花多少楓葉兌換經驗值呢?\r\n";
        str += "#r楓葉#k ：#b經驗值#k = #r1#k ：#b100#k\r\n";
        str += "請輸入#i4001126#數量"
        cm.sendGetNumber(str,1,1,1000);
    } else if (status === i++) {
        經驗值花費道具[0][1]=selection;
        cm.sendYesNo(show(0,0,selection*獲得經驗值,0,0,經驗值花費道具));
    } else if (status === i++) {
        if( mode == 1){
            if(buy(0,0,經驗值花費道具[0][1]*獲得經驗值,0,0,經驗值花費道具) == true)
                cm.sendOk("兌換成功");
            cm.dispose();
        }else{
            cm.dispose();
        }
    }
}

function 兌換萬能療傷藥(selection,mode){
    var i = -1;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        var str = ""
        str += "請問您要得到多少萬能療傷藥呢?\r\n";
        str += "#r楓葉#k ：#b萬能療傷藥#k = #r500#k ：#b1#k\r\n";
        str += "請輸入#i2022178:#數量"
        cm.sendGetNumber(str,1,1,99999);
    } else if (status === i++) {
        萬能療傷藥數量 = selection;
        萬能療傷藥花費道具[0][1]=500*selection;
        cm.sendYesNo(show(萬能療傷藥,萬能療傷藥數量,0,0,0,萬能療傷藥花費道具));
    } else if (status === i++) {
        if( mode == 1){
            if(buy(萬能療傷藥,萬能療傷藥數量,0,0,0,萬能療傷藥花費道具)==true)
                cm.sendOk("兌換成功");
            cm.dispose();
        }else{
            cm.dispose();
        }
    }

}

function 兌換獵人的幸運(selection,mode){
    var i = -1;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        var str = ""
        str += "請問您要得到多少獵人的幸運呢?\r\n";
        str += "#r楓葉#k ：#b獵人的幸運#k = #r5000#k ：#b1#k\r\n";
        str += "請輸入#i2450000:#數量"
        cm.sendGetNumber(str,1,1,100);
    } else if (status === i++) {
        獵人的幸運數量 = selection;
        獵人的幸運花費道具[0][1]=5000*selection;
        cm.sendYesNo(show(獵人的幸運,獵人的幸運數量,0,0,0,獵人的幸運花費道具));
    } else if (status === i++) {
        if( mode == 1){
            if(buy(獵人的幸運,獵人的幸運數量,0,0,0,獵人的幸運花費道具)==true)
                cm.sendOk("兌換成功");
            cm.dispose();
        }else{
            cm.dispose();
        }
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
    if (花費楓點!=0)
        str += "#r花費楓點/樂豆點 : " + 花費楓點 + "\r\n";
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
        if(cm.getPlayer().getCSPoints(2)>=花費楓點){
            cm.getPlayer().modifyCSPoints(2,-花費楓點);
        }else if (cm.getPlayer().getCSPoints(2)+cm.getPlayer().getCSPoints(1) >= 花費楓點){
            var 現有楓點　=　cm.getPlayer().getCSPoints(2);
            cm.getPlayer().modifyCSPoints(2,- 現有楓點);
            cm.getPlayer().modifyCSPoints(1,- (花費楓點-現有楓點));
        }
        //扣除楓幣
        cm.gainMeso(-花費楓幣);
        //扣除裝備
        if (花費道具陣列!=0){
            for(i=0;i<花費道具陣列.length;i++){
                if(花費道具陣列[i][1]>32767){
                    for(k=1;k<花費道具陣列[i][1]/32767;k++){
                        cm.gainItem(花費道具陣列[i][0],-(32767));
                    }
                    cm.gainItem(花費道具陣列[i][0],-(花費道具陣列[i][1]%32767));
                }else{
                    cm.gainItem(花費道具陣列[i][0],-(花費道具陣列[i][1]));
                }
            }
        }
        //給予裝備
        if(獲得道具 != 0 && 獲得數量!= 0){
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











