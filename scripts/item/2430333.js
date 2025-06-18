/* 
 * 2431390 - 坐騎 老虎只是傳說 永久
 */
var period = 90;
var mountSkillId = 20011034;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}