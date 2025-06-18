package scripting.defaults.npc;

import scripting.npc.AbstractNPCScript;
import server.maps.MapleMap;

public class N9330142 extends AbstractNPCScript {
    int[] maps = {749088230, 749088350, 749088240, 749088260, 749088210, 749088220, 749088270, 749088290, 749088310, 749088320, 749088330, 749088340, 749088250, 749088300, 749088280};
    int[] lvs = {49, 50, 60, 78, 85, 90, 90, 98, 106, 113, 117, 119, 120, 132, 138};
    @Override
    public void start() {
        if (!cm.haveItem(5252014)) {
            cm.sendOk("你並未持有#i5252014#。");
            cm.dispose();
        } else {
            String menu = "";
            for (int i = 0; i < maps.length; i++) {
                menu += "\r\n#L" + i + "# #m" + maps[i] + "#（" + lvs[i] + " Level）#l";
            }
            cm.sendSimple("請選擇想要的首領怪物公園。#b" + menu);
        }
    }

    @Override
    public void action(int mode, int type, int selection) {
        status++;

        int i = 0;
        if (status == i++) {
            if (selection < 0 || selection >= maps.length) {
                cm.sendOk("發生未知錯誤。");
            } else {
                MapleMap map = cm.getMap(maps[selection]);
                if (map == null) {
                    cm.sendOk("發生未知錯誤。");
                } else if (map.getCharactersSize() > 0) {
                    cm.sendOk("已經有人在地圖裡了。");
                } else {
                    cm.gainItem(5252014, -1);
                    map.setSpawns(true);
                    map.resetFully(false);
                    cm.dispose();
                    cm.warp(maps[selection]);
                }
            }
        } else {
            cm.dispose();
        }
    }
}
