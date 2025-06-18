/* 
 * 2430588 - 拿破侖的白馬3天交換券 - 雙擊可以在3天內使用騎乘技能[拿破侖的白馬]。
 */
var period = 3;
var mountSkillId = 80001062;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}