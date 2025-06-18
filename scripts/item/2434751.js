var rewards_1 = [
    4005000, 4005001, 4005002, 4005003, 4005004, 4011000, 4011001, 4011002, 4011003,
    4011004, 4011005, 4011006, 4011008, 4021000, 4021001, 4021002, 4021003, 4021004,
    4021005, 4021006, 4021007, 4021008, 4023000, 4023001, 4023002, 4023003, 4023004,
    4023005, 4023006, 4023007, 4023008, 4023009, 4023010, 4023011, 4023012, 4023013,
    4023014, 4023015, 4023016, 4023017, 4023018, 4023019, 4023020, 4023021
];
var rewards_2 = [4001832];
var rewards_3 = [2022794, 2022795, 2022796, 2022797, 2022798, 2022799];
function start() {
    if (im.getSpace(2) < 1 && im.getSpace(4) < 2) {
        im.dropMessage(1, "道具欄位不足。");
    } else if (!im.used()) {
        im.dropMessage(1, "發生未知錯誤。");
    } else {
        if (Math.floor(Math.random() * 100) <= 30) {
            im.gainItemPeriod(2450064, 1, 14);
        } else if (Math.floor(Math.random() * 100) <= 30) {
            im.gainItem(rewards_1[Math.floor(Math.random() * rewards_1.length)], 5 + Math.floor(Math.random() * 6));
        } else if (Math.floor(Math.random() * 100) <= 30) {
            im.gainItem(rewards_2[Math.floor(Math.random() * rewards_2.length)], 100 + Math.floor(Math.random() * 101));
        } else if (Math.floor(Math.random() * 100) <= 30) {
            im.gainItem(rewards_3[Math.floor(Math.random() * rewards_3.length)], 1 + Math.floor(Math.random() * 10));
        } else if (Math.floor(Math.random() * 100) <= 30) {
            im.getPlayer().gainHonor(Math.floor(Math.random() * 50) + 50);
        } else {
            im.gainMeso(100 + Math.floor(Math.random() * 100000));
        }
        im.gainItem(4310020, 15 + Math.floor(Math.random() * 16));
    }
    im.dispose();
}