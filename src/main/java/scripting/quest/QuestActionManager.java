/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.quest;

import client.MapleClient;
import constants.enums.ScriptType;
import handling.opcode.EffectOpcode;
import scripting.npc.NPCConversationManager;
import server.quest.MapleQuest;
import packet.EffectPacket;

import javax.script.Invocable;
import java.awt.*;

/**
 * @author PlayDK
 */
public class QuestActionManager extends NPCConversationManager {

    private final int quest;
    private final boolean start;

    public QuestActionManager(MapleClient c, int npc, int quest, boolean start, ScriptType type, Invocable iv) {
        super(c, npc, String.valueOf(quest), type, iv);
        this.quest = quest;
        this.start = start;
    }

    public int getQuest() {
        return quest;
    }

    public boolean isStart() {
        return start;
    }

    public void forceStartQuest() {
        forceStartQuest(false);
    }

    public void forceStartQuest(boolean isWorldShare) {
        forceStartQuest(null, isWorldShare);
    }

    @Override
    public void forceStartQuest(String customData) {
        forceStartQuest(customData, false);
    }

    @Override
    public void forceStartQuest(String customData, boolean isWorldShare) {
        MapleQuest.getInstance(quest).forceStart(getPlayer(), getNpc(), customData, isWorldShare);
    }

    public void forceCompleteQuest() {
        forceCompleteQuest(false);
    }

    public void forceCompleteQuest(boolean isWorldShare) {
        MapleQuest.getInstance(quest).forceComplete(getPlayer(), getNpc(), isWorldShare);
    }

    public void resetQuest() {
        MapleQuest.getInstance(quest).reset(getPlayer());
    }

    public String getQuestCustomData() {
        return getPlayer().getQuestNAdd(MapleQuest.getInstance(quest)).getCustomData();
    }

    public void setQuestCustomData(String customData) {
        getPlayer().getQuestNAdd(MapleQuest.getInstance(quest)).setCustomData(customData);
    }

    public void showCompleteQuestEffect() {
        getPlayer().getClient().announce(EffectPacket.showSpecialEffect(EffectOpcode.UserEffect_QuestComplete)); // 任務完成
        getPlayer().getMap().broadcastMessage(getPlayer(), EffectPacket.showForeignEffect(getPlayer().getId(), EffectOpcode.UserEffect_QuestComplete), false);
    }

    public final void spawnNpcForPlayer(int npcId, int x, int y) {
        getMap().spawnNpcForPlayer(getClient(), npcId, new Point(x, y));
    }
}
