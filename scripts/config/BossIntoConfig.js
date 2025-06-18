/*  
 *  
 *  BOSS入場條件統整
 *  
 *  
 */
/* 範例
//副本開關 開啟、true 關閉、false
var Open = true;
//配置文件名稱
var EventScriptName = ["BossMagnus_NORMAL", "BossMagnus_HARD"];
//記錄次數名稱
var PQLogName = ["梅格耐斯", "困難梅格耐斯"];
//副本名稱
var EventName = "梅格耐斯";
//副本難度
var EventMode = ["一般", "困難"];
//開始的地圖
var StartMap = 401060000;
//等級限制
var MinLevel = [155, 200];
var MaxLevel = [275, 275];
//次數限制
var MaxEnter = [3, 3];
//星期幾刷新 - 0為每天刷新
var RefreshDayOfWeek = [0];
//限制人數
var MinPlayers = 1;
var MaxPlayers = 6;
var QuestID = 31732;
*/  
        
switch(nStartNpc){
    //森蘭丸
    case 9130087:    
        var Open = true;
        var EventScriptName = ["BossRanmaru_NORMAL", "BossRanmaru_HARD"];
        var PQLogName = ["森蘭丸"];
        var EventName = "森蘭丸";
        var EventMode = ["一般", "困難"];
        var Practice = [true, true];
        var StartMap = 807300100;
        var MinLevel = [140, 180];
        var MaxLevel = [275, 275];
        var MaxEnter = [3,3];
        var RefreshDayOfWeek = [0];
        var MinPlayers = 1;
        var MaxPlayers = 6;
        break;
    //濃姬
    case 9130100:    
        var Open = true;
        var EventScriptName = ["BossNouhime"];
        var PQLogName = ["濃姬"];
        var EventName = "濃姬";
        var StartMap = 811000999;
        var MinLevel = [140];
        var MaxLevel = [275];
        var MaxEnter = [3];
        var RefreshDayOfWeek = [0];
        var MinPlayers = 1;
        var MaxPlayers = 6;
        var QuestID = 58025;
    default:
        var Open = true;
        var EventScriptName = ["未知"]; 
        var PQLogName = ["未知"];
        var EventName = "未知";
        var EventMode = ["未知"];
        var Practice = [false];
        var StartMap = 91000000;
        var MinLevel = [0];
        var MaxLevel = [275];
        var MaxEnter = [99];
        var RefreshDayOfWeek = [0];
        var MinPlayers = 1;
        var MaxPlayers = 6;
        var Speak = "";
        break;
    
}