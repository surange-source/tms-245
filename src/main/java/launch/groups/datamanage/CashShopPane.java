package launch.groups.datamanage;

import com.alee.extended.breadcrumb.WebBreadcrumb;
import com.alee.extended.breadcrumb.WebBreadcrumbToggleButton;
import com.alee.extended.layout.TableLayout;
import com.alee.extended.panel.CenterPanel;
import com.alee.extended.panel.GroupPanel;
import com.alee.laf.button.WebButton;
import com.alee.laf.combobox.WebComboBox;
import com.alee.laf.label.WebLabel;
import com.alee.laf.list.WebList;
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
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.MapleItemInformationProvider;
import server.cashshop.CashItemFactory;
import server.cashshop.CashItemInfo;
import server.cashshop.CashItemInfo.CashModInfo;
import server.cashshop.CashShopType;
import tools.Pair;
import tools.StringUtil;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.List;

public class CashShopPane extends TabbedPane {



    private final Logger log = LogManager.getLogger();
    private static final LinkedHashMap<String, Object> values = new LinkedHashMap<>();
    private final LinkedHashMap<Integer, WebTabbedPane> panels = new LinkedHashMap<>();
    private final WebPanel centerPanel = new WebPanel() {
        {
            setMargin(5, 0, 5, 5);
        }
    };
    private final WebList typelist = new WebList(CashShopType.values()) {
        {
            setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
            setFixedCellHeight(50);
            setFixedCellWidth(50);
            setFontSize(20);
        }
    };

    CashShopPane(WebFrame owner) {
        super(owner);
    }

    @Override
    public void init() {
        values.put("道具ID", 0);
        values.put("道具數量", 0);
        values.put("產品類型", new String[] { "新品", "折扣", "人氣", "活動", "限量" });
        values.put("價格", 0);
        values.put("開始銷售時間", 0);
        values.put("停止銷售時間", 0);
        values.put("性別", new String[] { "男", "女", "全部" });
        values.put("等級", 0);
        values.put("人氣", 0);

        panels.put(CashShopType.搜尋結果.ordinal(), new WebTabbedPane() {
            {
                add(CashShopType.搜尋結果.name(), new CashShopItemPane((CashShopType.搜尋結果.ordinal() + 10) * 100));
            }
        });
    }

    @Override
    public String getTitle() {
        return "遊戲商城";
    }

    @Override
    public boolean isSelectedSearchResult() {
        return true;
    }

    @Override
    public boolean isSelectedSearchFuzzy() {
        return false;
    }

