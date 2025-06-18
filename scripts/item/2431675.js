//*  Careless遊戲腳本 *//
//* 作者：50009219  * //

var status = 0;
var a = "#fEffect/CharacterEff/1114000/1/0#"; //紅色六芒星
var b = "#fEffect/CharacterEff/1003271/0/0#";
var c = "#fEffect/CharacterEff/1112905/0/0#"; //籃心
var d = "#fEffect/CharacterEff/1002667/0/0#"; //黃星
var e = "#fEffect/CharacterEff/1003252/1/0#"; //音樂
var g = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
var h = "#fUI/Basic/BtHide3/mouseOver/0#";
var f = "#fEffect/CharacterEff/1112904/2/1#";//彩色五角星

var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK); //獲得星期
var time = new Date();
var sjr = time.getDay();
var typed = 1;
switch (sjr) {
    case 0:
        var xq = "星期日";
        break;
    case 1:
        var xq = "星期一";
        break;
    case 2:
        var xq = "星期二";
        break;
    case 3:
        var xq = "星期三";
        break;
    case 4:
        var xq = "星期四";
        break;
    case 5:
        var xq = "星期五";
        break;
    case 6:
        var xq = "星期六";
        break;
    default:
}
if (hour > 12) {
    hour -= 12;
    var apm = "下午好";
} else {
    var apm = "上午好";
}
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        //im.sendOk("#e#r　本商舖歡迎您的再次光臨!我們竭誠為你服務!!");
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (im.getMapId() == 180000001) {
        im.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.")
        im.dispose();
    } else if (status == 0) {
        var txt = "\r\n#d┌══════════21 點瘋狂檔═════════┐#k\r\n\r\n";
        txt += "#d　 布魯斯的神奇效果 等待你的光臨 且參與並使用#k\r\n";
        txt += "#d　 布魯斯的神奇效果 等待你的光臨 且參與並使用#k\r\n";
        txt += "#d　 布魯斯的神奇效果 等待你的光臨 且參與並使用#k\r\n";
        txt += "#r　 布魯斯的神奇效果 等待你的光臨 且參與並使用#k\r\n\r\n";
        txt += "　　　　　　　#L0##r#e" + c + " 強強強強強 " + c  +"#l#k\r\n";
        txt += "#d\r\n\r\n└═════════════════════════┘#k\r\n\r\n";
        txt += "\t\t　#r更多精彩福利　※　盡在樂游楓之谷\r\n";
        im.sendSimple(txt);
    } else if (status == 1) {
        if (hour ==00 && (minute >= 00&& minute <=60 )) {
            if (selection == 0) {
               if (im.getEventCount("布魯斯-破攻") < 1) {
                    var Random = Math.floor(Math.random() * 5999999);
                    //if (im.changeLimitBreak(800000+Random)) {
                        im.sendOkS("#e#d恭喜玩家 -破攻完畢\r\n\r\n追加傷害數值：#r" + Random + " #d\r\n當前傷害數值：" + im.getLimitBreak() + "\r\n\r\n　感謝您對樂游楓之谷的大力支持", 2);
                        im.setEventCount("布魯斯-破攻");
                        im.worldSpouseMessage(0x20, "[ 布魯斯黑暗效果 ] 玩家 " + im.getChar().getName() + " 使用 隨機破攻將武器增加了 " + Random + " 傷害值");
                        im.dispose();
                    }
                } else {
                    im.sendOk("\r\n\r\n#r\t\t不好意思!本活動只可參與一回!請下回光臨");
                    im.gainItem(2431675,-1);
                    im.dispose();
                }
            } else if (selection == 1) {
                if (im.getEventCount("21點還原福利") >= 1) {
                    im.sendOk("\r\n\r\n#r\t\t不好意思!本活動只可參與一回!請下回光臨");
                    im.gainItem(2431675,-1);
                    im.dispose();
                    return;
                }
                typed = 2;
                item = im.getInventory(1).getItem(1);
                if (item == null) {
                    im.sendOk("你確認你包裹的第一欄有裝備存在？");
                    im.dispose();
                    return;
                }
                if (item.getOwner().indexOf("★") >= 0) {
                    im.sendOk("提升過品級的裝備無法還原。");
                    im.dispose();
                    return;
                }
                var text = "21時瘋狂檔為你的裝備進行還原，還原前請注意以下幾點：\r\n\r\n#r1.請確認需要還原的裝備已經放置在裝備欄的第一格\r\n2.還原是個不可逆的操作，無法進行恢復\r\n3.玩家所造成的失誤不予以賠償\r\n\r\n#k#b是否繼續？";
                im.sendYesNo(text);
            }
        } else {
            im.sendOk("\r\n\r\n#r\t\t#e活動結束");
            im.dispose();
        }
    } else if (status == 2) {
        if (im.isCash(item.getItemId())) {
            im.sendOk("只有非現金道具才能進行還原");
            im.dispose();
            return;
        }
        var deleteQuantity = item.getQuantity();
        var ii = im.getItemInfo();
        var toDrop = ii.randomizeStats(ii.getEquipById(item.getItemId())).copy(); // 生成一個Equip類
        toDrop.setPotential1(item.getPotential1());
        toDrop.setPotential2(item.getPotential2());
        toDrop.setPotential3(item.getPotential3());
        toDrop.setPotential4(item.getPotential4());
        toDrop.setPotential5(item.getPotential5());
        toDrop.setPotential6(item.getPotential6());
        toDrop.setExpiration(item.getExpiration());
        im.removeSlot(1, 1, deleteQuantity);
        im.addFromDrop(im.getC(), toDrop, false);
        im.sendOk("還原成功了。");
        im.setEventCount("21點還原福利");
        im.worldSpouseMessage(0x20, "[ 21點瘋狂檔 ] 玩家 " + im.getChar().getName() + " 使用 裝備還原 還原了一件神裝大家恭喜Ta吧 ");
        im.dispose();
    }
}