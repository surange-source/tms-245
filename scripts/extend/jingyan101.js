var status = 0;
var choice;
var scrolls = Array(
Array("新動物英雄團椅子", 3010737, 1500),
Array("新勇士們，我愛你~", 3011000, 2000),
Array("新Marry me椅子", 3010717, 1500),
Array("新森林中休息處椅子", 3010795, 1500),
Array("新巨無霸年夜飯椅子", 3010788, 2000),
Array("新驚人漫畫椅子", 3014000, 1500),
Array("新藍藍波尼小屋椅子", 3010783, 1500),
Array("新進化椅子", 3010664, 1500),
Array("新愛琴海椅子", 3012019, 1500),
Array("新滿目韓文椅子", 3010708, 1500),
Array("新金馬祥雲轎", 3010779, 1000),
Array("新抖動的舌頭椅子", 3010794, 1500),
Array("新堆王冠椅子", 3010714, 1500),
Array("新懲戒之月妙椅子", 3010704, 1500),
Array("新鯊魚激流勇進椅子", 3010690, 1500),
Array("新大黃鴨", 3010696, 1000),
Array("新桃櫻芳菲椅", 3010806, 1500),
Array("新迷你玩具別墅椅子", 3010820, 1500),
Array("新兔兔郊遊房車", 3010843, 1500),
Array("新實驗室椅子", 3010688, 1500),
Array("巨無霸皮卡啾", 3010070, 1000),
Array("蛤蛤仙人椅", 3010621, 150),
Array("夏日西瓜冰椅子", 3010658, 1500), 
Array("深海章魚", 3010527, 1500), 
Array("新海加頓之安息", 3010678, 1000),
Array("新浪漫長椅", 3010735, 1000),
Array("軍團長椅子", 3010657, 1000), 
Array("雛祭娃娃3", 3010605, 1000),
Array("雛祭娃娃2", 3010604, 1000),
Array("雛祭娃娃1", 3010603, 1000),
Array("貓咪公園椅子", 3010511, 1000), 
Array("夏日喵喵椅子", 3010431, 1000), 
Array("大紅燈籠椅", 3010495, 1000), 
Array("蘑菇朋友椅子", 3010423, 1000),
Array("天使舞台椅", 3010459, 1000), 
Array("兔子乘風椅", 3010453, 1000),
Array("歡樂相框椅子", 3010661, 1000), 
Array("冒險巴士站椅子", 3010659, 1000),
Array("怪蜀黍的洩憤桌", 3010620, 1000), 
Array("未上色的名畫椅子", 3010606, 1000),
Array("完美的名畫椅子", 3010608, 1000), 
Array("不是在做夢", 3010609, 1000),
Array("漫畫書椅子", 3010591, 1000),
Array("雪狼戰椅", 3010106, 1000), 
Array("浴桶", 3012002, 1000), 
Array("呼嚕呼嚕床", 3010054, 1000), 
Array("財神椅子", 3010100, 1000), 
Array("暖暖桌", 3010021, 1000), 
Array("奶黃包", 3010055, 1000), 
Array("風吹稻香", 3010085, 1000), 
Array("海盜的俘虜", 3010028, 1000), 
Array("搖滾之魂椅子", 3010116, 1000), 
Array("貓頭鷹椅子", 3010077, 1000), 
Array("世界末日", 3010058, 1000), 
Array("骷髏寶座", 3010041, 1000), 
Array("帳篷", 3010133, 1000), 
Array("電視宅人", 3010098, 1000), 
Array("我愛巧克力火鍋", 3012011, 1000), 
Array("巧克力蛋糕戀人", 3012010, 1000),
Array("鬼娃娃椅子", 3010085, 1000), 
Array("漂漂豬椅子", 3010094, 1000), 
Array("北極熊椅子", 3010099, 1000), 
Array("聖誕樹椅子", 3010048, 1000), 
Array("虎虎生威椅子", 3010111, 1000), 
Array("魔法書椅子", 3010117, 1000), 
Array("暖爐椅", 3010292, 1000), 
Array("雪糕丸子椅", 3010055, 1000), 
Array("七夕椅子", 3010144, 1000), 
Array("龍魔導士椅子", 3010137, 1000),
Array("兔子椅子", 3010186, 1000), 
Array("古老錄音機椅子", 3010205, 1000), 
Array("黑貓椅子", 3010208, 1000), 
Array("雪夜椅子", 3010170, 1000), 
Array("小幼龍椅子", 3010299, 1000), 
Array("兔子紀念版椅子", 3010053, 1000), 
Array("蛋糕椅子", 3010141, 1000), 
Array("HP椅子", 3010180, 1000), 
Array("MP椅子", 3010181, 1000), 
Array("無價之寶椅子", 3010195, 1000), 
Array("水果椅子", 3010280, 1000), 
Array("老奶奶讀童話椅子", 3010320, 1000), 
Array("購物小推車椅子", 3010361, 1000), 
Array("熟睡的鴨子椅", 3010415, 1000), 
Array("幻影卡牌椅", 3010401, 1000),
Array("情書櫃子", 3010112, 1000),
Array("糖果音符椅子", 3010118, 1000),
Array("都納斯噴氣椅子", 3010124, 1000),
Array("喧鬧好友椅子", 3010207, 1000),
Array("星空椅子", 3010172, 1000),
Array("胡蘿蔔椅子", 3010183, 1000),
Array("水族館椅子", 3010142, 1000),
Array("我愛蛋糕椅子", 3010220, 1000),
Array("綿羊酋長椅子", 3010219, 1000),
Array("月光仙子椅子", 3010226, 1000),
Array("動物之家椅子", 3010281, 1000),
Array("珍珠蚌椅子", 3010288, 1000),
Array("生如夏花椅子", 3010306, 1000),
Array("鬼節南瓜椅子", 3010279, 1000),
Array("與克裡姆享受下午茶", 3010354, 1000),
Array("美容椅子", 3010357, 1000),
Array("水晶花園椅", 3010400, 1000),
Array("希拉的梳妝椅", 3010404, 1000),
Array("外形鑽機椅子", 3010355, 1000),
Array("粉色殘暴炎魔椅子", 3010313, 1000),
Array("艾麗莎的雙膝", 3010410, 1000),
Array("龍龍蛋殼椅", 3010107, 1000),
Array("露水椅子", 3010068, 1000),
Array("舒適大白熊椅子", 3010110, 1000),
Array("週年慶水晶楓葉椅", 3010145, 1000),
Array("大熊貓椅子", 3010078, 1000),
Array("肥貓貓椅子", 3010079, 1000),
Array("獨角獸椅子", 3010135, 1000),
Array("諾勒特斯椅子", 3010286, 1000),
Array("噢我的女皇", 3010318, 1000),
Array("埃歐雷的小音樂會", 3010403, 1000),
Array("彩虹椅子", 3010362, 1000),
Array("兔子乘風椅", 3010453, 1000),
Array("蛇椅子", 3010583, 1000),
Array("TV椅子", 3010494, 1000),
Array("水晶椅子", 3010428, 1000),
Array("喧鬧好友椅子", 3010207, 1000),
Array("羅曼蒂克天文台", 3010462, 1000),
Array("精靈王座", 3010287, 1000),
Array("愛心雲朵椅", 3010454, 1000)
);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) cm.dispose();
    else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("好吧，歡迎下次繼續光臨！.");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            choices = "\r\n兔兔幣餘額：#r" + cm.gettwd(1) + "#k個 (#r買後不支持退貨喲親#k)";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#　#d需要#r" + scrolls[i][2] + "#d兔兔幣#k#l";
            }
            cm.sendSimpleS("歡迎來到精品玩具店,你想買我們商店的物品麼?請選擇吧：." + choices,2);
        } else if (status == 1) {
            cm.sendYesNo("你確定需要購買#v" + scrolls[selection][1] + "##t" + scrolls[selection][1] + "#?");
        choice = selection;
        } else if (status == 2) {
            var twd = scrolls[choice][2];
           if (cm.getTWD(1) < twd) {
                cm.sendOk("抱歉，你沒足夠的兔兔幣！");
                cm.dispose();
            } else {
                cm.addtwd(twd);
                cm.gainItem(scrolls[choice][1], 1);
                cm.sendOk("購買成功.");
                cm.dispose();
            }
        }
    }
}
function getTWD() {
    var ret = 0;
    var conn = cm.getConnection();
    var UpDateData = conn.prepareStatement("SELECT rmb FROM accounts WHERE id = ?");
    UpDateData.setInt(1, cm.getPlayer().getAccountID());
    var rs = UpDateData.executeQuery();
    if (rs.next())
    {
        ret = rs.getInt("rmb");
    }
    UpDateData.close();
    return ret;
}

function gainTWD(times) {
    var conn = cm.getConnection();
    var UpDateData = conn.prepareStatement("UPDATE accounts SET rmb = rmb + ? WHERE id = ?");
    UpDateData.setInt(1, times);
    UpDateData.setInt(2, cm.getPlayer().getAccountID());
    UpDateData.executeUpdate();
    UpDateData.close();
}