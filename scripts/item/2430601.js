/* 
 * 2430601 - 聖獸提拉奧斯3天交換券 - 雙擊後可以在3天內使用騎乘技能[聖獸提拉奧斯]。
 */
var period = 3;
var mountSkillId = 1042;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}