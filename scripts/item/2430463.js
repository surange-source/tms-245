/* 
 * 2430463 - 國慶紀念版熱氣球(30天權) - 雙擊後可以在30天內使用騎乘技能[國慶紀念版熱氣球]。 
 */
var period = 30;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}