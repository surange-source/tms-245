package server.maps;

import client.MapleCharacter;
import client.MapleClient;
import client.skills.Skill;
import client.skills.SkillFactory;
import server.buffs.MapleStatEffect;
import packet.MaplePacketCreator;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import tools.HexTool;
import server.Randomizer;

import java.awt.*;
import java.util.*;
import java.util.List;

public class MapleRuneStone extends MapleMapObject {

    public enum RuneStoneAction {

        上下右下(new int[] {1, 0, 3, 0}, "90 99 44 29 18 00 00 00 F1 17 C2 50 CE 87 FD 5A AA 87 FD 5A AB 87 FD 5A A8 87 FD 5A AB 87 FD 5A"),
        左左下右(new int[] {2, 2, 0, 3}, "C5 47 4C 66 18 00 00 00 C0 38 40 1F C4 48 73 15 18 49 73 15 18 49 73 15 1A 49 73 15 19 49 73 15"),
        下左右左(new int[] {0, 2, 3, 2}, "E6 74 D1 E0 18 00 00 00 4D 00 C6 98 40 70 9B 92 63 70 9B 92 65 70 9B 92 64 70 9B 92 65 70 9B 92"),
        上下上下(new int[] {1, 0, 1, 0}, "EF 94 6D 7A 18 00 00 00 84 A8 89 02 B2 58 7B 09 AB 58 7B 09 AA 58 7B 09 AB 58 7B 09 AA 58 7B 09"),
        下左上上(new int[] {0, 2, 1, 1}, "45 7E 7E 55 18 00 00 00 DD 64 50 2C CC D4 1E 26 37 D4 1E 26 35 D4 1E 26 34 D4 1E 26 34 D4 1E 26"),
        左下右左(new int[] {2, 0, 3, 2}, "93 92 2A 4C 18 00 00 00 FC 50 6A 35 CC C0 59 3F D4 C0 59 3F DA C0 59 3F D5 C0 59 3F D4 C0 59 3F"),
        下右右左(new int[] {0, 3, 3, 2}, "F3 10 41 B0 18 00 00 00 80 85 39 C8 91 35 EA C2 BE 35 EA C2 B9 35 EA C2 B9 35 EA C2 B8 35 EA C2"),
        右左下右(new int[] {3, 2, 0, 3}, "96 8E FB 9E 18 00 00 00 E1 AE 60 E6 FB 3E 36 EC D8 3E 36 EC D9 3E 36 EC C7 3E 36 EC D9 3E 36 EC"),
        右左上下(new int[] {3, 2, 1, 0}, "A2 7E EB 0B 18 00 00 00 35 3E 2A 72 2E AE 18 78 CC AE 18 78 CD AE 18 78 D2 AE 18 78 D3 AE 18 78"),
        上右上左(new int[] {1, 3, 1, 2}, "7F 5E 79 D6 18 00 00 00 A7 7A 55 AE B3 EA 27 A4 CE EA 27 A4 D0 EA 27 A4 CE EA 27 A4 CF EA 27 A4"),
        左下上上(new int[] {2, 0, 1, 1}, "67 87 F5 38 18 00 00 00 E1 AB 92 41 1E 3B 6C 4B 39 3B 6C 4B 07 3B 6C 4B 38 3B 6C 4B 38 3B 6C 4B"),
        左下下左(new int[] {2, 0, 0, 2}, "B4 6A 62 38 18 00 00 00 0B 38 0A 41 1D 88 F8 4B 23 88 F8 4B 2D 88 F8 4B 2D 88 F8 4B 23 88 F8 4B"),
        右左左右(new int[] {3, 2, 2, 3}, "C6 EB 1E E3 18 00 00 00 7B 32 0C 9B 60 82 5B 91 52 82 5B 91 53 82 5B 91 53 82 5B 91 52 82 5B 91"),
        上右上下(new int[] {1, 3, 1, 0}, "CE 8D F1 84 18 00 00 00 B7 B9 3E FC AF 49 F0 F7 9C 49 F0 F7 9E 49 F0 F7 9C 49 F0 F7 9D 49 F0 F7"),
        下右下右(new int[] {0, 3, 0, 3}, "90 EE 0C A6 18 00 00 00 27 13 80 DE 0E 63 B3 D4 01 63 B3 D4 1E 63 B3 D4 01 63 B3 D4 1E 63 B3 D4"),
        右上上上(new int[] {3, 1, 1, 1}, "49 A6 61 DC 18 00 00 00 01 F2 41 A4 7F 42 33 AE 56 42 33 AE 68 42 33 AE 68 42 33 AE 68 42 33 AE"),
        下下上下(new int[] {0, 0, 1, 0}, "FB 78 5D 42 18 00 00 00 58 24 09 3B 6B 94 DB 31 86 94 DB 31 86 94 DB 31 87 94 DB 31 86 94 DB 31"),
        右右左上(new int[] {3, 3, 2, 1}, "19 79 35 73 18 00 00 00 BB D5 C7 0B 97 45 10 00 60 45 10 00 60 45 10 00 63 45 10 00 62 45 10 00"),
        右下左上(new int[] {3, 0, 2, 1}, "51 0A 26 1F 18 00 00 00 D1 C1 BC 66 3A 51 EB 6C 06 51 EB 6C 0B 51 EB 6C 09 51 EB 6C 08 51 EB 6C"),
        下上下右(new int[] {0, 1, 0, 3}, "A6 E4 48 4E 18 00 00 00 6D 61 74 37 0B F1 27 3D 03 F1 27 3D 02 F1 27 3D 03 F1 27 3D 04 F1 27 3D"),
        ;

