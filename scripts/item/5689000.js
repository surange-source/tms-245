var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        var deadPet = im.getDeadPets();
        if (deadPet === null || deadPet.isEmpty()) {
            im.sendOk("你身上沒有需要復活的寵物喔。");
            im.dispose();
        } else {
            im.askPet("要將哪一個寵物恢復成原樣？請選擇要恢復的寵物。", deadPet);
        }
    } else if (status == 1) {
        if (im.used() && im.revivePet(im.getPetSN(), im.getItemId())) {
            im.sendNext("你帶來的木偶已經恢復成寵物了。不過我的魔法並不能讓它擁有永遠的時間，在生命水用光之前，請一定要好好愛護這小傢伙，那麼再見。");
        } else {
            im.sendOk("發生未知錯誤");
        }
        im.dispose();
    }
}
