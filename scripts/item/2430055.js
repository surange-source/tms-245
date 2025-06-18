/* 
 * 坐騎 女女機車 30天
 */
var period = 30;
var mountSkillId = 20001029;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}