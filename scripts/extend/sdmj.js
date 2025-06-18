/* Joyce
    Event NPC
*/

var status = -1;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var maps = Array(
        910001000,
        931000500,
        104000000,
        100000000,
        101000000,
        102000000,
        103000000,
        120000000,
        105000000,
        200000000,
        211000000,
        550000000,
        230000000,
        222000000,
        262010000,
        220000000,
        701000000,
        250000000,
        702000000,
        260000000,
        600000000,
        703000000,
        240000000,
        261000000,
        221000000,
        251000000,
        300000000,
        270000000,
        702100000,
        800000000,
        130000000,
        310000000); 


var monstermaps = Array(
Array(50000,0,"大蘑菇（適合 1級 ~ 10級 的玩家）"), 
Array(100010100,0,"夢境小道（適合 3級 ~ 10級 的玩家）"),
Array(101020100,0,"接近鳥的地方（適合 10級 ~ 30級 的玩家）"),
Array(310040400,0,"礦石路（適合 30級 ~ 50級 的玩家）"),
//Array(101040001,0,"野豬的領地（適合 45級 ~ 60級 的玩家）"),
Array(102030400,0,"灰燼之地（適合 50級 ~ 70級 的玩家）"),
Array(105010301,0,"螞蟻洞2（適合 55級 ~ 70級 的玩家）"),
Array(551000200,0,"大紅花路2（適合 60級 ~ 80級 的玩家）"),
Array(600020300,0,"機械蜘蛛洞穴（適合 70級 ~ 80級 的玩家）"),
Array(702010000,0,"山腳（適合 80級 ~ 90級 的玩家）"),
Array(220060000,0,"扭曲的時間<1>（適合 90級 ~ 100級 的玩家）"),
Array(541010010,0,"幽靈船2（適合 100級 ~ 110級 的玩家）"),
Array(220060200,0,"扭曲的時間<3>（適合 110級 ~ 120級 的玩家）"),
Array(220060201,0,"時間異常之地（適合 120級以上 的玩家）"),
Array(240040510,0,"死龍巢穴（適合 130級以上 的玩家）"),
Array(270030100,0,"忘卻之路1（適合 140級 的玩家）"),
Array(271000100,0,"黑暗聖地（適合 150級 的玩家）"),
Array(703001200,0,"外星人佔領地A區3（適合 150級 的玩家）"),
Array(273040100,0,"荒廢的發掘地區2（適合 180級 的玩家）"),
Array(310070100,0,"機械墳墓入口 （適合 200級以上 的玩家"),
Array(310070210,0,"天際線1（適合 210級以上 的玩家"),
Array(310070300,0,"黑色天堂甲板1（適合 220級以上 的玩家"),
Array(310070330,0,"黑色天堂甲板3（適合 230級以上 的玩家"),
Array(310070480,0,"黑色天堂內部迷宮6（適合 240級以上 的玩家")                                        
                                        ); 


var bossmap = Array(
Array(220080000,0,"[普通] 挑戰拉圖斯！"),
Array(551030100,0,"[普通] 暴力熊、心疤獅王！"),
Array(541020800,0,"[世界BOSS] 新加坡 - 千年樹精王遺跡Ⅱ"),
Array(211070000,0,"[凡雷恩] 獅子王之城 - 接見室走廊"),
Array(211042300,0,"#r[普通/進階]艱苦洞穴 - 殘暴炎魔"),
Array(240040700,0,"#r[普通/進階]生命之穴 - 闇黑龍王（僅限1線)"),
Array(270050000,0,"#r[普通/混沌]時間裂縫 - 皮卡啾"),
Array(703020000,0,"#r[進階]底下鑽探機 - 強化鑽機"),
Array(272020110,0,"#r[黑暗軍團]次元裂縫 - 阿卡勒伊祭壇"),
Array(262030000,0,"#r[黑暗軍團]解放阿斯旺 - 希拉之塔"),
Array(105200000,0,"#r[巨大樹根] 魯塔比斯 - 四大天王BOSS"),
//Array(300030300,0,"[普通] 妖精女王-艾菲尼婭"),
Array(271040000,0,"#r[騎士團] 女皇 - 西格諾斯的庭院"),
Array(863000100,0,"#d[噩夢的牢籠] 心樹守護者之地 - 培羅德入口(New~)"),
Array(807300100,0,"#d[噩夢的牢籠]通往秘密祭壇的路 - 森蘭丸（New~)"),
Array(401060000,0,"[噩夢的牢籠] 暴君城堡戰場 - 暴君梅格耐斯(New~)")
                                        ); 
        
var tiaotiaomaps = Array(
//Array(100000202,0,"寵物公園（每日任務-射手跳跳）"),
//Array(220000006,0,"玩具城寵物訓練場（每日任務-玩具城跳跳）"),
Array(280020000,0,"火力心藏I （火山的心臟）"),
Array(109040001,0,"向高地<第1階段> (共4階段）"),
Array(910130000,0,"忍苦樹林 (第1階段) "),
Array(109030001,0,"上樓~上樓~<第1階段> （上樓找出口）"),
Array(910360002,0,"第一區域 （地鐵b1）"),
Array(910360102,0,"第一區域 （地鐵b2）"),
Array(910360203,0,"第一區域 （地鐵b3）")                            
                                        ); 




