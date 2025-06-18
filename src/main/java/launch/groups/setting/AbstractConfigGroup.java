package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import com.alee.laf.checkbox.WebCheckBox;
import com.alee.laf.combobox.WebComboBox;
import com.alee.laf.label.WebLabel;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.separator.WebSeparator;
import com.alee.laf.text.WebTextField;
import configs.Config;

import javax.swing.*;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.util.HashMap;
import java.util.Map;

abstract class AbstractConfigGroup implements ConfigGroup {

    private static final Map<String, ImageIcon> iconsCache = new HashMap<>();
    protected final ConfigPanel owner;
    protected final String titleText;

    AbstractConfigGroup(ConfigPanel owner, String titleText) {
        this.owner = owner;
        this.titleText = titleText;
    }

    @Override
    public String toString() {
        return titleText;
    }

    class TitleWebPanel extends WebPanel {

        private final String titleText;

        TitleWebPanel(String titleText) {
            this.titleText = titleText;
            setMargin(15, 15, 0, 15);
            final WebPanel north = new WebPanel(new BorderLayout());
            north.add(new WebLabel(titleText).setFontSizeAndStyle(14, false, false), BorderLayout.WEST);
            final WebSeparator separator = new WebSeparator(false, false);
            separator.setSeparatorUpperColor(separator.getSeparatorColor());
            separator.setMargin(9, 5, 0, 0);
            north.add(separator, BorderLayout.CENTER);
            add(north, BorderLayout.NORTH);
        }

        public String getTitleText() {
            return titleText;
        }
    }

    class ConfigComponent extends GroupPanel {

        ConfigComponent(final String labelName) {
            this(labelName, ComponentType.編輯框);
        }

        ConfigComponent(final String labelName, String settingname, Object defCombo) {
            this(labelName, ComponentType.編輯框, settingname, String.valueOf(defCombo), null);
        }

        ConfigComponent(final String labelName, ComponentType componentType) {
            this(labelName, componentType, "", "", null);
        }

        ConfigComponent(final String labelName, String settingname, boolean defCombo) {
            this(labelName, ComponentType.復選框, settingname, String.valueOf(defCombo), null);
        }

        ConfigComponent(final String labelName, String settingname, int defCombo, String list) {
            this(labelName, ComponentType.下拉菜單, settingname, String.valueOf(defCombo), list);
        }

        ConfigComponent(final String labelName, ComponentType componentType, final String settingname, final String defCombo, final String list) {
            switch (componentType) {
                case 編輯框: {
                    final WebLabel label = new WebLabel(labelName + ": ", SwingConstants.RIGHT);
                    label.setPreferredWidth((int) (launch.StartGUI.DPI * 150));
                    add(label);

                    final WebTextField textField = new WebTextField(30).setPreferredWidth((int) (launch.StartGUI.DPI * 200));
                    if (!settingname.isEmpty()) {
                        textField.setText(Config.getProperty(settingname, defCombo));
                    }
                    textField.getDocument().addDocumentListener(new DocumentListener() {
                        @Override
                        public void insertUpdate(DocumentEvent e) {
                            owner.getWebButtonApply().setEnabled(true);
                            owner.getChangeSettingQueue().put(settingname, textField.getText().replace("\\", "/"));
                        }

                        @Override
                        public void removeUpdate(DocumentEvent e) {
                            owner.getWebButtonApply().setEnabled(true);
                            owner.getChangeSettingQueue().put(settingname, textField.getText().replace("\\", "/"));
                        }

                        @Override
                        public void changedUpdate(DocumentEvent e) {
                            System.out.println(textField.getText().replace("\\", "/"));
                        }
                    });
                    add(textField);
                    break;
                }
                case 復選框: {
                    final WebCheckBox checkBox = new WebCheckBox(labelName);
                    if (!settingname.isEmpty()) {
                        checkBox.setSelected(Boolean.valueOf(Config.getProperty(settingname, defCombo)));
                    } else {
                        checkBox.setSelected(defCombo.isEmpty() ? false : Boolean.valueOf(defCombo));
                        checkBox.setEnabled(false);
                    }
                    checkBox.setMargin(3, 20, 0, 0);
                    checkBox.addActionListener(e -> {
                        owner.getWebButtonApply().setEnabled(true);
                        owner.getChangeSettingQueue().put(settingname, String.valueOf(checkBox.isSelected()));
                    });
                    add(checkBox);
                    break;
                }
                case 下拉菜單: {
                    final WebLabel label = new WebLabel(labelName + ": ", SwingConstants.RIGHT);
                    label.setPreferredWidth((int) (launch.StartGUI.DPI * 150));
                    add(label);
                    final WebComboBox comboBox = new WebComboBox(list.split(",")).setPreferredWidth((int) (launch.StartGUI.DPI * 100));
                    if (!settingname.isEmpty()) {
                        comboBox.setSelectedIndex(Integer.valueOf(Config.getProperty(settingname, defCombo)));
                    }
                    comboBox.addActionListener(new AbstractAction() {
                        @Override
                        public void actionPerformed(ActionEvent e) {
                            owner.getWebButtonApply().setEnabled(true);
                            owner.getChangeSettingQueue().put(settingname, String.valueOf(comboBox.getSelectedIndex()));
                        }
                    });
                    add(comboBox);
                    break;
                }
            }
        }
    }
}
