var status = -1;
var text = "";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var typed=1;
var teacher = null;
var studentName = null;
var studentId = 0;
var teacherId = 0;
var em = null;
// 出師時獲得的良師值
var upgradeExp = 10;
// 徒弟解除關係扣除的良師值
var leaveTeacherPoint = 3;
// 師傅驅逐徒弟扣除的良師值
var leaveStudentPoint = 2;
// 師傅獎勵定義
var teacherItemList = new Array();
// 0級，普通教師
/* //這一段被註釋了，表示0級普通教師沒有獎勵可以領取，防止刷獎勵。
teacherItemList[0] = Array(
    Array(4000463, 1),
    Array(5062002, 5)
)
*/
teacherItemList[1] = Array(
    Array(4001839, 50),//星星
    Array(2431738, 1)//楓點500
)
teacherItemList[2] = Array(
    Array(4001839, 100),//星星
    Array(2431739, 1)//楓點1000
)
teacherItemList[3] = Array(
    Array(2431740, 1),//楓點1500
    Array(4001839, 200),//星星
    Array(2614000, 3),//突破一萬之石
    Array(5062009, 5),//超級神奇方塊
    Array(5062500, 5)//大師附加神奇方塊
)
teacherItemList[4] = Array(
    Array(2431741, 1),//楓點3000
    Array(5062024, 2),//閃炫方塊
    Array(4001839, 300),//星星
    Array(2614000, 5),//突破一萬之石
    Array(5062009, 10),//超級神奇方塊
    Array(5062500, 10)//大師附加神奇方塊
)
//桃李天下
teacherItemList[5] = Array(
    Array(2431742, 1),//楓點4000
    Array(5062024, 3),//閃炫方塊
    Array(4001839, 400),//星星
    Array(2614001, 1),//突破十萬之石
    Array(5062009, 15),//超級神奇方塊
    Array(5062500, 15)//大師附加神奇方塊
)
//超出等級後會自動選擇最後一項給予獎勵物品
teacherItemList[6] = Array(
    Array(2431743, 1),//楓點10000
    Array(5062024, 5),//閃炫方塊
    Array(4001832, 60),//咒語痕跡
    Array(4001839, 500),//星星
    Array(2614001, 2),//突破十萬之石
    Array(5062009, 20),//超級神奇方塊
    Array(5062500, 20)//大師附加神奇方塊
)
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        if (teacher == null) {
            teacher = getTeacherInfo(cm.getPlayer().getId());
            teacherId = cm.getPlayer().getId();
        }
        text = "在下專門負責收徒及出師儀式，無論是收徒拜師，都來找在下就對了。\r\n\r\n";
        text+="#d"+icon+" 您的良師值 [ #r"+teacher.exp+"#d ] 點，還需 [ #r"+ ( parseInt(nextLevelExp(teacher.level)) - teacher.exp * 1 )+"#d ] 點升級\r\n";
        text +="#d"+icon+" 教學等級 [ #r" + teacher.level + "#d ]，稱謂 [ #r" + getLevelName( teacher.level ) + "#d ]\r\n";
        text+="#d"+icon+" 您當前有 [ #r" + teacher.students.length + "#d ] 位徒弟#l\r\n";
        text+="#b#L0#"+icon+" 怎樣拜師或收徒？#l\r\n\r\n";
        text+="  #e#d我是師傅              我是徒弟#n\r\n";
        text+="#b#L2#"+icon+" 我來帶徒弟拜師#l     " + "#L3#"+icon+" 我要進行出師儀式#l\r\n";
        text+="#L6#"+icon+" 我想清理師門#l       " + "#L4#"+icon+" 我想離開師門#l\r\n";
        text+="#L7#"+icon+" 我想領取師傅獎勵#l   " + "#L5#"+icon+" 我想領取200級獎勵#l";
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            text = head ;
            text += icon + " #d#e如何拜師？#n#k\r\n";
            text += "\t等級小於 #r100#k 級的玩家與符合收徒的玩家組隊，由師傅擔任隊長，在我這裡進行拜師儀式，徒弟只能同時拜一位玩家為師，如果自行取消師徒關係，需要 #r1#k 天後才能拜新的師傅。\r\n";
            text += icon + " #d#e如何收徒？#n#k\r\n";
            text += "\t等級大於 #r220#k 級的玩家與符合拜師的玩家組隊，由師傅擔任隊長，在我這裡進行拜師儀式，每位師傅同時最多可收取 #r5#k 名徒弟。\r\n";
            text += icon + " #d#e如何出師？#n#k\r\n";
            text += "\t玩家等級大於 #r220#k 級時，可以#b#e單人#n#k在我這裡進行出師儀式。出師後，玩家將獲得出師獎勵。\r\n";
            text += icon + " #d#e什麼是良師值？#n#k\r\n";
            text += "\t當徒弟出師時，師傅將獲得一定的良師值，良師值越高，師傅可獲得的教學獎勵越多。\r\n";
            status = -1;
            cm.sendSimple(text);
        } else if (selection == 2) {
            //收徒
            if (cm.getLevel() < 220) {
                cm.sendOk("您的等級不足220級，無法收徒！");
                cm.dispose();
            } else if (teacher.students.length >= 5) {
                cm.sendOk("您當前已經有 #r5#k 位徒弟，無法繼續收徒。");
                cm.dispose();
            } else if (cm.getParty() == null) {
                cm.sendOk("請和你的師傅或徒弟組成隊伍，由師傅擔任隊長來與我交談！");
                cm.dispose();
            } else if (!cm.isLeader()) {
                cm.sendOk("請讓師傅和我說話");
                cm.dispose();
            } else {
                typed = 2;
                var party = cm.getParty().getMembers();
                var it = party.iterator();
                var partySize = party.size();
                var player = null;
                
                if (partySize != 2) {
                    cm.sendOk("隊伍中必須只有師徒兩個人，請重試。");
                    cm.dispose();
                    return;
                }
                
                while (it.hasNext()) {
                    player = it.next();
                    if (player.getId() != cm.getPlayer().getId()) {
                        studentId = player.getId();
                        studentName = player.getName();
                        break;
                    }
                }
                
                //判斷徒弟等級是否滿足拜師條件
                if (player.getLevel() > 150) {
                    cm.sendOk("玩家 [ #b" + player.getName() + "#k ] 等級大於 #r150#k 級，無法拜師。");
                    cm.dispose();
                    return;

                }
                
                //判斷徒弟是否已經拜過師
                if (hasTeacher(player.getId())) {
                    cm.sendOk("玩家 [ #b" + player.getName() + "#k ] 已經拜過師了，無法拜您為師。");
                    cm.dispose();
                    return;
                }
                
                cm.sendYesNo("您是否要收取 [ #b" + player.getName() + "#k ] 為徒？");
            }
        } else if (selection == 3) {
            //出師
            var charid = cm.getPlayer().getId();
            var studentInfo = getStudentInfo(charid);
            if (studentInfo === false) {
                cm.sendOk("您還沒有拜師，怎麼出師呢！！");
                cm.dispose();
            } else if (cm.getPlayer().getLevel() < 220){
                cm.sendOk("你還沒有達到220級，無法出師哦！");
                cm.dispose();
            } else if (studentInfo.status > 0) {
                cm.sendOk("您已經完成過出師儀式了！");
                cm.dispose();
            } else {
                typed = 3;
                cm.sendYesNo("你已經達到出師的要求，是否要舉行出師儀式？");
            }
        } else if (selection == 4 || selection == 6) {
            typed = 4;
            if (selection == 4) {
                text = "解除關係後一日之內不可以拜師，是否要和師傅解除關係？\r\n";
                text += "#b#L1#" + icon + " 是的，我不想做他的徒弟了。";
            } else {
                text = "請點擊查看徒弟列表來篩選需要清理出師門的徒弟，已出師的徒弟不會顯示在列表中，清理徒弟將會扣除良師值，請謹慎操作。\r\n";
                text += "#b#L2#" + icon + " 查看徒弟列表";
            }
            cm.sendSimple(text);
        /* 200級獎勵領取 */
        } else if (selection == 5){
            if (cm.getPQLog("師徒200級獎勵", 1) > 0) {
                cm.sendOk("您已經領取過該獎勵。");
                cm.dispose();
            } else {
                if (cm.getPlayer().getLevel() < 200) {
                    cm.sendOk("等級不足 200 級，無法領取。");
                    cm.dispose();
                    return ;
                }
                if (!hasTeacher(cm.getPlayer().getId())) {
                    cm.sendOk("您還沒有拜師呢，無法領取獎勵。");
                    cm.dispose();
                    return;
                }
                if (cm.canHoldSlots(5)) {
                    var tips = "恭喜您，獲得了以下獎勵：\r\n";
                    var finalItem = Array(
                        Array(5062002, 10),
                        Array(5062500, 10),
                        Array(4001839, 100),
                        Array(4001832, 200)
                    );
                    for(var i in finalItem) {
                        var itemId = finalItem[i][0];
                        var itemQuantity = finalItem[i][1];
                        tips += cm.getItemName(itemId) + " [ "+ itemQuantity +" ] 個\r\n";
                        cm.gainItem(itemId, itemQuantity);
                    }
                    cm.setPQLog("師徒200級獎勵", 1);
                    cm.playerMessage(1, tips);
                    cm.dispose();
                } else {
                    cm.sendOk("您的背包欄位不足 5 格，請先整理一下吧。");
                    cm.dispose();
                }
            }
        /* 師傅日常獎勵 */
        } else if (selection == 7) {
            if (cm.getPQLog("師傅日常獎勵") > 0) {
                cm.sendOk("您今天已經領取過獎勵了。");
                cm.dispose();
            } else {
                if (cm.canHoldSlots(5)) {
                    //師傅獎勵
                    var finalItem = Array();
                    var level = parseInt(teacher.level);
                    if (teacherItemList[level] != null) {
                        finalItem = teacherItemList[level];
                    } else {
                        var giftLevel = teacherItemList.length - 1;
                        if (giftLevel > level) {
                            cm.sendOk("您當前的教學等級，無法領取禮包。");
                            cm.dispose();
                            return;
                        } else {
                            finalItem = teacherItemList[ teacherItemList.length - 1 ];
                        }
                    }
                    var tips = "恭喜您，獲得了以下獎勵：\r\n";
                    for(var i in finalItem) {
                        var itemId = finalItem[i][0];
                        var itemQuantity = finalItem[i][1];
                        tips += cm.getItemName(itemId) + " [ "+ itemQuantity +" ] 個\r\n";
                        cm.gainItem(itemId, itemQuantity);
                    }
                    cm.setPQLog("師傅日常獎勵");
                    cm.playerMessage(1, tips);
                    cm.dispose();
                } else {
                    cm.sendOk("請將背包每個欄位整理出 5 個格子。");
                    cm.dispose();
                }
            }
        }
    } else if (status == 2) {
        //拜師
        if (typed == 2) {
            //var student = em.getChannelServer().getPlayerStorage().getCharacterById(studentId);
            var student =  cm.getCharByName(studentName);
            if (student.getPQLog("解除師徒關係") >= 1) {
                student.dropMessage(1, "您今日無法拜師，請明日再試。");
                cm.sendOk("玩家 [ #b"+student.getName()+"#k ] 今日無法拜師，請明日再試。");
                cm.dispose();
                return;
            }
            if (addStudent(studentId, teacherId)) {
                student.dropMessage(1, "恭喜您，成為了 [ " + cm.getPlayer().getName() + " ] 的徒弟！以後一定要跟著師傅好好學習！");
                cm.sendOk("恭喜您，玩家 [ " + student.getName() + " ] 正式成為了您的徒弟！好好培養Ta吧！");
                cm.worldSpouseMessage(0x20, "[師徒系統] : 恭喜玩家 【" + student.getName() + "】 順利拜入 【" + cm.getChar().getName() + "】 門下！" );
                cm.dispose();
            } else {
                cm.sendOk("遇到未知問題，請聯繫管理員！");
                cm.dispose();
            }
        //出師
        } else if (typed == 3) {
            studentId = cm.getPlayer().getId();
            if (updateStudentStatus(studentId, 1)) {
                
                //處理師傅良師值
                var studentInfo = getStudentInfo(studentId);
                var teacherInfo = getTeacherInfo(studentInfo.teacherid);
                var nextNeedExp = nextLevelExp(teacherInfo.level);
                var currentExp  = teacherInfo.exp + upgradeExp;
                var lastLevel = teacherInfo.level;
                
                if (currentExp >= nextNeedExp) {
                    while( (currentExp - nextNeedExp) >= 0) {
                        currentExp  = (currentExp - nextNeedExp);
                        lastLevel++;
                        //cm.getPlayer().dropMessage(-11, "While lastLevel:" + lastLevel + " currentExp :"+currentExp);
                    }
                }
                
                //cm.getPlayer().dropMessage(-11, "Normal Charid: "+teacherInfo.charId+" lastLevel:" + lastLevel + " currentExp :"+currentExp);
                
                refreshTeacherLevel(teacherInfo.charId, lastLevel, currentExp);
                //徒弟出師獎勵
                var studentItems = new Array(
                    Array(5062002, 20),
                    Array(5062500, 20),
                    Array(5064000, 5),
                    Array(2340000, 5),
                    Array(2049116, 1),
                    Array(2049124, 1),
                    Array(2049137, 5)
                );
                //給予徒弟獎勵
                var studentTips = "您已經成功出師，獲得以下獎勵：\r\n";
                for(var i in studentItems) {
                    var itemId = studentItems[i][0];
                    var itemQuantity = studentItems[i][1];
                    studentTips += cm.getItemName(itemId) + " [ "+ itemQuantity +" ] 個\r\n";
                    cm.gainItem(itemId, itemQuantity);
                }
                cm.getPlayer().dropMessage(1, studentTips);
                cm.worldSpouseMessage(0x20, "[師徒系統] : 恭喜玩家 【" + cm.getPlayer().getName() + "】 在師門中嶄露頭角，從師門中脫穎而出！" );
                cm.dispose();
            } else {
                cm.sendOk("出師失敗！請聯繫管理員！");
                cm.dispose();
            }
        } else if (typed == 4) {
            //和師傅解除關係
            if (selection == 1) {
                if (!hasTeacher(cm.getPlayer().getId())) {
                    cm.sendOk("你還沒有師傅呢！");
                    cm.dispose();
                    return;
                }
                typed = 5;
                cm.sendYesNo("你真的要和你師傅解除關係嗎？解除關係後一天內無法重新拜師。");
            //和徒弟解除關係
            } else if (selection == 2) {
                if (teacher.students.length <= 0) {
                    cm.sendOk("你還沒有徒弟呢！");
                    cm.dispose();
                    return;
                }
                typed = 6;
                var students = teacher.students;
                var text = "請選擇需要解除關係的徒弟：\r\n";
                for(i in students) {
                    studentName = students[i].name;
                    studentLevel = students[i].level;
                    studentId = students[i].charid;
                    text += "#L" + studentId + "##d 徒弟 [ #b"+studentName+"#d ] [ #rLv. "+studentLevel+"#d ]\t\t#r解除關係#d#l\r\n";
                }
                cm.sendSimple(text);
            }
        }
    } else if (status == 3) {
        //和師傅解除關係
        if (typed == 5) {
            var studentInfo = getStudentInfo(cm.getPlayer().getId());
            
            if (studentInfo.status > 0) {
                cm.sendOk("你已經出師了，無法解除關係。");
                cm.dispose();
                return;
            }
            
            var teacherInfo = getTeacherInfo(studentInfo.teacherid);
            if (delStudent(cm.getPlayer().getId())) {
                cm.setPQLog("解除師徒關係");
                disTeacherExp(teacherInfo, leaveTeacherPoint);
                cm.sendOk("從今日起，你與你師傅緣份已盡，祝你他日可以尋得一位更好的師傅。");
                cm.dispose();
            } else {
                cm.sendOk("解除關係失敗！");
                cm.dispose();
            }
        //和徒弟解除關係
        } else if (typed == 6) {
            var charId = selection;
            if (delStudent(charId)) {
                disTeacherExp(teacher, leaveStudentPoint);
                cm.sendOk("解除成功！損失 #r" + leaveStudentPoint +"#k 點#b良師值#k。");
                cm.dispose();
            } else {
                cm.sendOk("解除關係失敗！");
                cm.dispose();
            }
        }
    }
}