var yewaiguaimaps = Array(
//Array(100000202,0,"寵物公園（每日任務-射手跳跳）"),
//Array(220000006,0,"玩具城寵物訓練場（每日任務-玩具城跳跳）"),
Array(280020000,0,"火力心藏I （火山的心臟）"),
Array(109040001,0,"向高地<第1階段> (共4階段）"),
Array(910130000,0,"忍苦樹林 (第1階段) "),
Array(109030001,0,"上樓~上樓~<第1階段> （上樓找出口）"),
Array(910360002,0,"第一區域 （地鐵b1）"),
Array(910360102,0,"第一區域 （地鐵b2）"),
Array(910360203,0,"第一區域 （地鐵b3）")                            
                                        ); 

    
                                        
var bossmaps = Array( 
220080000,//"[普通] 挑戰拉圖斯！
551030100,//"[普通] 暴力熊、心疤獅王！"
541020800,//"[世界BOSS] 新加坡 - 千年樹精王遺跡Ⅱ"),
211070000,//"[凡雷恩] 獅子王之城 - 接見室走廊"),
211042300,//"[簡單/進階] 1 2線為普通殘暴炎魔、3線為進階殘暴炎魔！"),
240040700,//"[普通/進階] 3線為進階黑龍王，2和4線為普通黑龍王"),
270050000,//"[普通/混沌] 1線為普通皮卡啾，2線為混沌皮卡啾"),
703020000,//"#r[進階]底下鑽探機 - 強化鑽機"),
272020110,//"[普通] 次元縫隙-阿卡伊農祭壇"),
262030000,//"[黑暗軍團]解放阿斯旺 - 希拉之塔"),
105200000,//"#r[巨大樹根] 魯塔比斯 - 四大天王BOSS 。"),
//300030300,//"[普通] 妖精女王-艾菲尼婭"),
271040000,//"[騎士團] 女皇 - 西格諾斯的庭院"),
863000100,//"#d[噩夢的牢籠] 心樹守護者之地 - 培羅德入口(New~)"),
807300100,//"#d[森蘭丸BOSS] 通往秘密祭壇的路(New~)"),    
401060000);//"[噩夢的牢籠] 暴君城堡戰場 - 暴君梅格耐斯(New~)")


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
        cm.sendSimple("\r\n #r#e注意：只有影武職業可以領取#v1012191#!#n\r\n\r\n#L18#" + eff + "#r領取#z1012191##l");
        } else if (status == 1) {
    var selStr = "請選擇您的目的地: #b";
        if (selection == 0) {
                for (var i = 0; i < maps.length; i++) {
                    selStr += "\r\n#L" + i + "##m" + maps[i] + "# #l";
                }                
        } else if (selection == 2) {
                cm.dispose();
                cm.openNpc(9010022);
                return;
        } else if (selection == 20) {
                cm.dispose();
                cm.openNpc(9010022,"xiaogua");
                return;
        } else if (selection == 18) {
            if (cm.getJob() == 430 || cm.getJob() == 431 || cm.getJob() == 432 || cm.getJob() == 433 || cm.getJob() == 434) {
            cm.gainItem(1012191, 1);
                        cm.setPQLog("影武面巾", 1);
            cm.dispose();
            return
            } else {
            //cm.sendOk("你不是影武職業.無法領取");
                       cm.playerMessage(1, "你不是影武職業.無法領取！");
            cm.dispose();
            return;
            }
    } else if (selection == 8) {       
                       for (var i = 0; i < tiaotiaomaps.length; i++) {
                selStr += "\r\n#L" + i + "#" + tiaotiaomaps[i][2] + "";
                       }    
    } else if (selection == 4) {
        //for (var i = 0; i < bossmaps.length; i++) {
                    //selStr += "\r\n#L" + i + "##m" + bossmaps[i] + "# #l";
            //    }               
                       for (var i = 0; i < bossmap.length; i++) {
                selStr += "\r\n#L" + i + "#" + bossmap[i][2] + "";
                       }
    } else if (selection == 8) {       
                       for (var i = 0; i < tiaotiaomaps.length; i++) {
                selStr += "\r\n#L" + i + "#" + tiaotiaomaps[i][2] + "";
                       }    
 // } else if (selection == 7) {
        //for (var i = 0; i < tiaotiaomaps.length; i++) {
                //selStr += "\r\n#L" + i + "#" + tiaotiaomaps[i][2] + "";
                    //}   
    } else if (selection == 5) {
            cm.warp(100000103,0);
            cm.dispose();
            return;
    } else if (selection == 7) {
            cm.warp(200000301,0);
            cm.dispose();
            return;
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