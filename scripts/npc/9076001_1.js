//


var status = 0;
var choose = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        if (status == 0) {


            var text = "您好，通關副本將送大量方塊,請選擇副本任務：\r\n";
           //text += "#r#L10#更多副本（活力值）#l\r\n";
           //text += "#b#L12#國服各村落組隊（單人\多人）#l\r\n";
           text += "#b#L0#玩具塔101（多人）#l\r\n";
           text += "#b#L1#超強化墮落巨大綠水靈（多人）#n#l\r\n";
           //text += "#b#L7#次元入侵組隊（多人）#n#l\r\n";
           //text += "#b#L2#怪物公園副本（單人）#l\r\n";
           //text += "#b#L3#挑戰武陵道場（單人）#l\r\n";
           //text += "#b#L4#全新天魔殭屍（單人）#l\r\n";
           //text += "#b#L6#月妙組隊任務（多人）#l\r\n";
           //text += "#b#L5#海盜組隊任務（單人）#l\r\n"
           //text += "#b#L11#御龍魔天度（多人）#l\r\n"
            
            cm.sendSimple(text);

        } else if (status == 1) {
           
            switch(selection){
                case 0:
                    cm.dispose();
                    cm.openNpc(2040034);    
                                break;
                case 1:
                    cm.dispose();
                    cm.openNpc(9020000);    
                                break;
                case 2:
                    cm.dispose();
                    cm.warp(951000000, 1);        
                                break;
                case 3:
                                cm.dispose();
                                cm.warp(925020000, 1);        
                                break;
                case 4:
                    cm.dispose();
                    cm.openNpc(9310557,"tmjs");    
                                break;
                case 5:
                    cm.dispose();
                    cm.openNpc(2094000);
                   // cm.openNpc(9010017,"leijisong");
                      // cm.sendOk("#d注意：1個物品佔一個格子，有足夠空間在領取！");
                                break;
                case 6:
                    cm.dispose();
                    cm.warp(933000000, 1);        
                                break;
                case 7:
                    cm.dispose();
                    cm.warp(940020000, 1);        
                                break;
                case 10:
                    cm.dispose();
                    cm.openNpc(9010017,"zuduirenwu");
                      // cm.sendOk("#d注意：1個物品佔一個格子，有足夠空間在領取！");
                                break;
                case 11:
                    cm.dispose();
                    cm.openNpc(9020016);        
                                break;
                case 12:
                    cm.dispose();
                    cm.openNpc(9076001, 2);        
                                break;
            }
        }
    }
}