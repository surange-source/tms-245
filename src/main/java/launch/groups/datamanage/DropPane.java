package launch.groups.datamanage;

import com.alee.laf.rootpane.WebFrame;
import server.MapleItemInformationProvider;
import server.life.MapleLifeFactory;
import server.life.MapleMonsterInformationProvider;
import server.life.MonsterDropEntry;
import server.life.MonsterGlobalDropEntry;
import tools.types.Pair;

import javax.swing.table.DefaultTableModel;
import java.util.*;
import java.util.stream.Collectors;

public class DropPane extends TabbedPane {

    private final Map<Integer, java.util.List<MonsterDropEntry>> allDrop = new TreeMap<>();
    private final Map<String, Pair<Boolean, DefaultTableModel>> modelMap = new LinkedHashMap<>();
    private final Map<String, List<Pair<DataManageMode, Vector<String>>>> changelist = new LinkedHashMap<>();

    DropPane(WebFrame owner) {
        super(owner);
    }

    @Override
    void init() {
        idTableName.add("怪物ID");
        idTableName.add("怪物名稱");

        dataTableName.add("掉寶ID");
        dataTableName.add("道具ID");
        dataTableName.add("道具名稱");
        dataTableName.add("最小掉寶數量");
        dataTableName.add("最大掉寶數量");
        dataTableName.add("關聯任務ID");
        dataTableName.add("掉寶概率%");
        dataTableName.add("頻道設定");
        dataTableName.add("最小怪物等級");
        dataTableName.add("最大怪物等級");
        dataTableName.add("獨立掉寶");
        dataTableName.add("道具期限");

        load();
    }

    void clearDrops() {
        allDrop.clear();
        modelMap.clear();
        load();
    }

    void load() {
        MapleMonsterInformationProvider.getInstance().getAllDrop().entrySet()
                .parallelStream()
                .forEach(i -> allDrop.put(i.getKey(), i.getValue().parallelStream().filter(m -> m.id > 0).collect(Collectors.toList())));

        Vector<Vector<String>> alldata = new Vector<>(), normaldata = new Vector<>(), bossdata = new Vector<>(), globaldata = new Vector<>();

        Vector<String> data;
        for (Integer mobid : allDrop.keySet()) {
            data = new Vector<>();
            data.add(mobid.toString());
            data.add(MapleLifeFactory.getMonsterName(mobid));
            if (MapleLifeFactory.isBoss(mobid)) {
                bossdata.add(data);
            } else {
                normaldata.add(data);
            }
            alldata.add(data);
        }

        // 全局爆率
        for (MonsterGlobalDropEntry entry : MapleMonsterInformationProvider.getInstance().getGlobalDrop()) {
            if (entry.id <= 0) {
                continue;
            }
            data = new Vector<>();
            data.add(String.valueOf(entry.id));
            data.add(String.valueOf(entry.itemId));
            data.add(getDataName(entry.itemId));
            data.add(String.valueOf(entry.Minimum));
            data.add(String.valueOf(entry.Maximum));
            data.add(String.valueOf(entry.questid));
            data.add((entry.chance == 0 ? "0" : String.valueOf((double) entry.chance / 10000)) + "%");
            data.add(entry.channels.toString());
            data.add(String.valueOf(entry.minMobLevel));
            data.add(String.valueOf(entry.maxMobLevel));
            data.add(String.valueOf(entry.onlySelf));
            data.add(String.valueOf(entry.period));
            globaldata.add(data);
        }

        modelMap.put("全部怪物", new Pair<>(true, new DefaultTableModel(alldata, idTableName)));
        modelMap.put("普通怪物", new Pair<>(true, new DefaultTableModel(normaldata, idTableName)));
        modelMap.put("BOSS", new Pair<>(true, new DefaultTableModel(bossdata, idTableName)));
        modelMap.put("全域掉寶率", new Pair<>(false, new DefaultTableModel(globaldata, dataTableName)));
    }

    @Override
    String getTitle() {
        return "怪物掉寶";
    }

    @Override
    protected DefaultTableModel getIDTableModel() {
        return modelMap.get("全部怪物").getRight();
    }

