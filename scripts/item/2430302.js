/* 
 * 坐騎 觔斗雲 90天
 */
var period = 90;
var mountSkillId = 10001150;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}