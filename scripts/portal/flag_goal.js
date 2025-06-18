/* 
 * 跑旗賽
   腳本製作人：AND QQ：358122354
   歡迎咨詢制定腳本。
 */
function enter(pi) {
    var em = pi.getEventManager("PQS");
    var eim = em.getInstance("PQS");
    var map = eim.getMapInstance(932200100);
    if (em.getProperty("gate")=="0"||em.getProperty("gate")=="null"||em.getProperty("gate")==null){
        pi.sendNPCText("請檢查是否有開啟該副本，如果有，請聯繫管理員解決。",9000233);
        return;
    }else{
        if(em.getProperty("Round"+pi.getChar().getName())=="null"&&em.getProperty("gate")!="4"||em.getProperty("Round"+pi.getChar().getName())=="0"||em.getProperty("Round"+pi.getChar().getName())==null){
            em.setProperty("Round"+pi.getChar().getName(), "1");
            map.startMapEffect("玩家"+pi.getChar().getName()+"跑完第一圈！", 5121050);
            pi.playerMessage(5,"玩家"+pi.getChar().getName()+"跑完第一圈！");
            pi.playerMessage(-1,"玩家"+pi.getChar().getName()+"跑完第一圈！");
            pi.warp(932200100,16);//

        }else if(em.getProperty("Round"+pi.getChar().getName())=="1"&&em.getProperty("gate")!="4"){
            em.setProperty("Round"+pi.getChar().getName(), "2");
            pi.playerMessage(5,"玩家"+pi.getChar().getName()+"就剩最後一圈啦！大家快加油哦");
            pi.playerMessage(-1,"玩家"+pi.getChar().getName()+"就剩最後一圈啦！大家快加油哦");
            map.startMapEffect("玩家"+pi.getChar().getName()+"就剩最後一圈啦！大家快加油哦", 5121050);
            pi.warp(932200100,16);//

        }else if(em.getProperty("Round"+pi.getChar().getName())=="2"&&em.getProperty("gate")!="4"){//這裡為第三圈後的判斷
            em.setProperty("Round"+pi.getChar().getName(), "3");
            em.setProperty("rank", ""+(parseInt(em.getProperty("rank"))+1));
            var rank= em.getProperty("rank");
            pi.warp(932200100,3);//送到冠軍處
            map.startMapEffect("玩家"+pi.getChar().getName()+"跑完了！此次排第"+rank+"名", 5121050);
            pi.playerMessage(-1,"玩家"+pi.getChar().getName()+"跑完了！此次排第"+rank+"名");
            pi.playerMessage(5,"玩家"+pi.getChar().getName()+"跑完了！此次排第"+rank+"名");
            for (var i=1;i<6 ;i++ ){
                if (em.getProperty("rank"+i)=="null"||em.getProperty("rank"+i)=="0"||em.getProperty("rank"+i)==null){
                    em.setProperty("rank"+i,""+pi.getChar().getName());//創建排名
                    break;
                }
            }
            if (rank=="5"){//取前5名
                em.setProperty("gate","4");
                em.setProperty("time", "3");
                //em.schedule("overgame", 1000 * 25, eim);
                em.schedule("setup", 1000 , eim); 
                map.startMapEffect("跑旗賽活動結束啦，30秒後傳送出去。", 5121050);
            }
            return;

        }else if(em.getProperty("gate")=="4"){
            pi.playerMessage(5,"已經結束啦！");
            return;
        }

    }
    /*if(em.getProperty("Round")<2){
        em.setProperty(pi.getChar().getName(), "0");
    }else{
        var allPlayers = pi.getChannelServer().getMapFactory().getMap(932200100).getCharacters();
        for (var i=0;i<allPlayers.lenth ;i++ ){
            if(em.getProperty("reward")==""+i){
                em.setProperty("reward",""i+1);
                break;
            }
        }
    }*/
}