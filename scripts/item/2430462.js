/* 
 * 2430462 - 國慶紀念版熱氣球(7天權) -  雙擊後可以在7天內使用騎乘技能[國慶紀念版熱氣球]。 
 */
var period = 7;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period,true);
    im.dispose();
}