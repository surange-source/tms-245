var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = "#d新手樂豆點任務；\r\n收集以下物品可以兌換樂豆點、方塊、卷軸、里程、運動會幣等。   \r\n#i4000000# #i4000001# #i4000016# #i4000004# #i4000115# #i4000020# #i4000051# #i4000134# #i4000135#\r\n\r\n";
            selStr +="#e#r每做完一次任務都可以額外獲得 #b#v4310030##rX100   #l#k\r\n#n"; 
            selStr +="#L1##r"+aaa+" 收集 #b#z4000000##r   [詳情點擊查看]#l#k\r\n"; 
            selStr +="#L2##r"+aaa+" 收集 #b#z4000001##r     [詳情點擊查看]#l#k\r\n"; 
            selStr +="#L3##r"+aaa+" 收集 #b#z4000016##r   [詳情點擊查看]#l#k\r\n"; 
            selStr +="#L4##r"+aaa+" 收集 #b#z4000004##r       [詳情點擊查看]#l#k\r\n";
            selStr +="#L5##r"+aaa+" 收集 #b#z4000051##r     [詳情點擊查看]#l#k\r\n"; 
            selStr +="#L6##r"+aaa+" 收集 #b#z4000443##r   [詳情點擊查看]#l#k\r\n";
            selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);    
        } else if (status == 1) {
            if (selection == 1) {
                typed=1;
                cm.sendYesNo("- #d#e任務要求：#n#k\r\n\r\n#b當前擁有#z4000000#個數為：         #r" + cm.getItemQuantity(4000000) + " / 200 個\r\n\r\n#b當前任務獎勵樂豆點為： #r2000#b 點\r\n#b當前任務獎勵里程為： #r10#b 點\r\n\r\n- #e#d管理提示：#n#k#b新手任務全部任務一起每天只能3次。");
            } else if (selection == 2) {
                typed=2;
                cm.sendYesNo("- #d#e任務要求：#n#k\r\n\r\n#b當前擁有#z4000001#個數為：         #r" + cm.getItemQuantity(4000001) + " / 200 個\r\n\r\n#b當前任務獎勵#z5062009#為： #r5#b 個\r\n#b當前任務獎勵里程為： #r10#b 點\r\n\r\n- #e#d管理提示：#n#k#b新手任務全部任務一起每天只能3次。");
            } else if (selection == 3) {
                typed=3;
                cm.sendYesNo("- #d#e任務要求：#n#k\r\n\r\n#b當前擁有#z4000016#個數為：         #r" + cm.getItemQuantity(4000016) + " / 200 個\r\n\r\n#b當前任務獎勵#z5062002#為： #r10#b 個\r\n#b當前任務獎勵里程為： #r10#b 點\r\n\r\n- #e#d管理提示：#n#k#b新手任務全部任務一起每天只能3次。");
            } else if (selection == 4) {
                typed=4;
                cm.sendYesNo("- #d#e任務要求：#n#k\r\n\r\n#b當前擁有#z4000004#個數為：         #r" + cm.getItemQuantity(4000004) + " / 200 個\r\n\r\n#b當前任務獎勵#z2431762#為： #r3#b 個\r\n#b當前任務獎勵里程為： #r10#b 點\r\n\r\n- #e#d管理提示：#n#k#b新手任務全部任務一起每天只能3次。");
            } else if (selection == 5) {
                typed=5;
                cm.sendYesNo("- #d#e任務要求：#n#k\r\n\r\n#b當前擁有#z4000051#個數為：         #r" + cm.getItemQuantity(4000051) + " / 200 個\r\n#b當前擁有#z4000020#個數為：         #r" + cm.getItemQuantity(4000020) + " / 200 個\r\n\r\n#b當前任務獎勵樂豆點為： #r5000#b 個\r\n#b當前任務獎勵里程為： #r10#b 點\r\n\r\n- #e#d管理提示：#n#k#b新手任務全部任務一起每天只能3次。");
            } else if (selection == 6) {
                typed=6;
                cm.sendYesNo("- #d#e任務要求：#n#k\r\n\r\n#b當前擁有#z4000448#個數為：         #r" + cm.getItemQuantity(4000448) + " / 200 個\r\n#b當前擁有#z4000453#個數為：         #r" + cm.getItemQuantity(4000453) + " / 200 個\r\n#b當前擁有#z4000458#個數為：         #r" + cm.getItemQuantity(4000458) +" / 200 個\r\n#b當前擁有#z4000443#個數為：       #r" + cm.getItemQuantity(4000443) + " / 200 個\r\n\r\n#b當前任務獎勵閃炫方塊為： #r10#b 個\r\n#b當前任務獎勵里程為： #r10#b 點\r\n\r\n- #e#d管理提示：#n#k#b新手任務全部任務一起每天只能3次。");
            }
        } else if (status == 2) {
            if(typed==1){
                if (cm.haveItem(4000000,200) && cm.getPQLog("新手收集任務") <= 3) {
                    cm.gainItem(4000000, -200);
                    cm.gainNX(1, 2000);
                    cm.gainItem(4310030, 100);
                    cm.gainPlayerPoints(10);
                    cm.setPQLog("新手收集任務");
                    cm.sendOk("#b成功獲得了  #r里程#b 10 和 樂豆點 #r2000#b 獎勵。");
                    cm.worldSpouseMessage(0x01, "『新手任務』 : "+ cm.getChar().getName() +" 完成新手任務，獲得了豐富獎勵。");
                    cm.dispose();;
                } else {
                    cm.sendOk("您的物品不夠或者背包空間不足.");
                    cm.dispose();
                }
            } else if (typed==2){
                if (cm.haveItem(4000001,200) && cm.getSpace(5) >= 1 && cm.getPQLog("新手收集任務") <= 3) {
                    cm.gainItem(4000001, -200);
                    cm.gainItem(5062009, 5);
                    cm.gainItem(4310030, 100);
                    cm.gainPlayerPoints(10);
                    cm.setPQLog("新手收集任務");
                    cm.sendOk("#b成功獲得了#z5062024# 30個超級方塊 和 #r里程#b  #r10#b 獎勵。");
                    cm.worldSpouseMessage(0x01, "『新手任務』 : "+ cm.getChar().getName() +" 完成新手任務，獲得了豐富獎勵。");
                    cm.dispose();;
                } else {
                    cm.sendOk("您的物品不夠或者背包空間不足.");
                    cm.dispose();
                }
            } else if (typed==3){
                if (cm.haveItem(4000016,200) && cm.getSpace(5) >= 1 && cm.getPQLog("新手收集任務") <= 3) {
                    cm.gainItem(4000016, -200);
                    cm.gainItem(5062002, 10);
                    cm.gainItem(4310030, 100);
                    cm.gainPlayerPoints(10);
                    cm.setPQLog("新手收集任務");
                    cm.sendOk("#b成功獲得了#z5062002# 10個高級神奇方塊 和 #r里程#b  #r10#b 獎勵。");
                    cm.worldSpouseMessage(0x01, "『新手任務』 : "+ cm.getChar().getName() +" 完成新手任務，獲得了豐富獎勵。");
                    cm.dispose();;
                } else {
                    cm.sendOk("您的物品不夠或者背包空間不足.");
                    cm.dispose();
                }
            } else if (typed==4){
                if (cm.haveItem(4000004,200) && cm.getSpace(2) >= 3 && cm.getPQLog("新手收集任務") <= 3) {
                    cm.gainItem(4000004, -200);
                    cm.gainItem(5062500, 3);
                    cm.gainItem(4310030, 100);
                    cm.gainPlayerPoints(10);
                    cm.setPQLog("新手收集任務");
                    cm.sendOk("#b成功獲得了#z5062024# 3個大師附加方塊 和 #r里程#b  #r10#b 獎勵。");
                    cm.worldSpouseMessage(0x01, "『新手任務』 : "+ cm.getChar().getName() +" 完成新手任務，獲得了豐富獎勵。");
                    cm.dispose();;
                } else {
                    cm.sendOk("您的物品不夠或者背包空間不足.");
                    cm.dispose();
                }
            } else if (typed==5){
                if (cm.haveItem(4000020,200) && cm.haveItem(4000051,200) && cm.getPQLog("新手收集任務") <= 3) {
                    cm.gainItem(4000020, -200);
                    cm.gainItem(4000051, -200);
                    cm.gainNX(1, 5000);
                    cm.gainItem(4310030, 100);
                    cm.gainPlayerPoints(10);
                    cm.setPQLog("新手收集任務");
                    cm.sendOk("#b成功獲得了#z5062024# #z2430683# 和 #r里程#b  #r10#b 獎勵。");
                    cm.worldSpouseMessage(0x01, "『新手任務』 : "+ cm.getChar().getName() +" 完成新手任務，獲得了豐富獎勵。");
                    cm.dispose();;
                } else {
                    cm.sendOk("您的物品不夠或者背包空間不足.");
                    cm.dispose();
                }
            } else if (typed==6){
                if (cm.haveItem(4000448,200) && cm.haveItem(4000453,200) && cm.haveItem(4000458,200) && cm.haveItem(4000443,200) && cm.getPQLog("新手收集任務") <= 3) {
                    cm.gainItem(4000448, -200);
                    cm.gainItem(4000453, -200);
                    cm.gainItem(4000458, -200);
                    cm.gainItem(4000443, -200);
                    cm.gainItem(5062024, 10);
                    cm.gainItem(4310030, 100);
                    cm.gainPlayerPoints(10);
                    cm.setPQLog("新手收集任務");
                    cm.sendOk("#b成功獲得了#z5062024# #z5062024# 和 #r里程#b  #r10#b 獎勵。");
                    cm.worldSpouseMessage(0x01, "『新手任務』 : "+ cm.getChar().getName() +" 完成新手任務，獲得了豐富獎勵。");
                    cm.dispose();;
                } else {
                    cm.sendOk("您的物品不夠或者背包空間不足.");
                    cm.dispose();
                }
           }
        }
      }
    }