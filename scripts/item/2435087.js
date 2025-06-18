var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var twd = 0;
var Gift = "#fUI/UIWindow2/crossHunterUI/reward/button/normal/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        im.dispose();
    } else {
        if (mode == 0 && status == 0) {
            im.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var selStr = "#d#e請選擇您所需要的200全屬性神秘之影套裝：#n#k\r\n\r\n";
            selStr +="#L1#"+aaa+" 領取 劍士 神秘之影套裝一套，全屬性+200#l#k\r\n";
            selStr +="#L2#"+aaa+" 領取 法師 神秘之影套裝一套，全屬性+200#l#k\r\n"
            selStr +="#L3#"+aaa+" 領取 弓箭 神秘之影套裝一套，全屬性+200#l#k\r\n"; 
            selStr +="#L4#"+aaa+" 領取 盜賊 神秘之影套裝一套，全屬性+200#k\r\n";
            selStr +="#L5#"+aaa+" 領取 海盜 神秘之影套裝一套，全屬性+200#l#k\r\n";
                        im.sendSimple(selStr);    
        } else if (status == 1) {
            if (selection == 1) {
                typed=1;
                im.sendYesNo("#b您是否想要領取劍士職業神秘之影套裝一套 ，全屬性+200，您是否想要現在就領取？");
            } else if (selection == 2) {
                typed=2;
                im.sendYesNo("#b您是否想要領取法師職業神秘之影套裝一套 ，全屬性+200，您是否想要現在就領取？");
            } else if (selection == 3) {
                typed=3;
                im.sendYesNo("#b您是否想要領取弓箭職業神秘之影套裝一套 ，全屬性+200，您是否想要現在就領取？");
            } else if (selection == 4) {
                typed=4;
                im.sendYesNo("#b您是否想要領取盜賊職業神秘之影套裝一套 ，全屬性+200，您是否想要現在就領取？");
            } else if (selection == 5) {
                typed=5;
                im.sendYesNo("#b您是否想要領取海盜職業神秘之影套裝一套 ，全屬性+200，您是否想要現在就領取？");
            }
        } else if (status == 2) {
            if (typed==1) {
                if (im.getSpace(1) >= 6) {
                var toDrop = im.getNewEquip(1004808); // 帽子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);  
                var toDrop = im.getNewEquip(1053063); // 套服   
                       toDrop.setStr(200); //裝備力量
                     toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                     im.addFromDrop(toDrop);            
                var toDrop = im.getNewEquip(1073158); // 鞋子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1082695); // 手套   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);       
                var toDrop = im.getNewEquip(1102940); // 披風   
                     toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1152196); // 護肩   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                    im.gainItem(2435087, -1);
                    im.sendOk("恭喜您成功領取了劍士職業神秘之影套裝一套.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.dispose();
                } else {
                    im.sendOk("領取失敗：\r\n\r\n#r1). 背包裝備欄位不夠6個位置,請清理.");
                    im.dispose();
                }
            } else if (typed==2) {
                if (im.getSpace(1) >= 6) {
                    var toDrop = im.getNewEquip(1004809); // 帽子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);  
                var toDrop = im.getNewEquip(1053064); // 套服   
                       toDrop.setStr(200); //裝備力量
                     toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                     im.addFromDrop(toDrop);            
                var toDrop = im.getNewEquip(1073159); // 鞋子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1082696); // 手套   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);       
                var toDrop = im.getNewEquip(1102941); // 披風   
                     toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1152197); // 護肩   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);   
                    im.gainItem(2435087, -1);
                    im.sendOk("恭喜您成功領取了法師職業神秘之影套裝一套.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.dispose();
                } else {
                    im.sendOk("領取失敗：\r\n\r\n#r1). 背包裝備欄位不夠6個位置,請清理.");
                    im.dispose();
                }
            } else if (typed==3) {
                if (im.getSpace(1) >= 6) {
                    var toDrop = im.getNewEquip(1004810); // 帽子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);  
                var toDrop = im.getNewEquip(1053065); // 套服   
                       toDrop.setStr(200); //裝備力量
                     toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                     im.addFromDrop(toDrop);            
                var toDrop = im.getNewEquip(1073160); // 鞋子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1082697); // 手套   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);       
                var toDrop = im.getNewEquip(1102942); // 披風   
                     toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1152198); // 護肩   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);   
                    im.gainItem(2435087, -1);
                    im.sendOk("恭喜您成功領取了弓箭職業神秘之影套裝一套.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.dispose();
                } else {
                    im.sendOk("領取失敗：\r\n\r\n#r1). 背包裝備欄位不夠6個位置,請清理.");
                    im.dispose();
                }
            } else if (typed==4) {
                if (im.getSpace(1) >= 6) {
                    var toDrop = im.getNewEquip(1004811); // 帽子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);  
                var toDrop = im.getNewEquip(1053066); // 套服   
                       toDrop.setStr(200); //裝備力量
                     toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                     im.addFromDrop(toDrop);            
                var toDrop = im.getNewEquip(1073161); // 鞋子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1082698); // 手套   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);       
                var toDrop = im.getNewEquip(1102943); // 披風   
                     toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1152199); // 護肩   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);   
                    im.gainItem(2435087, -1);
                    im.sendOk("恭喜您成功領取了盜賊職業神秘之影套裝一套.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.dispose();
                } else {
                    im.sendOk("領取失敗：\r\n\r\n#r1). 背包裝備欄位不夠6個位置,請清理.");
                    im.dispose();
                }
            } else if (typed==5) {
                if (im.getSpace(1) >= 6) {
                    var toDrop = im.getNewEquip(1004812); // 帽子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);  
                var toDrop = im.getNewEquip(1053067); // 套服   
                       toDrop.setStr(200); //裝備力量
                     toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                     im.addFromDrop(toDrop);            
                var toDrop = im.getNewEquip(1073162); // 鞋子   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1082699); // 手套   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);       
                var toDrop = im.getNewEquip(1102944); // 披風   
                     toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);     
                var toDrop = im.getNewEquip(1152200); // 護肩   
                    toDrop.setStr(200); //裝備力量
                    toDrop.setDex(200); //裝備敏捷
                    toDrop.setInt(200); //裝備智力
                    toDrop.setLuk(200); //裝備運氣
                    toDrop.setWatk(200); //物理攻擊
                    toDrop.setMatk(200); //魔法攻擊
                    im.addFromDrop(toDrop);   
                    im.gainItem(2435087, -1);
                    im.sendOk("恭喜您成功領取了海盜職業神秘之影套裝一套.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.worldSpouseMessage(0x01, "『神秘之影防具箱』 : 恭喜 " + im.getChar().getName() + " 領取了 最強級別神秘之影套裝.");
                    im.dispose();
                } else {
                    im.sendOk("領取失敗：\r\n\r\n#r1). 背包裝備欄位不夠6個位置,請清理.");
                    im.dispose();
                }
           }
        }
    }
  }