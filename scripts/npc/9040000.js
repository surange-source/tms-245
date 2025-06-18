/* 
 * Shuang, Victoria Road: Excavation Site<Camp> (101030104)
 * Start of Guild Quest
 */

var status;
var GQItems = Array(1032033, 4001024, 4001025, 4001026, 4001027, 4001028, 4001029, 4001030, 4001031, 4001032, 4001033, 4001034, 4001035, 4001037);
var sw1 = "#fItem/Pet/5000415.img/hungry/3#";//憂傷
var sw2 = "#fItem/Pet/5000415.img/cry/5#";//生氣
var sw3 = "#fItem/Pet/5000415.img/dung/2#";//蹲廁所
var sw4 = "#fItem/Pet/5000415.img/sleep/2#";//睡覺
var aek1 = "#fItem/Pet/5000331.img/hungry/3#";//憂傷
var aek2 = "#fItem/Pet/5000331.img/cry/5#";//生氣
var aek3 = "#fItem/Pet/5000331.img/dung/2#";//蹲廁所
var aek4 = "#fItem/Pet/5000331.img/sleep/2#";//睡覺
var eff = "#fCharacter/Accessory/01012098.img/default/default#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
    cm.dispose();
    return;
    }
    if (mode == 1) {
    status++;
    } else {
    status--;
    }

    if (status == 0) {
    if (cm.getPlayer().hasEquipped(1032033)) {
        cm.sendOk("請卸下你的保護石。");
        cm.dispose();
    } else if (cm.getPQLog("公會組隊任務") >= 1){
        cm.sendOk("不好意思,您今天已經參加過1次了。請明天再來吧！");
        cm.dispose();
    } else {
        var texe = "#e#r   \t"+sw1+"     "+sw2+"    "+sw3+"    "+sw4+"#n#k#n#k\r\n";
        texe+= "\t\t\t\t\t#e#r特色公會組隊任務\r\n";
        texe+= "\t\t\t  #n#d#L2#"+eff+"我想查看說明"+eff+"#l\r\n\r\n"; 
        texe+= "#L0#"+eff+"會長開啟組隊任務"+eff+"#l\t\t#L1#"+eff+"族員跟隨會長進入"+eff+"#l\r\n\r\n";
        texe+= "#e#r \t"+aek1+"  "+aek2+"  "+aek3+"  "+aek4+"#n#k#n#k\r\n";
        cm.sendSimple(texe);
    }
    
    } else if (status == 1) {
    if (selection == 0) { //Start
        if (cm.getPlayerStat("GID") == 0 || cm.getPlayerStat("GRANK") >= 3) { //no guild or not guild master/jr. master
        cm.sendNext("需要一個會長或副會長才可以進行公會對抗賽。");
        cm.dispose();
        } else {
        var em = cm.getEventManager("GuildQuest");
        if (em == null) {
            cm.sendOk("腳本出錯，請聯繫管理員。");
        } else {
            var prop = em.getProperty("started");

            if ((prop.equals("false") || prop == null) && em.getInstance("GuildQuest") == null) {
                for (var i = 0; i < GQItems.length; i++) {
                cm.removeAll(GQItems[i]);
                }
            em.startInstance(cm.getPlayer(), cm.getPlayer().getName());
            em.setProperty("state", "0");
            cm.guildMessage("會長已進入公會任務。請在副本中心進入。 " + cm.getClient().getChannel() + ".");
            cm.worldSpouseMessage(0x9, "【公會任務】：玩家  "+cm.getChar().getName() + "  帶領著公會成員一起挑戰公會任務,期待他們成功闖關！！！");
            } else {
            cm.sendOk("已有公會進入公會組隊任務。")
            }
        }
        cm.dispose();
        }
    } else if (selection == 1) { //entering existing GQ
        if (cm.getPlayerStat("GID") == 0) { //no guild or not guild master/jr. master
        cm.sendNext("你還沒有公會，需要加入公會才可以進行。");
        cm.dispose();
        } else {
        var em = cm.getEventManager("GuildQuest");
        if (em == null) {
            cm.sendOk("腳本出錯，請聯繫管理員。");
        } else {
            var eim = em.getInstance("GuildQuest");

            if (eim == null) {
            cm.sendOk("你的公會目前還沒有開始公會任務。");
            } else {
            if (em.getProperty("guildid") != null && !em.getProperty("guildid").equalsIgnoreCase("" + cm.getPlayerStat("GID"))) {
            if (cm.getPlayer().isGm()) {
                cm.sendOk("這次開啟的公會任務不是你的公會。例如公會： "  + em.getProperty("guildid") + ", 你的公會： " + cm.getPlayerStat("GID"));
            } else {
                cm.sendOk("這次開啟的公會任務不是你的公會。");
            }
            } else if (em.getProperty("started").equals("false")) {
                for (var i = 0; i < GQItems.length; i++) {
                cm.removeAll(GQItems[i]);
                }
                eim.registerPlayer(cm.getPlayer());
            } else {
                cm.sendOk("我很抱歉，但公會已經沒有你了。再試一次。");
            }
            }
        }
        cm.dispose();
        }
        } else if (selection == 2) {
        cm.sendOk("#d公會任務需要先讓會長開啟。\r\n#r管理提示：\r\n公會任務需求人數：6人。\r\n公會任務必須職業：隱身術盜賊、可以位移的職業，類似法師的瞬移。\r\n公會裡必須要有210級以上的玩家。\r\n此副本非常難，需要玩家之間的配合和聰明的腦力才可以通關，智商不足請儲值。\r\n公會任務獎勵：1W樂豆點和#v1142217##t1142217#x1、#v2048723##t2048723#x1、#v4310036##t4310036#x300、#v2614001##t2614001#x3.");
        cm.dispose();
    }
    }
}
