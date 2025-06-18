try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.血腥皇后;

function act() {
    var eim = rm.getEventInstance();
    if (eim != null) {
        var em = eim.getEventManager();
        
        var map = rm.getReactor().getMap();
        for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
            var mob = getMonster(monsterStatus, rm);
            if (mob != null) {
                if (map.getEvent() != null) {
                    map.getEvent().registerMonster(mob);
                }
                map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
            }
        }    
        
    }    
}
