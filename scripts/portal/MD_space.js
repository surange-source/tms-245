


/*

    腔絹 柯扼牢 家膠 膠農賦飄 澇聰促.

    器嘔撈 樂綽 甘 : 第撇赴 矯埃狼 辨 1

    器嘔 汲疙 : 固聰帶僳 澇厘


*/

var map = 220070001;
var exit = 220070000;

function enter(pi) {
    if (pi.getPlayer().getMapId() == map) {
        var eim = pi.getEventInstance();
        if (eim == null) {
            pi.warp(exit);
            return true;
        }
        eim.removePlayer(pi.getPlayer());
        pi.warp(exit);
        pi.getPlayer().message(5, "固聰帶僳 牢膠畔膠俊輯 硼厘沁嚼聰促.");
        return true;
    } else {
        var em = pi.getEventManager("MiniDungeon");
        if (em == null) {
            pi.getPlayer().message(5, "固聰帶僳 膠農賦飄俊 坷幅啊 慣積沁嚼聰促. GM俊霸 鞏狼秦 林技誇.");
            return false;
        }
        if (pi.getPlayer().getParty() != null) {
            if (!pi.allMembersHere()) {
                pi.getPlayer().message(5, "頗萍盔撈 葛滴 葛咯樂絹具 澇厘且 薦 樂嚼聰促.");
                return false;
            }
            if (!pi.isLeader()) {
                pi.getPlayer().message(5, "頗萍厘撈 澇厘且 薦 樂嚼聰促.");
                return false;
            }
            em.setProperty("Leader_"+pi.getPlayer().getParty().getLeader().getId()+"_Exit", pi.getPlayer().getMapId()+"");
            em.setProperty("Leader_"+pi.getPlayer().getParty().getLeader().getId()+"_Map", map+"");
            em.startInstance(pi.getParty(), pi.getPlayer().getMap());
            pi.getPlayer().message(5, "固聰帶僳 牢膠畔膠俊 澇厘登菌嚼聰促.");
            var eim = pi.getPlayer().getEventInstance();
            eim.startEventTimer(7200000);
            return true;
        } else {
            em.setProperty("Leader_"+pi.getPlayer().getId()+"_Exit", pi.getPlayer().getMapId()+"");
            em.setProperty("Leader_"+pi.getPlayer().getId()+"_Map", map+"");
            em.startInstance(pi.getPlayer());
            pi.getPlayer().message(5, "固聰帶僳 牢膠畔膠俊 澇厘登菌嚼聰促.");
            var eim = pi.getPlayer().getEventInstance();
            eim.startEventTimer(7200000);
            return true;
        }
    }
            
        
}
