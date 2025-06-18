function start() {
    var pm = cm.getEventInstance();
    var name =pm.getName();
    var eim = cm.getEventManager(name+"");
    var PD = eim.getProperty("state");
    var BOSS = eim.getProperty("leader");
    if (cm.getMap().getAllMonstersThreadsafe().size() == 0){
        if(!cm.isLeader()){
                        cm.sendOk("請讓隊長跟我說話");
                        cm.dispose();
                        return;
                    }
    if (PD == "1"&&BOSS =="true") {
        cm.givePartyItems(4310143, Math.floor(Math.random()*2));
        cm.givePartyItems(4310036, Math.floor(Math.random()*20));
        cm.givePartyItems(4310014, Math.floor(Math.random()*1)+1);
        cm.givePartyItems(5062002, Math.floor(Math.random()*5)+5);
        cm.givePartyItems(5062500, Math.floor(Math.random()*5)+5);
        cm.givePartyExp(270000);
        var allPlayers = cm.getMap().getCharacters();//取得當前地圖上面的所有玩家
                     allPlayers = allPlayers.iterator();
                     var B = Math.floor((Math.random()*30)+30);
                while (allPlayers.hasNext()) {//循環每一個玩家
                    var player = allPlayers.next();
                    player.gainPlayerPoints(B);
                    player.setEventCount("亂入得黑幣");
                }
        cm.partyMessage(5,"獲得積分："+B+"點");
        cm.worldSpouseMessage(0x17,"『亂入副本』" + ":" + "恭喜玩家 " + cm.getChar().getName() + " 帶隊通關亂入副本獲得超大量獎勵！");
        cm.warpParty(910340700,0);
        cm.dispose();
    }else if (PD == "1"){
        cm.givePartyItems(4310143, Math.floor(Math.random()*1));
        cm.givePartyItems(4310036, Math.floor(Math.random()*10));
        cm.givePartyItems(5062002, Math.floor(Math.random()*5)+1);
        cm.givePartyItems(5062500, Math.floor(Math.random()*5)+1);
        //cm.givePartyItems(4310014, 1);
        cm.givePartyExp(170000);
        var allPlayers = cm.getMap().getCharacters();//取得當前地圖上面的所有玩家
                     allPlayers = allPlayers.iterator();
                     var B = Math.floor((Math.random()*20)+10);
                while (allPlayers.hasNext()) {//循環每一個玩家
                    var player = allPlayers.next();
                    player.gainPlayerPoints(B);
                    player.setEventCount("亂入得黑幣");
                }
        cm.partyMessage(5,"獲得積分："+B+"點");
        cm.warpParty(910340700,0);
        cm.worldSpouseMessage(0x17,"『亂入副本』" + ":" + "恭喜玩家 " + cm.getChar().getName() + " 帶隊通關亂入副本獲得大量獎勵！");
    }else{
        cm.sendOk("對不起，任務沒開啟！");
        cm.dispose();
    }
    }else{
        cm.sendOk("請清理當前地圖的所有怪物再和我對話！");
        cm.dispose();
    }
    cm.dispose();
}