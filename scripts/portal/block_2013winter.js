var blockMapName;

function enter(pi) {
    var mapId = pi.getMapId();
    switch (mapId) {
        case 221020000:
            blockMapName = "地球防禦本部";
            break;
        case 222020000:
        case 230030200:
            blockMapName = "童話村";
            break;
        default:
            blockMapName = "未知地圖";
    }
    pi.playerMessage("由於黑氣息的阻擋，無法移動到" + blockMapName + "。");
}
