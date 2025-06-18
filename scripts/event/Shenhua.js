/*
 副本：    神話副本
 作者：    Memory
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
    Array(4033924, 700), //神話耳環藍圖
    Array(2432013, 800),  //女神之淚
    Array(2432013, 800),  //女神之淚
    Array(2432013, 800),  //女神之淚
    Array(2432013, 800),  //女神之淚
    Array(2432014, 200), //女神之血滴
    Array(1113077, 300),  //絕對之戒
    Array(5062010, 500),  //終極方塊
    //Array(1032205, 200),  //神話耳環
    Array(2431354, 100),  //星火幸運箱子
    Array(4033356, 200),  //正義火種
    Array(3010879, 100), // 繁星椅子, 300), // 由中國玩家"小術"設計的的夏日天空星星椅子。每10秒中恢復HP，MP各500。
    Array(3010895, 300), // 阿卡伊農童話書椅子, 300), // 感覺和阿卡伊農的關係好像變得親近一些的椅子。每10秒HP恢復100，MP恢復50。
    Array(3010896, 300), // 我的女皇椅子, 300), // 可以感覺到女王的火熱人氣的椅子。每10秒HP恢復100，MP恢復50。
    Array(3010897, 300), // 生日快樂，惡魔, 300), // 坐在椅子上的惡魔殺手的表情感覺很奇怪。每10秒HP恢復100，MP恢復50。
    Array(3010898, 200), // 迷你神獸椅子, 300), // 坐在迷你神獸椅子上時，每10秒HP恢復50，MP恢復50。
    Array(3010899, 200), // 擺鐘椅子, 300), // 坐在鐘擺椅子上時，每10秒HP恢復50，MP恢復50。
    Array(3010900, 200), // 寶石楓葉椅子, 300), // 用寶石做成的閃亮楓葉椅子。坐下後每10秒恢復HP 40, MP 20。
    Array(3010901, 200), // 熱情的紅色藥水椅子, 300), // 和其他藥水椅子相比，可以更快地恢復HP的紅色藥水椅子。每10秒HP恢110，MP恢復50。
    Array(3010902, 300), // 新鮮的藍色藥水椅子, 300), // 和其他藥水椅子相比，可以更快地恢復MP的藍色藥水椅子。每10秒HP恢復100，MP恢復60。
    Array(3010903, 300), // 兔子椅子, 300), // 坐在上面，每10秒HP恢復100，MP恢復50的兔子椅子。
    Array(3010904, 200), // 椰子樹沙灘椅, 300), // 放在納希沙漠涼爽的椰子樹下的沙灘椅。坐在上面，每10秒HP恢復40，MP恢復20。
    Array(3010905, 200), // 柿子樹鞦韆, 300), // 吊掛在掛滿成熟柿子的柿子樹上的鞦韆。
    Array(3010906, 200), // 雲朵洗手間椅子, 300), // 裝修豪華的洗手間。裡面一切應有盡有。每10秒HP恢復100，MP恢復50。
    Array(3010907, 200), // 公沙沙兔靠墊, 300), // 靠著可愛的公沙沙兔坐著，每10秒HP恢復60。
    Array(3010908, 200), // 海藍天鵝絨沙發, 300), // 奢華的海藍色天鵝絨沙發。坐在上面，每10秒HP恢復60。
    Array(3010909, 200), // 紅色設計師椅子, 300), // 採用明亮紅色的設計師椅子。坐在上面，每10秒HP恢復60。
    Array(3010910, 200), // 艾莉珍椅子, 300), // 可以成為可愛的少女艾莉珍的好朋友。每10秒HP恢復50，MP恢復50。
    Array(3010911, 200), // 紅帽月妙抱枕椅, 300), // 坐在抱枕椅上就可以看到戴著紅色帽子的可愛月妙的才藝。
    Array(3010912, 200), // 藍帽月妙抱枕椅, 300), // 坐在抱枕椅上就可以看到戴著藍色帽子的可愛月妙的才藝。
    Array(3010913, 200), // 扇子月妙抱枕椅, 300), // 坐在抱枕椅上就可以觀賞拿著扇子走繩索的月妙的才藝。
    Array(3010914, 200), // 太平蕭月妙抱枕椅, 300), // 坐在抱枕椅上就可以觀賞史出渾身力量演奏的月妙。
    Array(3010915, 200), // 惡靈附身的娃娃椅子, 300), // 惡靈附身的娃娃椅子。坐在上面，每10秒HP恢復50。
    Array(3010916, 200), // 粉紅沙灘遮陽傘, 300), // 讓人想起涼爽的大海的粉紅色沙灘遮陽傘。坐在上面，每10秒HP恢復60。
    Array(3010917, 200), // 紅色龍椅, 300), // 有嚴肅的火龍相伴的椅子。每10秒HP恢復50，MP恢復50。
    Array(3010918, 200), // 藍色龍椅, 300), // 有嚴苛的青龍相伴的椅子。每10秒HP恢復50，MP恢復50。
    Array(3010919, 200), // 精靈王座, 300), // 為精靈之王製作的椅子。每10秒HP恢復100，MP恢復50。
    Array(3010920, 200), // 水晶月亮, 300), // 怪盜幻影專用椅子，坐下去後每10秒都能恢復HP。
    Array(3010921, 200), // 彩蛋籃子, 300), // 籃子中塞滿五彩繽紛的彩蛋!\n每10秒鐘恢復HP40,MP40.
    Array(3010922, 200), // 悠長假期(紅色), 300), // 坐在上面可享受悠閒的紅色悠長假期,每10秒鐘恢復MP 20.
    Array(3010923, 200), // 10週年椅子, 300), // 為紀念楓之谷10週年而製作的巨無霸椅子。每10秒鐘，HP和MP各恢復50.
    Array(3010936, 50), // 青蛙跳樓機, 300), // 由中國玩家「小術」設計的可同時乘坐多人的青蛙跳樓機椅子。坐下時，每10秒中，可恢復HP，MP各500。
    Array(3010894, 200), // 一杯蘑菇的悠閒, 300), // 享受一杯蘑菇的濃郁的香味。坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010747, 200), // 和風紙鳶椅子, 300), // 充滿和風的紙鳶椅子。坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010748, 200), // 日式拉麵椅, 300), // 濃郁的日式傳統拉麵，香氣四溢。坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010750, 300), // 焦糖布丁椅子, 300), // 軟軟的焦糖布丁，香甜可口。坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010795, 100), // 森林中休息處(椅子), 300), // 可以在寧靜的森林中休息的椅子。坐上時，每10秒恢復HP、MP500。
    Array(3010794, 200), // 抖動的舌頭椅子, 300), // 抖動的舌頭椅子，坐在上面隨時可能被醜陋的怪物吃掉哦。坐上時，每10秒恢復HP、MP500。
    Array(3010799, 200), // 墳墓幽靈椅子, 300), // 坐在椅子上，將化身為遊走在墳墓中的幽靈。坐上時，每10秒恢復HP、MP500。
    Array(3010714, 200), // 堆王冠, 300), // 由5個不同顏色的王冠一層層堆積起來的椅子。坐上時，每10秒恢復HP、MP500。
    Array(3010732, 200), // 翅膀自行車椅子, 300), // 坐上時，每10秒恢復HP、MP500。
    Array(3012019, 50), // 愛琴海椅子, 300), // 由中國玩家「小術」設計的雙人椅子。在浪漫的愛情海，和喜歡的人一起坐在聖愛殿堂中，感受幸福與甜蜜。兩人靠近後坐下會出現愛琴海聖愛殿堂的浪漫特效。坐上時，每10秒恢復HP、MP500。
    Array(3010813, 100), // 愛情水晶球的回憶, 300), // 由中國玩家「小術」設計的椅子。裝滿了滿滿幸福甜蜜回憶的愛情水晶球。坐上時，每10秒恢復HP、MP500。
    Array(3012020, 50), // 紫籐花吊籃椅, 300), // 由中國楓之谷玩家「小術」設計的情侶椅子，兩個人坐一起時產生漂亮的背景效果，每5秒恢復HP/MP 500
    Array(3010820, 100), // 迷你玩具別墅椅子, 300), // 想休息的時候，就到我的別墅來。每10秒，HP恢復500，MP恢復500。
    Array(3010806, 50), // 桃櫻芳菲椅, 300), // 百花齊放，愜意蘑菇。每10秒鐘恢復HP50、MP50。
    Array(3010780, 50), // 旋轉木馬, 300), // 承載著夢想的木馬，帶你駛向幸福的彼岸。坐上時，每10秒恢復HP、MP100。
    Array(3010779, 100), // 金馬祥雲轎, 300), // 由中國玩家「小術」設計。金馬祥雲轎，騰雲駕霧來報到。象徵馬年吉祥如意的椅子。坐上時，每10秒恢復HP、MP500。
    Array(3010781, 200), // 馬上有你, 300), // 和好朋友小馬馬坐在一起。坐上時，每10秒恢復HP、MP500。
    //Array(3010788, 50), // 巨無霸年夜飯, 300), // 由中國玩家「小術」設計。農曆除夕，在鞭炮聲中圍座在一起，共同辭舊迎新一起享受美味的巨無霸團圓飯。坐上時，每秒恢復HP、MP各500。
    Array(3010783, 50), // 藍色邦尼屋, 300), // 歡迎來到邦尼快樂的家～每10秒HP恢復50，MP恢復50。
    Array(3010797, 50), // 新娘春節椅子, 300), // 和精靈遊俠新娘一起迎接春節的到來。每10秒HP恢復50，MP恢復50。
    Array(3010798, 50), // 焰火椅子, 300), // 兩邊有焰火綻放的高級椅子。可能稍微有點危險……每10秒HP恢復50，MP恢復50。
    Array(3010800, 300), // 小學生月妙拜年椅子, 300), // 感覺好像得給錢才行，但是不僅不扣減楓幣，還會每10秒HP恢復50，MP恢復50。
    Array(3010801, 300), // 學齡前月妙拜年椅子, 300), // 感覺好像得給錢才行，但是不僅不扣減楓幣，還會每10秒HP恢復50，MP恢復50。
    Array(3010802, 300), // 中學生月妙拜年椅子, 300), // 感覺好像得給錢才行，但是不僅不扣減楓幣，還會每10秒HP恢復50，MP恢復50。
    Array(3010803, 300), // 高3月妙拜年椅子, 300), // 感覺好像得給錢才行，但是不僅不扣減楓幣，還會每10秒HP恢復50，MP恢復50。
    Array(3010804, 300), // 軍人月妙拜年椅子, 300), // 到了一定的年紀，得接受軍人的拜年。每10秒HP恢復50，MP恢復50。
    Array(3010810, 200), // 火車旅行椅, 300), // 坐著火車去旅行吧！坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010811, 200), // 嫩芽椅, 300), // 可以感覺到春天綠色的氣息。坐在嫩芽上，感受春天的情趣吧。每10秒HP恢復50，MP恢復50。
    Array(3010812, 100), // 旋轉木馬椅, 300), // 快樂的遊樂園。坐在旋轉木馬上，度過快樂的時光。每10秒HP恢復50，MP恢復50。
    Array(3010814, 300), // 粉絲抱枕椅子, 300), // 粉絲抱枕椅子，坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010815, 100), // 單身部隊海報椅, 300), // 肉麻的炫耀只會讓我們變得更強。我們是無敵的單身部隊！\r\n#c每10秒HP/MP恢復50
    Array(3010835, 200), // 愛情水晶球記憶椅, 300), // 沉浸在甜蜜的愛情回憶中吧。每10秒HP恢復50，MP恢復50。\n中國楓之谷玩家[小術]設計的椅子。
    Array(3010844, 200), // 麻辣教室椅子, 300), // 我就是我，誰也不能阻攔我！坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010851, 200), // 夏日沁飲椅子, 300), // 炎炎夏日，只有它才能讓你清涼舒爽。坐下時，每10秒中，可恢復HP，MP各50。
    Array(3010852, 200), // 鮮花椅, 300), // 和春天盛開的美麗鮮花在一起。每10秒HP恢復50，MP恢復50。
    Array(3010854, 200), // 神秘怪物共聚一堂！, 300), // 揭開神秘面紗的怪物們和太古蘑菇一起慶祝11週年。每10秒HP恢復50，MP恢復50。
    Array(3010789, 200), // 爆竹聲聲, 300), // 爆竹聲聲迎新年！坐在上面的話，每10秒回復200點HP、200點MP
    Array(3010606, 200), // 未上色的名畫椅子, 300), // 這幅空的畫布，呼喚你為它塗上絢麗的色彩。坐在上面時，每10秒HP恢復10點，MP恢復10點。
    Array(3010608, 200), // 完美的名畫椅子, 300), // 天啊，看看這幅傑作！這線條和這色彩，如此炫目，如此令人驚歎！坐在上面時，每10秒HP恢復50點，MP恢復50點。
    Array(1072337, 100), // 喜洋洋拖鞋, 100), // (無描述)
    Array(1112254, 100), // 豪華珍珠聊天戒指, 100), // 由中國楓之谷玩家小術設計，在海底珍珠玲瓏光芒的環繞下輕鬆愉快的聊天吧。
    Array(1112143, 100), // 豪華珍珠名片戒指, 100), // 由中國楓之谷玩家小術設計，在海底珍珠玲瓏光芒的環繞下展示自己的暱稱吧。
    Array(1112118, 100), // 可樂名片戒指, 100), // 角色造型下面，以可口可樂顏色作為底色，以白色字體顯示角色名稱。
    Array(1112119, 50), // 可樂(Red) 名片戒指, 100), // 角色造型下面，以可口可樂顏色作為底色，以白色字體顯示角色名稱。
    Array(1112120, 100), // 可樂(White) 名片戒指, 100), // 角色造型下面，以可口可樂顏色作為底色，以紅色字體顯示角色名稱。
    Array(1112228, 100), // 可樂聊天戒指, 100), // 角色對話的時候，聊天窗會變成可口可樂樣子
    Array(1112229, 100), // 可樂(Red)聊天戒指, 100), // 角色對話的時候，聊天窗會變成類似可口可樂樣子
    Array(1112230, 100), // 可樂(White)聊天戒指, 100), // 角色對話的時候，聊天窗會變成類似可口可樂樣子
    Array(1002524, 100), // 可樂帽, 100), // (無描述)
    Array(1702533, 100), // 奶兔立拍得, 100), // 由中國玩家「小術」設計的奶兔立拍得。\n可以裝備在#c所有武器#上的武器。
    Array(1702020, 100), // 棒棒糖, 100), // 可裝備在#c/單手劍/單手斧/單手棍/短杖/長杖/短劍/魔法棒/的主武器#上。
    Array(1702459, 100), // 棉花糖武器, 100), // 攻擊時可以看到羊形態的棉花糖。可裝備在#c所有的主武器#上。
    Array(1702302, 100), // 杯具, 100), // 可裝備在#c除了/手炮/雙弩槍/以外的主武器#上。
    Array(1042285, 100), // 拼色點點T恤, 100), // (無描述)
    Array(1042204, 100), // 漢堡T恤, 100), // (無描述)
    Array(1112103, 100), // 嫩黃名片戒指, 100), // 在角色的下面出來黃底黑字角色名。
    Array(1112253, 100), // 木乃伊對話框戒指, 100), // 角色對話時, 顯示繃帶對話框。
    Array(1112142, 100), // 木乃伊名片戒指, 100), // 在角色下面的繃帶上顯示角色名。
    Array(1112135, 100), // 水墨花名片戒指, 100), // 在角色腳底下，用以水墨畫背景用白色的字體顯示角色名字。
    Array(1112238, 100), // 水墨花聊天戒指, 100), // 角色在聊天時，會出現水墨畫對話框。
    Array(1003588, 100), // 玩具粉熊帽子, 100), // (無描述)
    //130裝備
    Array(3800747, 210), // 豪華阿加雷斯猩紅黃道劍
    Array(4033356, 290), // 豪華阿加雷斯拳刃
    Array(2430026, 200), // 豪華阿加雷斯頭盔(名字顯示有問題）
    Array(2430026, 200), // 豪華阿加雷斯錘
    Array(4001839, 230), // 豪華阿加雷斯雙手劍
    Array(4001839, 220), // 豪華阿加雷斯拳套（名字顯示有問題)
    Array(4000313, 210), // 豪華阿加雷斯大槌
    Array(2431945, 250), // 豪華阿加雷斯之矛
    Array(2431944, 250), // 豪華阿加雷斯之矛
    Array(1332194, 290), // 豪華赫爾巴斯獵手
    Array(1362068, 290), // 豪華赫爾巴斯手杖         
    Array(1472180, 290), // 豪華赫爾巴斯手套
    Array(1212043, 290), // 豪華艾裡格斯閃亮克魯
    Array(1372140, 290), // 豪華艾裡格斯短杖
    Array(1382169, 290), // 豪華艾裡格斯笞鞭
    Array(1252030, 290), // 豪華艾裡格斯貓梳魔法棒
    Array(1452171, 290), // 豪華伊布斯長弓
    Array(1462160, 290), // 豪華伊布斯弩
    Array(1522072, 290), // 豪華伊布斯雙弩槍
    Array(1222043, 290), // 豪華維帕爾血月
    Array(1242046, 290), // 豪華維帕爾獅蠍劍
    Array(1482141, 290), // 豪華維帕爾指虎手套
    Array(1492153, 290), // 豪華維帕爾之鷹
    Array(1532075, 290), // 豪華維帕爾火炮
    Array(1003589, 290), // 豪華阿加雷斯頭箍
    Array(1003592, 290), // 豪華赫爾巴斯頭箍
    Array(1003590, 290), // 豪華艾裡格斯頭箍
    Array(1003591, 290), // 豪華伊布斯頭箍
    Array(1003593, 290), // 豪華維帕爾頭箍
    Array(1052498, 290), // 豪華阿加雷斯鎖子甲
    Array(1052501, 290), // 豪華赫爾巴斯鎖子甲
    Array(1052499, 290), // 豪華艾裡格斯鎖子甲
    Array(1052500, 290), // 豪華伊布斯鎖子甲
    Array(1052502, 290), // 豪華維帕爾鎖子甲
    Array(1102445, 290), // 豪華阿加雷斯披風
    Array(1102448, 290), // 豪華赫爾巴斯披風
    Array(1102446, 290), // 豪華艾裡格斯披風
    Array(1102447, 290), // 豪華伊布斯披風
    Array(1102449, 290), // 豪華維帕爾披風
    Array(1082466, 290), // 豪華阿加雷斯手套
    Array(1082469, 290), // 豪華赫爾巴斯手套
    Array(1082467, 290), // 豪華艾裡格斯手套
    Array(1082468, 290), // 豪華伊布斯手套
    Array(1082470, 290), // 豪華維帕爾手套
    Array(1072703, 290), // 豪華阿加雷斯靴
    Array(1072706, 290), // 豪華赫爾巴斯靴
    Array(1072704, 290), // 豪華艾裡格斯靴
    Array(2431926, 50), // 豪華伊布斯靴
    Array(2213016, 290) // 豪華維帕爾靴
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("Shenhua");
    eim.setInstanceMap(262030100).resetPQ(level);
    eim.setInstanceMap(262030200).resetPQ(level);
    var map = eim.setInstanceMap(262030300);
    map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
    mobid = 9300600;
    mob = em.getMonster(mobid);
    mob.getStats().setHp(mob.getMobMaxHp() * 90);
    mob.getStats().setMp(mob.getMobMaxMp() * 999);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(262030300);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0, -85));
    var map2 = eim.getMapInstance(262030200);
    mobid = 8870005;
    mob = em.getMonster(mobid);
    mob.getStats().setHp(mob.getMobMaxHp() * 400);
    mob.getStats().setMp(mob.getMobMaxMp() * 199);
    map2.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1132, 196));
    eim.startEventTimer(1000 * 60 * 60);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[神話副本] 進入到了挑戰地圖，請小心行事。");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[神話副本] 真遺憾！已超過限定挑戰時間，本次挑戰失敗！別氣餒，期待更加強大的您前來挑戰~");
    eim.disposeIfPlayerBelow(100, 262030000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}

function playerRevive(eim, player) {
    var map = em.getMapFactory().getMap(262030000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 262030000);
    return false;
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 262030100:
        case 262030200:
        case 262030300:
            return;
    }
    
    player.dropMessage(6, "[神話副本] 已退出挑戰。");
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 262030000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 262030000);
}



function playerDisconnected(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 262030000);
        if (setupTask!=null)
            setupTask.cancel(true);
        eim.dispose();
    }
    return 0;
}


function monsterValue(eim, mobid) {
    return 1;
}

function allMonstersDead(eim) {
    var map = em.getMapFactoryMap(262030300);
    var players = map.getCharacters().iterator();
    while (players.hasNext()) {
        var player = players.next();
            player.setPQLog("希臘[椅子道具]");
    }
    if (em.getProperty("state").equals("1")) {
        eim.setProperty("giftcount","0");
        roll(eim);
        eim.startEventTimer(1000 * 60 * 5);
        eim.broadcastPlayerMsg(6, "[神話副本] 10秒後開啟寶箱，擲點時請勿進行其他操作，並且需要在10秒鐘內做出需求選擇，否則將會被強制下線。");
        //em.broadcastServerMsg(5120059, "[神話副本] 希拉已被擊敗，10秒後將開出寶箱。" ,true);
        var map = eim.getMapInstance(262030300);
        map.startMapEffect("[神話副本] 希拉已被擊敗，10秒後將開出寶箱。", 5120059);
    }
}

function roll(eim) {
    MaxRandom = 0;
    var count = eim.getProperty("giftcount");
    var rewardPlayer = null;
    //第二次開始,統計上一次ROLL點玩家結果，並發放獎勵。
    if ((count*1)>=1) {
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            var charName = eim.getPlayers().get(i).getName();
            var charId = eim.getPlayers().get(i).getId();
            //推送ROLL點信息
            for (var j = 0; j < eim.getPlayerCount(); j++) {
                var notice =  "[神話副本] 玩家 "+charName+" 擲出了 "+eim.getProperty("charid_"+charId)+"點";
                if ((eim.getProperty("charid_"+charId)*1)==0) {
                    notice =  "[神話副本] 玩家 "+charName+" 放棄了擲點";
                }
                eim.getPlayers().get(j).dropMessage(6,notice);
            }
            //不斷重置最大值
            if ((eim.getProperty("charid_"+charId)*1)>MaxRandom) {
                MaxRandom = eim.getProperty("charid_"+charId);
                //置換玩家名稱
                eim.setProperty("rewardplayer", charName);
                //置換玩家ID
                eim.setProperty("rewardplayerid", charId);
            } 
           }
        for (var j = 0; j < eim.getPlayerCount(); j++) {
            //操作NPC 發放獎勵
            eim.getPlayers().get(j).openNpc(1052008,"huangjin");
        }
    }
    for (var j = 0; j < eim.getPlayerCount(); j++) {
        //重置所有玩家ROLL點點數為零
        eim.setProperty("charid_"+eim.getPlayers().get(j).getId(),"0");
    }
    //次數+1
    eim.setProperty("giftcount", (count*1+1));
    //重新讀入次數
    count = eim.getProperty("giftcount");
    count = (count*1);
    //退出戰場
    if ((count*1)>10) {
        EndThisBattle(eim);
        return;
    }
    //創建幾率
    var chance = Math.floor(Math.random()*600);
    //最終物品列表
    var finalItemList = Array();
    for(var m=0; m<itemList.length; m++) {
        if (itemList[m][1] >= chance) {
            finalItemList.push(itemList[m][0]);
        }
    }
    var currentItem = finalItemList[Math.floor(Math.random()*finalItemList.length)];
    switch(count) {
        case 8:
        case 9:
        case 10:
            currentItem = 2432013;
        break;
    }
    eim.setProperty("rewarditem", currentItem);
    //延遲10秒打開ROLL點NPC
    setupTask = em.schedule("openRollNpc", 1000 * 10 * 1, eim);
}

function openRollNpc(eim) {
    for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).openNpc(1052008,"huangjin1");
    }
    //10秒後繼續ROLL點
    setupTask = em.schedule("roll", 1000 * 10 * 1, eim);
}

function EndThisBattle(eim) {
    for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[神話副本] 挑戰成功！");
    }
    //em.broadcastYellowMsg("[神話副本] 挑戰結束");
    em.setProperty("state", "done");
    eim.disposeIfPlayerBelow(100, 262030000);
    if (setupTask!=null)
        setupTask.cancel(true);
    eim.dispose();
}

function cancelSchedule() {
    if (setupTask!=null)
        setupTask.cancel(true);
}

function leftParty(eim, player) {
    eim.disposeIfPlayerBelow(100, 262030000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 262030000);
}


function onMapLoad(eim, player) {
}