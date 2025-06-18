var status = 0;
var nature;
var DJnature;
var ItemId;
var nature1 = Array();
var nature2 = Array();
//var A,B,C,D;
//----------------------------------------------------變量切割
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 1) {
            status = 1;
            cm.dispose();
            return;
        } else {
            cm.dispose();
            return;
        }
        status--;
    }

    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遺憾，您因為違反用戶守則被禁止遊戲活動，如有異議請聯繫管理員.");
            cm.dispose();
        } 
    else if (status == 0) {
        var selStr = "#e        歡迎來到歡樂炸炸炸 \r\n";
           selStr +="      #b#k\r\n\r\n";
           selStr +="      #r#k\r\n\r\n\r\n";
           selStr +="#r#L0#我要開始歡樂炸炸炸#l\r\n";
           selStr +="#r#L1#我要看說明#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        if (selection == 1){
            var TET = "#e        歡迎來到點裝屬性提升【說明中心 】\r\n";
            TET += "1.這裡提升的點裝只能是自己背包裡現有的【點裝道具】\r\n";
            TET += "3.這裡只提升6個屬性：力量、敏捷、智力、運氣、攻擊、魔法攻擊\r\n";
            TET += "4.3E楓幣提升的範圍是0~10\r\n";
            TET += "5.5E楓幣提升的範圍是0~20\r\n";
            TET += "6.10E楓幣提升的範圍是0~30\r\n";
            TET += "7.每次提升還會額外消耗3000個結晶\r\n";
            TET += "8.每次提升會回收背包裡現有的，然後生成新的。\r\n";
            TET += "9.一旦屬性洗出來後,錢就扣掉!!!。\r\n";
            cm.sendOk(TET);
            cm.dispose();
            return;
        }
        var avail = "";
            for (var i = 0; i < 96; i++) {
                if (cm.getInventory(1).getItem(i) != null &&  cm.isCash(cm.getInventory(1).getItem(i).getItemId())) {
                    avail += "#L" + cm.getInventory(1).getItem(i).getItemId() + "# #z" + cm.getInventory(1).getItem(i).getItemId() + "# #i" + cm.getInventory(1).getItem(i).getItemId() + ":##l\r\n";
                }
            }
            cm.sendSimple("#b請選擇需要加屬性的道具後 點擊下一步將會開始獲取隨機屬性:\r\n#b" + avail);
        } else if (status == 2) {//先選4項屬性
            ItemId = selection;
            getStats();
            var TXT = "                #v"+ItemId+"# #z"+ItemId+"#          \r\n";
            for (var i = 0;i<nature1.length ;i++ ){
                TXT += " #d"+nature1[i][0]+"\r\n";
            }
            TXT +="#r#L0#我要用3E砸初級階段#l\r\n";
            TXT +="#L1#我要用5E砸中級階段#l\r\n";
            TXT +="#L2#我要用10E砸高級階段#l\r\n";
            TXT +="#L3#大爺我不砸了！#l  \r\n";
            TXT +="        ";
            cm.sendSimple("#b您獲得的屬性如下，是否繼續？下一步將開始洗屬性。並且會扣楓幣和最高級結晶:\r\n\r\n#b" + TXT);
        } else if (status == 3) {//用楓幣進行洗屬性
            var PI;
            var Money;
            if(selection !=3){
                if(!cm.haveItem(4021016,1000)){
                cm.sendOk("檢查一下背包是否有1000個最高級結晶");
                cm.dispose();
                return;
            }
            if(selection == 0){//3E
                Money = 300000000;
                PI = 10;
            }else if(selection == 1){//5E
                Money = 500000000;
                PI = 20;
            }else if(selection == 2){//10E
                Money = 1000000000;
                PI = 40;
            }else{
                cm.sendOk("出錯了，請聯繫管理員！");
                cm.dispose();
                return;
            }
            if(cm.getMeso()<Money){
                cm.sendOk("檢查一下背包是否有"+Money+"楓幣");
                cm.dispose();
                return;
            }
            var TXT = "";
            for (var i = 0;i<nature1.length ;i++ ){
                var Ai = Math.floor(Math.random()*PI);;
                nature1[i][1]=Ai;
                TXT += "\r\n#r"+nature1[i][0]+" : #b"+nature1[i][1]+"#k";
            }
            TXT +="\r\n#L0#是#l\r\n";
            cm.sendSimple("#b您獲得的屬性值如下，請點擊下一步。:\r\n#b" + TXT);
            cm.gainMeso(-Money);
            cm.gainItem(4021016,-1000);
            }else{
                cm.dispose();
            }
        } else if (status == 4) {
            if(selection == 0){
                cm.gainItem(ItemId,-1);//去掉原來的
                setStats();
                cm.worldSpouseMessage(0x0F,"[面板提升中心]:玩家 "+ cm.getChar().getName() +" 用楓幣對點裝進行了強化，大家快瞧瞧！");
                cm.dispose();
            }else{
                cm.sendOk("打造出錯請聯繫管理員");
                cm.dispose();
            }
    }
}
function getStats(){//楓幣普通槽
    nature = Array(Array("力量",0),
                   Array("智力",0),
                   Array("運氣",0),
                   Array("敏捷",0),
                   Array("物理攻擊",0),
                   Array("魔法攻擊",0));
    for (var i=0 ;i<nature.length ;i++ ){
        nature1.push(nature[i]);
    }
    return;
}
function setStats(){
    var Name = Array("來！互相傷害","我是GAY","我的天吶！","高考算個屌","太陽之子","太陽的後裔","宇宙的後裔","在座都是大爺","充錢才能更強","你們都是垃圾","我最屌","叫我女王大人","沒見過帥哥？");
    var equip = cm.getNewEquip(ItemId);
    for (var i = 0;i<nature1.length ;i++ ){
        if(nature1[i][0]=="力量"){
            equip.setStr(nature1[i][1]);
        }else if(nature1[i][0]=="智力"){
            equip.setInt(nature1[i][1]);
        }else if(nature1[i][0]=="運氣"){
            equip.setLuk(nature1[i][1]);
        }else if(nature1[i][0]=="敏捷"){
            equip.setDex(nature1[i][1]);
        }else if(nature1[i][0]=="物理攻擊"){
            equip.setWatk(nature1[i][1]);
        }else if(nature1[i][0]=="魔法攻擊"){
            equip.setMatk(nature1[i][1]);
        }
    }
    cm.playerMessage(5,"恭喜打造成功！");
    equip.setOwner(Name[Math.floor(Math.random()*Name.length)]);
    //cm.setLock(equip);
    cm.addFromDrop(equip);
    cm.sendOk("恭喜打造成功");
    return;
}