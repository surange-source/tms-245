/*  
 *  
 *  功能：組隊任務：陷入危機的坎特
 *  反應堆腳本
 * 
 */
function act() {
    var em = rm.getEventManager("Kenta");
    var eim = rm.getEventInstance();
    if (em != null && eim != null && rm.getPlayer().getParty() != null) {
        eim.setProperty("KentaSave", "1");
        rm.startMapEffect("我呼吸困難……請你消滅周邊的怪物，拿到10個空氣鈴。快……", 5120052);
        eim.setProperty("KentaSave", "2");
    }
}