    @Override
    public Component getLeftComponent() {
        typelist.addListSelectionListener(e -> {
            if (e.getValueIsAdjusting() && typelist.isEnabled()) {
                if (!panels.containsKey(typelist.getSelectedIndex())) {
                    showLoadPanel();
                }
                new SwingWorker<Object, Object>() {
                    WebTabbedPane newPanel = null;

                    @Override
                    public Object doInBackground() {
                        newPanel = panels.computeIfAbsent(typelist.getSelectedIndex(), key -> {
                            WebList source = (WebList) e.getSource();
                            WebTabbedPane tabpanel = new WebTabbedPane();
                            String selected = source.getSelectedValue().toString();
                            String[] subtype = CashShopType.valueOf(selected).getSubtype();
                            if (subtype.length == 0) {
                                subtype = new String[]{ selected };
                            }
                            CashShopType shopType = CashShopType.valueOf(selected);
                            for (int i = 0; i < subtype.length; i++) {
                                try {
                                    tabpanel.add(subtype[i], new CashShopItemPane((shopType.ordinal() + 10) * 100 + i));
                                } catch (Exception e) {
                                    e.printStackTrace();
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
                        typelist.setEnabled(true);
                    }
                }.execute();
            }
        });
        WebPanel webPanel = new WebPanel(new BorderLayout(5, 5));
        webPanel.setPreferredWidth((int) (launch.StartGUI.DPI * 200));
        webPanel.add(getSearchGroup(), BorderLayout.NORTH);
        webPanel.add(new WebScrollPane(typelist));
        webPanel.setMargin(5, 5, 5, 0);
        return webPanel;
    }

    @Override
    public void doSearchAction(String result) {
        if (result.isEmpty()) {
            return;
        }
        showLoadPanel();
        typelist.setSelectedIndex(typelist.getModelSize() - 1);
        new SwingWorker<Object, Object>() {
            WebTabbedPane searchPanel = null;

            @Override
            public Object doInBackground() {

                searchPanel = panels.entrySet().iterator().next().getValue();
                for (Component it : searchPanel.getComponents()) {
                    if (it instanceof CashShopItemPane) {
                        Map<Integer, CashItemInfo> ret = new HashMap<>();
                        CashItemFactory.getInstance().getAllItem().entrySet().parallelStream().filter(e -> {
                            if (e.getKey() < 100000000) {
                                return false;
                            } else if (StringUtil.isNumber(result)) {
                                return e.getKey() == Integer.parseInt(result) || e.getValue().getItemId() == Integer.parseInt(result);
                            } else {
                                return MapleItemInformationProvider.getInstance().getName(e.getValue().getItemId()).equals(result);
                            }
                        }).forEach(e -> ret.put(e.getKey(), e.getValue()));
                        System.out.println(ret.size());
                        ((CashShopItemPane) it).updateAllItems(ret);
                        ((CashShopItemPane) it).spawnPange(0);
                    }
                }
                return null;
            }

            @Override
            public void done() {
                updateCenterPanel(searchPanel);
                typelist.setEnabled(true);
            }
        }.execute();
    }

    public void showLoadPanel() {
        typelist.setEnabled(false);
        WebProgressBar loadprogress = new WebProgressBar();
        loadprogress.setIndeterminate(true);
        loadprogress.setStringPainted(true);
        loadprogress.setString("正在加載商品訊息,請稍等...");
        updateCenterPanel(new CenterPanel(loadprogress));
    }

    public void updateCenterPanel(Component panel) {
        centerPanel.removeAll();
        centerPanel.add(panel);
        centerPanel.revalidate();
        centerPanel.repaint();
    }

    @Override
    public WebPanel getCenterComponent() {
        return centerPanel;
    }


    private class CashShopItemPane extends WebPanel {

        private int type;
        private int currentIndex = 0;
        private final int maxitem = 30;
        private final List<Pair<ItemPanel, CashItemInfo>> items = new LinkedList<>();
        private final WebPanel itemPanel;
        private final List<Pair<ItemPanel, CashItemInfo>> onSaleItems = new ArrayList<>();
        private final List<Pair<ItemPanel, CashItemInfo>> onSaleItems_not = new ArrayList<>();
        private final WebBreadcrumb breadcrumb;
        private int showType = 0;

        CashShopItemPane(int type) {
            super();
            this.type = type;
            itemPanel = new WebPanel(new FlowLayout(FlowLayout.CENTER, 20, 5)) {
                {
                    this.setPreferredSize(new Dimension((int) (launch.StartGUI.DPI * 1150), (int) (launch.StartGUI.DPI * 650)));
                    Map<Integer, CashItemInfo> ret = new HashMap<>();
                    CashItemFactory.getInstance().getAllItem().forEach((key, value) -> {
                        if (key / 100000 == type) {
                            ret.put(key, value);
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
            SwingUtils.groupButtons(alltype, uptype, downtype);
            add(new CenterPanel(new GroupPanel(10, alltype, uptype, downtype).setMargin(5, 0, 0, 0)), BorderLayout.NORTH);
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

        public void updateAllItems(Map<Integer, CashItemInfo> itemsCache) {
            items.clear();
            List<Map.Entry<Integer, CashItemInfo>> allitems = new ArrayList<>();
            allitems.addAll(itemsCache.entrySet());
            allitems.sort((o1, o2) -> Boolean.compare(o2.getValue().onSale(), o1.getValue().onSale()));
            allitems.forEach(it -> items.add(new Pair<>(new ItemPanel(CashShopItemPane.this, it.getValue()), it.getValue())));
        }

        public void updateFilter() {
            onSaleItems.clear();
            onSaleItems_not.clear();
            for (Pair<ItemPanel, CashItemInfo> it : items) {
                if (it.right.onSale()) {
                    onSaleItems.add(it);
                } else {
                    onSaleItems_not.add(it);
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
            List<Pair<ItemPanel, CashItemInfo>> filterItems = getItemList();
            itemPanel.removeAll();
            for (int i = maxitem * index; i < Math.min(filterItems.size(), maxitem * (index + 1)); i++) {
                itemPanel.add(filterItems.get(i).left);
            }
            itemPanel.revalidate();
            itemPanel.repaint();
            currentIndex = index;
        }

        public List<Pair<ItemPanel, CashItemInfo>> getItemList() {
            return showType == 1 ? onSaleItems : (showType == 2 ? onSaleItems_not : items);
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
    }

    private class ItemPanel extends WebPanel {
        private final CashShopItemPane owner;
        private final CashItemInfo cii;
        private final WebLabel itemName = new WebLabel();
        private final WebLabel itemPirce = new WebLabel();
        private final WebLabel itemIcon = new WebLabel();
        private CashModInfo cmi = null;
        private String itemName_ = null;

        public CashModInfo getCmi() {
            if (cmi == null) {
                cmi = CashItemFactory.getInstance().getModInfo(cii.getSN());
            }
            if (cmi == null) {
                cmi = new CashModInfo(cii.getSN(), cii.getPrice(), 0, cii.onSale(), cii.getItemId(), cii.getPriority(), false, cii.getPeriod(), cii.getGender(), cii.getCount(), cii.getMeso(), cii.getCsClass(), cii.getTermStart(), cii.getTermEnd(), 0, 0, 0, false);
            }
            return cmi;
        }

        public String getItemName_() {
            if (itemName_ == null) {
                itemName_ = MapleItemInformationProvider.getInstance().getName(cii.getItemId());
            }
            return itemName_;
        }


        ItemPanel(CashShopItemPane owner, CashItemInfo cii) {
            this.owner = owner;
            this.cii = cii;
            setBorder(BorderFactory.createMatteBorder(5, 5, 30, 30, Color.GRAY));
            setPreferredSize(new Dimension((int) (launch.StartGUI.DPI * 200), (int) (launch.StartGUI.DPI * 95)));
            updateLabel(true);
//            val itemOldPirce = WebLabel(if (cii.isDiscount) "${cii.price}樂豆點(${ceilpref(cii.originalPrice, cii.price)}%)" else "無折扣")
            WebButton onSale_button = new WebButton(getOnSale(getCmi().isShowUp()));
            WebButton baseNew_button = new WebButton("主頁").setBottomBgColor(getBaseNewColor(getCmi().isBase_new()));
            WebButton change_button = new WebButton("變更");
            TooltipManager.setTooltip(this, "<html><div style=\"width:" + ((int) (launch.StartGUI.DPI * 200)) + "px\"><center>SN: " + getCmi().getSn() + "</center><br><p>" + this.replaceHtmlFormat(MapleItemInformationProvider.getInstance().getDesc(getCmi().getItemid())) + "</p></div><html>");

            // 添加按鈕的事件監聽
            onSale_button.addActionListener(e -> {
                upOrDown_Action(!getCmi().isShowUp());
                onSale_button.setText(getOnSale(getCmi().isShowUp()));
                baseNew_button.setBottomBgColor(getBaseNewColor(getCmi().isBase_new()));
                owner.updateFilter();
            });
            baseNew_button.addActionListener(e -> {
                baseOrNot_Action(!getCmi().isBase_new());
                onSale_button.setText(getOnSale(getCmi().isShowUp()));
                baseNew_button.setBottomBgColor(getBaseNewColor(getCmi().isBase_new()));
                owner.updateFilter();
            });
            change_button.addActionListener(e -> change_Action());

            // 修飾Item面板的效果
            setUndecorated(false);

            add(itemIcon, BorderLayout.WEST);
            add(new GroupPanel(false, itemName, itemPirce).setMargin(0, 10, 10, 0));
            add(new CenterPanel(new GroupPanel(new GroupPanel(5, onSale_button, baseNew_button, change_button))), BorderLayout.SOUTH);
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

        public String getOnSale(boolean isUp) {
            return (isUp ? "下" : "上") + "架";
        }

        public Color getBaseNewColor(boolean base) {
            return base ? Color.magenta : Color.lightGray;
        }

        public void upOrDown_Action(boolean up) {
            final CashModInfo cmi = getCmi();
            if (!up && cmi.isBase_new()) {
                cmi.setBase_new(false);
                CashItemFactory.getInstance().getAllBaseNewInfo().remove(cmi.getSn());
            }
            cmi.setShowUp(up);
            CashItemFactory.getInstance().getAllModInfo().put(cmi.getSn(), cmi);
            updateLabel(false);
            updateToDB();
        }

        public void baseOrNot_Action(boolean base) {
            final CashModInfo cmi = getCmi();
            CashItemInfo cii = CashItemFactory.getInstance().getItem(cmi.getSn(), false);
            if (cii == null) {
                return;
            }
            if (base) {
                if (!cmi.isShowUp()) {
                    cmi.setShowUp(true);
                }
                CashItemFactory.getInstance().getAllBaseNewInfo().put(cmi.getSn(), cii.getCsClass());
            } else {
                CashItemFactory.getInstance().getAllBaseNewInfo().remove(cmi.getSn());
            }
            cmi.setBase_new(base);
            CashItemFactory.getInstance().getAllModInfo().put(cmi.getSn(), cmi);
            updateLabel(false);
            updateToDB();
        }

        public void change_Action() {
            final WebDialog dialog = new WebDialog(CashShopPane.this.owner, "名稱:" + getItemName_() + "  SN:" + getCmi().getSn(), true);
            final GroupPanel groupPanel = new GroupPanel(5, false);
            Map<String, Object> values = CashShopPane.values;
            double[] doubles = new double[values.size() + 1];
            Arrays.fill(doubles, 0, doubles.length, TableLayout.PREFERRED);
            groupPanel.setLayout(new TableLayout(new double[]{ TableLayout.PREFERRED, TableLayout.FILL }, doubles, 5, 5));
            final Map<String, Component> textFields = new HashMap<>();
            int i = 0;
            final CashModInfo cmi = getCmi();
            for (Map.Entry<String, Object> it : values.entrySet()) {
                String name = it.getKey();
                Object any = it.getValue();
                groupPanel.add(new WebLabel(name, WebLabel.TRAILING), "0," + i);
                final Component compon;
                if (any instanceof Object[]) {
                    compon = new WebComboBox((Object[])any, name.equals("產品類型") ? ItemPanel.this.getCmi().getMark() : ItemPanel.this.getCmi().getGender());
                } else {
                    int defaultvalue;
                    switch (name) {
                        case "道具ID":
                            defaultvalue = cmi.getItemid();
                            break;
                        case "道具數量":
                            defaultvalue = cmi.getCount();
                            break;
                        case "價格":
                            defaultvalue = cmi.getPrice();
                            break;
                        case "開始銷售時間":
                            defaultvalue = cmi.getTermStart();
                            break;
                        case "停止銷售時間":
                            defaultvalue = cmi.getTermEnd();
                            break;
                        case "等級":
                            defaultvalue = cmi.getLevelLimit();
                            break;
                        case "人氣":
                            defaultvalue = cmi.getFameLimit();
                            break;
                        default:
                            defaultvalue = 0;
                            break;
                    }
                    compon = new WebTextField(String.valueOf(defaultvalue), 15);
                }
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
//                            val compoent = it.value
                            int text = 0;
                            if (it.getValue() instanceof WebTextField) {
                                text = Integer.parseInt(((WebTextField) it.getValue()).getText());
                            } else if (it.getValue() instanceof WebComboBox) {
                                text = ((WebComboBox) it.getValue()).getSelectedIndex();
                            }
                            switch (it.getKey()) {
                                case "道具ID": {
                                    cmi.setItemid(text);
                                    updateLabel(true);
                                    break;
                                }
                                case "道具數量": {
                                    cmi.setCount(text);
                                    updateLabel(true);
                                    break;
                                }
                                case "產品類型":
                                    cmi.setMark(text);
                                    break;
                                case "價格": {
                                    cmi.setPrice(text);
                                    updateLabel(true);
                                    break;
                                }
                                case "開始銷售時間":
                                    cmi.setTermStart(text);
                                    break;
                                case "停止銷售時間":
                                    cmi.setTermEnd(text);
                                    break;
                                case "性別":
                                    cmi.setGender(text);
                                    break;
                                case "等級":
                                    cmi.setLevelLimit(text);
                                    break;
                                case "人氣":
                                    cmi.setFameLimit(text);
                                    break;
                            }
                        }
                        cmi.setCii(null);
                        cmi.toCItem(cii);
                        CashItemFactory.getInstance().getAllModInfo().put(cmi.getSn(), cmi);
                        updateToDB();
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
            dialog.setLocationRelativeTo(CashShopPane.this);
            dialog.setVisible(true);
        }

        public void updateToDB() {
            final CashModInfo cmi = getCmi();
            DatabaseConnection.domain(con -> {
                try (PreparedStatement ps = con.prepareStatement("SELECT * FROM `cashshop_modified_items` WHERE `serial` = ?")) {
                    ps.setInt(1, cmi.getSn());
                    try (ResultSet rs = ps.executeQuery()) {
                        // 如果存在數據則只刷新
                        if (rs.next()) {
                            SqlTool.update(con, "UPDATE cashshop_modified_items SET discount_price = ?, mark = ?, showup = ?, itemid = ?, priority = ?, period = ?, gender = ?, count = ?, meso = ?, csClass = ?, termStart = ?, termEnd = ?, fameLimit = ?, levelLimit = ?, categories = ?, bast_new = ? WHERE serial = ?", new Object[] {
                                    cmi.getPrice(),
                                    cmi.getMark(),
                                    cmi.isShowUp() ? (byte) 1 : (byte) 0,
                                    cmi.getItemid(),
                                    (byte) cmi.getPriority(),
                                    cmi.getPeriod(),
                                    (byte) cmi.getGender(),
                                    (short) cmi.getCount(),
                                    cmi.getMeso(),
                                    (byte) cmi.getCsClass(),
                                    cmi.getTermStart(),
                                    cmi.getTermEnd(),
                                    (short) cmi.getFameLimit(),
                                    (short) cmi.getLevelLimit(),
                                    (byte) cmi.getCategories(),
                                    (byte) (cmi.isBase_new() ? 1 : 0),
                                    cmi.getSn()
                            });
                        } else {
                            SqlTool.update(con, "INSERT INTO cashshop_modified_items(serial, discount_price, mark, showup, itemid, priority, period, gender, count, meso, csClass, termStart, termEnd, fameLimit, levelLimit, categories, bast_new) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", new Object[]{
                                    cmi.getSn(),
                                    cmi.getPrice(),
                                    cmi.getMark(),
                                    cmi.isShowUp() ? (byte) 1 : (byte) 0,
                                    cmi.getItemid(),
                                    (byte) cmi.getPriority(),
                                    cmi.getPeriod(),
                                    (byte) cmi.getGender(),
                                    (short) cmi.getCount(),
                                    cmi.getMeso(),
                                    (byte) cmi.getCsClass(),
                                    cmi.getTermStart(),
                                    cmi.getTermEnd(),
                                    (short) cmi.getFameLimit(),
                                    (short) cmi.getLevelLimit(),
                                    (byte) cmi.getCategories(),
                                    (byte) (cmi.isBase_new() ? 1 : 0)
                            });
                        }
                    }
                } catch (SQLException e) {
                    log.error("更新商城重載道具數據失敗", e);
                }
                return null;
            });
        }

        private int ceilpref(int x, int y) {
            return (int)((x - y) / y * 100.0);
        }

        public void updateLabel(boolean all) {
            if (all) {
                int inlink = MapleItemInformationProvider.getInstance().getInLinkID(getCmi().getItemid());
                this.itemIcon.setIcon(loadIcon(inlink != 0 ? inlink : getCmi().getItemid()));
                this.itemName.setText(getItemName_());
                itemPirce.setText(getCmi().getPrice() + ((getCmi().getSn() / 100000) == 1102 ? "里程" : "樂豆點") + "(" + getCmi().getCount() + "個)");
            }
            setBorderColor(cmi.isShowUp() ? Color.magenta : Color.lightGray);
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