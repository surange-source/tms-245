/*  
 *  
 *  BOSS組隊副本 梅格耐斯[簡單]
 *  
 */
load("scripts/BossNpc.js");

//副本開關 開啟、true 關閉、false
var Open = true;
//配置文件名稱
var EventScriptName = ["BossMagnus_EASY"];
//記錄次數名稱
var PQLogName = ["梅格耐斯"];
//副本名稱
var EventName = "容易梅格耐斯";
//開始的地圖
var StartMap = 401060399;
//等級限制
var MinLevel = [115, 180];
var MaxLevel = [275, 275];
//次數限制
var MaxEnter = [1];
//星期幾刷新 - 0為每天刷新
var RefreshDayOfWeek = [0];
//限制人數
var MinPlayers = 1;
var MaxPlayers = 6;
