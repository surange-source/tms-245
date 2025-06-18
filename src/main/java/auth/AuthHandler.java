package auth;


import auth.client.AuthServer;
import auth.netty.AuthClient;
import auth.packet.AuthPacket;
import auth.packet.ServerOpcode;
import configs.Config;
import handling.opcode.RecvPacketOpcode;
import handling.opcode.SendPacketOpcode;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import server.Timer;
import tools.data.ByteArrayByteStream;
import tools.data.MaplePacketReader;
import tools.data.WritableIntValueHolder;

import java.util.concurrent.atomic.AtomicInteger;

public class AuthHandler extends ChannelInboundHandlerAdapter {

    private static final Logger log = LogManager.getLogger(AuthHandler.class);
    private static volatile boolean succeed = false;
    private static volatile boolean reconnect = false;
    private static final AtomicInteger retryCount = new AtomicInteger(0);

    static {
        Timer.GuiTimer.getInstance().start();
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        MaplePacketReader slea = new MaplePacketReader(new ByteArrayByteStream((byte[]) msg));
        AuthServer con = ctx.channel().attr(AuthServer.ATTRIBUTE_KEY).get();
        try {
            handlePacket(slea, con);
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        succeed = false;
        AuthClient.getInstance().clearFailCount();
        log.info("Successfully connected the authorization server！");
        Timer.GuiTimer.getInstance().schedule(() -> {
            if (!succeed) {
                log.info("Authorize timeout, disconnected.");
                ctx.channel().close();
            }
        }, 600000);
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        AuthServer c = ctx.channel().attr(AuthServer.ATTRIBUTE_KEY).get();
        if (c != null) {
            c.disconnect();
        }
    }

    private void handlePacket(MaplePacketReader pr, AuthServer c) {
        short header = pr.readShort();
        ServerOpcode opcode = ServerOpcode.get(header);
        if (opcode == null) return;
        switch (opcode) {
            case AliveAckRequest://AliveCheck
                c.pongReceived();
                c.announce(AuthPacket.getPing());
                return;
            case MachineCodeResult://AuthCheck
                if (pr.readLong() == c.getTick()) {
                    Auth.handleMachineCodeResult(pr, c);
                    return;
                }
                break;
            case AuthChangeResult:
                if (pr.readLong() == c.getTick()) {
                    Auth.handleAuthChangeResult(pr, c);
                    return;
                }
                break;
            case GetMachineCodeRequest:
                if (pr.readLong() == c.getTick()) {
                    c.announce(AuthPacket.machineCodeResponse(c.getTick()));
                    return;
                }
                break;
            case SetMapleAESKey:
                if (pr.readLong() == c.getTick()) {
                    Auth.setMapleAESKey(pr.read(pr.readInt()));
                    return;
                }
                break;
            case SetOpcodeValues:
                if (pr.readLong() == c.getTick()) {
//                    int size = pr.readInt();
//                    for (int i = 0; i < size; i++) {
//                        String opName = pr.readMapleAsciiString();
//                        short opValue = pr.readShort();
//                        getSendByName(opName).setValue(opValue);
//                    }
//                    size = pr.readInt();
//                    for (int i = 0; i < size; i++) {
//                        String opName = pr.readMapleAsciiString();
//                        short opValue = pr.readShort();
//                        getRecvByName(opName).setValue(opValue);
//                    }
                    return;
                }
                break;
            case SetEndata:
                if (pr.readLong() == c.getTick()) {
//                    MapleOpcodeEncryption.init(pr);
                    return;
                }
                break;
            case SetOpcodeEncryptionData:
                if (pr.readLong() == c.getTick()) {
                    Auth.setOpcodeEncryptionData(pr.read(pr.readInt()));
                    return;
                }
                break;
            case StartServerResponse:
                if (pr.readLong() == c.getTick() && Auth.checkSign()) {
                    Auth.setFlag(pr.readLong());
                    Auth.setLimit(pr.readInt());
                    long deadline = pr.readLong();
                    if (deadline < System.currentTimeMillis()) {
                        log.info("Outdated authorization.");
                        break;
                    }
                    succeed = true;
                    if (reconnect) {
                        retryCount.set(0);
                        reconnect = false;
                        return;
                    }
                    Timer.GuiTimer.getInstance().scheduleAtTimestamp(() -> System.exit(0), deadline);
                    Auth.setDeadLine(deadline);
                    Auth.startServer();
                    return;
                }
                break;
            case TimeCheckError:
                log.info("Time check error. Check your system time.");
                break;
            case VersionOutdated:
                log.info("Outdated version. Check update.");
                break;
            case ExceptionOccurred:
                log.info("Internal exception occurred.");
                break;
            case CloudScriptResponse:
                String path = pr.readMapleAsciiString();
                String body = pr.readMapleAsciiString();
                Auth.CLOUD_SCRIPTS.put(path, body);
                return;
            case PermissionsResponse: {
                int count = pr.readInt();
                for (int i = 0; i < count; i++) {
                    String key = pr.readMapleAsciiString();
                    Auth.PERMISSIONS.add(key);
                }
                return;
            }
            case ForbiddenMobResponse: {
                int count = pr.readInt();
                for (int i = 0; i < count; i++) {
                    int mobId = pr.readInt();
                    Auth.FORBIDDEN_MOBS.add(mobId);
                }
                return;
            }
        }
        if (Config.isDevelop()) {
            System.out.println("updateTickError");
        }
        c.disconnect();
    }

    private SendPacketOpcode getSendByName(String opName) {
        for (SendPacketOpcode opcode : SendPacketOpcode.values()) {
            if (opcode.name().equals(opName)) {
                return opcode;
            }
        }
        return SendPacketOpcode.UNKNOWN;
    }

    private RecvPacketOpcode getRecvByName(String opName) {
        for (RecvPacketOpcode opcode : RecvPacketOpcode.values()) {
            if (opcode.name().equals(opName)) {
                return opcode;
            }
        }
        return RecvPacketOpcode.UNKNOWN;
    }


    /*protected static void reconnect() {
        if (retryNumber >= 3) {
            System.err.println("重连超过3次失败，系统自动关闭");
            System.exit(0);
        }

        System.err.println("连接中断，正在重新连接...第" + ++retryNumber + "次操作...");
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        AuthClient.getInstance().run();
    }*/
}