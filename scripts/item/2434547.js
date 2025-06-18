var status = 0;
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var typed = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var selStr = "\r\n\r\n";
        selStr += "#b請選擇您要完成的成就技能：#k\r\n";
        selStr += "#r#L0##s80011089# 冰龍斬#e#g【劍豪職業群專用技能】#n#k#l\r\n";
        selStr += "#r#L1##s80000115# 口袋怪物菜鳥#l\r\n";
        selStr += "#r#L2##s80000116# 臨戰巨敵#l\r\n";
        selStr += "#r#L3##s80000117# 好酷~~~的幸福#l\r\n";
        selStr += "#r#L4##s80000118# 冰冰爽#l\r\n";
        selStr += "#r#L5##s80000119# 快樂簽到王#l\r\n";
        selStr += "#r#L6##s80011224# [廚神的廚房] 製作者增益#l\r\n";
        selStr += "#r#L7##s80000336# 秘密任務執行者#l\r\n";
        selStr += "#r#L8##s80000337# 危機守護者#l\r\n";
        selStr += "#r#L9##s80000338# 蒼空中的王牌#l\r\n";
        selStr += "#r#L10##s80000339# 秘密間諜 #l\r\n";
        selStr += "#r#L11##s80000340# 孤獨粉碎者 #l\r\n";
        selStr += "#r#L12##s80000341# 敏銳神探 #l\r\n";
        selStr += "#r#L13##s80000342# 重力反彈者 #l\r\n";
        selStr += "#r#L14##s80000343# 黑色天國拯救者 #l\r\n";
        selStr += "#r#L15##s80000133# 見習獵人資格證 #l\r\n";
        selStr += "#r#L16##s80000134# B級獵人資格證 #l\r\n";
        selStr += "#r#L17##s80000135# A級獵人資格證 #l\r\n";
        selStr += "#r#L18##s80000136# S級獵人資格證 #l\r\n";
        selStr += "#r#L19##s80000162# 復仇者 #l\r\n";
        selStr += "#r#L20##s80000161# 打架王 #l\r\n";
        selStr += "#r#L21##s80000164# 鬥士 #l\r\n";
        selStr += "#r#L22##s80000165# 最強鬥士#l\r\n";
        selStr += "#r#L23##s80000044# 動作英雄勝利者 #l\r\n";
        selStr += "#r#L24##s80000045# 動作英雄勝利者 #l\r\n";

        selStr += "#r#L25##s80000046# 動作英雄勝利者(未開放) #l\r\n";
        selStr += "#r#L26##s80000041# 印第安小孩的聲援(未開放) #l\r\n";
        selStr += "#r#L27##s80000042# 印第安小孩的聲援(未開放) #l\r\n";
        selStr += "#r#L28##s80000043# 印第安小孩的聲援(未開放) #l\r\n";
        selStr += "#r#L29##s80000291# 搭配之王后繼者(未開放) #l\r\n";
        selStr += "#r#L30##s80000292# 好嗎？很好(未開放) #l\r\n";
        selStr += "#r#L31##s80000293# 評審皇太子(未開放) #l\r\n";
        selStr += "#r#L32##s80000308# 渴望親近(未開放) #l\r\n";
        selStr += "#r#L33##s80000309# 還很陌生(未開放) #l\r\n";
        selStr += "#r#L34##s80000310# 你和我是什麼關係 #l\r\n";
        selStr += "#r#L35##s80000311# 我們逐漸靠近 #l\r\n";
        selStr += "#r#L36##s80000109# 王冠收藏家(未開放) #l\r\n";
        selStr += "#r#L37##s80000051# 2012冬季稱號(未開放) #l\r\n";
        selStr += "#r#L38##s80000085# 楓之谷風流王(未開放) #l\r\n";
        selStr += "#r#L39##s80000114# 被禁的魔法之祝福(未開放) #l\r\n";
        selStr += "#r#L40##s80000080# 酸酸甜甜白色情人節(未開放) #l\r\n";
        selStr += "#r#L41##s80000298# 酸酸甜甜(未開放) #l\r\n";
        selStr += "#r#L42##s80000312# 蜜蝴蝶知己認證(未開放) #l\r\n";
        selStr += "#r#L43##s80000313# 蜜蝴蝶傻瓜認證(未開放) #l\r\n";
        selStr += "#r#L44##s80000314# 蜜蝴蝶沉迷認證(未開放) #l\r\n";
        
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
                case 0:
    if (im.getJob() == 4112) {
        im.teachSkill(80011089 ,  1, 1);
        im.sendOk("您通過力量的考驗，獲取了新的技能！！\r\n         #e#r【冰龍斬】#k#n\r\n\r\n             #s80011089#");
        im.dispose();
    } else {
        im.sendOk("您並非為劍豪職業，或者您還未完成4轉！！請完成後再來找我");
        im.dispose();
    }
            break;
        case 1:
                        if(im.getChar().getLevel() >= 100){
            im.teachSkill(80000115,  1, 1);
                        im.playerMessage(1, "恭喜您獲得口袋怪物菜鳥！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你的等級還未滿100級，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 2:
                        if(im.getChar().getLevel() >= 150){
            im.teachSkill(80000116 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得臨戰巨敵！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你的等級還未滿150級，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 3:
                        if(im.getChar().getLevel() >= 200){
            im.teachSkill(80000117 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得好酷~~~的幸福！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你的等級還未滿200級，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 4:
                        if(im.getChar().getLevel() >= 215){
            im.teachSkill(80000118 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得冰冰爽！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你的等級還未滿215級，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 5:
                        if(im.getChar().getLevel() >= 232){
            im.teachSkill(80000119 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得快樂簽到王！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你的等級還未滿232級，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 6:
                        if(im.getChar().getLevel() >= 250){
            im.teachSkill(80011224 ,  1, 1);
                        im.playerMessage(1, "[廚神的廚房] 製作者增益！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你的等級還未滿250級，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 7:
                        if(im.getNX(1) >= 1000000){
                        im.gainNX(1, -100000);
            im.teachSkill(80000336 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得秘密任務執行者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過100W樂豆點，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 8:
                        if(im.getNX(1) >= 3000000){
            im.teachSkill(80000337 ,  1, 1);
                         im.gainNX(1, -300000);
                        im.playerMessage(1, "恭喜您獲得危機守護者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過300W樂豆點，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 9:
                        if(im.getNX(1) >= 8000000){
            im.teachSkill(80000338 ,  1, 1);
                        im.gainNX(1, -800000);
                        im.playerMessage(1, "恭喜您獲得蒼空中的王牌！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過800W樂豆點，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 10:
                        if(im.getHyPay(1) >= 100){
            im.teachSkill(80000339 ,  1, 1);
                        im.addHyPay([20]);
                        im.playerMessage(1, "恭喜您獲得秘密間諜！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過100餘額，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 11:
                        if(im.getHyPay(1) >= 1000){
            im.teachSkill(80000340 ,  1, 1);
                        im.addHyPay([50]);
                        im.playerMessage(1, "恭喜您獲得孤獨粉碎者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過1000餘額，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 12:
                        if(im.getHyPay(1) >= 5000){
            im.teachSkill(80000341 ,  1, 1);
                        im.addHyPay([100]);
                        im.playerMessage(1, "恭喜您獲得敏銳神探！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過5000餘額，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 13:
                        if(im.getMeso() >= 1000000000){
            im.teachSkill(80000342 ,  1, 1);
                        im.gainMeso(-100000000);
                        im.playerMessage(1, "恭喜您獲得重力反彈者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過10E楓幣，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 14:
                        if(im.getMeso() >= 3000000000){
            im.teachSkill(80000343,  1, 1);
                        im.gainMeso(-300000000);
                        im.playerMessage(1, "恭喜您獲得黑色天國拯救者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過30E楓幣，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 15:
                        if(im.getMeso() >= 8000000000){
            im.teachSkill(80000133 ,  1, 1);
                        im.gainMeso(-800000000);
                        im.playerMessage(1, "恭喜您獲得見習獵人資格證！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你所擁有的財富未超過80E楓幣，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 16:
                        if(im.getItemQuantity(4000000) >= 1000 && im.getItemQuantity(4000016) >= 1000 && im.getItemQuantity(4000313)>= 100){
            im.teachSkill(80000134 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得B級獵人資格證！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未具有#v4000000#*1000 #v4000016#*1000 #v4000313#*100，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 17:
                        if(im.getItemQuantity(4000000) >= 3000 && im.getItemQuantity(4000016) >= 3000 && im.getItemQuantity(4000313)>= 300){
            im.teachSkill(80000135 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得A級獵人資格證！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未具有#v4000000#*3000 #v4000016#*3000 #v4000313#*300，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 18:
                        if(im.getItemQuantity(4000000) >= 8000 && im.getItemQuantity(4000016) >= 8000 && im.getItemQuantity(4000313)>= 800){
            im.teachSkill(80000136 ,  1, 1);
                        im.playerMessage(1, "恭喜您獲得S級獵人資格證！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未具有#v4000000#*8000 #v4000016#*8000 #v4000313#*800，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 19:
                        if(im.getItemQuantity(2049387) >= 1 && im.getItemQuantity(4000313)>= 10){
            im.teachSkill(80000162 ,  1, 1);
                        im.gainItem(4000313, -10);
                        im.playerMessage(1, "恭喜您獲得復仇者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未擁有一張星之力18星強化卷軸和 #v4000313#*10，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 20:
                        if(im.getItemQuantity(2049388) >= 1 && im.getItemQuantity(4000313)>= 30){
            im.teachSkill(80000161 ,  1, 1);
                        im.gainItem(4000313, -30);
                        im.playerMessage(1, "恭喜您獲得打架王！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未擁有一張星之力19星強化卷軸和 #v4000313#*30，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 21:
                        if((im.getItemQuantity(2049389) >= 1 || im.getItemQuantity(2049376) >= 1) && im.getItemQuantity(4000313)>= 80){
            im.teachSkill(80000164 ,  1, 1);
                        im.gainItem(4000313, -80);
                        im.playerMessage(1, "恭喜您獲得鬥士！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未擁有一張星之力20星強化卷軸和 #v4000313#*80，還不能學習該技能!!");
                               im.dispose();
                              }
            break;
        case 22:
                        if(im.getInventory(1).getItem(1) != null){
                        if(im.getInventory(1).getItem(1).getARC() >= 100 && im.getItemQuantity(4000313)>= 10){
            im.teachSkill(80000165 ,  1, 1);
                        im.gainItem(4000313, -10);
                        im.playerMessage(1, "恭喜您獲得最強鬥士！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未擁有一枚ARC值超過100的神秘徽章和 #v4000313#*10，還不能學習該技能!!");
                               im.dispose();
                              }
                        }
                        else {
                               im.sendOk ("#e#r請將一枚擁有ARC值的神秘徽章放至裝備欄第一格!!");
                               im.dispose();
                              }
            break;
        case 23:
                        if(im.getInventory(1).getItem(1) != null){
                        if(im.getInventory(1).getItem(1).getARC() >= 300 && im.getItemQuantity(4000313)>= 30){
            im.teachSkill(80000044 ,  1, 1);
                        im.gainItem(4000313, -30);
                        im.playerMessage(1, "恭喜您獲得動作英雄勝利者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未擁有一枚ARC值超過300的神秘徽章和 #v4000313#*30，還不能學習該技能!!");
                               im.dispose();
                              }
                        }
                        else {
                               im.sendOk ("#e#r請將一枚擁有ARC值的神秘徽章放至裝備欄第一格!!");
                               im.dispose();
                              }
            break;
        case 24:
                        if(im.getInventory(1).getItem(1) != null){
                        if(im.getInventory(1).getItem(1).getARC() >= 800 && im.getItemQuantity(4000313)>= 80){
            im.teachSkill(80000045 ,  1, 1);
                        im.gainItem(4000313, -80);
                        im.playerMessage(1, "恭喜您獲得動作英雄勝利者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未擁有一枚ARC值超過800的神秘徽章和 #v4000313#*80，還不能學習該技能!!");
                               im.dispose();
                              }
                        }
                        else {
                               im.sendOk ("#e#r請將一枚擁有ARC值的神秘徽章放至裝備欄第一格!!");
                               im.dispose();
                              }
            break;
        case 25:
                        if(im.getInventory(1).getItem(1) != null){
                        if(im.getInventory(1).getItem(1).getARC() >= 100 && im.getItemQuantity(4000313)>= 100){
            im.teachSkill(80000046 ,  1, 1);
                        im.gainItem(4000313, -100);
                        im.playerMessage(1, "恭喜您獲得動作英雄勝利者！");
                        im.worldSpouseMessage(0x01, "『成就系統』" + " : " + "玩家 " + im.getChar().getName() + " 成功學習了神秘被動技能！");
                        im.dispose();}
                        else {
                               im.sendOk ("#e#r你還未擁有一枚ARC值超過1000的神秘徽章和 #v4000313#*100，還不能學習該技能!!");
                               im.dispose();
                              }
                        }
                        else {
                               im.sendOk ("#e#r請將一枚擁有ARC值的神秘徽章放至裝備欄第一格!!");
                               im.dispose();
                              }
            break;
        case 26:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 27:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 28:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 29:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 30:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 31:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 32:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 33:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 34:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 35:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 36:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 37:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 38:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 39:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 40:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 41:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 42:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 43:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 44:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 45:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 46:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 47:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 48:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 49:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 50:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 51:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 52:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 53:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;
        case 54:
                               im.sendOk ("#e#r該技能尚未開放!!");
                               im.dispose();
                               break;

        }
    } else if (status == 2) {
        if (typed == 14) {
            im.worldSpouseMessage(0x07, "[世界]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
            im.gainMeso(-100000);
            //im.dispose();
        }
        im.dispose();
    }
}
