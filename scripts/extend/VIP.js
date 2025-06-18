var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var twd = 0;

var time = new Date();
var year = time.getFullYear(); //獲得年份
var month = time.getMonth()+1; //獲得月份
var day = time.getDate();//獲取日
var today = year+"-"+month+"-"+day;

function start() {
    if ( !cm.getPlayer().isGm()){
        //cm.sendOk("管理員專用");
        //cm.dispose();
        //return;
    }    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        
        var 上次包月日期 = cm.getPlayer().getWorldShareInfo(999999999,"date");
        var 是否包月 = cm.getPlayer().getWorldShareInfo(999999999,"enable");
        var 檢查包月 = false;
        if( 是否包月 == 1 && DateDiff(上次包月日期,today) <= 30 )
            檢查包月 = true;
        
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            
            
            
            var selStr = "";
            if( 是否包月 == 1 && DateDiff(上次包月日期,today) <= 30 ){
                selStr += "您目前: #b已是#k 包月用戶#n#k\r\n天數剩餘:"+(30-DateDiff(上次包月日期,today))+"天\r\n";
                selStr +="#d您當前的樂豆點為：#r"+cm.getNX(1)+" #d #k\r\n\r\n";
                cm.sendOk(selStr);
                cm.dispose();
                return;
            }else{
                selStr += "您目前: #r不是#k 包月用戶#n#k\r\n";
                selStr +="#d您當前的樂豆點為：#r"+cm.getNX(1)+" #d #k\r\n\r\n";
                selStr +="#r↓↓↓↓↓↓↓↓↓超值折扣購買↓↓↓↓↓↓↓↓↓↓↓#k\r\n";
                selStr +="#L0##b"+aaa+" " + cm.getServerName() + "超值包月3000樂豆點/30天[#r#e火爆#b#n點擊查看]#l#k\r\n\r\n";
                cm.sendSimple(selStr);
            }
        } else if (status == 1) {
            if (selection == 0) {
                typed=0;
                cm.sendYesNo("點是進行購買。點否返回上一頁");
            }
        } else if (status == 2) {
            if(typed==0){
                if (cm.getNX(1)>=3000 && 檢查包月 == false && cm.getSpace(5) >= 1 ) {
                    cm.getPlayer().updateWorldShareInfo(999999999,"name",cm.getServerName() + "超值包月",false);
                    cm.getPlayer().updateWorldShareInfo(999999999,"date",today,false);
                    cm.getPlayer().updateWorldShareInfo(999999999,"enable",1,false);

                
                    if(cm.haveItem(2430865) < 1)
                        cm.gainItem(2430865,1);
                    
                    cm.gainItem(5010110,1);
                    
                    cm.gainNX(-3000);                        
                    cm.sendOk("恭喜您成功購買" + cm.getServerName() + "超值包月.");
                    cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功購買" + cm.getServerName() + "超值包月。", 5120012);
                    cm.worldSpouseMessage(6, "[系統公告] : 恭喜 " + cm.getChar().getName() + " 成功購買" + cm.getServerName() + "超值包月.");
                    cm.dispose();
                } else {
                        cm.sendOk("失敗");
                        cm.dispose();
                }
            }
      }
   }
}


function DateDiff (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
  var oDate1 = new Date(sDate1);
  var oDate2 = new Date(sDate2);
  var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return iDays;
}