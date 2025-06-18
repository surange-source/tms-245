function start() {
    ms.EnableUI(1, false);
    ms.removeAdditionalEffect();
    ms.setForcedInput(7);
    ms.setForcedInput(3);
    ms.setDelay(10);
}

function action(mode, type, selection) {
    ms.setForcedInput(0);
    ms.EnableUI(0, true);
    ms.showProgressMessageFont("攀上岩壁向下移動可進到湖邊。", 3, 20, 8, 0);
    ms.dispose();
}