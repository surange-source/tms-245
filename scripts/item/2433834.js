var rewardItems = new Array(
    [2049028, 1, 0], // 純白的咒文書10%
    [2049018, 1, 7], // 純白的咒文書10%
    [2049710, 1, 7], // 稀有潛在能力卷軸50%
    [2048200, 1, 0], // 下級附加烙印的印章
    [2048201, 1, 0], // 中級附加烙印的印章
    [2049158, 1, 7], // 混沌卷軸60%
    [2049142, 1, 0], // 驚訝的混沌卷軸40%
    [2049169, 1, 7], // 樂觀的混沌卷軸30%
    [2710000, 1, 0], // 可疑的方塊
    [2049603, 1, 7], // 回真卷軸50%
    [2470013, 1, 7] // 黃金鐵鎚50%
);

function start() {
    if (im.getSpace(2) <= 0) {
        im.topMsg("道具欄不足");
        im.dispose();
        return;
    }
    if (im.used()) {
        var item = rewardItems[Math.floor(Math.random() * rewardItems.length)];
        if (item[2] > 0) {
            im.gainItemPeriod(item[0], item[1], item[2]);
        } else {
            im.gainItem(item[0], item[1]);
        }
    }
    im.dispose();
}