/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */
load("scripts/config/BossStatus.js");

function start() {
    cm.sendOk("無需多言了，你有那個能力阻止我嗎？");
}

function action(mode, type, selection) {
    var eim = cm.getEventInstance();
    if (eim != null) {
        var em = eim.getEventManager();
        if (cm.getMapId() != 807300210) {
            //載入BOSS自訂數值        
            BossStatu = Boss("Ranmaru_normal",em);
            var mob = em.getMonster(BossStatu.ID);
            mob.getStats().setHp(BossStatu.HP);
            mob.getStats().setMp(BossStatu.MP);
            mob.getStats().setPhysicalAttack(BossStatu.PAD);
            mob.getStats().setMagicAttack(BossStatu.MAD);
            mob.getStats().setPDRate(BossStatu.PDRate);
            mob.getStats().setMDRate(BossStatu.MDRate);
            mob.getStats().setLevel(BossStatu.LEVEL); 
            eim.registerMonster(mob);
            var map = eim.getMapInstance(0);
            cm.removeNpc(cm.getMapId(), 9130090);
            map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-382, 123));
            //cm.spawnMob(9421581, 1, -382, 123);
        } else {
            cm.killAllMob();
            //載入BOSS自訂數值        
            BossStatu = Boss("Ranmaru_hard",em);
            var mob = em.getMonster(BossStatu.ID);
            mob.getStats().setHp(BossStatu.HP);
            mob.getStats().setMp(BossStatu.MP);
            mob.getStats().setPhysicalAttack(BossStatu.PAD);
            mob.getStats().setMagicAttack(BossStatu.MAD);
            mob.getStats().setPDRate(BossStatu.PDRate);
            mob.getStats().setMDRate(BossStatu.MDRate);
            mob.getStats().setLevel(BossStatu.LEVEL); 
            eim.registerMonster(mob);
            var map = eim.getMapInstance(0);
            cm.removeNpc(cm.getMapId(), 9130090);
            map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-382, 123));
        }
    }
    cm.dispose();

// If accepted, = summon PB + Kriston Disappear + 1 hour timer
// If deny = NoTHING HAPPEN
}
