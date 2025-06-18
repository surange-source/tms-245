/* 
 * 2431390 - 坐騎 妮娜的魔法陣 永久
 */
var period = 90;
var mountSkillId = 20001118;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}