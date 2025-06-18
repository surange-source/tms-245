/* 
 * 2430586 - 騎士團戰車3天交換券 - 雙擊可以在3天內使用騎乘技能[騎士團戰車]。\n習得#c飛行騎乘#技能後，還可駕馭飛行。
 */
var period = 3;
var mountSkillId = 80001071;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}