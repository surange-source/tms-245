/* ===========================================================
            註釋(cm.sendSimple\cm.itemQuantity())
    腳本類型:         NPC
    所在地圖:        
    腳本名字:        
==============================================================
製作時間：2010年9月22日 17:19:48
製作人員：筆芯
=============================================================
for(var i = 1;i<=5;i++){
                if(cm.getPlayer().getInventory(net.sf.odinms.client.MapleInventoryType.getByType(i)).isFull()){
                    cm.startPopMessage(cm.getPlayer().getId(), "您必須讓自己的背包騰出一格。");
                    cm.dispose();
                    return;
                }
            }
*/

var random = java.lang.Math.floor(Math.random() * 1000 + 1);//樂豆點前面大後面小
var random3 = java.lang.Math.floor(Math.random() * 500 + 1);//樂豆點前面大後面小
var random1 = java.lang.Math.floor(Math.random() * 2000000 + 50000);//楓幣前面大後面小
var random2 = java.lang.Math.floor(Math.random() * 1000000 + 1);//經驗前面大後面小
var a = 0;
var ss = 0;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
 if (a >= 2 && mode != 1){
        cm.setNPC_Mode(18);
                    cm.openNpc(2101014);
                    cm.setNPC_Mode(0);
    }else{
    if (mode == -1) {
       cm.setNPC_Mode(18);
                    cm.openNpc(2101014);
                    cm.setNPC_Mode(0);
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1){
            cm.setNPC_Mode(18);
                    cm.openNpc(2101014);
                    cm.setNPC_Mode(0);
        }else if (a == 0) {
                    if (ss == 1){
                        cm.setNPC_Mode(18);
                    cm.openNpc(2101014);
                    cm.setNPC_Mode(0);
                    }else{
                        
                    var rand = Math.floor(Math.random() * 4);
                    if (rand == 1){
                        cm.sendOk("點擊成功！\r\n本次您獲得了 #r"+random1+"#k 遊戲幣。")
                        cm.gainMeso(random1)
        cm.worldSpouseMessage(0x20,"『1分奪寶』" + ":" + "玩家 "+cm.getChar().getName()+" 在拍賣中尋寶中獲得了 ["+ random1 +"] 遊戲幣!");
        
                        cm.dispose();
                    }else if (rand == 2){
                        cm.sendOk("點擊成功！\r\n本次您獲得了 #r"+random+"#k 樂豆點。")
                        cm.gainNX(random)
        cm.worldSpouseMessage(0x20,"『1分奪寶』" + ":" + "玩家 "+cm.getChar().getName()+" 在拍賣中尋寶中獲得了 ["+ random +"] 樂豆點!");
        
                        cm.dispose();
                    }else if (rand == 3){
                        cm.sendOk("點擊成功！\r\n本次您獲得了 #r"+random2+"#k 經驗。")
                        cm.gainExp(random2)
        cm.worldSpouseMessage(0x20,"『1分奪寶』" + ":" + "玩家 "+cm.getChar().getName()+" 在拍賣中尋寶中獲得了 ["+ random2 +"] 經驗!");
                        cm.dispose();
                    }else{
                        cm.sendOk("點擊成功！\r\n本次您獲得了 #r"+random3+"#k 樂豆點。")
                        cm.gainNX(random3)
        cm.worldSpouseMessage(0x20,"『1分奪寶』" + ":" + "玩家 "+cm.getChar().getName()+" 在拍賣中尋寶中獲得了 ["+ random3 +"] 樂豆點!");
                            cm.dispose();
                    }
      }
                }else if (a == 1){
                    cm.sendNext("#h #你好，當前時間是 #b"+cm.getHour()+"點"+cm.getMin()+"分"+cm.getSec()+"秒#k\r\n遊戲幣：#r"+cm.getMeso()+"元#k　樂豆點：#r"+cm.getNX()+"點#k\r\n當時間到達#r15:00--23:59#k之間，請拿起你的鼠標瘋狂點擊吧\r\n給你1分鐘時間，看誰點的快！");
                }else if (a == 2){
                    if (cm.getHour() > 14 && cm.getMin() > 15){
                        cm.sendYesNo("看來時間已經到了，確定要領取嗎？")
                    }else{
                        a = -1;
                        ss = 1;
    cm.sendOk("抱歉！當前時間是 #b"+cm.getHour()+"點"+cm.getMin()+"分"+cm.getSec()+"秒#k，當時間到達#r15:00--23:59#k之間，請拿起你的鼠標瘋狂點擊吧！")
    
                    }
                }else if (a == 3){
                    a = -1;
                        ss = 1;
                    var rand = Math.floor(Math.random() * 3);
                    if (rand == 1){
                        cm.sendOk("獲得了10萬遊戲幣。")
                        cm.gainMeso(100000)
                        //cm.dispose();
                    }else if (rand == 2){
                        cm.sendOk("獲得了10樂豆點。")
                        cm.gainNX(10)
                        //cm.dispose();
                    }else{
                        cm.sendOk("獲得了2萬遊戲幣。")
                        cm.gainMeso(20000)
                        //cm.dispose();
                    }
                        
                    
    }//status
}
}
    }