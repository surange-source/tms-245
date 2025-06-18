package server.life;

import client.MapleCharacter;
import client.status.MonsterEffectHolder;
import client.status.MonsterStatus;
import configs.Config;
import constants.GameConstants;
import constants.enums.MonsterSkillType;
import handling.opcode.SendPacketOpcode;
import packet.MobPacket;
import server.buffs.MapleStatEffect;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.field.BossWillField;
import tools.Pair;
import tools.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.List;
import java.util.*;

public class MobSkill extends MapleStatEffect {

    private final int skillId;
    private final int skillLevel;
    private int mobMpCon;
    private int summonEffect;
    private int mobHp;
    private int x;
    private int y;
    private int duration;
    private long cooltime;
    private float prop;
    private short limit;
    private List<Integer> toSummon = new ArrayList<>();
    private Point lt, rb, lt2, rb2;
    private boolean summonOnce;
    private int areaSequenceDelay;
    private int skillAfter;
    private int force, forcex;
    private int w;
    private int z;
    private int emotion = -1;
    private List<Point> fixedPos = new ArrayList<>();

    public MobSkill(int skillId, int level) {
        this.skillId = skillId;
        this.skillLevel = level;
    }

    public void setSummonOnce(boolean o) {
        this.summonOnce = o;
    }

    public boolean isSummonOnce() {
        return summonOnce;
    }

    public void setSummons(List<Integer> toSummon) {
        this.toSummon = toSummon;
    }

    public void setMobHp(int mobHp) {
        this.mobHp = mobHp;
    }

    @Override
    public int getProp() {
        return (int) (prop * 100);
    }

    public void setProp(float prop) {
        this.prop = prop;
    }

    public void setLtRb(Point lt, Point rb) {
        this.lt = lt;
        this.rb = rb;
    }

    public void setLtRb2(Point lt2, Point rb2) {
        this.lt2 = lt2;
        this.rb2 = rb2;
    }

    public boolean checkCurrentBuff(MapleCharacter player, MapleMonster monster) {
        boolean stop = false;
        switch (skillId) {
            case 100:
            case 110:
            case 150:
                stop = monster.isBuffed(MonsterStatus.PowerUp);
                break;
            case 101:
            case 111:
            case 151:
                stop = monster.isBuffed(MonsterStatus.MagicUp);
                break;
            case 102:
            case 112:
            case 152:
                stop = monster.isBuffed(MonsterStatus.PGuardUp);
                break;
            case 103:
            case 113:
            case 153:
                stop = monster.isBuffed(MonsterStatus.MGuardUp);
                break;
            //154-157, don't stop it
            case 140:
            case 141:
            case 142:
            case 143:
            case 144:
            case 145:
                stop = monster.isBuffed(MonsterStatus.HardSkin)
                        || monster.isBuffed(MonsterStatus.MImmune)
                        || monster.isBuffed(MonsterStatus.PCounter)
                        || monster.isBuffed(MonsterStatus.PImmune)
                        || monster.isBuffed(MonsterStatus.MCounter)
                        || monster.isBuffed(MonsterStatus.Dazzle)
                        || monster.isBuffed(MonsterStatus.SealSkill);
                break;
            case 200:
                stop = player.getMap().getMobSizeByID() >= limit;
                break;
        }
        stop |= monster.isBuffed(MonsterStatus.MagicCrash);
        return stop;
    }

