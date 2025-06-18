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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，我是新手成長系統:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#新手成長系統簡介#l\r\n\r\n   #k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#里程：#r"+cm.getPlayerPoints()+"#k 點  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#活力值：#r"+cm.getPlayerEnergy()+"#k 點 \r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#今天在線：#r"+cm.getGamePoints()+"#k 分鐘#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r[必須]#b閱讀新手問題指導#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r[必須]#b閱讀新手指導內容#l\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r[必須]#b點擊我系統自動檢測該角色成長引導獎勵#l");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好,我是新手成長系統簡介:\r\n  職業: 所有\r\n  等級: 10 30 60 100 150\r\n  推薦升級地圖: 系統引導地圖練級\r\n  引導使用某道具: 系統引導使用某道具\r\n  贈送道具: 當前職業對應等級防具,武器\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#該角色達到等級要求即可完成1次階段功能.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：角色不能超過等級範圍或必須與等級對應轉職數.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：裝備 消耗 設置 其它 特殊 背包欄 預留 5 格以上.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r註：若達到等級未達到轉職數,無法領取武器(後果自負).");
                        cm.dispose();
            } else if (selection == 2) {
            if((cm.getPlayer().getLevel() > 9 && cm.getPlayer().getLevel() < 30) && cm.getPQLog("引導10",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
                if(cm.getJob() == 100 || cm.getJob() == 1100){ //-- 劍士
                cm.gainItem(1302001,1); // 鋸
                }else if(cm.getJob() == 200|| cm.getJob() == 1200){ //-- 法師
                cm.gainItem(1372043,1); // 初級魔法師的杖
                }else if(cm.getJob() == 300 || cm.getJob() == 1300){ //-- 弓手
                cm.gainItem(1452002,1); // 長弓
                }else if(cm.getJob() == 400 || cm.getJob() == 1400){ //-- 盜賊
                cm.gainItem(1332063,1); // 初級盜賊的短劍
                cm.gainItem(1472104,1); // 挑戰之拳套
                }else if(cm.getJob() == 500 || cm.getJob() == 1500){ //-- 海盜
                cm.gainItem(1482000,1); // 指套
                cm.gainItem(1492066,1); // 挑戰之火槍
                }else if(cm.getJob() == 2100){ //-- 狂狼勇士
                cm.gainItem(1442013,1); // 滄海雪板
                }else if(cm.getJob() == 3300){ //-- 狂豹獵人
                cm.gainItem(1462084,1); // 挑戰之弩
                }else if(cm.getJob() == 3500){ //-- 機甲戰神
                cm.gainItem(1492066,1); // 挑戰之火槍
                }else if(cm.getJob() == 3200){ //-- 喚靈斗師
                cm.gainItem(1372043,1); // 初級魔法師的杖
                }else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龍魔導士
                cm.gainItem(1372043,1); // 初級魔法師的杖
                }else if(cm.getJob() == 2300){ //-- 精靈遊俠
                cm.gainItem(1522000,1); // 基礎雙弩槍
                cm.gainItem(1352000,1); // 基礎雙弩槍
                }else if(cm.getJob() == 501){ //-- 重砲指揮官
                cm.gainItem(1532000,1); // 新手大炮
                }else if(cm.getJob() == 3100){ //-- 惡魔殺手
                cm.gainItem(1322006,1); // 鋼管
                }else if(cm.getJob() == 3600){ //-- 傑諾
                cm.gainItem(1242001,1); // 不諧之角
                }else if(cm.getJob() == 2700){ //-- 夜光
                cm.gainItem(1212000,1); // 樸素閃亮克魯
                cm.gainItem(1352400,1); // 閃電寶珠
                }else if(cm.getJob() == 3101){ //-- 惡魔復仇者
                cm.gainItem(1232001,1); // 藍色復仇者
                }else if(cm.getJob() == 6100){ //-- 凱撒
                cm.gainItem(1402078,1); // 挑戰之雙手劍
                }else if(cm.getJob() == 5100){ //-- 米哈逸
                cm.gainItem(1302001,1); // 鋸
                }else if(cm.getJob() == 508){ //-- 傑特
                cm.gainItem(1492066,1); // 挑戰之火槍
                }else if(cm.getJob() == 2400){ //-- 幻影俠盜
                cm.gainItem(1362001,1); // 新手手杖
                }
                cm.setPQLog("引導10",1);
                cm.gainItem(1142609,1,30);
                cm.gainItem(3700012,1,30);
                       cm.worldSpouseMessage(0x20,"[新手系統] 玩家 "+ cm.getChar().getName() +" 完成了傳奇新手成長系統階段1功能 系統給予大量獎勵。");
                cm.sendOk("完成了傳奇新手成長系統階段功能 系統給予大量獎勵。");
                cm.dispose();
            } else if((cm.getPlayer().getLevel() > 29 && cm.getPlayer().getLevel() < 60)  && cm.getPQLog("引導30",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
                if(cm.getJob() == 100 || cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130 || cm.getJob() == 1110){ //-- 劍士
                cm.gainItem(1302003,1); // 太陽劍
                cm.gainItem(1432002,1); // 三支槍
                }else if(cm.getJob() == 200 || cm.getJob() == 210 || cm.getJob() == 220 || cm.getJob() == 230 || cm.getJob() == 1210){ //-- 法師
                cm.gainItem(1372018,1); // 法師短杖
                }else if(cm.getJob() == 300 || cm.getJob() == 310 || cm.getJob() == 320 || cm.getJob() == 1310){ //-- 弓手
                cm.gainItem(1452096,1); // 挑戰之弓
                cm.gainItem(1462081,1); // 挑戰之弩
                }else if(cm.getJob() == 400 || cm.getJob() == 410 || cm.getJob() == 420 || cm.getJob() == 1410){ //-- 盜賊
                cm.gainItem(1472107,1); // 挑戰之拳套
                cm.gainItem(1332043,1); // 水晶刃
                }else if(cm.getJob() == 500 || cm.getJob() == 510 || cm.getJob() == 520 || cm.getJob() == 1510){ //-- 海盜
                cm.gainItem(1492069,1); // 挑戰之火槍
                cm.gainItem(1482069,1); // 挑戰之指虎
                }else if(cm.getJob() == 2100 || cm.getJob() == 2110){ //-- 狂狼勇士
                cm.gainItem(1442011,1); // 衝浪板
                }else if(cm.getJob() == 3300 || cm.getJob() == 3310){ //-- 狂豹獵人
                cm.gainItem(1462081,1); // 挑戰之弩
                }else if(cm.getJob() == 3500 || cm.getJob() == 3510){ //-- 機甲戰神
                cm.gainItem(1492069,1); // 挑戰之火槍
                }else if(cm.getJob() == 3200 || cm.getJob() == 3210){ //-- 喚靈斗師
                cm.gainItem(1372018,1); // 法師短杖
                }else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龍魔導士
                cm.gainItem(1372018,1); // 法師短杖
                }else if(cm.getJob() == 2300 || cm.getJob() == 2310){ //-- 精靈遊俠
                cm.gainItem(1522004,1); // 雙翼弩槍
                cm.gainItem(1352001,1); // 銳利魔法箭矢
                }else if(cm.getJob() == 530){ //-- 重砲指揮官
                cm.gainItem(1532004,1); // 阿特萊利
                }else if(cm.getJob() == 2400 || cm.getJob() == 3110){ //-- 惡魔殺手
                cm.gainItem(1322003,1); // 棒棒果
                }else if(cm.getJob() == 3600 || cm.getJob() == 3610){ //-- 傑諾
                cm.gainItem(1242002,1); // 山脊切割者
                }else if(cm.getJob() == 2700 || cm.getJob() == 2710){ //-- 夜光
                cm.gainItem(1212020,1); // 企鵝國王金光閃亮克魯
                cm.gainItem(1352401,1); // 耀眼寶珠
                }else if(cm.getJob() == 3100 || cm.getJob() == 3120){ //-- 惡魔復仇者
                cm.gainItem(1232002,1); // 模糊傳奇
                }else if(cm.getJob() == 6100 || cm.getJob() == 6110){ //-- 凱撒
                cm.gainItem(1402081,1); // 挑戰之雙手劍
                }else if(cm.getJob() == 5100 || cm.getJob() == 5110){ //-- 米哈逸
                cm.gainItem(1302003,1); // 太陽劍
                }else if(cm.getJob() == 570){ //-- 傑特
                cm.gainItem(1492069,1); // 挑戰之火槍
                }else if(cm.getJob() == 2400 || cm.getJob() == 2410){ //-- 幻影俠盜
                cm.gainItem(1362005,1); // 血路手杖
                }
                cm.setPQLog("引導30",1);
                cm.gainItem(2022956,10); // 火紅玫瑰
                cm.gainItem(2001505,100); // 超級藥水
                       cm.worldSpouseMessage(0x20,"[新手系統] 玩家 "+ cm.getChar().getName() +" 完成了傳奇新手成長系統階段2功能 系統給予大量獎勵。");
                cm.sendOk("完成了傳奇新手成長系統階段功能 系統給予大量獎勵。");
                cm.dispose();
            } else if((cm.getPlayer().getLevel() >= 60 && cm.getPlayer().getLevel() < 100)  && cm.getPQLog("引導60",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
                if(cm.getJob() == 111 || cm.getJob() == 121 || cm.getJob() == 131 || cm.getJob() == 1111){ //-- 劍士
                cm.gainItem(1432006,1); // 十字槍
                cm.gainItem(1302041,1); // 奇型刀
                }else if(cm.getJob() == 211 || cm.getJob() == 221 || cm.getJob() == 231 || cm.getJob() == 1211){ //-- 法師
                cm.gainItem(1372021,1); // 天使之翼
                }else if(cm.getJob() == 311 || cm.getJob() == 321 || cm.getJob() == 1311){ //-- 弓手
                cm.gainItem(1462084,1); // 挑戰之弩
                cm.gainItem(1452099,1); // 挑戰之弓
                }else if(cm.getJob() == 411 || cm.getJob() == 421 || cm.getJob() == 1411){ //-- 盜賊
                cm.gainItem(1332046,1); // 鳳凰刃
                cm.gainItem(1472110,1); // 挑戰之拳套
                }else if(cm.getJob() == 511 || cm.getJob() == 521 || cm.getJob() == 1511){ //-- 海盜
                cm.gainItem(1482072,1); // 挑戰之指虎
                cm.gainItem(1492072,1); // 挑戰之火槍
                }else if(cm.getJob() == 2111){ //-- 狂狼勇士
                cm.gainItem(1442033,1); // 黃龍刀
                }else if(cm.getJob() == 3311){ //-- 狂豹獵人
                cm.gainItem(1462084,1); // 挑戰之弩
                }else if(cm.getJob() == 3511){ //-- 機甲戰神
                cm.gainItem(1492072,1); // 挑戰之指槍
                }else if(cm.getJob() == 3211){ //-- 喚靈斗師
                cm.gainItem(1372021,1); // 天使之翼
                }else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龍魔導士
                cm.gainItem(1372021,1); // 天使之翼
                }else if(cm.getJob() == 2311){ //-- 精靈遊俠
                cm.gainItem(1522008,1); // 月華榮耀
                cm.gainItem(1352002,1); // 永恆魔法箭矢
                }else if(cm.getJob() == 531){ //-- 重砲指揮官
                cm.gainItem(1532008,1); // 火焰噴射器
                }else if(cm.getJob() == 4111){ //-- 惡魔殺手
                cm.gainItem(1322018,1); // 巨型錘
                }else if(cm.getJob() == 3611){ //-- 傑諾
                cm.gainItem(1242004,1); // 馬鮫小刀
                }else if(cm.getJob() == 2711){ //-- 夜光
                cm.gainItem(1212047,1); // 志願者閃亮克魯
                cm.gainItem(1352402,1); // 閃耀寶珠
                }else if(cm.getJob() == 3121){ //-- 惡魔復仇者
                cm.gainItem(1232004,1); // 紫色悲傷
                }else if(cm.getJob() == 6111){ //-- 凱撒
                cm.gainItem(1402084,1); // 挑戰之雙手劍
                }else if(cm.getJob() == 5111){ //-- 米哈逸
                cm.gainItem(1302041,1); // 奇型刀
                }else if(cm.getJob() == 571){ //-- 傑特
                cm.gainItem(1492072,1); // 挑戰之火槍
                }else if(cm.getJob() == 2411){ //-- 幻影俠盜
                cm.gainItem(1362010,1); // 血蛤手杖
                }
                cm.setPQLog("引導60",1);
                cm.gainItem(5150040,10);
                cm.gainItem(5152053,10);
                cm.gainItem(1003084,1,30);
                cm.gainItem(1052412,1,30);
                cm.gainItem(2022956,10); // 火紅玫瑰
                cm.gainItem(2001505,100); // 超級藥水
                       cm.worldSpouseMessage(0x20,"[新手系統] 玩家 "+ cm.getChar().getName() +" 完成了傳奇新手成長系統階段3功能 系統給予大量獎勵。");
                cm.sendOk("完成了傳奇新手成長系統階段功能 系統給予大量獎勵。");
                cm.dispose();
            } else if((cm.getPlayer().getLevel() > 99 && cm.getPlayer().getLevel() < 150)  && cm.getPQLog("引導100",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
                if(cm.getJob() == 112 || cm.getJob() == 122 || cm.getJob() == 132 || cm.getJob() == 1112){ //-- 劍士
                cm.gainItem(1302078,1); // 挑戰之單手劍
                cm.gainItem(1432030,1); // 紅蓮落神槍
                }else if(cm.getJob() == 212 || cm.getJob() == 222 || cm.getJob() == 232 || cm.getJob() == 1212){ //-- 法師
                cm.gainItem(1372072,1); // 挑戰之金屬短杖
                }else if(cm.getJob() == 312 || cm.getJob() == 322 || cm.getJob() == 1312){ //-- 弓手
                cm.gainItem(1462086,1); // 挑戰之弩
                cm.gainItem(1452101,1); // 挑戰之弓
                }else if(cm.getJob() == 412 || cm.getJob() == 422 || cm.getJob() == 1412){ //-- 盜賊
                cm.gainItem(1472112,1); // 挑戰之拳套
                cm.gainItem(1332052,1); // 陰風碎魂刃
                }else if(cm.getJob() == 512 || cm.getJob() == 522 || cm.getJob() == 1512){ //-- 海盜
                cm.gainItem(1492074,1); // 挑戰之火槍
                cm.gainItem(1482074,1); // 挑戰之指虎
                }else if(cm.getJob() == 2112){ //-- 狂狼勇士
                cm.gainItem(1442044,1); // 戰魂鬥殺戟
                }else if(cm.getJob() == 3312){ //-- 狂豹獵人
                cm.gainItem(1462086,1); // 挑戰之弩
                }else if(cm.getJob() == 3512){ //-- 機甲戰神
                cm.gainItem(1492074,1); // 挑戰之火槍
                }else if(cm.getJob() == 3212){ //-- 喚靈斗師
                cm.gainItem(1372072,1); // 挑戰之金屬短杖
                }else if(cm.getJob() == 2200){ //-- 龍魔導士
                cm.gainItem(1372072,1); // 挑戰之金屬短杖
                }else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龍魔導士
                cm.gainItem(1372072,1); // 挑戰之金屬短杖
                }else if(cm.getJob() == 2312){ //-- 精靈遊俠
                cm.gainItem(1522012,1); // 飛燕弩槍
                cm.gainItem(1352003,1); // 無限魔法箭矢
                }else if(cm.getJob() == 532){ //-- 重砲指揮官
                cm.gainItem(1532012,1); // 克呂索斯
                }else if(cm.getJob() == 4112){ //-- 惡魔殺手
                cm.gainItem(1322085,1); // 挑戰之單手棍
                }else if(cm.getJob() == 3612){ //-- 傑諾
                cm.gainItem(1242008,1); // 猩紅闊劍
                }else if(cm.getJob() == 2712){ //-- 夜光
                cm.gainItem(1212083,1); // 先驅者閃亮克魯
                cm.gainItem(1352403,1); // 命運寶珠
                }else if(cm.getJob() == 3122){ //-- 惡魔復仇者
                cm.gainItem(1232008,1); // 殘酷復仇
                }else if(cm.getJob() == 6112){ //-- 凱撒
                cm.gainItem(1402075,1); // 挑戰之雙手劍
                }else if(cm.getJob() == 5112){ //-- 米哈逸
                cm.gainItem(1302078,1); // 挑戰之單手劍
                }else if(cm.getJob() == 572){ //-- 傑特
                cm.gainItem(1492074,1); // 挑戰之火槍
                }else if(cm.getJob() >= 10000 && cm.getJob() <= 10112){ //-- 神之子
                cm.gainItem(1562000,1); // 闊影劍
                cm.gainItem(1562001,1); // 拉比斯1型
                cm.gainItem(1562002,1); // 拉比斯2型
                cm.gainItem(1562003,1); // 拉比斯3型
                cm.gainItem(1572000,1); // 鋒利之影
                cm.gainItem(1572001,1); // 拉茲麗1型
                cm.gainItem(1572002,1); // 拉茲麗2型
                cm.gainItem(1572003,1); // 拉茲麗3型
                }else if(cm.getJob() == 2412){ //-- 幻影俠盜
                cm.gainItem(1362013,1); // 天國手杖
                }
                cm.setPQLog("引導100",1);
                cm.gainItem(1003946,1);
                cm.gainItem(1102612,1);
                cm.gainItem(1082540,1);
                cm.gainItem(1052647,1);
                cm.gainItem(1072853,1);
                cm.gainItem(1182070,1);
                cm.gainItem(1113069,1,30);
                cm.gainItem(2022956,10); // 火紅玫瑰
                cm.gainItem(2001505,100); // 超級藥水
                       cm.worldSpouseMessage(0x20,"[新手系統] 玩家 "+ cm.getChar().getName() +" 完成了傳奇新手成長系統階段4功能 系統給予大量獎勵。");
                cm.sendOk("完成了傳奇新手成長系統階段功能 系統給予大量獎勵。");
                cm.dispose();
            } else if(cm.getLevel() >= 150  && cm.getPQLog("引導150",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
                if(cm.getJob() == 112 || cm.getJob() == 122 || cm.getJob() == 132 || cm.getJob() == 1112){ //-- 劍士
                cm.gainItem(1432137,1); // 外星人之槍
                cm.gainItem(1302224,1); // 外星人之單手劍
                }else if(cm.getJob() == 212 || cm.getJob() == 222 || cm.getJob() == 232 || cm.getJob() == 1212){ //-- 法師
                cm.gainItem(1382167,1); // 外星人之長杖
                }else if(cm.getJob() == 312 || cm.getJob() == 322 || cm.getJob() == 1312){ //-- 弓手
                cm.gainItem(1462157,1); // 外星人之弩
                cm.gainItem(1452168,1); // 外星人之弓
                }else if(cm.getJob() == 412 || cm.getJob() == 422 || cm.getJob() == 1412){ //-- 盜賊
                cm.gainItem(1332192,1); // 外星人之短劍
                cm.gainItem(1472178,1); // 外星人之拳套
                }else if(cm.getJob() == 512 || cm.getJob() == 522 || cm.getJob() == 1512){ //-- 海盜
                cm.gainItem(1482139,1); // 外星人之指虎
                cm.gainItem(1492149,1); // 外星人之火槍
                }else if(cm.getJob() == 2112){ //-- 狂狼勇士
                cm.gainItem(1442181,1); // 外星人之矛
                }else if(cm.getJob() == 3312){ //-- 狂豹獵人
                cm.gainItem(1462157,1); // 外星人之弩
                }else if(cm.getJob() == 3512){ //-- 機甲戰神
                cm.gainItem(1492149,1); // 外星人之火槍
                }else if(cm.getJob() == 3212){ //-- 喚靈斗師
                cm.gainItem(1382167,1); // 外星人之長杖
                }else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- 龍魔導士
                cm.gainItem(1382167,1); // 外星人之長杖
                }else if(cm.getJob() == 2312){ //-- 精靈遊俠
                cm.gainItem(1522108,1); // 外星人之雙弩槍
                }else if(cm.getJob() == 532){ //-- 重砲指揮官
                cm.gainItem(1532113,1); // 外星人之手炮
                }else if(cm.getJob() == 2412){ //-- 惡魔殺手
                cm.gainItem(1322161,1); // 外星人之單手棍
                }else if(cm.getJob() == 3612){ //-- 傑諾
                cm.gainItem(1242086,1); // 外星人之能量劍
                }else if(cm.getJob() == 2700){ //-- 夜光
                cm.gainItem(1212084,1); // 外星人之閃亮克魯
                }else if(cm.getJob() == 3122){ //-- 惡魔復仇者
                cm.gainItem(1232079,1); // 外星人之魔劍
                }else if(cm.getJob() == 6112){ //-- 凱撒
                cm.gainItem(1402150,1); // 外星人之雙手劍
                }else if(cm.getJob() == 5112){ //-- 米哈逸
                cm.gainItem(1302224,1); // 外星人之單手劍
                }else if(cm.getJob() == 572){ //-- 傑特
                cm.gainItem(1492149,1); // 外星人之火槍
                }else if(cm.getJob() >= 10000 && cm.getJob() <= 10112){ //-- 神之子
                cm.gainItem(1562004,1); // 拉比斯4型
                cm.gainItem(1562005,1); // 拉比斯5型
                cm.gainItem(1562006,1); // 拉比斯6型
                cm.gainItem(1562007,1); // 拉比斯7型
                cm.gainItem(1572004,1); // 拉茲麗4型
                cm.gainItem(1572005,1); // 拉茲麗5型
                cm.gainItem(1572006,1); // 拉茲麗6型
                cm.gainItem(1572007,1); // 拉茲麗7型
                }else if(cm.getJob() == 2412){ //-- 幻影俠盜
                cm.gainItem(1362104,1); // 外星人之手杖
                }
                cm.setPQLog("引導150",1);
                cm.gainItem(1113072,1);
                cm.gainItem(1032220,1);
                cm.gainItem(1122264,1);
                cm.gainItem(1132243,1);
                cm.gainItem(2022956,10); // 火紅玫瑰
                cm.gainItem(2001505,100); // 超級藥水
                       cm.worldSpouseMessage(0x20,"[新手系統] 玩家 "+ cm.getChar().getName() +" 完成了傳奇新手成長系統階段5功能 系統給予大量獎勵。");
                cm.sendOk("完成了傳奇新手成長系統階段功能 系統給予大量獎勵。");
                cm.dispose();
            }else{
            cm.sendOk("無法滿足引導條件。請閱讀#b新手成長系統簡介#。");
            cm.dispose();
            }
        cm.dispose();
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9900005,"chengzhang1");
        } else if (selection == 4) {
            cm.dispose();
            cm.openNpc(9900005,"chengzhang2");
        }
       }
      }
}