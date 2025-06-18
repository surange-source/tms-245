/* 
 * 2430583 - 天馬3天交換券 - 雙擊可以在3天內使用騎乘技能[天馬]。\n習得#c飛行騎乘#技能後，還可駕馭飛行。
 */
var period = 3;
var mountSkillId = 80001067;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}