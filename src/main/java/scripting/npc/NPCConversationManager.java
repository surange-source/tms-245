package scripting.npc;

import client.*;
import client.inventory.*;
import client.skills.InnerSkillEntry;
import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ItemConstants;
import constants.SkillConstants;
import constants.enums.ConversationType;
import constants.enums.ScriptMessageType;
import constants.enums.ScriptType;
import database.DatabaseConnectionEx;
import handling.channel.ChannelServer;
import handling.channel.MapleGuildRanking;
import handling.channel.handler.PlayersHandler;
import handling.world.*;
import handling.world.guild.MapleGuild;
import handling.world.guild.MapleGuildAlliance;
import handling.world.party.ExpeditionType;
import handling.world.party.MapleParty;
import handling.world.party.MaplePartyCharacter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.*;
import scripting.AbstractPlayerInteraction;
import scripting.event.EventInstanceManager;
import server.*;
import server.RankingWorker.RankingInformation;
import server.Timer.CloneTimer;
import server.buffs.MapleStatEffect;
import server.life.*;
import server.maps.FieldLimitType;
import server.maps.MapleMap;
import server.maps.MapleSlideMenu;
import server.maps.events.Event_PyramidSubway;
import server.market.MarketEngine;
import server.market.MarketEngine.ItemEntry;
import server.quest.MapleQuest;
import server.quest.MapleQuestRequirement;
import server.quest.MapleQuestRequirementType;
import server.shop.MapleShopFactory;
import server.squad.MapleSquad;
import tools.*;
import tools.types.*;

import javax.script.Invocable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.Map.Entry;

public class NPCConversationManager extends AbstractPlayerInteraction {

    private static final Logger log = LogManager.getLogger(NPCConversationManager.class);
    private final String npcMode;
    private final Invocable iv;
    private final ScriptType type;
    public boolean pendingDisposal = false;
    private int lastSMType;

    public NPCConversationManager(MapleClient c, int npc, String npcMode, ScriptType type, Invocable iv) {
        super(c, npc, npcMode, null);
        this.npcMode = npcMode;
        this.iv = iv;
        this.type = type;
    }

    public NPCConversationManager(MapleClient c, int npc, String npcMode, ScriptType type, Invocable iv, Item item) {
        super(c, npc, npcMode, item);
        this.npcMode = npcMode;
        this.iv = iv;
        this.type = type;
    }

    public static String showMobImg(int mob) {
        MapleMonster monster = MapleLifeFactory.getMonster(mob);
        if (monster.getStats().getLink() != 0) {
            mob = monster.getStats().getLink();
        }
        String mobStr = String.valueOf(mob);
        while (mobStr.length() < 7) {
            mobStr = "0" + mobStr;
        }
        return "#fMob/" + mobStr + ".img/stand/0#";
    }

    public ScriptType getType() {
        return type;
    }

    public Invocable getIv() {
        return iv;
    }

    public int getNpc() {
        return npcID;
    }

    public String getScript() {
        return npcMode;
    }

    public String getNpcMode() {
        return npcMode;
    }

    public void safeDispose() {
        pendingDisposal = true;
    }

    public void dispose() {
        NPCScriptManager.getInstance().dispose(getClient());
    }

    //--------------------------------------------------
    // public npc talk api start
    //--------------------------------------------------

    public void sendOkN(String text) {
        sendOkE(text, npcID);
    }

    public void sendOkN(String text, int idd) {
        sendOkE(text, idd);
    }

    public void sendOkS(String text, byte type) {
        sendOkS(text, type, npcID);
    }

