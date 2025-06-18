
var status = 0;
var diff;
var time;
var sel;
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

// 每個禮包所需的在線時長
//var condition = new Array(1440, 500, 500, 30, 30);


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

     var diff =  cm.getOnlineTime() - cm.getPQLog("在線時間獎勵");

        if (status == 0) {
        var selStr = "請選擇您要兌換的道具：\r\n你目前共有在線時間點數： #r" + diff + "#k #b點#n#r#e\r\n請注意，某些道具兌換以後無法交易！\r\n#n";
        selStr += "#L13##r1#b個 #v3010863# #z3010863#   #r800#b在線時間點數#l\r\n";
        selStr += "#L0##r1#b個 #v2432306# #z2432306#   #r700#b在線時間點數#l\r\n";
        selStr += "#L12##r1#b個 #v2432353# #z2432353#   #r500#b在線時間點數#l\r\n";
        selStr += "#L1##r1000#b 個#v4001839# #z4001839#   #r500#b在線時間點數#l\r\n";
        selStr += "#L2##r500#b個 #v4310036# #z4310036#   #r500#b在線時間點數#l\r\n";
        selStr += "#L3##r1#b個 #v2048300# #z2048300#   #r30#b在線時間點數#l\r\n";
        selStr += "#L4##r1#b個 #v2048301# #z2048301#   #r60#b在線時間點數#l\r\n";
        //selStr += "#L5##r1#b個 #v4001760# #z4001760#   #r300#b在線時間點數#l\r\n";
        selStr += "#L6##r1#b個 #v2614010# #z2614010#   #r90#b在線時間點數#l\r\n";
        selStr += "#L7##r1#b個 #v2614008# #z2614008#   #r180#b在線時間點數#l\r\n";
        selStr += "#L8##r1#b個 #v5000403# #z5000403#   #r1000#b在線時間點數#l\r\n";
        selStr += "#L9##r1#b個 #v5000404# #z5000404#   #r1000#b在線時間點數#l\r\n";
        selStr += "#L10##r1#b個 #v5000402# #z5000402#   #r1000#b在線時間點數#l\r\n";
       //selStr += "#L11##r1100#b 個#v2460003# #z2460003#   #r500#b在線時間點數#l\r\n";
        selStr += "#L14##r1#b個 #v1372041# #z1372041#   #r700#b在線時間點數#l\r\n";
        selStr += "#L15##r1#b個 #v1372042# #z1372042#   #r700#b在線時間點數#l\r\n";
        selStr += "#L16##r1#b個 #v1382049# #z1382049#   #r1440#b在線時間點數#l\r\n";
        selStr += "#L17##r1#b個 #v1382050# #z1382050#   #r1440#b在線時間點數#l\r\n";
        selStr += "#L18##r1#b個 #v1382051# #z1382051#   #r1440#b在線時間點數#l\r\n";
        selStr += "#L19##r1#b個 #v1382052# #z1382052#   #r1440#b在線時間點數#l\r\n";
        selStr += "#L20##r1#b個 #v1302150# #z1302150#   #r600#b在線時間點數#l\r\n";
        selStr += "#L21##r1#b個 #v1402044# #z1402044#   #r600#b在線時間點數#l\r\n";
        selStr += "#L22##r1#b個 #v1702092# #z1702092#   #r700#b在線時間點數#l\r\n";
        selStr += "#L23##r1#b個 #v1402014# #z1402014#   #r1440#b在線時間點數#l\r\n";


        
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
    if (cm.getOnlineTime() >= 700 && diff > 700) {
            cm.gainItem(2432306, 1);
            cm.setPQLog("在線時間獎勵",0,700)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間700點獎勵，給予楓之谷遊戲箱作為獎勵");
            cm.sendOk("#r - 700分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得#v2432306#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有700分鐘在線點.");
            cm.dispose();
            }
            break;
        case 1:
    if (cm.getOnlineTime() >= 500 && diff > 500) {
            cm.gainItem(4001839, 1000);
            cm.setPQLog("在線時間獎勵",0,500)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間500點獎勵，給予1000個星星作為獎勵");
            cm.sendOk("#r - 500分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1000個星星！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有500分鐘在線點.");
            cm.dispose();
            }
            break;
        case 2:
    if (cm.getOnlineTime() >= 500 && diff > 500) {
            cm.gainItem(4310036, 500);
            cm.setPQLog("在線時間獎勵",0,500)
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "  領取在線時間500點獎勵，給予500個征服者幣作為獎勵");
            cm.sendOk("#r - 500分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得500個#v4310036#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有500分鐘在線點.");
            cm.dispose();
            }
            break;
        case 3:
    if (cm.getOnlineTime() >= 30 && diff > 30) {
            cm.gainItem(2048300, 1);
            cm.setPQLog("在線時間獎勵",0,30)
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "  領取在線時間30點獎勵，給予1個銀光潛能附加印章作為獎勵");
            cm.sendOk("#r - 30分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z2048300#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有30分鐘在線點.");
            cm.dispose();
            }
            break;
        case 4:
    if (cm.getOnlineTime() >= 60 && diff > 60) {
            cm.gainItem(2048301, 1);
            cm.setPQLog("在線時間獎勵",0,60)
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "  領取在線時間60點獎勵，給予1個金光潛能附加印章作為獎勵");
            cm.sendOk("#r - 60分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z2048301#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有60分鐘在線點.");
            cm.dispose();
            }
            break;
        case 5:
    if (cm.getOnlineTime() >= 300 && diff > 300) {
            cm.gainItem(4001839, 1);
            cm.setPQLog("在線時間獎勵",0,300)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間300點獎勵，給予1個極限門票作為獎勵");
            cm.sendOk("#r - 300分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z4001760#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有300分鐘在線點.");
            cm.dispose();
            }
            break;
        case 6:
    if (cm.getOnlineTime() >= 90 && diff > 90) {
            cm.gainItem(2614010, 1);
            cm.setPQLog("在線時間獎勵",0,90)
        cm.worldSpouseMessage(0x15,"" + cm.getChar().getName() + "  領取在線時間90點獎勵，給予1個突破十萬之石 50%作為獎勵");
            cm.sendOk("#r - 90分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z2614010#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有90分鐘在線點.");
            cm.dispose();
            }
            break;
        case 7:
    if (cm.getOnlineTime() >= 180 && diff > 180) {
            cm.gainItem(2614008, 1);
            cm.setPQLog("在線時間獎勵",0,180)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間180點獎勵，給予1個突破百萬之石 30%作為獎勵");
            cm.sendOk("#r - 180分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z2614008#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有180分鐘在線點.");
            cm.dispose();
            }
            break;
        case 8:
    if (cm.getOnlineTime() >= 1000 && diff > 1000) {
           // cm.gainItem(5000403, 1);
            cm.gainPetItem(5000403, 1);  
            cm.setPQLog("在線時間獎勵",0,1000)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1000點獎勵，給予1個小士兵阿紅作為獎勵");
            cm.sendOk("#r - 1000分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z5000403#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1000分鐘在線點.");
            cm.dispose();
            }
            break;
        case 9:
    if (cm.getOnlineTime() >= 1000 && diff > 1000) {
           // cm.gainItem(5000404, 1);
          cm.gainPetItem(5000404, 1);
            cm.setPQLog("在線時間獎勵",0,1000)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1000點獎勵，給予1個小士兵阿藍作為獎勵");
            cm.sendOk("#r - 1000分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z5000404#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1000分鐘在線點.");
            cm.dispose();
            }
            break;
        case 10:
    if (cm.getOnlineTime() >= 1000 && diff > 1000) {
           cm.gainItem(5000402, 1);
            cm.setPQLog("在線時間獎勵",0,1000)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1000點獎勵，給予1個芭蕾舞女孩麗恩作為獎勵");
            cm.sendOk("#r - 1000分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得100個#z5000402#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1000分鐘在線點.");
            cm.dispose();
            }
            break;
        case 11:
    if (cm.getOnlineTime() >= 500 && diff > 500) {
           cm.gainItem(2460003, 1100);

            cm.setPQLog("在線時間獎勵",0,500)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間500點獎勵，給予1100個鑒定放大鏡(特級)作為獎勵");
            cm.sendOk("#r - 500分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1100個#z2460003#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有500分鐘在線點.");
            cm.dispose();
            }
            break;
        case 12:
    if (cm.getOnlineTime() >= 500 && diff > 500) {
           cm.gainItem(2432353, 1);
            cm.setPQLog("在線時間獎勵",0,500)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間500點獎勵，給予1個開心！轉盤箱子作為獎勵");
            cm.sendOk("#r - 500分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z2432353#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有500分鐘在線點.");
            cm.dispose();
            }
            break;
        case 13:
    if (cm.getOnlineTime() >= 800 && diff > 800) {
           cm.gainItem(3010863, 1);
            cm.setPQLog("在線時間獎勵",0,800)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間800點獎勵，給予1個憤怒的美發師椅子作為獎勵");
            cm.sendOk("#r - 800分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z3010863#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有800分鐘在線點.");
            cm.dispose();
            }
            break;
        case 14:
    if (cm.getOnlineTime() >= 700 && diff > 700) {
           cm.gainItem(1372041, 1);
            cm.setPQLog("在線時間獎勵",0,700)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間700點獎勵，給予1個寒冰之杖作為獎勵");
            cm.sendOk("#r - 700分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1372041#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有700分鐘在線點.");
            cm.dispose();
            }
            break;
        case 15:
    if (cm.getOnlineTime() >= 700 && diff > 700) {
           cm.gainItem(1372042, 1);
            cm.setPQLog("在線時間獎勵",0,700)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間700點獎勵，給予1個狂雷之杖作為獎勵");
            cm.sendOk("#r - 700分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1372042#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有700分鐘在線點.");
            cm.dispose();
            }
            break;
        case 16:
    if (cm.getOnlineTime() >= 1440 && diff > 1440) {
            cm.gainItem(1382049, 1);
            cm.setPQLog("在線時間獎勵",0,1440)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1440點獎勵，給予1個朱雀長杖作為獎勵");
            cm.sendOk("#r - 1440分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1382049#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1440分鐘在線點.");
            cm.dispose();
            }
            break;
        case 17:
    if (cm.getOnlineTime() >= 1440 && diff > 1440) {
            cm.gainItem(1382050, 1);
            cm.setPQLog("在線時間獎勵",0,1440)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1440點獎勵，給予1個玄武長杖作為獎勵");
            cm.sendOk("#r - 1440分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1382050#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1440分鐘在線點.");
            cm.dispose();
            }
            break;
        case 18:
    if (cm.getOnlineTime() >= 1440 && diff > 1440) {
            cm.gainItem(1382051, 1);
            cm.setPQLog("在線時間獎勵",0,1440)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1440點獎勵，給予1個白虎長杖作為獎勵");
            cm.sendOk("#r - 1440分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1382051#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1440分鐘在線點.");
            cm.dispose();
            }
            break;
        case 19:
    if (cm.getOnlineTime() >= 1440 && diff > 1440) {
            cm.gainItem(1382052, 1);
            cm.setPQLog("在線時間獎勵",0,1440)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1440點獎勵，給予1個青龍長杖作為獎勵");
            cm.sendOk("#r - 1440分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1382052#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1440分鐘在線點.");
            cm.dispose();
            }
            break;
        case 20:
    if (cm.getOnlineTime() >= 600 && diff > 600) {
            cm.gainItem(1302150, 1);
            cm.setPQLog("在線時間獎勵",0,600)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間600點獎勵，給予1個魔女的掃把作為獎勵");
            cm.sendOk("#r - 600分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1302150#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有600分鐘在線點.");
            cm.dispose();
            }
            break;
        case 21:
    if (cm.getOnlineTime() >= 600 && diff > 600) {
            cm.gainItem(1402044, 1);
            cm.setPQLog("在線時間獎勵",0,600)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間600點獎勵，給予1個南瓜燈籠作為獎勵");
            cm.sendOk("#r - 600分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1402044#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有600分鐘在線點.");
            cm.dispose();
            }
            break;
        case 22:
    if (cm.getOnlineTime() >= 700 && diff > 700) {
            cm.gainItem(1702092, 1);
            cm.setPQLog("在線時間獎勵",0,700)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間700點獎勵，給予1個南瓜枴杖作為獎勵");
            cm.sendOk("#r - 700分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1702092#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有700分鐘在線點.");
            cm.dispose();
            }
            break;
        case 23:
    if (cm.getOnlineTime() >= 1440 && diff > 1440) {
            cm.gainItem(1402014, 1);
            cm.setPQLog("在線時間獎勵",0,1440)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1440點獎勵，給予1個溫度計作為獎勵");
            cm.sendOk("#r - 1440分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1402014#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1440分鐘在線點.");
            cm.dispose();
            }
            break;
        case 24:
    if (cm.getOnlineTime() >= 1440 && diff > 1440) {
            cm.gainItem(1382050, 1);
            cm.setPQLog("在線時間獎勵",0,1440)
        cm.worldSpouseMessage(0x20,"" + cm.getChar().getName() + "  領取在線時間1440點獎勵，給予1個玄武長杖作為獎勵");
            cm.sendOk("#r - 1440分鐘獎勵 >> \r\n#d領取成功#k\r\n獲得1個#z1382050#！");
            cm.dispose();
            } else {
            cm.sendOk("你還沒有1440分鐘在線點.");
            cm.dispose();
            }
            break;


    }
    }
}