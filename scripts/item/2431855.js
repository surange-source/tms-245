// 麥加送給完成所有新手冒險家冒險任務的禮物。

var items = [1052646, 1072850, 2000013, 2000014];
var quantitys = [1, 1, 50, 50];

var checkSpace = new Promise(function(resolve, reject) {
    for(var i in items) {
        if(!im.canHold(items[i], quantitys[i])) {
            reject(items[i]);
            return;
        }
    }
    resolve(true);
});

function start()
{
    checkSpace
    .then(function(check) {
        for(var i in items) {
            im.gainItem(items[i], quantitys[i]);
        }
        im.remove();
    })
    .catch(function(itemId, quantity) {
        if(itemId != undefined) {
            im.sendOk("請確認道具欄空間是否足夠放入"+im.getItemName(itemId));
            im.enableActions();
            im.dispose();
        }
    });
    
}