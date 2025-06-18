var tt = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
// 每個階段禮包所需的儲值數
var condition = new Array(500, 1000, 3000, 5000, 7500, 10000, 15000, 20000, 30000, 50000, 75000, 100000);
// 禮包內容
var reward = new Array(
    //Array(禮包編號,道具ID,道具數量,男0 女1 不限-1,[力,智,敏,幸,HP,MP,物攻,魔功,物防,王傷,無視]),
    
    
    // 禮包0 500
    Array(0, 1003765, 1, 0, [15,15,15,15,null,null,15,15,null,null,null]),  
    Array(0, 1003953, 1, 1, [15,15,15,15,null,null,15,15,null,null,null]),
    
    // 禮包1 1000
    Array(1, 1000050, 1, 0, [10,10,10,10,5000,5000,10,10,350,null,null]),  
    Array(1, 1001076, 1, 1, [10,10,10,10,5000,5000,10,10,350,null,null]),

    // 禮包2 3000
    Array(2, 1182136, 1, -1, [20,20,20,20,null,null,null,null,null,10,5]),

    // 禮包3 5000
    Array(3, 1102786, 1, -1, [30,30,30,30,5000,5000,10,10,200,20,20]),    
    
    // 禮包4 7500
    Array(4, 1102724, 1, 0, [30,30,30,30,7500,7500,20,20,350,35,20]),
    Array(4, 1102723, 1, 1, [30,30,30,30,7500,7500,20,20,350,35,20]),

    // 禮包5 10000
    Array(5, 1190005, 1, -1, [30,30,30,30,null,null,45,45,null,15,10]),
    Array(5, 5000870, 1, -1, null),
    Array(5, 1802653, 1, -1, null),

    // 禮包6 15000
    Array(6, 1162084, 1, -1, [30,30,30,30,3000,3000,25,25,300,30,10]),

    // 禮包7 20000
    Array(7, 5000871, 1, -1, null),
    Array(7, 1802653, 1, -1, null),
    
    // 禮包8 30000
    Array(8, 1142541, 1, -1, [50,50,50,50,null,null,60,60,500,40,30]),
    Array(8, 5000872, 1, -1, null),
    Array(8, 1802653, 1, -1, null),
    
    // 禮包9 50000
    Array(9, 1112127, 1, -1, [50,50,50,50,null,null,60,60,500,40,40]),
    Array(9, 1052723, 1, -1, [200,200,200,200,null,null,300,300,700,50,50]),
    
    // 禮包10 75000
    Array(10, 1122210, 1, -1, [100,100,100,100,null,null,300,300,700,50,30]), 
    Array(10, 1122296, 1, -1, [300,300,300,300,null,null,300,300,null,60,15]), 
    
    // 禮包11 100000
    Array(11, 1202193, 1, -1, [1000,1000,1000,1000,null,null,1000,1000,100,60,30]), 
    Array(11, 1182158, 1, -1, [1000,1000,1000,1000,null,null,1000,1000,100,60,15])
    //Array(13, 2431770, 1),  
);


