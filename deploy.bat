@echo off
title AURELIAN AI - FRONTEND DEPLOY
color 0b

:: Configuración de ruta
set FRONT_PATH=C:\Users\USER\Documents\Frontend\Login

:inicio
cls
echo.
echo  =========================================
echo       AURELIAN AI: FRONTEND DEPLOY
echo  =========================================
echo  Ruta: %FRONT_PATH%
echo  Rama: main
echo  =========================================
echo.

:: 1. Entrar a la carpeta
cd /d "%FRONT_PATH%"

:: 2. Verificar si es un repo de git
if not exist ".git" (
    color 0c
    echo [ERROR] No se detecto un repositorio Git en esta carpeta.
    pause
    exit
)

:: 3. Preguntar por el mensaje del commit
echo [PREPARACION]
set /p msg="que le ponemos al commit? "

:: Si el mensaje está vacío, poner uno por defecto
if "%msg%"=="" set msg="Update AURELIAN AI Dashboard"

echo.
echo [EJECUCION] Iniciando secuencia de despliegue...

:: 4. Comandos de Git
echo > Agregando cambios...
git add .

echo > Creando commit: "%msg%"
git commit -m "%msg%"

echo > Empujando a la nube (Vercel)...
git push origin main

echo.
echo  =========================================
echo     DESPLIEGUE COMPLETADO EXITOSAMENTE
echo  =========================================
echo.
pause
goto inicio