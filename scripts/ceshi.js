var status = -1;
function start() {
    if(cm.getPlayer().isIntern()==false){
        cm.dispose();
        return;
    }
    action(1, 0, 0)
}
function action(mode, type, selection) {
    if (mode === 1) {
        status++
    } else {
        if (status === 0)  {
            cm.dispose();
            return
        } else {
            status--
        }
    }
    if (status === 0) {
        var text = "";
        text += "目前經驗倍率 = " + cm.getClient().getChannelServer().getExpRate() + "\r\n";
        text += "目前楓幣倍率 = " + cm.getClient().getChannelServer().getMesoRate() + "\r\n";
        text += "目前掉裝倍率 = " + cm.getClient().getChannelServer().getDropRate() + "\r\n";
        text += "#L1#加滿技能#l\r\n";
        text += "#L2#加滿屬性#l\r\n";
        text += "#L3#完成任務#l\r\n";
        text += "#L4#清除技能#l\r\n";
        text += "#L5#加技能2#l\r\n";
        text += "#L7#測試傳送#l\r\n";
        text += "#L9#測試自殺#l\r\n";
        text += "#L10#測試喇叭#l\r\n";
        text += "#L11#測試刷物品#l\r\n";
        text += "#L12#測試gainitem#l\r\n";
        text += "#L13#測試mono#l\r\n";
        text += "#L14#測試title#l\r\n";
        text += "#L15#領1000核心#l\r\n";
        text += "#L16#特別精靈墜飾(無視500)#l\r\n";
        text += "#L17#整形#l\r\n";
        cm.sendSimple(text);
    } else if (status === 1) {
        if (selection === 1) {
            cm.clearSkills();
            cm.maxSkillsByJob();
            cm.getPlayer().baseSkills();
            cm.sendOk("加滿技能");
            cm.dispose();
        } else if (selection === 2) {
            cm.getPlayer().getStat().maxhp = 99999;
            cm.getPlayer().getStat().maxmp = 99999;
            cm.getPlayer().getStat().hp = 99999;
            cm.getPlayer().getStat().mp = 99999;
            cm.getPlayer().getStat().str = 999;
            cm.getPlayer().getStat().dex = 999;
            cm.getPlayer().getStat().int_ = 999;
            cm.getPlayer().getStat().luk = 999;
            //cm.getPlayer().
            cm.dispose();
            cm.sendOk("加滿屬性")
        } else if (selection === 3) {
            cm.sendGetNumber("請輸入任務ID", 0, 0, 999999);
            //for (var i = 34450; i <= 34478; i++){
            //cm.forceCompleteQuest(i);}
            //cm.dispose();
        } else if (selection === 4) {
            cm.getPlayer().removeBuffs(false);
            //cm.clearSkills();
            //cm.sendOk("加滿技能");
            cm.dispose();
        } else if (selection === 5) {
            cm.maxAllSkills();
            cm.sendOk("加滿技能");
            cm.dispose();
        } else if (selection === 7) {
            cm.dispose();
            cm.openNpc(9900004, "ceshichuansong");
        } else if (selection === 9) {
            cm.dispose();
            cm.customSqlResult("select * from accds");
        } else if (selection === 10) {
            cm.dispose();
            cm.gainGachaponItem(2049301, 1);
        } else if (selection === 11) {
            cm.dispose();
            cm.openNpc(0, "DeleteCash")
        } else if (selection === 12) {
            cm.dispose();
            cm.gainItemPeriod(1702894, 1, 0)
        } else if (selection === 13) {
            cm.dispose();
            cm.openNpc(0, "../demo")
        } else if (selection === 14) {
            cm.dispose();
            cm.getInventory(1).getItem(1).setOwner("123");
        } else if (selection === 15) {
            cm.gainVCraftCore(1000);
            cm.dispose();
        } else if (selection === 16) {
            if (cm.haveSpace(1)) {
                var itemId = 1122207;
                var ii = cm.getItemInfo();
                //var toDrop = ii.randomizeStats(ii.getEquipById(itemId)).copy(); // 生成一個Eq 
                var toDrop = ii.getEquipById(itemId).copy(); // 生成一個Eq  
                toDrop.setStr(50); //力量                   
                toDrop.setInt(50); //智力
                toDrop.setLuk(50); //幸運
                toDrop.setDex(50); //敏捷
                
                toDrop.setPad(50);//物理攻擊                
                toDrop.setMad(50); //魔法攻擊
                
                toDrop.setPdd(250); //物理防禦
                //toDrop.setMdd(250); //魔法防禦                
                
                toDrop.setBossDamage(30); //BOSS傷害
                toDrop.setIgnorePDR(500); //無視防禦
                
                //toDrop.setExpiration(java.lang.System.currentTimeMillis() + period); // 期限
                cm.addByItem(toDrop);
                cm.sendOk("兌換成功,商品#i" + itemId + ":# #b#t" + itemId + "##k已送往背包。");
            } else {
                cm.sendOk("兌換失敗，請您確認在背包裝備欄目窗口中是否有一格以上的空間。");
            }
            
            cm.dispose();
        } else if (selection === 17) {
            cm.dispose();
            cm.openNpc(0, "整形");
        } 

    } else if (status === 2) {
        cm.forceCompleteQuest(selection);
        cm.sendOk("完成任務！ID：" + selection);
        cm.dispose();
    }
}