/* RED 1st impact
    The New Explorer
    Made by Daenerys
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == 1)
        status++;
     else
        status--;
    if (status == 0) {
        qm.sendNextS("你好，我的名字叫麥加。我從來沒有見過你哦，看來你是新來的#b冒險家#k吧？",1);
    } else if (status == 1) {    
        qm.sendNextPrevS("#b冒險家？#k",17);    
    } else if (status == 2) {    
        qm.sendNextPrevS("是的，為了在楓之谷世界展開冒險而從其他世界來的人。我們稱這種人為「冒險家」。所有冒險家都是從#b楓之谷#k開始冒險的。",1);
    } else if (status == 3) {    
        qm.sendNextPrevS("#b楓之谷？#k",17);
    } else if (status == 4) {    
        qm.sendNextPrevS("嗯，楓之谷！這裡本來只是個無名小島，但不知從何時起有很多冒險家都紛至沓來。為了他們的到來，這裡開始陸陸續續有設施搭建起來，現在這裡已經變成了一個不錯的村莊。並且由我來為像你一樣的新手冒險家提供幫助。",1);
    } else if (status == 5) {    
        qm.sendNextPrevS("你是叫……#h0#吧？既然你是第一次來到楓之谷世界，那就多聽一下我做的說明吧？通過我的小測試的話，我就會給你對冒險非常有用的禮物哦！",1);
    } else if (status == 6) {    
        qm.sendNextPrevS("如果你不想聽我的說明，我馬上送你去村莊。不過那樣一來，你就無法獲得禮物。",1);        
    } else if (status == 7) {
        qm.sendSimpleS("明白了的話，現在開始選擇吧。.你要怎麼做呢？\r\n#b#L0# 聽取麥加的說明，並獲得新裝備作為禮物。 #l\r\n#L1# 不聽說明，立即移動至村莊。#l#k",1);        
    } else if (status == 8) {
        sel = selection;
        if (selection == 0) {        
            qm.sendNextS("不錯的選擇！如果你按照我的說明去做，以後在楓之谷世界生活不會有任何問題的。",1);
            qm.forceStartQuest();
            //qm.gainItem(2432824,1);//宋小姐請幫忙
            qm.forceCompleteQuest();
            qm.gainExp(20);
            qm.dispose();
        } else if (selection == 1) {
            qm.sendNextS("好吧，那麼我現在立刻送你去彩虹村。",1);
        }
    } else if (status == 9) {
        if (sel == 1) {
        qm.sendNextS("我已經把禮物放到你背包裡，是恢復用藥水。你待會兒打開消耗欄確認一下吧。",1);
        qm.gainItem(2000013,50);
        qm.gainItem(2000014,50);
        }
    } else if (status == 10) {
        if (sel == 1) {
            qm.sendNextS("你到了彩虹村的話，別忘了去見見#b路卡斯#k村長!他會給你一些建議，讓你能剛好地去適應新世界。",1);
       }
    } else if (status == 11) {
        if (sel == 1) {
            qm.warp(4000020,0);
            qm.gainExp(273);
            qm.forceStartQuest(32210);
        }   
        qm.dispose();
    }
}
