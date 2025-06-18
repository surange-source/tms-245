/* 
 * 2430590 - 夢魘3天交換券 - 雙擊可以在3天內使用騎乘技能[夢魘]。\n習得#c飛行騎乘#技能後，還可駕馭飛行。
 */
var period = 3;
var mountSkillId = 80001072;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}