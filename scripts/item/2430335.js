/* 
 * 2431390 - 坐騎 萊格斯的豺犬 永久
 */
var period = 90;
var mountSkillId = 10001136;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}