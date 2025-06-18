function start() {
    
    var rand = Math.floor(Math.random() * 14);
    var item;
    var num;
    var name;
    
    if (rand <3){
        item = 1022097;
        num = 1;
        name = "龍眼鏡";
    }else if (rand < 1){
        item = 1142216
        num = 1;
        name = "VIP勳章"
    }else if (rand == 2){
        item = 1102207
        num = 1;
        name = "金魂披風"
    }else if (rand == 3){
        item = 1122104
        num = 1;
        name = "旭日吊墜"
    }else if (rand == 4){
        item = 1012191
        num = 1;
        name = "影武者面巾"
    }else if (rand == 5){
        item = 1002850
        num = 1;
        name = "聖誕鹿變身帽"
    }else if (rand == 11){
        item = 1112494
        num = 1;
        name = "老公老婆戒指LV49"
    }else if (rand == 12){
        item = 2040121
        num = 1;
        name = "影武者秘密卷軸"
    }else if (rand == 6){
        item = 1122143
        num = 1;
        name = "覺醒的冒險之心(劍士)"
    }else if (rand == 7){
        item = 1122144
        num = 1;
        name = "覺醒的冒險之心(法師)"
    }else if (rand == 8){
        item = 1122145
        num = 1;
        name = "覺醒的冒險之心(弓箭手)"
    }else if (rand == 9){
        item = 1122146
        num = 1;
        name = "覺醒的冒險之心(盜賊)"
    }else if (rand == 10){
        item = 1122147
        num = 1;
        name = "覺醒的冒險之心(海盜)"
    }else if (rand == 13){
        item = 2040212
        num = 1;
        name = "龍眼鏡專用特殊卷軸"
    }else{
        item = 2040212
        num = 1;
        name = "龍眼鏡專用特殊卷軸"
    }//rand
    if (it.gainItem(item,num)){
    it.remove(-1); //減少1個使用的這個道具
    it.sendY("打開了楓之谷7週年紀念箱，獲取了 "+name+" "+num+"個")
    }
    it.dispose(); 
}