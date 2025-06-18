

var status = 0;
var choose = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        if (status == 0) {


            var text = "#e你好,您需要兌換嗎!\r\n";
         //  text += "#r#L2#我要用600個蝸牛殼兌換低級貝勒#l\r\n";
            //text += "#d#L3#我要用600個蝸牛殼兌換135級布萊克繽#l\r\n";
            text += "#r#L4#我要用600個蝸牛殼兌換135級低級貝勒#l\r\n";
            
            cm.sendSimple(text);

        } else if (status == 1) {
           
            switch(selection){
                case 2:
                    cm.sendYesNo("確定要用蝸牛殼兌換低級貝勒嗎");
                    break;
                case 3:
                    cm.sendYesNo("確定要用蝸牛殼兌換135級布萊克繽嗎");
                    break;
                case 4:
                    cm.sendYesNo("確定要用600個蝸牛殼兌換低級貝勒嗎");
                    break;
            }
            choose = selection;
        } else if (status == 2) {
            switch(choose){
                case 2:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1132177,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 4:


                    var text = "#e你好,您您可以兌換如下暴君裝備!\r\n";
                    text += "#d#L1# 600個 #v4000000#兌換 低級培羅德刻印腰帶 #v1132243##l\r\n";
                    text += "#d#L2# 600個 #v4000000#兌換 低級培羅德刻印吊墜 #v1122264##l\r\n";
                    text += "#d#L3# 600個 #v4000000#兌換 低級培羅德耳環 #v1032220##l\r\n";
                    text += "#d#L4# 600個 #v4000000#兌換 低級培羅德戒指 #v1113072##l\r\n";
                    
                    cm.sendSimple(text);
                    break;
            }
            
        }else if(status == 3){
            switch(selection){
                case 1:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1132243,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 2:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1122264,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 3:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1032220,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
                case 4:
                    if(cm.haveItem(4000000, 600)) {
                        cm.gainItem(4000000,-600);
                        cm.gainItem(1113072,1);
                        cm.sendSimple("兌換成功");
                    }else{
                        cm.sendSimple("您背包沒有600個#v4000000#");
                    }
                    cm.dispose();
                    break;
            }
        }
    }
}