package handling.channel.handler;

import client.*;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.ItemAttribute;
import client.inventory.MapleInventoryType;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.enums.*;
import database.DatabaseConnection;
import handling.opcode.EffectOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.WorldBroadcastService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import scripting.defaults.event.BossGiantVellud;
import scripting.npc.NPCConversationManager;
import scripting.npc.NPCScriptManager;
import server.AutobanManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleTrunk;
import server.life.MapleNPC;
import server.maps.MapleMap;
import server.maps.MapleQuickMove;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.shop.MapleShop;
import packet.MaplePacketCreator;
import tools.Pair;
import tools.data.MaplePacketReader;
import tools.data.MaplePacketLittleEndianWriter;
import packet.EffectPacket;
import packet.NPCPacket;
import packet.PacketHelper;

import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.Map.Entry;

import static constants.enums.TrunkOptType.*;

public class NPCHandler {

    /**
     * Logger for this class.
     */
    private static final Logger log = LogManager.getLogger(NPCHandler.class);

    /*
     * NPC自己說話和移動效果
     */
    public static void NPCAnimation(MaplePacketReader slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
            return;
        } else if (c.getPlayer().getLastChangeMapTime() > 0 && (System.currentTimeMillis() - c.getPlayer().getLastChangeMapTime()) < 1000) { // 換地圖後1秒內不會有此封包回傳，除非客戶端卡頓，進一步造成不同地圖相同的OID封包觸發並斷線
            return;
        }
        MapleMap map = c.getPlayer().getMap();
        int npcOid = slea.readInt();
        MapleNPC npc = map.getNPCByOid(npcOid);
        if (npc == null) {
            return;
        }
        byte type1 = slea.readByte();
        byte type2 = slea.readByte();
        int n1 = slea.readInt();

        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.LP_NpcMove.getValue());
        mplew.writeInt(npcOid);
        mplew.write(type1);
        mplew.write(type2);
        mplew.writeInt(n1);

        if (npc.isMove()) {
            if (slea.available() >= 17) {
                final int gatherDuration = slea.readInt();
                final int nVal1 = slea.readInt();
                final Point mPos = slea.readPos();
                final Point oPos = slea.readPos();
                List<LifeMovementFragment> res = MovementParse.parseMovement(slea, 10);
                MovementParse.updatePosition(res, npc, 0);

                PacketHelper.serializeMovementList(mplew, gatherDuration, nVal1, mPos, oPos, res, null);
            }
        }
        map.objectMove(-1, npc, mplew.getPacket());
    }

    /*
     * NPC商店操作
     */
    public static void NPCShop(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MapleShop shop;
        if (chr.getConversation() != ConversationType.ON_NPC_SHOP || (shop = chr.getShop()) == null) {
            c.sendEnableActions();
            return;
        }
        byte bmode = slea.readByte();
        switch (bmode) {
            case 0: { //購買道具
                short position = slea.readShort(); //道具在商店的位置
                int itemId = slea.readInt();
                short quantity = slea.readShort();
                slea.skip(8);
                shop.buy(c, itemId, quantity, position);
                break;
            }
            case 1: { //出售道具
                short slot = slea.readShort();
                int itemId = slea.readInt();
                short quantity = slea.readShort();
                shop.sell(c, ItemConstants.getInventoryType(itemId), slot, quantity);
                break;
            }
            case 2: { //沖飛鏢和子彈數量
                short slot = slea.readShort();
                shop.recharge(c, slot);
                break;
            }
            case 3: { //關閉商店
                chr.setConversation(ConversationType.NONE);
                chr.setShop(null);
                break;
            }
            default:
                c.sendEnableActions();
                break;
        }
    }

    /*
     * NPC對話操作
     */
    public static void NPCTalk(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || !c.canClickNPC()) {
            c.sendEnableActions();
            return;
        }
        MapleNPC npc = chr.getMap().getNPCByOid(slea.readInt());
        if (npc == null) {
            return;
        }
        if (chr.hasBlockedInventory()) {
            chr.dropMessage(5, "您當前已經和1個NPC對話了. 如果不是請輸入 @ea 命令進行解卡。");
            c.sendEnableActions();
            return;
        }
        if (MapleAntiMacro.isAntiNow(chr.getName())) {
            chr.dropMessage(5, "被使用測謊機時無法操作。");
            c.sendEnableActions();
            return;
        }
        chr.setCurrenttime(System.currentTimeMillis());
        if (chr.getCurrenttime() - chr.getLasttime() < chr.getDeadtime()) {
            if (chr.isGm()) {
                chr.dropMessage(5, "連接速度過快，請稍後再試。");
            }

            c.sendEnableActions();
            return;
        }
        chr.setLasttime(System.currentTimeMillis());
