/* 
 * 2431390 - 坐騎 維京戰車 永久
 */
var period = 90;
var mountSkillId = 10001129;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}