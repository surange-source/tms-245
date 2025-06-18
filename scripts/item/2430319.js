/* 
 * 2430318 - 坐騎 小龜龜 永久
 */
var period = 90;
var mountSkillId = 10001122;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}