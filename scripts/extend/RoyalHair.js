/*
    皇家美髮
 */
/* global cm */

var status = -1;
var royalCards = Array();
var canRoyal = false;
var royalCardID = -1;
var isAngel;
var isZero;
var isSecond = false;

function start() {
    isAngel = cm.getBeginner() == 6001;
    isZero = cm.getBeginner() == 10000;
    var info = "";
    for each (type in cm.getAllRaffleTypes()){
        if (type < 5150040 || parseInt(type / 1000) != 5150 || type == 5150042 || type == 5150043 || type == 5150052 || type == 5150053 || type == 5150056) {
            continue;
        }
        if (cm.haveItem(type)) {
            info += "#L" + type + "##v" + type + "##t0" + type + "##l\r\n";
            royalCards.push(type);
        }
    }
    if (info == "") {
        cm.sendYesNo("哎呀，要給我皇家美髮券才能幫你處理頭髮喔。要現在移動到商城去看看現在賣哪些皇家美髮券嗎？");
    } else {
        canRoyal = true;
        cm.sendSimple("您好～ 請選擇你想要的服務。#b\r\n" + info);
    }
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        if (status === 0) {
            cm.sendOk("你還沒做好心理準備嗎？決定好了之後，請你再來和我說話。");
            cm.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status === i++) {
        cm.dispose();
    } else if (status === i++) {
        if (!canRoyal) {
            cm.dispose();
            cm.enterCS();
            return;
        }
        if (royalCardID == -1) {
            royalCardID = selection;
        }
        if (royalCards.indexOf(royalCardID) != -1) {
            cm.sendYesNo("你帶來#b#t" + royalCardID + "##k了！我目前還在受訓的階段，不知道能不能讓你滿意，但你要不要使用#b#t" + royalCardID + "##k來變換髮型呢？");
        } else {
            cm.sendOk("發生未知錯誤");
            cm.dispose();
            return;
        }
    } else if (status === i++) {
        if (isAngel) {
            cm.askAngelicBuster();
        } else if (isZero) {
            cm.sendSimple("請選擇要接受變更的角色.#b\r\n\r\n#b#L0#神之子阿爾法#l\r\n#L1#神之子蓓塔#l\r\n#L2#神之子阿爾法 + 神之子蓓塔#l");
        } else {
            action(1, 0, 0);
        }
    } else if (status === i++) {
        if (isAngel) {
            if (selection == -1) {
                cm.dispose();
                return;
            }
            isSecond = selection != 0;
            cm.topMsg(selection);
        } else if (isZero) {
            isSecond = selection == 1;
        }
        if (!cm.haveItem(royalCardID)) {
            cm.sendNext("必須要有#b#t" + royalCardID + "##k，我才能為你理髮。");
            cm.dispose();
            return;
        }
        cm.gainItem(royalCardID, -1);
        var sStyle = "";
        var gStyle = cm.gachaponItem(royalCardID, isZero && isSecond ? 1 : cm.getPlayer().getGender());
        var nStyle = gStyle != null ? (parseInt(gStyle.getItemId() / 10) * 10 + (isSecond ? cm.getPlayer().getSecondHair() : cm.getPlayer().getHair()) % 10) : 0;
        if (gStyle == null || !cm.canChangeHair(nStyle)) {
            cm.sendOk("發生未知錯誤");
            cm.gainItem(royalCardID, 1);
            cm.dispose();
            return;
        }
        sStyle += "#t" + nStyle + "#";
        var firstStyle = nStyle;
        if (gStyle.isSmega()) {
            cm.dropGachaponMsg(royalCardID, nStyle);
        }
        if (isZero && selection == 2) {
            gStyle = cm.gachaponItem(royalCardID, 1);
            nStyle = gStyle != null ? (parseInt(gStyle.getItemId() / 10) * 10 + cm.getPlayer().getSecondHair() % 10) : 0;
            if (gStyle == null || !cm.canChangeHair(nStyle)) {
                cm.sendOk("發生未知錯誤");
                cm.gainItem(royalCardID, 1);
                cm.dispose();
                return;
            }
            sStyle += ", #t" + nStyle + "#";
            cm.setAvatar(nStyle, true);
            if (gStyle.isSmega()) {
                cm.dropGachaponMsg(royalCardID, nStyle);
            }
        }
        cm.setAvatar(firstStyle, isSecond);
        cm.sendNext("如何?這是最新流行的#b" + sStyle + "#k!你用起來真的很好看耶?哈哈哈,也是啦,我的手藝還會不好嗎~還需要什麼的話請隨時來找我,呵呵");
        cm.dispose();
    } else {
        cm.dispose();
    }
}