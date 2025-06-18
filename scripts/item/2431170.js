function start() {
    var need = im.getExpNeededForLevel(im.player.level)
    var gain = need / 2
    im.dropMessage(5, im.player.level + ":" + need)

    im.player.gainExp(gain, false, false, false)
    im.used()
    im.dispose()
}

