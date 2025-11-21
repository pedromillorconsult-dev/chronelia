# Script de instalación de Chronelia para Windows
# Ejecutar en PowerShell: .\instalar.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CHRONELIA - Instalación Automática  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar si npm está instalado
Write-Host "Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm encontrado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm no está instalado" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
Write-Host "Esto puede tomar varios minutos..." -ForegroundColor Gray
Write-Host ""

# Instalar dependencias
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ Instalación completada con éxito  " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para iniciar la aplicación, ejecuta:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Luego abre tu navegador en:" -ForegroundColor Cyan
    Write-Host "  http://localhost:5173" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Credenciales demo: cualquier email y contraseña" -ForegroundColor Gray
    Write-Host ""
    
    # Preguntar si desea iniciar automáticamente
    $respuesta = Read-Host "¿Deseas iniciar la aplicación ahora? (S/N)"
    if ($respuesta -eq "S" -or $respuesta -eq "s") {
        Write-Host ""
        Write-Host "Iniciando Chronelia..." -ForegroundColor Cyan
        Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
        Write-Host ""
        Start-Sleep -Seconds 2
        npm run dev
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ✗ Error en la instalación           " -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Intenta ejecutar manualmente:" -ForegroundColor Yellow
    Write-Host "  npm install" -ForegroundColor White
    Write-Host ""
}












