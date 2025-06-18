package handling.channel.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.maps.AnimatedMapleMapObject;
import server.movement.*;
import tools.data.MaplePacketReader;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class MovementParse {

    /**
     * Logger for this class.
     */
    public static final Logger log = LogManager.getLogger("Movement");

    /*
     * 1 = 玩家移動
     * 2 = 怪物移動
     * 3 = 寵物移動
     * 4 = 召喚獸移動
     * 5 = 寶貝龍移動
     * 6 = 玩家攻擊怪物移動
     * 7 = 花狐移動
     */
    public static List<LifeMovementFragment> parseMovement(MaplePacketReader slea, int kind) {
        List<LifeMovementFragment> res = new ArrayList<>();
        int numCommands = slea.readShort(); //循環次數
        String packet = slea.toString(true);
        try {
            for (int i = 0; i < numCommands; i++) {
                byte command = slea.readByte(); //移動類型
                switch (command) {
                    case 0:
                    case 8:
                    case 15:
                    case 17:
                    case 19:
                    case 72:
                    case 73:
                    case 74:
                    case 75:
                    case 76:
                    case 77:
                    case 95: {
                        short xpos = slea.readShort();
                        short ypos = slea.readShort();
                        short xwobble = slea.readShort();
                        short ywobble = slea.readShort();
                        short fh = slea.readShort();
                        short n2 = (command == 15 || command == 17) ? slea.readShort() : 0;
                        short xoffset = slea.readShort();
                        short yoffset = slea.readShort();
                        short unk161 = slea.readShort();

                        byte newstate = slea.readByte();
                        short duration = slea.readShort();
                        byte byte4 = slea.readByte();
                        AbsoluteLifeMovement alm = new AbsoluteLifeMovement(command, duration, newstate, byte4);
                        alm.setPosition(new Point(xpos, ypos));
                        alm.setNewFH(fh);
                        alm.setPixelsPerSecond(new Point(xwobble, ywobble));
                        alm.setOffset(new Point(xoffset, yoffset));
                        alm.setUn1(n2);
                        alm.setUnk161(unk161);
                        res.add(alm);
                        break;
                    }
                    case 1:
                    case 2:
                    case 18:
                    case 21:
                    case 22:
                    case 24:
                    case 62:
                    case 65:
                    case 66:
                    case 67:
                    case 68:
                    case 69:
                    case 70:
                    case 100: {
                        short xmod = slea.readShort();
                        short ymod = slea.readShort();
                        short u21_22 = 0;
                        if (command == 21 || command == 22) {
                            u21_22 = slea.readShort();
                        }
                        short u61_1 = 0;
                        short u61_2 = 0;
                        if (command == 62) {
                            u61_1 = slea.readShort();
                            u61_2 = slea.readShort();
                        }

                        byte newstate = slea.readByte();
                        short duration = slea.readShort();
                        byte byte8 = slea.readByte();
                        RelativeLifeMovement rlm = new RelativeLifeMovement(command, duration, newstate, byte8);
                        rlm.setPosition(new Point(xmod, ymod));
                        rlm.setU1(u21_22);
                        rlm.setU2(u61_1);
                        rlm.setU3(u61_2);
                        res.add(rlm);
                        break;
                    }
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 9:
                    case 10:
                    case 11:
                    case 13:
                    case 26:
                    case 27:
                    case 53:
                    case 54:
                    case 55:
                    case 59:
                    case 84:
                    case 85:
                    case 86:
                    case 88:
                    case 90:
                    case 109: {
                        short xpos = slea.readShort();
                        short ypos = slea.readShort();
                        short fh = slea.readShort();
                        int unk2 = slea.readInt();

                        byte newstate = slea.readByte();
                        short duration = slea.readShort();
                        byte byte10 = slea.readByte();
                        ChairMovement cm = new ChairMovement(command, duration, newstate, byte10);
                        cm.setPosition(new Point(xpos, ypos));
                        cm.setNewFH(fh);
                        cm.setUnk2(unk2);
                        res.add(cm);
                        break;
                    }
                    case 12: {
                        res.add(new ChangeEquipSpecialAwesome(command, slea.readByte()));
                        break;
                    }
                    case 14:
                    case 16: {
                        short xpos = slea.readShort();
                        short ypos = slea.readShort();
                        short fh = slea.readShort();

                        byte newstate = slea.readByte();
                        short duration = slea.readShort();
                        byte byte10 = slea.readByte();
                        Unknown4Movement um = new Unknown4Movement(command, duration, newstate, byte10);
                        um.setPosition(new Point(xpos, ypos));
                        um.setNewFH(fh);
                        res.add(um);
                        break;
                    }
                    case 23:
                    case 103:
                    case 104: {
                        short xpos = slea.readShort();
                        short ypos = slea.readShort();
                        short xwobble = slea.readShort();
                        short ywobble = slea.readShort();

                        byte newstate = slea.readByte();
                        short duration = slea.readShort();
                        byte byte12 = slea.readByte();
                        UnknownMovement um = new UnknownMovement(command, duration, newstate, byte12);
                        um.setPosition(new Point(xpos, ypos));
                        um.setPixelsPerSecond(new Point(xwobble, ywobble));
                        res.add(um);
                        break;
                    }
                    case 29: {
                        final Unknown3Movement unk3Movement;
                        final int aSt = slea.readInt();

                        final byte newState = slea.readByte();
                        final short duration = slea.readShort();
                        final byte byte14 = slea.readByte();
                        unk3Movement = new Unknown3Movement(command, newState, duration, byte14);
                        unk3Movement.aSt = aSt;
                        res.add(unk3Movement);
                        break;
                    }
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                    case 45:
                    case 46:
                    case 47:
                    case 48:
                    case 49:
                    case 51:
                    case 52:
                    case 56:
                    case 58:
                    case 60:
                    case 61:
                    case 63:
                    case 64:
                    case 78:
                    case 79:
                    case 80:
                    case 82:
                    case 87:
                    case 89:
                    case 91:
                    case 92:
                    case 93:
                    case 94:
                    case 96:
                    case 97:
                    case 98:
                    case 99:
                    case 101:
                    case 102:
                    case 105:
                    case 106: {
                        final byte newState = slea.readByte();
                        final short duration = slea.readShort();
                        final byte byte14 = slea.readByte();
                        res.add(new AbstractLifeMovement(command, newState, duration, byte14));
                        break;
                    }
                    case 50: {
                        short xpos = slea.readShort();
                        short ypos = slea.readShort();
                        short xwobble = slea.readShort();
                        short ywobble = slea.readShort();
                        short n2 = slea.readShort();

                        final byte newState = slea.readByte();
                        final short duration = slea.readShort();
                        final byte byte14 = slea.readByte();
                        final Unknown2Movement um = new Unknown2Movement(command, duration, newState, byte14);
                        um.setPosition(new Point(xpos, ypos));
                        um.setPixelsPerSecond(new Point(xwobble, ywobble));
                        um.setUn1(n2);
                        res.add(um);
                        break;
                    }
                    case 57:
                    case 71:
                    case 108: {
                        short xpos = slea.readShort();
                        short ypos = slea.readShort();
                        short xwobble = slea.readShort();
                        short ywobble = slea.readShort();
                        short fh = slea.readShort();

                        byte newstate = slea.readByte();
                        short duration = slea.readShort();
                        byte byte6 = slea.readByte();
                        StaticLifeMovement slm = new StaticLifeMovement(command, duration, newstate, byte6);
                        slm.setPixelsPerSecond(new Point(xwobble, ywobble));
                        slm.setPosition(new Point(xpos, ypos));
                        slm.setNewFH(fh);
                        res.add(slm);
                        break;
                    }
                    case 81:
                    case 83: {
                        final AranMovement am = new AranMovement(command);
                        for (int l = 0; l < 7; ++l) {
                            am.aS(l, slea.readShort());
                        }
                        res.add(am);
                        break;
                    }
                    default: {
                        final byte newState = slea.readByte();
                        final short duration = slea.readShort();
                        final byte byte14 = slea.readByte();
                        res.add(new AbstractLifeMovement(command, newState, duration, byte14));
                        break;
                    }
                }
            }
            byte bVal = slea.readByte();
            slea.skip(bVal >> 1);
            if ((bVal & 1) != 0) {
                slea.skip(1);
            }
            if (numCommands != res.size()) {
                log.error(getKindName(kind) + " 循環次數[" + numCommands + "]和實際上獲取的循環次數[" + res.size() + "]不符" + packet);
                return null;
            }
            return res;
        } catch (Exception e) {
            log.error(getKindName(kind) + "封包解析出錯：" + packet, e);
            return null;
        }
    }

    public static void updatePosition(List<LifeMovementFragment> movement, AnimatedMapleMapObject target, int yoffset) {
        if (movement == null) {
            return;
        }
        int lastMoveTime = 0;
        for (LifeMovementFragment move : movement) {
            if (move instanceof LifeMovement) {
                if (move instanceof AbsoluteLifeMovement) {
                    Point position = ((AbsoluteLifeMovement) move).getPosition();
                    position.y += yoffset;
                    target.setPosition(position);
                    target.setHomeFH(target.getCurrentFH());
                    target.setCurrentFh(((AbsoluteLifeMovement) move).getNewFH());
                }
                target.setStance(((LifeMovement) move).getNewState());
                lastMoveTime += ((LifeMovement) move).getDuration();
            }
        }
        target.setLastMoveTime(lastMoveTime);
    }

    public static String getKindName(int kind) {
        String moveMsg;
        switch (kind) {
            case 1:
                moveMsg = "玩家";
                break;
            case 2:
                moveMsg = "怪物";
                break;
            case 3:
                moveMsg = "寵物";
                break;
            case 4:
                moveMsg = "召喚獸";
                break;
            case 5:
                moveMsg = "寶貝龍";
                break;
            case 6:
                moveMsg = "萌獸";
                break;
            case 7:
                moveMsg = "花狐";
                break;
            case 8:
                moveMsg = "人型花狐";
                break;
            case 9:
                moveMsg = "機器人";
                break;
            case 10:
                moveMsg = "NPC";
                break;
            default:
                moveMsg = "未知kind";
                break;
        }
        return moveMsg;
    }
}
