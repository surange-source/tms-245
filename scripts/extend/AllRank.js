var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        var text = "#e請選擇要查詢的榜單：#r\r\n";
        //text += "\t\t\t#L2#本月儲值排行榜#l\r\n";
        text += "\t\t\t#L0#世界等級排行榜#l\r\n";
        //text += "\t\t\t#L4#世界富豪排行榜#l\r\n";
        //text += "\t\t\t#L5#種植高手排行榜#l\r\n";
        text += "\t\t\t#L1#魅力寶貝排行榜#l\r\n";
        text += "\t\t\t#L3#世界公會排行榜#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            //var list = cm.getRankingTopInstance().getLevelRank().iterator();
            var conn = cm.getConnection();
            var sql = "SELECT name, level, gender FROM characters WHERE gm <= 0 ORDER BY level desc, exp desc limit 10;";
            var pstmt = conn.prepareStatement(sql);
            var result = pstmt.executeQuery();
            var text = "\t\t\t\t#e#d★ 個人等級排行 ★#k#n\r\n\r\n";
            text += "\t#e名次#n\t#e玩家暱稱#n\t\t\t#e等級#n\t\t          ";
            var i = 1;
            while (result.next()) {
                if (i == 1) {
                    text += "#r";
                } else if (i == 2) {
                    text += "#g";
                } else if (i == 3) {
                    text += "#b";
                }
                text += "\t " + i + "\t\t ";
                text += result.getString("name");
                for (var j = 16 - result.getString("name").replaceAll("[^\\x00-\\xff]", "**").getBytes().length; j > 0; j--) {
                    text += " ";
                }
                text += "\t " + result.getString("level");

                //text += "\t\t\t " + result.getString("reborns1") + "#k";
                text += "\t\t\t #k";

                text += "\r\n";
                i++;
            }
            result.close();
            pstmt.close();
            conn.close();
            cm.sendOkS(text, 3);
            cm.dispose();
        } else if (selection == 1) {
            var conn = cm.getConnection();
            var sql = "SELECT name, fame, gender from characters where gm<=0 order by fame desc limit 10;";
            var pstmt = conn.prepareStatement(sql);
            var list = pstmt.executeQuery();
            var text = "\t\t\t\t#e#d★ 魅力寶貝排行 ★#k#n\r\n\r\n";
            text += "\t#e名次#n\t#e玩家暱稱#n\t\t  #e人氣#n\t\t  #e稱號#n\r\n";
            var i = 0;
            while (list.next()) {
                i++;
                if (i == 1) {
                    text += "#r";
                } else if (i == 2) {
                    text += "#g";
                } else if (i == 3) {
                    text += "#b";
                }
                text += "\t " + i + "\t\t ";

                // 填充名字空格
                text += list.getString("name");
                for (var j = 16 - list.getString("name").replaceAll("[^\\x00-\\xff]", "**").getBytes().length; j > 0; j--) {
                    text += " ";
                }

                // 填充人氣度
                text += "\t " + list.getInt("fame");
                var famevalues = list.getInt("fame");
                var famelength = 0;
                while (famevalues > 0) {
                    famevalues = Math.floor(famevalues / 10);
                    famelength += 1;
                }
                for (var j = 8 - famelength; j > 0; j--) {
                    text += " ";
                }

                if (i == 1) {
                    if (list.getInt("gender") == 0) {
                        text += " ★世界偶像★#k";
                    } else {
                        text += " ★魅力寶貝★#k";
                    }
                } else if (i == 2) {
                    text += "\t #k";
                } else if (i == 3) {
                    text += "\t #k";
                }
                text += "\r\n";
            }
            list.close();
            pstmt.close();
            conn.close();
            cm.sendOkS(text, 3);
            cm.dispose();
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9310373, "PayRank");
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9040004);
        } else if (selection == 4) {
            var conn = cm.getConnection();
            var sql = "SELECT c.name, (c.meso+b.money*100000000) as totalmoney from characters c,bank b where b.charid=c.id order by totalmoney desc limit 10;";
            var pstmt = conn.prepareStatement(sql);
            var list = pstmt.executeQuery();
            var text = "\t\t\t\t#e#d★ 世界富豪排行 ★#k#n\r\n\r\n";
            text += "\t#e名次#n\t#e玩家暱稱#n\t\t  #e資產#n\t\t  #e稱號#n\r\n";
            for (var i = 1; i <= 10; i++) {
                if (!list.next()) {
                    break;
                }
                if (i == 1) {
                    text += "#r";
                } else if (i == 2) {
                    text += "#g";
                } else if (i == 3) {
                    text += "#b";
                }
                text += "\t " + i + "\t\t ";

                // 填充名字空格
                text += list.getString("name");
                for (var j = 16 - list.getString("name").getBytes().length; j > 0; j--) {
                    text += " ";
                }

                // 填充資產
                var zc = "≌" + (list.getLong("totalmoney") / 100000000).toFixed(2) + "億";
                text += "  " + zc;
                var totalmoney = list.getLong("totalmoney");
                var totalmoneylength = 0;
                while (totalmoney > 0) {
                    totalmoney = Math.floor(totalmoney / 10);
                    totalmoneylength += 1;
                }
                for (var j = 8 - totalmoneylength; j > 0; j--) {
                    text += " ";
                }


                text += "#k\r\n";
            }
            list.close();
            pstmt.close();
            conn.close();
            cm.sendOkS(text, 3);
            cm.dispose();
        } else if (selection == 5) {
            var conn = cm.getConnection();
            var sql = "select c.name,g.level from characters c, memory_garden g where c.gm<=0 and c.id=g.charid order by g.level desc, g.exp desc limit 10;";
            var pstmt = conn.prepareStatement(sql);
            var result = pstmt.executeQuery();
            var text = "\t\t\t\t#e#d★ 種植高手排行 ★#k#n\r\n\r\n";
            text += "\t#e名次#n\t#e玩家暱稱#n\t\t#e花園等級#n\t\t #e稱號#n\r\n";
            for (var i = 1; i <= 10; i++) {
                if (!result.next()) {
                    break;
                }
                if (i == 1) {
                    text += "#r";
                } else if (i == 2) {
                    text += "#g";
                } else if (i == 3) {
                    text += "#b";
                }
                text += "\t " + i + "\t\t ";

                // 填充名字空格
                text += result.getString("name");
                for (var j = 16 - result.getString("name").getBytes().length; j > 0; j--) {
                    text += " ";
                }
                text += "\t " + result.getString("level");
                if (i == 1) {
                    text += "\t\t ★天工開物★#k";
                } else if (i == 2) {
                    text += "\t\t ★妙手回春★#k";
                } else if (i == 3) {
                    text += "\t\t ★熟能生巧★#k";
                }
                text += "\r\n";
            }
            result.close();
            pstmt.close();
            conn.close();
            cm.sendOkS(text, 3);
            cm.dispose();
        }
    }
}