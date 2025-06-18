package launch.groups.datamanage;

import com.alee.extended.breadcrumb.WebBreadcrumb;
import com.alee.extended.breadcrumb.WebBreadcrumbToggleButton;
import com.alee.extended.layout.TableLayout;
import com.alee.extended.painter.TitledBorderPainter;
import com.alee.extended.panel.CenterPanel;
import com.alee.extended.panel.GroupPanel;
import com.alee.laf.button.WebButton;
import com.alee.laf.combobox.WebComboBox;
import com.alee.laf.label.WebLabel;
import com.alee.laf.menu.WebPopupMenu;
import com.alee.laf.optionpane.WebOptionPane;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.progressbar.WebProgressBar;
import com.alee.laf.radiobutton.WebRadioButton;
import com.alee.laf.rootpane.WebDialog;
import com.alee.laf.rootpane.WebFrame;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.tabbedpane.WebTabbedPane;
import com.alee.laf.text.WebTextField;
import com.alee.managers.tooltip.TooltipManager;
import com.alee.utils.SwingUtils;
import database.DatabaseConnection;
import database.tools.SqlTool;
import launch.StartGUI;
import server.MapleItemInformationProvider;
import server.RaffleItem;
import server.RafflePool;
import tools.Pair;
import tools.StringUtil;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.*;

public class RafflePane extends TabbedPane {

    private static final LinkedHashMap<String, Object> values = new LinkedHashMap<>();
    private static final LinkedHashMap<String, Object> addValues = new LinkedHashMap<>();
    private static final Vector<String> raffleInfo = new Vector<>();
    protected final GroupPanel raffleInfoGroup = new GroupPanel();
    private final LinkedHashMap<Integer, WebTabbedPane> panels = new LinkedHashMap<>();
    private final WebPanel centerPanel = new WebPanel() {
        {
            setMargin(5, 0, 5, 5);
        }
    };

    RafflePane(WebFrame owner) {
        super(owner);
    }

    @Override
    void init() {
        idTableName.add("獎池名稱");
        idTableName.add("獎池ID");

        values.put("限量", -1);
        values.put("概率", 0);

        addValues.put("期數", 0);
        addValues.put("道具ID", 0);
        addValues.put("限量", -1);
        addValues.put("概率", 0);
        addValues.put("廣播", 0);
        addValues.put("獎池ID", 0);

        raffleInfo.add("當前主打期");
        raffleInfo.add("換期間隔(天)");
        raffleInfo.add("上次更換日期");
    }

    @Override
    String getTitle() {
        return "抽獎獎池";
    }

    @Override
    protected DefaultTableModel getIDTableModel() {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        Vector<Vector<Object>> shopList = new Vector<>();
        for (int type : RafflePool.getAllType()) {
            Vector<Object> data = new Vector<>();
            data.add(ii.getName(type));
            data.add(type);
            shopList.add(data);
        }
        return new DefaultTableModel(shopList, idTableName);
    }

