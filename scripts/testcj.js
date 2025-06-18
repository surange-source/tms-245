var ItemList = [
    [/*itemID*/'item1', /*weight*/1]
]

main();
function main() {
    var times = 100000;
    for (var i = 1; i <= 100; i++) {
        ItemList[i-1] = ['item' + i, Math.pow(i, 2), 0];
    }
    print('ItemListLength:' + ItemList.length);
    var start = java.lang.System.currentTimeMillis();
    for (var i = 0; i < times; i++) {
        ItemList[getRandomItem(ItemList)][2]++;
    }
    for (var i = 0; i < ItemList.length; i++) {
        var item = ItemList[i];
        print(item[0] + ':' + item[1] + ':' + item[2]);
    }
    var end = java.lang.System.currentTimeMillis();
    print(times + 'times used:' + (end-start) + 'ms');
}

function getRandomItem(ItemList) {
    var t = -1, r = 0;
    for (var i = 0; i < ItemList.length; i++) {
        var item = ItemList[i];
        var k = Math.log(Math.random()) / weight;
        if (k > t) {
            t = k;
            r = i;
        }
    }
    return r;
}
