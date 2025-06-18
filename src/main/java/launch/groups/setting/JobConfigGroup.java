package launch.groups.setting;

import client.skills.SkillFactory;
import com.alee.extended.list.CheckBoxCellData;
import com.alee.extended.list.CheckBoxListModel;
import com.alee.extended.list.WebCheckBoxList;
import com.alee.extended.panel.CenterPanel;
import com.alee.extended.panel.GroupPanel;
import com.alee.extended.panel.GroupingType;
import com.alee.extended.panel.WebButtonGroup;
import com.alee.laf.button.WebButton;
import com.alee.laf.checkbox.WebCheckBox;
import com.alee.laf.label.WebLabel;
import com.alee.laf.list.WebList;
import com.alee.laf.menu.WebMenuItem;
import com.alee.laf.menu.WebPopupMenu;
import com.alee.laf.optionpane.WebOptionPane;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.text.WebTextField;
import configs.ServerConfig;
import constants.ServerConstants;
import constants.skills.*;
import server.MapleOverrideData;

import javax.swing.*;
import javax.swing.event.ListDataEvent;
import javax.swing.event.ListDataListener;
import java.awt.*;
import java.lang.reflect.Field;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

public class JobConfigGroup extends AbstractConfigGroup {

    public final Class[] classes = {
            劍士.class,
            英雄.class,
            聖騎士.class,
            黑騎士.class,
            法師.class,
            火毒.class,
            冰雷.class,
            主教.class,
            弓箭手.class,
            箭神.class,
            神射手.class,
            開拓者.class,
            盜賊.class,
            夜使者.class,
            暗影神偷.class,
            影武者.class,
            海盜.class,
            拳霸.class,
            槍神.class,
            重砲指揮官.class,
            蒼龍俠客.class,
            貴族.class,
            聖魂劍士.class,
            烈焰巫師.class,
            破風使者.class,
            暗夜行者.class,
            閃雷悍將.class,
            狂狼勇士.class,
            龍魔導士.class,
            精靈遊俠.class,
            幻影俠盜.class,
            隱月.class,
            夜光.class,
            市民.class,
            惡魔殺手.class,
            惡魔復仇者.class,
            煉獄巫師.class,
            狂豹獵人.class,
            機甲戰神.class,
            傑諾.class,
            爆拳槍神.class,
            劍豪.class,
            陰陽師.class,
            米哈逸.class,
            凱撒.class,
            凱殷.class,
            卡蒂娜.class,
            天使破壞者.class,
            神之子.class,
            幻獸師.class,
            皮卡啾.class,
            雪吉拉.class,
            凱內西斯.class,
            阿戴爾.class,
            伊利恩.class,
            亞克.class,
            菈菈.class,
            虎影.class,
            墨玄.class,
            通用V核心.class,
            通用V核心.劍士通用.class,
            通用V核心.法師通用.class,
            通用V核心.弓箭手通用.class,
            通用V核心.盜賊通用.class,
            通用V核心.海盜通用.class,
            通用V核心.冒險家通用.class,
            通用V核心.騎士團通用.class,
            通用V核心.英雄團通用.class,
            通用V核心.反抗軍通用.class,
            通用V核心.曉之陣通用.class,
            通用V核心.超新星通用.class,
            通用V核心.雷普族通用.class,
            通用V核心.格蘭蒂斯通用.class,
            通用V核心.阿尼瑪族通用.class
    };

    private final Map<String, Map<Integer, String>> skills = new LinkedHashMap<>();
    private final List<String> blockSkills = new ArrayList<>(Arrays.asList(ServerConfig.WORLD_BLOCKSKILLS.split(",")));
    private SkillDataPanel skillDataPanel = new SkillDataPanel();
    private Map<String, WebTextField> modifiedMaps = new HashMap<>();
    private int skillid = 0;

