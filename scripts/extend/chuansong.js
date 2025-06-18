/* Joyce
    Event NPC
*/

var status = -1;
var eff ="#fUI/UIWindow/Quest/icon6/7#";
var maps = Array(
100000000, //弓箭手村 - 弓箭手村
104000000, //維多利亞港 - 維多利亞港
910001000, //隱藏地圖 - 專業技術村莊&lt;匠人街>
240000000, //神木村 - 神木村
220000000, //玩具城 - 玩具城
251000000, //百草堂 - 百草堂
702000000, //嵩山鎮 - 嵩山鎮
801000000, //昭和村 - 昭和村
600000000, //新葉城
270000000, //時間神殿 - 三個門
700000000, //紅鸞宮
101000000, //魔法密林 - 魔法密林
102000000, //勇士部落 - 勇士部落
103000000, //廢棄都市 - 廢棄都市
105000000,//林中之城
200000000, //神秘島 - 天空之城
211000000, //神秘島 - 冰峰雪域
230000000, //水下世界 - 水下世界
701000000, ////上海外灘
260000000, //火焰之路 - 納希沙漠
261000000, //莎翁小鎮 - 瑪加提亞
702100000, //大雄寶殿
800000000, //古代神社
550000000, //馬來西亞 - 吉隆大都市 
300000000, //艾琳森林 - 阿爾泰營地
310000000, //黑色之翼領地 - 埃德爾斯坦
120000000, //諾特勒斯 - 諾特勒斯碼頭
273000000); //黃昏勇士部落 


var monstermaps = Array(
                                        Array(50000,0,"大蘑菇                                [1-10級]"),
                                        Array(101030500,0,"森林盡頭                            [20-30級]"),
                                        Array(102030400,0,"灰燼之地                            [50-60級]"), 
                                        Array(200010100,0,"三色庭院通道                        [60-70級]"), 
                                        Array(952020200,0,"冰雪峽谷1                            [70-80級]"), 
                                        Array(310060300,0,"深坑道                                [80-85級]"), 
                                        Array(261010102,0,"研究所202號                            [85-90級]"), 
                                        Array(300010000,0,"苔蘚樹叢路口                        [90-95級]"), 
                                        Array(211040300,0,"尖銳的絕壁1                            [95-100級]"), 

Array(541010010,0,"幽靈船 2                            [94-100級]"),
                                        Array(223010000,0,"滑稽車站1                            [100-110級]"), 
                                        Array(251010403,0,"紅鼻子海盜團老巢3                    [110-120級]"), 
                                        Array(252020700,0,"苦難者之屋                            [120-125級]"),
                                        Array(250010304,0,"流浪熊的地盤                        [125-128級]"),
                                        Array(211042200,0,"艱苦洞穴3                            [128-135級]"),
                                        Array(240040500,0,"龍之巢穴入口                        [135-140級]"),
                                        Array(240040520,0,"遭破壞的龍之巢穴                    [140-145級]"),
                                        Array(240040511,0,"被遺忘的龍之巢穴                    [145-150級]"),
                                        Array(240040600,0,"主巢穴山峰                            [150-155級]"),
                                        Array(270030500,0,"忘卻之路5                            [150-155級]"),
                                        Array(271000100,0,"變形的提諾之林                        [155-160級]"),
                                        Array(271030100,0,"騎士團第1區域                        [160-165級]"),
                                        Array(271030400,0,"騎士團第4區域                        [165-170級]"),
                                        Array(271030540,0,"騎士團殿堂5                            [170-180級]"),
                                        Array(273030100,0,"火巖山丘                            [180-190級]"),
                                        Array(273040300,0,"荒廢的發掘地區4                        [190-195級]"),
                                        Array(273060300,0,"劍士決戰處                            [195-200級]"),
                                        Array(273060300,0,"　")
                                        ); 

var tiaotiaomaps = Array(
                                        Array(100000202,0,"射手跳跳"),
                                        Array(220000006,0,"玩具城跳跳"),
                                        Array(280020000,0,"火山心藏Ⅰ"),
                                        Array(109040001,0,"高地第1階段"),
                                        Array(910130000,0,"忍苦樹林"),
                                        Array(109030001,0,"上樓找出口"),
                                        Array(109040001,0,"高地第1階段"),
                                        Array(910360000,0,"地鐵B1"),
                                        Array(910360100,0,"地鐵B2"),
                                        Array(910360200,0,"地鐵B3")
                                        ); 

