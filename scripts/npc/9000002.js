function start() {
    if (cm.getMapId() != 109050000 || cm.getClient().getChannel() != 1){
        cm.dispose();
        return;
    }
    
    var point = 200;
    var FreeMarketID = 910000000;
    var players = cm.getMap(109040001).getCharacters();
    for(var player in players){
        var p = players.get(player);
        if(p != null){
            p.changeMap(FreeMarketID,0);
            p.modifyCSPoints(2,point,true);
        }
    }
    
    players = cm.getMap(109040002).getCharacters();
    for(var player in players){
        var p = players.get(player);
        if(p != null){
            p.changeMap(FreeMarketID,0);
            p.modifyCSPoints(2,point,true);
        }
    }
    
    players = cm.getMap(109040003).getCharacters();
    for(var player in players){
        var p = players.get(player);
        if(p != null){
            p.changeMap(FreeMarketID,0);
            p.modifyCSPoints(2,point,true);
        }
    }
    
    players = cm.getMap(109040004).getCharacters();
    for(var player in players){
        var p = players.get(player);
        if(p != null){
            p.changeMap(FreeMarketID,0);
            p.modifyCSPoints(2,point,true);
        }
    }
    
    players = cm.getMap(109050000).getCharacters();
    for(var player in players){
        var p = players.get(player);
        if(p != null){
            p.changeMap(FreeMarketID,0);
            p.modifyCSPoints(2,point,true);
        }
    }
    /*
    var size = cm.getMap(109040001).getCharactersSize();
    if(size > 0){
        for(var i = 0;i < size ; i++){
            cm.getMap(109040001).getCharacters().get(0).modifyCSPoints(2,300,true);
            cm.getMap(109040001).getCharacters().get(0).changeMap(910000000,0);
        }
    }

    size = cm.getMap(109040002).getCharactersSize();
    if(size > 0){
        for(var n = 0;n < size ; n++){
            cm.getMap(109040002).getCharacters().get(0).modifyCSPoints(2,300,true);
            cm.getMap(109040002).getCharacters().get(0).changeMap(910000000,0);
        }
    }

    size = cm.getMap(109040003).getCharactersSize();
    if(size > 0){
        for(var i = 0;i < size ; i++){
            cm.getMap(109040003).getCharacters().get(0).modifyCSPoints(2,300,true);
            cm.getMap(109040003).getCharacters().get(0).changeMap(910000000,0);
        }
    }

    size = cm.getMap(109040004).getCharactersSize();
    if(size > 0){
        for(var i = 0;i < size ; i++){
            cm.getMap(109040004).getCharacters().get(0).modifyCSPoints(2,300,true);
            cm.getMap(109040004).getCharacters().get(0).changeMap(910000000,0);
        }
    }

    size = cm.getMap(109050000).getCharactersSize();
    if(size > 0){
        for(var i = 0;i < size ; i++){
            cm.getMap(109050000).getCharacters().get(0).modifyCSPoints(2,300,true);
            cm.getMap(109050000).getCharacters().get(0).changeMap(910000000,0);
        }
    }
    */
    cm.gainItem(4033247, 1);
    cm.gainItem(2430124, 1);
    cm.worldSpouseMessage(0x15,"恭喜 "+ cm.getChar().getName() +" 獲得本次忍耐的第一名，請大家一起恭喜他唷~~~  並且其他人也會獲得參加獎 請繼續加油努力");
    cm.dispose();
}
