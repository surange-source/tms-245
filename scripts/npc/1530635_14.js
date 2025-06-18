var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed = 0;
var twd = 0;

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
            isOld = isOldPlayer();
            var selStr = "#d#e不用連續登錄，只要登錄7天，每天即可獲得下列物品：#n#k\r\n";
            selStr += "#e#d還需要登錄 #r" + (7 + cm.getBossLogAcc("登錄")) + "#d 天可領全部獎勵#n\r\n"
            
            selStr += "#L1##b" + aaa + " 第一天登錄獎勵 #v2023556# #rx 2#b [詳情點擊查看]#l#k\r\n";
            selStr += "#L2##b" + aaa + " 第二天登錄獎勵 #v2023553# #rx 4#b [詳情點擊查看]#l#k\r\n";
            selStr += "#L3##b" + aaa + " 第三天登錄獎勵 #v2023554# #rx 4#b[詳情點擊查看]#l#k\r\n";
            selStr += "#L4##b" + aaa + " 第四天登錄獎勵 #v2023555# #rx 4#b [詳情點擊查看]#l#k\r\n";
            selStr += "#L5##b" + aaa + " 第五天登錄獎勵 #v2023555# #rx 4#b [詳情點擊查看]#l#k\r\n";
            selStr += "#L6##b" + aaa + " 第六天登錄獎勵 #v2023555# #rx 4#b[詳情點擊查看]#l#k\r\n";
            selStr += "#L7##b" + aaa + " 第七天登錄獎勵 #v1113221# #rx 1#b [詳情點擊查看]#l#k\r\n";
            selStr += " \r\n\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
            if (selection == 1) {
                typed = 1;
                cm.sendYesNo("- #e#d第一天登錄時間獎勵#k#n\r\n\r\n#v2023556##r#t2023556# x 2 #b個。#k#n\r\n\r\n");
            } else if (selection == 2) {
                typed = 2;
                cm.sendYesNo("- #e#d第二天登錄時間獎勵#k#n\r\n\r\n#v2023553##r#t2023553# x 4 #b個。#n\r\n\r\n#v2023556##r#t2023556# x 2 #b個。#k#n\r\n\r\n#v2023555##r#t2023555# x 4 #b個。#k#n\r\n\r\n");
            } else if (selection == 3) {
                typed = 3;
                cm.sendYesNo("- #e#d第三天登錄時間獎勵#k#n\r\n\r\n#v2023553##r#t2023553# x 4 #b個。#n\r\n\r\n#v2023556##r#t2023556# x 2 #b個。#k#n\r\n\r\n#v2023555##r#t2023555# x 4 #b個。#k#n\r\n\r\n#v2023554##r#t2023554# x 4 #b個。#k#n\r\n\r\n");
            } else if (selection == 4) {
                typed = 4;
                cm.sendYesNo("- #e#d第四天登錄時間獎勵#k#n\r\n\r\n#v2023553##r#t2023553# x 4 #b個。#n\r\n\r\n#v2023556##r#t2023556# x 2 #b個。#k#n\r\n\r\n#v2023555##r#t2023555# x 4 #b個。#k#n\r\n\r\n#v2023554##r#t2023554# x 4 #b個。#k#n\r\n\r\n");
            } else if (selection == 5) {
                typed = 5;
                cm.sendYesNo("- #e#d第五天登錄時間獎勵#k#n\r\n\r\n#v2023553##r#t2023553# x 4 #b個。#n\r\n\r\n#v2023556##r#t2023556# x 2 #b個。#k#n\r\n\r\n#v2023555##r#t2023555# x 4 #b個。#k#n\r\n\r\n#v2023554##r#t2023554# x 4 #b個。#k#n\r\n\r\n");
            } else if (selection == 6) {
                typed = 6;
                cm.sendYesNo("- #e#d第六天登錄時間獎勵#k#n\r\n\r\n#v2023553##r#t2023553# x 4 #b個。#n\r\n\r\n#v2023556##r#t2023556# x 2 #b個。#k#n\r\n\r\n#v2023555##r#t2023555# x 4 #b個。#k#n\r\n\r\n#v2023554##r#t2023554# x 4 #b個。#k#n\r\n\r\n");
            } else if (selection == 7) {
                typed = 7;
                cm.sendYesNo("- #e#d第七天登錄時間獎勵#k#n\r\n\r\n#v2023553##r#t2023553# x 4 #b個。#n\r\n\r\n#v2023556##r#t2023556# x 2 #b個。#k#n\r\n\r\n#v2023555##r#t2023555# x 4 #b個。#k#n\r\n\r\n#v1113221##r#t1113221# x 1 #b個。#k#n\r\n\r\n#v3013002##r#t3013002# x 1 #b個。#k#n\r\n\r\n");
            }
        } else if (status == 2) {
            if (typed == 1) {
                if (cm.getSpace(4) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 360 && cm.getLevel() >= 140) {
                    setBossLog();
                    if (cm.getBossLogAcc("登錄") == -1 && cm.getBossLogAcc("第一天") == 0) {
                        /*cm.gainItem(5062000,20);
                        cm.gainMeso(2000000);
                        cm.gainNX(2, 10000);*/
                        cm.gainItem(2023556,2);
                        //cm.gainNX(1, 10000);
                        cm.setBossLogAcc("第一天", -2);
                        cm.sendOk("恭喜您成功領取登錄第一天獎勵。");
                        cm.worldSpouseMessage(0x20, "『新手獎勵』 : 恭喜 " + cm.getChar().getName() + " 成功領取第一天登錄獎勵。");
                        cm.dispose();
                    } else {
                        cm.sendOk("無法領取該禮包。\r\n1.您已經領取過該禮包。\r\n2.您應該領取#r#e第"+(cm.getBossLogAcc("登錄")*-1)+"天#n#k禮包。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 今天在線時間不足360分鐘.\r\n2). 已經領取過今天的獎勵.\r\n3). 其他欄不足請及時清理.\r\n4). 等級小於140級. ");
                    cm.dispose();
                }
            } else if (typed == 2) {
                if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 160) {
                    setBossLog();
                    if (cm.getBossLogAcc("登錄") == -2 && cm.getBossLogAcc("第二天") == 0) {
                        /*cm.gainMeso(2000000);
                        cm.gainItem(5062002, 20);
                        cm.gainItem(2431741, 3);*/
                        cm.gainItem(2023556, 2);
                        cm.gainItem(2023555, 4);
                        cm.gainItem(023553, 4);
                        
                        cm.setBossLogAcc("第二天", -2);
                        cm.sendOk("恭喜您成功領取登錄第二天獎勵。");
                        cm.worldSpouseMessage(0x20, "『新手獎勵』 : 恭喜 " + cm.getChar().getName() + " 成功領取第二天登錄獎勵。");
                        cm.dispose();
                    } else {
                        cm.sendOk("無法領取該禮包。\r\n1.您已經領取過該禮包。\r\n2.您應該領取#r#e第"+(cm.getBossLogAcc("登錄")*-1)+"天#n#k禮包。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 今天在線時間不足420分鐘.\r\n2). 已經領取過今天的獎勵.\r\n3). 特殊欄不足請及時清理.\r\n4). 等級小於160級. ");
                    cm.dispose();
                }
            } else if (typed == 3) {
                if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 180) {
                    setBossLog();
                    if (cm.getBossLogAcc("登錄") == -3 && cm.getBossLogAcc("第三天") == 0) {
                        /*cm.gainItem(5062500, 20);
                        cm.gainNX(5000);*/
                        cm.gainItem(2023556, 2);
                        cm.gainItem(2023555, 4);
                        cm.gainItem(2023553, 4);
                        cm.gainItem(2023554, 4);
            
                        cm.setBossLogAcc("第三天", -2);
                        cm.sendOk("恭喜您成功領取登錄第三天獎勵。");
                        cm.worldSpouseMessage(0x20, "『新手獎勵』 : 恭喜 " + cm.getChar().getName() + " 成功領取第三天登錄獎勵。");
                        cm.dispose();
                    } else {
                        cm.sendOk("無法領取該禮包。\r\n1.您已經領取過該禮包。\r\n2.您應該領取#r#e第"+(cm.getBossLogAcc("登錄")*-1)+"天#n#k禮包。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 今天在線時間不足420分鐘.\r\n2). 已經領取過今天的獎勵.\r\n3). 特殊欄不足請及時清理.\r\n4). 等級小於180級.");
                    cm.dispose();
                }
            } else if (typed == 4) {
                if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 180) {
                    setBossLog();
                    if (cm.getBossLogAcc("登錄") == -4 && cm.getBossLogAcc("第四天") == 0) {
                        /*cm.gainItem(5062009, 10);
                        cm.gainNX(5000);*/
                        cm.gainItem(2023556, 2);
                        cm.gainItem(2023555, 4);
                        cm.gainItem(2023553, 4);
                        cm.gainItem(2023554, 4);
            
                        cm.setBossLogAcc("第四天", -2);
                        cm.sendOk("恭喜您成功領取登錄第四天獎勵。");
                        cm.worldSpouseMessage(0x20, "『新手獎勵』 : 恭喜 " + cm.getChar().getName() + " 成功領取第四天登錄獎勵。");
                        cm.dispose();
                    } else {
                        cm.sendOk("無法領取該禮包。\r\n1.您已經領取過該禮包。\r\n2.您應該領取#r#e第"+(cm.getBossLogAcc("登錄")*-1)+"天#n#k禮包。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 今天在線時間不足420分鐘.\r\n2). 已經領取過今天的獎勵.\r\n3). 特殊欄不足請及時清理.\r\n4). 等級小於180級.");
                    cm.dispose();
                }
            } else if (typed == 5) {
                if (cm.getSpace(5) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 180) {
                    setBossLog();
                    if (cm.getBossLogAcc("登錄") == -5 && cm.getBossLogAcc("第五天") == 0) {
                        /*cm.gainItem(5062010, 10);
                        cm.gainNX(10000);*/
                        cm.gainItem(2023556, 2);
                        cm.gainItem(2023555, 4);
                        cm.gainItem(2023553, 4);
                        cm.gainItem(2023554, 4);
            
                        cm.setBossLogAcc("第五天", -2);
                        cm.sendOk("恭喜您成功領取登錄第五天獎勵。");
                        cm.worldSpouseMessage(0x20, "『新手獎勵』 : 恭喜 " + cm.getChar().getName() + " 成功領取第五天登錄獎勵。");
                        cm.dispose();
                    } else {
                        cm.sendOk("無法領取該禮包。\r\n1.您已經領取過該禮包。\r\n2.您應該領取#r#e第"+(cm.getBossLogAcc("登錄")*-1)+"天#n#k禮包。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 今天在線時間不足420分鐘.\r\n2). 已經領取過今天的獎勵.\r\n3). 特殊欄不足請及時清理.\r\n4). 等級小於180級.");
                    cm.dispose();
                }
            } else if (typed == 6) {
                if (cm.getSpace(2) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 200) {
                    setBossLog();
                    if (cm.getBossLogAcc("登錄") == -6 && cm.getBossLogAcc("第六天") == 0 ) {
                        /*cm.gainItem(2049135, 10);
                        cm.gainNX(10000);*/
                        cm.gainItem(2023556, 2);
                        cm.gainItem(2023555, 4);
                        cm.gainItem(2023553, 4);
                        cm.gainItem(2023554, 4);
            
                        cm.setBossLogAcc("第六天", -2);
                        cm.sendOk("恭喜您成功領取登錄第六天獎勵。");
                        cm.worldSpouseMessage(0x20, "『新手獎勵』 : 恭喜 " + cm.getChar().getName() + " 成功領取第六天登錄獎勵。");
                        cm.dispose();
                    } else {
                        cm.sendOk("無法領取該禮包。\r\n1.您已經領取過該禮包。\r\n2.您應該領取#r#e第"+(cm.getBossLogAcc("登錄")*-1)+"天#n#k禮包。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 今天在線時間不足420分鐘.\r\n2). 已經領取過今天的獎勵.\r\n3). 裝備欄不足請及時清理.\r\n4). 等級小於200級.");
                    cm.dispose();
                }
            } else if (typed == 7) {
                if (cm.getSpace(1) >= 1 && cm.getPlayer().getTodayOnlineTime() >= 420 && cm.getLevel() >= 200) {
                    setBossLog();
                    if (cm.getBossLogAcc("登錄") == -7 && cm.getBossLogAcc("第七天") == 0) {
                        //cm.gainItem(1113037, 1);
                        /*cm.gainNX(1, 30000);
                        var ii = cm.getItemInfo();
                        var toDrop = ii.randomizeStats(ii.getEquipById(1113037)).copy(); // 生成一個Equip類                    
                        toDrop.setStr(15); //裝備力量
                        toDrop.setDex(15); //裝備敏捷
                        toDrop.setInt(15); //裝備智力
                        toDrop.setLuk(15); //裝備運氣
                        toDrop.setMatk(15); //物理攻擊
                        toDrop.setWatk(15); //魔法攻擊 
                        cm.addFromDrop(cm.getC(), toDrop, false);*/
                        cm.gainItem(2023556, 2);
                        cm.gainItem(2023555, 4);
                        cm.gainItem(2023553, 4);
                        cm.gainItem(1113221, 1);
                        cm.gainItem(3013002, 1);
                        cm.setBossLogAcc("第七天", -2);
                        cm.sendOk("恭喜您成功領取登錄第七天獎勵。");
                        cm.worldSpouseMessage(0x20, "『新手獎勵』 : 恭喜 " + cm.getChar().getName() + " 成功領取第七天登錄獎勵獲得神器一件。");
                        cm.dispose();
                    } else {
                        cm.sendOk("無法領取該禮包。\r\n1.您已經領取過該禮包。\r\n2.您應該領取#r#e第"+(cm.getBossLogAcc("登錄")*-1)+"天#n#k禮包。");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("失敗：\r\n\r\n#r1). 今天在線時間不足600分鐘.\r\n2). 已經領取過今天的獎勵.\r\n3). 裝備欄不足請及時清理.4). 等級小於200級.");
                    cm.dispose();
                }
            }
        }
    }
}
function isOldPlayer() {
    /*判斷是否老玩家*/
    var conn = cm.getConnection();
    var sql = "select count(id) as num from accounts where id = ? and createdat < '2019-10-13'";
    var pstmt = conn.prepareStatement(sql);
    pstmt.setInt(1, cm.getPlayer().getAccountID());
    var rs = pstmt.executeQuery();
    var count = 0;
    var tof = false;
    if (rs.next()) count = rs.getInt('num');
    if (count > 0) tof = true;
    rs.close();
    pstmt.close();
    conn.close();
    return tof;
    /*end*/
}

function setBossLog() {
    if (cm.getBossLogAcc("登錄天數") <= 0 && cm.getBossLogAcc("登錄") > -7) {
        cm.setBossLogAcc("登錄天數");
        cm.setBossLogAcc("登錄", -2);
    }
}