    @Override
    protected Map<String, Pair<Boolean, DefaultTableModel>> getMultiIDTableModel() {
        return modelMap;
    }

    @Override
    protected DefaultTableModel getDataTableModel() {
        Vector<Vector<String>> datas = new Vector<>();
        if (idTable.getSelectedRow() > -1) {
            String id = (String) idTable.getValueAt(idTable.getSelectedRow(), 0);
            if (allDrop.containsKey(Integer.valueOf(id))) {
                for (MonsterDropEntry entry : allDrop.get(Integer.valueOf(id))) {
                    Vector<String> data = new Vector<>();
                    data.add(String.valueOf(entry.id));
                    data.add(String.valueOf(entry.itemId));
                    data.add(getDataName(entry.itemId));
                    data.add(String.valueOf(entry.minimum));
                    data.add(String.valueOf(entry.maximum));
                    data.add(String.valueOf(entry.questid));
                    data.add((entry.chance == 0 ? "0" : String.valueOf((double) entry.chance / 10000)) + "%");
                    data.add(entry.channels.toString());
                    data.add("0");
                    data.add("0");
                    data.add(String.valueOf(entry.onlySelf));
                    data.add(String.valueOf(entry.period));
                    datas.add(data);
                }
            }
        }
        return new DefaultTableModel(datas, dataTableName);
    }

    @Override
    protected Vector<String> getDefaultDataVector() {
        Vector<String> ret = new Vector<>();
        ret.add("");
        ret.add("");
        ret.add("");
        ret.add("1");
        ret.add("1");
        ret.add("0");
        ret.add("0%");
        ret.add("");
        ret.add("0");
        ret.add("0");
        ret.add("false");
        ret.add("0");
        return ret;
    }

