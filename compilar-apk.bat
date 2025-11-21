@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║        📱 COMPILADOR DE APK PARA CHRONELIA 📱            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Node está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Error: Node.js no está instalado
    echo    Descárgalo desde: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si Java está instalado
where java >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Error: Java JDK no está instalado
    echo    Descárgalo desde: https://adoptium.net/
    echo    Se requiere JDK 17 o superior
    pause
    exit /b 1
)

echo ✅ Node.js detectado: 
node --version
echo.
echo ✅ Java detectado: 
java -version
echo.

echo ═══════════════════════════════════════════════════════════
echo  OPCIONES DE COMPILACIÓN
echo ═══════════════════════════════════════════════════════════
echo.
echo  1. Compilar APK Debug (rápido, para pruebas)
echo  2. Abrir proyecto en Android Studio
echo  3. Solo compilar web + sincronizar
echo  4. Limpiar y recompilar todo
echo  5. Salir
echo.
set /p opcion="Selecciona una opción (1-5): "

if "%opcion%"=="1" goto compilar_debug
if "%opcion%"=="2" goto abrir_android_studio
if "%opcion%"=="3" goto compilar_web
if "%opcion%"=="4" goto limpiar_recompilar
if "%opcion%"=="5" goto salir
goto menu_invalido

:compilar_debug
echo.
echo ════════════════════════════════════════════════════════════
echo  🔨 COMPILANDO APK DEBUG...
echo ════════════════════════════════════════════════════════════
echo.
echo [1/3] Compilando aplicación web...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al compilar la aplicación web
    pause
    exit /b 1
)

echo.
echo [2/3] Sincronizando con Android...
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo ⚠️ Advertencia: Hubo errores en la sincronización, pero continuaremos...
)

echo.
echo [3/3] Abriendo Android Studio...
echo.
echo 📝 INSTRUCCIONES:
echo    1. Espera a que Gradle termine de sincronizar
echo    2. Ve a: Build → Build Bundle(s) / APK(s) → Build APK(s)
echo    3. Cuando termine, haz clic en "locate" para encontrar el APK
echo.
echo    El APK estará en: android\app\build\outputs\apk\debug\app-debug.apk
echo.
call npx cap open android
goto fin

:abrir_android_studio
echo.
echo ════════════════════════════════════════════════════════════
echo  🚀 ABRIENDO ANDROID STUDIO...
echo ════════════════════════════════════════════════════════════
call npx cap open android
goto fin

:compilar_web
echo.
echo ════════════════════════════════════════════════════════════
echo  🔨 COMPILANDO WEB Y SINCRONIZANDO...
echo ════════════════════════════════════════════════════════════
echo.
echo [1/2] Compilando aplicación web...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al compilar la aplicación web
    pause
    exit /b 1
)

echo.
echo [2/2] Sincronizando con Android...
call npx cap sync android
echo.
echo ✅ Listo! Ahora puedes abrir Android Studio y compilar el APK
goto fin

:limpiar_recompilar
echo.
echo ════════════════════════════════════════════════════════════
echo  🧹 LIMPIANDO Y RECOMPILANDO...
echo ════════════════════════════════════════════════════════════
echo.
echo [1/4] Limpiando node_modules...
if exist node_modules (
    rmdir /s /q node_modules
)

echo [2/4] Reinstalando dependencias...
call npm install --legacy-peer-deps
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo [3/4] Compilando aplicación web...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo ❌ Error al compilar la aplicación web
    pause
    exit /b 1
)

echo [4/4] Sincronizando con Android...
call npx cap sync android
echo.
echo ✅ Limpieza y recompilación completa!
goto fin

:menu_invalido
echo.
echo ❌ Opción inválida. Por favor selecciona una opción del 1 al 5.
pause
goto fin

:salir
echo.
echo 👋 ¡Hasta luego!
goto fin

:fin
echo.
echo ════════════════════════════════════════════════════════════
echo  📋 NOTAS IMPORTANTES:
echo ════════════════════════════════════════════════════════════
echo.
echo  • El APK Debug estará en:
echo    android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo  • Para más información, consulta: GUIA_COMPILAR_APK.md
echo.
echo  • Si tienes problemas, asegúrate de tener:
echo    - JDK 17 instalado
echo    - Android Studio configurado
echo    - Variables ANDROID_HOME configuradas
echo.
pause












