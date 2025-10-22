package launch.groups.database;

import com.alee.extended.filechooser.WebDirectoryChooser;
import com.alee.extended.painter.TitledBorderPainter;
import com.alee.extended.panel.GroupPanel;
import com.alee.extended.window.WebProgressDialog;
import com.alee.laf.button.WebButton;
import com.alee.laf.label.WebLabel;
import com.alee.laf.list.WebList;
import com.alee.laf.list.WebListModel;
import com.alee.laf.optionpane.WebOptionPane;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.rootpane.WebFrame;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.separator.WebSeparator;
import com.alee.laf.text.WebTextField;
import com.alee.utils.ThreadUtils;
import com.alee.utils.swing.DialogOptions;
import configs.Config;
import configs.ServerConfig;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.Timer;
import launch.StartGUI;
import tools.DateUtil;
import server.Randomizer;
import tools.StringUtil;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.Objects;
import java.util.concurrent.ScheduledFuture;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

public class DataBaseManagePanel extends WebFrame {

    private static final Logger log = LogManager.getLogger();
    public static DataBaseManagePanel instance;
    private final WebTextField setupPath = new WebTextField(20), backupPath = new WebTextField((20));
    private final WebList backupList = new WebList(new WebListModel<>());
    private transient ScheduledFuture<?> autoback;

