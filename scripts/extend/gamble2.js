var Icon ="#fEffect/ItemEff/1112811/0/0#";//黃金音符GuildMark/Mark/Animal/00002006/16#";
var ttt = "#fUI/UIWindow.img/Quest/icon9/0#";
var xxx = "#fUI/UIWindow.img/Quest/icon8/0#";
var sss = "#fUI/UIWindow.img/QuestIcon/3/0#";
var status = 0;
var cost = 10000;
var jilv = 0;
var costa;
var xx = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("#b好的,下次再見.");
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("#b好的,下次再見.");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            var add = Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + Icon + "\r\n";
            add += "                    歡迎來到#e#r"+cm.getChannelServer().getServerName()+"\r\n";
            add += "                #e#b#v2028040#糖服#r博彩系統#v2028040##k\r\n";
            add += "一個強大遊戲,就要擁有最全面的功能,本服特色多多,時尚全面,";
            add += "為您打造一個冒險之家的感覺,喜歡的朋友記得帶上朋友一起哦.\r\n\r\n ";
            add += "" + xxx + "-增加下注請點#e#b[加注]#n#k\r\n ";
            add += "" + xxx + "-加倍賭博賠率由左到右賠率遞增,獎金增加概率降低.\r\n ";
            add += "" + xxx + "-當前下注押金:#b<#e#r 楓點賭博 #n#b>#b<#e#r " + cost + " 楓點#n#b >#k\r\n ";
            add += "" + xxx + "-當前您擁有楓點：" + cm.getNX(2) + ".#k\r\n";
            add += "#L0#" + ttt + "-[#r加注#k]#l"+"#L5#" + ttt + "-[#r加重注#k]#l\r\n\r\n";
            add += "#L1#" + ttt + "-[#b1:1倍賠率#k]#l";
            add += "#L2#" + ttt + "-[#b1:2倍賠率#k]#l";
            add += "#L3#" + ttt + "-[#b1:3倍賠率#k]#l";
            cm.sendSimpleS(add, 2);
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendOk("#b成功加注#r5000楓點#b,請點確定後查看.");
                cost = cost + 5000
                status = -1;
            }else if (selection == 5) {
                cm.sendOk("#b成功加注#r50000楓點#b,請點確定後查看.");
                cost = cost + 50000
                status = -1;
            } else if (selection == 1) {
                var add = "#b<#e#r 楓點賭博 #n#b>\r\n\r\n";
                add += "" + ttt + "-您選擇的是[#r賠率1:1#b].\r\n";
                add += "" + ttt + "-您的押注為[#r" + cost + "楓點#b].\r\n";
                add += "" + ttt + "-如果勝利將獲取[#r除本金外" + cost * 1 + "楓點#b]的獎勵.\r\n";
                add += "" + ttt + "-點擊[#r是#b]開始賭博,點擊[#r不是#b]放棄賭博.";
                cm.sendYesNo(add);
                jilv = 1;
                xx = 0
            } else if (selection == 2) {
                var add = "#b<#e#r 楓點賭博 #n#b>\r\n\r\n";
                add += "" + ttt + "-您選擇的是[#r賠率1:2#b].\r\n";
                add += "" + ttt + "-您的押注為[#r" + cost + "楓點#b].\r\n";
                add += "" + ttt + "-如果勝利將獲取[#r除本金外" + cost * 2 + "楓點#b]的獎勵.\r\n";
                add += "" + ttt + "-點擊[#r是#b]開始賭博,點擊[#r不是#b]放棄賭博.";
                cm.sendYesNo(add);
                jilv = 2;
                xx = 0
            } else if (selection == 3) {
                var add = "#b<#e#r 楓點賭博 #n#b>\r\n\r\n";
                add += "" + ttt + "-您選擇的是[#r賠率1:3#b].\r\n";
                add += "" + ttt + "-您的押注為[#r" + cost + "楓點#b].\r\n";
                add += "" + ttt + "-如果勝利將獲取[#r除本金外" + cost * 3 + "楓點#b]的獎勵.\r\n";
                add += "" + ttt + "-點擊[#r是#b]開始賭博,點擊[#r不是#b]放棄賭博.";
                cm.sendYesNo(add);
                jilv = 3;
                xx = 0
            }
        } else if (status == 2) {
            if (xx == 0) {
                if (jilv == 0) {} else if (jilv != 0) {
                    if (cm.getNX(2) < cost) {
                        cm.sendOk("#b您的楓點不足,不能參加賭博.....");
                        status = -1;
                    } else {
                        jiaru = GetRandomNum(0, jilv);
                        if (jiaru == 0) {
                            costa = cost * jilv
                            cm.gainNX(2, costa);
                            cm.worldSpouseMessage(0x0D, "[博彩公告]:" + "  恭喜玩家：" + cm.getPlayer().getName() + " 在楓點博彩中贏得" + costa + "楓點。");
                            cm.sendOk("#b恭喜,您已經大獲全勝...");
                            status = -1;
                        } else {
                            cm.gainNX(2, -cost);
                            cm.sendOk("#b悲劇啊.你輸了....");
                            status = -1;
                        }
                    }
                }
            }
        }
    }
}
