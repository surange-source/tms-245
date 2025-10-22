/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.squad;

import tools.types.Pair;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * @author PlayDK
 */
public enum MapleSquadType {

    bossbalrog(2),
    zak(2),
    chaoszak(3),
    pinkzak(3),
    horntail(2),
    chaosht(3),
    pinkbean(3),
    nmm_squad(2),
    vergamot(2),
    dunas(2),
    nibergen_squad(2),
    dunas2(2),
    core_blaze(2),
    aufheben(2),
    cwkpq(10),
    tokyo_2095(2),
    vonleon(3),
    scartar(2),
    cygnus(3),
    chaospb(3), //混沌皮卡啾
    arkarium(3), //阿卡伊農
    hillah(2), //希拉
    Magnus(2),
    bosssiwu_hard(2);
    public final int i;
    public final HashMap<Integer, ArrayList<Pair<String, String>>> queuedPlayers = new HashMap<>(); //排隊中的玩家?
    public final HashMap<Integer, ArrayList<Pair<String, Long>>> queue = new HashMap<>(); //隊列？

    MapleSquadType(int i) {
        this.i = i;
    }
}
