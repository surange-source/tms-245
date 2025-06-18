package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import handling.world.World;
import handling.world.WorldFamilyService;
import handling.world.WorldFindService;
import handling.world.family.MapleFamily;
import handling.world.family.MapleFamilyBuff;
import handling.world.family.MapleFamilyCharacter;
import server.maps.FieldLimitType;
import packet.FamilyPacket;
import tools.data.MaplePacketReader;

import java.util.List;

public class FamilyHandler {

    public static void RequestFamily(MaplePacketReader slea, MapleClient c) {
        MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
        if (chr != null) {
            c.announce(FamilyPacket.getFamilyPedigree(chr));
        }
    }

    /*
     * 打開家族
     */
    public static void OpenFamily(MaplePacketReader slea, MapleClient c) {
        c.announce(FamilyPacket.getFamilyInfo(c.getPlayer()));
    }

    /*
     * 使用家族狀態
     */
    public static void UseFamily(MaplePacketReader slea, MapleClient c) {
        int type = slea.readInt();
        if (MapleFamilyBuff.values().length <= type) {
            return;
        }
        MapleFamilyBuff entry = MapleFamilyBuff.values()[type];
        boolean success = c.getPlayer().getFamilyId() > 0 && c.getPlayer().canUseFamilyBuff(entry) && c.getPlayer().getCurrentRep() > entry.rep;
        if (!success) {
            return;
        }
        MapleCharacter victim = null;
        switch (entry) {
            case 瞬移: //teleport: need add check for if not a safe place
                victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                if (FieldLimitType.TELEPORTITEMLIMIT.check(c.getPlayer().getMap().getFieldLimit()) || c.getPlayer().isInBlockedMap()) {
                    c.getPlayer().dropMessage(5, "Summons failed. Your current location or state does not allow a summons.");
                    success = false;
                } else if (victim == null || (victim.isGm() && !c.getPlayer().isGm())) {
                    c.getPlayer().dropMessage(1, "Invalid name or you are not on the same channel.");
                    success = false;
                } else if (victim.getFamilyId() == c.getPlayer().getFamilyId() && !FieldLimitType.TELEPORTITEMLIMIT.check(victim.getMap().getFieldLimit()) && victim.getId() != c.getPlayer().getId() && !victim.isInBlockedMap()) {
                    c.getPlayer().changeMap(victim.getMap(), victim.getMap().getPortal(0));
                } else {
                    c.getPlayer().dropMessage(5, "Summons failed. Your current location or state does not allow a summons.");
                    success = false;
                }
                break;
            case 召喚:
                victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
                if (FieldLimitType.TELEPORTITEMLIMIT.check(c.getPlayer().getMap().getFieldLimit()) || c.getPlayer().isInBlockedMap()) {
                    c.getPlayer().dropMessage(5, "Summons failed. Your current location or state does not allow a summons.");
                } else if (victim == null || (victim.isGm() && !c.getPlayer().isGm())) {
                    c.getPlayer().dropMessage(1, "Invalid name or you are not on the same channel.");
                } else if (victim.getTeleportName().length() > 0) {
                    c.getPlayer().dropMessage(1, "Another character has requested to summon this character. Please try again later.");
                } else if (victim.getFamilyId() == c.getPlayer().getFamilyId() && !FieldLimitType.TELEPORTITEMLIMIT.check(victim.getMap().getFieldLimit()) && victim.getId() != c.getPlayer().getId() && !victim.isInBlockedMap()) {
                    victim.getClient().announce(FamilyPacket.familySummonRequest(c.getPlayer().getName(), c.getPlayer().getMap().getMapName()));
                    victim.setTeleportName(c.getPlayer().getName());
                } else {
                    c.getPlayer().dropMessage(5, "Summons failed. Your current location or state does not allow a summons.");
                }
                return; //RETURN not break
            case 爆率15分鐘: // drop rate + 50% 15 min
            case 經驗15分鐘: // exp rate + 50% 15 min
            case 爆率30分鐘: // drop rate + 100% 15 min
            case 經驗30分鐘: // exp rate + 100% 15 min
                //case Drop_15_15:
                //case Drop_15_30:
                //c.announce(FamilyPacket.familyBuff(entry.type, type, entry.effect, entry.duration*60000));
                entry.applyTo(c.getPlayer());
                break;
            case 團結: // 6 family members in pedigree online Drop Rate & Exp Rate + 100% 30 minutes
                final MapleFamily fam = WorldFamilyService.getInstance().getFamily(c.getPlayer().getFamilyId());
                List<MapleFamilyCharacter> chrs = fam.getMFC(c.getPlayer().getId()).getOnlineJuniors(fam);
                if (chrs.size() < 7) {
                    success = false;
                } else {
                    for (MapleFamilyCharacter chrz : chrs) {
                        int chr = WorldFindService.getInstance().findChannel(chrz.getId());
                        if (chr == -1) {
                            continue; //STOP WTF?! take reps though..
                        }
                        MapleCharacter chrr = World.getStorage(chr).getCharacterById(chrz.getId());
                        entry.applyTo(chrr);
                        //chrr.getClient().announce(FamilyPacket.familyBuff(entry.type, type, entry.effect, entry.duration*60000));
                    }
                }
                break;
            /*
             * case EXP_Party:
             * case Drop_Party_12: // drop rate + 100% party 30 min
             * case Drop_Party_15: // exp rate + 100% party 30 min
             * entry.applyTo(c.getPlayer());
             * //c.announce(FamilyPacket.familyBuff(entry.type, type, entry.effect, entry.duration*60000));
             * if (c.getPlayer().getParty() != null) {
             * for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
             * if (mpc.getId() != c.getPlayer().getId()) {
             * MapleCharacter chr = c.getPlayer().getMap().getCharacterById(mpc.getId());
             * if (chr != null) {
             * entry.applyTo(chr);
             * //chr.send(FamilyPacket.familyBuff(entry.type, type, entry.effect, entry.duration*60000));
             * }
             * }
             * }
             * }
             * break;
             */
        }
        if (success) { //again
            c.getPlayer().setCurrentRep(c.getPlayer().getCurrentRep() - entry.rep);
            c.announce(FamilyPacket.changeRep(-entry.rep, c.getPlayer().getName()));
            c.getPlayer().useFamilyBuff(entry);
        } else {
            c.getPlayer().dropMessage(5, "發生未知錯誤。");
        }
    }

