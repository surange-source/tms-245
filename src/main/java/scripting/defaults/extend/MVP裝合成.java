package scripting.defaults.extend;

import auth.Auth;
import client.inventory.EnhanceResultType;
import client.inventory.Equip;
import client.inventory.Item;
import configs.MvpEquipConfig;
import scripting.npc.AbstractNPCScript;
import tools.json.JSONObject;

import java.util.LinkedList;
import java.util.List;

public class MVP裝合成 extends AbstractNPCScript {

    protected List<JSONObject> makeList = new LinkedList<>();
    protected boolean canUpgradeLimitMvpEquip;
    protected JSONObject selectedItem = null;
    protected List<Equip> eqps = null;
    protected Equip eqp = null;
    protected int v1 = 0;

    public MVP裝合成() {
        for (Object o : MvpEquipConfig.MvpEquipMakeListJson) {
            assert o instanceof JSONObject;
            makeList.add((JSONObject) o);
        }
        canUpgradeLimitMvpEquip = MvpEquipConfig.CanUpgradeLimitMvpEquip;
    }

    public List<Equip> getEquips() {
        List<Equip> eqs = new LinkedList<>();
        int[] tps = {1, 6};
        for (int tp : tps) {
            for (Item item : cm.getInventory(tp).listById(selectedItem.getInt("ItemID"))) {
                Equip eqp = (Equip) item;
                if (eqp.isMvpEquip()) {
                    if (EnhanceResultType.EQUIP_MARK.check(eqp.getEnchantBuff()) || eqp.getExpiration() >= 0) {
                        eqs.add(eqp);
                    }
                }
            }
            if (eqs.size() > 0) {
                break;
            }
        }
        return eqs.size() == 0 ? null : eqs;
    }

    @Override
    public void start() {
        if (!Auth.checkPermission("MVPEquip")) {
            cm.sendOk("功能未開通。");
            cm.dispose();
            return;
        }
        String msg = "哈嘍，我是#p" + cm.getNpc() + "#。我可以幫你合成#e永久#n的#bMVP裝#k喔\r\n\r\n那麼請問你要合成什麼呢？";
        msg += "\r\n\r\n#r※#b#eMVP裝#n#r可無限交換#k";
        int i = 0;
        for (JSONObject item : makeList) {
            msg += "\r\n#L" + i + "##v" + item.getInt("ItemID") + "# MVP#t" + item.getInt("ItemID") + "##l";
            i++;
        }
        cm.sendSimple(msg);
    }

    @Override
    public void action(int mode, int type, int selection) {
        if (mode > 0) {
            status++;
        } else {
            status--;
        }

        int i = 0;
        if (status == i++) {
            if (v1 != 0) {
                cm.dispose();
                return;
            }
            v1 = 1;
            if (selectedItem == null) {
                if (selection < 0 || selection >= makeList.size()) {
                    cm.dispose();
                    return;
                }
                selectedItem = makeList.get(selection);
            }
            eqps = getEquips();
            if (eqps == null || !canUpgradeLimitMvpEquip) {
                action(1, 0, 0);
                return;
            } else {
                String msg = "背包有期限型 #b#e#v" + selectedItem.getInt("ItemID") + "# MVP#t" + selectedItem.getInt("ItemID") + "##k#n\r\n請選擇:"
                        + "\r\n#L0##b 合成新的MVP#t" + selectedItem.getInt("ItemID") + "##k#l\r\n\r\n升級期限型MVP#t" + selectedItem.getInt("ItemID") + "##b";
                for (int j = 1; j <= eqps.size(); j++) {
                    msg += "\r\n#L" + j + "#";
                    msg += " 星力 " + eqps.get(j - 1).getEnhance() + "★ 強化";
                    msg += " (欄位" + eqps.get(j - 1).getPosition() + ")#l";
                }
                cm.sendSimple(msg);
            }
        } else if (status == i++) {
            if (eqps != null) {
                if (selection == 0) {
                    eqp = null;
                } else {
                    eqp = eqps.get(selection - 1);
                }
            }
            String msg = "你選擇的道具為 #b#e#v" + selectedItem.getInt("ItemID") + "# MVP#t" + selectedItem.getInt("ItemID") + "##k#n\r\n"
                    + "所需費用:" + selectedItem.getLong("Amount") + (selectedItem.getInt("Currency") >= 1000000 ? "個" : "") + " " + cm.getPriceName(selectedItem.getInt("Currency")) + "\r\n";
            msg += "是否需要" + (eqp != null ? "升級" : "合成") + "？";
            cm.sendYesNo(msg);
        } else if (status == i++) {
            if (!cm.canHold(selectedItem.getInt("ItemID"))) {
                cm.sendNext("道具欄不足");
                return;
            }
            if (!cm.gainPrice(selectedItem.getInt("Currency"), -selectedItem.getLong("Amount"))) {
                cm.sendNext(cm.getPriceName(selectedItem.getInt("Currency")) + "不足。");
                return;
            }
            if (eqp != null) {
                eqp.setExpiration(-1);
                eqp.setEnchantBuff((short) (eqp.getEnchantBuff() & ~EnhanceResultType.EQUIP_MARK.getValue()));
                cm.getPlayer().forceUpdateItem(eqp);
            } else {
                Equip equip = cm.getEquip(selectedItem.getInt("ItemID"));
                equip.setMvpEquip(true);
                equip.setGMLog("MVP裝合成腳本獲得 地圖: " + cm.getMapId() + " 時間: " + new java.text.SimpleDateFormat("yyyy年MM月dd日HH時mm分ss秒").format(new java.util.Date()));
                cm.addByItem(equip);
            }
            cm.sendNext((eqp != null ? "升級" : "合成") + "完成，你獲得了 #v" + selectedItem.getInt("ItemID") + "# MVP#t" + selectedItem.getInt("ItemID") + "#。");
        } else {
            cm.dispose();
        }
    }
}
