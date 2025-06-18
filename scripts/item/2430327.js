/* 
 * 2431390 - 坐騎 打豆豆機器人 永久
 */
var period = 90;
var mountSkillId = 10001130;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}