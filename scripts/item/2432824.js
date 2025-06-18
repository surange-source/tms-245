var status = -1;
var status2 = -1;
var select = -1;
var select2 = -1;
var nowLv = -1;
var questDat = -1;
var questDat = -1;
var rewardLevel = [10, 15, 30, 45, 60, 85, 100];
var rewarditems = [2450042, 2450042, 2450042, 2450042, 2450042, 2450042, 2450042];
var supportLevel = [10, 30, 60, 100];
var supports = [5000137, 5010110, 1182071, 1113020];



function start() {
    im.sendSimple("你好, 我正為來到楓之谷世界的新勇士的成長及定居提供幫助。\r\n#b#L0#領取成長支援道具#l\r\n#L1#轉職等級達成特殊禮物#l\r\n#L2#楓之谷世界嚮導#l#k");
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (status2 == -1)
            status++;
    } else {
        if (status2 == -1)
            status--;
    }
    if (status == 0) {
        if (select == -1)
            select = selection;
        if (select == 0) {
            im.sendNext("為了幫助勇士你成長, 我準備了各種道具。");
            questDat = im.getQuestRecord(99998).getCustomData();
            if (questDat == null)
                questDat = -1;
            else
                questDat = Number(questDat);
        } else if (select == 1) {
            im.sendNext("為了幫助達到轉職等級（10級, 30級, 60級, 100級）的勇士成長, 我準備了各種道具。");
            questDat = im.getQuestRecord(99999).getCustomData();
            if (questDat == null)
                questDat = -1;
            else
                questDat = Number(questDat);
        } else if (select == 2) {
            im.sendSimple("我們對不僅僅滿足於教程內容的勇士們準備了特別板塊！\r\n我們將通過特別板塊為大家介紹玩楓之谷時應該知道的內容。\r\n獲得與出售道具\r\n#b#L0#寵物#l\r\n#L1#背包#l\r\n#L2#自由市場#l\r\n#L3#貓頭鷹#l#k\r\n\r\n裝備強化\r\n#b#L4#數字強化#l\r\n#L5#星級強化#l\r\n#L6#潛能（方塊）#l#k\r\n\r\n裝扮角色\r\n#b#L7#角色服裝#l\r\n#L8#整容與髮型#l#k");
        }
    } else if (status == 1) {
        if (nowLv == -1)
            nowLv = im.getPlayer().getLevel();
        if (select == 0 || select == 1) {
            im.sendNextPrev("當前勇士你的等級為#b" + nowLv + "級#k啊。");
        } else if (select == 2) {
            xiangDao(mode, type, selection);
        }
    } else if (status == 2) {
        if (select == 0) {
            var can = -1;
            for (var i = questDat; i < rewardLevel.length; i++) {
                if (questDat == -1 && nowLv >= rewardLevel[0]) {
                    can = -2;
                    break;
                } else if (nowLv >= rewardLevel[i+1] && questDat != i+1) {
                    can = i+1;
                    break;
                }
            }
            var str = "";
            if (can == -1 || (can == questDat && questDat == 0)) {
                if (nowLv < rewardLevel[0]) {
                    im.sendOk("現在還無法領取任何東西哦。");
                } else {
                    if (questDat < rewardLevel.length-1) {
                        str = "如果你達到" + rewardLevel[questDat+1] + "級, 我就給你#i" + rewarditems[questDat+1] + "##b #t" + rewarditems[questDat+1] + "##k, 請記得來領取哦!";
                    }
                    im.sendOk("你已經領取過#t" + rewarditems[questDat] + "#了啊。" + str);
                }
            } else {
                if (can == -2)
                    can = 0;
                if (im.canHold(rewarditems[can])) {
                    im.gainItem(rewarditems[can], 1);
                    if (questDat < rewardLevel.length-2) {
                        str = "如果你達到" + rewardLevel[can+1] + "級, 我會給你#i" + rewarditems[can+1] + "##b #t" + rewarditems[can+1] + "##k, 請記得來領取哦!";
                    }
                    im.sendOk("你成功領取了#t" + rewarditems[can] + "#。" + str);
                    im.getQuestRecord(99998).setCustomData(can);
                } else {
                    im.sendOk("請確認你的背包空間是否足夠。");
                }
            }
        } else if (select == 1) {
            var can = -1;
            for (var i = questDat - 1; i < supportLevel.length; i++) {
                if (questDat == -1 && nowLv >= supportLevel[0]) {
                    can = -2;
                    break;
                } else if (nowLv >= supportLevel[i+1] && questDat != i+1) {
                    can = i+1;
                    break;
                }
            }
            var str = "";
            if (can == -1 || (can == questDat && questDat == 0)) {
                if (nowLv < supportLevel[0]) {
                    im.sendOk("現在還無法領取任何東西哦。");
                } else {
                    if (questDat < supportLevel.length-1) {
                        str = "如果你達到" + supportLevel[questDat+1] + "級, 我就給你#i" + supports[questDat+1] + "##b #t" + supports[questDat+1] + "##k, 請記得來領取哦!";
                    }
                    im.sendOk("你已經領取過#t" + supports[questDat] + "#了啊。" + str);
                }
            } else {
                if (can == -2)
                    can = 0;
                if (im.canHold(supports[can])) {
                    if (can == 0) {
                        im.gainPet(supports[can], "永恆的FunMS", 15, 1642, 100, 0, -1);
                    } else {
                        im.gainItem(supports[can], 1);
                    }
                    if (questDat < supportLevel.length-2) {
                        str = "如果你達到" + supportLevel[can+1] + "級, 我會給你#i" + supports[can+1] + "##b #t" + supports[can+1] + "##k, 請記得來領取哦!";
                    }
                    im.sendOk("你成功領取了#t" + supports[can] + "#。" + str);
                    im.getQuestRecord(99999).setCustomData(can);
                } else {
                    im.sendOk("請確認你的背包空間是否足夠。");
                }
            }
        }
        im.dispose();
    } else {
        im.dispose();
    }
}

