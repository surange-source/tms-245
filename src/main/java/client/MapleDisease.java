package client;

import handling.Buffstat;

import java.io.Serializable;

public enum MapleDisease implements Serializable, Buffstat {

    封印(MapleBuffStat.Seal, 120),
    黑暗(MapleBuffStat.Darkness, 121),
    虛弱(MapleBuffStat.Weakness, 122),
    昏迷(MapleBuffStat.Stun, 123),
    詛咒(MapleBuffStat.Curse, 124),
    中毒(MapleBuffStat.Poison, 125),
    緩慢(MapleBuffStat.Slow, 126),
    誘惑(MapleBuffStat.Attract, 128),
    混亂(MapleBuffStat.ReverseInput, 132),
    痛苦(MapleBuffStat.PainMark, -1),
    不死化(MapleBuffStat.BanMap, 133),
    無法使用藥水(MapleBuffStat.StopPortion, 134),
    StopMotion(MapleBuffStat.StopMotion, 135),
    致盲(MapleBuffStat.Blind, 136),
    冰凍(MapleBuffStat.Frozen, 137),
    裝備潛能無效化(MapleBuffStat.DispelItemOption, 138),
    變身(MapleBuffStat.Morph, 172),
    龍捲風(MapleBuffStat.DarkTornado, 173),
    死亡束縛(MapleBuffStat.Lapidification, 174),
    返回原位置(MapleBuffStat.ReturnTeleport, 184),
    誘惑之境(MapleBuffStat.Attract, 188),
    精靈帽子(MapleBuffStat.CapDebuff, 189),
    精靈帽子2(MapleBuffStat.CapDebuff, 190),
    禁止跳躍(MapleBuffStat.IndieJump, 229);

    private final MapleBuffStat buffStat;
    private final int disease;

    MapleDisease(MapleBuffStat buffStat, int disease) {
        this.buffStat = buffStat;
        this.disease = disease;
    }

    public static MapleDisease getBySkill(int skill) {
        for (MapleDisease d : MapleDisease.values()) {
            if (d.getDisease() == skill) {
                return d;
            }
        }
        return null;
    }

    public static boolean containsStat(final MapleBuffStat stat) {
        MapleDisease[] values;
        for (int length = (values = values()).length, i = 0; i < length; ++i) {
            if (values[i].buffStat == stat) {
                return true;
            }
        }
        return false;
    }

    public MapleBuffStat getBuffStat() {
        return buffStat;
    }

    @Override
    public int getPosition() {
        return buffStat.getPosition();
    }

    @Override
    public int getValue() {
        return buffStat.getValue();
    }

    public int getDisease() {
        return disease;
    }
}
