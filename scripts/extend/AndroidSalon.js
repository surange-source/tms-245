/*
 *  機器人美容
 */
var status = -1;
var salonType = -1;
var ticketID = -1;
var styleIDs;
var royalCards = [];

function start() {
    var android = cm.getPlayer().getAndroid();
    if (android == null) {
        cm.sendOk("沒有機器人的人我就幫不上忙了！再煩請您跟機器人一起來訪。");
        cm.dispose();
        return;
    }
    cm.sendSimple("你好，我是機器人美麗經理#p" + cm.getNpc() + "#，想要讓你的機器人美容嗎？來就對了，可以更換你的機器人所有的地方！\r\n\r\n#b#L0#變更髮型#l\r\n#L1#變更髮色#l\r\n#b#L2#變更臉型#l\r\n#L3#皮膚管理#l\r\n#L4#皇家美髮券#l\r\n#L5#皇家整形券#l\r\n#L6#配戴隱形眼鏡#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            if (salonType == 4) {
                cm.sendOk("沒有皇家美髮券的話我也無法幫你什麼了。如果改變想法的話再跟我說吧！");
                cm.dispose();
                return;
            } else if (salonType == 5) {
                cm.sendOk("必須帶來皇家整形外科券，我才能改變機器人臉型。如果改變心意的話，請再來找我。");
                cm.dispose();
                return;
            }
        } else if (status == 1) {
            if (salonType >= 0 && salonType <= 2) {
                cm.sendOk("仔細想想後，再過來吧");
                cm.dispose();
                return;
            }
        }
        status--;
    }

    var i = 0;
    if (status == i++) {
        if (salonType == -1) {
            salonType = selection;
        }
        switch (salonType) {
            case 0:
                cm.sendSimple("要使用哪一張券呢？\r\n\r\n#b#L0#變更髮型(高級券)#l\r\n#L1#變更髮型(一般券)#l");
                break;
            case 1:
                cm.sendSimple("要使用哪種券呢？\r\n\r\n#b#L0#染髮(高級券)#l\r\n#L1#染髮(一般券)#l");
                break;
            case 2:
                cm.sendSimple("要使用哪種優惠券呢？\r\n\r\n#b#L0#整形(高級券)#l\r\n#L1#整形(一般券)#l");
                break;
            case 3:
                ticketID = 5153013;
                styleIDs = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13];
                cm.askAndroid(ticketID, styleIDs, "選擇適合你機器人的皮膚吧~");
                break;
            case 4:
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
                    cm.sendSimple("要用哪種皇家美髮券讓機器人變身呢？#b\r\n" + info);
                }
                break;
            case 5:
                var info = "";
                for each (type in cm.getAllRaffleTypes()){
                    if (type < 5152053 || parseInt(type / 1000) != 5152 || parseInt(type / 100) == 51521) {
                        continue;
                    }
                    if (cm.haveItem(type)) {
                        info += "#L" + type + "##v" + type + "##t0" + type + "##l\r\n";
                        royalCards.push(type);
                    }
                }
                if (info == "") {
                    cm.sendYesNo("必須帶來皇家整形外科券，我才能改變機器人臉型。現在就去現金商店逛逛目前販售中的皇家整形外科券吧？");
                } else {
                    cm.sendSimple("要用哪種皇家整形讓機器人變身呢？#b\r\n" + info);
                }
                break;
            case 6:
                var info = "";
                var base = 5152100;
                for (var j = 0; j < 8; j++) {
                    if (cm.haveItem(base + j)) {
                        info += "#L" + (base + j) + "##v" + (base + j) + "##t0" + (base + j) + "##l\r\n";
                        royalCards.push(base + j);
                    }
                }
                if (info == "") {
                    cm.sendOk("必須有現金商店販售的日拋隱形眼鏡才可以");
                    cm.dispose();
                } else {
                    cm.sendSimple("要給機器人佩戴哪個隱形眼鏡呢？#b\r\n" + info);
                }
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (salonType) {
            case 0:
                if (ticketID == -1) {
                    if (0 == selection) {
                        ticketID = 5150043;
                    } else {
                        ticketID = 5150042;
                    }
                }
                if (5150043 == ticketID) {
                    var style = cm.getAndroidStat("HAIR");
                    var styleList = cm.gachaponItems(ticketID, cm.getAndroidStat("GENDER"));
                    styleIDs = new Array();
                    for each (gStyle in styleList) {
                        styleIDs.push(Math.floor(gStyle.getItemId() / 10) * 10 + style % 10);
                    }
                    styleIDs = cm.getCanHair(styleIDs);
                    if (styleIDs.length <= 0) {
                        cm.sendOk("沒有可更換的髮型數據");
                        cm.dispose();
                        return;
                    }
                    cm.askAndroid(ticketID, styleIDs, "請選擇適合你機器人的髮型。");
                } else {
                    cm.sendYesNo("使用一般券的話，會隨機出現髮型…使用#b#t" + ticketID + "##k要改變機器人的髮型嗎？");
                }
                break;
            case 1:
                if (ticketID == -1) {
                    if (0 == selection) {
                        ticketID = 5151033;
                    } else {
                        ticketID = 5151032;
                    }
                }
                if (5151033 == ticketID) {
                    var style = cm.getAndroidStat("HAIR");
                    var currentstylecolo = Math.floor(style / 10) * 10;
                    styleIDs = [];
                    for (var i = 0; i < 8; i++) {
                        styleIDs[i] = currentstylecolo + i;
                    }
                    styleIDs = cm.getCanHair(styleIDs);
                    if (styleIDs.length <= 0) {
                        cm.sendOk("沒有可更換的髮型數據");
                        cm.dispose();
                        return;
                    }
                    cm.askAndroid(ticketID, styleIDs, "請選擇和你的機器人適合的顏色。");
                } else {
                    cm.sendYesNo("使用一般券的話，會隨機出現髮型…使用#b#t" + ticketID + "##k要改變機器人的髮色嗎？");
                }
                break;
            case 2:
                if (ticketID == -1) {
                    if (0 == selection) {
                        ticketID = 5152050;
                    } else {
                        ticketID = 5152049;
                    }
                }
                if (5152050 == ticketID) {
                    var style = cm.getAndroidStat("FACE");
                    var styleList = cm.gachaponItems(ticketID, cm.getAndroidStat("GENDER"));
                    styleIDs = new Array();
                    for each (gStyle in styleList) {
                        styleIDs.push(Math.floor(gStyle.getItemId() / 1000) * 1000 + gStyle.getItemId() % 100 + Math.floor(style % 1000 / 100) * 100);
                    }
                    styleIDs = cm.getCanFace(styleIDs);
                    if (styleIDs.length <= 0) {
                        cm.sendOk("沒有可更換的臉型數據");
                        cm.dispose();
                        return;
                    }
                    cm.askAndroid(ticketID, styleIDs, "請選擇適合你機器人的臉型。");
                } else {
                    cm.sendYesNo("使用一般券的話，會隨機出現臉型…使用#b#t" + ticketID + "##k要改變機器人的臉型嗎？");
                }
                break;
            case 3:
                if (!cm.haveItem(ticketID)) {
                    cm.sendOk("要有皮膚管理券，才可使用。");
                    cm.dispose();
                    return;
                }
                if (styleIDs.length < selection || cm.setAvatarA(ticketID, styleIDs[selection]) == -1) {
                    cm.sendOk("發生未知錯誤");
                } else {
                    cm.sendOk("完成了,讓朋友們讚歎你機器人的新膚色吧!");
                }
                cm.dispose();
                break;
            case 4:
                if (royalCards.length <= 0) {
                    cm.dispose();
                    cm.enterCS();
                    return;
                }
                if (ticketID == -1) {
                    if (royalCards.indexOf(selection) == -1) {
                        cm.sendOk("發生未知錯誤");
                        cm.dispose();
                        return;
                    }
                    ticketID = selection;
                }
                var sStyle = "";
                var gStyle = cm.gachaponItem(ticketID, cm.getAndroidStat("GENDER"));
                var nStyle = gStyle != null ? (parseInt(gStyle.getItemId() / 10) * 10 + cm.getAndroidStat("HAIR") % 10) : 0;
                if (gStyle == null || !cm.canChangeHair(nStyle)) {
                    cm.sendOk("發生未知錯誤");
                    cm.dispose();
                    return;
                }
                if (cm.setAvatarA(ticketID, nStyle) == -1) {
                    cm.sendOk("發生未知錯誤");
                } else {
                    sStyle += "#t" + nStyle + "#";
                    if (gStyle.isSmega()) {
                        cm.dropGachaponMsg(royalCardID, nStyle);
                    }
                    cm.sendNext("如何?這是最新流行的#b" + sStyle + "#k!用起來真的很好看耶?哈哈哈,也是啦,我的手藝還會不好嗎~還需要什麼的話請隨時來找我,呵呵");
                }
                break;
            case 5:
                if (royalCards.length <= 0) {
                    cm.dispose();
                    cm.enterCS();
                    return;
                }
                if (ticketID == -1) {
                    if (royalCards.indexOf(selection) == -1) {
                        cm.sendOk("發生未知錯誤");
                        cm.dispose();
                        return;
                    }
                    ticketID = selection;
                }
                var sStyle = "";
                var gStyle = cm.gachaponItem(ticketID, cm.getAndroidStat("GENDER"));
                var nStyle = gStyle != null ? (parseInt(gStyle.getItemId() / 1000) * 1000 + gStyle.getItemId() % 100 + parseInt(cm.getAndroidStat("FACE") % 1000 / 100)) : 0;
                if (gStyle == null || !cm.canChangeFace(nStyle)) {
                    cm.sendOk("發生未知錯誤");
                    cm.dispose();
                    return;
                }
                if (cm.setAvatarA(ticketID, nStyle) == -1) {
                    cm.sendOk("發生未知錯誤");
                } else {
                    sStyle += "#t" + nStyle + "#";
                    if (gStyle.isSmega()) {
                        cm.dropGachaponMsg(royalCardID, nStyle);
                    }
                    cm.sendNext("如何?這是最新流行的#b" + sStyle + "#k!用起來真的很好看耶?哈哈哈,也是啦,我的手藝還會不好嗎~還需要什麼的話請隨時來找我,呵呵");
                }
                break;
            case 6:
                if (ticketID == -1) {
                    if (royalCards.indexOf(selection) == -1) {
                        cm.sendOk("發生未知錯誤");
                        cm.dispose();
                        return;
                    }
                    ticketID = selection;
                }
                var sStyle = "";
                var nStyle = parseInt(cm.getAndroidStat("FACE") / 1000) * 1000 + cm.getAndroidStat("FACE") % 100 + (ticketID - 5152100) * 100;
                if (!cm.canChangeFace(nStyle)) {
                    cm.sendOk("發生未知錯誤");
                    cm.dispose();
                    return;
                }
                if (cm.setAvatarA(ticketID, nStyle) == -1) {
                    cm.sendOk("發生未知錯誤");
                } else {
                    cm.sendNext("隱形眼鏡佩戴好了");
                }
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (salonType) {
            case 0:
                if (5150043 == ticketID) {
                    if (!cm.haveItem(ticketID)) {
                        cm.sendOk("沒有攜帶高級髮型券，故無法進行。");
                        cm.dispose();
                        return;
                    }
                    if (styleIDs.length < selection || cm.setAvatarA(ticketID, styleIDs[selection]) == -1) {
                        cm.sendOk("發生未知錯誤");
                    } else {
                        cm.sendOk("享受你機器人的新髮型吧!");
                    }
                } else {
                    if (!cm.haveItem(ticketID)) {
                        cm.sendOk("嗯…如果沒有一般髮型券的話，就無法變更髮型。");
                        cm.dispose();
                        return;
                    }
                    var style = cm.getAndroidStat("HAIR");
                    var gStyle = cm.gachaponItem(ticketID, cm.getAndroidStat("GENDER"));
                    var nStyle = gStyle != null ? (Math.floor(gStyle.getItemId() / 10) * 10 + style % 10) : 0;
                    if (gStyle == null || !cm.canChangeHair(nStyle)) {
                        cm.sendOk("發生未知錯誤");
                        cm.dispose();
                        return;
                    }
                    if (cm.setAvatarA(ticketID, nStyle) == -1) {
                        cm.sendOk("發生未知錯誤");
                    } else {
                        cm.sendOk("享受你機器人的新髮型吧!");
                    }
                }
                break;
            case 1:
                if (5151033 == ticketID) {
                    if (!cm.haveItem(ticketID)) {
                        cm.sendOk("沒有高級染髮券，無法使用");
                        cm.dispose();
                        return;
                    }
                    if (styleIDs.length < selection || cm.setAvatarA(ticketID, styleIDs[selection]) == -1) {
                        cm.sendOk("發生未知錯誤");
                    } else {
                        cm.sendOk("享受你機器人的新髮色吧!");
                    }
                } else {
                    if (!cm.haveItem(ticketID)) {
                        cm.sendOk("沒有一般染色券，故無法使用");
                        cm.dispose();
                        return;
                    }
                    var styleColor = cm.getAndroidStat("HAIR");
                    var currentstylecolo = Math.floor(styleColor / 10) * 10;
                    styleIDs = [];
                    for (var i = 0; i < 8; i++) {
                        styleIDs[i] = currentstylecolo + i;
                    }
                    styleIDs = cm.getCanHair(styleIDs);
                    if (styleIDs.length <= 0) {
                        cm.sendOk("沒有可更換的髮型數據");
                        cm.dispose();
                        return;
                    }
                    var nStyle = styleIDs[Math.floor(Math.random() * styleIDs.length)];
                    if (cm.setAvatarA(ticketID, nStyle) == -1) {
                        cm.sendOk("發生未知錯誤");
                    } else {
                        cm.sendOk("享受你機器人的新髮色吧!");
                    }
                }
                break;
            case 2:
                if (5152050 == ticketID) {
                    if (!cm.haveItem(ticketID)) {
                        cm.sendOk("沒有高級整形券，無法使用");
                        cm.dispose();
                        return;
                    }
                    if (styleIDs.length < selection || cm.setAvatarA(ticketID, styleIDs[selection]) == -1) {
                        cm.sendOk("發生未知錯誤");
                    } else {
                        cm.sendOk("享受你機器人的新臉型吧!");
                    }
                } else {
                    if (!cm.haveItem(ticketID)) {
                        cm.sendOk("沒有一般整形券，故無法使用");
                        cm.dispose();
                        return;
                    }
                    var style = cm.getAndroidStat("FACE");
                    var gStyle = cm.gachaponItem(ticketID, cm.getAndroidStat("GENDER"));
                    var nStyle = gStyle != null ? (Math.floor(gStyle.getItemId() / 1000) * 1000 + gStyle.getItemId() % 100 + Math.floor(style % 1000 / 100) * 100) : 0;
                    if (gStyle == null || !cm.canChangeFace(nStyle)) {
                        cm.sendOk("發生未知錯誤");
                        cm.dispose();
                        return;
                    }
                    if (cm.setAvatarA(ticketID, nStyle) == -1) {
                        cm.sendOk("發生未知錯誤");
                    } else {
                        cm.sendOk("享受你機器人的新臉型吧!");
                    }
                }
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}