    /*
     * 怪物BUFF解釋
     * 100 = 物理攻擊提高
     * 101 = 魔法攻擊提高
     * 102 = 物理防禦提高
     * 103 = 魔法防禦提高
     * 104 = 致命攻擊 難道就是血藍為1？
     * 105 = 消費
     * 110 = 周邊物理攻擊提高
     * 111 = 周邊魔法攻擊提高
     * 112 = 周邊物理防禦提高
     * 113 = 周邊魔法防禦提高
     * 114 = HP恢復
     * 115 = 自己及周圍移動速度變化
     * 120 = 封印
     * 121 = 黑暗
     * 122 = 虛弱
     * 123 = 暈眩
     * 124 = 詛咒
     * 125 = 中毒
     * 126 = 慢動作
     * 127 = 魔法無效
     * 128 = 誘惑
     * 129 = 逐出
     * 131 = 區域中毒
     * 133 = 不死化
     * 134 = 藥水停止
     * 135 = 從不停止
     * 136 = 致盲
     * 137 = 中毒
     * 138 = 潛在能力無效
     * 140 = 物理防禦
     * 141 = 魔法防禦
     * 142 = 皮膚硬化
     * 143 = 物理反擊免疫
     * 144 = 魔法反擊免疫
     * 145 = 物理魔法反擊免疫
     * 150 = PAD修改
     * 151 = MAD修改
     * 152 = PDD修改
     * 153 = MDD修改
     * 154 = ACC修改
     * 155 = EVA修改
     * 156 = Speed修改
     * 170 = 傳送
     * 200 = 召喚
     */
    public void applyEffect(MapleCharacter player, MapleMonster monster, int effectAfter) {
        boolean b = getLt() != null && getRb() != null;
        Rectangle rectangle = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        Point pos = new Point(monster.getPosition());

        if (player.isDebug()) {
            player.dropDebugMessage(3, "[Mob Skill] " + this.toString());
        }
        Map<MonsterStatus, Integer> stats = new EnumMap<>(MonsterStatus.class);
        List<Integer> reflection = new LinkedList<>();

        int level = getLevel();
        switch (skillId) {
            case 105: {
                if (b) {
                    List<MapleMapObject> objects = monster.getMap().getMapObjectsInRect(rectangle, Collections.singletonList(MapleMapObjectType.MONSTER));
                    for (MapleMapObject mons : objects) {
                        if (monster.isAlive() && mons.getObjectId() != monster.getObjectId() && !((MapleMonster) mons).isSpongeMob()) {
                            player.getMap().killMonster((MapleMonster) mons, player, true, false, (byte) 1, 0);
                            monster.healHPMP(getX(), getY());
                            break;
                        }
                    }
                    break;
                }
                if (monster.isAlive() && !monster.isSpongeMob()) {
                    monster.healHPMP(getX(), getY());
                }
                break;
            }
            case 114: {//HP恢復
                if (b) {
                    List<MapleMapObject> objects = monster.getMap().getMapObjectsInRect(rectangle, Collections.singletonList(MapleMapObjectType.MONSTER));
                    for (MapleMapObject mons : objects) {
                        if (((MapleMonster) mons).isAlive() && !((MapleMonster) mons).isSpongeMob()) {
                            ((MapleMonster) mons).healHPMP(getX(), getY());
                            monster.getMap().broadcastMessage(MobPacket.MobAffected(mons.getObjectId(), skillId), mons.getPosition());
                        }
                    }
                    break;
                }
                if (monster.isAlive() && !monster.isSpongeMob()) {
                    monster.healHPMP(getX(), getY());
                }
                break;
            }
            case 127: { //驅散玩家BUFF 魔法無效？
                List<MapleMapObject> objects = monster.getMap().getMapObjectsInRect(rectangle, Collections.singletonList(MapleMapObjectType.PLAYER));
                for (MapleMapObject object : objects) {
                    ((MapleCharacter) object).removeBuffs(true);
                }
                break;
            }
            case 129: {// 逐出?控制玩家?Banish
                List<BanishInfo> infos = monster.getStats().getBanishInfo();
                if (!infos.isEmpty()) {
                    BanishInfo info = infos.get(Randomizer.nextInt(infos.size()));
                    if (info != null) {
                        for (MapleCharacter chr : getPlayersInRange(monster, player)) {
                            if (!chr.hasBlockedInventory()) {
                                chr.changeMapBanish(info.getMap(), info.getPortal(), info.getMsg());
                            }
                        }
                    }
                }
                break;
            }
            case 131: {// 區域中毒 烏賊怪 殘暴炎魔 馱狼雪人
                pos = monster.getMap().getRandomPos(monster.getPosition());
                switch (level) {
                    case 25:
                    case 26:
                    case 27:
                        pos = new Point(400, -30);
                        rectangle = calculateBoundingBox(pos);
                        break;
                }
                break;
            }
            case 176: {
                switch (level) {
                    case 25:
                    case 26: {
                        player.getMap().broadcastMessage(player, MobPacket.MobAttackBlock(monster.getObjectId(), 0), true);
                        player.getMap().broadcastMessage(player, MobPacket.showMobSkillDelay(monster.getObjectId(), this, effectAfter + 100, Collections.emptyList()), true);
                        break;
                    }
                    case 27: {
                        player.getMap().broadcastMessage(player, MobPacket.MobAttackBlock(monster.getObjectId(), 0), true);
                        player.getMap().broadcastMessage(player, MobPacket.showMobSkillDelay(monster.getObjectId(), this, effectAfter + 100, Collections.emptyList()), true);
                        break;
                    }
                    case 70: {
                        player.getMap().showScreenEffect("Skill/MobSkill.img/176/level/40/screen");
                        break;
                    }
                }
                break;
            }
            case 200: //召喚怪物
                for (Integer mobId : getSummons()) {
                    MapleMonster toSpawn = MapleLifeFactory.getMonster(GameConstants.getCustomSpawnID(monster.getId(), mobId));
                    if (toSpawn == null) {
                        continue;
                    }
                    switch (monster.getMap().getId()) {
                        case 220080001:
                        case 230040420: {
                            pos = monster.getMap().getRandomPos(monster.getPosition());
                            break;
                        }
                    }
                    monster.getMap().spawnMonsterWithEffect(toSpawn, getSummonEffect(), pos);
                }
                break;
            case 201: {
                effectAfter = 0;
                int n5 = 0;
                boolean b3 = false;
                int n6 = 0;
                for (Integer summon : getSummons()) {
                    n5 += player.getMap().getMobSizeByID(summon);
                }
                if (getLimit() > 0 && n5 >= getLimit()) {
                    break;
                }
                for (final Integer toSummon : this.getSummons()) {
                    MapleMonster monster2 = MapleLifeFactory.getMonster(GameConstants.getCustomSpawnID(monster.getId(), toSummon));
                    if (monster2 == null) continue;
                    boolean b4 = true;
                    int n8 = (int) monster.getPosition().getX();
                    int n9 = (int) monster.getPosition().getY();
                    int n11 = 0;
                    int n12 = 35;
                    switch (toSummon) {
                        case 8950007:
                        case 8950107: {
                            n8 = -404;
                            n9 = -400;
                            monster2.setStance(2);
                            break;
                        }
                        case 8950003:
                        case 8950103: {
                            n8 = 423;
                            n9 = -400;
                            break;
                        }
                        case 8950004:
                        case 8950104: {
                            n8 = 505;
                            n9 = -230;
                            break;
                        }
                        case 8950005:
                        case 8950105: {
                            n8 = -514;
                            n9 = -230;
                            monster2.setStance(2);
                            break;
                        }
                        case 8900000:
                        case 8900001:
                        case 8900002:
                        case 8900100:
                        case 8900101:
                        case 8900102: {
                            effectAfter = 1;
                            break;
                        }
                        case 8920000:
                        case 8920001:
                        case 8920002:
                        case 8920003:
                        case 8920100:
                        case 8920101:
                        case 8920102:
                        case 8920103: {
                            if (System.currentTimeMillis() - monster.getTransTime() > 30000L) {
                                monster2.setTransTime(System.currentTimeMillis());
                                monster.setTransTime(System.currentTimeMillis());
                                effectAfter = 1;
                                break;
                            }
                            continue;
                        }
                        default: {
                            if (!getFixedPos().isEmpty() && getFixedPos().size() > n6) {
                                n8 = getFixedPos().get(n6).x;
                                n9 = getFixedPos().get(n6).y;
                                break;
                            }
                            break;
                        }
                    }
                    ++n6;
                    if ((level >= 213 && level <= 222) || (level >= 225 && level <= 228) || (level >= 201 && level <= 209) || level == 196 || level == 223) {
                        final Point randPoint = monster.getMap().getRandomPoint();
                        n8 = randPoint.x;
                        n9 = randPoint.y;
                    }
                    monster.getMap().spawnMonsterWithEffect(monster2, getSummonEffect(), new Point(n8, n9));
                    if (effectAfter == 0) {
                        continue;
                    }
                    monster2.setChangeHP(monster.getMaxHP());
                    monster2.setHp(monster.getHp());
                    monster2.setCurrentFh(monster.getCurrentFH());
                    monster2.setStance(monster.getStance());
                    if (monster.getEventInstance() == null) {
                        continue;
                    }
                    monster.getEventInstance().registerMonster(monster2);
                }
                if (effectAfter != 0) {
                    player.getMap().killMonster(monster, player, false, true, (byte)3, 0);
                    break;
                }
                break;
            }
            case 170:
            case 211:
            case 217:
            case 227:
            case 238:
            case 241: {
                player.send(MobPacket.showMobSkillDelay(monster.getObjectId(), this, effectAfter, Collections.emptyList()));
                break;
            }
            case 226: {
                final ArrayList<Rectangle> list = new ArrayList<>();
                for (int i = 0; i < 3; ++i) {
                    final int z = Randomizer.rand(170, 250);
                    list.add(calculateBoundingBox(new Point(monster.getPosition().x + (monster.isFacingLeft() ? (-z) : z) * (2 * i - 1), monster.getPosition().y), monster.isFacingLeft()));
                }
                player.getClient().announce(MobPacket.showMobSkillDelay(monster.getObjectId(), this, effectAfter, list));
                break;
            }
            case 223: {
                b = false;
                break;
            }
            case 230: {
                List<Rectangle> rectangles = player.getMap().getRandRect();
                rectangles.clear();
                final int abs = Math.abs(130);
                for (int j = 0; j < 10; ++j) {
                    final int z2 = Randomizer.rand(abs - 10, abs - 10);
                    rectangles.add(calculateBoundingBox(new Point((j % 2 == 0) ? (-654 + z2 * (j / 2)) : (651 - z2 * (j / 2)), monster.getPosition().y), monster.isFacingLeft()));
                }
                Collections.shuffle(rectangles);
                player.getMap().broadcastMessage(MobPacket.showMobSkillDelay(monster.getObjectId(), this, skillAfter, rectangles));
                break;
            }
            case 242: {
                if (!(player.getMap() instanceof BossWillField)) {
                    break;
                }
                BossWillField map = (BossWillField) player.getMap();
                final int n10 = map.getFieldType() - 182;
                boolean b2 = false;
                switch (level) {
                    case 14: {
                        if (Randomizer.nextBoolean() && !monster.isBuffed(MonsterStatus.PCounter)) {
                            b2 = true;
                            MobSkillFactory.getMobSkill(145, 42).applyMobSkillEffect(monster, getDuration());
                        }
                    }
                    case 1:
                    case 2:
                    case 3: {
                        final HashMap<Integer, Pair<Integer, Integer>> hashMap = new HashMap<>();
                        int dummy = 0;
                        switch (n10) {
                            case 0: {
                                dummy = ((monster.getId() % 2 == 1) ? map.getMob1() : map.getMob2());
                                break;
                            }
                            default: {
                                dummy = map.getDummy();
                                break;
                            }
                        }
                        for (int k = 0; k < 10; ++k) {
                            int n11;
                            if (k % 2 == 1) {
                                n11 = Randomizer.rand(-650, -325);
                                hashMap.put(monster.getMobCtrlSN() * 100 + k * 10 + 1, new Pair<>((1800 + k / 4 * 1800), n11));
                                hashMap.put(monster.getMobCtrlSN() * 100 + k * 10 + 2, new Pair<>((1800 + k / 4 * 1800), (n11 + Randomizer.rand(150, 300))));
                            }
                            else {
                                n11 = Randomizer.rand(0, 325);
                                hashMap.put(monster.getMobCtrlSN() * 100 + k * 10 + 1, new Pair<>((1800 + k / 4 * 1800), n11));
                                hashMap.put(monster.getMobCtrlSN() * 100 + k * 10 + 2, new Pair<>((1800 + k / 4 * 1800), (n11 + Randomizer.rand(150, 300))));
                            }
                            if (k % 4 == 0) {
                                hashMap.put(monster.getMobCtrlSN() * 100 + k * 10 + 3, new Pair<>((1800 + k / 4 * 1800), (n11 + Randomizer.rand(-620, 620))));
                            }
                        }
                        player.getMap().broadcastMessage(MobPacket.WillSkillAction(dummy, level, b2, getLt(), getRb(), hashMap), player.getPosition());
                        break;
                    }
                    case 12: {
                        final List<List<Point>> list2;
                        if ((list2 = BossWillField.BossWillConfig.get(0).get(n10)) != null) {
                            final List<Point> list4 = list2.get(Randomizer.nextInt(list2.size()));
                            int dummy2 = 0;
                            switch (n10) {
                                case 0: {
                                    dummy2 = ((monster.getId() % 2 == 1) ? map.getMob1() : map.getMob2());
                                    break;
                                }
                                default: {
                                    dummy2 = map.getDummy();
                                    break;
                                }
                            }
                            final Iterator<Point> iterator8 = list4.iterator();
                            while (iterator8.hasNext()) {
                                map.broadcastMessage(MobPacket.WillBeholder(dummy2, iterator8.next()), monster.getPosition());
                            }
                            map.broadcastMessage(MobPacket.WillBeholder(dummy2, true, new Rectangle(map.getLeft(), -2634, map.getRight(), -2019)), monster.getPosition());
                            break;
                        }
                        break;
                    }
                    case 5: {
                        map.broadcastMessage(MobPacket.WillSkillAction(map.getMob2()), monster.getPosition());
                        break;
                    }
                    case 4: {
                        player.getClient().announce(MobPacket.WillSkillAction(monster.getId(), Randomizer.nextBoolean() ? 0 : 6));
                        break;
                    }
                    case 10:
                    case 11:
                    case 15: {
                        final MapleMap map3 = player.getMap();
                        final MaplePacketLittleEndianWriter hh2;
                        (hh2 = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.WillSkillAction);
                        hh2.writeInt(8880341);
                        hh2.writeInt(242);
                        hh2.writeInt(level);
                        map3.broadcastMessage(hh2.getPacket(), player.getPosition());
                        break;
                    }
                }
                break;
            }
            default:
                if (Config.isDevelop()) {
                    player.dropMessage(5, "未處理的怪物技能 skillid : " + skillId + " sub : " + level);
                }
                break;
        }
        if (b) {
            for (MapleMapObject o : monster.getMap().getMapObjectsInRect(rectangle, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                applyMobSkillEffect((MapleMonster) o, getDuration());
            }
        } else {
            applyMobSkillEffect(monster, getDuration());
        }
        if (!getStatups().isEmpty()) {
            if (b) {
                for (MapleMapObject o : monster.getMap().getMapObjectsInRect(rectangle, Collections.singletonList(MapleMapObjectType.PLAYER))) {
                    unprimaryPassiveApplyTo((MapleCharacter) o);
                }
                return;
            }
            unprimaryPassiveApplyTo(player);
        }
    }

    private boolean applyMobSkillEffect(final MapleMonster monster, final int n) {
        if (monster != null && monster.isAlive() && !getMonsterStatus().isEmpty() && !monster.isBuffed(MonsterStatus.MagicCrash) && !monster.isBuffed(MonsterStatus.Freeze)) {
            final EnumMap<MonsterStatus, MonsterEffectHolder> statups = new EnumMap<>(MonsterStatus.class);
            for (final Map.Entry<MonsterStatus, Integer> entry : getMonsterStatus().entrySet()) {
                final MonsterEffectHolder holder = new MonsterEffectHolder(-1, 1, System.currentTimeMillis(), n, this);
                holder.value = entry.getValue();
                holder.moboid = monster.getSeperateSoulSrcOID();
                statups.put(entry.getKey(), holder);
            }
            if (!statups.isEmpty()) {
                monster.registerEffect(statups);
                Map<MonsterStatus, Integer> writeStatups = new LinkedHashMap<>();
                for (MonsterStatus stat : statups.keySet()) {
                    writeStatups.put(stat, -1);
                }
                monster.getMap().broadcastMessage(MobPacket.mobStatSet(monster, writeStatups), monster.getPosition());
            }
            return !statups.isEmpty();
        }
        return false;
    }

    @Override
    public int getSourceId() {
        return skillId;
    }

    @Override
    public int getLevel() {
        return skillLevel;
    }

    public int getMobMpCon() {
        return mobMpCon;
    }

    public void setMobMpCon(int mobMpCon) {
        this.mobMpCon = mobMpCon;
    }

    public List<Integer> getSummons() {
        return Collections.unmodifiableList(toSummon);
    }

    public int getSummonEffect() {
        return summonEffect;
    }

    public void setSummonEffect(int summonEffect) {
        this.summonEffect = summonEffect;
    }

    public int getMobHp() {
        return mobHp;
    }

    @Override
    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    @Override
    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    @Override
    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public long getCoolTime() {
        return cooltime;
    }

    public void setCoolTime(long cooltime) {
        this.cooltime = cooltime;
    }

    public Point getLt() {
        return lt;
    }

    public Point getRb() {
        return rb;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(short limit) {
        this.limit = limit;
    }

    public boolean makeChanceResult() {
        return prop >= 1.0 || Math.random() < prop;
    }

    public int getAreaSequenceDelay() {
        return areaSequenceDelay;
    }

    public void setAreaSequenceDelay(int areaSequenceDelay) {
        this.areaSequenceDelay = areaSequenceDelay;
    }

    public int getSkillAfter() {
        return skillAfter;
    }

    public void setSkillAfter(int skillAfter) {
        this.skillAfter = skillAfter;
    }

    public int getForce() {
        return force;
    }

    public void setForce(int force) {
        this.force = force;
    }

    public int getForcex() {
        return forcex;
    }

    public void setForcex(int forcex) {
        this.forcex = forcex;
    }

    private List<MapleCharacter> getPlayersInRange(MapleMonster monster, MapleCharacter player) {
        Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        List<MapleCharacter> players = new ArrayList<>();
        players.add(player);
        return monster.getMap().getPlayersInRectAndInList(bounds, players);
    }

    private List<MapleMapObject> getObjectsInRange(MapleMonster monster, MapleMapObjectType objectType) {
        Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        return monster.getMap().getMapObjectsInRect(bounds, Collections.singletonList(objectType));
    }

    public Point getLt2() {
        return lt2;
    }

    public Point getRb2() {
        return rb2;
    }

    public void setW(int w) {
        this.w = w;
    }

    public int getW() {
        return w;
    }

    public void setZ(int z) {
        this.z = z;
    }

    public int getZ() {
        return z;
    }

    @Override
    public int getAttackCount() {
        return 0;
    }

    public void setEmotion(int b) {
        this.emotion = b;
    }

    public int getEmotion() {
        return emotion;
    }

    @Override
    public String toString() {
        final MonsterSkillType fy = MonsterSkillType.getById(this.getSourceId());
        return "MobSkill:" + ((fy == null) ? "Unknow" : fy.name()) + "[" + this.getSourceId() + "] Level:" + this.getLevel();
    }

    public void setFixedPos(List<Point> fixedPos) {
        this.fixedPos = fixedPos;
    }

    public List<Point> getFixedPos() {
        return fixedPos;
    }
}
