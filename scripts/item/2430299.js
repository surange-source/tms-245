/* 
 * 2431390 - 坐騎 魔法掃帚 永久
 */
var period = 90;
var mountSkillId = 10001149;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}