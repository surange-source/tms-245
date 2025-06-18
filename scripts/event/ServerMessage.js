/*  
 *  
 *  功能：遊戲幫助
 *  
 */
var Message = new Array(
        "市場 」財神「 或者拍賣 」金融中心「 可以進行元寶、樂豆點、金色楓葉的相互兌換！（金色楓葉可以交易給其他玩家哦）",
        "如出現異常導致遊戲無法繼續，或者無法和NPC進行對話，請使用玩家命令：@ea 解除異常狀態",
        "目前存在bug比較多，出現掉線等問題是會有的，請見諒，如發現BUG請及時聯繫管理",
        "娛樂公益楓之谷 目前仍處於測試階段，如遇到BUG請多多包涵，及時提交給我們，我們會盡快處理");

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    setupTask = em.schedule("start", 4 * 60000);
}

function cancelSchedule() {
    setupTask.cancel(false);
}

function start() {
    scheduleNew();
    //em.broadcastYellowMsg("[WSY_Server] " + Message[Math.floor(Math.random() * Message.length)]);
}