function disTeacherExp(teacherInfo, discount) {
    //cm.playerMessage(-11, "Do discount" + teacherInfo.exp);
    //扣除師傅良師值
    var finalLevel = 0;
    var finalExp = 0;
    if (teacherInfo.exp >= discount) {
        finalLevel = teacherInfo.level;
        finalExp = teacherInfo.exp - discount;
    } else {
        if (teacherInfo.level == 0) {
            finalLevel = 0;
            finalExp = 0;    
        } else {
            finalLevel = teacherInfo.level;
            do {
                finalLevel = finalLevel - 1;
                var preLevelExp = nextLevelExp(finalLevel);
                finalExp = parseInt(preLevelExp) + parseInt(teacherInfo.exp);
                //cm.playerMessage(-11, "FinalExp :" + finalExp + " FinalLevel:" + finalLevel);
                if (finalExp - discount >= 0) {
                    finalExp -= discount;
                    break;
                }
                if (finalLevel == 0) {
                    finalExp = 0;
                    break;
                }
            }while(true);
        }
    }
    refreshTeacherLevel(teacherInfo.charId, finalLevel, finalExp);
}

function refreshTeacherLevel(charId, level, exp) {
    //cm.playerMessage(-11, "Doo refresh charid " + charId + " : level : "+ level + " : exp :" + exp);
    var db = cm.getConnection();
    var sql = "UPDATE mentorships_teachers SET exp = ?, level = ? WHERE charid = ?";
    var pstmt = db.prepareStatement(sql);
    pstmt.setInt(1, exp);
    pstmt.setInt(2, level);
    pstmt.setInt(3, charId);
    var flag = pstmt.executeUpdate();
    pstmt.close();
    return flag;
}


