package client.status;

import constants.skills.*;
import handling.Buffstat;

import java.io.Serializable;

/**
 * @author setosan
 */
public enum MonsterStatus implements Serializable, Buffstat {

    IndiePDR(0x80000000, 0, true),
    IndieMDR(0x40000000, 0, true),
    IndiePMdR(0x20000000, 0, true),
    IndieSpeed(0x10000000, 0, true),
    // 0x8000000, 0
    PAD(0x4000000, 0),//物理攻擊
    PDR(0x2000000, 0),//物理防禦
    MAD(0x1000000, 0),//魔法攻擊
    MDR(0x800000, 0),//魔法防禦
    ACC(0x400000, 0),//命中
    EVA(0x200000, 0),//迴避
    Speed(0x100000, 0),//減速
    Stun(0x80000, 0),//眩暈
    Freeze(0x40000, 0),//極凍吐息
    Poison(0x20000, 0),//中毒
    Seal(0x10000, 0),//封印
    Darkness(0x8000, 0),//黑暗
    PowerUp(0x4000, 0),//物理攻擊提升
    MagicUp(0x2000, 0),//魔法攻擊提升
    PGuardUp(0x1000, 0),//物理防禦提升
    MGuardUp(0x800, 0),//魔法防禦提升
    PImmune(0x400, 0),//物理免疫
    MImmune(0x200, 0),//魔法免疫
    Web(0x100, 0),//影網術
    HardSkin(0x80, 0),//硬化皮膚
    Ambush(0x40, 0),//忍者伏擊，此技能好像已刪除
    Venom(0x20, 0),//巫毒術，此技能好像已刪除
    Blind(0x10, 0),//黑暗，英雄.恐慌，降低命中
    SealSkill(0x8, 0),//封印技能
    Dazzle(0x4, 0),//閃光？
    PCounter(0x2, 0),//物理反射
    MCounter(0x1, 0),//魔法反射
    RiseByToss(0x80000000, 1),//扔上天？
    BodyPressure(0x40000000, 1),//身體壓力？
    Weakness(0x20000000, 1),//虛弱
    Showdown(0x10000000, 1),//攤開？
    MagicCrash(0x8000000, 1),
    DamagedElemAttr(0x4000000, 1),
    AddDamParty(0x2000000, 1),//增加怪物受到的傷害
    Unk_163_Add_34(0x1000000, 1),
    HitCriDamR(0x800000, 1),
    Fatality(0x400000, 1),//死亡
    Lifting(0x200000, 1),
    DeadlyCharge(0x100000, 1),
    Smite(0x80000, 1),
    AddDamSkil(0x40000, 1),
    Incizing(0x20000, 1),
    DodgeBodyAttack(0x10000, 1),
    DebuffHealing(0x8000, 1),
    AddDamSkill2(0x4000, 1),
    BodyAttack(0x2000, 1),
    TempMoveAbility(0x1000, 1),
    FixDamRBuff(0x800, 1),
    NEWUNK47(0x400, 1),
    ElementDarkness(0x200, 1),//元素黑暗
    AreaInstallByHit(0x100, 1),
    BMageDebuff(0x80, 1),
    JaguarProvoke(0x40, 1),//豹弩_引發
    JaguarBleeding(0x20, 1),//豹弩_出血
    DarkLightning(0x10, 1),
    PinkbeanFlowerPot(0x10, 1),
    BattlePvP_Helena_Mark(0x8, 1),
    PsychicLock(0x4, 1),
    PsychicLockCoolTime(0x2, 1),
    PsychicGroundMark(0x1, 1),
    PowerImmune(0x80000000, 2),
    MultiPMDR(0x40000000, 2),
    ElementResetBySummon(0x20000000, 2),//元素初始化
    BahamutLightElemAddDam(0x10000000, 2),
    CurseMark(0x8000000, 2),
    BossPropPlus(0x4000000, 2),
    MultiDamSkill(0x2000000, 2),
    RWLiftPress(0x1000000, 2),
    RWChoppingHammer(0x800000, 2),
    UNK69(0x400000, 2),
    UNK70(0x200000, 2),
    Ticktock(0x100000, 2),
    UNK72(0x80000, 2),
    UNK73(0x40000, 2),
    UNK74(0x20000, 2),
    //0x10000, 2
    //0x8000, 2
    //0x4000, 2
    AncientCurse(0x2000, 2),
    UNK_165_Add_80(0x1000, 2),
    微生強變(0x800, 2),
    魔封葫蘆符(0x400, 2),
    UNK_Add_1002(0x200, 2),
    //0x100, 2
    //0x80, 2
    //0x40, 2
    //0x20, 2
    //0x10, 2
    //0x8, 2
    傷痕之劍(0x4, 2),
    TimeBomb(0x2, 2),//時間炸彈
    艾爾達斯還原(0x1, 2),
    UNK_2(0x80000000, 3),
    Treasure(0x40000000, 3),//寶藏
    AddEffect(0x20000000, 3),
    //0x10000000, 3
    Invincible(0x8000000, 3, true),//不可戰勝
    Explosion(0x4000000, 3),//爆炸
    HangOver(0x2000000, 3),//掛起
    UNK83(0x1000000, 3),
    //0x800000, 3
    Burned(0x400000, 3, true),//燃燒
    BalogDisable(0x200000, 3, true),//
    ExchangeAttack(0x100000, 3, true),//交換攻擊
    AddBuffStat(0x80000, 3, true),//增加buff屬性
    LinkTeam(0x40000, 3, true),//連接隊伍
    SoulExplosion(0x20000, 3, true),//靈魂爆炸
    SeperateSoulP(0x10000, 3, true),//分離靈魂p
    SeperateSoulC(0x8000, 3, true),//分離靈魂c
    Ember(0x4000, 3, true),//灰燼
    TrueSight(0x2000, 3, true),//真實視野
    Unk_2(0x1000, 3, true),
    Laser(0x800, 3, true),//激光
    StatResetSkill(0x400, 3, true),
    NEWUNK96(0x200, 3, true),
    NEWUNK97(0x100, 3, true),
    NEWUNK98(0x80, 3, true),
    NEWUNK99(0x40, 3, true),
    NEWUNK100(0x20, 3, true),
    NEWUNK101(0x10, 3, true),
    NEWUNK102(0x8, 3, true),
    Unk_163_Add_107(0x4, 3, true),
    Unk_232_Add_1(0x2, 3, true),
    NONE(0, 0);

