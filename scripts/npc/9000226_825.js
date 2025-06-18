
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
var aek1 = "#fItem/Pet/5000331.img/hungry/3#";//憂傷
var aek2 = "#fItem/Pet/5000331.img/cry/5#";//生氣
var aek3 = "#fItem/Pet/5000331.img/dung/2#";//蹲廁所
var aek4 = "#fItem/Pet/5000331.img/sleep/2#";//睡覺
var sw1 = "#fItem/Pet/5000415.img/hungry/3#";//憂傷
var sw2 = "#fItem/Pet/5000415.img/cry/5#";//生氣
var sw3 = "#fItem/Pet/5000415.img/dung/2#";//蹲廁所
var sw4 = "#fItem/Pet/5000415.img/sleep/2#";//睡覺
var ttt7 ="#fMap/MapHelper.img/weather/2011Xmas/6#";//
var bzd = "#fEffect/CharacterEff.img/1051366/1/0#"; //
var bzd1 = "#fEffect/CharacterEff.img/1051366/2/0#"; //

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
        var selStr = "#e#r \t  #fMap/Obj/13thFriday.img/object/hene/7/0##n#k#n#k\r\n";//""+ttt+" #e#d請選擇#k#n\r\n"+ltz43+"#r福利中心#k"+ltz43+"\r\n";//+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+"\r\n";
        //selStr += "  "+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+"\r\n";
        selStr += "#r #L0#"+bzd+"在線福利"+bzd1+"#l #L2#"+bzd+"每日道具"+bzd1+"#l#k\r\n";
        selStr += "#r #L3#"+bzd+"等級獎勵"+bzd1+"#l #L4#"+bzd+"每日門票"+bzd1+"#l#k\r\n";
        selStr += "#r #L5#"+bzd+"登入獎勵"+bzd1+"#l #L12#"+bzd+"累積里程"+bzd1+"#l#k\r\n";
        //selStr += "#r #L6#"+bzd+"賓果獎勵"+bzd1+"#l #L7#"+bzd+"每日樂豆點"+bzd1+"#l #L8#"+bzd+"簽到獎勵"+bzd1+"#l#n#k\r\n";
        //selStr += "#r\t#L11#"+wn24+""+wn24+""+wn24+" [點我]限量禮包#l#n\r\n";
        //selStr += "#r\t#L10#"+wn20+""+wn20+""+wn20+" 25星超強勳章補領#l#n\r\n"
        //selStr += "#e#r \t"+sw1+"     "+sw2+"    "+sw3+"    "+sw4+"#n#k#n#k\r\n";//"  "+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+""+hh2+"\r\n";
        //selStr += "\r\n"+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+""+eff1+"\r\n";
        //selStr += "\r\n\t\t\t#b#L9#"+ttt+" 返回上一頁#l#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0: // 在線福利
                cm.dispose();
                cm.openNpc(cm.getNpc(), "zaixianshijian5");
                break;
            case 1: // 每日簽到
                 if (cm.getPlayerStat("LVL") < 100) {
                    cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n100級以下的不能參加活動。");
                    cm.dispose();
                } else if (cm.getSpace(4) < 2) {
                    cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n簽到失敗，您的其他欄道具空間不足。");
                    cm.dispose();
                } else {
                    if (cm.getEventCount("每日簽到") == 0 && cm.getOnlineTime() > 60) {
                        cm.gainItem(2431152, 1);
                       // cm.gainItem(4310110, 1);
                        cm.gainItem(4032398, 1);
                        cm.gainPlayerPoints(jf * 1);
                        cm.setEventCount("每日簽到");
                        cm.setEventCount("總計簽到", 1);
                        cm.worldMessage(cm.getChar().getName() + "玩家成功簽到.當前簽到次數" + cm.getEventCount("總計簽到", 1));
                        cm.sendOk("#r - 每日簽到 >> \r\n\r\n- #d簽到成功#k\r\n獲得#b每日禮包#v2431152##k及100積分,收集多個可以跟我領取獎勵！");
                        cm.dispose();
                    } else {
                        cm.sendOk("#r - 每日簽到 >> #k\r\n\r\n對不起，一天只能簽到一次。\r\n或您要在線1小時以上才能簽到！");
                        cm.dispose();
                    }
                }
                        break;
            case 2: // 每日道具
                if (cm.getPlayerStat("LVL") < 100) {
                    cm.sendOk("#r - 每日福利 >> #k\r\n\r\n100級以下的不能參加活動。");
                    cm.dispose();
                } else if (cm.getSpace(4) < 3) {
                    cm.sendOk("#r - 每日福利 >> #k\r\n\r\n福利失敗，您的其他欄道具空間不足。");
                    cm.dispose();
                } else {
                    if (cm.getEventCount("每日福利10") == 0  && cm.getOnlineTime()>60) {
                        cm.gainItem(2001527, 500);
                        cm.gainItem(2001526, 500);
                        cm.setEventCount("每日福利10");
                        cm.setEventCount("總計福利10", 1);
                        cm.worldMessage(cm.getChar().getName() + "玩家成功領取福利.領取福利總次數" + cm.getEventCount("總計福利10", 1));
                        cm.sendOk("#r - 每日福利 >> \r\n#d每日福利領取成功#k\r\n獲得#v2001527# x 500  #v2001526# x 500 。");
                    } else {
                        cm.sendOk("#r - 每日福利 >> #k\r\n\r\n對不起，一天只能福利一次。\r\n或您要在線60分鐘以上時才能領取！");
                    }
                }
                        cm.dispose();
                        break;
            case 3: //  等級獎勵
                cm.dispose();
                cm.openNpc(cm.getNpc(),"dengji1001");
                break;
            case 4: //  BOSS門票
                if (cm.getPlayerStat("LVL") < 1) {
                    cm.sendOk("#r - 每日BOSS門票 >> #k\r\n\r\n180級以下的不能參加活動。");
                    cm.dispose();
                } else if (cm.getSpace(4) < 4) {
                    cm.sendOk("#r - 每日BOSS門票 >> #k\r\n\r\n福利失敗，您的其他欄道具空間不足。");
                    cm.dispose();
                } else {
                    if (cm.getPQLog("每日BOSS門票") == 0  && cm.getOnlineTime()>=5) {
                        cm.gainItem(4001017, 1);
                        cm.gainItem(4031179, 1);
                        cm.gainItem(4033981, 1);
                        cm.gainItem(4031044, 1);
                        cm.setPQLog("每日BOSS門票");
                        cm.setPQLog("總計BOSS門票", 1);
                        cm.worldMessage(cm.getChar().getName() + "玩家成功領取每日BOSS入場券.領取福利總次數" + cm.getPQLog("總計BOSS門票", 1));
                        cm.sendOk("#r - 每日BOSS入場券 >> \r\n#d每日福利領取成功#k\r\n獲得#v4001017# x2 #v4031179# x2 #v4033981# x2 #v4031044# x2");
                    } else {
                        cm.sendOk("#r - 每日BOSS門票 >> #k\r\n\r\n對不起，一天只能福利一次。\r\n或您要在線5分鐘以上時才能領取！");
                    }
                }
                        cm.dispose();
                        break;
            case 5: //  儲值獎勵
                cm.dispose();
                cm.openNpc(cm.getNpc(), 13);
                //cm.openNpc(9000300, "leijichongzhi");
                break;
            case 6: //  排位獎勵
                cm.dispose();
                cm.openNpc(cm.getNpc(), "meiridibao");
                break;
            case 7: //  每日送點
                cm.dispose();
                cm.openNpc(cm.getNpc(), "hqye1")
                break;
            case 8: //  楓幣換點
                cm.dispose();
                cm.openNpc(cm.getNpc(), "qiandao1")
                break;
            case 10: //  紋章
                cm.dispose();
                if (cm.haveItem(1190400) || cm.getSpace(1) == 0 || cm.getPlayer().hasEquipped(1190400)) {
                    cm.sendOkN("你已經擁有了#v1190400#，或者你裝備欄不足1個空格。");
                } else {
                    var toDrop = cm.getNewEquip(1190400);
                    toDrop.setStr(5); //裝備力量
                    toDrop.setDex(5); //裝備敏捷
                    toDrop.setInt(5); //裝備智力
                    toDrop.setLuk(5); //裝備運氣
                    toDrop.setMatk(1); //物理攻擊
                    toDrop.setWatk(1); //魔法攻擊
                    toDrop.setEnhance(25);
                    toDrop.setOwner("管理員送出");
                    cm.addFromDrop(toDrop);
                    cm.sendOkN("恭喜你領取了本服的超強25星紋章。");
                    cm.dispose();
                }
                break;
            case 11: //  楓幣換點
                //cm.sendOk("暫未開放。");
                cm.dispose();
                cm.openNpc(cm.getNpc(), "xianliang");
                break;
            case 12: //  累積里程
                cm.dispose();
                cm.showMileage();
                break;
        }
    }
}