package constants.enums;

public enum InGameDirectionType {

    FORCED_ACTION(0),
    DELAY(1),
    EFFECT_PLAY(2),
    FORCED_INPUT(3),
    PARTERN_INPUT_REQUEST(4),
    CAMERA_MOVE(5),
    CAMERA_ON_CHARACTER(6),
    CAMERA_ZOOM(7),
    UNK_226_1(8),
    CAMERA_RELEASE_FROM_USER_POINT(9),
    VANSHEE_MODE(10),
    FACE_OFF(11),
    MONOLOGUE(12),
    MONOLOGUE_SCROLL(13),
    AVATARLOOK_SET(14),
    REMOVE_ADDITIONAL_EFFECT(15),
    UNK_226_2(16),
    UNK_226_3(17),
    FORCED_MOVE(18),
    FORCED_FLIP(19),
    INPUT_UI(20),
    UNK_226_4(21),
    UNK_226_5(22),
    UNK_226_6(23),
    UNK_226_7(24),
    UNK_226_8(25);

    private final int type;

    InGameDirectionType(final int type) {
        this.type = type;
    }

    public final int getType() {
        return this.type;
    }

    public static InGameDirectionType getByType(final int type) {
        for (InGameDirectionType igdt : values()) {
            if (type == igdt.getType()) {
                return igdt;
            }
        }
        return null;
    }
}
