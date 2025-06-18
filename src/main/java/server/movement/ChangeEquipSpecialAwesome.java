package server.movement;

import tools.data.MaplePacketLittleEndianWriter;

public final class ChangeEquipSpecialAwesome implements LifeMovementFragment {

    private final int type;
    private final int wui;

    public ChangeEquipSpecialAwesome(int type, int wui) {
        this.type = type;
        this.wui = wui;
    }

    @Override
    public void serialize(MaplePacketLittleEndianWriter lew) {
        lew.write(type);
        lew.write(wui);
    }

}
