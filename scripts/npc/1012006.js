/* Author: Xterminator
    NPC Name:         Trainer Bartos
    Map(s):         Victoria Road : Pet-Walking Road (100000202)
    Description:         Pet Trainer
*/
var status = -1;
var select = -1;

function start() {
    cm.sendSimple("找我有什麼事情？\r\n#b#L0#我想知道關於這個地方。#l" + (cm.isQuestFinished(2049) ? "\r\n#L1#妖精 瑪麗介紹我來這裡的... #l" : "") + "#k");
}

function action(mode, type, selection) {
    if (select === 1 && cm.isQuestFinished(2049)) { // 妖精瑪麗和生命水
        revive(mode, selection);
        return;
    }

    if (mode === 1) {
        status++;
    } else {
        if (status >= 1 && mode == 0) {
            cm.sendNext("哦哼~看來你現在沒空？那什麼時候改變想法了就來找我吧。");
            cm.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status === i++) {
        cm.dispose();
    } else if (status === i++) {
        if (select === -1) {
            select = selection;
        }
        if (select == 0) {
            if (cm.haveItem(4031035)) {
                cm.sendNext("你拿著這封信，繞過障礙物上去，然後把巴博德交給我弟弟。如果你能成功，會對你的寵物有好處。");
                cm.dispose();
            } else {
                cm.sendYesNo("在這裡可以和寵物一起散步。除了散步，你也可以和寵物一起進行通過障礙物的訓練。如果和寵物的關係不是很親密，它也許不大聽你的話哦。怎麼樣？想給寵物做一次訓練嗎？");
            }
        } else {
            action(1, 0, 0);
            return;
        }
    } else if (status == i++) {
        cm.gainItem(4031035, 1);
        cm.sendNext("好！這裡有封信件。你沒有這封信，恐怕我弟弟不知道是我讓你上去的。跟寵物一起繞過障礙物到最上面。在那裡跟巴羅德說話，然後轉交我的信。你通過障礙物的時候要多注意你的寵物。加油！");
        cm.dispose();
    } else {
        cm.dispose();
    }
}

var rStatus = -1;
function revive(mode, selection) {
    if (mode === 1) {
        rStatus++;
    } else {
        rStatus--;
    }

    var i = -1;
    if (rStatus === i++) {
        cm.dispose();
    } else if (rStatus === i++) {
        cm.sendNext("你身上帶著#b不能動彈的寵物#k嗎？真不幸啊！#b妖精 瑪麗#k介紹你來的嗎？是叫#b生命卷軸#k啊！你看你看，我怎麼可能有那種東西。咦！口袋裡這是什麼？");
    } else if (rStatus === i++) {
        cm.sendNextPrev("這就是那個#b生命卷軸#k吧？沒沒錯！科洛伊這個傢伙又穿我的衣服出去了啊。這個傢伙告訴他不要隨便穿別人的衣服，雖然不是我的，反正需要這個是嗎？");
    } else if (rStatus === i++) {
        cm.sendYesNo("不過不能就這樣白給你！我要進行一下測試，看看你對寵物到底瞭解多少。如果寵物是和沒有愛心的傢伙在一起的話，就太可憐了。只要錯一道題，就絕不能把這咒語書交給你。怎麼樣？要接受測試嗎？");
    } else if (rStatus === i++) {
        cm.sendNext("好！給你出5道題，要一次全部答對哦！有自信嗎？開始了！");
    } else if (rStatus === i++) {
        cm.sendSimple("問題1）賣寵物食品的科爾在那個村莊？\r\n#b#L0#維多利亞港#l\r\n#L1#弓箭手村#l\r\n#L2#勇士之村#l\r\n#L3#魔法森林#l\r\n#L4#墮落城市#l\r\n#L5#奇幻村#l#k");
    } else if (rStatus === i++) {
        if (selection !== 1) {
            cm.sendOk("回答錯誤！");
            cm.dispose();
        } else {
            cm.sendSimple("問題2）呵呵第一個只是讓你熱身。在下面當中，和寵物沒有關係的人是哪一個？\r\n#b#L0#妖精 瑪麗#l\r\n#L1#科洛伊#l\r\n#L2#瑪亞#l#k");
        }
    } else if (rStatus === i++) {
        if (selection !== 2) {
            cm.sendOk("回答錯誤！");
            cm.dispose();
        } else {
            cm.sendSimple("問題3）很容易把？那麼在下面關於寵物的說明中，選出錯誤的！\r\n#b#L0#要給寵物取名需要有取名道具。#l\r\n#L1#給寵物發指令後成功時會提升親密度。#l\r\n#L2#長時間不給食物的話親密度會下降。#l\r\n#L3#寵物可以和主人一起攻擊怪物。#l#k");
        }
    } else if (rStatus === i++) {
        if (selection !== 3) {
            cm.sendOk("回答錯誤！");
            cm.dispose();
        } else {
            cm.sendSimple("問題4）沒剩幾個了！那麼，寵物到多少級後能像人一樣說話？\r\n#b#L0#5級#l\r\n#L1#10級#l\r\n#L2#15級#l\r\n#L3#20級#l#k");
        }
    } else if (rStatus === i++) {
        if (selection !== 1) {
            cm.sendOk("回答錯誤！");
            cm.dispose();
        } else {
            cm.sendSimple("問題5）來，這是最後啦！#m100000000#的科爾賣的寵物食品能讓寵物的飽滿度提高多少？\r\n#b#L0#10#l\r\n#L1#20#l\r\n#L2#30#l\r\n#L3#40#l#k");
        }
    } else if (rStatus === i++) {
        if (selection !== 2) {
            cm.sendOk("回答錯誤！");
            cm.dispose();
        } else {
            cm.sendNext("確實對寵物很瞭解哦！不錯，很高興能把咒語書給你。雖然這不是我的都要怪那個，隨便穿別人衣服，再把這種重要的東西放在裡面的傻瓜，你拿著就是了！");
        }
    } else if (rStatus === i++) {
        cm.sendNextPrev("那現在就剩下拿著那個和#b生命水#k去找妖精 瑪麗的事情了？呵呵好好幹～！");
    } else if (rStatus === i++) {
        cm.gainItem(4031034, 1);
        cm.dispose();
    } else {
        cm.dispose();
    }
}