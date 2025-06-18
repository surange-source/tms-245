package constants.enums;

import packet.BuddyListPacket;

public enum FriendOperationMode {

    FriendReq_LoadFriend((short) 0),
    FriendReq_SetFriend((short) 1),
    FriendReq_AcceptFriend((short) 2),
    FriendReq_AcceptAccountFriend((short) 3),
    FriendReq_DeleteFriend((short) 4),
    FriendReq_DeleteAccountFriend((short) 5),
    FriendReq_RefuseFriend((short) 6),
    FriendReq_RefuseAccountFriend((short) 7),
    FriendReq_NotifyLogin((short) 8),
    FriendReq_NotifyLogout((short) 9),
    FriendReq_IncMaxCount((short) 10),
    FriendReq_ConvertAccountFriend((short) 11),
    FriendReq_ModifyFriend((short) 12),
    FriendReq_ModifyFriendGroup((short) 13),
    FriendReq_ModifyAccountFriendGroup((short) 14),
    FriendReq_SetOffline((short) 15),
    FriendReq_SetOnline((short) 16),
    FriendReq_SetBlackList((short) 17),
    FriendReq_DeleteBlackList((short) 18),
    FriendRes_LoadFriend_Done((short) 19),
    FriendRes_LoadAccountIDOfCharacterFriend_Done((short) 20),
    // 21
    // 22
    FriendRes_NotifyChange_FriendInfo((short) 23),
    FriendRes_Invite((short) 24),
    FriendRes_SetFriend_Done((short) 25),
    FriendRes_SetFriend_FullMe((short) 26),
    FriendRes_SetFriend_FullOther((short) 27),
    FriendRes_SetFriend_AlreadySet((short) 28),
    FriendRes_SetFriend_AlreadyRequested((short) 29),
    FriendRes_SetFriend_Ready((short) 30),
    FriendRes_SetFriend_CantSelf((short) 31),
    FriendRes_SetFriend_Master((short) 32),
    FriendRes_SetFriend_UnknownUser((short) 33),
    FriendRes_SetFriend_Unknown((short) 34),
    FriendRes_SetFriend_RemainCharacterFriend((short) 35),
    // 36
    FriendRes_SetMessengerMode((short) 37),
    FriendRes_SendSingleFriendInfo((short) 38),
    FriendRes_AcceptFriend_Unknown((short) 39),
    FriendRes_DeleteFriend_Done((short) 40),
    FriendRes_DeleteFriend_Unknown((short) 41),
    FriendRes_Notify((short) 42),
    FriendRes_NotifyNewFriend((short) 43),
    FriendRes_IncMaxCount_Done((short) 44),
    FriendRes_IncMaxCount_Unknown((short) 45),
    FriendRes_RefuseFriend((short) 46);

    private final short type;

    FriendOperationMode(final short type) {
        this.type = type;
    }

    public short getValue() {
        return type;
    }

    public static FriendOperationMode getByAction(short type) {
        for (FriendOperationMode it : values()) {
            if (it.type == type) {
                return it;
            }
        }
        return null;
    }

    public final byte[] getPacket() {
        return BuddyListPacket.buddylistMessage(type);
    }
}
