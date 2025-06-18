/**
 *    神聖拯救者野外信息
 *    詢問可以使用神聖拯救者之石的地區
 */

var status = -1;
var selStr01 = "\r\n#e<石人寺院>\r\n●推薦等級#n   Lv.15 ~ Lv.29\r\n#e●位置    #n   維多利亞島 / 弓箭手村南邊\r\n#e●移動路線#n   弓箭手村>孢子山丘>哼唱小道>銀蓮花樹叢>石人寺院入口\r\n#i3800202#\r\n";
var selStr02 = "\r\n#e<摩天樓>\r\n●推薦等級#n   Lv.30 ~ Lv.34\r\n#e●位置    #n   維多利亞島 / 蘑菇之城 - 摩天樓\r\n#e●移動路線#n   弓箭手村>..>蘑菇森林小道>..>城牆中央>城牆外圍>摩天樓\r\n#i3800205#\r\n";
var selStr03 = "\r\n#e<廢都廣場>\r\n●推薦等級#n   Lv.35 ~ Lv.42\r\n#e●位置    #n   維多利亞島 / 廢都廣場 1層~8層\r\n#e●移動路線#n   廢都>地鐵售票口>..（地鐵）..>廢都廣場站>廢都廣場大廳>廢都廣場1層~8層\r\n#i3800203#\r\n";
var selStr04 = "\r\n#e<濕地>\r\n●推薦等級#n   Lv.40 ~ Lv.45\r\n#e●位置    #n   維多利亞島 / 林中之城東邊\r\n#e●移動路線#n   六岔路口>林中之城>濕地\r\n#i3800204#\r\n";
var selStr05 = "\r\n#e<龍族洞穴>\r\n●推薦等級#n   Lv.43 ~ Lv.50\r\n#e●位置    #n   維多利亞島 / 林中之城 濕地東邊\r\n#e●移動路線#n   六岔路口>林中之城>濕地>龍族洞穴\r\n#i3800218#\r\n";
var selStr06 = "\r\n#e<被詛咒的聖殿>\r\n●推薦等級#n   Lv.45 ~ Lv.50\r\n#e●位置    #n    維多利亞島 / 林中之城洞穴深處\r\n#e●移動路線#n   六岔路口>林中之城>濕地>龍族洞穴>被詛咒的聖殿\r\n#i3800219#\r\n";
var selStr07 = "\r\n#e<克裡塞>\r\n●推薦等級#n   Lv.50 ~ Lv.62\r\n#e●位置    #n   神秘島 / 冰峰雪域 / 天空之城北邊\r\n#e●移動路線#n   天空之城>天空之城公園>..（NPC：艾利遜）..>克裡塞\r\n#i3800207#\r\n";
var selStr08 = "\r\n#e<天空之城庭院>\r\n●推薦等級#n   Lv.50 ~ Lv.55\r\n#e●位置    #n   神秘島 / 冰峰雪域 / 天空之城東邊\r\n#e●移動路線#n   六岔路口>..（飛艇）..>天空之城>雲彩公園1>三色庭院的通道>三色庭院1>三色庭院2\r\n#i3800206#\r\n";
var selStr09 = "\r\n#e<烏山>\r\n●推薦等級#n   Lv.50 ~ Lv.64\r\n#e●位置    #n   神秘島 / 時間靜止之湖 / 童話村東邊\r\n#e●移動路線#n   天空之城>..（飛艇）..>玩具城>赫麗奧斯塔>童話村>烏山\r\n#i3800208#";
var selStr10 = "\r\n#e<魯斯韋爾草原>\r\n●推薦等級#n   Lv.67 ~ Lv.75\r\n#e●位置    #n   神秘島 / 時間靜止之湖 / 地球防禦本部西面\r\n#e●移動路線#n   天空之城>..（飛艇）..>玩具城>玩具塔>地球防禦本部>控制地區>魯斯韋爾草原\r\n#i3800209#\r\n";
var selStr11 = "\r\n#e<萊班礦山>\r\n●推薦等級#n   Lv.65 ~ Lv.82\r\n#e●位置    #n   埃德爾斯坦東北部巖山\r\n#e●移動路線#n   天空之城>..（飛艇）..>埃德爾斯坦>埃德爾斯坦散步路>前往礦山的路1>前往礦山的路2>萊班礦山\r\n#i3800210#\r\n";
var selStr12 = "\r\n#e<閃三之路>\r\n●推薦等級#n   Lv.71 ~ Lv.84\r\n#e●位置    #n   神秘島 / 尼哈爾沙漠 / 納希沙漠北邊\r\n#e●移動路線#n   天空之城>..（飛艇）..>納希沙漠>閃三之路（瑪加提亞方向）\r\n#i3800211#\r\n";
var selStr13 = "\r\n#e<武陵修煉場>\r\n●推薦等級#n   Lv.77 ~ Lv.83\r\n#e●位置    #n   神秘島 / 武陵道院 / 武陵東邊\r\n#e●移動路線#n   天空之城>..（飛艇）..>武陵>武陵寺院>武陵修煉場\r\n#i3800213#\r\n";
var selStr14 = "\r\n#e<卡帕萊特研究室>\r\n●推薦等級#n   Lv.79 ~ Lv.95\r\n#e●位置    #n   神秘島 / 尼哈爾沙漠 / 瑪加提亞地下\r\n#e●移動路線#n   天空之城>..（飛艇）..>納希沙漠>納希沙漠北門外>..（出租車：駱駝）..>沙哈地帶1>瑪加提亞>卡帕萊特辦公室>卡帕萊特研究室\r\n#i3800212#\r\n";
var selStr15 = "\r\n#e<紅鼻子海盜團老巢>\r\n●推薦等級#n   Lv.94 ~ Lv.112\r\n#e●位置    #n   神秘島 / 武陵道院 / 百草堂附近\r\n#e●移動路線#n   天空之城>..（飛艇）..>武陵>武陵寺院>..（出租車：鶴）..>百草堂>藥草地>桔梗谷>孤立的濕地>紅鼻子海盜團老巢\r\n#i3800214#\r\n";
var selStr16 = "\r\n#e<半人馬森林>\r\n●推薦等級#n   Lv.113 ~ Lv.121\r\n#e⒙ 困摹    #n   坷矯府酒 / 固唱福劍 / 府橇飯 巢率\r\n#e●移動路線#n   天空之城>..（飛艇）..>神木村>神木村西邊森林>米納爾森林西邊境界>怪脾氣森林>半人馬森林\r\n#i3800215#\r\n";
var selStr17 = "\r\n#e<修行者森林>\r\n●推薦等級#n   Lv.115 ~ Lv.121\r\n#e●位置    #n   次元之鏡 / 黃金寺院\r\n#e●移動路線#n   各個村莊>..（次元之鏡）..>黃金寺院>修行者森林\r\n#i3800281#\r\n";
var selStr18 = "\r\n#e<龍林>\r\n●推薦等級#n   Lv.122 ~ Lv.142\r\n#e●位置    #n   神秘島 / 米納爾森林 / 森林岔道西邊\r\n#e●移動路線#n   天空之城>..（飛艇）..>神木村>..>米納爾森林>..>森林岔道>龍林\r\n#i3800216#\r\n";
var selStr19 = "\r\n#e<追憶之路>\r\n●推薦等級#n   Lv.140 ~ Lv.150\r\n#e●位置    #n   神秘島 / 時間神殿 / 米納爾森林書院\r\n#e●移動路線#n   天空之城>..（飛艇）..>神木村>..（飛龍）..>時間神殿入口>三個門>..>追憶之路\r\n#i3800231#\r\n";
var selStr20 = "\r\n#e<後悔之路>\r\n●推薦等級#n   Lv.150 ~ Lv.160\r\n#e●位置    #n   神秘島 / 時間神殿 / 米納爾森林西邊\r\n#e●移動路線#n   天空之城>..（飛艇）..>神木村>..（飛龍）..>時間神殿入口>三個門>..>追憶之路>..>後悔之路\r\n#i3800217#\r\n";
var selStr21 = "\r\n#e<忘卻之路>\r\n●推薦等級#n   Lv.160 ~ Lv.200\r\n#e●位置    #n   神秘島 / 時間神殿 / 米納爾森林西邊\r\n#e●移動路線#n   天空之城>..（飛艇）..>神木村>..（飛龍）..>時間神殿入口>三個門>..>追憶之路>..>後悔之路..>忘卻之路\r\n#i3800280#";

