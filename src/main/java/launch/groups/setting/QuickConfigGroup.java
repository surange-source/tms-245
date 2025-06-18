package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import com.alee.extended.panel.GroupingType;
import configs.ServerConfig;

import java.awt.*;

public class QuickConfigGroup extends AbstractConfigGroup {


    QuickConfigGroup(ConfigPanel owner) {
        super(owner, "快捷功能配置");
    }

    @Override
    public Component getPreview() {

        TitleWebPanel titleWebPanel1 = new TitleWebPanel("快捷功能");
        titleWebPanel1.add(new GroupPanel(3, false,
                new ConfigComponent("啟用管理登入模式", "world.server.onlyadmin", ServerConfig.WORLD_ONLYADMIN),
                new ConfigComponent("啟用自動封號系統", "world.autoban", ServerConfig.WORLD_AUTOBAN),
                new ConfigComponent("啟用自動註冊", "world.autoregister", ServerConfig.AUTORIGISTER),
                new ConfigComponent("啟用腳本緩存", "world.server.cachescript", ServerConfig.WORLD_CACHE_SCRIPT),
                new ConfigComponent("所有技能無冷卻時間", "channel.player.disablecooldown", ServerConfig.CHANNEL_PLAYER_DISABLECOOLDOWN),
                new ConfigComponent("啟用萬聖節裝飾", "world.halloweenskin", ServerConfig.HALLOWEEN_SKIN),
                new ConfigComponent("啟用聖誕節裝飾", "world.christmasskin", ServerConfig.CHRISTMAS_SKIN),
                new ConfigComponent("啟用商城可用楓點購物", "channel.server.enablepointsbuy", ServerConfig.CHANNEL_ENABLEPOINTSBUY),
                new ConfigComponent("啟用GM自動完成無腳本任務", "channel.player.autocompletequest", ServerConfig.CHANNEL_PLAYER_AUTOCOMPLETEQUEST),
                new ConfigComponent("萌獸最終傷害潛能概率降低", "familiarIncDAMrHard", ServerConfig.familiarIncDAMrHard),
                new ConfigComponent("啟用韓版星火階級", "KMS_NirvanaFlameTier", ServerConfig.KMS_NirvanaFlameTier),
                new ConfigComponent("關閉符文輪功能", "map.rune.close", ServerConfig.RUNE_CLOSE),
                new ConfigComponent("補全資料庫缺少楓幣掉落", "defaultMeso", ServerConfig.ADD_DEFAULT_MESO)
        ).setMargin(5));


        TitleWebPanel titleWebPanel2 = new TitleWebPanel("其他功能");
        titleWebPanel2.add(new GroupPanel(false,
                new ConfigComponent("禁止獲得經驗值", "world.bangainexp", ServerConfig.WORLD_BANGAINEXP),
                new ConfigComponent("禁止所有交易", "world.bantrade", ServerConfig.WORLD_BANTRADE),
                new ConfigComponent("禁止怪物掉寶", "world.bandropitem", ServerConfig.WORLD_BANDROPITEM),
                new ConfigComponent("停用潛能系統", "world.disablepotential", ServerConfig.DISABLE_POTENTIAL),
                new ConfigComponent("玩家人氣小於0不允許穿戴裝備", "world.equipcheckfame", ServerConfig.WORLD_EQUIPCHECKFAME),
                new ConfigComponent("啟用傷害校驗系統", "server.verifydamage", ServerConfig.SERVER_VERIFY_DAMAGE),
                new ConfigComponent("啟用組隊點數原地復活", "partyQuestRevive", ServerConfig.partyQuestRevive),
                new ConfigComponent("黃金蘋果碎片無期限", "goldenAppleFragmentNoTimeLimit", ServerConfig.goldenAppleFragmentNoTimeLimit),
                new ConfigComponent("啟用日版魂武系統", "", ServerConfig.JMS_SOULWEAPON_SYSTEM), // world.jmssoulweaponsys
                new ConfigComponent("所有裝備可鑲嵌星岩", "", ServerConfig.ALL_SOCKET) // world.allsocket
        ).setMargin(5));

        return new GroupPanel(GroupingType.fillAll, 5, titleWebPanel1, titleWebPanel2);
    }
}
