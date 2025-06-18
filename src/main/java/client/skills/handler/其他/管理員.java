package client.skills.handler.其他;

import client.MapleBuffStat;
import client.MapleBuffStatValueHolder;
import client.MapleCharacter;
import client.MapleJob;
import client.skills.handler.AbstractSkillHandler;
import client.skills.handler.SkillClassApplier;
import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import server.MapleStatInfo;
import server.buffs.MapleStatEffect;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.MapleMapObject;

import java.awt.*;
import java.lang.reflect.Field;
import java.util.List;
import java.util.LinkedList;
import java.util.Map;

import static constants.skills.管理員.*;

public class 管理員 extends AbstractSkillHandler {

    public 管理員() {
        jobs = new MapleJob[] {
                MapleJob.管理員
        };

        for (Field field : constants.skills.管理員.class.getDeclaredFields()) {
            try {
                skills.add(field.getInt(field.getName()));
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public int onSkillLoad(Map<MapleBuffStat, Integer> statups, Map<MonsterStatus, Integer> monsterStatus, MapleStatEffect effect) {
        switch (effect.getSourceId()) {
            case 終極祝福:
                effect.setRangeBuff(true);
                effect.setHpR(1.0);
                return 1;
            case 終極輕功:
                effect.setRangeBuff(true);
                statups.put(MapleBuffStat.Speed, effect.getSpeed());
                statups.put(MapleBuffStat.Jump, effect.getJump());
                return 1;
            case 終極祈禱:
                effect.setRangeBuff(true);
                statups.put(MapleBuffStat.HolySymbol, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case GM的祝福:
                effect.setRangeBuff(true);
                effect.getInfo().put(MapleStatInfo.time, effect.getDuration() * 1000);
                statups.put(MapleBuffStat.IndiePAD, effect.getInfo().get(MapleStatInfo.indiePad));
                statups.put(MapleBuffStat.IndieMAD, effect.getInfo().get(MapleStatInfo.indieMad));
                statups.put(MapleBuffStat.IndieMHPR, effect.getInfo().get(MapleStatInfo.indieMhpR));
                statups.put(MapleBuffStat.IndieMMPR, effect.getInfo().get(MapleStatInfo.indieMmpR));
                statups.put(MapleBuffStat.PDD, effect.getInfo().get(MapleStatInfo.pdd));
                statups.put(MapleBuffStat.Speed, effect.getInfo().get(MapleStatInfo.speed));
                return 1;
            case 終極隱藏:
                effect.getInfo().put(MapleStatInfo.time, 2100000000);
                statups.put(MapleBuffStat.DarkSight, effect.getInfo().get(MapleStatInfo.x));
                return 1;
            case hyper_body:
                effect.setRangeBuff(true);
                statups.put(MapleBuffStat.MaxHP, effect.getInfo().get(MapleStatInfo.x));
                statups.put(MapleBuffStat.MaxMP, effect.getInfo().get(MapleStatInfo.x));
                return 1;
        }
        return -1;
    }

    @Override
    public int onApplyTo(MapleCharacter applyfrom, MapleCharacter applyto, SkillClassApplier applier) {
        switch (applier.effect.getSourceId()) {
            case 終極祝福: {
                Rectangle rect = applier.effect.calculateBoundingBox(applyfrom.getPosition());
                for (MapleCharacter chr : applyfrom.getMap().getCharactersInRect(rect)) {
                    List<MapleBuffStatValueHolder> mbsvhs = new LinkedList<>();
                    for (Map.Entry<MapleBuffStat, List<MapleBuffStatValueHolder>> entry : chr.getAllEffects().entrySet()) {
                        entry.getValue().stream().filter(mbsvh -> mbsvh.effect instanceof MobSkill).forEach(mbsvhs::add);
                    }
                    if (mbsvhs.size() > 0) {
                        mbsvhs.forEach(mbsvh -> chr.cancelEffect(mbsvh.effect, mbsvh.startTime));
                    }
                }
                for (MapleMapObject obj : applyfrom.getMap().getMonstersInRect(rect)) {
                    MapleMonster mob = (MapleMonster) obj;
                    List<Integer> skills = new LinkedList<>();
                    for (List<MonsterEffectHolder> mehs : mob.getAllEffects().values()) {
                        mehs.stream().filter(meh -> (meh.effect instanceof MobSkill) && !skills.contains(meh.effect.getSourceId())).forEach(meh -> skills.add(meh.effect.getSourceId()));
                    }
                    for (int skill : skills) {
                        mob.removeEffect(0, skill);
                    }
                }
                return 1;
            }
            case 復活: {
                for (MapleCharacter chr : applyfrom.getMap().getCharactersInRect(applier.effect.calculateBoundingBox(applyfrom.getPosition()))) {
                    if (applyfrom != chr && !chr.isAlive()) {
                        chr.heal();
                    }
                }
                return 1;
            }
        }
        return -1;
    }
}
