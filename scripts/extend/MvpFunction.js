var status = -1;
var c = "#fEffect/CharacterEff/1112905/0/0#"; //籃心
var mvpUI = "UI/CashShop/CSMVPPopup/main/";
var mvpNames = Array("無", "銅牌I", "銅牌II", "銅牌III", "銅牌IV", "銀牌", "金牌", "鑽石", "紅鑽");
var mvpAmount = Array(0, 100, 1000, 3000, 5000, 5000, 15000, 20000, 40000, 0);
var kkk1 = "#fMap/MapHelper.img/weather/thankyou/3#";
var kkk = "";
// 功能選單
var menuList = Array(
    // 普通玩家功能
    Array(
        // (選項文字, 選項索引, 選項開關)
        Array(kkk, "租用道具", 3, true),
        Array(kkk, "合成MVP裝", 4, true),
        Array(kkk, "強化MVP裝", 2, true),
        Array(kkk, "關於MVP裝", 5, true)
    ),
    // 青銅I功能
    Array(
        Array(kkk, "召喚輪迴", 0, true),
        Array(kkk, "防止搶圖", 1, true)
    ),
    // 青銅II功能
    Array(
    ),
    // 青銅III功能
    Array(
    ),
    // 青銅IV功能
    Array(
    ),
    // 銀功能
    Array(
    ),
    // 黃金功能
    Array(
    ),
    // 鑽石功能
    Array(
    ),
    // 紅鑽功能
    Array(
    )
);

function start() {
    var msg = "#f" + mvpUI + "gradeIcon/" + cm.getPlayer().getMvpLevel() + "##f" + mvpUI + "gradeName/" + cm.getPlayer().getMvpLevel() + "#";
    msg += c + "\r\n";
    var amount;
    if (!cm.getPlayer().isBronzeIVMvp()) {
        amount = cm.getPlayer().getMvpPayAmount();
    } else {
        amount = cm.getPlayer().getMvpPayAmountMonthly();
    }
    var nextNeedAmount = mvpAmount[cm.getPlayer().getMvpLevel() + 1] * cm.getConfig("mvp.amount.rate");
    if (nextNeedAmount > 0) {
        nextNeedAmount -= amount;
        if (nextNeedAmount < 0) {
            nextNeedAmount = 0;
        }
    }
    var s = "";
    for (var i = nextNeedAmount.toString().length; i < 23; i++) {
        s += " ";
    }
    msg += "直到下個階段所剩下的金額 " + s + nextNeedAmount + " 現金\r\n";
    var nextMonthLevel;
    if (cm.getPlayer().isSilverMvp()) {
        var isCustom = cm.getConfig("mvp.amount.rate") != 1.0;
        amount = 0;
        for (var i = -1; i < 1; i++) {
            var calendar = java.util.Calendar.getInstance();
            calendar.setTime(new java.util.Date());
            calendar.add(java.util.Calendar.MONTH, i);
            var month = new java.text.SimpleDateFormat("yyyyMM").format(calendar.getTime());
            var sMonthAmount = cm.getWorldShareInfo(4, (isCustom ? "c" : "") + month);
            amount += !sMonthAmount || sMonthAmount == null ? 0 : Number(sMonthAmount);
        }
        nextMonthLevel = 4;
        for (var i = cm.getPlayer().getMvpLevel(); i > 4; i--) {
            nextNeedAmount = mvpAmount[i] * cm.getConfig("mvp.amount.rate");
            if (amount >= nextNeedAmount) {
                nextMonthLevel = i;
                break;
            }
        }
        amount = nextNeedAmount - amount;
        if (amount <= 0) {
            amount = 0;
        }
    } else {
        amount = 0;
        nextMonthLevel = cm.getPlayer().getMvpLevel();
    }
    var sLength;
    switch (nextMonthLevel) {
        case 1:
            sLength = 4;
            break;
        case 2:
        case 4:
            sLength = 3;
            break;
        case 3:
            sLength = 1;
            break;
        case 0:
            sLength = 7;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            sLength = 5;
            break;
    }
    s = "";
    for (var i = amount.toString().length; i < 4 + sLength; i++) {
        s += " ";
    }
    msg += "預估下個月階級: #e" + mvpNames[nextMonthLevel] + "#n " + s + "直到維持階級需要: " + amount + " 現金\r\n";


    var menu = "";
    var x = 0;
    for (var i = 0; i < menuList.length; i++) {
        var rankMenu = "";
        for (var j = 0; j < menuList[i].length; j++) {
            if (menuList[i][j][3]) { // 如果允許顯示
                if ((menuList[i][j][2] != 2 && menuList[i][j][2] != 4 && menuList[i][j][2] != 5) || checkPermission("MVPEquip")) {
                    x++;
                    rankMenu += "#L" + menuList[i][j][2] + "#" + menuList[i][j][0] + "" + menuList[i][j][1] + "#l";
                    if (x % 4 == 0) {
                        rankMenu += "\r\n";
                    }
                }
            }
        }
        if (menuList[i] && menuList[i].length && rankMenu != "") {
            //menu += "\r\n#f" + mvpUI + "gradeTab/Enable/" + (7 - i) + "#\r\n";
            menu += rankMenu;
        } else {
            continue;
        }
    }
    if (menu != "") {
        msg += "#b";
        msg += menu;
        msg += "#k\r\n";
    }
    cm.sendSimple(msg);
}

