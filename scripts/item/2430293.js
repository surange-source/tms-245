/* 
 * 2431390 - 坐騎 飛船 永久
 */
var period = 90;
var mountSkillId = 10001146;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}