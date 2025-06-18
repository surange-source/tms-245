/*
 * 菜菜製作 奇幻楓之谷工作室所有
 * 修改人：AND 3812049
 * 歡迎定制各種腳本
 * OX問答副本  問題顯示NPC
 */
var questions = new Array("鐵觀音是哪裡出產的名茶？\r\nO:安徽\tX:福建", //false,
        "蜂蜜用那種水沖泡更好？\r\nO:溫水\tX:冰水", //true,
        "以下哪種菜系不屬於中國八大菜系之列？\r\nO:鄂菜\tX:皖", //true,
        "黃瓜不宜與下列哪種食物搭配？\r\nO:番茄\tX:雞蛋", // true,
        "黃鶴樓在什麼地方？\r\nO:武漢\tX:廣州", //true,
        "東方明珠是世界第幾高塔？\r\nO:第四\tX:第六", //false,
        "火影忍者疾風傳主角名字\r\nO:漩渦鳴人\tX:大蛇丸", //true
        "尼瑪可愛嗎？\r\nO:可愛\tX:非常可愛", //false
        "GTO麻辣教師是哪種類型的？\r\nO:動漫\tX動漫和電視劇", //false
        "夜間行車遠光會造成什麼影響？\r\nO:短暫性致盲\tX:毫無影響", //true
        "世界上最小的鳥是什麼鳥？\r\nO:蜂鳥\tX:小燕子", //true
        "世界上跑得最快的是什麼？\r\nO:金錢豹\tX:鴕鳥", //false
        "和諧號高鐵最高時速能達到多少？\r\nO:300\tX:500", //false
        "阿蘇頓馬丁是什麼？\r\nO:人名\tX:跑車", //false
        "LOL裡的大龍叫全名叫什麼？\r\nO:納什男爵\tX:無敵大龍", //true
        "楓之谷裡只有冒險家一種法師嗎？\r\nO:是\tX:不是", //false
        "時速100碼的汽車緊急制動需要多久能停？\r\nO:40-45秒\tX:50-60秒", //true
        "LOL裡的墮落天使叫什麼？\r\nO:墮天使\tX:莫甘娜", //false
        "老虎屬於什麼類動物？\r\nO:貓科動物\tX:爬行動物", //true
        "花兒為什麼是香的？\r\nO:那是因為我\tX:那是因為你", //true
        "一直被模範從未被超越是為啥？\r\nO:太給力\tX:哥是你模仿不了的", //false
        "蒙奇?D?路飛的爺爺叫什麼？\r\nO:蒙奇?D?卡普\tX:蒙奇?D?多拉格", //true
        "蒙奇?D?路飛跟誰學會的霸氣？\r\nO:博雅漢庫克\tX:冥王雷利", //false
        "瀧澤蘿拉是？\r\nO:模特\tX:日本女優", //false
        "中國死海位於哪裡？\r\nO:四川\tX:重慶", //true
        "毛澤東故鄉在哪裡？\r\nO:長沙\tX:湘潭", //false
        "長隆水上樂園在哪裡？\r\nO:廣州\tX:深圳" //true
        );
var answers = new Array(false, true, true, true, true, false, true, false, false, true, true, false, false, false, true, false, true, false, true, true, false, true, false, false, true, false, true);

var asked = new Array();//判斷已經回答的個數
var currentQuestion;
var eim;
var mapidPre = 910048000;//準備地圖
var mapid = 910048100;//進行地圖
var map;
var setupTask;
var setupTaskEvent;

function init() {
    scheduleNew();
    eim = em.newInstance("OXEvent")
    map = eim.getMapInstance(mapid);
    ResetProperty();
}

function ResetProperty() {
    em.setProperty("OXEventState", "0");
    em.setProperty("start", "0");
    em.setProperty("question", "0");
    em.setProperty("RightAnwser", "0");//得到問題的正確答案
    asked = Array();
    //setupTaskEvent.cancel(true);
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 1;//1分鐘檢查一次時間
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}


