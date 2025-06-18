var a = 0;
var text;
var selects; //記錄玩家的選項
var buynum = 0;
var typed = 0; // 記錄玩家選擇的類型
var itemlist = null;
var searchItemList = null;
var lastItemList = null;
var isSearch = false;
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
    Array(999, "其他")
);
function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "#h0#，歡迎來到#e#r絕版點裝商城#n#k，您可以按時裝的名稱進行搜索，或者選擇分類進行瀏覽：\r\n";
            text += "\r\n\r\n"
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
                    text += "#L" + (i) + "##i" + lastItemList[i] + ":##t" + lastItemList[i] + "# - #r"+lastItemList[i][1]+"#b雪花幣  \r\n";
                }
                isSearch = false;
                cm.sendSimple(text);
            }
        } else if (a == 2) {
            selects = selection;
            buynum = 1;
            cm.sendYesNo("你想購買" + buynum + "個#r#i" + lastItemList[selects][0] + "##k？\r\n你將使用掉" + (buynum * lastItemList[selects][1]) + "雪花幣。");
        } else if (a == 3) {
            if (cm.getSpace(1)<1) {
                cm.sendOk('背包欄位不足');
                cm.dispose();
                return;
            }
            if (cm.haveItem(4310014,buynum * lastItemList[selects][1])) {
                cm.gainItem(4310014, -buynum * lastItemList[selects][1]);
                cm.gainItem(lastItemList[selects][0], buynum);
                cm.sendOk("購買成功了！");
                cm.dispose();
            } else {
                cm.sendOk("對不起，你沒有足夠的雪花幣。");
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
    var sql = "select itemid, itemprice from npccashshop order by id desc, itemprice asc";
    var pstmt = conn.prepareStatement(sql);
    var rs = pstmt.executeQuery();
    var rsList = Array();
    while(rs.next())
    {
        rsList.push(Array(rs.getInt("itemid"), rs.getInt("itemprice")));
    }
    rs.close();
    pstmt.close();
    //conn.close();
    return rsList;
}
function getItemListByName(name) {
    var conn = cm.getConnection();
    name = name.replaceAll(".*([';]+|(--)+).*", " ");
    var sql = "select itemid, itemprice from npccashshop where itemname like '%"+name+"%' order by id desc, itemprice asc";
    var pstmt = conn.prepareStatement(sql);
    var rs = pstmt.executeQuery();
    var rsList = Array();
    while(rs.next())
    {
        rsList.push(Array(rs.getInt("itemid"), rs.getInt("itemprice")));
    }
    rs.close();
    pstmt.close();
    //conn.close();
    return rsList;
}