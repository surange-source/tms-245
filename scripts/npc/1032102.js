/*  
 *  
 *  功能：寵物復活 進化
 *  
 */

var status = -1;
var choice = -1;
var petUID = -1;
var pet = null;
var drtPetUID = -1;

function start() {
    var msg = "\r\n#L0#我想要復活我的寵物#l \r\n#L1#我想要轉移親密度給新的寵物。#l";
    var currentpet = null;
    var robot = false;
    var dragon = false;
    for (var i = 0; i < 3; i++) {
        currentpet = cm.getPlayer().getSpawnPet(i);
        if (!robot && currentpet != null && currentpet.getSummoned() && currentpet.getPetItemId() > 5000028 && currentpet.getPetItemId() < 5000034 && currentpet.getLevel() >= 15) {
            msg += "\r\n#L2#我想要進化寶貝龍#l";
            robot = true;
        } else if (currentpet != null && currentpet.getSummoned() && currentpet.getPetItemId() > 5000047 && currentpet.getPetItemId() < 5000054 && currentpet.getLevel() >= 15) {
            msg += "\r\n#L3#我想要進化機器小子#l";
            dragon = true;
        }
    }
    cm.sendSimple("我是負責復活寵物或是轉移寵物親密度的妖精瑪麗。你需要什麼協助嗎?\r\n#b" + msg + "#k");
}

