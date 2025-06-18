package handling.opcode;

import tools.data.WritableIntValueHolder;

public enum PartyOpcode {

    PartyReq_LoadParty(0),
    PartyReq_CreateNewParty(1),
    PartyReq_WithdrawParty(2),
    PartyReq_JoinParty(3),
    PartyReq_InviteParty(4),
    PartyReq_InviteIntrusion(5),
    PartyReq_KickParty(6),
    PartyReq_ChangePartyBoss(7),
    PartyReq_ApplyParty(8),
    PartyReq_SetAppliable(9),
    PartyReq_ClearIntrusion(10),
    PartyReq_CreateNewParty_Group(11),
    PartyReq_JoinParty_Group(-2),
    PartyReq_PartySetting(12),
    PartyReq_LoadStarPlanetPoint(13),
    PartyRes_LoadParty_Done(14),
    PartyRes_CreateNewParty_Done(15),
    PartyRes_CreateNewParty_AlreayJoined(16),
    PartyRes_CreateNewParty_Beginner(17),
    PartyRes_CreateNewParty_Unknown(18),
    PartyRes_CreateNewParty_byNonBoss(19),
    PartyRes_WithdrawParty_Done(20),
    PartyRes_WithdrawParty_NotJoined(21),
    PartyRes_WithdrawParty_Unknown(22),
    PartyRes_JoinParty_Done(23),
    PartyRes_JoinParty_Done2(24),
    PartyRes_JoinParty_AlreadyJoined(25),
    PartyRes_JoinParty_AlreadyFull(26),
    PartyRes_JoinParty_OverDesiredSize(27),
    PartyRes_JoinParty_UnknownUser(28),
    PartyRes_JoinParty_Unknown(29),
    PartyRes_JoinIntrusion_Done(31),
    PartyRes_JoinIntrusion_UnknownParty(32),
    PartyRes_InviteParty_Sent(33),
    PartyRes_InviteParty_BlockedUser(34),
    PartyRes_InviteParty_AlreadyInvited(35),
    PartyRes_InviteParty_AlreadyInvitedByInviter(36),
    PartyRes_InviteParty_Rejected(37),
    PartyRes_InviteParty_Accepted(38),
    PartyRes_InviteIntrusion_Sent(41),
    PartyRes_InviteIntrusion_BlockedUser(42),
    PartyRes_InviteIntrusion_AlreadyInvited(43),
    PartyRes_InviteIntrusion_AlreadyInvitedByInviter(44),
    PartyRes_InviteIntrusion_Rejected(45),
    PartyRes_InviteIntrusion_Accepted(46),
    PartyRes_KickParty_Done(47),
    PartyRes_KickParty_FieldLimit(48),
    PartyRes_KickParty_Unknown(49),
    PartyRes_ChangePartyBoss_Done(51),
    PartyRes_ChangePartyBoss_NotSameField(52),
    PartyRes_ChangePartyBoss_NoMemberInSameField(53),
    PartyRes_ChangePartyBoss_NotSameChannel(54),
    PartyRes_ChangePartyBoss_Unknown(55),
    PartyRes_AdminCannotCreate(56),
    PartyRes_AdminCannotInvite(57),
    PartyRes_InAnotherWorld(58),
    PartyRes_InAnotherChanelBlockedUser(59),
    PartyRes_UserMigration(61),
    PartyRes_ChangeLevelOrJob(62),
    PartyRes_UpdateShutdownStatus(63),
    PartyRes_SetAppliable(64),
    PartyRes_FailToSelectPQReward(65),
    PartyRes_ReceivePQReward(66),
    PartyRes_FailToRequestPQReward(67),
    PartyRes_CanNotInThisField(68),
    PartyRes_ApplyParty_Sent(69),
    PartyRes_ApplyParty_UnknownParty(70),
    PartyRes_ApplyParty_BlockedUser(71),
    PartyRes_ApplyParty_AlreadyApplied(72),
    PartyRes_ApplyParty_AlreadyAppliedByApplier(73),
    PartyRes_ApplyParty_AlreadyFull(74),
    PartyRes_ApplyParty_Rejected(75),
    PartyRes_ApplyParty_Accepted(76),
    PartyRes_FoundPossibleMember(77),
    PartyRes_FoundPossibleParty(78),
    PartyRes_PartySettingDone(80),
    PartyInfo_TownPortalChanged(83),
    PartyInfo_OpenGate(84)
    ;

    private final short type;

    PartyOpcode(final int type) {
        this.type = (short) type;
    }

    public short getValue() {
        return type;
    }

    public static PartyOpcode getByAction(short type) {
        for (PartyOpcode it : values()) {
            if (it == PartyReq_JoinParty_Group) {
                continue;
            }
            if (it.type == type) {
                return it;
            }
        }
        return null;
    }

}