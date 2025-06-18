var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var typed = 0; // 記錄玩家選擇的類型
var itemlist = null;
var searchItemList = null;
var lastItemList = null;
var isSearch = false;
var PT = null;
var typeList = Array(
    Array(0, "帽子"),
    Array(1, "上衣"),
    Array(2, "套裝"),
    Array(3, "褲裙"),
    Array(4, "鞋子"),
    Array(5, "手套"),
    Array(6, "披風"),
    Array(7, "武器"),
    Array(8, "戒指"),
    Array(9, "椅子"),
    Array(999, "其他")
);
var isBuy = false;
function start() {
    a = -1;
    PT = new PriceTools();
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    java.lang.System.out.println(mode + " " + a +"");
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            if (isBuy) {
                a = 0;
                isBuy = false;
            } else {
                a--;
            }
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "#h0#，歡迎來到#e#r絕版點裝商城#n#k，#b#e官方認證女生#n#k還有#r8.5折#k優惠哦！\r\n\r\n";
            text += "#d\t- 您當前#b樂豆點#d餘額：\r\n#k";
            text += "#d\t- 您當前#b時裝點#d餘額：\r\n#k";
            text += "#d#e#L2014#我要進行搜索#l #r#L2015#我要進入試穿模式#l#k#n\r\n";
            text += "#d#e#L2016##r<精品>#b 閃耀套裝，你值得擁有！#n\r\n";
            text += "#d#e#L20161##r<酷炫>#b 傷害皮膚#n\r\n";
            text += "#d#e#L20162##r<拉風>#b 稀有寵物#n\r\n\r\n";
            if (cm.getPlayer().isGm()) {
                text += "#L20163##r#e[管理]增加刪除時裝#l\r\n\r\n";
            }
            for(var i=0; i<typeList.length; i++) {
                text += "#b#L"+i+"#"+typeList[i][1]+"#l\t";
                if (!((i+1)%4))
                    text +="\r\n";
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            if (selection == 2014) {
                a = 0;
                cm.sendGetText("請輸入您要搜索的點裝名稱，可以進行模糊查詢");
                isSearch=true;
            } else if (selection == 2016) {
                cm.dispose();
                cm.openNpc(cm.getNpc(), 1051);
            } else if (selection == 20162) {
                cm.dispose();
                cm.openNpc(cm.getNpc(), 1054);
            } else if (selection == 20161) {
                cm.dispose();
                cm.openNpc(cm.getNpc(), 1053);
            } else if (selection == 20163) {
                cm.dispose();
                cm.openNpc(cm.getNpc(), 1052);
            } else if (selection == 2015) {
                cm.dispose();
                cm.openNpc(cm.getNpc(), 1050);
            } else {
                typed = selection;
                if (isSearch) {
                    searchItemList = getItemListByName(cm.getText());
                    typed = 9;
                    lastItemList = searchItemList;
                    text = "#h0#,您搜索的【#r"+cm.getText()+"#k】物品如下：\r\n\r\n#b";
                } else {
                    if (itemlist == null)
                        itemlist = getItemList();
                    lastItemList = itemlist;
                    text = "#h0#,您可以在這裡兌換#e#b絕版點裝【"+typeList[typed][1]+"】#n#k，請選擇你想要購買的物品：\r\n\r\n#b";
                }
                
                if (lastItemList.length<=0)
                {
                    a = -1;
                    text+="未找到您要找的物品，請聯繫管理員進行添加。";
                }
                for (var i=0; i<lastItemList.length; i++) {
                    if (getItemType(lastItemList[i][0])!=typeList[typed][0] && !isSearch)
                        continue;
                    var gmTips = "";
                    if (cm.getPlayer().isGm()) {
                        gmTips = "物品ID："+lastItemList[i]+" ";
                    }
                    text += "#L" + (i) + "##i" + lastItemList[i] + ":##t" + lastItemList[i] + "# "+gmTips+"- #r"+lastItemList[i][1]+"#b樂豆點 \r\n";
                }
                isSearch = false;
                cm.sendSimple(text);
            }
        } else if (a == 2) {
            isBuy = true;
            selects = selection;
            buynum = 1;
            PT.calc(lastItemList[selects][1]);
            cm.sendYesNo("你想購買" + buynum + "個#r#i" + lastItemList[selects][0] + "##k？\r\n你將使用掉#r"+PT.acash+"#b樂豆點#k。#k");
        } else if (a == 3) {
            if (cm.getSpace(1)<1) {
                cm.sendOk('背包欄位不足');
                cm.dispose();
                return;
            }
            var quantity = buynum * lastItemList[selects][1];
            
            if (PT.canBuy()) {
                   PT.pay();
                //cm.gainNX(1, -quantity);
                cm.gainItem(lastItemList[selects][0], buynum);
                //cm.worldSpouseMessage(0x23, "[絕版時裝] : 玩家 "+cm.getPlayer().getName()+" 購買了一件 <"+cm.getItemName(lastItemList[selects][0])+">");
                isBuy = false;
                cm.sendSimple("購買成功了！");
                a = -1;
            } else {
                cm.sendOk("對不起，你沒有足夠的樂豆點。");
                cm.dispose();
            }
        }
    }//mode
}//f

