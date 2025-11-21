# 📱 Ejemplos de Códigos QR - Chronelia

Este archivo contiene ejemplos de códigos QR en formato JSON que puedes usar para probar la aplicación.

## 🎯 Cómo usar estos ejemplos

1. Ve a **"Escanear QR"** en el menú
2. Copia uno de los JSON de abajo
3. Pégalo en el campo **"Código QR (JSON)"**
4. Clic en **"Activar Reserva"**

---

## 📋 Ejemplos Básicos

### Reserva de 30 minutos
```json
{"clientName":"Carlos Ramírez","clientEmail":"carlos@email.com","duration":30,"code":"QR001"}
```

### Reserva de 1 hora
```json
{"clientName":"Laura Martínez","clientEmail":"laura@email.com","duration":60,"code":"QR002"}
```

### Reserva de 45 minutos
```json
{"clientName":"Pedro González","clientEmail":"pedro@email.com","duration":45,"code":"QR003"}
```

### Reserva de 15 minutos (rápida)
```json
{"clientName":"Sofia Torres","clientEmail":"sofia@email.com","duration":15,"code":"QR004"}
```

---

## 🧪 Ejemplos para Pruebas Específicas

### ⏰ Reserva de 6 minutos (para probar alerta de 5 min)
```json
{"clientName":"Test Alerta","clientEmail":"alerta@test.com","duration":6,"code":"TEST001"}
```
*Espera 1 minuto y recibirás la alerta de 5 minutos restantes*

### ⚡ Reserva de 2 minutos (para probar finalización rápida)
```json
{"clientName":"Test Rápido","clientEmail":"rapido@test.com","duration":2,"code":"TEST002"}
```
*Se completará en 2 minutos*

### 🏃 Reserva de 1 minuto (para ver tiempo agotado)
```json
{"clientName":"Test Expiración","clientEmail":"expiracion@test.com","duration":1,"code":"TEST003"}
```
*Verás la alerta de tiempo agotado inmediatamente*

---

## 👥 Ejemplos con Múltiples Clientes

### Cliente 1
```json
{"clientName":"Ana Rodríguez","clientEmail":"ana.rodriguez@email.com","duration":30,"code":"MULTI001"}
```

### Cliente 2
```json
{"clientName":"Juan Pérez","clientEmail":"juan.perez@email.com","duration":45,"code":"MULTI002"}
```

### Cliente 3
```json
{"clientName":"María García","clientEmail":"maria.garcia@email.com","duration":60,"code":"MULTI003"}
```

### Cliente 4
```json
{"clientName":"David López","clientEmail":"david.lopez@email.com","duration":30,"code":"MULTI004"}
```

*Activa varios de estos para ver cómo se gestiona el dashboard con múltiples reservas simultáneas*

---

## 🎨 Escenarios Especiales

### Sesión VIP (2 horas)
```json
{"clientName":"Cliente VIP","clientEmail":"vip@premium.com","duration":120,"code":"VIP001"}
```

### Sesión Express (10 minutos)
```json
{"clientName":"Express Cliente","clientEmail":"express@quick.com","duration":10,"code":"EXP001"}
```

### Sesión Estándar
```json
{"clientName":"Cliente Estándar","clientEmail":"estandar@normal.com","duration":40,"code":"STD001"}
```

---

## 🔄 Workflow Completo de Prueba

Sigue este orden para probar todas las funcionalidades:

### 1. Crear 3 reservas diferentes:
```json
{"clientName":"Reserva A","clientEmail":"a@test.com","duration":20,"code":"WF001"}
```
```json
{"clientName":"Reserva B","clientEmail":"b@test.com","duration":8,"code":"WF002"}
```
```json
{"clientName":"Reserva C","clientEmail":"c@test.com","duration":40,"code":"WF003"}
```

### 2. Acciones a probar:
- ✅ Ve al Dashboard y observa las 3 reservas
- ➕ Extiende la "Reserva A" +15 minutos
- ⏰ Espera a que "Reserva B" llegue a 5 minutos (verás la alerta)
- ✔️ Finaliza manualmente la "Reserva C"
- 📊 Ve a Estadísticas y revisa los números
- 📜 Ve a Historial y verifica que "Reserva C" aparece

---

## 📝 Formato Explicado

```json
{
  "clientName": "Nombre del Cliente",    // Requerido
  "clientEmail": "email@ejemplo.com",    // Requerido
  "duration": 30,                        // Minutos (requerido)
  "code": "CODIGO_UNICO"                 // Opcional pero recomendado
}
```

### Campos:
- **clientName**: Nombre completo del cliente
- **clientEmail**: Email de contacto
- **duration**: Duración en **minutos** (no segundos)
- **code**: Código único del QR (opcional)

---

## 🎓 Tips Avanzados

### Probar notificaciones múltiples:
Activa varias reservas de 6-7 minutos para que las alertas lleguen casi al mismo tiempo.

### Simular día completo:
1. Activa 5-6 reservas
2. Finaliza algunas manualmente
3. Deja que otras terminen automáticamente
4. Revisa las estadísticas del día

### Probar búsqueda en historial:
1. Finaliza varias reservas
2. Ve a Historial
3. Busca por nombre o email
4. Prueba los filtros (Hoy, Ayer, Semana)

---

## 🚀 Generador de QR Real

Si necesitas generar códigos QR reales para escanear con la cámara, usa herramientas como:

- [QR Code Generator](https://www.qr-code-generator.com/)
- [QRCode Monkey](https://www.qrcode-monkey.com/)

**Pega el JSON** de cualquiera de estos ejemplos y genera el QR para escanearlo desde tu dispositivo.

---

**¡Disfruta probando Chronelia! 🎉**











