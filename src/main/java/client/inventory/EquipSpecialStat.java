/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client.inventory;

/**
 * @author PlayDK
 */
public enum EquipSpecialStat {

    總傷害(0x1),
    全屬性(0x2),
    剪刀次數(0x4),
    輪迴星火(0x8), //long
    星力強化(0x10); //int
    private final int value;

    EquipSpecialStat(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public final boolean check(final int n) {
        return (n & this.value) == this.value;
    }

}
