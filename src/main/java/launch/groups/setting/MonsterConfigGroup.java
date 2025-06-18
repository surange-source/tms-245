package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import configs.ServerConfig;

import java.awt.*;

public class MonsterConfigGroup extends AbstractConfigGroup {
    MonsterConfigGroup(ConfigPanel owner) {
        super(owner, "怪物相關");
    }

    @Override
    public Component getPreview() {
        TitleWebPanel titleWebPanel1 = new TitleWebPanel("常規設置");
        titleWebPanel1.add(new GroupPanel(false,
                new ConfigComponent("怪物刷新時間(秒)", "channel.monster.refresh", ServerConfig.CHANNEL_MONSTER_REFRESH),
                new ConfigComponent("掉落點數需求等級", "mobPointMinLv", ServerConfig.mobPointMinLv),
                new ConfigComponent("組隊額外掉落點數", "ptyPointModifier", ServerConfig.ptyPointModifier),
                new ConfigComponent("啟用掉點數需撿起", "mobPointNeedPickup", ServerConfig.mobPointNeedPickup),
                new ConfigComponent("啟用里程當楓點用", "mileageAsMaplePoint", ServerConfig.mileageAsMaplePoint)
        ).setMargin(5));

        TitleWebPanel titleWebPanel2 = new TitleWebPanel("技能設置");
        titleWebPanel2.add(new GroupPanel(5, false,
                new ConfigComponent("關閉怪物技能負面效果(DEBUFF)", "channel.server.applyplayerdebuff", ServerConfig.CHANNEL_APPLYPLAYERDEBUFF),
                new ConfigComponent("關閉角色技能負面效果(DEBUFF)", "channel.server.applymonsterstatus", ServerConfig.CHANNEL_APPLYMONSTERSTATUS)
        ).setMargin(5));

        TitleWebPanel titleWebPanel3 = new TitleWebPanel("武陵道場設置");
        titleWebPanel3.add(new GroupPanel(5, false,
                new ConfigComponent("怪物血量%", "channel.server.dojoMobMaxHpR", ServerConfig.dojoMobMaxHpR),
                new ConfigComponent("怪物攻擊力%", "channel.server.dojoMobAtkR", ServerConfig.dojoMobAtkR),
                new ConfigComponent("怪物防禦率%", "channel.server.dojoMobDefenseRateR", ServerConfig.dojoMobDefenseRateR)
        ).setMargin(5));

        return new GroupPanel(5, false, titleWebPanel1, titleWebPanel2, titleWebPanel3);
    }
}
