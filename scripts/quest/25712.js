/*
 * 先代凱撒的召喚
 * 凱撒4轉
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 4) {
            qm.sendOk("看樣子你已經準備好了，難道你想違抗命運嗎？");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("你是#h0#？");
    } else if (status == 1) {
        qm.sendNextPrevS("呃……嗯？是誰？這聲音從哪裡傳來的？", 2);
    } else if (status == 2) {
        qm.sendNextPrev("你別驚訝，好好聽我說。我是你的前任，先代凱撒。");
    } else if (status == 3) {
        qm.sendNextPrevS("先……先代凱撒？", 2);
    } else if (status == 4) {
        qm.askAcceptDeclineNoESC("你做好準備聽我說了嗎？");
    } else if (status == 5) {
    if (qm.getJob() == 6111) {
        qm.changeJob(6112);
    }
        if (!qm.haveItem(1142487, 1)) {
            qm.gainItem(1142487, 1);
        }
    qm.forceCompleteQuest();
        qm.sendNext("數十年前，為了防備達勒摩爾的攻擊，我出發去保衛赫裡希安。但梅格耐斯已經先下手為強，發動突襲並搶佔了赫裡希安。為了諾巴的難民們能逃往#m400000000#，並阻止梅格耐斯和那些幽靈攻到#m400000000#，我只好在那裡阻攔他們的攻勢。");
    } else if (status == 6) {
        qm.sendNextPrev("要是我不在那個地方阻擋他們，很快萬神殿也會被他們攻陷。那時#m400000000#還沒有保護罩。#p3000002#拿著諾巴的聖物，來到#m400000000#設立保護罩這件事可能不太為世人認同，但在當時卻是正確的行動。");
    } else if (status == 7) {
        qm.sendNextPrev("在那個地方，我受到梅格耐斯卑劣咒術的影響，中了致命的毒，臨終前只能耗盡自己的全部生命力使用了日珥。最後我和梅格耐斯，還有幽靈軍隊一起同歸於盡。");
    } else if (status == 8) {
        qm.sendNextPrevS("可是梅格耐斯活了下來！", 2);
    } else if (status == 9) {
        qm.sendNextPrev("事實上梅格耐斯應該早就死了。但也許是因為達勒摩爾給他的力量太強，讓他逃過一劫，後來返回達勒摩爾，在那裡接受了治療。");
    } else if (status == 10) {
        qm.sendNextPrev("我想，雖然梅格耐斯接受了治療，他的性命肯定被縮短很多。看他現在還活著，應該是從某處攝取了和生命力有關的能量源。");
    } else if (status == 11) {
        qm.sendNextPrevS("我聽說楓之谷世界裡有生物擁有精靈之力。那生物的名字好像叫「古瓦洛」。總而言之，估計梅格耐斯是獲得了那股力量，才得以延續生命。", 2);
    } else if (status == 12) {
        qm.sendNextPrev("過去的事情就說到這兒。事實上我跟你說話是因為你已經做好準備接受我的精髓。");
    } else if (status == 13) {
        qm.sendNextPrevS("嗯？精髓？", 2);
    } else if (status == 14) {
        qm.sendNextPrev("對。凱撒會不斷轉生。修煉到特定階段時，會繼承先代凱撒的精髓，成為真正的凱撒。我也一樣繼承了我前任凱撒的精髓。");
    } else if (status == 15) {
        qm.sendPrev("看來現在我可以把精髓交給你了。今後凱撒的意志將與你同在。希望你能成為優秀的凱撒。等你領悟了奧義，我會再和你說話。");
        qm.dispose();
    }
}
