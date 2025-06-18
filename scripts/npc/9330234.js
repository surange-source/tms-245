/*      

 NPC類型:    裝備回收、刪除

 */
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子藍
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var status = 0;
var typede = 0;
var slot = Array();
var dsa = "";
var weapen = Array();
var Resolve = Array();//分解的特定武器、給的特定材料
var RecoveryA = Array(/*Array(1003159,1000),
                      Array(1302152,1000),//獅心彎刀
                      Array(1312065,1000),//獅心勇士斧
                      Array(1322096,1000),//獅心震雷釘
                      Array(1402095,1000),//獅心戰鬥彎刀
                      Array(1412065,1000),//獅心戰鬥斧
                      Array(1422066,1000),//獅心巨錘
                      Array(1432086,1000),//獅心長槍
                      Array(1442116,1000),//獅心矛
                      Array(1542015,1000),//獅心 獅子王丸
                      Array(1102277,1000),//鷹翼哨兵披風
                      Array(1152111,1000),//鷹翼哨兵護肩
                      Array(1003174,1000),//鷹翼哨兵便帽
                      Array(1082297,1000),//鷹翼哨兵手套
                      Array(1052316,1000),//鷹翼哨兵服
                      Array(1072487,1000),//鷹翼哨兵鞋
                      Array(1232014,1000),//獅心痛苦命運*/
                       Array(1098006, 10000),
   Array(1352807, 10000),
    Array(1353405, 10000),
    Array(1099011, 10000),
    Array(1099012, 10000),
    Array(1353105, 10000),
    Array(1342095, 10000),
    Array(1352009, 10000),
    Array(1352206, 10000),
    Array(1352216, 10000),
    Array(1352226, 10000),
    Array(1352276, 10000),
    Array(1352286, 10000),
    Array(1352296, 10000),
    Array(1352406, 10000),
    Array(1352506, 10000),
    Array(1352707, 10000),
    Array(1352815, 10000),
    Array(1352906, 10000),
    Array(1352916, 10000),
    Array(1352935, 10000),
    Array(1352945, 10000),
    Array(1352957, 10000),
    Array(1352967, 10000),
    Array(1352975, 10000),
    Array(1353005, 10000),
    Array(1352928, 10000),
    Array(1352236, 10000),
    Array(1352246, 10000),
    Array(1352256, 10000),
    Array(1352266, 10000),
    Array(1352109, 10000),
    Array(1352606, 10000),
                      Array(1582016,150000),//法弗納魔力源泉杖
                      Array(1212063,150000),//法弗納魔力源泉杖
                      Array(1222058,150000),//法弗納天使手銃
                      Array(1232057,150000),//法弗納死亡使者
                      Array(1242060,150000),//法弗納精神之刃
                      Array(1242061,150000),//法弗納精神之刃
                      Array(1302275,150000),//法弗納銀槲之劍
                      Array(1312153,150000),//法弗納雙刃切肉斧
                      Array(1322203,150000),//法弗納戈耳迪錘
                      Array(1332225,150000),//法弗納大馬士革劍
                      Array(1342082,150000),//法弗納急速之刃
                      Array(1362090,150000),//法弗納洞察手杖
                      Array(1372177,150000),//法弗納魔力奪取者
                      Array(1382208,150000),//法弗納魔冠之杖
                      Array(1402196,150000),//法弗納懺悔之劍
                      Array(1412135,150000),//法弗納戰鬥切肉斧
                      Array(1422140,150000),//法弗納閃電錘
                      Array(1432167,150000),//法弗納貫雷槍
                      Array(1442223,150000),//法弗納半月寬刃斧
                      Array(1452205,150000),//法弗納追風者
                      Array(1462193,150000),//法弗納風翼弩
                      Array(1472214,150000),//法弗納危險之手
                      Array(1482168,150000),//法弗納巨狼之爪
                      Array(1492179,150000),//法弗納左輪槍
                      Array(1522094,150000),//法弗納雙風翼弩
                      Array(1532098,150000),//法弗納榮耀炮
                      Array(1252015,150000),//法弗納北極星魔法棒
                      Array(1542063,150000),//法弗納皇刀正宗
                      Array(1552063,150000),//法弗納煌扇藍姬
                      Array(1062165,150000),//魔術師劍士短褲
                      Array(1062166,150000),//魔術師丹維奇短褲
                      Array(1062167,150000),//魔術師遊俠短褲
                      Array(1062168,150000),//魔術師刺客短褲
                      Array(1062169,150000),//魔術師流浪者短褲
                      Array(1042254,150000),//鷹眼劍士盔甲
                      Array(1042255,150000),//鷹眼丹維奇長袍
                      Array(1042256,150000),//鷹眼遊俠斗篷
                      Array(1042257,150000),//鷹眼刺客襯衣
                      Array(1042258,150000),//鷹眼流浪者外衣
                      Array(1003797,150000),//高貴劍士頭盔
                      Array(1003798,150000),//高貴流丹維奇帽
                      Array(1003799,150000),//高貴遊俠貝雷帽
                      Array(1003800,150000),//高貴刺客軟帽
                      Array(1003801,150000),//高貴流浪者帽
                      Array(1152174,200000),//埃蘇萊布斯騎士護肩
                      Array(1152176,200000),//埃蘇萊布斯法師護肩
                      Array(1152177,200000),//埃蘇萊布斯弓箭手護肩
                      Array(1152178,200000),//埃蘇萊布斯盜賊護肩
                      Array(1152179,200000),//埃蘇萊布斯海盜護肩
                      Array(1004422,200000),//埃蘇萊布斯騎士頭盔
                      Array(1004423,200000),//埃蘇萊布斯法師帽
                      Array(1004424,200000),//埃蘇萊布斯弓箭手帽
                      Array(1004425,200000),//埃蘇萊布斯盜賊帽
                      Array(1004426,200000),//埃蘇萊布斯海盜帽
                      Array(1102775,200000),//埃蘇萊布斯騎士披風
                      Array(1102794,200000),//埃蘇萊布斯魔法師披風
                      Array(1102795,200000),//埃蘇萊布斯弓箭手披風
                      Array(1102796,200000),//埃蘇萊布斯盜賊披風
                      Array(1102797,200000),//埃蘇萊布斯海盜披風
                      Array(1082636,200000),//埃蘇萊布斯騎士手套
                      Array(1082637,200000),//埃蘇萊布斯法師手套
                      Array(1082638,200000),//埃蘇萊布斯弓箭手手套
                      Array(1082639,200000),//埃蘇萊布斯盜賊手套
                      Array(1082640,200000),//埃蘇萊布斯海盜手套
                      Array(1052882,200000),//埃蘇萊布斯騎士套裝
                      Array(1052887,200000),//埃蘇萊布斯魔法師套裝
                      Array(1052888,200000),//埃蘇萊布斯弓箭手套裝
                      Array(1052889,200000),//埃蘇萊布斯盜賊套裝
                      Array(1052890,200000),//埃蘇萊布斯海盜套裝
                      Array(1073030,200000),//埃蘇萊布斯騎士鞋
                      Array(1073032,200000),//埃蘇萊布斯法師鞋
                      Array(1073033,200000),//埃蘇萊布斯弓箭手鞋
                      Array(1073034,200000),//埃蘇萊布斯盜賊鞋
                      Array(1073035,200000),//埃蘇萊布斯海盜鞋
                      Array(1212115,200000),//埃蘇萊布斯閃亮克魯
                      Array(1222109,200000),//埃蘇萊布斯靈魂射手
                      Array(1232109,200000),//埃蘇萊布斯魔劍
                      Array(1402251,200000),//埃蘇萊布斯寬大刀
                      Array(1242116,200000),//埃蘇萊布斯能量劍
                      Array(1262017,200000),//埃蘇萊布斯ESP限製器
                      Array(1302333,200000),//埃蘇萊布斯軍刀
                      Array(1312199,200000),//埃蘇萊布斯戰斧
                      Array(1322250,200000),//埃蘇萊布斯戰錘
                      Array(1332274,200000),//埃蘇萊布斯屠龍斬
                      Array(1342101,200000),//埃蘇萊布斯之刃
                      Array(1362135,200000),//埃蘇萊布斯折疊手杖
                      Array(1372222,200000),//埃蘇萊布斯短杖
                      Array(1382259,200000),//埃蘇萊布斯長杖
                      Array(1412177,200000),//埃蘇萊布斯大斧
                      Array(1422184,200000),//埃蘇萊布斯大錘
                      Array(1432214,200000),//埃蘇萊布斯穿透矛
                      Array(1442268,200000),//埃蘇萊布斯巨靈開山斧
                      Array(1452252,200000),//埃蘇萊布斯弓
                      Array(1462239,200000),//埃蘇萊布斯弩
                      Array(1472261,200000),//埃蘇萊布斯復仇鬥拳
                      Array(1482216,200000),//埃蘇萊布斯拳甲
                      Array(1492231,200000),//埃蘇萊布斯槍
                      Array(1522138,200000),//埃蘇萊布斯雙弩槍
                      Array(1532144,200000),//埃蘇萊布斯大炮
                      Array(1552110,200000),//埃蘇萊布斯扇子
                      Array(1252093,200000),//埃蘇萊布斯魔法棒
                      Array(1542108,200000),//埃蘇萊布斯太刀
                      Array(1132175,300000),//暴君赫爾梅斯腰帶
                      Array(1132176,300000),//暴君凱倫腰帶
                      Array(1132177,300000),//暴君利卡昂腰帶
                      Array(1132178,300000),//暴君阿爾泰腰帶
                      Array(1102481,300000),//暴君西亞戴斯披風
                      Array(1102482,300000),//暴君赫爾梅斯披風
                      Array(1102483,300000),//暴君凱倫披風
                      Array(1102484,300000),//暴君利卡昂披風
                      Array(1102485,300000),//暴君阿爾泰披風
                      Array(1082543,300000),//暴君西亞戴斯手套
                      Array(1082544,300000),//暴君赫爾梅斯手套
                      Array(1082545,300000),//暴君凱倫手套
                      Array(1082546,300000),//暴君利卡昂手套
                      Array(1082547,300000),//暴君阿爾泰手套
                      Array(1072743,300000),//暴君西亞戴斯靴
                      Array(1072744,300000),//暴君赫爾梅斯靴
                      Array(1072745,300000),//暴君凱倫靴
                      Array(1072746,300000),//暴君利卡昂靴
                      Array(1072747,300000)//暴君阿爾泰靴

);//回收的裝備
var MaterialC =Array(Array(4001840,70),//心願珠
                     Array(4030008,30),//俄羅斯方塊
                     Array(4030006,20),//俄羅斯方塊
                     Array(4030007,10),//俄羅斯方塊
                     Array(4009296,50)//野生植物毒液
                     );//可交易稀有度1級材料+獲得幾率(總樣本為100)

