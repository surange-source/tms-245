var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow/Minigame/Common/mark#";

var status = -1;

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


    if (cm.getPQLog("歡迎新人") >= 0 && cm.getPlayerStat("LVL") <= 100) {

            var text = "#e親愛的玩家：#g#h0##k 您好，\r\n 歡迎來到#r" + cm.getServerName() + "#k,先來大概瞭解一下本服特色：\r\n\r\n";
                text += "· #e#d本服為仿官模式 爆率設置：經驗30倍  楓幣5倍  爆率5倍\r\n";
                                text += "· 功能一鍵化!!!#r所有功能#k可在#v2432667#內使用!!\r\n";
                text += "· 主菜單在拍賣按鈕(或者輸入@npc),和市場裡的NPC可以提供各種便捷服務\r\n";
                text += "· #e新手出生點擊我將會送你:#v2436225##v2434547##v2432667##v2436381##v2430672##v2435837##v5000064##v1114219##v3015031##v1004763##v10042349##v1062015##v1102271##v1012416##v2432068##v1115028##v1142609##v1112918##v1115117#\r\n";
                text += "· 全職業開放創建，下水道職業最完美最平衡的#r技改#k以及快速#g5轉功能#k\r\n";
                text += "· 全私服（長久服）最高最豐厚的#b女生福利#k，認證後打開#v2430672#即可領取獎勵(每週都可領取一次！）！！\r\n";
                                text += "· 糖服特色#r每週#k輪換的周活動!!保證讓你的遊戲充滿激情！！\r\n";
                                text += "· 糖服特色:#r瑪瑙升級系統#k #g黑魔法師的力量#k！！\r\n";
                                text += "· 官服BOSS全面體驗,最新#rBOSS露希妲已開放#k!!!\r\n";
                                text += "· 特色副本：#d組隊副本 楓幣副本 方塊副本#k \r\n";
                                text += "· 特色玩法以及大量#b每日在線#k福利(大量樂豆點.餘額只要在線免費送!)!!\r\n";
                                text += "· #b經典跑環任務#k （更有餘額#v2430210#免費贈送）!!!\r\n";
                                text += "· #d武陵副本RANK模式#k 通關送樂豆點獎勵助您不儲值也能成為大神!!!\r\n";
                                text += "· 人性化的#g等級獎勵#k，豐厚的獎勵，讓您輕鬆度過萌新階段!!\r\n";
                                text += "· #e#r注意#k:新手將贈送的經驗包使用後即可直接到達10級然後直接使用贈送的箱子一鍵轉職,經驗倍率才會恢復到30倍!!\r\n";
                                text += "· 更多遊戲攻略以及玩法介紹，加入我們的官方Q群：\r\n        #r580995242#k 與大家一起快樂玩耍交流吧！！\r\n";
                text += "\r\n\r\n            更多精彩,敬請期待!";
            cm.sendSimple(text);
        } else {
            cm.dispose();
            cm.sendOk("你已經領取過新人禮包，無法再次領取！\r\n\r\n"+"· #e#d本服為仿官模式 爆率設置：經驗30倍  楓幣5倍  爆率5倍\r\n"+"· 功能一鍵化!!!#r所有功能#k可在#v2432667#內使用!!\r\n"+"· 主菜單在拍賣按鈕(或者輸入@npc),和市場裡的NPC可以提供各種便捷服務\r\n"+"· #e新手出生點擊我將會送你:#v2436225##v2434547##v2432667##v2436381##v2430672##v2435837##v5000064##v1114219##v3015031##v1004763##v10042349##v1062015##v1102271##v1012416##v2432068##v1115028##v1142609##v1112918##v1115117#\r\n"+"· 全職業開放創建，下水道職業最完美最平衡的#r技改#k以及快速#g5轉功能#k\r\n"+"· 全私服（長久服）最高最豐厚的#b女生福利#k，認證後打開#v2430672#即可領取獎勵(每週都可領取一次！）！！\r\n"+"· 糖服特色#r每週#k輪換的周活動!!保證讓你的遊戲充滿激情！！\r\n"+"· 糖服特色:#r瑪瑙升級系統#k #g黑魔法師的力量#k！！\r\n"+ "· 官服BOSS全面體驗,最新#rBOSS露希妲已開放#k!!!\r\n"+ "· 特色副本：#d組隊副本 楓幣副本 方塊副本#k \r\n"+"· 特色玩法以及大量#b每日在線#k福利(大量樂豆點.餘額只要在線免費送!)!!\r\n"+"· #b經典跑環任務#k （更有餘額#v2430210#免費贈送）!!!\r\n"+"· #d武陵副本RANK模式#k 通關送樂豆點獎勵助您不儲值也能成為大神!!!\r\n"+"· 人性化的#g等級獎勵#k，豐厚的獎勵，讓您輕鬆度過萌新階段!!\r\n"+"· #e#r注意#k:新手將贈送的經驗包使用後即可直接到達10級然後直接使用贈送的箱子一鍵轉職,經驗倍率才會恢復到30倍!!\r\n"+"· 更多遊戲攻略以及玩法介紹，加入我們的官方Q群：\r\n        #r580995242#k 與大家一起快樂玩耍交流吧！！\r\n"+"\r\n\r\n            更多精彩,敬請期待!");
            cm.dispose();
        }
    } else if (status == 1) {
        cm.dispose();
                cm.setPQLog("歡迎新人", 0, -2);
                cm.gainItem(2436225, 1);
        cm.gainItem(2430241, 1);
                cm.gainItem(2434950, 1);
        cm.gainItem(2431305, 1);
        cm.gainItem(2432667, 1);
                cm.gainItem(2436381, 1);
                cm.gainItem(2430672, 1);
        cm.gainItem(2430154, 1);
                cm.gainItem(2434547, 1);
                cm.gainItem(5190001, 1);//自動服用HP藥水技能
                cm.gainItem(5190010, 1);//寵物自動加BUFF技能
                cm.gainPetItem(5000064, 1);//黃金豬
                cm.gainItem(5190011, 1);//寵物訓練技能
                cm.gainItem(5192000, 1);//寵物訓練箱
                cm.gainItem(2000005, 500);
        cm.gainItem(5062000, 50);
        cm.gainMeso(3000000);
            var toDrop = cm.getNewEquip(1142609); // 生成一個Equip類 
                    toDrop.setStr(25); //裝備力量
                    toDrop.setDex(25); //裝備敏捷
                    toDrop.setInt(25); //裝備智力
              toDrop.setLuk(25); //裝備運氣
            toDrop.setMatk(20); //物理攻擊
            toDrop.setWatk(20); //魔法攻擊 
                toDrop.setHp(500); 
            toDrop.setEnhance(25);
            cm.addFromDrop(toDrop);
            cm.setPQLog("糖服冒險家", 1);
            var equip = cm. getNewEquip(1114219); // 生成一個Equip類                   
            equip.setStr(30); //裝備力量
            equip.setDex(30); //裝備敏捷
            equip.setInt(30); //裝備智力
            equip.setLuk(30); //裝備運氣
                        equip.setHp(200);
            equip.setMatk(10); //物理攻擊
            equip.setWatk(10); //魔法攻擊 
            cm.addFromDrop(equip);
                cm.sendOk("#e請檢查由GM送出的驚喜吧!!\r\n          更多遊戲攻略以及玩法介紹，加入我們的官方Q群：\r\n        #r580995242#k 與大家一起快樂玩耍交流吧！！");
        cm.worldSpouseMessage(0x17,"『糖糖公告』：又一位萌新玩家 "+ cm.getChar().getName() +" 被聰明可愛的糖寶寶帶到了糖糖楓之谷的小窩!");
                cm.worldSpouseMessage(0x15,"『糖糖公告』：又一位萌新玩家 "+ cm.getChar().getName() +" 被聰明可愛的糖寶寶帶到了糖糖楓之谷的小窩!");
                cm.worldSpouseMessage(0x14,"『糖糖公告』：又一位萌新玩家 "+ cm.getChar().getName() +" 被聰明可愛的糖寶寶帶到了糖糖楓之谷的小窩!");
    }
}






function Operate(job) {
    switch (job) {
        case 6001://天使破壞者
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)//升到10級
            cm.gainItem(1222000, -1);//刪除原始道具
            equip(1352600)//佩戴靈魂手鐲
            cm.changeJob(6500);
            cm.gainItem(2431305, 1);
            cm.sendY("贈送給你 >>> 火光武器箱 一個，可以根據你的角色等級獲取相應的道具！")
            break;
    }
}
function equip(itemId) {
    if (!cm.haveItem(itemId, 1, true, true)) {
        cm.gainItem(itemId, 1);
    }
    //查找玩家背包有沒有這個物品,沒有就給玩家
    cm.gainItemAndEquip(itemId, -10);
}
