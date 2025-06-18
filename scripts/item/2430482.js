var nine = [1212066,1222061,1232060,1242065,1302277,1312155,1322205,1332227,1362092,1372179,1382211,1402199,1412137,1422142,1432169,1442225,1462195,1472216,1482170,1492181,1522096,1532100,1272019,1262047,1582041,1282036,1592030,1542070,1552070,1252064,1452207,1292020];

var status = -1;
var selectweapon = null;
function start() {
    var str = "以下裝備任選一件\r\n";
    for(i=0;i<nine.length;i++){
        str += "#L" + i + "##v" + nine[i] + "##z" + nine[i] + "##l\r\n" ;
    }
    im.sendSimple(str);    
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        selectweapon = selection;
        im.sendOk("#r是否要兌換?#v" + nine[selection] + "#兌換完畢後將無法復原");    
    } else if (status == 1){
        if (im.getSpace(1) >= 1 && im.used()){
            im.gainItem(nine[selectweapon], 1);
            im.dispose();
        }else{
            im.sendOk("裝備欄位空間不足");    
            im.dispose();
        }
    } else {
        im.dispose();
    }
}