/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.item;

import client.MapleClient;
import client.MapleJob;
import client.MapleQuestStatus;
import client.inventory.Item;
import client.skills.Skill;
import client.skills.SkillFactory;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.enums.ScriptType;
import packet.InventoryPacket;
import scripting.npc.NPCConversationManager;
import scripting.npc.NPCScriptManager;
import server.MapleInventoryManipulator;
import packet.MaplePacketCreator;
import server.quest.MapleQuest;
import server.Randomizer;

import javax.script.Invocable;

/**
 * @author PlayDK
 */
public class ItemActionManager extends NPCConversationManager {

    public ItemActionManager(MapleClient c, int npc, String npcMode, Item item, Invocable iv) {
        super(c, npc, npcMode, ScriptType.ITEM, iv, item);
    }

    @Override
    public void dispose() {
        dispose(-1);
    }

    public void dispose(int remove) {
        if (remove == 0) {
            this.usedAll();
        } else if (remove > 0) {
            this.used(remove);
        }
        NPCScriptManager.getInstance().dispose(getClient());
    }

    public int getItemId() {
        return getItem().getItemId();
    }

    public short getPosition() {
        return getItem().getPosition();
    }

    public boolean used() {
        return used(1);
    }

    public boolean usedAll() {
        return used(getItem().getQuantity());
    }

    public boolean used(int q) {
        return MapleInventoryManipulator.removeFromSlot(getClient(), ItemConstants.getInventoryType(getItemId()), getPosition(), (short) q, true, false);
    }

    /**
     * 刪除一個道具
     */
    public void remove() {
        remove(1);
    }

    /**
     * 刪除指定數量的道具
     *
     * @param quantity 數量
     */
    public void remove(int quantity) {
        used(quantity);
    }

    public String getSkillMenu(int skillMaster) {
        int job = getJob();
        int bookMin;
        int bookMax;
        if (JobConstants.is神之子(job)) {
            bookMin = 0;
            bookMax = 1;
        } else if (JobConstants.is影武者(job)) {
            if (skillMaster < 20) {
                bookMin = 2;
                bookMax = 4;
            } else {
                bookMin = 5;
                bookMax = 5;
            }
        } else if (!JobConstants.isSeparatedSpJob(job)) {
            bookMin = 0;
            bookMax = 0;
        } else {
            bookMin = 3;
            bookMax = 3;
        }
        StringBuilder sb = new StringBuilder();

        getPlayer().getSkills().forEach((key, value) -> {
            int skillBook = JobConstants.getSkillBookBySkill(key);
            int skillJob = key / 100000;
            if (skillBook < bookMin || skillBook > bookMax || skillJob != job / 10) {
                return;
            }
            Skill skill = SkillFactory.getSkill(key);
            if ((skill.getMaxLevel() > 10 || skillMaster < 20) && value.masterlevel < skill.getMaxLevel() && value.masterlevel > 0) {
                if (skillMaster > 20) {
                    if (value.masterlevel >= 30 || value.masterlevel < 20 || skill.getMaxLevel() <= 20) {
                        return;
                    }
                } else if (skillMaster > 10) {
                    if (value.masterlevel >= 20) {
                        return;
                    }
                }
                sb.append("\r\n#L").append(key).append("# #s").append(key).append("# #fn字體##fs14##e#q").append(key).append("##n#fs##fn##l");
            }
        });
        return sb.toString();
    }

    public boolean canUseSkillBook(int skillId, int masterLevel) {
        if (masterLevel > 0) {
            int job = skillId / 10000;
            if (masterLevel == 10 && (MapleJob.中忍.getId() > job || MapleJob.隱忍.getId() < job)) {
                return false;
            }
            Skill skill = SkillFactory.getSkill(skillId);
            int skillLevel = getPlayer().getSkills().get(skillId) == null ? 0 : getPlayer().getSkills().get(skillId).skillevel;
            if (skillLevel >= skill.getMaxLevel()) {
                return false;
            }
            if ((skillLevel >= 5 && masterLevel <= 20) || (skillLevel >= 15 && masterLevel == 30 && masterLevel > 20)) {
                return true;
            }
        }
        return false;
    }

    public void useSkillBook(int skillId, int masterLevel) {
        useSkillBook(100, skillId, masterLevel);
    }

    public void useSkillBook(int success, int skillId, int masterLevel) {
        if (!canUseSkillBook(skillId, masterLevel)) {
            return;
        }
        Skill skill = SkillFactory.getSkill(skillId);
        boolean suc = Randomizer.isSuccess(success);
        if (skill != null && suc) {
            if (masterLevel == 10) {
                masterLevel = skill.getMaxLevel();
            }
            masterLevel = masterLevel > skill.getMaxLevel() ? skill.getMaxLevel() : masterLevel;
            getPlayer().changeSingleSkillLevel(skill, getPlayer().getSkillLevel(skill), (byte) masterLevel);
        }
        getPlayer().getMap().broadcastMessage(MaplePacketCreator.useSkillBook(getPlayer(), skillId, masterLevel, true, true));
        enableActions();
    }

    public boolean addPendantSlot(int days) {
        String pendantStatus = getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT)).getCustomData();
        if ("0".equals(pendantStatus)) {
            return false;
        }
        long slotTime = 0;
        if (pendantStatus != null && !pendantStatus.isEmpty()) {
            slotTime = Long.parseLong(pendantStatus);
        }
        if (slotTime <= System.currentTimeMillis()) {
            slotTime = System.currentTimeMillis();
            getClient().announce(MaplePacketCreator.updatePendantSlot(false, days));
        } else {
            getClient().announce(MaplePacketCreator.updatePendantSlot(true, days));
        }
        slotTime += days * 24 * 60 * 60 * 1000L;
        setCustomData(GameConstants.PENDANT_SLOT, String.valueOf(slotTime));
        return true;
    }

    public void setForeverPendantSlot() {
        setCustomData(GameConstants.PENDANT_SLOT, "0");
        getClient().announce(MaplePacketCreator.updatePendantSlot(false, 0));
    }

    public boolean addDamageSkinSlot() {
        return addDamageSkinSlot(1);
    }

    public boolean addDamageSkinSlot(int nCount) {
        String count = getPlayer().getOneInfo(56829, "count");
        final int damskinslot = count == null ? ServerConfig.defaultDamageSkinSlot : Integer.valueOf(count);
        if (damskinslot < GameConstants.DamageSkinSlotMax) {
            getPlayer().updateOneInfo(56829, "count", String.valueOf(damskinslot + nCount));
            getPlayer().send(InventoryPacket.UserDamageSkinSaveResult(2, 4, getPlayer()));
            return true;
        } else {
            return false;
        }
    }

    public void useFailed() {
        getMap().broadcastMessage(MaplePacketCreator.useSkillBook(getPlayer(), 0, 0, true, false));
        enableActions();
    }

    public void showItemMsg(String s) {
        showItemMsg(getItemId(), s);
    }
}