//獲取裝備類型
function getItemType(itemid) {
    var type = Math.floor(itemid/10000);
    switch (type) {
        case 100:
            return 0;  //帽子
        case 104:
            return 1;  //上衣
        case 105:
            return 2;  //套裝
        case 106:
            return 3;  //褲裙
        case 107:
            return 4;  //鞋子
        case 108: 
            return 5;  //手套
        case 110:
            return 6;  //披風
        case 111:
            return 8;  //戒指
        case 301:
            return 9; //椅子
        default:
            if (type==120)
                return 999;
            if (type==135)
                return 999;
            var type=Math.floor(type/10);
            if (type==12 || type==13 || type==14 || type==15 || type==17) {
                return 7;  //武器
            }
            return 999; 
    }
}

//獲取商店列表
function getItemList() {
    var conn = cm.getConnection();
    var sql = "select itemid, itemprice from npccashshop where verify >= 1 order by id desc";// by itemprice asc";
    var pstmt = conn.prepareStatement(sql);
    var rs = pstmt.executeQuery();
    var rsList = Array();
    var discount = 1;
    if (cm.haveItem(1142574) || cm.getPlayer().getMedalText().indexOf("官方認證女生")!=-1) {
        discount=0.8;
    }
    //java.lang.System.out.println(cm.getPlayer().getMedalText());
    while(rs.next())
    {
        rsList.push(Array(rs.getInt("itemid"), Math.floor(rs.getInt("itemprice")*discount)));
    }
    rs.close();
    pstmt.close();
    //conn.close();
    return rsList;
}
function getItemListByName(name) {
    var conn = cm.getConnection();
    name = name.replaceAll(".*([';]+|(--)+).*", " ");
    var sql = "select itemid, itemprice from npccashshop where verify >= 1 and itemname like '%"+name+"%' order by id desc";//order by itemprice asc";
    var pstmt = conn.prepareStatement(sql);
    var rs = pstmt.executeQuery();
    var rsList = Array();
    var discount = 1;
    if (cm.haveItem(1142574) || cm.getPlayer().getMedalText().indexOf("官方認證女生")!=-1) {
        discount=0.8;
    }
    while(rs.next())
    {
        rsList.push(Array(rs.getInt("itemid"), Math.floor(rs.getInt("itemprice")*discount)));
    }
    rs.close();
    pstmt.close();
    //conn.close();
    return rsList;
}

var PriceTools = function() {
    
    this.player = cm.getPlayer();
    this.acash = 0;
    this.cashpoints = 0;
    
    this.calc = function(price) {
            var lastPoints = price ;
            this.acash = lastPoints;
    }
    
    this.canBuy = function() {
        if (this.player.getCSPoints(1)>=this.acash) {
            return true;
        } else {
            return false;
        }
    }
    
    this.pay = function() {
        if (this.acash>0)
            cm.gainNX(1, -this.acash);
    }
}