package packet;

import constants.enums.FieldEffectType;
import constants.enums.InGameDirectionType;
import handling.opcode.MessageOpcode;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.events.DimensionMirrorEvent;
import tools.types.Pair;
import tools.types.Triple;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.List;

public class UIPacket {

    private static final Logger log = LogManager.getLogger(UIPacket.class);

    public static byte[] getSPMsg(byte sp, short job) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_IncSPMessage);
        mplew.writeShort(job);
        mplew.write(sp);

        return mplew.getPacket();
    }

    public static byte[] getGPMsg(int amount) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_IncGPMessage);
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    public static byte[] getGPContribution(int amount) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_IncCommitmentMessage);
        mplew.writeInt(amount);
        mplew.writeInt(amount);
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    public static byte[] getBPMsg(int amount) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_IncPvPPointMessage);
        mplew.writeInt(amount);

        return mplew.getPacket();
    }

    public static byte[] getTopMsg(String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ScriptProgressMessage.getValue());
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] ScriptProgressItemMessage(int n, String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ScriptProgressItemMessage.getValue());
        mplew.writeInt(n);
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] getMidMsg(int index, String msg, boolean keep) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetStaticScreenMessage.getValue());
        mplew.write(index); //where the message should appear on the screen
        mplew.writeMapleAsciiString(msg);
        mplew.write(keep ? 0 : 1);

        return mplew.getPacket();
    }

    public static byte[] setStaticScreenMessage(int index, String msg, boolean keep) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetStaticScreenMessage.getValue());
        mplew.write(index); //where the message should appear on the screen
        mplew.writeMapleAsciiString(msg);
        mplew.writeBool(keep);

        return mplew.getPacket();
    }

    public static byte[] offStaticScreenMessage() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_OffStaticScreenMessage.getValue());

        return mplew.getPacket();
    }

    public static byte[] showWeatherEffectNotice(String s, int n, int n2, boolean b) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_WeatherEffectNotice.getValue());
        mplew.writeMapleAsciiString(s);
        mplew.writeInt(n);
        mplew.writeInt(n2);
        mplew.writeBool(b);
        return mplew.getPacket();
    }

    public static byte[] WeatherEffectNoticeY(String s, int n, int n2, int n3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_WeatherEffectNoticeY.getValue());
        mplew.writeMapleAsciiString(s);
        mplew.writeInt(n);
        mplew.writeInt(n2);
        mplew.writeInt(n3);
        return mplew.getPacket();
    }

    /*
     * 特殊的頂部公告
     * unk = 0細明體 3黑體 7雅園 8小黃
     * 字體大小最大128
     */
    public static byte[] getSpecialTopMsg(String msg, int fontNameType, int fontSize, int fontColorType, int fadeOutDelay) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ProgressMessageFont.getValue());
        mplew.writeInt(fontNameType); //字體
        mplew.writeInt(fontSize); //字體大小
        mplew.writeInt(fontColorType); //顏色代碼
        mplew.writeInt(fadeOutDelay); //未知
        mplew.write(0);
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] getStatusMsg(int itemid) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        // Temporary transformed as a dragon, even with the skill ......
        mplew.writeShort(SendPacketOpcode.LP_Message.getValue());
        mplew.write(MessageOpcode.MS_GiveBuffMessage);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    public static byte[] showMapEffect(String path) {
        return MaplePacketCreator.environmentChange(path, FieldEffectType.Screen); //T072修改為 4 以前為 3
    }

    public static byte[] MapNameDisplay(int mapid) {
        return MaplePacketCreator.environmentChange("maplemap/enter/" + mapid, FieldEffectType.Screen); //T072修改為 4 以前為 3
    }

    public static byte[] Aran_Start() {
        return MaplePacketCreator.environmentChange("Aran/balloon", FieldEffectType.Sound); //T072修改為 5 以前為 4
    }

    public static byte[] playMovie(String data, boolean show) {
        if (show) {
            log.trace("調用");
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserPlayMovieClip.getValue());
        mplew.writeMapleAsciiString(data);
        mplew.write(show ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] summonHelper(boolean summon) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserHireTutor.getValue());
        mplew.write(summon ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] summonMessage(int type) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTutorMsg.getValue());
        mplew.write(1);
        mplew.writeInt(type);
        mplew.writeInt(7000); // probably the delay

        return mplew.getPacket();
    }

    public static byte[] summonMessage(String message) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserTutorMsg.getValue());
        mplew.write(0);
        mplew.writeMapleAsciiString(message);
        mplew.writeInt(200); // IDK
        mplew.writeInt(10000); // Probably delay

        return mplew.getPacket();
    }

    public static byte[] setDirectionMod(boolean enable) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetDirectionMode.getValue());
        mplew.write(enable ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] getDirectionEffectPlay(String data, int value, int s) {
        return getDirectionEvent(InGameDirectionType.EFFECT_PLAY, data, new int[]{value, 0, s, 0, 0}, null);
    }

    public static byte[] getDirectionEffectPlay(String data, int value, int x, int y, int pro) {
        return getDirectionEvent(InGameDirectionType.EFFECT_PLAY, data, new int[]{value, x, y, pro, 0, 0}, null);
    }

    public static byte[] getDirectionEffectPlay(String data, int value, int x, int y, int a, int b) {
        return getDirectionEvent(InGameDirectionType.EFFECT_PLAY, data, new int[]{value, x, y, a, b, 0, 0, 0, 0}, null);
    }

    public static byte[] getDirectionEffectPlay(String data, int value, int x, int y) {
        return getDirectionEffectPlayNpc(data, value, x, y, 0);
    }

    public static byte[] getDirectionEffectPlayNpc(String data, int value, int x, int y, int z) {
        return getDirectionEvent(InGameDirectionType.EFFECT_PLAY, data, new int[]{value, x, y, 1, 1, 0, z, z > 0 ? 0 : 1, 0}, null);
    }

    public static byte[] getDirectionCameraMove(byte type, int value) {
        return getDirectionEvent(InGameDirectionType.CAMERA_MOVE, null, new int[]{type, value, 0, 0, 0, 0, 0, 0}, null);
    }

    public static byte[] getDirectionCameraMove(byte type, int x, int y, int z) {
        return getDirectionEvent(InGameDirectionType.CAMERA_MOVE, null, new int[]{type, x, y, z, 0, 0, 0, 0}, null);
    }

    public static byte[] getDirectionEvent(InGameDirectionType type, int value) {
        return getDirectionEvent(type, null, new int[]{value, 0, 0, 0, 0, 0, 0, 0, 0}, null);
    }

    public static byte[] getDirectionEvent(InGameDirectionType mod, String data, int[] values, String data2) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserInGameDirectionEvent.getValue());
        mplew.write(mod.getType());
        switch (mod) {
            case FORCED_ACTION:
                mplew.writeInt(values[0]);
                if (values[0] <= 0x80F) {
                    mplew.writeInt(values[1]);
                }
                break;
            case DELAY:
                mplew.writeInt(values[0]);
                break;
            case EFFECT_PLAY:
                mplew.writeMapleAsciiString(data);
                mplew.writeInt(values[0]);
                mplew.writeInt(values[1]);
                mplew.writeInt(values[2]);
                mplew.write(values[3]);
                if (values[3] > 0) {
                    mplew.writeInt(values[5]);
                }
                mplew.write(values[4]);
                if (values[4] > 0) {
                    mplew.writeInt(values[6]);
                    mplew.write(values[7]);
                    mplew.write(values[8]);
                }
                mplew.write(data2 != null);
                if (data2 != null) {
                    mplew.writeMapleAsciiString(data2);
                }
                break;
            case FORCED_INPUT:
                mplew.writeInt(values[0]);
                break;
            case PARTERN_INPUT_REQUEST:
                mplew.writeMapleAsciiString(data);
                mplew.writeInt(values[0]);
                mplew.writeInt(values[1]);
                mplew.writeInt(values[2]);
                break;
            case CAMERA_MOVE:
                mplew.write(values[0]);
                mplew.writeInt(values[1]);
                if (values[0] > 0) {
                    mplew.write(values[0]);
                }
                if (values[1] > 0 && values[0] != 0) {
                    mplew.writeInt(values[2]);
                    mplew.writeInt(values[3]);
                }
                break;
            case CAMERA_ON_CHARACTER:
                mplew.writeInt(values[0]);
                break;
            case CAMERA_ZOOM:
                mplew.write(values[0]);
                if (values[0] == 0) {
                    mplew.writeInt(values[1]);
                    mplew.writeInt(values[2]);
                    mplew.writeInt(values[3]);
                    mplew.writeInt(values[4]);
                    mplew.writeInt(values[5]);
                }
                break;
            case UNK_226_1:
                break;
            case CAMERA_RELEASE_FROM_USER_POINT:
                break;
            case VANSHEE_MODE:
                mplew.write(values[0]);
                break;
            case FACE_OFF:
                mplew.writeInt(values[0]);
                break;
            case MONOLOGUE:
                mplew.writeMapleAsciiString(data);
                mplew.write(values[0]);
                break;
            case MONOLOGUE_SCROLL:
                mplew.writeMapleAsciiString(data);
                mplew.write(values[0]);
                mplew.writeShort(values[1]);
                mplew.writeInt(values[2]);
                mplew.writeInt(values[3]);
                break;
            case AVATARLOOK_SET:
                mplew.write(values.length);
                for (int nVal : values) {
                    mplew.writeInt(nVal);
                }
                break;
            case REMOVE_ADDITIONAL_EFFECT:
                break;
            case UNK_226_2:
                break;
            case UNK_226_3:
                mplew.writeInt(values[0]);
                mplew.writeInt(values[1]);
                break;
            case FORCED_MOVE:
                mplew.writeInt(values[0]);
                break;
            case FORCED_FLIP:
                mplew.writeInt(values[0]);
                break;
            case INPUT_UI:
                mplew.write(values[0]);
                break;
            case UNK_226_4:
                break;
            case UNK_226_5:
                mplew.writeInt(values[0]);
                break;
            case UNK_226_6:
                mplew.writeMapleAsciiString(data);
                break;
            case UNK_226_7:
                mplew.writeInt(values[0]);
                break;
            case UNK_226_8:
                mplew.writeMapleAsciiString(data);
                mplew.write(values[0]);
                mplew.write(values[1]);
                break;
            default:
                System.out.println("getDirectionEvent() is Unknow mod :: [" + mod + "]");
        }
        return mplew.getPacket();
    }

    public static byte[] UserEmotionLocal(int expression, int duration) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserEmotionLocal.getValue());
        mplew.writeInt(expression);
        mplew.writeInt(duration);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] IntroEnableUI(int wtf) {
        return IntroEnableUI(wtf, true);
    }

    public static byte[] IntroEnableUI(int wtf, boolean block) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetInGameDirectionMode.getValue());
        mplew.writeBool(wtf > 0);
        if (wtf > 0) {
            mplew.write(block);
            mplew.write(0);
            mplew.write(0);
        } else {
            mplew.writeBool(wtf < 0);
        }

        return mplew.getPacket();
    }

    public static byte[] SetInGameDirectionMode(boolean b, boolean b2, boolean b3, boolean b4) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetInGameDirectionMode.getValue());
        mplew.writeBool(b);
        mplew.writeBool(b2);
        if (b) {
            mplew.writeBool(b3);
            mplew.writeBool(b4);
        }
        return mplew.getPacket();
    }

    public static byte[] SetStandAloneMode(boolean enable) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_SetStandAloneMode.getValue());
        mplew.write(enable ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] addPopupSay(int npcid, int time, String msg, String sound) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_AddPopupSay.getValue());
        mplew.writeInt(npcid);
        mplew.writeInt(time);
        mplew.writeMapleAsciiString(msg);
        mplew.writeMapleAsciiString(sound);
        mplew.writeBool(false);
        return mplew.getPacket();
    }

    /**
     * 顯示自由市場小地圖，該數據包只對自由市場生效。
     *
     * @參數 show true ? 隱藏 : 顯示
     */
    public static byte[] showFreeMarketMiniMap(boolean show) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_MiniMapOnOff.getValue());
        mplew.writeReversedBool(show);

        return mplew.getPacket();
    }

    /**
     * 讓客戶端打開指定窗口
     *
     * @param id 類似於子類型
     * @return
     */
    public static byte[] sendOpenWindow(int id) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserOpenUI.getValue());
        mplew.writeInt(id);

        return mplew.getPacket();
    }

    /**
     * 打開新的聊天界面
     *
     * @param npc
     * @return
     */
    public static byte[] sendPVPWindow(int npc) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserOpenUI.getValue());
        mplew.writeInt(0x32);
        if (npc > 0) {
            mplew.writeInt(npc);
        }

        return mplew.getPacket();
    }

    /**
     * 打開活動列表界面
     *
     * @param npc
     * @return
     */
    public static byte[] sendEventWindow(int npc) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserOpenUI.getValue());
        mplew.writeInt(0x37);
        if (npc > 0) {
            mplew.writeInt(npc);
        }

        return mplew.getPacket();
    }

    public static byte[] inGameCurNodeEventEnd(boolean enable) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_InGameCurNodeEventEnd.getValue());
        mplew.writeBool(enable);

        return mplew.getPacket();
    }

    public static byte[] sendSceneUI() {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SCENE_UI.getValue());
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    /*
         * 打開1個遊戲窗口界面
     */
    public static byte[] sendUIWindow(int op, int npc) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserOpenUIWithOption.getValue());
        /*
         * 0x03 傳授技能後顯示的窗口
         * 0x15 組隊搜索窗口
         * 0x21 道具修理窗口
         * 0x2A 專業技術窗口
         */
        mplew.writeInt(op);
        mplew.writeInt(npc);
        mplew.writeInt(0); //V.114新增 未知

        return mplew.getPacket();
    }

    public static byte[] showPQEffect(int n2, String string, String string2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PQ_EFFECT.getValue());
        mplew.write(n2);
        switch (n2) {
            case 1:
            case 3: {
                mplew.writeMapleAsciiString(string);
                mplew.writeMapleAsciiString(string2);
                break;
            }
            case 2:
            case 4: {
                mplew.writeMapleAsciiString(string);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] sendDynamicObj(boolean animation, Pair<Integer, Triple<String, String, String>> dynamicObj) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_DynamicObjShowHide.getValue());
        mplew.writeInt(dynamicObj == null ? 0 : dynamicObj.getLeft());
        mplew.writeInt(dynamicObj == null || animation ? 0 : 1);
        mplew.writeInt(0);

        if (dynamicObj != null) {
            if (dynamicObj.getLeft() == 2) {
                mplew.writeMapleAsciiString(dynamicObj.getRight().getLeft());
                mplew.writeMapleAsciiString(dynamicObj.getRight().getMid());
                mplew.writeMapleAsciiString(dynamicObj.getRight().getRight());
            } else {
                mplew.writeInt(0);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] screenShake(int n2, boolean bl2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_UserSetFieldFloating.getValue());
        mplew.writeInt(n2);
        mplew.writeInt(bl2 ? 0 : 20);
        mplew.writeInt(bl2 ? 0 : 50);
        mplew.writeInt(bl2 ? 0 : 20);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] fishingCaught(int id) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.FISHING_CAUGHT.getValue());
        mplew.writeInt(id);

        return mplew.getPacket();
    }

    public static byte[] showDimensionMirror(List<DimensionMirrorEvent> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DimensionMirror.getValue());
        mplew.writeInt(list.size());
        for (final DimensionMirrorEvent event : list) {
            mplew.writeMapleAsciiString(event.getName());
            mplew.writeMapleAsciiString(event.getInfo());
            mplew.writeInt(event.getLimitLevel());
            mplew.writeInt(event.getPos());
            mplew.writeInt(event.getID());
            mplew.writeInt(event.getNeedQuestID());
            mplew.writeInt(event.getQuestID());
            mplew.writeInt(0); // tms 230
            mplew.writeMapleAsciiString(""); // tms 230
            mplew.writeBool(event.isTeam());
            mplew.writeInt(event.getRewards().size());
            for (Integer o : event.getRewards()) {
                mplew.writeInt(o);
            }
        }

        return mplew.getPacket();
    }

    public static byte[] ShowSpecialUI(boolean b, String s) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ShowSpecialUI.getValue());
        mplew.writeBool(b);
        mplew.writeMapleAsciiString(s);

        return mplew.getPacket();
    }

    public static byte[] setAreaControl(List<String> ctrl_1, List<String> ctrl_2, List<String> ctrl_3) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.AREA_CTRLS.getValue());
        mplew.write(ctrl_1 != null);
        if (ctrl_1 != null) {
            mplew.writeInt(ctrl_1.size());
            for (String s : ctrl_1) {
                mplew.writeMapleAsciiString(s);
            }
        }
        mplew.write(ctrl_2 != null);
        if (ctrl_2 != null) {
            mplew.writeInt(ctrl_2.size());
            for (String s : ctrl_2) {
                mplew.writeMapleAsciiString(s);
            }
        }
        mplew.write(ctrl_3 != null);
        if (ctrl_3 != null) {
            mplew.writeInt(ctrl_3.size());
            for (String s : ctrl_3) {
                mplew.writeMapleAsciiString(s);
            }
        }

        return mplew.getPacket();
    }
}
