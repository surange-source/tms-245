//副本開關 開啟、true 關閉、false
var open = true;
//副本腳本名
var name = ["HorntailBattle", "ChaosHorntail"];
//等級限制
var minLevel = [120, 120];
var maxLevel = [275, 275];
//次數限制
var maxenter = 50;
//記錄次數名稱
var PQName = '闇黑龍王';
var status = -1;

function start() {
    if (!cm.isLeader()) {
        cm.sendOk("只有隊長才可以申請入場。");
        cm.dispose();
        return;
    }
    cm.sendSimple("闇黑龍王復活了啊。再這樣下去, 一旦它引起火山爆發的話, 冰峰雪域山脈將會整個變成地獄。\r\n#r(闇黑龍王洞穴的入場次數為#e每天" + maxenter + "次#n, 入場記錄#e每天午夜0點#n將會初始化。)\r\n#b等一下!!你想要移動到哪個闇黑龍王洞穴呢?#b\r\n#L0#普通闇黑龍王#l\r\n#L1#進階闇黑龍王#l");

}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {

        if (!cm.isAllPartyMembersAllowedLevel(minLevel[selection], maxLevel[selection])) {
            cm.sendNext("組隊成員等級 "+ minLevel[selection] +" 以上 "+ maxLevel[selection] +" 以下才可以入場。");
        } else if (!cm.isAllPartyMembersAllowedPQ(PQName, maxenter)) {
            cm.sendNext("你的隊員\"" + cm.getNotAllowedPQMemberName(PQName, maxenter) +"\"次數已經達到上限了。");
        } else {
            var em = cm.getEventManager(name[selection]);
            if (em == null || open == false) {
                    cm.sendSimple("配置文件不存在,請聯繫管理員。");
            } else {
                var prop = em.getProperty("state");
                if (prop == null || prop.equals("0")) {    
                      //em.startInstance_Party(240060000 , cm.getPlayer());
                    em.startInstance(cm.getParty(), cm.getMap(), 255);
                    cm.gainMembersPQ(PQName, 1);
                } else {
                    cm.sendOk("已經有隊伍在進行了,請換其他頻道嘗試。");
                }
            }
        }
        cm.dispose();
    }else if (status == 1) {
        if (!cm.isAllPartyMembersAllowedLevel(minLevel[selection], maxLevel[selection])) {
            cm.sendNext("組隊成員等級 "+ minLevel[selection] +" 以上 "+ maxLevel[selection] +" 以下才可以入場。");
        } else if (!cm.isAllPartyMembersAllowedPQ(PQName, maxenter)) {
            cm.sendNext("你的隊員\"" + cm.getNotAllowedPQMemberName(PQName, maxenter) +"\"次數已經達到上限了。");
        } else {
            var em = cm.getEventManager(name[selection]);
            if (em == null || open == false) {
                    cm.sendSimple("配置文件不存在,請聯繫管理員。");
            } else {
                var prop = em.getProperty("state");
                if (prop == null || prop.equals("0")) {  
                    //em.startInstance_Party(240060001 , cm.getPlayer());
                    em.startInstance(cm.getParty(), cm.getMap(), 255);
                    cm.gainMembersPQ(PQName, 1);
                } else {
                    cm.sendOk("已經有隊伍在進行了,請換其他頻道嘗試。");
                }
            }
        }
        cm.dispose();
    }else {
        cm.dispose();
    }
}
