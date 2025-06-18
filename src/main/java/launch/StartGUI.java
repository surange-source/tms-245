package launch;

import auth.Auth;
import client.MapleCharacter;
import client.inventory.MapleInventoryIdentifier;
import com.alee.extended.label.WebHotkeyLabel;
import com.alee.extended.painter.TitledBorderPainter;
import com.alee.extended.panel.GroupPanel;
import com.alee.extended.progress.WebProgressOverlay;
import com.alee.extended.statusbar.WebMemoryBar;
import com.alee.extended.statusbar.WebStatusBar;
import com.alee.global.StyleConstants;
import com.alee.laf.WebLookAndFeel;
import com.alee.laf.button.WebButton;
import com.alee.laf.combobox.WebComboBox;
import com.alee.laf.label.WebLabel;
import com.alee.laf.menu.WebMenuItem;
import com.alee.laf.menu.WebPopupMenu;
import com.alee.laf.optionpane.WebOptionPane;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.rootpane.WebFrame;
import com.alee.laf.scroll.WebScrollBar;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.separator.WebSeparator;
import com.alee.laf.text.WebTextField;
import com.alee.laf.text.WebTextPane;
import configs.Config;
import configs.ServerConfig;
import constants.ItemConstants;
import constants.ServerConstants;
import constants.enums.BroadcastMessageType;
import constants.enums.UserChatMessageType;
import database.DatabaseLoader;
import plugin.GuiListener;
import plugin.GuiManager;
import handling.auction.AuctionServer;
import handling.cashshop.CashShopServer;
import handling.channel.ChannelServer;
import handling.channel.MapleDojoRanking;
import handling.channel.MapleGuildRanking;
import handling.login.LoginInformationProvider;
import handling.login.LoginServer;
import handling.opcode.RecvPacketOpcode;
import handling.opcode.SendPacketOpcode;
import handling.world.World;
import handling.world.WorldBroadcastService;
import handling.world.WorldRespawnService;
import handling.world.family.MapleFamily;
import handling.world.guild.MapleGuild;
import handling.world.messenger.MessengerRankingWorker;
import launch.groups.datamanage.DataManagePanel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import packet.MaplePacketCreator;
import scripting.AbstractScriptManager;
import scripting.portal.PortalScriptManager;
import server.*;
import server.Timer;
import server.carnival.MapleCarnivalFactory;
import launch.groups.setting.ConfigPanel;
import server.life.PlayerNPC;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.swing.*;
import javax.swing.plaf.FontUIResource;
import javax.swing.text.BadLocationException;
import javax.swing.text.SimpleAttributeSet;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ScheduledFuture;


public class StartGUI extends WebFrame implements GuiListener {


    private static final Logger log = LogManager.getLogger(StartGUI.class);

    private static StartGUI instance;
    private WebTextPane textPane;
    private ScheduledFuture<?> shutdownServer, startRunTime;
    private WebHotkeyLabel[] labels;
    private boolean autoScroll = true;
    private WebHotkeyLabel runningTimelabel;
    private WebButton startServer;
    private boolean startFinish = false;
    public long starttime = 0;
    public static float DPI =(StartServer.guiEnabled ? (java.awt.Toolkit.getDefaultToolkit().getScreenResolution() / 96.0f) : 0);

