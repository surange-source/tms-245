/* 
 * 2430579 - GO兔冒險3天交換券 - #c雙擊#習得騎寵技能[GO兔冒險]可以使用3天。
 */
var period = 3;
var mountSkillId = 80001114;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}