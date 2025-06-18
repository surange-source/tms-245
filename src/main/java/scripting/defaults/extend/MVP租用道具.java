package scripting.defaults.extend;

import auth.Auth;
import client.inventory.EnhanceResultType;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.ItemAttribute;
import configs.MvpEquipConfig;
import scripting.npc.AbstractNPCScript;
import server.MapleItemInformationProvider;
import tools.json.JSONObject;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

public class MVP租用道具 extends AbstractNPCScript {

    // 普通道具
    protected List<JSONObject> itemList = new LinkedList<>();
    // MVP裝-租用需求等級不得低於5(即銀牌), 否則會出問題
    protected List<JSONObject> mvpEquip = new LinkedList<>() ;
    protected JSONObject selectedItem = null;
    protected boolean isMvpEqp = false;
    protected String[] mvpNames = {"無", "銅牌I", "銅牌II", "銅牌III", "銅牌IV", "銀牌", "金牌", "鑽石", "紅鑽"};

    public MVP租用道具() {
        for (Object o : MvpEquipConfig.RentEquipListJson) {
            assert o instanceof JSONObject;
            itemList.add((JSONObject) o);
        }
        for (Object o : MvpEquipConfig.RentMvpEquipListJson) {
            assert o instanceof JSONObject;
            mvpEquip.add((JSONObject) o);
        }
    }

    public Equip getEquip() {
        Equip eq = null;
        int[] tps = {1, 6};
        for (int tp : tps) {
            for (Item item : cm.getInventory(tp).listById(selectedItem.getInt("ItemID"))) {
                Equip eqp = (Equip) item;
                if (EnhanceResultType.EQUIP_MARK.check(eqp.getEnchantBuff()) && eqp.isMvpEquip()) {
                    eq = eqp;
                    break;
                }
            }
            if (eq != null) {
                break;
            }
        }
        return eq;
    }

