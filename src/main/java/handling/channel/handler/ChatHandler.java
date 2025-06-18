package handling.channel.handler;

import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.MapleClient;
import client.MemoEntry;
import client.inventory.Item;
import configs.ServerConfig;
import constants.enums.MemoOptType;
import constants.enums.UserChatMessageType;
import database.tools.SqlTool;
import handling.channel.ChannelServer;
import handling.chat.ChatServer;
import handling.world.*;
import handling.world.messenger.MapleMessenger;
import handling.world.messenger.MapleMessengerCharacter;
import handling.world.messenger.MessengerType;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.commands.*;
import packet.MaplePacketCreator;
import tools.data.MaplePacketReader;
import packet.ChatPacket;
import packet.MTSCSPacket;
import packet.MessengerPacket;
import packet.WhisperPacket;

import java.util.List;

import static constants.enums.MessengerOptType.*;

/**
 * 所有的聊天消息處理器
 *
 * @author dongjak
 */
public class ChatHandler {

    private static final Logger log = LogManager.getLogger("PlayerChat");

    /**
     * 與當前地圖中的所有玩家聊天.如果消息以特定前綴開頭,則表示運行一個GM命令.
     *
     * @see PlayerRank
     * @see GMCommand
     * @see AdminCommand
     */
    public static void UserChat(MaplePacketReader slea, MapleClient c, MapleCharacter chr, boolean itemMsg) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        String text = slea.readMapleAsciiString();
        byte chatType = slea.readByte(); // 0 - /指令內容, 3 - 正常說話
        Item item = null;
        if (itemMsg && slea.readInt() == 1) {
            byte iType = (byte) slea.readInt();
            if (iType < 0 || iType > 5) {
                return;
            }
            short slot = (short) slea.readInt();
            item = chr.getInventory((slot < 0 ? -1 : iType)).getItem(slot);
        }
        if (text.length() > 0 && !CommandProcessor.processCommand(c, text, CommandType.NORMAL)) {
            log.info("[訊息] " + chr.getName() + " : " + text);
            if (chr.getCanTalk() || chr.isIntern()) {
                //Note: This patch is needed to prevent chat packet from being broadcast to people who might be packet sniffing.
                chr.getCheatTracker().checkMsg();
                byte[] packet;
                if (itemMsg) {
                    packet = MaplePacketCreator.getChatItemText(chr.getId(), text, chr.getName(), chr.isSuperGm(), chatType, false, 0, item);
                } else {
                    if (chatType == 0) {
                        packet = MaplePacketCreator.spouseMessage(chr.isIntern() ? UserChatMessageType.管理員對話 : UserChatMessageType.普通, "[指令] " + chr.getName() + " : " + text);
                    } else {
                        packet = MaplePacketCreator.getChatText(chr.getId(), text, chr.getName(), chr.isSuperGm(), chatType, true, -1);
                    }
                }
                if (chatType == 0) {
                    chr.getMap().broadcastGmLvMessage(null, packet);
                } else {
                    chr.getMap().broadcastMessage(packet, chr.getPosition());
                }
                if (chatType != 0 && chr.getMap().getId() == 910000000 && ServerConfig.CHANNEL_CHALKBOARD) {
                    chr.setMarketChalkboard(chr.getName() + " : " + text);
                }
            } else {
                c.announce(MaplePacketCreator.serverNotice(6, "You have been muted and are therefore unable to talk."));
            }
        }
    }

    public static void Others(MaplePacketReader slea, MapleClient c, MapleCharacter chr, boolean itemMsg) {
        int type = slea.readByte();
        byte numRecipients = slea.readByte();
        if (numRecipients <= 0) {
            return;
        }
        slea.readByte();

        int recipients[] = new int[numRecipients];

        for (byte i = 0; i < numRecipients; i++) {
            recipients[i] = slea.readInt();
        }
        String chattext = slea.readMapleAsciiString();
        if (chr == null || !chr.getCanTalk()) {
            c.announce(MaplePacketCreator.serverNotice(6, "You have been muted and are therefore unable to talk."));
            return;
        }
        Item item = null;
        if (itemMsg && slea.readInt() == 1) {
            byte iType = (byte) slea.readInt();
            if (iType < 0 || iType > 5) {
                return;
            }
            short slot = (short) slea.readInt();
            item = chr.getInventory((slot < 0 ? -1 : iType)).getItem(slot);
            slea.readMapleAsciiString(); // 道具名稱
        }
        log.info("[訊息] " + chr.getName() + " : " + chattext);
        if (c.isMonitored()) {
            String chattype = "未知";
            switch (type) {
                case 0:
                    chattype = "好友";
                    break;
                case 1:
                    chattype = "隊伍";
                    break;
                case 2:
                    chattype = "公會";
                    break;
                case 3:
                    chattype = "聯盟";
                    break;
                case 4:
                    chattype = "遠征隊";
                    break;
            }
            WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.spouseMessage(UserChatMessageType.方塊洗洗樂, "[GM消息] " + MapleCharacterUtil.makeMapleReadable(chr.getName()) + " 在 (" + chattype + ") 中說: " + chattext));
        }
        if (chattext.length() <= 0 || CommandProcessor.processCommand(c, chattext, CommandType.NORMAL)) {
            return;
        }
        chr.getCheatTracker().checkMsg();
        switch (type) {
            case 0:
                WorldBuddyService.getInstance().buddyChat(recipients, chr.getId(), chr.getName(), chattext, item);
                break;
            case 1:
                if (chr.getParty() == null) {
                    break;
                }
                WorldPartyService.getInstance().partyChat(chr.getParty().getPartyId(), chattext, chr.getName(), item);
                break;
            case 2:
                if (chr.getGuildId() <= 0) {
                    break;
                }
                WorldGuildService.getInstance().guildChat(chr.getName(), chr.getAccountID(), chr.getGuildId(), chr.getId(), chattext, item);
                break;
            case 3:
                if (chr.getGuildId() <= 0) {
                    break;
                }
                WorldAllianceService.getInstance().allianceChat(chr.getGuildId(), chr.getName(), chr.getId(), chattext, item);
                break;
            case 4:
                if (chr.getParty() == null || chr.getParty().getExpeditionId() <= 0) {
                    break;
                }
                WorldPartyService.getInstance().expedChat(chr.getParty().getExpeditionId(), chattext, chr.getName(), item);
                break;
        }
    }

    public static void Messenger(MaplePacketReader slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        if (chr == null) {
            return;
        }
        String input;
        MapleMessenger messenger = c.getPlayer().getMessenger();
        WorldMessengerService messengerService = WorldMessengerService.getInstance();
        int action = slea.readByte();
        switch (action) {
            case MSMP_Enter: // 打開
                if (messenger != null) { //如果玩家有聊天招待 就退出這個聊天招待 然後進行下面的操作
                    MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(c.getPlayer());
                    messengerService.leaveMessenger(messenger.getId(), messengerplayer);
                    c.getPlayer().setMessenger(null);
                }
//                int mode = slea.readByte(); //現在多了模式
                int maxMembers = slea.readByte(); //聊天招待的人數
                int messengerId = slea.readInt(); //聊天招待的工作ID
                //System.out.println("聊天招待操作 → 打開 模式: " + mode + " 最大人數: " + maxMembers + " messengerId: " + messengerId);
                if (messengerId == 0) { //創建
                    MapleMessengerCharacter messengerPlayer = new MapleMessengerCharacter(c.getPlayer());
                    MessengerType type = MessengerType.getMessengerType(maxMembers, true/*mode != 0x00*/);
                    if (type == null) {
                        System.out.println("聊天招待操作 → 打開 模式為空");
                        return;
                    }
//                    if (mode == 0x00) { //好友聊天 直接創建
                        c.getPlayer().setMessenger(messengerService.createMessenger(messengerPlayer, type, c.getPlayer().isIntern()));
//                    } else if (mode == 0x01) { //隨機聊天
//                        messenger = c.getPlayer().isIntern() ? messengerService.getRandomHideMessenger(type) : messengerService.getRandomMessenger(type);
//                        if (messenger != null) { //如果隨機的聊天招待不為空就加入這個聊天招待
//                            int position = messenger.getLowestPosition();
//                            if (position != -1) {
//                                c.getPlayer().setMessenger(messenger);
//                                messengerService.joinMessenger(messenger.getId(), new MapleMessengerCharacter(c.getPlayer()), c.getPlayer().getName(), c.getChannel());
//                            }
//                        } else { //如果找不到就創建這個隨機聊天招待
//                            c.getPlayer().setMessenger(messengerService.createMessenger(messengerPlayer, type, c.getPlayer().isIntern()));
//                            c.announce(MessengerPacket.joinMessenger(0xFF)); //發送提示 等待其他玩家加入..
//                        }
//                    }
                } else { // 接受別人的聊天邀請加入其他的聊天
                    messenger = messengerService.getMessenger(messengerId);
                    if (messenger != null) {
                        int position = messenger.getLowestPosition();
                        if (position != -1) {
                            c.getPlayer().setMessenger(messenger);
                            messengerService.joinMessenger(messenger.getId(), new MapleMessengerCharacter(c.getPlayer()), c.getPlayer().getName(), c.getChannel());
                        }
                    }
                }
                break;
            case MSMP_Leave: // 退出
                if (messenger != null) {
                    MapleMessengerCharacter messengerplayer = new MapleMessengerCharacter(c.getPlayer());
                    messengerService.leaveMessenger(messenger.getId(), messengerplayer);
                    c.getPlayer().setMessenger(null);
                }
                break;
            case MSMP_Invite: // 邀請
                if (messenger != null) {
                    int position = messenger.getLowestPosition();
                    if (position == -1) {
                        System.out.println("聊天招待操作 → 邀請錯誤 沒有空閒的位置");
                        return;
                    }
                    input = slea.readMapleAsciiString();
                    MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterByName(input);
                    if (target != null) { //在當前頻道中找到該玩家
                        if (!target.isIntern() || c.getPlayer().isIntern()) {
                            c.announce(MessengerPacket.messengerNote(input, 0x04, 0x01));
                            target.getClient().announce(MessengerPacket.messengerInvite(c.getPlayer().getName(), messenger.getId(), c.getChannel() - 1));
                        } else {
                            c.announce(MessengerPacket.messengerNote(input, 0x04, 0x01));
                        }
                    } else {
                        if (World.isConnected(input)) { //在其他頻道中找到該玩家
                            messengerService.messengerInvite(c.getPlayer().getName(), messenger.getId(), input, c.getChannel(), c.getPlayer().isIntern());
                        } else { //找不到這個玩家的信息
                            c.announce(MessengerPacket.messengerNote(input, 0x04, 0x00));
                        }
                    }
                }
                break;
            case MSMP_Blocked: // 拒絕別人的邀請
                String targeted = slea.readMapleAsciiString();
                MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterByName(targeted);
                if (target != null) { // 如果在當前頻道能找到邀請這的角色信息
                    if (target.getMessenger() != null) {
                        target.getClient().announce(MessengerPacket.messengerNote(c.getPlayer().getName(), 0x05, 0x00));
                    }
                } else { // 如果在其他頻道
                    if (!c.getPlayer().isIntern()) {
                        messengerService.declineChat(targeted, c.getPlayer().getName());
                    }
                }
                break;
            case MSMP_Chat: // 聊天
                if (messenger != null) {
                    String chattext = slea.readMapleAsciiString();
                    String position = null;
                    if (slea.available() > 0) {
                        position = slea.readMapleAsciiString();
                    }
                    messengerService.messengerChat(messenger.getId(), chattext, c.getPlayer().getName(), position);
                    if (messenger.isMonitored() && chattext.length() > c.getPlayer().getName().length() + 3) { //name : NOT name0 or name1
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.spouseMessage(UserChatMessageType.方塊洗洗樂, "[GM消息] " + MapleCharacterUtil.makeMapleReadable(c.getPlayer().getName()) + "(Messenger: " + messenger.getMemberNamesDEBUG() + ") said: " + chattext));
                    }
                }
                break;
            case 0x09: //對別人增加好感度
                if (messenger != null) {
//                    String name = slea.readMapleAsciiString();
//                    if (!messenger.getType().random) {
//                        System.out.println("聊天招待操作 → 對別人增加好感度錯誤 聊天室的類型不是隨機聊天 : " + !messenger.getType().random);
//                        return;
//                    }
//                    MapleCharacter targetPlayer = WorldFindService.getInstance().findCharacterByName(name);
//                    if (targetPlayer != null && targetPlayer.getId() != c.getPlayer().getId() && targetPlayer.getMessenger() != null && targetPlayer.getMessenger().getId() == messenger.getId()) {
//                        switch (c.getPlayer().canGiveLove(targetPlayer)) {
//                            case 0x00:
//                                if (Math.abs(targetPlayer.getLove() + 1) <= 99999) {
//                                    targetPlayer.addLove(1);
//                                    targetPlayer.getClient().announce(MessengerPacket.updateLove(targetPlayer.getLove()));
//                                }
//                                c.getPlayer().hasGiveLove(targetPlayer);
//                                c.announce(MessengerPacket.giveLoveResponse(0x00, c.getPlayer().getName(), targetPlayer.getName()));
//                                targetPlayer.getClient().announce(MessengerPacket.giveLoveResponse(0x00, c.getPlayer().getName(), targetPlayer.getName()));
//                                break;
//                            case 0x01:
//                                c.announce(MessengerPacket.giveLoveResponse(0x01, c.getPlayer().getName(), targetPlayer.getName()));
//                                break;
//                            case 0x02:
//                                c.announce(MessengerPacket.giveLoveResponse(0x02, c.getPlayer().getName(), targetPlayer.getName()));
//                                break;
//                        }
//                    }
                }
                //System.out.println("聊天招待操作 → 對別人增加好感度.");
                break;
            case MSMP_UserInfo: //查看對方的信息 也就是別人的好感度多少什麼的
                if (messenger != null) {
                    String name = slea.readMapleAsciiString();
                    MapleCharacter player = WorldFindService.getInstance().findCharacterByName(name);
                    if (player != null) {
                        if (player.getMessenger() != null && player.getMessenger().getId() == messenger.getId()) {
                            c.announce(MessengerPacket.messengerPlayerInfo(player));
                        }
                    } else {
                        c.announce(MessengerPacket.messengerNote(name, 0x04, 0x00));
                    }
                }
                //System.out.println("聊天招待操作 → 查看對方的信息.");
                break;
            case MSMP_Whisper: //在聊天招待中對別人說悄悄話
                if (messenger != null) {
                    String namefrom = slea.readMapleAsciiString(); //我的角色名字
                    String chattext = slea.readMapleAsciiString(); //對方的角色名字加我說的話
                    int position = slea.readByte(); //對方在聊天招待中的位置
                    messengerService.messengerWhisper(messenger.getId(), chattext, namefrom, position);
                }
                //System.out.println("聊天招待操作 → 在聊天招待中對別人說悄悄話.");
                break;
//            case 0x0F: //機器人說話?也就裡面的NPC自己說話
            //System.out.println("聊天招待操作 → 機器人說話?也就裡面的NPC自己說話.");
//                break;
            default:
//                System.out.println("聊天招待操作( 0x" + StringUtil.getLeftPaddedStr(Integer.toHexString(action).toUpperCase(), '0', 2) + " ) 未知.");
                break;
        }
    }

    public static void Whisper_Find(MaplePacketReader slea, MapleClient c, boolean itemMsg) {
        byte mode = slea.readByte();
        slea.readInt(); //ticks
        switch (mode) {
            case 0x44: //buddy
            case 0x05: { // Find
                String recipient = slea.readMapleAsciiString();
                MapleCharacter player = c.getChannelServer().getPlayerStorage().getCharacterByName(recipient);
                if (player != null) {
                    if (!player.isIntern() || c.getPlayer().isIntern() && player.isIntern()) {
                        c.announce(WhisperPacket.getFindReplyWithMap(player.getName(), player.getMap().getId(), mode == 0x44));
                    } else {
                        c.announce(WhisperPacket.getWhisperReply(recipient, (byte) 0));
                    }
                } else { // Not found
                    int ch = WorldFindService.getInstance().findChannel(recipient);
                    if (ch > 0) {
                        player = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(recipient);
                        if (player == null) {
                            break;
                        }
                        if (!player.isIntern() || (c.getPlayer().isIntern() && player.isIntern())) {
                            c.announce(WhisperPacket.getFindReply(recipient, (byte) ch, mode == 0x44));
                        } else {
                            c.announce(WhisperPacket.getWhisperReply(recipient, (byte) 0));
                        }
                        return;
                    }
                    if (ch == -10) {
                        c.announce(WhisperPacket.getFindReplyWithCS(recipient, mode == 0x44));
                    } else if (ch == -20) {
                        c.getPlayer().dropMessage(5, "'" + recipient + "' is at the MTS."); //idfc
                    } else {
                        c.announce(WhisperPacket.getWhisperReply(recipient, (byte) 0));
                    }
                }
                break;
            }
            case 0x06: { // Whisper
                if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
                    return;
                }
                if (!c.getPlayer().getCanTalk()) {
                    c.announce(MaplePacketCreator.serverNotice(6, "You have been muted and are therefore unable to talk."));
                    return;
                }
                c.getPlayer().getCheatTracker().checkMsg();
                String recipient = slea.readMapleAsciiString();
                Item item = null;
                if (itemMsg && slea.readInt() == 1) {
                    byte iType = (byte) slea.readInt();
                    if (iType < 0 || iType > 5) {
                        return;
                    }
                    short slot = (short) slea.readInt();
                    item = c.getPlayer().getInventory((slot < 0 ? -1 : iType)).getItem(slot);
                    slea.readMapleAsciiString(); // 道具名稱
                }
                String text = slea.readMapleAsciiString();
                int ch = WorldFindService.getInstance().findChannel(recipient);
                if (ch > 0) {
                    MapleCharacter player = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(recipient);
                    if (player == null) {
                        break;
                    }
                    player.getClient().announce(WhisperPacket.getWhisper(c.getPlayer().getName(), c.getChannel(), text, item));
                    if (!c.getPlayer().isIntern() && player.isIntern()) {
                        c.announce(WhisperPacket.getWhisperReply(recipient, (byte) 0));
                    } else {
                        c.announce(WhisperPacket.getWhisperReply(recipient, (byte) 1));
                    }
                    if (c.isMonitored()) {
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, c.getPlayer().getName() + " whispered " + recipient + " : " + text));
                    } else if (player.getClient().isMonitored()) {
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, c.getPlayer().getName() + " whispered " + recipient + " : " + text));
                    }
                } else {
                    c.announce(WhisperPacket.getWhisperReply(recipient, (byte) 0));
                }
            }
            break;
        }
    }

    public static void ShowLoveRank(MaplePacketReader slea, MapleClient c) {
        byte mode = slea.readByte();
        switch (mode) {
            case 0x07: //顯示楓之谷明星
                c.announce(MessengerPacket.showLoveRank(0x07));
                break;
            case 0x08: //顯示每週的楓之谷明星
                c.announce(MessengerPacket.showLoveRank(0x08));
                break;
        }
    }

    public static void EnterChatServer(MaplePacketReader slea, MapleClient c) {
        // 01 00 00 00 01 00 00 00 D5 97 7D 2E 4D 01 00 00 01 00 00 00 08 00 BD C5 B1 BE B2 DF BB AE 00 00 00 00 79 00 00 00 DE 00 00 00
        if (ChatServer.isShutdown()) {
            return;
        }
//        int accid = slea.readInt();
        slea.skip(17);
        int chrid = slea.readInt();
//        String chrname = slea.readMapleAsciiString();
        slea.skip(slea.readShort());

//        PlayerStorage client = ChatServer.getPlayerStorage();
        MapleCharacter chr = WorldFindService.getInstance().findCharacterById(chrid);
        if (chr == null) {
            return;
        }
        chr.setChatSession(c.getSession());
        c.announce(ChatPacket.getChatLoginAUTH());
        c.announce(ChatPacket.getChatLoginResult(chr.getClient().getAccID()));
    }

    /**
     * 處理好友聊天
     *
     * @param slea
     * @param c
     */
    public static void BuddyChat(MaplePacketReader slea, MapleClient c) {
        int playerid = slea.readInt();
        String chattext = slea.readMapleAsciiString();
        int numRecipients = slea.readInt();
        int recipients[] = new int[numRecipients];

        for (byte i = 0; i < numRecipients; i++) {
            recipients[i] = slea.readInt();
        }
//        WorldBuddyService.getInstance().buddyChat(recipients, playerid, chattext);
    }

    public static void MemoRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null) {
            return;
        }
        byte mode = slea.readByte();
        MemoOptType action = MemoOptType.getByType(mode);
        if (action == null) {
            log.warn("Unknown MemoOptType: " + mode);
            return;
        }
        switch (action) {
            case MemoReq_Load:
                List<MemoEntry> list = MapleCharacterUtil.getMemoByChrID(player.getId());
                c.announce(MTSCSPacket.MemoLoad(list));
                break;
            case MemoReq_Send:
                String distName = slea.readMapleAsciiString();
                String msg = slea.readMapleAsciiString();
                byte type = slea.readByte();
                int chrId = MapleCharacterUtil.getIdByName(distName);
                int warn = -1;
                if (chrId <= 0) {
                    warn = MemoOptType.Memo_Warning_Msg_Not_Name;
                } else if (chrId == player.getId()) {
                    warn = MemoOptType.Memo_Warning_Msg_NotSelf;
                } else if (type == 0 && player.getMeso() < 10000) {
                    warn = MemoOptType.Memo_Warning_Msg_Send_Limit;
                } else if (MapleCharacterUtil.getMemoByChrID(chrId).size() >= 200) {
                    warn = MemoOptType.Memo_Warning_Msg_Full;
                }
                if (warn >= 0) {
                    c.announce(MTSCSPacket.MemoWarn(warn));
                    return;
                }
                if (type > 0) {
                    slea.readInt();
                    Item item = player.getCashInventory().findByCashId((int) slea.readLong());
                    if (item == null || !item.getGiftFrom().equalsIgnoreCase(distName)) {
                        break;
                    }
                } else {
                    player.gainMeso(-10000L, false);
                    c.announce(MTSCSPacket.MemoSend());
                }
                MapleCharacterUtil.sendNote(chrId, player.getName(), msg, type);
                break;
            case MemoReq_Delete:
                final short size = slea.readShort();
                slea.readByte();
                for (short n = 0; n < size; ++n) {
                    slea.readInt();
                    if (slea.readByte() == 1) {
                        player.addFame(1);
                        c.announce(MaplePacketCreator.getShowFameGain(1));
                    }
                }
                SqlTool.update("DELETE FROM `character_memo` WHERE characters_id = ?", new Object[]{player.getId()});
                c.announce(MTSCSPacket.MemoDelete());
                break;
            default:
                log.warn("Unhandled MemoOptType: " + action.name());
                break;
        }
    }
}
