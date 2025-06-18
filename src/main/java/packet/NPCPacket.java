/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package packet;

import client.MapleClient;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import constants.enums.ScriptMessageType;
import constants.enums.TrunkOptType;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.npc.NPCParamType;
import server.life.MapleNPC;
import server.life.PlayerNPC;
import server.shop.MapleShop;
import server.shop.MapleShopResponse;
import tools.HexTool;
import tools.data.MaplePacketLittleEndianWriter;

import java.util.Collection;
import java.util.List;

/**
 * @author admin
 */
public class NPCPacket {

    // InitialQuiz
    public static final int InitialQuizRes_Request = 0x0;
    public static final int InitialQuizRes_Fail = 0x1;
    // InitialSpeedQuiz
    public static final int TypeSpeedQuizNpc = 0x0;
    public static final int TypeSpeedQuizMob = 0x1;
    public static final int TypeSpeedQuizItem = 0x2;
    // SpeakerTypeID
    public static final int NoESC = 0x1;
    public static final int NpcReplacedByUser = 0x2;
    public static final int NpcReplayedByNpc = 0x4;
    public static final int FlipImage = 0x8;
    private static final Logger log = LogManager.getLogger(NPCPacket.class);

    public static byte[] sendNpcHide(List<Integer> hide) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_LimitedNPCDisableInfo.getValue());
        mplew.write(hide.size());
        for (Integer h : hide) {
            mplew.writeInt(h.intValue());
        }
        return mplew.getPacket();
    }

    public static byte[] spawnNPC(MapleNPC life) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NpcEnterField.getValue());
        mplew.writeInt(life.getObjectId());
        writeNpcData(mplew, life, false);

        return mplew.getPacket();
    }

    public static byte[] removeNPC(int objectid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NpcLeaveField.getValue());
        mplew.writeInt(objectid);

        return mplew.getPacket();
    }

    public static byte[] removeNPCController(int objectid, boolean miniMap) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NpcChangeController.getValue());
        mplew.writeBool(miniMap);
        mplew.writeInt(objectid);

        return mplew.getPacket();
    }

    private static void writeNpcData(MaplePacketLittleEndianWriter mplew, MapleNPC npc, boolean MiniMap) {
        mplew.writeInt(npc.getId());
        mplew.writeShort(npc.getPosition().x);
        mplew.writeShort(npc.getCy());
        mplew.writeInt(-1);
        mplew.writeInt(-1);
        mplew.writeBool(npc.isMove());
        mplew.write(npc.getF() == 1 ? 0 : 1);
        mplew.writeShort(npc.getCurrentFH());
        mplew.writeShort(npc.getRx0());
        mplew.writeShort(npc.getRx1());
        mplew.write(MiniMap || npc.isHidden() ? 0 : 1);
        mplew.writeInt(0); //未知 V.114 新增
        mplew.write(0);
        mplew.writeInt(-1);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        mplew.writeMapleAsciiString("");
        mplew.writeBool(false);
        mplew.writeBool(false);
    }

    public static byte[] spawnNPCRequestController(MapleNPC life, boolean MiniMap) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NpcChangeController.getValue());
        mplew.write(1);
        mplew.writeInt(life.getObjectId());
        writeNpcData(mplew, life, MiniMap);

        return mplew.getPacket();
    }

    public static byte[] spawnPlayerNPC(PlayerNPC npc) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PLAYER_NPC.getValue());
        mplew.write(npc.getF() == 1 ? 0 : 1);
        mplew.writeInt(npc.getId());
        mplew.writeMapleAsciiString(npc.getName());
        PacketHelper.addCharLook(mplew, npc.getPlayer(), false, false);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, npc, false);
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type, int diffNpc) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, diffNpc, false);
    }

    public static byte[] getPlayerTalk(int npc, byte msgType, String talk, String endBytes, byte type) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, npc, true);
    }

    public static byte[] getPlayerTalk(int npc, byte msgType, String talk, String endBytes, byte type, int diffNpc) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, diffNpc, true);
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type, int diffNpc, boolean player) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, (byte) 0, diffNpc, true);
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type, byte type2, int diffNpc, boolean player) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, (byte) 0, type2, diffNpc, player);
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type, byte type3, byte type2, int diffNpc, boolean player) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) (player ? 0x03 : 0x04), npc, false, 0, msgType, (short) ((type3 << 8) + type), type2);
        if (msgType == ScriptMessageType.SAY.getType()) {
            mplew.writeInt(0);
        }
        if ((type & 0x4) != 0) {
            mplew.writeInt(diffNpc);
        }
        mplew.writeMapleAsciiString(talk);
        mplew.write(HexTool.getByteArrayFromHexString(endBytes));
        mplew.writeInt(0);
        mplew.write(0);

        return mplew.getPacket();

    }

    public static byte[] OnSay(byte type, int npcId, boolean b, int u1, int n3, short u2, boolean bPrev, boolean bNext, String sText, int n5) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(type, npcId, b, u1, ScriptMessageType.SAY.getType(), u2, (byte) 1);
        mplew.writeInt(0);
        if (NPCParamType.ANOTHER_NPC.check(u2)) {
            mplew.writeInt(n3);
        }
        mplew.writeMapleAsciiString(sText);
        mplew.writeBool(bPrev);
        mplew.writeBool(bNext);
        mplew.writeInt(n5);
        mplew.write(0);
        return mplew.getPacket();
    }

    public static byte[] OnSayImage(byte b, int n, short n2, String[] array) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.SAY_IMAGE.getType(), n2, (byte) 1);
        mplew.write(array.length);
        for (String anArray : array) {
            mplew.writeMapleAsciiString(anArray);
        }
        return mplew.getPacket();
    }

    public static byte[] OnSayIllu(byte b, int n, boolean b2, int n2, int n3, short n4, boolean b3, boolean b4, String s, int n5, int n6, boolean b5) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, false, 0, ScriptMessageType.SAY_ILLUSTRATION.getType(), n4, (byte) 1);
        if (NPCParamType.ANOTHER_NPC.check(n4)) {
            mplew.writeInt(n3);
        }
        mplew.writeMapleAsciiString(s);
        mplew.writeBool(b3);
        mplew.writeBool(b4);
        mplew.writeInt(n5);
        mplew.writeInt(n6);
        mplew.writeBool(b5);
        return mplew.getPacket();
    }

    public static byte[] OnSayDualIllu(byte b, int n, boolean b2, int n2, int n3, short n4, boolean b3, boolean b4, String s, int n5, int n6) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, false, 0, ScriptMessageType.SAY_DUAL_ILLUSTRATION.getType(), n4, (byte) 1);
        if (NPCParamType.ANOTHER_NPC.check(n4)) {
            mplew.writeInt(n3);
        }
        mplew.writeMapleAsciiString(s);
        mplew.writeBool(b3);
        mplew.writeBool(b4);
        mplew.writeInt(n5);
        mplew.writeInt(n6);
        mplew.writeInt(0);
        mplew.writeInt(0);
        return mplew.getPacket();
    }

    public static byte[] OnAskYesNo(byte b, int n, int n2, short n3, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_YES_NO.getType(), n3, (byte) 1);
        if (NPCParamType.ANOTHER_NPC.check(n3)) {
            mplew.writeInt(n2);
        }
        mplew.writeMapleAsciiString(s);
        return mplew.getPacket();
    }

    public static byte[] OnAskAccept(byte b, int n, int diffnpc, short n3, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_ACCEPT.getType(), n3, (byte) 1);
        if (NPCParamType.ANOTHER_NPC.check(n3)) {
            mplew.writeInt(diffnpc);
        }
        mplew.writeMapleAsciiString(s);
        return mplew.getPacket();
    }

    public static byte[] OnAskText(byte b, int n, int n2, short sParam, short nLenMin, short nLenMax, String sMsg, String sMsgDefault) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_TEXT.getType(), sParam, (byte) 1);
        if (NPCParamType.ANOTHER_NPC.check(sParam)) {
            mplew.writeInt(n2);
        }
        mplew.writeMapleAsciiString(sMsg);
        mplew.writeMapleAsciiString(sMsgDefault);
        mplew.writeShort((int) nLenMin);
        mplew.writeShort((int) nLenMax);
        return mplew.getPacket();
    }

    public static byte[] OnAskBoxText(byte b, int n, int n2, short n3, short nCol, short nLine, String sMsg, String sMsgDefault) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_BOX_TEXT.getType(), n3, (byte) 0);
        if (NPCParamType.ANOTHER_NPC.check(n3)) {
            mplew.writeInt(n2);
        }
        mplew.writeMapleAsciiString(sMsg);
        mplew.writeMapleAsciiString(sMsgDefault);
        mplew.writeShort((int) nCol);
        mplew.writeShort((int) nLine);
        return mplew.getPacket();
    }

    public static byte[] OnAskNumber(byte b, int n, short n2, int nDef, int nMin, int nMax, String sMsg) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_NUMBER.getType(), n2, (byte) 1);
        short n3 = 0;
        int diffnpc = 0;
        if (NPCParamType.ANOTHER_NPC.check(n3)) {
            mplew.writeInt(diffnpc);
        }
        mplew.writeMapleAsciiString(sMsg);
        mplew.writeInt(nDef);
        mplew.writeInt(nMin);
        mplew.writeInt(nMax);
        return mplew.getPacket();
    }

    public static byte[] OnAskMenu(byte b, int n, int diffnpc, short n3, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_MENU.getType(), n3, (byte) 1);
        if (NPCParamType.ANOTHER_NPC.check(n3)) {
            mplew.writeInt(diffnpc);
        }
        mplew.writeMapleAsciiString(s);
        return mplew.getPacket();
    }

    public static byte[] OnAskAvatar(byte b, int n, int n2, boolean b2, boolean b3, int[] array, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_AVATAR_EX.getType(), (short) 0, (byte) 0);
        mplew.writeBool(b2);
        mplew.writeBool(b3);
        mplew.writeMapleAsciiString(s);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.write(0);
        mplew.write(0);
        mplew.write(0);

        mplew.writeInt(0);//V.156 new
        mplew.write(array.length);
        for (int i = 0; i < array.length; ++i) {
            mplew.writeInt(array[i]);
        }
        mplew.write(0);
        mplew.writeInt(n2);
        return mplew.getPacket();
    }

    public static byte[] OnAskAndroid(byte nSpeakerTypeID, int nSpeakerTemplateID, int cardID, int[] array, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(nSpeakerTypeID, nSpeakerTemplateID, ScriptMessageType.ASK_ANDROID.getType(), (short) 0, (byte) 0);
        mplew.writeMapleAsciiString(s);
        mplew.write(array.length);
        for (int i = 0; i < array.length; ++i) {
            mplew.writeInt(array[i]);
        }
        mplew.writeInt(cardID);
        return mplew.getPacket();
    }

    public static byte[] OnAskAngelicBuster(byte b, int n) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 4, n, ScriptMessageType.ASK_ANGELIC_BUSTER.getType(), (short) 0, (byte) 0);
        return mplew.getPacket();
    }

    public static byte[] OnAskZeroAvatar(byte nSpeakerTypeID, int nSpeakerTemplateID, int srcHair, int src2ndHair, int nMixValue, int nMix2ndValue, int cardID, int[] array, int[] array2, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(nSpeakerTypeID, nSpeakerTemplateID, ScriptMessageType.ASK_AVATAR_EX_ZERO.getType(), (short) 0, (byte) 0);
        mplew.writeMapleAsciiString(s);
        mplew.write(0);
        mplew.writeInt(srcHair);
        mplew.write(nMixValue / 1000);
        nMixValue = Math.abs(nMixValue % 1000);
        mplew.write(nMixValue / 100);
        mplew.write(nMixValue % 100);
        mplew.writeInt(src2ndHair);
        mplew.write(nMix2ndValue / 1000);
        nMix2ndValue = Math.abs(nMix2ndValue % 1000);
        mplew.write(nMix2ndValue / 100);
        mplew.write(nMix2ndValue % 100);
        mplew.writeInt(cardID);
        mplew.writeInt(0);
        mplew.write(array.length);
        for (int i = 0; i < array.length; ++i) {
            mplew.writeInt(array[i]);
        }
        mplew.writeInt(1);
        mplew.write(array2.length);
        for (int i = 0; i < array2.length; ++i) {
            mplew.writeInt(array2[i]);
        }
        return mplew.getPacket();
    }

    public static byte[] OnSayMixHairColor(int n, boolean isAngel, boolean isBeta, boolean isZero, String s, int baseColor, int mixColor, int mixProp, int baseColor2, int mixColor2, int mixProp2) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 4, n, ScriptMessageType.SAY_MIX_HAIR_COLOR.getType(), (short) 0, (byte) 0);
        getMixColorLensResult(mplew, isAngel, isBeta, isZero, s, baseColor, mixColor, mixProp, baseColor2, mixColor2, mixProp2);
        return mplew.getPacket();
    }

    public static byte[] OnSayMixHairColorZero(int n, String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp, int baseColor2, int mixColor2, int mixProp2, int srcBaseColor2, int srcMixColor2, int srcMixProp2) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 4, n, ScriptMessageType.SAY_MIX_HAIR_COLOR_ZERO.getType(), (short) 0, (byte) 0);
        getMixColorLensZeroResult(mplew, s, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcMixProp, baseColor2, mixColor2, mixProp2, srcBaseColor2, srcMixColor2, srcMixProp2);
        return mplew.getPacket();
    }

    public static byte[] OnAskMixHairColor(int n, int itemId, boolean isAngel, int bZero, int prop, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 4, n, ScriptMessageType.ASK_MIX_HAIR_COLOR.getType(), (short) 0, (byte) 0);
        mplew.writeInt(itemId);
        mplew.write(isAngel);
        mplew.writeInt(isAngel ? 0 : bZero);
        mplew.writeInt(prop);
        mplew.writeMapleAsciiString(s);
        return mplew.getPacket();
    }

    public static byte[] OnAskMixHairColorNew(int n, int itemId, boolean isAngel, int bZero, int prop, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 4, n, ScriptMessageType.ASK_MIX_HAIR_COLOR_NEW.getType(), (short) 0, (byte) 0);
        mplew.writeInt(itemId);
        mplew.write(isAngel);
        mplew.writeInt(isAngel ? 0 : bZero);
        mplew.writeInt(prop);
        mplew.writeMapleAsciiString(s);
        return mplew.getPacket();
    }

    public static byte[] OnSayMixHairColorNew(int n, boolean isAngel, boolean isBeta, boolean isZero, String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 4, n, ScriptMessageType.SAY_MIX_HAIR_COLOR_NEW.getType(), (short) 0, (byte) 0);
        getMixColorLensResult(mplew, isAngel, isBeta, isZero, s, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcMixProp);
        return mplew.getPacket();
    }

    public static byte[] OnSayMixHairColorZeroNew(int n, String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp, int baseColor2, int mixColor2, int mixProp2, int srcBaseColor2, int srcMixColor2, int srcMixProp2) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 4, n, ScriptMessageType.SAY_MIX_HAIR_COLOR_ZERO_NEW.getType(), (short) 0, (byte) 0);
        getMixColorLensZeroResult(mplew, s, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcMixProp, baseColor2, mixColor2, mixProp2, srcBaseColor2, srcMixColor2, srcMixProp2);
        return mplew.getPacket();
    }

    private static void getMixColorLensResult(MaplePacketLittleEndianWriter mplew, boolean isAngel, boolean isBeta, boolean isZero, String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp) {
        mplew.write(isAngel);
        mplew.write(isBeta);
        mplew.write(isZero);
        mplew.writeMapleAsciiString(s);
        mplew.writeInt(baseColor);
        mplew.writeInt(mixColor);
        mplew.writeInt(mixProp);
        mplew.writeInt(srcBaseColor);
        mplew.writeInt(srcMixColor);
        mplew.writeInt(srcMixProp);
    }

    private static void getMixColorLensZeroResult(MaplePacketLittleEndianWriter mplew, String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp, int baseColor2, int mixColor2, int mixProp2, int srcBaseColor2, int srcMixColor2, int srcMixProp2) {
        mplew.write(true);
        mplew.writeMapleAsciiString(s);
        mplew.writeInt(baseColor);
        mplew.writeInt(mixColor);
        mplew.writeInt(mixProp);
        mplew.writeInt(srcBaseColor);
        mplew.writeInt(srcMixColor);
        mplew.writeInt(srcMixProp);
        mplew.writeInt(baseColor2);
        mplew.writeInt(mixColor2);
        mplew.writeInt(mixProp2);
        mplew.writeInt(srcBaseColor2);
        mplew.writeInt(srcMixColor2);
        mplew.writeInt(srcMixProp2);
    }

    public static byte[] OnAskRandomMixColorLens(int npc, int itemId, boolean isAngel, boolean isBeta, boolean isZero, String string) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 0x04, npc, false, 0, ScriptMessageType.ASK_RANDOM_MIX_COLOR_LENS.getType(), (short) 0, (byte) 0);

        mplew.writeInt(itemId);
        mplew.write(isAngel);
        mplew.write(isBeta);
        mplew.write(isZero);
        mplew.writeMapleAsciiString(string);

        return mplew.getPacket();
    }

    public static byte[] OnAskMembershopAvatar(int nSpeakerTypeID, int nSpeakerTemplateID, String sMsg, int[] aCanadite) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) nSpeakerTypeID, nSpeakerTemplateID, false, 0, ScriptMessageType.ASK_AVATAR_EX.getType(), (short) 0, (byte) 0);
        if (false) {
            mplew.writeShort(0);
        }
        mplew.writeMapleAsciiString(sMsg);
        mplew.write(aCanadite.length);
        for (int nCanadite : aCanadite) {
            mplew.writeInt(nCanadite);
        }
        final int n3 = 0;
        mplew.write(n3);
        for (int j = 0; j < n3; ++j) {
            mplew.writeInt(0);
        }
        mplew.writeInt(nSpeakerTemplateID);
        return mplew.getPacket();
    }

    public static byte[] OnAskPet(byte b, int n, List<Item> items, String sMsg) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_PET.getType(), (short) 0, (byte) 0);
        mplew.writeMapleAsciiString(sMsg);
        mplew.write(items.size());
        for (Item d80 : items) {
            mplew.writeLong(d80.getSN());
            mplew.write(d80.getPosition());
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskPetAll(byte b, int n, List<Item> list, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_PET_ALL.getType(), (short) 0, (byte) 0);
        mplew.writeMapleAsciiString(s);
        mplew.write(list.size());
        mplew.writeBool(true);
        mplew.writeBool(true);
        for (Item d80 : list) {
            mplew.writeLong(d80.getSN());
            mplew.write(d80.getPosition());
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskQuiz(byte b, int n, short n2, boolean request, int nMinInput, int nMaxInput, String sTitle, String sProblemText, String sHintText) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_QUIZ.getType(), n2, (byte) 1);
        mplew.writeBool(!request);
        if (request) {
            mplew.writeMapleAsciiString(sTitle);
            mplew.writeMapleAsciiString(sProblemText);
            mplew.writeMapleAsciiString(sHintText);
            mplew.writeInt(nMinInput);
            mplew.writeInt(nMaxInput);
            mplew.writeInt(0);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskSpeedQuiz(byte b, int n, short n2, boolean b2, int nType, int dwAnswer, int nCorrect, int nRemain, int tRemainInitialQuiz) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_SPEED_QUIZ.getType(), n2, (byte) 1);
        mplew.writeBool(!b2);
        if (b2) {
            mplew.writeInt(nType);
            mplew.writeInt(dwAnswer);
            mplew.writeInt(nCorrect);
            mplew.writeInt(nRemain);
            mplew.writeInt(tRemainInitialQuiz);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskICQuiz(byte b, int n, short n2, boolean b2, String s, String s2, int n3) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_ICQUIZ.getType(), n2, (byte) 1);
        mplew.writeBool(!b2);
        if (b2) {
            mplew.writeMapleAsciiString(s);
            mplew.writeMapleAsciiString(s2);
            mplew.writeInt(n3);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskOlympicQuiz(byte b, int n, short n2, boolean b2, int nType, int nQuestion, int nCorrect, int nRemain, int tRemainInitialQuiz) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_OLYMPIC_QUIZ.getType(), n2, (byte) 1);
        mplew.writeBool(!b2);
        if (b2) {
            mplew.writeMapleAsciiString("BeijingOlympic");
            mplew.writeInt(nType);
            mplew.writeInt(nQuestion);
            mplew.writeInt(nCorrect);
            mplew.writeInt(nRemain);
            mplew.writeInt(tRemainInitialQuiz);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskNumberKeypad(int n, short n2, int n3) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 3, n, ScriptMessageType.ASK_NUMBER_KEYPAD.getType(), n2, (byte) 0);
        mplew.writeInt(n3);
        return mplew.getPacket();
    }

    public static byte[] OnAskUserSurvey(int n, short n2, int n3, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 3, n, ScriptMessageType.ASK_USER_SURVEY.getType(), n2, (byte) 0);
        mplew.writeInt(n3);
        mplew.write(1);
        mplew.writeMapleAsciiString(s);
        return mplew.getPacket();
    }

    public static byte[] OnAskSlideMenu(byte b, int n, int bSlideDlgEX, int nIndex, String sMsg) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_SLIDE_MENU.getType(), (short) 0, (byte) 0);
        mplew.writeInt(bSlideDlgEX);
        mplew.writeInt((bSlideDlgEX == 0) ? nIndex : 0);
        mplew.writeMapleAsciiString(sMsg);
        return mplew.getPacket();
    }

    public static byte[] OnAskSelectMenu(byte b, int n, int n2, String[] array) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, 0, true, n, ScriptMessageType.ASK_SELECT_MENU.getType(), (short) 0, (byte) 0);
        mplew.writeInt(n2);
        mplew.writeInt(0);
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt((array != null) ? array.length : 0);
        for (int n3 = 0; array != null && n3 < array.length; ++n3) {
            mplew.writeMapleAsciiString(array[n3]);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskWeaponBox(byte b, int intValue, int n, List<Integer> list, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, intValue, ScriptMessageType.ASK_WEAPON_BOX.getType(), (short) 0, (byte) 0);
        mplew.writeMapleAsciiString(s);
        mplew.writeInt(n);
        mplew.writeInt(list.size());
        list.forEach(mplew::writeInt);
        return mplew.getPacket();
    }

    public static byte[] OnAskPetEvolution(byte b, int n, List<Item> items, String s) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader(b, n, ScriptMessageType.ASK_ACTION_PET_EVOLUTION.getType(), (short) 0, (byte) 0);
        mplew.writeMapleAsciiString(s);
        mplew.write(items.size());
        for (Item item : items) {
            mplew.writeLong(item.getSN());
            mplew.write(item.getPosition());
        }
        return mplew.getPacket();
    }

    public static byte[] getSlideMenu(int nSpeakerTypeID, int npcid, int type, int lasticon, String sel) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) nSpeakerTypeID, npcid, false, 0, ScriptMessageType.ASK_SLIDE_MENU.getType(), (short) 0, (byte) 0);
        mplew.writeInt(type);
        mplew.writeInt(type == 0 ? lasticon : 0);
        mplew.writeMapleAsciiString(sel);

        return mplew.getPacket();
    }

    public static byte[] getMapSelection(int npcid, byte msgType, String sel) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 0x04, npcid, false, 0, msgType, (short) 0, (byte) 0);
        mplew.writeInt(npcid == 3000012 ? 5 : npcid == 9010000 ? 3 : npcid == 2083006 ? 1 : 0);
        mplew.writeInt(npcid == 9010022 ? 1 : 0);
        mplew.writeMapleAsciiString(sel);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalkStyle(int npc, String talk, int styles[], int card, boolean android, boolean isSecond) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 0x04, npc, false, 0, android ? ScriptMessageType.ASK_ANDROID.getType() : ScriptMessageType.ASK_AVATAR_EX.getType(), (short) 0, (byte) 0);

        if (!android) {
            mplew.write(isSecond ? 1 : 0);
            mplew.write(isSecond ? 1 : 0); //V.114 修改 以前1個 0
        }
        mplew.writeMapleAsciiString(talk);
        if (!android) {
            mplew.write(0);
            mplew.writeInt(0);
            mplew.write(0);
            mplew.write(0);
            mplew.write(0);
            mplew.writeInt(0);
        }

        mplew.write(styles.length);
        for (int style : styles) {
            mplew.writeInt(style);
        }
        mplew.writeInt(card);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalkNum(int npc, byte msgType, String talk, int def, int min, int max) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 0x04, npc, false, 0, msgType, (short) 0, (byte) 0);

        mplew.writeMapleAsciiString(talk);
        mplew.writeInt(def);
        mplew.writeInt(min);
        mplew.writeInt(max);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalkText(int npc, byte msgType, String talk) {
        MaplePacketLittleEndianWriter mplew = getScriptMessageHeader((byte) 0x04, npc, false, 0, msgType, (short) 0, (byte) 0);

        mplew.writeMapleAsciiString(talk);
        mplew.writeInt(0x00);
        mplew.writeInt(0x00);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalkText(byte type, byte mode, int npcid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ScriptMessage.getValue());
        mplew.writeInt(0);
        mplew.write(ScriptMessageType.ASK_TEXT.getType());
        mplew.writeInt(0);
        mplew.write(1);
        mplew.writeInt(npcid);
        mplew.writeShort(24);
        mplew.write(1);
        mplew.write(0);
        mplew.writeShort(1);
        mplew.writeLong(0);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    /**
     * 顯示嚮導提示
     *
     * @param data
     * @return
     */
    public static byte[] getEvanTutorial(String data) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ScriptMessage.getValue());
        mplew.writeInt(0);
        mplew.write(ScriptMessageType.ASK_TEXT.getType());
        mplew.writeInt(0); //NpcID
        mplew.write(0);
        mplew.writeShort(2);
        mplew.writeShort(1);
        mplew.write(1);
        mplew.writeMapleAsciiString(data);

        return mplew.getPacket();
    }

    /*
     * 打開1個商店
     */
    public static byte[] getNPCShop(int shopId, MapleShop shop, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_OpenShopDlg.getValue());
        mplew.writeInt(shopId);//V.160 new
        mplew.write(0);
        PacketHelper.addShopInfo(mplew, shop, c);

        return mplew.getPacket();
    }

    /*
     * 商店操作提示
     */
    public static byte[] confirmShopTransaction(MapleShopResponse code, MapleShop shop, MapleClient c, int indexBought, int itemId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ShopResult.getValue());
        mplew.write(code.getValue());
        switch (code) {
            case ShopRes_BuySuccess: //購買道具 [9B 02] [00] [00 00] 購買回購欄裡面的道具 [9B 02] [00] [01] [00 00 00 00]
            case ShopRes_NotEnoughSpace: //請確認是不是你的背包的空間不夠。[9B 02] [04] [00 00]
            case ShopRes_RechargeSuccess: //充值飛鏢和子彈 V.112修改 以前 0x0A
            case ShopRes_RechargeNoMoney: //充值飛鏢和子彈提示楓幣不足 V.112修改 以前0x0C
            case ShopRes_TradeBlockedNotActiveAccount: //販賣價格比購買價格高.無法購買。
                mplew.writeBool(indexBought >= 0); //是否回購欄的道具
                if (indexBought >= 0) {
                    mplew.writeInt(indexBought); //道具在回購欄的位置 默認從 0 開始 V.160 short=>int
                } else {
                    //V.160:
                    mplew.writeInt(itemId);//new
                    mplew.writeInt(1000000);//new
                    mplew.writeInt(0);//V.161 new
                    mplew.writeInt(0);
                    //mplew.write(0);//del
                    //end
                }
//                mplew.writeInt(0);//V.160 delete
                break;
            case ShopRes_SellSuccess: //賣出道具
//                mplew.writeInt(shop.getId());//V.160 new
                PacketHelper.addShopInfo(mplew, shop, c);
                break;
            case ShopRes_BuyNoStock:
                mplew.writeInt(0);
                break;
            case ShopRes_NpcRandomShopReset:
                mplew.writeInt(0);
                mplew.writeInt(0);
                break;
            case ShopRes_BuyNoMoney:
            case ShopRes_RechargeNoStock:
                break;
            case ShopRes_BuyNoQuest:
                break;
            //10 break
            case ShopRes_BuyNoFloor:
                mplew.writeInt(0);
                break;
            case ShopRes_LimitLevel_Less: // #{-indexBought}級以下才可以購買
                mplew.writeInt(-indexBought);
                break;
            case ShopRes_LimitLevel_More: // #{indexBought}級以上才可以購買
                mplew.writeInt(indexBought);
                break;
            case ShopRes_FailedByBuyLimit:
                mplew.writeInt(0);
                break;
            case ShopRes_BuyStockOver:
                mplew.writeInt(0);
                break;
            case ShopRes_TradeBlockedSnapShot:
                mplew.writeInt(0);
                break;
            case ShopRes_UnableShopVersion:
                mplew.write(0);
                if (false) {
                    PacketHelper.addShopInfo(mplew, shop, c);
                }
                break;
        }

        return mplew.getPacket();
    }

    /*
     * 倉庫取出
     */
    public static byte[] takeOutStorage(short slots, MapleInventoryType type, Collection<Item> items) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TrunkResult.getValue());
        mplew.write(TrunkOptType.TrunkRes_GetSuccess);
        mplew.write(slots & 0xFF);
        mplew.writeLong(type.getBitfieldEncoding());
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
        }

        return mplew.getPacket();
    }

    /*
     * 取回道具
     * 0x0A = 請確認是不是你的背包空間不夠。
     * 0x0B = 楓幣不足
     * 保存道具
     * 0x10 = 楓幣不足
     * 0x11 = 倉庫已滿
     */
    public static byte[] getStorageError(byte op) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TrunkResult.getValue());
        mplew.write(op);

        return mplew.getPacket();
    }

    /*
     * 倉庫存入道具
     */
    public static byte[] storeStorage(short slots, MapleInventoryType type, Collection<Item> items) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TrunkResult.getValue());
        mplew.write(TrunkOptType.TrunkRes_PutSuccess);
        mplew.write(slots & 0xFF);
        mplew.writeLong(type.getBitfieldEncoding());
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
        }

        return mplew.getPacket();
    }

    /*
     * 倉庫道具排序
     */
    public static byte[] arrangeStorage(short slots, Collection<Item> items, boolean changed) {
        log.trace("調用");
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TrunkResult.getValue());
        mplew.write(TrunkOptType.TrunkRes_SortItem);
        mplew.write(slots & 0xFF);
        mplew.writeLong(0x7C); //4 | 8 | 10 | 20 | 40
        /*
         * 排序倉庫應該是
         * 裝備一種
         * 消耗一種
         * 其他一種
         * 設置一種
         * 商城一種
         */
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
        }
        mplew.writeInt(0x00);

        return mplew.getPacket();
    }

    /*
     * 倉庫保存楓幣
     */
    public static byte[] mesoStorage(short slots, long meso) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TrunkResult.getValue());
        mplew.write(TrunkOptType.TrunkRes_MoneySuccess);
        mplew.write(slots & 0xFF);
        mplew.writeLong(0x02);
        mplew.writeLong(meso);

        return mplew.getPacket();
    }

    public static byte[] getStoragePwd(boolean wrong) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TrunkResult.getValue());
        mplew.write(TrunkOptType.TrunkRes_TrunkCheckSSN2);
        mplew.write(wrong);

        return mplew.getPacket();
    }

    /*
     * 打開倉庫
     */
    public static byte[] getStorage(int npcId, short slots, Collection<Item> items, long meso) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_TrunkResult.getValue());
        mplew.write(TrunkOptType.TrunkRes_OpenTrunkDlg);
        mplew.writeInt(npcId);
        mplew.write(slots & 0xFF);
        mplew.writeLong(0x7E);
        mplew.writeLong(meso);
        /*
         * 打開倉庫應該是
         * 裝備一種
         * 消耗一種
         * 其他一種
         * 設置一種
         * 商城一種
         */
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.GW_ItemSlotBase_Encode(mplew, item);
        }
        mplew.writeInt(0x00);

        return mplew.getPacket();
    }

    public static byte[] setNPCSpecialAction(int npcoid, String string) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_NpcSpecialAction.getValue());
        mplew.writeInt(npcoid);
        mplew.writeMapleAsciiString(string);
        mplew.writeInt(0);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] updateNPCSpecialAction(int npcoid, int value, int x, int y) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LP_ForceMoveByScript.getValue());
        mplew.writeInt(npcoid);
        mplew.writeInt(value);
        mplew.writeInt(x);
        mplew.writeInt(y);

        return mplew.getPacket();
    }

    private static MaplePacketLittleEndianWriter getScriptMessageHeader(byte nSpeakerTypeID, int nSpeakerTemplateID, byte smType, short sParam, byte bParam) {
        return getScriptMessageHeader(nSpeakerTypeID, nSpeakerTemplateID, false, 0, smType, sParam, bParam);
    }

    private static MaplePacketLittleEndianWriter getScriptMessageHeader(byte nSpeakerTypeID, int nSpeakerTemplateID, boolean b, int u1, byte smType, short sParam, byte bParam) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_ScriptMessage.getValue());
        mplew.writeInt(0);
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.writeBool(b);
        if (b) {
            mplew.writeInt(u1);
        }
        mplew.write(smType);
        mplew.writeShort(sParam);
        mplew.write(bParam);
        return mplew;
    }

    public static byte[] SetBuyLimitCount(int shopId, short position, int itemId, int buyLimit, long l) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_SetBuyLimitCount.getValue());
        mplew.writeInt(shopId);
        mplew.writeShort((int) position);
        mplew.writeInt(itemId);
        mplew.writeShort(buyLimit);
        PacketHelper.addExpirationTime(mplew, l);
        return mplew.getPacket();
    }

    public static byte[] ResetBuyLimitCount(int shopId, List<Integer> list) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_ResetBuyLimitcount.getValue());

        mplew.writeInt(shopId);
        mplew.writeInt(list.size());
        for (Integer integer : list) {
            mplew.writeShort(integer);
        }
        return mplew.getPacket();
    }
}
