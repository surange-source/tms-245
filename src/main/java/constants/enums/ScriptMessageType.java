package constants.enums;

public enum ScriptMessageType {

    SAY((byte) 0),
    SAY_IMAGE((byte) 2),
    ASK_YES_NO((byte) 3),
    ASK_TEXT((byte) 4),
    ASK_NUMBER((byte) 5),
    ASK_MENU((byte) 6),
    ASK_QUIZ((byte) 7),
    ASK_SPEED_QUIZ((byte) 8),
    ASK_ICQUIZ((byte) 9),
    ASK_AVATAR_EX((byte) 10),
    ASK_ANDROID((byte) 11),
    ASK_PET((byte) 12),
    ASK_PET_ALL((byte) 13),
    ASK_ACTION_PET_EVOLUTION((byte) 14),
    SCRIPT((byte) 15),
    ASK_ACCEPT((byte) 16),
    //
    ASK_BOX_TEXT((byte) 18),
    ASK_SLIDE_MENU((byte) 19),
    ASK_IN_GAME_DIRECTION((byte) 20),
    PLAY_MOVIE_CLIP((byte) 21),
    ASK_CENTER((byte) 22),
    //
    //
    ASK_OLYMPIC_QUIZ((byte) 25),
    //
    ASK_SELECT_MENU((byte) 27),
    ASK_ANGELIC_BUSTER((byte) 28),
    SAY_ILLUSTRATION((byte) 29),
    SAY_DUAL_ILLUSTRATION((byte) 30),
    ASK_YES_NO_ILLUSTRATION((byte) 31),
    ASK_ACCEPT_ILLUSTRATION((byte) 32),
    ASK_MENU_ILLUSTRATION((byte) 33),
    ASK_YES_NO_DUAL_ILLUSTRATION((byte) 34),
    ASK_ACCEPT_DUAL_ILLUSTRATION((byte) 35),
    ASK_MENU_DUAL_ILLUSTRATION((byte) 36),
    ASK_SSN2((byte) 37),
    ASK_AVATAR_EX_ZERO((byte) 38),
    MONOLOGUE((byte) 39),
    ASK_WEAPON_BOX((byte) 40),
    ASK_BOX_TEXT_BG_IMG((byte) 41),
    ASK_USER_SURVEY((byte) 42),
    SUCCESS_CAMERA((byte) 43),
    SAY_MIX_HAIR_COLOR((byte) 44),
    SAY_MIX_HAIR_COLOR_ZERO((byte) 45),
    ASK_MIX_HAIR_COLOR((byte) 46),
    ASK_MIX_HAIR_COLOR_NEW((byte) 47),
    //
    SAY_MIX_HAIR_COLOR_NEW((byte) 49),
    SAY_MIX_HAIR_COLOR_ZERO_NEW((byte) 50),
    NPC_ACTION((byte) 51),
    INPUT_UI((byte) 52),
    ASK_NUMBER_KEYPAD((byte) 53),
    SPIN_OFF_GUITAR_RHYTHM_GAME((byte) 54),
    ASK_GHOST_PARK_ENTER_UI((byte) 55),
    //---------------------------
    ASK_RANDOM_MIX_COLOR_LENS((byte) 69)
    ;

    private final byte type;

    ScriptMessageType(final byte type) {
        this.type = type;
    }

    public byte getType() {
        return type;
    }

    public static ScriptMessageType getByType(byte type) {
        ScriptMessageType[] values = values();
        for (int i = 0, valuesLength = values.length; i < valuesLength; i++) {
            ScriptMessageType it = values[i];
            if (it.type == type) {
                return it;
            }
        }
        return null;
    }
}
