/* 
 * 2431390 - 坐騎 玩具木馬 永久
 */
var period = 90;
var mountSkillId = 30001025;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}