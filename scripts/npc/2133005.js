/*  
 *  
 *  BOSS組隊副本通用腳本
 *  
 */
load("scripts/BossNpc.js");

//副本開關 開啟、true 關閉、false
var Open = true;
//配置文件名稱
var EventScriptName = ["BossFairyQueen"];
//記錄次數名稱
var PQLogName = ["艾畢奈亞"];
//副本名稱
var EventName = "艾畢奈亞";
//訓練模式
var Practice = [false];
//開始的地圖
var StartMap = 300030300;
//等級限制
var MinLevel = [120];
var MaxLevel = [275];
//次數限制
var MaxEnter = [3];
//星期幾刷新 - 0為每天刷新
var RefreshDayOfWeek = [0];
//限制人數
var MinPlayers = 1;
var MaxPlayers = 6;