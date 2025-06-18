/* 
 * 跑旗賽
   腳本製作人：AND QQ：358122354
   歡迎咨詢制定腳本。
 */
function enter(pi) {
    var em = pi.getEventManager("PQS");
    if (em==null){
        pi.playerMessage(5,"副本出錯，請聯繫管理員");
        return;
    }
    if (em.getProperty("gate")=="2"){
        pi.warp(932200100,16);
    }else{
        pi.playerMessage(5, "不要著急，還沒開始哦！");
        return;
    }
}