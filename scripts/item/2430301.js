/* 
 * 2431390 - 坐騎 觔斗雲 永久
 */
var period = 90;
var mountSkillId = 10001150;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}