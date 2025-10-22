package launch.groups.datamanage;

import com.alee.laf.rootpane.WebFrame;
import server.MapleItemInformationProvider;
import server.life.MapleLifeFactory;
import server.shop.MapleShop;
import server.shop.MapleShopFactory;
import server.shop.MapleShopItem;
import tools.types.Pair;

import javax.swing.table.DefaultTableModel;
import java.util.*;

class NPCShopPane extends TabbedPane {

    final Map<Integer, MapleShop> shops = MapleShopFactory.getInstance().getAllShop();
    private final Map<String, List<Pair<DataManageMode, Vector<String>>>> changelist = new LinkedHashMap<>();
    private DefaultTableModel defaultTableModel_ID;

    NPCShopPane(WebFrame owner) {
        super(owner);
    }

    @Override
    void init() {
        idTableName.add("ShopID");
        idTableName.add("NPCID");

        dataTableName.add("position");
        dataTableName.add("ItemID");
        dataTableName.add("ItemName");
        dataTableName.add("MesoPrice");
        dataTableName.add("TokenItemID");
        dataTableName.add("TokenPrice");
        dataTableName.add("PointQuestID");
        dataTableName.add("PointPrice");
        dataTableName.add("ItemPeriod(days)");
        dataTableName.add("PotentialGrade");
        dataTableName.add("TabIndex");
        dataTableName.add("LevelLimitedMin");
        dataTableName.add("LevelLimitedMax");
        dataTableName.add("SellStart");
        dataTableName.add("SellEnd");
        dataTableName.add("BuyLimit");
        dataTableName.add("BuyLimitWorldAccount");

        Vector<Vector<String>> shopList = new Vector<>();
        for (Map.Entry<Integer, MapleShop> entry : shops.entrySet()) {
            Vector<String> data = new Vector<>();
            data.add(String.valueOf(entry.getKey()));
            data.add(String.valueOf(entry.getValue().getNpcId()));
            shopList.add(data);
        }
        defaultTableModel_ID = new DefaultTableModel(shopList, idTableName);
    }

    @Override
    String getTitle() {
        return "NPC商店";
    }

    @Override
    protected DefaultTableModel getIDTableModel() {
        return defaultTableModel_ID;
    }

    @Override
    protected Vector<String> getDefaultDataVector() {
        Vector<String> ret = new Vector<>();
        ret.add("");
        ret.add("");
        ret.add("");
        ret.add("0");
        ret.add("0");
        ret.add("0");
        ret.add("0");
        ret.add("0");
        ret.add("0");
        ret.add("0");
        ret.add("0");
        ret.add("0");
        ret.add("255");
        ret.add("-2");
        ret.add("-1");
        ret.add("0");
        ret.add("0");
        return ret;
    }

    @Override
    protected DefaultTableModel getDataTableModel() {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Vector<Vector<String>> datas = new Vector<>();
        if (idTable.getSelectedRow() > -1) {
            String id = (String) idTable.getValueAt(idTable.getSelectedRow(), 0);
            if (shops.containsKey(Integer.valueOf(id))) {
                for (MapleShopItem mapleShopItem : shops.get(Integer.valueOf(id)).getItems()) {
                    if (mapleShopItem.isRechargeableItem()) {
                        continue;
                    }
                    Vector<String> data = new Vector<>();
                    data.add(String.valueOf(mapleShopItem.getPosition()));
                    data.add(String.valueOf(mapleShopItem.getItemId()));
                    data.add(ii.getName(mapleShopItem.getItemId()));
                    data.add(String.valueOf(mapleShopItem.getPrice()));
                    data.add(String.valueOf(mapleShopItem.getTokenItemID()));
                    data.add(String.valueOf(mapleShopItem.getTokenPrice()));
                    data.add(String.valueOf(mapleShopItem.getPointQuestID()));
                    data.add(String.valueOf(mapleShopItem.getPointPrice()));
                    data.add(String.valueOf(mapleShopItem.getPeriod()));
                    data.add(String.valueOf(mapleShopItem.getPotentialGrade()));
                    data.add(String.valueOf(mapleShopItem.getCategory()));
                    data.add(String.valueOf(mapleShopItem.getMinLevel()));
                    data.add(String.valueOf(mapleShopItem.getMaxLevel()));
                    data.add(String.valueOf(mapleShopItem.getSellStart()));
                    data.add(String.valueOf(mapleShopItem.getSellEnd()));
                    data.add(String.valueOf(mapleShopItem.getBuyLimit()));
                    data.add(String.valueOf(mapleShopItem.getBuyLimitWorldAccount()));
                    datas.add(data);
                }
            }

        }
        return new DefaultTableModel(datas, dataTableName);
    }

