var cashitem;
var status = -1;
var select = -1;
var isok;
var str="";
function start() {
    cashitem = cm.getCashItemlist();
    if (cashitem !=null){
        for(var i=0;i< cashitem.size() ;i++){
            str +="#L"+ i + "##i" + cashitem.get(i).getItemId()+ "##t" + cashitem.get(i).getItemId()+ "##k\r\n";
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
        if (cashitem  == null){
            cm.sendOk("你沒有需要回收的衣服呀！");
            cm.dispose();
        }
        cm.sendYesNo("衣服收集箱。好像可以把不想穿的衣服丟在裡面。有衣服要丟掉嗎？");
    }else if (status == 1) {
        cm.sendSimple("請選擇想要丟棄的衣服……丟棄的衣服將無法找回。如果有多件相同的衣服，會最先丟掉背包最前面的東西。\r\n"+str);
    }else if (status == 2) {
        select = selection;
        isok = cm.removeItem(cashitem.get(select).getItemId());
        if (isok){
            cm.sendOk("該衣服已經放入衣服收集箱！");
        }else{
            cm.sendOk("刪除失敗，請報告管理員。");
        }
        cm.dispose();

    }else {
        cm.dispose();
    }
}

