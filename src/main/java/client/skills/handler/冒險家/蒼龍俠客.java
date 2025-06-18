package client.skills.handler.冒險家;

import client.MapleBuffStat;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterStatus;
import constants.enums.UserChatMessageType;
import constants.skills.通用V核心;
import packet.EffectPacket;
import packet.MaplePacketCreator;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import tools.Randomizer;
import tools.data.MaplePacketReader;

import java.lang.reflect.Field;
import java.util.Map;

import static constants.skills.蒼龍俠客.*;

public class 蒼龍俠客 extends AbstractSkillHandler {

    public 蒼龍俠客() {
        jobs = new MapleJob[] {
                MapleJob.蒼龍俠客1轉,
                MapleJob.蒼龍俠客2轉,
                MapleJob.蒼龍俠客3轉,
                MapleJob.蒼龍俠客4轉
        };

        for (Field field : constants.skills.蒼龍俠客.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int getLinkedSkillID(int skillId) {
        switch (skillId) {
            case 幻身疾影_1:
                return 幻身疾影;
            case 虛空連步_1:
            case 虛空連步_2:
            case 虛空連步_3:
            case 虛空連步_4:
                return 虛空連步;
            case 傲龍狂氣_1:
                return 傲龍狂氣;
            case 炎虎砲_1:
            case 炎虎砲_2:
            case 炎虎砲_3:
            case 炎虎砲_4:
                return 炎虎砲;
            case 分身無雙_1:
            case 分身無雙_2:
            case 分身無雙_3:
                return 分身無雙;
        }
        return -1;
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 追影連擊:
                statups.put(MapleBuffStat.Booster, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 天地無我:
                statups.put(MapleBuffStat.DEXR, effect.getInfo().get(MapleStatInfo.prop));
                statups.put(MapleBuffStat.ACCR, effect.getInfo().get(MapleStatInfo.y));
                statups.put(MapleBuffStat.DEX, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case 千斤墜:
                statups.put(MapleBuffStat.Stance, effect.getInfo().get(MapleStatInfo.prop));
                statups.put(MapleBuffStat.IndieAllStat, effect.getInfo().get(MapleStatInfo.indieAllStat));
                statups.put(MapleBuffStat.IndieBDR, effect.getInfo().get(MapleStatInfo.bdR));
                statups.put(MapleBuffStat.IndieCr, effect.getInfo().get(MapleStatInfo.indieCr));
                return 1;
            case 醉臥竹林:
                statups.put(MapleBuffStat.IgnoreMobpdpR, effect.getInfo().get(MapleStatInfo.w));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.IndieTerR, effect.getInfo().get(MapleStatInfo.y));
                statups.put(MapleBuffStat.IndieAsrR, effect.getInfo().get(MapleStatInfo.z));
                return 1;
            case 楓葉祝福:
                effect.setPartyBuff(true);
                statups.put(MapleBuffStat.BasicStatUp, effect.getInfo().get(MapleStatInfo.x));
                return 1;
        }
        return -1;
    }

    public int onSkillUse(MaplePacketReader slea, MapleClient c, MapleCharacter chr, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 炎虎砲: {
                chr.getSkillEffect(炎虎砲_1).applyTo(chr);
                chr.getSkillEffect(炎虎砲_2).applyTo(chr);
                chr.getSkillEffect(炎虎砲_3).applyTo(chr);
                chr.getSkillEffect(炎虎砲_4).applyTo(chr);
                return 1;
            }
        }
        return -1;
    }

    @Override
    public int onApplyBuffEffect(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 回歸: {
                applyto.changeMap(applier.effect.getX(), 0);
                return 1;
            }
        }
        return -1;
    }
}
