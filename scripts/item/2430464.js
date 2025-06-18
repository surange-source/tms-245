/* 
 * 2430464 - 國慶紀念版熱氣球永久權 -  雙擊後可以使用騎乘技能[國慶紀念版熱氣球]。
 */
var period = -1;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}