/* Joyce
    Event NPC
*/

var status = -1;
var maps = Array(
910001000, //隱藏地圖 - 專業技術村莊&lt;匠人街>
230000000, //水下世界 - 水下世界
260000000, //火焰之路 - 納希沙漠
101000000, //魔法密林 - 魔法密林
211000000, //神秘島 - 冰峰雪域
120030000, //黃金海灘 - 海邊瓜棚
130000200, //女皇之路 - 聖地岔路
100000000, //弓箭手村 - 弓箭手村
103000000, //廢棄都市 - 廢棄都市
222000000, //時間靜止之湖 - 童話村
240000000, //神木村 - 神木村
104000000, //維多利亞港 - 維多利亞港
220000000, //玩具城 - 玩具城
802000101, //逆奧之城 - 卡姆那 （內部）
120000000, //諾特勒斯 - 諾特勒斯碼頭
221000000, //時間靜止之湖 - 地球防禦本部
200000000, //神秘島 - 天空之城
102000000, //勇士部落 - 勇士部落
300000000, //艾琳森林 - 阿爾泰營地
801000000, //昭和村 - 昭和村
540000000, //新加坡 - 中心商務區
541000000, //新加坡 - 駁船碼頭城
250000000, //武陵 - 武陵
251000000, //百草堂 - 百草堂
551000000, //馬來西亞 - 甘榜村
550000000, //馬來西亞 - 吉隆大都市 
261000000, //莎翁小鎮 - 瑪加提亞
541020000, //新加坡 - 烏魯城入口
270000000, //時間神殿 - 三個門
682000000, //隱藏地圖 - 鬧鬼宅邸外部
140000000, //冰雪之島 - 裡恩
970010000, //隱藏地圖 - 楓樹山丘
103040000, //廢都廣場 - 廢都廣場大廳
555000000, //M我 - 白色聖誕山丘
310000000, //黑色之翼領地 - 埃德爾斯坦
200100000, //天空中的克裡塞 - 克裡塞入口
211060000, //獅子王之城 - 沉寂原野
310040300, //干路 - 岩石路
701000000);//上海外灘
var pqMaps = Array(
541000300, //新加坡 - 神秘通道 3 等級：85-100
220050300, //玩具城 - 時間通道
229000020, //鬧鬼宅邸 - 客房2
230040200, //水下世界 - 危海峽谷1
541010010, //新加坡 - 幽靈船 2
551030100, //馬來西亞 - 陰森世界入口
240040500, //神木村 - 龍之巢穴入口
800020110, //江戶村 - 林野的松林
105030500, //被詛咒的寺院 - 禁忌祭壇
102040200, //遺跡發掘地 - 遺跡發掘團營地
105100100, //巴洛古神殿 - 寺院地下
211041100, //死亡森林
270030500); //忘卻之路5