    static {
        if (StartServer.guiEnabled) {
            for (Iterator i = UIManager.getLookAndFeelDefaults().keySet().iterator(); i.hasNext(); ) {
                Object obj = i.next();
                if (!(obj instanceof String)) {
                    continue;
                }
                String key = (String) obj;
                if (key.endsWith(".font")) {
                    Font font = UIManager.getFont(key);
                    Font biggerFont = font.deriveFont(DPI * font.getSize2D());
                    // change ui default to bigger font
                    UIManager.put(key, biggerFont);
                }
            }
            FontUIResource fontUIResource = new FontUIResource("NSinSum", 0, 12);
            WebLookAndFeel.globalControlFont = fontUIResource;
            WebLookAndFeel.globalTooltipFont = fontUIResource;
            WebLookAndFeel.globalAlertFont = fontUIResource;
            WebLookAndFeel.globalMenuFont = fontUIResource;
            WebLookAndFeel.globalAcceleratorFont = fontUIResource;
            WebLookAndFeel.globalTitleFont = fontUIResource;
            WebLookAndFeel.globalTextFont = fontUIResource;
            WebLookAndFeel.toolTipFont = fontUIResource;
            WebLookAndFeel.textPaneFont = fontUIResource;
            try {
                UIManager.setLookAndFeel(new WebLookAndFeel());
            } catch (Exception ignore) {
            }
            instance = new StartGUI();
        }
    }

