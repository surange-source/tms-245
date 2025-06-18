/* 
 * 坐騎 打豆豆機器人 90天
 */
var period = 90;
var mountSkillId = 10001130;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}