function startEvent() {
    if (em.getProperty("start") == "1") {//已經可以讓後面的玩家進來了。
        if (eim.getMapFactoryMap(mapid).getCharactersSize() == 0) {
            ResetProperty();//如果活動地圖沒人，自動釋放開啟入口等待下一個人的進入。
            scheduleNew();
        } else {
            for (var i = 0; i < eim.getMapFactoryMap(mapid).getCharactersSize(); i++) {
                if (eim.getMapFactoryMap(mapid).getCharactersSize() != 0) {
                    map.startMapEffect("現在有3分鐘的時間等候其它玩家，請稍後！", 5121052);
                    //eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(180));//10秒
                    eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277,"oxxianshi");//問題顯示NPC
                }
            }
            em.broadcastServerMsg("[OX賓果活動] OX賓果活動已經開始了，現在大約有3分鐘的報名時間，請速度到拍賣報到！");
            em.setProperty("start", "2");//等待狀態
            setupTaskEvent = em.schedule("WatingStatus", 1000 * 60 * 3, eim);//3分鐘後檢查問題
        }
    } else if (em.getProperty("start") == "3") {//關閉入口狀態
        if (eim.getMapFactoryMap(mapid).getCharactersSize() == 0) {
            ResetProperty();//如果活動地圖沒人，自動釋放開啟入口等待下一個人的進入。
            scheduleNew();
            cancelSchedule();
        }
    } else if (em.getProperty("start") == "4") {//任務完成狀態
        ResetProperty();//如果活動地圖沒人，自動釋放開啟入口等待下一個人的進入。
        scheduleNew();
    } else {
        ResetProperty();
        scheduleNew();
    }
}

function WatingStatus(eim) {
    if (em.getProperty("start") == "2") {//等待狀態
        em.setProperty("start", "3");//關閉入口，不允許進入
        if (eim.getMapFactoryMap(mapid).getCharactersSize() == 0) {
            ResetProperty();
            scheduleNew();//再次循環
        }
        if (eim.getMapFactoryMap(mapid).getCharactersThreadsafe() != 0) {//如果開始了的話
            setupTaskEvent = em.schedule("QuetionStart", 1000 * 10, eim);//10秒後檢查問題
            for (var i = 0; i < eim.getMapFactoryMap(mapid).getCharactersSize(); i++) {
                if (eim.getMapFactoryMap(mapid).getCharactersSize() != 0) {
                    //eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(10));//10秒
                    //  eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "將在10秒後出題，請做好準備！");
                    eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "將在10秒後出題，請做好準備！");
                }
            }
            // map.startMapEffect("將在10秒後出題，請做好準備！", 5121052);
        } else {
            ResetProperty();
            scheduleNew();//再次循環
        }
    } else {
        if (eim.getMapFactoryMap(mapid).getCharactersSize() == 0) {
            ResetProperty();
            scheduleNew();//再次循環
        }
    }
}

function QuetionStart(eim) {//問題提出部分
    if (asked.length != 20) {
        currentQuestion = Math.floor(Math.random() * questions.length);
        asked.push(currentQuestion);
        em.setProperty("question", currentQuestion);//得到問題的index
        for (var i = 0; i < eim.getMapFactoryMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactoryMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277,"oxxianshi1");//問題顯示NPC
            }
        }
        setupTaskEvent = em.schedule("AfterQuestion", 1000 * 15, eim);//15秒後檢查問題
        for (var i = 0; i < eim.getMapFactoryMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactoryMap(mapid).getCharactersSize() != 0) {
                //eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(15));//15秒
                eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "將在15秒後檢查問題！請站好正確的位置！");
                //    eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "將在15秒後檢查問題！請站好正確的位置！");
            }
        }
        //map.startMapEffect("將在30秒後檢查問題！請站好正確的位置！", 5121052);
    } else {//已經回答了20道題目
        for (var i = 0; i < eim.getMapFactoryMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactoryMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277,"oxxianshi3");//餘下人員獎勵NPC,這個NPC要直接把玩家送出地圖
            }
        }
        em.setProperty("start", "4");//任務完成狀態
        scheduleNew();//再次循環
    }
    em.setProperty("OXEventState", asked.length);
}

function AfterQuestion(eim) {//問題檢查部分
    em.setProperty("question", currentQuestion);//得到問題的index
    for (var i = 0; i < eim.getMapFactoryMap(mapid).getCharactersSize(); i++) {
        eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277,"oxxianshi2");//問題檢查NPC
    }
    for (var i = 0; i < eim.getMapFactoryMap(mapid).getCharactersSize(); i++) {
        if (eim.getMapFactoryMap(mapid).getCharactersSize() != 0) {
            //eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 2);//問題檢查NPC
            eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "將在5秒後再次出題！");
            // eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "將在5秒後再次出題！");
            //eim.getMapFactoryMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(5));//5
        }//避免報錯
    }
    //map.startMapEffect("將在10秒後再次出題！", 5121052);
    if (eim.getMapFactoryMap(mapid).getCharactersSize() != 0) {//避免報錯
        setupTaskEvent = em.schedule("QuetionStart", 1000 * 5, eim);//5秒後再次出題
    } else {
        scheduleNew();//再次循環
        ResetProperty();
    }
}
