/* global cm */
var status = 0;
var select = -1;
var selected = -1;
var select0= -1;
var select1= -1;

//商店選項
var 商店選項 = Array(
    ["戰地裝", false],
    ["經驗項鍊 #r★土豪必買★#k", true],
    ["潛能系列", true],
    ["白金槌子、黃金鐵鎚50%、黃金鐵鎚100%", true],
    ["時裝鐵砧", false]
);


//點數換潛能系列
var 潛能系列 = Array(2049417,2049500,2048309,2048300,2048301,2048304,2711000,2711003,2711004,5062500,4132001);
var 潛能系列花費點數 = Array(100,125,100,85,100,125,35,65,75,50,450,600,5000);
//點數換全圖寵物拾取
var 點數換全圖寵物拾取道具 = 4000813;
var 點數換全圖寵物拾取道具持續時間 = Array(1,2,3);
var 點數換全圖寵物拾取道具花費點數 = Array(200,380,550);
//點數換槌子
var 點數換槌子道具 = Array(2470002,2470003,2472000);
var 點數換槌子花費點數 = Array(20,100,100);
//點數換時裝鐵砧
var 點數換時裝鐵砧獲得道具 = Array(5062400,5062404);
var 點數換時裝鐵砧花費點數 = Array(1350,1350);

var 戰地裝 = Array(
    1202199, // 五個碎片的橘子樂園圖騰
    1202246, // 五個碎片的橘子樂園圖騰
    1202259, // 五個碎片的橘子樂園圖騰
    1112922, // 奇多豹掌戒指
    1112922, // 奇多豹掌戒指
    1112922, // 奇多豹掌戒指
    1112922, // 奇多豹掌戒指
    1162007, // 鬥神的戰術教本<實戰篇>
    1122019, // 楓葉之心
    1122001, // 綠色蝶形領結
    1132044, // 力氣綠色特殊腰帶
    1003450, // 皮卡啾帽
    1012303, // 大力氣皮諾丘的鼻子
    1022047, // 貓頭鷹
    1040006, // 白色背心(男)
    1041002, // 白色無袖段T(女)
    1062000, // 破爛牛仔褲
    1072665, // 洪武團靴子
    1032033, // 守護石耳環
    1152090, // 月妙肩章
    1082149, // 褐色工作手套
    1662034, // 未來機器人 (女)
    1190538, // 五個碎片的橘子樂園能源
    1182281, // 五個碎片的橘子樂園胸章
    1142627, // 地球防禦隊勳章
    1102422, // 洪武團披風
    1672043 // 鋼鐵未來心臟
);


var priceType = 3;
var priceIcon = 2431872;