function action(mode, type, selection) {
    if (choice === 0 && !cm.isQuestFinished(2049)) { // 妖精瑪麗和生命水
        quest(mode);
        return;
    }

    if (mode === 1) {
        status++;
    } else {
        if (mode == 0) {
            cm.sendOk("好吧,那麼下次再見.");
            cm.dispose();
            return;
        }
        status--;
    }

    var i = -1;
    if (status === i++) {
        cm.dispose();
    } else if (status === i++) {
        if (choice === -1) {
            choice = selection;
        }
        switch (choice) {
            case 0:
                if (!cm.isQuestFinished(2049)) { // 妖精瑪麗和生命水
                    action(1, 0, 0);
                } else {
                    cm.sendYesNo("把#b生命水#k和#b生命卷軸#k帶來了嗎。只要有這些道具，就能用我的魔法力量讓那木偶恢復生命。怎麼樣？確定使用道具讓木偶恢復過來嗎？");
                }
                break;
            case 1:
                var closenessPetList = Array();
                var iv = cm.getInventory(5).iterator();
                while (iv.hasNext()) {
                    var item = iv.next();
                    if (item == null || !cm.isItemType("寵物", item.getItemId()) || item.getPet() == null || item.getPet().getCloseness() <= 0) {
                        continue;
                    }
                    closenessPetList.push(item);
                }
                if (closenessPetList.length == 0 || !cm.haveItem(4160011)) {
                    cm.sendOk("看來你還沒得到轉移寵物親密度的卷軸，或是還沒持有可以轉移親密度的寵物。弓箭手村的科洛伊應該有賣轉移寵物親密度的卷軸..");
                    cm.dispose();
                } else {
                    cm.askPetAll("你真要把所飼養寵物的親密度轉移給新的寵物嗎?轉移親密度後現有寵物的親密度和等級將回到0，由新的寵物繼承其能力。請選擇轉移能力的現有寵物。", closenessPetList);
                }
                break;
            case 2:
                var currentpet = null;
                for (var i = 0; i < 3; i++) {
                    currentpet = cm.getPlayer().getSpawnPet(i);
                    if (currentpet != null && pet == null) {
                        if (currentpet.getSummoned() && currentpet.getPetItemId() > 5000028 && currentpet.getPetItemId() < 5000034 && currentpet.getLevel() >= 15) {
                            pet = currentpet;
                            break;
                        }
                    }
                }
                if (pet == null || !cm.haveItem(5380000, 1)) {
                    cm.sendOk("你不滿足要求。 你需要 #i5380000##t5380000#, \n\r和其中一個\n\r #d#i5000029##t5000029##k,\n\r #g#i5000030##t5000030##k,\n\r #b#i5000032##t5000032##k,\n\r #e#i5000033##t5000033##n \n\r 且需要15級以上. 請確認.");
                } else {
                    var id = pet.getPetItemId();
                    var name = pet.getName();
                    var level = pet.getLevel();
                    var closeness = pet.getCloseness();
                    var fullness = pet.getFullness();
                    var slot = pet.getInventoryPosition();
                    var flag = pet.getFlags();
                    var rand = 0;
                    var after = id;
                    while (after == id) {
                        rand = 1 + Math.floor(Math.random() * 10);
                        if (rand >= 1 && rand <= 3) {
                            after = 5000030;
                        } else if (rand >= 4 && rand <= 6) {
                            after = 5000032;
                        } else if (rand >= 7) {
                            after = 5000033;
                        }
                    }
                    if (name.equals(cm.getItemName(id))) {
                        name = cm.getItemName(after);
                    }
                    cm.getPlayer().unequipPet(pet, true, false);
                    cm.gainItem(5380000, -1);
                    cm.removeSlot(5, slot, 1);
                    cm.gainPet(after, name, level, closeness, fullness, 45, flag);
                    cm.getPlayer().spawnPet(slot);
                    cm.sendOk("你的寶貝龍已經進化啦!! 進化前是 #i" + id + "##t" + id + "#, 現在它是 #i" + after + "##t" + after + "#!");
                }
                cm.dispose();
            case 3:
                var currentpet = null;
                for (var i = 0; i < 3; i++) {
                    currentpet = cm.getPlayer().getSpawnPet(i);
                    if (currentpet != null && pet == null) {
                        if (currentpet.getSummoned() && currentpet.getPetItemId() > 5000047 && currentpet.getPetItemId() < 5000054 && currentpet.getLevel() >= 15) {
                            pet = currentpet;
                            break;
                        }
                    }
                }
                if (pet == null || !cm.haveItem(5380000, 1)) {
                    cm.sendOk("你不滿足要求。 你需要 #i5380000##t5380000#,\n\r 和其中一個\n\r #g#i5000048##t5000048##k, \n\r#r#i5000049##t5000049##k,\n\r #b#i5000050##t5000050##k,\n\r #d#i5000051##t5000051##k,\n\r #d#i5000052##t5000052##k,\n\r #e#i5000053##t5000053##n \n\r且需要15級以上. 請確認。");
                } else {
                    var id = pet.getPetItemId();
                    var name = pet.getName();
                    var level = pet.getLevel();
                    var closeness = pet.getCloseness();
                    var fullness = pet.getFullness();
                    var slot = pet.getInventoryPosition();
                    var flag = pet.getFlags();
                    var rand = 0;
                    var after = id;
                    while (after == id) {
                        rand = 1 + Math.floor(Math.random() * 9);
                        if (rand >= 1 && rand <= 2) {
                            after = 5000049;
                        } else if (rand >= 3 && rand <= 4) {
                            after = 5000050;
                        } else if (rand >= 5 && rand <= 6) {
                            after = 5000051;
                        } else if (rand >= 7 && rand <= 8) {
                            after = 5000052;
                        } else if (rand == 9) {
                            after = 5000053;
                        }
                    }
                    if (name.equals(cm.getItemName(id))) {
                        name = cm.getItemName(after);
                    }
                    cm.getPlayer().unequipPet(pet, true, false);
                    cm.gainItem(5380000, -1);
                    cm.removeSlot(5, slot, 1);
                    cm.gainPet(after, name, level, closeness, fullness, 45, flag);
                    cm.getPlayer().spawnPet(slot);
                    cm.sendOk("你的機器小子已經進化啦!! 進化前是#i" + id + "##t" + id + "#, 現在它是 #i" + after + "##t" + after + "#!");
                }
                cm.dispose();
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (choice) {
            case 0:
                if (!cm.haveItem(4031034) || (!cm.haveItem(4070000) && !cm.haveItem(5180000) && !cm.haveItem(5180003))) {
                    cm.sendOk("需要擁有有#b生命水#k和#b生命卷軸#k我才能幫你復活寵物哦。");
                    cm.dispose();
                } else {
                    var deadPet = cm.getDeadPets();
                    if (deadPet === null || deadPet.isEmpty()) {
                        cm.sendOk("你身上沒有需要復活的寵物喔。");
                        cm.dispose();
                    } else {
                        cm.askPet("要將哪一個寵物恢復成原樣？請選擇要恢復的寵物。", deadPet);
                    }
                }
                break;
            case 1:
                if (petUID === -1) {
                    petUID = cm.getPetSN();
                }
                var closenessPetList = Array();
                var iv = cm.getInventory(5).iterator();
                while (iv.hasNext()) {
                    var item = iv.next();
                    if (item == null || !cm.isItemType("寵物", item.getItemId()) || item.getPet() == null || item.getSN() == petUID) {
                        continue;
                    }
                    closenessPetList.push(item);
                }
                cm.askPetAll("現在把剛剛選擇的寵物親密度轉移給新的寵物。請選擇欲轉移的寵物。" + petUID, closenessPetList);
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (choice) {
            case 0:
                if (petUID === -1) {
                    petUID = cm.getPetSN();
                }
                var l = 0;
                var s = "";
                if (cm.haveItem(4070000)) {
                    s += "\r\n#L" + 4070000 +"##z" + 4070000 + "##l";
                    l++;
                }
                if (cm.haveItem(5180000)) {
                    s += "\r\n#L" + 5180000 +"##z" + 5180000 + "##l";
                    l++;
                }
                if (cm.haveItem(5180003)) {
                    s += "\r\n#L" + 5180003 +"##z" + 5180003 + "##l";
                    l++;
                }
                if (l > 1) {
                    cm.askMenu("你想要使用哪種類型的生命水呢?" + s);
                } else {
                    action(1, 0, 0);
                }
                break;
            case 1:
                if (petUID == selection) {
                    cm.dispose();
                    return;
                }
                if (drtPetUID === -1) {
                    drtPetUID = cm.getPetSN();
                }
                cm.sendYesNo("來~開始魔法的咒語喔！真的要施行轉移寵物親密度的咒語嗎?");
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status === i++) {
        switch (choice) {
            case 0:
                var id = 0;
                switch (selection) {
                    case 4070000:
                    case 5180000:
                    case 5180003:
                        if (cm.haveItem(selection)) {
                            id = selection;
                        }
                        break;
                    default:
                        if (cm.haveItem(4070000)) {
                            id = 4070000;
                        } else if (cm.haveItem(5180000)) {
                            id = 5180000;
                        } else if (cm.haveItem(5180003)) {
                            id = 5180003;
                        }
                        break;
                }
                if (id === 0) {
                    cm.sendOk("需要擁有有#b生命水#k和#b生命卷軸#k我才能幫你復活寵物哦。");
                } else {
                    if (cm.revivePet(petUID, id)) {
                        cm.gainItem(id, -1);
                        cm.gainItem(4031034, -1);
                        cm.forceStartQuest(2049);
                        cm.sendNext("你帶來的木偶已經恢復成寵物了。" + (id == 5180003 ? "" : "不過我的魔法並不能讓它擁有永遠的時間，在生命水用光之前，請一定要好好愛護這小傢伙，") + "那麼再見。");
                    } else {
                        cm.sendOk("發生未知錯誤。");
                    }
                }
                cm.dispose();
                break;
            case 1:
                var src = cm.getInventory(5).findByLiSN(petUID);
                var drt = cm.getInventory(5).findByLiSN(drtPetUID);
                if (src == null || drt == null || src.getPet() == null || drt.getPet() == null) {
                    cm.sendNext("發生未知錯誤。");
                } else {
                    cm.gainItem(4160011, -1);
                    var level = src.getPet().getLevel();
                    var closeness = src.getPet().getCloseness();
                    src.getPet().setLevel(1);
                    src.getPet().setCloseness(0);
                    cm.getPlayer().petUpdateStats(src.getPet(), true);
                    drt.getPet().setLevel(level);
                    drt.getPet().setCloseness(closeness);
                    cm.getPlayer().petUpdateStats(drt.getPet(), true);
                    cm.sendNext("成功轉移寵物的親密度。");
                }
                cm.dispose();
                break;
            default:
                cm.dispose();
                break;
        }
    } else {
        cm.dispose();
    }
}

var qStatus = -1;
function quest(mode) {
    if (mode === 1) {
        qStatus++;
    } else {
        qStatus--;
    }

    var i = -1;
    if (qStatus === i++) {
        cm.dispose();
    } else if (qStatus === i++) {
        cm.sendYesNo("看來你已經見過科洛伊了。科洛伊是和我一起研究生命魔法的人類。聽說他把未完成的生命魔法用在木偶上，做成了獲得動物或許，你拿的那個木偶就是科洛伊做出來的#b寵物#k嗎？");
    } else if (qStatus === i++) {
        cm.sendNext("原來是這樣啊。那個木偶本來是有生命的不過因為科洛伊用於製造生命的#b生命水#k用光了，所以又回到那種木偶模樣了吧！變回木偶以後當然不能動彈啦！難道生命真的不能用魔法力量創造出來嗎？");
    } else if (qStatus === i++) {
        cm.sendNextPrev("想讓這個木偶恢復原來樣子嗎？讓你的寵物像以前那樣追隨你，和你共度時光吧？當然倒不是沒有任何辦法。與克洛伊一同研究生命魔法的妖精也許能讓它再活過來。");
    } else if (qStatus === i++) {
        cm.sendYesNo("只要有#b生命水#k和#b生命卷軸#k，也許就能讓那木偶恢復生命。怎樣想要收集這些道具嗎？只要你帶來道具，我很高興讓那木偶恢復原樣。");
    } else if (qStatus === i++) {
        cm.forceCompleteQuest(2049);
        cm.dispose();
        cm.sendNext("好的。再說一邊，需要的是#b生命水#k和#b生命卷軸#k。只要有這兩樣東西就能讓木偶恢復原樣。#b生命卷軸#k有點麻煩去找#m100000000#的#b寵物訓練師巴特斯#k怎麼樣？也許能知道些什麼。");
    } else {
        cm.dispose();
    }
}