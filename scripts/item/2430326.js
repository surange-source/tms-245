/* 
 * 坐騎 維京戰車 90天
 */
var period = 90;
var mountSkillId = 10001129;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}