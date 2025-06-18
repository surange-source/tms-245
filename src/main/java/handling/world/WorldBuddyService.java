/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.world;

import client.BuddyList;
import client.BuddyList.BuddyAddResult;
import client.BuddyList.BuddyOperation;
import client.BuddylistEntry;
import client.MapleCharacter;
import client.inventory.Item;
import constants.enums.UserChatMessageType;
import handling.channel.ChannelServer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.MaplePacketCreator;
import packet.BuddyListPacket;

/**
 * @author PlayDK
 */
public class WorldBuddyService {

    private static final Logger log = LogManager.getLogger(WorldBuddyService.class);

    private WorldBuddyService() {
        log.info("正在啟動[WorldBuddyService]");
    }

    public static WorldBuddyService getInstance() {
        return SingletonHolder.instance;
    }

    public void buddyChat(int[] recipientCharacterIds, int cidFrom, String nameFrom, String chatText, Item item) {
        for (int characterId : recipientCharacterIds) {
            int ch = WorldFindService.getInstance().findChannel(characterId);
            if (ch > 0) {
                MapleCharacter chr = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterById(characterId);
                if (chr != null && chr.getBuddylist().containsVisible(cidFrom)) {
                    if (item == null) {
                        chr.getClient().announce(MaplePacketCreator.multiChat(nameFrom, chatText, 0));
                    } else {
                        chr.getClient().announce(MaplePacketCreator.multiItemChat(nameFrom, chatText, 0, item));
                    }
                    if (chr.getClient().isMonitored()) {
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.spouseMessage(UserChatMessageType.方塊洗洗樂, "[GM消息] " + nameFrom + " said to " + chr.getName() + " (好友): " + chatText));
                    }
                }
            }
        }
    }

    private void updateBuddies(int characterId, int channel, int[] buddies, boolean offline) {
        for (int buddy : buddies) {
            int ch = WorldFindService.getInstance().findChannel(buddy);
            if (ch > 0) {
                MapleCharacter chr = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterById(buddy);
                if (chr != null) {
                    BuddylistEntry ble = chr.getBuddylist().get(characterId);
                    if (ble != null && ble.isVisible()) {
                        int mcChannel;
                        if (offline) {
                            ble.setChannel(-1);
                            mcChannel = -1;
                        } else {
                            ble.setChannel(channel);
                            mcChannel = channel - 1;
                        }
                        chr.send(BuddyListPacket.updateBuddyChannel(ble.getCharacterId(), mcChannel, ble.getName()));
                    }
                }
            }
        }
    }

    public void buddyChanged(int chrId, int chrIdFrom, String name, int channel, BuddyOperation operation, String group) {
        int ch = WorldFindService.getInstance().findChannel(chrId);
        if (ch > 0) {
            MapleCharacter addChar = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterById(chrId);
            if (addChar != null) {
                BuddyList buddylist = addChar.getBuddylist();
                switch (operation) {
                    case 添加好友:
                        if (buddylist.contains(chrIdFrom)) {
                            buddylist.put(new BuddylistEntry(name, chrIdFrom, group, channel, true));
                            addChar.getClient().announce(BuddyListPacket.updateBuddylist(buddylist.getBuddies()));
                        }
                        break;
                    case 刪除好友:
                        if (buddylist.contains(chrIdFrom)) {
                            buddylist.remove(chrIdFrom);
                            addChar.getClient().announce(BuddyListPacket.updateBuddylist(buddylist.getBuddies()));
                        }
                        break;
                }
            }
        }
    }

    public BuddyAddResult requestBuddyAdd(String addName, int channelFrom, int chrIdFrom, String nameFrom, int levelFrom, int jobFrom) {
        int ch = WorldFindService.getInstance().findChannel(chrIdFrom);
        if (ch > 0) {
            MapleCharacter addChar = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterByName(addName);
            if (addChar != null) {
                BuddyList buddylist = addChar.getBuddylist();
                if (buddylist.isFull()) {
                    return BuddyAddResult.好友列表已滿;
                }
                if (!buddylist.contains(chrIdFrom)) {
                    buddylist.addBuddyRequest(addChar.getClient(), chrIdFrom, nameFrom, channelFrom, levelFrom, jobFrom);
                } else {
                    if (buddylist.containsVisible(chrIdFrom)) {
                        return BuddyAddResult.已經是好友關係;
                    }
                }
            }
        }
        return BuddyAddResult.添加好友成功;
    }

    public void loggedOn(int chrId, int channel, int[] buddies) {
        updateBuddies(chrId, channel, buddies, false);
    }

    public void loggedOff(int chrId, int channel, int[] buddies) {
        updateBuddies(chrId, channel, buddies, true);
    }

    private static class SingletonHolder {

        protected static final WorldBuddyService instance = new WorldBuddyService();
    }
}
