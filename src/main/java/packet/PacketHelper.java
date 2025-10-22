package packet;

import client.*;
import client.inventory.*;
import client.skills.InnerSkillEntry;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import configs.ServerConfig;
import constants.BurningChrConstants;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.skills.凱撒;
import constants.skills.幻影俠盜;
import constants.skills.陰陽師;
import server.MapleItemInformationProvider;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.shop.*;
import server.shops.AbstractPlayerStore;
import server.shops.IMaplePlayerShop;
import tools.*;
import tools.types.*;
import tools.data.MaplePacketLittleEndianWriter;

import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.IntStream;

import server.shops.MapleMiniGame;
import tools.data.MaplePacketReader;

public class PacketHelper {

    public static final long MAX_TIME = 150842304000000000L; //00 80 05 BB 46 E6 17 02
    public static final long ZERO_TIME = 94354848000000000L; //00 40 E0 FD 3B 37 4F 01
    public static final long PERMANENT = 150841440000000000L; //00 C0 9B 90 7D E5 17 02

    public static long getKoreanTimestamp(long realTimestamp) {
        return realTimestamp * 10000 + 116444592000000000L;
    }

    public static long getTime(long realTimestamp) {
        if (realTimestamp == -1) {
            return MAX_TIME; //00 80 05 BB 46 E6 17 02
        } else if (realTimestamp == -2) {
            return ZERO_TIME; //00 40 E0 FD 3B 37 4F 01
        } else if (realTimestamp == -3) {
            return PERMANENT; //00 C0 9B 90 7D E5 17 02
        }
        return DateUtil.getFileTimestamp(realTimestamp);
    }

    /*
     * 藥劑罐信息
     */
    public static void addPotionPotInfo(MaplePacketLittleEndianWriter mplew, MaplePotionPot potionPot) {
        mplew.writeInt(potionPot.getItmeId());
        mplew.writeInt(potionPot.getChrId());
        mplew.writeInt(potionPot.getMaxValue());
        mplew.writeInt(potionPot.getHp());
        mplew.writeInt(potionPot.getMp());
        mplew.writeLong(getTime(potionPot.getStartDate()));
        mplew.writeLong(getTime(potionPot.getEndDate()));
    }

    public static void addCharStats(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(chr.getId()); // 角色ID
        mplew.writeInt(chr.getId());
        mplew.writeInt(chr.getWorld());
        mplew.writeAsciiString(chr.getName(), 15); //角色名字

        mplew.write(chr.getGender()); // 性別 (0 = 男, 1 = 女)
        mplew.write(0); // unk
        mplew.write(chr.getSkinColor()); // 皮膚
        mplew.writeInt(chr.getFace()); // 臉型
        mplew.writeInt(chr.getHair()); // 髮型
        mplew.write(chr.getHairBaseColor());
        mplew.write(chr.getHairMixedColor());
        mplew.write(chr.getHairProbColor());

        mplew.writeInt(chr.getLevel()); // 等級 byte->int v.156
        mplew.writeShort(chr.getJob()); // 職業
        chr.getStat().connectData(mplew);// 4 short + 4 int
        mplew.writeShort(chr.getRemainingAp()); // remaining ap
        addCharSP(mplew, chr);
        mplew.writeLong(chr.getExp()); // 經驗 V.110修改 以前為Int
        mplew.writeInt(chr.getFame()); // 人氣
        mplew.writeInt(JobConstants.is神之子(chr.getJob()) ? chr.getWeaponPoint() : chr.getGachExp());  // 神之子WP
        mplew.writeLong(0);
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        mplew.writeInt(chr.getMapId()); // 當前地圖ID
        mplew.write(chr.getInitialSpawnpoint()); // spawnpoint
        mplew.writeShort(chr.getSubcategory()); // 1 here = db, 2 = cannoner
        if (chr.hasDecorate()) {
            mplew.writeInt(chr.getDecorate()); // 魔族之紋
        }
        mplew.write(0);//V229
        mplew.writeLong(0);//V229
        mplew.writeShort(chr.getFatigue());//V.144修改 以前為byte
        mplew.writeInt(DateUtil.getTime()); // 年月日時
        /*
         * 傾向系統
         * 領袖氣質 感性 洞察力 意志 手技 魅力
         * charisma, sense, insight, volition, hands, charm;
         */
        for (MapleTraitType t : MapleTraitType.values()) {
            mplew.writeInt(chr.getTrait(t).getTotalExp());
        }
        for (MapleTraitType t : MapleTraitType.values()) {
            mplew.writeInt(0);
        }
        mplew.write(0);
        mplew.writeLong(getTime(-2));
        /*
         * 大亂鬥
         */
        mplew.writeInt(chr.getStat().pvpExp); //pvp exp
        mplew.write(chr.getStat().pvpRank); //pvp rank
        mplew.writeInt(chr.getBattlePoints()); //pvp points
        mplew.write(6);//chr.getValue()
        mplew.write(7); //未知

        mplew.writeInt(0);
        mplew.writeInt(0);

        //chr.getCharacterCard().connectData(mplew); //角色卡 12*9 個字節
        mplew.writeReversedLong(getTime(System.currentTimeMillis()));

        mplew.writeLong(getTime(chr.getBurningChrTime() > 0 ? System.currentTimeMillis() : -1L));
        mplew.writeLong(getTime(chr.getBurningChrTime()));
        mplew.writeInt(chr.getBurningChrType() > BurningChrConstants.無 ? 10 : 0);
        mplew.writeInt(chr.getBurningChrType() == BurningChrConstants.燃燒加速器 ? 130 : chr.getBurningChrType() == BurningChrConstants.超級燃燒 ? 150 : chr.getBurningChrType() == BurningChrConstants.極限燃燒 ? 200 : 0);
        mplew.writeInt(0);
        mplew.write(chr.getBurningChrType());

        mplew.writeBool(false);//V.160 new
        mplew.writeZeroBytes(25);
        mplew.write(0);
        mplew.write(0);
        mplew.write(0);
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(0);//V.164 new
    }

    public static void addCharSP(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        if (JobConstants.isSeparatedSpJob(chr.getJob())) {
            mplew.write(chr.getRemainingSpSize());
            for (int i = 0; i < chr.getRemainingSps().length; i++) {
                if (chr.getRemainingSp(i) > 0) {
                    mplew.write(i + 1);
                    mplew.writeInt(chr.getRemainingSp(i));
                }
            }
        } else if (JobConstants.is影武者(chr.getJob())) {
            int sp1 = 0, sp2 = 0;
            List<Pair<Integer, Integer>> splist = new ArrayList<>();
            for (int i = 0; i < chr.getRemainingSps().length; i++) {
                if (i < 2) {
                    sp1 += chr.getRemainingSp(i);
                    if (i == 1 && sp1 > 0) {
                        splist.add(new Pair<>(0, sp1));
                        splist.add(new Pair<>(1, sp1));
                    }
                } else if (i < 4) {
                    sp2 += chr.getRemainingSp(i);
                    if (i == 3 && sp2 > 0) {
                        splist.add(new Pair<>(2, sp2));
                        splist.add(new Pair<>(3, sp2));
                    }
                } else if (chr.getRemainingSp(i) > 0) {
                    splist.add(new Pair<>(i, chr.getRemainingSp(i)));
                }
            }
            mplew.write(splist.size());
            for (Pair<Integer, Integer> sp : splist) {
                if (sp.right > 0) {
                    mplew.write(sp.left + 1);
                    mplew.writeInt(sp.right);
                }
            }
        } else {
            mplew.writeShort(chr.getRemainingSp());
        }
    }

    public static void addPartTimeJob(MaplePacketLittleEndianWriter mplew, MaplePartTimeJob parttime) {
        mplew.write(parttime.getJob());
        if (parttime.getJob() > 0 && parttime.getJob() <= 5) {
            //mplew.writeHexString("6B E2 D0 01 30 C0 D4 DD");
            mplew.writeReversedLong(parttime.getTime());
        } else {
            mplew.writeReversedLong(getTime(-2));
        }
        mplew.writeInt(parttime.getReward());
        mplew.writeBool(parttime.getReward() > 0);
    }

