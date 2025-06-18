package scripting.npc;

import configs.BossConfig;
import configs.Config;
import scripting.event.EventManager;
import scripting.npc.AbstractNPCScript;
import tools.json.JSONObject;

public class AbstractBossEntrance extends AbstractNPCScript {
    private boolean open;

    protected String[] pqName;
    protected String[] pqLog;
    protected int startMap;
    protected int[] minLevel;
    protected int[] maxLevel;
    protected int[] maxEnter;
    protected int[] interval;
    protected int[] minPlayers;
    protected int[] maxPlayers;
    protected int[] mobLevel;

    private int lastSelect;

    public AbstractBossEntrance() {}

    public AbstractBossEntrance(String name) {
        init(name);
    }

    public final void init(String name) {
        JSONObject config = BossConfig.getEntrance(name);
        if (config == null) return;
        open = config.getBoolean("open");
        pqName = config.getJSONArray("pqName").toStringArray();
        pqLog = config.getJSONArray("pqLog").toStringArray();
        startMap = config.getInt("startMap");
        minLevel = config.getJSONArray("minLevel").toIntArray();
        maxLevel = config.getJSONArray("maxLevel").toIntArray();
        maxEnter = config.getJSONArray("maxEnter").toIntArray();
        interval = config.getJSONArray("interval").toIntArray();
        minPlayers = config.getJSONArray("minPlayers").toIntArray();
        maxPlayers = config.getJSONArray("maxPlayers").toIntArray();
        mobLevel = config.getJSONArray("mobLevel").toIntArray();
    }

    @Override
    public void start() {
        if (cm.getMapId() == startMap) {
            StringBuilder sb = new StringBuilder();
            sb.append("#e<Boss - ").append(pqLog[0]).append(">#n\r\n#b#h0# \r\n#k").append("你想和隊員們一起努力，完成任務嗎？這裡面有很多如果不同心協力就無法解決的障礙……如果想挑戰的話，請讓#b所屬組隊的隊長#k來和我說話。").append("\r\n\r\n");
            for (int i = 0; i < pqName.length; i++) {
                sb.append("\r\n#b#L").append(i).append("#挑戰").append(pqLog[i]).append("#l#k");
            }
            cm.askMenu(sb.toString());
        } else {
            cm.askYesNo(String.format("#e<Boss - %s>#n\r\n\r\n確定現在放棄任務,從這裡出去?\r\n", pqLog[0]));
        }
    }

    @Override
    public void action(int mode, int type, int selection) {
        switch (mode) {
            case 0:
                status--;
                break;
            case 1:
                status++;
                break;
        }
        if (cm.getMapId() == startMap) {
            switch (status) {
                case 0: {
                    if (open) {
                        EventManager em = cm.getEventManager(pqName[selection]);
                        if (em == null) {
                            cm.sendOk("配置文件不存在,請聯繫管理員。");
                            cm.dispose();
                            return;
                        }
                        lastSelect = selection;
                        String prop = em.getProperty("state");
                        String rwpz = "#e<Boss - " + pqLog[selection] + ">#n\r\n#k\r\n#e#r" + ("#n#k#e   副本狀態：#n" + (prop == null || prop.equals("0") ? "#e#g空閒#n#k" : "#e#r其他隊伍正在進行...#n#k") + "") + ("\r\n#e   推薦人數：" + minPlayers[selection] + " - " + maxPlayers[selection] + "#n#e    推薦等級：" + minLevel[selection] + "-" + maxLevel[selection] + "#n") + ("\r\n#e   剩餘次數：#r" + (maxEnter[selection] - cm.getDaysPQLog(pqLog[selection], interval[selection])) + "#k 次#k     重置間隔：#r" + interval[selection] + "#k天#n#k\r\n\r\n");
                        cm.askYesNo(rwpz + "           #b#h0# \r\n#k#e是否現在就進入？#n");
                    } else {
                        cm.sendOk("目前該副本不開放，有疑問請聯繫管理員");
                        cm.dispose();
                    }
                    break;
                }
                case 1: {
                    if (selection != 1) {
                        cm.dispose();
                    } else if (cm.getParty() == null) {
                        cm.sendOk("必須組成組隊, 才能入場.");
                        cm.dispose();
                    } else if (cm.getPartySize() < minPlayers[lastSelect] || cm.getPartySize() > maxPlayers[lastSelect]) {
                        cm.sendOk("必須組成組隊, 才能入場.");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // 判斷組隊隊長
                        cm.sendOk("只有組隊長，才可以申請入場.");
                        cm.dispose();
                    } else if (!cm.isAllPartyMembersAllowedLevel(minLevel[lastSelect], maxLevel[lastSelect])) {
                        cm.sendNext("組隊成員等級 " + minLevel[lastSelect] + " 以上 " + maxLevel[lastSelect] + " 以下才可以入場。");
                        cm.dispose();
                    } else if (!cm.isAllPartyMembersAllowedPQ(pqLog[lastSelect], maxEnter[lastSelect]) && !Config.isDevelop()) {
                        cm.sendNext("隊員#r#e \"" + cm.getNotAllowedPQMemberName(pqLog[lastSelect], maxEnter[lastSelect]) + "\" #k#n次數已經達到上限了。");
                        cm.dispose();
                    } else if (!cm.allMembersHere()) {
                        cm.sendOk("組隊部分成員不在當前地圖,請召集他們過來後在嘗試。"); //判斷組隊成員是否在一張地圖..
                        cm.dispose();
                    } else {
                        cm.dispose();
                        EventManager em = cm.getEventManager(pqName[lastSelect]);
                        if (em == null || !open) {
                            cm.sendOk("配置文件不存在,請聯繫管理員。");
                        } else {
                            String state = em.getProperty("state");
                            if ("0".equals(state) || state == null) {
                                em.startInstance(cm.getParty(), cm.getMap(), mobLevel[lastSelect]);
                                cm.gainMembersPQ(pqLog[lastSelect], 1);
                            } else {
                                cm.sendOk("已經有隊伍在進行了,請換其他頻道嘗試。");
                            }
                        }
                    }
                    break;
                }
                default: {
                    cm.dispose();
                }
            }
        } else {
            cm.dispose();
            if (status == 0 && selection == 1) {
                cm.warp(startMap, 0);
            }
        }
    }
}