        int[] action;
        byte[] packet;

        RuneStoneAction(int[] action, String sPacket) {
            this.action = action;
            packet = HexTool.getByteArrayFromHexString(sPacket);
        }

        public int[] getAction() {
            return Arrays.copyOf(action, action.length);
        }

        public byte[] getPacket() {
            return packet;
        }
    }

    private final int type;
    private MapleMap map;
    private final boolean facingLeft;
    private int expr;

    public MapleRuneStone(int type) {
        this.type = type;
        expr = 1;
        facingLeft = false;
    }

    public MapleMap getMap() {
        return map;
    }

    public void setMap(MapleMap map) {
        this.map = map;
    }

    public int getRuneType() {
        return type;
    }

    public final void applyToPlayer(MapleCharacter player) {
        int runeSkillId = 0;
        OUTER:
        switch (getRuneType()) {
            case 0: { // 快速之輪
                runeSkillId = 80001427; // 疾速之輪行蹤
                break;
            }
            case 1: { // 再生之輪
                runeSkillId = 80001428; // 重生的輪行蹤
                break;
            }
            case 2: { // 破滅之輪
                runeSkillId = 80001432; // 破滅之輪行蹤
                break;
            }
            case 3: { // 打雷之輪
                runeSkillId = 80001756; // 解放雷之輪
                break;
            }
            case 4: { // 地震之輪
                runeSkillId = 80001757; // 解放地震之輪
                break;
            }
            case 5: { // 黑暗之輪
                MapleMonster elite;
                List<MapleMonster> randomMob = map.getMonsters();
                for (MapleMonster elMob : randomMob) {
                    if (elMob.isEliteMob()) {
                        break OUTER;
                    }
                }
                List<Point> randomSpawn = new ArrayList<>(map.getSpawnPoints());
                for(int i = 0; i < 3; i++) {
                    elite = MapleLifeFactory.getEliteMonster(randomMob.get(Randomizer.nextInt(randomMob.size())).getId());
                    elite.registerKill(300000L);
                    map.spawnMonsterOnGroundBelow(elite, randomSpawn.get(Randomizer.nextInt(randomSpawn.size())));
                }
                break;
            }
            case 6: { // 寶物之輪
                runeSkillId = -8220028; // 疑問的箱子怪
                break;
            }
            case 7: { // 超越之輪
                runeSkillId = 80001875; // 輪之力解放-超越
                break;
            }
            case 8: { // 淨化之輪
                runeSkillId = 80002888; // 淨化之輪解放
                break;
            }
            case 9: { // 光束之輪
                runeSkillId = 80002889; // 光束之輪解放
                break;
            }
            case 10: { // 轉移之輪
                runeSkillId = 80002890; // 轉移之輪解放
                break;
            }
        }
        player.send(MaplePacketCreator.showRuneEffect(this.getRuneType()));
        Skill skill = SkillFactory.getSkill(80002282);
        MapleStatEffect effect = skill.getEffect(1);
        effect.applyTo(player, 900000);

        if (getMap() != null && getMap().getFieldLevel() > 0 && player.getLevel() >= getMap().getFieldLevel() - 20) {
            if (runeSkillId > 0) {
                skill = SkillFactory.getSkill(runeSkillId);
                effect = skill.getEffect(1);
                effect.applyTo(player);
            }
            skill = SkillFactory.getSkill(80002280); // 解放的輪之力
            effect = skill.getEffect(1);
            effect.applyTo(player);
            if (runeSkillId == 80001432) { // 破滅之輪
                skill = SkillFactory.getSkill(80001431);
                effect = skill.getEffect(1);
                effect.applyTo(player);
            }
            if (runeSkillId < 0) {
                getMap().spawnMonsterWithEffect(MapleLifeFactory.getMonster(-runeSkillId), -5, new Point(getPosition()));
            }
        }

        this.getMap().setRuneTime();
        this.remove(player, false);
    }

    public int getExpR() {
        return expr;
    }

    public void setExpR(int value) {
        expr = value;
    }

    public boolean isFacingLeft() {
        return facingLeft;
    }

    @Override
    public int getRange() {
        return Integer.MAX_VALUE;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        MapleRuneStone rune = this;
        client.announce(MaplePacketCreator.RuneStoneClearAndAllRegister(new ArrayList<MapleRuneStone>() {{add(rune);}}));
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.announce(MaplePacketCreator.RuneStoneClearAndAllRegister(new ArrayList<>()));
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.RUNE;
    }

    public void remove(MapleCharacter chr, boolean noText) {
        getMap().removeRune(this, chr, noText);
        map = null;
    }
}
