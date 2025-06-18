package client;

import com.alee.laf.WebLookAndFeel;
import com.alee.laf.button.WebButton;
import com.alee.laf.combobox.WebComboBox;
import com.alee.laf.label.WebLabel;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.rootpane.WebFrame;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.text.WebTextArea;
import com.alee.laf.text.WebTextField;
import handling.MapleServerHandler;
import handling.ServerType;
import packet.MaplePacketCreator;
import tools.HexTool;
import tools.data.MaplePacketReader;

import javax.swing.*;
import javax.swing.plaf.FontUIResource;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Iterator;
import java.util.Vector;

public class DebugUI extends WebFrame {
    private static final boolean DEBUG = "dev".equals(System.getProperty("debug"));
    public static float DPI = java.awt.Toolkit.getDefaultToolkit().getScreenResolution() / 96.0f;

    static {
        try {
            for (Iterator i = UIManager.getLookAndFeelDefaults().keySet().iterator(); i.hasNext();) {
                Object obj = i.next();
                if (!(obj instanceof String)) {
                    continue;
                }
                String key = (String) obj;
                if(key.endsWith(".font")) {
                    Font font = UIManager.getFont(key);
                    Font biggerFont = font.deriveFont(DPI * font.getSize2D());
                    // change ui default to bigger font
                    UIManager.put(key,biggerFont);
                }
            }
            FontUIResource fontUIResource = new FontUIResource("Microsoft Jhenghei", 0, 12);
            WebLookAndFeel.globalTextFont = new FontUIResource("Consolas", 0, 12);
            WebLookAndFeel.globalControlFont = fontUIResource;
            WebLookAndFeel.globalTitleFont = fontUIResource;
            UIManager.setLookAndFeel(new WebLookAndFeel());
        } catch (UnsupportedLookAndFeelException e) {
            e.printStackTrace();
        }
    }
    private MapleClient c;

    public DebugUI() {
        super("DebugUI");

        setPreferredSize(new Dimension((int) (DPI * 500), (int) (DPI * 400)));

        final WebTextArea packetTextArea = new WebTextArea();
        final WebTextField textField = new WebTextField();
        final WebLabel statusLabel = new WebLabel();
        final Vector<String> historylist = new Vector<>();
        final WebComboBox historyCombox = new WebComboBox(historylist);

        historyCombox.addActionListener(new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                packetTextArea.setText(historylist.get(historyCombox.getSelectedIndex()));
            }
        });

        packetTextArea.setLineWrap(true);

        add(new WebPanel(new BorderLayout(5, 5)) {
            {
                add(new WebPanel() {
                    {
                        add(historyCombox, BorderLayout.NORTH);
                        add(textField, BorderLayout.SOUTH);
                    }
                }, BorderLayout.NORTH);
                add(new WebScrollPane(packetTextArea), BorderLayout.CENTER);
                add(statusLabel, BorderLayout.SOUTH);
            }
        });
        add(new WebPanel() {
            {
                add(new WebButton("發送封包") {
                    {
                        addActionListener(new ActionListener() {
                            @Override
                            public void actionPerformed(ActionEvent e) {

                                if (c == null || (textField.getText().isEmpty() && packetTextArea.getText().isEmpty())) {
                                    statusLabel.setText("發送失敗，數據為空.");
                                    return;
                                }
                                String sData = textField.getText();
                                if (!sData.isEmpty()) {
                                    sData = HexTool.getOpcodeToString(Integer.decode(sData)).substring(2);
                                    sData = String.format("%s %s", sData.substring(2), sData.substring(0, 2));
                                }
                                sData = sData + (sData.isEmpty() || packetTextArea.getText().isEmpty() ? "" : " ") + packetTextArea.getText();
                                historylist.insertElementAt(sData, 0);
                                historyCombox.updateUI();
                                historyCombox.setSelectedIndex(0);
                                byte[] data = HexTool.getByteArrayFromHexString(sData);
                                textField.setText(null);
                                packetTextArea.setText(null);
                                statusLabel.setText(null);
                                if (c != null && data.length >= 2) {
                                    c.announce(MaplePacketCreator.testPacket(data));
                                    statusLabel.setText("發送成功，發送的封包長度: " + data.length);
                                } else {
                                    statusLabel.setText("發送失敗，發送的封包長度: " + data.length);
                                }
                            }
                        });
                    }
                }, BorderLayout.WEST);
                add(new WebButton("收到封包") {
                    {
                        addActionListener(new ActionListener() {
                            @Override
                            public void actionPerformed(ActionEvent e) {

                                if (c == null || (textField.getText().isEmpty() && packetTextArea.getText().isEmpty())) {
                                    statusLabel.setText("發送失敗，數據為空.");
                                    return;
                                }
                                String sData = textField.getText();
                                if (!sData.isEmpty()) {
                                    sData = HexTool.getOpcodeToString(Integer.decode(sData)).substring(2);
                                    sData = String.format("%s %s", sData.substring(2), sData.substring(0, 2));
                                }
                                sData = sData + (sData.isEmpty() || packetTextArea.getText().isEmpty() ? "" : " ") + packetTextArea.getText();
                                historylist.insertElementAt(sData, 0);
                                historyCombox.updateUI();
                                historyCombox.setSelectedIndex(0);
                                byte[] data = HexTool.getByteArrayFromHexString(sData);
                                textField.setText(null);
                                packetTextArea.setText(null);
                                statusLabel.setText(null);
                                if (c != null && data.length >= 2) {
                                    try {
                                        MapleServerHandler.handlePacket(new MaplePacketReader(data), c, ServerType.ChannelServer);
                                    } catch (Exception e1) {
                                        e1.printStackTrace();
                                    }
                                } else {
                                    statusLabel.setText("發送失敗，發送的封包長度: " + data.length);
                                }
                            }
                        });
                    }
                }, BorderLayout.EAST);
            }
        }, BorderLayout.SOUTH);

        pack();
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        this.setLocationRelativeTo(null);
        setVisible(true);

    }

    /**
     * 獲取連接
     */
    public MapleClient getC() {
        return c;
    }

    /**
     * 設置連接和窗口的標題
     */
    public void setC(MapleClient c) {
        this.c = c;
        if (c.getPlayer() != null) {
            setTitle("玩家: " + c.getPlayer().getName() + " - 封包測試");
        }
    }

    public static void log(String s) {
        if (DEBUG) {
            System.err.println(s);
        }
    }
}
