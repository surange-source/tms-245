declare const cm : NPCConversationManager;
declare const im : NPCConversationManager;
declare const ms : NPCConversationManager;
declare class NPCConversationManager {
    getPlayer() : MapleCharacter

    getInventory(type: number) :any

    /**
     * 發送一個只有確定的NPC對話框
     * @param msg 要發送的消息
     */
    sendOk(msg: string) : void
}
declare class MapleCharacter {
    changeMap(mapId: number)
}