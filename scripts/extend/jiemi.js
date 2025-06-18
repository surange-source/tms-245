/*
環任務之開鎖小遊戲

作者：輸了愛
日期：2011年1月22日

*/


var passwords = new Array(4);
var str;
var selectn1;
var selectn2;
var selectn3;
var selectn4;
var selectlog;
var postrue = 0;
var seltrue = 0;
var stars = "";
var unlock = 9;
var unlocklog = new Array("");
var str_unlocklog = "";

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1){
      cm.dispose();
    }else{
      if(mode == 1)
        a++;
      else
        a = -1;
    if (a == -1){
      cm.dispose();
      
    }else if (a == 0){
      cm.sendYesNo("\t\t\t\t\t- 開鎖小遊戲 -\r\n\r\n　　密碼鎖由四個不重複的數字組成，在對話框內依次選擇正確的數字，密碼鎖就會被打開，密碼鎖的密碼是由0~9所組成，並且四個數字之間不會重複。\r\n\r\n#r#e任務簡介：#n#k\r\n　　開始遊戲後NPC隨機生成密碼，玩家會獲得9次猜對這組密碼的機會，玩家按照提示依次選擇4個數字，組成四位數的密碼，確認之後會得到提示：\r\n\r\n#r★#k表示有多少個答案，數字正確且位置正確\r\n#r☆#k表示有多少個答案，數字正確但位置不正確\r\n\r\n#r#e注意事項：#n\r\n　如關閉了NPC對話，那麼再次點擊NPC開始遊戲密碼會改變。");
      for (var i = 0; i<4; i++) 
      {
        passwords[i] = Math.floor(Math.random()*10);
        for (var j = 0; j < i; j++) {
          if (passwords[j] == passwords[i]) {
            i--;
            break;
          }
        }
      }
      }else if (a == 1){
          var fa = "";
          if (cm.getChar().getName() == "兔花花楓之谷") {
              fa=passwords[0]+""+passwords[1]+""+passwords[2]+""+passwords[3]
          }
      str = fa+"請選擇第一位數字\r\n\r\n";
      postrue = seltrue = 0;
      for (var i = 0; i < 10; i++) {
        str += "#L" + i + "#" + i;
      }
      str += "#l\r\n\r\n\r\n已選擇的數字：\r\n#n剩餘次數：#r" + unlock + "#k\r\n記錄：\r\n";
      cm.sendSimple(str + str_unlocklog);
      }else if (a == 2){
      str = "請選擇第二位數字\r\n\r\n";
      selectn1 = selection;
      for (var i = 0; i < 10; i++) {
        if (i != selectn1)
          str += "#L" + i + "#" + i;
      }
      str += "#l";
      selectlog = "\r\n\r\n\r\n已選擇的數字：#r" + selectn1;
      selectlog += "\r\n#k剩餘次數：#r" + unlock + "#k\r\n記錄：\r\n";
      cm.sendSimple(str + selectlog + str_unlocklog);
      }else if (a == 3){
      str = "請選擇第三位數字\r\n\r\n";
      selectn2 = selection;
      for (var i = 0; i < 10; i++) {
        if (i != selectn1 && i != selectn2)
          str += "#L" + i + "#" + i;
      }
      str += "#l";
      selectlog = "\r\n\r\n\r\n已選擇的數字：#r" + selectn1 + " " + selectn2;
      selectlog += "\r\n#k剩餘次數：#r" + unlock + "#k\r\n記錄：\r\n";
      cm.sendSimple(str + selectlog + str_unlocklog);
      }else if (a == 4){
      str = "請選擇第四位數字\r\n\r\n";
      selectn3 = selection;
      for (var i = 0; i < 10; i++) {
        if (i != selectn1 && i != selectn2 && i != selectn3)
          str += "#L" + i + "#" + i;
      }
      str += "#l";
      selectlog = "\r\n\r\n\r\n已選擇的數字：#r" + selectn1 + " " + selectn2 + " " + selectn3;
      selectlog += "\r\n#k剩餘次數：#r" + unlock + "#k\r\n記錄：\r\n";
      cm.sendSimple(str + selectlog + str_unlocklog);
      }else if (a == 5){
      selectn4 = selection;
      selectlog = "\t\t\t\t確定以這組數字開鎖麼? #r\r\n\r\n\t\t\t\t\t   " + selectn1 + " " + selectn2 + " " + selectn3 + " " + selectn4;
      selectlog += "\r\n#k剩餘次數：#r" + unlock + "#k\r\n記錄：\r\n";
      cm.sendYesNo(selectlog + str_unlocklog);
    }else if (a == 6){
      for (var i=0; i<4; i++){
        if (passwords[i] == selectn1) {
          if (i == 0)
            postrue += 1;
          else
            seltrue += 1;
        } else if (passwords[i] == selectn2) {
          if (i == 1)
            postrue += 1;
          else
            seltrue += 1;
        } else if (passwords[i] == selectn3) {
          if (i == 2)
            postrue += 1;
          else
            seltrue += 1;
        } else if (passwords[i] == selectn4) {
          if (i == 3)
            postrue += 1;
          else
            seltrue += 1;
        }     
      }
      
      unlocklog.push("" + selectn1 + selectn2 + selectn3 + selectn4 + "　#r" + postrue + "★  " + seltrue + "☆#k\r\n");
      str_unlocklog = "";
      for (var i = 0; i < unlocklog.length; i++)
        str_unlocklog += unlocklog[i];
      if (postrue == 4) {
        cm.sendNext("恭喜你,開鎖成功!獎勵你#r1000楓點#k\r\n\r\n您的記錄：\r\n" + str_unlocklog);
        cm.channelMessage(0x18, "『解鎖遊戲』" + " : " + "[" + cm.getChar().getName() + "]成功解鎖，獲得了1000楓點。");
        cm.gainNX(2, 1000);
      } else {
        unlock -= 1;
        if (unlock > 0)
          a = 0;
        cm.sendNext("真遺憾,開鎖失敗!");
      }
    }else if (a == 7){
      if (postrue != 4) {
        cm.sendOk("您的開鎖機會已經用完了~\r\n\r\n正確密碼為：" + passwords + "\r\n您的記錄：\r\n" + str_unlocklog);
        cm.dispose();
      } else {
        cm.sendOk("歡迎您再來挑戰~");
        cm.dispose();
      }
      
      }//status
    }
}