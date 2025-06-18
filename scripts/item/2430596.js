/* 
 * 2430596 - 鋼鐵變形俠3天交換券 - 雙擊可以在3天內使用騎乘技能[鋼鐵變形俠]。
 */
var period = 3;
var mountSkillId = 1053;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}