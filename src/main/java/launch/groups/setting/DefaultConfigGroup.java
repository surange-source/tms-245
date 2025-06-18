package launch.groups.setting;

import com.alee.laf.label.WebLabel;

import javax.swing.*;
import java.awt.*;

public class DefaultConfigGroup extends AbstractConfigGroup {
    DefaultConfigGroup(ConfigPanel owner, String titleText) {
        super(owner, titleText);
    }

    @Override
    public Component getPreview() {
        return new WebLabel("暫未開放，敬請期待！", SwingConstants.CENTER);
    }
}
