/* 
 * 2431390 - 坐騎 暴風摩托 永久
 */
var period = 90;
var mountSkillId = 30011063;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}