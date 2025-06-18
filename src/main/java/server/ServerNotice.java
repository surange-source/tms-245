package server;

import handling.world.WorldBroadcastService;
import packet.MaplePacketCreator;

public class ServerNotice {

    private static final String notice = "本模擬器僅用於技術研究，僅供單機測試，無任何商業行為。";

    public static void start() {
        Timer.EventTimer.getInstance().register(() -> {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverNotice(0x00, notice));
        }, 1000 * 60);


        Timer.EventTimer.getInstance().register(() -> {
            WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.serverMessage(notice));
        }, 1000 * 60);
    }
}