    /*
     * 家族操作
     */
    public static void FamilyOperation(MaplePacketReader slea, MapleClient c) {
        if (c.getPlayer() == null) {
            return;
        }
        MapleCharacter addChr = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
        if (addChr == null) {
            c.announce(FamilyPacket.sendFamilyMessage(0x41)); //角色不在線，或角色名不正確。
        } else if (addChr.getFamilyId() == c.getPlayer().getFamilyId() && addChr.getFamilyId() > 0) {
            c.announce(FamilyPacket.sendFamilyMessage(0x42)); //是同一冒險家族。
        } else if (addChr.getMapId() != c.getPlayer().getMapId()) {
            c.announce(FamilyPacket.sendFamilyMessage(0x45)); //只有在同一地圖中的角色才能登錄為同學
        } else if (addChr.getSeniorId() != 0) {
            c.announce(FamilyPacket.sendFamilyMessage(0x46)); //已經是其他角色的同學
        } else if (addChr.getLevel() >= c.getPlayer().getLevel()) {
            c.announce(FamilyPacket.sendFamilyMessage(0x47)); //只能將比自己等級低的角色登錄為同學
        } else if (addChr.getLevel() < c.getPlayer().getLevel() - 20) {
            c.announce(FamilyPacket.sendFamilyMessage(0x48)); //等級差異超過20，無法登錄為同學。
            //} else if (c.getPlayer().getFamilyId() != 0 && c.getPlayer().getFamily().getGens() >= 1000) {
            //	c.getPlayer().dropMessage(5, "Your family cannot extend more than 1000 generations from above and below.");
        } else if (addChr.getLevel() < 10) {
            c.getPlayer().dropMessage(1, "被邀請的角色等級必須大於10級.");
        } else if (c.getPlayer().getJunior1() > 0 && c.getPlayer().getJunior2() > 0) {
            c.getPlayer().dropMessage(1, "你已經有2位同學，無法繼續邀請.");
        } else if (c.getPlayer().isGm() || !addChr.isGm()) {
            addChr.send(FamilyPacket.sendFamilyInvite(c.getPlayer().getId(), c.getPlayer().getLevel(), c.getPlayer().getJob(), c.getPlayer().getName()));
        }
        c.sendEnableActions();
    }

    public static void FamilyPrecept(MaplePacketReader slea, MapleClient c) {
        MapleFamily fam = WorldFamilyService.getInstance().getFamily(c.getPlayer().getFamilyId());
        if (fam == null || fam.getLeaderId() != c.getPlayer().getId()) {
            return;
        }
        fam.setNotice(slea.readMapleAsciiString());
    }

    /*
     * 召喚家族同學
     */
    public static void FamilySummon(MaplePacketReader slea, MapleClient c) {
        MapleFamilyBuff cost = MapleFamilyBuff.召喚;
        MapleCharacter tt = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
        if (c.getPlayer().getFamilyId() > 0 && tt != null && tt.getFamilyId() == c.getPlayer().getFamilyId() && !FieldLimitType.TELEPORTITEMLIMIT.check(tt.getMap().getFieldLimit())
                && !FieldLimitType.TELEPORTITEMLIMIT.check(c.getPlayer().getMap().getFieldLimit()) && tt.canUseFamilyBuff(cost)
                && c.getPlayer().getTeleportName().equals(tt.getName()) && tt.getCurrentRep() > cost.rep && !c.getPlayer().isInBlockedMap() && !tt.isInBlockedMap()) {
            //whew lots of checks
            boolean accepted = slea.readByte() > 0;
            if (accepted) {
                c.getPlayer().changeMap(tt.getMap(), tt.getMap().getPortal(0));
                tt.setCurrentRep(tt.getCurrentRep() - cost.rep);
                tt.getClient().announce(FamilyPacket.changeRep(-cost.rep, tt.getName()));
                tt.useFamilyBuff(cost);
            } else {
                tt.dropMessage(5, "召喚玩家失敗，您當前的位置或狀態不容許召喚家族同學。");
            }
        } else {
            c.getPlayer().dropMessage(5, "召喚玩家失敗，您當前的位置或狀態不容許召喚家族同學。");
        }
        c.getPlayer().setTeleportName("");
    }