function start() {
    if ( !cm.getPlayer().isGm()){
        //cm.sendOk("管理員專用");
        //cm.dispose();
        //return;
    }
    var str = "你好，請問您需要買什麼呢？\r\n";
    for(k=0;k<商店選項.length;k++){
        if (!商店選項[k][1]) {
            continue;
        }
        str += "#L"+k+"##i" + priceIcon + "# 兌換 #b"+商店選項[k][0]+"#k#l\r\n";
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
        
    var i = 1;
    
    if (select === -1) {
        select = selection;
    }
    
    switch (select){
        case 0: {
            cm.dispose();
            return;
            if (status == i++) {
                var eqpList = "";
                for (var eq = 0; eq < 戰地裝.length; eq++) {
                    eqpList += "#i" + 戰地裝[eq] + ":# ";
                }
                cm.sendYesNo("兌換戰地裝需要消費20000" + cm.getPriceName(priceType) + "，你確定要兌換嗎?\r\n內容物包含\r\n" + eqpList);
            } else if (status == i++) {
                if (cm.getSpace(1) < 戰地裝.length) {
                    cm.sendOk("裝備欄位不足");
                } else {
                    var cost = 20000;
                    var surplusAmount = cm.getPrice(priceType);
                    if (surplusAmount < cost){
                        cm.sendOk("#r" + cm.getPriceName(priceType) + "不足: 少 #e"+formatNumber(cost-(surplusAmount))+"#n點#k\r\n");
                    } else if (cm.gainPrice(priceType, -cost)) {
                        var eqpList = "";
                        for (var eq = 0; eq < 戰地裝.length; eq++) {
                            cm.gainItem(戰地裝[eq], 1);
                            eqpList += "#i" + 戰地裝[eq] + ":# ";
                        }
                        cm.sendOk("兌換完成，你獲得了\r\n" + eqpList);
                    } else {
                        cm.sendOk("發生未知錯誤");
                    }
                }
                cm.dispose();
            } else {
                cm.dispose();
            }
            break;
        }
        case (1):
            點數兌換經驗項鍊( selection,mode );
            break;
        case (2):
            點數兌換潛能系列( selection,mode );
            break;
        case (3):
            點數換槌子( selection,mode );
            break;
    }
}
function 點數兌換經驗項鍊(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = "需要購買甚麼呢?\r\n";
        //str += "#L0##i" + priceIcon + "# 兌換 #b#z5530068##k#l\r\n";
        str += "#L1##i" + priceIcon + "# 兌換 #b#z1122207# #l\r\n";
        str += "\r\n力量+200 敏捷+200 智力+200 幸運+200 攻擊力+200";
        str += "\r\n魔法攻擊力+200 防禦+250 BOSS傷害+60 無視防禦+25";
        cm.sendSimple( str ); 
    } else if (status === i++) {
        select0 = selection;
        if(select0==0)
            cm.sendYesNo(show(5530068,1,0,0,200,0));
        if(select0==1)
            cm.sendYesNo(show(1122207,1,0,0,20000,0));
    } else if (status === i++) {
        if(select0==0){
            if(buy(5530068,1,0,0,200,0)==true)
                cm.sendOk("兌換成功");
                cm.dispose();
            }
        if(select0==1){
            if( buy1122207(20000) )
                cm.sendOk("兌換成功");                
        }
    } else {
        cm.dispose();
    }
}
function 點數兌換潛能系列(selection,mode){
    //#fUI/UIWindow.img/QuestIcon/7/0#
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = "您需要哪件道具呢？\r\n";
        for(i=0;i<潛能系列.length;i++){
            str += "#L" + i + "##i" +潛能系列[i]+":# #b#z"+潛能系列[i]+"##k\r\n" ;
        }
        cm.sendSimple( str ); 
    } else if (status === i++) {
        select0 = selection;
        var str = ""
        str += "請問您要買多少#i"+潛能系列[select0]+"#呢?\r\n";
        str += "#r" + cm.getPriceName(priceType) + "#k ：#b#z"+潛能系列[select0]+"##k = #r"+潛能系列花費點數[select0]+"#k ：#b1#k\r\n";
        str += "請輸入#i"+潛能系列[select0]+"#數量"
        cm.sendGetNumber(str,1,1,99);
    } else if (status === i++) {
        select1 = selection;
        潛能系列花費點數[select0]=潛能系列花費點數[select0]*select1;
        cm.sendYesNo(show(潛能系列[select0],select1,0,0,潛能系列花費點數[select0],0));
    } else if (status === i++) {
        if(buy(潛能系列[select0],select1,0,0,潛能系列花費點數[select0],0)==true)
            cm.sendOk("兌換成功");
    } else {
        cm.dispose();
    }
}
function 點數換槌子(selection,mode){
    var i = 1;
    if (status < i) {
        cm.dispose();
    } else if (status === i++) {
        var str = "";
        for(i=0;i<點數換槌子道具.length;i++){
            str += "#L" + i + "##i" +點數換槌子道具[i]+":# #b#z"+點數換槌子道具[i]+"##k\r\n" ;
        }
        cm.sendSimple( str );
    } else if (status === i++) {        
        select0 = selection;
        var str = ""
        str += "請問您要換多少#b#z"+點數換槌子道具[select0]+"##k呢?\r\n";
        str += "#r" + cm.getPriceName(priceType) + "#k ：#b#z"+點數換槌子道具[select0]+"##k = #r"+點數換槌子花費點數[select0]+"#k ：#b1#k\r\n";
        str += "請輸入#i"+點數換槌子道具[select0]+"#數量"
        cm.sendGetNumber(str,1,1,100);
    } else if (status === i++) {
        select1 = selection;
        cm.sendYesNo(show(點數換槌子道具[select0],select1,0,0,點數換槌子花費點數[select0]*select1,0));
    } else if (status === i++) {
        if(buy(點數換槌子道具[select0],select1,0,0,點數換槌子花費點數[select0]*select1,0)==true)
            cm.sendOk("兌換成功");
    } else {
        cm.dispose();
    }
}




