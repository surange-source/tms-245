/*
 時間塔的本源:帕普拉斯[鬧鐘]
 */
try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.拉圖斯;

function act() {
    try {
        var eim = rm.getEventInstance();
        var em = rm.getEventManager("Populatus");
        if (eim != null && em != null) {
            em.setProperty("state", "2");
            rm.mapMessage(5, "時間裂縫已經被<裂縫碎塊>填充了");
            rm.changeMusic("Bgm09/TimeAttack");
            
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
            rm.getMap(220080000).setReactorState();
        }
    } catch (e) {
        rm.mapMessage(5, "錯誤: " + e);
    }
}