var MaterialD =Array(Array(4009295,70),//野生動物油
                     Array(4009298,50),//燃料混合物
                     Array(4001867,10)//金香蕉
                     );//可交易稀有度2級材料

var MaterialE =Array(Array(4009297,10),//海洋生物粘液
                     Array(4030002,20)//俄羅斯方塊
                     );//可交易稀有度3級材料

var MaterialA = Array(Array(4310119,0,2,140,160),//11週年紀念幣
                      Array(4310079,0,2,140,160),//10週年紀念幣
                      Array(4310196,0,2,140,160),//2016春節紀念幣
                      Array(4310158,0,5,140,160),//春節紀念幣
                      Array(4310174,0,5,140,160),//黑門幣
                      Array(4310149,0,5,140,160),//遊戲幣
                      Array(4310180,0,5,140,160),//瘋人院幣
                      Array(4310148,0,5,140,160),//星之大陸錢幣
                      Array(4310022,0,5,140,160),//櫻花節紀念幣
                      Array(4310021,0,5,130,160),//海豚島紀念幣
                      Array(4310019,0,5,100,130),//旅行者紀念幣
                      Array(4310071,0,5,100,130),//放風箏春節硬幣
                      Array(4310027,0,5,70,100)//傳說幣
);//分解後的【不可交易】材料+最低數量+最高數量+S級~X級裝備可分解獲得
var MaterialB = Array(Array(4001867),//金香蕉
                      Array(4140000),//愛情巧克力棒
                      Array(4140100),//情人節愛心巧克力
                      Array(4140101),//白色情人節鳳梨糖果
                      Array(4140102),//白色情人節草莓糖果
                      Array(4009342),//甜蜜之水
                      Array(4021043),//匠人之心
                      Array(4000038),//金盃
                      Array(4030002)
);//分解後的【可交易】材料
var MaterialF = Array(Array(4032766,3),//黑幣
                      Array(4310143,5),//BOSS幣
                      Array(4033356,3),//正義火種1
                      Array(4310020,100),//怪物公園紀念幣
                      Array(4310036,300)//征服者幣
);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            //if (cm.getChar().isGm()){
            var selStr = "\r\n#e#d"+tz+""+tz+""+tz+""+tz+""+tz+""+tz+"["+"久愛面板提升服務中心]"+tz+""+tz+""+tz+""+tz+""+tz+""+tz+""+tz+"#l#k";   //cm.getServerName()+
            selStr +="\r\n#L4#"+iconEvent+" 武器破攻#l   ";
            selStr +="#L5#"+iconEvent+" 法弗納裝備製作#l\r\n";
            //selStr +="#L6#"+iconEvent+" #r蠟筆潛能#k#l   ";
            selStr +="#L7#"+iconEvent+"#k 進化樂豆點神裝#l \r\n\r\n";
            selStr +="#L8#"+iconEvent+" 土豪#b[#z1142111#]#k屬性提升#l\r\n";
            selStr +="#L9#"+iconEvent+" 埃蘇超越(畢業裝)屬性提升#l\r\n\r\n";
            selStr += "#e#e#d"+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+"[兌換中心]"+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+""+tz1+"#n\r\n#b#k";
            //selStr += "            #L6##b>>>打開一鍵刪除界面<<<#k#l\r\n\r\n";
            selStr += "#L1#"+iconEvent+"裝備回收#k#l        ";
           // selStr += "#L2#"+iconEvent+"裝備分解#k#l\r\n";
            selStr += "#L10#"+iconEvent+"#r升級培羅德飾品#k#l\r\n";
            selStr += "#L3##r"+iconEvent+"查看說明#k#l\r\n\r\n";
            cm.sendSimple(selStr);
            //}
        } else if (selection == 1) { //裝備回收
            dsd = 100;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(1).getItem(i) != null&&!cm.isCash(cm.getInventory(1).getItem(i).getItemId()) ) {
                    avail += "#L" + cm.getInventory(1).getItem(i).getItemId() + "# #z" + cm.getInventory(1).getItem(i).getItemId() + "# #i" + cm.getInventory(1).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要回收的道具:\r\n#b" + avail);

        } else if (selection == 2) { //裝備分解
            dsd = 400;
            var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(1).getItem(i) != null&&!cm.isCash(cm.getInventory(1).getItem(i).getItemId())) {
                    avail += "#L" + cm.getInventory(1).getItem(i).getItemId() + "# #z" + cm.getInventory(1).getItem(i).getItemId() + "# #i" + cm.getInventory(1).getItem(i).getItemId() + ":##l\r\n";
                }
                slot.push(i);
            }
            cm.sendSimple(dsa + "#b請選擇需要分解的道具:\r\n#b" + avail);
        } else if (selection == 3) {
            var TXT = "       裝備回收說明\r\n\r\n";
                TXT+= "1.法弗納武器回收可獲得15W樂豆點\r\n";
                TXT+= "2.埃蘇裝備回收可獲得20W樂豆點\r\n";
                TXT+= "3.所有大於等於145裝備回收樂豆點規則如下\r\n\r\n";
                TXT+= "  -100%幾率獲得1~1W點\r\n";
                //TXT+= "  -25%幾率獲得2000~3000點\r\n";
                //TXT+= "  -15%幾率獲得3000~4000點\r\n";
                //TXT+= "  -10%幾率獲得4000~5000點\r\n\r\n";
                TXT+= "  -特定裝備不遵循以上規則(如法弗納)\r\n\r\n";
                //TXT+= "注:裝備分解系統暫時關閉.";

            cm.sendSimple(TXT);
            cm.dispose();
        } else if (selection == 4) {
            cm.dispose();
            cm.openNpc(9900003, 1000);
        } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(9900003, 24);
        } else if (selection == 6) {
            cm.dispose();
            cm.openNpc(9310144, "1001");
        } else if (selection == 7) {
            cm.dispose();
            cm.openNpc(9310144,"JJDJ");
        } else if (selection == 8) {
            if(cm.haveItem(1142111)&&cm.getPQLog("巔峰勳章打造")==0){
                cm.setPQLog("巔峰勳章打造", 0, -2);
                cm.gainItem(1142111,-1);
                var toDrop = cm.getNewEquip(1142111); // 生成一個Equip類                    
                toDrop.setStr(300); //裝備力量
                toDrop.setDex(300); //裝備敏捷
                toDrop.setInt(300); //裝備智力
                toDrop.setLuk(300); //裝備運氣
                toDrop.setMatk(300); //物理攻擊
                toDrop.setWatk(300); //魔法攻擊 
                toDrop.setOwner("巔峰TWD玩家");
                cm.addFromDrop(toDrop);
                cm.worldSpouseMessage(0x0A,""+ cm.getChar().getName() +"：我從面板提升中心打造了 全屬性300(魔攻300) "+cm.getItemName(1142111)+"大家一起恭喜我吧!");
            }else{
                cm.sendOk("提升失敗:\r\n 第一,你背包沒有#z1142111# \r\n 第二,你已經提升過了");
            }
            cm.dispose();
        } else if (selection == 9) {
            cm.dispose();
            cm.openNpc(9300011, "astisheng");
        } else if (selection == 10) {
            cm.dispose();
            cm.openNpc(9010041);
        } else if (status == 2) {//回收處
            itemss = selection;
            if (dsd == 100) {
                var NX = 0;
                var shul = cm.getPlayer().getItemQuantity(itemss);
                if (cm.getMeso() < 10000000) {
                    cm.sendOk("你沒有足夠的楓幣,刪除道具需要收取手續費1000萬楓幣。");
                } else {
                    var chance = Math.floor(Math.random() * 99);
                    if (cm.getReqLevel(itemss)>=145){
                        NX = Math.floor(Math.random() * 3000)+500;
                        /*if (chance<=79){//判斷幾率
                            NX = Math.floor(Math.random() * 2000)+1;
                        }else if(chance>79&&chance<=89){
                            NX = Math.floor(Math.random() * 1000)+2000;
                        }else if(chance>89&&chance<=94){
                            NX = Math.floor(Math.random() * 1000)+3000;
                        }else if(chance>94&&chance<=99){
                            NX = Math.floor(Math.random() * 1000)+4000;
                        }*/
                        
                    }else{
                        cm.sendOk("裝備等級不夠145");
                        cm.dispose();
                        return;    
                    }//else if (cm.getReqLevel(itemss)>=110&&cm.getReqLevel(itemss)<135){
                        //NX = Math.floor(Math.random() * 250);
                    //}
                    for (var a = 0;a<RecoveryA.length ;a++ ){
                        if(itemss==RecoveryA[a][0]){
                            NX = RecoveryA[a][1];
                        }
                    }
                    cm.gainMeso(-500000);
                    cm.gainItem(itemss, -1);
                    cm.gainNX(1,NX);
                    cm.sendOk(dsa + "我已經將您背包裡的 #i" + itemss + ":#從你的背包清理！");
                    if (NX>0){
                        cm.worldSpouseMessage(0x0D," [紫河仙人] ："+ cm.getChar().getName() +"回收裝備獲得樂豆點"+NX);
                    }
                }
              status = 1;
            }
            if (dsd == 400) {//分解處
                itemss = selection;
                for (var a = 0;a<MaterialF.length ;a++ ){
                    if(!cm.canHold(MaterialF[a][0],MaterialF[a][1])){
                        cm.sendOk("其它欄 騰出空間一下");
                        cm.dispose();
                        break;
                    }
                }
                if (cm.getReqLevel(itemss)>=145){
                    for (var i = 0;i<MaterialF.length ;i++ ){
                        var A = Math.floor(Math.random()*99)+1;
                        if(A<=40){
                            cm.gainItem(MaterialF[i][0],Math.floor(Math.random()*MaterialF[i][1]));
                            cm.playerMessage(5,"分解獲得"+cm.getItemName(MaterialF[i][0])+"  X"+MaterialF[i][1]);
                            cm.worldSpouseMessage(0x0D," [紫河仙人] ："+ cm.getChar().getName() +"分解裝備獲得材料   "+cm.getItemName(MaterialF[i][0]));
                        }
                    }
                    cm.gainItem(itemss,-1);
                    cm.dispose();
                }else{
                    cm.sendOk("裝備不符合145等級,分解不給東西哦");
                    cm.dispose();
                }
                /*var A = cm.getReqLevel(itemss);//+cm.getTotalStat(itemss);
                var B = Math.floor(Math.random()*99);//這裡為獲得的基礎概率取值
                var C = cm.getTotalStat(itemss)*0.01;//取裝備的總屬性的百分比
                var D = C+B;//取裝備總屬性的1%+B所取的百分比
                var A1 = Array();
                var A2 = Array();
                var Meso;
                if (cm.getMeso()<1000000){
                    cm.sendOk("不用拿100W辛苦費我怎麼幫你分解？");
                    cm.dispose();
                    return;
                }
                for(var i =0;i<MaterialA.length;i++){//遍歷符合裝備等級的材料塞進來
                    if ((A>=MaterialA[i][3]&&A<=MaterialA[i][4])){
                        //cm.gainItem(MaterialA[i][0],Math.floor(Math.random()*MaterialA[i][2])+MaterialA[i][1]);
                        A1.push(MaterialA[i]);// = Array(MaterialA[i][0],MaterialA[i][1],MaterialA[i][2]);//符合材料的送進來
                    }
                }
                //cm.sendOk(""+A1[0][0]);
                //cm.dispose();
                if (A1.length==0){
                    cm.sendOk("分解的裝備不符合等級");
                    cm.dispose();
                    return;
                }
                var M = Math.floor(Math.random()*A1.length);
                var M1 = Math.floor(Math.random()*A1[M][2])+A1[M][1];
                cm.gainItem(A1[M][0],M1);//給角色基礎材料
                var chance =  Math.floor(Math.random()*100)+1;//設置上面材料概率加入新數組
                if (B>=60&&A>=110){//判斷是否能獲得稀有材料的概率
                    for (var i=0;i<MaterialC.length ;i++ ){
                        if (chance <=MaterialC[i][1]){
                            A2.push(MaterialC[i]);
                        }
                    }
                    if (A2.length!=0){
                    var M2 = Math.floor(Math.random()*A2.length);
                    var M3 = Math.floor(Math.random()*5);
                    cm.gainItem(A2[M2][0],M3);//給角色基礎材料
                    cm.playerMessage(5,A2[M2][0]+"分解獲得額外1級材料"+M3);
                    }
                }else if (B>=20&&B<=30&&A>=120){
                    for (var i=0;i<MaterialD.length ;i++ ){
                        if (chance <=MaterialC[i][1]){
                            A2.push(MaterialD[i]);
                        }
                    }
                    if (A2.length!=0){
                    var M4 = Math.floor(Math.random()*A2.length);
                    var M5 = Math.floor(Math.random()*3);
                    cm.gainItem(A2[M4][0],M5);//給角色基礎材料
                    cm.playerMessage(5,A2[M4][0]+"分解獲得額外2級材料"+M5);
                    }
                }else if (B>=0&&B<=9&&A>=140){
                    for (var i=0;i<MaterialE.length ;i++ ){
                        if (chance <=MaterialC[i][1]){
                            A2.push(MaterialE[i]);
                        }
                    }
                    if (A2.length!=0){
                    var M6 = Math.floor(Math.random()*A2.length);
                    var M7 = Math.floor(Math.random()*3);
                    cm.gainItem(A2[M6][0],M7);//給角色基礎材料
                    cm.playerMessage(5,A2[M6][0]+"分解獲得額外3級材料"+M7);
                    }
                }
                //var shul = cm.getPlayer().getItemQuantity(itemss);
                cm.gainMeso(-1000000);
                cm.gainItem(itemss, -1);
                cm.sendOk(M1+"分解"+A1.length+"成功！"+M);
                cm.dispose();*/
            }
            status = -1;
        } else {
            cm.dispose();


        }
    }
}