    DataBaseManagePanel() {
        super("資料庫管理");
        //setIconImage(StartGUI.getMainIcon().getImage());

        setupPath.setText(ServerConfig.DB_SETUPPATH);
        backupPath.setText(ServerConfig.DB_BACKUPPATH);
        setupPath.setEditable(false);
        backupPath.setEditable(false);
        updateSQLList();

        setDefaultCloseOperation(DISPOSE_ON_CLOSE);

        add(new WebPanel(new BorderLayout(5, 5)) {
            {
                setPreferredSize((int) (launch.StartGUI.DPI * 400), (int) (launch.StartGUI.DPI * 500));
                setResizable(false);
                setMargin(2, 5, 2, 5);

                // 設置mysql安裝路徑、備份路徑
                add(new WebPanel() {
                    {
                        setMargin(5);
                        setPainter(new TitledBorderPainter("MySQL設定"));
                        final WebTextField time = new WebTextField(String.valueOf(ServerConfig.DB_AUTOBACKUPTIME), 5);

                        add(new GroupPanel(false,
                                new GroupPanel(
                                        new WebLabel("MySQL安裝位置："),
                                        setupPath,
                                        new WebButton("...") {
                                            {
                                                addActionListener(new ActionListener() {
                                                    private WebDirectoryChooser directoryChooser = null;

                                                    @Override
                                                    public void actionPerformed(ActionEvent e) {
                                                        if (directoryChooser == null) {
                                                            directoryChooser = new WebDirectoryChooser(instance);
                                                        }
                                                        directoryChooser.setVisible(true);
                                                        if (directoryChooser.getResult() == DialogOptions.OK_OPTION) {
                                                            final File file = directoryChooser.getSelectedDirectory();
                                                            ServerConfig.DB_SETUPPATH = file.getAbsolutePath();
                                                            Config.setProperty("db.setuppath", ServerConfig.DB_SETUPPATH.replace("\\", "\\\\"));
                                                            setupPath.setText(ServerConfig.DB_SETUPPATH);
                                                        }
                                                    }
                                                });
                                            }
                                        }),
                                new GroupPanel(
                                        new WebLabel("MySQL備份位置："),
                                        backupPath,
                                        new WebButton("...") {
                                            {
                                                addActionListener(new ActionListener() {
                                                    private WebDirectoryChooser directoryChooser = null;

                                                    @Override
                                                    public void actionPerformed(ActionEvent e) {
                                                        if (directoryChooser == null) {
                                                            directoryChooser = new WebDirectoryChooser(instance);
                                                        }
                                                        directoryChooser.setVisible(true);
                                                        if (directoryChooser.getResult() == DialogOptions.OK_OPTION) {
                                                            final File file = directoryChooser.getSelectedDirectory();
                                                            ServerConfig.DB_BACKUPPATH = file.getAbsolutePath();
                                                            Config.setProperty("db.backuppath", ServerConfig.DB_BACKUPPATH.replace("\\", "\\\\"));
                                                            backupPath.setText(ServerConfig.DB_BACKUPPATH);
                                                        }
                                                    }
                                                });
                                            }
                                        }),
                                new GroupPanel(new WebLabel("MySQL自動備份間隔時間（分鐘）："), time, new WebButton("刷新") {
                                    {
                                        addActionListener(new ActionListener() {
                                            @Override
                                            public void actionPerformed(ActionEvent e) {
                                                ServerConfig.DB_AUTOBACKUPTIME = Integer.parseInt(time.getText());
                                                Config.setProperty("db.autobackuptime", time.getText());
                                                autoBackup();
                                                WebOptionPane.showMessageDialog(instance, "刷新成功");
                                            }
                                        });
                                    }
                                })));
                    }
                }, BorderLayout.NORTH);

                // 備份歷史列表
                final String[] data = {"2016年9月3日0:37:25", "2016年9月3日0:37:32", "2016年9月3日0:37:35"};
                add(new WebPanel() {
                    {
                        setPainter(new TitledBorderPainter("歷史備份選單"));

                        backupList.setEditable(false);
                        add(new WebScrollPane(new WebPanel(backupList)));

                        // 操作按鈕
                        add(new GroupPanel(false,
                                new WebButton("創建備份") {
                                    {
                                        addActionListener(new ActionListener() {
                                            @Override
                                            public void actionPerformed(ActionEvent e) {
                                                if (WebOptionPane.showConfirmDialog(instance, "備份資料庫大概需要幾分鐘時間，全程在後台運行，期間不會影響您的其他操作，完成後將會自動通知您，是否繼續？", "資料庫備份", WebOptionPane.YES_NO_OPTION) == WebOptionPane.NO_OPTION) {
                                                    return;
                                                }
                                                final WebButton webButton = ((WebButton) e.getSource());
                                                final String oldtext = webButton.getText();
                                                webButton.setText("正在備份");
                                                webButton.setEnabled(false);
                                                new SwingWorker() {
                                                    @Override
                                                    protected Object doInBackground() throws Exception {
                                                        new BackupDB().run();
                                                        webButton.setText(oldtext);
                                                        webButton.setEnabled(true);
                                                        WebOptionPane.showMessageDialog(instance, "資料庫備份完成！");
                                                        return null;
                                                    }
                                                }.execute();
                                            }
                                        });
                                    }
                                },
                                new WebButton("還原備份") {
                                    {
                                        addActionListener(new ActionListener() {
                                            @Override
                                            public void actionPerformed(ActionEvent e) {
                                                if (backupList.getSelectedIndex() == -1) {
                                                    WebOptionPane.showMessageDialog(instance, "請先在左側選單中選擇還原點");
                                                    return;
                                                }
                                                final WebButton webButton = ((WebButton) e.getSource());
                                                final String path = (String) backupList.getSelectedValue();
                                                if (WebOptionPane.showConfirmDialog(instance, "您確認要還原到 " + path + " " + " 時的備份嗎?", "還原備份", WebOptionPane.YES_NO_OPTION) == WebOptionPane.NO_OPTION) {
                                                    return;
                                                }
                                                new SwingWorker() {
                                                    @Override
                                                    protected Object doInBackground() throws Exception {
                                                        String oldtext = webButton.getText();
                                                        webButton.setText("正在還原");
                                                        webButton.setEnabled(false);
                                                        recoverDB(path);
                                                        webButton.setText(oldtext);
                                                        webButton.setEnabled(true);
                                                        return null;
                                                    }
                                                }.execute();
                                            }
                                        });
                                    }
                                },
                                new WebButton("移除備份") {
                                    {
                                        addActionListener(new ActionListener() {
                                            @Override
                                            public void actionPerformed(ActionEvent e) {
                                                int[] indexs = backupList.getSelectedIndices();
                                                if (indexs.length == 0) {
                                                    WebOptionPane.showMessageDialog(instance, "請先在左側選單中選擇要移除的備份");
                                                    return;
                                                }
                                                if (WebOptionPane.showConfirmDialog(instance, "您確認要移除已選中的 " + indexs.length + " 個備份嗎？", "移除備份", WebOptionPane.OK_CANCEL_OPTION) == WebOptionPane.OK_OPTION) {
                                                    int delete = 0;
                                                    for (int index : indexs) {
                                                        File file = new File(ServerConfig.DB_BACKUPPATH + "/" + backupList.getWebModel().get(index - delete) + ".sql.gz");
                                                        if (file.exists() && file.isFile()) {
                                                            file.delete();
                                                        } else {
                                                            WebOptionPane.showMessageDialog(instance, "移除失敗，檔案不存在或已移除 " + file.exists() + " " + file.isFile());
                                                        }
                                                        backupList.getWebModel().remove(index - delete);
                                                        delete++;
                                                    }
                                                }
                                            }
                                        });
                                    }
                                },
                                new WebSeparator().setMargin(5),
                                new WebButton("一鍵清檔") {
                                    {
                                        addActionListener(new ActionListener() {
                                            @Override
                                            public void actionPerformed(ActionEvent e) {
                                                new SwingWorker() {
                                                    @Override
                                                    protected Object doInBackground() throws Exception {
                                                        int verifcode;
                                                        final String defText = "請輸入認證碼";
                                                        Object obj = "";
                                                        while (obj != null && !defText.equals(obj)) {
                                                            verifcode = Randomizer.rand(1000, 9999);
                                                            obj = WebOptionPane.showInputDialog(instance, "此操作不可逆，操作前盡量備份資料庫，以免悔恨終生。\r\n如果已經過慎重考慮，那麼請輸入認證碼：" + verifcode, "清空玩家數據", JOptionPane.WARNING_MESSAGE, null, null, defText);
                                                            if (obj instanceof String && StringUtil.isNumber(String.valueOf(obj))) {
                                                                int resultcode = Integer.valueOf(String.valueOf(obj));
                                                                if (resultcode != verifcode) {
                                                                    WebOptionPane.showMessageDialog(instance, "認證碼錯誤，請重新輸入");
                                                                } else {
                                                                    // 清空數據
//                                                                    Thread thread = new Thread(DeleteUserData::run);
//                                                                    thread.start();
//                                                                    break;
                                                                    throw new UnsupportedOperationException("不再支援清空數據");
                                                                }
                                                            }
                                                        }
                                                        return null;
                                                    }
                                                }.execute();
                                            }
                                        });
                                    }
                                }
                        ), BorderLayout.EAST);
                    }
                }, BorderLayout.CENTER);
            }
        });
    }

