@echo off
title TMS245
set JAVA_PREFIX=D:\java\jdk\jdk-11.0.26\bin\
@rem set CLASSPATH=.\lib\weblaf-complete-1.29.jar;.\out\artifacts\twms_jar\twms.jar;.\jython-standalone-2.7.3.jar;.\nashorn-core-15.3.jar;.\target\classes
set CLASSPATH=.\jython-standalone-2.7.3.jar;.\nashorn-core-15.3.jar;.\out\artifacts\twms_jar\*
echo %CLASSPATH%
%JAVA_PREFIX%java -version
%JAVA_PREFIX%java -Xmx4096M -server launch.StartServer
pause
