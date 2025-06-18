var nine = [1342092,1099010,1098005,1352605,1352008,1352108,1352405,1352505,1352705,1352205,1352215,1352225,1352235,1352245,1352255,1352265,1352275,1352285,1352295,1352905,1352915,1352927,1352934,1352944,1352955,1352965,1352974,1353005,1353104,1353304,1353207,1353408,1353506,1353605,1353706,1353706,1352806,1352814,1352825,1353805];

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