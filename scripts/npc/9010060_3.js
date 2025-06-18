var status = 0;
var typede = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        if (status == 0) {
            var text = "";
            text = "#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n部分技能收取楓幣,請瞭解後在進行學習。\r\n";
            text += "#L14##r瞭解以下技能特效(#e新人必看#n)#l\r\n";
            //#L1##b學習騎術#l
            text += "#L2##b學習群寵#l #L3##b學習鍛造#l #L5##b學習匠人之魂#l\r\n";
            text += "#L9##b學習御龍魔飛行技能 (全職業可學)#l\r\n";
            text += "#L4##b學習英雄之回聲     (全職業可學)#l\r\n";
            text += "#L6##b學習聯盟的意志     (全職業可學)#l\r\n";
            text += "#L8##b學習好用的輕功     (全職業可學)#l\r\n";
            text += "#L7##b學習高貴精神       (騎士團可學)#l\r\n";
            text += "#L10##b學習女皇的呼喚     (騎士團可學)#l\r\n";
            text += "#L11##b學習女皇的祈禱     (騎士團、米哈兒可學)#l\r\n";
            text += "#L12##b學習找回的記憶     (狂狼勇士職業可學)#l\r\n";
            text += "#L13##b學習繼承的意志     (龍魔導士職業可學)#l\r\n";
            cm.sendSimple(text);

        } else if (selection == 14) {
            cm.sendOk("#fMob/1210102.img/move/0##fMob/1210102.img/move/0##b追憶 - MS#fMob/1210102.img/move/0##fMob/1210102.img/move/0##k\r\n技能特效如下:\r\n#b0、龍魔導士技能-繼承的意志特效如下:#k\r\n永久性提高魔法攻擊力10、魔法防禦力300、HP增加15%、所有屬性加10、BOSS傷害增加5% 需要支付#b500萬楓幣#k才可學習。\r\n#b1、狂狼勇士技能-找回的記憶特效如下:#k\r\n永久性提高攻擊力10、物理防禦力300、移動速度10、暴擊率%5、BOSS傷害增加5%、需要支付#b500萬楓幣#k才可學習。\r\n#b2、騎士團技能-女皇的呼喚特效如下:#k\r\n在2小時內物理攻擊力和魔法攻擊力同時提高4%,需要支付#b500萬楓幣#k才可學習。\r\n#b3、全職業技能-聯盟的意志特效如下:#k\r\n永久性提高力量5點、敏捷5點、智力5點、運氣5點、攻擊力5點、魔法攻擊力5、需要支付#b500萬楓幣#k才可學習。\r\n#b4、騎士團技能-女皇的祈禱特效如下:#k\r\n永久性提高最大PH和MP%20,需要支付#b500萬楓幣#k才可學習。\r\n#b5、全職業技能-英雄之回聲特效如下:#k\r\n在40分鐘內增加物理攻擊力2%、增加魔法攻擊力2%、冷卻時間2小時、需要支付#b500萬楓幣#k才可學習。\r\n#b6、全職業技能-好用的輕功特效如下:#k\r\n在200秒內移動速度提高20、跳躍力提高10、需要支付#b300楓幣#k才可學習。\r\n#b7、騎士團技能-高貴精神特效如下:#k\r\n提高女皇的祝福最高等級7、需要等級#b5級以上#k才可學習。");
            cm.dispose();
        } else if (selection == 1) {
             if (cm.getMeso() <= 1500000) {
                cm.sendOk("由於騎寵技能的特殊性需要支付150萬楓幣才可以學習,您目前沒有足夠的楓幣。");
            } else if (cm.getPlayer().getLevel() >= 70) {
                cm.gainMeso( - 1500000);
                cm.teachSkill(80001000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("您現在的等級條件還不能學習騎寵技能,需要70級才可以學習。");
            }
            cm.dispose();
        } else if (selection == 2) {
             if (cm.getPlayer().getSkillLevel(8) > 0 || cm.getPlayer().getSkillLevel(10000018) > 0 || cm.getPlayer().getSkillLevel(20000024) > 0 || cm.getPlayer().getSkillLevel(20011024) > 0) {
                cm.sendOk("您已經學習過這個技能。");
            } else if (cm.getMeso() <= 500000) {
                cm.sendOk("由於群寵技能的特殊性需要支付#b10萬#k楓幣才可以學習,您目前沒有足夠的楓幣。");
            } else if (cm.getPlayer().getLevel() <= 50) {
                cm.sendOk("您現在的等級條件還不能學習群寵技能,需要50級才可以學習。");
            } else if (cm.getJobId() >= 0 && cm.getJobId() <= 532) { //冒險家
                cm.gainMeso( - 100000);
                cm.teachSkill(8, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) { //龍魔導士
                    cm.gainMeso( - 100000);
                    cm.teachSkill(20011024, 1, 1);
                    cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) { //騎士團
                    cm.gainMeso( - 100000);
                    cm.teachSkill(10000018, 1, 1);
                    cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) { //狂狼勇士
                    cm.gainMeso( - 100000);
                    cm.teachSkill(20000024, 1, 1);
                    cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
             } else {
                cm.sendOk("學習此項技能中沒有符合您的職業群,您可以嘗試做官方任務獲得該技能。");
            }
            cm.dispose();
        } else if (selection == 3) {
            if (cm.getPlayer().getLevel() <= 45) {
                cm.sendOk("您現在的等級條件還不能學習鍛造技能,需要45級才可以學習。");
                } else if (cm.getJobId() >= 100 && cm.getJobId() <= 512) {//冒險家    
                cm.teachSkill(1007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {//騎士團
                cm.teachSkill(10001007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) {//狂狼勇士
                cm.teachSkill(20001007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) {//龍魔導士
                cm.teachSkill(20011007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3000 && cm.getJobId() <= 3512) {//反抗者
                cm.teachSkill(30001007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 5100 && cm.getJobId() <= 5112) {//米哈逸
                cm.teachSkill(50001007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6100 && cm.getJobId() <= 6112) {//凱撒
                cm.teachSkill(60001007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6500 && cm.getJobId() <= 6512) {//天使破壞者
                cm.teachSkill(60011007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3600 && cm.getJobId() <= 3612) {//傑諾
                cm.teachSkill(30021007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2700 && cm.getJobId() <= 2712) {//夜光
                cm.teachSkill(20041007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2300 && cm.getJobId() <= 2312) {//精靈遊俠
                cm.teachSkill(20021007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2400 && cm.getJobId() <= 2412) {//幻影俠盜
                cm.teachSkill(20031007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3100 && cm.getJobId() <= 3112) {// 惡魔殺手
                cm.teachSkill(30011007, 3, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習此項技能中沒有符合您的職業群,您可以嘗試做官方任務獲得該技能。");
            }
            cm.dispose();
        } else if (selection == 4) {
            if (cm.getMeso() <= 5000000) {
                cm.sendOk("由於英雄之回聲技能的特殊性需要支付#b500萬楓幣#k才可以學習,您目前沒有足夠的楓幣。");
            } else if (cm.getPlayer().getLevel() <= 100) {
                cm.sendOk("您現在的等級條件還不能學習英雄之回聲技能,需要100級才可以學習。");
                } else if (cm.getJobId() >= 100 && cm.getJobId() <= 512) {//冒險家    
                cm.gainMeso( - 5000000);
                cm.teachSkill(1005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {//騎士團
                cm.gainMeso( - 5000000);
                cm.teachSkill(10001005, 1, 1);
                cm.teachSkill(10001215, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) {//狂狼勇士
                cm.gainMeso( - 5000000);
                cm.teachSkill(20001005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) {//龍魔導士
                cm.gainMeso( - 5000000);
                cm.teachSkill(20011005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3000 && cm.getJobId() <= 3512) {//反抗者
                cm.gainMeso( - 5000000);
                cm.teachSkill(30001005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 5100 && cm.getJobId() <= 5112) {//米哈逸
                cm.gainMeso( - 5000000);
                cm.teachSkill(50001005, 1, 1);
                cm.teachSkill(50001215, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3600 && cm.getJobId() <= 3612) {//傑諾
                cm.gainMeso( - 5000000);
                cm.teachSkill(30021005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2700 && cm.getJobId() <= 2712) {//夜光
                cm.gainMeso( - 5000000);
                cm.teachSkill(20041005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2300 && cm.getJobId() <= 2312) {//精靈遊俠
                cm.gainMeso( - 5000000);
                cm.teachSkill(20021005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2400 && cm.getJobId() <= 2412) {//幻影俠盜
                cm.gainMeso( - 5000000);
                cm.teachSkill(20031005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3100 && cm.getJobId() <= 3112) {// 惡魔殺手
                cm.gainMeso( - 5000000);
                cm.teachSkill(30011005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                
            } else {
                cm.sendOk("學習此項技能中沒有符合您的職業群,您可以嘗試做官方任務獲得該技能。");
            }
            cm.dispose();
        } else if (selection == 5) {
            if (cm.getPlayer().getLevel() <= 150) {
                cm.sendOk("您現在的等級條件還不能學習匠人之魂技能,需要150級才可以學習。");
                } else if (cm.getJobId() >= 100 && cm.getJobId() <= 512) {//冒險家
                cm.teachSkill(1003, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {//騎士團
                cm.teachSkill(10001005, 1, 1);
                cm.teachSkill(10001215, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) {//狂狼勇士
                cm.teachSkill(20001005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) {//龍魔導士
                cm.teachSkill(20011005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3000 && cm.getJobId() <= 3512) {//反抗者
                cm.teachSkill(30001005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 5100 && cm.getJobId() <= 5112) {//米哈逸
                cm.teachSkill(50001005, 1, 1);
                cm.teachSkill(50001215, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3600 && cm.getJobId() <= 3612) {//傑諾
                cm.teachSkill(30021005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2700 && cm.getJobId() <= 2712) {//夜光
                cm.teachSkill(20041005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2300 && cm.getJobId() <= 2312) {//精靈遊俠
                cm.teachSkill(20021005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2400 && cm.getJobId() <= 2412) {//幻影俠盜
                cm.teachSkill(20031005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3100 && cm.getJobId() <= 3112) {// 惡魔殺手
                cm.teachSkill(30011005, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                
            } else {
                cm.sendOk("學習此項技能中沒有符合您的職業群,您可以嘗試做官方任務獲得該技能。");
            }
            cm.dispose();
        } else if (selection == 6) {
            if (cm.getMeso() <= 50000000) {
                cm.sendOk("由於聯盟的意志技能的特殊性需要支付#b500萬楓幣#k才可以學習.您目前沒有足夠的#b楓幣#k。");
              } else if (cm.getPlayer().getLevel() <= 150) {
                cm.sendOk("您現在的等級條件還不能學習聯盟的意志技能,需要150級才可以學習。");
                } else if (cm.getJobId() >= 5100 && cm.getJobId() <= 5112) {//米哈逸
                cm.gainMeso( - 5000000);
                cm.teachSkill(50000190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6100 && cm.getJobId() <= 6112) {//凱撒
                cm.gainMeso( - 5000000);
                cm.teachSkill(60000190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6500 && cm.getJobId() <= 6512) {//天使破壞者
                cm.gainMeso( - 5000000);
                cm.teachSkill(60010190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3600 && cm.getJobId() <= 3612) {//傑諾
                cm.gainMeso( - 5000000);
                cm.teachSkill(30020190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2700 && cm.getJobId() <= 2712) {//夜光
                cm.gainMeso( - 5000000);
                cm.teachSkill(20040190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2400 && cm.getJobId() <= 2412) {//幻影俠盜
                cm.gainMeso( - 5000000);
                cm.teachSkill(20030190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 100 && cm.getJobId() <= 512) {//冒險家
                cm.gainMeso( - 5000000);
                cm.teachSkill(190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {//騎士團
                cm.gainMeso( - 5000000);
                cm.teachSkill(10000190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) {//狂狼勇士
                cm.gainMeso( - 5000000);
                cm.teachSkill(20000190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) {//龍魔導士
                cm.gainMeso( - 5000000);
                cm.teachSkill(20010190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3000 && cm.getJobId() <= 3512) {//反抗者
                cm.gainMeso( - 5000000);
                cm.teachSkill(30000190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2300 && cm.getJobId() <= 2312) {//精靈遊俠
                cm.gainMeso( - 5000000);
                cm.teachSkill(20020190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3100 && cm.getJobId() <= 3112) {// 惡魔殺手
                cm.gainMeso( - 5000000);
                cm.teachSkill(30010190, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                
            } else {
                cm.sendOk("學習此項技能中沒有符合您的職業群,您可以嘗試做官方任務獲得該技能。");
            }
            cm.dispose();
        } else if (selection == 7) {
            if (cm.getPlayer().getLevel() <= 5) {
            cm.sendOk("您現在的等級條件還不能學習高貴精神技能,需要5級才可以學習。");
            } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {// 騎士團
                cm.teachSkill(10000202, 6, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習高貴的精神技能只有騎士團職業群才可以學習。");
            }
            cm.dispose();
        } else if (selection == 8) {
            if (cm.getMeso() <= 3000000) {
                cm.sendOk("由於好用的輕功技能的特殊性需要支付#b300萬楓幣#k才可以學習,您目前沒有足夠的楓幣。");
            } else if (cm.getPlayer().getLevel() <= 70) {
                cm.sendOk("您現在的等級條件還不能學習好用的輕功技能,需要70級才可以學習。");
                } else if (cm.getJobId() >= 100 && cm.getJobId() <= 512) {//冒險家
                cm.gainMeso( - 3000000);
                cm.teachSkill(8000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {//騎士團
                cm.gainMeso( - 3000000);
                cm.teachSkill(10008000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) {//狂狼勇士
                cm.gainMeso( - 3000000);
                cm.teachSkill(20008000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) {//龍魔導士
                cm.gainMeso( - 3000000);
                cm.teachSkill(20018000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3000 && cm.getJobId() <= 3512) {//反抗者
                cm.gainMeso( - 3000000);
                cm.teachSkill(30008000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 5100 && cm.getJobId() <= 5112) {//米哈逸
                cm.gainMeso( - 3000000);
                cm.teachSkill(50008000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6100 && cm.getJobId() <= 6112) {//凱撒
                cm.gainMeso( - 3000000);
                cm.teachSkill(60008000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6500 && cm.getJobId() <= 6512) {//天使破壞者
                cm.gainMeso( - 3000000);
                cm.teachSkill(60018000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3600 && cm.getJobId() <= 3612) {//傑諾
                cm.gainMeso( - 3000000);
                cm.teachSkill(30028000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2700 && cm.getJobId() <= 2712) {//夜光
                cm.gainMeso( - 3000000);
                cm.teachSkill(20048000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2300 && cm.getJobId() <= 2312) {//精靈遊俠
                cm.gainMeso( - 3000000);
                cm.teachSkill(20028000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2400 && cm.getJobId() <= 2412) {//幻影俠盜
                cm.gainMeso( - 3000000);
                cm.teachSkill(20038000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3100 && cm.getJobId() <= 3112) {// 惡魔殺手
                cm.gainMeso( - 3000000);
                cm.teachSkill(30018000, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習此項技能中沒有符合您的職業群,您可以嘗試做官方任務獲得該技能。");
            }
            cm.dispose();
        } else if (selection == 9) {
            if (cm.getMeso() <= 1000000) {
                cm.sendOk("由於飛翔技能的特殊性需要支付#b100萬楓幣#k才可以學習,您目前沒有足夠的楓幣。");
               } else if (cm.getPlayer().getLevel() <= 120) {
               cm.sendOk("您現在的等級條件還不能學習飛翔技能,需要120級才可以學習。"); 
                } else if (cm.getJobId() >= 100 && cm.getJobId() <= 512) {//冒險家
                cm.gainMeso( - 1000000);
                cm.teachSkill(1026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快11。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {//騎士團
                cm.gainMeso( - 1000000);
                cm.teachSkill(10001026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) {//狂狼勇士
                cm.gainMeso( - 1000000);
                cm.teachSkill(20001026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) {//龍魔導士
                cm.gainMeso( - 1000000);
                cm.teachSkill(20011026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3000 && cm.getJobId() <= 3512) {//反抗者
                cm.gainMeso( - 1000000);
                cm.teachSkill(30001026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 5100 && cm.getJobId() <= 5112) {//米哈逸
                cm.gainMeso( - 1000000);
                cm.teachSkill(50001026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6100 && cm.getJobId() <= 6112) {//凱撒
                cm.gainMeso( - 1000000);
                cm.teachSkill(60001026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 6500 && cm.getJobId() <= 6512) {//天使破壞者
                cm.gainMeso( - 1000000);
                cm.teachSkill(60011026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3600 && cm.getJobId() <= 3612) {//傑諾
                cm.gainMeso( - 1000000);
                cm.teachSkill(30021026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2700 && cm.getJobId() <= 2712) {//夜光
                cm.gainMeso( - 1000000);
                cm.teachSkill(20041026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2300 && cm.getJobId() <= 2312) {//精靈遊俠
                cm.gainMeso( - 1000000);
                cm.teachSkill(20021026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 2400 && cm.getJobId() <= 2412) {//幻影俠盜
                cm.gainMeso( - 1000000);
                cm.teachSkill(20031026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 3100 && cm.getJobId() <= 3112) {// 惡魔殺手
                cm.gainMeso( - 1000000);
                cm.teachSkill(30011026, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習此項技能中沒有符合您的職業群,您可以嘗試做官方任務獲得該技能。");
            }
            
            cm.dispose();
        } else if (selection == 10) {
            if (cm.getPlayer().getLevel() <= 100) {
                cm.sendOk("您現在的等級條件還不能學習女皇的呼喚技能,需要100級才可以學習。");
            } else if (cm.getMeso() <= 5000000) {
                cm.sendOk("由於女皇的呼喚技能的特殊性需要支付#b500萬楓幣#k才可以學習,您目前沒有足夠的#b楓幣#k。");
            } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {
                cm.gainMeso( - 5000000);
                cm.teachSkill(10000074, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習女皇的呼喚技能只有騎士團職業群才可以學習。");
            }
            cm.dispose();
        } else if (selection == 11) {
             if (cm.getPlayer().getLevel() <= 100) {
                cm.sendOk("您現在的等級條件還不能學習女皇的祈禱技能,需要100級才可以學習。");
            } else if (cm.getMeso() <= 5000000) {
                cm.sendOk("由於女皇的祈禱技能的特殊性需要支付#b500萬楓幣#k才可以學習,您目前沒有足夠的楓幣。");
                } else if (cm.getJobId() >= 1000 && cm.getJobId() <= 1512) {//騎士團
                cm.gainMeso( - 5000000);
                cm.teachSkill(10001075, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
                } else if (cm.getJobId() >= 5100 && cm.getJobId() <= 5112) {//米哈逸
                cm.gainMeso( - 5000000);
                cm.teachSkill(50001075, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習女皇的祈禱技能只有騎士團和米哈逸職業群才可以學習。");
            }
            cm.dispose();
        } else if (selection == 12) {
            if (cm.getPlayer().getLevel() <=100) {
            cm.sendOk("您現在的等級條件還不能學習找回的記憶技能,需要100級才可以學習。");
            } else if (cm.getMeso() <= 5000000) {
            cm.sendOk("由於找回的記憶技能的特殊性需要支付#b500萬楓幣#k才可以學習,您目前沒有足夠的#b彩雲幣#k。");
            } else if (cm.getJobId() >= 2100 && cm.getJobId() <= 2112) {
                cm.gainMeso( - 5000000);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習找回的記憶技能只有狂狼勇士職業群才可以學習。");

            }
            cm.dispose();
        } else if (selection == 13) {
             if (cm.getPlayer().getLevel() < 120) {
                cm.sendOk("您現在的等級條件還不能學習繼承的意志技能,需要120級才可以學習。");
            } else if (cm.getMeso() <= 5000000) {
            cm.sendOk("由於繼承的意志技能的特殊性需要支付#b500萬楓幣#k才可以學習,您目前沒有足夠的#b彩雲幣#k。");
            } else if (cm.getJobId() >= 2200 && cm.getJobId() <= 2218) {
                cm.gainMeso( - 5000000);
                cm.teachSkill(20010194, 1, 1);
                cm.sendOk("恭喜您學習技能成功,祝您遊戲愉快。");
            } else {
                cm.sendOk("學習繼承的意志技能只有龍魔導士職業群才可以學習。");
            }
            cm.dispose();
        }
    }
}
