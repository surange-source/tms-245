package client;

import tools.types.Pair;
import tools.data.MaplePacketLittleEndianWriter;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class MapleKeyLayout implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    private final Map<Integer, Pair<Byte, Integer>> keymap;
    private boolean changed = false;

    public MapleKeyLayout() {
        keymap = new HashMap<>();
    }

    public MapleKeyLayout(Map<Integer, Pair<Byte, Integer>> keys) {
        keymap = keys;
    }

    public Map<Integer, Pair<Byte, Integer>> Layout() {
        changed = true;
        return keymap;
    }

    public void unchanged() {
        changed = false;
    }

    public void writeData(MaplePacketLittleEndianWriter mplew, int lines) {
        mplew.write(keymap.isEmpty() ? 1 : 0);
        if (keymap.isEmpty()) {
            return;
        }
        Pair<Byte, Integer> binding;
        for (int i = 0; i < lines; i++) {
            for (int x = 0; x < 89; x++) {
                binding = keymap.get(x);
                if (binding != null) {
                    mplew.write(binding.getLeft());
                    mplew.writeInt(binding.getRight());
                } else {
                    mplew.write(0);
                    mplew.writeInt(0);
                }
            }
        }
    }

    public void saveKeys(Connection con, int charid, int slot) throws SQLException {
        if (!changed) {
            return;
        }
        PreparedStatement ps = con.prepareStatement("DELETE FROM keymap WHERE characterid = ? AND slot = ?");
        ps.setInt(1, charid);
        ps.setInt(2, slot);
        ps.execute();
        ps.close();
        if (keymap.isEmpty()) {
            return;
        }
        ps = con.prepareStatement("INSERT INTO keymap VALUES (DEFAULT, ?, ?, ?, ?, ?)");
        for (Entry<Integer, Pair<Byte, Integer>> keybinding : keymap.entrySet()) {
            ps.setInt(1, charid);
            ps.setInt(2, slot);
            ps.setInt(3, keybinding.getKey());
            ps.setByte(4, keybinding.getValue().getLeft());
            ps.setInt(5, keybinding.getValue().getRight());
            ps.execute();
        }
        ps.close();
    }
}
