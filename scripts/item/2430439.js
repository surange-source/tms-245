/* 
 * 坐騎 鋼鐵變形俠 7天
 */
var period = 7;
var mountSkillId = 10001053;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}