package scripting.map;

import client.MapleClient;
import scripting.AbstractPlayerInteraction;

public class NodePlayerInteraction extends AbstractPlayerInteraction {
    public NodePlayerInteraction(MapleClient client, String name) {
        super(client, 0, name, null);
    }
}
