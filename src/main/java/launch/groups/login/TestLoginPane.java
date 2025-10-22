package launch.groups.login;

import client.MapleClient;
import com.alee.extended.painter.TitledBorderPainter;
import com.alee.extended.panel.GroupPanel;
import com.alee.laf.button.WebButton;
import com.alee.laf.label.WebLabel;
import com.alee.laf.panel.WebPanel;
import com.alee.laf.rootpane.WebFrame;
import com.alee.laf.text.WebTextField;
import handling.world.World;
import launch.StartGUI;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;


public class TestLoginPane extends WebFrame {
	
    public static TestLoginPane instance;
    private final WebTextField account = new WebTextField(20), password = new WebTextField((20));
    
    TestLoginPane() {
    	super("單機登入");
    	//setIconImage(StartGUI.getMainIcon().getImage());
    	account.setText("admin");
    	password.setText("admin");
    	account.setEditable(true);
    	password.setEditable(true);
    	
    	add(new WebPanel(new BorderLayout(5, 5)) {
            {
                setPreferredSize((int) (launch.StartGUI.DPI * 400), (int) (launch.StartGUI.DPI * 500));
                setResizable(false);
                setMargin(2, 5, 2, 5);

                add(new WebPanel() {
                    {
                        setMargin(5);
                        setPainter(new TitledBorderPainter("此功能在伺服端有兩個以上連接時不適用！"));

                        add(new GroupPanel(false,
                                new GroupPanel(
                                        new WebLabel("帳號："),
                                        account,
                                new GroupPanel(
                                        new WebLabel("密碼："),
                                        password,
                                new GroupPanel(
                                		new WebLabel("點此登入："),
                                		new WebButton("登入") {
	                                    {
	                                        addActionListener(new ActionListener() {
	                                            @Override
	                                            public void actionPerformed(ActionEvent e) {
	                                                for (MapleClient c : World.Client.getClients()) {
	                                                	c.login(account.getText(), password.getText(), false, true);
	                                                }
	                                            }
	                                        });
	                                    }
                                })))));
                    }
                }, BorderLayout.NORTH);

            }
        });
    }

	public static TestLoginPane getInstance() {
		return instance;
	}
}
