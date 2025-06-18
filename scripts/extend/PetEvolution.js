/*      
 *  
 *  功能：寵物進化
 *  
 */
var Pet;
var status = -1;
var select = -1;
var str = "";

function start() {

    Pet = cm.getChar().getCanevlPets();
    if (Pet != null) {
        for (var i = 0; i < Pet.size(); i++) {
            str += "#L" + i + "#" + Pet.get(i).getName() + "#k\r\n";
        }
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendNext("你好，我是迦爾努斯寵物專家。你聽說過寵物進化嗎？");
    } else if (status == 1) {
        cm.sendYesNo("如果你的寵物達到了15級,那麼就可以進化喲,那麼你想讓你的寵物進化麼?");
    } else if (status == 2) {
        if (Pet.size() == 0) {
            cm.sendOk("抱歉,你沒有可以進化的寵物!!");
            cm.dispose();
        } else {
            cm.sendSimple("請選擇想進化的寵物。\r\n" + str);
        }
    } else if (status == 3) {
        if (cm.getItemQuantity(5380000) > 0) {
            cm.getChar().Petevolution(Pet.get(selection));
            cm.removeItem(5380000);
            cm.sendOk("您的寵物[" + Pet.get(selection).getName() + "]已經成功進化!!");
        } else {
            cm.sendOk("抱歉,你沒有進化之石,請移動到商場進行購買!!");
        }
        cm.dispose();
    } else {
        cm.dispose();
    }

}

