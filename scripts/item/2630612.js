var exchangeList = Array();
// 超級藥水*200
exchangeList.push([2000005, 200, 1]);
// 強力的輪迴星火
exchangeList.push([2048716, 1, 5]);
// 罕見潛在能力卷軸60%
exchangeList.push([2049751, 1, 10]);
// 天空和大海間
//exchangeList.push([3018177, 1, 15]);
// 空中樓閣的主人
//exchangeList.push([3015953, 1, 15]);
// 與布萊爾逛溫室庭園
//exchangeList.push([3018279, 1, 15]);
// 古老的楓葉樹
exchangeList.push([3018043, 1, 30]);
// 新復古古老的楓葉樹
exchangeList.push([3018350, 1, 30]);
// 守護之夜椅子
exchangeList.push([3018181, 1, 100]);
// 幸運的銀色箱子
exchangeList.push([2028393, 1, 30]);
// 高級戒指１種交換券
exchangeList.push([2630613, 1, 50]);
// 星力17星強化券
exchangeList.push([2049386, 1, 80]);
// 幸運的金色箱子
exchangeList.push([2028394, 1, 100]);

//消耗多少碎片才能抽
var num = 100;
//[道具ID,加入獎池數量,廣播種類]
var robot = Array();
// 戰國時代機器人(男)
robot.push([1662028,5,2]);
// 戰國時代機器人(女)
robot.push([1662029,5,2]);
// 閃亮蝴蝶機器人(男)交換券
robot.push([2437265,5,2]);
// 閃亮蝴蝶機器人(女)交換券
robot.push([2437266,5,2]);
// 死亡機器人人(男)
robot.push([1662130,5,2]);
// 死亡機器人人(女)
robot.push([1662131,5,2]);
// KAITO機器人套組
robot.push([2434300,5,2]);
// 鏡音連機器人套組
robot.push([2434299,5,2]);
// 鏡音鈴機器人套組
robot.push([2434298,5,2]);
// 初音未來機器人套組
robot.push([2434297,5,2]);
// 明日香機器人交換券
robot.push([2438341,1,3]);
// 綾波零機器人交換券
robot.push([2438526,1,3]);
// 初號機造型機器人交換券
robot.push([2438343,1,3]);
// 真·希拉機器人交換券
robot.push([2439296,1,3]);
// 聯盟司令官西格諾斯機器人交換
robot.push([2439409,1,3]);
// 武公機器人交換券
robot.push([2439693,1,3]);
// 戴米安機器人交換卷
robot.push([2436734,1,3]);
// 愛麗西亞機器人交換卷
robot.push([2436735,1,3]);
// 史烏機器人交換券
robot.push([2433167,1,3]);
// 殺人鯨機器人交換卷
robot.push([2432126,1,3]);
// 露希妲機器人交換券
robot.push([5680465,1,3]);
// 麥吉機器人交換券
robot.push([2436554,1,3]);
// 新復古戴米安機器人交換券
robot.push([2630562,1,3]);
// 新復露希妲機器人交換券
robot.push([2630522,1,3]);
// 新復愛麗西亞機器人交換券
robot.push([2630487,1,3]);
// 威爾機器人交換券
robot.push([2630388,1,3]);

function start() {
    var msg = "#b#v" + im.getItemId() + "##t" + im.getItemId() + "##k持有#r#c" + im.getItemId()+ "#個#k。\r\n請選擇要交換的道具。";
    for (var i = 0; i < exchangeList.length; i++) {
        msg += "\r\n#L" + i + "##b#v" + exchangeList[i][0] + "##t" + exchangeList[i][0] + "#" + exchangeList[i][1] + "個#r（消耗碎片" + exchangeList[i][2] + "個）#l";
    }
    msg += "\r\n#L" + exchangeList.length + "##b#v1662000#抽取機器人#r（消耗碎片" + num + "個）#l";
    im.sendSimple(msg);
}

function action(mode, type, selection) {
    if (mode != 1) {
        im.dispose();
        return;
    }
    if (selection == exchangeList.length) {
        if(!im.haveItem(im.getItemId(), num)){
            im.sendOk("黃金蘋果碎片不足");
        } else if (im.getSpace(1) < 1 || im.getSpace(2) < 1) {
            im.sendOk("道具欄不足");
        } else {
            var random = Math.floor(Math.random() * robot.length);
            im.gainItem(im.getItemId(), -num);
            im.gainItem(robot[random][0],1);
            /*
            var str = "";
            for(var i=0;i<randomRobot.length;i++){
                str += randomRobot[i][0] + "\r\n";
            }
            im.sendOk(str);
            */
        }
    } else {
        if (exchangeList.length < (selection + 1) || selection < 0) {
            im.dispose();
            return;
        }
        if (!im.haveItem(im.getItemId(), exchangeList[selection][2])) {
            im.sendOk("黃金蘋果碎片不足");
        } else if (!im.canHold(exchangeList[selection][0], exchangeList[selection][1])) {
            im.sendOk("道具欄不足");
        } else {
            im.gainItem(im.getItemId(), -exchangeList[selection][2]);
            if (exchangeList[selection][0] == 2028393 || exchangeList[selection][0] == 2028394) {
                im.gainItemPeriod(exchangeList[selection][0], exchangeList[selection][1], 1);
            } else {
                im.gainItem(exchangeList[selection][0], exchangeList[selection][1]);
            }
        }
    }
    im.dispose();
}

function fixedrandom(p){
    var seed = 43758.5453123;
    return (Math.abs(Math.sin(p)) * seed)%1;
}
