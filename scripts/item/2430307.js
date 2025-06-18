/* 
 * 2431390 - 坐騎 巴洛古 永久
 */
var period = 90;
var mountSkillId = 20001153;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}