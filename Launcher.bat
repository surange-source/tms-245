@echo off
title TMS245
set JAVA_PREFIX=C:\Java\jdk-17\bin\
set CLASSPATH=.\target\lib\*;.\target\TwMS.jar
echo %CLASSPATH%
%JAVA_PREFIX%java -Xms8G -Xmx8G -server ^
launch.StartServer