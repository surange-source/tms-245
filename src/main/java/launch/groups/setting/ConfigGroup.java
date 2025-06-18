package launch.groups.setting;

import java.awt.*;

public interface ConfigGroup {

    String toString();

    Component getPreview();

    /**
     * 變量的控件類型
     */
    enum ComponentType {
        編輯框,
        復選框,
        下拉菜單,
    }
}
