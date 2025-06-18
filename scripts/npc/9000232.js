/* 
 * 跑旗賽
   腳本製作人：AND QQ：358122354
   歡迎咨詢制定腳本。
 */
var status = 0;
var GP = Array(0,1,2,3,4,5);//這裡設置獲得公會點數第一格代表不在前5名獲得的點數，之後從第一名到第五名依次類推，如果不給就填0
var rewarditem = Array(
    /*Array(1,5062024,50),//括號裡數字依次代表[名次，道具ID，道具數量]
    Array(1,5062009,15),//說明：第幾名要獎勵幾個物品你複製粘貼一下，只要保持括號第一格數字不變
    Array(1,4310014,30),
    Array(1,4310036,150),
    Array(1,2432328,1),
    Array(2,5062024,40),//括號裡數字依次代表[名次，道具ID，道具數量]
    Array(2,5062009,15),//說明：第幾名要獎勵幾個物品你複製粘貼一下，只要保持括號第一格數字不變
    Array(2,4310014,30),
    Array(2,4310036,150),
    Array(2,2432328,1),
    Array(3,5062024,30),//括號裡數字依次代表[名次，道具ID，道具數量]
    Array(3,5062009,15),//說明：第幾名要獎勵幾個物品你複製粘貼一下，只要保持括號第一格數字不變
    Array(3,4310014,30),
    Array(3,4310036,150),
    Array(3,2432347,1),
    Array(4,5062024,20),//括號裡數字依次代表[名次，道具ID，道具數量]
    Array(4,5062009,15),//說明：第幾名要獎勵幾個物品你複製粘貼一下，只要保持括號第一格數字不變
    Array(4,4310014,30),
    Array(4,4310036,150),
    Array(5,5062024,10),//括號裡數字依次代表[名次，道具ID，道具數量]
    Array(5,5062009,15),//說明：第幾名要獎勵幾個物品你複製粘貼一下，只要保持括號第一格數字不變
    Array(5,4310014,30),
    Array(5,4310036,150),*/
    Array(1,5062009,3) //注意：最後一行括號後面不要加逗號。
);
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

    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.");
            cm.dispose();
        } 
    else if (status == 0) {
        var em = cm.getEventManager("PQS");
        var selStr = "#e           歡迎來到跑旗活動中心 \r\n";
            selStr +="#b此次活動排名:#k\r\n";
        for (var i =1;i<6 ;i++ ){
            selStr += "第 "+i+" 名玩家：#r"+em.getProperty("rank"+i)+"#k\r\n\r\n";
        }
        for (var d =1;d<6 ;d++ ){
            if (em.getProperty("rank"+d)==""+cm.getName()){
                selStr +="#r#L0#領取獎勵#l\r\n";
                break;
            }
        }
            selStr +="#r#L1#查看獎勵#l\r\n";
            selStr +="#r#L2#退出#l\r\n";
        cm.sendSimpleS(selStr,2);
    } else if (status == 1) {
        if (selection==0) {
            var em = cm.getEventManager("PQS");
            for (var b=1;b<6 ;b++ ){
                if (em.getProperty("rank"+b)==cm.getName()){
                    for (var a =0;a<rewarditem.length ; a++){
                        if (rewarditem[a][0]==b){
                            cm.gainItem(rewarditem[a][1],rewarditem[a][2]);
                        }
                    }
                    break;
                }
            }
            em.setProperty("rank"+b,"0");
            em.setProperty("Round"+cm.getName(),"0");
            cm.gainGP(GP[b]);
            cm.warp(910000000,0);
            cm.dispose();
        }
        if (selection==1) {
            var text ="\t\t              #r獎勵中心#k\r\n";
            for (var i=1;i<6 ;i++ ){
                text += "#L"+i+"#查看#r第"+i+"名#k的物品獎勵\r\n\r\n";
            }
            cm.sendSimpleS(text,2);
        }
        if (selection==2){
            var em = cm.getEventManager("PQS");
            em.setProperty("rank"+b,"0");
            em.setProperty("Round"+cm.getName(),"0");
            cm.gainGP(GP[0]);
            cm.warp(910000000,0);
            cm.dispose();
        }
    }else if(status == 2){
        var textt = "\t\t\t\t\t\t#b獎勵如下#k\r\n\r\n";
        for (var s=0;s<rewarditem.length ;s++ ){
            if(rewarditem[s][0]==selection){
                textt += "物品:#v"+rewarditem[s][1]+"# 數量：#r"+rewarditem[s][2]+"#k\r\n\r\n";
            }
        }
        cm.sendSimpleS(textt,2);
        cm.dispose();
    }
}
