/* 
 * 2431390 - 坐騎 拿破侖的白馬 永久
 */
var period = 90;
var mountSkillId = 10001139;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}