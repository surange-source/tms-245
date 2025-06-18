/*
    凌晨重置任務
*/
var toResetStatus = [
    // 消逝旅途每日
    34129,34130,34131,34132,34133,34134,34135,34136,34137,34138,34139,34140,34141,34142,34143,34144,34145,34146,34147,34148,34149,34150,
    // 啾啾艾爾蘭每日
    39014,39017,39018,39019,39020,39021,39022,39023,39024,39025,39026,39027,39028,39029,39030,39031,39032,39033,
    // 拉契爾恩每日
    34378,34381,34382,34383,34384,34385,34386,34387,34388,34389,34390,34391,34392,34393,34394,
    // 阿爾卡娜每日
    39035,39038,39039,39040,39041,39042,39043,39044,39045,39046,39047,39048,39049,39050,
    // 魔菈斯每日
    34275,34276,34277,34278,34279,34280,34281,34282,34283,34284,34285,34286,34287,34288,34289,34290,34291,34292,34293,34294,34295,34296,
    // 艾斯佩拉每日
    34773,34780,34781,34782,34783,34784,34785,34786,34787,34788,34789,34790,34791,34792,34793,34794,34795,34796,34797,34798,34799,
    // 戰地聯盟每日
    16011,16012
];
var toResetInfo = [
    // 消逝旅途每日
    34127,
    // 啾啾艾爾蘭每日
    39015,39016,
    // 拉契爾恩每日
    34379,34380,
    // 阿爾卡娜每日
    39036,39037,
    // 魔菈斯每日
    34297,34298,
    // 艾斯佩拉每日
    34774,34775
];
var toResetWeekStatus = [
    // 消逝旅途每週
    [34151, 6]
];

var status = -1;

function start(mode, type, selection) {
    for each (quest in toResetStatus) {
        if (qm.getQuestStatus(quest) != 0) {
            qm.resetQuest(quest);
        }
    }
    for each (quest in toResetInfo) {
        if (qm.getQuestInfo(quest) != "") {
            qm.updateQuestInfo(quest, null);
        }
    }
    if ("1".equals(qm.getWorldShareInfo(18793, "q0"))) {
        var date = new java.text.SimpleDateFormat("yy/MM/dd").format(new java.util.Date());
        qm.updateWorldShareInfo(18793, "q0=1;q1=0;q2=0;pq=0;q1Date=" + date + "q2Date=" + date + "pqDate=" + date);
    }
    for each (quest in toResetWeekStatus) {
        var qStatus = qm.getQuestNoRecord(quest[0]);
        if (qStatus == null || qStatus.getStatus() == 0) {
            continue;
        }
        var qDate = new java.util.Date(qStatus.getCompletionTime());
        var calendar = java.util.Calendar.getInstance();
        calendar.setTime(qDate);
        if (qDate.getDay() >= quest[1]) {
            calendar.add(java.util.Calendar.WEEK_OF_MONTH, 1);
        }
        calendar.set(java.util.Calendar.DAY_OF_WEEK, quest[1] + 1);
        calendar.set(java.util.Calendar.HOUR_OF_DAY, 0);
        calendar.set(java.util.Calendar.MINUTE, 0);
        calendar.set(java.util.Calendar.SECOND, 0);
        if (java.util.Calendar.getInstance().getTime() >= calendar.getTime()) {
            qm.resetQuest(quest[0]);
        }
    }
    qm.forceCompleteQuest();
    qm.dispose();
}
