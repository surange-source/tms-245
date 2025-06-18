var status = -1;
var select = -1;

function start() {
    cm.sendSimple("您想了解#b楓之谷聯盟#k？\r\n我能為您說明什麼呢？\r\n#L0# #b楓之谷聯盟？#k#l\r\n#L1# #b聯盟等級#k#l\r\n#L2# #b聯盟階級#k#l\r\n#L3# #b攻擊隊與戰鬥力#k#l\r\n#L4# #b戰鬥地圖和角色方塊#k#l\r\n#L9# #b預設儲存功能#k#l\r\n#L5# #b聯盟團戰#k#l\r\n#L6# #b每週獲得硬幣排名#k#l\r\n\r\n#L100# #e停止聽取說明。#n#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (select == 2 && status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        if (select == -1) {
            select = selection;
        }
        switch (select) {
            case 0:
                cm.sendNext("#e<何謂楓之谷聯盟？>#n\r\n\r\n#e楓之谷聯盟#n意指#b相同世界內的角色集團#k。\r\n但並不是所有角色都能加入#b楓之谷聯盟#k。\r\n#r必須是角色等級達60以上/完成2次轉職的角色#k才能加入。\r\n而且#r當相同世界內的角色超過40名時，#k #b以等級為準，只有前40名#k的角色才允許加入楓之谷聯盟。\r\n\r\n另外若為#b神之子#k角色，只有1名達到#r130級以上之等級最高的角色#k才允許加入楓之谷聯盟。");
                break;
            case 1:
                cm.sendNext("#e<聯盟等級>#n\r\n\r\n#e聯盟等級#n意指隸屬#b楓之谷聯盟#k之角色\r\n#r等級的總和值#k。\r\n\r\n聯盟等級高才能#r升級#k成更高的#b聯盟階級#k，建立更強大的楓之谷聯盟。\r\n\r\n#b聯盟等級排名#k可在官網查看。");
                break;
            case 2:
                cm.sendNext("#e<聯盟等級>#n\r\n\r\n#e聯盟等級#n是當#b聯盟等級#k達到特定數值時可提升的#b成長標準#k。\r\n\r\n#b聯盟等級#k越高，就能把#r更多攻擊隊員#k配置到#r更廣的戰鬥地圖#k上。\r\n當#b聯盟等級#k達到一定的程度進行#b升級#k時，必須支付 #b#i4310229:##t4310229##k。\r\n\r\n#L1# #b 瀏覽各個等級需要的等級 /支付硬幣/ 攻擊隊員數#k#l");
                break;
            case 3:
                cm.sendNext("#e<攻擊隊與戰鬥力>#n\r\n\r\n#b攻擊隊#k意指聯盟角色中，配置在#b戰鬥地圖上的角色集團#k。\r\n\r\n成為#b攻擊隊員#k的角色將會參加#r聯盟團戰#k和強大的敵人展開戰鬥，藉此收集#b聯盟硬幣#k。\r\n\r\n另外，攻擊隊員可根據角色原有的#b<攻擊隊員效果>#k和戰鬥地圖佔領狀態發動#b<攻擊隊佔領效果>#k，賦予#r世界內所有角色#k#b能力值上升效果#k。");
                break;
            case 4:
                cm.sendNext("#e<戰鬥地圖和角色方塊>#n\r\n\r\n#b戰鬥地圖#k是可配置#r攻擊隊員#k來佔領的地圖，是由#b內部8區#k、#r外部8區#k #e合計16個地區#n組成。\r\n由於各地區具備#b原有能力?#k，因此能力?可依照各地區#r佔領格數#k上升。\r\n\r\n#b內部8個地區的能力?能#k隨意#b變更，而#k\r\n#r外部8個地區的能力?是#k固定的。");
                break;
            case 5:
                cm.sendNext("#e<聯盟團戰>#n\r\n\r\n#b聯盟團戰#k是由#b攻擊隊員#k進行的#r戰鬥內容#k。\r\n\r\n利用已加入攻擊隊的角色點擊聯盟UI的#e<參加戰鬥>按鈕#n即可進場。\r\n進入團戰時就能看到#b攻擊隊員#k們正努力奮戰。");
                break;
            case 6:
                cm.sendNext("#e<每週獲得硬幣排名>#n\r\n\r\n#b每週獲得硬幣排名#k是以世界內所有角色從\r\n#b每週一晚上12點30分至#k #r星期日晚上11點 30分#k所獲得之#b聯盟硬幣#k的數量為準來計算排名。");
                break;
            case 9:
                cm.sendNext("#e<預設儲存功能>#n\r\n\r\n你想將排置在#b戰鬥地圖#k的#r角色方塊與內部8個能力值#k依照各狀況更換嗎？\r\n那就使用#b聯盟預設#k功能吧！");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 0:
                cm.sendNextPrev("#e<何謂楓之谷聯盟？>#n\r\n\r\n所屬#e楓之谷聯盟#n的角色會根據#r等級#k來提升#b角色等級#k\r\n\r\n#e<一般角色>#n\r\n#b#eB(60)>A(100)>S(140)>SS(200)>SSS(250)#n#k\r\n#e<神之子>#n\r\n#b#eB(130)>A(160)>S(180)>SS(200)>SSS(250)#n#k");
                break;
            case 1:
                status = -1;
                select = -1;
                start();
                break;
            case 2:
                cm.sendNext("#e<新手聯盟>#n\r\n\r\n-#e1階段#n #bLv.   -#k     #r需要硬幣：無#k     #b攻擊隊員：9名#k#n\r\n-#e2階段#n #bLv.1000#k   #r需要硬幣：120個#k   #b攻擊隊員：10名#k\r\n-#e3階段#n #bLv.1500#k   #r需要硬幣：140個#k   #b攻擊隊員：11名#k\r\n-#e4階段#n #bLv.2000#k   #r需要硬幣：150個#k   #b攻擊隊員：12名#k\r\n-#e5階段#n #bLv.2500#k   #r需要硬幣：160個#k   #b攻擊隊員：13名#k");
                break;
            case 3:
                cm.sendNextPrev("#e<攻擊隊與戰鬥力>#n\r\n\r\n#b戰鬥力#k是由角色的#r等級#k與#r星盾數值#k而定。\r\n\r\n尤其#b攻擊隊員#k們的戰鬥力總和可說是#b攻擊隊戰鬥力#k，#b攻擊隊戰鬥力#k要高#r聯盟團戰#k才能對敵人造成更大的傷害，並且更快收集到聯盟硬幣。");
                break;
            case 4:
                cm.sendNextPrev("#e<戰鬥地圖和角色方塊>把角色#e拖放#n至#n\r\n\r\n#b戰鬥地圖#k中時，角色會以#b方塊#k的方式顯示，並且佔領#b戰鬥地圖#k的一部分。\r\n\r\n#e角色方塊#n根據#b等級#k與#b職業種類#k，將以#b基準角色方塊#k為中心，成長為不同的型態。");
                break;
            case 5:
                cm.sendNextPrev("#e<聯盟團戰>#n\r\n\r\n#b聯盟團戰#k中大致有#b2種怪物#k登場。\r\n\r\n#e第一種#n是戰場中央的#b巨龍#k。\r\n#b攻擊隊員#k會自動攻擊中央的巨龍。\r\n\r\n#r直接加入戰鬥的角色#k也能攻擊#b巨龍#k。\r\n但是當#r巨龍#kHP當中的#b綠色計量表#k耗盡時，將會發動#b防護罩#k，此時將不套用直接加入的角色的攻擊，只套用#b剩餘攻擊隊員的傷害#k。\r\n\r\n即使攻擊隊員#b不直接加入戰鬥，#k與巨龍之間的戰鬥還是會#b繼續進行#k，並收集#b聯盟硬幣#k。\r\n\r\n#b聯盟硬幣#k在#r退出團戰時將會自動計算#k，#b建議經常進來回收#k攻擊隊員收集到的硬幣。");
                break;
            case 6:
                cm.sendNextPrev("#e<每週獲得硬幣排名>#n\r\n\r\n#b以最後#k更新每週累積硬幣的#b角色名稱#k登錄排名，並於下週贈與#r第1名到\r\n第100名的聯盟#k #b特別禮物#k。\r\n由於透過#b每日任務#k獲得的硬幣也能累積，建議常來挑戰。");
                break;
            case 9:
                cm.sendNextPrev("#e<預設儲存功能>#n\r\n\r\n基本上提供兩個預設，以及透過於#r硬幣商店#k販售的#b#i2436884:##t2436884##k。\r\n最多#r再加三個，#k 並可#b啟用30天#k。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 0:
                status = -1;
                select = -1;
                start();
                break;
            case 2:
                cm.sendNextPrev("#e<老手聯盟>#n\r\n\r\n-#e1階段#n #bLv.3000#k   #r需要硬幣：170個#k   #b攻擊隊員：18名#k#n\r\n-#e2階段#n #bLv.3500#k   #r需要硬幣：430個#k   #b攻擊隊員：19名#k\r\n-#e3階段#n #bLv.4000#k   #r需要硬幣：450個#k   #b攻擊隊員：20名#k\r\n-#e4階段#n #bLv.4500#k   #r需要硬幣：470個#k   #b攻擊隊員：21名#k\r\n-#e5階段#n #bLv.5000#k   #r需要硬幣：490個#k   #b攻擊隊員：22名#k");
                break;
            case 3:
                status = -1;
                select = -1;
                start();
                break;
            case 4:
                cm.sendNextPrev("#e<戰鬥地圖和角色方塊>#n\r\n\r\n首次將角色配置於#b戰鬥地圖#k上時，務必讓#r基準角色方塊#k位於#b中央4處的其中一處#k。\r\n\r\n接著即可配置其他角色，讓角色方塊互相銜接或重疊。也能對角色方塊進行#b翻面或轉動#k，將之變成想要的樣子，#b或者點擊右鍵解除#k 。");
                break;
            case 5:
                cm.sendNextPrev("#e<聯盟團戰>#n\r\n\r\n#e第二種#怪物是保護巨龍的#b小龍#k。\r\n\r\n只有#r直接加入戰鬥的角色#k能攻擊這些怪物，並將之擊退完成#b每日任務#k。\r\n擊退小龍時，偶爾會出現稀有的#b黃金翼龍#k。");
                break;
            case 6:
                status = -1;
                select = -1;
                start();
                break;
            case 9:
                cm.sendNextPrev("#e<預設儲存功能>#n\r\n\r\n#b點擊預設鍵配置#k後，儲存的話之後可透過套用快速變更！如果是已套用的預設，只要變更配置後儲存即可套用。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 2:
                cm.sendNextPrev("#e<大師聯盟>#n\r\n\r\n-#e1階段#n #bLv.5500#k   #r需要硬幣：510個#k   #b攻擊隊員：27名#k#n\r\n-#e2階段#n #bLv.6000#k   #r需要硬幣：930個#k   #b攻擊隊員：28名#k\r\n-#e3階段#n #bLv.6500#k   #r需要硬幣：960個#k   #b攻擊隊員：29名#k\r\n-#e4階段#n #bLv.7000#k   #r需要硬幣：1000個#k   #b攻擊隊員：30名#k\r\n-#e5階段#n #bLv.7500#k   #r需要硬幣：1030個#k   #b攻擊隊員：31名#k");
                break;
            case 4:
                status = -1;
                select = -1;
                start();
                break;
            case 5:
                cm.sendNextPrev("#e<聯盟團戰>#n\r\n\r\n每當對#b巨龍#k累積的傷害達到#e1000億#n時，可獲得一個#b聯盟硬幣#k。\r\n累積傷害是以#b一天為單位進行初始化#k。\r\n\r\n各聯盟等級的#r上限值#k不同，達到上限值時將不再累積聯盟硬幣，所以每天確認一下比較好吧？");
                break;
            case 9:
                status = -1;
                select = -1;
                start();
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 2:
                cm.sendNextPrev("#e<超級大師聯盟>#n\r\n\r\n-#e1階段#n #bLv.8000#k   #r需要硬幣：1060個#k   #b攻擊隊員：36名#k#n\r\n-#e2階段#n #bLv.8500#k   #r需要硬幣：2200個#k   #b攻擊隊員：37名#k\r\n-#e3階段#n #bLv.9000#k   #r需要硬幣：2300個#k   #b攻擊隊員：38名#k\r\n-#e4階段#n #bLv.9500#k   #r需要硬幣：2350個#k   #b攻擊隊員：39名#k\r\n-#e5階段#n #bLv.10000#k  #r需要硬幣：2400個#k   #b攻擊隊員：40名#k");
                break;
            case 5:
                status = -1;
                select = -1;
                start();
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 2:
                status = -1;
                select = -1;
                start();
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}