/* 
 * 2430585 - 企鵝3天交換券 - #c雙擊#習得騎寵技能[企鵝]可以使用3天。
 */
var period = 3;
var mountSkillId = 80001113;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}