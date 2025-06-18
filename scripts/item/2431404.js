/*
 筆芯製作★繁星楓之谷所有
 完成時間：
 腳本功能: 累計儲值禮包
 */

var a = 0;
var TWD = 0;
var ChoosenTWD = 0;
var item;
var toDrop;
var PayLevel = Array(
        Array(0, 1),
        Array(1, 30),
        Array(2, 50),
        Array(3, 100),
        Array(4, 200),
        Array(5, 300),
        Array(6, 500),
        Array(7, 1000),
        Array(8, 1500),
        Array(9, 2000),
        Array(10, 3000),
        Array(11, 5000),
        Array(12, 10000)
        );//序號  累計金額
var GiftList = Array(
        Array(1, 2049750, 1),
        Array(1, 2340000, 3),
        Array(1, 2049136, 1),
        Array(1, 3010145, 1), //                       1元禮包結束

        Array(30, 3010435, 1), //千年狐椅子
        Array(30, 5062002, 50), //高級神奇方塊
        Array(30, 2340000, 20), //祝福卷軸
        Array(30, 4310023, 200), //幸運的銅幣
        Array(30, 4000858, 30), //中國心                 30元禮包結束

        Array(50, 5062002, 80), //高級神奇方塊
        Array(50, 2340000, 30), // 祝福卷軸
        Array(50, 4310023, 300), //幸運的銅幣
        Array(50, 5064000, 30), //防暴捲軸
        Array(50, 4000858, 50), //中國心                 50元禮包結束

        Array(100, 5062002, 100), //高級神奇方塊
        Array(100, 2340000, 40), //祝福卷軸
        Array(100, 4310023, 400), //幸運的銅幣
        Array(100, 5064000, 40), //防暴捲軸
        Array(100, 4000858, 80), //中國心
        Array(100, 3010417, 1), //巨無霸企鵝王
        Array(100, 3994417, 1), //紅色蠟筆               100元禮包結束

        Array(200, 2431938, 1), //法弗納武器箱
        Array(200, 5062002, 200), //高級神奇方塊
        Array(200, 2340000, 50), //祝福卷軸
        Array(200, 4310023, 500), //幸運的銅幣
        Array(200, 5064000, 50), //防暴捲軸
        Array(200, 4000858, 100), // 中國心
        Array(200, 3012025, 1), // 思念小雞雙人椅 
        Array(200, 3994417, 1), // 紅色蠟筆    
        Array(200, 3994418, 1), //  橙色蠟筆               200元禮包結束

        Array(300, 2432069, 1), //暴君防具交換卷
        Array(300, 5062002, 300), //高級神奇方塊
        Array(300, 2340000, 60), //祝福卷軸
        Array(300, 4310023, 600), //幸運的銅幣
        Array(300, 5064000, 60), //防暴捲軸
        Array(300, 4000858, 150), //中國心
        Array(300, 3010826, 1), //地球椅子
        Array(300, 3994417, 1), //紅色蠟筆 
        Array(300, 3994418, 1), // 橙色蠟筆
        Array(300, 3994419, 1), //黃色蠟筆               300元禮包結束



        Array(500, 5062002, 300), //高級神奇方塊
        Array(500, 2340000, 60), //祝福卷軸
        Array(500, 4310023, 600), //幸運的銅幣
        Array(500, 5064000, 60), //防暴捲軸
        Array(500, 4000858, 200), //中國心
        Array(500, 3010826, 1), //地球椅子
        Array(500, 3994417, 1), //紅色蠟筆 
        Array(500, 3994418, 1), // 橙色蠟筆
        Array(500, 3994419, 1), //黃色蠟筆    
        Array(500, 3994420, 1), //綠色蠟筆               500元禮包結束


        Array(1000, 5062002, 400), //高級神奇方塊
        Array(1000, 2340000, 100), //祝福卷軸
        Array(1000, 4310023, 1200), //幸運的銅幣
        Array(1000, 5064000, 100), //防暴捲軸
        Array(1000, 4000858, 500), //中國心
        Array(1000, 3010829, 1), //土星椅子
        Array(1000, 3994417, 1), //紅色蠟筆 
        Array(1000, 3994418, 1), // 橙色蠟筆
        Array(1000, 3994419, 1), //黃色蠟筆    
        Array(1000, 3994420, 1), //綠色蠟筆
        Array(1000, 3994421, 1), //青色蠟筆               1000元禮包結束


        Array(1500, 5062002, 500), //高級神奇方塊
        Array(1500, 2340000, 200), //祝福卷軸
        Array(1500, 4310023, 1500), //幸運的銅幣
        Array(1500, 5064000, 200), //防暴捲軸
        Array(1500, 4000858, 800), //中國心
        Array(1500, 3010879, 1), //繁星椅子
        Array(1500, 3994417, 1), //紅色蠟筆 
        Array(1500, 3994418, 1), // 橙色蠟筆
        Array(1500, 3994419, 1), //黃色蠟筆    
        Array(1500, 3994420, 1), //綠色蠟筆
        Array(1500, 3994421, 1), //青色蠟筆
        Array(1500, 3994422, 1), //藍色蠟筆                1500元禮包結束


        Array(2000, 4000000, 1),
        Array(3000, 4000000, 1),
        Array(5000, 4000000, 1),
        Array(10000, 4000000, 1)
        );