function getStudentInfo(charid) {
    var db = cm.getConnection();
    var sql = "SELECT * FROM mentorships_students WHERE charid = ?";
    var pstmt = db.prepareStatement(sql);
    pstmt.setInt(1, charid);
    var res = pstmt.executeQuery();
    var data = {};
    if (res.next()) {
        data.charid = res.getInt("charid");
        data.teacherid = res.getInt("teacherid");
        data.status = res.getInt("status");
    } else {
        return false;
    }
    res.close();
    pstmt.close();
    return data;
}


function updateStudentStatus(charId, status) {
    var db = cm.getConnection();
    var sql = "UPDATE mentorships_students SET status = ? WHERE charid = ?";
    var pstmt = db.prepareStatement(sql);
    pstmt.setInt(1, status);
    pstmt.setInt(2, charId);
    var flag = pstmt.executeUpdate();
    pstmt.close();
    return flag;
}

function delStudent(charId) {
    var db = cm.getConnection();
    var sql = "DELETE FROM mentorships_students WHERE charid = ?";
    var pstmt = db.prepareStatement(sql);
    pstmt.setInt(1, charId);
    var flag = pstmt.executeUpdate();
    pstmt.close();
    return flag;
}

function addStudent(charId, teacherId) {
    var db = cm.getConnection();
    var sql = "INSERT INTO mentorships_students(charid, teacherid, status) VALUES(?, ?, 0)";
    var pstmt = db.prepareStatement(sql);
    pstmt.setInt(1, charId);
    pstmt.setInt(2, teacherId);
    var flag = pstmt.executeUpdate();
    pstmt.close();
    return flag;
}

