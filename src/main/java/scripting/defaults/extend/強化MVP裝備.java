package scripting.defaults.extend;

import auth.Auth;
import client.inventory.EnhanceResultType;
import client.inventory.Equip;
import client.inventory.Item;
import configs.MvpEquipConfig;
import scripting.npc.AbstractNPCScript;

public class 強化MVP裝備 extends AbstractNPCScript {

    protected int toEnhance = -1;
    protected Equip eqp = null;
    protected int maxEnhance;
    protected String[] mvpNames = {"無", "銅牌I", "銅牌II", "銅牌III", "銅牌IV", "銀牌", "金牌", "鑽石", "紅鑽"};

    public Equip getEquip() {
        Equip eq = null;
        int[] tps = {1, 6};
        for (int tp : tps) {
            for (Item item : cm.getInventory(tp).listById(MvpEquipConfig.EnhanceItem.get(toEnhance))) {
                Equip eqp = (Equip) item;
                if (!EnhanceResultType.EQUIP_MARK.check(eqp.getEnchantBuff()) && eqp.isMvpEquip()) {
                    if (eq == null || (eq.getEnhance() >= maxEnhance && eqp.getEnhance() < maxEnhance)) {
                        eq = eqp;
                    }
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
        if (!Auth.checkPermission("MVPEquip")) {
            cm.sendOk("功能未開通。");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getMvpLevel() < MvpEquipConfig.EnhanceMvpLevel) {
            cm.getPlayer().dropMessage(1, "很抱歉，你不能使用這個功能。");
            cm.dispose();
            return;
        }
        String msg = "你好!!我可以嘗試幫你強化#e#bMVP裝備#k#n得到更強的素質，但是需要收取一定費用\r\n請選擇要強化的#e#bMVP裝備#k#n。\r\n#r※背包內若有多個符合強化的MVP裝備，將從背包左上方的道具開始優先強化！#k\r\n\r\n";
        for (int i = 0; i < MvpEquipConfig.EnhanceItem.size(); i++) {
            msg += "#L" + i + "##v" + MvpEquipConfig.EnhanceItem.get(i) + "#MVP#t" + MvpEquipConfig.EnhanceItem.get(i) + "##l\r\n";
        }
        cm.sendSimple(msg);
    }

    @Override
    public void action(int mode, int type, int selection) {
        if (mode == 1) {
            status++;
            if (status > 1) {
                status = 1;
            }
        } else {
            cm.sendOk("需要強化的時候再來找我吧。");
            cm.dispose();
            return;
        }
        if (toEnhance < 0) {
            toEnhance = selection;
        }
        if (toEnhance < 0 || toEnhance > MvpEquipConfig.EnhanceItem.size() - 1) {
            cm.dispose();
            return;
        }
        Equip equip = getEquip();
        if (equip == null) {
            cm.sendOk("沒有找到可以強化的#e#b#v" + MvpEquipConfig.EnhanceItem.get(toEnhance) + "#MVP#t" + MvpEquipConfig.EnhanceItem.get(toEnhance) + "##k#n\r\n如果已經穿上了請先脫下來再強化。");
            cm.dispose();
            return;
        }
        if (equip.getExpiration() < 0 || cm.getPlayer().isDiamondMvp()) {
            maxEnhance = MvpEquipConfig.EnhanceCosts.size();
        } else if (cm.getPlayer().isGoldMvp()) {
            maxEnhance = Math.min(MvpEquipConfig.EnhanceCosts.size(), 20);
        } else if (cm.getPlayer().isSilverMvp()) {
            maxEnhance = Math.min(MvpEquipConfig.EnhanceCosts.size(), 15);
        } else {
            maxEnhance = Math.min(MvpEquipConfig.EnhanceCosts.size(), 10);
        }
        if (equip.getEnhance() >= maxEnhance) {
            cm.sendOk("你的#e#b#v" + MvpEquipConfig.EnhanceItem.get(toEnhance) + "#MVP#t" + MvpEquipConfig.EnhanceItem.get(toEnhance) + "##k#n已經強化到最高階級，無法繼續強化。");
            cm.dispose();
        } else {
            String msg = "";
            if (status == 0) {
                msg += "確認需要強化嗎?";
            } else {
                if (cm.getPrice(MvpEquipConfig.EnhancePriceType) < MvpEquipConfig.EnhanceCosts.get(equip.getEnhance())) {
                    cm.sendOk("你的" + cm.getPriceName(MvpEquipConfig.EnhancePriceType) + "不足，無法使用。");
                    cm.dispose();
                    return;
                }
                cm.gainPrice(MvpEquipConfig.EnhancePriceType, -MvpEquipConfig.EnhanceCosts.get(equip.getEnhance()));
                String effect;
                if (MvpEquipConfig.EnhanceRates.get(equip.getEnhance()) >= Math.floor(Math.random() * 100000)) {
                    equip.setEnhance((byte) (equip.getEnhance() + 1));
                    cm.getPlayer().forceUpdateItem(equip);
                    msg = "強化#g成功#k。";
                    effect = "Success";
                } else {
                    msg = "強化#r失敗#k。";
                    effect = "Failure";
                }
                if (equip.getEnhance() >= maxEnhance) {
                    cm.sendOk(msg + "\r\n#e#b#v" + MvpEquipConfig.EnhanceItem.get(toEnhance) + "#MVP#t" + MvpEquipConfig.EnhanceItem.get(toEnhance) + "##k#n已經強化到最高階級。");
                    cm.dispose();
                    return;
                }
                cm.showAvatarOriented("Effect/BasicEff/Enchant/" + effect, true);
                msg += "\r\n是否要繼續強化?";
            }
            cm.sendYesNo(msg+ "\r\n\r\n當前階級: #e" + mvpNames[cm.getPlayer().getMvpLevel()] + "#n\r\n#r最高#k強化等級: " + maxEnhance + "★\r\n#b強化等級#k: #e" + equip.getEnhance() + "★#n\r\n強化需求費用: #r#e" + MvpEquipConfig.EnhanceCosts.get(equip.getEnhance()) + "#n#k 樂豆點\r\n強化概率: " + (MvpEquipConfig.EnhanceRates.get(equip.getEnhance()) < 1000 ? "#r#e極低#n#k" : MvpEquipConfig.EnhanceRates.get(equip.getEnhance()) < 10000 ? "#r低#k" : MvpEquipConfig.EnhanceRates.get(equip.getEnhance()) < 70000 ? "#b中#k" : "#g高#k"));
        }
    }
}