function show(獲得道具,獲得數量,獲得經驗,花費楓幣,花費點數,花費道具陣列){
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
    switch((花費點數<0)?-1:(花費點數==0)?0:(花費點數>0)?1:0){
        case 1:
            str += "#r花費" + cm.getPriceName(priceType) + " : " + formatNumber(花費點數) + "\r\n";
            break;
        case -1:
            str += "#b獲得" + cm.getPriceName(priceType) + " : " + formatNumber(-花費點數)+ "\r\n";
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




function buy(獲得道具,獲得數量,獲得經驗,花費楓幣,花費點數,花費道具陣列){
    var str = "";
    var surplusAmount = cm.getPrice(priceType);
    if (surplusAmount < 花費點數){
        str += "#r" + cm.getPriceName(priceType) + "不足: 少 #e"+formatNumber(花費點數-(surplusAmount))+"#n點#k\r\n";
    }    
    if (cm.getMeso() < 花費楓幣){
        str += "#r楓幣不足       : 少 #e"+formatNumber(花費楓幣-cm.getMeso())+"#n#k\r\n";
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
        //扣除點數
        cm.gainPrice(priceType, -花費點數);
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


function buy寵物(獲得道具,獲得數量,獲得經驗,花費楓幣,花費點數,花費道具陣列){
    var str = "";
    var surplusAmount = cm.getPrice(priceType);
    if (surplusAmount < 花費點數){
        str += "#r" + cm.getPriceName(priceType) + "不足: 少 #e"+formatNumber(花費點數-(surplusAmount))+"#n點#k\r\n";
    }    
    if (cm.getMeso() < 花費楓幣){
        str += "#r楓幣不足       : 少 #e"+formatNumber(花費楓幣-cm.getMeso())+"#n#k\r\n";
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
        //扣除點數
        cm.gainPrice(priceType, -花費點數);
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
            cm.cm.gainItemPeriod(獲得道具,獲得數量,30);
        }
        //給予經驗
        cm.gainExp(獲得經驗);
        return true;
    }
}

function buy1122207(花費點數){
    var 獲得道具 = 1122207;
    var 獲得數量 = 1;
    var str = "";    
    if (cm.getPrice(priceType)< 花費點數){
        str += "#r" + cm.getPriceName(priceType) + "不足: 少 #e"+formatNumber(花費點數-(cm.getPlayer().getCSPoints(2)+cm.getPlayer().getCSPoints(1)))+"#n元#k\r\n";
    }        
    if (cm.canHold(獲得道具,獲得數量)==false && 獲得道具 != 0)
        str += "#r空間不足       : 無法獲得 #i"+獲得道具+"# #e"+獲得數量+"#n個";
        
    if( str != "" ){
        //確認失敗，顯示缺少物品
        cm.sendOk( str );
        return false;
    }else{
        //確認成功，開始購買
        //扣除點數
        cm.gainPrice(priceType, -花費點數);
        
        //給予裝備
        if(獲得道具 != 0 || 獲得數量!= 0){
            var itemId = 獲得道具;
            var ii = cm.getItemInfo();
            //var toDrop = ii.randomizeStats(ii.getEquipById(itemId)).copy(); // 生成一個Eq 
            var toDrop = ii.getEquipById(itemId).copy(); // 生成一個Eq  
            toDrop.setStr(200); //力量
            toDrop.setInt(200); //智力
            toDrop.setLuk(200); //幸運
            toDrop.setDex(200); //敏捷
            
            toDrop.setPad(200);//物理攻擊                
            toDrop.setMad(200); //魔法攻擊
            
            toDrop.setPdd(250); //物理防禦
            //toDrop.setMdd(250); //魔法防禦                
            
            toDrop.setBossDamage(60); //BOSS傷害
            toDrop.setIgnorePDR(25); //無視防禦
            
            //toDrop.setExpiration(java.lang.System.currentTimeMillis() + period); // 期限
            cm.addByItem(toDrop);
        }
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