    public static void AcceptFamily(MaplePacketReader slea, MapleClient c) {
        MapleCharacter inviter = c.getPlayer().getMap().getPlayerObject(slea.readInt());
        if (inviter != null && c.getPlayer().getSeniorId() == 0 && (c.getPlayer().isGm() || !inviter.isHidden()) && inviter.getLevel() - 20 <= c.getPlayer().getLevel() && inviter.getLevel() >= 10 && inviter.getName().equals(slea.readMapleAsciiString()) && inviter.getNoJuniors() < 2 /*
                 * && inviter.getFamily().getGens() < 1000
                 */ && c.getPlayer().getLevel() >= 10) {
            boolean accepted = slea.readByte() > 0;
            inviter.getClient().announce(FamilyPacket.sendFamilyJoinResponse(accepted, c.getPlayer().getName()));
            if (accepted) {
                //c.announce(FamilyPacket.sendFamilyMessage(0));
                c.announce(FamilyPacket.getSeniorMessage(inviter.getName()));
                int old = c.getPlayer().getMFC() == null ? 0 : c.getPlayer().getMFC().getFamilyId();
                int oldj1 = c.getPlayer().getMFC() == null ? 0 : c.getPlayer().getMFC().getJunior1();
                int oldj2 = c.getPlayer().getMFC() == null ? 0 : c.getPlayer().getMFC().getJunior2();
                if (inviter.getFamilyId() > 0 && WorldFamilyService.getInstance().getFamily(inviter.getFamilyId()) != null) {
                    MapleFamily fam = WorldFamilyService.getInstance().getFamily(inviter.getFamilyId());
                    //if old isn't null, don't set the familyid yet, mergeFamily will take care of it
                    c.getPlayer().setFamily(old <= 0 ? inviter.getFamilyId() : old, inviter.getId(), oldj1 <= 0 ? 0 : oldj1, oldj2 <= 0 ? 0 : oldj2);
                    MapleFamilyCharacter mf = inviter.getMFC();
                    if (mf.getJunior1() > 0) {
                        mf.setJunior2(c.getPlayer().getId());
                    } else {
                        mf.setJunior1(c.getPlayer().getId());
                    }
                    inviter.saveFamilyStatus();
                    if (old > 0 && WorldFamilyService.getInstance().getFamily(old) != null) { //has junior
                        MapleFamily.mergeFamily(fam, WorldFamilyService.getInstance().getFamily(old));
                    } else {
                        c.getPlayer().setFamily(inviter.getFamilyId(), inviter.getId(), oldj1 <= 0 ? 0 : oldj1, oldj2 <= 0 ? 0 : oldj2);
                        fam.setOnline(c.getPlayer().getId(), true, c.getChannel());
                        c.getPlayer().saveFamilyStatus();
                    }
                    if (fam != null) {
                        if (inviter.getNoJuniors() == 1 || old > 0) {//just got their first junior whoopee
                            fam.resetDescendants();
                        }
                        fam.resetPedigree(); //is this necessary?
                    }
                } else {
                    int id = MapleFamily.createFamily(inviter.getId());
                    if (id > 0) {
                        //before loading the family, set sql
                        MapleFamily.setOfflineFamilyStatus(id, 0, c.getPlayer().getId(), 0, inviter.getCurrentRep(), inviter.getTotalRep(), inviter.getId());
                        MapleFamily.setOfflineFamilyStatus(id, inviter.getId(), oldj1 <= 0 ? 0 : oldj1, oldj2 <= 0 ? 0 : oldj2, c.getPlayer().getCurrentRep(), c.getPlayer().getTotalRep(), c.getPlayer().getId());
                        inviter.setFamily(id, 0, c.getPlayer().getId(), 0); //load the family
                        c.getPlayer().setFamily(id, inviter.getId(), oldj1 <= 0 ? 0 : oldj1, oldj2 <= 0 ? 0 : oldj2);
                        MapleFamily fam = WorldFamilyService.getInstance().getFamily(id);
                        fam.setOnline(inviter.getId(), true, inviter.getClient().getChannel());
                        if (old > 0 && WorldFamilyService.getInstance().getFamily(old) != null) { //has junior
                            MapleFamily.mergeFamily(fam, WorldFamilyService.getInstance().getFamily(old));
                        } else {
                            fam.setOnline(c.getPlayer().getId(), true, c.getChannel());
                        }
                        fam.resetDescendants();
                        fam.resetPedigree();
                    }
                }
                c.announce(FamilyPacket.getFamilyInfo(c.getPlayer()));
            }
        }
    }
}
