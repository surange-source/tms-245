/* 
 * 2431390 - 坐騎 跑車 永久
 */
var period = 90;
var mountSkillId = 80001032;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}