var status = -1;

function action(mode, type, selection) {
           cm.worldSpouseMessage(0x14,"[小夥伴養成] 玩家 "+ cm.getChar().getName() +" 炫耀了一下他(她)的小夥伴(草泥馬)成長值達到 "+ cm.getPQLog("寵物總計成長值",1) +" 點啦!!!");
       cm.dispose();
}