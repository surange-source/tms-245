/*
 *
 * 阿卡伊農
 */
function start() {
    cm.sendOk("把我精心安排的計劃化為泡影的傢伙們竟然會自己找上門來，就別提我有多麼高興了。\n\r\n\r 你們要為此付出代價！");
}

function action(mode, type, selection) {
    cm.killAllMob();
    cm.getPlayer().getMap().hideNpc(9390417);
    cm.spawnMob(8860000, 1, 0, -181);
    cm.dispose();

    // If accepted, = summon PB + Kriston Disappear + 1 hour timer
    // If deny = NoTHING HAPPEN
}
