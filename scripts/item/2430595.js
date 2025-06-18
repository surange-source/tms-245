/* 
 * 2430595 - 玩具坦克3天交換券 - 雙擊可以在3天內使用騎乘技能[玩具坦克]。
 */
var period = 3;
var mountSkillId = 80001116;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}