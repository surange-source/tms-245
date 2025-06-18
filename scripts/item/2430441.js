function start() {    
    if (!im.getC().gainAccCharSlot()){
        im.sendOk("增加失敗");
    }else{
        im.used();
        im.sendOk("增加成功");
    }    
    im.dispose();
}