    public StartGUI() {
        Timer.GuiTimer.getInstance().start();

        GuiManager.registerListener(this);
        WebPanel contentPane = new WebPanel();
        contentPane.setPreferredSize((int) (DPI * 1000), (int) (DPI * 600));
        setMinimumSize(contentPane.getPreferredSize());
        setIconImage(getMainIcon().getImage());
        setLayout(new BorderLayout());
        String server_version = "Build." + Config.getServerBuildVersion();

        contentPane.add(createMainPane(), BorderLayout.CENTER);
        contentPane.add(createStatusBar(), BorderLayout.SOUTH);

        add(contentPane);

        setTitle("新楓之谷伺服端  當前遊戲版本: v." + ServerConstants.MapleMajor + " 伺服端版本: " + server_version);

        pack();
        setLocationRelativeTo(null);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                int result = WebOptionPane.showConfirmDialog(instance, "確認要退出？", "警告", WebOptionPane.YES_NO_OPTION);
                if (result == WebOptionPane.YES_OPTION) {
                    System.exit(0);
                }
            }
        });

        //SwingUtilities.invokeLater(DataManagePanel::getInstance);

        System.setOut(new PrintStream(new NewOutputStream((byte) 0, System.out)));
        System.setErr(new PrintStream(new NewOutputStream((byte) 1, System.err)));

        setVisible(true);
    }

    public void startServer_Click() {
        Timer.GuiTimer.getInstance().schedule(startServer::doClick, 1000);
    }

    public static StartGUI getInstance() {
        return instance;
    }

    public static ImageIcon loadIcon(final String path) {
//        return new ImageIcon(StartGUI.class.getClass().getResource("/image/" + path));
        return new ImageIcon("Icon.png");
    }

    public static ImageIcon getMainIcon() {
        return loadIcon("Icon.png");
    }

    public static void showMessage(String error, String title, int type) {
        WebOptionPane.showMessageDialog(null, error, title, type);
    }

    private Component createMainPane() {
        final WebPanel contentPane = new WebPanel();

        contentPane.setLayout(new BorderLayout());

        // 創建運行日誌
        final WebPanel runningLogPane = new WebPanel(new BorderLayout());
        runningLogPane.setPainter(new TitledBorderPainter("運行日誌")).setMargin(2);
        runningLogPane.setPreferredSize((int) (DPI * 660), (int) (DPI * 300));
        textPane = new WebTextPane();
        textPane.setEditable(false);
        textPane.setComponentPopupMenu(new WebPopupMenu() {
            {
                add(new WebMenuItem("清屏") {
                    {
                        addActionListener(new ActionListener() {
                            @Override
                            public void actionPerformed(ActionEvent e) {
                                textPane.clear();
                            }
                        });
                    }
                });
            }
        });
        final WebScrollPane textPaneScroll = new WebScrollPane(textPane);
        textPaneScroll.createVerticalScrollBar();

        // 實現滾動條到達底部後自動滾動，否則不自動滾動
        textPaneScroll.addMouseWheelListener(e -> {
            WebScrollBar scrollBar = textPaneScroll.getWebVerticalScrollBar();
            autoScroll = e.getWheelRotation() != -1 && scrollBar.getMaximum() - scrollBar.getValue() <= scrollBar.getHeight();
        });

        runningLogPane.add(textPaneScroll);

        // 快捷菜單
        final WebPanel menuPane = new WebPanel(new BorderLayout(5, 5));
        menuPane.setUndecorated(false);
        menuPane.setRound(StyleConstants.largeRound);
        menuPane.setMargin(5);
        menuPane.setShadeWidth(5);

        final WebButton serverConfig = new WebButton("配置參數", e -> new SwingWorker() {
            @Override
            protected Object doInBackground() throws Exception {
                showConfigPanel();
                return null;
            }
        }.execute());
        serverConfig.setMargin(5, 10, 5, 10);
        serverConfig.setRound(15);

        final WebButton dataManage = new WebButton("數據管理", e -> {
            if (!InitializeServer.InitDataFinished) {
                WebOptionPane.showMessageDialog(instance, "資料未加載完成，無法使用");
                return;
            }
            DataManagePanel dataManagePanel = DataManagePanel.getInstance();
            dataManagePanel.pack();
            dataManagePanel.setLocationRelativeTo(null);
            dataManagePanel.setVisible(true);
        });
        dataManage.setMargin(5, 10, 5, 10);

        final WebButton testButton = new WebButton("測試按鍵", e -> {
            if (Config.isDevelop()) {
                new Thread(() -> {
                    ScriptEngine se = new ScriptEngineManager().getEngineByName("nashorn");
                    try {
                        if ((new File("./test.js")).exists()) {
                            se.eval("load(\"./test.js\")");
                        }
                    } catch (ScriptException e1) {
                        e1.printStackTrace();
                    }
                }).start();
            }
        });
        testButton.setMargin(5, 10, 5, 10);

        final WebButton reloadOP = new WebButton("重載配置", e -> {
            Config.load();
            SendPacketOpcode.reloadValues();
            RecvPacketOpcode.reloadValues();
            System.out.println("重載配置完成");
        });
        reloadOP.setMargin(5, 10, 5, 10);

        final ImageIcon start = loadIcon("start.png");
        final ImageIcon stop = loadIcon("stop.png");
        startServer = new WebButton("啟動伺服端", start);
        final WebProgressOverlay progressOverlay = new WebProgressOverlay();
        progressOverlay.setConsumeEvents(false);
        startServer.setMargin(5, 10, 5, 10);
        startServer.setRound(15);
        progressOverlay.setComponent(startServer);
        progressOverlay.setOpaque(false);
        startServer.addActionListener(e -> {
            boolean showLoad = !progressOverlay.isShowLoad();
            if (showLoad) {
                if (InitializeServer.InitDataFinished) {
                    startRunTime();
                    StartServer.run();
                } else {
                    WebOptionPane.showMessageDialog(instance, "資料未加載完成，無法啟動伺服端");
                    return;
                }
            } else {
                final int input = WebOptionPane.showConfirmDialog(instance, "是否要關閉伺服端？", "關閉", WebOptionPane.OK_CANCEL_OPTION);
                if (input == WebOptionPane.OK_OPTION) {
                    startServer.setEnabled(false);
                    new Thread(() -> {
                        ShutdownServer.getInstance().run();
                        startServer.setEnabled(true);
                    }).start();
                } else {
                    return;
                }
            }

            progressOverlay.setShowLoad(showLoad);
            startServer.setText(showLoad ? "停止伺服端" : "啟動伺服端");
            startServer.setIcon(showLoad ? stop : start);
        });

        menuPane.add(new GroupPanel(false,
                        serverConfig,
                        new WebSeparator(false, true).setMargin(4, 0, 4, 0),
                        dataManage,
                        reloadOP,
//                        bossManage,
//                        delUserDataManage,
                        testButton,
                        new WebSeparator(false, true).setMargin(4, 0, 0, 0)),
                BorderLayout.NORTH);
        menuPane.add(new GroupPanel(false, new WebSeparator(false, true).setMargin(4, 0, 4, 0), progressOverlay), BorderLayout.SOUTH);


        contentPane.add(runningLogPane, BorderLayout.CENTER);
        contentPane.add(menuPane, BorderLayout.EAST);

        // 設置默認焦點
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowOpened(WindowEvent e) {
                startServer.requestFocus();
            }
        });

        return contentPane;
    }

    public synchronized ConfigPanel showConfigPanel() {
        ConfigPanel serverConfigFrame = new ConfigPanel(instance);
        serverConfigFrame.pack();
        serverConfigFrame.setLocationRelativeTo(instance);
        serverConfigFrame.setVisible(true);
        return serverConfigFrame;
    }

    private Component createOnlineStatus() {
        final GroupPanel groupPanel = new GroupPanel(5);
        groupPanel.setPainter(new TitledBorderPainter("線上人數"));
        groupPanel.setMargin(5);
        labels = new WebHotkeyLabel[ServerConfig.CHANNEL_PORTS];
        for (int i = 0; i < ServerConfig.CHANNEL_PORTS; i++) {
            final WebHotkeyLabel label = new WebHotkeyLabel("頻道" + (i + 1) + " : 0");
            labels[i] = label;
            groupPanel.add(label);
        }
        WebScrollPane webScrollPane = new WebScrollPane(groupPanel);
        webScrollPane.createVerticalScrollBar();
        webScrollPane.getViewport().setOpaque(false);
        return webScrollPane;
    }

    private Component createBroadCastMsg() {
        final WebPanel contentPanel = new WebPanel(new BorderLayout(5, 5));
        contentPanel.setPainter(new TitledBorderPainter("系統公告"));
        contentPanel.setMargin(5);

        String[] items = {"頂部黃色公告", "訊息提示窗", "藍色公告", "紅色公告", "白色公告"};

        final WebComboBox comboBox = new WebComboBox(items);
        contentPanel.add(comboBox, BorderLayout.WEST);

        final WebTextField textField = new WebTextField(ServerConfig.LOGIN_SERVERMESSAGE);
        textField.setInputPrompt("點擊此處輸入您要發佈的訊息內容...");
        textField.setHideInputPromptOnFocus(false);
        contentPanel.add(textField, BorderLayout.CENTER);

        comboBox.addItemListener(e -> {
            if (e.getItem().equals("頂部黃色公告")) {
                textField.setText(ServerConfig.LOGIN_SERVERMESSAGE);
            } else {
                textField.setText("");
            }
        });

        final WebButton send = new WebButton("發送訊息", e -> new SwingWorker() {
            @Override
            protected Object doInBackground() throws Exception {
                if (!startFinish) {
                    WebOptionPane.showMessageDialog(instance, "伺服端未啟動，無法使用此功能");
                    return null;
                }
                String msg = textField.getText();
                byte[] packet = new byte[0];
                switch (comboBox.getSelectedIndex()) {
                    case 0:
                        ServerConfig.LOGIN_SERVERMESSAGE = msg;
                        Config.setProperty("login.server.message", msg);
                        packet = MaplePacketCreator.serverMessage(msg);
                        break;
                    case 1:
                        packet = MaplePacketCreator.serverNotice(BroadcastMessageType.ALERT, msg);
                        break;
                    case 2:
                        packet = MaplePacketCreator.serverNotice(BroadcastMessageType.NOTICE_WITHOUT_PREFIX, msg);
                        break;
                    case 3:
                        packet = MaplePacketCreator.serverNotice(BroadcastMessageType.EVENT, msg);
                        break;
                    case 4:
                        packet = MaplePacketCreator.spouseMessage(UserChatMessageType.管理員對話, msg);
                        break;
                }
                WorldBroadcastService.getInstance().broadcastMessage(packet);
                WebOptionPane.showMessageDialog(instance, "發送完成");
                return null;
            }
        }.execute());
        contentPanel.add(send, BorderLayout.EAST);

        return contentPanel;
    }

    private Component createStatusBar() {
        final WebPanel contentPane = new WebPanel(new BorderLayout(5, 5));
        final WebStatusBar statusBar = new WebStatusBar();

        WebLabel authLimitTime = new WebLabel() {
            @Override
            public void setText(String text) {
                super.setText(" 授權到期時間: " + text + " ");
            }
        };
        Date deadLine = new Date();
        if (Auth.getDeadLine() != 0) {
            deadLine.setTime(Auth.getDeadLine());
        }
        authLimitTime.setText(new SimpleDateFormat("yyyy-MM-dd").format(deadLine));
        statusBar.add(authLimitTime);
        statusBar.addSeparator();
        WebLabel text = new WebLabel();
        text.setText("源代碼來自網路，僅供學習交流，請於下載後24小時內刪除！");
        statusBar.add(text);
        statusBar.addSeparator();
        runningTimelabel = new WebHotkeyLabel("運行時長: 00天00:00:00");
        statusBar.addToEnd(runningTimelabel);
        statusBar.addSeparatorToEnd();


        WebMemoryBar memoryBar = new WebMemoryBar();
        memoryBar.setShowMaximumMemory(false);
        memoryBar.setPreferredWidth(memoryBar.getPreferredSize().width + 20);
        statusBar.addToEnd(memoryBar);

        contentPane.add(createBroadCastMsg(), BorderLayout.NORTH);
        contentPane.add(createOnlineStatus(), BorderLayout.CENTER);
        contentPane.add(statusBar, BorderLayout.SOUTH);

        return contentPane;
    }

    private void startRunTime() {
        startRunTime = Timer.GuiTimer.getInstance().register(new Runnable() {
            @Override
            public void run() {
                runningTimelabel.setText(formatDuring(System.currentTimeMillis() - starttime));
            }

            private String formatDuring(long mss) {
                long days = mss / (1000 * 60 * 60 * 24);
                long hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
                long minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
                long seconds = (mss % (1000 * 60)) / 1000;
                return "運行時長: " + (days / 10 == 0 ? "0" : "") + days + "天" + (hours / 10 == 0 ? "0" : "") + hours + ":" + (minutes / 10 == 0 ? "0" : "") + minutes + ":"
                        + (seconds / 10 == 0 ? "0" : "") + seconds;
            }
        }, 1000);
    }

    @Override
    public void playerRegistered(int chrId) {

    }

    @Override
    public void playerTalked(int type, int chrId, String message) {

    }

    @Override
    public void updatePlayer(MapleCharacter player) {

    }

    @Override
    public void onlineStatusChanged(int channel, int count) {
        if (channel > 0) {
            labels[channel - 1].setText("頻道" + channel + " : " + count);
        }
    }

    public static class StartThread implements Runnable {

        @Override
        public void run() {
            try {
                ShutdownServer.getInstance().setShutdown(false);
                DatabaseLoader.restart();
                System.out.println("開啟時鐘線程...");
                Timer.startAll();
                if (Config.getProperty("server.host", "127.0.0.1").isEmpty()) {
                    System.out.println("未設定外網IP, 從網路獲取:" + ServerConstants.getIPv4Address());
                }
                System.out.println("正在啟動 - 好友、組隊、公會、聯盟、角色管理");
                World.init();
                MapleGuildRanking.getInstance().load();
                MapleGuild.loadAll();
                MapleFamily.loadAll();

//                System.out.println("正在加載 - 技能訊息");
//                SkillFactory.loadAllSkills();

                System.out.println("正在加載 - 初始角色訊息");
                LoginInformationProvider.getInstance();

                System.out.println("正在加載 - 隨機獎勵");
                RandomRewards.load();

                System.out.println("正在加載 - 角色卡系統");
                CharacterCardFactory.getInstance().initialize();

                System.out.println("正在加載 - 副本競速排行榜");
                SpeedRunner.loadSpeedRuns();

                System.out.println("正在加載 - 拍賣場系統");
                MTSStorage.load();

                LoginServer.run_startup_configurations();
                ChannelServer.startChannel_Main();
                CashShopServer.run_startup_configurations();
                AuctionServer.getInstance().init();
//                ChatServer.run_startup_configurations();
//                new SpecLoginServer().start();

                System.out.println("正在加載 - 其他訊息");
                Timer.CheatTimer.getInstance().register(AutobanManager.getInstance(), 60000);
                WorldRespawnService.getInstance();
                LoginServer.setOn();
                PredictCardFactory.getInstance().initialize();
                MapleInventoryIdentifier.getInstance();
                PlayerNPC.loadAll();
                MapleDojoRanking.getInstance().load(false);
                RankingWorker.start();
//                PlayMSEvent.start();
                MessengerRankingWorker.getInstance();
//                server.Start.checkCopyItemFromSql();
//                clearOnlineTime();
                RankingTop.getInstance();
//                DataBaseManagePanel.getInstance().autoBackup();
                MapleCarnivalFactory.getInstance();
                ItemConstants.TapJoyReward.init();
                Runtime.getRuntime().addShutdownHook(new Thread(ShutdownServer.getInstance()));
//                ServerNotice.start();
//                Timer.GuiTimer.getInstance().register(() -> {
//                    ChannelServer.getAllInstances().stream()
//                            .flatMap(it -> it.getPlayerStorage().getAllCharacters().stream())
//                            .forEach(player -> player.saveToDB(false, false));
//                }, 1000 * 60 * 3);
                System.err.println("伺服端啟動完成！");
                System.out.println("IP: " + Config.getProperty("server.host", "127.0.0.1"));
                // tmp
                PortalScriptManager.getInstance().getInvocable("portal/106030100_IP.js", null);
                // below code requires GUI
                if (instance == null) return;
                log.info("伺服端啟動完成！");
                StartGUI.instance.startFinish = true;
            } catch (Exception e) {
                System.err.println("伺服端啟動失敗！");
                // below code requires GUI
                if (instance == null) return;
                log.fatal("伺服端啟動失敗", e);
            }
        }
    }

    private class NewOutputStream extends OutputStream {

        private final byte type;
        private final OutputStream sourceStream;

        public NewOutputStream(byte type, OutputStream stream) {
            this.type = type;
            this.sourceStream = stream;
        }

        @Override
        public void write(int b) throws IOException {
            sourceStream.write(b);
        }

        @Override
        public void write(final byte[] b, final int off, final int len) throws IOException {
            sourceStream.write(b, off, len);
            final SimpleAttributeSet set = new SimpleAttributeSet();
            String s = new String(b, off, len);
            switch (type) {
                case 0:
                    javax.swing.text.StyleConstants.setForeground(set, Color.BLACK);
                    break;
                case 1:
                    javax.swing.text.StyleConstants.setForeground(set, Color.RED);
                    break;
                case 2:
                    javax.swing.text.StyleConstants.setForeground(set, Color.BLUE);
                    break;
            }

            try {
                if (instance == null) return;
                WebTextPane textPane = StartGUI.getInstance().textPane;

                textPane.getDocument().insertString(textPane.getDocument().getLength(), s, set);
                if (StartGUI.this.autoScroll) {
                    textPane.setCaretPosition(textPane.getDocument().getLength());
                }
            } catch (BadLocationException e) {
                if (instance == null) System.err.println("控制面板輸出失敗");
                else log.fatal("控制面板輸出失敗", e);
            }
        }
    }

}
