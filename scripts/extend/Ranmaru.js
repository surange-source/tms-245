/*      
 *  
 *  BOSS組隊副本通用腳本
 *  
 */
load("scripts/BossNpc.js");

//副本開關 開啟、true 關閉、false
var Open = true;
//配置文件名稱
var EventScriptName = ["BossRanmaru_NORMAL", "BossRanmaru_HARD"];
//記錄次數名稱
var PQLogName = ["森蘭丸"];
//副本名稱
var EventName = "森蘭丸";
//副本難度
var EventMode = ["一般", "困難"];
//開始的地圖
var StartMap = 807300100;
//等級限制
var MinLevel = [140, 180];
var MaxLevel = [275, 275];
//次數限制
var MaxEnter = [1];
//星期幾刷新 - 0為每天刷新
var RefreshDayOfWeek = [0];
//限制人數
var MinPlayers = 1;
var MaxPlayers = 6;