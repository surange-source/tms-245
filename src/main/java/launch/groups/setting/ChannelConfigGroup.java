package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import com.alee.laf.scroll.WebScrollPane;
import configs.ServerConfig;

import java.awt.*;

public class ChannelConfigGroup extends AbstractConfigGroup {

    public ChannelConfigGroup(ConfigPanel owner) {
        super(owner, "頻道設置");
    }

    @Override
    public Component getPreview() {

        TitleWebPanel titleWebPanel1 = new AbstractConfigGroup.TitleWebPanel("特別頻道設置(多個頻道使用\",\"隔開)");
        titleWebPanel1.add(new GroupPanel(false,
                new AbstractConfigGroup.ConfigComponent("混沌頻道", "channel.chaosch", ServerConfig.CHANNEL_CHAOS_CH),
                new AbstractConfigGroup.ConfigComponent("變態頻道", "channel.abnormalch", ServerConfig.CHANNEL_ABNORMAL_CH),
                new AbstractConfigGroup.ConfigComponent("銅牌MVP頻道", "channel.mvpch.bronze", ServerConfig.MVP_CHANNEL_BRONZE),
                new AbstractConfigGroup.ConfigComponent("銀牌MVP頻道", "channel.mvpch.silver", ServerConfig.MVP_CHANNEL_SILVER),
                new AbstractConfigGroup.ConfigComponent("金牌MVP頻道", "channel.mvpch.gold", ServerConfig.MVP_CHANNEL_GOLD),
                new AbstractConfigGroup.ConfigComponent("鑽石MVP頻道", "channel.mvpch.diamond", ServerConfig.MVP_CHANNEL_DIAMOND),
                new AbstractConfigGroup.ConfigComponent("紅鑽MVP頻道", "channel.mvpch.red", ServerConfig.MVP_CHANNEL_RED)
        ).setMargin(5));

        TitleWebPanel titleWebPanel2 = new AbstractConfigGroup.TitleWebPanel("特別頻道基礎經驗%");
        titleWebPanel2.add(new GroupPanel(false,
                new AbstractConfigGroup.ConfigComponent("混沌頻道", "channel.chaos.baseexp", ServerConfig.CHANNEL_CHAOS_BASEEXPr),
                new AbstractConfigGroup.ConfigComponent("變態頻道", "channel.abnormal.baseexp", ServerConfig.CHANNEL_ABNORMAL_BASEEXPr),
                new AbstractConfigGroup.ConfigComponent("銅牌MVP頻道", "channel.mvpch.bronze.baseexp", ServerConfig.MVP_CHANNEL_BRONZE_BASEEXPr),
                new AbstractConfigGroup.ConfigComponent("銀牌MVP頻道", "channel.mvpch.silver.baseexp", ServerConfig.MVP_CHANNEL_SILVER_BASEEXPr),
                new AbstractConfigGroup.ConfigComponent("金牌MVP頻道", "channel.mvpch.gold.baseexp", ServerConfig.MVP_CHANNEL_GOLD_BASEEXPr),
                new AbstractConfigGroup.ConfigComponent("鑽石MVP頻道", "channel.mvpch.diamond.baseexp", ServerConfig.MVP_CHANNEL_DIAMOND_BASEEXPr),
                new AbstractConfigGroup.ConfigComponent("紅鑽MVP頻道", "channel.mvpch.red.baseexp", ServerConfig.MVP_CHANNEL_RED_BASEEXPr)
        ).setMargin(5));

        TitleWebPanel titleWebPanel3 = new AbstractConfigGroup.TitleWebPanel("特別頻道楓幣%");
        titleWebPanel3.add(new GroupPanel(false,
                new AbstractConfigGroup.ConfigComponent("混沌頻道", "channel.chaos.meso", ServerConfig.CHANNEL_CHAOS_MESO),
                new AbstractConfigGroup.ConfigComponent("變態頻道", "channel.abnormal.meso", ServerConfig.CHANNEL_ABNORMAL_MESO),
                new AbstractConfigGroup.ConfigComponent("銅牌MVP頻道", "channel.mvpch.bronze.meso", ServerConfig.MVP_CHANNEL_BRONZE_MESO),
                new AbstractConfigGroup.ConfigComponent("銀牌MVP頻道", "channel.mvpch.silver.meso", ServerConfig.MVP_CHANNEL_SILVER_MESO),
                new AbstractConfigGroup.ConfigComponent("金牌MVP頻道", "channel.mvpch.gold.meso", ServerConfig.MVP_CHANNEL_GOLD_MESO),
                new AbstractConfigGroup.ConfigComponent("鑽石MVP頻道", "channel.mvpch.diamond.meso", ServerConfig.MVP_CHANNEL_DIAMOND_MESO),
                new AbstractConfigGroup.ConfigComponent("紅鑽MVP頻道", "channel.mvpch.red.meso", ServerConfig.MVP_CHANNEL_RED_MESO)
        ).setMargin(5));

        WebScrollPane webScrollPane = new WebScrollPane(new GroupPanel(5, false, titleWebPanel1, titleWebPanel2, titleWebPanel3), false);
        webScrollPane.createHorizontalScrollBar();
        webScrollPane.getViewport().setOpaque(false);
        return webScrollPane;
    }

}
