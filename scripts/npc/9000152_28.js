/* global cm */

//黃金楓葉鑽石兌換楓幣
var 黃金楓葉鑽石兌換楓幣需求道具 = Array([[4033079,1]]);
//黃金楓葉鑽石兌換時裝
var 黃金楓葉鑽石兌換時裝獲得道具 = Array(1022231,1022215,1022197,1022237,1022212);
var 黃金楓葉鑽石兌換時裝敘述 = Array("怪物防禦力無視#b+50#k BOSS攻擊時傷害#b+10%#k",
"攻擊力#r-50#k 魔法攻擊力#r-50#k \r\n   怪物防禦力無視#b+60#k BOSS攻擊時傷害#b+30%#k",
"攻擊力#b+10#k 魔法攻擊力#b+10#k \r\n   怪物防禦力無視#b+30%#k BOSS攻擊時傷害#b+30%#k",
"攻擊力#b+10#k 魔法攻擊力#b+10#k \r\n   怪物防禦力無視#b+100%#k BOSS攻擊時傷害#b+40%#k",
"攻擊力#b+20#k 魔法攻擊力#b+20#k \r\n   怪物防禦力無視#b+100%#k BOSS攻擊時傷害#b+50%#k");
var 黃金楓葉鑽石兌換時裝需求道具 = Array([[4033079,2]],[[4033079,4]],[[4033079,6]],[[4033079,10]],[[4033079,20]]);



var status = 0;
var select = -1;
var selected = -1;
var select0= -1;
var select1= -1;

function start() {
    if ( cm.getPlayerStat("GM") == 0 ||  cm.getPlayerStat("ADMIN") == 0){
        //cm.dispose();
        //return;
    }    
    var str = "你好，請問您需要換什麼呢？\r\n";    
    str += "#L0##i4033079# 換 #b楓幣#k#l\r\n";
    str += "#L1##b楓幣#k 換 #b#i4033079##l\r\n";
    //str += "#L2##i4033079# 兌換 #b時裝#k#l\r\n";
    cm.sendSimple( str );
}

function action(mode, type, selection) {
    
    if (mode === 1) {
        status++;
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
            黃金楓葉鑽石兌換楓幣( selection,mode );
            break;
        case (1):            
            楓幣兌換黃金楓葉鑽石( selection,mode );
            break;
        case (2):            
            黃金楓葉鑽石兌換時裝( selection,mode );
            break;
        
    }
}

function 黃金楓葉鑽石兌換楓幣(selection,mode){
    var i = 0;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        cm.sendYesNo(show(0,0,0,-1000000000,0,黃金楓葉鑽石兌換楓幣需求道具[0]));
    } else if (status === i++) {
        if(buy(0,0,0,-1000000000,0,黃金楓葉鑽石兌換楓幣需求道具[0])==true)
            cm.sendOk("兌換成功");
    } else {
        cm.dispose();
    }
}
function 楓幣兌換黃金楓葉鑽石(selection,mode){
    var i = 0;
    
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        cm.sendYesNo(show(4033079,1,0,1100000000,0,0));
    } else if (status === i++) {
        if(buy(4033079,1,0,1100000000,0,0)==true)
            cm.sendOk("兌換成功");
        cm.dispose();
    } else if (status === i++) {
    } else {
        cm.dispose();
    }
}
function 黃金楓葉鑽石兌換時裝(selection,mode){
    var i = 0;
    if (status <= i++) {
        cm.dispose();
    } else if (status === i++) {
        if ( cm.getPlayerStat("GM") == 0 ||  cm.getPlayerStat("ADMIN") == 0){
            //cm.dispose();
            //return;
        }    
        var str = "";
        for(i=0;i<黃金楓葉鑽石兌換時裝獲得道具.length;i++){
            str += "#L" + i + "##i" +黃金楓葉鑽石兌換時裝獲得道具[i]+":# #b#z" +黃金楓葉鑽石兌換時裝獲得道具[i]+"##k\r\n";
            str += "   "+黃金楓葉鑽石兌換時裝敘述[i]+"\r\n";
        }
        cm.sendSimple( str );
    } else if (status === i++) {
        select0 = selection;
        cm.sendYesNo(show(黃金楓葉鑽石兌換時裝獲得道具[select0],1,0,0,0,黃金楓葉鑽石兌換時裝需求道具[select0]));
    } else if (status === i++) {
        if(buy(黃金楓葉鑽石兌換時裝獲得道具[select0],1,0,0,0,黃金楓葉鑽石兌換時裝需求道具[select0]))
            cm.sendOk("兌換成功");
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
    if (花費楓點!=0)
        str += "#r花費楓點/樂豆點 : " + 花費楓點 + "\r\n";
    if (花費道具陣列!=0){
        //str += 花費道具陣列[0][0] + "\r\n";
        for(i=0;i<花費道具陣列.length;i++){
            str += "#r花費道具        : #v"+花費道具陣列[i][0]+"##z" + 花費道具陣列[i][0] +"# "+ 花費道具陣列[i][1]+ "個\r\n";
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











