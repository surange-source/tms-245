package scripting.npc;

import client.MapleClient;
import client.inventory.Item;
import configs.BossConfig;
import configs.ServerConfig;
import constants.ItemConstants;
import constants.enums.ConversationType;
import constants.enums.ScriptType;
import constants.enums.UserChatMessageType;
import org.apache.logging.log4j.Logger;
import scripting.AbstractScriptManager;
import scripting.DefaultScript;
import scripting.item.ItemActionManager;
import scripting.quest.QuestActionManager;
import server.quest.MapleQuest;
import tools.StringUtil;

import javax.script.Invocable;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.util.Map;
import java.util.WeakHashMap;

public class NPCScriptManager extends AbstractScriptManager {

    private static final Logger log = AbstractScriptManager.log;
    private final Map<MapleClient, NPCConversationManager> cms = new WeakHashMap<>();
    private static final NPCScriptManager instance = new NPCScriptManager();

    public static NPCScriptManager getInstance() {
        return instance;
    }

    public void start(MapleClient c, int npcId) {
        start(c, npcId, null);
    }

    public void start(MapleClient c, int npcId, String extend) {
        start(c, npcId, extend, (byte) 1, (byte) -1, 0);
    }

    public void start(MapleClient c, int npcId, String extend, byte mode, byte type, int selection) {
        if (cms.containsKey(c)) {
            dispose(c);
            return;
        }
        Invocable iv;
        String scriptPath;
        if (extend == null || extend.isEmpty()) {
            scriptPath = String.valueOf(npcId);
            if ((iv = getDefaultInvocable("npc", scriptPath)) == null) {
                scriptPath = "npc/" + scriptPath + ".js";
                iv = getInvocable(scriptPath, c, true);
            } else {
                scriptPath = "<default>/npc/" + scriptPath;
            }
        } else if (npcId > 0 && StringUtil.isNaturalNumber(extend)) {
            scriptPath = npcId + "_" + extend;
            if ((iv = getDefaultInvocable("npc", scriptPath)) == null) {
                scriptPath = "npc/" + scriptPath + ".js";
                iv = getInvocable(scriptPath, c, true);
            } else {
                scriptPath = "<default>/npc/" + scriptPath;
            }
        } else {
            if ((iv = getDefaultInvocable("extend", extend)) == null) {
                scriptPath = "extend/" + extend + ".js";
                iv = getInvocable(scriptPath, c, true);
            } else {
                scriptPath = "<default>/extend/" + extend;
            }
        }
        if (iv == null) {
            c.getPlayer().dropMessage(5, "[NPC Script] Cannot find script: " + scriptPath);
            dispose(c);
            return;
        }
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropMessage(5, "[NPC Script] Start npc script: " + scriptPath);
        }