var selectedMap = -1;
var selectedArea = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2 || status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        cm.sendSimple("您好 #r#h ##k 有什麼需要我幫忙的嗎？ \r\n#b#b#L2#學習技能#l\r\n");
    } else if (status == 1) {
        if (selection == 1) {
        cm.dispose();
        cm.openNpc(9270035,2);
        } else if (selection == 20) {
            cm.dispose();
        cm.openNpc(9010000);
        } else if (selection == 2) {
            status = 5;
            cm.sendSimple("您好 #r#h ##k 請選擇您要操作的項目:\r\n#b#L1#群寵技能#l\r\n#b#b#L7#學習飛行騎乘#l\r\n#L4#騎寵技能#l\r\n#L5#夜光技能\r\n#k");
        } else if (selection == 3) {
            cm.sendSimple("您好 #r#h ##k 請選擇您要傳送的項目:\r\n#b#L0#城鎮傳送#l\r\n#L1#練級傳送(70以上)#l\r\n#L2#次元傳送#l#k"); //\r\n#L3#網吧地圖#l
        } else if (selection == 5) {
            if (!cm.haveItem(4001168, 1)) { //金楓葉
                cm.sendOk("請檢查您的背包是否有金楓葉這個道具.");
            } else {
                if (cm.removeItem(4001168)) {
                    cm.gainNX(2, +5);
                    cm.sendOk("兌換成功！獲得 5 楓點。");
                } else {
                    cm.sendOk("請檢查該道具是否鎖定.");
                }
            }
            cm.dispose();
        } else if (selection == 6) {
            if (cm.getPlayer().getCSPoints(2) < 30) {
                cm.sendOk("您的樂豆點少於 30 楓點，兌換金楓葉失敗！");
            } else if (!cm.canHold(4001168, 1)) {
                cm.sendOk("請檢查您的背包是否有足夠的空間.");
            } else {
                cm.gainItem(4001168, 1); //金楓葉
                cm.gainNX(2, - 30);
                cm.sendOk("兌換成功！獲得金楓葉1個，此道具價值 30 楓點。如果將道具兌換成楓幣我們將收取2楓點的手續費。");
            }
            cm.dispose();
        } else if (selection == 11) {
            cm.dispose();
            cm.openNpc(9310141, "chongwujinhua");
        }
    } else if (status == 2) {
        var selStr = "請選擇您的目的地: #b";
        if (selection == 0) {
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# #l";
            }
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9010022);
            return;
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9070007);
            return;
        } else {
            for (var i = 0; i < pqMaps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + pqMaps[i] + "# #l";
            }
        }
        selectedArea = selection;
        cm.sendSimple(selStr);
    } else if (status == 3) {
        cm.sendYesNo("看來這裡的事情都已經處理完了啊。您真的要移動到 #m" + (selectedArea == 0 ? maps[selection] : pqMaps[selection]) + "# 嗎？");
        selectedMap = selection;
    } else if (status == 4) {
        if (selectedMap >= 0) {
            cm.warp(selectedArea == 0 ? maps[selectedMap] : pqMaps[selectedMap], 0);
        }
        cm.dispose();
    } else if (status == 6) {
        if (selection == 1) {
            /*if (cm.getPlayer().getSkillLevel(8) > 0 || cm.getPlayer().getSkillLevel(10000018) > 0 || cm.getPlayer().getSkillLevel(20000024) > 0 || cm.getPlayer().getSkillLevel(20011024) > 0) {
                cm.sendOk("您已經學習過這個技能。");
            } else {
                if (cm.getJob() == 2001 || (cm.getJob() >= 2200 && cm.getJob() <= 2218)) {
                    cm.teachSkill(20011024, 1, 0); // 龍魔導士 - 群寵
                } else if (cm.getJob() == 2000 || (cm.getJob() >= 2100 && cm.getJob() <= 2112)) {
                    cm.teachSkill(20000024, 1, 0); // 狂狼勇士 - 群寵
                } else if (cm.getJob() >= 1000 && cm.getJob() <= 1512) {
                    cm.teachSkill(10000018, 1, 0); // 騎士團 - 群寵
                } else {
                    cm.teachSkill(8, 1, 0); // 冒險家 - 群寵
                }
                cm.sendOk("恭喜您學習技能成功。");
            }*/
            cm.dispose();
            cm.openNpc(9310362,"MuiltPet");
        } else if (selection == 4) {
            /*騎獸技能  || cm.getPlayer().getSkillLevel(cm.getPlayer().getStat().getSkillByJob(1004, cm.getPlayer().getJob()))*/
            if (cm.getPlayer().getSkillLevel(80001000) > 0) {
                cm.sendOk("您已經學習過這個技能。");
            } else {
                if (cm.getJob() >= 3000) {
                    cm.sendOk("對不起！該職業暫時無法學習這個技能。");
                    cm.dispose();
                    return;
                }
                cm.teachSkill(80001000 ,  1, 1);
                /*cm.teachSkill(cm.isGMS() ? 80001000 : cm.getPlayer().getStat().getSkillByJob(1004, cm.getPlayer().getJob()), 1, 1);*/
                cm.sendOk("恭喜您學習技能成功。");
            }
            cm.dispose();
        } else if (selection == 7) {
            cm.sendYesNo("是否要花5000萬學習?");
        } else if (selection == 6) {
            cm.teachSkill(10001026,1,1);
            cm.teachSkill(20001026,1,1);
            cm.teachSkill(20011026,1,1);
            cm.teachSkill(30001026,1,1);
            cm.teachSkill(50001026,1,1);
            cm.teachSkill(60001026,1,1);
            cm.teachSkill(60011026,1,1);
            cm.teachSkill(30021026,1,1);
            //cm.teachSkill(100001026,1,1);
            cm.teachSkill(20051026,1,1);
            cm.teachSkill(20041026 ,1,1);
            cm.teachSkill(20021026,1,1);
            cm.teachSkill(20031026,1,1);
            cm.teachSkill(30011026,1,1);
            cm.dispose();
        } else if (selection == 5) {
            if(cm.getJob() == 2700 || cm.getJob() == 2710 || cm.getJob() == 2711 || cm.getJob() == 2712){
                cm.teachSkill(27000106,5,5);
                cm.teachSkill(27001100,20,20);
                cm.sendOk("恭喜您技能學習成功");
            } else {
                cm.sendOk("你不屬於該職業群");
            }
            cm.dispose();
        }
    }else if (status == 7){
        
        if (cm.getPlayer().getSkillLevel(80001089) > 0) {
                cm.sendOk("您已經學習過這個技能。");
            } else if( cm.getMeso() >= 50000000 ){
                cm.gainMeso(-50000000);
                cm.teachSkill(80001089,1, 1);
                cm.sendOk("恭喜您學習技能成功。");
            }else{
                cm.sendOk("楓幣不足。");
            }
            cm.dispose();
    }
}