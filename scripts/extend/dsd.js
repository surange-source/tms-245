var myDate = new Date(); // 實例化一個Date類的變量。。 
var status = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {

   var text = "#r#fUI/UIWindow.img/QuestIcon/3/0#\r\n頭目大掃蕩!獲得 怪物幣，換取好東西哦!\r\n"
    
         
       text += "#L3##b１我要參加頭目大掃蕩獲得#v4001626##k\r\n"; 
 text += "#L2##b２我要用#v4001626#怪物幣換取獎勵#k\r\n"; 
//text += "#L4##b３怪物幣抽獎#n#l\r\n"; 
text += "#L5##b３我要領取每日的#v4001626#怪物幣#n#l\r\n"; 
//text += "#L6##b５我要打工#n#l\r\n"; 
//text += "#L7##b６升級加油!#n#l\r\n"; 
//text += "#L8##b７假期儲值活動!#n#l\r\n";
           
                       

            cm.sendSimple(text);
            
        } else if (status == 1) {
            if (selection == 3){
                        cm.dispose();
                          cm.openNpc(9310069); 


            }else if(selection == 2){
        
 

     cm.openNpc(9310070); 

    

  
            }else if(selection == 4){

         cm.openNpc(9310073);     


            }else if(selection == 5){
        
if (cm.getPlayer().getPQLog("qd") >= 1 ) {
      
       cm.sendOk("#e過24小時再來吧!!");
cm.dispose();

 }  else if (cm.getChar().getLevel() < 13) {


cm.sendOk("13級以上的玩家才能領取");    
cm.dispose();


} else {  

   cm.getPlayer().setPQLog("qd");
 cm.gainItem(4001626, 1);

// cm.serverNotice(5,"[每天簽到]：恭喜玩家:"+cm.getChar().getName()+" 成功上線簽到!");
                           // cm.getPlayer().getMap().startMapEffect("恭喜玩家:"+cm.getChar().getName()+" 成功上線簽到!", 5120006);

            cm.sendOk("#e領取到了#r1#k個#v4001626#\r\n過24小時再來吧!");
            cm.dispose();
               }    

            }else if(selection == 6){
        
if (cm.getPlayer().getPQLog("51dg") >= 5 ) {

  cm.sendOk("今天你已經打工5次啦!明天再來完成任務吧!");
    cm.dispose();

        }else if ( cm.itemQuantity(1002357) == 1  ) {

cm.gainItem(1002357, -1);


cm.gainItem(4001626, 2);  
   cm.getPlayer().setPQLog("51dg");  

 var p = cm.c.getPlayer();
           p.setExp(0)




        cm.gainExp(2147483647);

  cm.sendOk("作為報酬,我用#r2#k個#v4001626#和你交換!");
    cm.dispose();

} else {

cm.sendOk("#r嗯哼,最近我在研究一種新頭盔,材料需要大量的#v1002357#,只要你能幫我帶來#r1#k個  #v1002357#我可以和你交換物品!\r\n\r\n#b#e任務獎勵#k：\r\n無條件獲得#r2#k個 #v4001626#\r\n等級提升#r1#k級");
 
            cm.dispose();

               }    


              

        }else if(selection == 7){



   var text = "五一勞動! 勞動光榮~你想領取升30級的經驗嗎?你搜集材料來我就幫你!  \r\n"
    
         
       text += "#L0##b我想查看下需要什麼材料#k\r\n"; 

text += "#L1##b我要升級!!#n#l\r\n"; 
           
                       

            cm.sendSimple(text);

            }else if(selection == 8){
        

cm.sendOk(" 假期儲值 返 50%樂豆點! 購買VIp 額外贈送玩具、椅子 、購買Vip6 贈送全屬性500的 #r#v1002140#!\r\n\r\n儲值或者有任何問題請聯繫 GM ，QQ1781933737");
 
            cm.dispose();


            }else if(selection == 10){

    if( cm.getChar().getVip() ==0 ){
                    
                    
            cm.getChar().SetVip(2);

                        cm.serverNotice(5,"[vip公告]：恭喜玩家:"+cm.getChar().getName()+" 免費加入了本服二星會員行列，歡呼吧！！！");
                        cm.serverNotice(5,"[vip公告]：恭喜玩家:"+cm.getChar().getName()+" 免費加入了本服二星會員行列，歡呼吧！！！");
                        cm.serverNotice(5,"[vip公告]：恭喜玩家:"+cm.getChar().getName()+" 免費加入了本服二星會員行列，歡呼吧！！！");
                        cm.serverNotice(5,"[vip公告]：恭喜玩家:"+cm.getChar().getName()+" 免費加入了本服二星會員行列，歡呼吧！！！");
                        cm.serverNotice(5,"[vip公告]：恭喜玩家:"+cm.getChar().getName()+" 免費加入了本服二星會員行列，歡呼吧！！！");
                
                    cm.dispose();
                }else{
                    cm.sendOk("你已經是Vip2或者以上了!"); 
                    cm.dispose();
                }
        
     


            }else if(selection == 11){
        
     cm.openNpc(2040049); 


            }else if(selection == 12){
        
     cm.openNpc(9900005); 


            }else if(selection == 13){
        
     cm.openNpc(9250025); 


            }else if(selection == 14){
        
     cm.openNpc(2040039); 


            }else if(selection == 15){
        
     cm.openNpc(2040039); 


            }else if(selection == 16){
        
     cm.openShop(9900005); 

cm.dispose();

            }else if(selection == 17){
        
     cm.openNpc(9100000); 



            }else if(selection == 18){
        
     cm.openNpc(9330112); 



            }else if(selection == 19){
        
     cm.openShop(9201060); 

cm.dispose();

            }else if(selection == 20){
        
     cm.openNpc(9310000); 



            }else if(selection == 21){
        
     cm.openNpc(9000040); 



            }else if(selection == 22){
        
        
                           cm.getPlayer().dropMessage("注意：購買時要空出消耗欄！");
 cm.openNpc(9330114); 



            }else if(selection == 23){
        
     cm.openNpc(9310074); 



            }else if(selection == 24){
        
     cm.openNpc(9330113); 



            }else if(selection == 25){
        
     cm.openShop(9050008); 

cm.dispose();



            }else if(selection == 26){
        
     cm.openNpc(9310108); 



            }else if(selection == 27){
        
     cm.openNpc(2010011); 



            }else if(selection == 28){
        var text = "Hi，#r" + cm.getChar().getName() + "下面你可以變化說話顏色哦!\r\n手續費#v4000019# 100個!#k\r\n";   
     text += "#L0##n我要使用綠說話背景\r\n";     text += "#L1##n我要使用紅色說話背景\r\n"; 

text += "#L2##n我要使用橙色說話背景\r\n";  text += "#L3##r我要取消說話背景\r\n"; 
cm.sendSimple(text);

            }else if(selection == 29){
        
     if(cm.getPlayer().getPQLog("mrshangxian1") >= 1){
                                
  cm.sendOk("您已經領取了!明天再來吧 ");
                    cm.dispose();
}else{ 
    cm.getPlayer().setPQLog("mrshangxian1");
         cm.gainItem(4001126, 50);
        cm.gainItem(2000019, 100);
   cm.gainItem(2022090, 5);
cm.getPlayer().dropMessage(1, "您已經領取了!請明天再來領取吧!.");
cm.dispose();
  
    }        }else if(selection == 30){

                var text = "Hi，#r" + cm.getChar().getName() + "你可以開啟、關閉自動撿錢功能哦!!\r\n\r\n手續費#v4000019# 500個\r\n\r\n如果你開啟了自動撿錢你認為影響了遊戲，你可以關閉此功能的哦!\r\n\r\n";   
     text += "#L4##n我要開啟自動撿錢\r\n";     text += "#L5##n我要關閉自動撿錢\r\n"; 
     cm.sendSimple(text);

        }else if(selection == 1){

         cm.openNpc(9310072); 
           

            
            }else if(selection == 31){

            if(cm.getPlayer().getPQLog("mrgz") >= 1){
                                
  cm.sendOk("你已領取今天的工資了!明天再來吧! ");
                    cm.dispose();

      }   else if (cm.getPlayer().getLevel() <= 9) {
  cm.sendOk("你至少達到10級 再來找我領取每日工資吧! "); 
     cm.dispose(); 
}else{ 
     if (cm.getChar().getVip() <= 0) {
        cm.getPlayer().setPQLog("mrgz");
         cm.getPlayer().modifyCSPoints(2,+50);
                  cm.gainMeso(1000000);       
cm.serverNotice("[☆☆玩家每日工資領取☆☆]玩家:" + cm.c.getPlayer().getName() + " 領取了今日工資 5000楓點和 1000000楓幣!");
            cm.dispose();
  }
  else if (cm.getChar().getVip() == 1) {
        cm.getPlayer().setPQLog("mrgz");
         cm.getPlayer().modifyCSPoints(2,+80);
                  cm.gainMeso(5000000);       
cm.serverNotice("[☆☆玩家每日工資領取☆☆]Vip1:" + cm.c.getPlayer().getName() + " 領取了今日工資 8000楓點和 5000000楓幣!");
            cm.dispose();
  } else if (cm.getChar().getVip() == 2) {
        cm.getPlayer().setPQLog("mrgz");
         cm.getPlayer().modifyCSPoints(2,+100);
                  cm.gainMeso(10000000);       
cm.serverNotice("[☆☆玩家每日工資領取☆☆]Vip2:" + cm.c.getPlayer().getName() + " 領取了今日工資 10000楓點和 10000000楓幣!");
            cm.dispose();
  } else if (cm.getChar().getVip() == 3) {
        cm.getPlayer().setPQLog("mrgz");
         cm.getPlayer().modifyCSPoints(2,+200);
                  cm.gainMeso(30000000);       
cm.serverNotice("[☆☆玩家每日工資領取☆☆]Vip3:" + cm.c.getPlayer().getName() + " 領取了今日工資 20000楓點和 30000000楓幣!");
            cm.dispose();
  } else if (cm.getChar().getVip() == 4) {
        cm.getPlayer().setPQLog("mrgz");
         cm.getPlayer().modifyCSPoints(2,+500);
                  cm.gainMeso(100000000);       
cm.serverNotice("[☆☆玩家每日工資領取☆☆]超級Vip:" + cm.c.getPlayer().getName() + " 領取了今日工資 50000楓點和 100000000楓幣!");
            cm.dispose();
  } else if (cm.getChar().getVip() == 5) {
        cm.getPlayer().setPQLog("mrgz");
         cm.getPlayer().modifyCSPoints(2,+500);
                  cm.gainMeso(300000000);       
cm.serverNotice("[☆☆玩家每日工資領取☆☆]頂級Vip:" + cm.c.getPlayer().getName() + " 領取了今日工資 50000楓點和 300000000楓幣!");
            cm.dispose();
  } else{ 
     cm.getPlayer().dropMessage(1, "條件不足.");
        cm.dispose(); 
         }         }  
            
 }else if(selection == 9){
             
if (cm.getPlayer().getMapId() >=910000000 && cm.getPlayer().getMapId() <=910000022) {
                    cm.getPlayer().dropMessage(1, "您已經在自由市場中間了.");
                    cm.dispose();
}else{                                
                                     cm.getPlayer().dropMessage(1, "聊天窗口輸入「@市場」即可滿足你");
                    cm.dispose();
        }    
                
            }
else if(selection == 10){
                
 cm.openShop(933); cm.dispose(); 
                
            }
        }

