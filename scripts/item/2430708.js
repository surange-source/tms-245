/* 
 * 2430708 - 好朋友坐騎15天使用券 - 好朋友坐騎15天使用券.\r\n#c雙擊後可以在15天內使用好朋友坐騎技能.#
 */
var period = 15;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}