var bossmaps = Array( 
100020401,//殭屍蘑菇的巢穴
100020301,//藍蘑菇王的巢穴
100020101,//蘑菇王的巢穴  
230040420,//皮亞奴斯洞穴
220080000,//時間塔的本源
240020402,//噴火龍棲息地
240020102,//格瑞芬的森林   
551030100,//陰森世界
240040700,//闇黑龍王棲息地
702070400);//藏經主場

var selectedMap = -1;
var selectedArea = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2 || status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        //cm.sendSimple("#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#您好 #r#h ##k 請選擇您要傳送的項目:\r\n#L0##b" + eff + "城鎮傳送#b#l\r\n#L1#" + eff + "練級傳送#b#l\r\n#L8#" + eff + "#r跳跳地圖#b#l\r\n#L5#" + eff + "美洲豹棲息地#b#l\r\n#L18#" + eff + "進入公會中心(創建公會)#b#l");
        cm.sendSimple("#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#您好 #r#h ##k 請選擇您要傳送的項目:\r\n#L0#" + eff + "#r萬能地圖傳送#r#l\r\n\r\n#L1#" + eff + "BOSS傳送#r#l\r\n\r\n#L5#" + eff + "副本傳送(新)#b#l\r\n\r\n#L10#" + eff + "進入公會中心(創建公會)#b#l\r\n\r\n#L100#" + eff + "亂入BOSS組隊副本 #rNew#b#l");
        } else if (status == 1) {
    var selStr = "請選擇您的目的地: #b";
        if (selection == 0) {
                cm.dispose();
                cm.openNpc(9010022,"worldwarp");
                return;            
        } else if (selection == 1) {
                cm.dispose();
                cm.openNpc(9010022,"BOSSwarp");
                return;
        } else if (selection == 5) {
                cm.dispose();
                cm.openNpc(9010022,"zuduirenwu");
                return;
    } else if (selection == 10) {
            cm.warp(200000301,0);
            cm.dispose();
            return;
    } else if (selection == 100) {
            cm.warp(910340700,0);
            cm.dispose();
            return;
    } else if (selection == 4) {
        for (var i = 0; i < bossmaps.length; i++) {
                    selStr += "\r\n#L" + i + "##m" + bossmaps[i] + "# #l";
                }               
  } else if (selection == 8) {
        for (var i = 0; i < tiaotiaomaps.length; i++) {
                selStr += "\r\n#L" + i + "#" + tiaotiaomaps[i][2] + "";
                    }   
    } else if (selection == 18) {
            //cm.warp(931000500,0);
            //cm.dispose();
            //return;
            if (cm.getJob() == 3300 || cm.getJob() == 3310 || cm.getJob() == 3311 || cm.getJob() == 3312) {
            cm.warp(931000500,0);
            cm.dispose();
            return
            } else {
            cm.sendOk("你不是豹弩職業.我不能為你傳送");
            cm.dispose();
            return;
            }
        } else {
                       for (var i = 0; i < monstermaps.length; i++) {
                selStr += "\r\n#L" + i + "#" + monstermaps[i][2] + "";
                       }
    } 
        selectedArea = selection;
        cm.sendSimple(selStr);
    } else if (status == 2) {
        //cm.sendYesNo("看來這裡的事情都已經處理完了啊。您真的要移動到 #m" + (selectedArea == 0 ? maps[selection] : monstermaps[selection]) + "# 嗎？");
    cm.sendYesNo("看來這裡的事情都已經處理完了啊。您真的要移動嗎？");
        selectedMap = selection;
    } else if (status == 3) {
        if (selectedMap >= 0) {
        if(selectedArea == 0){
            cm.warp(maps[selectedMap],0);
        }else if(selectedArea == 4){
            cm.warp(bossmaps[selectedMap],0);
        }else if(selectedArea == 8){
            cm.warp(tiaotiaomaps[selectedMap][0],0);
        }else{
            cm.warp(monstermaps[selectedMap][0],0);
        }
            //cm.warp(selectedArea == 0 ? maps[selectedMap] : monstermaps[selectedMap], 0);
        }
        cm.dispose();
    } else if (status == 6) {
        
    }
}