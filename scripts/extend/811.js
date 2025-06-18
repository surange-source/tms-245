
var status = 0;

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
    var lev = 1;
    switch (cm.getPlayer().getJob()){
    case 0:
    case 1100:
    case 1200:
    case 1300:
    case 1400:
    case 1500:
    case 1110:
    case 1210:
    case 1310:
    case 1410:
    case 1510:
    case 1111:
    case 1211:
    case 1311:
    case 1411:
    case 1511:
        lev = 1;
        break;
    }
    if (cm.getPlayer().getLevel()<lev){
        cm.sendOk("對不起，轉生需要角色達到220級，騎士團和新手需要角色達到210級");
        cm.dispose();
    } else {
        cm.sendYesNo("你確認要轉職為新手嗎？" + ((getZScs(cm)>=400)?"\r\n":"") + "\r\n轉職後您的等級將為降為#r1#k級");
    }
    } else if(status == 1) {
        if (cm.getSpace(4)<1){
            cm.sendOk("請在其它欄中留1個空格");
            cm.dispose();
            return;
        }
        if (cm.itemQuantity(4031454)<1){
            cm.sendOk("需要一個#v4031454#才能轉職為新手！");//聖盃
            cm.dispose();
            return;
        }
        cm.gainItem(4031454,-1);//刪除1個聖盃
        var z = getZScs(cm);//轉生次數
        var f = getFSdj(cm);//飛昇等級
        if (getZScs(cm) < 400){
            if (cm.itemQuantity(4032515) >= 99) {//99個靈魂碎片
                //cm.gainItem(4032515,-99);//刪除99個靈魂碎片
                cm.gainItem(4032516,1);//獲得一個靈魂容器
            } else {
                //cm.gainItem(4032515,1);//獲得一個靈魂碎片
            }
            z++;//轉生次數+1
        }
        cm.getPlayer().changeJob(0);//新手職業
                cm.unequipEverything(); //脫裝備語句，需要的去掉前面的「//」
        cm.clearSkills();//刪除技能
              cm.getPlayer().level = 2;//等級1
              cm.getPlayer().exp = 0;//經驗值0
        cm.getPlayer().getStat().setInfo(50,50,50,50);
        var ap = 0;
        switch (f){
        case 0:
            ap = z * 0;
            cm.resetStats(4,4,4,4);
            break;
        case 1:
            cm.resetStats(50,50,50,50);
            ap = z * 0;
            break;
        case 2:
            cm.resetStats(100,100,100,100);
            ap = z * 0;
            break;
        case 3:
            cm.resetStats(150,150,150,150);
            ap = z * 0;
            break;
        case 4:
            cm.resetStats(200,200,200,200);
            ap = z * 0;
            break;
        }
        cm.gainAp(ap-cm.getPlayer().getRemainingAp());
        cm.fakeRelog();//刷新數據
        //var v = getVIP(cm);
        //cm.worldMessage("尊敬的" + ((v==0)?"":"VIP"+v) + "玩家 #h # 成功重生在楓之谷世界，大家為這位英雄喝彩吧);
        cm.dispose();
    }
}

//轉生次數
function getZScs(cm){
return (cm.itemQuantity(4032515) + cm.itemQuantity(4032516) * 100 + cm.itemQuantity(4032517) * 50 + cm.itemQuantity(4032518) * 100 + cm.itemQuantity(4032519) * 200 + cm.itemQuantity(4032520) * 400);
}

//飛昇等級
function getFSdj(cm){
    var f_p = 4032516;
    for (var i = 4;i >= 1;i--){
        if (cm.itemQuantity(f_p + i)!=0) return i;
    }
    return 0;
}

//獲得VIP等級
function getVIP(cm){
    var v_p = 4031331;
    for (var i = 7;i >= 1;i--){
        if (cm.itemQuantity(v_p + i)!=0) return i;
    }
    return 0;
}
