/* 
 * 坐騎 拿破侖的白馬 90天
 */
var period = 90;
var mountSkillId = 10001139;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}