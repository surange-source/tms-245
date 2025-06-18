//溫暖的冬季箱子
var itemList = Array(
    Array(4310129, 500),
    Array(4000517, 1),
    Array(2431945, 1),
    Array(5062002, 10),
    Array(5062500, 10),
    Array(5064000, 10)
);
function start() {
    if (im.getSpace(4) >= 1 && im.getSpace(5) >= 3 && im.getSpace(2) >= 1) {
        im.gainItem(2430471, -1);
        for(var key in itemList) {
            im.gainItem(itemList[key][0],itemList[key][1]);
        }
        im.playerMessage(-1, "恭喜您獲得20個高級神奇方塊、20個大師附加神奇方塊、20張防爆卷軸、500個冬季限量幣、1個140級防具箱子、1條黃金魚");
       //im.worldSpouseMessage(0x20, "『140武器製作包』 : 恭喜 " + im.getPlayer().getName() + " 從 <140武器製作包> 獲得全部材料。");
    im.dispose();
    } else {
        im.sendOk("您的包裹空間不足，請整理一下包裹吧~");
    im.dispose();
    }
}