/* 
 * 2431390 - 坐騎 天馬 永久
 */
var period = 90;
var mountSkillId = 10001147;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}