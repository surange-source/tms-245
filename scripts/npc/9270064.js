
/*      
 
 NPC版權:                追憶楓之谷
 NPC類型:                 綜合NPC
 製作人：故事、
 
 */
var hour;
var status = 0;
var typede = 0;


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

            var zyms = "";
            zyms = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0#\r\n#k#e主題副本內容：#b #n\r\n";
            zyms += "#L1##b主題 - 楓之高校#r (2014新)#k#l\r\n";
            zyms += "#L2##b主題 - 武陵道館#r (誰才是天下第一)#k#l\r\n";
            zyms += "#L3##b主題 - 黃金寺院#r (拯救地下村民)#k#l\r\n";
            zyms += "#L4##b主題 - 霧海幽靈船#r ()#k#l\r\n";

            cm.sendSimple(zyms);




        } else if (selection == 1) { //簽到
            cm.dispose();
            cm.warp(744000000);
            cm.sendOk("#e<追憶楓之谷-楓之高校>#n\r\n#b#h0# #k追憶楓之谷楓之高校副本更新完畢啦,你可以通過自己的努力獲得以下物品。\r\n#v1202000# #v1202001# #v1202002# #v1202003# #v1202004# #v1202023# #v1202024# #v1202025# #v1202026# #v1202027# #v1202028# #v1202029# #v1202030# #v1202031# #v1202032# #v1202033# #v1202034# #v1202035# #v1202036# #v1202037# #v1202038# #v1202039# #v1202040# #v1202041# #v1202042# #v1202087# #v1202088# #v1202092# #v1202083# #v1202084# #v1202085# #v1202086# #v1202094# #v1202095# #v1202096# #v1202097#");


        } else if (selection == 2) { //免費福利
             cm.dispose();
             cm.warp(925020000);

        } else if (selection == 3) { //免費福利
            cm.dispose();
            cm.sendOk("即將開啟。");

        } else if (selection == 4) { //免費福利
            cm.dispose();
            cm.sendOk("即將開啟。");

        } else if (selection == 5) { //免費福利
            cm.dispose();
            cm.sendOk("活動內容：\r\n\r\n每晚整點00 : 00只要上線遊戲就有機會獲得管理員贈送的禮物。#b活動地圖：1頻道自由市場#k\r\n\r\n裝備、道具、金卷、樂豆點統統都有。\r\n\r\n當然這得看你的人品,不是人人都有的哦~~");

        } else if (selection == 6) { //管理員的邀請
            cm.dispose();
            cm.sendOk("即將開啟。");




        }
    }
}
