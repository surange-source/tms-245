/* 
 * 2432167 - 坐騎 蝙蝠騎寵 永久
 */
var period = -1;
var mountSkillId = 80001403;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);//, true);
    im.dispose();
}