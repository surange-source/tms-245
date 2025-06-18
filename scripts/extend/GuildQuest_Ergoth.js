function start() {
    var em = cm.getEventManager("GuildQuest");
    var eim = cm.getEventInstance();
    cm.changeMusic("Bgm10/Eregos");
    var mobid = 9300028;//BOSS
    var mob = cm.getMonster(mobid);
    cm.guildMessage("恐怖的黑暗力量出現了。");
    mob.getStats().setHp(5000000000);
    mob.getStats().setMp(mob.getMobMaxMp() * 10);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(990000900);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(351, 101));

    mobid = 9300031;
    mob = em.getMonster(mobid);
    mob.getStats().setHp(50000000);
    mob.getStats().setMp(mob.getMobMaxMp() * 2);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(990000900);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(130, 90));

    mobid = 9300032;
    mob = em.getMonster(mobid);
    mob.getStats().setHp(50000000);
    mob.getStats().setMp(mob.getMobMaxMp() * 2);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(990000900);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(540, 90));

    mobid = 9300029;
    mob = em.getMonster(mobid);
    mob.getStats().setHp(50000000);
    mob.getStats().setMp(mob.getMobMaxMp() * 2);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(990000900);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(130, 150));

    mobid = 9300030;
    mob = em.getMonster(mobid);
    mob.getStats().setHp(50000000);
    mob.getStats().setMp(mob.getMobMaxMp() * 2);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(990000900);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(540, 150));
    cm.dispose();
}