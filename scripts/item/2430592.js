/* 
 * 2430592 - 萊格斯的豺犬3天交換券 - 雙擊可以在3天內使用騎乘技能[萊格斯的豺犬]。
 */
var period = 3;
var mountSkillId = 1136;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}