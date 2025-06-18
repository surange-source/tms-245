/* 
 * 2430598 - 超能套裝3天交換券 - 雙擊可以在3天內使用[超能套裝]騎寵技能。
 */
var period = 3;
var mountSkillId = 80001019;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}