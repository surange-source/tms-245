/* 
 * 2430318 - 青蛙90天交換券 - 雙擊可以在90天內使用[青蛙]騎寵技能。
 */
var period = 90;
var mountSkillId = 10001121;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}