/*
 * 菜菜製作 奇幻楓之谷工作室所有
 * 修改人：AND 3812049
 * 歡迎定制各種腳本
 * OX問答副本  問題顯示NPC
 */
var status = 0;


function start() {
    cm.warp(910000000,0);
    cm.sendOk("恭喜你完成了我的考驗，贈送您#i2432971 # #t2432971# 2個!");
    cm.gainItem(2432971,2);
    cm.spouseMessage(0x25, "[OX賓果活動] 恭喜 "+cm.getPlayer().getName()+" 玩家從OX賓果活動獲取了 夏季限量椅子箱 2個！");
    cm.dispose();
}