    @Override
    public Component getLeftComponent() {
        WebPanel webPanel = new WebPanel(new BorderLayout(5, 5));

        WebScrollPane scrollPane = new WebScrollPane(idTable);
        idTable.setEditable(false);
        idTable.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
        idTable.setGridColor(Color.LIGHT_GRAY);
        if (showPopmenu()) {
            final WebPopupMenu popupMenu = getTablePopupMenu(true);
            idTable.setComponentPopupMenu(popupMenu);
            scrollPane.setComponentPopupMenu(popupMenu);
        }
        idTable.addMouseListener(new TableMouseAdapter(true));
        idTable.getSelectionModel().addListSelectionListener(e -> {
            if (e.getValueIsAdjusting() || idTable.getRowCount() == 0 || idTable.getSelectedRow() == -1 || !idTable.isEnabled()) {
                return;
            }
            int type = (int) idTable.getValueAt(idTable.getSelectedRow(), 1);
            if (!panels.containsKey(type)) {
                showLoadPanel();
            }
            new SwingWorker<Object, Object>() {
                WebTabbedPane newPanel = null;

                @Override
                public Object doInBackground() {
                    newPanel = panels.computeIfAbsent(type, key -> {
                        WebTabbedPane tabpanel = new WebTabbedPane();
                        List<Integer> subtype = RafflePool.getAllPeriod(type);
                        if (subtype.isEmpty()) {
                            tabpanel.add("常駐", new RaffleItemPane(type, 0));
                        } else {
                            for (int i = 0; i < subtype.size(); i++) {
                                try {
                                    tabpanel.add(subtype.get(i) <= 0 ? "常駐" : ("第" + subtype.get(i) + "期"), new RaffleItemPane(type, subtype.get(i)));
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                        return tabpanel;
                    });
                    return null;
                }

                @Override
                public void done() {
                    if (newPanel != null) {
                        updateCenterPanel(newPanel);
                    }
                    raffleInfoGroup.remove(0);
                    raffleInfoGroup.add(getRaffleInfoPanel());
                    idTable.setEnabled(true);
                    raffleInfoGroup.setEnabled(true);
                }
            }.execute();
        });

        idTable.setModel(getIDTableModel());

        webPanel.setPreferredWidth((int) (launch.StartGUI.DPI * 200));
        webPanel.add(scrollPane);

        raffleInfoGroup.setPreferredWidth((int) (launch.StartGUI.DPI * 200));
        raffleInfoGroup.add(getRaffleInfoPanel());
        webPanel.add(raffleInfoGroup, BorderLayout.SOUTH);

        webPanel.setMargin(5, 5, 5, 0);
        return webPanel;
    }

    protected GroupPanel getRaffleInfoPanel() {
        GroupPanel typeGroup = new GroupPanel(5, false);
        typeGroup.setMargin(5, 5, 0, 5);
        typeGroup.setPreferredWidth((int) (launch.StartGUI.DPI * 190));
        if (idTable.getSelectedRow() < 0 || idTable.getRowCount() <= 0) {
            return typeGroup;
        }
        double[] doubles = new double[raffleInfo.size() + 1];
        Arrays.fill(doubles, 0, doubles.length, TableLayout.PREFERRED);
        typeGroup.setLayout(new TableLayout(new double[]{ TableLayout.PREFERRED, TableLayout.FILL }, doubles, 5, 5));
        int type = (int) idTable.getValueAt(idTable.getSelectedRow(), 1);
        final Map<String, Component> textFields = new HashMap<>();
        int i = 0;
        for (String it : raffleInfo) {
            typeGroup.add(new WebLabel(it, WebLabel.TRAILING), "0," + i);
            final Component compon;
            int defaultvalue;
            switch (it) {
                case "當前主打期":
                    defaultvalue = RafflePool.getPeriod(type);
                    break;
                case "換期間隔(天)":
                    defaultvalue = RafflePool.getDuration(type);
                    break;
                case "上次更換日期":
                    defaultvalue = RafflePool.getDate(type);
                    break;
                default:
                    defaultvalue = 0;
                    break;
            }
            compon = new WebTextField(String.valueOf(defaultvalue), 15);
            textFields.put(it, compon);
            typeGroup.add(compon, "1," + i++);
        }
        typeGroup.add(new CenterPanel(new GroupPanel(5, new WebButton("更變") {
            {
                addActionListener(e -> {
                    for (Map.Entry<String, Component> it : textFields.entrySet()) {
                        if (it.getValue() instanceof WebTextField) {
                            final WebTextField compoent = (WebTextField) it.getValue();
                            if (compoent.getText().isEmpty()) {
                                compoent.setText("0");
                            } else if (!StringUtil.isNumber(compoent.getText()) || compoent.getText().isEmpty()) {
                                WebOptionPane.showMessageDialog(RafflePane.this, compoent.getText() +" 不是一個有效的數值");
                                return;
                            }
                        }
                    }
                    for (Map.Entry<String, Component> it : textFields.entrySet()) {
                        int text = 0;
                        if (it.getValue() instanceof WebTextField) {
                            text = Integer.parseInt(((WebTextField) it.getValue()).getText());
                        } else if (it.getValue() instanceof WebComboBox) {
                            text = ((WebComboBox) it.getValue()).getSelectedIndex();
                        }
                        switch (it.getKey()) {
                            case "當前主打期": {
                                RafflePool.setPeriod(type, text);
                                break;
                            }
                            case "換期間隔(天)": {
                                RafflePool.setDuration(type, text);
                                break;
                            }
                            case "上次更換日期": {
                                RafflePool.setDate(type, text);
                                break;
                            }
                        }
                    }
                    updateToPeriodDB();
                });
            }
        })), "0," + raffleInfo.size() + ",1," + raffleInfo.size());
        typeGroup.setPainter(new TitledBorderPainter("獎池設定"));
        return typeGroup;
    }

    public void updateToPeriodDB() {
        if (idTable.getSelectedRow() < 0 || idTable.getRowCount() <= 0) {
            return;
        }
        DatabaseConnection.domain(con -> {
            int type = (int) idTable.getValueAt(idTable.getSelectedRow(), 1);
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM `raffle_period` WHERE `type` = ? LIMIT 1")) {
                ps.setInt(1, type);
                try (ResultSet rs = ps.executeQuery()) {
                    // 如果存在數據則只刷新
                    if (rs.next()) {
                        SqlTool.update(con, "UPDATE raffle_period SET period = ?, duration = ?, start_date = ? WHERE type = ? LIMIT 1", new Object[] {
                                RafflePool.getPeriod(type),
                                RafflePool.getDuration(type),
                                RafflePool.getDate(type),
                                type
                        });
                    } else {
                        SqlTool.update(con, "INSERT INTO raffle_period(type, period, duration, start_date) VALUES (?, ?, ?, ?)", new Object[]{
                                type,
                                RafflePool.getPeriod(type),
                                RafflePool.getDuration(type),
                                RafflePool.getDate(type)
                        });
                    }
                }
            } catch (SQLException e) {
                log.error("更新獎池重載配置失敗", e);
            }
            return null;
        });
        RafflePool.reload();
    }

    public void showLoadPanel() {
        idTable.setEnabled(false);
        raffleInfoGroup.setEnabled(false);
        WebProgressBar loadprogress = new WebProgressBar();
        loadprogress.setIndeterminate(true);
        loadprogress.setStringPainted(true);
        loadprogress.setString("正在加載獎品訊息,請稍等...");
        updateCenterPanel(new CenterPanel(loadprogress));
    }

    public void updateCenterPanel(Component panel) {
        centerPanel.removeAll();
        if (panel != null) {
            centerPanel.add(panel);
        }
        centerPanel.revalidate();
        centerPanel.repaint();
    }

    @Override
    public WebPanel getCenterComponent() {
        return centerPanel;
    }


    private class RaffleItemPane extends WebPanel {

        private int type;
        private int period;
        private int currentIndex = 0;
        private final int maxitem = 30;
        private final java.util.List<Pair<ItemPanel, RaffleItem>> items = new LinkedList<>();
        private final WebPanel itemPanel;
        private final java.util.List<Pair<ItemPanel, RaffleItem>> allowItems = new ArrayList<>();
        private final java.util.List<Pair<ItemPanel, RaffleItem>> allowItems_not = new ArrayList<>();
        private final WebBreadcrumb breadcrumb;
        private int showType = 0;

        RaffleItemPane(int type, int period) {
            super();
            this.type = type;
            this.period = period;
            itemPanel = new WebPanel(new FlowLayout(FlowLayout.CENTER, 20, 5)) {
                {
                    this.setPreferredSize(new Dimension((int) (launch.StartGUI.DPI * 1150), (int) (launch.StartGUI.DPI * 650)));
                    Map<Integer, RaffleItem> ret = new HashMap<>();
                    RafflePool.getAllItems().forEach(value -> {
                        if (value.getType() ==  type && value.getPeriod() == period) {
                            ret.put(value.getId(), value);
                        }
                    });
                    updateAllItems(ret);
                }
            };
            breadcrumb = new WebBreadcrumb() {
                {
                    fillBreadcrumb(this, items.size());
                }
            };
            updateFilter();
            WebRadioButton alltype = new WebRadioButton("全部", true);
            WebRadioButton uptype = new WebRadioButton("已上架");
            WebRadioButton downtype = new WebRadioButton("已下架");
            alltype.addActionListener(new ChangeTypeActionListener(0));
            uptype.addActionListener(new ChangeTypeActionListener(1));
            downtype.addActionListener(new ChangeTypeActionListener(2));
            WebButton addItem = new WebButton("新增", StartGUI.loadIcon("add.png")) {
                {
                    setRolloverDecoratedOnly(true);
                    setDrawFocus(false);
                    addActionListener(e -> add_Action());
                }
            };
            SwingUtils.groupButtons(alltype, uptype, downtype);
            add(new CenterPanel(new GroupPanel(10, alltype, uptype, downtype, addItem).setMargin(5, 0, 0, 0)), BorderLayout.NORTH);
            add(itemPanel);
            GroupPanel navigatBar = new GroupPanel(
                    new WebButton("頁首") {
                        {
                            addActionListener(e -> spawnPange(getSafeIndex(0)));
                        }
                    },
                    new WebButton("頁尾") {
                        {
                            addActionListener(e -> spawnPange(getSafeIndex(getItemList().size())));
                        }
                    },
                    new WebButton("上一頁") {
                        {
                            addActionListener(e -> spawnPange(getSafeIndex(currentIndex - 1)));
                        }
                    },
                    new WebButton("下一頁") {
                        {
                            addActionListener(e -> spawnPange(getSafeIndex(currentIndex + 1)));
                        }
                    }
            );
            add(new CenterPanel(navigatBar), BorderLayout.SOUTH);
        }

        public void add_Action() {
            final WebDialog dialog = new WebDialog(RafflePane.this.owner, "新增獎品", true);
            final GroupPanel groupPanel = new GroupPanel(5, false);
            Map<String, Object> values = addValues;
            double[] doubles = new double[values.size() + 1];
            Arrays.fill(doubles, 0, doubles.length, TableLayout.PREFERRED);
            groupPanel.setLayout(new TableLayout(new double[]{ TableLayout.PREFERRED, TableLayout.FILL }, doubles, 5, 5));
            final Map<String, Component> textFields = new HashMap<>();
            int i = 0;
            for (Map.Entry<String, Object> it : values.entrySet()) {
                String name = it.getKey();
                groupPanel.add(new WebLabel(name, WebLabel.TRAILING), "0," + i);
                Integer defaultvalue = null;
                switch (name) {
                    case "期數":
                        defaultvalue = period;
                        break;
                    case "獎池ID":
                        defaultvalue = type;
                        break;
                }
                final Component compon = new WebTextField(String.valueOf(defaultvalue == null ? it.getValue() : defaultvalue), 15);
                textFields.put(name, compon);
                groupPanel.add(compon, "1," + i++);
            }
            groupPanel.add(new CenterPanel(new GroupPanel(5, new WebButton("確認") {
                {
                    addActionListener(e -> {
                        for (Map.Entry<String, Component> it : textFields.entrySet()) {
                            if (it.getValue() instanceof WebTextField) {
                                final WebTextField compoent = (WebTextField) it.getValue();
                                if (compoent.getText().isEmpty()) {
                                    compoent.setText("0");
                                } else if (!StringUtil.isNumber(compoent.getText()) || compoent.getText().isEmpty()) {
                                    WebOptionPane.showMessageDialog(dialog, compoent.getText() +" 不是一個有效的數值");
                                    return;
                                }
                            }
                        }
                        RaffleItem ri = new RaffleItem(-1, period, 0, 0, 0, false, type, true);
                        for (Map.Entry<String, Component> it : textFields.entrySet()) {
                            int text = 0;
                            if (it.getValue() instanceof WebTextField) {
                                text = Integer.parseInt(((WebTextField) it.getValue()).getText());
                            } else if (it.getValue() instanceof WebComboBox) {
                                text = ((WebComboBox) it.getValue()).getSelectedIndex();
                            }
                            switch (it.getKey()) {
                                case "期數":
                                    ri.setPeriod(text);
                                    break;
                                case "道具ID":
                                    ri.setItemId(text);
                                    break;
                                case "限量":
                                    ri.setQuantity(text);
                                    break;
                                case "概率":
                                    ri.setChance(text);
                                    break;
                                case "獎池ID":
                                    ri.setType(text);
                                    break;
                                case "廣播":
                                    ri.setSmega(text != 0);
                                    break;
                            }
                        }
                        updateToPoolDB(ri, true);
                        dialog.dispose();
                    });
                }
            }, new WebButton("取消") {
                {
                    addActionListener(e -> dialog.dispose());
                }
            })), "0," + values.size() + ",1," + values.size());
            groupPanel.setMargin(10, 20, 10, 20);
            dialog.add(new CenterPanel(groupPanel));
            dialog.pack();
            dialog.setLocationRelativeTo(RafflePane.this);
            dialog.setVisible(true);
        }

        public void updateAllItems(Map<Integer, RaffleItem> itemsCache) {
            items.clear();
            java.util.List<Map.Entry<Integer, RaffleItem>> allitems = new ArrayList<>();
            allitems.addAll(itemsCache.entrySet());
            allitems.sort((o1, o2) -> Boolean.compare(o2.getValue().isAllow(), o1.getValue().isAllow()));
            allitems.forEach(it -> items.add(new Pair<>(new ItemPanel(RaffleItemPane.this, it.getValue()), it.getValue())));
        }

        public void updateFilter() {
            allowItems.clear();
            allowItems_not.clear();
            for (Pair<ItemPanel, RaffleItem> it : items) {
                if (it.right.isAllow()) {
                    allowItems.add(it);
                } else {
                    allowItems_not.add(it);
                }
            }
        }

        public int getSafeIndex(int index) {
            int ret = index;
            int safeIndex = getItemList().size() / maxitem;
            if (index < 0) {
                ret = 0;
            } else if (index > safeIndex) {
                ret = safeIndex;
            }
            currentIndex = ret;
            for (Component it : breadcrumb.getComponents()) {
                if (it instanceof WebBreadcrumbToggleButton && ((WebBreadcrumbToggleButton) it).getText().equals(String.valueOf(ret))) {
                    ((WebBreadcrumbToggleButton) it).setSelected(true);
                    break;
                }
            }
            return ret;
        }

        public void fillBreadcrumb(WebBreadcrumb b, int x) {
            for (int i = 0; i <= x / maxitem; i++) {
                final int n = i;
                WebBreadcrumbToggleButton button = new WebBreadcrumbToggleButton(String.valueOf(n)) {
                    {
                        addActionListener(e -> spawnPange(n));
                    }
                };
                // 默認點擊首頁
                if (n == 0) {
                    button.doClick();
                }
                b.add(button);
            }
            SwingUtils.groupButtons(b);
        }

        public void spawnPange(int index) {
            java.util.List<Pair<ItemPanel, RaffleItem>> filterItems = getItemList();
            itemPanel.removeAll();
            for (int i = maxitem * index; i < Math.min(filterItems.size(), maxitem * (index + 1)); i++) {
                itemPanel.add(filterItems.get(i).left);
            }
            itemPanel.revalidate();
            itemPanel.repaint();
            currentIndex = index;
        }

        public List<Pair<ItemPanel, RaffleItem>> getItemList() {
            return showType == 1 ? allowItems : (showType == 2 ? allowItems_not : items);
        }

        private class ChangeTypeActionListener implements ActionListener {
            private final int type;

            ChangeTypeActionListener(int type) {
                this.type = type;
            }

            @Override
            public void actionPerformed(ActionEvent e) {
                if (showType != type) {
                    showType = type;
                    breadcrumb.removeAll();
                    fillBreadcrumb(breadcrumb, getItemList().size());
                    spawnPange(0);
                }
            }

        }

        public void updateToPoolDB(RaffleItem ri, boolean isChange) {
            boolean add = ri.getId() < 0;
            DatabaseConnection.domain(con -> {
                if (isChange) {
                    try (PreparedStatement ps = con.prepareStatement("SELECT * FROM `raffle_pool` WHERE `id` = ? LIMIT 1")) {
                        ps.setInt(1, ri.getId());
                        try (ResultSet rs = ps.executeQuery()) {
                            // 如果存在數據則只刷新
                            if (rs.next() && ri.getId() != -1) {
                                SqlTool.update(con, "UPDATE raffle_pool SET period = ?, itemId = ?, quantity = ?, chance = ?, smega = ?, type = ?, allow = ? WHERE id = ? LIMIT 1", new Object[] {
                                        ri.getPeriod(),
                                        ri.getItemId(),
                                        ri.getQuantity(),
                                        ri.getChance(),
                                        ri.isSmega() ? (byte) 1 : (byte) 0,
                                        ri.getType(),
                                        ri.isAllow() ? (byte) 1 : (byte) 0,
                                        ri.getId()
                                });
                            } else {
                                SqlTool.update(con, "INSERT INTO raffle_pool(period, itemId, quantity, chance, smega, type, allow) VALUES (?, ?, ?, ?, ?, ?, ?)", new Object[]{
                                        ri.getPeriod(),
                                        ri.getItemId(),
                                        ri.getQuantity(),
                                        ri.getChance(),
                                        ri.isSmega() ? (byte) 1 : (byte) 0,
                                        ri.getType(),
                                        ri.isAllow() ? (byte) 1 : (byte) 0
                                });
                                try (PreparedStatement pss = con.prepareStatement("SELECT id FROM raffle_pool WHERE period = ? AND itemId = ? AND quantity = ? AND chance = ? AND smega = ? AND type = ? AND allow = ? ORDER BY id DESC LIMIT 1")) {
                                    pss.setInt(1, ri.getPeriod());
                                    pss.setInt(2, ri.getItemId());
                                    pss.setInt(3, ri.getQuantity());
                                    pss.setInt(4, ri.getChance());
                                    pss.setByte(5, ri.isSmega() ? (byte) 1 : (byte) 0);
                                    pss.setInt(6, ri.getType());
                                    pss.setByte(7, ri.isAllow() ? (byte) 1 : (byte) 0);
                                    try (ResultSet rss = pss.executeQuery()) {
                                        if (rss.next()) {
                                            ri.setId(rss.getInt("id"));
                                        }
                                    }
                                }
                            }
                        }
                    } catch (SQLException e) {
                        log.error("更新獎池重載道具數據失敗", e);
                    }
                } else {
                    try (PreparedStatement ps = con.prepareStatement("DELETE FROM raffle_pool WHERE id = ? LIMIT 1")) {
                        ps.setInt(1, ri.getId());
                        ps.executeUpdate();
                    } catch (SQLException e) {
                        log.error("移除獎池道具失敗", e);
                    }
                }
                return null;
            });
            List<Integer> oldTypes = new LinkedList<>(RafflePool.getAllType());
            RafflePool.reload();
            List<Integer> newTypes = new LinkedList<>(RafflePool.getAllType());
            int selectType = (int) idTable.getValueAt(idTable.getSelectedRow(), 1);
            if (oldTypes.contains(ri.getType()) != newTypes.contains(ri.getType())) {
                idTable.setModel(getIDTableModel());
                idTable.setSelectedRow(-1);
                if (newTypes.contains(selectType)) {
                    for (int i = 0; i < idTable.getRowCount(); i++) {
                        if (((int) idTable.getValueAt(i, 1)) == selectType) {
                            idTable.setSelectedRow(i);
                            break;
                        }
                    }
                }
            }
            if (panels.containsKey(ri.getType())) {
                RaffleItemPane rip = null;
                for (int i = 0; i < panels.get(ri.getType()).getTabCount(); i++) {
                    Component component = panels.get(ri.getType()).getComponentAt(i);
                    if (component instanceof RaffleItemPane) {
                        rip = (RaffleItemPane) component;
                        if (rip.period == ri.getPeriod()) {
                            break;
                        } else {
                            rip = null;
                        }
                    }
                }
                if (!newTypes.contains(ri.getType())) {
                    panels.remove(ri.getType());
                    if (selectType == ri.getType()) {
                        idTable.setSelectedRow(-1);
                    }
                } else if (add && rip == null) {
                    panels.get(ri.getType()).add(ri.getPeriod() <= 0 ? "常駐" : ("第" + ri.getPeriod() + "期"), new RaffleItemPane(ri.getType(), ri.getPeriod()));
                } else if ((add || !isChange) && rip != null) {
                    Map<Integer, RaffleItem> ret = new HashMap<>();
                    RafflePool.getAllItems().forEach(value -> {
                        if (value.getType() ==  ri.getType() && value.getPeriod() == ri.getPeriod()) {
                            ret.put(value.getId(), value);
                        }
                    });
                    if (ret.isEmpty()) {
                        panels.get(ri.getType()).remove(rip);
                    } else {
                        rip.updateAllItems(ret);
                        rip.breadcrumb.removeAll();
                        rip.fillBreadcrumb(rip.breadcrumb, rip.getItemList().size());
                        rip.spawnPange(rip.currentIndex);
                    }
                }
            }

            if (idTable.getSelectedRow() == -1) {
                updateCenterPanel(null);
                raffleInfoGroup.remove(0);
            }
        }
    }

    private class ItemPanel extends WebPanel {
        private final RaffleItemPane owner;
        private final RaffleItem ri;
        private final WebLabel itemName = new WebLabel();
        private final WebLabel itemInfo = new WebLabel();
        private final WebLabel itemIcon = new WebLabel();
        private String itemName_ = null;

        public String getItemName_() {
            if (itemName_ == null) {
                itemName_ = MapleItemInformationProvider.getInstance().getName(ri.getItemId());
            }
            return itemName_;
        }


        ItemPanel(RaffleItemPane owner, RaffleItem ri) {
            this.owner = owner;
            this.ri = ri;
            setBorder(BorderFactory.createMatteBorder(5, 5, 30, 30, Color.GRAY));
            setPreferredSize(new Dimension((int) (launch.StartGUI.DPI * 200), (int) (launch.StartGUI.DPI * 95)));
            updateLabel(true);
            WebButton smegaButton = new WebButton(getSmega(ri.isSmega()));
            WebButton allowButton = new WebButton(getAllow(ri.isAllow()));
            WebButton change_button = new WebButton("更變");
            WebButton delete_button = new WebButton("移除");
            TooltipManager.setTooltip(this, "<html><div style=\"width:" + ((int) (launch.StartGUI.DPI * 200)) + "px\"><center>道具ID: " + ri.getItemId() + "</center><br><p>" + this.replaceHtmlFormat(MapleItemInformationProvider.getInstance().getDesc(ri.getItemId())) + "</p></div><html>");

            // 添加按鈕的事件監聽
            smegaButton.addActionListener(e -> {
                smegaChange_Action();
                smegaButton.setText(getSmega(ri.isSmega()));
                owner.updateFilter();
            });
            allowButton.addActionListener(e -> {
                allowChange_Action();
                allowButton.setText(getAllow(ri.isAllow()));
                owner.updateFilter();
            });
            change_button.addActionListener(e -> change_Action());
            delete_button.addActionListener(e -> delete_Action());

            // 修飾Item面板的效果
            setUndecorated(false);

            add(itemIcon, BorderLayout.WEST);
            add(new GroupPanel(false, itemName, itemInfo).setMargin(0, 10, 10, 0));
            add(new CenterPanel(new GroupPanel(new GroupPanel(5, smegaButton, allowButton, change_button, delete_button))), BorderLayout.SOUTH);
            setMargin(8);
            setRound(10);
        }

        public String replaceHtmlFormat(String text) {
            if (text == null || text.isEmpty()) {
                return "無描述";
            }
            String ret = text.replace("\\r\\n", "<br>").replace("\\n", "<getFitOptionList>");
            if (ret.contains("#c")) {
                ret = ret.replace("#c", "<font color=\"orange\">");
                ret = ret.replace("#", "</font>");
            }
            return ret;
        }

        public String getSmega(boolean isSmega) {
            return (isSmega ? "關" : "開") + "廣";
        }

        public String getAllow(boolean isUp) {
            return (isUp ? "下" : "上") + "架";
        }

        public void smegaChange_Action() {
            ri.setSmega(!ri.isSmega());
            updateLabel(false);
            updateToDB(true);
        }

        public void allowChange_Action() {
            ri.setAllow(!ri.isAllow());
            updateLabel(false);
            updateToDB(true);
        }

        public void change_Action() {
            final WebDialog dialog = new WebDialog(RafflePane.this.owner, "名稱:" + getItemName_() + "  道具ID:" + ri.getItemId(), true);
            final GroupPanel groupPanel = new GroupPanel(5, false);
            Map<String, Object> values = RafflePane.values;
            double[] doubles = new double[values.size() + 1];
            Arrays.fill(doubles, 0, doubles.length, TableLayout.PREFERRED);
            groupPanel.setLayout(new TableLayout(new double[]{ TableLayout.PREFERRED, TableLayout.FILL }, doubles, 5, 5));
            final Map<String, Component> textFields = new HashMap<>();
            int i = 0;
            for (Map.Entry<String, Object> it : values.entrySet()) {
                String name = it.getKey();
                groupPanel.add(new WebLabel(name, WebLabel.TRAILING), "0," + i);
                int defaultvalue;
                switch (name) {
                    case "限量":
                        defaultvalue = ri.getQuantity();
                        break;
                    case "概率":
                        defaultvalue = ri.getChance();
                        break;
                    default:
                        defaultvalue = 0;
                        break;
                }
                final Component compon = new WebTextField(String.valueOf(defaultvalue), 15);
                textFields.put(name, compon);
                groupPanel.add(compon, "1," + i++);
            }
            groupPanel.add(new CenterPanel(new GroupPanel(5, new WebButton("確認") {
                {
                    addActionListener(e -> {
                        for (Map.Entry<String, Component> it : textFields.entrySet()) {
                            if (it.getValue() instanceof WebTextField) {
                                final WebTextField compoent = (WebTextField) it.getValue();
                                if (compoent.getText().isEmpty()) {
                                    compoent.setText("0");
                                } else if (!StringUtil.isNumber(compoent.getText()) || compoent.getText().isEmpty()) {
                                    WebOptionPane.showMessageDialog(dialog, compoent.getText() +" 不是一個有效的數值");
                                    return;
                                }
                            }
                        }
                        for (Map.Entry<String, Component> it : textFields.entrySet()) {
                            int text = 0;
                            if (it.getValue() instanceof WebTextField) {
                                text = Integer.parseInt(((WebTextField) it.getValue()).getText());
                            } else if (it.getValue() instanceof WebComboBox) {
                                text = ((WebComboBox) it.getValue()).getSelectedIndex();
                            }
                            switch (it.getKey()) {
                                case "限量":
                                    ri.setQuantity(text);
                                    break;
                                case "概率":
                                    ri.setChance(text);
                                    break;
                            }
                        }
                        updateLabel(true);
                        updateToDB(true);
                        dialog.dispose();
                    });
                }
            }, new WebButton("取消") {
                {
                    addActionListener(e -> dialog.dispose());
                }
            })), "0," + values.size() + ",1," + values.size());
            groupPanel.setMargin(10, 20, 10, 20);
            dialog.add(new CenterPanel(groupPanel));
            dialog.pack();
            dialog.setLocationRelativeTo(RafflePane.this);
            dialog.setVisible(true);
        }

        public void delete_Action() {
            final WebDialog dialog = new WebDialog(RafflePane.this.owner, "移除獎品", true);
            final GroupPanel groupPanel = new GroupPanel(5, false);
            groupPanel.add(new WebLabel("是否確認要移除 " + getItemName_() + "(" + ri.getItemId() + ") ?"));
            groupPanel.add(new CenterPanel(new GroupPanel(5, new WebButton("確認") {
                {
                    addActionListener(e -> {
                        updateToDB(false);
                        dialog.dispose();
                    });
                }
            }, new WebButton("取消") {
                {
                    addActionListener(e -> dialog.dispose());
                }
            })), "0," + values.size() + ",1," + values.size());
            groupPanel.setMargin(10, 20, 10, 20);
            dialog.add(new CenterPanel(groupPanel));
            dialog.pack();
            dialog.setLocationRelativeTo(RafflePane.this);
            dialog.setVisible(true);
        }

        public void updateToDB(boolean isChange) {
            owner.updateToPoolDB(ri, isChange);
        }

        private int ceilpref(int x, int y) {
            return (int)((x - y) / y * 100.0);
        }

        public void updateLabel(boolean all) {
            if (all) {
                int inlink = MapleItemInformationProvider.getInstance().getInLinkID(ri.getItemId());
                this.itemIcon.setIcon(loadIcon(inlink != 0 ? inlink : ri.getItemId()));
                this.itemName.setText(getItemName_());
                itemInfo.setText("ID:" + ri.getId() + "  概率:" + (ri.getChance() / 100) + "." + (ri.getChance() % 100 > 0 ? (ri.getChance() % 100) : "00") + "%  " + (ri.getQuantity() < 0 ? "不限量" : ("限量" + ri.getQuantity() + "個")));
            }
            this.itemName.setForeground(ri.isSmega() ? Color.BLUE : Color.BLACK);
            setBorderColor(ri.isAllow() ? Color.magenta : Color.lightGray);
        }

        public ImageIcon loadIcon(int id) {
            java.net.URL url = getClass().getResource("/image/" + id + ".png");
            if (url != null) {
                return new ImageIcon(url);
            } else {
                return new ImageIcon("config\\icon\\" + id + ".png");
            }
        }
    }
}
