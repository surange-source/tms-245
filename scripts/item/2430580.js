/* 
 * 2430580 - 熊貓3天交換券 - #c雙擊#習得騎寵技能[熊貓]可以使用3天。
 */
var period = 3;
var mountSkillId = 80001112;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}