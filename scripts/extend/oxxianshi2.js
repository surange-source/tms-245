/*
 * 菜菜製作 奇幻楓之谷工作室所有
 * 修改人：AND 3812049
 * 歡迎定制各種腳本
 * OX問答副本  問題顯示NPC
 */

var status = 0;
var questions = new Array("鐵觀音是哪裡出產的名茶？\r\nO:安徽\tX:福建", //false,
        "蜂蜜用那種水沖泡更好？\r\nO:溫水\tX:冰水", //true,
        "以下哪種菜系不屬於中國八大菜系之列？\r\nO:鄂菜\tX:皖", //true,
        "黃瓜不宜與下列哪種食物搭配？\r\nO:番茄\tX:雞蛋", // true,
        "黃鶴樓在什麼地方？\r\nO:武漢\tX:廣州", //true,
        "東方明珠是世界第幾高塔？\r\nO:第四\tX:第六", //false,
        "火影忍者疾風傳主角名字\r\nO:漩渦鳴人\tX:大蛇丸", //true
        "蝦米可愛嗎？\r\nO:可愛\tX:非常可愛", //false
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

var em;

function start() {
    em = cm.getEventManager("OXEvent");
    if (em == null) {
        cm.sendOk("出現錯誤，請重新進入副本。");
    } else {
        var QuestionIndex = em.getProperty("question");
        if (QuestionIndex == null) {
            cm.sendOk("取回數據失敗。");
        } else {
            CheckPlayerPosition(answers[parseInt(QuestionIndex)]);
        }
    }
}


function CheckPlayerPosition(answers) {//通過答案查看玩家的所站的位置是否正確
    var Xpos = cm.getPlayer().getTruePosition().getX();
    if (Xpos >= -562 && Xpos <= 150) {
        if (answers) {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("嗯……。回答錯誤，罰你出去！");
                cm.playerMessage(5, "真遺憾呢……！下次再接再厲吧！！");//顯示10秒
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        } else {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
            cm.dispose();
        }
    } else if (Xpos >= -1500 && Xpos <= -802) {//O部分
        if (answers) {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
            cm.dispose();
        } else {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("嗯……。回答錯誤，罰你出去！");
                cm.playerMessage(5, "真遺憾呢……！下次再接再厲吧！！");//顯示10秒
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        }
    } else {//如果是咱在中立部分，就踢他出去這個
        if (em.getProperty("OXEventState") > 5) {
            cm.warp(910000000, 0);//
            cm.sendOk("嗯……。這是一個對或錯的問題，你站中間是幾個意思？");
            cm.playerMessage(5, "真遺憾呢……！下次再接再厲吧！！");//顯示10
        } else {
            cm.showEffect(false, "quest/party/wrong_kor");
            cm.playSound(false, "Party1/Failed");
            //cm.sendOk("嗯……。這是一個對或錯的問題，你站中間是幾個意思？");
        }
        cm.dispose();
    }
}
