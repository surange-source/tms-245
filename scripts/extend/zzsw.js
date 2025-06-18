var status = -1;
var typed = 0;
var isSuccess = 0;
var giftItems = Array(2432353, 5062002, 5062500);
var needItems = Array(
    Array(
        4032579,// - 粉嫩餃子麵粉 - 粉撲撲的奇妙餃子麵粉，可揉捏出令人開心的餃子皮。是製作節日餃子的上品。
        4032580,// - 活力鮮肉 - 時刻透出無限活力的鮮肉，據說吃了會讓人精力充沛。是製作節日餃子的上品。
        4032581// - 恬靜白菜 - 沉浸於安詳恬靜中的白菜，據說吃了能讓人保持冷靜。是製作節日餃子的上品。
    ),
    Array(
        4032582,// - 益壽春卷皮 - 添藥草精華的春卷皮，據說可以給人帶來更多健康。是製作節日春卷的上品。
        4032583,// - 福氣肉餡 - 向流星許願過的肉餡，據說可以給人帶來更多福氣。是製作節日春卷的上品。
        4032584// - 財運豆油 - 用金豆子製作的豆油，據說可以給人帶來更多財運。是製作節日春卷的上品。
    ),
    Array(
        4032585,// - 纏綿糯米 - 天天黏黏的特級糯米，據說可以把人們的心聯繫在一起。今年做節日年糕的上品。
        4032586,// - 蜜語糖精 - 回憶蜜蜜的神妙糖精，據說可以讓人們的關係浪漫溫馨。今年做節日年糕的上品。
        4032587// - 配對年糕錘 - 月下傳承的年糕錘，據說可以引人們尋找天賜注定的緣分。今年做節日年糕的上品。
    )
)
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var text = "肚子好餓啊，你能做些東西給我吃嗎？我會給你應有的報酬的。\r\n";
        text+="#b#L0##v4032592#製作餃子#l\r\n";
        text+="#L1##v4032593#製作春卷#l\r\n";
        text+="#L2##v4032594#製作年糕#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1){
        typed = selection;
        var text = "你需要以下材料完成製作：\r\n\r\n";
        needItem = needItems[selection];
        for(var key in needItem) {
            isEnough = "#r(×)#k";
            if (cm.haveItem(needItem[key])) {
                isEnough = "#g(√)#k";
                isSuccess++;
            }
            text+=isEnough+" #k需要1個#b#v"+needItem[key]+"##t"+needItem[key]+"#\r\n";
        }
        if (isSuccess == 3) {
            text+="\r\n#g(√)#k表示足夠，#r(×)#k表示不足，#d#e是否繼續製作？#n#k\r\n";
            cm.sendYesNo(text);
        } else {
            status = -1;
            text+="\r\n#g(√)#k表示足夠，#r(×)#k表示不足，#d#e你的材料好像不足哦！#n#k\r\n";
            cm.sendSimple(text);
        }
    } else if (status == 2) {
        isSuccess = 0;
        needItem = needItems[typed];
        for(var key in needItem) {
            cm.gainItem(needItem[key], -1);
        }
        giftId = giftItems[typed];
        cm.gainItem(giftId, 1);
        status = -1;
        cm.sendSimple("真美味，作為獎勵，給你1個#b#v"+giftId+"##t"+giftId+"##k，點擊#b「下一步」#k繼續製作。");
    }
}