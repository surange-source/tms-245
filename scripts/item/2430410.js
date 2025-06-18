/* 
 * 坐騎 觔斗雲 7天
 */
var period = 7;
var mountSkillId = 10001150;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}