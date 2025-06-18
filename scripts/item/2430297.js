/* 
 * 2430297 - 坐騎 暗光龍 永久
 */
var period = -1;
var mountSkillId = 10001148;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);//, true);
    im.dispose();
}