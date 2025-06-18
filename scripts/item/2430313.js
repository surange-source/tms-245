/* 
 * 2431390 - 坐騎 直升機 永久
 */
var period = 90;
var mountSkillId = 10001157;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}