    public void sendOkS(String text, byte type, int idd) {
        if (text.contains("#L")) {
            sendSimpleS(text, type);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.SAY.getType(), text, "00 00", type, idd));
    }

    public void sendPlayerToNpc(String text) {
        sendNextS(text, (byte) 3, npcID);
    }

    public void sendNextS(String text, byte type) {
        sendNextS(text, type, npcID);
    }

    public void sendNextS(String text, byte type, int idd) {
        if (text.contains("#L")) {
            sendSimpleS(text, type);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.SAY.getType(), text, "00 01", type, idd));
    }

    public void sendNextN(String text) {
        this.sendNextN(text, ScriptMessageType.ASK_WEAPON_BOX.getType(), this.npcID);
    }

    public void sendNextN(String text, byte type, int idd) {
        if (text.contains("#L")) {
            this.sendSimpleN(text, type, this.npcID);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.SAY.getType(), text, "00 01", type, (byte) 1, idd, false));
    }

    public void sendPrevS(String text, byte type) {
        sendPrevS(text, type, npcID);
    }

    public void sendPrevS(String text, byte type, int idd) {
        if (text.contains("#L")) {
            sendSimpleS(text, type);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.SAY.getType(), text, "01 00", type, idd));
    }

    public void sendPrevN(String text) {
        this.sendPrevN(text, ScriptMessageType.ASK_WEAPON_BOX.getType(), npcID);
    }

    public void sendPrevN(String text, byte type) {
        this.sendPrevN(text, type, this.npcID);
    }

    public void sendPrevN(String text, byte type, int idd) {
        if (text.contains("#L")) {
            this.sendSimpleN(text, type, idd);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.SAY.getType(), text, "01 00", type, (byte) 1, idd, false));
    }

    public void PlayerToNpc(String text) {
        sendNextPrevS(text, (byte) 3);
    }

    public void sendNextPrevS(String text, byte type) {
        sendNextPrevS(text, type, npcID);
    }

    public void sendNextPrevS(String text, byte type, int idd) {
        if (text.contains("#L")) {
            sendSimpleS(text, type);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.SAY.getType(), text, "01 01", type, idd));
    }

    public void sendNextPrevN(String text) {
        this.sendNextPrevS(text, ScriptMessageType.ASK_WEAPON_BOX.getType());
    }

    public void sendNextPrevN(String text, byte type) {
        this.sendNextPrevN(text, type, this.npcID);
    }

    public void sendNextPrevN(String text, byte type, int idd) {
        if (text.contains("#L")) {
            this.sendSimpleN(text, type, idd);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(npcID, ScriptMessageType.SAY.getType(), text, "01 01", type, (byte) 1, idd, false));
    }

    public void sendAcceptDecline(String text) {
        askAccept(text);
    }

    public void sendAcceptDeclineNoESC(String text) {
        askAcceptNoESC(text);
    }

    public void askAcceptDecline(String text) {
        askAcceptDecline(text, npcID);
    }

    public void askAcceptDecline(String text, int id) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(id, (byte) ScriptMessageType.ASK_ACCEPT.getType(), text, "", (byte) 0x00));
    }

    public void askAcceptDeclineNoESC(String text) {
        askAcceptDeclineNoESC(text, npcID);
    }

    public void askAcceptDeclineNoESC(String text, int id) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(id, ScriptMessageType.ASK_ACCEPT.getType(), text, "", (byte) 0x01));
    }

    public void askMapSelection(String sel) {
        getClient().announce(NPCPacket.getMapSelection(npcID, ScriptMessageType.ASK_BOX_TEXT.getType(), sel));
    }

    public void sendSimple(String text) {
        askMenu(text);
    }

    public void sendSimple(String text, int id) {
        askMenu(text, id);
    }

    public void sendSimpleS(String text, byte type) {
        sendSimpleS(text, type, npcID);
    }

    public void sendSimpleS(String text, byte type, int idd) {
        if (!text.contains("#L")) {
            sendNextS(text, type);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.ASK_MENU.getType(), text, "", type, idd));
    }

    public void sendSimpleN(String text) {
        this.sendSimpleN(text, ScriptMessageType.ASK_MENU_DUAL_ILLUSTRATION.getType(), this.npcID);
    }

    public void sendSimpleN(String text, byte type, int idd) {
        if (!text.contains("#L")) {
            this.sendNextN(text, type, idd);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(idd, ScriptMessageType.ASK_MENU.getType(), text, "", type, (byte) 1, idd, false));
    }

    public void askAvatar(String text, int styles[], int card, boolean isSecond) {
        getClient().announce(NPCPacket.getNPCTalkStyle(npcID, text, styles, card, false, isSecond));
    }

    public void sendStyle(String text, int styles[], int card, boolean isSecond) {
        getClient().announce(NPCPacket.getNPCTalkStyle(npcID, text, styles, card, false, isSecond));
    }

    public void sendAStyle(String text, int styles[], int card) {
        askAndroid(text, styles, card);
//        getClient().announce(NPCPacket.getNPCTalkStyle(npcID, text, styles, card, true, false));
    }

    public void sendGetNumber(String text, int def, int min, int max) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalkNum(npcID, ScriptMessageType.ASK_NUMBER.getType(), text, def, min, max));
    }

    public void sendGetText(String text) {
        sendGetText(text, npcID);
    }

    public void sendGetText(String text, int id) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalkText(id, ScriptMessageType.ASK_TEXT.getType(), text));
    }

    public void sendPlayerOk(String text) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getPlayerTalk(npcID, ScriptMessageType.SAY.getType(), text, "00 00", (byte) 0x10));
    }

    public void sendPlayerOk(String text, byte type, int npcId) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getPlayerTalk(npcId, ScriptMessageType.SAY.getType(), text, "00 00", type, npcId));
    }

    public void sendPlayerPrev(String text, byte type, int npcId) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getPlayerTalk(npcId, ScriptMessageType.SAY.getType(), text, "01 00", type, npcId));
    }

    public void sendPlayerNext(String text) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getPlayerTalk(npcID, ScriptMessageType.SAY.getType(), text, "00 01", (byte) 0x12));
    }

    public void sendPlayerNext(String text, byte type, int npcId) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getPlayerTalk(npcId, ScriptMessageType.SAY.getType(), text, "00 01", type, npcId));
    }

    public void sendPlayerNextPrev(String text) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getPlayerTalk(npcID, ScriptMessageType.SAY.getType(), text, "01 01", (byte) 0x12));
    }

    public void sendPlayerNextPrev(String text, byte type, int npcId) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getPlayerTalk(npcId, ScriptMessageType.SAY.getType(), text, "01 01", type, npcId));
    }

    /*
     * 復活寵物選擇對話框
     * 未知正式啟用
     * 1個寵物 寵物位置 9
     * Recv NPC_TALK [02B9] (65)
     * B9 02
     * 04
     * A6 BF 0F 00
     * 0C 00
     * 2C 00 C4 E3 CF EB C8 C3 C4 C4 D2 BB B8 F6 B3 E8 CE EF B8 B4 BB EE C4 D8 A3 BF C7 EB D1 A1 D4 F1 CF EB B8 B4 BB EE B5 C4 B3 E8 CE EF A1 AD
     * 01
     * 11 6E 3B 00 00 00 00 00 - 寵物的唯一ID
     * 09 寵物在背包的位置
     * ?.....,.你想讓哪一個寵物復活呢？請選擇想復活的寵物…..n;......
     */
    public void sendRevivePet(String text) {
        askPetRevive(text);
    }

    public void sendPlayerStart(String text) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        //V.114修改 以前0x10
        getClient().announce(NPCPacket.getPlayerTalk(npcID, ScriptMessageType.ASK_ACCEPT.getType(), text, "", (byte) 0x10));
    }

    public void sendSlideMenu(final int type, final String sel) {
        String[] arrstring = sel.split("#");
        if (arrstring.length < 3) {
            return;
        }
        getClient().announce(NPCPacket.getSlideMenu(ScriptMessageType.ASK_TEXT.getType(), npcID, type, Integer.valueOf(arrstring[arrstring.length - 2]), sel));
    }

    public String getSlideMenuSelection(int type) {
        switch (type) {
            case 1:
                return MapleSlideMenu.SlideMenu1.getSelectionInfo(getPlayer(), npcID);
            case 2:
                return MapleSlideMenu.SlideMenu2.getSelectionInfo(getPlayer(), npcID);
            case 3:
                return MapleSlideMenu.SlideMenu3.getSelectionInfo(getPlayer(), npcID);
            case 4:
                return MapleSlideMenu.SlideMenu4.getSelectionInfo(getPlayer(), npcID);
            case 5:
                return MapleSlideMenu.SlideMenu5.getSelectionInfo(getPlayer(), npcID);
            case 6:
                return MapleSlideMenu.SlideMenu6.getSelectionInfo(getPlayer(), npcID);
            case 0:
            default:
                return MapleSlideMenu.SlideMenu0.getSelectionInfo(getPlayer(), npcID);
        }
    }

    public int[] getSlideMenuDataIntegers(int type, int selection) {
        switch (type) {
            case 1:
                return MapleSlideMenu.SlideMenu1.getDataIntegers(selection);
            case 2:
                return MapleSlideMenu.SlideMenu2.getDataIntegers(selection);
            case 3:
                return MapleSlideMenu.SlideMenu3.getDataIntegers(selection);
            case 4:
                return MapleSlideMenu.SlideMenu4.getDataIntegers(selection);
            case 5:
                return MapleSlideMenu.SlideMenu5.getDataIntegers(selection);
            case 6:
                return MapleSlideMenu.SlideMenu6.getDataIntegers(selection);
            case 0:
            default:
                return MapleSlideMenu.SlideMenu0.getDataIntegers(selection);
        }
    }

    public void askAngelicBuster() {
        this.lastSMType = ScriptMessageType.ASK_ANGELIC_BUSTER.getType();
        getClient().announce(NPCPacket.OnAskAngelicBuster((byte)4, this.npcID));
    }

    public void sayMixHairColor(boolean isAngel, boolean isBeta, boolean isZero, final String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp) {
        this.lastSMType = ScriptMessageType.SAY_MIX_HAIR_COLOR.getType();
        getClient().announce(NPCPacket.OnSayMixHairColor(this.npcID, isAngel, isBeta, isZero, s, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcMixProp));
    }

    public void sayMixHairColorZero(final String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp, int baseColor2, int mixColor2, int mixProp2, int srcBaseColor2, int srcMixColor2, int srcMixProp2) {
        this.lastSMType = ScriptMessageType.SAY_MIX_HAIR_COLOR_ZERO.getType();
        getClient().announce(NPCPacket.OnSayMixHairColorZero(this.npcID, s, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcMixProp, baseColor2, mixColor2, mixProp2, srcBaseColor2, srcMixColor2, srcMixProp2));
    }

    public void sayMixHairColorNew(boolean isAngel, boolean isBeta, boolean isZero, final String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp) {
        this.lastSMType = ScriptMessageType.SAY_MIX_HAIR_COLOR_NEW.getType();
        getClient().announce(NPCPacket.OnSayMixHairColorNew(this.npcID, isAngel, isBeta, isZero, s, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcMixProp));
    }

    public void sayMixHairColorZeroNew(final String s, int baseColor, int mixColor, int mixProp, int srcBaseColor, int srcMixColor, int srcMixProp, int baseColor2, int mixColor2, int mixProp2, int srcBaseColor2, int srcMixColor2, int srcMixProp2) {
        this.lastSMType = ScriptMessageType.SAY_MIX_HAIR_COLOR_ZERO_NEW.getType();
        getClient().announce(NPCPacket.OnSayMixHairColorZeroNew(this.npcID, s, baseColor, mixColor, mixProp, srcBaseColor, srcMixColor, srcMixProp, baseColor2, mixColor2, mixProp2, srcBaseColor2, srcMixColor2, srcMixProp2));
    }

    public void askRandomMixColorLens(int itemId, boolean isAngel, boolean isBeta, boolean isZero, final String s) {
        this.lastSMType = ScriptMessageType.ASK_RANDOM_MIX_COLOR_LENS.getType();
        getClient().announce(NPCPacket.OnAskRandomMixColorLens(this.npcID, itemId, isAngel, isBeta, isZero, s));
    }

    public void askMixHairColor(int itemId, boolean isAngel, int bZero, int prop, String s) {
        this.lastSMType = ScriptMessageType.ASK_MIX_HAIR_COLOR.getType();
        getClient().announce(NPCPacket.OnAskMixHairColor(this.npcID, itemId, isAngel, bZero, prop, s));
    }

    public void askMixHairColorNew(int itemId, boolean isAngel, int bZero, int prop, String s) {
        this.lastSMType = ScriptMessageType.ASK_MIX_HAIR_COLOR_NEW.getType();
        getClient().announce(NPCPacket.OnAskMixHairColorNew(this.npcID, itemId, isAngel, bZero, prop, s));
    }

    public void sendOk(final String s) {
        this.sendOk(s, npcID, NPCParamType.NORMAL, true);
    }

    public void sendOk(final String s, final int n) {
        this.sendOk(s, n, NPCParamType.NORMAL, true);
    }

    public void sendOk(final String message, final boolean bLeft) {
        this.sendOk(message, this.npcID, NPCParamType.NORMAL, bLeft);
    }

    public void sendOkNoESC(final String message) {
        sendOkNoESC(message, true);
    }

    public void sendOkNoESC(final String message, final boolean bLeft) {
        this.sendOk(message, this.npcID, NPCParamType.NO_ESC, bLeft);
    }

    public void sendOkS(final String s) {
        this.sendOkS(s, NPCParamType.NORMAL, true);
    }

    public void sendOkS(final String s, final boolean b) {
        this.sendOkS(s, NPCParamType.NORMAL, b);
    }

    public void sendOkE(final String s) {
        this.sendOkE(s, 0, NPCParamType.NORMAL, false, 0);
    }

    public void sendOkE(final String s, final int n) {
        this.sendOkE(s, n, NPCParamType.NORMAL, n < 0, 0);
    }

    public void sendOkENoESC(final String s) {
        this.sendOkE(s, 0, NPCParamType.NO_ESC, false, 0);
    }

    public void sendOkENoESC(final String s, final int n) {
        this.sendOkE(s, n, NPCParamType.NO_ESC, n < 0, 0);
    }

    public void sendOkENoESC(final String s, final int n, final int n2) {
        this.sendOkE(s, n, NPCParamType.NO_ESC, n < 0, n2);
    }

    public void sendNext(final String s) {
        this.sendNext(s, 0, NPCParamType.NORMAL, true);
    }

    public void sendNext(final String s, final int n) {
        this.sendNext(s, n, NPCParamType.NORMAL, false);
    }

    public void sendNext(final String s, final boolean b) {
        this.sendNext(s, this.npcID, NPCParamType.NORMAL, b);
    }

    public void sendNextNoESC(final String s) {
        this.sendNext(s, this.npcID, NPCParamType.NO_ESC, true);
    }

    public void sendNextNoESC(final String s, final boolean b) {
        this.sendNext(s, this.npcID, NPCParamType.NO_ESC, b);
    }

    public void sendNextNoESC(final String s, final int n) {
        this.sendNext(s, n, NPCParamType.NO_ESC, false);
    }

    public void sendNextS(final String s) {
        this.sendNextS(s, NPCParamType.NORMAL, true);
    }

    public void sendNextS(final String s, final boolean b) {
        this.sendNextS(s, NPCParamType.NORMAL, b);
    }

    public void sendNextSNoESC(final String s) {
        this.sendNextS(s, NPCParamType.NO_ESC, true);
    }

    public void sendNextE(final String s) {
        this.sendNextE(s, 0, NPCParamType.NORMAL, false, 0);
    }

    public void sendNextE(final String s, final int n) {
        this.sendNextE(s, n, NPCParamType.NORMAL, n < 0, 0);
    }

    public void sendNextENoESC(final String s) {
        this.sendNextE(s, 0, NPCParamType.NO_ESC, false, 0);
    }

    public void sendNextENoESC(final String s, final int n) {
        this.sendNextE(s, n, NPCParamType.NO_ESC, n < 0, 0);
    }

    public void sendNextENoESC(final String s, final int n, final int n2) {
        this.sendNextE(s, n, NPCParamType.NO_ESC, n < 0, n2);
    }

    public void sendPrev(final String s) {
        this.sendPrev(s, 0, NPCParamType.NORMAL, true);
    }

    public void sendPrevS(final String s) {
        this.sendPrevS(s, NPCParamType.NORMAL, true);
    }

    public void sendPrevE(final String s) {
        this.sendPrevE(s, 0, NPCParamType.NORMAL, false, 0);
    }

    public void sendPrevE(final String s, final int n) {
        this.sendPrevE(s, n, NPCParamType.NORMAL, n < 0, 0);
    }

    public void sendPrevENoESC(final String s) {
        this.sendPrevE(s, 0, NPCParamType.NO_ESC, false, 0);
    }

    public void sendPrevENoESC(final String s, final int n) {
        this.sendPrevE(s, n, NPCParamType.NO_ESC, n < 0, 0);
    }

    public void sendPrevENoESC(final String s, final int n, final int n2) {
        this.sendPrevE(s, n, NPCParamType.NO_ESC, n < 0, n2);
    }

    public void sendNextPrev(final String s) {
        this.sendNextPrev(s, 0, NPCParamType.NORMAL, true);
    }

    public void sendNextPrev(final String s, final boolean b) {
        this.sendNextPrev(s, this.npcID, NPCParamType.NORMAL, b);
    }

    public void sendNextPrev(final String s, final int n) {
        this.sendNextPrev(s, n, NPCParamType.NORMAL, false);
    }

    public void sendNextPrevNoESC(final String s) {
        this.sendNextPrevNoESC(s, true);
    }

    public void sendNextPrevNoESC(final String s, final boolean b) {
        this.sendNextPrev(s, this.npcID, NPCParamType.NO_ESC, b);
    }

    public void sendNextPrevNoESC(final String s, final int n) {
        this.sendNextPrev(s, n, NPCParamType.NO_ESC, false);
    }

    public void sendNextPrevS(final String s) {
        this.sendNextPrevS(s, NPCParamType.NORMAL, true);
    }

    public void sendNextPrevS(final String s, final boolean b) {
        this.sendNextPrevS(s, NPCParamType.NORMAL, b);
    }

    public void sendNextPrevSNoESC(final String s) {
        this.sendNextPrevS(s, NPCParamType.NO_ESC, true);
    }

    public void sendNextPrevSNoESC(final String s, final boolean b) {
        this.sendNextPrevS(s, NPCParamType.NO_ESC, b);
    }

    public void sendNextPrevE(final String s) {
        this.sendNextPrevE(s, 0, NPCParamType.NORMAL, false, 0);
    }

    public void sendNextPrevE(final String s, final int n) {
        this.sendNextPrevE(s, n, NPCParamType.NORMAL, n < 0, 0);
    }

    public void sendNextPrevENoESC(final String s) {
        this.sendNextPrevE(s, 0, NPCParamType.NO_ESC, false, 0);
    }

    public void sendNextPrevENoESC(final String s, final int n) {
        this.sendNextPrevE(s, n, NPCParamType.NO_ESC, n < 0, 0);
    }

    public void sendNextPrevENoESC(final String s, final int n, final int n2) {
        this.sendNextPrevE(s, n, NPCParamType.NO_ESC, n < 0, n2);
    }

    public void askReplace(final String s) {
        this.askYesNo(s, this.npcID, NPCParamType.REPLACE, true);
    }

    public void askYesNo(final String s) {
        this.askYesNo(s, true);
    }

    public void askYesNo(final String s, final int n) {
        this.askYesNo(s, n, NPCParamType.NORMAL, false);
    }

    public void askYesNo(final String s, final boolean b) {
        this.askYesNo(s, this.npcID, NPCParamType.NORMAL, b);
    }

    public void askYesNoNoESC(final String s) {
        this.askYesNo(s, this.npcID, NPCParamType.NO_ESC, true);
    }

    public void askYesNoNoESC(final String s, final boolean b) {
        this.askYesNo(s, this.npcID, NPCParamType.NO_ESC, b);
    }

    public void askYesNoS(final String s) {
        this.askYesNoS(s, NPCParamType.NORMAL, true);
    }

    public void askYesNoS(final String s, final boolean b) {
        this.askYesNoS(s, NPCParamType.NORMAL, b);
    }

    public void askYesNoE(final String s) {
        this.askYesNoE(s, 0, NPCParamType.NORMAL, false);
    }

    public void askYesNoE(final String s, final int n) {
        this.askYesNoE(s, n, NPCParamType.NORMAL, n < 0);
    }

    public void askMenu(final String s) {
        this.askMenu(s, 0, NPCParamType.NORMAL, true);
    }

    public void askMenu(final String s, final int n) {
        this.askMenu(s, n, NPCParamType.NORMAL, false);
    }

    public void askMenu(final String s, final boolean b) {
        this.askMenu(s, this.npcID, NPCParamType.NORMAL, b);
    }

    public void askMenuNoESC(final String s) {
        this.askMenu(s, this.npcID, NPCParamType.NO_ESC, true);
    }

    public void askMenuNoESC(final String s, final boolean b) {
        this.askMenu(s, this.npcID, NPCParamType.NO_ESC, b);
    }

    public void askMenuNoESC(final String s, final int n) {
        this.askMenu(s, n, NPCParamType.NO_ESC, false);
    }

    public void askMenuS(final String s) {
        this.askMenuS(s, NPCParamType.NORMAL, true);
    }

    public void askMenuE(final String s) {
        this.askMenuE(s, false);
    }

    public void askMenuE(final String s, final boolean b) {
        this.askMenuE(s, 0, NPCParamType.NORMAL, b);
    }

    public void askMenuA(final String s) {
        this.askMenuA(s, false);
    }

    public void askMenuA(final String s, final boolean b) {
        this.askMenuA(s, 0, NPCParamType.NORMAL, b);
    }

    public void askMenuA(final String msg, final int diffnpc) {
        this.askMenuA(msg, diffnpc, NPCParamType.NORMAL, false);
    }

    public void askAccept(final String s) {
        this.askAccept(s, 0, NPCParamType.NORMAL, true);
    }

    public void askAccept(String msg, int diffNpcID) {
        this.askAccept(msg, diffNpcID, NPCParamType.NORMAL, true);
    }

    public void askAccept(final String s, final boolean bLeft) {
        this.askAccept(s, this.npcID, NPCParamType.NORMAL, bLeft);
    }

    public void askAcceptNoESC(final String s) {
        this.askAccept(s, this.npcID, NPCParamType.NO_ESC, true);
    }

    public void askAcceptNoESC(final String s, final boolean b) {
        this.askAccept(s, this.npcID, NPCParamType.NO_ESC, b);
    }

    public void askAcceptS(final String s) {
        this.askAcceptS(s, NPCParamType.NORMAL, true);
    }

    public void askAcceptE(final String s) {
        this.askAcceptE(s, 0, NPCParamType.NORMAL, false);
    }

    public void askText(final String s, final short n, final short n2) {
        askText(s, "", n, n2);
    }

    public void askText(final String s, final String def, final short n, final short n2) {
        this.askText(s, this.npcID, NPCParamType.NORMAL, n, n2, true, def);
    }

    public void askTextNoESC(final String s, final short n, final short n2) {
        askTextNoESC(s, "", n, n2);
    }

    public void askTextNoESC(final String s, final String def, final short n, final short n2) {
        this.askText(s, this.npcID, NPCParamType.NO_ESC, n, n2, true, def);
    }

    public void askTextS(final String s, final short n, final short n2) {
        askTextS(s, "", n, n2);
    }

    public void askTextS(final String s, final String def, final short n, final short n2) {
        this.askTextS(s, n, n2, true, def);
    }

    public void askTextE(final String s, final short n, final short n2) {
        askTextE(s, "", n, n2);
    }

    public void askTextE(final String s, final String def, final short n, final short n2) {
        this.askTextE(s, n, n2, false, def);
    }

    public void askNumber(final String s, final int n, final int n2, final int n3) {
        this.askNumber(s, 0, n, n2, n3, true);
    }

    public void askNumberKeypad(final int n) {
        this.askNumberKeypad((byte)4, this.npcID, 0, NPCParamType.NORMAL.getType(), n);
    }

    public void askUserSurvey(final int n, final String s) {
        this.askUserSurvey((byte)4, this.npcID, 0, NPCParamType.NORMAL.getType(), n, s);
    }

    public void askNumberS(final String s, final int n, final int n2, final int n3) {
        this.askNumberS(s, n, n2, n3, true);
    }

    public void askNumberE(final String s, final int n, final int n2, final int n3) {
        this.askNumberE(s, n, n2, n3, false);
    }

    public void askBoxText(final String s, final String s2, final short n, final short n2) {
        this.askBoxText(s, s2, 0, n, n2, true);
    }

    public void askBoxTextS(final String s, final String s2, final short n, final short n2) {
        this.askBoxTextS(s, s2, n, n2, true);
    }

    public void askBoxTextE(final String s, final String s2, final short n, final short n2) {
        this.askBoxTextE(s, s2, n, n2, false);
    }

    public void askSlideMenu(final int n, final String s) {
        final String[] split;
        if ((split = s.split("#")).length < 3) {
            return;
        }
        this.askSlideMenu((byte)4, this.npcID, n, Integer.valueOf(split[split.length - 2]), s);
    }

    public void askAvatar(final String message, final int[] array, final int needItem, final boolean isangel, final boolean isbeta) {
        this.askAvatar((byte)4, this.npcID, needItem, isangel, isbeta, array, message);
    }

    public void askAndroid(final String s, final int[] array, final int n) {
        this.askAndroid((byte)4, this.npcID, n, array, s);
    }

    public void askPetRevive(final String s) {
        final ArrayList<Item> list = new ArrayList<>();
        for (Item pet : this.getAllPetItem()) {
            if (pet.getExpiration() > 0L && pet.getExpiration() < System.currentTimeMillis()) {
                list.add(pet);
            }
        }
        if (list.isEmpty()) {
            this.sendOk("你沒有失去魔法的寵物.");
            return;
        }
        this.askPet(s, list);
    }

    public void askPet(final String s, final List<Item> list) {
        this.askPet((byte)4, this.npcID, list, s);
    }

    public void askSelectMenu(final int n) {
        this.askSelectMenu((byte)3, n, 1, null);
    }

    public void askSelectMenu(final int n, final int n2, final String[] array) {
        this.askSelectMenu((byte)4, n, n2, array);
    }

    public void askWeaponBox(final int n, final String s, final List<Integer> list) {
        this.askWeaponBox((byte)4, this.npcID, n, list, s);
    }

    public void askPetEvolution(final String s, final List<Item> list) {
        this.askPetEvolution((byte)4, this.npcID, list, s);
    }

    public void askPetAll(final String s) {
        this.askPetAll(s, this.getAllPetItem());
    }

    public void askPetAll(final String s, final List<Item> list) {
        this.askPetAll((byte)4, this.npcID, list, s);
    }

    public void sayImage(final String[] array) {
        this.sayImage((byte)8, 0, 0, (short)0, array);
    }

    public void askQuiz(final boolean b, final int n, final int n2, final String s, final String s2, final String s3) {
        this.askQuiz((byte)0, this.npcID, 0, 0, b, n, n2, s, s2, s3);
    }

    public void askSpeedQuiz(final boolean b, final int n, final int n2, final int n3, final int n4, final int n5) {
        this.askSpeedQuiz((byte)0, this.npcID, 0, 0, b, n, n2, n3, n4, n5);
    }

    public void askICQuiz(final boolean b, final String s, final String s2, final int n) {
        this.askICQuiz((byte)0, this.npcID, 0, 0, b, s, s2, n);
    }

    public void askOlympicQuiz(final boolean b, final int n, final int n2, final int n3, final int n4, final int n5) {
        this.askOlympicQuiz((byte)0, this.npcID, 0, 0, b, n, n2, n3, n4, n5);
    }

    public void sendGetText(String text, String def, int col, int line) {
        askText((byte) 4, npcID, npcID, NPCParamType.ANOTHER_NPC.getType(), (short) col, (short) line, text, def);
    }

    public void sendOkIllu(final String s, final int n, final int n2, final boolean b) {
        this.sendOkIllu(s, n, NPCParamType.NORMAL, true, n, n2, b);
    }

    public void sendOkIlluNoESC(final String s, final int n, final int n2, final boolean b) {
        this.sendOkIllu(s, n, NPCParamType.NO_ESC, true, n, n2, b);
    }

    public void sendNextIllu(final String s, final int n, final int n2, final boolean b) {
        this.sendNextIllu(s, n, NPCParamType.NORMAL, true, n, n2, b);
    }

    public void sendNextIlluNoESC(final String s, final int n, final int n2, final boolean b) {
        this.sendNextIllu(s, n, NPCParamType.NO_ESC, true, n, n2, b);
    }

    public void sendPrevIllu(final String s, final int n, final int n2, final boolean b) {
        this.sendPrevIllu(s, n, NPCParamType.NORMAL, true, n, n2, b);
    }

    public void sendPrevIlluNoESC(final String s, final int n, final int n2, final boolean b) {
        this.sendPrevIllu(s, n, NPCParamType.NO_ESC, true, n, n2, b);
    }

    public void sendNextPrevIllu(final String s, final int n, final int n2, final boolean b) {
        this.sendNextPrevIllu(s, n, NPCParamType.NORMAL, true, n, n2, b);
    }

    public void sendNextPrevIlluNoESC(final String s, final int n, final int n2, final boolean b) {
        this.sendNextPrevIllu(s, n, NPCParamType.NO_ESC, true, n, n2, b);
    }

    //-----------------------------------------------
    // private npc talk impl start
    //-----------------------------------------------

    private void sendSay(final byte type, final int npcId, final int n3, final int u2, final boolean bPrev, final boolean bNext, final String sText, final int n5) {
        this.lastSMType = ScriptMessageType.SAY.getType();
        getClient().announce(NPCPacket.OnSay(type, npcId, false, 0, n3, (short)u2, bPrev, bNext, sText, n5));
    }

    private void sendOk(final String s, final int n, final NPCParamType j906, final boolean bLeft) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, bLeft);
            return;
        }
        this.sendSay((byte)4, npcID, n, (bLeft ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), false, false, s, 0);
    }

    private void sendOkS(final String s, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuS(s, j906, b);
            return;
        }
        this.sendSay((byte)3, npcID, 0, (b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType()) | j906.getType(), false, false, s, 0);
    }

    private void sendOkE(final String msg, final int npcId, final NPCParamType j906, final boolean b, final int n2) {
        if (msg.contains("#L")) {
            this.askMenuE(msg, npcId, j906, b);
            return;
        }
        this.sendSay((byte)(b ? 3 : 4), npcID, npcId, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.NPC_ENV.getType() | j906.getType(), false, false, msg, n2);
    }

    private void sendNext(final String s, final int n, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.sendSay((byte)4, npcID, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), false, true, s, 0);
    }

    private void sendNextS(final String s, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuS(s, j906, b);
            return;
        }
        this.sendSay((byte)3, npcID, 0, (b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType()) | j906.getType(), false, true, s, 0);
    }

    private void sendNextE(final String s, final int n, final NPCParamType j906, final boolean b, final int n2) {
        if (s.contains("#L")) {
            this.askMenuE(s, n, j906, b);
            return;
        }
        this.sendSay((byte)(b ? 3 : 4), npcID, n, (b ? NPCParamType.PLAYER_RSIDE.getType() : ((n > 0) ? NPCParamType.ANOTHER_NPC.getType() : NPCParamType.NORMAL.getType())) | NPCParamType.NPC_ENV.getType() | j906.getType(), false, true, s, n2);
    }

    private void sendPrev(final String s, final int n, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.sendSay((byte)4, npcID, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), true, false, s, 0);
    }

    private void sendPrevS(final String s, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuS(s, j906, b);
            return;
        }
        this.sendSay((byte)3, npcID, 0, (b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType()) | j906.getType(), true, false, s, 0);
    }

    private void sendPrevE(final String s, final int n, final NPCParamType j906, final boolean b, final int n2) {
        if (s.contains("#L")) {
            this.askMenuE(s, n, j906, b);
            return;
        }
        this.sendSay((byte)(b ? 3 : 4), npcID, n, (b ? NPCParamType.PLAYER_RSIDE.getType() : ((n > 0) ? NPCParamType.ANOTHER_NPC.getType() : NPCParamType.NORMAL.getType())) | NPCParamType.NPC_ENV.getType() | j906.getType(), true, false, s, n2);
    }

    private void sendNextPrev(final String s, final int n, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.sendSay((byte)4, npcID, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), true, true, s, 0);
    }

    private void sendNextPrevS(final String s, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuS(s, j906, b);
            return;
        }
        this.sendSay((byte)3, npcID, 0, (b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType()) | j906.getType(), true, true, s, 0);
    }

    private void sendNextPrevE(final String s, final int n, final NPCParamType j906, final boolean b, final int n2) {
        if (s.contains("#L")) {
            this.askMenuE(s, n, j906, b);
            return;
        }
        this.sendSay((byte)(b ? 3 : 4), npcID, n, (b ? NPCParamType.PLAYER_RSIDE.getType() : ((n > 0) ? NPCParamType.ANOTHER_NPC.getType() : NPCParamType.NORMAL.getType())) | NPCParamType.NPC_ENV.getType() | j906.getType(), true, true, s, n2);
    }

    private void askYesNo(final byte b, final int n, final int n2, final int n3, final String s) {
        this.lastSMType = ScriptMessageType.ASK_YES_NO.getType();
        getClient().announce(NPCPacket.OnAskYesNo(b, n, n2, (short)n3, s));
    }

    private void askYesNo(final String s, final int n, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.askYesNo((byte)4, npcID, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), s);
    }

    public void sendYesNo(String text) {
        sendYesNo(text, npcID);
    }

    public void sendYesNo(String text, int idd) {
        askYesNo(text, idd);
    }

    public void sendChangeOk(String text) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(npcID, ScriptMessageType.ASK_YES_NO.getType(), text, "", (byte) 0x00, (byte) 0x01, (byte) 0x00, 0, false));
    }

    public void sendYesNoS(String text, byte type) {
        sendYesNoS(text, type, npcID);
    }

    public void sendYesNoS(String text, byte type, int idd) {
        if (text.contains("#L")) {
            sendSimpleS(text, type);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(npcID, ScriptMessageType.ASK_YES_NO.getType(), text, "", type, idd));
    }

    public void sendYesNoN(String text) {
        this.sendYesNoN(text, this.npcID);
    }

    public void sendYesNoN(String text, int idd) {
        if (text.contains("#L")) {
            this.sendSimpleN(text);
            return;
        }
        getClient().announce(NPCPacket.getNPCTalk(npcID, ScriptMessageType.ASK_YES_NO.getType(), text, "", (byte) 0x24, (byte) 1, idd, false));
    }

    private void askYesNoS(final String s, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuS(s, j906, b);
            return;
        }
        this.askYesNo((byte)3, npcID, 0, (b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType()) | j906.getType(), s);
    }

    private void askYesNoE(final String s, final int n, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuE(s, n, j906, b);
            return;
        }
        this.askYesNo((byte)(b ? 3 : 4), npcID, n, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.NPC_ENV.getType() | j906.getType(), s);
    }

    private void askMenu(final byte b, final int n, final int diffnpc, final int n3, final String s) {
        this.lastSMType = ScriptMessageType.ASK_MENU.getType();
        getClient().announce(NPCPacket.OnAskMenu(b, n, diffnpc, (short)n3, s));
    }

    private void askMenu(final String s, final int n, final NPCParamType j906, final boolean b) {
        if (!s.contains("#L")) {
            this.sendNext(s, n, j906, b);
            return;
        }
        this.askMenu((byte)4, npcID, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), s);
    }

    private void askMenuS(final String s, final NPCParamType j906, final boolean b) {
        if (!s.contains("#L")) {
            this.sendNextS(s, j906, b);
            return;
        }
        this.askMenu((byte)3, npcID, 0, (b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType()) | j906.getType(), s);
    }

    private void askMenuE(final String s, final int n, final NPCParamType j906, final boolean b) {
        if (!s.contains("#L")) {
            this.sendNextE(s, n, j906, b, 0);
            return;
        }
        this.askMenu((byte)(b ? 3 : 4), npcID, n, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.NPC_ENV.getType() | j906.getType(), s);
    }

    private void askMenuA(final String s, final int diffnpc, final NPCParamType j906, final boolean b) {
        if (!s.contains("#L")) {
            this.sendNextE(s, diffnpc, j906, b, 0);
            return;
        }
        this.askMenu((byte)(b ? 3 : 4), npcID, diffnpc, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.SHOW_ALL.getType() | j906.getType(), s);
    }

    private void askAccept(final byte b, final int n, final int diffnpc, final int n3, final String s) {
        this.lastSMType = ScriptMessageType.ASK_ACCEPT.getType();
        getClient().announce(NPCPacket.OnAskAccept(b, n, diffnpc, (short)n3, s));
    }

    private void askAccept(final String s, final int diffnpc, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenu(s, diffnpc, j906, b);
            return;
        }
        this.askAccept((byte)4, npcID, diffnpc, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), s);
    }

    private void askAcceptS(final String s, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuS(s, j906, b);
            return;
        }
        this.askAccept((byte)3, npcID, 0, (b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType()) | j906.getType(), s);
    }

    private void askAcceptE(final String s, final int diffnpc, final NPCParamType j906, final boolean b) {
        if (s.contains("#L")) {
            this.askMenuE(s, diffnpc, j906, b);
            return;
        }
        this.askAccept((byte)(b ? 3 : 4), npcID, diffnpc, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.NPC_ENV.getType() | j906.getType(), s);
    }

    private void askText(final byte b, final int n, final int n2, final int n3, final short nLenMin, final short nLenMax, final String sMsg, final String sMsgDefault) {
        this.lastSMType = ScriptMessageType.ASK_TEXT.getType();
        getClient().announce(NPCPacket.OnAskText(b, n, n2, (short)n3, nLenMin, nLenMax, sMsg, sMsgDefault));
    }

    private void askText(final String sMsg, final int n, final NPCParamType j906, final short nLenMin, final short nLenMax, final boolean bLeft, final String sMsgDefault) {
        this.askText((byte)4, npcID, n, (bLeft ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), nLenMin, nLenMax, sMsg, sMsgDefault);
    }

    private void askTextS(final String s, final short n, final short n2, final boolean b, final String sMsgDefault) {
        this.askText((byte)3, npcID, 0, b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType(), n, n2, s, sMsgDefault);
    }

    private void askTextE(final String s, final short n, final short n2, final boolean b, final String sMsgDefault) {
        this.askText((byte)4, npcID, 0, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.NPC_ENV.getType(), n, n2, s, sMsgDefault);
    }

    private void askNumber(final byte b, final int n, final int n2, final int n3, final int n4, final int n5, final int n6, final String s) {
        this.lastSMType = ScriptMessageType.ASK_NUMBER.getType();
        getClient().announce(NPCPacket.OnAskNumber(b, n, (short)n3, n4, n5, n6, s));
    }

    private void askNumber(final String s, final int n, final int n2, final int n3, final int n4, final boolean b) {
        this.askNumber((byte)4, npcID, n, b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType(), n2, n3, n4, s);
    }

    private void askNumberS(final String s, final int n, final int n2, final int n3, final boolean b) {
        this.askNumber((byte)3, npcID, 0, b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType(), n, n2, n3, s);
    }

    private void askNumberE(final String s, final int n, final int n2, final int n3, final boolean b) {
        this.askNumber((byte)4, npcID, 0, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.NPC_ENV.getType(), n, n2, n3, s);
    }

    private void askBoxText(final byte b, final int n, final int n2, final int n3, final short n4, final short n5, final String s, final String s2) {
        this.lastSMType = ScriptMessageType.ASK_BOX_TEXT.getType();
        getClient().announce(NPCPacket.OnAskBoxText(b, n, n2, (short)n3, n4, n5, s, s2));
    }

    private void askBoxText(final String s, final String s2, final int n, final short n2, final short n3, final boolean b) {
        this.askBoxText((byte)4, npcID, n, b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType(), n2, n3, s, s2);
    }

    private void askBoxTextS(final String s, final String s2, final short n, final short n2, final boolean b) {
        this.askBoxText((byte)3, npcID, 0, b ? NPCParamType.PLAYER_FACE_RIGHT.getType() : NPCParamType.PLAYER_RSIDE.getType(), n, n2, s, s2);
    }

    private void askBoxTextE(final String s, final String s2, final short n, final short n2, final boolean b) {
        this.askBoxText((byte)4, npcID, 0, (b ? NPCParamType.PLAYER_RSIDE.getType() : NPCParamType.NORMAL.getType()) | NPCParamType.NPC_ENV.getType(), n, n2, s, s2);
    }

    private void askSlideMenu(final byte b, final int n, final int n2, final int n3, final String s) {
        this.lastSMType = ScriptMessageType.ASK_SLIDE_MENU.getType();
        getClient().announce(NPCPacket.OnAskSlideMenu(b, n, n2, n3, s));
    }

    private void askAvatar(final byte b, final int n, final int n2, final boolean b2, final boolean b3, final int[] array, final String s) {
        this.lastSMType = ScriptMessageType.ASK_AVATAR_EX.getType();
        getClient().announce(NPCPacket.OnAskAvatar(b, n, n2, b2, b3, array, s));
    }

    public void askAvatarZero(int cardID, final int[] array, int[] array2, final String s) {
        askAvatarZero((byte) 4, npcID, cardID, array, array2, s);
    }

    public void askAvatarZero(final byte nSpeakerTypeID, final int nSpeakerTemplateID, int cardID, final int[] array, int[] array2, final String s) {
        this.lastSMType = ScriptMessageType.ASK_AVATAR_EX_ZERO.getType();
        int nMixValue = getPlayer().getHairBaseColor();
        nMixValue = (byte) Math.min(Math.max(nMixValue, -1), 9);
        String sMixValue = String.valueOf(nMixValue);
        nMixValue = getPlayer().getHairMixedColor();
        nMixValue = (byte) Math.min(Math.max(nMixValue, 0), 9);
        sMixValue += String.valueOf(nMixValue);
        nMixValue = getPlayer().getHairProbColor();
        nMixValue = (byte) Math.min(Math.max(nMixValue, 0), 99);
        sMixValue += StringUtil.getLeftPaddedStr(String.valueOf(nMixValue), '0', 2);
        nMixValue = Integer.valueOf(sMixValue);

        int nMix2ndValue = getPlayer().getSecondHairBaseColor();
        nMix2ndValue = (byte) Math.min(Math.max(nMix2ndValue, -1), 9);
        String sMix2ndValue = String.valueOf(nMix2ndValue);
        nMix2ndValue = getPlayer().getSecondHairMixedColor();
        nMix2ndValue = (byte) Math.min(Math.max(nMix2ndValue, 0), 9);
        sMix2ndValue += String.valueOf(nMix2ndValue);
        nMix2ndValue = getPlayer().getSecondHairProbColor();
        nMix2ndValue = (byte) Math.min(Math.max(nMix2ndValue, 0), 99);
        sMix2ndValue += StringUtil.getLeftPaddedStr(String.valueOf(nMix2ndValue), '0', 2);
        nMix2ndValue = Integer.valueOf(sMix2ndValue);
        getClient().announce(NPCPacket.OnAskZeroAvatar(nSpeakerTypeID, nSpeakerTemplateID, getPlayer().getHair(), getPlayer().getSecondHair(), nMixValue, nMix2ndValue, cardID, array, array2, s));
    }

    public void askAndroid(final int cardID, final int[] array, final String s) {
        askAndroid((byte) 4, npcID, cardID, array, s);
    }

    public void askAndroid(final byte nSpeakerTypeID, final int nSpeakerTemplateID, final int cardID, final int[] array, final String s) {
        this.lastSMType = ScriptMessageType.ASK_ANDROID.getType();
        getClient().announce(NPCPacket.OnAskAndroid(nSpeakerTypeID, nSpeakerTemplateID, cardID, array, s));
    }

    private void askPet(final byte b, final int n, final List<Item> list, final String s) {
        this.lastSMType = ScriptMessageType.ASK_PET.getType();
        getClient().announce(NPCPacket.OnAskPet(b, n, list, s));
    }

    private void askSelectMenu(final byte b, final int n, final int n2, final String[] array) {
        this.lastSMType = ScriptMessageType.ASK_SELECT_MENU.getType();
        getClient().announce(NPCPacket.OnAskSelectMenu(b, n, n2, array));
    }

    private void askWeaponBox(final byte b, final int n, final int n2, final List<Integer> list, final String s) {
        this.lastSMType = ScriptMessageType.ASK_WEAPON_BOX.getType();
        getClient().announce(NPCPacket.OnAskWeaponBox(b, n, n2, list, s));
    }

    private void askPetEvolution(final byte b, final int n, final List<Item> list, final String s) {
        this.lastSMType = ScriptMessageType.ASK_ACTION_PET_EVOLUTION.getType();
        getClient().announce(NPCPacket.OnAskPetEvolution(b, n, list, s));
    }

    private void askPetAll(final byte b, final int n, final List<Item> list, final String s) {
        this.lastSMType = ScriptMessageType.ASK_PET_ALL.getType();
        getClient().announce(NPCPacket.OnAskPetAll(b, n, list, s));
    }

    private void sayImage(final byte b, final int n, final int n2, final short n3, final String[] array) {
        this.lastSMType = ScriptMessageType.SAY_IMAGE.getType();
        getClient().announce(NPCPacket.OnSayImage(b, n, n3, array));
    }

    private void sendSayIllu(final byte b, final int n, final int n2, final int n3, final boolean b2, final boolean b3, final String s, final int n4, final int n5, final boolean b4) {
        this.lastSMType = ScriptMessageType.SAY_ILLUSTRATION.getType();
        getClient().announce(NPCPacket.OnSayIllu(b, n, false, 0, n2, (short)n3, b2, b3, s, n4, n5, b4));
    }

    private void sendOkIllu(final String s, final int n, final NPCParamType j906, final boolean b, final int n2, final int n3, final boolean b2) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.sendSayIllu((byte)4, n, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), false, false, s, n2, n3, b2);
    }

    private void sendNextIllu(final String s, final int n, final NPCParamType j906, final boolean b, final int n2, final int n3, final boolean b2) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.sendSayIllu((byte)4, n, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), false, true, s, n2, n3, b2);
    }

    private void sendPrevIllu(final String s, final int n, final NPCParamType j906, final boolean b, final int n2, final int n3, final boolean b2) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.sendSayIllu((byte)4, n, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), true, false, s, n2, n3, b2);
    }

    private void sendNextPrevIllu(final String s, final int n, final NPCParamType j906, final boolean b, final int n2, final int n3, final boolean b2) {
        if (s.contains("#L")) {
            this.askMenu(s, n, j906, b);
            return;
        }
        this.sendSayIllu((byte)4, n, n, (b ? NPCParamType.NORMAL.getType() : NPCParamType.ANOTHER_NPC.getType()) | j906.getType(), true, true, s, n2, n3, b2);
    }

    private void askQuiz(final byte b, final int n, final int n2, final int n3, final boolean b2, final int n4, final int n5, final String s, final String s2, final String s3) {
        this.lastSMType = ScriptMessageType.ASK_QUIZ.getType();
        getClient().announce(NPCPacket.OnAskQuiz(b, n, (short)n3, b2, n4, n5, s, s2, s3));
    }

    private void askSpeedQuiz(final byte b, final int n, final int n2, final int n3, final boolean b2, final int n4, final int n5, final int n6, final int n7, final int n8) {
        this.lastSMType = ScriptMessageType.ASK_SPEED_QUIZ.getType();
        getClient().announce(NPCPacket.OnAskSpeedQuiz(b, n, (short)n3, b2, n4, n5, n6, n7, n8));
    }

    private void askICQuiz(final byte b, final int n, final int n2, final int n3, final boolean b2, final String s, final String s2, final int n4) {
        this.lastSMType = ScriptMessageType.ASK_ICQUIZ.getType();
        getClient().announce(NPCPacket.OnAskICQuiz(b, n, (short)n3, b2, s, s2, n4));
    }
    private void askOlympicQuiz(final byte b, final int n, final int n2, final int n3, final boolean b2, final int nType, final int nQuestion, final int nCorrect, final int nRemain, final int tRemainInitialQuiz) {
        this.lastSMType = ScriptMessageType.ASK_OLYMPIC_QUIZ.getType();
        getClient().announce(NPCPacket.OnAskOlympicQuiz(b, n, (short)n3, b2, nType, nQuestion, nCorrect, nRemain, tRemainInitialQuiz));
    }
    private void askNumberKeypad(final byte b, final int n, final int n2, final int n3, final int n4) {
        this.lastSMType = ScriptMessageType.ASK_NUMBER_KEYPAD.getType();
        getClient().announce(NPCPacket.OnAskNumberKeypad(n, (short)n3, n4));
    }

    private void askUserSurvey(final byte b, final int n, final int n2, final int n3, final int n4, final String s) {
        this.lastSMType = ScriptMessageType.ASK_USER_SURVEY.getType();
        getClient().announce(NPCPacket.OnAskUserSurvey(n, (short)n3, n4, s));
    }

    //-----------------------------------------------
    // private npc talk impl end
    //-----------------------------------------------

    @Override
    public void playMovie(String s, final boolean b) {
        this.lastSMType = ScriptMessageType.PLAY_MOVIE_CLIP.getType();
        getClient().announce(UIPacket.playMovie(s, b));
    }

    public void setForcedAction(int n, int n2) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setForcedAction(n, n2);
    }

    @Override
    public void setDelay(int n) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setDelay(n);
    }

    public void setEffectPlay(String s, int n, int n2, int n3, final boolean b, int n4, final boolean b2, int n5, final boolean b3, int n6, String s2) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        setEffectPlay(s, n, n2, n3, b ? 1 : 0, n4, b2 ? 1 : 0, n5, b3 ? 1 : 0, n6, s2);
    }

    public void setForcedInput(int n) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setForcedInput(n);
    }

    public void setPatternInputRequest(String s, int n, int n2, int n3) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setPatternInputRequest(s, n, n2, n3);
    }

    public void setCameraMove(final boolean b, int n, int n2, int n3) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        setCameraMove(b ? 1 : 0, n, n2, n3);
    }

    public void setCameraOnCharacter(int n) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setCameraOnCharacter(n);
    }

    public void setCameraZoom(int n, int n2, int n3, int n4, int n5) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setCameraZoom(n, n2, n3, n4, n5);
    }

    public void setCameraZoom() {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setCameraZoom();
    }

    public void setCameraReleaseFromUserPoint() {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setCameraReleaseFromUserPoint();
    }

    public void setVansheeMode(final boolean b) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        setVansheeMode(b ? 1 : 0);
    }

    public void setFaceOff(int n) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setFaceOff(n);
    }

    public void setMonologue(String s, final boolean b) {
        this.lastSMType = ScriptMessageType.MONOLOGUE.getType();
        super.setMonologue(s, b);
    }

    public void setMonologueScroll(String s, final boolean b, int n, int n2, int n3) {
        this.lastSMType = ScriptMessageType.MONOLOGUE.getType();
        super.setMonologueScroll(s, b, n, n2, n3);
    }

    public void setAvatarLookSet(int[] list) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setAvatarLookSet(list);
    }

    public void removeAdditionalEffect() {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.removeAdditionalEffect();
    }

    public void setForcedMove(int n, int n2) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setForcedMove(n, n2);
    }

    public void setForcedFlip(int n) {
        this.lastSMType = ScriptMessageType.ASK_IN_GAME_DIRECTION.getType();
        super.setForcedFlip(n);
    }

    public void setInputUI(int n) {
        this.lastSMType = ScriptMessageType.INPUT_UI.getType();
        super.setInputUI(n);
    }

    public boolean canChangeSkin(int id) {
        return getItemInfo().isSkinExist(id);
    }

    public boolean canChangeHair(int id) {
        return getItemInfo().isHairExist(id);
    }

    public boolean canChangeFace(int id) {
        return getItemInfo().isFaceExist(id);
    }

    public void setHair(int hair) {
        if (!canChangeHair(hair)) {
            playerMessage(1, "該髮型不存在，無法更換。\r\nID：" + hair);
            return;
        }
        getPlayer().setHair(hair);
        getPlayer().updateSingleStat(MapleStat.髮型, hair);
        getPlayer().equipChanged();
    }

    public void setFace(int face) {
        if (!canChangeFace(face)) {
            playerMessage(1, "該臉型不存在，無法更換。\r\nID：" + face);
            return;
        }
        getPlayer().setFace(face);
        getPlayer().updateSingleStat(MapleStat.臉型, face);
        getPlayer().equipChanged();
    }

    public void setSkin(int color) {
        if (!canChangeSkin(color)) {
            playerMessage(1, "該皮膚不存在，無法更換。\r\nID：" + color);
            return;
        }
        getPlayer().setSkinColor((byte) color);
        getPlayer().updateSingleStat(MapleStat.皮膚, color);
        getPlayer().equipChanged();
    }

    public int[] getCanHair(int[] hairs) {
        List<Integer> canHair = new ArrayList<>();
        List<Integer> cantHair = new ArrayList<>();
        for (int hair : hairs) {
            if (canChangeHair(hair)) {
                canHair.add(hair);
            } else {
                cantHair.add(hair);
            }
        }
        if (cantHair.size() > 0 && getPlayer().isAdmin()) {
            StringBuilder sb = new StringBuilder("正在讀取的髮型中有");
            sb.append(cantHair.size()).append("個髮型客戶端不支援，已被系統清除：");
            for (int i = 0; i < cantHair.size(); i++) {
                sb.append(cantHair.get(i));
                if (i < cantHair.size() - 1) {
                    sb.append(",");
                }
            }
            playerMessage(sb.toString());
        }
        int[] getHair = new int[canHair.size()];
        for (int i = 0; i < canHair.size(); i++) {
            getHair[i] = canHair.get(i);
        }
        return getHair;
    }

    public int[] getCanFace(int[] faces) {
        List<Integer> canFace = new ArrayList<>();
        List<Integer> cantFace = new ArrayList<>();
        for (int face : faces) {
            if (canChangeFace(face)) {
                canFace.add(face);
            } else {
                cantFace.add(face);
            }
        }
        if (cantFace.size() > 0 && getPlayer().isAdmin()) {
            StringBuilder sb = new StringBuilder("正在讀取的臉型中有");
            sb.append(cantFace.size()).append("個臉型客戶端不支援，已被系統清除：");
            for (int i = 0; i < cantFace.size(); i++) {
                sb.append(cantFace.get(i));
                if (i < cantFace.size() - 1) {
                    sb.append(",");
                }
            }
            playerMessage(sb.toString());
        }
        int[] getFace = new int[canFace.size()];
        for (int i = 0; i < canFace.size(); i++) {
            getFace[i] = canFace.get(i);
        }
        return getFace;
    }

    public void setAndroidHair(int hair) {
        getPlayer().getAndroid().setHair(hair);
        getPlayer().getAndroid().saveToDb();
        getPlayer().setAndroid(getPlayer().getAndroid());
    }

    public void setAndroidFace(int face) {
        getPlayer().getAndroid().setFace(face);
        getPlayer().getAndroid().saveToDb();
        getPlayer().setAndroid(getPlayer().getAndroid());
    }

    public void setAndroidSkin(int skin) {
        getPlayer().getAndroid().setSkin(skin);
        getPlayer().getAndroid().saveToDb();
        getPlayer().setAndroid(getPlayer().getAndroid());
    }

    public int setRandomAvatarA(int ticket, int... args_all) {
        if (!haveItem(ticket)) {
            return -1;
        }
        gainItem(ticket, -1);
        int args = args_all[Randomizer.nextInt(args_all.length)];
        if (args < 100) {
            while (!canChangeSkin(args)) {
                args = args_all[Randomizer.nextInt(args_all.length)];
            }
            getPlayer().getAndroid().setSkin(args);
        } else if (args < 30000) {
            while (!canChangeFace(args)) {
                args = args_all[Randomizer.nextInt(args_all.length)];
            }
            getPlayer().getAndroid().setFace(args);
        } else {
            while (!canChangeHair(args)) {
                args = args_all[Randomizer.nextInt(args_all.length)];
            }
            getPlayer().getAndroid().setHair(args);
        }
        getPlayer().getAndroid().saveToDb();
        getPlayer().setAndroid(getPlayer().getAndroid());
        return 1;
    }

    public int setAvatarA(int ticket, int styleID) {
        if (!haveItem(ticket)) {
            return -1;
        }
        gainItem(ticket, -1);
        return setAvatarA(styleID);
    }

    public int setAvatarA(int styleID) {
        return getPlayer().changeAndroidBeauty(styleID) ? styleID : -1;
    }

    public int setRandomAvatar(int ticket, int... args_all) {
        return setRandomAvatar(ticket, args_all, false);
    }

    public int setRandomAvatar(int ticket, int[] args_all, boolean isSecond) {
        if (!haveItem(ticket)) {
            return -1;
        }
        int args = args_all[Randomizer.nextInt(args_all.length)];
        int styleID = setAvatar(args, isSecond);
        if (styleID == -1) {
            return -1;
        }
        gainItem(ticket, -1);
        return 1;
    }

    public int setAvatar(int ticket, int args) {
        return setAvatar(ticket, args, false);
    }	
	
    public int setAvatar(int ticket, int args, boolean isSecond) {
        if (!haveItem(ticket)) {
            return -1;
        }
        int styleID = setAvatar(args, isSecond);
        if (styleID == -1) {
            return -1;
        }
        gainItem(ticket, -1);
        return 1;
    }

	public int setAvatar(int styleID, boolean isSecond) {
        return getPlayer().changeBeauty(styleID, isSecond) ? styleID : -1;
    }

    public void sendArcaneQuickPath() {
        getClient().announce(MaplePacketCreator.ArcaneRiverQuickPath());
    }

    public void sendStorage() {
        getPlayer().setConversation(ConversationType.ON_TRUNK);
        getPlayer().getTrunk().secondPwdRequest(getClient(), npcID);
    }

    public void openShop(int id) {
        openShop(id, true);
    }

    public void openShop(int id, boolean fromScript) {
        MapleShopFactory.getInstance().getShop(id).sendShop(getClient(), fromScript);
    }

    public void openShopNPC(int id) {
        openShopNPC(id, true);
    }

    public void openShopNPC(int id, boolean fromScript) {
        MapleShopFactory.getInstance().getShop(id).sendShop(getClient(), this.npcID, fromScript);
    }

    public RaffleItem gachaponItem(int type) {
        return gachaponItem(type, -1);
    }

    public RaffleItem gachaponItem(int type, int nGender) {
        return RafflePool.randomItem(type, nGender);
    }

    public List<RaffleItem> gachaponItems(int type) {
        return gachaponItems(type, -1);
    }

    public List<RaffleItem> gachaponItems(int type, int nGender) {
        List<RaffleItem> itemList = RafflePool.getItems(type);
        List<RaffleItem> ret = new LinkedList<>();
        for (RaffleItem item : itemList) {
            if (ItemConstants.類型.getGender(item.getItemId()) == nGender || ItemConstants.類型.getGender(item.getItemId()) >= 2 || nGender < 0) {
                ret.add(item);
            }
        }
        return ret;
    }

    public void dropGachaponMsg(int gachaponId, int itemId) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.gachaponMsg("恭喜" + getPlayer().getName() + "從" + ii.getName(gachaponId) + "獲得[" + ii.getName(itemId) + "]", new Item(gachaponId, (short) 0, (short) 0)));
    }

    /*
     * 隨機抽獎
     * 參數 道具的ID
     * 參數 道具的數量
     */
    public int gainGachaponItem(int id, int quantity) {
        return gainGachaponItem(id, quantity, getPlayer().getMap().getStreetName() + " - " + getPlayer().getMap().getMapName());
    }

    /*
     * 隨機抽獎
     * 參數 道具的ID
     * 參數 道具的數量
     * 參數 獲得裝備的日誌
     */
    public int gainGachaponItem(int id, int quantity, String msg) {
        byte rareness = GameConstants.gachaponRareItem(id);
        return gainGachaponItem(id, quantity, msg, rareness == 1 || rareness == 2 || rareness == 3);
    }

    public int gainGachaponItem(int id, int quantity, String msg, boolean smega) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        try {
            if (!ii.itemExists(id)) {
                return -1;
            }
            Item item = MapleInventoryManipulator.addbyId_Gachapon(getClient(), id, quantity, "從 " + msg + " 中獲得時間: " + DateUtil.getNowTime());
            if (item == null) {
                return -1;
            }
            if (smega) {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.gachaponMsg("恭喜" + getPlayer().getName() + "從" + msg + "獲得{" + ii.getName(item.getItemId()) + "}", item));
            }
            return item.getItemId();
        } catch (Exception e) {
            log.error("gainGachaponItem 錯誤", e);
        }
        return -1;
    }

    /*
     * NPC給玩家道具帶公告
     * 參數 道具的ID
     * 參數 道具的數量
     * 參數 獲得裝備的日誌
     * 參數 公告喇叭的類型[1-3]
     */
    public int gainGachaponItem(int id, int quantity, String msg, int rareness) {
        return gainGachaponItem(id, quantity, msg, rareness, false, 0);
    }

    /*
     * NPC給玩家道具帶公告
     * 參數 道具的ID
     * 參數 道具的數量
     * 參數 獲得裝備的日誌
     * 參數 公告喇叭的類型[1-3]
     * 參數 道具的使用時間
     */
    public int gainGachaponItem(int id, int quantity, String msg, int rareness, long period) {
        return gainGachaponItem(id, quantity, msg, rareness, false, period);
    }

    /*
     * NPC給玩家道具帶公告
     * 參數 道具的ID
     * 參數 道具的數量
     * 參數 獲得裝備的日誌
     * 參數 公告喇叭的類型[1-3]
     * 參數 是否NPC購買
     * 參數 道具的使用時間
     */
    public int gainGachaponItem(int id, int quantity, String msg, int rareness, boolean buy) {
        return gainGachaponItem(id, quantity, msg, rareness, buy, 0);
    }

    /*
     * NPC給玩家道具帶公告
     * 參數 道具的ID
     * 參數 道具的數量
     * 參數 獲得裝備的日誌
     * 參數 公告喇叭的類型[1-3]
     * 參數 是否NPC購買
     * 參數 道具的使用時間
     */
    public int gainGachaponItem(int id, int quantity, String msg, int rareness, boolean buy, long period) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        try {
            if (!ii.itemExists(id)) {
                return -1;
            }
            Item item = MapleInventoryManipulator.addbyId_Gachapon(getClient(), id, quantity, "從 " + msg + " 中" + (buy ? "購買" : "獲得") + "時間: " + DateUtil.getNowTime(), period);
            if (item == null) {
                return -1;
            }
            if (rareness == 1 || rareness == 2 || rareness == 3) {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(getPlayer().getName(), " : 從" + msg + "中" + (buy ? "購買" : "獲得") + "{" + ii.getName(item.getItemId()) + "}！大家一起恭喜他（她）吧！！！！", item, (byte) rareness, getClient().getChannel()));
            }
            return item.getItemId();
        } catch (Exception e) {
            log.error("gainGachaponItem 錯誤", e);
        }
        return -1;
    }

    public void changeJob(int jobId) {
        getPlayer().changeJob(jobId);
    }

    /**
     * 開始任務
     *
     * @param questId 任務ID
     */
    public void startQuest(int questId) {
        startQuest(questId, false);
    }

    public void startQuest(int questId, boolean isWorldShare) {
        MapleQuest quest = MapleQuest.getInstance(questId);
        int npcID = getNpc();
        for (MapleQuestRequirement qr : quest.getStartReqs()) {
            if (qr.getType() == MapleQuestRequirementType.npc) {
                npcID = qr.getIntStore();
                break;
            }
        }
        quest.start(getPlayer(), npcID, isWorldShare);
    }

    /**
     * 完成任務
     * @param questId 任務ID
     */
    public void completeQuest(int questId) {
        completeQuest(questId, false);
    }

    public void completeQuest(int questId, boolean isWorldShare) {
        MapleQuest quest = MapleQuest.getInstance(questId);
        int npcID = getNpc();
        for (MapleQuestRequirement qr : quest.getCompleteReqs()) {
            if (qr.getType() == MapleQuestRequirementType.npc) {
                npcID = qr.getIntStore();
                break;
            }
        }
        quest.complete(getPlayer(), npcID, isWorldShare);
    }

    /**
     * 強制開始任務
     * @param questId 任務ID
     */
    @Override
    public void forceStartQuest(int questId) {
        forceStartQuest(questId, false);
    }

    public void forceStartQuest(int questId, boolean isWorldShare) {
        forceStartQuest(questId, getNpc(), isWorldShare);
    }

    public void forceStartQuest(String data) {
        forceStartQuest(data, false);
    }

    public void forceStartQuest(String data, boolean isWorldShare) {
        MapleQuest quest = MapleQuest.getInstance(getQuestId());
        if (quest != null) {
            quest.forceStart(getPlayer(), npcID, data, isWorldShare);
        }
    }

    public int getQuestId() {
        if (type == ScriptType.QUEST_START || type == ScriptType.QUEST_END) {
            return Integer.valueOf(this.script);
        }
        return -1;
    }

    /**
     * 強制完成任務
     * @param questId
     */
    @Override
    public void forceCompleteQuest(int questId) {
        forceCompleteQuest(questId, false);
    }

    public void forceCompleteQuest(int questId, boolean isWorldShare) {
        forceCompleteQuest(questId, getNpc(), isWorldShare);
    }

    /*
     * 角色楓幣
     */
    public long getMeso() {
        return getPlayer().getMeso();
    }

    /*
     * 給角色AP點數
     */
    public void gainAp(int amount) {
        getPlayer().gainAp((short) amount);
    }

    /*
     * 增加角色的道具欄數量
     */
    public void expandInventory(byte type, int amt) {
        getPlayer().expandInventory(type, amt);
    }

    public void unequipEverything() {
        MapleInventory equipped = getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        MapleInventory decoration = getPlayer().getInventory(MapleInventoryType.DECORATION);
        Map<Short, Boolean> itemIds = new LinkedHashMap<>();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        for (Item item : equipped.newList()) {
            itemIds.put(item.getPosition(), ii.isCash(item.getItemId()));
        }
        for (Map.Entry<Short, Boolean> entry : itemIds.entrySet()) {
            MapleInventoryManipulator.unequip(getC(), entry.getKey(), entry.getValue() ? decoration.getNextFreeSlot() : equip.getNextFreeSlot());
        }
    }

    public void showEffect(boolean broadcast, String effect) {
        if (broadcast) {
            getPlayer().getMap().broadcastMessage(MaplePacketCreator.showEffect(effect));
        } else {
            getClient().announce(MaplePacketCreator.showEffect(effect));
        }
    }

    public void playSound(boolean broadcast, String sound) {
        if (broadcast) {
            getPlayer().getMap().broadcastMessage(MaplePacketCreator.playSound(sound));
        } else {
            getClient().announce(MaplePacketCreator.playSound(sound));
        }
    }

    public void environmentChange(String env) {
        this.environmentChange(env, 2);
    }

    public void environmentChange(String env, int info) {
        environmentChange(false, env, info);
    }

    public void environmentChange(boolean broadcast, String env, int info) {
        if (broadcast) {
            getPlayer().getMap().broadcastMessage(MaplePacketCreator.environmentChange(env, info));
        } else {
            getClient().announce(MaplePacketCreator.environmentChange(env, info));
        }
    }

    public void sendchangeMap(int mapid) {
        MapleMap map = getMap(mapid);
        getPlayer().changeMap(map, map.getPortal(0));
    }

    public void directionEffect(String data, int value, int x, int y, int z) {
        getClient().announce(UIPacket.getDirectionEffectPlayNpc(data, value, x, y, z));
    }

    public void sendRedLeaf(boolean viewonly, boolean autocheck) {
        if (autocheck) {
            viewonly = getPlayer().getFriendShipToAdd() == 0;
        }
        getClient().announce(MaplePacketCreator.sendRedLeaf(viewonly ? 0 : getPlayer().getFriendShipToAdd(), viewonly));
    }

    /*
     * 好友欄數量操作
     */
    public void updateBuddyCapacity(int capacity) {
        getPlayer().setBuddyCapacity((byte) capacity);
    }

    public int getBuddyCapacity() {
        return getPlayer().getBuddyCapacity();
    }

    /*
     * 組隊操作相關
     */
    public int partyMembersInMap() {
        int inMap = 0;
        if (getPlayer().getParty() == null) {
            return inMap;
        }
        for (MapleCharacter chr : getPlayer().getMap().getCharacters()) {
            if (chr.getParty() != null && chr.getParty().getPartyId() == getPlayer().getParty().getPartyId()) {
                inMap++;
            }
        }
        return inMap;
    }

    public List<MapleCharacter> getPartyMembers() {
        if (getPlayer().getParty() == null) {
            return null;
        }
        List<MapleCharacter> chars = new LinkedList<>();
        for (MaplePartyCharacter partychr : getPlayer().getParty().getMemberList()) {
            for (ChannelServer channel : ChannelServer.getAllInstances()) {
                MapleCharacter chr = channel.getPlayerStorage().getCharacterById(partychr.getId());
                if (chr != null) {
                    chars.add(chr);
                }
            }
        }
        return chars;
    }

    public void warpPartyWithExp(int mapId, int exp) {
        if (getPlayer().getParty() == null) {
            warp(mapId, 0);
            gainExp(exp);
            return;
        }
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter partychr : getPlayer().getParty().getMemberList()) {
            MapleCharacter chr = getClient().getChannelServer().getPlayerStorage().getCharacterByName(partychr.getName());
            if ((chr.getEventInstance() == null && getPlayer().getEventInstance() == null) || chr.getEventInstance() == getPlayer().getEventInstance()) {
                chr.changeMap(target, target.getPortal(0));
                chr.gainExp(exp, true, false, true);
            }
        }
    }

    public void warpPartyWithExpMeso(int mapId, int exp, int meso) {
        if (getPlayer().getParty() == null) {
            warp(mapId, 0);
            gainExp(exp);
            gainMeso(meso);
            return;
        }
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter partychr : getPlayer().getParty().getMemberList()) {
            MapleCharacter chr = getClient().getChannelServer().getPlayerStorage().getCharacterByName(partychr.getName());
            if ((chr.getEventInstance() == null && getPlayer().getEventInstance() == null) || chr.getEventInstance() == getPlayer().getEventInstance()) {
                chr.changeMap(target, target.getPortal(0));
                chr.gainExp(exp, true, false, true);
                chr.gainMeso(meso, true);
            }
        }
    }

    /*
     * 獲取遠征隊信息
     */
    public MapleSquad getSquad(String type) {
        return getClient().getChannelServer().getMapleSquad(type);
    }

    /*
     * 獲取遠征隊伍是存在
     * 沒有返回 -1
     * 存在返回 遠征隊伍的狀態
     */
    public int getSquadAvailability(String type) {
        MapleSquad squad = getClient().getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        }
        return squad.getStatus();
    }

    /*
     * 註冊新的遠征隊伍
     * 類型
     * 時間
     * 提示信息
     */
    public boolean registerSquad(String type, int minutes, String startText) {
        if (getClient().getChannelServer().getMapleSquad(type) == null) { //如果類型不為空
            /*
             * 新建遠征隊
             */
            MapleSquad squad = new MapleSquad(getClient().getChannel(), type, getPlayer(), minutes * 60 * 1000, startText);
            /*
             * 在當前頻道中註冊遠征隊
             */
            boolean ret = getClient().getChannelServer().addMapleSquad(squad, type);
            if (ret) { //如果在當前頻道中註冊成功
                MapleMap map = getPlayer().getMap();
                map.broadcastMessage(MaplePacketCreator.getClock(minutes * 60)); //在地圖中顯示遠征隊超時時間
                map.broadcastMessage(MaplePacketCreator.serverNotice(6, getPlayer().getName() + startText)); //在地圖中提示遠征隊廣告
            } else {
                squad.clear();
            }
            return ret;
        }
        return false;
    }

    public boolean getSquadList(String type, byte type_) {
        try {
            MapleSquad squad = getClient().getChannelServer().getMapleSquad(type);
            if (squad == null) {
                return false;
            }
            if (type_ == 0 || type_ == 3) { // Normal viewing
                sendNext(squad.getSquadMemberString(type_));
            } else if (type_ == 1) { // Squad Leader banning, Check out banned participant
                sendSimple(squad.getSquadMemberString(type_));
            } else if (type_ == 2) {
                if (squad.getBannedMemberSize() > 0) {
                    sendSimple(squad.getSquadMemberString(type_));
                } else {
                    sendNext(squad.getSquadMemberString(type_));
                }
            }
            return true;
        } catch (NullPointerException ex) {
            log.error(ex);
            return false;
        }
    }

    /*
     * 檢測是否為遠征隊隊長
     */
    public byte isSquadLeader(String type) {
        MapleSquad squad = getClient().getChannelServer().getMapleSquad(type);
        if (squad != null) {
            if (squad.getLeader() != null && squad.getLeader().getId() == getPlayer().getId()) {
                return 1;
            } else {
                return 0;
            }
        }
        return -1;
    }

    public boolean reAdd(String eim, String squad) {
        EventInstanceManager eimz = getDisconnected(eim);
        MapleSquad squadz = getSquad(squad);
        if (eimz != null && squadz != null) {
            squadz.reAddMember(getPlayer());
            eimz.registerPlayer(getPlayer());
            return true;
        }
        return false;
    }

    /*
     * 將玩家設置為禁止加入遠征隊
     */
    public void banMember(String type, int pos) {
        MapleSquad squad = getClient().getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.banMember(pos);
        }
    }

    /*
     * 接受等待列表中的玩家為遠征隊成員
     */
    public void acceptMember(String type, int pos) {
        MapleSquad squad = getClient().getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.acceptMember(pos);
        }
    }

    /*
     * 添加或者刪除遠征隊成員
     */
    public int addMember(String type, boolean join) {
        MapleSquad squad = getClient().getChannelServer().getMapleSquad(type);
        if (squad != null) {
            return squad.addMember(getPlayer(), join);
        }
        return -1;
    }

    /*
     * 檢測是否為遠征隊成員
     */
    public byte isSquadMember(String type) {
        MapleSquad squad = getClient().getChannelServer().getMapleSquad(type);
        if (squad != null) {
            if (squad.containsMember(getClient().getPlayer())) {
                return 1;
            } else if (squad.isBanned(getClient().getPlayer())) {
                return 2;
            } else {
                return 0;
            }
        }
        return -1;
    }

    public void resetReactors() {
        getPlayer().getMap().resetReactors();
    }

    /*
     * 創建公會
     */
    public void genericGuildMessage(int code) {
        getClient().announce(GuildPacket.genericGuildMessage((byte) code));
    }

    public void inputGuildName() {
        getClient().announce(GuildPacket.inputGuildName());
    }

    /*
     * 解散公會
     */
    public void disbandGuild() {
        int gid = getPlayer().getGuildId();
        if (gid <= 0 || getPlayer().getGuildRank() != 1) {
            return;
        }
        WorldGuildService.getInstance().disbandGuild(gid);
    }

    public int getGuildCapacity() {
        return WorldGuildService.getInstance().getGuild(getPlayer()).getCapacity();
    }

    /*
     * 增加公會成員數
     */
    public void increaseGuildCapacity(boolean trueMax) {
        increaseGuildCapacity(trueMax, 1000000);
    }

    public void increaseGuildCapacity(boolean trueMax, int meso) {
        if (getPlayer().getMeso() < meso && !trueMax) {
            getClient().announce(MaplePacketCreator.serverNotice(1, "楓幣不足.要楓幣: " + meso));
            return;
        }
        int gid = getPlayer().getGuildId();
        if (gid <= 0) {
            return;
        }
        if (WorldGuildService.getInstance().increaseGuildCapacity(gid, trueMax)) {
            if (!trueMax) {
                getPlayer().gainMeso(-meso, true, true);
            } else {
                gainGP(-25000);
            }
        } else if (!trueMax) {
            sendNext("請檢查公會成員是否到達上限. (最大人數: 100)");
        } else {
            sendNext("請檢查公會成員是否到達上限, if you have the GP needed or if subtracting GP would decrease a guild level. (最大人數: 200)");
        }
    }

    /*
     * 榮耀之石
     */
    public void displayGuildRanks() {
        displayGuildRanks(false);
    }

    public void displayGuildRanks(boolean show) {
        getClient().announce(GuildPacket.showGuildRanks(npcID, MapleGuildRanking.getInstance().getRank(), show));
    }

    /*
     * 創建公會需要的楓幣
     */
    public int getCreateGuildCost() {
        return ServerConfig.CHANNEL_CREATEGUILDCOST;
    }

    public boolean removePlayerFromInstance() {
        if (getPlayer().getEventInstance() != null) {
            getPlayer().getEventInstance().removePlayer(getClient().getPlayer());
            return true;
        }
        return false;
    }

    public boolean isPlayerInstance() {
        return getPlayer().getEventInstance() != null;
    }

    /**
     * 修改裝備屬性
     *
     * @param slot
     * @param type
     * @param amount
     */
    public void changeStat(short slot, int type, int amount) {
        Equip sel = (Equip) getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        switch (type) {
            case 0:
                sel.setStr((short) amount);
                break;
            case 1:
                sel.setDex((short) amount);
                break;
            case 2:
                sel.setInt((short) amount);
                break;
            case 3:
                sel.setLuk((short) amount);
                break;
            case 4:
                sel.setHp((short) amount);
                break;
            case 5:
                sel.setMp((short) amount);
                break;
            case 6:
                sel.setPad((short) amount);
                break;
            case 7:
                sel.setMad((short) amount);
                break;
            case 8:
                sel.setPdd((short) amount);
                break;
            case 9:
                sel.setMdd((short) amount);
                break;
            case 10:
                sel.setAcc((short) amount);
                break;
            case 11:
                sel.setAvoid((short) amount);
                break;
            case 12:
                sel.setHands((short) amount);
                break;
            case 13:
                sel.setSpeed((short) amount);
                break;
            case 14:
                sel.setJump((short) amount);
                break;
            case 15:
                sel.setRestUpgradeCount((byte) amount);
                break;
            case 16:
                sel.setViciousHammer((byte) amount);
                break;
            case 17:
                sel.setCurrentUpgradeCount((byte) amount);
                break;
            case 18:
                sel.setState((byte) amount, false);
                break;
            case 19:
                sel.setStarForceLevel((byte) amount);
                break;
            case 20:
                sel.setPotential1(amount);
                break;
            case 21:
                sel.setPotential2(amount);
                break;
            case 22:
                sel.setPotential3(amount);
                break;
            case 23:
                sel.setOwner(getText());
                break;
            case 24:
                sel.setBossDamage((short) amount);
                break;
            case 25:
                sel.setIgnorePDR((short) amount);
                break;
            case 26:
                sel.setTotalDamage((short) amount);
                break;
            case 27:
                sel.setAllStat((short) amount);
                break;
            default:
                break;
        }
        getPlayer().equipChanged();
        fakeRelog();
    }

    public void changeStat(short slot, String type, int amount, boolean inpack) {
        Equip sel = (Equip) getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        switch (type.toUpperCase()) {
            case "STR":
                sel.setStr((short) amount);
                break;
            case "DEX":
                sel.setDex((short) amount);
                break;
            case "INT":
                sel.setInt((short) amount);
                break;
            case "LUK":
                sel.setLuk((short) amount);
                break;
            case "HP":
                sel.setHp((short) amount);
                break;
            case "MP":
                sel.setMp((short) amount);
                break;
            case "WATK":
                sel.setPad((short) amount);
                break;
            case "MATK":
                sel.setMad((short) amount);
                break;
            case "WDEF":
                sel.setPdd((short) amount);
                break;
            case "MDEF":
                sel.setMdd((short) amount);
                break;
            case "ACC":
                sel.setAcc((short) amount);
                break;
            case "AVOID":
                sel.setAvoid((short) amount);
                break;
            case "HANDS":
                sel.setHands((short) amount);
                break;
            case "SPEED":
                sel.setSpeed((short) amount);
                break;
            case "JUMP":
                sel.setJump((short) amount);
                break;
            case "UPGRADE":
                sel.setRestUpgradeCount((byte) amount);
                break;
            case "VHAMMER":
                sel.setViciousHammer((byte) amount);
                break;
            case "LEVEL":
                sel.setCurrentUpgradeCount((byte) amount);
                break;
            case "STATE":
                sel.setState((byte) amount, false);
                break;
            case "ENHANCE":
                sel.setStarForceLevel((byte) amount);
                break;
            case "POTENTIAL1":
                sel.setPotential1(amount);
                break;
            case "POTENTIAL2":
                sel.setPotential2(amount);
                break;
            case "POTENTIAL3":
                sel.setPotential3(amount);
                break;
            case "OWNER":
                sel.setOwner(getText());
                break;
            case "BOSSDAMAGE":
                sel.setBossDamage((short) amount);
                break;
            case "IGNOREPDR":
                sel.setIgnorePDR((short) amount);
                break;
            case "TOTALDAMAGE":
                sel.setTotalDamage((short) amount);
                break;
            case "ALLSTAT":
                sel.setAllStat((short) amount);
                break;
            default:
                break;
        }
        getPlayer().equipChanged();
        fakeRelog();
    }

    public void changePotentialStat(short slot, int type, int amount) {
        Equip sel = (Equip) getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        switch (type) {
            case 0:
                if (amount == 0) {
                    sel.setPotential1(-5);
                } else if (amount == 1) {
                    sel.setPotential1(-6);
                } else if (amount == 2) {
                    sel.setPotential1(-7);
                } else if (amount == 3) {
                    sel.setPotential1(-8);
                }
                break;
            case 1:
                sel.setPotential1(amount);
                break;
            case 2:
                sel.setPotential2(amount);
                break;
            case 3:
                sel.setPotential3(amount);
                break;
            default:
                break;
        }
        getPlayer().equipChanged();
        fakeRelog();
    }

    public void openDuey() {
        getPlayer().setConversation(2);
        getClient().announce(MaplePacketCreator.sendDuey((byte) 0x09, null));
    }

    public void openMerchantItemStore() {
        getPlayer().setConversation(3);
        getClient().announce(PlayerShopPacket.merchItemStore((byte) 0x29)); //V.115.1修改
    }

    public void sendPVPWindow() {
        getClient().announce(UIPacket.sendPVPWindow(0));
        getClient().announce(MaplePacketCreator.sendPVPMaps());
    }

    public void sendPartyWindow() {
        getClient().announce(MaplePacketCreator.sendPartyWindow(npcID));
    }

    public void sendPartyWindow(int id) {
        getClient().announce(MaplePacketCreator.sendPartyWindow(id));
    }

    public void sendRepairWindow() {
        getClient().announce(MaplePacketCreator.sendRepairWindow(npcID));
    }

    public void sendProfessionWindow() {
        getClient().announce(MaplePacketCreator.sendProfessionWindow(0));
    }

    public void sendEventWindow() {
        getClient().announce(UIPacket.sendEventWindow(0));
    }

    public void sendLinkSkillWindow(int skillId) {
        if (hasSkill(skillId)) {
            getClient().announce(MaplePacketCreator.sendLinkSkillWindow(skillId));
        }
    }

    public int getDojoPoints() {
        return getClient().getPlayer().getQuestPoint(3887);
    }

    public boolean start_PyramidSubway(int pyramid) {
        if (pyramid >= 0) {
            return Event_PyramidSubway.warpStartPyramid(getPlayer(), pyramid);
        }
        return Event_PyramidSubway.warpStartSubway(getClient().getPlayer());
    }

    public boolean bonus_PyramidSubway(int pyramid) {
        if (pyramid >= 0) {
            return Event_PyramidSubway.warpBonusPyramid(getPlayer(), pyramid);
        }
        return Event_PyramidSubway.warpBonusSubway(getClient().getPlayer());
    }

    public short getKegs() {
        return getClient().getChannelServer().getFireWorks().getKegsPercentage();
    }

    public void giveKegs(int kegs) {
        getClient().getChannelServer().getFireWorks().giveKegs(getPlayer(), kegs);
    }

    public short getSunshines() {
        return getClient().getChannelServer().getFireWorks().getSunsPercentage();
    }

    public void addSunshines(int kegs) {
        getClient().getChannelServer().getFireWorks().giveSuns(getPlayer(), kegs);
    }

    public short getDecorations() {
        return getClient().getChannelServer().getFireWorks().getDecsPercentage();
    }

    public void addDecorations(int kegs) {
        try {
            getClient().getChannelServer().getFireWorks().giveDecs(getPlayer(), kegs);
        } catch (Exception e) {
            log.error("addDecorations 錯誤", e);
        }
    }

    public void maxStats() {
        Map<MapleStat, Long> statup = new EnumMap<MapleStat, Long>(MapleStat.class);

        getPlayer().getStat().str = (short) 32767;
        getPlayer().getStat().dex = (short) 32767;
        getPlayer().getStat().int_ = (short) 32767;
        getPlayer().getStat().luk = (short) 32767;

        getPlayer().getStat().maxhp = ServerConfig.CHANNEL_PLAYER_MAXHP;
        getPlayer().getStat().maxmp = ServerConfig.CHANNEL_PLAYER_MAXMP;
        getPlayer().getStat().setHp(ServerConfig.CHANNEL_PLAYER_MAXHP, getClient().getPlayer());
        getPlayer().getStat().setMp(ServerConfig.CHANNEL_PLAYER_MAXMP);

        statup.put(MapleStat.力量, 32767L);
        statup.put(MapleStat.敏捷, 32767L);
        statup.put(MapleStat.幸運, 32767L);
        statup.put(MapleStat.智力, 32767L);
        statup.put(MapleStat.HP, (long) ServerConfig.CHANNEL_PLAYER_MAXHP);
        statup.put(MapleStat.MAXHP, (long) ServerConfig.CHANNEL_PLAYER_MAXHP);
        statup.put(MapleStat.MP, (long) ServerConfig.CHANNEL_PLAYER_MAXMP);
        statup.put(MapleStat.MAXMP, (long) ServerConfig.CHANNEL_PLAYER_MAXMP);
        getPlayer().getStat().recalcLocalStats(getClient().getPlayer());
        getClient().announce(MaplePacketCreator.updatePlayerStats(statup, getClient().getPlayer()));
    }

    public Triple<String, Map<Integer, String>, Long> getSpeedRun(String typ) {
        ExpeditionType types = ExpeditionType.valueOf(typ);
        if (SpeedRunner.getSpeedRunData(types) != null) {
            return SpeedRunner.getSpeedRunData(types);
        }
        return new Triple<>("", new HashMap<>(), 0L);
    }

    public boolean getSR(Triple<String, Map<Integer, String>, Long> ma, int sel) {
        if (ma.mid.get(sel) == null || ma.mid.get(sel).length() <= 0) {
            dispose();
            return false;
        }
        sendOk(ma.mid.get(sel));
        return true;
    }

    public Equip getEquip(int itemid) {
        return (Equip) MapleItemInformationProvider.getInstance().getEquipById(itemid);
    }

    public void setExpiration(Object statsSel, long expire) {
        if (statsSel instanceof Equip) {
            ((Equip) statsSel).setExpiration(System.currentTimeMillis() + (expire * 24 * 60 * 60 * 1000));
        }
    }

    public void setLock(Object statsSel) {
        if (statsSel instanceof Equip) {
            Equip eq = (Equip) statsSel;
            if (eq.getExpiration() == -1) {
                eq.addAttribute(ItemAttribute.Seal.getValue());
            } else {
                eq.addAttribute(ItemAttribute.TradeBlock.getValue());
            }
        }
    }

    /*
     * 設置裝備是否永久鎖定
     */
    public void setItemLock() {
        setItemLock(true);
    }

    public void setItemLock(boolean lock) {
        setItemLock(1, lock);
    }

    public void setItemLock(int slot, boolean lock) {
        Item item = getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slot);
        if (item == null) {
            getPlayer().dropMessage(6, "裝備欄的第[" + slot + "]個道具為空，操作失敗。");
            return;
        }
        short flag = (short) ItemAttribute.Seal.getValue();
        if (lock) { //鎖定裝備
            if (ItemAttribute.Seal.check(item.getAttribute())) {
                getPlayer().dropMessage(6, "裝備欄的第[" + slot + "]個道具已經是鎖定狀態，無需進行此操作。");
                return;
            }
            item.addAttribute(flag);
        } else { //解除裝備鎖定
            if (!ItemAttribute.Seal.check(item.getAttribute())) {
                getPlayer().dropMessage(6, "裝備欄的第[" + slot + "]個道具不是鎖定狀態，無需進行此操作。");
                return;
            }
            item.removeAttribute(flag);
        }
        getPlayer().forceUpdateItem(item);
    }

    public boolean addFromDrop(Object statsSel) {
        if (statsSel instanceof Item) {
            Item it = (Item) statsSel;
            return MapleInventoryManipulator.checkSpace(getClient(), it.getItemId(), it.getQuantity(), it.getOwner()) && MapleInventoryManipulator.addFromDrop(getClient(), it, false);
        }
        return false;
    }

    public boolean replaceItem(int slot, int invType, Object statsSel, int offset, String type) {
        return replaceItem(slot, invType, statsSel, offset, type, false);
    }

    public boolean replaceItem(int slot, int invType, Object statsSel, int offset, String type, boolean takeSlot) {
        MapleInventoryType inv = MapleInventoryType.getByType((byte) invType);
        if (inv == null) {
            return false;
        }
        Item item = getPlayer().getInventory(inv).getItem((byte) slot);
        if (item == null || statsSel instanceof Item) {
            item = (Item) statsSel;
        }
        if (offset > 0) {
            if (inv != MapleInventoryType.EQUIP && inv != MapleInventoryType.DECORATION) {
                return false;
            }
            Equip eq = (Equip) item;
            if (takeSlot) {
                if (eq.getRestUpgradeCount() < 1) {
                    return false;
                } else {
                    eq.setRestUpgradeCount((byte) (eq.getRestUpgradeCount() - 1));
                }
                if (eq.getExpiration() == -1) {
                    eq.addAttribute(ItemAttribute.Seal.getValue());
                } else {
                    eq.addAttribute(ItemAttribute.TradeBlock.getValue());
                }
            }
            if (type.equalsIgnoreCase("Slots")) {
                eq.setRestUpgradeCount((byte) (eq.getRestUpgradeCount() + offset));
                eq.setViciousHammer((byte) (eq.getViciousHammer() + offset));
            } else if (type.equalsIgnoreCase("Level")) {
                eq.setCurrentUpgradeCount((byte) (eq.getCurrentUpgradeCount() + offset));
            } else if (type.equalsIgnoreCase("Hammer")) {
                eq.setViciousHammer((byte) (eq.getViciousHammer() + offset));
            } else if (type.equalsIgnoreCase("STR")) {
                eq.setStr((short) (eq.getStr() + offset));
            } else if (type.equalsIgnoreCase("DEX")) {
                eq.setDex((short) (eq.getDex() + offset));
            } else if (type.equalsIgnoreCase("INT")) {
                eq.setInt((short) (eq.getInt() + offset));
            } else if (type.equalsIgnoreCase("LUK")) {
                eq.setLuk((short) (eq.getLuk() + offset));
            } else if (type.equalsIgnoreCase("HP")) {
                eq.setHp((short) (eq.getHp() + offset));
            } else if (type.equalsIgnoreCase("MP")) {
                eq.setMp((short) (eq.getMp() + offset));
            } else if (type.equalsIgnoreCase("WATK")) {
                eq.setPad((short) (eq.getPad() + offset));
            } else if (type.equalsIgnoreCase("MATK")) {
                eq.setMad((short) (eq.getMad() + offset));
            } else if (type.equalsIgnoreCase("WDEF")) {
                eq.setPdd((short) (eq.getPdd() + offset));
            } else if (type.equalsIgnoreCase("MDEF")) {
                eq.setMdd((short) (eq.getMdd() + offset));
            } else if (type.equalsIgnoreCase("ACC")) {
                eq.setAcc((short) (eq.getAcc() + offset));
            } else if (type.equalsIgnoreCase("Avoid")) {
                eq.setAvoid((short) (eq.getAvoid() + offset));
            } else if (type.equalsIgnoreCase("Hands")) {
                eq.setHands((short) (eq.getHands() + offset));
            } else if (type.equalsIgnoreCase("Speed")) {
                eq.setSpeed((short) (eq.getSpeed() + offset));
            } else if (type.equalsIgnoreCase("Jump")) {
                eq.setJump((short) (eq.getJump() + offset));
            } else if (type.equalsIgnoreCase("ItemEXP")) {
                eq.setItemEXP(eq.getItemEXP() + offset);
            } else if (type.equalsIgnoreCase("Expiration")) {
                eq.setExpiration(eq.getTrueExpiration() + offset);
            } else if (type.equalsIgnoreCase("Flag")) {
                eq.addAttribute(eq.getAttribute() + offset);
            }
            item = eq.copy();
        }
        MapleInventoryManipulator.removeFromSlot(getClient(), inv, (short) slot, item.getQuantity(), false);
        return MapleInventoryManipulator.addFromDrop(getClient(), item, false);
    }

    public boolean replaceItem(int slot, int invType, Object statsSel, int upgradeSlots) {
        return replaceItem(slot, invType, statsSel, upgradeSlots, "Slots");
    }

    public boolean isCash(int itemId) {
        return MapleItemInformationProvider.getInstance().isCash(itemId);
    }

    public int getTotalStat(int itemId) {
        return MapleItemInformationProvider.getInstance().getTotalStat((Equip) MapleItemInformationProvider.getInstance().getEquipById(itemId));
    }

    public int getReqLevel(int itemId) {
        return MapleItemInformationProvider.getInstance().getReqLevel(itemId);
    }

    public MapleStatEffect getEffect(int buff) {
        return MapleItemInformationProvider.getInstance().getItemEffect(buff);
    }

    public void buffGuild(int buff, int duration, String msg) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (ii.getItemEffect(buff) != null && getPlayer().getGuildId() > 0) {
            MapleStatEffect mse = ii.getItemEffect(buff);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter chr : cserv.getPlayerStorage().getAllCharacters()) {
                    if (chr.getGuildId() == getPlayer().getGuildId()) {
                        mse.applyTo(chr, chr, true, null, duration);
                        chr.dropMessage(5, "Your guild has gotten a " + msg + " buff.");
                    }
                }
            }
        }
    }

    /*
     * 公會聯盟
     * 創建1個公會聯盟
     */
    public boolean createAlliance(String alliancename) {
        MapleParty pt = getPlayer().getParty();
        MapleCharacter otherChar = getClient().getChannelServer().getPlayerStorage().getCharacterById(pt.getMemberList().get(1).getId());
        if (otherChar == null || otherChar.getId() == getPlayer().getId()) {
            return false;
        }
        try {
            return WorldAllianceService.getInstance().createAlliance(alliancename, getPlayer().getId(), otherChar.getId(), getPlayer().getGuildId(), otherChar.getGuildId());
        } catch (Exception re) {
            log.error("createAlliance 錯誤", re);
            return false;
        }
    }

    public boolean addCapacityToAlliance() {
        try {
            MapleGuild guild = WorldGuildService.getInstance().getGuild(getPlayer().getGuildId());
            if (guild != null && getPlayer().getGuildRank() == 1 && getPlayer().getAllianceRank() == 1) {
                if (WorldAllianceService.getInstance().getAllianceLeader(guild.getAllianceId()) == getPlayer().getId() && WorldAllianceService.getInstance().changeAllianceCapacity(guild.getAllianceId())) {
                    gainMeso(-MapleGuildAlliance.CHANGE_CAPACITY_COST);
                    return true;
                }
            }
        } catch (Exception re) {
            log.error("addCapacityToAlliance 錯誤", re);
        }
        return false;
    }

    /*
     * 解散公會聯盟
     */
    public boolean disbandAlliance() {
        try {
            MapleGuild guild = WorldGuildService.getInstance().getGuild(getPlayer().getGuildId());
            if (guild != null && getPlayer().getGuildRank() == 1 && getPlayer().getAllianceRank() == 1) {
                if (WorldAllianceService.getInstance().getAllianceLeader(guild.getAllianceId()) == getPlayer().getId() && WorldAllianceService.getInstance().disbandAlliance(guild.getAllianceId())) {
                    return true;
                }
            }
        } catch (Exception re) {
            log.error("disbandAlliance 錯誤", re);
        }
        return false;
    }

    public boolean hasSkill(int skillid) {
        Skill theSkill = SkillFactory.getSkill(skillid);
        return theSkill != null && getPlayer().getSkillLevel(theSkill) > 0;
    }

    public void maxAllSkills() {
        HashMap<Integer, SkillEntry> sDate = new HashMap<>();
        for (Integer skillid : SkillFactory.getAllSkills().keySet()) {
            Skill skill = SkillFactory.getSkill(skillid);
            if (skill != null && SkillConstants.isApplicableSkill(skillid) && skillid < 90000000) { //no db/additionals/resistance skills
                sDate.put(skillid, new SkillEntry((byte) skill.getMaxLevel(), (byte) skill.getMaxLevel(), SkillFactory.getDefaultSExpiry(skill)));
            }
        }
        getPlayer().changeSkillsLevel(sDate);
        sDate.clear();
    }

    public void maxSkillsByJob() {
        getPlayer().maxSkillsByJob();
    }

    public void clearSkills() {
        getPlayer().clearSkills();
    }

    public void maxHyperSkillsByJob() {
        List<Integer> skillIds = new ArrayList<>();
        HashMap<Integer, SkillEntry> sDate = new HashMap<>();
        for (Integer skillid : SkillFactory.getAllSkills().keySet()) {
            Skill skill = SkillFactory.getSkill(skillid);
            if (skill != null && skill.canBeLearnedBy(getPlayer().getJob()) && skill.isHyperSkill()) {
                sDate.put(skillid, new SkillEntry((byte) skill.getMaxLevel(), (byte) skill.getMaxLevel(), SkillFactory.getDefaultSExpiry(skill)));
                skillIds.add(skillid);
            }
        }
        getPlayer().changeSkillsLevel(sDate);
        Collections.sort(skillIds);
//        if (getPlayer().isShowPacket()) {
//            String job = "Skill\\" + JobConstants.getJobNameById(getPlayer().getJob()) + ".txt";
//            for (Integer skillId : skillIds) {
//                for (Entry<Integer, SkillEntry> data : sDate.entrySet()) {
//                    if (data.getKey().getId() == skillId) {
//                        String txt = "public static final int " + data.getKey().getName() + " = " + data.getKey().getId() + "; //技能最大等級" + data.getKey().getMaxLevel();
//                        FileoutputUtil.log(job, txt, true);
//                    }
//                }
//            }
//        }
        sDate.clear();
        skillIds.clear();
    }

    /*
     * 加滿新手技能
     */
    public void maxBeginnerSkills() {
        List<Integer> skillIds = new ArrayList<>();
        HashMap<Integer, SkillEntry> sDate = new HashMap<>();
        for (Integer skil : SkillFactory.getAllSkills().keySet()) {
            Skill skill = SkillFactory.getSkill(skil);
            if (skill != null && skill.canBeLearnedBy(getPlayer().getJob()) && skill.isBeginnerSkill() && !skill.isSpecialSkill() && !skill.isHyperSkill()) {
                sDate.put(skil, new SkillEntry((byte) skill.getMaxLevel(), (byte) skill.getMaxLevel(), SkillFactory.getDefaultSExpiry(skill)));
                skillIds.add(skil);
            }
        }
        getPlayer().changeSkillsLevel(sDate);
        Collections.sort(skillIds);
        if (getPlayer().isDebug()) {
            Logger log = LogManager.getLogger("新手技能");
            for (Integer skillId : skillIds) {
                for (Entry<Integer, SkillEntry> data : sDate.entrySet()) {
                    Skill skill = SkillFactory.getSkill(data.getKey());
                    if (skill != null && data.getKey().equals(skillId)) {
                        log.info(MapleJob.getTrueNameById(getPlayer().getJobWithSub()) + skill.getName() + " = " + data.getKey() + "; //技能最大等級" + skill.getMaxLevel());
                    }
                }
            }
        }
        sDate.clear();
        skillIds.clear();
    }

    public void resetStats(int str, int dex, int z, int luk) {
        getPlayer().resetStats(str, dex, z, luk);
    }

    public boolean dropItem(int slot, int invType, int quantity) {
        MapleInventoryType inv = MapleInventoryType.getByType((byte) invType);
        return inv != null && MapleInventoryManipulator.drop(getClient(), inv, (short) slot, (short) quantity, true);
    }

    public List<Integer> getAllPotentialInfo() {
        List<Integer> list = new ArrayList<>(MapleItemInformationProvider.getInstance().getAllPotentialInfo().keySet());
        Collections.sort(list);
        return list;
    }

    public List<Integer> getAllPotentialInfoSearch(String content) {
        List<Integer> list = new ArrayList<>();
        for (Entry<Integer, List<StructItemOption>> i : MapleItemInformationProvider.getInstance().getAllPotentialInfo().entrySet()) {
            for (StructItemOption ii : i.getValue()) {
                if (ii.toString().contains(content)) {
                    list.add(i.getKey());
                }
            }
        }
        Collections.sort(list);
        return list;
    }

    public String getPotentialInfo(int id) {
        List<StructItemOption> potInfo = MapleItemInformationProvider.getInstance().getPotentialInfo(id);
        StringBuilder builder = new StringBuilder("#b#e以下是潛能ID為 ");
        builder.append(id);
        builder.append(" 的信息#n#k\r\n\r\n");
        int minLevel = 1, maxLevel = 10;
        for (StructItemOption item : potInfo) {
            builder.append("#e等級範圍 ");
            builder.append(minLevel);
            builder.append("~");
            builder.append(maxLevel);
            builder.append(": #n");
            builder.append(item.toString());
            minLevel += 10;
            maxLevel += 10;
            builder.append("\r\n");
        }
        return builder.toString();
    }

    public void sendRPS() {
        getClient().announce(MaplePacketCreator.getRPSMode((byte) 8, -1, -1, -1));
    }

    public final void doWeddingEffect(final Object ch) {
        final MapleCharacter chr = (MapleCharacter) ch;
        final MapleCharacter player = getPlayer();
        WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.yellowChat(player.getName() + ", 你願意娶 " + chr.getName() + " 為妻嗎？無論她將來是富有還是貧窮、或無論她將來身體健康或不適，你都願意和她永遠在一起嗎？"));
        CloneTimer.getInstance().schedule(() -> {
            if (chr == null || player == null) {
                warpMap(700000000, 0);
            } else {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.yellowChat(chr.getName() + ", 你願意嫁給 " + player.getName() + " 嗎？無論他將來是富有還是貧窮、或無論他將來身體健康或不適，你都願意和他永遠在一起嗎？"));
            }
        }, 10000);
        CloneTimer.getInstance().schedule(() -> {
            if (chr == null || player == null) {
                if (player != null) {
                    setCustomData(player, 160001, "3");
                    setCustomData(player, 160002, "0");
                } else if (chr != null) {
                    setCustomData(chr, 160001, "3");
                    setCustomData(chr, 160002, "0");
                }
                warpMap(700000000, 0);
            } else {
                setCustomData(player, 160001, "2");
                setCustomData(chr, 160001, "2");
                chr.setMarriageId(player.getId());
                player.setMarriageId(chr.getId());
                sendNPCText("好，我以聖靈、聖父、聖子的名義宣佈：" + player.getName() + " 和 " + chr.getName() + "結為夫妻。 希望你們在 " + chr.getClient().getChannelServer().getServerName() + " 遊戲中玩的愉快!", 9201002);
                chr.getMap().startExtendedMapEffect("現在，新郎可以親吻新娘了。 " + player.getName() + "!", 5120006);
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.yellowChat("好，我以聖靈、聖父、聖子的名義宣佈：" + player.getName() + " 和 " + chr.getName() + "結為夫妻。 希望你們在 " + chr.getClient().getChannelServer().getServerName() + " 遊戲中玩的愉快!"));
                if (chr.getGuildId() > 0) {
                    WorldGuildService.getInstance().guildPacket(chr.getGuildId(), MaplePacketCreator.sendMarriage(false, chr.getName()));
                }
                if (chr.getFamilyId() > 0) {
                    WorldFamilyService.getInstance().familyPacket(chr.getFamilyId(), MaplePacketCreator.sendMarriage(true, chr.getName()), chr.getId());
                }
                if (player.getGuildId() > 0) {
                    WorldGuildService.getInstance().guildPacket(player.getGuildId(), MaplePacketCreator.sendMarriage(false, player.getName()));
                }
                if (player.getFamilyId() > 0) {
                    WorldFamilyService.getInstance().familyPacket(player.getFamilyId(), MaplePacketCreator.sendMarriage(true, chr.getName()), player.getId());
                }
            }
        }, 20000); //10 sec 10 sec
    }

    public void putKey(int slot, int key, int type, int action) {
        getPlayer().changeKeybinding(slot, key, (byte) type, action);
        getClient().announce(MaplePacketCreator.getKeymap(getPlayer()));
    }

    public void logDonator(String log, int previous_points) {
        StringBuilder logg = new StringBuilder();
        logg.append(MapleCharacterUtil.makeMapleReadable(getPlayer().getName()));
        logg.append(" [角色ID: ").append(getPlayer().getId()).append("] ");
        logg.append(" [賬號: ").append(MapleCharacterUtil.makeMapleReadable(getClient().getAccountName())).append("] ");
        logg.append(log);
        logg.append(" [以前: ").append(previous_points).append("] [現在: ").append(getPlayer().getPoints()).append("]");
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("INSERT INTO donorlog VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)");
            ps.setString(1, MapleCharacterUtil.makeMapleReadable(getClient().getAccountName()));
            ps.setInt(2, getClient().getAccID());
            ps.setString(3, MapleCharacterUtil.makeMapleReadable(getPlayer().getName()));
            ps.setInt(4, getPlayer().getId());
            ps.setString(5, log);
            ps.setString(6, DateUtil.getNowTime());
            ps.setInt(7, previous_points);
            ps.setInt(8, getPlayer().getPoints());
            ps.executeUpdate();
            ps.close();
        } catch (SQLException e) {
            NPCConversationManager.log.error(logg, e);
        }
    }

    public void doRing(String name, int itemid) {
        PlayersHandler.DoRing(getClient(), name, itemid);
    }

    public int getNaturalStats(int itemid, String it) {
        Map<String, Integer> eqStats = MapleItemInformationProvider.getInstance().getItemBaseInfo(itemid);
        if (eqStats != null && eqStats.containsKey(it)) {
            return eqStats.get(it);
        }
        return 0;
    }

    public boolean isEligibleName(String t) {
        return checkCreateCharacterName(t);
    }

    public boolean isGM() {
        return getPlayer().isGm();
    }

    public String checkDrop(int mobId) {
        MapleMonsterInformationProvider mi = MapleMonsterInformationProvider.getInstance();
        final List<MonsterDropEntry> ranks = new ArrayList<>(mi.retrieveDrop(mobId));
        MapleMonsterStats stats = MapleLifeFactory.getMonsterStats(mobId);
        // 等級範圍怪物
        if (stats != null && Math.abs(getLevel() - stats.getLevel()) <= 20) {
            ranks.addAll(mi.retrieveDrop(9101025));
        }
        // 燃燒地圖怪物
        if (getMap() != null && getMap().getBreakTimeFieldStep() > 0 && (stats == null || !stats.isBoss())) {
            ranks.addAll(mi.retrieveDrop(9101114));
        }
        // 星力怪物
        if (getMap() != null && getMap().getBarrier() > 0 && (stats == null || !stats.isBoss())) {
            ranks.addAll(mi.retrieveDrop(9101084));
        }
        final List<MonsterGlobalDropEntry> drops = mi.getGlobalDrop();
        if ((ranks != null && ranks.size() > 0) || (drops != null && drops.size() > 0)) {
            int itemId, chance;
            MonsterDropEntry de;
            StringBuilder name = new StringBuilder();
            for (int i = 1; i <= ranks.size(); i++) {
                de = ranks.get(i - 1);
                if (!de.channels.isEmpty() && !de.channels.contains(getC().getChannel())) {
                    continue;
                }
                if (de.chance > 0) {
                    itemId = de.itemId;
                    if (i == 1) {
                        name.append("怪物#e#o").append(mobId).append("##n的掉寶數據如下:\r\n");
                        name.append("--------------------------------------\r\n");
                    }
                    String namez = "#z" + itemId + "#";
                    if (itemId == 0) { //楓幣 物品ID為0就是楓幣道具
                        long minMeso = de.minimum * getClient().getChannelServer().getMesoRate();
                        long maxMeso = de.maximum * getClient().getChannelServer().getMesoRate();
                        namez = " " + (minMeso != maxMeso ? (minMeso + "~" + maxMeso) : minMeso);
                    } else if (itemId < 0) {
                        switch (itemId) {
                            case -1:
                                namez = "樂豆點";
                                break;
                            case -2:
                                namez = "楓葉點數";
                                break;
                            case -3:
                                namez = "里程";
                                break;
                            default:
                                namez = "未知";
                                break;
                        }
                        namez += " " + (de.minimum != de.maximum ? (de.minimum + "~" + de.maximum) : de.minimum) + " 點";
                    }
                    chance = de.chance * getClient().getChannelServer().getDropRate();
                    name.append(i).append(") ");
                    if (itemId == 0) {
                        name.append("#fUI/UIWindow2.img/QuestIcon/7/0#");
                    } else if (itemId < 0) {
                        switch (itemId) {
                            case -1:
                                name.append("#i").append(2435892).append(":#");
                                break;
                            case -2:
                                name.append("#i").append(2432107).append(":#");
                                break;
                            case -3:
                                name.append("#i").append(2431872).append(":#");
                                break;
                            default:
                                name.append("#fUI/UIWindow2.img/QuestIcon/5/0#");
                                break;
                        }
                    } else {
                        name.append("#i").append(itemId).append(":#");
                    }
                    name.append(namez);

                    if (getPlayer().isIntern()) {
                        if (itemId > 0) {
                            name.append("(").append(itemId).append(")");
                        }
                        if (de.period > 0) {
                            name.append(" ").append(de.period).append("天");
                        }
                        if (de.questid > 0) {
                            name.append("[").append(MapleQuest.getInstance(de.questid).getName().length() > 0 ? MapleQuest.getInstance(de.questid).toString() : ("需求任務:" + de.questid)).append("]");
                        }
                        name.append("\r\n掉寶幾率:").append(Integer.valueOf(chance >= 999999 ? 1000000 : chance).doubleValue() / 10000.0).append("%").append(" 來源:").append(de.addFrom).append("\r\n");
                    }
                    name.append("\r\n");
                }
            }

            // 加載全域掉寶
            if (drops != null && drops.size() > 0) {
                MonsterGlobalDropEntry dge;
                for (int i = 1; i <= drops.size(); i++) {
                    dge = drops.get(i - 1);
                    if (!dge.channels.isEmpty() && !dge.channels.contains(getC().getChannel())) {
                        continue;
                    }
                    if (stats != null && dge.minMobLevel > 0 && dge.minMobLevel > stats.getLevel()) {
                        continue;
                    }
                    if (stats != null && dge.maxMobLevel > 0 && dge.maxMobLevel < stats.getLevel()) {
                        continue;
                    }
                    if (dge.chance > 0) {
                        itemId = dge.itemId;
                        if (i == 1) {
                            if (name.length() == 0 && mobId > 0) {
                                name.append("怪物#e#o").append(mobId).append("##n的掉寶數據如下:\r\n");
                                name.append("--------------------------------------\r\n");
                            }
                            if (getPlayer().isIntern()) {
                                name.append("以下是全域掉寶數據:\r\n");
                                name.append("--------------------------------------\r\n");
                            }
                        }
                        String namez = "#z" + itemId + "#";
                        if (itemId == 0) { // meso
                            long minMeso = dge.Minimum * getClient().getChannelServer().getMesoRate();
                            long maxMeso = dge.Maximum * getClient().getChannelServer().getMesoRate();
                            namez = " " + (minMeso != maxMeso ? (minMeso + "~" + maxMeso) : minMeso);
                        } else if (itemId < 0) {
                            switch (itemId) {
                                case -1:
                                    namez = "樂豆點";
                                    break;
                                case -2:
                                    namez = "楓葉點數";
                                    break;
                                case -3:
                                    namez = "里程";
                                    break;
                                default:
                                    namez = "未知";
                                    break;
                            }
                            namez = " " + (dge.Minimum != dge.Maximum ? (dge.Minimum + "~" + dge.Maximum) : dge.Minimum) + " 點";
                        }
                        chance = dge.chance * getClient().getChannelServer().getDropRate();
                        name.append(i).append(") ");
                        if (itemId == 0) {
                            name.append("#fUI/UIWindow2.img/QuestIcon/7/0#");
                        } else if (itemId < 0) {
                            switch (itemId) {
                                case -1:
                                    name.append("#i").append(2435892).append(":#");
                                    break;
                                case -2:
                                    name.append("#i").append(2432107).append(":#");
                                    break;
                                case -3:
                                    name.append("#i").append(2431872).append(":#");
                                    break;
                                default:
                                    name.append("#fUI/UIWindow2.img/QuestIcon/5/0#");
                                    break;
                            }
                        } else {
                            name.append("#i").append(itemId).append(":#");
                        }
                        name.append(namez);
                        if (getPlayer().isIntern()) {
                            if (itemId > 0) {
                                name.append("(").append(itemId).append(")");
                            }
                            if (dge.period > 0) {
                                name.append(" ").append(dge.period).append("天");
                            }
                            if (dge.questid > 0) {
                                name.append("[").append(MapleQuest.getInstance(dge.questid).getName().length() > 0 ? MapleQuest.getInstance(dge.questid).toString() : ("需求任務:" + dge.questid)).append("]");
                            }
                            name.append("\r\n掉寶幾率:").append(Integer.valueOf(chance >= 999999 ? 1000000 : chance).doubleValue() / 10000.0).append("%");
                            if (mobId == 0) {
                                name.append(" 等級需求:").append(dge.minMobLevel == 0 ? 1 : dge.minMobLevel).append("~").append(dge.maxMobLevel > 0 ? dge.maxMobLevel : ServerConfig.CHANNEL_PLAYER_MAXLEVEL);
                            }
                            name.append(" 來源:").append(dge.addFrom).append("(全域)\r\n");
                        }
                        name.append("\r\n");
                    }
                }
            }
            if (name.length() > 0) {
                return name.toString();
            }
        }
        return "此怪物無掉寶數據。";
    }

    public String searchDrop(int itemId) {
        String drops = MapleMonsterInformationProvider.getInstance().getDrops(itemId, getPlayer().isIntern());
        if (drops.length() > 0) {
            StringBuilder sb = new StringBuilder();
            sb.append("檢索完成 #i").append(itemId).append(":# #e#z").append(itemId).append("##n 有以下怪物掉落：\r\n");
            sb.append("--------------------------------------\r\n");
            sb.append(drops);
            return sb.toString();
        }
        return "沒有怪物噴此道具。";
    }

    public String getLeftPadded(String in, char padchar, int length) {
        return StringUtil.getLeftPaddedStr(in, padchar, length);
    }

    public void handleDivorce() {
        if (getPlayer().getMarriageId() <= 0) {
            sendNext("你還沒結婚，怎麼能離婚呢？");
            return;
        }
        int chz = WorldFindService.getInstance().findChannel(getPlayer().getMarriageId());
        MapleRing mRing = getPlayer().getMarriageRing();
        if (chz == -1) {  //sql queries
            try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                PreparedStatement ps = con.prepareStatement("UPDATE queststatus SET customData = ? WHERE characterid = ? AND (quest = ? OR quest = ?)");
                ps.setString(1, "0");
                ps.setInt(2, getPlayer().getMarriageId());
                ps.setInt(3, 160001);
                ps.setInt(4, 160002);
                ps.executeUpdate();
                ps.close();
                ps = con.prepareStatement("UPDATE characters SET marriageid = ? WHERE id = ?");
                ps.setInt(1, 0);
                ps.setInt(2, getPlayer().getMarriageId());
                ps.executeUpdate();
                ps.close();
                if (mRing != null) {
                    ps = con.prepareStatement("DELETE FROM inventoryitems WHERE itemid = ? AND characterid = ?");
                    ps.setInt(1, mRing.getItemId());
                    ps.setInt(2, getPlayer().getMarriageId());
                    ps.executeUpdate();
                    ps.close();
                }
            } catch (SQLException e) {
                log.error(e);
                return;
            }
            if (mRing != null) {
                getPlayer().removeAll(mRing.getItemId(), true, true);
                MapleRing.removeRingFromDb(mRing.getRingId(), mRing.getPartnerRingId());
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.yellowChat("[系統公告] " + getPlayer().getName() + " 和 " + mRing.getPartnerName() + " 離婚了。"));
            }
            setCustomData(160001, "0");
            setCustomData(160002, "0");
            getPlayer().setMarriageId(0);
            sendNext("離婚成功...");
            return;
        } else if (chz < -1) {
            sendNext("請確保你的伴侶是在線的.");
            return;
        }
        MapleCharacter cPlayer = ChannelServer.getInstance(chz).getPlayerStorage().getCharacterById(getPlayer().getMarriageId());
        if (cPlayer != null) {
            if (mRing != null) {
                cPlayer.removeAll(mRing.getItemId(), true, true);
                getPlayer().removeAll(mRing.getItemId(), true, true);
                MapleRing.removeRingFromDb(mRing.getRingId(), mRing.getPartnerRingId());
            }
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.yellowChat("[系統公告] " + getPlayer().getName() + " 和 " + cPlayer.getName() + " 離婚了。"));
            cPlayer.dropMessage(1, "你的伴侶和你離婚了.");
            cPlayer.setMarriageId(0);
            setCustomData(cPlayer, 160001, "0");
            setCustomData(160001, "0");
            setCustomData(cPlayer, 160002, "0");
            setCustomData(160002, "0");
            getPlayer().setMarriageId(0);
            sendNext("離婚成功...");
        } else {
            sendNext("出現了未知的錯誤...");
        }
    }

    public String getReadableMillis(long startMillis, long endMillis) {
        return StringUtil.getReadableMillis(startMillis, endMillis);
    }

    public boolean canCreateUltimate() {
        if (getPlayer().getLevel() < 120) {
            return false;
        }
        int jobId = getPlayer().getJob();
        return jobId == 1111 || jobId == 1112 || jobId == 1211 || jobId == 1212 || jobId == 1311 || jobId == 1312 || jobId == 1411 || jobId == 1412 || jobId == 1511 || jobId == 1512;
    }

    /*
     * 終極楓之谷家創建窗口
     */
    public void sendUltimateExplorer() {
        getClient().announce(MaplePacketCreator.ultimateExplorer());
    }

    public String getRankingInformation(int job) {
        StringBuilder sb = new StringBuilder();
        for (RankingInformation pi : RankingWorker.getRankingInfo(job)) {
            sb.append(pi.toString());
        }
        return sb.toString();
    }

    public Triple<Integer, Integer, Integer> getCompensation() {
        Triple<Integer, Integer, Integer> ret = null;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("SELECT * FROM compensationlog_confirmed WHERE chrname LIKE ?");
            ps.setString(1, getPlayer().getName());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret = new Triple<>(rs.getInt("value"), rs.getInt("taken"), rs.getInt("donor"));
            }
            rs.close();
            ps.close();
            return ret;
        } catch (SQLException e) {
            log.error(e);
            return ret;
        }
    }

    public boolean deleteCompensation(int taken) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            PreparedStatement ps = con.prepareStatement("UPDATE compensationlog_confirmed SET taken = ? WHERE chrname LIKE ?");
            ps.setInt(1, taken);
            ps.setString(2, getPlayer().getName());
            ps.executeUpdate();
            ps.close();
            return true;
        } catch (SQLException e) {
            log.error(e);
            return false;
        }
    }

    public void testPacket(String testmsg) {
        getClient().announce(MaplePacketCreator.testPacket(testmsg));
    }

    public void testPacket(int op) {
        getClient().announce(FamilyPacket.sendFamilyMessage(op));
    }

    public void testPacket(String op, String msg) {
        getClient().announce(MaplePacketCreator.testPacket(op, msg));
    }

    public short getSpace(byte type) {
        return getPlayer().getSpace(type);
    }

    public boolean haveSpace(int type) {
        return getPlayer().haveSpace(type);
    }

    public boolean haveSpaceForId(int itemid) {
        return getPlayer().haveSpaceForId(itemid);
    }

    public int getMoney() {
        int money = 0;
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            int cid = getPlayer().getId();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM bank WHERE charid=?");
            ps.setInt(1, cid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                money = rs.getInt("money");
            } else {
                PreparedStatement psu = con.prepareStatement("INSERT INTO bank (charid, money) VALUES (?, ?)");
                psu.setInt(1, cid);
                psu.setInt(2, 0);
                psu.executeUpdate();
                psu.close();
            }
            ps.close();
            rs.close();
        } catch (SQLException ex) {
            log.error("銀行存款獲取信息發生錯誤", ex);
        }
        return money;
    }

    public int addMoney(long money, int type) {
        try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
            int cid = getPlayer().getId();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM bank WHERE charid=?");
            ps.setLong(1, cid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (type == 1) {
                    if (money > rs.getLong("money")) {
                        return -1;
                    }
                }
                ps = con.prepareStatement("UPDATE bank SET money =money+ " + money + " WHERE charid = " + cid + "");
                return ps.executeUpdate();
            }
            ps.close();
            rs.close();
        } catch (SQLException ex) {
            log.error("銀行存款添加數量發生錯誤", ex);
        }
        return 0;
    }

    /*
     * 刷新玩家信息
     */
    public void fakeRelog() {
        if (!getPlayer().isAlive() || getPlayer().checkEvent() || FieldLimitType.MIGRATELIMIT.check(getPlayer().getMap().getFieldLimit())) {
            getPlayer().dropMessage(1, "刷新人物數據失敗.");
            return;
        }
        getPlayer().dropMessage(5, "正在刷新人數據.請等待...");
        getPlayer().fakeRelog();
    }

    /*
     * 通過名字獲取當前頻道的的角色
     */
    public MapleCharacter getCharByName(String name) {
        try {
            return getClient().getChannelServer().getPlayerStorage().getCharacterByName(name);
        } catch (Exception e) {
            return null;
        }
    }

    /*
     * 獲取角色的裝備列表信息
     */
    public String EquipList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        List<String> stra = new LinkedList<>();
        for (Item item : equip.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    /*
     * 獲取角色的消耗列表信息
     */
    public String UseList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory use = getPlayer().getInventory(MapleInventoryType.USE);
        List<String> stra = new LinkedList<>();
        for (Item item : use.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    /*
     * 獲取角色的商城列表信息
     */
    public String CashList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory cash = getPlayer().getInventory(MapleInventoryType.CASH);
        List<String> stra = new LinkedList<>();
        for (Item item : cash.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    /*
     * 獲取角色的其他列表信息
     */
    public String EtcList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory etc = getPlayer().getInventory(MapleInventoryType.ETC);
        List<String> stra = new LinkedList<>();
        for (Item item : etc.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    /*
     * 獲取角色的設置列表信息
     */
    public String SetupList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory setup = getPlayer().getInventory(MapleInventoryType.SETUP);
        List<String> stra = new LinkedList<>();
        for (Item item : setup.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    /*
     * 獲取角色的時裝列表信息
     */
    public String DecorationList(MapleClient c) {
        StringBuilder str = new StringBuilder();
        MapleInventory etc = getPlayer().getInventory(MapleInventoryType.DECORATION);
        List<String> stra = new LinkedList<>();
        for (Item item : etc.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l");
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    /*
     * 刪除全部指定道具ID的信息
     */
    public void deleteAll(int itemId) {
        MapleInventoryManipulator.removeAllById(getClient(), itemId, true);
    }

    public int useNebuliteGachapon() {
        try {
            if (getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() < 1
                    || getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() < 1
                    || getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < 1
                    || getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot() < 1
                    || getPlayer().getInventory(MapleInventoryType.CASH).getNumFreeSlot() < 1
                    || getPlayer().getInventory(MapleInventoryType.DECORATION).getNumFreeSlot() < 1) {
                return -1;
            }
            int grade = 0; // Default D
            int chance = Randomizer.nextInt(100); // cannot gacha S, only from alien cube.
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (chance < 1) { // Grade A
                grade = 3;
            } else if (chance < 5) { // Grade B
                grade = 2;
            } else if (chance < 35) { // Grade getClient()
                grade = 1;
            } else { // grade == 0
                grade = Randomizer.nextInt(100) < 25 ? 5 : 0; // 25% again to get premium ticket piece
            }
            int newId = 0;
            if (grade == 5) {
                newId = 4420000;
            } else {
                List<StructItemOption> pots = new LinkedList<>(ii.getAllSocketInfo(grade).values());
                while (newId == 0) {
                    StructItemOption pot = pots.get(Randomizer.nextInt(pots.size()));
                    if (pot != null) {
                        newId = pot.opID;
                    }
                }
            }
            Item item = MapleInventoryManipulator.addbyId_Gachapon(getClient(), newId, 1, "從星岩中獲得 時間: " + DateUtil.getNowTime());
            if (item == null) {
                return -1;
            }
            if (grade >= 2 && grade != 5) {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(getPlayer().getName(), " : 從星岩中獲得{" + ii.getName(item.getItemId()) + "}！大家一起恭喜他（她）吧！！！！", item, (byte) 2, getClient().getChannel()));
            }
            getClient().announce(MaplePacketCreator.getShowItemGain(newId, 1, true));
            return item.getItemId();
        } catch (Exception e) {
            System.out.println("[Error] Failed to use Nebulite Gachapon. " + e);
        }
        return -1;
    }

    public void giveMountSkill(int itemId, int mountSkillId, long period) {
        giveMountSkill(itemId, mountSkillId, period, false);
    }

    public void giveMountSkill(int itemId, int mountSkillId, long period, boolean test) {
        if (mountSkillId > 0 && haveItem(itemId)) {
            if (test) {
                System.err.println("騎寵技能 - 1 " + mountSkillId + " LinkedMountItem: " + mountSkillId % 1000);
            }
            mountSkillId = mountSkillId > 80001000 ? mountSkillId : SkillConstants.getSkillByJob(mountSkillId, getPlayer().getJob());
            int fk = GameConstants.getMountItem(mountSkillId, getClient().getPlayer());
            if (test) {
                System.err.println("騎寵技能 - 2 " + mountSkillId + " 騎寵ID: " + fk);
            }
            if (fk > 0 && mountSkillId < 80001000) {
                for (int i = 80001001; i < 80001999; i++) {
                    Skill skill = SkillFactory.getSkill(i);
                    if (skill != null && GameConstants.getMountItem(skill.getId(), getClient().getPlayer()) == fk) {
                        mountSkillId = i;
                        break;
                    }
                }
            }
            if (test) {
                System.err.println("騎寵技能 - 3 " + mountSkillId + " 技能是否為空: " + (SkillFactory.getSkill(mountSkillId) == null) + " 騎寵: " + (GameConstants.getMountItem(mountSkillId, getClient().getPlayer()) == 0));
            }
            if (getPlayer().getSkillLevel(mountSkillId) > 0) {
                getPlayer().dropMessage(1, "您已經擁有了[" + SkillFactory.getSkill(mountSkillId).getName() + "]這個騎寵的技能，無法使用該道具。");
            } else if (SkillFactory.getSkill(mountSkillId) == null || GameConstants.getMountItem(mountSkillId, getClient().getPlayer()) == 0) {
                getPlayer().dropMessage(1, "暫時無法使用這個騎寵的技能.");
            } else if (period > 0) {
                gainItem(itemId, -1);
                getPlayer().changeSingleSkillLevel(SkillFactory.getSkill(mountSkillId), (byte) 1, (byte) 1, System.currentTimeMillis() + period * 24 * 60 * 60 * 1000);
                getPlayer().dropMessage(1, "恭喜您獲得[" + SkillFactory.getSkill(mountSkillId).getName() + "]騎寵技能 " + period + " 權。");
            } else if (period == -1) {
                gainItem(itemId, -1);
                getPlayer().changeSingleSkillLevel(SkillFactory.getSkill(mountSkillId), (byte) 1, (byte) 1, -1);
                getPlayer().dropMessage(1, "恭喜您獲得[" + SkillFactory.getSkill(mountSkillId).getName() + "]騎寵技能永久權。");
            }
        } else {
            getPlayer().dropMessage(1, "暫時無法使用這個騎寵的技能\r\n我的道具ID為: " + itemId);
        }
        getClient().sendEnableActions();
    }

    /*
     * 檢測隊伍是否能組隊任務
     * 必須是所有隊伍中的成員滿足條件才可以開始任務
     */
    public boolean checkLevelAndItem(int minLevel, int maxLevel, int itemId) {
        return checkLevelAndItem(minLevel, maxLevel, itemId, 2);
    }

    public boolean checkLevelAndItem(int minLevel, int maxLevel, int itemId, int minSize) {
        MapleParty party = getPlayer().getParty();
        if (party == null || party.getLeaderID() != getPlayer().getId()) {
            getPlayer().dropMessage(5, "您沒有隊伍 或者 不是隊長..");
            return false;
        }
        int partySize = party.getMemberList().size();
        if (partySize < minSize) {
            getPlayer().dropMessage(5, "隊伍的人數成員不夠 必須 " + minSize + " 人才可以開始組隊任務，當前隊伍人數: " + partySize);
            return false;
        }
        int chrSize = 0;
        for (MaplePartyCharacter partyPlayer : party.getMemberList()) {
            MapleCharacter player = getPlayer().getMap().getPlayerObject(partyPlayer.getId());
            if (player == null) {
                getPlayer().dropMessage(5, "隊伍中的成員 " + partyPlayer.getName() + " 不在線 或者 不在同一地圖.");
            } else if (player.getLevel() < minLevel || player.getLevel() > maxLevel) {
                getPlayer().dropMessage(5, "隊伍中的成員 " + partyPlayer.getName() + " 等級不符合要求.等級限制: Lv." + minLevel + "～" + maxLevel);
            } else if (!player.haveItem(itemId)) {
                getPlayer().dropMessage(5, "隊伍中的成員 " + partyPlayer.getName() + " 沒有開始組隊任務需要的道具.");
            } else {
                chrSize++;
            }
        }
        return partySize == chrSize;
    }

    /**
     * 改變角色內在能力的技能
     */
    public void changeInnerSkill(int skillId, int skillevel, int position, int rank) {
        changeInnerSkill(skillId, skillevel, position, rank, false);
    }

    public void changeInnerSkill(int skillId, int skillevel, int position, int rank, boolean replace) {
        if (replace || getPlayer().getInnerSkillIdByPos(position) <= 0) {
            getPlayer().changeInnerSkill(new InnerSkillEntry(skillId, skillevel, (byte) position, (byte) rank, true));
        }
    }

    /**
     * 角色是否有變身效果
     *
     * @return true ? 有 : 沒有
     */
    public boolean isMorphed() {
        boolean morph = false;

        Integer morphed = getPlayer().getBuffedValue(MapleBuffStat.Morph);
        if (morphed != null) {
            morph = true;
        }
        return morph;
    }

    /**
     * 角色變身後的效果值ID
     *
     * @return 1=蘑菇，2=豬，3=外星人
     */
    public int getMorphValue() {
        try {
            return getPlayer().getBuffedValue(MapleBuffStat.Morph);
        } catch (NullPointerException n) {
            return -1;
        }
    }

    public void addItemToMarket(int itemid, int quantity, int price) {
        this.getClient().getChannelServer().getMarket().addItem(itemid, quantity, price, getPlayer().getId());
    }

    public void removeItemFromMarket(int itemid, int quantity) {
        this.getClient().getChannelServer().getMarket().removeItem(itemid, quantity, getPlayer().getId());
    }

    public void buyItem(int itemId, int quantity, int price, int charId) {
        try {
            for (MarketEngine.ItemEntry ie : getClient().getChannelServer().getMarket().getItems()) {
                if (ie.getId() == itemId && ie.getPrice() == price && ie.getOwner() == charId) {
                    if (ie.getQuantity() < quantity) {
                        getClient().announce(MaplePacketCreator.serverNotice(1, "數量不足！"));
                        return;
                    }
                    if (ie.getQuantity() * ie.getPrice() > getPlayer().getMeso()) {
                        getClient().announce(MaplePacketCreator.serverNotice(1, "沒有足夠的楓幣！"));
                        return;
                    }
                    int cost = ie.getPrice() * ie.getQuantity();
                    getClient().getChannelServer().getMarket().removeItem(itemId, quantity, charId);
                    getPlayer().gainMeso(-cost, true, true);
                    gainItem(itemId, quantity);
                    for (ChannelServer cs : ChannelServer.getAllInstances()) {
                        for (MapleCharacter mc : cs.getPlayerStorage().getAllCharacters()) {
                            if (mc.getId() == charId) {
                                mc.gainMeso(cost, false, true);
                                mc.getClient().announce(MaplePacketCreator.serverNotice(5, "[寄售系統] 你已獲得 " + cost + " 楓幣。買家 " + getPlayer().getName() + "."));
                                return;
                            }
                        }
                    }
                    //OMG the other player was not found..
                    try (Connection con = DatabaseConnectionEx.getInstance().getConnection()) {
                        PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
                        ps.setInt(1, charId);
                        ResultSet rs = ps.executeQuery();
                        if (rs.next()) {
                            int meso = rs.getInt("meso");
                            int gain = meso + cost;
                            ps = con.prepareStatement("UPDATE characters SET meso = ? WHERE id = ?");
                            ps.setInt(1, gain);
                            ps.setInt(2, charId);
                            ps.executeUpdate();
                        }
                        ps.close();
                        rs.close();
                    } catch (SQLException ignored) {

                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public void showInventory(int type) {
        String send = "";
        MapleInventory invy = getPlayer().getInventory(MapleInventoryType.getByType((byte) type));
        for (Item item : invy.list()) {
            send += "#L" + item.getPosition() + "##v" + item.getItemId() + "# 數量: #b" + item.getQuantity() + "#k#l\\r\\n";
        }
        sendSimple(send);
    }

    public String getInventorys(int type) {
        String send = "";
        MapleInventory invy = getPlayer().getInventory(MapleInventoryType.getByType((byte) type));
        for (Item item : invy.list()) {
            send += "#L" + item.getPosition() + "##v" + item.getItemId() + "# 數量: #b" + item.getQuantity() + "#k#l\\r\\n";
        }
        return send;
    }

    public Item getItem(int slot, int type) {
        MapleInventory invy = getPlayer().getInventory(MapleInventoryType.getByType((byte) type));
        for (Item item : invy.list()) {
            if (item.getPosition() == slot) {
                return item;
            }
        }
        return null;
    }

    public String getMarket() {
        MarketEngine me = getClient().getChannelServer().getMarket();
        String ret = "";
        int count = 0;
        for (ItemEntry ie : me.getItems()) {
            if (ie.getOwner() == getPlayer().getId()) {
                continue;
            }
            ret += "#L" + count + "##v"
                    + ie.getId()
                    + "# #b數量#k: "
                    + ie.getQuantity()
                    + " #b費用#k: "
                    + ie.getPrice() + " 楓幣"
                    + " #b 所有者: #k"
                    + me.getCharacterName(ie.getOwner())
                    + "#l\\r\\n";
            count++;
        }
        return ret;
    }

    public String getMarketRetrival() {
        MarketEngine me = getClient().getChannelServer().getMarket();
        String ret = "";
        int count = 0;
        for (ItemEntry ie : me.getItems()) {
            if (ie.getOwner() != getPlayer().getId()) {
                continue;
            }
            ret += "#L" + count + "##v"
                    + ie.getId()
                    + "# #b數量#k: "
                    + ie.getQuantity()
                    + " #b費用#k: "
                    + ie.getPrice() + " 楓幣"
                    + "#l\\r\\n";
            count++;
        }
        return ret;
    }

    public List<ItemEntry> getMyMarketItems() {
        List<ItemEntry> ret = new LinkedList<>();
        synchronized (getClient().getChannelServer().getMarket().getItems()) {
            for (ItemEntry ie : getClient().getChannelServer().getMarket().getItems()) {
                if (ie.getOwner() == getPlayer().getId()) {
                    ret.add(ie);
                }
            }
        }
        return ret;
    }

    public void retrieveMarketItem(int position) {
        List<ItemEntry> items = getMyMarketItems();
        ItemEntry ie = items.get(position);
        gainItem(ie.getId(), ie.getQuantity());
        removeItemFromMarket(ie.getId(), ie.getQuantity());
    }

    public List<ItemEntry> getMarketItems() {
        List<ItemEntry> ret = new LinkedList<>();
        synchronized (getClient().getChannelServer().getMarket().getItems()) {
            for (ItemEntry ie : getClient().getChannelServer().getMarket().getItems()) {
                if (ie.getOwner() != getPlayer().getId()) {
                    ret.add(ie);
                }
            }
        }
        return ret;
    }

    public String getCharName(int id) {
        return getClient().getChannelServer().getMarket().getCharacterName(id);
    }

    public boolean changeitemxx(int invType, int slot, int str, int dex, int int_, int luk, int watk, int matk, int hc) {
        if (invType != 1) {
            return false;
        }
        Equip item = (Equip) getItem(slot, invType);
        item.setStr((short) str);
        item.setDex((short) dex);
        item.setInt((short) int_);
        item.setLuk((short) luk);
        item.setPad((short) watk);
        item.setMad((short) matk);
        return true;
    }

    public int getLastSMType() {
        return lastSMType;
    }

    public String searchData(int type, String search) {
        return SearchGenerator.searchData(type, search);
    }

    public int[] getSearchData(int type, String search) {
        Map<Integer, String> data = SearchGenerator.getSearchData(type, search);
        if (data.isEmpty()) {
            return null;
        }
        int[] searches = new int[data.size()];
        int i = 0;
        for (int key : data.keySet()) {
            searches[i] = key;
            i++;
        }
        return searches;
    }

    public boolean foundData(int type, String search) {
        return SearchGenerator.foundData(type, search);
    }
}
