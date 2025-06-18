var rewards_2 = [4001832];
function start() {
    if (im.getSpace(4) < 2) {
        im.dropMessage(1, "道具欄位不足。");
    } else if (!im.used()) {
        im.dropMessage(1, "發生未知錯誤。");
    } else {
        im.gainItem(4310020, 15 + Math.floor(Math.random() * 16));
        im.gainItem(rewards_2[Math.floor(Math.random() * rewards_2.length)], 100 + Math.floor(Math.random() * 101));
    }
    im.dispose();
}