/*  This is mada by Kent    
 *  This source is made by Funms Team
 *  功能：等級送禮
 *  @Author Kent 
 */
var hhh ="#fEffect/CharacterEff/1102232/2/0#";//星星
var hhh1 ="#fEffect/CharacterEff/1112905/0/1#";//愛心
var status = 0;
var bossid = "等級禮包";
var giftLevel = Array(10, 30, 100, 180, 200, 220, 230,240,250,260,270,275);
//var 改屬性裝備 = Array(1112915,1002509,1012365,1082002,1062001,1072004,1012164);
var giftContent = Array(
        
    //10級
    Array(1112942, 1, 0 ,1),
    Array(1002509, 1, 0 ,1), 
    Array(1012365, 1, 0 ,1), 
    Array(1082002, 1, 0 ,1), 
    Array(1062001, 1, 0 ,1), 
    Array(1072004, 1, 0 ,1), 
    Array(5000054, 1, 0), 
    Array(2001527, 500, 0),
    Array(2001526, 500, 0),
    Array(2431549, 1, 0),
    Array(5680641, 1, 0),
    
    //30級
    Array(1012167, 1, 1),
    Array(2431856, 1, 1),
    
    
    //100級
    Array(2000005, 200, 2),
    Array(2430343, 1, 2),
    Array(2431734, 1, 2),
    Array(5680641, 1, 2),
    
    //180級
    Array(2431353, 1, 3),
    Array(5680641, 1, 3),
        
    //200級
    Array(2430307, 1, 4),
    
    
    //220級
    Array(2432733, 1, 5),    
    
    
    //230級
    Array(2431797, 1, 6),
    
    
    //240
    Array(2431137, 1, 7),
    
    
    //250
    Array(2432309, 1, 8),
    Array(3014005, 1, 8),
    
    
    //260
    Array(2432582, 1, 9),
    Array(3015745, 1, 9),
    
    
    //270
    Array(2432996, 1, 10),
    Array(3015705, 1, 10),
    
    
    //275
    Array(3015762, 1, 11),
    Array(2434379, 1, 11)
    
 
);
var giftId = -1;
var giftToken = Array();
var gifts = null;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
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
        var text = "";
        text += "嘿，我為你準備了許多寶貝，等你達到相應等級的時候就可以領取了，另外點擊可以查看禮包內容呢，快搶先看看吧！\r\n";
        for (var key in giftLevel) {
            var tips = "";
            giftToken[key] = false;
            if (cm.getChar().getLevel() >= giftLevel[key]) {
                if (cm.getPQLog(bossid + key, 1) == 0) {
                    tips = "(可領取)";
                    giftToken[key] = true;
                } else {
                    tips = "#g(已領取)#b";
                }
            } else {
                tips = "#r(等級不足)#b";
            }
            text += hhh1+"#b#L" + (parseInt(key)) + "#領取#r#e" + giftLevel[key] + "#n#b級等級禮包 " + tips + "#l#k\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        giftId = parseInt(selection);
        var text = "#r#e" + giftLevel[giftId] + "#n#b級禮包內容：\r\n";
        gifts = getGift(giftId);
        for (var key in gifts) {
            var itemId = gifts[key][0];
            var itemQuantity = gifts[key][1];
            text += "#v" + itemId + "##b#t" + itemId + "##k #rx " + itemQuantity + "#k\r\n";
        }
        text += "\r\n#d是否現在就領取該禮包？#k";
        cm.sendYesNo(text);
    } else if (status == 2) {
        if (giftId != -1 && gifts != null) {
            if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 9) {
                cm.sendOk("您的背包空間不足，請保證每個欄位至少8格的空間，以避免領取失敗。");
                cm.dispose();
                return;
            }
            var job = cm.getChar().getJob();
            /*
            if ((job == 10000 || job == 10100 || job == 10110 || job == 10111 || job == 10112) && cm.getChar().getLevel() < 140) {
                cm.sendOk("神之子需要到140才能領取！");
                cm.dispose();
                return;
            }
            */
            if (giftToken[giftId] && cm.getPQLog(bossid + key, 1) == 0) {
                cm.setPQLog(bossid + (giftId), 1, 1);
                for (var key in gifts) {
                    var itemId = gifts[key][0];
                    var itemQuantity = gifts[key][1];
                    //幫裝備改能力
                    if( gifts[key][3] == 1 ){
                        等級獎勵改能力(itemId);
                    }else if( !gifts[key][3]){
                        cm.gainItem(itemId, itemQuantity);                        
                    }
                }
                cm.sendOk("恭喜您，領取成功！快打開包裹看看吧！");
                cm.dispose();
            } else {
                status = -1;
                cm.sendSimple("您已經領過了該禮包或者等級未達到要求，無法領取。");
            }
        } else {
            cm.sendOk("領取錯誤！請聯繫管理員！");
            cm.dispose();
        }
    }
}
function getGift(id) {
    var lastGiftContent = Array();
    for (var key in giftContent) {
        if (giftContent[key][2] == id)
            lastGiftContent.push(giftContent[key]);
    }
    return lastGiftContent;
}


function 等級獎勵改能力(獲得道具){
    var 獲得數量 = 1;
    var str = "";        
    if (cm.canHold(獲得道具,獲得數量)==false && 獲得道具 != 0)
        str += "#r空間不足       : 無法獲得 #i"+獲得道具+"# #e"+獲得數量+"#n個";
        
    if( str != "" ){
        //確認失敗，顯示缺少物品
        cm.sendOk( str );
        return false;
    }else{
                
        //給予裝備
        if(獲得道具 != 0 || 獲得數量!= 0){
            var itemId = 獲得道具;
            var ii = cm.getItemInfo();
            //var toDrop = ii.randomizeStats(ii.getEquipById(itemId)).copy(); // 生成一個Eq 
            var toDrop = ii.getEquipById(itemId).copy(); // 生成一個Eq  
            toDrop.setStr( toDrop.getStr()+5 ); //力量
            toDrop.setInt( toDrop.getInt()+5 ); //智力
            //toDrop.setLuk(50); //幸運
            toDrop.setDex( toDrop.getDex()+5 ); //敏捷
            
            toDrop.setHp( toDrop.getHp()+50 );
            toDrop.setMp( toDrop.getMp()+50 );
            
            toDrop.setPad(10);//物理攻擊                
            toDrop.setMad(10); //魔法攻擊
            
            toDrop.setPdd(50); //物理防禦
            //toDrop.setMdd(250); //魔法防禦                
            
            //toDrop.setBossDamage(30); //BOSS傷害
            //toDrop.setIgnorePDR(25); //無視防禦
            
            //toDrop.setExpiration(java.lang.System.currentTimeMillis() + period); // 期限
            cm.addByItem(toDrop);
        }
        return true;
    }
}