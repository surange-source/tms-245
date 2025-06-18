var status = -1
var questid = [1460, 1461, 1462, 1463, 1464, 1465, 1466, 1478]

function start() {
    action(1, 0, 0)
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose()
    } else {
        if (mode == 1)
            status++
        else
            status--

        if (status == 0) {
            cm.sendOk("請選擇功能:\r\n\r\n" + (cm.isQuestFinished(1465) ? "" : "#L0#免費完成所有V轉任務#l\r\n")  + (cm.isQuestFinished(1484) ? "" : "#L3#開啟真實符文欄位#l\r\n") + "#L1#購買1000個核心碎片 2500里程#l\r\n#L2#打開V核心UI#l");
        } else if (status == 1) {
            if (selection == 0) {                
                if(!cm.canHold(2435770, 10)){
                    cm.sendOk("兌換失敗，空間不足");
                    cm.dispose();
                    return;
                }
                if (cm.isQuestFinished(1465)) {
                    cm.dispose();
                    return;
                }
                cm.gainItem(2435770,10);
                cm.forceCompleteQuest(1465);
                cm.forceCompleteQuest(6500);
                cm.show5thJobEffect();
                cm.sendOk("轉職完成且兌換成功");
                return;
            } else if (selection == 1) {
                if (buy(0,0,0,0,2500,0) == true) {
                    cm.gainVCraftCore(1000);
                    cm.sendOk("領取完成,獲得1000個核心碎片，消耗2500楓點");
                    cm.dispose();
                } else {
                    cm.dispose();
                    return;
                }

            } else if (selection == 2) {
                if (cm.isQuestFinished(1465)) {
                    cm.openUI(1131);
                } else {
                    cm.sendOk("我還無法為你提供服務。！");
                }
            } else if (selection == 3) {
                if (cm.getLevel() < 260) {
                    cm.sendOk("開啟真實符文欄位需要等級達到260！");
                } else if (!cm.isQuestFinished(1484)) {
                    cm.forceCompleteQuest(1484);
                }
            }
            cm.dispose();
        } else if (status == 2) {
            cm.openUI(1130);
            cm.dispose();
        }
    }
}

function show(獲得道具,獲得數量,獲得經驗,花費楓幣,花費里程,花費道具陣列){
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
    switch((花費里程<0)?-1:(花費里程==0)?0:(花費里程>0)?1:0){
        case 1:
            str += "#r花費里程 : " + formatNumber(花費里程) + "\r\n";
            break;
        case -1:
            str += "#b獲得楓點 : " + formatNumber(-花費里程)+ "\r\n";
            break;
        case 0:
    }    
    if (花費里程!=0)
        str += "#r花費里程 : " + 花費里程 + "\r\n";
    if (花費道具陣列!=0){
        for(i=0;i<花費道具陣列.length;i++){
            str += "#r花費道具        : #i"+花費道具陣列[i][0]+":##z" + 花費道具陣列[i][0] +"# "+ 花費道具陣列[i][1]+ "個\r\n";
        }
    }
    str += "                                      #d#e是否確定購買？#k#n";
    return str ;
}
function buy(獲得道具,獲得數量,獲得經驗,花費楓幣,花費里程,花費道具陣列){
    var str = "";    
    if (cm.getPrice(3)< 花費里程){
        str += "#r里程不足: 少 #e"+formatNumber(花費里程-cm.getPrice(3))+"#n點#k\r\n";
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
        //扣除里程
        cm.gainPrice(3, -花費里程);
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









