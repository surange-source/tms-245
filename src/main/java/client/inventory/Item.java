package client.inventory;

import configs.ServerConfig;
import constants.ItemConstants;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.MapleItemInformationProvider;

public class Item implements Comparable<Item> {

    protected static final Logger log = LogManager.getLogger("Item");
    private int itemID; //道具的ID
    private short position; //道具的位置
    private short quantity; //道具的數量
    private int attribute; //道具的狀態
    private long expiration = -1; //道具的時間
    private long inventoryitemid = -1; //道具在SQL中的ID
    private FamiliarCard familiarCard = null;
    private MaplePet pet = null; //道具是否是寵物
    private int sn; //商城道具的唯一ID
    private String owner = ""; //道具的所有者
    private String GameMaster_log = ""; //道具的日誌信息
    private String giftFrom = ""; //道具禮物獲得信息
    private int familiarid = 0;
    private short espos;
    private short extendSlot = -1;

    public Item(int itemID, short position, short quantity, int attribute, int sn, short espos) {
        super();
        this.itemID = itemID;
        this.position = position;
        this.quantity = quantity;
        this.attribute = attribute;
        this.sn = sn;
    }

    public Item(int itemID, short position, short quantity, int attribute) {
        super();
        this.itemID = itemID;
        this.position = position;
        this.quantity = quantity;
        this.attribute = attribute;
        this.sn = -1;
    }

    public Item(int itemID, short position, short quantity) {
        super();
        this.itemID = itemID;
        this.position = position;
        this.quantity = quantity;
        this.sn = -1;
    }

    /*
     * 回購道具需要此功能
     */
    public Item copyWithQuantity(short quantitys) {
        Item ret = new Item(itemID, position, quantitys, attribute, sn, espos);
        ret.pet = pet;
        ret.owner = owner;
        ret.sn = sn;
        ret.GameMaster_log = GameMaster_log;
        ret.expiration = expiration;
        ret.giftFrom = giftFrom;
        ret.extendSlot = extendSlot;
        return ret;
    }

    public Item copy() {
        Item ret = new Item(itemID, position, quantity, attribute, sn, espos);
        ret.pet = pet;
        ret.owner = owner;
        ret.sn = sn;
        ret.GameMaster_log = GameMaster_log;
        ret.expiration = expiration;
        ret.giftFrom = giftFrom;
        ret.familiarCard = familiarCard;
        ret.familiarid = familiarid;
        ret.extendSlot = extendSlot;
        return ret;
    }

    public int getItemId() {
        return itemID;
    }

    public void setItemId(int id) {
        this.itemID = id;
    }

    public short getPosition() {
        return position;
    }

    public void setPosition(short position) {
        this.position = position;
        if (pet != null) {
            pet.setInventoryPosition(position);
        }
    }

    public int getAttribute() {
        return attribute;
    }

    public int getCAttribute() {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int ret = attribute;
        if (ServerConfig.CAN_CUT_ITEMS_LIST.contains(itemID)) {
            if (!ItemAttribute.TradeOnce.check(ret)) {
                if (ii.isTradeBlock(itemID)) {
                    if (!ii.isTradeAvailable(itemID) && !ii.isPKarmaEnabled(itemID)) {
                        ret |= ItemAttribute.AnimaCube.getValue();
                    }
                } else if (ii.isEquipTradeBlock(itemID)) {
                    if (ItemAttribute.TradeBlock.check(ret)) {
                        ret |= ItemAttribute.AnimaCube.getValue();
                    }
                } else if (!ii.isTradeAvailable(itemID)) {
                    ret |= ItemAttribute.AnimaCube.getValue();
                    ret |= ItemAttribute.TradeBlock.getValue();
                }
            }
        } else if (ServerConfig.ACCOUNT_SHARE_ITEMS_LIST.contains(itemID)) {
            if (!ItemAttribute.AccountSharable.check(ret) && !ii.isAccountShared(itemID) && !ii.isSharableOnce(itemID) && !ii.isShareTagEnabled(itemID)) {
                ret |= ItemAttribute.AccountSharable.getValue();
                if (!ii.isTradeBlock(itemID)) {
                    ret |= ItemAttribute.TradeBlock.getValue();
                }
                if (!ii.isCash(itemID)) {
                    ret |= ItemAttribute.TradeOnce.getValue();
                }
            }
        } else if (this instanceof Equip && ((Equip) this).isMvpEquip()) {
            ret |= ItemAttribute.TradeBlock.getValue();
            ret |= ItemAttribute.TradeOnce.getValue();
        }
        return ret;
    }

