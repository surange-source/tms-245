var rewards_3 = [2022794, 2022795, 2022796, 2022797, 2022798, 2022799];
function start() {
    if (im.getSpace(2) < 1 && im.getSpace(4) < 1) {
        im.dropMessage(1, "道具欄位不足。");
    } else if (!im.used()) {
        im.dropMessage(1, "發生未知錯誤。");
    } else {
        im.gainItem(4310020, 15 + Math.floor(Math.random() * 16));
        im.gainItem(rewards_3[Math.floor(Math.random() * rewards_3.length)], 1 + Math.floor(Math.random() * 10));
    }
    im.dispose();
}