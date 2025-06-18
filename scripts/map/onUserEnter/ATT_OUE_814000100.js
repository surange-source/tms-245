/*
 Made by Pungin
 */

var status = -1;

function action(mode, type, selection) {
    if (mode > 0) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        ms.setInGameCurNodeEventEnd(true);
        ms.EnableUI(1, 0);
        ms.sendNextSNew("喔喔~ 這裡就是 '異世界'嗎? 看來是一個個非常和平的村莊? 話說怎麼在屋頂上啊…需要先去找個安全下去路線吧…", 0x39, 1);
    } else if (status == 1) {
        ms.setDelay(1000);
    } else if (status == 2) {
        ms.sendDirectionCameraMove(0, 4000, 3402, 184);
    } else if (status == 3) {
        ms.setDelay(1000);
    } else if (status == 4) {
        ms.sendNextSNew("啊! 那邊有個梯子，另外用那個爬下去到地上吧！", 0x39, 1);
    } else if (status == 5) {
        ms.trembleEffect(0, 300);
        ms.setDelay(1000);
    } else if (status == 6) {
        ms.sendDirectionCameraMove(1, 3000);
    } else if (status == 7) {
        ms.setDelay(1000);
    } else if (status == 8) {
        ms.sendNextSNew("哇啊！什麼啊！？", 0x39, 1);
    } else if (status == 9) {
        ms.sendDirectionCameraMove(0, 2000, -800, 184);
    } else if (status == 10) {
        ms.spawnMonster(9460029, -800, 395);
        ms.setDelay(2000);
    } else if (status == 11) {
        ms.sendDirectionCameraMove(1, 2000);
    } else if (status == 12) {
        ms.setDelay(1000);
    } else if (status == 13) {
        ms.sendNextSNew("到底是什麼什麼事情了？那是巨人？竟然在吃人！？不管如何這裡很危險！使用那梯子先逃吧！！", 0x39, 1);
    } else if (status == 14) {
        ms.killMob(9460029);
        ms.EnableUI(0);
        ms.warp(814000200, 0);
        ms.dispose();
    } else {
        ms.dispose();
    }
}