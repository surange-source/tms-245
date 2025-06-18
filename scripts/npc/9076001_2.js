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
           text += "#b#L10#神木村系列（單人\多人）#l\r\n";
           text += "#b#L12#納希沙漠系列（單人\多人）#l\r\n";
           text += "#b#L0#弓箭手村系列組隊任務（單人\多人）#l\r\n";
           text += "#b#L1#馬加提亞系列組隊任務（單人\多人）#n#l\r\n";
       text += "#b#L7#埃德爾斯坦系列組隊任務（單人\多人）#n#l\r\n";
           text += "#b#L2#玩具城系列組隊任務（單人\多人）#l\r\n";
           text += "#b#L3#武陵全系列組隊（單人\多人）#l\r\n";
           //text += "#b#L4#時間神殿系列組隊任務（單人\多人）#l\r\n";
           text += "#b#L6#時間神殿系列組隊任務（單人\多人）#l\r\n";
           //text += "#b#L5#海盜組隊任務（單人）#l\r\n"
           //text += "#b#L11#御龍魔天度（多人）#l\r\n"
            
            cm.sendSimple(text);

        } else if (status == 1) {
           
            switch(selection){
                case 0:
                    cm.dispose();
                    cm.openNpc(9076001, 12);    
                                break;
                case 1:
                    cm.dispose();
                    cm.openNpc(9076001, 14);    
                                break;
                case 2:
                    cm.dispose();
                    cm.openNpc(9076001, 16);        
                                break;
                case 3:
                                cm.dispose();
                                cm.openNpc(9076001, 13);        
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
                    cm.openNpc(9076001, 17);        
                                break;
                case 7:
                    cm.dispose();
                    cm.openNpc(9076001, 15);        
                                break;
                case 10:
                    cm.dispose();
                    cm.openNpc(9076001, 10);
                      // cm.sendOk("#d注意：1個物品佔一個格子，有足夠空間在領取！");
                                break;
                case 11:
                    cm.dispose();
                    cm.openNpc(9020016);        
                                break;
                case 12:
                    cm.dispose();
                    cm.openNpc(9076001,11);        
                                break;
            }
        }
    }
}