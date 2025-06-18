/* 
 * 2430593 - 警車3天交換券 - 雙擊可以從當天起，在3天內使用騎寵技能[警車]。\n鼠標右鍵點擊可以邀請他人搭乘。
 */
var period = 3;
var mountSkillId = 1115;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}