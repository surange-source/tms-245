/* 
 * 2430603 - 冒險騎士團高速電車3天交換券 - 雙擊可以在3天內使用騎乘技能[冒險騎士團高速電車]。
 */
var period = 3;
var mountSkillId = 80001038;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}