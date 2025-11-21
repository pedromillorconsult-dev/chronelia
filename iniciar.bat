@echo off
chcp 65001 >nul
color 0B

echo ========================================
echo      CHRONELIA - Iniciar Servidor
echo ========================================
echo.
echo Iniciando servidor de desarrollo...
echo.
color 0A
echo Servidor corriendo en: http://localhost:5173
echo.
color 0E
echo Presiona Ctrl+C para detener
color 0B
echo.

npm run dev

pause











