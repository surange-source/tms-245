var status = 0;
var eff ="#fUI/UIWindow/Quest/icon6/7#";

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#親愛的#r#h ##k您好，請您選擇您需要的功能:\r\n";
        selStr += "#L0##b全職業副手武器商店(#r100級以下#b)#l\r\n";
        selStr += "#L1##b飛鏢店(#r盜賊專區#b)#l   #L19##b子彈店(#r最下面賣#b)#l\r\n";
        //selStr += "#L3##b我要購買外星人裝備#l\r\n";        
        selStr += "#L4##b劍士裝備(#r100級以下#b)#l";
        selStr += "#L5##b法師裝備(#r100級以下#b)#l\r\n";
        selStr += "#L6##b箭手裝備(#r100級以下#b)#l";
        selStr += "#L7##b盜賊裝備(#r100級以下#b)#l\r\n";
        selStr += "#L8##b海盜裝備(#r100級以下#b)#l";
        selStr += "#L9##b幻影裝備(#r100級以下#b)#l\r\n";
        selStr += "#L10##b影武裝備(#r100級以下#b)#l";
        selStr += "#L11##b傑諾裝備(#r100級以下#b)#l\r\n";
        selStr += "#L12##b天破裝備(#r100級以下#b)#l";
        selStr += "#L13##b夜光裝備(#r100級以下#b)#l\r\n";
        selStr += "#L14##b重砲裝備(#r100級以下#b)#l";
        selStr += "#L15##b精靈裝備(#r100級以下#b)#l\r\n";
        selStr += "#L16##b惡復裝備(#r100級以下#b)#l\r\n";
        selStr += "#L17##b劍豪裝備(#r100級以下#b)#l";        
        selStr += "#L18##b陰陽師裝備(#r100級以下#b)#l\r\n\r\n";    
        selStr += "#b溫馨提示:特殊飛鏢請到廢棄藥店沖鏢哦!#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openShop(1033001);
            break;
        case 1:
            cm.dispose();
            cm.openShop(1033003);
            break;            
        case 2:
            cm.dispose();
            cm.openShop(1012123);
            break;
        case 3://外星人裝備
           /* cm.dispose();
            cm.openShop(9090000);*/
            cm.dispose();
            cm.openShop(9310117);
            break;
        case 4://劍士
            cm.dispose();
            cm.openShop(1021000);
            /*cm.dispose();
            cm.openShop(1012124);*/
            break;
        case 5://法師
            /*cm.dispose();
            cm.openShop(1012125);*/        
            cm.dispose();
            cm.openShop(1031000);
            break;
        case 6://弓手裝備
           /* cm.dispose();
            cm.sendOk("其它職業的裝備請到各個城市的裝備商店購買.\r\n高級裝備可以靠刷怪/BOSS/抽獎/活動/獲得...\r\n祝你遊戲愉快!如果有好的建議請聯繫管理員.");*/
            cm.dispose();
            cm.openShop(1011000);
            break;
        case 7://盜賊
          /*cm.dispose();
            cm.openShop(1033003);*/
           /* cm.dispose();
            cm.sendOk("全職業1-30級武器可點拍賣-新手裝備處購買.\r\n其餘100級以下裝備請到各職業所在城市購買\r\n更高級裝備可以靠刷怪/BOSS/抽獎/活動/獲得...\r\n祝你遊戲愉快!如果有好的建議請聯繫管理員.");*/
            cm.dispose();
            cm.openShop(1091000);
            break;
        case 8://海盜
            cm.dispose();
            cm.openShop(1200001);
            break;
        case 9://幻影俠盜
            /*cm.dispose();
            cm.openShop(2161010);*/        
            cm.dispose();
            cm.openShop(1001000);
            break;
        case 10://影武
           /* cm.dispose();
            cm.openShop(9310117);*/
            cm.dispose();
            cm.openShop(9120000);            
            break;
        case 11://傑諾
            /*cm.dispose();
            cm.openShop(1011101);*/
            cm.dispose();
            cm.openShop(2150001);
            break;
        case 12://天破
            /*cm.dispose();
            cm.openShop(9310111);*/
            cm.dispose();
            cm.openShop(2142912);
            break;
        case 13://夜光
            /*cm.dispose();
            cm.openShop(9000188);*/
            cm.dispose();
            cm.openShop(1400001);
            break;
        case 14://重砲
            cm.dispose();
            cm.openShop(1012124);
            break;
        case 15://精靈
            cm.dispose();
            cm.openShop(1100001);
            break;
        case 16://惡復
            cm.dispose();
            cm.openShop(1033001);
            break;
        case 17://劍豪
            cm.dispose();
            cm.openShop(11100);
            break;
        case 18://陰陽師
            cm.dispose();
            cm.openShop(21000);
            break;    
        case 19://法師
            /*cm.dispose();
            cm.openShop(1012125);*/        
            cm.dispose();
            cm.openNpc(1033001,"zidandian");
            break;        
        }
    }
}