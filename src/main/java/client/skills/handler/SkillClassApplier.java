package client.skills.handler;

import client.MapleBuffStat;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.status.MonsterStatus;
import handling.channel.handler.AttackInfo;
import server.buffs.MapleStatEffect;
import tools.Pair;

import java.awt.*;
import java.util.HashMap;
import java.util.Map;

public class SkillClassApplier {

    public MapleStatEffect effect;
    public boolean primary, att, passive, b3, b4, b5, b7, overwrite, cancelEffect, applySummon;
    public Point pos;
    public int duration, maskedDuration, cooldown, buffz, mobOid, hpHeal, mpHeal, prop;
    public Map<MapleBuffStat, Integer> localstatups, maskedstatups;
    public Map<MapleBuffStat, Pair<Integer, Integer>> sendstatups;
    public Map<MonsterStatus, Integer> localmobstatups;
    public Map<Integer, SkillEntry> skillMap;
    public long startChargeTime, startTime, totalDamage;
    public Skill theSkill;
    public AttackInfo ai = null;
}
