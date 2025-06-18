var status = 0;
var aaa ="#fUI/UIWindow/Quest/icon6/7#";
var eff ="#fUI/UIWindow/Quest/icon2/7#";
var    ef ="#fUI/UIWindow2.img/Megaphone/0#";
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
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，想傳送到什麼地方(每次20W):\r\n";
        selStr += "#L0##b[普通/進階]殘暴炎魔任務#l\r\n"
        selStr += "#L1##b[普通/進階]闇黑龍王#l\r\n"
        selStr += "#L2##b[普通]拉圖斯#l\r\n"
        //selStr += "#L8##b[普通]暴力熊/心疤獅子#l\r\n"
        selStr += "#L3##b[普通]班雷昂*獅子王#l\r\n"
        selStr += "#L4##b[普通/混沌]時間寵物—皮卡啾#l\r\n"
        selStr += "#L6##b[騎士團]女皇 - 西格諾斯的庭院#l\r\n"
        selStr += "#L7##b[普通]次元縫隙-阿卡伊農祭壇#l\r\n"
        selStr += "#L15##r[巨大樹根]魯塔比斯 - 四大天王BOSS#l\r\n"        
        //selStr += "#L16##r[泰坦級]三核培羅德#l\r\n"
        //selStr += "#L17##r[普通]暴君梅格耐斯#l\r\n"
        selStr += "#L18##r[泰坦級]強化的鑽機,弱者勿進（New~）#l\r\n"
        //selStr += "#L24##b克雷塞爾#l\r\n"        
    
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(211042200);
                cm.sendOk("2線挑戰普通殘暴炎魔\r\n3線挑戰進階殘暴炎魔.請你注意!\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 1:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(240040600);
                cm.sendOk("你已經到達目的地.(挑戰闇黑龍王需要到商場購買入場卷哦!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 2:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(220080000);
                cm.sendOk("你已經到達目的地.(挑戰鬧鐘需要到雜貨商店購買D片哦!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 15:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(105200000);
                cm.sendOk("你已經到達目的地.(超級裝備出處!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 3:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(211070000);
                cm.sendOk("你已經到達目的地.(獅子王爆高級裝備哦!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 4:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(270050000);
                cm.sendOk("你已經到達目的地.(皮卡啾爆永恆裝備和30勇士哦!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 5:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(105100100);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 7:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(272020110);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 8:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(551030100);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 9:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(802000110);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 10:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(802000210);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 11:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(802000410);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 12:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(910023000);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 6:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(271040000);
                cm.sendOk("你已經到達目的地.\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 16:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(863000100);
                cm.sendOk("你已經到達目的地.(三核培羅德爆高級飾品哦!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 17:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(401072000);
                cm.sendOk("你已經到達目的地.(暴君梅格耐斯爆高級卷軸哦!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 18:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(703020000);
                cm.sendOk("你已經到達目的地.(鑽機爆外星人幣哦.可以兌換不錯屬性的裝備!)\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 19:
            cm.dispose();
            cm.openNpc(9900002, 44);
            break;        
        case 20:
            cm.sendOk(cm.checkDrop(8800002));//殘暴炎魔
            status = -1;
            break;
        case 21:
            cm.sendOk(cm.checkDrop(8800102));//進階殘暴炎魔
            status = -1;
            break;
        case 22:
            cm.sendOk(cm.checkDrop(8810018));//黑龍
            status = -1;
            break;    
        case 23:
            cm.sendOk(cm.checkDrop(8810122));//進階黑龍
            status = -1;
            break;
        case 24:
        if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(541020700);
                cm.sendOk("你已經到達目的地\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;    
        case 25:
            cm.sendOk(cm.checkDrop(9420522));//克雷塞爾
            status = -1;
            break;    
        case 26:
            cm.sendOk(cm.checkDrop(8500002));//鬧鐘
            status = -1;
            break;
        case 27:
            cm.sendOk(cm.checkDrop(8840000));//版雷昂
            status = -1;
            break;        
        case 28:
            cm.sendOk(cm.checkDrop(8850011));//女皇
            status = -1;
            break;
        case 29:
            cm.sendOk(cm.checkDrop(8820108));//普通PB
            status = -1;
            break;        
        case 30:
            cm.sendOk(cm.checkDrop(8820108));//混沌PB
            status = -1;
            break;    
        case 31:
            cm.sendOk(cm.checkDrop(9600087));//鑽機
            status = -1;
            break;
        case 32:
            cm.sendOk(cm.checkDrop(9390600));//培羅德
            status = -1;
            break;                
        case 33:
            cm.sendOk(cm.checkDrop(8880000));//麥克裡斯
            status = -1;
            break;
        case 34:
            if (cm.getMeso() >= 200000) {
                cm.gainMeso( - 200000);
                cm.warp(272020110);
                cm.sendOk("已經到達\r\n祝你遊戲愉快!");
            } else {
                cm.sendOk("你沒有20W楓幣,我不能傳送你過去");
            }
            break;
        case 35:
            cm.sendOk(cm.checkDrop(8880000));//阿卡伊諾
            status = -1;
            break;
        case 36:
            cm.sendOk(cm.checkDrop(8920100));//血腥女皇
            status = -1;
            break;
        case 37:
            cm.sendOk(cm.checkDrop(9390306));//混沌血腥女皇
            status = -1;
            break;
        case 38:
            cm.sendOk(cm.checkDrop(8880000));//皮埃爾
            status = -1;
            break;
        case 39:
            cm.sendOk(cm.checkDrop(8880000));//混沌皮埃爾
            status = -1;
            break;
        case 40:
            cm.sendOk(cm.checkDrop(8880000));//貝倫
            status = -1;
            break;
        case 41:
            cm.sendOk(cm.checkDrop(8880000));//混沌貝倫
            status = -1;
            break;            
        }
        cm.dispose();
    }
}