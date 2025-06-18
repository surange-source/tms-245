/* 
 * 坐騎 粉紅熊熱氣球 7天
 */
var period = 7;
var mountSkillId = 40011052;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}