    public void setAttribute(int attribute) {
        this.attribute = attribute;
    }

    public short getQuantity() {
        return quantity;
    }

    public void setQuantity(short quantity) {
        this.quantity = quantity;
    }

    public byte getType() {
        return 2; // An Item
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void removeAttribute(int flag) {
        this.attribute &= ~flag;
    }

    public void addAttribute(int flag) {
        this.attribute |= flag;
    }

    public long getTrueExpiration() {
        return expiration;
    }

    public long getExpiration() {
        return expiration <= 0 ? expiration : ((expiration / 1000) * 1000);
    }

    public void setExpiration(long expire) {
        this.expiration = expire;
    }

    public String getGMLog() {
        return GameMaster_log;
    }

    public void setGMLog(String GameMaster_log) {
        this.GameMaster_log = GameMaster_log;
    }

    public int getFamiliarid() {
        return familiarid;
    }

    public void setFamiliarid(int familiarid) {
        this.familiarid = familiarid;
    }

    public FamiliarCard getFamiliarCard() {
        return familiarCard;
    }

    public void setFamiliarCard(FamiliarCard familiarCard) {
        this.familiarCard = familiarCard;
    }

    /**
     * 有這個ID的道具必須是裝備道具 且不是點裝 且這個ID小於等於0 且這個道具為裝備道具類型
     */
    public boolean hasSetOnlyId() {
        return sn <= 0 && !MapleItemInformationProvider.getInstance().isCash(itemID) && itemID / 1000000 == 1;
    }

    public int getSN() {
        if (sn <= 0 && ItemConstants.類型.裝備(itemID)) {
            sn = MapleInventoryIdentifier.getInstance();
        }
        return /*(inventoryitemid << 32) + */sn;
    }

    public void setSN(int sn) {
        this.sn = sn;
    }

    public long getInventoryId() {
        return inventoryitemid;
    }

    public void setInventoryId(long ui) {
        this.inventoryitemid = ui;
    }

    public MaplePet getPet() {
        return pet;
    }

    public void setPet(MaplePet pet) {
        this.pet = pet;
        if (pet != null && sn != pet.getUniqueId() && pet.getUniqueId() > 0) {
            sn = pet.getUniqueId();
        }
    }

    public String getGiftFrom() {
        return giftFrom;
    }

    public void setGiftFrom(String gf) {
        this.giftFrom = gf;
    }

    public short getESPos() {
        return espos;
    }

    public void setESPos(short espos) {
        this.espos = espos;
    }

    public short getExtendSlot() {
        return extendSlot;
    }

    public void setExtendSlot(short extendSlot) {
        this.extendSlot = extendSlot;
    }

    /*
         * 道具是否為技能皮膚
         */
    public boolean isSkillSkin() {
        return itemID / 1000 == 1603;
    }

    @Override
    public int compareTo(Item other) {
        if (Math.abs(position) < Math.abs(other.getPosition())) {
            return -1;
        } else if (Math.abs(position) == Math.abs(other.getPosition())) {
            return 0;
        } else {
            return 1;
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Item)) {
            return false;
        }
        Item ite = (Item) obj;
        return sn == ite.getSN() && itemID == ite.getItemId() && quantity == ite.getQuantity() && Math.abs(position) == Math.abs(ite.getPosition());
    }

    @Override
    public String toString() {
        return "物品: " + MapleItemInformationProvider.getInstance().getName(itemID) + "(" + itemID + ")[" + quantity + "個]";
    }

    public String getName() {
        return MapleItemInformationProvider.getInstance().getName(itemID);
    }
}
