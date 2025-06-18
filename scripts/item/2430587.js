/* 
 * 2430587 - 妮娜的魔法陣3天交換券 - 雙擊可以在3天內使用騎乘技能[妮娜的魔法陣]。
 */
var period = 3;
var mountSkillId = 80001058;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}