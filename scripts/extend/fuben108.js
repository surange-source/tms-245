
var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化會員
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
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
    }
    else if (status == 0) {
        var selStr = "\r\n#e#d您好，本服新增特色副本系列,更多請期待添加..#n#l#k\r\n\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        //selStr += "#L16#" + ttt6 + " #r1.#e[NEW]#n#b 新版武陵道場 #r #i1152124:##k#i1022226:##k#i1082392:##k#l#n\r\n";
        selStr += "#L14#" + ttt6 + " #r1.#e[NEW]#n#b 來吧！怪物公園 #r #i4310020:# #i4310030:##k#l#n\r\n";
        selStr += "#L19#" + ttt6 + " #r2.#e[NEW]#n#b 廢棄組隊 #r #i9020000:##k#i2430781:##k#i4310088:##k#l#n\r\n";
        selStr += "#L20#" + ttt6 + " #r3.#e[NEW]#n#b 拯救坎特 #r 大量樂豆點#n\r\n";
        selStr += "#L2#" + ttt6 + " #r4.#e[HOT]#n#b 逃脫任務#r 必得#v4310036#x300 #v2049323#.經驗.2000樂豆點#l\r\n";
        selStr += "#L17#" + ttt6 + " #r5.#e[NEW]#n#b 拯救我的公主 #r #i2003517:##k#i4310129:##k#i5062002:##k#k#i4310036:##k#l#n\r\n";
        //selStr += "#L15#" + ttt6 + " #r3.#e[NEW]#n#b 楓之高校 #r #i4310129:##k#i5062009:##k#i5062500:##k#l#n\r\n";
        //selStr += "#L20#" + ttt6 + " #r3.#e[NEW]#n#b 玩具組隊 #r #i2040034:##k#i2430781:##k#i4310088:##k#l#n\r\n";
        //selStr += "#L12#" + ttt6 + " #r3.#e[HOT]#n#b 弓箭手村跳跳跳（豐厚樂豆點）#r #i5062002:##k#i4310030:##k#l#n\r\n";
        //selStr += "#L13#" + ttt6 + " #r4.#e[HOT]#n#b 玩具城跳跳跳（豐厚樂豆點）#r #i5062500:##k#i4310030:##k#l#n\r\n";
        //selStr += "#L18#" + ttt6 + " #r7.#e[HOT]#n#b 挑戰克勞德 #r #i2431938:##k#i2430051:##k#l#n\r\n";
        //selStr += "#L11#" + ttt6 + " #r8.#e[HOT]#n#b 神話副本<時裝、椅子>#r #i1032219:##v2431354##v3010795##k#l#n\r\n";
        selStr += "#L10#" + ttt6 + " #r6.#e[HOT]#n#b 納希沙漠競技場#r #v4310036# #n#r#e\r\n        進去後快速下第二層,切記!(否則會掉)#n#l\r\n";
        //selStr += "#L0#" + ttt6 + " #r10.#e[HOT]#n#b 米納爾森林保衛戰#v4310030##v5072000##v5076000##l\r\n";
       // selStr += "#L1#" + ttt6 + " #r11.#e[HOT]#n#b 全民飛機大戰 #v5062009##v5062500##v5064000##l\r\n";
        selStr += "#L3#" + ttt6 + " #r7.#e[HOT]#n#b 利弗裡的天空庭院#v1102382##v1102383##v1102476##l\r\n";
        //selStr += "#L4#" + ttt6 + " #r6.#e[HOT]#n#b 挑戰英語村#v1102604##v3010059##v1182010##v1190101##l\r\n";
       // selStr += "#L5#" + ttt6 + " #r15.#e[HOT]#n#b 黃金寺院：僧侶諾伊的情願#l\r\n";
       // selStr += "#L6#" + ttt6 + " #r16.#e[HOT]#n#b 關卡火力測試(小試牛刀)#v5062002##l\r\n";
     //  selStr += "#L7#" + ttt6 + " #r8.#e[HOT]#n#b 變成廢墟的民居#v1432086##v1052315##v3010592##l\r\n";
        selStr += "#L8#" + ttt6 + " #r8.#e[HOT]#n#b 心靈中的夢魘#v1102450##v1102451##v1102488##l\r\n";
      //  selStr += "#L8#" + ttt6 + " #r11.#e[HOT]#n#b 無限火力挑戰#v5062002##l\r\n";
     //selStr += "#L9#" + ttt6 + " #r19.#e[HOT]#n#b 生化魔人歐碧啦#v1112915##v5062000##v5062002##v5064000##l\r\n";
        selStr += "\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9900003, "milaer");
                break;
            case 1:
                cm.worldSpouseMessage(0x20, "[全民飛機大戰] ：玩家 " + cm.getChar().getName() + " 進入了機場候機室。");
                cm.dispose();
                cm.warp(540010001, 0);
                break;
            case 2:
               cm.dispose();
               cm.openNpc(9900003, "beikundezhu");
              break;
            case 3:
                cm.dispose();
                cm.openNpc(9220032);
                break;
            case 4:
                cm.dispose();
                cm.openNpc(9310057);
                break;
            case 5:
                cm.dispose();
                cm.openNpc(9900003, "hjsy");
                break;
            case 6:
                cm.dispose();
                cm.openNpc(9900003, "xiaodao");
                break;
            case 7:
                cm.dispose();
                cm.openNpc(9900003, "jiayuan");
                break;
            case 8:
                cm.dispose();
                cm.openNpc(2060103,"mengmo");
                break;
            case 9:
                cm.dispose();
                cm.openNpc(9120050);
                break;
            case 10:
                cm.dispose();
                cm.openNpc(2101017,"alat");
                break;
            case 11:
                cm.dispose();
                cm.warp(262030000);
                break;
            case 12: 
                cm.dispose();
                cm.warp(100000202, 0);
                cm.sendOk("跳到頂上，去領取屬於你的獎勵吧！");
                break;
            case 13:
                cm.dispose();
                cm.warp(220000006, 0);
                cm.sendOk("跳到頂上，去領取屬於你的獎勵吧！");
                break;
            case 14:
                cm.dispose();
                cm.warp(951000000);
                break;
            case 15:
                cm.dispose();
                cm.warp(744000000);
                break;
            case 16:
                cm.dispose();
                cm.warp(925020001);
                break;
            case 17:
                cm.dispose();
                cm.openNpc(9310114, "moguwang");
                break;
            case 18:
                cm.dispose();
                cm.openNpc(9220059);
                break;
            case 19:
                cm.dispose();
                cm.openNpc(9020000);
                break;
            case 20:
                cm.dispose();
                cm.openNpc(9020003);
                break;
        }
    }
}