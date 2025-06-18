function enter(pi) {
    if (pi.getPlayer().getMapId() == 744000008 && pi.getPlayer().getParty() != null && pi.haveItem(4001137) && pi.isLeader()) {
        pi.warpParty(744000014); //柔道部
        pi.gainItem(4001137, -1);
        pi.playPortalSE();
    } else {
        if (pi.getPlayer().getMapId() == 744000008) {
            pi.playerMessage(5, "請確認你是否完成考試答題！");
        }
    }
    if (pi.getPlayer().getMapId() == 744000014 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410183) && pi.isLeader()) {
        pi.warpParty(744000013); //空教室
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000013 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410182) && pi.isLeader()) {
        pi.warpParty(744000015); //樂隊部
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000015 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410184) && pi.isLeader()) {
        pi.warpParty(744000003); //校長室
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000003 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410178) && pi.isLeader()) {
        pi.warpParty(744000002); //倉庫
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000002 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410179) && pi.isLeader()) {
        pi.warpParty(744000006); //廢棄的教室
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000006 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410147) && !pi.haveMonster(9410148) && !pi.haveMonster(9410149) && !pi.haveMonster(9410150) && !pi.haveMonster(9410151) && pi.isLeader()) {
        pi.warpParty(744000007); //前途商談室
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000007 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410171) && pi.isLeader()) {
        pi.warpParty(744000004); //美術部
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000004 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410177) && pi.isLeader()) {
        pi.warpParty(744000010); //體育部
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000010 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410180) && pi.isLeader()) {
        pi.warpParty(744000009); //家政室
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000009 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410187) && !pi.haveMonster(9410188) && !pi.haveMonster(9410189) && pi.isLeader()) {
        pi.warpParty(744000011); //科學實驗室
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000011 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410190) && pi.isLeader()) {
        pi.warpParty(744000012); //圖書室
        pi.playPortalSE();
    } else if (pi.getPlayer().getMapId() == 744000012 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410181) && pi.isLeader()) {
        pi.warpParty(744000001); //屋頂
        pi.playPortalSE();
    } else {
        if (pi.getPlayer().getMapId() != 744000008) {
            pi.playerMessage(5, "請確認當前地圖是否還存在怪物！");
        }
    }
}