//        c.getPlayer().updateTick(slea.readInt()); //暫時不檢測點NPC的速度
        if (npc.hasShop()) {
            chr.setConversation(ConversationType.ON_NPC_SHOP);
            npc.sendShop(c);
        } else {
            NPCScriptManager.getInstance().start(c, npc.getId());
        }
    }

    /*
     * 任務操作
     */
    public static void QuestAction(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null || chr.hasBlockedInventory()) {
            return;
        }
        byte action = slea.readByte();
        int questId = slea.readInt();
        //log.info("開始執行任務ID: " + quest + " 操作類型: " + action);
        if (MapleAntiMacro.isAntiNow(chr.getName())) {
            chr.dropMessage(5, "被使用測謊機時無法操作。");
            c.sendEnableActions();
            return;
        }
        QuestRequestType op = QuestRequestType.getByType(action);
        if (op == null) {
            if (chr.isDebug()) {
                chr.dropMessage(5, "Unknown QuestRequestType: " + action);
            }
            return;
        }
        MapleQuest quest = MapleQuest.getInstance(questId);
        switch (op) {
            case QuestReq_LostItem: {
                slea.readInt();
                quest.restoreLostItem(chr, slea.readInt());
                break;
            }
            case QuestReq_AcceptQuest: {
                int npc = slea.readInt();
                if (!quest.isScriptedStart()) {
                    quest.start(chr, npc);
                }
                break;
            }
            case QuestReq_CompleteQuest: {
                int npc = slea.readInt();
                int selection = slea.readInt();
                if (quest.isCustomend()) {
                    return;
                }
                if (slea.available() >= 4) {
                    quest.complete(chr, npc, slea.readInt());
                } else if (selection >= 0) {
                    quest.complete(chr, npc, selection);
                } else {
                    quest.complete(chr, npc);
                }
                break;
            }
            case QuestReq_ResignQuest: {
                if (GameConstants.canForfeit(quest.getId())) {
                    quest.forfeit(chr);
                    if (chr.isDebug()) {
                        chr.dropMessage(6, "[任務系統] 放棄系統任務 " + quest);
                    }
                } else {
                    chr.dropMessage(1, "無法放棄這個任務.");
                }
                break;
            }
            case QuestReq_OpeningScript: {
                NPCScriptManager.getInstance().startQuest(c, slea.readInt(), questId);
                break;
            }
            case QuestReq_CompleteScript: { // 腳本任務結束
                NPCScriptManager.getInstance().endQuest(c, slea.readInt(), questId, false);
                break;
            }
            case QuestReq_LaterStep: { // 任務完成效果
                if (chr.getQuestStatus(questId) == 2) {
                    chr.send(EffectPacket.showSpecialEffect(EffectOpcode.UserEffect_QuestComplete)); // 任務完成
                    chr.getMap().broadcastMessage(chr, EffectPacket.showForeignEffect(chr.getId(), EffectOpcode.UserEffect_QuestComplete), false);
                }
            }
        }
    }

    /*
     * 倉庫操作
     */
    public static void Storage(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getTrunk() == null) {
            return;
        }
        if (MapleAntiMacro.isAntiNow(chr.getName())) {
            chr.dropMessage(5, "被使用測謊機時無法操作。");
            c.sendEnableActions();
            return;
        }
        if (chr.getConversation() != ConversationType.ON_TRUNK) {
            c.sendEnableActions();
            return;
        }
        byte mode = slea.readByte();
        MapleTrunk storage = chr.getTrunk();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (storage == null || (!storage.isPwdChecked() && mode != TrunkReq_CheckSSN2)) {
            chr.setConversation(ConversationType.NONE);
            c.sendEnableActions();
            return;
        }
        switch (mode) {
            case TrunkReq_CheckSSN2: {
                String secondPwd = slea.readMapleAsciiString();
                if (c.CheckSecondPassword(secondPwd)) {
                    storage.setPwdChecked(true);
                    storage.sendStorage(c);
                } else {
                    storage.secondPwdRequest(c, -1);
                }
                break;
            }
            case TrunkReq_GetItem: { // 取出
                byte type = slea.readByte();
                short slot = slea.readByte();
                slot = storage.getSlot(MapleInventoryType.getByType(type), slot);
                Item item = storage.getItem(slot); //獲取道具在倉庫的信息
                if (item != null) {
                    //檢測是否是唯一道具
                    if (ii.isPickupRestricted(item.getItemId()) && chr.getItemQuantity(item.getItemId(), true) > 0) {
                        c.announce(NPCPacket.getStorageError((byte) TrunkOptType.TruncRes_GetHavingOnlyItem));
                        return;
                    }
                    //檢測取回道具楓幣是否足夠
                    int meso = storage.getNpcId() == 9030100 || storage.getNpcId() == 9031016 ? 1000 : 0;
                    if (chr.getMeso() < meso) {
                        c.announce(NPCPacket.getStorageError((byte) TrunkOptType.TrunkRes_GetNoMoney)); //取回道具楓幣不足
                        return;
                    }
                    //檢測角色背包是否有位置
                    if (MapleInventoryManipulator.checkSpace(c, item.getItemId(), item.getQuantity(), item.getOwner())) {
                        item = storage.takeOut(slot); //從倉庫中取出這個道具
                        int flag = item.getAttribute();
                        int accShareItem = ItemAttribute.AccountSharable.getValue() | ItemAttribute.CutUsed.getValue();
                        if ((flag & accShareItem) != accShareItem) {
                            flag &= ~ItemAttribute.TradeOnce.getValue();
                            flag &= ~ItemAttribute.CutUsed.getValue();
                            flag &= ~ItemAttribute.AccountSharable.getValue();
                        }
                        if (ii.isSharableOnce(item.getItemId())) {
                            flag |= ItemAttribute.TradeBlock.getValue();
                        }
                        item.setAttribute(flag);
                        MapleInventoryManipulator.addFromDrop(c, item, false); //給角色道具
                        if (meso > 0) { //扣取角色的楓幣
                            chr.gainMeso(-meso, false);
                        }
                        storage.sendTakenOut(c, ItemConstants.getInventoryType(item.getItemId()));
                    } else {
                        c.announce(NPCPacket.getStorageError((byte) TrunkOptType.TrunkRes_GetUnknown)); //發送背包是滿的封包
                    }
                } else {
                    //AutobanManager.getInstance().autoban(c, "試圖從倉庫取出不存在的道具.");
                    log.info("[作弊] " + chr.getName() + " (等級 " + chr.getLevel() + ") 試圖從倉庫取出不存在的道具.");
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.spouseMessage(UserChatMessageType.藍加粉, "[GM消息] 玩家: " + chr.getName() + " (等級 " + chr.getLevel() + ") 試圖從倉庫取出不存在的道具."));
                    c.sendEnableActions();
                }
                break;
            }
            case TrunkReq_PutItem: { // 存入
                short slot = slea.readShort();
                int itemId = slea.readInt();
                short quantity = slea.readShort();
                //檢測保存道具的數量是否小於 1 
                if (quantity < 1) {
                    AutobanManager.getInstance().autoban(c, "試圖存入到倉庫的道具數量: " + quantity + " 道具ID: " + itemId);
                    return;
                }
                //檢測倉庫的道具是否已滿
                if (storage.isFull()) {
                    c.announce(NPCPacket.getStorageError((byte) TrunkRes_PutNoSpace));
                    return;
                }
                //檢測角色背包當前道具是否有道具
                MapleInventoryType type = ItemConstants.getInventoryType(itemId);
                if (chr.getInventory(type).getItem(slot) == null) {
                    c.sendEnableActions();
                    return;
                }
                //檢測楓幣是否足夠
                int meso = storage.getNpcId() == 9030100 || storage.getNpcId() == 9031016 ? 500 : 100;
                if (chr.getMeso() < meso) {
                    c.announce(NPCPacket.getStorageError((byte) TrunkRes_PutNoMoney));
                    return;
                }
                //開始操作保存道具到倉庫
                Item item = chr.getInventory(type).getItem(slot).copy();
                int flag = item.getCAttribute();
                //檢測道具是否為寵物道具
                if (ItemConstants.類型.寵物(item.getItemId())) {
                    c.announce(NPCPacket.getStorageError((byte) TrunkRes_PutUnknown));
                    return;
                }
                //被封印的道具不能存入倉庫
                if (ItemAttribute.Seal.check(flag)) {
                    c.sendEnableActions();
                    return;
                }
                if ((ItemAttribute.TradeBlock.check(flag) || ii.isTradeBlock(item.getItemId())) && !ItemAttribute.AccountSharable.check(flag) && !ItemAttribute.TradeOnce.check(flag) && !ItemAttribute.CutUsed.check(flag)) {
                    c.sendEnableActions();
                    return;
                }
                //檢測道具是否為唯一道具 且角色倉庫已經有這個道具
                if (ii.isPickupRestricted(item.getItemId()) && storage.findById(item.getItemId()) != null) {
                    c.sendEnableActions();
                    return;
                }
                if (item.getItemId() == itemId && (item.getQuantity() >= quantity || ItemConstants.類型.可充值道具(itemId))) {
                    //如果是飛鏢子彈道具就設置保存的數量為道具當前的數量
                    if (ItemConstants.類型.可充值道具(itemId)) {
                        quantity = item.getQuantity();
                    }
                    MapleInventoryManipulator.removeFromSlot(c, type, slot, quantity, false); //刪除角色背包中的道具
                    chr.gainMeso(-meso, false, false); //收取保存到倉庫的費用
                    item.setQuantity(quantity); //設置道具的數量
                    storage.store(item); //存入道具到倉庫
                    storage.sendStored(c, ItemConstants.getInventoryType(itemId)); //發送當前倉庫的道具封包
                } else {
                    AutobanManager.getInstance().addPoints(c, 1000, 0, "試圖存入到倉庫的道具: " + itemId + " 數量: " + quantity + " 當前玩家用道具: " + item.getItemId() + " 數量: " + item.getQuantity());
                }
                break;
            }
            case TrunkReq_SortItem: { // 倉庫物品排序
                storage.arrange();
                storage.update(c);
                break;
            }
            case TrunkReq_Money: { // 楓幣
                DatabaseConnection.domain(con -> {
                    long meso = slea.readLong();
                    long storageMesos = storage.getMesoForUpdate(con);
                    long playerMesos = chr.getMeso();
                    if ((meso > 0 && storageMesos >= meso) || (meso < 0 && playerMesos >= -meso)) {
                        if (meso < 0 && (storageMesos - meso) < 0) {
                            meso = -(ServerConfig.CHANNEL_PLAYER_MAXMESO - storageMesos);
                            if ((-meso) > playerMesos) {
                                return null;
                            }
                        } else if (meso > 0 && (playerMesos + meso) < 0) {
                            meso = ServerConfig.CHANNEL_PLAYER_MAXMESO - playerMesos;
                            if ((meso) > storageMesos) {
                                return null;
                            }
                        } else if (meso + playerMesos > ServerConfig.CHANNEL_PLAYER_MAXMESO) {
                            chr.dropMessage(1, "楓幣將達到系統上限，不能取出。");
                            c.announce(NPCPacket.getStorageError((byte) TrunkRes_TradeBlocked));
                            return null;
                        } else {
                            storage.setMeso(con, storageMesos - meso);
                            chr.gainMeso(meso, false, false);
                        }
                    } else {
                        AutobanManager.getInstance().addPoints(c, 1000, 0, "Trying to store or take out unavailable amount of mesos (" + meso + "/" + storage.getMeso() + "/" + c.getPlayer().getMeso() + ")");
                    }
                    return null;
                });
                storage.sendMeso(c);
                break;
            }
            case TrunkReq_CloseDialog: { // 退出倉庫
                storage.close();
                chr.setConversation(ConversationType.NONE);
                break;
            }
            default:
                System.out.println("未處理的倉庫操作，模式: " + mode);
                break;
        }
    }

    /**
     * 和NPC交談也就是對話操作
     */
    public static void userScriptMessageAnswer(MaplePacketReader slea, MapleClient c) {
        MapleCharacter player = c.getPlayer();
        if (player == null) {
            return;
        }
        if (player.getConversation() != ConversationType.TALK_TO_NPC) {
            return;
        }
        slea.skip(4);
        byte lastSMType = slea.readByte(); // 00 last message type (2 = yesno, 0F = acceptdecline)
        ScriptMessageType op = ScriptMessageType.getByType(lastSMType);
        if (op == null) {
            c.getPlayer().dropMessage(1, "Unknown ScriptMessageType:" + lastSMType);
            return;
        }
        NPCConversationManager cm = NPCScriptManager.getInstance().getCM(c);
        if (cm == null) {
            return;
//        } else if (cm.getLastSMType() != lastSMType) {
//            if (player.isShowPacket()) {
//                player.dropMessage(6, "[ScriptMessage] LastSMType Error! Packet Type:" + op);
//                cm.dispose();
//            }
//            return;
        }
//        if (op == ScriptMessageType.ASK_AVATAR_EX) { //更換髮型出現
//            slea.skip(2); //[00 00]
//        }
        int action = 0; // 00 = end chat/no/decline, 01 == next/yes/accept
        int selection = -1;
        switch (op) {
            case ASK_PET:
            case ASK_PET_ALL: {
                action = slea.readByte() > 0 ? 1 : -1;
                if (action > 0) {
                    cm.setPetSN(slea.readLong());
                    selection = 1;
                }
                break;
            }
            case SAY: {
                slea.readInt();
                slea.readMapleAsciiString();
                action = slea.readByte();
                break;
            }
            case ASK_ANGELIC_BUSTER: {
                action = 1;
                selection = slea.readByte();
                break;
            }
            case ASK_NUMBER_KEYPAD:
            case ASK_BOX_TEXT:
            case ASK_TEXT:
                action = slea.readByte() > 0 ? 1 : -1;
                if (action > 0) {
                    String returnText = slea.readMapleAsciiString();
//                    if (player.isShowPacket()) {
//                        player.dropSpouseMessage(0x0A, "Npc對話 - lastMsg: " + lastSMType + " action: " + action + " Text: " + returnText);
//                    }
                    cm.setText(returnText);
                }
                break;
            case ASK_NUMBER:
                action = slea.readByte() > 0 ? 1 : -1;
                if (action > 0) {
                    selection = Math.max(slea.readInt(), 0);
                    cm.setNumber(selection);
                }
                break;
            case ASK_AVATAR_EX: {
                slea.readByte();
                slea.readByte(); // 確認變更
                action = slea.readByte() > 0 ? 1 : -1;
                if (action > 0) {
                    selection = slea.readByte();
                }
                break;
            }
            case ASK_ANDROID: {
                action = slea.readByte() > 0 ? 1 : -1;
                if (action > 0) {
                    selection = slea.readByte();
                }
                break;
            }
            case ASK_AVATAR_EX_ZERO: {
                slea.readByte(); // 確認變更
                action = slea.readByte() > 0 ? 1 : -1;
                if (action > 0) {
                    selection = slea.readByte();
                    cm.setNumber(slea.readByte());
                }
                break;
            }
            case ASK_MIX_HAIR_COLOR:
                action = slea.readByte();
                if (action == 0) {
                    break;
                }
                int itemId = slea.readInt();
                if (slea.readBool() && !JobConstants.is天使破壞者(player.getJob())) {
                    action = 0;
                    break;
                }
                if (slea.readBool() && !JobConstants.is神之子(player.getJob())) {
                    action = 0;
                    break;
                }
                int baseColor = slea.readInt();
                int mixColor = slea.readInt();
                int mixProp = slea.readInt();
                if (baseColor < 0 || baseColor > 7 || mixColor < 0 || mixColor > 7 || baseColor == mixColor || mixProp < 1 || mixProp > 99) {
                    action = 0;
                    break;
                }
                player.getTempValues().put("baseHairColor", baseColor);
                player.getTempValues().put("mixHairColor", mixColor);
                player.getTempValues().put("mixColorProp", mixProp);
                if (slea.readBool() && !JobConstants.is神之子(player.getJob())) {
                    action = 0;
                    player.getTempValues().remove("baseHairColor");
                    player.getTempValues().remove("mixHairColor");
                    player.getTempValues().remove("mixColorProp");
                    break;
                }
                baseColor = slea.readInt();
                mixColor = slea.readInt();
                mixProp = slea.readInt();
                if (baseColor < 0 || baseColor > 7 || mixColor < 0 || mixColor > 7 || baseColor == mixColor || mixProp < 1 || mixProp > 99) {
                    action = 0;
                    player.getTempValues().remove("baseHairColor");
                    player.getTempValues().remove("mixHairColor");
                    player.getTempValues().remove("mixColorProp");
                    break;
                }
                player.getTempValues().put("baseHairColor2", baseColor);
                player.getTempValues().put("mixHairColor2", mixColor);
                player.getTempValues().put("mixColorProp2", mixProp);
                break;
            case MONOLOGUE:
            case INPUT_UI: {
                action = 1;
                break;
            }
            case ASK_ACCEPT:
            case ASK_YES_NO: {
                selection = slea.readByte();
                action = selection;
                break;
            }
            case PLAY_MOVIE_CLIP: {
                selection = slea.readByte();
                action = selection == -1 ? -1 : 1;
                break;
            }
            case ASK_MENU: {
                action = slea.readByte() > 0 ? 1 : -1;
                if (action > 0) {
                    selection = Math.max(slea.readInt(), 0);
                }
                break;
            }
            case ASK_SELECT_MENU: {
                action = slea.readByte();
                selection = slea.readByte();
                break;
            }
            case ASK_IN_GAME_DIRECTION: {
                slea.readByte();
                action = slea.readByte();
                break;
            }
            case ASK_SLIDE_MENU: {
                action = slea.readByte();
                if (action > 0) {
                    selection = slea.readInt();
                }
                break;
            }
            default:
                action = slea.readByte();
//                if (slea.available() >= 4) {
//                    selection = slea.readInt();
//                } else if (slea.available() > 0) {
//                    selection = slea.readByte();
//                }
//                if (player.isShowPacket()) {
//                    player.dropSpouseMessage(0x14, "Npc對話 - lastMsg: " + lastSMType + " action: " + action + " selection: " + selection);
//                }
        }
        if (action == -1) {
            cm.dispose();
            return;
        }
        switch (cm.getType()) {
            case NPC:
            case ITEM:
            case EXPAND:
            case ON_USER_ENTER:
            case ON_FIRST_USER_ENTER: {
                NPCScriptManager.getInstance().action(c, (byte) action, lastSMType, selection);
                break;
            }
            case QUEST_START:
                NPCScriptManager.getInstance().startAction(c, (byte) action, lastSMType, selection);
                break;
            case QUEST_END:
                NPCScriptManager.getInstance().endAction(c, (byte) action, lastSMType, selection);
                break;
        }
    }

    /*
     * 全部裝備持久修復
     */
    public static void repairAll(MapleClient c) {
        Equip eq;
        double rPercentage;
        int price = 0;
        Map<String, Integer> eqStats;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Map<Equip, Integer> eqs = new HashMap<>();
        MapleInventoryType[] types = {MapleInventoryType.EQUIP, MapleInventoryType.EQUIPPED};
        for (MapleInventoryType type : types) {
            for (Item item : c.getPlayer().getInventory(type).newList()) {
                if (item instanceof Equip) { //redundant
                    eq = (Equip) item;
                    if (eq.getDurability() >= 0) {
                        eqStats = ii.getItemBaseInfo(eq.getItemId());
                        if (eqStats.containsKey("durability") && eqStats.get("durability") > 0 && eq.getDurability() < eqStats.get("durability")) {
                            rPercentage = (100.0 - Math.ceil((eq.getDurability() * 1000.0) / (eqStats.get("durability") * 10.0)));
                            eqs.put(eq, eqStats.get("durability"));
                            price += (int) Math.ceil(rPercentage * ii.getUnitPrice(eq.getItemId()) / (ii.getReqLevel(eq.getItemId()) < 70 ? 100.0 : 1.0));
                        }
                    }
                }
            }
        }
        if (eqs.size() <= 0 || c.getPlayer().getMeso() < price) {
            return;
        }
        c.getPlayer().gainMeso(-price, true);
        Equip ez;
        for (Entry<Equip, Integer> eqqz : eqs.entrySet()) {
            ez = eqqz.getKey();
            ez.setDurability(eqqz.getValue());
            c.getPlayer().forceUpdateItem(ez.copy());
        }
    }

    /*
     * 當個裝備持久修復
     */
    public static void repair(MaplePacketReader slea, MapleClient c) {
        if (slea.available() < 4) {
            return;
        }
        int position = slea.readInt(); //who knows why this is a int
        MapleInventoryType type = position < 0 ? MapleInventoryType.EQUIPPED : MapleInventoryType.EQUIP;
        Item item = c.getPlayer().getInventory(type).getItem((byte) position);
        if (item == null) {
            return;
        }
        Equip eq = (Equip) item;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Map<String, Integer> eqStats = ii.getItemBaseInfo(item.getItemId());
        if (eq.getDurability() < 0 || !eqStats.containsKey("durability") || eqStats.get("durability") <= 0 || eq.getDurability() >= eqStats.get("durability")) {
            return;
        }
        double rPercentage = (100.0 - Math.ceil((eq.getDurability() * 1000.0) / (eqStats.get("durability") * 10.0)));
        //drpq level 105 weapons - ~420k per %; 2k per durability point
        //explorer level 30 weapons - ~10 mesos per %
        int price = (int) Math.ceil(rPercentage * ii.getUnitPrice(eq.getItemId()) / (ii.getReqLevel(eq.getItemId()) < 70 ? 100.0 : 1.0)); // / 100 for level 30?
        if (c.getPlayer().getMeso() < price) {
            return;
        }
        c.getPlayer().gainMeso(-price, false);
        eq.setDurability(eqStats.get("durability"));
        c.getPlayer().forceUpdateItem(eq.copy());
    }

    /*
     * 更新任務信息
     */
    public static void UpdateQuest(MaplePacketReader slea, MapleClient c) {
        MapleQuest quest = MapleQuest.getInstance(slea.readShort());
        if (quest != null) {
            c.getPlayer().updateQuest(c.getPlayer().getQuest(quest), true);
        }
    }

    public static void UseItemQuest(MaplePacketReader slea, MapleClient c) {
        short slot = slea.readShort();
        int itemId = slea.readInt();
        Item item = c.getPlayer().getInventory(MapleInventoryType.ETC).getItem(slot);
        int qid = slea.readInt();
        MapleQuest quest = MapleQuest.getInstance(qid);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Pair<Integer, Map<Integer, Integer>> questItemInfo = null;
        boolean found = false;
        for (Item i : c.getPlayer().getInventory(MapleInventoryType.ETC)) {
            if (i.getItemId() / 10000 == 422) {
                questItemInfo = ii.questItemInfo(i.getItemId());
                if (questItemInfo != null && questItemInfo.getLeft() == qid && questItemInfo.getRight() != null && questItemInfo.getRight().containsKey(itemId)) {
                    found = true;
                    break; //i believe it's any order
                }
            }
        }
        if (quest != null && found && item != null && item.getQuantity() > 0 && item.getItemId() == itemId) {
            int newData = slea.readInt();
            MapleQuestStatus stats = c.getPlayer().getQuestNoAdd(quest);
            if (stats != null && stats.getStatus() == 1) {
                stats.setCustomData(String.valueOf(newData));
                c.getPlayer().updateQuest(stats, true);
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, slot, questItemInfo.getRight().get(item.getItemId()).shortValue(), false);
            }
        }
    }

    public static void RPSGame(MaplePacketReader slea, MapleClient c) {
        if (slea.available() == 0 || c.getPlayer() == null || c.getPlayer().getMap() == null || !c.getPlayer().getMap().containsNPC(9000019)) {
            if (c.getPlayer() != null && c.getPlayer().getRPS() != null) {
                c.getPlayer().getRPS().dispose(c);
            }
            return;
        }
        byte mode = slea.readByte();
        switch (mode) {
            case 0: //start game
            case 5: //retry
                if (c.getPlayer().getRPS() != null) {
                    c.getPlayer().getRPS().reward(c);
                }
                if (c.getPlayer().getMeso() >= 1000) {
                    c.getPlayer().setRPS(new RockPaperScissors(c, mode));
                } else {
                    c.announce(MaplePacketCreator.getRPSMode((byte) 0x08, -1, -1, -1));
                }
                break;
            case 1: //answer
                if (c.getPlayer().getRPS() == null || !c.getPlayer().getRPS().answer(c, slea.readByte())) {
                    c.announce(MaplePacketCreator.getRPSMode((byte) 0x0D, -1, -1, -1));
                }
                break;
            case 2: //time over
                if (c.getPlayer().getRPS() == null || !c.getPlayer().getRPS().timeOut(c)) {
                    c.announce(MaplePacketCreator.getRPSMode((byte) 0x0D, -1, -1, -1));
                }
                break;
            case 3: //continue
                if (c.getPlayer().getRPS() == null || !c.getPlayer().getRPS().nextRound(c)) {
                    c.announce(MaplePacketCreator.getRPSMode((byte) 0x0D, -1, -1, -1));
                }
                break;
            case 4: //leave
                if (c.getPlayer().getRPS() != null) {
                    c.getPlayer().getRPS().dispose(c);
                } else {
                    c.announce(MaplePacketCreator.getRPSMode((byte) 0x0D, -1, -1, -1));
                }
                break;
        }

    }

    /*
     * 使用小地圖下面的快速移動
     */
    public static void OpenQuickMoveNpc(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        int npcid = slea.readInt();
        if (c == null || chr == null || chr.hasBlockedInventory() || chr.isInBlockedMap() || chr.inEvent() || 875999999 == chr.getMapId() || npcid == 0) {
            chr.dropMessage(-1, "您當前已經和1個NPC對話了. 如果不是請輸入 @ea 命令進行解卡。");
            return;
        }
        for (MapleQuickMove mqm : chr.getMap().QUICK_MOVE) {
            if ((mqm.TESTPIA && !ServerConfig.TESPIA) || chr.getGmLevel() < mqm.GM_LEVEL) {
                continue;
            }
            if (mqm.NPC == npcid) {
                if (chr.getLevel() < mqm.MIN_LEVEL) {
                    chr.dropMessage(-1, "未達到可使用等級。");
                    return;
                }
                NPCScriptManager.getInstance().start(c, mqm.NPC, mqm.SCRIPT);
                break;
            }
        }
    }

    public static void OpenQuickMoveNpcScript(MaplePacketReader slea, MapleClient c, MapleCharacter chr) {
        final int selection = slea.readInt();
        int qmSize = 0;
        if (chr.getMap().QUICK_MOVE != null) {
            for (MapleQuickMove qm : chr.getMap().QUICK_MOVE) {
                if ((qm.TESTPIA && !ServerConfig.TESPIA) || chr.getGmLevel() < qm.GM_LEVEL) {
                    continue;
                }
                qmSize++;
            }
        }
        if (c == null || chr == null || chr.hasBlockedInventory() || chr.isInBlockedMap() || chr.inEvent() || 875999999 == chr.getMapId() || qmSize < selection + 1) {
            chr.dropMessage(-1, "您當前已經和1個NPC對話了. 如果不是請輸入 @ea 命令進行解卡。");
            return;
        }
        MapleQuickMove mqm = chr.getMap().QUICK_MOVE.get(selection);
        if ((mqm.TESTPIA && !ServerConfig.TESPIA) || chr.getGmLevel() < mqm.GM_LEVEL) {
            return;
        }
        if (chr.getLevel() < mqm.MIN_LEVEL) {
            chr.dropMessage(-1, "未達到可使用等級。");
            return;
        }
        if (mqm.NPC == 0 && (mqm.SCRIPT == null || mqm.SCRIPT.isEmpty())) {
            chr.dropMessage(-1, "這個選項無法使用，請回報給管理員。");
            return;
        }
        NPCScriptManager.getInstance().start(c, mqm.NPC, mqm.SCRIPT);
    }

    public static void ExitGaintBoss(MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory() || player.getEventInstance() == null || !player.getEventInstance().getName().startsWith(BossGiantVellud.class.getSimpleName())) {
            return;
        }
        NPCScriptManager.getInstance().start(c, 9390124);
    }
}