function start(mode, type, selection) {
    if (status == 0 && mode == 0) {
        qm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendSimple("我正在向你指引通過打獵，可提升#b#t4001527##k指數的地區。有什麼能幫忙的嗎？\r\n#b#L0#查看符合我等級的打獵場#l\r\n#L1#查看全部打獵場#l\r\n#L2#結束對話#l");
    } else if (status == 1) {
        switch (selection) {
        case 0:
            var selStr = "按照各個等級所推薦的打獵場就是這裡了。\r\n#b按下[W]鍵後查看世界地圖。#k\r\n"; //\r\n#b（在推薦的打獵場狩獵的話，可獲得艾裡葛斯掉落的#e惡靈箱子#n。）
            if (qm.getLevel() >= 15 && qm.getLevel() <= 29) {
                selStr += selStr01;
            }
            if (qm.getLevel() >= 30 && qm.getLevel() <= 34) {
                selStr += selStr02;
            }
            if (qm.getLevel() >= 35 && qm.getLevel() <= 42) {
                selStr += selStr03;
            }
            if (qm.getLevel() >= 40 && qm.getLevel() <= 45) {
                selStr += selStr04;
            }
            if (qm.getLevel() >= 43 && qm.getLevel() <= 50) {
                selStr += selStr05;
            }
            if (qm.getLevel() >= 45 && qm.getLevel() <= 50) {
                selStr += selStr06;
            }
            if (qm.getLevel() >= 50 && qm.getLevel() <= 62) {
                selStr += selStr07;
            }
            if (qm.getLevel() >= 50 && qm.getLevel() <= 55) {
                selStr += selStr08;
            }
            if (qm.getLevel() >= 50 && qm.getLevel() <= 64) {
                selStr += selStr09;
            }
            if (qm.getLevel() >= 67 && qm.getLevel() <= 75) {
                selStr += selStr10;
            }
            if (qm.getLevel() >= 65 && qm.getLevel() <= 82) {
                selStr += selStr11;
            }
            if (qm.getLevel() >= 71 && qm.getLevel() <= 84) {
                selStr += selStr12;
            }
            if (qm.getLevel() >= 77 && qm.getLevel() <= 83) {
                selStr += selStr13;
            }
            if (qm.getLevel() >= 79 && qm.getLevel() <= 95) {
                selStr += selStr14;
            }
            if (qm.getLevel() >= 94 && qm.getLevel() <= 112) {
                selStr += selStr15;
            }
            if (qm.getLevel() >= 113 && qm.getLevel() <= 121) {
                selStr += selStr16;
            }
            if (qm.getLevel() >= 115 && qm.getLevel() <= 121) {
                selStr += selStr17;
            }
            if (qm.getLevel() >= 122 && qm.getLevel() <= 142) {
                selStr += selStr18;
            }
            if (qm.getLevel() >= 140 && qm.getLevel() <= 150) {
                selStr += selStr19;
            }
            if (qm.getLevel() >= 150 && qm.getLevel() <= 160) {
                selStr += selStr20;
            }
            if (qm.getLevel() >= 160 && qm.getLevel() <= 200) {
                selStr += selStr21;
            }
            status = -1;
            qm.sendNext(selStr);
            break;
        case 1:
            var selStr = "按照各個等級所推薦的打獵場就是這裡了。\r\n#b按下[W]鍵後查看世界地圖。#k\r\n"; 
            if (qm.getLevel() >= 0) {
                selStr += selStr01;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr02;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr03;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr04;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr05;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr06;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr07;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr08;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr09;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr10;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr11;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr12;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr13;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr14;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr15;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr16;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr17;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr18;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr19;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr20;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr21;
            }
            status = -1;
            qm.sendNext(selStr);
            break;
        case 2:
            qm.dispose();
            break;
        }
    }
}
