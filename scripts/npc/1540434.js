/* 
   腳本製作人：AND QQ：358122354
   歡迎咨詢制定腳本。
 */
var status = -1;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var uiFPaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";
var uiFRock = "#fUI/UIWindow.img/RpsGame/Frock#";
var uiFScissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var uiPaper = "#fUI/UIWindow.img/RpsGame/paper#";
var uiRock = "#fUI/UIWindow.img/RpsGame/rock#";
var uiScissor = "#fUI/UIWindow.img/RpsGame/scissor#";
var textArr = Array("錘子","剪刀","布");
var FpictureArr=Array(uiFRock, uiFScissor, uiFPaper);
var pictureArr=Array(uiRock, uiScissor, uiPaper);
var postPoints = 0;
var typed=0;
var myHsc;
var lists = null;
var enemy = null;
var beDelete = Array();
var winPoints= 0;
function start() {
    
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 1) {
            status = 1;
            //return;
        } else {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var conn = cm.getConnection();
        var pstmt = conn.prepareStatement("select sum(Cpoint) from memory_hscrank");
        var result = pstmt.executeQuery();
        result.next();
        var Cpoint = (result.getString("sum(Cpoint)")*0.0001);
        if (Cpoint==null){
            Cpoint = 0;
        }
        var text =head+"#e卡布：生財之道！快來猜拳吧！\r\n";
        text+="本服當前賭博累計資金：#r"+Cpoint+"W #k點\r\n";
        text+="#L4##r[簡介]猜拳對戰版說明#l#b\r\n\r\n";
        text+="#L0#"+icon+" 發起新挑戰#l\r\n";
        text+="#L1#"+icon+" 查看挑戰列表#l\r\n";
        text+="#L2#"+icon+" 查看我發起的挑戰#l\r\n";
        text+="#L3#"+icon+" 撤銷我的挑戰#l\r\n";
        text+="#L5#"+icon+" 查看賭博排名#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1) {
        typed = selection;
        if (selection == 0) {
            var text = "請輸入你要投注的金額：";
            cm.sendGetNumber(text, 0, 5000, 99999);
        } else if (selection == 1) {
            var text = "";
            myHsc = new Hsc();
            lists = myHsc.list();
            if (lists == null) {
                cm.sendSimple("暫時沒有其他人發起挑戰！");
                status = -1;
            } else {
                typed = 999;
                text = "#d#e< 正在火熱進行中的挑戰 >#n#k\r\n";
                for(var key in lists) {
                    var id = lists[key]['id'];
                    var sponsorname = lists[key]['sponsorname'];
                    var points = lists[key]['points'];
                    text+="#L"+key+"##b[編號"+id+"]#k 挑戰【#r"+sponsorname+"#k】\t賞金【#r"+points+"#k】#l\r\n";
                }
                cm.sendSimple(text);
                //cm.dispose();
            }
        } else if (selection == 2) {
            typed = 888;
            var text = "#e#d您的戰況入下：#n#k\r\n";
            myHsc = new Hsc();
            battles = myHsc.getMyBattles();
            if (battles==null) {
                cm.sendSimple("暫無記錄");
                status = -1;
                return ;
            }
            winPoints = 0;
            var bj = 0;
            for(var key in battles) {
                var id = battles[key]['id'];
                var sponsorname = battles[key]['sponsorname'];
                var points = battles[key]['points'];
                var challengername = battles[key]['challengername'];
                var spunchway = battles[key]['spunchway'];
                var cpunchway = battles[key]['cpunchway'];
                text+="#b[編號"+id+"]#k 賭資【#r"+points+"#k】";
                beDelete.push(id);
                var result = spunchway - cpunchway;
                if (result == -1 || result == 2) {
                    //win
                    bj+=points;
                    winPoints += points;
                    text+="#b【贏】#k";
                } else if (result == 0) {
                    //tie
                    bj+=points;
                    text+="#d【平】#k";
                } else {
                    text+="#r【輸】#k"
                }
                text+="\r\n";
            }
            winPoints = Math.floor(winPoints*0.9)+bj;
            text+="共贏的樂豆點"+winPoints+"，點擊#b#e下一步#n#k領取樂豆點。\r\n";
            cm.sendSimple(text);
        } else if (selection == 3) {
            var text = "";
            myHsc = new Hsc();
            lists = myHsc.getMyList();
            if (lists == null) {
                cm.sendSimple("暫時可以撤回的挑戰！");
                status = -1;
            } else {
                typed = 777;
                text = "#d#e< 你的所有有效挑戰列表 >#n#k\r\n";
                winPoints = 0;
                beDelete = Array();
                for(var key in lists) {
                    var id = lists[key]['id'];
                    var sponsorname = lists[key]['sponsorname'];
                    var points = lists[key]['points'];
                    var spunchway = lists[key]['spunchway'];
                    beDelete.push(id);
                    winPoints+=points;
                    text+="#L"+key+"##b[編號"+id+"]#k \t賞金【#r"+points+"#k】 出招：【#b"+textArr[spunchway]+"#k】#l\r\n";
                }
                text+="\r\n點擊#b#e下一步#n#k將撤回所有有效挑戰列表，並可以得到"+winPoints+"樂豆點。如不想撤回，請點擊#b結束對話#k";
                cm.sendSimple(text);
                //cm.dispose();
            }
        }else if (selection == 4) {
            var text = "#d#e<發起新挑戰>#n#k\r\n";
            text+="\t點擊[#b"+icon+" 發起新挑戰#k]可以發起新挑戰至少需要#r5000#k樂豆點作為賞金。任意選擇#b錘子、剪刀、布#k作為你出的拳招，發佈完成後，你的挑戰信息將會以列表的形式顯示在#b#e挑戰列表#b#k\r\n";
            text+="#d#e<進入挑戰>#n#k\r\n";
            text+="\t點擊[#b"+icon+" 查看挑戰列表#k]可以進入挑戰，挑戰列表中會顯示發起人的角色名，發起的賞金，點擊列表項目進入挑戰，任意選擇#b錘子、剪刀、布#k作為你出的拳招，如果你贏的勝利時可以獲得賞金的90%作為獎勵。如果你輸了，會失去賞金的100%。\r\n";
            text+="#d#e<領取賞金>#n#k\r\n";
            text+="\t點擊[#b"+icon+" 查看我發起的挑戰#k]可以看到你所發起的挑戰的比賽結果，並領取相應的賞金。\r\n";
            text+="#d#e<撤銷挑戰>#n#k\r\n";
            text+="\t點擊[#b"+icon+" 撤銷我的挑戰#k]可以撤銷你所發佈的未有人參與的挑戰項目，並且返還100%賞金。\r\n";
            cm.sendSimple(text);
            status = -1;
        }else if (selection == 5) {//查看排名
            var conn = cm.getConnection();
            var pstmt = conn.prepareStatement("select Name,Win,Lose,Cpoint from memory_hscrank order by Win desc,Lose Asc limit 10;");
            var result = pstmt.executeQuery();
            var text = "\t\t\t\t#e#d★ 參與賭王的前十排名 ★#k#n\r\n\r\n";
            text += "   #e名次#n\t#e玩家暱稱#n\t\t#e贏#n\t#e輸#n\t#e累計資金#n\t\t #e#n\r\n";
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
                text += result.getString("Name");
                for (var j = 16 - result.getString("Name").getBytes().length; j > 0 ; j--) {
                    text += " ";
                }
                text += "" + result.getString("Win");
                text += "\t   " + result.getString("Lose");
                text += "\t " + result.getString("Cpoint");
                text += "\r\n";
                }
            result.close();
            pstmt.close();
            cm.sendOkS(text, 3);
            status = -1;
        }
    } else if (status == 2) {
        if (typed == 888 || typed == 777) {
            var text = "恭喜你，成功領取了#r"+winPoints+"#k樂豆點！";
            if (typed == 777)
            {
                text = "撤回挑戰成功，領取了#r"+winPoints+"#k樂豆點";
            }
            cm.gainNX(winPoints);
            myHsc = new Hsc();
            myHsc.del(beDelete);
            beDelete = Array();
            cm.sendOk(text);
            cm.dispose();
        } else {
            myHsc = new Hsc();
            var validCount = myHsc.checkValidCount();
            var text = "#d#e[發起新的挑戰]#n#k\r\n請選擇您要向對手出的拳：\r\n";
            if (typed == 999) {
                enemy = lists[selection];
                points=enemy['points'];
                if (cm.getPlayer().getCSPoints(1) < points) {
                    cm.sendSimple("你至少需要#r"+points+"#k樂豆點，才可以向他挑戰！");
                    status =-1;
                    return;
                }
                text = "#d#e[正在向#b"+enemy['sponsorname']+"#d挑戰]#n#k\r\n來吧，選一個拳和他拚一拚：\r\n";
            } else {
                if (validCount>=5) {
                    cm.sendSimple("你已經發佈了#r5#k條挑戰尚未完結，無法繼續發佈挑戰，您可以選擇#b撤回挑戰#k或者#b挑戰別人#k，當然您也可以選擇#r撤回挑戰#k來收回樂豆點。");
                    status = -1;
                    return;
                }
                postPoints = selection;
                if (cm.getPlayer().getCSPoints(1) < postPoints) {
                    cm.sendSimple("你沒有#r"+postPoints+"樂豆點，無法發起挑戰#k！");
                    status =-1;
                    return;
                }
            }
            text+="#L0#"+uiFRock+"#l";
            text+="#L1#"+uiFScissor+"#l";
            text+="#L2#"+uiFPaper+"#l";
            cm.sendSimple(text);
        }
    } else if (status == 3) {
        var conn = cm.getConnection();
        //pstmt.executeUpdate();
        if (typed == 999) {
            //挑戰結果
            myHsc = new Hsc();
            var myHand = selection;
            var id = enemy['id'];
            var enemyHand = enemy['spunchway'];
            var result =  myHand - enemyHand;
            var isSuccess = myHsc.update(id, myHand);
            if (!isSuccess) {
                cm.sendOk("本局已經被人搶先了一步，請更換一個比賽對象吧。");
                cm.dispose();
                return;
            }
            var resultPic = FpictureArr[myHand]+" "+pictureArr[enemyHand];
            if (result == -1 || result == 2) {
                //win
                var pstmt = conn.prepareStatement("INSERT INTO memory_hscrank (NAME,Win,Lose,Cpoint) VALUES ('"+cm.getName()+"',1,0,"+enemy['points']+")  ON DUPLICATE KEY UPDATE Win=Win+1,Lose=Lose,Cpoint=Cpoint+"+enemy['points']+"");
                pstmt.executeUpdate();//贏的一方記錄
                var pstmt = conn.prepareStatement("INSERT INTO memory_hscrank (NAME,Win,Lose,Cpoint) VALUES ('"+enemy['sponsorname']+"',0,1,"+enemy['points']+")  ON DUPLICATE KEY UPDATE Win=Win,Lose=Lose+1,Cpoint=Cpoint+"+enemy['points']+"");
                pstmt.executeUpdate();//輸的一方記錄
                var points = Math.floor(enemy['points']*0.9);
                cm.gainNX(points);
                cm.sendOk("真是好拳法，贏了#r"+points+"#k樂豆點，繼續找別人挑戰吧！！\r\n"+resultPic);
                cm.worldSpouseMessage(0x07,"[賞金拳王] : 恭喜 " + cm.getName() + " 贏取了 "+enemy['sponsorname']+" 的 " + points + " 樂豆點！");


                cm.dispose();
            } else if (result == 0) {
                //tie
                cm.sendOk("唔~打成了平手，繼續找別人挑戰吧！！\r\n"+resultPic);
                cm.dispose();
            } else {
                //lose
                var pstmt = conn.prepareStatement("INSERT INTO memory_hscrank (NAME,Win,Lose,Cpoint) VALUES ('"+cm.getName()+"',0,1,"+enemy['points']+")  ON DUPLICATE KEY UPDATE Win=Win,Lose=Lose+1,Cpoint=Cpoint+"+enemy['points']+"");
                pstmt.executeUpdate();//贏的一方記錄
                var pstmt = conn.prepareStatement("INSERT INTO memory_hscrank (NAME,Win,Lose,Cpoint) VALUES ('"+enemy['sponsorname']+"',1,0,"+enemy['points']+")  ON DUPLICATE KEY UPDATE Win=Win+1,Lose=Lose,Cpoint=Cpoint+"+enemy['points']+"");
                pstmt.executeUpdate();//輸的一方記錄
                var points = enemy['points'];
                cm.gainNX(-points);
                cm.sendOk("悲劇了，輸了#r"+points+"#k樂豆點，別灰心，繼續找別人挑戰吧！！\r\n"+resultPic);
                cm.worldSpouseMessage(0x07,"[賞金拳王] : 恭喜 " + enemy['sponsorname'] + " 贏取了 "+cm.getName()+" 的 " + points + " 樂豆點！");
                cm.dispose();
            }
        } else if (typed == 0) {
            myHsc = new Hsc();
            var punchway = selection;
            cm.gainNX(-postPoints);
            if (myHsc.post(selection, postPoints)) {
                cm.worldSpouseMessage(0x0F,"[賞金拳王] : 玩家 " + cm.getName() + " 以" + postPoints + "樂豆點髮起了挑戰，誰敢與之一戰？！");
                cm.sendOk("您以#r"+postPoints+"#k樂豆點的賞金出拳成功，請耐心等待人來挑戰。");
                cm.dispose();
            } else {
                cm.sendOk("出拳失敗，發生未知錯誤。請聯繫管理員");
                cm.dispose();
            }
        }
    }
}

