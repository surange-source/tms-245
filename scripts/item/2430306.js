/* 
 * 坐騎 夢魘 90天
 */
var period = 90;
var mountSkillId = 10001152;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}