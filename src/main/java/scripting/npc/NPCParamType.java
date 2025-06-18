package scripting.npc;

public enum NPCParamType {
    // 正常
    NORMAL((short) 0),
    // 無「停止對話」
    NO_ESC((short) 0x1),
    // 角色右側顯示
    PLAYER_RSIDE((short) 0x2),
    // NPC右側顯示
    ANOTHER_NPC((short) 0x4),
    // NPC面向右邊
    FACE_RIGHT((short) 0x8),
    // 角色面向右邊
    PLAYER_FACE_RIGHT((short) 0x10),
    // 下置顯示對話
    NPC_ENV((short) 0x20),
    NPC_N((short) 0x40),
    SHOW_ALL((short) 0x80),
    REPLACE((short) 0x100);

    private final short type;

    NPCParamType(final short type) {
        this.type = type;
    }

    public final short getType() {
        return this.type;
    }

    public final boolean check(int n) {
        return (n & type) != 0;
    }
}