    private static final long serialVersionUID = 0L;
//    private final int i;
    private final int position;
    private final boolean isDefault;
    private final int value;

    MonsterStatus(int value, int position) {
//        this.i = value;
        this.position = position;
//        this.i = 1 << 31 - value % 32;
//        this.position = (int) Math.floor(value / 32);
        this.isDefault = false;
        this.value = value;
    }

    MonsterStatus(int value, int position, boolean isDefault) {
//        this.i = value;
        this.position = position;
//        this.i = 1 << 31 - value % 32;
//        this.position = (int) Math.floor(value / 32);
        this.isDefault = isDefault;
        this.value = value;
    }

    public static int genericSkill(MonsterStatus stat) {
        switch (stat) {
            case Stun: {
                return 90001001;
            }
            case Speed: {
                return 90001002;
            }
            case Poison: {
                return 90001003;
            }
            case PCounter: {
                return 90001004;
            }
            case Seal: {
                return 90001005;
            }
            case MagicCrash: {
                return 1111007;
            }
            case Darkness: {
                return 4121003;
            }
            case Venom: {
                return 5211004;
            }
            case Ambush: {
                return 4121004;
            }
            case Explosion: {
                return 傑諾.三角列陣;
            }
        }
        return 0;
    }

    @Override
    public int getPosition() {
        return position;
    }

    public boolean isDefault() {
        return isDefault;
    }

    @Override
    public int getValue() {
        return value;
    }

    public Integer getOrder() {
        return position;
    }

    public boolean isIndieStat() {
        return ordinal() < PAD.ordinal() || this == Burned;
    }

    @Override
    public String toString() {
        return name() + "(0x" + Integer.toHexString(value) + ", " + position + ")";
    }
}
