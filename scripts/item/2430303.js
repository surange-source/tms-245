/* 
 * 2431390 - 坐騎 騎士團戰車 永久
 */
var period = 90;
var mountSkillId = 10001151;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}