function nextLevelExp(level) {
    var base = 10 * ( level + 1 ) * ( level + 1 ) - Math.pow(level, 2);
    return base;
}


function getTeacherInfo(charId) {
    var db = cm.getConnection();
    var sql = "SELECT * FROM mentorships_teachers WHERE charid = ?";
    var pstmt = db.prepareStatement(sql);
    pstmt.setInt(1, charId);
    rs = pstmt.executeQuery();
    var data = {};
    if (rs.next()) {
        data.charId = rs.getInt('charid');
        data.exp = rs.getInt('exp');
        data.level = rs.getInt('level');
        //讀取沒有出師的徒弟列表
        var studentSql = "SELECT s.*, c.name, c.level FROM mentorships_students s LEFT JOIN characters c ON s.charid = c.id WHERE status = 0 AND s.teacherid = ? ORDER BY s.status ASC";
        var studentPstmt = db.prepareStatement(studentSql);
        studentPstmt.setInt(1, charId);
        var studentRs = studentPstmt.executeQuery();
        data.students = new Array();
        while(studentRs.next()) {
            var student = {}
            student.charid = studentRs.getInt('charid');
            student.name = studentRs.getString('name');
            student.level = studentRs.getInt('level');
            student.status = studentRs.getInt('status');
            data.students.push(student);
        }
        
        studentRs.close();
        studentPstmt.close();
    } else {
        data.charId = charId;
        data.exp = 0;
        data.level = 0;
        data.students = [];
        var sql = "INSERT INTO mentorships_teachers VALUES(?,0,0)";
        var insertPstmt = db.prepareStatement(sql);
        insertPstmt.setInt(1, charId);
        var flag = insertPstmt.executeUpdate();
        insertPstmt.close();
        if (!flag) {
            throw new Exception('Create Teacher Failed!');
        }
    }
    
    rs.close();
    pstmt.close();
    
    return data;
}

function hasTeacher(charId) {
    var db = cm.getConnection();
    var sql = "SELECT count(1) AS num FROM mentorships_students WHERE charid = ?";
    var pstmt = db.prepareStatement(sql);
    pstmt.setInt(1, charId);
    var rs = pstmt.executeQuery();
    var num = 0;
    if (rs.next()) {
        num = rs.getInt('num');
    }
    
    return num > 0 ;
}

function getLevelName(level) {
    var names = Array(
        '普通教師',
        '為人師表',
        '循循善誘',
        '誨人不倦',
        '厚得樹人',
        '桃李天下'
    );
    if (level >= names.length) {
        level = names.length - 1;
    }
    return names[level];
}