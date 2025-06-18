package constants.enums;

public enum CashItemRequestType {
    CashItemReq_LoadLocker(1),
    CashItemReq_LoadWish(2),
    CashItemReq_Buy(3),
    CashItemReq_Gift(4),
    CashItemReq_SetWish(5),
    CashItemReq_IncSlotCount(6),
    CashItemReq_IncTrunkCount(7),
    CashItemReq_IncCharSlotCount(8),
    CashItemReq_IncBuyCharCount(-2),
    CashItemReq_EnableEquipSlotExt(9),
    CashItemReq_CancelPurchase(10),
    CashItemReq_ConfirmPurchase(11),
    CashItemReq_Destroy(12),
    CashItemReq_MoveLtoS(13),
    CashItemReq_MoveStoL(14),
    CashItemReq_Expire(15),
    CashItemReq_Use(16),
    CashItemReq_StatChange(17),
    CashItemReq_SkillChange(18),
    CashItemReq_SkillReset(19),
    CashItemReq_DestroyPetItem(20),
    CashItemReq_SetPetName(21),
    CashItemReq_SetPetLife(22),
    CashItemReq_SetPetSkill(23),
    CashItemReq_SetItemName(24),
    CashItemReq_SetAndroidName(25),
    CashItemReq_SendMemo(26),
    CashItemReq_GetAdditionalCashShopInfo(27),
    CashItemReq_GetMaplePoint(28),
    CashItemReq_UseMaplePointFromGameSvr(29),
    CashItemReq_Rebate(30), // 換購
    UNKNOW_32(31),
    CashItemReq_UseCoupon(32), //
    CashItemReq_GiftCoupon(33),
    CashItemReq_Couple(34), // 情侶戒指 TMS223
    CashItemReq_BuyPackage(35),
    CashItemReq_GiftPackage(36),
    CashItemReq_BuyNormal(37),
    CashItemReq_ApplyWishListEvent(38),
    CashItemReq_MovePetStat(39),
    CashItemReq_FriendShip(40),
    CashItemReq_ShopScan(41),
    CashItemReq_ShopOptionScan(42),
    CashItemReq_ShopScanSell(43),
    CashItemReq_LoadPetExceptionList(44),
    CashItemReq_UpdatePetExceptionList(45),
    CashItemReq_DestroyScript(46),
    CashItemReq_CashItemCreate(47),
    CashItemReq_PurchaseRecord(48),
    CashItemReq_DeletePurchaseRecord(49),
    CashItemReq_TradeDone(50),
    CashItemReq_BuyDone(51),
    CashItemReq_TradeSave(52),
    CashItemReq_TradeLog(53),
    CashItemReq_CharacterSale(54),
    CashItemReq_SellCashItemBundleToShop(55),
    CashItemReq_Refund(56),
    CashItemReq_Destroy2(57), // 刪除道具
    UNKNOW_63(58),
    CashItemReq_UseCashRandomItem(59);

    private int code = -2;

    CashItemRequestType(int code) {
        this.code = code;
    }

    public static CashItemRequestType getByAction(int packetId) {
        CashItemRequestType[] values = CashItemRequestType.values();
        for (int i = 0, valuesLength = values.length; i < valuesLength; i++) {
            CashItemRequestType interaction = values[i];
            if (interaction.getValue() == packetId) {
                return interaction;
            }
        }
        return null;
    }

    public short getValue() {
        return (short) code;
    }

}
