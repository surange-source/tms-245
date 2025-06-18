/* 
 * 2430578 - 直升機3天交換券 - 雙擊可以在3天內使用騎乘技能[直升機]。\n習得#c飛行騎乘#技能後，還可駕馭飛行。
 */
var period = 3; //技能天數
var mountSkillId = 1157; //技能ID 

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}