var Hsc = function() {
    this.db = cm.getConnection();
    
    //發起新挑戰
    this.post = function(punchway, points) {
        var sql = "insert into memory_hsc(sponsor, spunchway, points, postedtime) values(?,?,?,?)";
        var pstmt = this.db.prepareStatement(sql);
        var currentTimeStamp = java.lang.System.currentTimeMillis();
        pstmt.setInt(1, cm.getPlayer().getId());
        pstmt.setInt(2, punchway);
        pstmt.setInt(3, points);
        pstmt.setLong(4, currentTimeStamp);
        var result = false;
        if (pstmt.executeUpdate()) {
            result = true;
        }
        pstmt.close();
        return result;
    }
    
    this.checkValidCount = function() {
        var sql = "select count(id) as validcount from memory_hsc where sponsor = ? and postedtime >= ? ";
        var pstmt = this.db.prepareStatement(sql);
        var currentTimeStamp = java.lang.System.currentTimeMillis();
        var endTimeStamp = currentTimeStamp-12*3600*1000;
        pstmt.setInt(1, cm.getPlayer().getId());
        pstmt.setLong(2, endTimeStamp);
        var rs = pstmt.executeQuery();
        var lists = Array();
        var count = 0;
        if (rs.next())
            count = rs.getInt("validcount");
        rs.close();
        pstmt.close();
        return count;
    }
    
    //獲取有效挑戰列表
    this.list = function(){
        //var sql = "select h.*, c1.name as sponsorname, c2.name as challengername from memory_hsc h, characters c1, characters c2 where sponsor != ? and postedtime >= ? and h.sponsor = c1.id and h.challenger=c2.id order by id desc";
        var sql = "select h.*, c.name as sponsorname from memory_hsc h, characters c where h.sponsor != ? and h.postedtime >= ? and h.sponsor = c.id and h.challenger=-1 order by rand() desc limit 50";
        var pstmt = this.db.prepareStatement(sql);
        var currentTimeStamp = java.lang.System.currentTimeMillis();
        var endTimeStamp = currentTimeStamp-12*3600*1000;
        pstmt.setInt(1, cm.getPlayer().getId());
        pstmt.setLong(2, endTimeStamp);
        var rs = pstmt.executeQuery();
        var lists = Array();
        while(rs.next()) {
            var data = Array();
            data['id']=rs.getInt("id");
            data['sponsor']=rs.getInt("sponsor");
            data['spunchway']=rs.getInt("spunchway");
            data['points']=rs.getInt("points");
            data['sponsorname']=rs.getString("sponsorname");
            //data['']
            lists.push(data);
        }
        rs.close();
        pstmt.close();
        if (lists.length>0)
            return lists;
        else
            return null;
    }
    
    //獲取我的未有結果的挑戰列表
    this.getMyList = function(){
        var sql = "select h.*, c.name as sponsorname from memory_hsc h, characters c where h.sponsor = ? and h.sponsor = c.id and h.challenger=-1 order by rand() desc limit 50";
        var pstmt = this.db.prepareStatement(sql);
        var currentTimeStamp = java.lang.System.currentTimeMillis();
        var endTimeStamp = currentTimeStamp-12*3600*1000;
        pstmt.setInt(1, cm.getPlayer().getId());
        var rs = pstmt.executeQuery();
        var lists = Array();
        while(rs.next()) {
            var data = Array();
            data['id']=rs.getInt("id");
            data['sponsor']=rs.getInt("sponsor");
            data['spunchway']=rs.getInt("spunchway");
            data['points']=rs.getInt("points");
            data['sponsorname']=rs.getString("sponsorname");
            //data['']
            lists.push(data);
        }
        rs.close();
        pstmt.close();
        if (lists.length>0)
            return lists;
        else
            return null;
    }
    
    //更新戰鬥結果
    this.update = function(id,cpunchway) {
        var sql = "update memory_hsc set challenger = ?, cpunchway = ? where id = ? and challenger=-1";
        var pstmt = this.db.prepareStatement(sql);
        //var currentTimeStamp = java.lang.System.currentTimeMillis();
        pstmt.setInt(1, cm.getPlayer().getId());
        pstmt.setInt(2, cpunchway);
        pstmt.setInt(3, id);
        //pstmt.setLong(4, currentTimeStamp);
        var result = false;
        if (pstmt.executeUpdate()) {
            result = true;
        }
        pstmt.close();
        return result;
    }
    
    //獲取我的戰況
    this.getMyBattles = function(){
        var sql = "select h.*, c1.name as sponsorname, CASE h.challenger WHEN -1 then h.challenger ELSE c2.name end as challengername from memory_hsc h, characters c1, characters c2 where h.sponsor = ? and h.sponsor = c1.id and h.challenger=c2.id order by h.id desc";
        //var sql = "select h.*, c.name as sponsorname from memory_hsc h, characters c where h.sponsor != ? and h.postedtime >= ? and h.sponsor = c.id and h.challenger=-1 order by id desc";
        var pstmt = this.db.prepareStatement(sql);
        pstmt.setInt(1,cm.getPlayer().getId());
        var rs = pstmt.executeQuery();
        var lists = Array();
        while(rs.next()) {
            var data = Array();
            data['id']=rs.getInt("id");
            data['sponsor']=rs.getInt("sponsor");
            data['spunchway']=rs.getInt("spunchway");
            data['points']=rs.getInt("points");
            data['sponsorname']=rs.getString("sponsorname");
            data['challengername']=rs.getString("challengername")
            data['cpunchway']=rs.getString("cpunchway");
            lists.push(data);
        }
        rs.close();
        pstmt.close();
        if (lists.length>0)
            return lists;
        else
            return null;
    }
    
    //刪除數據
    this.del = function(ids) {
        var idStr = "";
        for(var key in ids) {
            ids[key]=parseInt(ids[key]);
            idStr+=ids[key]+",";
        }
        idStr=idStr.substring(0,idStr.length-1);
        var sql = "delete from memory_hsc where id in ("+idStr+") and sponsor = ?";
        var pstmt = this.db.prepareStatement(sql);
        //var currentTimeStamp = java.lang.System.currentTimeMillis();
        pstmt.setInt(1, cm.getPlayer().getId());
        //pstmt.setLong(4, currentTimeStamp);
        var result = false;
        if (pstmt.executeUpdate()) {
            result = true;
        }
        pstmt.close();
        return result;
    }
    
}