/*
 *     怪物公園 - 休菲凱曼
 */

var status = -1;
var select = -1;

function start() {
    cm.askMenuA("歡迎來到怪物公園！ 呵呵。我是怪物公園的主人，#p" + cm.getNpc() + "#！ 若是有任何疑問，隨時都可以問我！\r\n#L0# #b請告訴我關於<怪物公園 REBORN>的事情。#k#l\r\n#L1# #b請告訴我一天的使用次數與使用費。#k#l\r\n#L2# #b請告訴我每天能獲得哪些獎勵。#k#l\r\n#L3# #b請告訴我關於怪物公園每日胸章的事情。#k#l\r\n#L99# #b停止聽取說明。#k#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var i = -1;
    if (status == i++) {
        cm.dispose();
    } else if (status == i++) {
        if (select == -1) {
            select = selection;
        }
        switch (select) {
            case 0:
                cm.sendNextE("看來你是對怪物公園的新概念有疑問！ 呵呵，\r\n#b<怪物公園 REBORN>#k是每天#b都準備有不同概念#k獎勵的\r\n有趣主題樂園！");
                break;
            case 1:
                cm.sendNextE("#b<怪物公園 REBORN>#k每天能使用7次，\r\n不同於入場時交出入場券的方式，#b<怪物公園 REBORN>#k是\r\n#b後付制度#k，呵呵。");
                break;
            case 2:
                cm.sendNextE("#b星期一獎勵#k : 裝有製作材料道具的 #b<創造的星期一寶箱>#k\r\n#b星期二獎勵#k : 裝有強化材料道具的#b<強化的星期二寶箱>#k\r\n#b星期三獎勵#k : 裝有性向提升道具的#b<性向的星期三寶箱>#k\r\n#b星期四獎勵#k : 裝有名聲值提升道具的#b<名譽的星期四寶箱>#k");
                break;
            case 3:
                cm.sendNextE("因為興趣而製作了這種東西，後來莫名其妙就製作出#b特定日子才會產生效果#k的\r\n#b有趣飾品#k。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 0:
                cm.sendNextPrevE("使用方法也完全不一樣了。只要在怪物公園狩獵怪物，就能獲得經驗值且#b慢慢累積#k。");
                break;
            case 1:
                cm.sendNextPrevE("一次的使用費是#b10 新楓之谷點數#k！\r\n#b使用費在退場時#k領取，途中離開\r\n並不會減少使用費或提升使用次數，請多加注意。");
                break;
            case 2:
                cm.sendNextPrevE("#b星期五獎勵#k : 裝有楓幣的#b<黃金的星期五寶箱>#k\r\n#b星期六獎勵#k : 可以獲得其他星期獎勵的#b<慶典的星期六寶箱>#k\r\n#b星期天獎勵#k : 裝有經驗值卡、精靈墜飾的#b<成長的星期日箱子>#k\r\n                       #b+ 經驗值獎勵高達1.5倍！！#k");
                break;
            case 3:
                cm.sendNextPrevE("以前製作好的東西已經放入#b休菲凱曼的寶庫#k，\r\n因為符合這次#b<怪物公園 REBORN>#k的概念，於是便拿出來了！ 呵呵呵。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 0:
                cm.sendNextPrevE("狩獵到最後關卡的所有怪物時，就能同時獲得\r\n#b累積的經驗值#k與 #b獎勵箱#k，呵呵。");
                break;
            case 1:
                cm.sendNextPrevE("#b每天#k可 #b免費使用2次#k，儘管放心使用。\r\n#b只要看到龐大的經驗值#k與 #b有趣的每日箱獎勵#k就\r\n不會認為使用費很浪費！ 哈哈哈！");
                break;
            case 2:
                status = -1;
                select = -1;
                start();
                break;
            case 3:
                cm.sendNextPrevE("胸章可以在星期箱子中獲得，運氣好的話，呵呵呵。\r\n只要湊齊 #b7種每日胸章#k就能交換隨時會發動效果的\r\n#b平凡的飾品#k！ 呵呵.");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == i++) {
        switch (select) {
            case 0:
            case 1:
            case 3:
                status = -1;
                select = -1;
                start();
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}