    @Override
    public void start() {
        String msg = "哈嘍，我是#p" + cm.getNpc() + "#。你可以找我租用道具哦，租用期限為#r30天#k\r\n\r\n那麼請問你要租用什麼道具呢？";
        msg += "\r\n\r\n#r※租用的普通道具僅可在帳號內交換#k";
        int i = 0;
        for (JSONObject item : itemList) {
            msg += "\r\n#L" + i + "##v" + item.getInt("ItemID") + "# #t" + item.getInt("ItemID") + "##l";
            i++;
        }
        if (Auth.checkPermission("MVPEquip")) {
            msg += "\r\n\r\n\r\n#r※#b#eMVP裝#n#r可無限交換，每個月只能租用或復活1次，可以進行強化並且到期後不會消失，但是無法使用，可以找我復活即可再次使用(維持強化效果).#k";
            for (JSONObject item : mvpEquip) {
                msg += "\r\n#L" + i + "##v" + item.getInt("ItemID") + "# MVP#t" + item.getInt("ItemID") + "##l";
                i++;
            }
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
            if (selectedItem == null) {
                if (selection < itemList.size()) {
                    selectedItem = itemList.get(selection);
                } else if (Auth.checkPermission("MVPEquip") && selection < itemList.size() + mvpEquip.size()) {
                    selectedItem = mvpEquip.get(selection - itemList.size());
                    isMvpEqp = true;
                } else {
                    cm.sendNext("發生未知錯誤");
                    cm.dispose();
                    return;
                }
            }
            String msg = "你選擇的道具為 #b#e#v" + selectedItem.getInt("ItemID") + "# " + (isMvpEqp ? "MVP" : "") + "#t" + selectedItem.getInt("ItemID") + "##k#n\r\n"
                    + "需求MVP階級:#b#e" + mvpNames[selectedItem.getInt("MvpLevel")] + "#k#n\r\n"
                    + "所需費用:" + selectedItem.getLong("Amount") + " " + cm.getPriceName(selectedItem.getInt("Currency")) + "\r\n";
            if (isMvpEqp) {
                msg += "#r※背包內若有多個可復活的MVP裝備，將從背包左上方的道具開始優先復活！#k\r\n";
            }
            msg += "請選擇你需要的操作#b";
            msg += "\r\n#L0# 租用道具#l";
            if (isMvpEqp && getEquip() != null) {
                msg += "\r\n#L1# 復活MVP裝#l";
            }
            msg += "\r\n#L99# 暫時不需要#l";
            cm.sendSimple(msg);
        } else if (status == i++) {
            if (selection == 0 || selection == 1) {
                if (cm.getPlayer().getMvpLevel() < selectedItem.getInt("MvpLevel")) {
                    cm.sendNext("你的MVP階級太低所以無法" + (selection == 0 ? "租用" : "復活") + "這個道具喔。");
                    return;
                }
                if (isMvpEqp && Objects.equals(cm.getWorldShareInfo(90, String.valueOf(selectedItem.getInt("ItemID"))), "1")) {
                    cm.sendNext("本月已經租用或者復活過這個道具了喔。");
                    return;
                }
                if (selection == 0 && !cm.canHold(selectedItem.getInt("ItemID"))) {
                    cm.sendNext("道具欄不足");
                    return;
                }
                if (!cm.gainPrice(selectedItem.getInt("Currency"), -selectedItem.getLong("Amount"))) {
                    cm.sendNext(cm.getPriceName(selectedItem.getInt("Currency")) + "不足。");
                    return;
                }
            }
            switch (selection) {
                case 0: {
                    Equip equip = cm.getEquip(selectedItem.getInt("ItemID"));
                    equip.setExpiration(System.currentTimeMillis() + 30 * 24 * 60 * 60 * 1000L);
                    equip.setMvpEquip(isMvpEqp);
                    equip.setGMLog("MVP租用道具腳本獲得 地圖: " + cm.getMapId() + " 時間: " + new java.text.SimpleDateFormat("yyyy年MM月dd日HH時mm分ss秒").format(new java.util.Date()));
                    if (isMvpEqp) {
                        cm.updateWorldShareInfo(90, String.valueOf(selectedItem.getInt("ItemID")), "1");
                    } else {
                        MapleItemInformationProvider ii = cm.getItemInfo();
                        equip.setAttribute(ItemAttribute.AccountSharable.getValue() | ItemAttribute.CutUsed.getValue());
                        if (!ii.isTradeBlock(selectedItem.getInt("ItemID"))) {
                            equip.addAttribute(ItemAttribute.TradeBlock.getValue());
                        }
                        if (!ii.isCash(selectedItem.getInt("ItemID"))) {
                            equip.addAttribute(ItemAttribute.TradeOnce.getValue());
                        }
                    }
                    cm.addByItem(equip);
                    cm.sendNext("您已租用了#v" + selectedItem.getInt("ItemID") + "# " + (isMvpEqp ? "MVP" : "") + "#t" + selectedItem.getInt("ItemID") + "#。");
                    break;
                }
                case 1: {
                    Equip equip = getEquip();
                    if (equip == null) {
                        cm.dispose();
                        return;
                    }
                    if (!cm.gainPrice(selectedItem.getInt("Currency"), -selectedItem.getLong("Amount"))) {
                        cm.sendNext(cm.getPriceName(selectedItem.getInt("Currency")) + "不足。");
                        return;
                    }
                    equip.setExpiration(System.currentTimeMillis() + 30 * 24 * 60 * 60 * 1000L);
                    equip.setEnchantBuff((short) (equip.getEnchantBuff() & ~EnhanceResultType.EQUIP_MARK.getValue()));
                    cm.getPlayer().forceUpdateItem(equip);
                    cm.updateWorldShareInfo(90, String.valueOf(selectedItem.getInt("ItemID")), "1");
                    cm.sendNext("復活完成。");
                    break;
                }
                case 99:
                    cm.sendNext("那麼需要的時候再來找我吧。");
                    break;
                default:
                    cm.dispose();
                    break;
            }
        } else {
            cm.dispose();
        }
    }
}