var WeaponList = Array(
        Array(0, 1, 1422066, 0, 0, 0), //惡魔殺手
        Array(1, 1, 1232014, 0, 0, 0), //惡魔復仇者
        Array(2, 1, 1402095, 0, 0, 0), //英雄
        Array(3, 1, 1402095, 0, 0, 0), //凱撒
        Array(4, 1, 1432086, 0, 0, 0), //黑騎士
        Array(5, 1, 1442116, 0, 0, 0), //狂狼勇士 2000 狂狼勇士
        Array(6, 1, 1302152, 0, 0, 0), //聖騎士
        Array(7, 1, 1212014, 0, 0, 0), //2004 夜光
        Array(8, 1, 1382104, 0, 0, 0), //法師
        Array(9, 1, 1382104, 0, 0, 0), //法師
        Array(10, 1, 1382104, 0, 0, 0), //法師
        Array(11, 1, 1452111, 0, 0, 0), //弓箭手
        Array(12, 1, 1462099, 0, 0, 0), //弩手
        Array(13, 1, 1522018, 0, 0, 0), //精靈
        Array(14, 1, 1242042, 0, 0, 0), //傑諾
        Array(15, 1, 1332130, 0, 0, 0), //影武者
        Array(16, 1, 1332130, 0, 0, 0), //暗影神偷
        Array(17, 1, 1362019, 0, 0, 0), //幻影俠盜
        Array(18, 1, 1472122, 0, 0, 0), //標飛
        Array(19, 1, 1482084, 0, 0, 0), //打手
        Array(20, 1, 1482084, 0, 0, 0), //2005 隱月
        Array(21, 1, 1492085, 0, 0, 0), //槍神
        Array(22, 1, 1532018, 0, 0, 0), //501 重砲指揮官
        Array(23, 1, 1492085, 0, 0, 0), //508 傑特
        Array(24, 1, 1372084, 0, 0, 0), //龍魔導士
        Array(100, 50, 1102466, 10, 10, 10), //高貴之神(全屬性+10包含攻擊魔功10點)
        Array(100, 100, 1702368, 10, 10, 10), //黑暗蝴蝶魔棒(全屬性+10包含攻擊魔功10點)
        Array(100, 100, 1112793, 10, 10, 10), //快樂指環(全屬性+10包含攻擊魔功10點)
        Array(100, 500, 1112164, 30, 30, 30), //夏日甜心名片戒指(全屬性+30包含攻擊魔功30點)
        Array(100, 500, 1112276, 30, 30, 30), //夏日甜心聊天戒指(全屬性+30包含攻擊魔功30點)
        Array(100, 500, 1102630, 50, 50, 50), //浪漫四翼天使(全屬性+50包含攻擊魔功50點)
        Array(101, 1000, 1082543, 0, 0, 0), // 劍士系列 暴君西亞戴斯手套(無描述)
        Array(102, 1000, 1082544, 0, 0, 0), // 法師系列 暴君赫爾梅斯手套(無描述)
        Array(103, 1000, 1082545, 0, 0, 0), // 弓手系列 暴君凱倫手套(無描述)
        Array(104, 1000, 1082546, 0, 0, 0), // 盜賊系列 暴君利卡昂手套(無描述)
        Array(105, 1000, 1082547, 0, 0, 0), //  海盜系列 暴君阿爾泰手套(無描述)
        Array(101, 1500, 1132174, 0, 0, 0), // 劍士系列 暴君西亞戴斯腰帶(無描述)
        Array(102, 1500, 1132175, 0, 0, 0), // 法師系列 暴君赫爾梅斯腰帶(無描述)
        Array(103, 1500, 1132176, 0, 0, 0), // 弓手系列 暴君凱倫腰帶(無描述)
        Array(104, 1500, 1132177, 0, 0, 0), // 盜賊系列 暴君利卡昂腰帶(無描述)
        Array(105, 1500, 1132178, 0, 0, 0) //  海盜系列 暴君阿爾泰腰帶(無描述)
        );//jobtype,paylevel,weaponid,全屬性,物攻,魔攻


