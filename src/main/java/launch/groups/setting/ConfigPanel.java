package launch.groups.setting;

import com.alee.extended.panel.BorderPanel;
import com.alee.extended.panel.WebButtonGroup;
import com.alee.laf.button.WebButton;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.rootpane.WebDialog;
import com.alee.laf.rootpane.WebFrame;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.separator.WebSeparator;
import com.alee.laf.tree.UniqueNode;
import com.alee.laf.tree.WebTree;
import com.alee.utils.SwingUtils;
import configs.Config;
import launch.StartGUI;

import javax.swing.event.TreeSelectionEvent;
import javax.swing.event.TreeSelectionListener;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.HashMap;
import java.util.Map;

public class ConfigPanel extends WebDialog {

    private final Map<String, String> changeSettingQueue = new HashMap<>();
    private WebButton webButtonOK;
    private WebButton webButtonApply;
    private WebButton webButtonCancel;
    private WebTree<UniqueNode> webTree;
    private UniqueNode root;

    public ConfigPanel(Frame owner) {
        super(owner, "配置參數", false);
        setIconImage(StartGUI.getInstance().getIconImage());

        setDefaultCloseOperation(WebFrame.DISPOSE_ON_CLOSE);

        add(new WebPanel(new BorderLayout(5, 2)) {
            {
                setPreferredSize(new Dimension((int) (launch.StartGUI.DPI * 800), (int) (launch.StartGUI.DPI * 600)));
                setResizable(false);
                // 搜索框
//                WebTextField search = new WebTextField(15);
//                WebImage image = new WebImage(Start.loadIcon("search.png"));
//                search.setInputPrompt("搜索");
//                search.setInputPromptFont(search.getFont().deriveFont(Font.ITALIC));
//                search.setMargin(2, 0, 0, 0);
//                search.setLeadingComponent(image);
//                search.setRound(12);

                // 設置列表
                root = new UniqueNode();
                root.add(new UniqueNode(new ServerConfigGroup(ConfigPanel.this)));
                root.add(new UniqueNode(new QuickConfigGroup(ConfigPanel.this)));
                root.add(new UniqueNode(new GameConfigGroup(ConfigPanel.this)));
                root.add(new UniqueNode(new PlayerConfigGroup(ConfigPanel.this)));
                root.add(new UniqueNode(new JobConfigGroup(ConfigPanel.this)));
                root.add(new UniqueNode(new MonsterConfigGroup(ConfigPanel.this)));
//                root.add(new UniqueNode(new NpcConfigGroup(ConfigPanel.this)));
                root.add(new UniqueNode(new EventConfigGroup(ConfigPanel.this)));
//                root.add(new UniqueNode(new DefaultConfigGroup(ConfigPanel.this, "潛能系統")));
//                root.add(new UniqueNode(new BannedConfigGroup(ConfigPanel.this)));
//                root.add(new UniqueNode(new DefaultConfigGroup(ConfigPanel.this, "PVP設置")));
//                root.add(new UniqueNode(new DefaultConfigGroup(ConfigPanel.this, "假人系統")));
                root.add(new UniqueNode(new ChannelConfigGroup(ConfigPanel.this)));
                //root.add(new UniqueNode(new DonateConfigGroup(ConfigPanel.this)));
                webTree = new WebTree<>(root);
                webTree.setRootVisible(false);
                webTree.setAutoExpandSelectedNode(true);
                webTree.setExpandsSelectedPaths(true);
                webTree.setDragEnabled(false);
                webTree.setSelectionMode(WebTree.SINGLE_TREE_SELECTION);
                webTree.expandAll();

                // 設置主要內容
                final WebPanel contentPanel = new WebPanel(new BorderLayout());

                webTree.addTreeSelectionListener(new TreeSelectionListener() {
                    @Override
                    public void valueChanged(TreeSelectionEvent e) {
                        if (e.getNewLeadSelectionPath() == null) {
                            webTree.setSelectionPath(e.getOldLeadSelectionPath());
                            return;
                        }
                        UniqueNode uniqueNode = webTree.getSelectedNode();
                        if (uniqueNode == null) {
                            return;
                        }
                        if (uniqueNode.getUserObject() instanceof ConfigGroup) {
                            ConfigGroup configGroup = (ConfigGroup) uniqueNode.getUserObject();
                            contentPanel.removeAll();
                            contentPanel.add(configGroup.getPreview(), BorderLayout.CENTER);
                            pack();

                        }
                    }
                });


                final WebScrollPane treeScroll = new WebScrollPane(webTree);
                treeScroll.setPreferredWidth((int) (launch.StartGUI.DPI * 150));
                treeScroll.setRound((int) (launch.StartGUI.DPI * 5));
                treeScroll.setOpaque(false);
//                add(new GroupPanel(GroupingType.fillLast, false, search, treeScroll), BorderLayout.WEST);
                add(treeScroll, BorderLayout.WEST);

                // 添加主要內容
                add(contentPanel, BorderLayout.CENTER);

                // 設置底部按鈕
                webButtonOK = new WebButton("確認", e -> {
                    applyChange();
                    ConfigPanel.this.dispose();
                });

                webButtonApply = new WebButton("應用", e -> {
                    webButtonApply.setEnabled(false);
                    applyChange();
                });

                webButtonCancel = new WebButton("取消", e -> {
                    changeSettingQueue.clear();
                    ConfigPanel.this.dispose();
                });

                webButtonOK.setPreferredWidth((int) (launch.StartGUI.DPI * 100));
                SwingUtils.equalizeComponentsSize(webButtonOK, webButtonApply, webButtonCancel);

                add(new BorderPanel(new WebPanel(new BorderLayout()) {
                    {
                        add(new WebSeparator(false, true), BorderLayout.NORTH);
                        add(new WebButtonGroup(true, webButtonOK, webButtonCancel, webButtonApply), BorderLayout.EAST);
                    }
                }), BorderLayout.SOUTH);

                // 選擇默認菜單
                webTree.setSelectedNode((UniqueNode) root.getChildAt(0));

                addWindowListener(new WindowAdapter() {
                    @Override
                    public void windowActivated(WindowEvent e) {
                        webTree.requestFocus();
                    }
                });
            }
        });
    }

    public UniqueNode getRoot() {
        return root;
    }

    public WebTree<UniqueNode> getWebTree() {
        return webTree;
    }

    public WebButton getWebButtonOK() {
        return webButtonOK;
    }

    public WebButton getWebButtonApply() {
        return webButtonApply;
    }

    public WebButton getWebButtonCancel() {
        return webButtonCancel;
    }

    public Map<String, String> getChangeSettingQueue() {
        return changeSettingQueue;
    }

    protected void applyChange() {
        if (changeSettingQueue.isEmpty()) {
            return;
        }
        for (Map.Entry<String, String> entry : changeSettingQueue.entrySet()) {
            Config.setProperty(entry.getKey(), entry.getValue());
        }
        changeSettingQueue.clear();
        Config.load();
    }
}