    {
        for (Class aClass : classes) {
            Map<Integer, String> skillss = new LinkedHashMap<>();
            for (Field field : aClass.getDeclaredFields()) {
                try {
                    skillss.put(field.getInt(field.getName()), field.getName());
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
            String[] jobNames = aClass.getName().split("\\.");
            String jobname = jobNames.length <= 0 ? "" : jobNames[jobNames.length - 1];
            if (jobname.contains("$")) {
                jobNames = jobname.split("\\$");
                jobname = jobNames.length <= 0 ? "" : jobNames[jobNames.length - 1];
            }
            skills.put(jobname, skillss);
        }
    }

    JobConfigGroup(ConfigPanel owner) {
        super(owner, "職業&技能管理");
    }

    @Override
    public Component getPreview() {
        TitleWebPanel titleWebPanel1 = new TitleWebPanel("職業&技能設置");

        WebList jobList = new WebList(skills.keySet().toArray());
        CheckBoxListModel skillListMode = new CheckBoxListModel();
        WebCheckBoxList skillList = new WebCheckBoxList(skillListMode);
        WebPanel skillData = new WebPanel();
        jobList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        skillList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        jobList.setPreferredWidth((int) (launch.StartGUI.DPI * 100));
        skillData.setPreferredWidth((int) (launch.StartGUI.DPI * 300));
        skillListMode.addListDataListener(new ListDataListener() {
            @Override
            public void intervalAdded(ListDataEvent e) {

            }

            @Override
            public void intervalRemoved(ListDataEvent e) {

            }

            @Override
            public void contentsChanged(ListDataEvent e) {
                String ret = "";
                for (CheckBoxCellData checkBoxCellData : skillListMode.getElements()) {
                    int skillid = 0;
                    for (Map.Entry<Integer, String> entry : skills.get(jobList.getSelectedValue()).entrySet()) {
                        if (entry.getValue().equals(checkBoxCellData.getUserObject())) {
                            skillid = entry.getKey();
                            break;
                        }
                    }
                    if (checkBoxCellData.isSelected() && !blockSkills.contains(String.valueOf(skillid))) {
                        blockSkills.add(String.valueOf(skillid));
                    } else if (!checkBoxCellData.isSelected() && blockSkills.contains(String.valueOf(skillid))) {
                        blockSkills.remove(String.valueOf(skillid));
                    }
                }

                for (String integer : blockSkills) {
                    if (!integer.isEmpty()) {
                        ret += integer + ",";
                    }
                }
                if (!ret.isEmpty()) {
                    ret = ret.substring(0, ret.length() - 1);
                }

                owner.getChangeSettingQueue().put("world.blockskills", ret);
                if (!owner.getWebButtonApply().isEnabled()) {
                    owner.getWebButtonApply().setEnabled(true);
                }
            }
        });

        skillList.setComponentPopupMenu(new WebPopupMenu() {
            {
                add(new WebMenuItem("全選") {
                    {
                        addActionListener(e -> {
                            for (int i = 0; i < skillListMode.size(); i++) {
                                skillList.setCheckBoxSelected(i, true);
                            }
                        });
                    }
                });

                add(new WebMenuItem("反選") {
                    {
                        addActionListener(e -> {
                            for (int i = 0; i < skillListMode.size(); i++) {
                                skillList.setCheckBoxSelected(i, !skillList.isCheckBoxSelected(i));
                            }
                        });
                    }
                });

                add(new WebMenuItem("取消全選") {
                    {
                        addActionListener(e -> {
                            for (int i = 0; i < skillListMode.size(); i++) {
                                skillList.setCheckBoxSelected(i, false);
                            }
                        });
                    }
                });
            }
        });

        skillList.addListSelectionListener(e -> {
            CheckBoxCellData selectedValue = (CheckBoxCellData) ((WebCheckBoxList) e.getSource()).getSelectedValue();
            if (selectedValue != null) {
                skillid = getSkillID(selectedValue.getUserObject().toString());
                skillDataPanel.removeAll();
                skillDataPanel.display(skillid);
//            WebOptionPane.showMessageDialog(owner, getSkillID(((CheckBoxCellData) ((WebCheckBoxList) e.getSource()).getSelectedValue()).getUserObject().toString()));
            }
        });


        jobList.addListSelectionListener(e -> {
            skillListMode.clear();
            skills.get(jobList.getSelectedValue()).forEach((integer, s) -> skillListMode.addCheckBoxElement(s, isBlockSkill(integer)));
        });

//        skillData.add(new WebLabel(SkillFactory.getH(影武者.修羅), JLabel.LEFT));
        skillData.add(skillDataPanel);
        skillData.add(new CenterPanel(new WebButtonGroup(new WebButton("應用") {
            {
                setPreferredWidth((int) (launch.StartGUI.DPI * 100));
                addActionListener(e -> {
                    // 技能ID為0時禁止執行後續的應用操作
                    if (skillid == 0) {
                        return;
                    }
                    HashMap<String, String> values = new HashMap<>();
                    modifiedMaps.forEach((key, value) -> values.put(key, value.getText()));
                    if (values.isEmpty()) {
                        WebOptionPane.showMessageDialog(owner, "沒有發生變動");
                        return;
                    }
                    MapleOverrideData.overridedata.put(skillid, values);
                    SkillFactory.reloadSkills(skillid);
                    MapleOverrideData.save();
                    WebOptionPane.showMessageDialog(owner, "應用完成");
                });
            }
        }, new WebButton("重置") {
            {
                setPreferredWidth((int) (launch.StartGUI.DPI * 100));
                addActionListener(e -> {
                    // 技能ID為0時禁止執行後續的應用操作
                    if (skillid == 0) {
                        return;
                    }
                    modifiedMaps.forEach((s, webTextField) -> webTextField.setText(SkillFactory.getSkillDefaultData(skillid, s)));
                    SkillFactory.reloadSkills(skillid);
                    MapleOverrideData.overridedata.remove(skillid);
                    MapleOverrideData.save();
                    WebOptionPane.showMessageDialog(owner, "重置完成");
                });
            }
        })), BorderLayout.SOUTH);
        WebPanel panel = new WebPanel() {
            {
                setMargin(0, 15, 0, 15);
                add(getOpenJobList(), BorderLayout.NORTH);
                add(new WebScrollPane(jobList), BorderLayout.WEST);
                add(new WebScrollPane(skillList));
                add(new WebScrollPane(skillData) {
                    {
                        setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
                    }
                }, BorderLayout.EAST);
                add(new WebLabel("<html><p>注意:</p><p>* 職業勾選為啟用創建</p><p>* 技能勾選即為禁用技能</p></html>").setMargin(10, 0, 10, 0), BorderLayout.SOUTH);
            }
        };

        return new GroupPanel(GroupingType.fillLast, 5, false, titleWebPanel1, panel);
    }

    public boolean isBlockSkill(int skillid) {
        return blockSkills.contains(String.valueOf(skillid));
    }

    public Component getOpenJobList() {
        WebPanel openJobList = new WebPanel(new GridLayout(5, 5, 0, 5));
        for (String s : ServerConstants.JOB_NAMELIST) {
            openJobList.add(new WebCheckBox(s, ServerConstants.isOpenJob(s)) {
                {
                    setPreferredWidth((int) (launch.StartGUI.DPI * 100));
                    addActionListener(e -> {
                        if (((WebCheckBox) e.getSource()).isSelected()) {
                            openJob(s);
                        } else {
                            closeJob(s);
                        }
                    });
                }
            });
        }
        openJobList.setMargin(0, 0, 10, 0);
        return openJobList;
    }

    private void closeJob(String jobname) {
        if (!ServerConfig.WORLD_CLOSEJOBS.contains(jobname)) {
            ServerConfig.WORLD_CLOSEJOBS += jobname + ",";
        }
        saveChange();
    }

    private void openJob(String jobname) {
        if (ServerConfig.WORLD_CLOSEJOBS.contains(jobname)) {
            ServerConfig.WORLD_CLOSEJOBS = ServerConfig.WORLD_CLOSEJOBS.replace(jobname + ",", "");
        }
        saveChange();
    }

    private void saveChange() {
        owner.getChangeSettingQueue().put("world.closejobs", ServerConfig.WORLD_CLOSEJOBS);
        if (!owner.getWebButtonApply().isEnabled()) {
            owner.getWebButtonApply().setEnabled(true);
        }
    }

    private int getSkillID(String name) {
        for (Map.Entry<String, Map<Integer, String>> entry : skills.entrySet()) {
            for (Map.Entry<Integer, String> stringEntry : entry.getValue().entrySet()) {
                if (stringEntry.getValue().equals(name)) {
                    return stringEntry.getKey();
                }
            }
        }
        return 0;
    }

    public class SkillDataPanel extends WebPanel {

        private SkillDataPanel() {
            super();
        }

        public void display(int skillid) {
            String h = SkillFactory.getH(skillid) + " ";
            add(new DescLabel(h), BorderLayout.NORTH);
            List<String> property = new ArrayList<>();
            boolean find = false;
            StringBuilder temp = new StringBuilder();
            for (char c : h.toCharArray()) {
                if (c == '#') {
                    find = true;
                    continue;
                }
                if (find) {
                    if ((c < 'A' || c > 'Z') && (c < 'a' || c > 'z') && (c < '0' || c > '9')) {
                        find = false;
                        if (temp.length() != 0) {
                            property.add(temp.toString());
                            temp = new StringBuilder();
                        }
                    } else {
                        temp.append(c);
                    }
                }
            }
            GroupPanel panel = new GroupPanel(false);
            panel.setMargin(10);
            property = property.stream().filter(this::canChange).collect(Collectors.toList());
            modifiedMaps.clear();
            for (String s : property) {
                WebLabel label = new WebLabel(s, SwingConstants.RIGHT) {
                    {
                        setMargin(0, 0, 0, 5);
                        setPreferredWidth((int) (launch.StartGUI.DPI * 120));
                    }
                };
                WebTextField field = new WebTextField(getNewValue(skillid, s), 10);
                panel.add(new GroupPanel(label, field));
                modifiedMaps.put(s, field);
            }
            add(panel, BorderLayout.CENTER);
            updateUI();
        }

        private String getNewValue(int skillid, String p) {
            String ret;
            Map<Integer, Map<String, String>> overridedata = MapleOverrideData.overridedata;
            if (overridedata.containsKey(skillid) && overridedata.get(skillid).containsKey(p)) {
                ret = overridedata.get(skillid).get(p);
            } else {
                ret = SkillFactory.getSkillDefaultData(skillid, p);
            }
            return ret == null ? "" : ret;
        }

        private boolean canChange(String name) {
            switch (name) {
                case "c":
                case "dotTime":
                case "dotInterval":
                case "dot":
                case "attackCount":
                case "damage":
                    return false;
            }
            return true;
        }
    }

    public class DescLabel extends JTextArea {
        public DescLabel(String text) {
            super(text, 2, 10);
            setBackground(null);
            setEditable(false);
            setBorder(null);
            setLineWrap(true);
            setWrapStyleWord(false);
            setFocusable(false);
            setMargin(new Insets(5, 5, 5, 15));
        }
    }

}
