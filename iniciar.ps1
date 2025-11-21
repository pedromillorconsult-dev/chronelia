# Script de inicio rápido de Chronelia
# Ejecutar en PowerShell: .\iniciar.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     CHRONELIA - Iniciar Servidor      " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Servidor corriendo en: http://localhost:5173" -ForegroundColor Green
Write-Host "Y también en tu red local para acceso móvil" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Gray
Write-Host ""

npm run dev -- --host


