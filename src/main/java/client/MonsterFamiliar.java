package client;

import client.inventory.FamiliarCard;
import configs.ServerConfig;
import server.MapleItemInformationProvider;
import server.StructItemOption;
import server.maps.AnimatedMapleMapObject;
import server.maps.MapleMapObjectType;
import server.movement.LifeMovement;
import server.movement.LifeMovementFragment;
import tools.Randomizer;
import tools.data.MaplePacketLittleEndianWriter;
import packet.SpecialPacket;

import java.awt.*;
import java.io.Serializable;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public final class MonsterFamiliar extends AnimatedMapleMapObject implements Serializable {

    private static final long serialVersionUID = 795419937713738569L;
    private int id;
    private int familiar;
    private int characterid;
    private int exp;
    private String name;
    private short fh = 0;
    private byte grade, level;
    private int skill, option1, option2, option3;
    private int index;
    private double pad;
    private boolean summoned = false;

    public MonsterFamiliar(int id, int familiar, int characterid, String name, byte grade, byte level, int exp, int skill, int option1, int option2, int option3, boolean summoned) {
        this.id = id;
        this.familiar = familiar;
        this.characterid = characterid;
        this.name = name;
        this.grade = (byte) Math.min(Math.max(0, grade), 4);
        this.level = (byte) Math.min(Math.max(1, level), 5);
        this.exp = exp;
        this.skill = skill;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        setStance(0);
        setPosition(new Point(0, 0));
        this.summoned = summoned;
    }

    public MonsterFamiliar(int characterid, int familiar, FamiliarCard mf) {
        this.id = Randomizer.nextInt();
        this.characterid = characterid;
        this.familiar = familiar;
        this.name = "";
        this.grade = mf.getGrade();
        this.level = mf.getLevel();
        this.skill = mf.getSkill() > 0 ? mf.getSkill() : Randomizer.rand(800, 904) + 1;
        this.pad = MapleItemInformationProvider.getInstance().getFamiliarTable_pad().get(getGrade()).get(level - 1);
        if (mf.getOption1() > 0 || mf.getOption2() > 0 || mf.getOption3() > 0) {
            this.option1 = mf.getOption1();
            this.option2 = mf.getOption2();
            this.option3 = mf.getOption3();
        } else {
            initOptions();
        }
    }

    public void initPad() {
        this.pad = MapleItemInformationProvider.getInstance().getFamiliarTable_pad().get(getGrade()).get(level - 1);
    }

    public int getOption(int i) {
        switch (i) {
            case 0: {
                return option1;
            }
            case 1: {
                return option2;
            }
            case 2: {
                return option3;
            }
        }
        return 0;
    }


    public int setOption(final int i, final int option) {
        switch (i) {
            case 0: {
                option1 = option;
            }
            case 1: {
                option2 = option;
            }
            case 2: {
                option3 = option;
            }
        }
        return 0;
    }


    public void initOptions() {
        LinkedList<List<StructItemOption>> options = new LinkedList<>(MapleItemInformationProvider.getInstance().getFamiliar_option().values());
        byte incDAMrCount = 0;
        for (int i = 0; i < 3; ++i) {
            Collections.shuffle(options);
            for (List<StructItemOption> optionList : options) {
                if (optionList.size() < level) {
                    continue;
                }
                final StructItemOption option = optionList.get(level - 1);
                if (option.opID / 10000 != grade) {
                    continue;
                }
                if (ServerConfig.familiarIncDAMrHard && option.opString.contains("最終傷害")) {
                    if (!Randomizer.isSuccess(40 - 19 * incDAMrCount)) {
                        continue;
                    }
                    incDAMrCount++;
                }
                setOption(i, option.opID);
            }
        }
    }

    public void gainExp(int exp) {
        this.exp += exp;
        while (this.exp >= 100) {
            ++this.level;
            this.exp -= 100;
        }
        if (this.level >= 5) {
            this.level = 5;
            this.exp = 0;
        }
    }

    public void updateGrade() {
        ++this.grade;
        this.level = 1;
        if (this.grade >= 4) {
            this.grade = 4;
        }
    }

    public double getPad() {
        return pad;
    }

    public int getCharacterid() {
        return characterid;
    }

    public void setFh(short fh) {
        this.fh = fh;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(byte grade) {
        this.grade = grade;
    }

    public byte getLevel() {
        return level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public void setSkill(int skill) {
        this.skill = skill;
    }

    public void setOption1(int option1) {
        this.option1 = option1;
    }

    public void setOption2(int option2) {
        this.option2 = option2;
    }

    public void setOption3(int option3) {
        this.option3 = option3;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getSkill() {
        return skill;
    }

    public void setSkill(short skill) {
        this.skill = skill;
    }

    public int getOption1() {
        return option1;
    }

    public void setOption1(short option1) {
        this.option1 = option1;
    }

    public int getOption2() {
        return option2;
    }

    public void setOption2(short option2) {
        this.option2 = option2;
    }

    public int getOption3() {
        return option3;
    }

    public void setOption3(short option3) {
        this.option3 = option3;
    }

    public int getFamiliar() {
        return familiar;
    }

    public int getId() {
        return id;
    }

    public final String getName() {
        return name;
    }

    public void setName(String n) {
        name = n;
    }

    public short getFh() {
        return fh;
    }

    public void setFh(int f) {
        fh = ((short) f);
    }

    @Override
    public int getRange() {
        return Integer.MAX_VALUE;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (client.getPlayer() == null || client.getPlayer().getId() != characterid) {
            client.announce(SpecialPacket.spawnFamiliar(characterid, false, this, getPosition(), false));
        }
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        if (client.getPlayer() == null || client.getPlayer().getId() != characterid) {
            client.announce(SpecialPacket.removeFamiliar(characterid, false));
        }
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.FAMILIAR;
    }

    public final void updatePosition(List<LifeMovementFragment> movement) {
        for (LifeMovementFragment move : movement) {
            if ((move instanceof LifeMovement)) { // && ((move instanceof StaticLifeMovement))) {
                setStance(((LifeMovement) move).getNewState()); // setFh(((StaticLifeMovement) move).getUnk());
            }
        }
    }

    public FamiliarCard createFamiliarCard() {
        return new FamiliarCard((short) skill, level, grade, option1, option2, option3);
    }

    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        mplew.writeInt(id);
        mplew.writeInt(0);
        mplew.writeInt(-254);
        mplew.writeInt(familiar);
        mplew.writeAsciiString(this.name, 15);
        mplew.write(0);
        mplew.writeShort(level);
        mplew.writeShort(skill);
        mplew.writeShort(exp);
        mplew.writeShort(0);
        mplew.writeShort(level);
        for (int i = 0; i < 3; ++i) {
            mplew.writeShort(getOption(i));
        }
        mplew.write(0);
        mplew.write(grade);
        mplew.write(0);
        mplew.write(0);
        mplew.writeInt(1);
    }

    public boolean isSummoned() {
        return summoned;
    }

    public void setSummoned(boolean summoned) {
        this.summoned = summoned;
    }
}
