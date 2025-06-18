/* 
 * 2431390 - 坐騎 瑪瑙獵豹 永久
 */
var period = 90;
var mountSkillId = 80001228;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}