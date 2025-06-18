function enter(pi) {
     if(pi.getPlayer().getMapId() == 105200110){
        pi.openNpc(1064013,2); //普通半半
     }else if(pi.getPlayer().getMapId() == 105200500){
        pi.openNpc(1064013,1); //進階半半
     }else if(pi.getPlayer().getMapId() == 105200200){
        pi.openNpc(1064012,2); //普通皮埃爾
     }else if(pi.getPlayer().getMapId() == 105200600){
        pi.openNpc(1064012,1); //進階皮埃爾
     }else if(pi.getPlayer().getMapId() == 105200400){
        pi.openNpc(1064015,2); //普通貝倫
     }else if(pi.getPlayer().getMapId() == 105200800){
        pi.openNpc(1064015,1); //進階貝倫
     }else if(pi.getPlayer().getMapId() == 105200300){
        pi.openNpc(1064014,2); //普通血腥女皇
     }else if(pi.getPlayer().getMapId() == 105200700){
        pi.openNpc(1064014,1); //進階血腥女皇
     }
}
