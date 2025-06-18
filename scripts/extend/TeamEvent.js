var events = Array(
    ["第一次同行", 9020000, null],
    ["怪物擂台賽", 2042010, null],
    ["湯寶寶的料理教室", 1097000, null],
    ["奈特的金字塔", 2103013, null],
    ["冰騎士的詛咒", 2159018, null],
    ["羅密歐和朱麗葉", 2112004, null],
    ["時空裂縫", 2040034, null],
    ["金勾海賊王", 2094000, null],
    ["龍騎士", 9020016, null],
    ["逃脫", 9020005, null],
    ["陷入危險的坎特", 9020003, null],
    ["侏儒帝王的復活", 2022003, null]
);

function start() {
    var menu = "";
    for (var i = 0; i < events.length; i++) {
        menu += "#L" + i + "#" + events[i][0] + "#l\r\n";
    }
    cm.sendSimple("請選擇要進行的項目:\r\n\r\n#b" + menu + "#k");
}

function action(mode, type, selection) {
    cm.dispose();
    cm.openNpc(events[selection][1], events[selection][2]);
}