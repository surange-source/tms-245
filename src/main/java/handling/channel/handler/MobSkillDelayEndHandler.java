package handling.channel.handler;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import server.buffs.MapleStatEffectFactory;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.maps.MapleAffectedArea;
import server.maps.MapleFoothold;
import packet.MaplePacketCreator;
import server.maps.field.BossLucidField;
import server.Randomizer;
import packet.EffectPacket;
import packet.MobPacket;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;

public class MobSkillDelayEndHandler {

    public static void handlePacket(MaplePacketReader slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        if (chr == null || chr.getMap() == null) return;
        int oid = slea.readInt();
        int skillID = slea.readInt();
        int level = slea.readInt();
        int n = (slea.readByte() > 0) ? slea.readInt() : 0;
        if (chr.isDebug()) {
            chr.dropDebugMessage(1, "MobSkillDelayEnd: oid="+oid+",skill="+skillID+",level="+level);
        }
        MobSkill skill = MobSkillFactory.getMobSkill(skillID, level);
        MapleMonster monster = chr.getMap().getMonsterByOid(oid);
        if (skill == null || monster == null) return;
        if (monster.getStats().getSelfD() != -1) {
            chr.getMap().monsterSelfDestruct(monster);
        }
        switch (skillID) {
            case 170: {
                if (level == 42) {
                    final HashMap<Integer, Point> hashMap = new HashMap<>();
                    for (int i = 0; i < 3; ++i) {
                        hashMap.put(i, new Point(monster.getPosition().x + i * (monster.isFacingLeft() ? -250 : 250), monster.getPosition().y));
                    }
                    chr.getMap().broadcastMessage(MobPacket.monsterDemianDelayedAttackCreate(monster.getObjectId(), 1, hashMap, monster.isFacingLeft()));
                    return;
                }
                if (level > 44 && level <= 47) {
                    final Point point = new Point(monster.getPosition().x + (monster.isFacingLeft() ? -600 : 600), monster.getPosition().y);
                    chr.getMap().broadcastMessage(MobPacket.teleportMonster(monster.getObjectId(), false, 10, point, 0));
                    chr.getMap().broadcastMessage(MobPacket.monsterDemianDelayedAttackCreate(monster.getObjectId(), level, 1, 1, point, monster.isFacingLeft()));
                    return;
                }
                chr.getMap().broadcastMessage(MobPacket.spawnMonster(monster), monster.getPosition());
//                if (level == 44) {
//                    chr.getMap().broadcastMessage(MobPacket.teleportMonster(chr.getObjectId(), false, 4, null, (chr.getMap().getFootholds().getAllRelevants().get(Randomizer.nextInt(chr.getMap().getFootholds().getAllRelevants().size()))).getId()));
//                    return;
//                }
                final Point point2 = new Point(Randomizer.rand(-650, 660), monster.getPosition().y - 2);
                MapleFoothold fh = chr.getMap().getFootholds().findBelow(point2);
                chr.getMap().broadcastMessage(MobPacket.teleportMonster(chr.getObjectId(), false, skill.getX(), point2, fh == null ? 0 : fh.getId()));
                return;
            }
            case 176: {
                switch (level) {
                    case 25:
                    case 26: {
                        int n2 = 0;
                        switch (monster.getId() % 100) {
                            case 3: {
                                n2 = -81;
                                break;
                            }
                            case 4: {
                                n2 = -190;
                                break;
                            }
                            case 5: {
                                n2 = -322;
                                break;
                            }
                            case 6: {
                                n2 = -448;
                                break;
                            }
                            case 7: {
                                n2 = 65;
                                break;
                            }
                            case 8: {
                                n2 = 218;
                                break;
                            }
                            case 9: {
                                n2 = 362;
                                break;
                            }
                            case 10: {
                                n2 = 508;
                                break;
                            }
                        }
                        if (chr.getPosition().distance(new Point(n2, 85)) >= 75) {
                            break;
                        }
                        c.announce(EffectPacket.showMobSkillHit(-1, skillID, level));
                        chr.getMap().broadcastMessage(chr, EffectPacket.showMobSkillHit(chr.getId(), skillID, level), false);
                        if (chr.getBuffedValue(MapleBuffStat.RoyalGuardPrepare) != null) {
                            c.announce(EffectPacket.showRoyalGuardAttack());
                            break;
                        }
                        if (chr.getBuffedValue(MapleBuffStat.NotDamaged) == null) {
                            chr.addHPMP(-chr.getStat().getCurrentMaxHP(), 0, false, false);
                        }
                        break;
                    }
                    case 27: {
                        final int n3 = (int)chr.getPosition().getY();
                        int n4 = 0;
                        int n5 = 0;
                        switch (monster.getId() % 100) {
                            case 3:
                            case 7: {
                                n5 = -190;
                                n4 = -260;
                                break;
                            }
                            case 4:
                            case 8: {
                                n5 = -109;
                                n4 = -260;
                                break;
                            }
                            case 5:
                            case 9: {
                                n5 = -15;
                                n4 = -83;
                                break;
                            }
                        }
                        if (n3 <= n4 || n3 >= n5) {
                            break;
                        }
                        c.announce(EffectPacket.showMobSkillHit(-1, skillID, level));
                        chr.getMap().broadcastMessage(chr, EffectPacket.showMobSkillHit(chr.getId(), skillID, level), false);
                        if (chr.getBuffedValue(MapleBuffStat.RoyalGuardPrepare) != null) {
                            c.announce(EffectPacket.showRoyalGuardAttack());
                            break;
                        }
                        if (chr.getBuffedValue(MapleBuffStat.NotDamaged) == null) {
                            chr.addHPMP(-chr.getStat().getCurrentMaxHP(), 0, false, false);
                        }
                        break;
                    }
                }
                return;
            }
            case 211:
            case 227: {
                MapleAffectedArea area = new MapleAffectedArea(skill.calculateBoundingBox(monster.getPosition(), monster.isFacingLeft()), monster, skill, monster.getPosition());
                area.setAreaType(1);
                area.setSubtype((skillID == 227) ? 8 : 0);
                chr.getMap().createAffectedArea(area);
                break;
            }
            case 217: {
                chr.getMap().broadcastMessage(MobPacket.bounceAttackSkill(oid, skill, chr.getPosition()));
                return;
            }
            case 226: {
                chr.getMap().broadcastMessage(chr, MaplePacketCreator.userTossedBySkill(chr.getId(), oid, skill), true);
                return;
            }
            case 230: {
                if (chr.getMap().getRandRect().get(10 - n).contains(chr.getPosition())) {
                    c.announce(EffectPacket.showMobSkillHit(-1, skillID, level));
                    chr.getMap().broadcastMessage(chr, EffectPacket.showMobSkillHit(chr.getId(), skillID, level), false);
                    chr.addHPMP(-chr.getStat().getCurrentMaxHP(), 0, false, false);
                    return;
                }
                break;
            }
            case 238: {
                final ArrayList<Integer> list = new ArrayList<>();
                switch (level) {
                    case 9: {
                        if (!(chr.getMap() instanceof BossLucidField)) {
                            return;
                        }
                        BossLucidField map = (BossLucidField) chr.getMap();
                        if (map.getButterFlyCount() < 20) {
                            for (int j = 0; j < 15; ++j) {
                                list.add(500);
                            }
                            chr.getMap().broadcastMessage(MobPacket.lucidFieldAttack(skill.getSourceId(), 5, Randomizer.nextInt(2), list, monster.getPosition()));
                            return;
                        }
                        map.actionButterfly(true, 3);
                        map.setShowStep(false);
                        chr.getMap().broadcastMessage(MobPacket.lucidFieldFly(true));
                        chr.getMap().broadcastMessage(MobPacket.lucidFieldFoothold(false, chr.getMap().getLachelnList()));
                        c.announce(MobPacket.lucidSpecialHorn(false, 0, false));
                        chr.getMap().broadcastMessage(MobPacket.lucidSpecialAttack(2));
                        final int n6 = 4;
                        map.broadcastMessage(MobPacket.lucidSpecialAttack(n6));
                        final int n7 = 5;
                        map.broadcastMessage(MobPacket.lucidSpecialAttack(n7));
                        return;
                    }
                    case 7: {
                        final boolean mw = Randomizer.isSuccess(70);
                        if (chr.getMap().getId() / 1000 == 450004 && chr.getMap().getId() % 100 == 50) {
                            chr.getMap().broadcastMessage(MobPacket.lucidDragonAttack(1, 0, 0, 0, 0, mw));
                            return;
                        }
                        final int n8 = mw ? -138 : 1498;
                        chr.getMap().broadcastMessage(MobPacket.lucidDragonAttack(2, n8, monster.getPosition().y, n8, Randomizer.nextBoolean() ? -1312 : 238, mw));
                        return;
                    }
                    case 5: {
                        for (int j = 0; j < 15; ++j) {
                            list.add(500);
                        }
                        break;
                    }
                }
                chr.getMap().broadcastMessage(MobPacket.lucidFieldAttack(skill.getSourceId(), skill.getLevel(), Randomizer.nextInt(2), list, monster.getPosition()));
                break;
            }
            case 241: {
                chr.getMap().broadcastMessage(EffectPacket.PapulatusFieldEffect(2, Randomizer.rand(1, 5)));
                break;
            }
        }

    }
}
