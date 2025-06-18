function start() {
    if (im.used()) {
        var map = im.getMap();
        if (map != null) {
            var level = map.getFieldLevel();
            if (level <= 0 || Math.abs(level - im.getLevel()) > 30) {
                im.showSystemMessage("怪物的等級與角色的等級差距超過30級時無法獲得獎勵。");
            } else {
                im.showSystemMessage("道具出錯。");
            }
        }
    }
    im.dispose();
}