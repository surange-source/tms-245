package launch.groups.setting;

import com.alee.extended.list.CheckBoxCellData;
import com.alee.extended.list.CheckBoxListModel;
import com.alee.extended.list.WebCheckBoxList;
import com.alee.extended.panel.GroupPanel;
import com.alee.extended.panel.GroupingType;
import com.alee.laf.button.WebButton;
import com.alee.laf.menu.WebMenuItem;
import com.alee.laf.menu.WebPopupMenu;
import com.alee.laf.optionpane.WebOptionPane;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.text.WebTextField;
import configs.ServerConfig;
import launch.StartGUI;
import org.apache.logging.log4j.Logger;

import javax.swing.*;
import javax.swing.event.ListDataEvent;
import javax.swing.event.ListDataListener;
import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.io.File;
import java.util.Arrays;

public class EventConfigGroup extends AbstractConfigGroup {
    private static final Logger log = org.apache.logging.log4j.LogManager.getLogger(EventConfigGroup.class);
    private final CheckBoxListModel listModel = new CheckBoxListModel();

    EventConfigGroup(ConfigPanel owner) {
        super(owner, "事件腳本");
    }

    @Override
    public Component getPreview() {
        updateData();

        final WebCheckBoxList webCheckBoxList = new WebCheckBoxList(listModel);
        webCheckBoxList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        listModel.addListDataListener(new ListDataListener() {
            @Override
            public void intervalAdded(ListDataEvent e) {

            }

            @Override
            public void intervalRemoved(ListDataEvent e) {

            }

            @Override
            public void contentsChanged(ListDataEvent e) {
                String ret = "";
                for (CheckBoxCellData checkBoxCellData : listModel.getElements()) {
                    if (checkBoxCellData.isSelected()) {
                        ret += checkBoxCellData.getUserObject() + ",";
                    }
                }
                if (!ret.isEmpty()) {
                    ret = ret.substring(0, ret.length() - 1);
                }
                owner.getChangeSettingQueue().put("channel.server.events", ret);
                if (!owner.getWebButtonApply().isEnabled()) {
                    owner.getWebButtonApply().setEnabled(true);
                }
            }
        });

        webCheckBoxList.setComponentPopupMenu(new WebPopupMenu() {
            {
                add(new WebMenuItem("全選") {
                    {
                        addActionListener(e -> {
                            for (int i = 0; i < listModel.size(); i++) {
                                webCheckBoxList.setCheckBoxSelected(i, true);
                            }
                        });
                    }
                });

                add(new WebMenuItem("反選") {
                    {
                        addActionListener(e -> {
                            try {
                                for (int i = 0; i < listModel.size(); i++) {
                                    webCheckBoxList.setCheckBoxSelected(i, !webCheckBoxList.isCheckBoxSelected(i));
                                }
                            } catch (Exception e1) {
                                log.error("反選錯誤", e1);
                            }
                        });
                    }
                });

                add(new WebMenuItem("取消全選") {
                    {
                        addActionListener(e -> {
                            for (int i = 0; i < listModel.size(); i++) {
                                webCheckBoxList.setCheckBoxSelected(i, false);
                            }
                        });
                    }
                });
            }
        });

        final WebTextField search = new WebTextField(10);
        search.setInputPrompt("按腳本檔案名搜尋，不區分大小寫，輸入完成後按Enter鍵直接轉到結果");
        search.setInputPromptFont(search.getFont().deriveFont(Font.ITALIC));
        search.setMaximumWidth((int) (launch.StartGUI.DPI * 10));
        search.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                if (e.getKeyCode() == KeyEvent.VK_ENTER) {
                    boolean find = false;
                    for (CheckBoxCellData checkBoxCellData : listModel.getElements()) {
                        if (search.getText().equalsIgnoreCase(String.valueOf(checkBoxCellData.getUserObject()))) {
                            webCheckBoxList.setSelectedIndex(listModel.indexOf(checkBoxCellData));
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        WebOptionPane.showMessageDialog(owner, "未找到腳本，請確認" + ServerConfig.WORLD_SCRIPTSPATH + "/event資料夾中存在此腳本", "搜尋腳本", WebOptionPane.ERROR_MESSAGE);
                    }
                }
            }
        });

        final TitleWebPanel titleWebPanel1 = new TitleWebPanel("事件腳本管理");
        titleWebPanel1.add(new GroupPanel(GroupingType.fillLast, 5, false,
                new GroupPanel(
                        GroupingType.fillFirst,
                        search,
                        new WebButton("刷新腳本選單", StartGUI.loadIcon("switch.png")) { // 刷新按鈕
                            {
                                addActionListener(e -> updateData());
                            }
                        }),
                new WebScrollPane(webCheckBoxList)
        ).setMargin(5));
        return titleWebPanel1;
    }

    /**
     * 更新事件腳本列表
     */
    private void updateData() {
        listModel.clear();
        java.util.List<String> events = Arrays.asList(ServerConfig.CHANNEL_EVENTS.split(","));
        File eventfiles = new File(ServerConfig.WORLD_SCRIPTSPATH + "/event");
        for (String s : eventfiles.list()) {
            String event = s.substring(0, s.indexOf("."));
            listModel.addCheckBoxElement(event, events.contains(event));
        }
    }
}
