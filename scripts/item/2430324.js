/* 
 * 2431390 - 坐騎 機動巡邏車 永久
 */
var period = 90;
var mountSkillId = 80001078;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}