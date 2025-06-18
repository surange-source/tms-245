/*      
 *  
 *  功能：新手引導相關
 *  
 */
var status = 0;

function action(mode, type, selection) {
    if (status == 0) {
        cm.sendNextS("好像可以通過那個縫隙到外面去，不過有鐵鏈擋著。嘗試打斷鐵鏈吧。", 17);
        status++;
    } else {
        status = 0;
        cm.TutInstructionalBalloon("UI/tutorial.img/22");
        cm.dispose();
    }
}
