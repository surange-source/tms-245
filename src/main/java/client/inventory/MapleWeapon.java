package client.inventory;

import constants.JobConstants;

public enum MapleWeapon {

    沒有武器(1.43f, Attribute.PhysicalMelee, 0),
    閃亮克魯(1.2f, Attribute.Magic, 212),
    調節器(1.3f, Attribute.PhysicalMelee, 213),
    龍息射手(1.3f, Attribute.PhysicalMelee, 214),
    靈魂射手(1.7f, Attribute.PhysicalRanged, 222),
    魔劍(1.3f, Attribute.PhysicalMelee, 232),
    能量劍(1.3125f, Attribute.PhysicalMelee, 242),
    幻獸棍棒(1.34f, Attribute.Magic, 252),
    ESP限製器(1.2f, Attribute.Magic, 262),
    鎖鍊(1.3f, Attribute.PhysicalMelee, 272),
    魔法護腕(1.3f, Attribute.Magic, 282),
    仙扇(1.3f, Attribute.PhysicalMelee, 292),
    單手劍(1.2f, Attribute.PhysicalMelee, 302),
    單手斧(1.2f, Attribute.PhysicalMelee, 312),
    單手棍(1.2f, Attribute.PhysicalMelee, 322),
    短劍(1.3f, Attribute.PhysicalMelee, 332),
    雙刀(1.3f, Attribute.PhysicalMelee, 342),
    手杖(1.3f, Attribute.PhysicalMelee, 362),
    短杖(1.0f, Attribute.Magic, 372),
    長杖(1.0f, Attribute.Magic, 382),
    雙手劍(1.34f, Attribute.PhysicalMelee, 402),
    武拳(1.7f, Attribute.PhysicalMelee, 403),
    雙手斧(1.34f, Attribute.PhysicalMelee, 412),
    雙手棍(1.34f, Attribute.PhysicalMelee, 422),
    槍(1.49f, Attribute.PhysicalMelee, 432),
    矛(1.49f, Attribute.PhysicalMelee, 442),
    弓(1.3f, Attribute.PhysicalRanged, 452),
    弩(1.35f, Attribute.PhysicalRanged, 462),
    拳套(1.75f, Attribute.PhysicalRanged, 472),
    指虎(1.7f, Attribute.PhysicalMelee, 482),
    火槍(1.5f, Attribute.PhysicalRanged, 492),
    雙弩槍(1.3f, Attribute.PhysicalRanged, 522),
    加農砲(1.5f, Attribute.PhysicalRanged, 532), //1.35f
    太刀(1.25f, Attribute.PhysicalMelee, 542), //1.3f
    扇子(1.35f, Attribute.Magic, 552), //1.1f
    琉(1.49f, Attribute.PhysicalMelee, 562),
    璃(1.34f, Attribute.PhysicalMelee, 572),
    重拳槍(1.7f, Attribute.PhysicalMelee, 582),
    古代之弓(1.3f, Attribute.PhysicalRanged, 592);

    public enum Attribute {
        PhysicalMelee,
        PhysicalRanged,
        Magic;
    }

    private final float damageMultiplier;
    private final Attribute attribute;
    private final int weaponType;

    MapleWeapon(float maxDamageMultiplier, Attribute attribute, int weaponType) {
        this.damageMultiplier = maxDamageMultiplier;
        this.attribute = attribute;
        this.weaponType = weaponType;
    }

    public float getMaxDamageMultiplier(int job) {
        if (this == 沒有武器 && !JobConstants.is冒險家海盜(job)) return 0;
        if ((JobConstants.is冒險家法師(job) || JobConstants.is烈焰巫師(job)) && (this == MapleWeapon.短杖 || this == MapleWeapon.長杖)) return 1.2f;
        if (JobConstants.is英雄(job) && (this == MapleWeapon.雙手劍 || this == MapleWeapon.雙手斧)) return 1.44f;
        if (JobConstants.is英雄(job) && (this == MapleWeapon.單手劍 || this == MapleWeapon.單手斧)) return 1.3f;
        return damageMultiplier;
    }

    public Attribute getAttribute() {
        return attribute;
    }

    public int getBaseMastery() {
        switch (attribute) {
            case PhysicalRanged:
                return 15;
            case PhysicalMelee:
            default:
                return 20;
            case Magic:
                return 25;
        }
    }

    public int getWeaponType() {
        return weaponType;
    }

    public boolean isTwoHand() {
        return weaponType / 100 == 4 || weaponType / 100 == 5;
    }

    public boolean check(int itemId) {
        if (itemId / 1000000 != 1) {
            return false;
        }
        return weaponType == (itemId / 1000) % 1000;
    }

    public static MapleWeapon getByItemID(int itemId) {
        if (itemId / 1000000 != 1) {
            return MapleWeapon.沒有武器;
        }
        int cat = (itemId / 1000) % 1000;
        for (MapleWeapon type : MapleWeapon.values()) {
            if (cat == type.getWeaponType()) {
                return type;
            }
        }
        return MapleWeapon.沒有武器;
    }
}
