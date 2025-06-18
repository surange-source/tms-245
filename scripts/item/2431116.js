var status = 0;
var 聖誕限定 =[
[3015789,[[2431116,1000]]],
[3015973,[[2431116,7500]]],
[3015994,[[2431116,5000]]],
[3018003,[[2431116,2500]]],
//[3015698,[[2431116,1000]]],
[3018008,[[2431116,2500]]],
[3015701,[[2431116,1000]]],
[3015702,[[2431116,1250]]],
[3015703,[[2431116,1250]]],
[3015705,[[2431116,10000]]],
[3015748,[[2431116,1250]]],
[3015753,[[2431116,1250]]],
[3015755,[[2431116,7500]]],
[3015788,[[2431116,5000]]],
[3015813,[[2431116,7500]]],
[3018019,[[2431116,1000]]],
[3018023,[[2431116,2500]]],
[3018229,[[2431116,7500]]]
];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var str = "期間限定兌換，若未在期間內兌換完畢，將必須等到明年\r\n";
        for(i=0;i<聖誕限定.length;i++){
            str += "#L" + i + "##i" +聖誕限定[i][0]+":#需要"+聖誕限定[i][1][0][1]+"個#i"+聖誕限定[i][1][0][0]+":# " ;
            if(i%2==1)
                str += "\r\n";
        }
        im.sendSimple( str );
    } else if (status == 1) {
        if( mode == 1){
            if(buy(聖誕限定[selection][0],1,0,0,0,聖誕限定[selection][1])==true)
                im.sendOk("兌換成功");
            im.dispose();
        }else{
            im.dispose();
        }
    }
    return;
}
function buy(獲得道具,獲得數量,獲得經驗,花費楓幣,花費楓點,花費道具陣列){
    var str = "";    
    if ( im.getPlayer().getCSPoints(2)+im.getPlayer().getCSPoints(1)< 花費楓點){
        str += "#r楓點/樂豆點不足: 少 #e"+formatNumber(花費楓點-(im.getPlayer().getCSPoints(2)+im.getPlayer().getCSPoints(1)))+"#n元#k\r\n";
    }    
    if (im.getMeso() < 花費楓幣){
        str += "#r楓幣不足       : 少 #e"+formatNumber(花費楓幣-im.getMeso())+"#n元#k\r\n";
    }
    if (花費道具陣列!=0){
        for(i=0;i<花費道具陣列.length;i++){
            if( im.haveItem( 花費道具陣列[i][0],花費道具陣列[i][1]) == false ){
                str += "#r道具不足       : #i"+花費道具陣列[i][0] +":#少 #e"+　(花費道具陣列[i][1]-im.itemQuantity(花費道具陣列[i][0]))+"#n個\r\n";
            }
        }
    }
    if (im.canHold(獲得道具,獲得數量)==false && 獲得道具 != 0)
        str += "#r空間不足       : 無法獲得 #i"+獲得道具+"# #e"+獲得數量+"#n個";
        
    if( str != "" ){
        //確認失敗，顯示缺少物品
        im.sendOk( str );
        return false;
    }else{
        //確認成功，開始購買
        //扣除楓點與樂豆點
        if(im.getPlayer().getCSPoints(2)>=花費楓點){
            im.getPlayer().modifyCSPoints(2,-花費楓點);
        }else if (im.getPlayer().getCSPoints(2)+im.getPlayer().getCSPoints(1) >= 花費楓點){
            var 現有楓點　=　im.getPlayer().getCSPoints(2);
            im.getPlayer().modifyCSPoints(2,- 現有楓點);
            im.getPlayer().modifyCSPoints(1,- (花費楓點-現有楓點));
        }
        //扣除楓幣
        im.gainMeso(-花費楓幣);
        //扣除裝備
        if (花費道具陣列!=0){
            for(i=0;i<花費道具陣列.length;i++){
                if(花費道具陣列[i][1]>32767){
                    for(k=1;k<花費道具陣列[i][1]/32767;k++){
                        im.gainItem(花費道具陣列[i][0],-(32767));
                    }
                    im.gainItem(花費道具陣列[i][0],-(花費道具陣列[i][1]%32767));
                }else{
                    im.gainItem(花費道具陣列[i][0],-(花費道具陣列[i][1]));
                }
            }
        }
        //給予裝備
        if(獲得道具 != 0 && 獲得數量!= 0){
            im.gainItem(獲得道具,獲得數量);
        }
        //給予經驗
        im.gainExp(獲得經驗);
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