    @Override
    protected String getIDName(String id) {
        try {
            return MapleLifeFactory.getMonsterName(Integer.parseInt(id));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @Override
    protected String getDataName(String id) {
        try {
            return getDataName(Integer.parseInt(id));
        } catch (NumberFormatException e) {
            return null;
        }
    }

    protected String getDataName(int itemId) {
        switch (itemId) {
            case 0:
                return "楓幣";
            case -1:
                return "樂豆點";
            case -2:
                return "楓葉點數";
            case -3:
                return "里程";
        }
        return MapleItemInformationProvider.getInstance().getName(itemId);
    }

    @Override
    protected void addToChangeList(DataManageMode mode, String id, Vector<String> row) {
        List<Pair<DataManageMode, Vector<String>>> oldrow;
        if ((mode == DataManageMode.DATA_編輯 || mode == DataManageMode.DATA_添加) && row.get(0).equals("0")) {
            Map<String, List<Pair<DataManageMode, Vector<String>>>> ochangelist = new LinkedHashMap<>(changelist);
            changelist.clear();
            oldrow = new LinkedList<>();
            oldrow.add(new Pair<>(mode, row));
            changelist.put(id, oldrow);
            applyChange(true);
            changelist.clear();
            changelist.putAll(ochangelist);
        } else {
            if (changelist.containsKey(id)) {
                oldrow = changelist.get(id);
            } else {
                oldrow = new LinkedList<>();
            }
            oldrow.add(new Pair<>(mode, row));
            changelist.put(id, oldrow);
            button_apply.setEnabled(true);
        }
    }

    @Override
    protected void applyChange(boolean change) {
        if (!changelist.isEmpty()) {
            String mobid;
            DataManageMode mode;
            try {
                for (Map.Entry<String, List<Pair<DataManageMode, Vector<String>>>> entry : changelist.entrySet()) {
                    mobid = entry.getKey();
                    for (Pair<DataManageMode, Vector<String>> pair : entry.getValue()) {
                        mode = pair.getLeft();
                        final Vector<String> row = pair.getRight();
                        List<MonsterDropEntry> monsterDropEntries = null;
                        MonsterGlobalDropEntry monsterGlobalDropEntry = null;
                        boolean global = false;
                        switch (mode) {
                            case ID_編輯:
                                break;
                            case ID_刪除:
                                if (!allDrop.containsKey(Integer.valueOf(mobid))) {
                                    monsterDropEntries = Collections.emptyList();
                                    allDrop.put(Integer.valueOf(mobid), monsterDropEntries);
                                } else {
                                    allDrop.remove(Integer.valueOf(mobid));
                                }
                                break;
                            case DATA_添加: {
                                global = true;
                                monsterGlobalDropEntry = new MonsterGlobalDropEntry(
                                        Integer.parseInt(row.get(0)),
                                        Integer.parseInt(row.get(1)),
                                        (int) (Double.parseDouble(row.get(6).substring(0, row.get(6).length() - 1)) * 10000),
                                        -1,
                                        (byte) 0,
                                        Integer.parseInt(row.get(3)),
                                        Integer.parseInt(row.get(4)),
                                        Integer.parseInt(row.get(5)),
                                        Integer.parseInt(row.get(8)),
                                        Integer.parseInt(row.get(9)),
                                        Boolean.getBoolean(row.get(10)),
                                        Integer.parseInt(row.get(11)),
                                        "控制台新增");
                                String[] split = row.get(7).replace("[", "").replace("]", "").replace(" ", "").split(",");
                                Set<Integer> collect = Arrays.stream(split).filter(it -> !it.isEmpty()).map(Integer::valueOf).collect(Collectors.toSet());
                                monsterGlobalDropEntry.channels.addAll(collect);
                                break;
                            }
                            case DATA_編輯: {
                                if (row.size() != dataTableName.size()) {
                                    throw new RuntimeException("Drop row index error");
                                }
                                MonsterDropEntry monsterDropEntry = new MonsterDropEntry(
                                        Integer.parseInt(row.get(0)),
                                        Integer.parseInt(row.get(1)),
                                        (int) (Double.parseDouble(row.get(6).substring(0, row.get(6).length() - 1)) * 10000),
                                        Integer.parseInt(row.get(3)),
                                        Integer.parseInt(row.get(4)),
                                        Integer.parseInt(row.get(5)),
                                        Boolean.getBoolean(row.get(10)),
                                        Integer.parseInt(row.get(11)),
                                        "控制台編輯");
                                String[] split = row.get(7).replace("[", "").replace("]", "").replace(" ", "").split(",");
                                Set<Integer> collect = Arrays.stream(split).filter(it -> !it.isEmpty()).map(Integer::valueOf).collect(Collectors.toSet());
                                monsterDropEntry.channels.addAll(collect);
                                if (allDrop.containsKey(Integer.valueOf(mobid))) {
                                    monsterDropEntries = allDrop.get(Integer.valueOf(mobid));
                                    monsterDropEntries.removeIf(monsterDropEntry1 -> monsterDropEntry1.id == monsterDropEntry.id);
                                    monsterDropEntries.add(monsterDropEntry);
                                } else {
                                    monsterDropEntries = Collections.singletonList(monsterDropEntry);
                                    allDrop.put(Integer.valueOf(mobid), monsterDropEntries);
                                }
                                break;
                            }
                            case DATA_刪除:
                                if (idTable.isVisible()) {
                                    if (allDrop.containsKey(Integer.valueOf(mobid))) {
                                        monsterDropEntries = allDrop.get(Integer.valueOf(mobid));
                                        monsterDropEntries.removeIf(monsterDropEntry1 -> monsterDropEntry1.id == Integer.parseInt(row.get(0)));
                                    }
                                } else {
                                    global = true;
                                }
                                break;
                        }
                        if (global) {
                            MapleMonsterInformationProvider.getInstance().setGlobalDropData(mobid, monsterGlobalDropEntry);
                        } else if (monsterDropEntries == null) {
                            MapleMonsterInformationProvider.getInstance().removeDropData(Integer.parseInt(mobid));
                        } else {
                            MapleMonsterInformationProvider.getInstance().setDropData(mobid, monsterDropEntries);
                        }
                    }
                }
                clearDrops();
            } finally {
                changelist.clear();
            }
        }
    }
}
