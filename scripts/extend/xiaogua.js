var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var a = "#fEffect/CharacterEff/1082565/0/0#";  //餅乾兔子
var b = "#fEffect/CharacterEff/1112904/0/0#"; //彩色星星
var c = "#fEffect/CharacterEff/1003271/0/0#";  //紅色心心
var d = "#fEffect/CharacterEff/1112946/4/1#";  //鑽石
var e = "#fEffect/CharacterEff/1082229/0/0#";  //紅心
var fbtp = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        //cm.openNpc(2490002);
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
        cm.dispose();
    } else if (status == 0) {
        var selStr = "　　#d尊敬的[#r #h # #d] 請選擇您需挑戰的副本\r\n";
        selStr += b + b + b + b + b + b + b + b + b + b + b + "#r#e棉花島小怪獸#k#n" + b + b + b + b + b + b + b + b + b + b + b;
        selStr += "#b#L0#" + c + "藍蘑菇王#l#L1#" + c + "黑山老妖#l#L2#" + c + "陰森世界#l#L3#" + c + "格瑞芬#l\r\n";
        selStr += "#b#L4#" + c + "僵蘑菇王#l#L5#" + c + "海怒斯#l#L6#" + c + "蝙蝠魔王#l#L7#" + c + "噴火龍#l\r\n";
        selStr += "#b#L40#" + c + "妖魔禪師#l#L41#" + c + "變異蜈蚣#l#L42#" + c + "雪山魔魅#l#L43#" + c + "艾利傑#l\r\n";
        selStr += "#b#L44#" + c + "雪域貓妖#l#L45#" + c + "馱狼雪人#l#L46#" + c + "青山武士#l#L47#" + c + "大海獸#l\r\n\r\n";
      //  selStr += b + b + b + b + b + b + b + b + b + b + b + "#r#e高級模式副本#k#n" + b + b + b + b + b + b + b + b + b + b + b;
      //  selStr += "#d#L8#" + c + "闇黑龍王#l#L9#" + c + "[碧歐拉]#l#L10#" + c + "獅子巨王#l#L11#" + c + "[鬧鐘]#l\r\n";
     //   selStr += "#d#L12#" + c + "楓之高校#l#L13#" + c + "怪物公園#l#L14#" + c + "艾菲尼亞#l#L15#" + c + "[殘暴炎魔]#l\r\n\r\n";
      //  selStr += b + b + b + b + b + b + b + b + b + b + b + "#r#e困難模式副本#k#n" + b + b + b + b + b + b + b + b + b + b + b;
       // selStr += "#e#r#L16#" + c + "皮卡啾[專屬裝]#l#L17#" + c + "女皇西格諾斯[稀有飾品 140]#l\r\n";
     //   selStr += "#e#r#L18#" + c + "三大副本[稀有]#l#L19#" + c + "三核培羅德[專屬飾品 140]#l\r\n";
       // selStr += "#e#r#L20#" + c + "[進化]暗黑克勞德　★★★★★★「 稀有道具 」#l\r\n";
      // selStr += "#e#r#L21#" + c + "[進化]外星鑽機獸　★★★★★★「稀有裝 135」#l\r\n";
        //selStr += "#e#r#L22#" + c + "[進化]黑暗神卡裡　★★★★★★「稀有裝 135」#l\r\n"
       // selStr += "#e#r#L23#" + c + "[普通]邪僧黃金寺院　　★★★★「　 獎品 　」#l\r\n"
       // selStr += "#e#r#L24#" + c + "[普通]英語村的考試　　★★★★「　 獎品 　」#l\r\n"
       // selStr += "#e#r#L22#" + c + "[普通]關卡火力測試　　★★★★「　 獎品 　」#l\r\n"
       // selStr += "#e#r#L25#" + c + "[普通]森林保衛戰　　　★★★★「　 獎品 　」#l\r\n\r\n";;
      //  selStr += b + b + b + b + b + b + b + b + b + b + b + "#r#e終極模式副本#k#n" + b + b + b + b + b + b + b + b + b + b + b;
      //  selStr += "#e#r#L26#" + c + "[終極]暴君麥格雷斯　★★★★★★「 終極裝 」#l\r\n";
       // selStr += "#e#r#L27#" + c + "[終極]心靈中的夢魘　★★★★★★「 終極裝 」#l\r\n";
      //  selStr += "#e#r#L28#" + c + "[終極]家園保衛戰　　★★★★★★「 終極裝 」#l\r\n";
      //  selStr += "#e#r#L29#" + c + "[終極]航海中的危機　★★★★★★「 終極裝 」#l\r\n\r\n";
     //   selStr += b + b + b + b + b + b + b + b + b + b + b + "#r#e虐心模式副本#k#n" + b + b + b + b + b + b + b + b + b + b + b;
       // selStr += "#e#r#L30#" + c + "[虐心] 神話副本 　★★★★★★★「 稀有裝 」#l\r\n";
      //  selStr += "#e#r#L31#" + c + "[虐心]深淵進行曲　★★★★★★★「 稀有裝 」#l\r\n";
      //  selStr += "#e#r#L32#" + c + "[虐心]廢墟的居民　★★★★★★★「 稀有裝 」#l\r\n\r\n";
        //selStr += "#e#r#L33#" + c + "[虐心]黑暗神之影　★★★★★★★「 稀有裝 」#l\r\n\r\n";
      //  selStr += b + b + b + b + b + b + b + b + b + b + b + "#r#e福利模式副本#k#n" + b + b + b + b + b + b + b + b + b + b + b;
     //   selStr += "#e#g#L34#" + e + "[福利]新版武陵道場　　★★★★　「 超經驗 」#l\r\n";
     //   selStr += "#e#g#L35#" + e + "[福利]納希沙漠的培訓　★★★★　「 超福利 」#l\r\n";
     //   selStr += "#e#g#L36#" + e + "[福利]全民飛機總動員　★★★★　「 超福利 」#l\r\n";
     //   selStr += "#e#g#L37#" + e + "[福利] 西班牙鬥牛曲 　★★★★　「 超福利 」#l\r\n";
     //   selStr += "#e#g#L48#" + e + "[福利] 拯救我的公主 　★★★★　「 超福利 」#l\r\n";
     //   selStr += "#e#g#L38#" + e + "[福利]利弗裡天空庭院　★★★★　「 超福利 」#l\r\n\r\n";
      //  selStr += b + b + b + b + b + b + b + b + b + b + "#r#e噩夢★冒險極限★#k#n" + b + b + b + b + b + b + b + b + b;
      //  selStr += "#e#r#L39#" + e + "[噩夢]戰國時代　★★★★★★★　「 超稀有 」#l\r\n";
        //selStr += "#e#r#L39#" + e + "[噩夢] 起源之塔 ★★★★★★★　「  噩夢  」#l\r\n\r\n" + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b + b;
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0://藍蘑菇王
                cm.dispose();
                cm.warp(100020301);
                break;
            case 1://黑山老妖
                cm.dispose();
                cm.warp(211041400);
                break;
            case 2://陰森世界
                cm.dispose();
                cm.warp(551030200);
                break;
            case 3://格瑞芬
                cm.dispose();
                cm.warp(240020101);
                break;
            case 4://殭屍蘑菇王
                cm.dispose();
                cm.warp(100020401);
                break;
            case 5://海怒斯
                cm.dispose();
                cm.warp(230040420);
                break;
            case 6://蝙蝠魔王
                cm.dispose();
                cm.warp(100020301);
                break;
            case 7://噴火龍
                cm.dispose();
                cm.warp(240020401);
                break;
            case 8://闇黑龍王
                fbtp = 1;
                cm.sendYesNo("\r\n\r\n#e#d　　[ 4　 5 ] 頻道 -進階闇黑龍王\r\n　　[ 2 3 4 ] 頻道 -普通闇黑龍王\r\n　　您現在確認想去挑戰闇黑龍王嗎？");
                break;
            case 9://生化默認 碧歐拉
                fbtp = 6;
                cm.sendYesNo("\r\n\r\n#e#d\t您現在確認想去挑戰生化魔人·碧歐拉嗎？");
                break;
            case 10://獅子王
                fbtp = 5;
                cm.sendYesNo("\r\n\r\n#e#d\t\t您現在確認想去挑戰獅子王城嗎？");
                break;
            case 11://鬧鐘
                fbtp = 2;
                cm.sendYesNo("\r\n\r\n#e#d\t\t您現在確認想去挑戰拉圖斯嗎？");
                break;
            case 12://楓之高校
                fbtp = 8;
                cm.sendOk("\r\n\r\n\r\n#r#e\t\t\t敬請期待");
                status = -1;
                cm.warp(744000000);
                break;
            case 13://怪物公園
                cm.dispose();
                cm.sendOk("\r\n\r\n\r\n#r#e\t\t\t敬請期待");
                //cm.warp(951000000);
                break;
            case 14://艾菲尼亞
                fbtp = 4;
                cm.sendYesNo("\r\n\r\n#e#d\t\t您現在確認想去挑戰艾菲尼亞嗎？");
                break;
            case 15://殘暴炎魔
                fbtp = 3;
                cm.sendYesNo("\r\n\r\n#e#d　　[ 123 ] 頻道 - 普通殘暴炎魔\r\n　　[ 4與5 ] 頻道 - 進階殘暴炎魔\r\n　　您現在確認想去挑戰殘暴炎魔嗎？");
                break;
            case 16://殘暴炎魔
                fbtp = 9;
                cm.sendYesNo("\r\n\r\n#e#d　　[ 123 ] 頻道 - 普通皮卡啾\r\n　　[ 4與5 ] 頻道 - 進階皮卡啾\r\n　　您現在確認想去挑戰皮卡啾嗎？");
                break;
            case 17://女皇西格諾斯
                fbtp = 10;
                cm.sendYesNo("\r\n\r\n#e#d\t\t您現在確認想去挑戰女皇西格諾斯嗎？");
                break;
            case 18://三大副本
                fbtp = 11;
                cm.sendYesNo("\r\n\r\n#e#d\t\t您現在確認想去挑戰遺失的三大副本嗎？");
                break;
            case 19://貝勒
                fbtp = 12;
                cm.sendYesNo("\r\n\r\n#e#d\t\t您現在確認想去挑戰培羅德嗎？");
                break;
            case 20://暗黑克勞德
                cm.dispose();
                cm.openNpc(9220059);
                break;
            case 21://貝勒
                fbtp = 13;
                cm.sendYesNo("\r\n\r\n#e#d\t\t您現在確認想去挑戰外星人鑽機獸嗎？");
                break;
            case 22://黑暗神卡裡
                cm.dispose();
                cm.openNpc(9900003, 102);
                break;
            case 23://黃金寺院
                cm.dispose();
                cm.openNpc(9900003, 101);
                break;
            case 24://英語村
                cm.dispose();
                cm.openNpc(9310057);
                break;
            case 25://森林保衛戰
                cm.dispose();
                cm.openNpc(9900003, 109);
                break;
            case 26://暴君·麥格雷斯
                fbtp = 15;
                cm.sendYesNo("\r\n\r\n#e#d　　[ 4 ] 頻道 - 暴君·麥格雷斯\r\n　　您現在確認想去挑戰暴君·麥格雷斯嗎？");
                break;
            case 27://心靈中的夢魘
                cm.dispose();
                cm.openNpc(2490002, 43);
                break;
            case 28://家園保衛戰
                cm.dispose();
                cm.openNpc(2490002, 63);
                break;
            case 29://航海中的危機
                cm.dispose();
                cm.warp(865000999, 0);
                break;
            case 30://神話
                cm.dispose();
                cm.warp(262030000);
                break;
            case 31://深淵進行曲
                cm.dispose();
                cm.openNpc(2159362);
                break;
            case 32://廢墟居民
                cm.dispose();
                cm.openNpc(9900003, 700);
                break;
            case 33://黑暗神之影
                cm.sendOk("\r\n\r\n\r\n#r#e\t\t\t敬請期待");
                status = -1;
                break;
            case 34://武陵
                cm.dispose();
                cm.warp(925020001);
                break;
            case 35://納希沙漠
                cm.dispose();
                cm.openNpc(2101017, 1);
                break;
            case 36:
                cm.worldSpouseMessage(0x20, "[全民飛機大戰] ：玩家 " + cm.getChar().getName() + " 進入了機場候機室。");
                cm.dispose();
                cm.warp(540010001, 0);
                break;
            case 37://西班牙鬥牛
                cm.dispose();
                cm.warp(866500000, 0);
                break;
            case 38:
                cm.dispose();
                cm.openNpc(9220032);
                break;
            case 39://戰國時期
                cm.dispose();
                cm.openNpc(9900004,1012);
                break;
            case 40://妖怪禪師
                cm.dispose();
                cm.warp(250010503);
                break;
            case 41://變異蜈蚣
                cm.dispose();
                cm.warp(251010102);
                break;
            case 42://雪山魔魅
                cm.dispose();
                //cm.warp(211050000);
                cm.sendOk("\r\n\r\n\t\t\t#e#r存在出地圖問題 等待修復在開放");
                break;
            case 43://艾莉婕
                cm.dispose();
                cm.warp(200010300);
                break;
            case 44://雪域貓妖
                cm.dispose();
                cm.warp(677000007);
                break;
            case 45://馱狼雪人
                cm.dispose();
                cm.warp(211040101);
                break;
            case 46://青山武士
                cm.dispose();
                cm.warp(251010101);
                break;
            case 47://大海獸
                cm.dispose();
                cm.warp(240040401);
                break;
            case 48://拯救公主
                cm.dispose();
                cm.openNpc(9310114, 2);
                break;
        }
    } else if (status == 2) {
        if (fbtp == 1) {
            cm.warp(240040700);
            cm.dispose();
        } else if (fbtp == 2) {
            cm.warp(220080000);
            cm.dispose();
        } else if (fbtp == 3) {
            cm.warp(211042200);
            cm.dispose();
        } else if (fbtp == 4) {
            cm.warp(300030300);
            cm.dispose();
        } else if (fbtp == 5) {
            cm.warp(211070000);
            cm.dispose();
        } else if (fbtp == 6) {
            cm.dispose();
            cm.openNpc(9120050);
        } else if (fbtp == 7) {
            cm.dispose();
            cm.warp(802000710);
        } else if (fbtp == 9) {
            cm.dispose();
            cm.warp(270050000);
        } else if (fbtp == 10) {
            cm.dispose();
            cm.warp(271040000);
        } else if (fbtp == 11) {
            cm.dispose();
            cm.warp(105200000);
        } else if (fbtp == 12) {
            cm.dispose();
            cm.warp(863000100);
        } else if (fbtp == 13) {
            cm.dispose();
            cm.warp(703020000);
        } else if (fbtp == 15) {
            cm.dispose();
            cm.warp(401072000);
        }
    }
}