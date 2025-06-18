var icon = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var icon2 = "#fUI/Basic.img/BtMin2/normal/0#";
var typed=1;
var cost = 10;
var inventoryType=1;
var item=null;
function start() {
    status = -1;
    action(1, 0, 0);
}

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
    if (status == 0) {
        //expiredate
        var text="你好，在我這裡可以進行裝備還原，將裝備所有屬性初始化成標準值並且#b保留潛能屬性#k，使用前請將要還原的道具放在#e#d裝備欄的第一格#n。\r\n#b";
        text+="#L1#"+icon2+" 使用說明#l\r\n";
        text+="#L2#"+icon2+" 開始還原#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1){
        if (selection == 1) {
            typed=1;
            status = -1;
            var text="將道具除潛能以外的所有屬性初始化成標準值，使用前請將要還原的道具放在裝備欄的第一格，現金道具不可還原。還原將消耗樂豆點進行，不同等級消耗的樂豆點數量不同。";
            cm.sendSimple(text);
        } else if (selection == 2) {
            typed=2;
            item = cm.getInventory(1).getItem(1);
            if (item==null) {
                cm.sendOk("你確認你包裹的第一欄有裝備存在？");
                cm.dispose();
                return;
            }
            if (item.getOwner().indexOf("★")>=0) {
                cm.sendOk("提升過品級的裝備無法還原。");
                cm.dispose();
                return;
            }
            cost = cost*cm.getReqLevel(item.getItemId())+500;
            var text="這將花費掉你#r"+cost+"#k的樂豆點為你的裝備進行還原，還原前請注意以下幾點：\r\n\r\n#r1.請確認需要還原的裝備已經放置在裝備欄的第一格\r\n2.還原是個不可逆的操作，無法進行恢復\r\n3.玩家所造成的失誤不予以賠償\r\n\r\n#k是否繼續？";
            cm.sendYesNo(text);
        } 
     }  else if (status == 2) {
        if (cm.getPlayer().getCSPoints(1) < cost) {
            cm.sendOk("你好像沒有#r"+cost+"#k樂豆點。");
            cm.dispose();
            return;
        }
        //var item = cm.getInventory(1).getItem(1);
        
        if (cm.isCash(item.getItemId())) {
            cm.sendOk("只有非現金道具才能進行還原");
            cm.dispose();
            return;
        }
        var deleteQuantity = item.getQuantity();
        var ii = cm.getItemInfo();                    
        var toDrop = ii.randomizeStats(ii.getEquipById(item.getItemId())).copy(); // 生成一個Equip類
        toDrop.setPotential1(item.getPotential1());
        toDrop.setPotential2(item.getPotential2());
        toDrop.setPotential3(item.getPotential3()); 
        toDrop.setPotential4(item.getPotential4());
        toDrop.setPotential5(item.getPotential5());
        toDrop.setPotential6(item.getPotential6());
        toDrop.setExpiration(item.getExpiration());                 
        cm.removeSlot(1, 1, deleteQuantity);
        cm.addFromDrop(cm.getC(), toDrop, false);
        cm.gainNX(-cost);
        cm.sendOk("還原成功了。");
        cm.dispose();
    }
}
