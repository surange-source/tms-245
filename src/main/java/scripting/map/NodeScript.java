package scripting.map;

import scripting.AbstractPlayerInteraction;

public interface NodeScript {
    void act(AbstractPlayerInteraction nm, int mobid, int time);
}
