/*
 *兌換
 */

var status = 0; 
var cost = 10;

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
        abb = 1;
        cm.sendGetText("您好,歡迎使用樂豆點增加HP.每"+cost+"樂豆點增加1點最大HP值。\r\n目前樂豆點：#r"+cm.getPlayer().getCSPoints(1)+" #k點\r\n#r註：請輸入想增加的#b血量值#r..最大HP不能超過50萬,否則出錯該不負責");
        } else if (status == 1) { 
    if(cm.getText() < 1){
        cm.playerMessage(1,"單次輸入的數字不能小於1。且不能大於1萬。");
        cm.dispose();
    } else if(cm.getText() > 10000){
        cm.playerMessage(1,"單次輸入的數字不能小於1。且不能大於1萬。");
        cm.dispose();
    } else {
        cm.sendYesNo("您好,歡迎使用樂豆點增加血量.\r\n增加#r" + cm.getText() + "#k血量將會使用掉您#r" + cm.getText() * cost + "#k樂豆點\r\n請確認後使用。");
        } 
        } else if (status == 2) { 
        var getmaxhp = cm.getChar().getStat().getMaxHp();
    if (cm.getPlayer().getCSPoints(1) >= cm.getText()*cost) { 
           cm.gainNX(-cm.getText() * cost);
           cm.getChar().getStat().setMaxHp(getmaxhp+cm.getText() * 1,cm.getChar());
           cm.worldSpouseMessage(0x20,"[增加HP上限] ：恭喜玩家 "+ cm.getChar().getName() +" 在市場石像NPC中用 "+ cm.getText() * cost +" 樂豆點增加了 "+ cm.getText() +" HP上限");
           cm.sendOk("成功增加了"+cm.getText()+"您增加的HP.換線或小退一下即可看到。");
           cm.dispose();
        } else {
           cm.sendOk("您沒有足夠的樂豆點,請獲取後使用.");
           cm.dispose();
     }
      } 
   }
}   