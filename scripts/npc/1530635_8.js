var status;
var text;
var column = new Array("裝備", "消耗", "設置", "其他", "商城");
var sel;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else {
            cm.dispose();
            return;
        }

        if (status == 0) {
            text = "一鍵清除所有欄目道具#r（注意）#l\r\n\r\n#b";
            for (var i = 1; i <= 5; i++) {
                text += "#L" + i + "#清除" + column[i - 1] + "欄的所有道具#l\r\n";
            }
            cm.sendSimple(text);
        } else if (status == 1) {
            sel = selection;
            cm.sendYesNo("#r是否要清除" + column[sel - 1] + "欄的所有道具？？？此操作不可逆！");
        } else if (status == 2) {
            //cm.sendGetText("為了確保您的數據安全，請輸入安全碼。\r\n #r - 如果您忘記了安全碼，請找管理員進行召回。")
        } else if (status == 3) {
           var pw = cm.getClient().getAccInfoFromDB().get("2ndpassword");
            if (pw == cm.getText()) {
                for (var i = 0; i < 96; i++) {
                    if (cm.getInventory(sel).getItem(i) != null) {
                        cm.removeAll(cm.getInventory(sel).getItem(i).getItemId());
                    }
                }
                cm.sendOk("清除完畢" + sel);
                cm.dispose();
            } else {
                status = 1;
                cm.sendNext("安全碼輸入錯誤，請重新輸入！")
            }
        }
    }
}