else if (status == 2) {
 if(selection == 0){
if (cm.itemQuantity(4000001) == 30) {


cm.sendOk("材料需要 30個 #v4000001#,看來你已經搜集足夠了嘛!");    
cm.dispose();
}else{ 
cm.sendOk("材料需要 30個 #v4000001#,不能超過30個! 孩子,快去搜集吧!");    
cm.dispose();
}
}else if(selection == 1){

if (cm.itemQuantity(4000001) == 30) {


 if (cm.getLevel() >= 200) {
     cm.sendOk("你已經滿級了 ");
          cm.dispose();
      
        } else if(cm.getPlayer().getPQLog("meirisj") >= 1) {
     cm.sendOk("每天只能完成#r1#k次任務! ");
          cm.dispose();
      
        }
        else{
    cm.gainItem(4000001, -30); 
 
       var p = cm.c.getPlayer();
           p.setExp(0)




        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
      
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
      
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
      
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
      
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
        cm.gainExp(2147483647);
      
      

         cm.getPlayer().setPQLog("meirisj");

  cm.serverNotice(5,"[五一假日昇級]：恭喜玩家:"+cm.getChar().getName()+" 領取了升30級的經驗!");
                            cm.getPlayer().getMap().startMapEffect("恭喜玩家:"+cm.getChar().getName()+" 領取了升30級的經驗!", 5120006);


 cm.getPlayer().dropMessage(1, "升級完畢.");
    cm.dispose();
}


}else{ 
  cm.getPlayer().dropMessage(1, "條件不足啊 童鞋!");
cm.dispose();
}
}else if(selection == 2){


if (cm.itemQuantity(4000019) >= 100) {
   cm.gainItem(4000019, -100); 
cm.getChar().SetShuoHua(3);
cm.sendOk("恭喜你設置成功!!");    
cm.dispose();
}else{ 
  cm.getPlayer().dropMessage(1, "材料不足!");
cm.dispose();
}

}else if(selection == 3){
cm.getChar().SetShuoHua(0);
cm.sendOk("恭喜你取消成功!!");    
cm.dispose();
}
else if(selection == 4){
if (cm.itemQuantity(4000019) >= 500) {
cm.gainItem(4000019, -500); 
cm.getChar().SetSD(1);
cm.sendOk("恭喜你開啟成功!!如果你打怪會掉線請關閉此功能，當然操作好就不會掉線");    
cm.dispose();
}else{ 
  cm.getPlayer().dropMessage(1, "材料不足!");
cm.dispose();
}
}else if(selection == 5){
cm.getChar().SetSD(0);
cm.sendOk("恭喜你取消成功!!打怪會掉線的玩家必須取消哦，當然操作好就不會掉線");    
cm.dispose();
}
}



    }
}    