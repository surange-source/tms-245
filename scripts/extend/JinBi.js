var status = 0;
function start() {
        cm.sendNext("方塊副本：\r\n玩家每天只能進一次。（請點擊下一步開啟）");
}

function action(mode, type, selection) {
    if (mode == 1) {
        var em = cm.getEventManager("Goldpz");
        if (em == null) {
            cm.sendOk("請聯繫管理員開通此副本。");
        }else{
            var prop = em.getProperty("started");
            if(cm.getPQLog("楓幣副本")<1||cm.getChar().isGm()==true){
                if (cm.getParty()==null) {
                    cm.sendOk("請先自己開個組,而且只能自己一個人.完成後再來跟我說話");
                }else if (cm.getParty().getMembers().size()<2&&cm.getChar().isGm()!=true){
                    cm.sendOk("組裡至少要2個人哦");
                } else if (!cm.checkPartyEventCount("方塊副本", 2)) {
                    cm.sendNext("你的隊員次數已經達到上限了。");
                }else if(prop == null||prop =="false" ){
                        em.startInstance(cm.getParty(), cm.getMap());
                                cm.setPQLog("方塊副本");
                        cm.gainMembersPQ("方塊副本", 1);
                        cm.setPartyEventCount("方塊副本",1);
                        cm.worldSpouseMessage(0x20,"『方塊副本』 ：玩家 "+ cm.getChar().getName() +" 進入了方塊道具組隊副本.");
                        cm.dispose();
                }else{
                        cm.sendOk("對不起，該副本已經有人");
                    }
            }else{
                cm.sendOk("開啟失敗\r\n1.該副本一天只能進一次")
            }
        }
        }
    cm.dispose();
}
