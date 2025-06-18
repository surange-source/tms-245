/*
 * 腔絹柯扼牢 家膠 膠農賦飄 澇聰促.
 * 
 * 器嘔困摹 : 
 * 器嘔汲疙 : 
 * 
 * 力累 : 林農喉發
 * 
 */

function enter(pi) {
    if (pi.getPlayer().getKeyValue("1stJobTrialStatus") == null) {
    pi.getPlayer().message("'蠟府' 俊霸 剛歷 富闌 吧絹林技誇.");
        return false;
    } else {
        pi.warp(219000000, "in03");
        return true;
    }
}
