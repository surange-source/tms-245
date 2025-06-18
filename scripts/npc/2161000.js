try{load("scripts_custom/config/BossConfig.js");}catch(e){load("scripts/config/BossConfig.js");}
var EventConfig = BossEventConfigs.凡雷恩;

var status = -1;
function start() {
    cm.sendOk("你們誰來打敗我？或者你們是反黑魔法師聯盟的人？不管你是誰…沒有必要再談下去!!!!!!!\r\n\r\n#b(來吧!你們這些傻瓜!)");
}

function action(mode, type, selection) {  
    if (mode == 1 && cm.getMap().getAllMonster().size() == 0) {
        var eim = cm.getEventInstance();
        if (eim != null) {
            var em = eim.getEventManager();
            if ( cm.getMapId() == 211070100 ||cm.getMapId() == 211070101 ||cm.getMapId() == 211070110 ) {
                //普通凡雷恩
                var map = cm.getMap();
                for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
                    var mob = getMonster(monsterStatus, em);
                    if (mob != null) {
                        if (map.getEvent() != null) {
                            map.getEvent().registerMonster(mob);
                        }
                        map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
                    }
                }    
                
                cm.removeNpc(cm.getMapId(), 2161000);
                if (!cm.getPlayer().isGm()) {
                    cm.getMap().startSpeedRun();
                }
            } else if( cm.getMapId() == 211070102 ||cm.getMapId() == 211070111 ||cm.getMapId() == 211070103 ){                
                //簡單凡雷恩
                var map = cm.getMap();
                for each(monsterStatus in EventConfig.Monsters[map.getId()]) {
                    var mob = getMonster(monsterStatus, em);
                    if (mob != null) {
                        if (map.getEvent() != null) {
                            map.getEvent().registerMonster(mob);
                        }
                        map.spawnMonsterOnGroundBelow(mob, mob.getPosition());
                    }
                }    
                
                cm.removeNpc(cm.getMapId(), 2161000);
                if (!cm.getPlayer().isGm()) {
                    cm.getMap().startSpeedRun();
                }
            }
        }
    }
    cm.dispose();
}
