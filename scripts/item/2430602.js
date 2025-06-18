/* 
 * 2430602 - 暴風摩托3天交換券 - 雙擊可以在3天內使用騎乘技能[暴風摩托]。
 */
var period = 3;
var mountSkillId = 1063;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}