var sel;
var status = -1;
var text;
var ljname;
var curlevel = -1;;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    if ( cm.getPlayerStat("GM") == 0 ||  cm.getPlayerStat("ADMIN") == 0){
        //cm.dispose();
        //return;
    }    
    
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        var revenue = cm.getHyPay(2);
        sel = selection;
        text = "\t\t\t" + tt + " #e#b"+cm.getChannelServer().getServerName()+"▲儲值禮包中心#k#n " + tt + "\r\n\r\n";
        text += "#d#e當前總儲值金額數量： #r" + revenue.formatMoney(0, "") + " #d元#k\r\n#e";
        
        for (var i = 0; i < condition.length; i++) {

            if (cm.getEventCount("累計儲值禮包" + i, 1) == 1) {
                text += "#d#L" + i + "#" + tt + " #b[已領取]#d累計儲值福利 #r\t\t\t" + condition[i] + "#l\r\n";
                curlevel = curlevel == -1 ? i : curlevel;
            } else if (cm.getHyPay(2) >= condition[i]) { 
                text += "#d#L" + i + "#" + tt + " #g[可領取]#d累計儲值福利 #r\t\t\t" + condition[i] + "#l\r\n";
                 } else {
                     text += "#d#L" + i + "#" + tt + " #r[未完成]#d累計儲值福利 #r\t\t\t" + condition[i] + "#l\r\n";
            }
        }
        text += "#k";
        cm.sendSimple(text);
    } else if (status == 1) {
        sel = selection;
        text = "\t\t\t#e#r- 累計儲值" + condition[selection] + "元福利 -#k#n\r\n\r\n";
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == selection) {
                text += "\t\t\t#i" + reward[i][1] + "# #z" + reward[i][1] + "# [" + reward[i][2] + "個]\r\n";
            }
        }
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (cm.getEventCount("累計儲值禮包" + sel, 1) == 1) {
            cm.sendOk("#e#r\r\n\r\n\t\t這個禮包您已經領取過了");
            status = -1;
            //cm.dispose();
            return;
        }
        if (cm.getHyPay(2) < condition[sel]) {
            cm.playerMessage(1, "累計金額未達標！");
            cm.dispose();
            return;
        }

        var rewardlist = new Array();
        for (var i = 0; i < reward.length; i++) {
            if (reward[i][0] == sel) {
                rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3], reward[i][4]));
            }
        }
        if (!cm.canHoldSlots(rewardlist.length)) {
            cm.sendOk("包裹空間不足，請確保包裹每個欄位有至少 " + rewardlist.length + " 格空間");
            cm.dispose();
            return;
        }
        for (var i = 0; i < rewardlist.length; i++) {
            //領取道具
            if (rewardlist[i][3] != null){
                if ( cm.getPlayer().getGender() == rewardlist[i][2]  || rewardlist[i][2] == -1){
                    buyCustom( rewardlist[i][0], rewardlist[i][1], rewardlist[i][3]);                    
                }            
            }else{
                for (var k = 0; k < rewardlist[i][1] ; k++){
                    cm.gainItem(rewardlist[i][0], 1);
                }            
            }
            
        }
        cm.setEventCount("累計儲值禮包" + sel, 1);
        cm.playerMessage(1, "領取成功");
       
        cm.dispose();
    }
}

Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "　";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

function buyCustom(獲得道具,獲得數量,素質){
    var 力量 = 素質[0];
    var 智力 = 素質[1];
    var 敏捷 = 素質[2];
    var 幸運 = 素質[3];
    
    var 血量 = 素質[4];
    var 魔量 = 素質[5];
    var 物攻 = 素質[6];
    var 魔攻 = 素質[7];
    
    var 防禦 = 素質[8];
    var 王傷 = 素質[9];
    var 無視 = 素質[10];
    
    var str = "";            
    if (cm.canHold(獲得道具,獲得數量)==false && 獲得道具 != 0)
        str += "#r空間不足       : 無法獲得 #i"+獲得道具+"# #e"+獲得數量+"#n個";
        
    if( str != "" ){
        //確認失敗，顯示缺少物品
        cm.sendOk( str );
        return false;
    }else{
                
        //給予裝備
        if(獲得道具 != 0 && 獲得數量!= 0){
            var itemId = 獲得道具;
            var ii = cm.getItemInfo();
            //var toDrop = ii.randomizeStats(ii.getEquipById(itemId)).copy(); // 生成一個Eq 
            var toDrop = ii.getEquipById(itemId).copy(); // 生成一個Eq  
            if (力量 != null) 
                toDrop.setStr(力量);
            if (智力 != null) 
                toDrop.setInt(智力);    
            if (敏捷 != null)
                toDrop.setDex(敏捷);
            if (幸運 != null)
                toDrop.setLuk(幸運);
            
            if (血量 != null)
                toDrop.setHp(血量);
            if (魔量 != null)
                toDrop.setMp(魔量);
            
            if (物攻 != null)
                toDrop.setPad(物攻);    
            if (魔攻 != null)            
                toDrop.setMad(魔攻); 
            
            if (防禦 != null)
                toDrop.setPdd(防禦);            
            
            if (王傷 != null)
                toDrop.setBossDamage(王傷);
            if (無視 != null)
                toDrop.setIgnorePDR(無視); 
            
            //toDrop.setExpiration(java.lang.System.currentTimeMillis() + period); // 期限
            cm.addByItem(toDrop);
        }
        return true;
    }
}