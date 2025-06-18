/* 
 * 坐騎 維京戰車 7天
 */
var period = 7;
var mountSkillId = 10001129;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}