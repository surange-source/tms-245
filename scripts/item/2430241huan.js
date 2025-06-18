function start() {
        im.gainItem(2430241, -1);
        im.gainItem(1142950, 1);// 2016猴年勳章
        im.gainItem(1003552, 1);// 專屬紫金楓葉黃金帽
        im.gainItem(1082433, 1);// 專屬紫金楓葉手套
        im.gainItem(1052461, 1);// 專屬紫金楓葉套裝
        im.gainItem(1102441, 1);// 專屬紫金楓葉披風
        im.gainItem(1072666, 1);// 專屬紫金楓葉鞋
        im.gainItem(1132154, 1);// 專屬紫金楓葉腰帶
        im.gainItem(1152089, 1);// 專屬紫金楓葉肩章
        im.gainItem(5030008, 1);// 小甜甜商人: 7日權
        im.gainItem(3012003, 1);// 愛心椅子
        im.gainItem(3010583, 1);// 蛇椅子
        im.gainItem(2000019, 200);// 超級藥水
        im.gainItem(1072153, 1);// 透明鞋
        im.gainItem(1082170, 1);// 粉色電子錶
        im.gainItem(1102214, 1);// 皮卡啾氣球
        im.gainItem(1002957, 1);// 皮卡啾帽子
        im.gainItem(1052198, 1);// 皮卡啾套服
        im.gainItem(1702358, 1);//我的朋友皮卡啾
        im.gainItem(1012057, 1);//透明面具
        im.gainItem(1022048, 1);//透明眼飾
        im.gainItem(2022452, 11);//經驗值上升(大)
        im.gainItem(1032024, 1);//透明耳環
        im.gainItem(5150040, 10);// 皇家理發
        im.gainItem(5152053, 10);// 皇家整容
        im.gainItem(5211060, 1, 2 * 60 * 60 * 1000);// 三倍經驗
        im.gainItem(5360015, 1, 2 * 60 * 60 * 1000);// 雙爆
        im.gainItem(5072000, 50);// 高質地喇叭
        im.gainItem(1190400, 1);//BOSS競技場徽章
        im.gainItem(1112164, 1);//夏日甜心名片戒指 24小時
        im.gainItem(1112276, 1);//夏日甜心聊天戒指 24小時
        im.gainItem(1112918, 1, 5);// 回歸戒指 X1 24小時
        im.sendOk("恭喜您獲得 #r管理員送出的禮物#k 。");
        im.worldSpouseMessage(0x20,"『歡迎新人』：恭喜玩家 "+ im.getChar().getName() +" 駕駛著UFO成功降落到盛小楓之谷。大熱烈祝賀他(她)吧。");
        im.dispose(); 
}
