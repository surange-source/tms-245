var status = 0;
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //獲得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //獲得月份
var day = ca.get(java.util.Calendar.DATE);//獲取日
var hour = ca.get(java.util.Calendar.HOUR); //獲得小時
var minute = ca.get(java.util.Calendar.MINUTE);//獲得分鐘
var second = ca.get(java.util.Calendar.SECOND); //獲得秒
var eff = "#fUI/UIWindowBT.img/WorldMap/BtNext/mouseOver/0#";
var eff1 = "#fEffect/CharacterEff/1112905/0/1#";//小紅心
var eff4 = "#fUI/Basic/BtHide3/mouseOver/0#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var fff ="#fUI/UIWindow.img/Quest/icon6/0#";
var aaa ="#fUI/Login.img/WorldNotice/2/0#";
var ttt ="#fUI/UIWindow.img/Quest/icon7/0#";
var kkk6 ="#fEffect/ItemEff/1004125/effect/default/0#";
var kkk5 ="#fEffect/ItemEff/1102672/effect/swingP1/0#";
var kkk4 ="#fEffect/ItemEff/1102617/effect/shoot2/0#";
var kkk3 ="#fEffect/Tomb/condition1/land/0#";
var kkk99 ="#fEffect/ItemEff/2420004/1/0#";
var kkk2 ="#fEffect/CharacterEff/moveRandomSprayEff/DAShieldChasing/effect/3/0#";
var kkk1 ="#fEffect/CharacterEff/moveRandomSprayEff/chillingStep/effect/0/0#";
var kkk ="#fEffect/CharacterEff/1051296/1/0#";
var zzz ="#fUI/UIWindow.img/Quest/icon5/0#";
var yyy ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var rrr ="#fUI/UIWindow2.img/Quest/list/recommendTitle#";
var ccc ="#fUI/UIWindowBT.img/WorldMap/BtHome/normal/0#";
var hhh ="#fUI/UIWindowBT.img/WorldMap/BtQsearch/mouseOver/0#";
var sz1 ="#fEffect/BasicEff/MainNotice/Content/Number/1/0#";
var kkk ="#fEffect/CharacterEff/1051294/2/0#";
var kkk8 ="#fEffect/CharacterEff/farmEnterTuto/mouseClick/3#";
var uiq ="#fEffect/CharacterEff/1082565/2/0#";
var uiq1 ="#fEffect/CharacterEff/1082565/1/0#";
var uiq2 ="#fEffect/CharacterEff/1082565/4/0#";
var uiq3 ="#fEffect/CharacterEff/1082565/0/0#";
var yun1 ="#fUI/UIWindow/Quest/icon7/10#";////紅色圓
var yun2 ="#fUI/UIWindow/Quest/icon8/0#";////藍指標
var yun4 ="#fUI/UIWindow/Quest/reward#";////獎勵
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var a = "#fEffect/CharacterEff/1082565/0/0#";  //餅乾兔子
var b = "#fEffect/CharacterEff/1112904/0/0#"; //彩色星星
var c = "#fEffect/CharacterEff/1003271/0/0#";  //紅色心心
var d = "#fEffect/CharacterEff/1112946/4/1#";  //鑽石
var e = "#fEffect/CharacterEff/1003252/1/0#"; //音樂
var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //愛心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //愛心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //磚石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //磚石藍
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz1 = "#fEffect/CharacterEff/1082565/2/0#";  //兔子藍
var tz = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var tz2 = "#fEffect/CharacterEff/1082565/0/0#";  //兔子灰色
var tz3 = "#fEffect/CharacterEff/1082588/0/0#";  //紅點
var tz4 = "#fEffect/CharacterEff/1082588/3/0#";  //藍點
var tz51 = "#fEffect/CharacterEff/1082588/1/0#";  //綠點
var tz6 = "#fEffect/CharacterEff/1112900/2/1#";  //音符藍
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符紅
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符綠
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符綠!
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //藍心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //紅心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黃星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //藍星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //紅星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花樣音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花樣音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花樣音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花樣音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花樣音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //紅星花
var yun ="#fUI/UIWindow/PartySearch2/BtNext/mouseOver/0#";////紅沙漏
var wn1 = "#fUI/Basic.img/BtClaim/normal/0#";  //警燈
var wn2 = "#fUI/UIWindowTW.img/TimeCapsule/BtClose/disabled/0#";  //叉叉
var wn3 = "#fUI/Basic.img/ComboBox/disabled/1#";  //白條
var wn4 = "#fUI/Basic.img/ComboBox3/mouseOver/1#";  //黃條
var wn5 = "#fUI/Basic.img/Cursor/17/16#";  //黃色圈
var wn6 = "#fUI/Basic.img/Cursor/34/0#";  //圈
var wn7 = "#fUI/Basic.img/Cursor/43/3#";  //藍圈
var wn8 = "#fUI/CashShop.img/CSBargainSale/BtLeft/normal/0#";  //黃色左
var wn9 = "#fUI/CashShop.img/CSBargainSale/BtRight/normal/0#";  //黃色右
var wn10 = "#fUI/CashShop.img/CSBeauty/tip/hair#";  //髮型提示
var wn11= "#fUI/CashShop.img/CSBeauty/hairColor/Enable/0#";  //黑
var wn12 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/1#";  //紅
var wn13 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/2#";  //橙
var wn14 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/3#";  //黃
var wn15 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/4#";  //綠
var wn16 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/5#";  //親
var wn17 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/6#";  //紫
var wn18 = "#fUI/CashShop.img/CSBeauty/hairColor/Enable/7#";  //褐
var wn19 = "#fUI/CashShop.img/CSEffect/event/0#";  //活動圖標
var wn20 = "#fUI/CashShop.img/CSEffect/hot/0#";  //人氣圖標
var wn21 = "#fUI/CashShop.img/CSEffect/mileage/0#";  //積分圖標
var wn22 = "#fUI/CashShop.img/CSEffect/new/0#";  //新品圖標
var wn23 = "#fUI/CashShop.img/CSEffect/sale/0#";  //折扣圖標
var wn24 = "#fUI/CashShop.img/CSEffect/time/0#";  //限量圖標
var wp110 = "#fUI/CashShop.img/CSEffect/number/0#";  //數字 後面改數字0-9
var wp111 = "#fUI/CashShop.img/CSEffect/number/1#";  //數字 後面改數字0-9
var wp112 = "#fUI/CashShop.img/CSEffect/number/2#";  //數字 後面改數字0-9
var wp113 = "#fUI/CashShop.img/CSEffect/number/3#";  //數字 後面改數字0-9
var wp114 = "#fUI/CashShop.img/CSEffect/number/4#";  //數字 後面改數字0-9
var wp115 = "#fUI/CashShop.img/CSEffect/number/5#";  //數字 後面改數字0-9
var wp116 = "#fUI/CashShop.img/CSEffect/number/6#";  //數字 後面改數字0-9
var wp117 = "#fUI/CashShop.img/CSEffect/number/7#";  //數字 後面改數字0-9
var wp118 = "#fUI/CashShop.img/CSEffect/number/8#";  //數字 後面改數字0-9
var wp119 = "#fUI/CashShop.img/CSEffect/number/9#";  //數字 後面改數字0-9
var wp2 = "#fUI/CashShop.img/CSIcon/0#";  //男圖標 0男-1女
var wp3 = "#fUI/CashShop.img/CSStatus/BtCharge/mouseOver/0#";  //儲值圖標
var wp4 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/0#";  //武器開頭
var wp5 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/1#";  //帽子
var wp6 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/2#";  //披風
var wp7 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/3#";  //長袍
var wp8 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/4#";  //上衣
var wp9 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/5#";  //褲子
var wp10 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/6#";  //鞋子
var wp11 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/7#";  //手套
var wp12 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/8#";  //飾品
var wp13 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/9#";  //眼飾
var wp14 = "#fUI/CashShop.img/CSSubTabBar/Tab/4/Disable/10#";  //效果結尾
var wp15 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/0#";  //斜線美化
var wp16 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/1#";  //斜線美化
var wp17 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/2#";  //斜線美化
var wp18 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/3#";  //斜線美化
var wp19 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/4#";  //斜線美化
var wp20 = "#fUI/mapleBingo.img/mapleBingo/lineAni/0/5#";  //斜線美化
var wi1 = "#fUI/SoulUI.img/DungeonMap/icon/dungeonItem/0#";  //星星圖標
var wi2 = "#fUI/SoulUI.img/DungeonMap/icon/soulFragment/0#";  //菱形圖標
var wi3 = "#fUI/SoulUI.img/DungeonMap/icon/soulTrap/0#";  //骷髏圖標
var wi4 = "#fUI/SoulUI.img/DungeonMap/icon/warpGate/0#";  //圓點圖標
var wi5 = "#fUI/SoulUI.img/DungeonParty/backgrnd2#";  //毛莫
var wi6 = "#fUI/StarCityUI.img/Board_Friend/list/0/5/selected#";  //剪刀石頭布
var wi7 = "#fUI/StarCityUI.img/Board_GameRank/tab/enabled/0#";  //遊戲排行
var wi8 = "#fUI/StarCityUI.img/Board_GameRank/user/myrank#";  //黃色條
var wi9 = "#fUI/StarCityUI.img/Board_GameRank/user/shining#";  //紫色條
var wi11 = "#fUI/UIPVP.img/ChampionMark/4#";  //徽章黃色
var wi12 = "#fUI/UIPVP.img/DmgEffect/DmgRed/excellentCritical#";  //特別危險藍//"+wp110+""+wp111+""+wp112+""+wp113+""+wp114+""+wp115+""+wp116+""+wp117+""+wp118+""+wp119+"
var wi13 = "#fUI/UIPVP.img/DmgEffect/DmgBlue/excellentCritical#";  //特別危險綠
var wi14 = "#fUI/UIPVP.img/MiniMapIcon/star#";  //黃星星
var wi15 = "#fUI/UIToolTip.img/Item/Equip/Star/Star1#";  //藍星星
var wn60 = "#fMob/0100101.img/die1/1#";  //蝸牛
var icon3 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/7#";//發呆
var icon4 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/6#";//憤怒
var icon5 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/3#";//大笑
var icon6 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/1#";//大笑
var f1 ="#fUI/UIWindow2.img/Quest/list/recommendTitle#";//推薦
var f2 ="#fUI/UIWindowBT.img/WorldMap/BtHome/normal/0#";//小房子
var f3 ="#fUI/UIWindowBT.img/WorldMap/BtQsearch/mouseOver/0#";//Q1
var f4 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";//藍心
var f5 = "#fUI/UIWindowBT.img/WorldMap/BtNext/mouseOver/0#";//綠箭頭 亮的 左
var f6 = "#fUI/UIWindowBT.img/WorldMap/BtNext/normal/0#";//綠箭頭 暗的 左
var f7 = "#fUI/UIWindowBT.img/WorldMap/BtBefore/mouseOver/0#";//綠箭頭 亮的 指著右
var f8 = "#fUI/UIWindowBT.img/WorldMap/BtBefore/normal/0#";//綠箭頭 暗的 指著右
var f9 = "#fUI/UIWindowBT.img/WorldMap/BtAnother/normal/0#";//藍方星星
var d1 = "#fUI/UIWindowBT.img/WorldMap/NoticeIcon/0#";//信封
var d2 = "#fUI/UIWindowBT.img/VesselUI/shipinfo/gauge/energy/0#";//紅條 左邊開始端
var d3 = "#fUI/UIWindowBT.img/VesselUI/shipinfo/gauge/energy/1#";//紅條 中間端
var d4 = "#fUI/UIWindowBT.img/VesselUI/shipinfo/gauge/energy/2#";//紅條 右邊結尾端
var d5 = "#fUI/UIWindowBT.img/VesselUI/shipinfo/gauge/level/0#";//綠條 左邊開始端
var d6 = "#fUI/UIWindowBT.img/VesselUI/shipinfo/gauge/level/1#";//綠條 中間端
var d7 = "#fUI/UIWindowBT.img/VesselUI/shipinfo/gauge/level/2#";//綠條 右邊結尾端
var d8 = "#fUI/UIWindowBT.img/Shaman_LevelUpIncentive/LevelUpPresent/clear#";//熊爪
var d9 = "#fUI/UIWindowBT.img/Shaman_LevelUpIncentive/LevelUpIncentivePopUp/failed#";//請確認背包
var d10 = "#fUI/UIWindow.img/Shop/meso#";//楓幣圖標
var d11 ="#fUI/UIWindow.img/Quest/icon6/0#";
var d12 ="#fUI/Login.img/WorldNotice/2/0#";//獎章
var d13 ="#fUI/UIWindowBT.img/WorldMap/BtHome/normal/0#";//房子
var d14 = "#fUI/UIWindowBT.img/WorldMap/Btnavi/normal/0#";//灣箭頭
var hwtext=new Array("人長得漂亮不如活得漂亮！","當褲子失去皮帶，才懂得什麼叫做依賴。","煙不聽話，所以我們'抽煙'。","你發怒一分鐘，便失去60秒的幸福。","當男人遇見女人，從此只有紀念日，沒有獨立日。","路見不平一聲吼，吼完繼續往前走。","幸福是個比較級，要有東西墊底才感覺得到。","知識就像內褲，看不見但很重要","作為失敗的典型，你實在是太成功了","女人喜歡長得壞壞的男人，不是喜歡長壞了的男人","跌倒了，爬起來再哭","你若流淚，先濕的是我的心","讓未來到來，讓過去過去","我自橫刀向天笑，笑完之後去睡覺","別跟我談感情，談感情傷錢","孤單是一個人的狂歡，狂歡是一群人的孤單","姐不是收破爛的，做不到讓你隨喊隨到","我不是草船，你的賤別往我這發","你的矮是終身的，我的胖卻是暫時的","別在無聊的時候來找我，不然顯得我是多餘的","姐不是電視機，不要老是盯著姐看","即使你已名花有主、我也要移花接木","心裡只有你一個頻道 最可恨的是還沒有廣告","給你最大的報復，就是活的比你幸福","要不是老師說不能亂扔垃圾，不然我早把你扔出去","沒有癩蛤蟆，天鵝也會寂寞","我是光棍我可恥，我給國家浪費紙","人生沒有如果，只有後果和結果","你那麼有錢 為什麼不讓鬼來推磨？","別把人和狗相提並論，狗最起碼忠誠","生活嘛，就是生下來，活下去","當你披上了婚紗 我也披上了袈裟","趁著年輕把能幹的壞事都幹了吧，沒幾年了","我人生只會兩件事 1 這也不會 2 那也不會","出租車司機，司機中的戰鬥機，噢耶! ","思想有多遠，你就給我滾多遠!","人生最大的悲哀是青春不在,青春痘卻還在。","最簡單的長壽秘決:保持呼吸，不要斷氣~","打死我也不說，你們還沒使美人計呢!","不要和我比懶,我懶得和你比","我不是個隨便的人 我隨便起來不是人","不怕虎一樣的敵人，就怕豬一樣的隊友","老虎不發威 你當我是HELLO KITTY！","吃自助最高境界：扶牆進，扶牆出。","爺爺都是從孫子走過來的……","夏天就是不好，窮的時候我連西北風都沒得喝","沒什麼事就不要找我，有事了更不要找我。","我想早戀，可是已經晚了……","錢可以解決的問題都不是問題。","天哪，我的衣服又瘦了！","不吃飽哪有力氣減肥啊？","連廣告也信，讀書讀傻了吧？","人怕出名豬怕壯，男怕沒錢女怕胖。","如果有錢也是一種錯，我情願一錯再錯","命運負責洗牌，但是玩牌的是我們自己！","好好活著，因為我們會死很久!","人又不聰明，還學人家禿頂！","我總在牛a與牛c之間徘徊。","不怕被人利用，就怕你沒用。","鄙視我的人這麼多，你算老幾? ","秀髮去無蹤，頭屑更出眾！","春色滿園關不住，我誘紅杏出牆來。","問世間情為何物？一物降一物","bmw是別摸我，msn是摸死你","女為悅己者容,男為悅己者窮！ ","念了十幾年書，還是幼兒園比較好混");
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
            var hwchance= Math.floor(Math.random()*hwtext.length);
            cm.sendSimple("" + e + "  " + e + "  " + e + "  " + e + "  " + e + "   " + e + "  " + e + "  " + e + "  " + e + "  " + e + "  " + e + "  " + e + "  " + e + "\r\n               < #e#r#h ##k#n >\r\n #k#b幽默時刻:#r"+hwtext[hwchance]+"#k\r\n          #b 伺服器當前時間：#r" + hour +":" + minute + ":" + second + "      \r\n#b" + e + "  " + e + "  " + e + "  " + e + "  " + e + "   " + e + "  " + e + "  " + e + "  " + e + "  " + e + "  " + e + "  " + e + "  " + e + "\r\n#L3##n#b" + icon5 + " 大轉盤 #n#r[新椅子/暴君/FFN/道具等！#n] #e5000樂豆點/次#n#l\r\n\r\n\#L2##b" + wn16 + " 特效戒指#l  #L7##b" + wn16 + " 購買坐騎#l  #L9##b" + wn16 + " 購買寵物#l \r\n#L10##b" + wn17 + " 楓葉交換#l  #L11##b" + wn17 + " #r免費餘額#n#l  #L12##b" + wn17 + " #r楓幣交換#n#l\r\n#L15##b" + wn15 + " #r抵#b機器人#n#l  #L17##b" + wn15 + " #b楓幣中介#n#l\r\n\r\n#L13##b" + icon6 + " #d#e隱藏的箱子 #r#n[超大椅子/暴君/FFN武器防具自選箱子]#n#l\r\n#L14##b" + icon3 + " #d#e召喚的怪物 #r#n[星星/楓點/閃炫方塊/未知楓幣包]#n#l");
        } else if (status == 1) {
            if (selection == 1) {
                    cm.dispose();
            cm.openNpc(9000154,1);
            }
            if (selection == 2) {
                        cm.dispose();
                cm.openNpc(9310470,"txjz");
            }
            if (selection == 7) {
                        cm.dispose();
                cm.openNpc(9310470,"chongqi");
            }
            if (selection == 9) {
                        cm.dispose();
                cm.openNpc(9310470,"0");
            }
            if (selection == 10) {
                        cm.dispose();
                cm.openNpc(9000041);
            }
            if (selection == 11) {
                        cm.dispose();
                cm.openNpc(9310470,"hqye1");
            }
            if (selection == 12) {
                        cm.dispose();
                cm.openNpc(9310470,"jbhdj");
            }
            if (selection == 13) {
                        cm.dispose();
                cm.openNpc(9310470,"RandBox");
            }
            if (selection == 14) {
                        cm.dispose();
                //cm.warp(109090103,0);
                        cm.openNpc(9310470,"zhaohuan");
            }
            if (selection == 15) {
                        cm.dispose();
                cm.openNpc(9310470,"dyj1");
            }
            if (selection == 16) {
                        cm.dispose();
                cm.openNpc(9000038,"chongqi");
            }
            if (selection == 17) {
                        cm.dispose();
                cm.openNpc(9310470,"ypzj");
            }
            if (selection == 18) {
                        cm.dispose();
                cm.openNpc(9100000,14);
            }
            if (selection == 19) {
                        cm.dispose();
                cm.openNpc(9310471);
            }
            if (selection == 20) {
                        cm.dispose();
                cm.openNpc(9900001,3014);
            }
            if (selection == 21) {
                        cm.dispose();
                cm.openNpc(9900001,90);
            }
            if (selection == 22) {
                        cm.dispose();
                cm.openNpc(9120106,3);
            }
            if (selection == 25) {
                        cm.dispose();
                cm.openNpc(9000154,25);
            }
            if (selection == 23) {
                        cm.dispose();
                cm.openNpc(9000154,26);
            }
            if (selection == 3) {
            //if(minute >= 1 && minute <= 59){
                    cm.dispose();
            cm.openNpc(9310470,3);
            //}else{
                        //cm.dispose();
            //cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n#b 註：每小時30分開啟，時限5分鐘。");
            //}
            }
            if (selection == 4) {
            if(minute >= 40 && minute <= 45){
                    cm.dispose();
            cm.openNpc(9000154,4);
            }else{
                        cm.dispose();
            cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n#b 註：每小時40分開啟。時限5分鐘。");
            //cm.sendOk("該活動已經結束！");
            }
            }
            if (selection == 5) {
            if(hour == 10 && minute <= 2 ){
                    cm.dispose();
            cm.openNpc(9900006,5);
            }else{
                        cm.dispose();
            cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n #b註：大轉盤活動每早上晚上10點開啟。時限2分鐘。");
            }
            }
            if (selection == 6) {
            if(minute >= 1 && minute <= 59){
                    cm.dispose();
            cm.openNpc(9000154,6);
            }else{
                        cm.dispose();
            cm.sendOk(">當前時間：#r<" + year +"年"+ month +"月"+ day + "日"+ hour +"時"+ minute +"分"+ second +"秒>\r\n#b 註：每小時40分開啟。時限5分鐘。");
            //cm.sendOk("該活動已經結束！");
            }
            }
        }
    }
}    