/*
 Zakum Altar - Summons Zakum.
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.殘暴炎魔;

function act() {
    var config = EventConfig;
    if (rm.getReactor() == null || rm.getReactor().getMap() == null || config == null || config.Monsters == null || config.Monsters[rm.getReactor().getMap().getId()] == null) {
        return;
    }
    var map = rm.getReactor().getMap();
    rm.changeMusic("Bgm06/FinalFight");
    for each(monsterStatus in config.Monsters[map.getId()]) {
        var mob = getMonster(monsterStatus, rm);
        mob.disableSpawnRevives();
        if (mob != null) {
            if (map.getEvent() != null) {
                map.getEvent().registerMonster(mob);
            }
            map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
        }
    }
    rm.mapMessage("藉著母礦的力量來召喚出殘暴炎魔。");
    if (!rm.getPlayer().isGm()) {
        rm.getMap().startSpeedRun();
    }
}
