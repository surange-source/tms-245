package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import com.alee.extended.panel.GroupingType;
import com.alee.laf.button.WebButton;
import com.alee.laf.list.WebList;
import com.alee.laf.list.editor.ListEditAdapter;
import com.alee.laf.scroll.WebScrollPane;

import javax.swing.*;
import java.awt.*;

public class BannedConfigGroup extends AbstractConfigGroup {
    BannedConfigGroup(ConfigPanel owner) {
        super(owner, "禁言系統");
    }

    private static DefaultListModel<String> createData() {
        final DefaultListModel<String> model = new DefaultListModel<>();
        model.addElement("外掛");
        model.addElement("傻逼");
        return model;
    }

    @Override
    public Component getPreview() {
        TitleWebPanel titleWebPanel1 = new TitleWebPanel("禁言設置");

        titleWebPanel1.add(new GroupPanel(false,
                new ConfigComponent("禁言時間(分鐘)")
        ).setMargin(5));

        TitleWebPanel titleWebPanel2 = new TitleWebPanel("管理敏感單詞 (雙擊一項可直接編輯)");


        final WebList list = new WebList(createData());
        list.setEditable(true);
        list.setMultiplySelectionAllowed(true);
        list.addListEditListener(new ListEditAdapter() {
            @Override
            public void editFinished(int index, Object oldValue, Object newValue) {
                if (((String) newValue).isEmpty()) {
                    ((DefaultListModel) list.getModel()).removeElementAt(index);
                }
            }
        });

        final WebButton addButton = new WebButton("增加", e -> {
            if (list.getModel() instanceof DefaultListModel) {
                @SuppressWarnings("unchecked")
                DefaultListModel<String> model = (DefaultListModel<String>) list.getModel();
                model.addElement(" ");
                list.editCell(model.getSize() - 1);

            }
        });

        final WebButton removeButton = new WebButton("移除", e -> {
            if (list.getSelectedIndex() == -1) {
                return;
            }
            final int[] indexs = list.getSelectedIndices();
            int delete = 0;
            for (int i : indexs) {
                ((DefaultListModel) list.getModel()).removeElementAt(i - delete);
                delete++;
            }
            list.setSelectedIndex(list.getModelSize() - 1);
        });
        removeButton.setEnabled(false);


        final WebButton editButton = new WebButton("編輯", e -> list.editSelectedCell());
        editButton.setEnabled(false);

        list.addListSelectionListener(e -> {
            removeButton.setEnabled(true);
            editButton.setEnabled(true);
        });

        titleWebPanel2.add(new GroupPanel(GroupingType.fillFirst,
                new WebScrollPane(list),
                new GroupPanel(false, addButton, removeButton, editButton)
        ).setMargin(10, 30, 0, 50));
        return new GroupPanel(GroupingType.fillLast, false, titleWebPanel1, titleWebPanel2);
    }
}
