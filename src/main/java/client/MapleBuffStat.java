package client;

import handling.Buffstat;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum MapleBuffStat implements Buffstat {
    IndiePAD(0, true),
    IndieMAD(1, true),
    IndiePDD(2, true),
    IndieMHP(3, true),
    IndieMHPR(4, true),
    IndieMMP(5, true),
    IndieMMPR(6, true),
    IndieACC(7, true),
    IndieEVA(8, true),
    IndieJump(9, true),
    IndieSpeed(10, true),
    IndieAllStat(11, true),
    IndieStatRBasic(12, true),
    IndieDodgeCriticalTime(13, true),
    IndieEXP(14, true),
    IndieBooster(15, true),
    IndieFixedDamageR(16, true),
    PyramidStunBuff(17, true),
    PyramidFrozenBuff(18, true),
    PyramidFireBuff(19, true),
    PyramidBonusDamageBuff(20, true),
    IndieRelaxEXP(21, true),
    IndieSTR(22, true),
    IndieDEX(23, true),
    IndieINT(24, true),
    IndieLUK(25, true),
    IndieDamR(26, true),
    IndieScriptBuff(27, true),
    IndieMDF(28, true),
    IndieAsrR(29, true),
    IndieTerR(30, true),
    IndieCr(31, true),
    IndiePDDR(32, true),
    IndieCD(33, true),
    IndieBDR(34, true),
    IndieStatR(35, true),
    IndieStance(36, true),
    IndieIgnoreMobpdpR(37, true),
    IndieEmpty(38, true),
    IndiePADR(39, true),
    IndieMADR(40, true),
    IndieCrMaxR(41, true),
    IndieEVAR(41, true),
    經驗獲得(43, true),
    // 44
    IndieDropRIncrease(45, true),
    IndiePMdR(46, true),
    // 47
    Indie_SPAWN_UNK_48(48, true),
    IndieForceJump(49, true),
    IndieForceSpeed(50, true),
    Indie_SPAWN_UNK_51(51, true),
    Indie_ExtraAttack(52, true),
    IndieSummoned(53, true),
    IndieCooldownR(54, true),
    IndieInvincible(55, true),
    SPAWN_UNK_56(56, true),
    IndieAllDamageReduce(57, true),
    IndieDamageRReduce(58, true),
    減少總迴避率(59, true),
    受擊傷增加(60, true),
    UNK55(61, true),
    SPAWN_UNK_62(62, true),
    IndieDamageReduce(63, true),
    // 64
    // 65
    IndiePowerGuard(66, true),
    // 67
    // 68
    IndieCurseDampening(69, true),
    // 70
    // 71
    // 72
    IndieIgnorePCounter(73, true),
    IndieShield(74, true),
    SPAWN_UNK_74(75, true),
    一般怪物傷害(76, true),
    SPAWN_UNK_76(77, true),
    IndieStatCount(78, true),
    PAD(79),
    PDD(80),
    MAD(81),
    ACC(82),
    EVA(83),
    Craft(84),
    Speed(85),
    Jump(86),
    MagicGuard(87),
    DarkSight(88),
    Booster(89),
    PowerGuard(90),
    MaxHP(91),
    MaxMP(92),
    Invincible(93),
    SoulArrow(94),
    Stun(95),
    Poison(96),
    Seal(97),
    Darkness(98),
    ComboCounter(99),
    祝福之鎚(100),
    強化祝福之鎚(101),
    WeaponCharge(102),
    HolySymbol(103),
    MesoUp(104),
    ShadowPartner(105),
    妙手術(106),
    PickPocket(107),
    MesoGuard(108),
    Thaw(109),
    Weakness(110),
    Curse(111),
    Slow(112),
    Morph(113),
    Regen(114),
    BasicStatUp(115),
    Stance(116),
    SharpEyes(117),
    ManaReflection(118),
    Attract(119),
    NoBulletConsume(120),
    Infinity(121),
    AdvancedBless(122),
    IllusionStep(123),
    命中增加(124),
    Concentration(125),
    BanMap(126),
    MaxLevelBuff(127),
    UNK107(128),
    UNK108(129),
    MesoUpByItem(130),
    Ghost(131),
    Barrier(132),
    ReverseInput(133),
    ItemUpByItem(134),
    RespectPImmune(135),
    RespectMImmune(136),
    DefenseAtt(137),
    DefenseState(138),
    DojangBerserk(139),
    DojangInvincible(140),
    DojangShield(141),
    SoulMasterFinal(142),
    WindBreakerFinal(143),
    ElementalReset(144),
    HideAttack(145),
    EventRate(146),
    ComboAbilityBuff(147),
    ComboDrain(148),
    ComboBarrier(149),
    BodyPressure(150),
    RepeatEffect(151),
    ExpBuffRate(152),
    StopPortion(153),
    StopMotion(154),
    Blind(155),
    HiddenPieceOn(156),
    MagicShield(157),
    MagicResistance(158),
    SoulStone(159),
    Flying(160),
    Frozen(161),
    AssistCharge(162),
    Enrage(163),
    DrawBack(164),
    NotDamaged(165),
    FinalCut(166),
    HowlingAttackDamage(167),
    BeastFormDamageUp(168),
    Dance(169),
    EMHP(170),
    EMMP(171),
    EPAD(172),
    EMAD(173),
    EPDD(174),
    Guard(175),
    UNK153(176),
    UNK166(177),
    UNK167(178),
    JavelinDamage(179),
    // 180
    Sneak(181),
    Mechanic(182),
    BeastFormMaxHP(183),
    Dice(184),
    BlessingArmor(185),
    DamR(186),
    TeleportMasteryOn(187),
    CombatOrders(188),
    Beholder(189),
    DispelItemOption(190),
    Inflation(191),
    OnixDivineProtection(192),
    Web(193),
    Bless(194),
    DisOrder(195),
    Thread(196),
    Team(197),
    Explosion(198),
    TimeBomb(199),
    BuffLimit(200),
    STR(201),
    INT(202),
    DEX(203),
    LUK(204),
    DispelItemOptionByField(205),
    DarkTornado(206),
    PVPDamage(207),
    PvPScoreBonus(208),
    PvPInvincible(209),
    PvPRaceEffect(210),
    WeaknessMdamage(211),
    Frozen2(212),
    PVPDamageSkill(213),
    AmplifyDamage(214),
    Shock(215),
    InfinityForce(216),
    IncMaxHP(217),
    IncMaxMP(218),
    HolyMagicShell(219),
    KeyDownTimeIgnore(220),
    ArcaneAim(221),
    MasterMagicOn(222),
    AsrR(223),
    TerR(224),
    DamAbsorbShield(225),
    DevilishPower(226),
    Roulette(227),
    SpiritLink(228),
    AsrRByItem(229),
    Event(230),
    CriticalBuff(231),
    DropRate(232),
    PlusExpRate(233),
    ItemInvincible(234),
    Awake(235),
    ItemCritical(236),
    ItemEvade(237),
    Event2(238),
    VampiricTouch(239),
    DDR(240),
    IncTerR(241),
    IncAsrR(242),
    DeathMark(243),
    UsefulAdvancedBless(244),
    Lapidification(245),
    VenomSnake(246),
    CarnivalAttack(247),
    CarnivalDefence(248),
    CarnivalExp(249),
    SlowAttack(250),
    PyramidEffect(251),
    HollowPointBullet(252),
    KeyDownMoving(253),
    IgnoreTargetDEF(254),
    ReviveOnce(255),
    Invisible(256),
    EnrageCr(257),
    EnrageCrDamMin(258),
    Judgement(259),
    DojangLuckyBonus(260),
    PainMark(261),
    Magnet(262),
    MagnetArea(263),
    追蹤箭頭(264),
    UNK250(265),
    祝福標誌(266),
    元素精靈(267),
    UNK_T146_ADD_256(268),
    戰鬥的流動(269),
    SKILL_STAGE(270),
    UNK_238_ADD_272(271),
    UNK_238_ADD_273(272),
    // 273
    VampDeath(274),
    BlessingArmorIncPAD(275),
    KeyDownAreaMoving(276),
    Larkness(277),
    StackBuff(278),
    BlessOfDarkness(279),
    AntiMagicShell(280),
    LifeTidal(281),
    HitCriDamR(282),
    SmashStack(283),
    PartyBarrier(284),
    ReshuffleSwitch(285),
    SpecialAction(286),
    VampDeathSummon(287),
    StopForceAtomInfo(288),
    SoulGazeCriDamR(289),
    SoulRageCount(290),
    PowerTransferGauge(291),
    AffinitySlug(292),
    Trinity(293),
    IncMaxDamage(294),
    BossShield(295),
    MobZoneState(296),
    GiveMeHeal(297),
    TouchMe(298),
    Contagion(299),
    ComboUnlimited(300),
    SoulExalt(301),
    IgnoreAllCounter(302),
    IgnorePImmune(303),
    IgnoreAllImmune(304),
    UNK274(305),
    UNK_229_ADD_303(306),
    FireAura(307),
    VengeanceOfAngel(308),
    HeavensDoor(309),
    Preparation(310),
    BullsEye(311),
    IncEffectHPPotion(312),
    IncEffectMPPotion(313),
    BleedingToxin(314),
    IgnoreMobDamR(315),
    Asura(316),
    滅世雷射光(317),
    暴能續發(318),
    UnityOfPower(319),
    Stimulate(320),
    ReturnTeleport(321),
    DropRIncrease(322),
    IgnoreMobpdpR(323),
    BdR(324),
    CapDebuff(325),
    Exceed(326),
    DiabolikRecovery(327),
    FinalAttackProp(328),
    ExceedOverload(329),
    OverloadCount(330),
    BuckShot(331),
    FireBomb(332),
    HalfstatByDebuff(333),
    SurplusSupply(334),
    SetBaseDamage(335),
    EVAR(336),
    NewFlying(337),
    AmaranthGenerator(338),
    OnCapsule(339),
    CygnusElementSkill(340),
    StrikerHyperElectric(341),
    EventPointAbsorb(342),
    EventAssemble(343),
    StormBringer(344),
    ACCR(345),
    DEXR(346),
    Albatross(347),
    Translucence(348),
    PoseType(349),
    LightOfSpirit(350),
    ElementSoul(351),
    GlimmeringTime(352),
    TrueSight(353),
    SoulExplosion(354),
    SoulMP(355),
    FullSoulMP(356),
    SoulSkillDamageUp(357),
    ElementalCharge(358),
    Restoration(359),
    CrossOverChain(360),
    ChargeBuff(361),
    Reincarnation(362),
    ReincarnationCount(363),
    ReincarnationMode(364),
    ChillingStep(365),
    DotBasedBuff(366),
    BlessEnsenble(367),
    ComboCostInc(368),
    ExtremeArchery(369),
    NaviFlying(370),
    QuiverCatridge(371),
    UserControlMob(372),
    ImmuneBarrier(373),
    ArmorPiercing(374),
    CriticalGrowing(375),
    遺物形態(376),
    QuickDraw(377),
    BowMasterConcentration(378),
    TimeFastABuff(379),
    TimeFastBBuff(380),
    GatherDropR(381),
    AimBox2D(382),
    CursorSniping(383),
    UNK356(384),
    DebuffTolerance(385),
    DotHealHPPerSecond(386),
    DotHealMPPerSecond(387),
    SpiritGuard(388),
    PreReviveOnce(389),
    SetBaseDamageByBuff(390),
    LimitMP(391),
    ReflectDamR(392),
    ComboTempest(393),
    MHPCutR(394),
    MMPCutR(395),
    SelfWeakness(396),
    ElementDarkness(397),
    FlareTrick(398),
    Ember(399),
    Dominion(400),
    SiphonVitality(401),
    DarknessAscension(402),
    BossWaitingLinesBuff(403),
    DamageReduce(404),
    ShadowServant(405),
    ShadowIllusion(406),
    KnockBack(407),
    AddAttackCount(408),
    ComplusionSlant(409),
    JaguarSummoned(410),
    JaguarCount(411),
    SSFShootingAttack(412),
    DevilCry(413),
    ShieldAttack(414),
    DarkLighting(415),
    AttackCountX(416),
    BMageDeath(417),
    BombTime(418),
    NoDebuff(419),
    BattlePvP_Mike_Shield(420),
    BattlePvP_Mike_Bugle(421),
    XenonAegisSystem(422),
    AngelicBursterSoulSeeker(423),
    HiddenPossession(424),
    NightWalkerBat(425),
    NightLordMark(426),
    WizardIgnite(427),
    FireBarrier(428),
    ChangeFoxMan(429),
    神聖團結(430),
    惡魔狂亂(431),
    SpinesOfShadow(432),
    UNK430(433),
    HayatoStance(434),
    HayatoStanceBonus(435),
    COUNTE_RATTACK(436),
    柳身_攻擊傷害上昇(437),
    HayatoPAD(438),
    HayatoHPR(439),
    HayatoMPR(440),
    UNK438(441),
    // 442
    // 443
    迅速_減少敵人傷害(444),
    HayatoCr(445),
    HAKU_BLESS(446),
    KannaBDR(447),
    UNK545(448),
    UNK446(449),
    結界破魔(450),
    // 451
    培羅德束縛(452),
    AnimalChange(453),
    TeamRoar(454),
    // 455
    // 456
    // 457
    // 458
    UNK419(459),
    極樂之境(460),
    焰箭齊發(461),
    光與暗的洗禮(462),
    狂暴榴彈(463),
    // 464
    聖十字架(465),
    聯盟繩索(466),
    BattlePvP_Helena_WindSpirit(467),
    BattlePvP_LangE_Protection(468),
    BattlePvP_LeeMalNyun_ScaleUp(469),
    BattlePvP_Revive(470),
    PinkbeanAttackBuff(471),
    PinkbeanRelax(472),
    PinkbeanRollingGrade(473),
    PinkbeanYoYoStack(474),
    RandAreaAttack(475),
    // 476
    NextAttackEnhance(477),
    AranCombotempastOption(478),
    NautilusFinalAttack(479),
    ViperTimeLeap(480),
    RoyalGuardState(481),
    RoyalGuardPrepare(482),
    MichaelSoulLink(483),
    MichaelStanceLink(484),
    TriflingWhimOnOff(485),
    AddRangeOnOff(486),
    KinesisPsychicPoint(487),
    KinesisPsychicOver(488),
    KinesisPsychicShield(489),
    KinesisIncMastery(490),
    KinesisPsychicEnergeShield(491),
    BladeStance(492),
    DebuffActiveSkillHPCon(493),
    DebuffIncHP(494),
    BowMasterMortalBlow(495),
    AngelicBursterSoulResonance(496),
    Fever(497),
    IgnisRore(498),
    RpSiksin(499),
    FixCoolTime(500),
    TeleportMasteryRange(501),
    AdrenalinBoost(502),
    AranSmashSwing(503),
    AranDrain(504),
    AranBoostEndHunt(505),
    HiddenHyperLinkMaximization(506),
    RWCylinder(507),
    RWCombination(508),
    RWMagnumBlow(509),
    神聖連發重擊(510),
    RWBarrier(511),
    RWBarrierHeal(512),
    RWMaximizeCannon(513),
    RWOverHeat(514),
    UsingScouter(515),
    RWMovingEvar(516),
    Stigma(517),
    瑪哈之疾(518),
    HeavensDoorCooldown(519),
    腎上腺動力源(520),
    DisableRune(521),
    追縱火箭(522),
    海之霸主(523),
    能量爆炸(524),
    神雷合一(525),
    槍彈盛宴(526),
    滿載骰子(527),
    聖靈祈禱(528),
    鏈之藝術_護佑(529),
    UNK486(530),
    UNK487(531),
    幻靈武具(532),
    超載魔力(533),
    熾天覆七重圓環(534),
    心靈龍捲風(535),
    散式投擲(536),
    狂風呼嘯(537),
    Bullet_Count(538),
    Bullet_Count2(539),
    滅殺刃影(540),
    // 541
    // 542
    UNK_240_ADD_543(543),
    黎明神盾_紫血(544),
    意志關懷(545),
    曉月流基本技(546),
    InnerStorm(547),
    UNK570(548),
    水槍大作戰陣營(549),
    水槍大作戰階級(550),
    水槍大作戰連擊(551),
    水槍大作戰效果(552),
    UNK575(553),
    UNK576(554),
    AriaShadowSword(555),
    ReduceMana(556),
    UNK497(557),
    UNK498(558),
    UNK_T146_ADD_511(559),
    突擊之盾(560),
    UNK562(561),
    EXP_CARD(562),
    怨靈解放陣(563),
    迎式神(564),
    UNK_220_566(565),
    艾爾達斯的祝福(566),
    艾爾達斯還原(567),
    // 568
    // 569
    旋風腳(570),
    UNK_220_567(571),
    分裂之矢(572),
    普力特的祝福(573),
    超載模式(574),
    聚光燈(575),
    UNK505(576),
    武器變換(577),
    榮耀之翼(578),
    致命暗殺_殺數點數(579),
    超速動能(580),
    虛無型態(581),
    必死決心(582),
    爆擊強化(583),
    UNK_T144_ADD_526(584),
    UNK_T144_ADD_527(585),
    UNK_T144_ADD_528(586),
    鋼鐵之軀(587),
    UNK514(588),
    UNK515(589),
    和諧連結(590),
    快速充能(591),
    // 592
    充能完成(593),
    // 594
    // 595
    UNK522(596),
    // 597
    // 598
    // 599
    幽靈侵蝕(600),
    侵蝕控制(601),
    純粹咒術子彈(602),
    火焰咒術子彈(603),
    疾風咒術子彈(604),
    深淵咒術子彈(605),
    逼近的死亡(606),
    戰鬥狂亂(607),
    充能技能增幅(608),
    無限技能(609),
    魔法迴路效能全開(610),
    無我(611),
    // 612
    // 613
    UNK540(614),
    // 615
    UNK542(616, true),
    HolyMagicShellCooldown(617),
    雷神槍擊(618),
    鬥氣本能(619),
    風之屏障(620),
    INFINITE_FLAME_CHARGE(621),
    魂光劍擊(622),
    幻影標記鎖定(623),
    幻影標記(624),
    // 625
    // 626
    // 627
    // 628
    // 629
    UNK_T144_ADD_573(630),
    // 631
    // 632
    // 633
    UNK_161_ADD_574(634),
    // 635
    UNK_161_ADD_576(636),
    UNK_161_ADD_577(637),
    UNK_222_635(638),
    // 639
    UNK_163_ADD_582(640),
    // 641
    DEMONIC_BLAST(642),
    遺跡計量(643),
    UNK_163_ADD_587(644),
    UNK_163_ADD_588(645),
    黑曜石屏障(646),
    UNK_163_ADD_590(647),
    UNK_163_ADD_591(648),
    UNK_240_ADD_650(649),
    UNK_240_ADD_651(650),
    UNK_240_ADD_652(651),
    // 653
    UNK_222_ADD_648(653),
    UNK_220_ADD_648(654),
    UNK_220_ADD_649(655),
    // 656
    // 657
    // 658
    UNK_220_ADD_653(659),
    UNK_220_ADD_654(660),
    虎影屬性(661),
    虎影道力(662),
    幻影分身符(663),
    極大分身亂舞(664),
    蝴蝶之夢(665),
    太乙仙丹(666),
    怪力亂神(667),
    實戰的知識(668),
    UNK_222_ADD_664(669),
    UNK_222_ADD_665(670),
    UNK_162_ADD_623(671),
    HoYoungHide(672),
    // 673
    AdeleCharge(674),
    AdeleCreateSwords(675),
    AdeleSwordBarrier(676),
    AdeleUnconscious(677),
    AdelePowerRecovery(678),
    AdeleNobleSpirit(679),
    AdeleResonance(680),
    PURIFICATION_RUNE(681),
    TRANSFER_RUNE(682),
    UNK_226_ADD_680(683),
    BMageAura(684),
    UNK_229_ADD_678(685),
    UNK_229_ADD_679(686),
    UNK_229_ADD_680(687),
    UNK_229_ADD_681(688),
    UNK_229_ADD_682(689),
    IceAura(690),
    KnightsAura(691),
    ZeroAuraStr(692),
    ZeroAuraSpd(693),
    化身(694),
    // 695
    亡靈(696),
    亡靈_受傷(697),
    殘影幻象(698),
    UNK_232_ADD_695(699),
    光子射線(700),
    UNK_232_ADD_697(701),
    // 702
    皇家騎士(703),
    // 704
    引力法則(705),
    連射十字弓砲彈(706),
    UNK_232_ADD_703(707),
    飛閃起爆符(708),
    // 709
    黑暗靈氣(710),
    武器變換終章(711),
    UNK_232_ADD_708(712),
    UNK_229_ADD_699(713),
    // 714
    遺跡解放_釋放(715),
    // 716
    // 717
    MaliceCharge(718),
    主導(719),
    // 720
    死亡降臨(721),
    殘留憤恨(722),
    掌握痛苦_垂死(723),
    龍炸裂(724),
    // 725
    // 726
    // 727
    事前準備(728),
    // 729
    // 730
    // 731
    // 732
    // 733
    // 734
    UNK_238_ADD_735(735),
    UNK_238_ADD_736(736),
    UNK_238_ADD_737(737),
    // 738
    // 739
    // 740
    // 741
    龍脈讀取(742),
    山之種子(743),
    山不敗(744),
    吸收_潑江水(745),
    吸收_凜冽的寒風(746),
    吸收_陽光之力(747),
    自由龍脈(748),
    // 749
    // 750
    大自然夥伴_計數(751),
    龍脈的痕跡(752),
    // 753
    海龍(754),
    海龍石(755),
    海龍螺旋(756),
    覺醒之箭(757),
    撫慰甘露(758),
    傷痕之劍(759),
    IceVortex(760),
    神聖之水(761),
    勝利之羽(762),
    閃光幻象(763),
    神聖之血(764),
    // 765
    UNK_229_ADD_700(766),
    // 767
    護身強氣(768),
    臨機應變(769),
    大鬼封魂陣(770),
    好戲上場(771),
    全集中守護(772),
    UNK_738(773),
    // 774
    DashSpeed(775, true),
    DashJump(776, true),
    RideVehicle(777, true),
    PartyBooster(778, true),
    GuidedBullet(779, true),
    Undead(780, true),
    UNK_681(781, true),
    RideVehicleExpire(782, true),
    遺跡能量(783, true),
    AdeleCurse(784, true),
    ;

    private int value;
    private int pos;
    public int stat;
    private boolean stacked = false;

    MapleBuffStat(int value) {
        this.stat = value;
        this.value = 1 << 31 - value % 32;
        this.pos = (int) Math.floor(value / 32);
    }

    MapleBuffStat(int value, boolean stacked) {
        this.stat = value;
        this.value = 1 << 31 - value % 32;
        this.pos = (int) Math.floor(value / 32);
        this.stacked = stacked;
    }

    public static Map<MapleBuffStat, Integer> getSpawnList() {
        HashMap<MapleBuffStat, Integer> SpawnStatsList = new HashMap<>();
        SpawnStatsList.put(Indie_SPAWN_UNK_48, 0);
        SpawnStatsList.put(Indie_SPAWN_UNK_51, 0);
        SpawnStatsList.put(IndieSummoned, 0);
        SpawnStatsList.put(IndieInvincible, 0);
        SpawnStatsList.put(SPAWN_UNK_56, 0);
        SpawnStatsList.put(IndieDamageRReduce, 0);
        SpawnStatsList.put(SPAWN_UNK_62, 0);
        SpawnStatsList.put(IndieShield, 0);
        SpawnStatsList.put(SPAWN_UNK_74, 0);
        SpawnStatsList.put(一般怪物傷害, 0);
        SpawnStatsList.put(SPAWN_UNK_76, 0);
        SpawnStatsList.put(BlessingArmor, 0);
        SpawnStatsList.put(PyramidEffect, 0);
        SpawnStatsList.put(聯盟繩索, 0);
        SpawnStatsList.put(BattlePvP_LangE_Protection, 0);
        SpawnStatsList.put(PinkbeanRollingGrade, 0);
        SpawnStatsList.put(AdrenalinBoost, 0);
        SpawnStatsList.put(RWBarrier, 0);
        SpawnStatsList.put(心靈龍捲風, 0);
        SpawnStatsList.put(UNK522, 0);
        SpawnStatsList.put(UNK_163_ADD_582, 0);
        SpawnStatsList.put(UNK_163_ADD_587, 0);
        SpawnStatsList.put(DashSpeed, 0);
        SpawnStatsList.put(DashJump, 0);
        SpawnStatsList.put(RideVehicle, 0);
        SpawnStatsList.put(PartyBooster, 0);
        SpawnStatsList.put(GuidedBullet, 0);
        SpawnStatsList.put(Undead, 0);
        SpawnStatsList.put(UNK_681, 0);
        SpawnStatsList.put(RideVehicleExpire, 0);
        SpawnStatsList.put(遺跡能量, 0);
        SpawnStatsList.put(AdeleCurse, 0);
        return SpawnStatsList;
    }

    @Override
    public int getPosition() {
        return pos;
    }

    @Override
    public int getValue() {
        return value;
    }

    public boolean canStack() {
        return stacked;
    }

    @Override
    public String toString() {
        return name() + "(" + stat + ")";
    }

    public static MapleBuffStat getByValue(int value) {
        return Arrays.stream(values()).filter(it -> it.stat == value).findFirst().orElse(null);
    }

    public boolean isNormalDebuff() {
        switch (this) {
            case Seal:
            case Darkness:
            case Weakness:
            case Curse:
            case Poison:
            case Slow:
            case StopPortion:
            case DispelItemOption:
            case Blind:
            case IndieJump:
                return true;
        }
        return false;
    }

    public boolean isCriticalDebuff() {
        switch (this) {
            case Stun:
            case Attract:
            case ReverseInput:
            case BanMap:
            case Lapidification:
            case Morph:
            case DarkTornado:
            case Frozen:
                return true;
        }
        return false;
    }

    public static void main(String[] args) {
        //设置迁移量
        for (MapleBuffStat stat : values()) {
            stat.change();
        }
        //打印
        for (int i = 0; i <= values()[values().length - 1].stat; i++) {
            MapleBuffStat stat = getByValue(i);
            if (stat != null) {
                System.out.println(stat.name() + "(" + stat.stat + (stat.stacked ? ", true)," : "),"));
            } else {
                System.out.println("\t// " + i);
            }
        }
    }

    private void change() {
        int change = 0;
        if (stat >= 64 && stat <= 690) {
            change = 1;
        } else if (stat >= 691 && stat <= 718) {
            change = 2;
        } else if (stat >= 719) {
            change = 13;
        }

        stat += change;
    }

}
