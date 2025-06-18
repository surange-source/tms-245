var typed = 0;

var itemList = Array(4000019,4000000,4000016);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var em = cm.getEventManager("Yzc");
    var eim = em.getInstance("Yzc");
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status==0) {
        if (cm.getPlayer().getMapId() == 700000200) {
            cm.sendOk("恭喜恭喜，有空去我的養豬場坐一坐。");
            cm.dispose();
            return;
        }
        if (eim.getProperty("gift") == 1) {
            cm.warp(910000000);
            cm.dispose();return;
        }
        if (em.getProperty("state")==2) {
            cm.sendSimple("嗯，真不錯，這下我的金豬安全了。這是一點心意你一定要收下。\r\n#b#L0#那我就不客氣了！#l");
        } else {
            cm.sendOk("加油啊，少年！");
            cm.dispose();
        }
    } else if (status == 1) {
        if (selection == 0) {
            eim.setProperty("gift", 1);
            cm.setPQLog("保衛金豬");
            var mobQuantity = eim.getProperty("pigcount");
            var nx = 1*mobQuantity+Math.floor(Math.random()*1000+1000);
            var nx2 = 1*mobQuantity*2+Math.floor(Math.random()*500+500);
            text = "#e#d<任務獎勵>#n#k\r\n你成功擊殺了"+mobQuantity+"只野豬。\r\n獎勵樂豆點：#b"+nx+"#k點\r\n獎勵楓點：#b"+nx2+"#k點\r\n";
            if (nx>2000)
                nx = 2000;
            if (nx2 > 5000)
                nx2 = 5000;
            cm.gainNX(1,nx);
            cm.gainNX(2,nx2);
            if (mobQuantity >= 100 && mobQuantity <= 300) {
                text+="獎勵道具：5個#b高級神奇方塊#k";
                cm.gainItem(5062002, 5);
            } else if (mobQuantity>300 && mobQuantity<=500) {
                text+="獎勵道具：10個#b高級神奇方塊#k";
                cm.gainItem(5062002, 10);
            } else if (mobQuantity>500) {
                text+="獎勵道具：10個#b高級神奇方塊#k,10個#b大師附加神奇方塊#k";
                if (mobQuantity>1000){
                    cm.gainItem(5062024,Math.floor(Math.random()*4)+1);
                }
                cm.gainItem(5062002, 10);
                cm.gainItem(5062500, 10);
            }
            text+="\r\n#b#L0#謝謝老闆，我先走一步。#l";
            cm.sendSimple(text);
        }
    } else if (status == 2) {
            cm.dispose();
            cm.warp(910000000);
            
    }
}