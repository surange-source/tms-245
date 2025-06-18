/* 
 * 2430713 - 好朋友坐騎永久使用券 - 好朋友坐騎永久使用券.\r\n#c雙擊後可以用永久使用好朋友坐騎技能.#
 */
var period = -1;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}