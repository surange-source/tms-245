/*
 * Cygnus 2nd Job advancement
 */

var status = -1;

function start(mode, type, selection) {
    qm.sendNext("如果你想參加騎士等級考試，可以隨時來聖地。各個騎士團長會對你的能力進行測試，如果合格，就會任命你為正式的騎士。再見……");
    qm.forceStartQuest();
    qm.dispose();
}

function end(mode, type, selection) {
    qm.dispose();
}