function xiangDao(mode, type, selection) {
    if (mode == 1) {
        status2++;
    } else {
        status2--;
    }

    if (status2 == 0) {
        if (select2 == -1)
            select2 = selection;
        if (select2 == 0) {
            im.sendNext("寵物是寵物管理員科洛伊製作出的可愛夥伴。寵物的作用有很多，可以獲得道具，還能使用增益技能進行狩獵。");
        } else if (select2 == 1) {
            im.sendNext("通過狩獵怪物及參與各種活動獲得的道具，將會被保管在背包中。");
        } else if (select2 == 2) {
            im.sendNext("精心搜集並整理的道具。在楓之谷世界各個地區活動的勇士們齊聚在一起，進行道具交易的地方正是自由市場。\r\n#i3800707#");
        } else if (select2 == 3) {
            im.sendNext("自由市場的自賣機太多了，很難找到想要的物品？那麼，請利用#i5230000# #t5230000#來快速找到自己想要的道具吧。");
        } else if (select2 == 4) {
            im.sendNext("強化是從使用卷軸的數字強化而開始的。");
        } else if (select2 == 5) {
            im.sendNext("想要製作出較強的武器，需要經過各種試煉。我將為你說明強化的最後階段--星級強化，請仔細聽好。");
        } else if (select2 == 6) {
            im.sendNextPrev("我將為你說明下強化之花--潛能！");
        } else if (select2 == 7) {
            im.sendNextPrev("你想變得與其他勇士不同，看起來更有個性？");
        } else if (select2 == 8) {
            im.sendNextPrev("時尚的重點當然是臉蛋啦！");
        }
    } else if (status2 == 1) {
        if (select2 == 0) {
            im.sendNextPrev("寵物能幫忙拾取怪物掉落的道具，並搬運到你的背包中。\r\n學會特殊技能的寵物可以幫你使用藥水，並不斷施展增益技能。\r\n#i3800701#");
        } else if (select2 == 1) {
            im.sendNextPrev("你已經通過教程瞭解到背包的基本情況了吧？\r\n我來為你說明下背包的各種功能吧。");
        } else if (select2 == 2) {
            im.sendNextPrev("自由市場那裡有很多房間，你可以在各房間內開啟自賣機出售物品，或者到其他勇士的自賣機那裡購買想要的物品。\r\n#i38007078");
        } else if (select2 == 3) {
            im.sendNextPrev("你可以在商城中的#b#e商店#k#n選項下進行購買。\r\n#i3800710#");
        } else if (select2 == 4) {
            im.sendNextPrev("點擊背包中的裝備強化按鈕，然後將卷軸和裝備放上去吧。\r\n#i3800712#");
        } else if (select2 == 5) {
            im.sendNextPrev("你可以使用#i2049301# #t2049301#，對可升級次數為0的裝備進行星級強化。");
        } else if (select2 == 6) {
            im.sendNextPrev("以極小的概率在野外獲得被賦予潛能的裝備時，或者使用#i2049401# #t2049401#為c級裝備賦予潛能時，將會引出裝備中隱藏的力量。");
        } else if (select2 == 7) {
            im.sendNextPrev("手拿高等級裝備看起來很不錯，但身著美麗服裝的勇士看起來更加引人注目。..如果想把角色裝扮得更好看，那就在商城服裝選項或禮包服裝選項下進行購買吧。\r\n#i3800718#");
        } else if (select2 == 8) {
            im.sendNextPrev("請通過髮型/整容來讓角色變得更時尚吧。\r\n請在持有#i5152053# #t5152053#, #i5150040# #t5150040#之類道具的情況下，去村莊中的整形外科或美容院看看吧。");
        }
    } else if (status2 == 2) {
        if (select2 == 0) {
            im.sendNextPrev("如果想瞭解寵物的詳細情報，可以在角色信息欄或者裝備欄的寵物標籤中進行查看。\r\n#i3800702#");
        } else if (select2 == 1) {
            im.sendNextPrev("首先是擴展背包。打開背包你會發現背包中只有24個空格。點擊#b#e擴展背包#k#n按鈕，你就能一下子看到96個空格。\r\n#i3800703#");
        } else if (select2 == 2) {
            im.sendNextPrev("為了開啟自賣機，可以到商城的遊戲- 商店選項下，購買自賣機開啟許可證或者購買僱傭商人。\r\n 在仔細閱讀道具說明後，購買符合你意圖的自賣機就行啦！\r\n#i3800709#");
        } else if (select2 == 3) {
            im.sendNextPrev("如果使用購買的貓頭鷹道具，搜索想要購買或者出售的道具，還能找到該道具的價格與位置。\r\n#i3800711#");
        } else if (select2 == 4) {
            im.sendNextPrev("確認下武器和卷軸是否已經添加到裝備強化欄，然後點擊升級按鈕，就能進行強化了！\r\n#i3800713#");
        } else if (select2 == 5) {
            im.sendNextPrev("裝備強化卷軸的使用方式與數字強化時相同。");
        } else if (select2 == 6) {
            im.sendNextPrev("被賦予潛能的裝備等級可分為B~SS4級，裝備提示組件下方將會標注被賦予的潛能。");
        } else if (select2 == 7) {
            im.sendNextPrev("你只要在背包的特殊欄中穿上所購買的裝備就行了。穿上特殊裝備後，裝備欄中的道具會被自動換下。\r\n#i3800719#");
        } else if (select2 == 8) {
            im.sendNextPrev("聽說#p1012117#是楓之谷世界最棒的美容師呢~\r\n#i3800720#");
        }
    } else if (status2 == 3) {
        if (select2 == 0) {
            im.sendNextPrev("寵物、寵物裝備和寵物技能可以在商城的寵物選項下進行購買。");
        } else if (select2 == 1) {
            im.sendNextPrev("就像這樣。\r\n #i3800704#\r\n顯示X的部分為無法使用的空間。");
        } else if (select2 == 2) {
            im.dispose();
        } else if (select2 == 3) {
            im.sendNextPrev("還有更聰明的#i5230003# #t5230003#，你可以參考一下。");
        } else if (select2 == 4) {
            im.sendNextPrev("只有當裝備的可升級次數大於0時，才能進行數字強化。每次升級時，可升級次數減少1次。");
        } else if (select2 == 5) {
            im.sendNextPrev("如果星級強化成功，道具名稱上方的星星就會增多。\r\n請記住，在進行星級強化時，道具名稱上方的星星個數越多，能力值就越強，但同時強化的成功率將會降低。\r\n#i3800715#");
        } else if (select2 == 6) {
            im.sendNextPrev("如果想更改裝備等級，或者更改裝備被賦予的潛能，可以使用#i5062000# #t5062000#類型的道具。方塊可以在商城強化選項中進行確認。");
        } else if (select2 == 7) {
            im.dispose();
        } else if (select2 == 8) {
            im.dispose();
        }
    } else if (status2 == 4) {
        if (select2 == 0) {
            im.sendNextPrev("如果你對寵物飼養有任何疑問，可以去找#m100000200#的#p1012005。他是寵物管理員，應該能幫你解決很多疑問。");
        } else if (select2 == 1) {
            im.sendNextPrev("通過活動獲得背包擴展道具(#i2430951# #i2430952# #i2430953# #i2430954#)並使用的話，可開啟能夠放入道具的空間。\r\n你也可以通過商城開啟背包空間。");
        } else if (select2 == 3) {
            im.sendNextPrev("當達到10級時，為了讓你能通過#t2342824#來體驗貓頭鷹道具，我將為你發放#i5230000# #t5230000#和#i5230003# #t5230003#，請不要忘記來領取啊！");
        } else if (select2 == 4) {
            im.sendNextPrev("強化成功時，道具名旁邊的數字會增大。所以這種強化才被稱為是數字強化。\r\n#i3800714#");
        } else if (select2 == 5) {
            im.sendNextPrev("啊！如果對道具說明中標注「極真」的裝備進行星級強化，該裝備的能力值將會大幅上升。如果獲得極真裝備，一定要進行星級強化哦！\r\n#i3800716#");
        } else if (select2 == 6) {
            im.sendNextPrev("啊，如果你覺得潛能只有1個或2個太可惜了，可以利用#i2049500# #t2049500#之類的道具，將潛能最大提升至3個，請記住哦！\r\n#i3800717#");
        }
    } else if (status2 == 5) {
        if (select2 == 0) {
            im.sendNextPrev("當達到10級時，為了讓你能通過#t2342824#在7天內體驗寵物，我會為你發放#i5000393# #t5000393#，請不要忘記來領取啊！");
        } else if (select2 == 1) {
            im.sendNextPrev("接下來是收攏和整理。背包中所區分的5類標籤，每個標籤的最大可利用空間為96個空格。收攏和整理的作用就是可以讓道具的整理變得更加便利。");
        } else if (select2 == 3) {
            im.dispose();
        } else if (select2 == 4) {
            im.sendNextPrev("使用存在破壞概率的卷軸進行強化，且強化失敗時，好不容易搜集到的裝備將會消失。為了防止這種事情發生，可以從商城購買#i5064000# #t5064000#，在進行強化前使用！");
        } else if (select2 == 5) {
            im.dispose();
        } else if (select2 == 6) {
            im.sendNextPrev("在2014年7月9日至2014年7月25日這段時間，如果訪問#m706040000#，就能通過巨大方塊重新設置潛能，請積極參與吧");
        }
    } else if (status2 == 6) {
        if (select2 == 0) {
            im.dispose();
        } else if (select2 == 1) {
            im.sendNextPrev("點擊向上收攏按鈕，該標籤下的道具就會從左上方開始重新排列，並且中間不會留出空格。\r\n#i3800705#");
        } else if (select2 == 4) {
            im.dispose();
        } else if (select2 == 6) {
            im.dispose();
        }
    } else if (status2 == 7) {
        if (select2 == 1) {
            im.sendNextPrev("原本顯示向上搜集按鈕的地方，出現了按種類排列按鈕，我們現在點擊下按種類排列按鈕吧？\r\n該按鈕能將相關標籤下的道具按照相似的種類進行排列。是不是很方便啊？\r\n#i3800706#");
        }
    } else if (status2 == 8) {
        if (select2 == 1) {
            im.sendNextPrev("請利用這種隱藏的功能，有效地管理背包吧！");
        }
    } else if (status2 == 9) {
        if (select2 == 1) {
            im.sendNextPrev("當達到30級時，為了讓你能通過#t2342824#享受更多背包空間，我將為你發放#i2430952# #t2430952#，請不要忘記來領取啊！");
        }
    } else if (status2 == 10) {
        if (select2 == 1) {
            im.dispose();
        }
    } else {
        status2 = -1;
    }
}
