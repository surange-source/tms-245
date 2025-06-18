package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import configs.ServerConfig;
import constants.BurningChrConstants;

import java.awt.*;
import java.lang.reflect.Field;

public class PlayerConfigGroup extends AbstractConfigGroup {
    PlayerConfigGroup(ConfigPanel owner) {
        super(owner, "角色相關");
    }

    private String burningChrTypeList;
    {
        Class aClass = BurningChrConstants.class;
        burningChrTypeList = "";
        for (Field field : aClass.getDeclaredFields()) {
            if (burningChrTypeList.isEmpty()) {
                burningChrTypeList += field.getName();
            } else {
                burningChrTypeList += "," + field.getName();
            }
        }
    }

    @Override
    public Component getPreview() {
        TitleWebPanel titleWebPanel1 = new TitleWebPanel("預設屬性設置");
        titleWebPanel1.add(new GroupPanel(false,
                new ConfigComponent("每日里程上限", "mileageDailyLimitMax", ServerConfig.mileageDailyLimitMax),
                new ConfigComponent("每月里程上限", "mileageMonthlyLimitMax", ServerConfig.mileageMonthlyLimitMax),
                new ConfigComponent("角色出生地圖(-1不變)", "channel.player.beginnermap", ServerConfig.CHANNEL_PLAYER_BEGINNERMAP),
                new ConfigComponent("預設可創建角色數量", "channel.player.maxcharacters", ServerConfig.CHANNEL_PLAYER_MAXCHARACTERS),
                new ConfigComponent("創建燃燒類型", "world.createcharburning", ServerConfig.CREATE_CHAR_BURNING, burningChrTypeList),
                new ConfigComponent("創角燃燒時間(天)", "world.createcharburningdays", ServerConfig.CREATE_CHAR_BURNING_DAYS),
                new ConfigComponent("能力值上限", "channel.player.maxap", ServerConfig.CHANNEL_PLAYER_MAXAP),
                new ConfigComponent("最大HP上限", "channel.player.maxhp", ServerConfig.CHANNEL_PLAYER_MAXHP),
                new ConfigComponent("最大MP上限", "channel.player.maxmp", ServerConfig.CHANNEL_PLAYER_MAXMP),
                new ConfigComponent("最高等級上限", "channel.player.maxlevel", ServerConfig.CHANNEL_PLAYER_MAXLEVEL),
                new ConfigComponent("持有楓幣上限", "channel.player.maxmeso", ServerConfig.CHANNEL_PLAYER_MAXMESO),
                new ConfigComponent("傷害上限校驗", "channel.player.damageLimit", ServerConfig.DAMAGE_LIMIT),
                new ConfigComponent("每日免費復活次數", "channel.player.resufreecount", ServerConfig.CHANNEL_PLAYER_RESUFREECOUNT),
                new ConfigComponent("傷害字型欄位", "defaultDamageSkinSlot", ServerConfig.defaultDamageSkinSlot)
        ).setMargin(5));
        return titleWebPanel1;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
