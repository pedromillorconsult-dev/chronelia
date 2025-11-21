@echo off
chcp 65001 >nul
color 0B

echo ========================================
echo   CHRONELIA - Instalación Automática
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ✗ Node.js no está instalado
    echo Por favor, instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js encontrado
for /f "tokens=*" %%i in ('node --version') do echo   Versión: %%i

echo.
echo Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ✗ npm no está instalado
    pause
    exit /b 1
)
echo ✓ npm encontrado
for /f "tokens=*" %%i in ('npm --version') do echo   Versión: %%i

echo.
echo Instalando dependencias...
echo Esto puede tomar varios minutos...
echo.

call npm install

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ========================================
    echo   ✓ Instalación completada con éxito
    echo ========================================
    echo.
    color 0B
    echo Para iniciar la aplicación, ejecuta:
    color 0E
    echo   npm run dev
    color 0B
    echo.
    echo Luego abre tu navegador en:
    color 0E
    echo   http://localhost:5173
    color 0B
    echo.
    echo Credenciales demo: cualquier email y contraseña
    echo.
    
    set /p "respuesta=¿Deseas iniciar la aplicación ahora? (S/N): "
    if /i "%respuesta%"=="S" (
        echo.
        echo Iniciando Chronelia...
        echo Presiona Ctrl+C para detener el servidor
        echo.
        timeout /t 2 >nul
        npm run dev
    )
) else (
    color 0C
    echo.
    echo ========================================
    echo   ✗ Error en la instalación
    echo ========================================
    echo.
    color 0E
    echo Intenta ejecutar manualmente:
    echo   npm install
    echo.
)

pause












