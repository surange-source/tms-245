load("scripts/BossNpc.js");

//副本開關 開啟、true 關閉、false
var Open = true;
//配置文件名稱
var EventScriptName = ["BossCross_EASY", "BossCross_NORMAL"];
//記錄次數名稱
var PQLogName = ["簡單庫洛斯", "庫洛斯"];
//副本名稱
var EventName = "庫洛斯";
//副本難度
var EventMode = ["容易", "一般"];
//開始的地圖
var StartMap = 806300000;
//等級限制
var MinLevel = [160, 180];
var MaxLevel = [275, 275];
//次數限制
var MaxEnter = [1, 1];
//星期幾刷新 - 0為每天刷新
var RefreshDayOfWeek = [0, 4];
//限制人數
var MinPlayers = 1;
var MaxPlayers = 6;