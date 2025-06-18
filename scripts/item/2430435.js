/* 
 * 坐騎 巨無霸兔子 7天
 */
var period = 7;
var mountSkillId = 10001096;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}