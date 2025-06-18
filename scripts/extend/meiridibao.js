var status = 0;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var kkk = "#fUI/CashShop.img/CSBeauty/eyeColor/Enable/1#"//"#fMap/MapHelper.img/weather/starPlanet/6#"; //"#fEffect/CharacterEff/1051296/1/0#";
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圓
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+ttt6+"//美化會員
var z1 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//"+z+"//美化
var tt = "#fEffect/ItemEff/1112811/0/0#";//音符
var xm1 ="#fEffect/SetEff.img/245/effect/28#";// 
var ba1 ="#fEffect/SetEff.img/161/effect/3#";//
var hh2 ="#fCharacter/Accessory/01012139.img/default/default#";//  
var wn24 = "#fUI/CashShop.img/CSEffect/time/0#";  //限量圖標
var wn20 = "#fUI/CashShop.img/CSEffect/hot/0#";  //人氣圖標
var sw1 = "#fItem/Pet/5000415.img/hungry/3#";//憂傷
var sw2 = "#fItem/Pet/5000415.img/cry/5#";//生氣
var sw3 = "#fItem/Pet/5000415.img/dung/2#";//蹲廁所
var sw4 = "#fItem/Pet/5000415.img/sleep/2#";//睡覺
var aek1 = "#fItem/Pet/5000331.img/hungry/3#";//憂傷
var aek2 = "#fItem/Pet/5000331.img/cry/5#";//生氣
var aek3 = "#fItem/Pet/5000331.img/dung/2#";//蹲廁所
var aek4 = "#fItem/Pet/5000331.img/sleep/2#";//睡覺
var ttt7 ="#fUI/UIWindow2.img/FadeForEvent/icon2#";
var GG1 ="#fMap/MapHelper.img/weather/starPlanet/2#"; //
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK); //獲得星期
var feng = "#v4032733#"
var jf = 100;//兌換數量
var ltz43 =  "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //

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
    else if (status == 0) { //
        var selStr = "#e#r\t  "+GG1+"Ox Bingo activity"+GG1+"#n#k#n#k\r\n\r\n";//""+ttt+" #e#d請選擇#k#n\r\n"+ltz43+"#r福利中心#k"+ltz43+"\r\n";//+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+"\r\n";
        //selStr += "  "+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+"\r\n";
        selStr += "#r#e 您當天答題正確數量為："+cm.getEventCount("當天回答問題正確數量")+"\r\n";
        selStr += "#r#e 您累計答題正確數量為："+cm.getEventCount("累計回答問題正確數量",1)+"#n\r\n";
        selStr += "#r #L7#"+ttt7+" OX賓果活動答題獎勵簡介#l\r\n";
        selStr += "#r #L0#"+ttt7+" 當天答題正確30道題(青銅級)#l\r\n";
        selStr += "#r #L1#"+ttt7+" 當天答題正確70道題(白銀級)#l\r\n";
        selStr += "#r #L2#"+ttt7+" 當天答題正確120道題(黃金級)#l#k\r\n";
        selStr += "#r #L3#"+ttt7+" 累計答題正確300道題(白金級)#l\r\n";
        selStr += "#r #L4#"+ttt7+" 累計答題正確700道題(鑽石級)#l\r\n";
        selStr += "#r #L5#"+ttt7+" 累計答題正確1200道題(大師級)#l#k\r\n";
        selStr += "#r #L6#"+ttt7+" 累計答題正確2000道題(王者級)#l#k\r\n";
        //selStr += "#r #L2#"+ttt7+" 排位獎勵#l#n#k\r\n";
        //selStr += "#e#r \t"+aek1+"  "+aek2+"  "+aek3+"  "+aek4+"#n#k#n#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0: // 在線福利
              if (cm.getEventCount("當天答題正確30道")>=1){
                cm.sendOk("您今天已經領取過了當天答題正確30道題的獎勵了。");
                cm.dispose();
             } else if (cm.getEventCount("當天回答問題正確數量")<30){
                 cm.sendOk("您今日的答題正確數量好像還達不到要求，目前你今日答題正確數量"+cm.getEventCount("當天回答問題正確數量")+"/30道。");
                 cm.dispose();
            } else if (!cm.canHold()){
            cm.sendOk("領取失敗，請在每個欄位上都留出一格空間。");
            cm.dispose();
            } else {
                cm.setEventCount("當天答題正確30道");
                cm.gainItem(4001839,100);
                cm.gainItem(2614000,1);
                cm.sendOk( "領取成功~！獲得了#v4001839#x100#v2614000#x1");
                cm.dispose();
            }
            break;
        case 1: // 每日簽到
                if (cm.getEventCount("當天答題正確70道")>=1){
                cm.sendOk("您今天已經領取過了當天答題正確70道題的獎勵了。");
                cm.dispose();
             } else if (cm.getEventCount("當天回答問題正確數量")<70){
                 cm.sendOk("您今日的答題正確數量好像還達不到要求，目前你今日答題正確數量"+cm.getEventCount("當天回答問題正確數量")+"/70道。");
                 cm.dispose();
            } else if (!cm.canHold()){
            cm.sendOk("領取失敗，請在每個欄位上都留出一格空間。");
            cm.dispose();
            } else {
                cm.setEventCount("當天答題正確70道");
                cm.gainItem(4001839,300);
                cm.gainItem(2614001,1);
                cm.sendOk( "領取成功~！獲得了#v4001839#x300#v2614001#x1");
                cm.dispose();
            }
            break;
        case 2: // 每日道具
        if (cm.getEventCount("當天答題正確120道")>=1){
                cm.sendOk("您今天已經領取過了當天答題正確120道題的獎勵了。");
                cm.dispose();
             } else if (cm.getEventCount("當天回答問題正確數量")<120){
                 cm.sendOk("您今日的答題正確數量好像還達不到要求，目前你今日答題正確數量"+cm.getEventCount("當天回答問題正確數量")+"/120道。");
                 cm.dispose();
            } else if (!cm.canHold()){
            cm.sendOk("領取失敗，請在每個欄位上都留出一格空間。");
            cm.dispose();
            } else {
                cm.setEventCount("當天答題正確120道");
                cm.gainItem(4001839,500);
                cm.gainItem(2614002,1);
                cm.sendOk( "領取成功~！獲得了#v4001839#x500#v2614002#x1");
                cm.dispose();
            }
                    break;
        case 3: // 每日簽到
                if (cm.getEventCount("累計答題正確300道",1)>=1){
                cm.sendOk("您已經領取過了累計答題正確300道題的獎勵了。");
                cm.dispose();
             } else if (cm.getEventCount("累計回答問題正確數量",1)<300){
                 cm.sendOk("您累計的答題正確數量好像還達不到要求，目前你累計答題正確數量"+cm.getEventCount("累計回答問題正確數量",1)+"/300道。");
                 cm.dispose();
            } else if (!cm.canHold()){
            cm.sendOk("領取失敗，請在每個欄位上都留出一格空間。");
            cm.dispose();
            } else {
                cm.setEventCount("累計答題正確300道",1);
                cm.gainItem(4001839,800);
                cm.gainItem(2614002,1);
                cm.sendOk( "領取成功~！獲得了#v4001839#x800#v2614002#x1");
                cm.dispose();
            }
            break;
        case 4: // 每日簽到
                if (cm.getEventCount("累計答題正確700道",1)>=1){
                cm.sendOk("您已經領取過了累計答題正確700道題的獎勵了。");
                cm.dispose();
             } else if (cm.getEventCount("累計回答問題正確數量",1)<700){
                 cm.sendOk("您累計的答題正確數量好像還達不到要求，目前你累計答題正確數量"+cm.getEventCount("累計回答問題正確數量",1)+"/700道。");
                 cm.dispose();
            } else if (!cm.canHold()){
            cm.sendOk("領取失敗，請在每個欄位上都留出一格空間。");
            cm.dispose();
            } else {
                cm.setEventCount("累計答題正確700道",1);
                cm.gainItem(4001839,1000);
                cm.gainItem(2614002,2);
                cm.sendOk( "領取成功~！獲得了#v4001839#x1000#v2614002#x2");
                cm.dispose();
            }
            break;
        case 5: // 每日簽到
                if (cm.getEventCount("累計答題正確1200道",1)>=1){
                cm.sendOk("您已經領取過了累計答題正確1200道題的獎勵了。");
                cm.dispose();
             } else if (cm.getEventCount("累計回答問題正確數量",1)<1200){
                 cm.sendOk("您累計的答題正確數量好像還達不到要求，目前你累計答題正確數量"+cm.getEventCount("累計回答問題正確數量",1)+"/1200道。");
                 cm.dispose();
            } else if (!cm.canHold()){
            cm.sendOk("領取失敗，請在每個欄位上都留出一格空間。");
            cm.dispose();
            } else {
                cm.setEventCount("累計答題正確1200道",1);
                cm.gainItem(4001839,1500);
                cm.gainItem(2614002,3);
                cm.sendOk( "領取成功~！獲得了#v4001839#x1500#v2614002#x3");
                cm.dispose();
            }
            break;
        case 6: // 每日簽到
                if (cm.getEventCount("累計答題正確2000道",1)>=1){
                cm.sendOk("您已經領取過了累計答題正確2000道題的獎勵了。");
                cm.dispose();
             } else if (cm.getEventCount("累計回答問題正確數量",1)<2000){
                 cm.sendOk("您累計的答題正確數量好像還達不到要求，目前你累計答題正確數量"+cm.getEventCount("累計回答問題正確數量",1)+"/2000道。");
                 cm.dispose();
            } else if (!cm.canHold()){
            cm.sendOk("領取失敗，請在每個欄位上都留出一格空間。");
            cm.dispose();
            } else {
                cm.setEventCount("累計答題正確2000道",1);
                cm.gainItem(4001839,3000);
                cm.gainItem(2614002,5);
                var toDrop = cm.getNewEquip(1142072); // 生成一個Equip類    
                toDrop.setStr(88); //裝備力量
                toDrop.setDex(88); //裝備敏捷
                toDrop.setInt(88); //裝備智力
                toDrop.setLuk(88); //裝備運氣
                toDrop.setWatk(88); //物理攻擊
                toDrop.setMatk(88); //魔法攻擊
                toDrop.setEnhance(30);//星之力
                cm.setLock(toDrop);
                cm.addFromDrop(toDrop);
                cm.sendOk( "領取成功~！獲得了#v4001839#x3000#v2614002#x5\r\n#v1142072##t1142072# x1 全屬性88");
                cm.dispose();
            }
            break;
        case 7: // 每日簽到
                var text = "#r#e當天答題正確"+cm.getEventCount("當天回答問題正確數量")+"/30道題(青銅級) 獎勵：#v4001839#x100#v2614000#x1\r\n";
                text += "當天答題正確"+cm.getEventCount("當天回答問題正確數量")+"/70道題(白銀級) 獎勵：#v4001839#x300#v2614001#x1\r\n";
                text += "當天答題正確"+cm.getEventCount("當天回答問題正確數量")+"/120道題(黃金級) 獎勵：#v4001839#x500#v2614002#x1\r\n";
                text += "累計答題正確"+cm.getEventCount("累計回答問題正確數量",1)+"/300道題(白金級) 獎勵：#v4001839#x800#v2614002#x1\r\n";
                text += "累計答題正確"+cm.getEventCount("累計回答問題正確數量",1)+"/700道題(鑽石級) 獎勵：#v4001839#x1000#v2614002#x2\r\n";
                text += "累計答題正確"+cm.getEventCount("累計回答問題正確數量",1)+"/1200道題(大師級) 獎勵：#v4001839#x1500#v2614002#x3\r\n";
                text += "累計答題正確"+cm.getEventCount("累計回答問題正確數量",1)+"/2000道題(王者級) 獎勵：#v4001839#x3000#v2614002#x5#v1142072#x1 全屬性88\r\n";
                cm.sendOk(text);
                cm.dispose();
            break;
            cm.dispose();
         }
    }
}