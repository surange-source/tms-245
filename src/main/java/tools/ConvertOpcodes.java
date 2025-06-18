package tools;

import handling.opcode.RecvPacketOpcode;
import handling.opcode.SendPacketOpcode;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConvertOpcodes {

    public static void main(String[] args) {
        boolean decimal;
        String recvopsName = "recvops.properties";
        String sendopsName = "sendops.properties";
        try {
            decimal = Boolean.parseBoolean(args[0]);
        } catch (Exception e) {
            decimal = true;
        }
        StringBuilder sb = new StringBuilder();
        FileOutputStream out;
        try {
            out = new FileOutputStream(recvopsName, false);
            for (RecvPacketOpcode recv : RecvPacketOpcode.values()) {
                if (recv == RecvPacketOpcode.UNKNOWN) {
                    break;
                }
                sb.append(recv.name()).append(" = ")
                        .append(decimal ? recv.getValue() : HexTool.getOpcodeToString(recv.getValue()))
                        .append("\r\n");
            }
            out.write(sb.toString().getBytes());
            out.close();
        } catch (FileNotFoundException ex) {
            Logger.getLogger(ConvertOpcodes.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(ConvertOpcodes.class.getName()).log(Level.SEVERE, null, ex);
        }
        sb = new StringBuilder();
        try {
            out = new FileOutputStream(sendopsName, false);
            for (SendPacketOpcode send : SendPacketOpcode.values()) {
                if (send == SendPacketOpcode.UNKNOWN) {
                    break;
                }
                sb.append(send.name()).append(" = ")
                        .append(decimal ? send.getValue() : HexTool.getOpcodeToString(send.getValue()))
                        .append("\r\n");
            }
            out.write(sb.toString().getBytes());
            out.close();
        } catch (FileNotFoundException ex) {
            Logger.getLogger(ConvertOpcodes.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(ConvertOpcodes.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("匯出完成");
    }
}
