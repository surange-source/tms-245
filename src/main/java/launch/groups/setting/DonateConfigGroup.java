package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import com.alee.laf.scroll.WebScrollPane;
import configs.EcpayConfig;
import configs.ServerConfig;

import java.awt.*;

public class DonateConfigGroup extends AbstractConfigGroup {

    DonateConfigGroup(ConfigPanel owner) {
        super(owner, "金流設置");
    }

    @Override
    public Component getPreview() {

        TitleWebPanel titleWebPanel1 = new AbstractConfigGroup.TitleWebPanel("通用設置");
        titleWebPanel1.add(new GroupPanel(false,
                new AbstractConfigGroup.ConfigComponent("最少捐贈", "min_donate", ServerConfig.MIN_DONATE)
        ).setMargin(5));

        TitleWebPanel titleWebPanel2 = new AbstractConfigGroup.TitleWebPanel("綠界設置");
        titleWebPanel2.add(new GroupPanel(false,
                new AbstractConfigGroup.ConfigComponent("IP", "ecpay.ip", EcpayConfig.ECPAY_IP),
                new AbstractConfigGroup.ConfigComponent("連接埠", "ecpay.port", EcpayConfig.ECPAY_PORT),
                new AbstractConfigGroup.ConfigComponent("商店代號", "ecpay.merchantid", EcpayConfig.MERCHANT_ID),
                new AbstractConfigGroup.ConfigComponent("介接 HashKey", "ecpay.hashkey", EcpayConfig.HASHKEY),
                new AbstractConfigGroup.ConfigComponent("介接 HashIV", "ecpay.hashiv", EcpayConfig.HASHIV)
                //new AbstractConfigGroup.ConfigComponent("信用卡繳費網站域名/IP", "ecpay.url", EcpayConfig.LINEBOT_URL)
        ).setMargin(5));

        WebScrollPane webScrollPane = new WebScrollPane(new GroupPanel(5, false, titleWebPanel1, titleWebPanel2), false);
        webScrollPane.createHorizontalScrollBar();
        webScrollPane.getViewport().setOpaque(false);
        return webScrollPane;
    }
}