        NPCConversationManager cm = new NPCConversationManager(c, npcId, extend, ScriptType.NPC, iv);
        cm.setScriptPath(scriptPath);
        cms.put(c, cm);
        assert iv instanceof ScriptEngine || iv instanceof DefaultScript;
        if (iv instanceof ScriptEngine) {
            ((ScriptEngine) iv).getBindings(ScriptContext.ENGINE_SCOPE).put("cm", cm);
        } else {
            ((DefaultScript) iv).put(cm);
        }
        c.getPlayer().setConversation(ConversationType.TALK_TO_NPC);
        c.setClickedNPC();
        try {
            if (type < 0) {
                try {
                    iv.invokeFunction("start");
                } catch (NoSuchMethodException nsme) {
                    type = 0;
                }
            }
            if (type >= 0) {
                iv.invokeFunction("action", mode, type, selection);
            }
        } catch (Exception e) {
            log.error("[NPC Script] Exception occurred. Path: " + scriptPath + ".\r\nException: ", e);
            dispose(c);
            notice(c, scriptPath);
        }
    }

    public void startItem(MapleClient c, int npc, Item item) {
        startItem(c, npc, null, item);
    }

    public void startItem(MapleClient c, int npc, String extend, Item item) {
        if (cms.containsKey(c)) {
            dispose(c);
            return;
        }
        Invocable iv;
        String scriptPath;
        if (extend == null || extend.isEmpty()) {
            scriptPath = String.valueOf(item.getItemId());
            if ((iv = getDefaultInvocable("item", scriptPath)) == null) {
                scriptPath = "item/" + scriptPath + ".js";
                iv = getInvocable(scriptPath, c, true);
            } else {
                scriptPath = "<default>/item/" + scriptPath;
            }
        } else if (item.getItemId() > 0 && StringUtil.isNaturalNumber(extend)) {
            scriptPath = item.getItemId() + "_" + extend;
            if ((iv = getDefaultInvocable("item", scriptPath)) == null) {
                scriptPath = "item/" + scriptPath + ".js";
                iv = getInvocable(scriptPath, c, true);
            } else {
                scriptPath = "<default>/item/" + scriptPath;
            }
        } else {
            if ((iv = getDefaultInvocable("item", extend)) == null) {
                scriptPath = "item/" + extend + ".js";
                iv = getInvocable(scriptPath, c, true);
            } else {
                scriptPath = "<default>/item/" + extend;
            }
        }
        if (iv == null) {
            c.getPlayer().dropMessage(5, "[Item Script] Cannot find script: " + scriptPath);
            dispose(c);
            return;
        }
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropMessage(5, "[Item Script] Start item script: " + scriptPath);
        }
        ItemActionManager im = new ItemActionManager(c, npc, extend == null ? String.valueOf(item.getItemId()) : extend, item, iv);
        im.setScriptPath(scriptPath);
        cms.put(c, im);
        assert iv instanceof ScriptEngine || iv instanceof DefaultScript;
        if (iv instanceof ScriptEngine) {
            ((ScriptEngine) iv).put("im", im);
        } else {
            ((DefaultScript) iv).put(im);
        }
        c.getPlayer().setConversation(ConversationType.TALK_TO_NPC);
        c.setClickedNPC();
        try {
            try {
                iv.invokeFunction("start");
            } catch (NoSuchMethodException nsme) {
                iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
            }
        } catch (Exception e) {
            log.error("[Item Script] Exception occurred. Path: " + scriptPath + ".\r\nException: ", e);
            dispose(c);
            notice(c, scriptPath);
        }
    }

    public void action(MapleClient c, byte mode, byte type, int selection) {
        NPCConversationManager cm = cms.get(c);
        if (cm == null) {
            return;
        }
        try {
            if (cm.pendingDisposal) {
                dispose(c);
            } else {
                c.setClickedNPC();
                cm.getIv().invokeFunction("action", mode, type, selection);
            }
        } catch (Exception e) {
            String scriptPath = cm.getScriptPath();
            log.error("[NPC Script] Exception occurred. Path: " + scriptPath + ".\r\nException: ", e);
            dispose(c);
            notice(c, scriptPath);
        }
    }

    public void startQuest(MapleClient c, int npcId, int questId) {
        if (c.getPlayer().isInJailMap()) {
            c.getPlayer().dropMessage(1, "在這個地方無法進行任務操作.");
            return;
        }
        if (cms.containsKey(c)) {
            dispose(c);
            return;
        }
        MapleQuest quest = MapleQuest.getInstance(questId);
        if (quest == null) {
            return;
        }
        // 紀錄勳章的相關的任務自動完成
        if (quest.getMedalItem() > 0 && ItemConstants.類型.勳章(quest.getMedalItem())) {
            if (c.getPlayer().haveItem(quest.getMedalItem()) && c.getPlayer().getQuestStatus(questId) != 2) {
                quest.forceComplete(c.getPlayer(), npcId);
            }
        }
        if (!MapleQuest.getInstance(questId).canStart(c.getPlayer(), npcId)) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropSpouseMessage(UserChatMessageType.青, "[腳本任務] 無法開始 " + MapleQuest.getInstance(questId) + " NPC: " + npcId);
            }
            c.sendEnableActions();
            return;
        }
        Invocable iv;
        String scriptPath = "quest/" + questId + ".js";
        if ((iv = getDefaultInvocable("quest", String.valueOf(questId))) == null) {
            iv = getInvocable(scriptPath, c, true);
        }
        if (iv == null) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropSpouseMessage(UserChatMessageType.青, "[腳本任務] 腳本不存在 " + MapleQuest.getInstance(questId) +" 路徑: " + scriptPath);
            }
            if (ServerConfig.CHANNEL_PLAYER_AUTOCOMPLETEQUEST && c.getPlayer().isGm()) {
                MapleQuest.getInstance(questId).forceComplete(c.getPlayer(), npcId);
            }
            dispose(c);
            return;
        }
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropSpouseMessage(UserChatMessageType.青, "[腳本任務] 開始 " + MapleQuest.getInstance(questId) + " NPC：" + npcId);
        }
        QuestActionManager qm = new QuestActionManager(c, npcId, questId, true, ScriptType.QUEST_START, iv);
        qm.setScriptPath(scriptPath);
        cms.put(c, qm);
        assert iv instanceof ScriptEngine || iv instanceof DefaultScript;
        if (iv instanceof ScriptEngine) {
            ((ScriptEngine) iv).put("qm", qm);
        } else {
            ((DefaultScript) iv).put(qm);
        }
        c.getPlayer().setConversation(ConversationType.TALK_TO_NPC);
        c.setClickedNPC();
        try {
            iv.invokeFunction("start", (byte) 1, (byte) 0, 0);
        } catch (Exception e) {
            log.error("[Quest Script] Exception occurred in startQuest. Path: " + scriptPath, e);
            dispose(c);
            notice(c, scriptPath);
        }
    }

    public void startAction(MapleClient c, byte mode, byte type, int selection) {
        NPCConversationManager qm = cms.get(c);
        if (qm == null) {
            return;
        }
        try {
            if (qm.pendingDisposal) {
                dispose(c);
            } else {
                c.setClickedNPC();
                qm.getIv().invokeFunction("start", mode, type, selection);
            }
        } catch (Exception e) {
            String path = qm.getScriptPath();
            log.error("[Quest Script] Exception occurred in startAction. Path: " + path, e);
            dispose(c);
            notice(c, path);
        }
    }

    public void endQuest(MapleClient c, int npcId, int questId, boolean customEnd) {
        if (c.getPlayer().isInJailMap()) {
            c.getPlayer().dropMessage(1, "在這個地方無法進行任務操作.");
            return;
        }
        if (cms.containsKey(c)) {
            dispose(c);
            return;
        }
        if (!customEnd && !MapleQuest.getInstance(questId).canComplete(c.getPlayer(), null)) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropSpouseMessage(UserChatMessageType.青, "[腳本任務] 無法完成 " + MapleQuest.getInstance(questId) + " NPC: " + npcId);
            }
            c.sendEnableActions();
            return;
        }
        Invocable iv;
        String scriptPath = "quest/" + questId + ".js";
        if ((iv = getDefaultInvocable("quest", String.valueOf(questId))) == null) {
            iv = getInvocable(scriptPath, c, true);
        }
        if (iv == null) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropSpouseMessage(UserChatMessageType.青, "[腳本任務] 腳本不存在 " + MapleQuest.getInstance(questId) +" 路徑: " + scriptPath);
            }
            if (ServerConfig.CHANNEL_PLAYER_AUTOCOMPLETEQUEST && c.getPlayer().isGm()) {
                MapleQuest.getInstance(questId).forceComplete(c.getPlayer(), npcId);
            }
            dispose(c);
            return;
        }
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropSpouseMessage(UserChatMessageType.青, "[腳本任務] 完成 " + MapleQuest.getInstance(questId) + " NPC：" + npcId);
        }
        QuestActionManager qm = new QuestActionManager(c, npcId, questId, false, ScriptType.QUEST_END, iv);
        qm.setScriptPath(scriptPath);
        cms.put(c, qm);
        assert iv instanceof ScriptEngine || iv instanceof DefaultScript;
        if (iv instanceof ScriptEngine) {
            ((ScriptEngine) iv).put("qm", qm);
        } else {
            ((DefaultScript) iv).put(qm);
        }
        c.getPlayer().setConversation(ConversationType.TALK_TO_NPC);
        c.setClickedNPC();
        try {
            iv.invokeFunction("end", (byte) 1, (byte) 0, 0);
        } catch (Exception e) {
            log.error("[Quest Script] Exception occurred in endQuest. Path: " + scriptPath, e);
            dispose(c);
            notice(c, scriptPath);
        }
    }

    public void endAction(MapleClient c, byte mode, byte type, int selection) {
        NPCConversationManager qm = cms.get(c);
        if (qm == null) {
            return;
        }
        try {
            if (qm.pendingDisposal) {
                dispose(c);
            } else {
                c.setClickedNPC();
                qm.getIv().invokeFunction("end", mode, type, selection);
            }
        } catch (Exception e) {
            String path = qm.getScriptPath();
            log.error("[Quest Script] Exception occurred in endAction. Path: " + path, e);
            dispose(c);
            notice(c, path);
        }
    }

    public void dispose(MapleClient c) {
        NPCConversationManager cm = cms.get(c);
        if (cm != null) {
            cms.remove(c);
            c.removeScriptEngine(cm.getScriptPath());
        }
        if (c.getPlayer() != null && c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(ConversationType.NONE);
        }
        c.sendEnableActions();
    }

    public NPCConversationManager getCM(MapleClient c) {
        return cms.get(c);
    }

    private void notice(MapleClient c, String path) {
        c.dropMessage("腳本執行出錯\r\n" + path);
    }

    public final void onUserEnter(MapleClient c, String scriptname) {
        if (cms.containsKey(c)) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "[Map Script] onUserEnter already executing: " + scriptname);
            }
            dispose(c);
            return;
        }
        Invocable iv;
        String scriptPath = "map/onUserEnter/" + scriptname + ".js";
        if ((iv = getDefaultInvocable("onUserEnter", scriptname)) == null) {
            iv = getInvocable(scriptPath, c, true);
        }
        if (iv == null) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "[Map Script] onUserEnter not exist: " + scriptname);
            }
            dispose(c);
            return;
        }
        NPCConversationManager ms = new NPCConversationManager(c, 0, scriptname, ScriptType.ON_USER_ENTER, iv);
        ms.setScriptPath(scriptPath);
        cms.put(c, ms);
        assert iv instanceof ScriptEngine || iv instanceof DefaultScript;
        if (iv instanceof ScriptEngine) {
            ((ScriptEngine) iv).put("ms", ms);
        } else {
            ((DefaultScript) iv).put(ms);
        }
        c.getPlayer().setConversation(ConversationType.TALK_TO_NPC);
        c.setClickedNPC();
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropMessage(5, "[Map Script] onUserEnter：" + scriptname + " on map：" + c.getPlayer().getMap());
        }
        try {
            try {
                iv.invokeFunction("start");
            } catch (NoSuchMethodException nsme) {
                iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
            }
        } catch (NoSuchMethodException | ScriptException exception) {
            log.error("[Map Script] Exception occurred in onUserEnter: " + scriptname + ".\r\nException：", exception);
            dispose(c);
        }
    }

    public final void onFirstUserEnter(MapleClient c, String scriptname) {
        if (cms.containsKey(c)) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "[Map Script] onFirstUserEnter already executing: " + scriptname);
            }
            dispose(c);
            return;
        }
        Invocable iv;
        String scriptPath = "map/onFirstUserEnter/" + scriptname + ".js";
        if ((iv = getDefaultInvocable("onFirstUserEnter", scriptname)) == null) {
            iv = getInvocable(scriptPath, c, true);
        }
        if (iv == null) {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "[Map Script] onFirstUserEnter not exist: " + scriptname);
            }
            dispose(c);
            return;
        }
        NPCConversationManager ms = new NPCConversationManager(c, 0, scriptname, ScriptType.ON_FIRST_USER_ENTER, iv);
        ms.setScriptPath(scriptPath);
        cms.put(c, ms);
        assert iv instanceof ScriptEngine || iv instanceof DefaultScript;
        if (iv instanceof ScriptEngine) {
            ((ScriptEngine) iv).put("ms", ms);
        } else {
            ((DefaultScript) iv).put(ms);
        }
        c.getPlayer().setConversation(ConversationType.TALK_TO_NPC);
        c.setClickedNPC();
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropMessage(5, "[Map Script] onFirstUserEnter：" + scriptname + " on map：" + c.getPlayer().getMap());
        }
        try {
            try {
                iv.invokeFunction("start");
            } catch (NoSuchMethodException nsme) {
                iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
            }
        } catch (NoSuchMethodException | ScriptException exception) {
            log.error("[Map Script] Exception occurred in onFirstUserEnter: " + scriptname + ".\r\nException：", exception);
            dispose(c);
        }
    }
}