    @Override
    protected String getIDName(String id) {
        try {
            if (shops.containsKey(Integer.valueOf(id))) {
                int npcid = shops.get(Integer.valueOf(id)).getNpcId();
                return npcid + " - " + MapleLifeFactory.getNpcName(npcid);
            } else {
                return null;
            }
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    protected String getDataName(String id) {
        try {
            return MapleItemInformationProvider.getInstance().getName(Integer.parseInt(id));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    protected boolean hasNameIDTable(int i) {
        return false;
    }

    @Override
    protected boolean hasNameDataTable(int i) {
        return i == 1;
    }

    @Override
    protected void addToChangeList(DataManageMode mode, String id, Vector<String> row) {
        List<Pair<DataManageMode, Vector<String>>> oldrow;
        if (changelist.containsKey(id)) {
            oldrow = changelist.get(id);
        } else {
            oldrow = new LinkedList<>();
        }
        oldrow.add(new Pair<>(mode, row));
        changelist.put(id, oldrow);
        button_apply.setEnabled(true);
    }

    @Override
    protected void applyChange(boolean change) {
        if (!changelist.isEmpty()) {
            String npcid;
            DataManageMode mode;
            Vector<String> row;
            try {
                for (Map.Entry<String, List<Pair<DataManageMode, Vector<String>>>> entry : changelist.entrySet()) {
                    npcid = entry.getKey();
                    for (Pair<DataManageMode, Vector<String>> pair : entry.getValue()) {
                        mode = pair.getLeft();
                        row = pair.getRight();
                        List<MapleShopItem> shopItems = null;
                        switch (mode) {
                            case ID_編輯:
                                MapleShopFactory.getInstance().setShopData(npcid, new MapleShop(Integer.parseInt(row.get(0)), Integer.parseInt(row.get(1))));
                                break;
                            case ID_刪除:
                                if (!shops.containsKey(Integer.valueOf(npcid))) {
                                    shops.put(Integer.valueOf(npcid), new MapleShop(Integer.parseInt(row.get(0)), Integer.parseInt(row.get(1))));
                                } else {
                                    shops.remove(Integer.valueOf(npcid));
                                }
                                MapleShopFactory.getInstance().setShopData(npcid, new MapleShop(Integer.parseInt(row.get(0)), Integer.parseInt(row.get(1))));
                                break;
                            case DATA_編輯:
                                if (row.size() != dataTableName.size()) {
                                    throw new RuntimeException("Drop row index error:" + row.toString() + ":" + dataTableName.toString());
                                }
                                MapleShopItem mapleShopItem = new MapleShopItem(
                                        Integer.parseInt(row.get(1)),
                                        Long.parseLong(row.get(3)),
                                        Integer.parseInt(row.get(0)),
                                        Integer.parseInt(row.get(4)),
                                        Integer.parseInt(row.get(5)),
                                        Integer.parseInt(row.get(6)),
                                        Integer.parseInt(row.get(7)),
                                        Integer.parseInt(row.get(8)),
                                        Integer.parseInt(row.get(9)),
                                        Integer.parseInt(row.get(10)),
                                        Integer.parseInt(row.get(11)),
                                        Integer.parseInt(row.get(12)),
                                        Integer.parseInt(row.get(13)),
                                        Integer.parseInt(row.get(14)),
                                        Integer.parseInt(row.get(15)),
                                        Integer.parseInt(row.get(16)),
                                        (short) 0
                                );
                                if (shops.containsKey(Integer.valueOf(npcid))) {
                                    shops.get(Integer.valueOf(npcid)).addItem(mapleShopItem);
                                } else {
//                                    monsterDropEntries = Collections.singletonList(monsterDropEntry);
//                                    allDrop.put(Integer.valueOf(mobid), monsterDropEntries);
                                }
                                break;
                            case DATA_刪除:
//                                if (allDrop.containsKey(Integer.valueOf(mobid))) {
//                                    monsterDropEntries = allDrop.get(Integer.valueOf(mobid));
//                                    Iterator<MonsterDropEntry> iterator = monsterDropEntries.iterator();
//                                    while (iterator.hasNext()) {
//                                        MonsterDropEntry next = iterator.next();
//                                        if (next.itemId == Integer.valueOf(row.get(0)) &&
//                                                next.minimum == Integer.valueOf(row.get(2)) &&
//                                                next.maximum == Integer.valueOf(row.get(3)) &&
//                                                next.questid == Integer.valueOf(row.get(4)) &&
//                                                next.chance == Double.valueOf(row.get(5).substring(0, row.get(5).length() - 1)) * 10000) {
//                                            iterator.remove();
//                                            break;
//                                        }
//                                    }
//                                }
                                break;
                        }
//                        if (monsterDropEntries == null) {
//                            MapleMonsterInformationProvider.getInstance().removeDropData(Integer.parseInt(mobid));
//                        } else {
//                            MapleMonsterInformationProvider.getInstance().setDropData(mobid, monsterDropEntries);
//                        }
                    }

                }
            } catch (Exception e) {
                log.error("NPC Tab 出錯", e);
            } finally {
                changelist.clear();
            }
        }
    }
}
