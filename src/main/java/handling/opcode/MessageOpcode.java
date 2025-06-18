package handling.opcode;

public final class MessageOpcode {

    // 獲得道具
    public static final byte MS_DropPickUpMessage = 0;
    // 更新任務狀態
    public static final byte MS_QuestRecordMessage = 1;
    // 商城道具到期
    public static final byte MS_CashItemExpireMessage = 2;
    // 獲得經驗
    public static final byte MS_IncEXPMessage = 3;
    // 獲得SP
    public static final byte MS_IncSPMessage = 4;
    // 獲得人氣
    public static final byte MS_IncPOPMessage = 5;
    // 獲得楓幣
    public static final byte MS_IncMoneyMessage = 6;
    // 獲得公會GP點
    public static final byte MS_IncGPMessage = 7;
    // 獲得貢獻度
    public static final byte MS_IncCommitmentMessage = 8;
    // 顯示消耗品描述
    public static final byte MS_GiveBuffMessage = 9;
    // 非商城道具到期
    public static final byte MS_GeneralItemExpireMessage = 10;
    // 系統紅字公告
    public static final byte MS_SystemMessage = 11;
    // 更新任務信息
    public static final byte MS_QuestRecordExMessage = 13;
    // 更新帳號任務信息
    public static final byte MS_WorldShareRecordMessage = 14;
    public static final byte MS_ItemProtectExpireMessage = 15;
    public static final byte MS_ItemExpireReplaceMessage = 16;
    public static final byte MS_ItemAbilityTimeLimitedExpireMessage = 17;
    // 技能到期
    public static final byte MS_SkillExpireMessage = 18;
    // 獲得傾向熟練度
    public static final byte MS_IncNonCombatStatEXPMessage = 19;
    public static final byte MS_Unk0x15 = 20;
    // 超過今天可獲得傾向熟練度
    public static final byte MS_LimitNonCombatStatEXPMessage = 21;
    //
    public static final byte MS_RecipeExpireMessage = 22;
    // 移除機器人心臟
    public static final byte MS_AndroidMachineHeartAlertMessage = 23;
    // 休息後恢復了疲勞度
    public static final byte MS_IncFatigueByRestMessage = 24;
    public static final byte MS_IncPvPPointMessage = 25;
    // 系統灰字公告
    public static final byte MS_PvPItemUseMessage = 26;
    // 配偶提示
    public static final byte MS_WeddingPortalError = 27;
    public static final byte MS_PvPHardCoreExpMessage = 28;
    public static final byte MS_NoticeAutoLineChanged = 29;
    public static final byte MS_EntryRecordMessage = 30;
    public static final byte MS_EvolvingSystemMessage = 31;
    public static final byte MS_EvolvingSystemMessageWithName = 32;
    public static final byte MS_CoreInvenOperationMessage = 33;
    public static final byte MS_NxRecordMessage = 34;
    // 神之子不能獲得楓幣
    public static final byte MS_BlockedBehaviorTypeMessage = 35;
    // 獲得WP
    public static final byte MS_IncWPMessage = 36;
    // 不能獲得更多的WP
    public static final byte MS_MaxWPMessage = 37;
    // 連續擊殺
    public static final byte MS_StylishKillMessage = 38;
    public static final byte MS_BarrierEffectIgnoreMessage = 39;
    public static final byte MS_ExpiredCashItemResultMessage = 40;
    public static final byte MS_CollectionRecordMessage = 40; // int String
    public static final byte MS_RandomChanceMessage = 41;
}
