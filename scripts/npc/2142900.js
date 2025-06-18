/*  創新型副本  
 *  組隊任務副本
 *  功能：玩家進行答題、保護MOB、跳跳、消滅BOSS
 *  作者：AND 3812049
 */
var status = -1;
var em;
var Count;
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendNext("好吧，你繼續玩吧。");
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        em = cm.getEventManager("Shower");
        if(em.getProperty("state")=="0"){
            cm.sendOk("副本沒有開啟");
            cm.dispose();
            return;
        }
        var TXT = "";
        if (cm.getMapId()==911006100&&em.getProperty("Next")=="2"){//NEXT為2證明保護長老過關
            TXT+= "#L0##r我想進入下一關#k#l\r\n";
        }else if(cm.getMapId()==911006100&&em.getProperty("Next")=="1"){//NEXT為1表示檢測保護長老是否過關
            TXT+= "#L4##r我保護成功拉！#k#l\r\n";
        }else if(cm.getMapId()==911006100&&em.getProperty("opendati")=="1"){
            cm.dispose();
            cm.openNpc(9400024,"ShowerOne");
            return;
        }else if(cm.getMapId()==922000000){
            Count = em.getProperty("JQCount");
            TXT+="目前機器零件數：#b"+Count+"#k\r\n";
            TXT+="還需要:#r"+(10-Count)+"#k 個\r\n";
            TXT+="#L2#上交機器零件！#l";
            TXT+="#L3##r我想進入下一關#k#l\r\n";
        }else if(cm.getMapId()==931050431&&em.getProperty("Next")=="2"){
            TXT+="#L5##r召喚魔王！#k#l\r\n";
        }else if(cm.getMapId()==931050431&& cm.isLeader() &&cm.getMonsterCount(cm.getMapId())==0&&em.getProperty("Next")=="3"){
            TXT+="#L6##r領取最後獎勵！#k#l\r\n";
        }
            TXT+= "#L1#我想離開這裡#l\r\n";
            cm.sendYesNo("你想做什麼？\r\n\r\n"+TXT);
    } else if (status == 1) {
        switch(selection){
            case 0://判斷是否能進玩具跳跳
                    if(!cm.isLeader()){
                        cm.sendOk("請讓隊長跟我說話");
                        cm.dispose();
                        return;
                    }
                    if(em.getProperty("Next")=="2"){
                        cm.warpParty(922000000,0);
                        cm.getMap(922000000).startMapEffect("收集10個零件並且到最右邊交給長老瞧瞧!", 5120054);
                    }else{
                        cm.sendOk("還沒過關呢，急啥急！");
                    }
                cm.dispose();
                break;

            case 1://離開
                cm.warp(911006500);
                cm.dispose();
                break;
            case 2://收集零件進行疊加
                if (cm.haveItem(4031092)){
                    var ii = cm.getItemQuantity(4031092);
                    em.setProperty("JQCount",(parseInt(em.getProperty("JQCount"))+ii)+"");
                    cm.gainItem(4031092,-ii);
                    if(parseInt(em.getProperty("JQCount"))>=10){
                        cm.showEffect(true, "quest/party/clear");
                        cm.playSound(true, "Party1/Clear");
                    }
                }else{
                    cm.showEffect(true, "quest/party/wrong_kor");
                    cm.playSound(true, "Party1/Failed");
                    cm.sendOk("沒有殺害就沒有買賣，沒有機器零件我頂你個肺！");
                    cm.dispose();
                }
                cm.dispose();
                break;
            case 3://跳跳過去最後一關
                if(!cm.isLeader()){
                        cm.sendOk("請讓隊長跟我說話");
                        cm.dispose();
                        return;
                }
                if(parseInt(em.getProperty("JQCount"))>=10){
                    cm.warpParty(931050431);
                    cm.getMap(931050431).startMapEffect("問問長老如何召喚魔王", 5120054);
                }else{
                    cm.showEffect(true, "quest/party/wrong_kor");
                    cm.playSound(true, "Party1/Failed");
                    cm.sendOk("Are you kidding me?搜集好10個機器零件再來找我，好嗎？我的官人！");
                }
                cm.dispose();
                break;
            case 4:
                if(!cm.isLeader()){
                        cm.sendOk("請讓隊長跟我說話");
                        cm.dispose();
                        return;
                    }
                if (cm.haveMonster(9402011)&&cm.getMonsterCount(cm.getMapId())==2&&parseInt(em.getProperty("Next"))==1){
                    cm.showEffect(true, "quest/party/clear");
                    cm.playSound(true, "Party1/Clear");
                    eim = em.getInstance("Shower");
                    em.schedule("Start11", 1000 * 1,eim);
                }else{
                    cm.showEffect(true, "quest/party/wrong_kor");
                    cm.playSound(true, "Party1/Failed");
                    cm.sendOk("趕緊消滅怪物保護長老");
                }
                cm.dispose();
                break;
            case 5:
                if(!cm.isLeader()){
                        cm.sendOk("請讓隊長跟我說話");
                        cm.dispose();
                        return;
                    }
                if(em.getProperty("Next")=="2"){
                    em.setProperty("Next", "3");
                    eim = em.getInstance("Shower");
                    em.schedule("Start12", 1000 * 5,eim);
                    cm.changeMusic("Bgm41/Gravity Lord Rise");
                    cm.getMap().startMapEffect("魔王將在5秒後抵達戰場,殺死魔王后隊長找長老發獎勵", 5120054);
                }else{
                    cm.sendOk("魔王已經召喚過了");
                }
                cm.dispose();
                break;
            case 6:
                if (em.getProperty("Next")=="3"&&cm.getMonsterCount(cm.getMapId())==0){
                    em.setProperty("Next", "4");
                    eim = em.getInstance("Shower");
                    em.schedule("Start13", 1000 * 3,eim);
                    cm.getMap().startMapEffect("獎勵將在3秒後出現", 5120054);
                }else{
                    cm.sendOk("失敗:\r\n1,不要重複領取\r\n2,BOSS沒消滅");
                }
                cm.dispose();
                break;
        }
    }
}