var Newhand = Array(0, 2000, 2001, 2004, 100, 200, 300, 400, 500, 3000);//需要轉職才能操作的職業
var pass = true;
var Weaponid = Array();


var slot = 0;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        im.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            im.dispose();
        } else if (a == 0) {
            TWD = im.getTWD();
            var TEMP;
            var Times = 0;
            var Text = "充點小錢玩一下吧。：\r\n現在您累計儲值金額為： #r" + TWD + "#b\r\n\r\n#b"
            for (var i = 0; i < PayLevel.length; i++) {
                if (TWD >= PayLevel[i][1]) {
                    TEMP = im.getBossLogAcc("累計" + (parseInt(PayLevel[i][1])) + "元禮包") == -1 ? "#g(已領取)#b" : "#r(未領取)#b";
                    Text += "#L" + i + "# 累計" + PayLevel[i][1] + "元獎勵。" + TEMP + "\r\n";
                    Times = i;
                }
            }
            if (TWD == 0) {
                Text += "#L" + (Times) + "#  >>> 累計" + PayLevel[Times][1] + "元獎勵。 #r(下一階段獎勵)#b";
            } else if (TWD < 10000) {
                Text += "#L" + (Times + 1) + "#  >>> 累計" + PayLevel[Times + 1][1] + "元獎勵。 #r(下一階段獎勵)#b";
            }
            im.sendSimple(Text);
        } else if (a == 1) {
            for (var i = 0; i < Newhand.length; i++) {
                if (im.getJobId() == Newhand[i]) {
                    pass = false;
                }
            }
            if (pass) {
                Times = selection;
                ChoosenTWD = PayLevel[Times][1];
                if (im.getBossLogAcc("累計" + ChoosenTWD + "元禮包") == -1) {
                    im.sendOk("你不能重複領取禮包喲！\r\n 一個帳號只能領取一次！");
                    im.dispose();
                } else {
                    var Text = "累計儲值滿 #r" + ChoosenTWD + "#k 元您就可以獲得：\r\n\r\n";
                    for (var i = 0; i < WeaponList.length; i++) {
                        if (ChoosenTWD == 1) {//Level 1
                            if (getJobType(im.getJobId()) == WeaponList[i][0]) {//職業類型 = 裝備需要的
                                if (ChoosenTWD == WeaponList[i][1]) {//選擇的等級 = 裝備需要的
                                    Text += "#i" + WeaponList[i][2] + "# #t" + WeaponList[i][2] + "# x1 (獨特)\r\n\r\n";//獲取裝備ID
                                }
                            }
                        } else {//其他Level
                            //im.playerMessage(1, getJobFamily(getJobType(im.getJobId())));
                            if (getJobFamily(getJobType(im.getJobId())) == WeaponList[i][0]) {//職業類型 = 裝備需要的
                                if (ChoosenTWD == WeaponList[i][1]) {//選擇的等級 = 裝備需要的
                                    if (WeaponList[i][3] != 0) {
                                        Text += "#i" + WeaponList[i][2] + "# #t" + WeaponList[i][2] + "# x1(屬性加強版)\r\n\r\n";//獲取裝備ID
                                    } else {
                                        Text += "#i" + WeaponList[i][2] + "# #t" + WeaponList[i][2] + "# x1 (獨特)\r\n\r\n";//獲取裝備ID
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < GiftList.length; i++) {
                        if (ChoosenTWD == GiftList[i][0]) {
                            if (GiftList[i][1] == 4310023) {
                                Text += "#i" + GiftList[i][1] + "#  #t" + GiftList[i][1] + "# （強化裝備專用） x" + GiftList[i][2] + "\r\n\r\n"//獲取裝備ID
                            }else if (GiftList[i][1] == 4000858) {
                                Text += "#i" + GiftList[i][1] + "#  #t" + GiftList[i][1] + "# （強化保護專用） x" + GiftList[i][2] + "\r\n\r\n"//獲取裝備ID
                            }else{
                                Text += "#i" + GiftList[i][1] + "#  #t" + GiftList[i][1] + "# x" + GiftList[i][2] + "\r\n\r\n"//獲取裝備ID
                            }
                        }
                    }
                    im.sendNext(Text);
                }
            } else {
                im.sendOk("你必須得轉職到2轉才能查看或者領取累計儲值獎勵包哦~");
                im.dispose();
            }
        } else if (a == 2) {
            var SpaciousWeapon = new Array();
            var WeaponI = -1;
            if (TWD < ChoosenTWD) {
                im.sendOk("現在暫時不能領取哦！\r\n #d>> 您必須累計儲值" + ChoosenTWD + "元，現在還差#r" + (ChoosenTWD - TWD) + " #d元。")
                im.dispose();
            } else if (im.getBossLogAcc("累計" + ChoosenTWD + "元禮包") == -1) {
                im.sendOk("你不能重複領取禮包喲！\r\n 一個帳號只能領取一次！");
                im.dispose();
            } else {
                for (var i = 0; i < WeaponList.length; i++) {
                    if (ChoosenTWD == 1) {
                        if (getJobType(im.getJobId()) == WeaponList[i][0]) {//職業類型 = 裝備需要的
                            if (ChoosenTWD == WeaponList[i][1]) {//選擇的等級 = 裝備需要的
                                Weaponid.push(WeaponList[i][2]);
                            }
                        }
                    } else {
                        if (getJobFamily(getJobType(im.getJobId())) == WeaponList[i][0]) {//職業類型 = 裝備需要的
                            if (ChoosenTWD == WeaponList[i][1]) {//選擇的等級 = 裝備需要的
                                Weaponid.push(WeaponList[i][2]);
                                if (WeaponList[i][3] != 0) {
                                    SpaciousWeapon.push(true);
                                    WeaponI = i;
                                }
                            }
                        }
                    }
                }
                var getspace = Array(0, 0, 0, 0, 0, 0);
                //1 - 裝備
                //2 - 消耗欄
                //3 - 裝飾欄
                //4 - 其他欄
                //5 - 特殊欄
                for (var i = 0; i < GiftList.length; i++) {
                    if (ChoosenTWD == GiftList[i][0]) {
                        if (GiftList[i][1] == 4000858 || GiftList[i][1] == 5062002 || GiftList[i][1] == 2340000 || GiftList[i][1] == 5064000) {//如果是中國心 高級神奇方塊 100個一組
                            getspace[parseInt(GiftList[i][1] / 1000000)] += Math.ceil(GiftList[i][2] / 100);
                            getspace[parseInt(GiftList[i][1] / 1000000)]--;
                        }
                        if (GiftList[i][1] == 4310023) {//幸運的銅幣 1000個一組
                            getspace[parseInt(GiftList[i][1] / 1000000)] += Math.ceil(GiftList[i][2] / 1000);
                            getspace[parseInt(GiftList[i][1] / 1000000)]--;
                        }
                        getspace[parseInt(GiftList[i][1] / 1000000)]++;
                    }
                }
                getspace[1] += Weaponid.length;//加上武器的空間
                var CheckSpace = true;
                for (var i = 1; i < 6; i++) {
                    if (im.getSpace(i) < getspace[i]) {
                        CheckSpace = false;
                    }
                    //im.playerMessage(5, "" + i + " 要求" + getspace[i] + " 有 "+im.getSpace(i)+"");
                }
                if (CheckSpace == false) {
                    im.sendOk("背包的空間不足，請讓您的背包:\r\n\r\n1、裝備欄騰出" + getspace[1] + "格。\r\n2、消耗欄騰出" + getspace[2] + "格。\r\n3、裝飾欄騰出" + getspace[3] + "格。\r\n4、其他欄騰出" + getspace[4] + "格。\r\n5、特殊欄騰出" + getspace[5] + "格。");
                    im.dispose();
                } else {//獲取道具部分
                    for (var i = 0; i < Weaponid.length; i++) {
                        if (SpaciousWeapon[i] == true) {
                            var ii = var ii = im.getItemInfo();
                            toDrop = ii.randomizeStats(ii.getEquipById(Weaponid[i])).copy(); // 生成一個Equip類(生成這個裝備)
                            var j = 3;
                            for (var k = 0; k < 3; k++) {
                                setEquipStat(k, WeaponList[WeaponI][j]);
                                j++;
                            }
                            toDrop.setEquipOnlyId(im.getNextEquipOnlyId());
                           im.addFromDrop(im.getC(), toDrop, false);
                        } else {
                            im.gainItem(Weaponid[i], 1);
                        }
                    }
                    for (var i = 0; i < GiftList.length; i++) {
                        if (ChoosenTWD == GiftList[i][0]) {
                            im.gainItem(GiftList[i][1], GiftList[i][2]);//獲取禮包內的物品
                        }
                    }
                    im.setBossLogAcc("累計" + ChoosenTWD + "元禮包", -2);
                    im.playerMessage(1, "領取" + ChoosenTWD + "元禮包成功！");
                    im.channelMessage(0x18, "『累計儲值獎勵』" + " : " + "玩家 " + im.getChar().getName() + " 領取了累計儲值" + ChoosenTWD + "元禮包！");
                    im.dispose();
                }
            }
        }//a
    }//mode
}//f

function getJobType(Jobid) {
    var JobList = Array(
            Array(0, 3100, 3110, 3111, 3112), //惡魔殺手
            Array(1, 3101, 3120, 3121, 3122), //惡魔復仇者
            Array(2, 100, 110, 111, 112), //英雄
            Array(3, 6000, 6100, 6110, 6112), //凱撒
            Array(4, 100, 130, 131, 132), //黑騎士
            Array(5, 2100, 2110, 2111, 2112), //狂狼勇士 2000 狂狼勇士
            Array(6, 100, 120, 121, 122), //聖騎士
            Array(7, 2700, 2710, 2711, 2712), //2004 夜光
            Array(8, 200, 210, 211, 212), //法師
            Array(9, 200, 220, 221, 222), //法師
            Array(10, 200, 230, 231, 232), //法師
            Array(11, 300, 310, 311, 312), //弓箭手
            Array(12, 300, 320, 321, 322), //弩手
            Array(13, 2300, 2310, 2311, 2312), //精靈
            Array(14, 3600, 3610, 3611, 3612), //傑諾
            Array(15, 430, 431, 432, 434), //影武者
            Array(16, 400, 420, 421, 422), //暗影神偷
            Array(17, 2400, 2410, 2411, 2412), //幻影俠盜
            Array(18, 400, 410, 411, 412), //標飛
            Array(19, 500, 510, 511, 512), //打手
            Array(20, 2500, 2510, 2511, 2512), //2005 隱月
            Array(21, 500, 520, 521, 522), //槍神
            Array(22, 501, 530, 531, 532), //501 重砲指揮官
            Array(23, 570, 571, 572, 573)////508 傑特
            );
// 0,1,2,3,4,5,6 劍士族
// 7,8,9,10,24 法師族
// 11,12,13 弓箭
// 14,15,16,17,18 盜賊族
// 19,20,21,22,23 海盜族

    var jobtype = 99;//默認為無效的類型
    for (var i = 0; i < JobList.length; i++) {
        for (var j = 1; j < 5; j++) {
            if (Jobid == JobList[i][j]) {
                jobtype = JobList[i][0];//得到職業的類型
            }
        }
    }
    if (Jobid == 2200 || Jobid == 2210 || Jobid == 2211 || Jobid == 2212 || Jobid == 2213 || Jobid == 2214 || Jobid == 2215 || Jobid == 2216 || Jobid == 2217 || Jobid == 2218) {
        jobtype = 24;//龍魔導士的Type另外判斷
    }
    return jobtype;
}

function getJobFamily(jobtype) {
// 0,1,2,3,4,5,6 劍士族
// 7,8,9,10,24 法師族
// 11,12,13 弓箭手
// 14,15,16,17,18 盜賊族
// 19,20,21,22,23 海盜族
    var jobFamily = 100;//100 全職業 101 劍士 102法師 103 弓箭手 104盜賊 105海盜
    for (var i = 0; i < 6; i++) {
        if (jobtype == i) {
            jobFamily = 101;
        }
    }
    if (jobtype == 7 || jobtype == 8 || jobtype == 9 || jobtype == 10 || jobtype == 24) {
        jobFamily = 102;
    }
    for (var i = 11; i < 13; i++) {
        if (jobtype == i) {
            jobFamily = 103;
        }
    }
    for (var i = 14; i < 18; i++) {
        if (jobtype == i) {
            jobFamily = 104;
        }
    }
    for (var i = 19; i < 23; i++) {
        if (jobtype == i) {
            jobFamily = 105;
        }
    }
    return jobFamily;
}


function setEquipStat(i, v) {//設置裝備屬性;
    switch (i) {
        case 0:
            toDrop.setStr(v);
            toDrop.setDex(v);
            toDrop.setInt(v);
            toDrop.setLuk(v);
            break;
        case 1:
            toDrop.setWatk(v);
            break;
        case 2:
            toDrop.setMatk(v);
            break;
    }
}