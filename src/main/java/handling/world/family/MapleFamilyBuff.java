package handling.world.family;

import client.MapleBuffStat;
import client.MapleCharacter;
import server.MapleItemInformationProvider;
import server.buffs.MapleStatEffect;
import server.buffs.MapleStatEffect.CancelEffectAction;
import server.Timer.BuffTimer;

import java.util.EnumMap;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

public enum MapleFamilyBuff {

    瞬移("瞬移", "[對像] 我自己\n[效果] 可以馬上瞬移到自己想去見的家族成員所在的身邊.", 0, 0, 0, 300, 190000),
    召喚("召喚", "[對像] 家族成員1名\n[效果] 可以召喚自己想召喚的家族成員到自己的身邊.", 1, 0, 0, 500, 190001),
    爆率15分鐘("我的爆率 1.2倍(15分鐘)", "[對像] 我自己\n[持續時間] 15分鐘\n[效果] 打獵怪物時提升怪物爆率 #c1.2倍#.\n※ 與爆率活動重疊時效果被無視.", 2, 15, 120, 700, 190002),
    經驗15分鐘("我的經驗值 1.2倍(15分鐘)", "[對像] 我自己\n[持續時間] 15分鐘\n[效果] 打獵怪物時提升怪物經驗值#c1.2倍#.\n※ 與經驗值活動重疊時效果被無視.", 3, 15, 120, 900, 190003),
    爆率30分鐘("我的爆率 1.2倍(30分鐘)", "[對像] 我自己\n[持續時間] 30分鐘\n[效果] 打獵怪物時提升怪物爆率#c1.2倍#.\n※ 與爆率活動重疊時效果被無視.", 2, 30, 120, 1500, 190004),
    經驗30分鐘("我的經驗值 1.2倍(30分鐘)", "[對像] 我自己\n[持續時間] 30分鐘\n[效果] 打獵怪物時提升怪物經驗值 #c1.2倍#.\n※ 與經驗值活動重疊時效果被無視.", 3, 30, 120, 2000, 190005),
    //Drop_15_15("My Drop Rate 1.5x (15min)", "[Target] Me\n[Time] 15 min.\n[Effect] Monster drop rate will be increased #c1.5x#.\n*  If the event is in progress, this will be nullified.", 2, 15, 150, 1500, 190009),
    //Drop_15_30("My Drop Rate 1.5x (30min)", "[Target] Me\n[Time] 30 min.\n[Effect] Monster drop rate will be increased #c1.5x#.\n*  If the event is in progress, this will be nullified.", 2, 30, 150, 2000, 190010),
    團結("團結(30分鐘)", "[發動條件]家族關係圖中下端上家族成員有6名以上在線時\n[持續時間] 30分鐘\n[效果] 提升爆率,經驗值#c1.5倍#. ※ 與爆率經驗值活動重疊時,效果被無視.", 4, 30, 150, 3000, 190006);
    //Drop_Party_12("My Party Drop Rate 1.2x (30min)", "[Target] Party\n[Time] 30 min.\n[Effect] Monster drop rate will be increased #c1.2x#.\n*  If the event is in progress, this will be nullified.", 2, 30, 120, 4000, 190007),
    //EXP_Party("My Party EXP Rate 1.2x (30min)", "[Target] Party\n[Time] 30 min.\n[Effect] Monster EXP rate will be increased #c1.2x#.\n*  If the event is in progress, this will be nullified.", 3, 30, 120, 5000, 190008),
    //Drop_Party_15("My Party Drop Rate 1.5x (30min)", "[Target] Party\n[Time] 30 min.\n[Effect] Monster drop rate will be increased #c1.5x#.\n*  If the event is in progress, this will be nullified.", 2, 30, 150, 7000, 190011);
    // 0=tele, 1=summ, 2=drop, 3=exp, 4=both
    public final String name;
    public final String desc;
    public final int rep;
    public final int type;
    public final int questID;
    public final int duration;
    public final int effect;
    public Map<MapleBuffStat, Integer> effects;

    MapleFamilyBuff(String name, String desc, int type, int duration, int effect, int rep, int questID) {
        this.name = name;
        this.desc = desc;
        this.rep = rep;
        this.type = type;
        this.questID = questID;
        this.duration = duration;
        this.effect = effect;
        setEffects();
    }

    public int getEffectId() {
        switch (type) {
            case 2: //drop
                return 2022694; //暗影雙刀-掉落率2倍！ - 30分鐘內掉落率提高為2倍。
            case 3: //exp
                return 2450018; //暗影雙刀-經驗值2倍！ - 30分鐘內獲得的經驗值增加2倍。
        }
        return 2022332; //custom 工作人員O的激勵 - 工作人員O給我的激勵提示。30分鐘內跳躍力提高20。
    }

    public void setEffects() {
        //custom
        this.effects = new EnumMap<>(MapleBuffStat.class);
        switch (type) {
            case 2: //drop
                effects.put(MapleBuffStat.DropRate, effect);
                effects.put(MapleBuffStat.MesoUpByItem, effect);
                break;
            case 3: //exp
                effects.put(MapleBuffStat.ExpBuffRate, effect);
                break;
            case 4: //both
                effects.put(MapleBuffStat.ExpBuffRate, effect);
                effects.put(MapleBuffStat.DropRate, effect);
                effects.put(MapleBuffStat.MesoUpByItem, effect);
                break;
        }
    }

    public void applyTo(MapleCharacter chr) {
//        chr.send(BuffPacket.giveBuff(-getEffectId(), duration * 60000, effects, null, chr));
        MapleStatEffect eff = MapleItemInformationProvider.getInstance().getItemEffect(getEffectId());
        chr.cancelEffect(eff, true, -1, effects);
        long starttime = System.currentTimeMillis();
        chr.registerEffect(eff, effects, 0, chr.getId(), starttime, 0, duration, new CancelEffectAction(chr, eff, starttime, effects));
    }
}