    public static void addCharLook(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, boolean mega, boolean second) {
        boolean zero = JobConstants.is神之子(chr.getJob());
        mplew.write(zero && second ? 1 : chr.getGender());
        mplew.write(second ? chr.getSecondSkinColor() : chr.getSkinColor());
        mplew.writeInt(second ? chr.getSecondFace() : chr.getFace());
        mplew.writeInt(chr.getJob());
        mplew.write(mega ? 0 : 1);
        int mixBaseColor = second ? chr.getSecondHairBaseColor() : chr.getHairBaseColor();
        int hair = second ? chr.getSecondHair() : chr.getHair();
        if (mixBaseColor != -1) {
            hair = hair / 10 * 10 + mixBaseColor;
        }
        mplew.writeInt(hair);

        Map<Byte, Integer> myEquip = new LinkedHashMap<>();
        Map<Byte, Integer> maskedEquip = new LinkedHashMap<>();
        Map<Byte, Integer> totemEquip = new LinkedHashMap<>();
        Map<Byte, Integer> angelEquip = new LinkedHashMap<>();
        MapleInventory equip = chr.getInventory(MapleInventoryType.EQUIPPED);
        boolean angel = JobConstants.is天使破壞者(chr.getJob());

        for (Item item : equip.newList()) { //遍歷裝備列表
            int itemID = item.getItemId();
            if (item instanceof Equip && ((Equip) item).getItemSkin() > 0) {
                itemID = ((Equip) item).getItemSkin();
            }
            if (angel && second && item.getPosition() <= -1300 && item.getPosition() > -1310) {
                final byte b809;
                switch (b809 = (byte) (-item.getPosition() - 1300)) {
                    case 7: {
                        angelEquip.put((byte) 5, itemID);
                        break;
                    }
                    case 0: {
                        angelEquip.put((byte) 1, itemID);
                        break;
                    }
                    default: {
                        angelEquip.put(b809, itemID);
                        break;
                    }
                }
            }
            if (item.getPosition() <= -5000 && item.getPosition() > -5003) {
                byte pos = (byte) (-item.getPosition() - 5000); //定義圖騰裝備的位置
                totemEquip.putIfAbsent(pos, itemID);
            }
            if (item.getPosition() >= -128) {
                // T069 如果身上裝備為武器 且 武器合成其他道具的外觀 就要外觀武器的ID
                byte pos = (byte) (-item.getPosition()); //定義裝備的位置pos
                if (pos < 100 && myEquip.get(pos) == null) {
                    if (second && angel && (pos >= 1 && pos <= 9 || pos == 13)) {
                        continue;
                    }
                    myEquip.put(pos, itemID);
                } else if ((pos > 100 || pos == -128) && pos != 111) {
                    pos = (byte) (pos == -128 ? 28 : pos - 100);
                    if (second && angel && (pos >= 1 && pos <= 9 || pos == 13)) {
                        continue;
                    }
                    if (myEquip.get(pos) != null) {
                        maskedEquip.put(pos, myEquip.get(pos));
                    }
                    myEquip.put(pos, itemID);
                } else if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, itemID);
                }
            }

        }
        if (angel && second) {
            if (!angelEquip.containsKey((byte) 5)) {
                myEquip.put((byte) 5, Integer.valueOf(chr.getKeyValue("Longcoat")));
                maskedEquip.put((byte) 5, Integer.valueOf(chr.getKeyValue("Longcoat")));
            } else {
                myEquip.put((byte) 5, angelEquip.get((byte) 5));
                maskedEquip.clear();
            }
            myEquip.putAll(angelEquip);
            maskedEquip.putAll(angelEquip);
        }
        /*
         * 神之子主手和副手處理
         * 1572000 太刀類型 主手
         * 1562000 太劍類型 副手
         * 10 = 盾牌
         * 11 = 武器
         */
        if (zero && second && myEquip.containsKey((byte) 10)) {
            int itemId = myEquip.remove((byte) 10); //刪除盾牌
            myEquip.put((byte) 11, itemId); //將盾牌裝備放到主手
        }
        //遍歷玩家身上裝備的位置
        for (Entry<Byte, Integer> entry : myEquip.entrySet()) {
            mplew.write(entry.getKey()); //裝備的位置
            mplew.writeInt(entry.getValue()); //裝備ID
            //System.err.println("身上裝備 - > " + entry.getKey() + " " + entry.getValue());
        }
        mplew.write(0xFF); // 加載身上裝備結束
        //背包裡的裝備
        for (Entry<Byte, Integer> entry : maskedEquip.entrySet()) {
            mplew.write(entry.getKey()); //裝備欄的位置
            mplew.writeInt(entry.getValue()); //裝備ID
            //System.err.println("背包裝備 - > " + entry.getKey() + " " + entry.getValue());
        }
        mplew.write(0xFF); // 加載背包裝備結束
        mplew.write(0xFF);// V.155 new
        //加載玩家圖騰信息 圖騰的KEY位置從0開始計算 0 1 2 共三個
        for (Entry<Byte, Integer> entry : totemEquip.entrySet()) {
            mplew.write(entry.getKey()); //裝備的位置
            mplew.writeInt(entry.getValue()); //裝備ID
            //System.err.println("圖騰裝備 - > " + entry.getKey() + " " + entry.getValue());
        }
        mplew.write(0xFF); // 圖騰
        //點裝武器
        Item cWeapon = equip.getItem((byte) -111);
        mplew.writeInt(cWeapon != null ? cWeapon.getItemId() : 0);
        //角色武器
        Item weapon = equip.getItem(second ? (byte) -10 : (byte) -11); //神之子第2角色 顯示的武器是盾牌的
        mplew.writeInt(weapon != null ? weapon.getItemId() : 0);
        //角色副手或者盾牌
        Item subWeapon = equip.getItem((byte) -10);
        mplew.writeInt(!zero && subWeapon != null ? subWeapon.getItemId() : 0);
        //耳朵
        String questInfo = chr.getQuestInfo(7784, "sw");
        if (questInfo == null) {
            questInfo = "0";
        }
        int nEar = Integer.parseInt(questInfo);
        mplew.writeInt(JobConstants.getEar(chr.getJob(), nEar));
        mplew.writeInt(0); // ver.220
        mplew.writeBool(nEar != 0);
        mplew.write(0); // 244 ADD
        //檢測是否有寵物
        for (int i = 0; i < 3; i++) {
            mplew.writeInt(!second && chr.getSpawnPet(i) != null ? chr.getSpawnPet(i).getPetItemId() : 0);
        }
        if (chr.hasDecorate()) {
            mplew.writeInt(chr.getDecorate()); // 魔族之紋
        } else if (zero) { //神之子
            mplew.write(second ? 1 : 0);
        }
        if (JobConstants.is幻獸師(chr.getJob())) {
            chr.checkTailAndEar();
            mplew.write(Integer.valueOf(chr.getOneInfo(59300, "bEar")));
            mplew.writeInt(Integer.valueOf(chr.getOneInfo(59300, "EarID")));
            mplew.write(Integer.valueOf(chr.getOneInfo(59300, "bTail")));
            mplew.writeInt(Integer.valueOf(chr.getOneInfo(59300, "TailID")));
        }
        mplew.write(second ? chr.getSecondHairMixedColor() : chr.getHairMixedColor());
        mplew.write(second ? chr.getSecondHairProbColor() : chr.getHairProbColor());
        mplew.writeInt(0); // uInt TMS.230
        mplew.writeZeroBytes(5);
    }

    public static void addExpirationTime(MaplePacketLittleEndianWriter mplew, long time) {
        mplew.writeLong(getTime(time));
    }

    public static void addItemPosition(MaplePacketLittleEndianWriter mplew, Item item, boolean trade, boolean bagSlot) {
        short pos;
        if (item == null) {
            pos = 0;
        } else {
            pos = item.getPosition();
            if (pos < 0) {
                pos = (short) Math.abs(pos);
                if (pos > 100 && pos < 1000) {
                    pos -= 100;
                }
            }
            if (bagSlot) {
                pos = (short) ((pos % 100) - 1);
            }
        }
        if (bagSlot) {
            mplew.writeInt(pos);
        } else if (!trade) {
            mplew.writeShort(pos);
        } else {
            mplew.write(pos);
        }
    }

    public static Item GW_ItemSlotBase_Decode(MaplePacketReader slea) {
        Item item;
        int iType = slea.readByte();
        if (iType == 3) {
            item = new Item(0, (short) 0, (short) 1);
            GW_ItemSlotPet_RawDecode(slea, item);
        } else if (iType == 1) {
            item = new Equip(0, (short) 0, 0, 0, (short) 0);
            GW_ItemSlotEquip_RawDecode(slea, item);
        } else {
            item = new Item(0, (short) 0, (short) 1);
            GW_ItemSlotBundle_RawDecode(slea, item);
        }

        return item;
    }

    private static boolean GW_ItemSlotBase_RawDecode(MaplePacketReader slea, final Item item) {
        item.setItemId(slea.readInt());
        boolean hasUniqueId = slea.readBool();
        if (hasUniqueId) {
            item.setSN((int) slea.readLong());
        }

        long expiration = slea.readLong();
        if (!ItemConstants.類型.寵物(item.getItemId())) {
            item.setExpiration(expiration);
        }
        slea.readInt();
        slea.readBool();

        return hasUniqueId;
    }

    public static void GW_ItemSlotPet_RawDecode(MaplePacketReader slea, Item item) {
        GW_ItemSlotBase_RawDecode(slea, item);
        MaplePet pet = new MaplePet(item.getItemId(), item.getSN());

        pet.setName(slea.readAsciiString(13));
        pet.setLevel(slea.readByte());
        pet.setCloseness(slea.readShort());
        pet.setFullness(slea.readByte());

        item.setExpiration(slea.readLong());

        item.setAttribute(slea.readShort());
        pet.setFlags(slea.readShort());
        pet.setSecondsLeft(slea.readInt());
        item.setAttribute(item.getAttribute() | slea.readShort());
        pet.setSummoned(slea.readByte());
        IntStream.range(0, pet.getBuffSkills().length).forEach(i -> pet.setBuffSkill(i, slea.readInt()));
        pet.setAddSkill(slea.readInt());
        slea.readInt();
        slea.readInt();
        slea.readInt();
        slea.readShort();
        slea.readShort();
        item.setPet(pet);
    }

    public static void GW_ItemSlotEquip_RawDecode(MaplePacketReader slea, Item item) {
        boolean hasUniqueId = GW_ItemSlotBase_RawDecode(slea, item);

        Equip equip = (Equip) item;

        slea.readByte();

        GW_ItemSlotEquipBase__Decode(slea, equip);

        equip.setOwner(slea.readMapleAsciiString());
        equip.setState(slea.readByte(), false);
        equip.getStarForce().setLevel(slea.readByte());
        for (int i = 1; i <= 3; ++i) {
            equip.setPotential(slea.readShort(), i, false);
        }
        for (int j = 1; j <= 3; ++j) {
            equip.setPotential(slea.readShort(), j, true);
        }
        int skin = slea.readShort();
        if (skin > 0) {
            skin += equip.getItemId() / 10000 * 10000;
            equip.setItemSkin(skin);
        }
        equip.setSocket1(-1);
        slea.readShort();
        slea.readShort();
        slea.readShort();
        slea.readShort();

        slea.readInt();

        if (!hasUniqueId) {
            slea.readLong();
        }

        GW_CashItemOption_Decode(slea, equip);

        equip.setSoulOptionID(slea.readShort());
        equip.setSoulSocketID(slea.readShort());
        equip.setSoulOption(slea.readShort());
        if (ItemConstants.類型.秘法符文(equip.getItemId())) {
            equip.setARC(slea.readShort());
            equip.setARCExp(slea.readInt());
            equip.setARCLevel(slea.readShort());
        }
        if (ItemConstants.類型.真實符文(equip.getItemId())) {
            equip.setAut(slea.readShort());
            equip.setAutExp(slea.readInt());
            equip.setAutLevel(slea.readShort());
        }
        slea.readShort();
        slea.readLong();
        slea.readLong();
        slea.readLong();
        if (ItemConstants.類型.機器人(equip.getItemId())) {
            equip.setAndroid(new MapleAndroid(equip.getItemId(), equip.getSN()));
            equip.getAndroid().decodeAndroidLook(slea);
        }
        skin = slea.readInt();
        if (skin > 0) {
            equip.setItemSkin(skin);
        }
        slea.readLong();
    }

    public static void GW_ItemSlotEquipBase__Decode(MaplePacketReader slea, Equip equip) {
        int eqFlag = slea.readInt();
        if ((eqFlag & EquipStats.可使用捲軸次數.getValue()) != 0) {
            equip.setRestUpgradeCount(slea.readByte());
        }
        if ((eqFlag & EquipStats.捲軸強化次數.getValue()) != 0) {
            equip.setCurrentUpgradeCount(slea.readByte());
        }
        if ((eqFlag & EquipStats.力量.getValue()) != 0) {
            equip.setStr(slea.readShort());
        }
        if ((eqFlag & EquipStats.敏捷.getValue()) != 0) {
            equip.setDex(slea.readShort());
        }
        if ((eqFlag & EquipStats.智力.getValue()) != 0) {
            equip.setInt(slea.readShort());
        }
        if ((eqFlag & EquipStats.幸運.getValue()) != 0) {
            equip.setLuk(slea.readShort());
        }
        if ((eqFlag & EquipStats.MaxHP.getValue()) != 0) {
            equip.setHp(slea.readShort());
        }
        if ((eqFlag & EquipStats.MaxMP.getValue()) != 0) {
            equip.setMp(slea.readShort());
        }
        if ((eqFlag & EquipStats.攻擊力.getValue()) != 0) {
            equip.setPad(slea.readShort());
        }
        if ((eqFlag & EquipStats.魔力.getValue()) != 0) {
            equip.setMad(slea.readShort());
        }
        if ((eqFlag & EquipStats.防禦力.getValue()) != 0) {
            equip.setPdd(slea.readShort());
        }
        if ((eqFlag & EquipStats.靈敏度.getValue()) != 0) {
            equip.setHands(slea.readShort());
        }
        if ((eqFlag & EquipStats.移動速度.getValue()) != 0) {
            equip.setSpeed(slea.readShort());
        }
        if ((eqFlag & EquipStats.跳躍力.getValue()) != 0) {
            equip.setJump(slea.readShort());
        }
        if ((eqFlag & EquipStats.狀態.getValue()) != 0) {
            equip.setAttribute(slea.readInt());
        }
        if ((eqFlag & EquipStats.裝備技能.getValue()) != 0) {
            slea.readBool();
        }
        if ((eqFlag & EquipStats.裝備等級.getValue()) != 0) {
            slea.readByte();
        }
        if ((eqFlag & EquipStats.裝備經驗.getValue()) != 0) {
            slea.readLong();
        }
        if ((eqFlag & EquipStats.耐久度.getValue()) != 0) {
            equip.setDurability(slea.readInt());
        }
        if ((eqFlag & EquipStats.鎚子.getValue()) != 0) {
            equip.setViciousHammer((byte) slea.readShort());
            equip.setPlatinumHammer((byte) slea.readShort());
        }
        if ((eqFlag & EquipStats.大亂鬥傷害.getValue()) != 0) {
            equip.setPVPDamage(slea.readShort());
        }
        if ((eqFlag & EquipStats.套用等級減少.getValue()) != 0) {
            slea.readByte();
        }
        if ((eqFlag & EquipStats.ENHANCT_BUFF.getValue()) != 0) {
            equip.setEnchantBuff(slea.readShort());
        }
        if ((eqFlag & EquipStats.DURABILITY_SPECIAL.getValue()) != 0) {
            slea.readInt();
        }
        if ((eqFlag & EquipStats.REQUIRED_LEVEL.getValue()) != 0) {
            slea.readByte();
        }
        if ((eqFlag & EquipStats.YGGDRASIL_WISDOM.getValue()) != 0) {
            equip.setYggdrasilWisdom(slea.readByte());
        }
        if ((eqFlag & EquipStats.FINAL_STRIKE.getValue()) != 0) {
            equip.setFinalStrike(slea.readBool());
        }
        if ((eqFlag & EquipStats.BOSS傷.getValue()) != 0) {
            equip.setBossDamage(slea.readByte());
        }
        if ((eqFlag & EquipStats.無視防禦.getValue()) != 0) {
            equip.setIgnorePDR(slea.readByte());
        }

        int exFlag = slea.readInt();
        if (EquipSpecialStat.總傷害.check(exFlag)) {
            equip.setTotalDamage(slea.readByte());
        }
        if (EquipSpecialStat.全屬性.check(exFlag)) {
            equip.setAllStat(slea.readByte());
        }
        if (EquipSpecialStat.剪刀次數.check(exFlag)) {
            slea.readByte();
        }
        if (EquipSpecialStat.輪迴星火.check(exFlag)) {
            equip.getNirvanaFlame().setFlag(slea.readLong());
        }
        if (EquipSpecialStat.星力強化.check(exFlag)) {
            slea.readInt();
        }
    }

    public static void GW_CashItemOption_Decode(MaplePacketReader slea, Equip equip) {
        slea.readLong();

        slea.readLong();
        slea.readInt();
        for (int i = 0; i < 3; ++i) {
            slea.readInt();
        }
    }

    public static void GW_ItemSlotBundle_RawDecode(MaplePacketReader slea, final Item item) {
        GW_ItemSlotBase_RawDecode(slea, item);

        item.setQuantity(slea.readShort());
        item.setOwner(slea.readMapleAsciiString());
        item.setAttribute(slea.readShort());
        if (ItemConstants.類型.飛鏢(item.getItemId()) || ItemConstants.類型.子彈(item.getItemId()) || item.getItemId() / 10000 == 287 || item.getItemId() == 4001886 || ItemConstants.isSetupExpRate(item.getItemId())) {
            item.setSN((int) slea.readLong());
        }
        slea.readInt();

        int familiarid = ItemConstants.getFamiliarByItemID(item.getItemId());
        if (familiarid > 0) {
            FamiliarCard fc = new FamiliarCard((byte) 0);
            slea.readInt();
            fc.setLevel((byte) slea.readShort());
            fc.setSkill(slea.readShort());
            slea.readShort();
            fc.setOption1(slea.readShort());
            fc.setOption2(slea.readShort());
            fc.setOption3(slea.readShort());
            fc.setGrade(slea.readByte());
            item.setFamiliarCard(fc);
        } else {
            slea.skip(17);
        }
    }

    public static void GW_ItemSlotBase_Encode(MaplePacketLittleEndianWriter mplew, Item item) {
        GW_ItemSlotBase_Encode(mplew, item, null);
    }

    public static void GW_ItemSlotBase_Encode(MaplePacketLittleEndianWriter mplew, Item item, MapleCharacter chr) {
        if (item == null) {
            throw new NullPointerException("addItemInfo item is null.");
        }
        mplew.write(item.getPet() != null ? 3 : item.getType()); // 道具類型

        if (item.getPet() != null) { // Pet
            GW_ItemSlotPet_RawEncode(mplew, item, item.getPet(), true);
        } else if (item.getType() == 1) { // 如果是裝備
            GW_ItemSlotEquip_RawEncode(mplew, item);
        } else { // 如果是物品道具
            GW_ItemSlotBundle_RawEncode(mplew, item);
        }
    }

    private static boolean GW_ItemSlotBase_RawEncode(final MaplePacketLittleEndianWriter mplew, final Item item) {
        mplew.writeInt(item.getItemId()); // 裝備ID
        //結婚戒指沒有 且 不是機器人 智能機器人
        boolean hasUniqueId = MapleItemInformationProvider.getInstance().isCash(item.getItemId()) && item.getSN() > 0 && !ItemConstants.類型.結婚戒指(item.getItemId()) && !ItemConstants.類型.機器人(item.getItemId());
        mplew.writeBool(hasUniqueId);
        if (hasUniqueId) {
            mplew.writeLong(item.getSN());
        }

        addExpirationTime(mplew, ItemConstants.類型.寵物(item.getItemId()) ? -1 : item.getExpiration());
        mplew.writeInt(item.getExtendSlot());
        mplew.writeBool(false);//V.153 new

        return hasUniqueId;
    }

    public static void GW_ItemSlotPet_RawEncode(MaplePacketLittleEndianWriter mplew, Item item, MaplePet pet, boolean active) {
        GW_ItemSlotBase_RawEncode(mplew, item);

        mplew.writeAsciiString(pet.getName(), 13);
        mplew.write(pet.getLevel());
        mplew.writeShort(pet.getCloseness());
        mplew.write(pet.getFullness());

        // dateDead
        long timeNow = System.currentTimeMillis();
        if (item == null) {
            mplew.writeLong(DateUtil.getKoreanTimestamp((long) (timeNow * 1.5)));
        } else {
            long expiration = item.getExpiration();
            addExpirationTime(mplew, expiration < 0 ? -3 : expiration <= timeNow ? -1L : expiration);
        }

        mplew.writeShort(ItemAttribute.RegressScroll.check(item.getCAttribute()) ? ItemAttribute.RegressScroll.getValue() : 0);
        mplew.writeShort(pet.getFlags());
        mplew.writeInt(Math.max(pet.getSecondsLeft(), 0)); //in seconds, 3600 = 1 hr.
        short nAttribute = 0;
        if (ItemAttribute.TradeOnce.check(item.getCAttribute())) {
            nAttribute |= 1;
        }
        if (!pet.isCanPickup()) {
            nAttribute |= 2;
        }
        mplew.writeShort(nAttribute);
        mplew.write(pet.getSummoned() ? pet.getSummonedValue() : 0);
        //寵物自動加BUFF的技能ID
        IntStream.range(0, pet.getBuffSkills().length).map(i -> active ? pet.getBuffSkill(i) : 0).forEach(mplew::writeInt);
        mplew.writeInt(pet.getAddSkill());
        mplew.writeInt(0); //T071新增
        mplew.writeInt(0);
        mplew.writeInt(-1); // -1 - 正常, 0 - 顯示"使用寵物染色卡，染成新色的寵物。"
        // nGiantRate
        mplew.writeShort(100);
        mplew.writeShort(0);
    }

    public static void GW_ItemSlotEquip_RawEncode(final MaplePacketLittleEndianWriter mplew, final Item item) {
        boolean hasUniqueId = GW_ItemSlotBase_RawEncode(mplew, item);

        boolean isCashItem = MapleItemInformationProvider.getInstance().isCash(item.getItemId());
        Equip equip = (Equip) item;

        mplew.write(0); // 218 sub_2BBE1E0

        GW_ItemSlotEquipBase__Encode(mplew, equip);

        // 擁有者名字
        mplew.writeMapleAsciiString(equip.isMvpEquip() ? "ＭＶＰ" : equip.getOwner());
        // 潛能等級 17 = 特殊rare, 18 = 稀有epic, 19 = 罕見unique, 20 = 傳說legendary, potential flags. special grade is 14 but it crashes
        mplew.write((equip.getState(true) > 0 && equip.getState(true) < 17) ? (equip.getState(false) | 0x20) : equip.getState(false));
        // 裝備星級
        mplew.write(equip.getStarForceLevel());
        // 潛在能力
        for (int i = 1; i <= 3; ++i) {
            mplew.writeShort((equip.getPotential(i, false) <= 0) ? 0 : equip.getPotential(i, false));
        }
        // 附加潛能
        for (int j = 1; j <= 3; ++j) {
            mplew.writeShort((equip.getState(true) > 0 && equip.getState(true) < 17) ? ((j == 1) ? equip.getState(true) : 0) : equip.getPotential(j, true));
        }
        // 鐵砧
        mplew.writeShort(isCashItem ? 0 : equip.getItemSkin() % 10000);
        /*
         * Alien Stone FLAG
         * 0x01 = 你可以在這件物品上鑲入星岩。
         * 0x03 = 你可以在這件物品上鑲入星岩。 有個鑲嵌的孔 未鑲嵌
         * 0x13 = 有1個插孔 已經鑲嵌東西
         */
        mplew.writeShort(equip.getSocketState()); //V.101新增
        //mplew.writeShort(equip.getSocket1() % 10000); //V.102新增 鑲嵌寶石1 ID: 3281 = 全屬性+4%
        //mplew.writeShort(equip.getSocket2() % 10000); //V.102新增 鑲嵌寶石2
        //mplew.writeShort(equip.getSocket3() % 10000); //V.102新增 鑲嵌寶石3

        mplew.writeInt(0);//equip.getMixColor()

        if (!hasUniqueId) {
            mplew.writeLong(equip.getSN());
        }

        GW_CashItemOption_Encode(mplew, equip);

        // 靈魂寶珠
        mplew.writeShort(equip.getSoulOptionID());
        // 靈魂捲軸
        mplew.writeShort(equip.getSoulSocketID());
        // 靈魂潛能
        mplew.writeShort(equip.getSoulOption());
        // 秘法符文
        if (ItemConstants.類型.秘法符文(equip.getItemId())) {
            mplew.writeShort(equip.getARC());
            mplew.writeInt(equip.getArcExp());
            mplew.writeShort(equip.getARCLevel());
        }
        if (ItemConstants.類型.真實符文(equip.getItemId())) {
            mplew.writeShort(equip.getAut());
            mplew.writeInt(equip.getAutExp());
            mplew.writeShort(equip.getAutLevel());
        }
        // 220 sub_587F80
        mplew.writeShort(-1);
        mplew.writeLong(getTime(-1));
        mplew.writeLong(getTime(-2));
        mplew.writeLong(getTime(-1));
        // 機器人
        if (ItemConstants.類型.機器人(equip.getItemId())) {
            if (equip.getAndroid() != null) {
                equip.getAndroid().encodeAndroidLook(mplew);
            } else {
                mplew.writeZeroBytes(24);
            }
        }
        // 點商鐵砧
        mplew.writeInt(isCashItem ? equip.getItemSkin() : 0);
        mplew.writeLong(getTime(-2));
    }

    public static void GW_ItemSlotEquipBase__Encode(MaplePacketLittleEndianWriter mplew, Equip equip) {
        int flag;
        int exFlag;
        if (equip.getPosition() < 0 && EnhanceResultType.EQUIP_MARK.check(equip.getEnchantBuff())) {
            flag = 0;
            exFlag = 0;
        } else {
            flag = equip.getEquipFlag();
            exFlag = equip.getEquipSpecialFlag();
        }

        mplew.writeInt(flag);
        if (EquipStats.可使用捲軸次數.check(flag)) {
            mplew.write(equip.getRestUpgradeCount());
        }
        if (EquipStats.捲軸強化次數.check(flag)) {
            mplew.write(equip.getCurrentUpgradeCount());
        }
        if (EquipStats.力量.check(flag)) {
            mplew.writeShort(equip.getTotalStr());
        }
        if (EquipStats.敏捷.check(flag)) {
            mplew.writeShort(equip.getTotalDex());
        }
        if (EquipStats.智力.check(flag)) {
            mplew.writeShort(equip.getTotalInt());
        }
        if (EquipStats.幸運.check(flag)) {
            mplew.writeShort(equip.getTotalLuk());
        }
        if (EquipStats.MaxHP.check(flag)) {
            mplew.writeShort(ItemConstants.類型.秘法符文(equip.getItemId()) || ItemConstants.類型.真實符文(equip.getItemId()) ? equip.getTotalHp() / 10 : equip.getTotalHp());
        }
        if (EquipStats.MaxMP.check(flag)) {
            mplew.writeShort(equip.getTotalMp());
        }
        if (EquipStats.攻擊力.check(flag)) {
            mplew.writeShort(equip.getTotalPad());
        }
        if (EquipStats.魔力.check(flag)) {
            mplew.writeShort(equip.getTotalMad());
        }
        if (EquipStats.防禦力.check(flag)) {
            mplew.writeShort(equip.getTotalPdd());
        }
        if (EquipStats.靈敏度.check(flag)) {
            mplew.writeShort(equip.getTotalHands());
        }
        if (EquipStats.移動速度.check(flag)) {
            mplew.writeShort(equip.getTotalSpeed());
        }
        if (EquipStats.跳躍力.check(flag)) {
            mplew.writeShort(equip.getTotalJump());
        }
        if (EquipStats.狀態.check(flag)) {
            mplew.writeInt(equip.getCAttribute());
        }
        if (EquipStats.裝備技能.check(flag)) {
            mplew.writeBool(equip.getIncSkill() > 0);
        }
        if (EquipStats.裝備等級.check(flag)) {
            if (equip.isSealedEquip()) {
                mplew.write(equip.getSealedLevel());
            } else {
                mplew.write(Math.max(equip.getBaseLevel(), equip.getEquipLevel()));
            }
        }
        if (EquipStats.裝備經驗.check(flag)) {
            if (equip.isSealedEquip()) {
                mplew.writeLong(equip.getSealedExp());
            } else {
                mplew.writeLong(equip.getExpPercentage() * 100000); // 10000000 = 100% 好像現在是20000是滿經驗 V.110修改 以前是Int
            }
        }
        if (EquipStats.耐久度.check(flag)) {
            mplew.writeInt(equip.getDurability());
        }
        if (EquipStats.鎚子.check(flag)) {
            mplew.writeShort(equip.getViciousHammer()); // 黃金鐵鎚
            mplew.writeShort(equip.getPlatinumHammer()); // 白金鎚子
        }
        if (EquipStats.大亂鬥傷害.check(flag)) {
            mplew.writeShort(equip.getPVPDamage());
        }
        if (EquipStats.套用等級減少.check(flag)) {
            mplew.write(equip.getDownLevel());
        }
        if (EquipStats.ENHANCT_BUFF.check(flag)) {
            mplew.writeShort(equip.getEnchantBuff()); //強化效果
        }
        if (EquipStats.DURABILITY_SPECIAL.check(flag)) {
            mplew.writeInt(0);
        }
        if (EquipStats.REQUIRED_LEVEL.check(flag)) {
            mplew.write(equip.getiIncReq()); //穿戴裝備的等級要求提高多少級
        }
        if (EquipStats.YGGDRASIL_WISDOM.check(flag)) {
            mplew.write(equip.getYggdrasilWisdom());
        }
        if (EquipStats.FINAL_STRIKE.check(flag)) {
            mplew.writeBool(equip.getFinalStrike()); //最終一擊卷軸成功
        }
        if (EquipStats.BOSS傷.check(flag)) {
            mplew.write(equip.getTotalBossDamage());
        }
        if (EquipStats.無視防禦.check(flag)) {
            mplew.write(equip.getTotalIgnorePDR());
        }
        /*
         * 0x01 = 裝備總傷害百分比增加
         * 0x02 = 裝備所有屬性百分比增加
         * 0x04 = 可以使用剪刀多少次
         */
        mplew.writeInt(exFlag);
        if (EquipSpecialStat.總傷害.check(exFlag)) {
            mplew.write(equip.getTotalTotalDamage());
        }
        if (EquipSpecialStat.全屬性.check(exFlag)) {
            mplew.write(equip.getTotalAllStat());
        }
        if (EquipSpecialStat.剪刀次數.check(exFlag)) {
            mplew.write(-1); //可以使用剪刀多少次 默認-1 必須發送這個封包 0x0A = 宿命剪刀1次
        }
        if (EquipSpecialStat.輪迴星火.check(exFlag)) {
            mplew.writeLong(equip.getFlameFlag());
        }
        if (EquipSpecialStat.星力強化.check(exFlag)) {
            mplew.writeInt(256);
        }
    }

    public static void GW_CashItemOption_Encode(MaplePacketLittleEndianWriter mplew, Equip equip) {
        mplew.writeLong(0); // liCashItemSN

        mplew.writeLong(getTime(-2)); //getTime(equip.getFtExpireDate())
        mplew.writeInt(0);//equip.getCSGrade()
        for (int i = 0; i < 3; ++i) {
            mplew.writeInt(0);//equip.getAnOption(i)
        }
    }

    public static void GW_ItemSlotBundle_RawEncode(final MaplePacketLittleEndianWriter mplew, final Item item) {
        GW_ItemSlotBase_RawEncode(mplew, item);

        mplew.writeShort(item.getQuantity()); // 道具數量
        mplew.writeMapleAsciiString(item.getOwner()); // 道具擁有者
        mplew.writeShort(item.getAttribute()); // 道具狀態
        if (ItemConstants.類型.飛鏢(item.getItemId()) || ItemConstants.類型.子彈(item.getItemId()) || item.getItemId() / 10000 == 287 || item.getItemId() == 4001886 || ItemConstants.isSetupExpRate(item.getItemId())) {
            mplew.writeLong(item.getSN());
        }
        mplew.writeInt(0);//V.149 new

        int familiarid = ItemConstants.getFamiliarByItemID(item.getItemId());
        FamiliarCard fc = item.getFamiliarCard();
        mplew.writeInt(familiarid);
        mplew.writeShort(familiarid > 0 && fc != null ? fc.getLevel() : 1);
        mplew.writeShort(familiarid > 0 && fc != null ? fc.getSkill() : 0);
        mplew.writeShort(familiarid > 0 && fc != null ? fc.getLevel() : 1);
        mplew.writeShort(familiarid > 0 && fc != null ? fc.getOption(0) : 0);
        mplew.writeShort(familiarid > 0 && fc != null ? fc.getOption(1) : 0);
        mplew.writeShort(familiarid > 0 && fc != null ? fc.getOption(2) : 0);
        mplew.write(familiarid > 0 && fc != null ? fc.getGrade() : 0);     //品級 0=C 1=B 2=A 3=S 4=SS
    }

    public static void serializeMovementList(MaplePacketLittleEndianWriter mplew, int gatherDuration, int nVal1, Point mPos, Point oPos, List<LifeMovementFragment> moves, int[] arrays) {
        mplew.writeInt(gatherDuration);
        mplew.writeInt(nVal1);
        mplew.writePos(mPos);
        mplew.writePos(oPos);

        if (moves == null) { // from mobMove and idk why null
            mplew.writeShort(0);
        } else {
            mplew.writeShort(moves.size());
            for (LifeMovementFragment move : moves) {
                move.serialize(mplew);
            }
        }

        if (arrays != null) {
            mplew.write(arrays.length);
            for (int nVal : arrays) {
                mplew.write(nVal);
            }
        }
    }

    public static void addAnnounceBox(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        if (chr.getPlayerShop() != null && chr.getPlayerShop().isOwner(chr) && chr.getPlayerShop().getShopType() != 1 && chr.getPlayerShop().isAvailable()) {
            addInteraction(mplew, chr.getPlayerShop());
        } else {
            mplew.write(0);
        }
    }

    public static void addInteraction(MaplePacketLittleEndianWriter mplew, IMaplePlayerShop shop) {
        mplew.write(shop.getGameType());
        mplew.writeInt(((AbstractPlayerStore) shop).getObjectId());
        mplew.writeMapleAsciiString(shop.getDescription());
        if (shop.getShopType() != 1) {
            mplew.write(shop.getPassword().length() > 0 ? 1 : 0); //password = false
        }
        int id = shop.getItemId() % 100;
        if (shop instanceof MapleMiniGame) {
            final MapleMiniGame mini = (MapleMiniGame) shop;
            id = mini.getPieceType();
        } else if (shop.getShopType() == 75) {
            id = 0;
        }
        mplew.write(id); //應該是商店的外觀 以前是: shop.getItem() % 10   shop.getItem() - 5030000
        mplew.write(shop.getShopType() != 75 ? shop.getSize() : 0); //current size
        mplew.write(shop.getMaxSize()); //full slots... 4 = 4-1=3 = has slots, 1-1=0 = no slots
        if (shop.getShopType() != 1) {
            mplew.write(shop.isOpen() ? 0 : 1);
        }
        PacketHelper.addChaterName(mplew, "", "");
    }

    /**
     * 添加角色相關數據：屬性、道具、任務、技能等
     *
     * @param mplew
     * @param chr
     * @param flag
     */
    public static void addCharacterInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, long flag) {
        mplew.writeLong(flag); // 開始生成角色信息
        mplew.write(0);
        for (int i = 0; i < 3; ++i) {
            mplew.writeInt(JobConstants.is皇家騎士團(chr.getJob()) || JobConstants.is米哈逸(chr.getJob()) ? -6 : -1);
        }
        mplew.write(0);
        mplew.writeInt(0);
        mplew.write(0);

        if ((flag & 0x1L) != 0x0L) {
            addCharStats(mplew, chr);
            mplew.write(chr.getBuddylist().getCapacity());//好友欄上限
            mplew.write(chr.getBlessOfFairyOrigin() != null); // 精靈的祝福
            if (chr.getBlessOfFairyOrigin() != null) {
                mplew.writeMapleAsciiString(chr.getBlessOfFairyOrigin());
            }
            mplew.write(chr.getBlessOfEmpressOrigin() != null); // 女皇的祝福
            if (chr.getBlessOfEmpressOrigin() != null) {
                mplew.writeMapleAsciiString(chr.getBlessOfEmpressOrigin());
            }
            // 終極冒險家訊息
            MapleQuestStatus ultExplorer = chr.getQuestNoAdd(MapleQuest.getInstance(GameConstants.ULT_EXPLORER));
            mplew.write((ultExplorer != null) && (ultExplorer.getCustomData() != null));
            if ((ultExplorer != null) && (ultExplorer.getCustomData() != null)) {
                mplew.writeMapleAsciiString(ultExplorer.getCustomData());
            }
            mplew.writeLong(DateUtil.getFileTimestamp(-2L)); // CreateDate ?
            mplew.writeLong(DateUtil.getFileTimestamp(-2L));
            for (int i = 2; i < 74; i += 36) {
                mplew.writeInt(0);
                mplew.write(-1);
            }
        }
        if ((flag & 0x2L) != 0x0L) {
            mplew.writeLong(chr.getMeso()); // 楓幣 V.110修改以前是 Int
            mplew.writeInt(chr.getId());  // 角色ID
            mplew.writeInt(chr.getBeans()); // 豆豆
            mplew.writeInt(chr.getCSPoints(2)); // 楓葉點數
        }
        if ((flag & 0x2000000L) != 0x0L && (flag & 0x8L) != 0x0L) { //  & 0x2000008
            int nCount = 0;
            mplew.writeInt(nCount);
            for (int i = 0; i < nCount; i++) {
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeLong(0);
            }
        }
//        if ((flag >>> 32 & 0x4000000L) != 0x0L | (flag & 0x8L) != 0x0L) { // TMS 218 沒找到
//            mplew.writeInt(chr.getPotionPot() != null ? 1 : 0); //藥劑罐信息
//            if (chr.getPotionPot() != null) {
//                addPotionPotInfo(mplew, chr.getPotionPot());
//            }
//        }
        if ((flag & 0x80L) != 0x0L) {
            mplew.writeInt(chr.getInventory(MapleInventoryType.EQUIP).getSlotLimit()); // equip slots
            mplew.writeInt(chr.getInventory(MapleInventoryType.USE).getSlotLimit()); // use slots
            mplew.writeInt(chr.getInventory(MapleInventoryType.SETUP).getSlotLimit()); // set-up slots
            mplew.writeInt(chr.getInventory(MapleInventoryType.ETC).getSlotLimit()); // etc slots
            mplew.writeInt(chr.getInventory(MapleInventoryType.CASH).getSlotLimit()); // cash slots
            mplew.writeInt(chr.getInventory(MapleInventoryType.DECORATION).getSlotLimit()); // decoration slots
        }
        /*
         * 項鏈擴充過期時間
         */
        if ((flag & 0x100000L) != 0x0L) {
            MapleQuestStatus stat = chr.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT));
            if (stat != null && stat.getCustomData() != null && ("0".equals(stat.getCustomData()) || Long.parseLong(stat.getCustomData()) > System.currentTimeMillis())) {
                mplew.writeLong("0".equals(stat.getCustomData()) ? getTime(-1) : getTime(Long.parseLong(stat.getCustomData())));
            } else {
                mplew.writeLong(getTime(-2));
            }
        }
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        List<Item> equippedList = iv.newList(); //獲取裝備中的道具列表
        Collections.sort(equippedList); //對道具進行排序
        List<Item> equipped = new ArrayList<>(); // 普通裝備
        List<Item> equippedCash = new ArrayList<>(); // 現金裝備
        List<Item> equippedDragon = new ArrayList<>(); // 龍裝備
        List<Item> equippedMechanic = new ArrayList<>(); // 機甲裝備
        List<Item> equippedAndroid = new ArrayList<>(); // 機器人的裝備
        List<Item> equippedLolitaCash = new ArrayList<>(); // 天使破壞者裝備
        List<Item> equippedBit = new ArrayList<>(); // 拼圖
        List<Item> equippedZeroBetaCash = new ArrayList<>(); // 神之子培塔時裝
        List<Item> equippedArcane = new ArrayList<>(); // 秘法符文
        List<Item> equippedAuthenticSymbol = new ArrayList<>(); // 真實符文
        List<Item> equippedTotem = new ArrayList<>(); // 圖騰
        List<Item> equippedMonsterEqp = new ArrayList<>(); // 獸魔裝備
        List<Item> equippedHakuFan = new ArrayList<>(); // 花狐裝備
        List<Item> equippedUnknown = new ArrayList<>(); // 未知
        for (Item item : equippedList) {
            if (item.getPosition() < 0 && item.getPosition() > -100) { // 普通裝備
                equipped.add(item);
            } else if (item.getPosition() <= -100 && item.getPosition() > -1000) { //現金裝備
                equippedCash.add(item);
            } else if (item.getPosition() <= -1000 && item.getPosition() > -1100) { // 龍裝備 龍面具(1000), 龍墜飾(1001), 龍之翼(1002), 龍尾巴(1003)
                equippedDragon.add(item);
            } else if (item.getPosition() <= -1100 && item.getPosition() > -1200) { // 機甲裝備 戰神引擎(1100), 戰神手臂(1101), 戰神腿部(1102), 戰神身軀(1103), 戰神電晶體(1104)
                equippedMechanic.add(item);
            } else if (item.getPosition() <= -1200 && item.getPosition() > -1300) { // 機器人的裝備 帽子(1200), 披風(1201), 臉飾(1202), 上衣(1203), 褲裙(1204), 鞋子(1205), 手套(1206)
                equippedAndroid.add(item);
            } else if (item.getPosition() <= -1300 && item.getPosition() > -1310) { // 天使破壞者裝備 帽子(1300), 披風(1301), 臉飾(1302), 上衣(1303), 手套(1304)
                equippedLolitaCash.add(item);
            } else if (item.getPosition() <= -1400 && item.getPosition() > -1500) { // 拼圖(1400)~(1425)
                equippedBit.add(item);
            } else if (item.getPosition() <= -1500 && item.getPosition() > -1600) { // 神之子培塔時裝 眼飾(1500), 帽子(1501), 臉飾(1502), 耳環(1503), 披風(1504), 上衣(1505), 手套(1506), 武器(1507), 褲裙(1508), 鞋子(1509), 戒指1(1510), 戒指2(1511)
                equippedZeroBetaCash.add(item);
            } else if (item.getPosition() <= -1600 && item.getPosition() > -1606) { // 秘法符文 (1600)~(1605)
                equippedArcane.add(item);
            } else if (item.getPosition() <= -1700 && item.getPosition() > -1706) { // 真實符文 (1700)~(1705)
                equippedAuthenticSymbol.add(item);
            } else if (item.getPosition() <= -5000 && item.getPosition() > -5003) { // 圖騰(5000)~(5002)
                equippedTotem.add(item);
            } else if (item.getPosition() <= -5100 && item.getPosition() > -5107) { // 獸魔裝備 帽子(5101), 披風(5102), 上衣(5103), 手套(5104), 鞋子(5105), 武器(5106)
                equippedMonsterEqp.add(item);
            } else if (item.getPosition() == -5200) { // 花狐裝備 扇子(5200)
                equippedHakuFan.add(item);
            } else if (item.getPosition() <= -6000 && item.getPosition() > -6200) { // 未知
                chr.getSkillSkin().put(MapleItemInformationProvider.getInstance().getSkillSkinFormSkillId(item.getItemId()), item.getItemId());
                equippedUnknown.add(item);
            }
        }
        if ((flag & 0x4L) != 0x0L) {
            mplew.writeBool(false);

            // 開始加載身上的普通裝備    1
            encodeInventory(mplew, equipped, chr);
            iv = chr.getInventory(MapleInventoryType.EQUIP);
            List<MapleAndroid> androids = new LinkedList<>();
            List<Item> items20000 = new ArrayList<>();
            List<Item> items21000 = new ArrayList<>();
            List<Item> equip = new ArrayList<>();
            for (Item item : iv.list()) {
                if (((Equip) item).getAndroid() != null) {
                    androids.add(((Equip) item).getAndroid());
                }
                if (item.getPosition() >= 21000) {
                    items21000.add(item);
                } else if (item.getPosition() >= 20000) {
                    items20000.add(item);
                } else {
                    equip.add(item);
                }
            }
            // 開始加載裝備欄道具    2
            encodeInventory(mplew, equip, chr);
            // 開始加載龍裝備    3
            encodeInventory(mplew, equippedDragon, chr);
            // 開始加載機甲裝備    4
            encodeInventory(mplew, equippedMechanic, chr);
            // 開始加載拼圖    5
            encodeInventory(mplew, equippedBit, chr);
            // 開始加載獸魔裝備    6
            encodeInventory(mplew, equippedMonsterEqp, chr);
            // 開始加載秘法符文    7
            encodeInventory(mplew, equippedArcane, chr);
            // 開始加載真實符文    8
            encodeInventory(mplew, equippedAuthenticSymbol, chr);
            // 開始加載花狐裝備    9
            encodeInventory(mplew, equippedHakuFan, chr);
            // 開始加載圖騰    10
            encodeInventory(mplew, equippedTotem, chr);
            // 未知    11
            encodeInventory(mplew, equippedUnknown, chr);
            // 技能皮膚 從20000開始    已裝備?    12
            encodeInventory(mplew, items20000, chr);
            // 技能皮膚 從21000開始    未裝備    13
            encodeInventory(mplew, items21000, chr);
            mplew.writeInt(androids.size());
            for (MapleAndroid android : androids) {
                mplew.writeLong(android.getUniqueId());
                android.encodeAndroidLook(mplew);
            }
        }
        if ((flag & 0x10L) != 0x0L) {
            encodeInventory(mplew, Collections.emptyList(), chr);
            encodeInventory(mplew, Collections.emptyList(), chr);
        }
        if ((flag & 0x2000L) != 0x0L) {
            mplew.writeBool(false);
            // 開始加載身上的時裝    1
            encodeInventory(mplew, equippedCash, chr);
            iv = chr.getInventory(MapleInventoryType.DECORATION);
            List<Item> decoration = new ArrayList<>();
            for (Item item : iv.list()) {
                if (item.getPosition() < 129) {
                    decoration.add(item);
                }
            }
            // 開始加載時裝欄的道具    2
            encodeInventory(mplew, decoration, chr);
            // 開始加載機器人的時裝    3
            encodeInventory(mplew, equippedAndroid, chr);
            // 開始加載天使破壞者時裝    4
            encodeInventory(mplew, equippedLolitaCash, chr);
            // 開始加載神之子培塔時裝    5
            encodeInventory(mplew, equippedZeroBetaCash, chr);
        }
        if ((flag & 0x8L) != 0x0L) {
            // 開始加載消耗欄道具    1
            iv = chr.getInventory(MapleInventoryType.USE);
            List<Item> items = new ArrayList<>();
            for (Item item : iv.list()) {
                if (item.getPosition() < 129) {
                    items.add(item);
                }
            }
            encodeInventory(mplew, items, chr);
        }
        if ((flag & 0x10L) != 0x0L) {
            // 開始加載裝飾欄道具    2
            iv = chr.getInventory(MapleInventoryType.SETUP);
            List<Item> items = new ArrayList<>();
            for (Item item : iv.list()) {
                if (item.getPosition() < 129) {
                    items.add(item);
                }
            }
            encodeInventory(mplew, items, chr);
        }
        if ((flag & 0x20L) != 0x0L) {
            // 開始加載其他欄道具    3
            iv = chr.getInventory(MapleInventoryType.ETC);
            List<Item> items = new ArrayList<>();
            for (Item item : iv.list()) {
                if (item.getPosition() < 129) {
                    items.add(item);
                }
            }
            encodeInventory(mplew, items, chr);
        }
        List<MaplePet> pets = new ArrayList<>();
        if ((flag & 0x40L) != 0x0L) {
            // 開始加載現金欄道具    4
            iv = chr.getInventory(MapleInventoryType.CASH);
            List<Item> items = new ArrayList<>();
            for (Item item : iv.list()) {
                items.add(item);
                if (item.getPet() != null) {
                    pets.add(item.getPet());
                }
            }
            encodeInventory(mplew, items, chr);
        }
        MapleInventoryType eiv;
        if ((flag & 0x8L) != 0x0L) {
            //開始加載消耗欄擴展背包道具    1
            eiv = MapleInventoryType.USE;
            List<Item> exSlots = chr.getExtendedSlots(eiv.getType());
            mplew.writeInt(exSlots.size());
            for (Item it : exSlots) {
                mplew.writeInt(it.getExtendSlot());
                mplew.writeInt(it.getItemId());
                chr.getInventory(eiv).list().stream()
                        .filter(item -> item.getPosition() > (it.getExtendSlot() * 100 + 10100) && item.getPosition() < (it.getExtendSlot() * 100 + 10200))
                        .forEach(item -> {
                            addItemPosition(mplew, item, false, true);
                            GW_ItemSlotBase_Encode(mplew, item, chr);
                        });
                mplew.writeInt(-1);
            }
        }
        if ((flag & 0x10L) != 0x0L) {
            //開始加載裝飾欄擴展背包道具    2
            eiv = MapleInventoryType.SETUP;
            List<Item> exSlots = chr.getExtendedSlots(eiv.getType());
            mplew.writeInt(exSlots.size());
            for (Item it : exSlots) {
                mplew.writeInt(it.getExtendSlot());
                mplew.writeInt(it.getItemId());
                chr.getInventory(eiv).list().stream()
                        .filter(item -> item.getPosition() > (it.getExtendSlot() * 100 + 10100) && item.getPosition() < (it.getExtendSlot() * 100 + 10200))
                        .forEach(item -> {
                            addItemPosition(mplew, item, false, true);
                            GW_ItemSlotBase_Encode(mplew, item, chr);
                        });
                mplew.writeInt(-1);
            }
        }
        if ((flag & 0x20L) != 0x0L) {
            //開始加載其他欄擴展背包道具    3
            eiv = MapleInventoryType.ETC;
            List<Item> exSlots = chr.getExtendedSlots(eiv.getType());
            mplew.writeInt(exSlots.size());
            for (Item it : exSlots) {
                mplew.writeInt(it.getExtendSlot());
                mplew.writeInt(it.getItemId());
                chr.getInventory(eiv).list().stream()
                        .filter(item -> item.getPosition() > (it.getExtendSlot() * 100 + 10100) && item.getPosition() < (it.getExtendSlot() * 100 + 10200))
                        .forEach(item -> {
                            addItemPosition(mplew, item, false, true);
                            GW_ItemSlotBase_Encode(mplew, item, chr);
                        });
                mplew.writeInt(-1);
            }
        }
        if ((flag & 0x1000000L) != 0x0L) {// nSenseEXP
            mplew.writeInt(0);
        }
        if ((flag & 0x40000000L) != 0x0L) {// DayLimit.nWill
            mplew.writeInt(0);
        }
        if ((flag & 0x800000L) != 0x0L) { // 吃蟲寶石君
            mplew.write(0);
        }
        // SkillInfo
        if ((flag & 0x100L) != 0x0L) {
            Map<Integer, SkillEntry> skills = chr.getSkills(true);
            mplew.write(1);  //V.100新加
            mplew.writeShort(skills.size());
            for (Entry<Integer, SkillEntry> skillinfo : skills.entrySet()) {
                Skill skill = SkillFactory.getSkill(skillinfo.getKey());
                mplew.writeInt(skill.getId());
                if (skill.isLinkSkills()) { //別人傳授給角色的技能 寫別人角色的ID
                    mplew.writeInt(skillinfo.getValue().teachId);
                } else if (skill.isTeachSkills()) { //如果是自己的傳授技能 傳授對像不為空寫傳授對象的角色ID 如果為空寫 自己的角色ID
                    mplew.writeInt(skillinfo.getValue().teachId > 0 ? skillinfo.getValue().teachId : chr.getId()); //skillinfo.getValue().skillevel
                } else {
                    mplew.writeInt(skillinfo.getValue().skillevel);
                }
                addExpirationTime(mplew, skillinfo.getValue().expiration);
                if (skill.isFourthJob()) {
                    mplew.writeInt(skillinfo.getValue().masterlevel);
                }
                if (skill.getId() == 陰陽師.紫扇傳授 || skill.getId() == 陰陽師.紫扇傳授_傳授) {
                    mplew.writeInt(skillinfo.getValue().masterlevel);
                }
            }
            //傳授技能的等級
            Map<Integer, SkillEntry> teachList = chr.getLinkSkills();
            mplew.writeShort(teachList.size());
            for (Entry<Integer, SkillEntry> skill : teachList.entrySet()) {
                mplew.writeInt(skill.getKey());
                mplew.writeShort(skill.getValue().skillevel - 1);
            }
            // getSonOfLinkedSkills
            Map<Integer, Pair<Integer, SkillEntry>> sonOfLinkedSkills = chr.getSonOfLinkedSkills();
            mplew.writeInt(sonOfLinkedSkills.size());
            for (Entry<Integer, Pair<Integer, SkillEntry>> entry : sonOfLinkedSkills.entrySet()) {
                writeSonOfLinkedSkill(mplew, entry.getKey(), entry.getValue());
            }

            mplew.write(0);
            for (int n = 0; n < 3; n++) {
                int nCount = 0;
                mplew.writeInt(nCount);
                for (int i = 0; i < nCount; i++) {
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                }
            }
        }
        // CoolDownInfo
        if ((flag & 0x8000L) != 0x0L) {
            List<MapleCoolDownValueHolder> cooldowns = chr.getCooldowns();
            mplew.writeShort(cooldowns.size());
            for (MapleCoolDownValueHolder cooling : cooldowns) {
                mplew.writeInt(cooling.skillId);
                int timeLeft = (int) (cooling.length + cooling.startTime - System.currentTimeMillis());
                mplew.writeInt(timeLeft / 1000); //V.103修改為int
                //System.out.println("技能冷卻 - 技能ID: " + cooling.skillId + " 剩餘時間: " + (timeLeft / 1000) + " 秒");
            }
        }
        if ((flag & 0x1L) != 0x0L) {
            for (int n = 0; n < 6; n++) {
                mplew.writeInt(0);
            }
            for (int n = 0; n < 6; n++) {
                mplew.write(0);
            }
        }
        // QuestInfo
        if ((flag & 0x200L) != 0x0L) {
            List<MapleQuestStatus> started = chr.getStartedQuests();
            boolean bUnk = true;
            mplew.write(bUnk);
            mplew.writeShort(started.size());
            for (MapleQuestStatus q : started) { // 檢測是否接過任務
                mplew.writeInt(q.getQuest().getId()); // 任務ID
//            mplew.writeShort(0); // 若任務ID不存在為0，否則為-1
                if (q.hasMobKills()) {
                    StringBuilder sb = new StringBuilder();
                    for (int kills : q.getMobKills().values()) {
                        sb.append(StringUtil.getLeftPaddedStr(String.valueOf(kills), '0', 3));
                    }
                    mplew.writeMapleAsciiString(sb.toString());
                } else {
                    mplew.writeMapleAsciiString(q.getCustomData() == null ? "" : q.getCustomData());
                }
            }
            if (!bUnk) {
                mplew.writeShort(0); // for UInt
            }
            mplew.writeShort(0); // String String
        }
        if ((flag & 0x4000L) != 0x0L) {
            boolean bUnk = true;
            mplew.write(bUnk);
            List<MapleQuestStatus> completed = chr.getCompletedQuests();
            mplew.writeShort(completed.size());
            for (MapleQuestStatus q : completed) {
                mplew.writeInt(q.getQuest().getId());
                mplew.writeLong(getTime(q.getCompletionTime()));//int to long at V.149
            }
            if (!bUnk) {
                mplew.writeShort(0); // for UInt
            }
        }
        if ((flag & 0x400L) != 0x0L) {
            mplew.writeShort(0);
        }
        /*
        * RingInfo
         */
        if ((flag & 0x800L) != 0x0L) {
            Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> aRing = chr.getRings(true);
            //戀人戒指
            List<MapleRing> cRing = aRing.getLeft();
            mplew.writeShort(cRing.size());
            for (MapleRing ring : cRing) { // 35
                mplew.writeInt(ring.getPartnerChrId());
                mplew.writeAsciiString(ring.getPartnerName(), 15);
                mplew.writeLong(ring.getRingId());
                mplew.writeLong(ring.getPartnerRingId());
            }
            //好友戒指
            List<MapleRing> fRing = aRing.getMid();
            mplew.writeShort(fRing.size());
            for (MapleRing ring : fRing) { // 39
                mplew.writeInt(ring.getPartnerChrId());
                mplew.writeAsciiString(ring.getPartnerName(), 15);
                mplew.writeLong(ring.getRingId());
                mplew.writeLong(ring.getPartnerRingId());
                mplew.writeInt(ring.getItemId());
            }
            //結婚戒指
            List<MapleRing> mRing = aRing.getRight();
            mplew.writeShort(mRing.size());
            for (MapleRing ring : mRing) {// 52
                mplew.writeInt(chr.getMarriageId());
                mplew.writeInt(chr.getId());
                mplew.writeInt(ring.getPartnerChrId());
                mplew.writeShort(3); //1 = engaged 3 = married
                mplew.writeInt(ring.getItemId());
                mplew.writeInt(ring.getItemId());
                mplew.writeAsciiString(chr.getName(), 15);
                mplew.writeAsciiString(ring.getPartnerName(), 15);
            }
        }
        /*
        * RocksInfo
         */
        if ((flag & 0x1000L) != 0x0L) {
            int[] mapz = chr.getRegRocks();
            for (int i = 0; i < 5; i++) { // VIP teleport map
                mplew.writeInt(mapz[i]);
            }
            int[] map = chr.getRocks();
            for (int i = 0; i < 10; i++) { // VIP teleport map
                mplew.writeInt(map[i]);
            }
            int[] maps = chr.getHyperRocks();
            for (int i = 0; i < 13; i++) { // VIP teleport map
                mplew.writeInt(maps[i]);
            }
        }
        /*
         * QuestDataInfo
         * 將任務數據根據共享級別分開存放
         */

        if ((flag & 0x40000L) != 0x0L) {
            Map<Integer, String> questInfos = new LinkedHashMap<>();
            for (Entry<Integer, String> quest : chr.getInfoQuest_Map().entrySet()) {
                questInfos.put(quest.getKey(), quest.getValue());
            }
            for (Map.Entry<Integer, String> wsi : chr.getWorldShareInfo().entrySet()) {
                if (!GameConstants.isWorldShareQuest(wsi.getKey())) {
                    questInfos.put(wsi.getKey(), wsi.getValue());
                }
            }
            mplew.writeShort(questInfos.size());
            for (Entry<Integer, String> quest : questInfos.entrySet()) {
                mplew.writeInt(quest.getKey());
                mplew.writeMapleAsciiString(quest.getValue() == null ? "" : quest.getValue());
            }
        }
        if ((flag & 0x20L) != 0x0L) {
            short nCount = 0;
            mplew.writeShort(nCount);
            for (int i = 0; i < nCount; i++) {
                mplew.writeInt(0);
                //AvatarLook::Decode
            }
        }
        if ((flag & 0x80000L) != 0x0L) {
            mplew.writeShort(0);//V.146 new
        }
        mplew.writeBool(true);
        if ((flag & 0x80L) != 0x0L) {
            int nCount = 0;
            mplew.writeInt(nCount);
            for (int j = 0; j < nCount; ++j) {
                mplew.writeInt(26);
                mplew.writeMapleAsciiString("Present=7");
            }
        }
        if ((flag & 0x1000L) != 0x0L) {
            int nCount = 0;
            mplew.writeInt(nCount);
            for (int k = 0; k < nCount; ++k) {
                mplew.writeInt(6340);
                mplew.writeInt(-1);
            }
        }
        if ((flag & 0x200000L) != 0x0L) {
            addJaguarInfo(mplew, chr); // 狂豹獵人的豹子信息 不是該職業就不發送
        }
        if ((flag & 0x800L) != 0x0L) {
            if (JobConstants.is神之子(chr.getJob())) {
                chr.getStat().zeroData(mplew, chr, 0xffff, chr.isBeta());
            }
        }
        if ((flag & 0x4000000L) != 0x0L) {
            mplew.writeShort(chr.getBuyLimit().size() + chr.getAccountBuyLimit().size());
            for (Entry<Integer, NpcShopBuyLimit> entry : chr.getBuyLimit().entrySet()) {
                final int shopId = entry.getKey();
                final NpcShopBuyLimit buyLimit = entry.getValue();
                final MapleShop shop = MapleShopFactory.getInstance().getShop(shopId);
                mplew.writeShort((shop != null) ? buyLimit.getData().size() : 0);
                mplew.writeInt(shopId);
                if (shop != null) {
                    for (Entry<Integer, BuyLimitData> o2 : buyLimit.getData().entrySet()) {
                        final int itemId = o2.getKey();
                        final BuyLimitData data = o2.getValue();
                        final int count = data.getCount();
                        final long date = data.getDate();
                        mplew.writeInt(shopId);
                        mplew.writeShort(shop.getBuyLimitItemIndex(o2.getKey()));
                        mplew.writeInt(itemId);
                        mplew.writeShort(count);
                        addExpirationTime(mplew, date);
                    }
                }
            }
            for (Entry<Integer, NpcShopBuyLimit> entry : chr.getAccountBuyLimit().entrySet()) {
                final int shopId = entry.getKey();
                final NpcShopBuyLimit buyLimit = entry.getValue();
                final MapleShop shop = MapleShopFactory.getInstance().getShop(shopId);
                mplew.writeShort((shop != null) ? buyLimit.getData().size() : 0);
                mplew.writeInt(shopId);
                if (shop != null) {
                    for (Entry<Integer, BuyLimitData> o2 : buyLimit.getData().entrySet()) {
                        final int itemId = o2.getKey();
                        final BuyLimitData data = o2.getValue();
                        final int count = data.getCount();
                        final long date = data.getDate();
                        mplew.writeInt(shopId);
                        mplew.writeShort(shop.getBuyLimitItemIndex(o2.getKey()));
                        mplew.writeInt(itemId);
                        mplew.writeShort(count);
                        addExpirationTime(mplew, date);
                    }
                }
            }
        }
        //V.160 new:
        if ((flag & 0x20000000L) != 0x0L) {
            int nCount = 0;
            mplew.writeShort(nCount);
            for (int i = 0; i < nCount; i++) {
                int nnCount = 0;
                mplew.writeShort(nnCount);
                int a1 = 0;
                mplew.writeInt(a1); // 9063002
                if (nnCount > 0 && a1 > 0) {
                    for (int j = 0; j < nnCount; j++) {
                        mplew.writeInt(0); // 9063002
                        mplew.writeShort(0); // 36
                        mplew.writeInt(0); // 2439267
                        mplew.writeShort(0); // 1
                        mplew.writeLong(0); // 2019/3/27 下午 5:22
                    }
                }
            }
        }
        //end
        if ((flag & 0x20000000L) != 0x0L) {
            //獲取複製技能數裝備的技能列表
            for (int i = 0; i < 16; i++) {
                mplew.writeInt(chr.getStealMemorySkill(i));
            }
        }
        if ((flag & 0x10000000L) != 0x0L) {
            //裝備中的技能
            int[] p_skills = {幻影俠盜.盜亦有道Ⅰ, 幻影俠盜.盜亦有道Ⅱ, 幻影俠盜.盜亦有道Ⅲ, 幻影俠盜.盜亦有道Ⅳ, 幻影俠盜.盜亦有道H};
            for (int i : p_skills) {
                mplew.writeInt(chr.getEquippedStealSkill(i));
            }
        }
        if ((flag & 0x80000000L) != 0x0L) {
            mplew.writeShort(chr.getInnerSkillSize()); //內在能力技能數量
            for (int i = 0; i < chr.getInnerSkillSize(); i++) {
                InnerSkillEntry innerSkill = chr.getInnerSkills()[i];
                if (innerSkill != null) {
                    mplew.write(innerSkill.getPosition()); // key
                    mplew.writeInt(innerSkill.getSkillId()); // id 7000000 id ++
                    mplew.write(innerSkill.getSkillLevel());  // level
                    mplew.write(innerSkill.getRank()); // rank, C, B, A, and S
                } else {
                    mplew.writeZeroBytes(7);
                }
            }
        }
        if ((flag & 0x400000L) != 0x0L) {
            mplew.writeShort(chr.getSoulCollection().size());
            for (Entry<Integer, Integer> entry : chr.getSoulCollection().entrySet()) {
                mplew.writeInt(entry.getKey());
                mplew.writeInt(entry.getValue());
            }
        }
        if ((flag & 0x1L) != 0x0L) {
            mplew.writeInt(1); //榮譽等級//118已經不存在了
            mplew.writeInt(chr.getHonor()); //聲望點數
        }
        if ((flag & 0x2000L) != 0x0L) {
            addCoreAura(mplew, chr); //寶盒屬性信息
            mplew.writeBool(!JobConstants.is蒼龍俠客(chr.getJob()) && !JobConstants.is幻獸師(chr.getJob())); //判斷職業
        }
        /*
        if ((flag & 0x4000L) != 0x0L) {//  OX Quiz
            int nCount = 0;
            mplew.writeShort(nCount);
            for (int i = 0; i < nCount; i++) {
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeMapleAsciiString("");
                mplew.write(0);
                mplew.writeLong(0);
                mplew.writeInt(0);
                mplew.writeMapleAsciiString("");
                mplew.write(0);
                mplew.write(0);
                mplew.writeLong(0);
                mplew.writeMapleAsciiString("");
            }
        }
        */
        if ((flag & 0x8000L) != 0x0L) {// 經驗椅子
            mplew.writeShort(0);
        }
        if ((flag & 0x10000L) != 0x0L) {
            addRedLeafInfo(mplew, chr);
        }
        if ((flag & 0x20000L) != 0x0L) {
            mplew.writeShort(0);
        }
        if ((flag & 0x2L) != 0x0L) {
            mplew.write(1);
            mplew.writeShort(0);
        }
        if ((flag & 0x4L) != 0x0L) {
            mplew.write(0);
        }
        if ((flag & 0x8L) != 0x0L) {
            writeDressUpInfo(mplew, chr);
        }
        if ((flag & 0x200000L) != 0x0L) {
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeLong(getTime(-2L));
        }
        if ((flag & 0x10L) != 0x0L) {
            writeEsInfo(mplew, chr);
        }
        if ((flag & 0x200L) != 0x0L) {
            mplew.write(0);
        }
        //V.160 new:
        if ((flag & 0x40000000L) != 0x0L) {
            mplew.writeLong(0L);
            mplew.writeLong(0L);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeShort(0);// V.181 new
        }
        //end
        if ((flag & 0x400L) != 0x0L) {
            mplew.writeInt(chr.getLove()); //V.112新增 好感度
            mplew.writeLong(PacketHelper.getTime(-2)); //00 40 E0 FD 3B 37 4F 01
            mplew.writeInt(0);
        }
        // v133 start
        if ((flag & 0x800000L) != 0x0L) {
            mplew.writeInt(chr.getId());
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeLong(PacketHelper.getTime(-2));
            mplew.writeInt(10);
        }
        if ((flag & 0x2000000L) != 0x0L) {
            mplew.writeInt(0); // -> int byte byte byte
            mplew.writeInt(0);
            mplew.writeLong(0L);

            mplew.writeInt(0); // -> int byte byte byte
            mplew.writeInt(0);
        }
        /*
          賬號下角色共享任務數據
         */
        Map<Integer, String> wsInfos = new LinkedHashMap<>();
        for (Map.Entry<Integer, String> wsi : chr.getWorldShareInfo().entrySet()) {
            if (GameConstants.isWorldShareQuest(wsi.getKey())) {
                wsInfos.put(wsi.getKey(), wsi.getValue());
            }
        }
        mplew.writeShort(wsInfos.size());
        for (Entry<Integer, String> quest : wsInfos.entrySet()) {
            mplew.writeInt(quest.getKey());
            mplew.writeMapleAsciiString(quest.getValue() == null ? "" : quest.getValue());
        }
        // v133 end
        if ((flag & 0x1000000L) != 0x0L) {
            mplew.writeShort(chr.getMobCollection().size());
            for (Entry<Integer, String> entry : chr.getMobCollection().entrySet()) {
                mplew.writeInt(entry.getKey());
                mplew.writeMapleAsciiString(entry.getValue());
            }
        }
        mplew.writeInt(0); // sub_58B140
        if ((flag & 0x4000000L) != 0x0L) {
            mplew.writeShort(0);
        }
        if ((flag & 0x8000000L) != 0x0L) {
            // VCoreSkill
            VCorePacket.writeVCoreSkillData(mplew, chr);
        }
        if ((flag & 0x10000000L) != 0x0L) { // TMS 229 done
            mplew.writeInt(chr.getClient().getAccID());
            mplew.writeInt(chr.getId());
            mplew.writeInt(0);
            mplew.writeInt(-1);
            mplew.writeInt(Integer.MAX_VALUE);
            mplew.writeLong(DateUtil.getFileTimestamp(-2));
            mplew.writeLong(0);
            mplew.writeLong(0);
            int a2 = 0;
            mplew.writeInt(a2);
            for (int i = 0; i < a2; i++) {
                mplew.writeInt(0);
                mplew.write(0);
                mplew.write(0);
                mplew.writeLong(0);
                mplew.writeMapleAsciiString("");
            }
            int v6 = 0;
            mplew.writeInt(v6);
            for (int i = 0; i < v6; i++) {
                mplew.writeInt(0);
                mplew.write(0);
                mplew.writeLong(0);
            }
        }
        if ((flag & 0x20L) != 0x0L) { // TMS 229 done
            mplew.writeInt(0);// 未知，V.144新增
        }

        for (int num = 3; num > 0; num--) { // TMS 229 done
            if ((flag & (num <= 2 ? 0x80000000L : 0x10000000L)) != 0x0L) {
                encodeCombingRoomInventory(mplew, chr.getSalon().getOrDefault(num, new LinkedList<>()));
            }
        }

        if ((flag & 0x8000000L) != 0x0L) { // TMS 229 done
            mplew.writeInt(0);

            mplew.writeInt(0);
            mplew.writeShort(8);

            mplew.writeInt(0);

            mplew.writeInt(0);
        }
        if ((flag & 0x20000000L) != 0x0L) { // TMS 238 done
            mplew.writeInt(pets.size());
            for (MaplePet pet : pets) {
                mplew.writeLong(pet.getUniqueId());
                int a2 = 0;
                mplew.writeInt(a2);
                for (int j = 0; j < a2; j++) {
                    mplew.writeInt(0);
                }
            }
        }
        if ((flag & 0x40000L) != 0x0L) { // TMS 229 done
            mplew.write(1);
            String string = chr.getOneInfo(17008, "T");
            String string2 = chr.getOneInfo(17008, "L");
            String string3 = chr.getOneInfo(17008, "E");
            mplew.write(string == null ? 0 : Integer.valueOf(string));
            mplew.writeInt(string2 == null ? 1 : Integer.valueOf(string2));
            mplew.writeInt(string3 == null ? 0 : Integer.valueOf(string3));
            mplew.writeInt(100 - chr.getPQLog("航海能量"));
            mplew.writeLong(getTime(System.currentTimeMillis()));

            String questinfo = chr.getInfoQuest(17018);
            String[] questinfos = questinfo.split(";");
            mplew.writeShort(!questinfo.isEmpty() ? questinfos.length : 0);
            for (String questinfo1 : questinfos) {
                if (!questinfo1.isEmpty()) {
                    String[] split = questinfo1.split("=");
                    mplew.write(Integer.valueOf(split[0]));
                    mplew.writeInt(Integer.valueOf(split[1]));
                    mplew.writeInt(0);
                }
            }
            mplew.writeShort(ItemConstants.航海材料.length);
            for (int i : ItemConstants.航海材料) {
                mplew.writeInt(i);
                mplew.writeInt(chr.getPQLog(String.valueOf(i)));
                mplew.writeLong(getTime(System.currentTimeMillis()));
            }
        }
        if ((flag & 0x80000L) != 0x0L) { // TMS 229 done
            mplew.write(0);
        }
        if ((flag & 0x800000L) != 0x0L) { // TMS 229 done
            // 內面耀光技能
            List<Integer> buffs = new LinkedList<>();
            if (chr.getKeyValue("InnerGlareBuffs") != null) {
                for (String s : chr.getKeyValue("InnerGlareBuffs").split(",")) {
                    if (s.isEmpty()) {
                        continue;
                    }
                    buffs.add(Integer.parseInt(s));
                }
            }
            mplew.writeReversedVarints(buffs.size());
            for (int buffId : buffs) {
                mplew.writeInt(buffId);
            }
        }
    }

    public static void encodeCombingRoomInventory(MaplePacketLittleEndianWriter mplew, List<Pair<Integer, Integer>> styles) {
        mplew.write(styles.size());
        mplew.write(styles.size());
        for (int i = 1; i <= 102; i++) { // TMS 232 9 -> 102
            mplew.write(styles.size() >= i);
            if (styles.size() >= i) {
                encodeCombingRoomSlot(mplew, styles.get(i - 1));
            }
        }
    }

    public static void encodeCombingRoomSlot(MaplePacketLittleEndianWriter mplew, Pair<Integer, Integer> style) {
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(style.left);
        int mixValue = style.right;
        mplew.write(mixValue / 1000);
        mixValue = Math.abs(mixValue % 1000);
        mplew.write(mixValue / 100);
        mplew.write(mixValue % 100);
    }

    public static void addRedLeafInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        int idarr[] = new int[]{9410165, 9410166, 9410167, 9410168, 9410198};
        mplew.writeInt(chr.getClient().getAccID());
        mplew.writeInt(chr.getId());
        mplew.writeInt(idarr.length);
        mplew.writeInt(0);
        for (int i = 0; i < idarr.length; i++) {
            mplew.writeInt(idarr[i]);
            mplew.writeInt(chr.getFriendShipPoints()[i]);
        }
    }

    public static void encodeInventory(MaplePacketLittleEndianWriter mplew, List<Item> list, MapleCharacter chr) {
        List<Item> items = new LinkedList<>(list);
        items.add(null);
        for (Item item : items) {
            addItemPosition(mplew, item, false, false);
            if (item == null) {
                break;
            }
            GW_ItemSlotBase_Encode(mplew, item, chr);
        }
    }

    /*
     * 寶盒信息
     */
    public static void addCoreAura(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        MapleCoreAura aura = chr.getCoreAura();
        if (aura != null) {
            mplew.writeInt(chr.getId()); //角色ID
            mplew.writeInt(aura.getId()); //傳授者的ID
            mplew.writeInt(aura.getLevel()); //傳授者的等級
            mplew.writeInt(aura.getCoreAuraLevel()); //寶盒的等級
            mplew.writeInt(aura.getTotal()); //總點數

            mplew.writeInt(aura.getWatk()); //攻擊
            mplew.writeInt(aura.getDex()); //敏捷
            mplew.writeInt(aura.getLuk()); //幸運
            mplew.writeInt(aura.getMagic()); //魔攻
            mplew.writeInt(aura.getInt()); //智力
            mplew.writeInt(aura.getStr()); //力量

            mplew.writeInt(0x05); //未知 5
            mplew.writeInt(0x20); //寶盒單個屬性的最大上限 32
            mplew.writeInt(0x12); //未知 18
            mplew.writeInt(0x44); //未知 68

            mplew.writeLong(getTime(aura.getExpiration()));
        } else {
            mplew.writeZeroBytes(60);
            mplew.writeLong(getTime(System.currentTimeMillis())); //寶盒的時間
        }
        mplew.write(0);
    }

    /*
     * 0 = 全體
     * 1 = 裝備
     * 2 = 消耗
     * 3 = 設置
     * 4 = 其他
     * 5 = 配方
     * 6 = 卷軸
     * 7 = 特殊
     * 8 = 8週年
     * 11 = 材料
     * 80 = 喬
     * 81 = 海麗密
     * 82 = 小龍
     * 83 = 李卡司
     */
    public static void addShopInfo(MaplePacketLittleEndianWriter mplew, MapleShop shop, MapleClient c) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(DateUtil.getTime()); //當前系統時間的年月日時
        mplew.writeInt(0); // m_nShopVerNo
        //道具數量+玩家回購數量
        List<MapleShopItem> shopItems = shop.getItems(c);
        mplew.writeShort(shopItems.size());
        for (MapleShopItem item : shopItems) { //加載商店道具
            mplew.writeInt(1000000);//V.160 new
            mplew.writeInt(item.getItemId()); //物品ID
            mplew.writeInt(item.getCategory()); //物品顯示位置
            mplew.writeInt(1000000);//V.160 new
            mplew.writeInt(60 * 24 * item.getPeriod()); //購入後X日內可以使用。
            mplew.writeInt(item.getPotentialGrade());
            mplew.writeLong(item.getPrice()); // 楓幣價格
            mplew.writeInt(item.getTokenItemID()); //購買道具所需要的物品ID
            mplew.writeInt(item.getTokenPrice()); //購買道具需要的物品數量
            mplew.writeInt(item.getPointQuestID()); //購買道具需要的點數任務ID
            mplew.writeInt(item.getPointPrice()); //購買道具需要的任務點數
            mplew.writeInt(0);
            boolean saleInfo = false;
            mplew.write(saleInfo);
            if (saleInfo) {
                // Func {
                mplew.writeInt(0); // X%折扣
                mplew.write(0); // 1
                mplew.write(0);
                mplew.writeMapleAsciiString("");
                mplew.writeInt(0);
                mplew.writeMapleAsciiString("");
                mplew.writeLong(getTime(-2));
                mplew.writeLong(getTime(-2));
//                mplew.writeMapleAsciiString(""); // 09月 01日, 09月 29日, 10月 20日
                int nSaleDateSize = 0;
                mplew.writeInt(nSaleDateSize);
                for (int j = 0; j < nSaleDateSize; j++) {
                    mplew.writeLong(0); // 打折日期
                }
                // }
            }
            mplew.writeInt(item.getBuyLimit());//剩餘數量
            mplew.writeInt(item.getBuyLimitWorldAccount());//剩餘數量(帳號共通)
            mplew.writeInt(item.getMinLevel()); // 購買等級限制
            mplew.writeShort(item.getMinLevel()); // item.nShowLevMin
            mplew.writeShort(item.getMaxLevel()); // item.nShowLevMax
            mplew.write(item.getResetType());
            if (item.getResetType() == 1 || item.getResetType() == 3 || item.getResetType() == 4) {
                long[] ris = item.getResetInfo();
                mplew.writeInt(ris == null ? 0 : ris.length);
                if (ris != null) {
                    for (long ri : ris) {
                        mplew.writeLong(getTime(ri));
                    }
                }
            }
            mplew.write(0); // item.bWorldBlock
            mplew.writeLong(getTime(item.getSellStart()));
            mplew.writeLong(getTime(item.getSellEnd()));
            mplew.writeInt(0); // item.nQuestID
            mplew.writeShort(0);
            mplew.write(0); // V.151 new
            mplew.writeInt(0); // item.nQuestExID
            mplew.writeMapleAsciiString(""); // item.sQuestExKey
            mplew.writeInt(0); // item.nQuestExValue
            mplew.writeInt(0);//V.160 new
            mplew.write(0); // TMS V.220 mew
            mplew.writeMapleAsciiString("");
            int slotMax = ii.getSlotMax(item.getItemId());
            if (ItemConstants.類型.可充值道具(item.getItemId())) {
                mplew.writeDouble(ii.getUnitPrice(item.getItemId()));
            } else {
                int quantity = item.getQuantity() == 0 ? slotMax : item.getQuantity();
                mplew.writeShort(quantity);
                slotMax = quantity > 1 ? 1 : item.getBuyable() == 0 ? slotMax : item.getBuyable(); // 可購買數量
            }
            mplew.writeShort(slotMax);
            mplew.writeLong(getTime(-1)); //V.152 new
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeMapleAsciiString("1900010100");
            mplew.writeMapleAsciiString("2079010100");

            // sub_5991F0
            for (int i = 0; i < 4; i++) {// 4 * 4
                mplew.writeInt(0);
            }
            int[] idarr = new int[]{9410165, 9410166, 9410167, 9410168, 9410198};
            for (int k = 0; k < idarr.length; k++) {// 40
                mplew.writeInt(idarr[k]);
                mplew.writeInt(c.getPlayer().getFriendShipPoints()[k]);
            }
            //

            /*
            if (shop.getRanks().size() > 0) {
                mplew.write(item.getPosition() >= 0 ? 1 : 0);
                if (item.getPosition() >= 0) {
                    mplew.write(item.getPosition());
                }
            }
            */
            //回購欄的道具信息
            Item rebuy = item.getRebuy();
            mplew.write(rebuy == null ? 0 : 1);
            if (rebuy != null) {
                GW_ItemSlotBase_Encode(mplew, rebuy);
            }
        }
    }

    public static void addJaguarInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        if (JobConstants.is狂豹獵人(chr.getJob())) {
            mplew.write(chr.getIntNoRecord(GameConstants.JAGUAR));
//            mplew.writeHexString("F8 76 12 00 72 CE 20 00 31 95 4E 00 1D 5D 7C 00 00 00 00 00");
            for (int i = 1; i <= 5; i++) {
                mplew.writeInt(0); //probably mobID of the 5 mobs that can be captured.
            }
        }
    }

    public static void addSkillPets(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        //mplew.write(JobConstants.is陰陽師(chr.getJob()) ? 1 : 0);
        if (JobConstants.is陰陽師(chr.getJob()) && chr.getHaku() != null) {
            mplew.write(1);
            mplew.writeInt(chr.getHaku().getObjectId());
            mplew.writeInt(陰陽師.花狐的同行);
            mplew.write(1);//chr.getLittleWhite().isShow() ? 1 : 2
            mplew.writePos(chr.getHaku().getPosition());
            mplew.write(0);
            mplew.writeShort(chr.getHaku().getStance());
        }
    }

    public static void writeDressUpInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter player) {
        boolean bl2 = JobConstants.is天使破壞者(player.getJob());
        if (bl2 && player.getKeyValue("Longcoat") == null) {
            player.setKeyValue("Longcoat", "1051291");
        }
        mplew.writeInt(bl2 ? player.getSecondFace() : 0);
        mplew.writeInt(bl2 ? player.getSecondHair() : 0);
        mplew.writeInt(bl2 ? Integer.valueOf(player.getKeyValue("Longcoat")) : 0);
        mplew.write(bl2 ? player.getSecondSkinColor() : 0);
        mplew.writeInt(bl2 ? player.getSecondHairBaseColor() : -1);
        mplew.writeInt(bl2 ? player.getSecondHairMixedColor() : 0);
        mplew.writeInt(bl2 ? player.getSecondHairProbColor() : 0);
    }

    public static void write劍刃之壁(MaplePacketLittleEndianWriter mplew, MapleCharacter player, int sourceid) {
        ArrayList<Integer> arrayList = new ArrayList<>();
        int n4 = 0;
        switch (sourceid) {
            case 凱撒.意志之劍: {
                n4 = 1;
                break;
            }
            case 凱撒.進階意志之劍: {
                n4 = 2;
                break;
            }
            case 凱撒.意志之劍_變身: {
                n4 = 3;
                break;
            }
            case 凱撒.進階意志之劍_變身: {
                n4 = 4;
            }
        }
        int n5 = sourceid == 凱撒.意志之劍 || sourceid == 凱撒.意志之劍_變身 ? 3 : (sourceid == 0 ? 0 : 5);
        for (int i2 = 0; i2 < n5; ++i2) {
            arrayList.add(0);
        }
        mplew.writeInt(n4);
        mplew.writeInt(n5);
        mplew.writeInt(player.getBuffedIntZ(MapleBuffStat.StopForceAtomInfo));
        mplew.writeInt(arrayList.size());
        arrayList.forEach(mplew::writeInt);
    }

    public static void writeSonOfLinkedSkill(MaplePacketLittleEndianWriter mplew, int skillId, Pair<Integer, SkillEntry> skillinfo) {
        mplew.writeInt(skillinfo.getLeft());
        mplew.writeInt(skillinfo.getRight().teachId);
        mplew.writeInt(skillId);
        mplew.writeShort(skillinfo.getRight().skillevel);
        mplew.writeLong(PacketHelper.getTime(skillinfo.getRight().expiration));
        mplew.writeInt(skillinfo.getRight().teachTimes);
    }

    public static void writeEsInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        MapleInventory inventory = chr.getInventory(MapleInventoryType.ELAB);
        List<Item> list = inventory.newList();
        List<Item> list2 = new ArrayList<>();
        for (Item item : list) {
            if (item.getESPos() != 0) {
                list2.add(item);
            }
        }
        mplew.writeShort(list2.size());
        for (Item item : list2) {
            mplew.writeShort(item.getESPos() - 1);
            mplew.writeInt(item.getItemId());
            mplew.writeInt(item.getQuantity());
        }
        mplew.writeShort(inventory.list().size());
        for (Item item : inventory.list()) {
            mplew.writeShort(item.getESPos() - 1);
            mplew.writeInt(item.getItemId());
            mplew.writeInt(item.getQuantity());
        }
    }

    public static void addDamageSkinInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.write(1); // 顯示當前傷害皮膚的信息
        int skinId = chr.getDamageSkin();
        addDamageSkinInfo0(mplew, skinId, skinId >= 0 ? MapleItemInformationProvider.getInstance().getDamageSkinItemId(skinId) : 0, 0, "");
        addDamageSkinInfo0(mplew, -1, 0, 1, "");
        addDamageSkinInfo0(mplew, -1, 0, 1, ""); // TMS 229
        final String questInfo = chr.getOneInfo(56829, "count");
        mplew.writeShort((questInfo == null) ? ServerConfig.defaultDamageSkinSlot : Integer.valueOf(questInfo));
        mplew.writeShort(chr.getDamSkinList().size());
        for (int id : chr.getDamSkinList()) {
            addDamageSkinInfo0(mplew, id, id >= 0 ? MapleItemInformationProvider.getInstance().getDamageSkinItemId(id) : 0, 0, "");
        }
    }

    private static void addDamageSkinInfo0(MaplePacketLittleEndianWriter mplew, int skinId, int skinItemId, int b, String s) {
        mplew.writeInt(skinId);
        mplew.writeInt(skinItemId);
        mplew.write(b);
        mplew.writeMapleAsciiString(s);
        mplew.writeInt(0);
    }

    public static void addChaterName(MaplePacketLittleEndianWriter mplew, String speekerName, String text) {
        addChaterName(mplew, speekerName, text, 0);
    }

    public static void addChaterName(MaplePacketLittleEndianWriter mplew, String speekerName, String text, int chrId) {
        mplew.writeMapleAsciiString(speekerName);//V.153 new
        mplew.writeMapleAsciiString(text);//V.153 new
        mplew.writeInt(0);//V.153 new
        mplew.writeInt(0);//V.156 new
        mplew.write(0);//V.161 new
        mplew.writeInt(chrId);//V.161 new
    }
}
