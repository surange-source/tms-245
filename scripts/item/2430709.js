/* 
 * 2430709 - 好朋友坐騎90天使用券 - 好朋友坐騎90天使用券.\r\n#c雙擊後可以在90天內使用好朋友坐騎技能.#
 */
var period = 90;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}