var select = null;
function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    var i = 0;
    if (cm.getMapId() == 180000001) {
        cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.");
        cm.dispose();
    } else if (status == i++) {
        if (select == null) {
            select = selection;
        }
        switch (select) {
            case 0:
                cm.dispose();
                cm.openNpc(cm.getNpc(), "召喚輪迴碑石");
                break;
            case 1:
                cm.dispose();
                cm.openNpc(cm.getNpc(), "防搶圖");
                break;
            case 2:
                cm.dispose();
                cm.openNpc(cm.getNpc(), "強化MVP裝備");
                break;
            case 3:
                cm.dispose();
                cm.openNpc(cm.getNpc(), "MVP租用道具");
                break;
            case 4:
                cm.dispose();
                cm.openNpc(cm.getNpc(), "MVP裝合成");
                break;
            case 5:
                cm.sendSimple("#b#eMVP裝#k#n是可進行強化的特殊裝備，比普通裝有更強力的效果，強化 15、20、25 ★ 有不同的強化效果。"
                + "\r\n#rMVP裝即使沒有強化也比普通裝稍強#k"
                + "\r\n\r\n#k合成的#b#e永久型MVP裝#n#k最高強化為 25 ★"
                + "\r\n租用的期限型MVP裝最高強化如下#b"
                + "\r\n銀牌(不含)以下: 10 ★"
                + "\r\n銀牌: 15 ★"
                + "\r\n金牌: 20 ★"
                + "\r\n鑽石(含)以上: 25 ★"
                + "\r\n#e#r※ 根據MVP等級可強化最高★生效效果(如銀牌玩家使用25★MVP裝只會生效15★效果)，永久型MVP裝無此限制#n#b"
                + "\r\n#L0#關於MVP裝的強化效果#l");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 5:
                var msg = "請選擇要查看強化效果的MVP裝#b"
                + "\r\n#L1033000##v1033000# MVP#t1033000##l"
                + "\r\n#L1114400##v1114400# MVP#t1114400##l"
                + "\r\n#L1202193##v1202193# MVP#t1202193##l";
                if (checkPermission("MVPEquip_1113220")) {
                    msg += "\r\n#L1113220##v1113220# MVP#t1113220##l";
                }
                cm.sendSimple(msg);
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 5:
                var msg = "根據強化星數不同達到不同等級效果，等級劃分如下:\r\n(#b";
                if (selection == 1202193) {
                    msg += "消耗型(無裝備召喚)/";
                }
                msg += "15★(不含)以下/20★(不含)以下/25★(不含)以下/25★#k)\r\n\r\n效果:\r\n";
                switch (selection) {
                    case 1033000:
                        msg += "冷卻時間:(#b105/100/95/90#k)秒";
                        break;
                    case 1114400:
                        msg += "可在非燃燒場地使用，燃燒階段提升到(#b15/20/25/30#k)，冷卻時間:(#b90/60/30/0#k)秒";
                        break;
                    case 1202193:
                        msg += "怪物重生間隔時間減少(#b50%/60%/70%/80%/100%#k)(最少1秒) 最大怪物量增加(#b60%/70%/80%/90%/100%#k) 單次生怪量增加(#b15%/20%/30%/40%/50%#k)";
                        break;
                    case 1113220:
                        msg += "拉起最多(#b20/30/40/50#k)個怪物，冷卻時間(#b4/3/2/0#k)秒，範圍增加(#b150/300/500/1000#k)";
                        break;
                    default:
                        msg += "無";
                        break;
                }
                cm.sendOk("#v" + selection + "# MVP#t" + selection + "# " + msg);
                cm.dispose();
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}