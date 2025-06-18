/* 
 * 2431390 - 坐騎 透明巴洛古 永久
 */
var period = 90;
var mountSkillId = 10001154;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}