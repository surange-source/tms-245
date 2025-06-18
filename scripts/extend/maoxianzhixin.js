var status = 0;
var typed=0;
var j = java.lang.Math.floor(Math.random() * 10);
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#k>活動目標：#b<合成冒險之心>#k\r\n\r\n>活動獎勵：初代、封印、甦醒、覺醒、冒險之心\r\n\r\n#k>合成概率：合成任何一款冒險之心項鏈成功概率為50%#k\r\n\r\n#b#L1#"+xxx+"初代冒險之心#l          #v1122019#\r\n#L2#"+xxx+"封印的初代冒險之心#l    #v1122024#\r\n#L3#"+xxx+"甦醒的初代冒險之心#l    #v1122029#\r\n#L4#"+xxx+"覺醒的初代冒險之心#l    #v1122034#");
        } else if (status == 1) {
            if (selection == 1) {
            cm.sendSimple("#k>活動目標：#b<合成冒險之心>#k\r\n\r\n>活動獎勵：初代冒險之心\r\n#b#L1#全職業初代冒險之心#l");
            } else if (selection == 2) {
            typed=3;
            cm.sendSimple("#k>活動目標：#b<合成冒險之心>#k\r\n\r\n>活動獎勵：封印的初代冒險之心\r\n#b            #L2#"+xxx+"劍士封印的初代冒險之心#l\r\n#L3#"+xxx+"法師封印的初代冒險之心#l #L4#"+xxx+"弓手封印的初代冒險之心\r\n#L5#"+xxx+"盜賊封印的初代冒險之心#l #L6#"+xxx+"海盜封印的初代冒險之心#l");
            } else if (selection == 3) {
            typed=4;
            cm.sendSimple("#k>活動目標：#b<合成冒險之心>#k\r\n\r\n>活動獎勵：甦醒的初代冒險之心\r\n#b            #L2#"+xxx+"劍士甦醒的初代冒險之心#l\r\n#L3#"+xxx+"法師甦醒的初代冒險之心#l #L4#"+xxx+"弓手甦醒的初代冒險之心\r\n#L5#"+xxx+"盜賊甦醒的初代冒險之心#l #L6#"+xxx+"海盜甦醒的初代冒險之心#l");
            } else if (selection == 4) {
            typed=5;
            cm.sendSimple("#k>活動目標：#b<合成冒險之心>#k\r\n\r\n>活動獎勵：覺醒的初代冒險之心\r\n#b            #L2#"+xxx+"劍士覺醒的初代冒險之心#l\r\n#L3#"+xxx+"法師覺醒的初代冒險之心#l #L4#"+xxx+"弓手覺醒的初代冒險之心\r\n#L5#"+xxx+"盜賊覺醒的初代冒險之心#l #L6#"+xxx+"海盜覺醒的初代冒險之心#l");
            }
        } else if (status == 2) {
        if(selection == 1){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4001221) >=1 && cm.itemQuantity(4001222) >=1 && cm.itemQuantity(4001223) >=1 && cm.itemQuantity(4001224) >=1 && cm.itemQuantity(4001225) >=1 && cm.itemQuantity(4032177) >=1) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4001221, -1);
                    cm.gainItem(4001222, -1);
                    cm.gainItem(4001223, -1);
                    cm.gainItem(4001224, -1);
                    cm.gainItem(4001225, -1);
                    cm.gainItem(4032177, -1);
                    if(j <= 4){
                    cm.gainItem(1122019, 1);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了全職業初代冒險之心，大家恭喜他(她)。");
                    } else {
                    cm.worldMessage(cm.getChar().getName() + "合成全職業初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) \r\n#i4001221#(#c4001221#/1) #i4001222#(#c4001222#/1) #i4001223#(#c4001223#/1) #i4001224#(#c4001224#/1) #i4001225#(#c4001225#/1) ");
                    cm.dispose();
        }
        }
        if (typed == 3) {
        if (selection == 2) {
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001226) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001226, -5);
                    if(j <= 4){
                    cm.gainItem(1122024, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了劍士職業封印的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成劍士職業封印的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001226#(#c4001226#/5)");
                    cm.dispose();
        }
        } else if(selection == 3){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001227) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001227, -5);
                    if(j <= 4){
                    cm.gainItem(1122025, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了魔法師職業封印的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成魔法師職業封印的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001227#(#c4001227#/5)");
                    cm.dispose();
        }
        } else if(selection == 4){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001228) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001228, -5);
                    if(j <= 4){
                    cm.gainItem(1122026, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了弓手職業封印的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成弓手職業封印的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c403277#/1) #i4001228#(#c4001228#/5)");
                    cm.dispose();
        }
        } else if(selection == 5){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001229) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001229, -5);
                    if(j <= 4){
                    cm.gainItem(1122027, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了盜賊職業封印的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成盜賊職業封印的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001229#(#c4001229#/5)");
                    cm.dispose();
        }
        } else if(selection == 6){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001230) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001230, -5);
                    if(j <= 4){
                    cm.gainItem(1122028, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了海盜職業封印的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成海盜職業封印的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001230#(#c4001230#/5)");
                    cm.dispose();
        }
        }
        }
        if (typed == 4) {
        if (selection == 2) {
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001226) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001226, -5);
                    if(j <= 4){
                    cm.gainItem(1122029, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了劍士職業甦醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成劍士職業甦醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001226#(#c4001226#/5)");
                    cm.dispose();
        }
        } else if(selection == 3){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001227) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001227, -5);
                    if(j <= 4){
                    cm.gainItem(1122030, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了魔法師職業甦醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成魔法師職業甦醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001227#(#c4001227#/5)");
                    cm.dispose();
        }
        } else if(selection == 4){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001228) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001228, -5);
                    if(j <= 4){
                    cm.gainItem(1122031, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了弓手職業甦醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成弓手職業甦醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001228#(#c4001228#/5)");
                    cm.dispose();
        }
        } else if(selection == 5){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001229) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001229, -5);
                    if(j <= 4){
                    cm.gainItem(1122032, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了盜賊職業甦醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成盜賊職業甦醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001229#(#c4001229#/5)");
                    cm.dispose();
        }
        } else if(selection == 6){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001230) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001230, -5);
                    if(j <= 4){
                    cm.gainItem(1122033, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了海盜職業甦醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成海盜職業甦醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001230#(#c4001230#/5)");
                    cm.dispose();
        }
        }
        }
        if (typed == 5) {
        if (selection == 2) {
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001558) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001558, -7);
                    if(j <= 4){
                    cm.gainItem(1122034, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了劍士職業覺醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成劍士職業覺醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001558#(#c4001558#/7)");
                    cm.dispose();
        }
        } else if(selection == 3){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001559) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001559, -7);
                    if(j <= 4){
                    cm.gainItem(1122035, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了魔法師職業覺醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成魔法師職業覺醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001559#(#c4001559#/7)");
                    cm.dispose();
        }
        } else if(selection == 4){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001560) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001560, -7);
                    if(j <= 4){
                    cm.gainItem(1122036, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了弓手職業覺醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成弓手職業覺醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001560#(#c4001560#/7)");
                    cm.dispose();
        }
        } else if(selection == 5){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001561) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001561, -7);
                    if(j <= 4){
                    cm.gainItem(1122037, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了盜賊職業覺醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成盜賊職業覺醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001561#(#c4001561#/7)");
                    cm.dispose();
        }
        } else if(selection == 6){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001562) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001562, -7);
                    if(j <= 4){
                    cm.gainItem(1122038, 1,30);
                    cm.worldMessage(cm.getChar().getName() + "成功合成了海盜職業覺醒的初代冒險之心，大家恭喜他(她)。");
                    }else{
                    cm.worldMessage(cm.getChar().getName() + "合成海盜職業覺醒的初代冒險之心失敗了，大家默哀他(她)。");
                    }
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001562#(#c4001562#/7)");
                    cm.dispose();
        }
        }
            }
        }
    }
}