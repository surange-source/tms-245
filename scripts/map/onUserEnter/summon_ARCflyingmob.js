function start() {
    var map = ms.getMap();
    if (map == null) {
        ms.dispose();
        return;
    }
    var mapId = map.getId();
    var toSummonId;
    var reviveId
    if (Math.floor(mapId / 1000) == 450001) {
        // 艾爾達斯的燈火
        toSummonId = 8641016;
        reviveId = 8641017;
    } else if (Math.floor(mapId / 1000) == 450014) {
        // 搜索型 T無人機 A2型
        toSummonId = 8641064;
        reviveId = 8641065;
    } else if (Math.floor(mapId / 100) == 4500150) {
        // 橘色皮亞畢
        toSummonId = 8642070;
        reviveId = 8642071;
    } else if (Math.floor(mapId / 100) == 4500151) {
        // 黃色皮亞畢
        toSummonId = 8642072;
        reviveId = 8642073;
    } else if (Math.floor(mapId / 100) == 4500152 || Math.floor(mapId / 100) == 4500153) {
        // 紫色皮亞畢
        toSummonId = 8642074;
        reviveId = 8642075;
    } else if (Math.floor(mapId / 1000) == 450002) {
        // 史前鯊魚
        toSummonId = 8642023;
        reviveId = 8642024;
    } else if (Math.floor(mapId / 1000) == 450003) {
        // 紅眼石像怪
        toSummonId = 8643017;
        reviveId = 8643018;
    } else if (Math.floor(mapId / 1000) == 450005) {
        // 精靈殘骸
        toSummonId = 8644012;
        reviveId = 8644013;
    } else if (Math.floor(mapId / 100) == 4500060) {
        // 記憶中的新世代機器人C型
        toSummonId = 8644413;
        reviveId = 8644414;
    } else if (Math.floor(mapId / 100) == 4500061) {
        // 不知名的鴿子
        toSummonId = 8644415;
        reviveId = 8644416;
    } else if (Math.floor(mapId / 100) == 4500062 || Math.floor(mapId / 100) == 4500063) {
        // 漂浮的鐵槌
        toSummonId = 8644417;
        reviveId = 8644418;
    } else if (Math.floor(mapId / 100) == 4500064) {
        // 被儀式捲走的殘骸
        toSummonId = 8644425;
        reviveId = 8644426;
    } else if (Math.floor(mapId / 100) == 4500070) {
        // 守護太初的某個東西
        toSummonId = 8644520;
        reviveId = 8644521;
    } else if (Math.floor(mapId / 100) == 4500071) {
        // 守護太初的某個東西
        toSummonId = 8644522;
        reviveId = 8644523;
    } else if (Math.floor(mapId / 100) == 4500072) {
        // 守護神殿的某個東西
        toSummonId = 8644524;
        reviveId = 8644525;
    } else if (Math.floor(mapId / 1000) == 450009) {
        // 徬徨的灰色塵埃
        toSummonId = 8644680;
        reviveId = 8644681;
    } else if (Math.floor(mapId / 100) == 4500114) {
        // 突然出現的恐怖
        toSummonId = 8644713;
        reviveId = 8644714;
    } else if (Math.floor(mapId / 100) == 4500115) {
        // 突然出現的絕望
        toSummonId = 8644715;
        reviveId = 8644716;
    } else if (Math.floor(mapId / 100) == 4500116) {
        // 突然出現的痛苦
        toSummonId = 8644717;
        reviveId = 8644718;
    } else if (Math.floor(mapId / 100) == 4500120 || Math.floor(mapId / 100) == 4500121) {
        // 塔比翁
        toSummonId = 8645024;
        reviveId = 8645025;
    } else if (Math.floor(mapId / 100) == 4500123 || Math.floor(mapId / 100) == 4500124) {
        // 帝斯塔比翁
        toSummonId = 8645026;
        reviveId = 8645027;
    } else if (Math.floor(mapId / 100) == 4500160) {
        // 和平的伊瑪格
        toSummonId = 8642107;
        reviveId = 8642108;
    } else if (Math.floor(mapId / 100) == 4500161) {
        // 墮落的伊瑪格
        toSummonId = 8642109;
        reviveId = 8642110;
    } else if (Math.floor(mapId / 100) == 4500162) {
        // 沉浸的伊瑪格
        toSummonId = 8642111;
        reviveId = 8642112;
    } else if (Math.floor(mapId / 100) == 4100005 || Math.floor(mapId / 100) == 4100006) {
        // 頭目怪物海鷗
        toSummonId = 8645135
        reviveId = 8645136
    } else if (Math.floor(mapId / 100) == 4100007) {
        // 幽靈持有的書籍
        toSummonId = 8645149
        reviveId = 8645150
    } else if (Math.floor(mapId / 100) == 4100008) {
        // 燃燒的書籍
        toSummonId = 8645151
        reviveId = 8645152
    } else if (Math.floor(mapId / 100) == 4100009 || Math.floor(mapId / 100) == 4100010) {
        // 憤怒的火焰精靈
        toSummonId = 8645137
        reviveId = 8645138
    } else if (Math.floor(mapId / 100) == 4100030 || Math.floor(mapId / 100) == 4100031 || Math.floor(mapId / 100) == 4100032) {
        // 石奇異
        toSummonId = 8645206
        reviveId = 8645207
    } else {
        ms.dispose();
        return;
    }
    if (map.getMobObjectByID(toSummonId) == null && map.getMobObjectByID(reviveId) == null) {
        ms.spawnMonster(toSummonId);
    }
    ms.dispose();
}