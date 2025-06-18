/* RED 1st impact
    Mai
    Made by Daenerys
*/

var status = -1;

function action(mode, type, selection) {
    status++;

    if(status == 0) {
        cm.sendSimple("這裡是楓之島東北方向的#b#m1000000##k村莊…你知道楓之島是為了初心者而存在的島嶼吧？由於只會有比較弱的怪物出沒，你大可放心。");
    } else if(status == 1) {
        cm.sendSimple("如果想變成強者，就到村莊#b#m60000##k，搭乘飛行船到#b維多利亞島#k吧。比起這裡，它是個大島嶼。");
    } else {
        status = -1;
        cm.sendSimple("聽說在維多利亞島可以轉職。是#b#m102000000##k…？聽說，那裡有劍士們生活且非常荒涼的村莊。那…是個什麼樣的地方…");
        cm.dispose();
    }
}
