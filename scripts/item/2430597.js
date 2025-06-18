/* 
 * 2430597 - 飛船3天交換券 - 雙擊可以在3天內使用騎乘技能[飛船]。\n習得#c飛行騎乘#技能後，還可駕馭飛行。
 */
var period = 3;
var mountSkillId = 80001066;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}