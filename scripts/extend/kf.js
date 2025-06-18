var status;
var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品圖標
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var icon3 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/7#";//發呆
var icon4 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/6#";//憤怒
var icon5 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/3#";//大笑
var icon6 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/1#";//大笑

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == 0) {
    cm.dispose();
    return;
    } else if (mode == 1){
    status++;
    } else {
    status--;
    }

    switch (status) {
        case 0: 
        cm.sendOk("#b#r#e"+wn1+" "+wn1+" "+wn1+" "+wn1+" "+wn1+" "+wn1+" "+wn1+" "+wn1+" "+wn1+" "+wn1+" "+wn1+"\r\n#d棉花楓之谷 #r送#b10#r萬樂豆點及#b50#r元餘額 可以購買禮包樂豆點\r\n#d客服QQ:#r3122262134  （領取餘額發遊戲名給客服）\n\r #dQQ群２：#r458569952  （群１已滿） \n\r #d官網：#b www.223mh.com  \n\r #r特色：#d本服新髮型臉型免費換市場7洞，楓幣可換樂豆點！\n\r\n\r #r"+icon5+" 本服仿官，職業技能修復比較好，歡迎大家來玩！");
            cm.dispose();
            break;
        case 1: // 請保證背包有3~4空格在領取，以免造成損失！#k\n\r #v4001839# x#r500#k #v2431724# x#r1#k #v2049116# x#r10#k #v5062024# x#r10#k #v4001715# x#r1#k(賣商店獲取1E楓幣) #b以及樂豆點20W，餘額50元！
            cm.dispose();//這是結束腳本，請按照實際情況使用
            break;
        case 2:
        case 3:
            cm.dispose();
            break;
    }
}
