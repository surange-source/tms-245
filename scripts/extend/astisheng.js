status = -1;
var ItemList1 = Array(
1004422,
1004423,
1004424,
1004425,
1004426,
1102775,
1102794,
1102795,
1102796,
1102797,
1073030,
1073032,
1073033,
1073034,
1073035,
1082636,
1082637,
1082638,
1082639,
1082640,
1152174,
1152176,
1152177,
1152178,
1152179,
1052882,
1052887,
1052888,
1052889,
1052890
);
var ItemList2 =Array(
1004808,
1004809,
1004810,
1004811,
1004812,
1102940,
1102941,
1102942,
1102943,
1102944,
1082695,
1082696,
1082697,
1082698,
1082699,
1053063,
1053064,
1053065,
1053066,
1053067,
1073158,
1073159,
1073160,
1073161,
1073162,
1152196,
1152197,
1152198,
1152199,
1152200
);
var ItemList = Array(
1132246,//超越證明眼飾   貝勒！！
1122267,//超越證明耳環
1032223,//超越證明吊墜
1113075//超越證明戒指

);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
       if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var avail = "";
            avail+="1、埃蘇和神秘做為本服畢業裝備之一此功能能夠在基礎屬性上再提升一定的屬性\r\n"; 
                avail+="#r注意：裝備必須為白板屬性\r\n";
                        avail+="#r注意：把要提升的埃蘇裝備放在裝備欄的第一個位置！\r\n\r\n\r\n#k";
            avail+=" #L0##b我要提升埃蘇防具！#l#k\r\n#k";
            avail+=" #L1##b我要提升最高級培羅德飾品！#l#k\r\n#k";
            avail+=" #L2##b我要提升神秘防具！#l#k\r\n#k";
            cm.sendSimple("#e這裡是畢業神裝防具屬性提升中心:\r\n\r\n#k" + avail);
    } else if(status == 1) {
        var ii = cm.getInventory(1).getItem(1);
        if(selection==0){
            var itemList  = ItemList1;
            var Str = 200;
            var Dex = 200;
            var Luk = 200;
            var Int = 200;
            var all = 200;
        }else if(selection==1){
            var itemList  = ItemList;
            var Str = 200;
            var Dex = 200;
            var Luk = 200;
            var Int = 200;
            var all = 200;
        }else{
            var itemList  = 0;
        }
            if (itemList==0){
                cm.sendOk("出錯咯,聯繫管理員");
                cm.dispose();
                return;
            }
            if(cm.getInventory(1).getItem(1) == null){
                cm.sendOk("請在裝備欄第一個位置放上裝備！");
                cm.dispose();
                return;
            }
            if (ii.getOwner()=="回憶超強玩家"){
                cm.sendOk("該道具已經提升過了!");
                cm.dispose();
                return;
            }
            var itemid = cm.getInventory(1).getItem(1).getItemId();
            var PD = false;
            for (var i = 0; i < itemList.length; i++) {
                if (itemid==itemList[i]) {
                    PD = true;
                    break;
                }
            }
            if (PD){
                if(cm.canHold(itemid,1)){
                    var STR = cm.getInventory(1).getItem(1).getStr();
                    var DEX = ii.getDex();
                    var INT = ii.getInt();
                    var LUK = ii.getLuk();
                    var WATK = ii.getWatk();//物理傷害
                    var MATK = ii.getMatk();//魔法傷害
                    var ACC = ii.getAcc();
                    var JUMP = ii.getJump();
                    var SPEED = ii.getSpeed();
                    var MDEF = ii.getMdef();
                    var WDEF = ii.getWdef();
                    var VOID = ii.getAvoid();
                    var EN = ii.getEnhance();
                    //var UP = ii.getLevel();
                    var toDrop = cm.getNewEquip(itemid); // 生成一個Equip類                    
                    toDrop.setStr(Str+STR); //裝備力量
                    toDrop.setDex(Dex+DEX); //裝備敏捷
                    toDrop.setInt(Int+INT); //裝備智力
                    toDrop.setLuk(Luk+LUK); //裝備運氣
                    toDrop.setAvoid(VOID);
                    toDrop.setWdef(WDEF);
                    toDrop.setMdef(MDEF);
                    toDrop.setAcc(ACC);
                    toDrop.setSpeed(SPEED);
                    toDrop.setJump(JUMP);
                    toDrop.setWatk(WATK);
                    toDrop.setMatk(MATK);
                    toDrop.setEnhance(EN);
                    toDrop.setUpgradeSlots(0);
                    toDrop.setOwner("TWD玩家");
                    cm.gainItem(itemid,-1);
                    cm.addFromDrop(toDrop);
                    cm.worldSpouseMessage(0x0A,""+ cm.getChar().getName() +" ：我從面板提升中心打造 全屬性"+all+" "+cm.getItemName(itemid)+"大家一起恭喜我吧!");
                    cm.gainItem(Item,-1);
                    cm.sendOk("恭喜您，獲得了#b#z"+itemid+"#");
                    cm.dispose();
            }else{
                cm.sendOk("請檢查背包有沒有位置");
                cm.dispose();
            }
        }else{
            cm.sendOk("請檢查裝備欄第一個位置是否為埃蘇防具！");
            cm.dispose();
        }
    }
}