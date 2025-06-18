/* Author: Xterminator
    NPC Name:         Cloy
    Map(s):         Victoria Road : Henesys Park (100000200)
    Description:         Pet Master
*/
var status = -1;
var choice = -1;

function start() {
    cm.sendNext("你… 是不是將我的孩子帶在身邊呢？ 藉由使用#t5180000#的魔法，我成功研發出賦予玩偶生命的魔法。 而人們將我獲得生命的孩子們稱為 #b寵物#k。 如果持有寵物的話，任何事情都可以來問我。");
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        if (selection == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status === i++) {
        cm.dispose();
    } else if (status === i++) {
        cm.sendSimple("想要知道什麼嗎？\r\n#b#L0# 我想讓寵物復活。#l\r\n#L1# 要怎樣飼養寵物呢？#l\r\n#L2# 寵物也會死嗎？\r\n#L47# 請說明一下動作寵物。#l\r\n#L21# 請告訴我移動寵物能力值的方法。#l#k");
    } else if (status === i++) {
        if (choice === -1) {
            choice = selection;
        }
        switch (choice) {
            case 0:
                cm.sendNext("想對寵物有所瞭解嗎。很久以前，我在做出的木偶身上用了#t5180000#，透過魔法成功的做出了魔法動物。雖然難以相信，木偶成了有生命的生命體。它們能聽懂人類的話，是很乖巧可愛的傢伙。");
                break;
            case 1:
                cm.sendNext("寵物對於特別的指令會有高興和難過等不同的反應。給寵物下指令後，聽主人的話，就會提高與主人之間的親密度。雙擊寵物的話就能看到親密度，等級，飽滿度等資訊。");
                break;
            case 2:
                cm.sendNext("死掉啊！其實這些小傢伙並不是真正活著的，所以說它們會死，我也不知道對不對啊。這些小傢伙是將我的魔法力量與#t5180000#的力量灌注在木偶身體裡做出來的。當然當它們活動的時候，是與其他動物沒什麼兩樣");
                break;
            case 21:
                cm.sendNext("為了移動寵物能力值需要魔法卷軸. 拿著這本書去找魔法森林的妖精瑪麗, 你用心養育寵物的等級與親密度會轉移到其他寵物. 因為你對寵物的愛特別深所以特別為你拿出來,但沒有辦法免費給你.如果你能支付 25萬楓幣就把書拿給你. 對了, 就算有這卷軸但沒有可以移動能力值的新寵物的話就一點用處也沒有了.");
                break;
            case 47:
                cm.sendNext("#b動作寵物#k可以變身跟進化. \r\n向動作寵物使用#r'變身'的指令或是, 打倒類似等級區間的怪物#k時可以變身為新的樣貌. 變身的動作寵物輸入#r'恢復'的指令或是時間經過#k就會回到原來的樣貌.\r\n且, 等級達到30的動作寵物使用#b加速器#k道具時就可以進行進化.");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (choice) {
            case 0:
                cm.sendNextPrev("可是那#t5180000#只在世界樹的根部長出來一點點而已，不能賦予那些孩子太多的時間真可惜啊！不過就算變成木偶也能再賦予它生命，在一起要好好疼它哦。");
                break;
            case 1:
                cm.sendNextPrev("經常和寵物聊天，關心它，親密度就會提高，寵物的等級也會跟著提高。親密度提高到某一程度時，寵物就會升級，等級高的話，還會學人說話，要努力撫養，當然不會那麼容易吧");
                break;
            case 2:
                cm.sendNextPrev("過一段時間後對了！這些傢伙會停掉的。就會恢復到原本木偶的樣子。魔法的力量和#t5180000#用光的話，不過並不是永遠停掉哦，再給它擦上#t5180000#的話，就能復活哦。");
                break;
            case 21:
                cm.sendYesNo("扣除25萬楓幣. 真的要購買嗎?");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (choice) {
            case 0:
                cm.sendNextPrev("對了小傢伙們對特別的指令會有所反應的。會鬧也會學乖一切都靠你發現了。小傢伙們很害怕離開主人身邊，要經常疼它們。別讓它們孤獨哦");
                break;
            case 1:
                cm.sendNextPrev("雖然是木偶，可是這些傢伙也有生命，也會覺得肚子餓的。#b飽滿度#k是顯示肚子飽的程度的，最高是100，降到一定程度的，寵物會不聽話等等，變得神經質呢。要多花點心思啊。");
                break;
            case 2:
                cm.sendNextPrev("雖然能讓它們恢復過來，不過停止還是讓人滿傷心的所以在它們活著的時候一定要好好愛護它們啊。可要記得按時餵它們。有一個生命，一直追隨你、關注你，你不覺得這是非常快樂的事情嗎？");
                break;
            case 21:
                if (!cm.canHold(4160011) || cm.getMeso() < 250000) {
                    cm.sendOk("請確認你的道具欄位有足夠的空間且有足夠的楓幣");
                } else {
                    cm.gainMeso(-250000);
                    cm.gainItem(4160011, 1);
                }
                cm.dispose();
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (choice) {
            case 1:
                cm.sendNextPrev("對了！寵物不大喜歡吃人類的食物。我的徒弟#b#p1012004##k在 #m100000000#的集市裡賣#b#t2120000##k，如果需要食物就到#m100000000#去。最好先買好食物，以防寵物失去力氣哦。");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (choice) {
            case 1:
                cm.sendNextPrev("阿對了!如果太久沒餵寵物吃東西的話它會自己回家。雖然下次將它拿出來再餵它也可以，但因為對健康不好，所以每一餐都要準時餵食喔。解說能夠理解嗎?");
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}
