/* 
 * 2432293 - 坐騎 南瓜馬車 永久
 */
var period = -1;
var mountSkillId = 80001329;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);//, true);
    im.dispose();
}