package launch.groups.setting;

import com.alee.extended.panel.GroupPanel;
import com.alee.laf.scroll.WebScrollPane;
import configs.ServerConfig;
import constants.ServerConstants;

import java.awt.*;

public class ServerConfigGroup extends AbstractConfigGroup {


    public ServerConfigGroup(ConfigPanel owner) {
        super(owner, "伺服端配置");
    }

    @Override
    public Component getPreview() {

        TitleWebPanel titleWebPanel1 = new TitleWebPanel("基本設置");
        titleWebPanel1.add(new GroupPanel(false,
                new ConfigComponent("遊戲名稱", "login.server.name", ServerConfig.LOGIN_SERVERNAME),
                new ConfigComponent("遊戲補丁版本", "login.server.minor", ServerConfig.MapleMinor),
                new ConfigComponent("頻道選擇界面公告", "login.server.eventmessage", ServerConfig.LOGIN_EVENTMESSAGE),
                new GroupPanel(
                        new ConfigComponent("連線IP(留空自動取得)", "server.host", "127.0.0.1"),
                        new ConfigComponent("強制外網", "server.forceInternetIP", false)
                ),
                new ConfigComponent("頻道數量", "channel.server.ports", ServerConfig.CHANNEL_PORTS),
                new ConfigComponent("遊戲伺服器名稱", "login.server.flag", ServerConfig.LOGIN_SERVERFLAG, getAllServerName()),
                new ConfigComponent("遊戲伺服器狀態", "login.server.status", ServerConfig.LOGIN_SERVERSTATUS, getAllServerStatus()),
                new GroupPanel(
                        new ConfigComponent("測試機", "tespia", ServerConfig.TESPIA),
                        new ConfigComponent("多人測試限制(僅測試機)", "testpia.multiplayer", ServerConfig.MULTIPLAYER_TEST)
                )
        ).setMargin(5));

        TitleWebPanel titleWebPanel2 = new TitleWebPanel("資料庫連接設置");
        titleWebPanel2.add(new GroupPanel(false,
                new ConfigComponent("IP", "db.ip", ServerConfig.DB_IP),
                new ConfigComponent("連接埠", "db.port", ServerConfig.DB_PORT),
                new ConfigComponent("資料庫名稱", "db.name", ServerConfig.DB_NAME),
                new ConfigComponent("帳號", "db.user", ServerConfig.DB_USER),
                new ConfigComponent("密碼", "db.password", ServerConfig.DB_PASSWORD)
//                new GroupPanel(new WebButton("測試連接") {
//                    {
//                        setPreferredWidth(100);
//                        addActionListener(new ActionListener() {
//                            @Override
//                            public void actionPerformed(ActionEvent e) {
//                                new SwingWorker() {
//                                    @Override
//                                    protected Object doInBackground() throws Exception {
//                                        setEnabled(false);
//                                        String oldtext = getText();
//                                        setText("正在測試...");
//                                        owner.applyChange();
//                                        DatabaseConnection.DataBaseStatus status = DatabaseConnection.TestConnection();
//                                        WebOptionPane.showMessageDialog(null, status.name());
//                                        Start.getInstance().setDataBaseStatus(status);
//                                        setText(oldtext);
//                                        setEnabled(true);
//                                        return null;
//                                    }
//                                }.execute();
//                            }
//                        });
//                    }
//                }).setMargin(0, 150, 0, 0)
        ).setMargin(5));

        TitleWebPanel titleWebPanel3 = new TitleWebPanel("其他設置");
        titleWebPanel3.add(new GroupPanel(false,
                new ConfigComponent("腳本位置", "world.server.scriptspath", ServerConfig.WORLD_SCRIPTSPATH),
                new ConfigComponent("客制化腳本位置", "world.server.scriptspath2", ServerConfig.WORLD_SCRIPTSPATH2)
        ).setMargin(5));

        WebScrollPane webScrollPane = new WebScrollPane(new GroupPanel(5, false, titleWebPanel1, titleWebPanel2, titleWebPanel3), false);
        webScrollPane.createHorizontalScrollBar();
        webScrollPane.getViewport().setOpaque(false);
        return webScrollPane;
    }

    private String getAllServerName() {
        StringBuilder sb = new StringBuilder();
        for (ServerConstants.MapleServerName serverName : ServerConstants.MapleServerName.values()) {
            sb.append(serverName.name()).append(",");
        }
        return sb.toString();
    }

    private String getAllServerStatus() {
        StringBuilder sb = new StringBuilder();
        for (ServerConstants.MapleServerStatus status : ServerConstants.MapleServerStatus.values()) {
            sb.append(status.name()).append(",");
        }
        return sb.toString();
    }


}
