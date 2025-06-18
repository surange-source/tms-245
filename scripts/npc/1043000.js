function start() {
    if (cm.getMapId() != 910130000 && cm.getMapId() != 910130001 || cm.getClient().getChannel() != 1 ) {
        cm.dispose();
        return;
    }
    
    var point = 200;
    var FreeMarketID = 910000000;
    var players = cm.getMap(910130000).getCharacters();
    for(var player in players){
        var p = players.get(player);
        if(p != null){
            p.changeMap(FreeMarketID,0);
            p.modifyCSPoints(2,point,true);
        }
    }
    
    players = cm.getMap(910130001).getCharacters();
    for(var player in players){
        var p = players.get(player);
        if(p != null){
            p.changeMap(FreeMarketID,0);
            p.modifyCSPoints(2,point,true);
        }
    }
    cm.gainItem(4033247, 1);
    cm.gainItem(2430124, 1);
    cm.worldSpouseMessage(0x15,"恭喜 "+ cm.getChar().getName() +" 獲得本次忍耐的第一名，請大家一起恭喜他唷~~~  並且其他人也會獲得參加獎 請繼續加油努力");
    cm.dispose();
}
