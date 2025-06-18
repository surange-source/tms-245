function start() {
    if (im.used()) {
        var map = im.getMap();
        if (map != null) {
            var level = map.getFieldLevel();
            if (level <= 0 || Math.abs(level - im.getLevel()) > 30) {
                im.showSystemMessage("怪物的等級與角色的等級差距超過30級時無法獲得獎勵。");
            } else {
                var lvMobExp = im.getLvMobExp();
                var Exp = Math.floor(Math.random()*4000000) + 8000000;
                im.gainExp(lvMobExp.length >= level || level[level - 1] == 0 ? Math.floor(Math.random()*4000000) + 8000000 : (level[level - 1] * 10));
            }
        }
    }
    im.dispose();
}