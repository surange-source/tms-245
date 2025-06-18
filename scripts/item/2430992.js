/* 
 * 2430929 - 巨無霸兔子(7天權) - 雙擊後可以在7天內使用騎乘技能[巨無霸兔子]。 
 */
var period = 30;
var mountSkillId = 80001185;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}