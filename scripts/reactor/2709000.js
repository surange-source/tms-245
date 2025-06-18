/*
    Reactor:         PinkBeenPower
    Map(s):         Twilight of the gods
    Description:        Summons Pink Bean
*/

function act() {
    rm.killMob(8820010);
    if (!rm.getPlayer().isGm()) {
        rm.getMap().startSpeedRun();
    }
}
