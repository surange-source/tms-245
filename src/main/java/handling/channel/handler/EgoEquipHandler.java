package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import constants.JobConstants;
import handling.opcode.SendPacketOpcode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.data.MaplePacketLittleEndianWriter;
import tools.data.MaplePacketReader;

import java.util.Collections;

public class EgoEquipHandler {

    private static final Logger log = LogManager.getLogger(EgoEquipHandler.class);

    public static void EgoEquipGaugeCompleteReturn(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory() || !JobConstants.is神之子(player.getJob())) {
            return;
        }
        final MaplePacketLittleEndianWriter mplew;
        (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_EgoEquipGaugeCompleteReturn);
        c.announce(mplew.getPacket());
    }

    public static void EgoEquipCreateUpgradeItemCostRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory() || !JobConstants.is神之子(player.getJob())) {
            return;
        }
        int id = slea.readInt();
        int mode = slea.readByte();
        final MaplePacketLittleEndianWriter mplew;
        (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_EgoEquipCreateUpgradeItemCostInfo);
        mplew.writeInt(id);
        mplew.writeInt(1000000);
        mplew.writeInt(600);
        mplew.writeBool(mode > 0);
        mplew.writeBool(false);
        mplew.writeBool(false);
        c.announce(mplew.getPacket());
    }

    public static void EgoEquipTalkRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory() || !JobConstants.is神之子(player.getJob())) {
            return;
        }
//        NPCScriptManager.getInstance().start(c, );
    }

    public static void EgoEquipCheckUpdateItemRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory() || !JobConstants.is神之子(player.getJob())) {
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean success = false;
        boolean checkRuc = true;
        final int type = slea.readInt();
        final int scrollSlot = slea.readInt();
        slea.readInt();
        final int equippedSlot = slea.readInt();
        final int id = slea.readInt();
        final Equip equipped = (Equip) player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) equippedSlot);
        final Item scroll = player.getInventory(MapleInventoryType.getByType((byte) type)).getItem((short) scrollSlot);
        if (equipped != null && scroll != null) {
            final int scrollType = scroll.getItemId() / 10000;
            final int scrollType2 = scroll.getItemId() / 100 % 100;
            switch (scrollType) {
                case 204: {
                    switch (scrollType2) {
                        case 87:
                        case 89: {
                            checkRuc = false;
                            break;
                        }
                        case 90: {
                            checkRuc = false;
                            break;
                        }
                        case 93: {
                            return;
                        }
                        case 96: {
                            checkRuc = false;
                            break;
                        }
                    }
                    break;
                }
                case 261: {
                    switch (scrollType2) {
                        case 1: {
                            return;
                        }
                        case 0: {
                            scroll.getItemId();
                        }
                        case 40: {
                            checkRuc = false;
                            break;
                        }
                    }
                    break;
                }
                default: {
                    log.warn((Object) new StringBuilder("[Ego Equip] Check Unknow scrollType:").append(scrollType2));
                    break;
                }
            }
            success = ItemScrollHandler.equipScrollCheck(equipped, scroll);
            if (checkRuc && equipped.getRestUpgradeCount() <= 0) {
                success = false;
                if (player.isDebug()) {
                    player.dropMessage(1, "[Upgrade Item] Equip RUC is zero");
                }
            }
        }
        final MaplePacketLittleEndianWriter mplew;
        (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_EgoEquipCheckUpgradeItemResult);
        mplew.writeBool(success);
        if (success) {
            mplew.writeInt(type);
            mplew.writeInt(id);
        } else {
            mplew.writeMapleAsciiString("無法使用卷軸的道具.");
            mplew.writeInt(0);
        }
        c.announce(mplew.getPacket());
    }

    public static void InheritanceInfoRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory() || !JobConstants.is神之子(player.getJob())) {
            return;
        }
        final Item weapon = player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) (-11));
        final Item shield = player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) (-10));
        if (weapon != null && weapon.getItemId() / 10000 == 157 && shield != null && shield.getItemId() / 10000 == 156) {
            final int n = weapon.getItemId() % 10 + 1;
            if (n < 10 && n == shield.getItemId() % 10 + 1) {
                final MaplePacketLittleEndianWriter mplew;
                (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_InheritanceInfo);
                mplew.write(1);
                mplew.write(1);
                mplew.writeInt((n > 7) ? 7 : n);
                mplew.writeInt(ItemConstants.getZeroWeaponNeededLevel(n));
                mplew.writeInt(weapon.getItemId() + 1);
                mplew.writeInt(shield.getItemId() + 1);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeInt(0);
                mplew.writeBool(n > 5);
                if (n > 5) {
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeInt(0);
                    mplew.writeInt(n);
                }
                c.announce(mplew.getPacket());
            }
        }
    }

    public static void InheritanceUpgradeRequest(MaplePacketReader slea, MapleClient c, MapleCharacter player) {
        if (player == null || player.getMap() == null || player.hasBlockedInventory() || !JobConstants.is神之子(player.getJob())) {
            return;
        }

        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        slea.readInt();
        final boolean b = slea.readByte() > 0;
        slea.readByte();
        slea.readByte();
        slea.readInt();
        final Equip weapon = (Equip) player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) (-11));
        final Equip shield = (Equip) player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) (-10));
        if (weapon != null && weapon.getItemId() / 10000 == 157 && shield != null && shield.getItemId() / 10000 == 156) {
            final int itemID = weapon.getItemId();
            final int itemID2 = shield.getItemId();
            final int n = itemID % 10 + 1;
            final int n2 = itemID2 % 10 + 1;
            if (n == n2 && n2 < 10 && player.getLevel() >= ItemConstants.getZeroWeaponNeededLevel(n)) {
                final Equip cl = ii.getEquipById(itemID + 1);
                final Equip cl2 = ii.getEquipById(itemID2 + 1);
                final Equip cl3 = ii.getEquipById(itemID);
                final Equip cl4 = ii.getEquipById(itemID2);
                cl.copyPotential(weapon);
                cl2.copyPotential(shield);
                if (b && n != 1) {
                    cl.inherit(weapon, cl3);
                    cl2.inherit(shield, cl4);
                    cl.setNirvanaFlame(weapon.getNirvanaFlame());
                    cl2.setNirvanaFlame(shield.getNirvanaFlame());
                }
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIPPED, weapon.getPosition(), weapon.getQuantity(), false, false);
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.EQUIPPED, shield.getPosition(), shield.getQuantity(), false, false);
                MapleInventoryManipulator.addItemAndEquip(c, cl, (short) (-11), "", -1L, -1, "Inheritance Upgrade", true);
                MapleInventoryManipulator.addItemAndEquip(c, cl2, (short) (-10), "", -1L, -1, "Inheritance Upgrade", true);
                MapleInventoryManipulator.updateItem(c, Collections.singletonList(cl), true);
                MapleInventoryManipulator.updateItem(c, Collections.singletonList(cl2), true);
                final MaplePacketLittleEndianWriter mplew;
                (mplew = new MaplePacketLittleEndianWriter()).writeOpcode(SendPacketOpcode.LP_InheritanceComplete);
                mplew.writeBool(false);
                c.announce(mplew.getPacket());
            }
        }
    }
}
