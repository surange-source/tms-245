package handling.channel.handler;

import client.*;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import constants.SkillConstants;
import constants.enums.UserChatMessageType;
import constants.skills.*;
import handling.opcode.SendPacketOpcode;
import server.buffs.MapleStatEffect;
import packet.MaplePacketCreator;
import tools.Randomizer;
import tools.data.MaplePacketReader;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.*;
import java.util.List;

public class UserSkillUseHandler {

    public static void userSkillUseRequest(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.hasBlockedInventory() || chr.getMap() == null || slea.available() < 9) {
            return;
        }
        chr.updateTick(slea.readInt());
        int skillid = slea.readInt();
        if (SkillFactory.isBlockedSkill(skillid)) {
            chr.dropMessage(5, "由於<" + SkillFactory.getSkillName(skillid) + ">技能數據異常,暫未開放使用.");
            c.sendEnableActions();
            return;
        }
        if (SkillConstants.isZeroSkill(skillid)) {
            slea.readByte(); //神之子要多1位
        }
        int skillLevel = slea.readInt();
        Skill skill = SkillFactory.getSkill(skillid);
        if (skill == null) {
            c.announce(MaplePacketCreator.sendSkillUseResult(false, 0));
            if (chr.isDebug()) {
                chr.dropMessage(1, "[Skill Use] SkillID:" + skillid + " skill is null!");
            }
            return;
        }
        int linkedAttackSkill = SkillConstants.getLinkedAttackSkill(skillid);
        int checkSkillLevel = chr.getTotalSkillLevel(linkedAttackSkill);
        MapleStatEffect effect = chr.inPVP() ? skill.getPVPEffect(checkSkillLevel) : skill.getEffect(checkSkillLevel);
        if (effect == null) {
            MapleBuffStatValueHolder holder = chr.getBuffStatValueHolder(linkedAttackSkill);
            if (holder != null && holder.effect != null) {
                effect = holder.effect;
                skillLevel = holder.effect.getLevel();
            }
        }

        Point pos = null;
        AttackInfo ai = new AttackInfo();
        ai.skillposition = pos;
        DamageParse.readAttackUnknown2(slea, chr, ai);
        pos = ai.skillposition;

        boolean passive = false;
        slea.readInt();
        slea.skip(3);

        if (chr.isDebug()) {
            chr.dropSpouseMessage(UserChatMessageType.粉, "[Skill Use] Effect:" + SkillFactory.getSkillName(skillid) + "(" + skillid + ") Level: " + skillLevel);
            if (effect == null) {
                chr.dropMessage(1, "[Skill Use] SkillID:" + skillid + " Lv:" + skillLevel + " Effect is null!");
            }
            if (linkedAttackSkill != skillid) {
                chr.dropSpouseMessage(UserChatMessageType.粉, "[Skill Use] Linked SkillID:" + SkillFactory.getSkillName(linkedAttackSkill) + "(" + linkedAttackSkill + ") Level: " + checkSkillLevel);
            }
        }
        if (checkSkillLevel <= 0 || skillLevel > 0 && skillLevel != checkSkillLevel || effect == null) {
            c.announce(MaplePacketCreator.sendSkillUseResult(false, 0));
            return;
        }
        if (effect.getCooldown(chr) > 0 && !chr.isGm() && chr.isSkillCooling(linkedAttackSkill)) {
            chr.dropMessage(5, "還無法使用技能。");
            c.announce(MaplePacketCreator.sendSkillUseResult(false, 0));
            return;
        }
        if (skillid != 爆拳槍神.王之子 && skillid != 爆拳槍神.擺動 && skillid != 151121003) {
            c.sendEnableActions();
        }

        AbstractSkillHandler handler = effect.getSkillHandler();
        int handleRes = -1;
        if (handler != null) {
            SkillClassApplier applier = new SkillClassApplier();
            applier.effect =  effect;
            applier.passive =  passive;
            applier.pos = pos;
            applier.ai = ai;
            handleRes = handler.onSkillUse(slea, c, chr, applier);
            if (handleRes == 0) {
                return;
            } else if (handleRes == 1) {
                effect = applier.effect;
                passive = applier.passive;
                pos = applier.pos;
                ai = applier.ai;
            }
        }
        if ((slea.available() == 4 || slea.available() == 5) && skillid != 狂豹獵人.捕獲) {
            pos = slea.readPos();
        } else if (slea.available() == 12 || slea.available() == 13) {
            slea.readInt();
            pos = slea.readPosInt();
        }
        if (handleRes == -1) {
            switch (skillid) {
                case 80012015:
                    MapleBuffStatValueHolder holder;
                    if ((holder = chr.getBuffStatValueHolder(MapleBuffStat.艾爾達斯的祝福)) == null || holder.value < 6) {
                        chr.dropMessage(5, "堆疊不足。");
                        return;
                    }
                    break;
            }
        }

        Skill linkedSkill = SkillFactory.getSkill(linkedAttackSkill);
        if (skill.isChargeSkill() || linkedSkill.isChargeSkill()) {
            chr.setKeyDownSkill_Time(0);
            if (skill.isChargeSkill()) {
                MapleStatEffect eff = chr.getSkillEffect(skillid);
                if (eff != null && eff.getCooldown() > 0) {
                    if (SkillConstants.isKeydownSkillCancelGiveCD(skillid) && !chr.isSkillCooling(skillid)) {
                        chr.registerSkillCooldown(chr.getSkillEffect(skillid), true);
                    }
                    if (!chr.isSkillCooling(skillid)) {
                        chr.send(MaplePacketCreator.skillCooltimeSet(skillid, 0));
                    }
                }
            }
            if (linkedSkill.isChargeSkill()) {
                MapleStatEffect eff = chr.getSkillEffect(linkedAttackSkill);
                if (eff != null && eff.getCooldown() > 0) {
                    if (SkillConstants.isKeydownSkillCancelGiveCD(linkedAttackSkill) && !chr.isSkillCooling(linkedAttackSkill)) {
                        chr.registerSkillCooldown(chr.getSkillEffect(linkedAttackSkill), true);
                    }
                    if (!chr.isSkillCooling(linkedAttackSkill)) {
                        chr.send(MaplePacketCreator.skillCooltimeSet(linkedAttackSkill, 0));
                    }
                }
            }
        }
        if (effect != null) {
            effect.applyTo(chr, pos, passive);
        }
        if (passive) {
            c.announce(MaplePacketCreator.sendSkillUseResult(true, skillid));
        }
    }
}
