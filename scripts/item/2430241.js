function start() {
        im.gainItem(2430241, -1);
        im.gainItem(3010180, 1);// HP椅子
        im.gainItem(3012003, 1);// 愛心椅子
        im.gainItem(3010583, 1);// 蛇椅子
        im.gainItem(3010682, 1);// 天文台椅子
        im.gainItem(2000005, 300);// 超級藥水
        im.gainItem(1072407, 1);// HELLO喵喵拖
        im.gainItem(1082170, 1);// 粉色電子錶
        im.gainItem(1042096, 1);// 超人衣服
        im.gainItem(1062098, 1);// 牛仔褲子
        im.gainItem(1112116, 1);
        im.gainItem(1112226, 1);
        im.gainItem(1002186, 1);
        im.gainItem(1012057, 1);
        im.gainItem(1022048, 1);
        im.gainItem(1032024, 1);
        im.gainItem(5150040, 3);// 皇家理發
        im.gainItem(5152053, 3);// 皇家整容
        im.gainItem(5150052, 1);// 萬能高級美發
        im.gainItem(5153015, 1);// 萬能護膚
        im.gainItem(5152057, 1);// 萬能高級整形
        im.gainItemPeriod(5211060, 1, 2 * 60 * 60 * 1000);// 三倍經驗
        im.gainItemPeriod(5360015, 1, 2 * 60 * 60 * 1000);// 雙爆
        //im.gainItem(5050000, 100);// 洗血的能力值
        im.gainItem(5072000, 50);// 高質地喇叭
        im.gainItem(5060000, 3);// 裝備刻名 X3
        im.gainItem(2431092, 1);//
        im.gainItemPeriod(1112164, 1, 2 * 60 * 60 * 1000);//夏日甜心名片戒指 24小時
        im.gainItemPeriod(1112276, 1, 2 * 60 * 60 * 1000);//夏日甜心聊天戒指 24小時
        im.gainItemPeriod(1102630, 1, 1);// 浪漫四翼天使 24小時
        im.gainItemPeriod(1102709, 1, 1);// 雙色糖果翅膀 1天
        im.gainItemPeriod(1112918, 1, 1);// 回歸戒指 X1 24小時
        im.gainItem(1302063, 1);// 火刀
        im.sendOk("恭喜您獲得 #r管理員送出的禮物#k 。");
        //im.worldSpouseMessage(0x20,"『新手駕到』：恭喜玩家 "+ im.getChar().getName() +" 來到了繁星楓之谷。熱烈祝賀他(她)吧。");
        im.dispose(); 
}
