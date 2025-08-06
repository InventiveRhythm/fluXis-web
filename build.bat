@REM @echo off

docker build -t flustix/fluxis-web:latest .
docker image push flustix/fluxis-web:latest