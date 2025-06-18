var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    }
    var askType = 1; // 0 = text, 1 = pic
    var question = 5;
    var correct = 50;
    var remainQuestion = 10;
    var remainSecond = 20;
    cm.askOlympicQuiz(true, askType, question, correct, remainQuestion, remainSecond);
    cm.dispose();
}