    public static DataBaseManagePanel getInstance() {
        if (instance == null) {
            instance = new DataBaseManagePanel();
        }
        return instance;
    }

    @SuppressWarnings("unchecked")
    private void updateSQLList() {
        File file = new File(ServerConfig.DB_BACKUPPATH);
        if (!file.exists()) {
            return;
        }
        WebListModel webModel = backupList.getWebModel();
        webModel.clear();
        for (String s : Objects.requireNonNull(file.list())) {
            if (s.endsWith(".sql.gz")) {
                webModel.add(s.substring(0, s.indexOf(".")));
            }
        }
    }

    public void recoverDB(String path) {
        String command = "\"" + ServerConfig.DB_SETUPPATH + "\\bin\\mysql.exe\" -u" + ServerConfig.DB_USER + " -p" + ServerConfig.DB_PASSWORD + " --default-character-set=utf8";
        WebProgressDialog webProgressDialog = new WebProgressDialog("資料庫還原備份");
        webProgressDialog.setPreferredProgressWidth((int) (launch.StartGUI.DPI * 300));
        webProgressDialog.setVisible(true);
        try {
            Process process = Runtime.getRuntime().exec(command);
            try (OutputStream outputStream = process.getOutputStream()) {
                try (FileInputStream fileInputStream = new FileInputStream(ServerConfig.DB_BACKUPPATH + "/" + path + ".sql.gz")) {
                    final int max = fileInputStream.available();
                    webProgressDialog.setText("正在還原備份到: " + path + "...");
                    try (GZIPInputStream gzipInputStream = new GZIPInputStream(fileInputStream)) {
                        byte[] buf = new byte[1024];
                        int len;
                        while ((len = gzipInputStream.read(buf)) > 0) {
                            outputStream.write(buf, 0, len);
                            webProgressDialog.setProgress((int) (100 - ((double) fileInputStream.available() / max) * 100));
                        }
                    }
                }
            } catch (IOException e) {
                webProgressDialog.setVisible(false);
                try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
                    StringBuilder stringBuilder = new StringBuilder();
                    String buff;
                    while ((buff = bufferedReader.readLine()) != null) {
                        stringBuilder.append(buff).append("\r\n");
                    }
                    log.error(stringBuilder);
                    if (stringBuilder.indexOf("using password: YES") != -1) {
                        WebOptionPane.showMessageDialog(instance, "資料庫連結失敗，請在配置參數里確認資料庫IP、連接埠、帳號、密碼、庫名 是否填寫正確。");
                        instance.setVisible(false);
                        StartGUI.getInstance().showConfigPanel();
                    }
                }
                log.error(e);
            }
            webProgressDialog.setProgressText("備份恢復完成...");
            ThreadUtils.sleepSafely(1000);
            webProgressDialog.setVisible(false);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void autoBackup() {
        if (autoback != null) {
            autoback.cancel(false);
        }
        autoback = Timer.GuiTimer.getInstance().register(new BackupDB(), ServerConfig.DB_AUTOBACKUPTIME * 60 * 1000, ServerConfig.DB_AUTOBACKUPTIME * 60 * 1000);
    }

    public class BackupDB implements Runnable {
        boolean use = true;
        @Override
        public void run() {
            if (use) {
                String command = "\"" + ServerConfig.DB_SETUPPATH + "\\bin\\mysqldump.exe\" --no-defaults -u" + ServerConfig.DB_USER + " -p" + ServerConfig.DB_PASSWORD + " --default-character-set=utf8 --database \"" + ServerConfig.DB_NAME + "\"";
                try {
                    Process process = null;
                    try {
                        process = Runtime.getRuntime().exec(command);
                    } catch (IOException e) {
                        if (e.getMessage().contains("CreateProcess error=2")){
                            System.err.println("自動備份資料庫失敗，請檢查資料庫位置是否為正確設定。");
                            use = false;
                        }
                        return;
                    }
                    File file = new File(ServerConfig.DB_BACKUPPATH + "/" + DateUtil.getNowTime() + ".sql.gz");
                    file.getParentFile().mkdirs();
                    try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {
                        try (GZIPOutputStream gzipOutputStream = new GZIPOutputStream(fileOutputStream)) {
                            try (InputStream inputStream = process.getInputStream()) {
                                byte[] buf = new byte[1024];
                                int len;
                                while ((len = inputStream.read(buf)) != -1) {
                                    gzipOutputStream.write(buf, 0, len);
                                }
                                gzipOutputStream.finish();
                                gzipOutputStream.flush();
                                updateSQLList();
                            }
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                return;
            }
        }
    }
}
