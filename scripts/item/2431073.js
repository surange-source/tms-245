/* 
 * 2431390 - 坐騎 二連跳青蛙 永久
 */
var period = 90;
var mountSkillId = 80001199;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}