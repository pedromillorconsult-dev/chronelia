# 📱 Formato de Códigos QR para Chronelia

## 🎯 Formato JSON Requerido

Para que tus códigos QR funcionen con Chronelia, deben contener un JSON con esta estructura:

```json
{
  "clientName": "Nombre del Cliente",
  "clientEmail": "email@ejemplo.com",
  "duration": 30,
  "code": "CODIGO_UNICO"
}
```

---

## 📋 Campos Requeridos

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `clientName` | String | Nombre completo del cliente | "Juan Pérez" |
| `clientEmail` | String | Email del cliente (opcional) | "juan@email.com" |
| `duration` | Number | Duración en **minutos** | 30, 45, 60 |
| `code` | String | Código único de la reserva | "RES001" |

---

## ✅ Ejemplos para Generar QRs

### Ejemplo 1: Reserva de 30 minutos
```json
{"clientName":"María García","clientEmail":"maria@email.com","duration":30,"code":"QR001"}
```

### Ejemplo 2: Reserva de 45 minutos
```json
{"clientName":"Carlos López","clientEmail":"carlos@email.com","duration":45,"code":"QR002"}
```

### Ejemplo 3: Reserva de 60 minutos
```json
{"clientName":"Ana Martínez","clientEmail":"ana@email.com","duration":60,"code":"QR003"}
```

### Ejemplo 4: Reserva de 90 minutos
```json
{"clientName":"Pedro Sánchez","clientEmail":"pedro@email.com","duration":90,"code":"QR004"}
```

---

## 🖨️ Cómo Generar tus QRs

### Opción 1: QR Code Generator (Recomendado)
1. Ve a: https://www.qr-code-generator.com/
2. Selecciona "Text"
3. Copia y pega el JSON (ejemplo arriba)
4. Descarga el QR
5. Imprímelo

### Opción 2: QRCode Monkey
1. Ve a: https://www.qrcode-monkey.com/
2. En "Your QR Code Content", pega el JSON
3. Personaliza el diseño (opcional)
4. Descarga en alta resolución
5. Imprime

### Opción 3: API de QR (Rápido)
Usa esta URL para generar QRs al vuelo:
```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TU_JSON_AQUI
```

**Ejemplo:**
```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={"clientName":"Juan","duration":30,"code":"TEST01"}
```

---

## 📄 Plantilla de QRs para Imprimir

### Para 30 minutos:
```
Cliente: _______________
Duración: 30 minutos
JSON: {"clientName":"_____","clientEmail":"_____@___","duration":30,"code":"_____"}
```

### Para 45 minutos:
```
Cliente: _______________
Duración: 45 minutos
JSON: {"clientName":"_____","clientEmail":"_____@___","duration":45,"code":"_____"}
```

### Para 60 minutos:
```
Cliente: _______________
Duración: 60 minutos
JSON: {"clientName":"_____","clientEmail":"_____@___","duration":60,"code":"_____"}
```

---

## 🧪 Testing Rápido

Para probar que tus QRs funcionan:

1. Genera un QR con este JSON de prueba:
```json
{"clientName":"Test Cliente","clientEmail":"test@chronelia.com","duration":15,"code":"TEST123"}
```

2. Abre Chronelia en tu móvil: `http://192.168.1.246:5173`

3. Inicia sesión como trabajador: `trabajador@chronelia.com`

4. Presiona el botón central "Escanear"

5. Apunta al QR

6. ✅ Deberías ver: "✅ ¡Reserva activada! Test Cliente - 15 minutos"

---

## 💡 Tips para QRs Físicos

### Tamaño Recomendado:
- **Mínimo**: 3cm x 3cm (para distancia corta)
- **Ideal**: 5cm x 5cm (fácil de escanear)
- **Grande**: 10cm x 10cm (perfecto para carteles)

### Calidad:
- Usa **alta resolución** (300 DPI mínimo)
- Imprime en **papel blanco** para mejor contraste
- Evita superficies brillantes (sin reflejo)

### Ubicación:
- Colócalos donde haya **buena iluminación**
- A **altura de ojos** para fácil acceso
- Protégelos con **mica plástica** si estarán al aire libre

---

## 🎨 Personalización del QR (Opcional)

Puedes agregar tu logo de Chronelia en el centro del QR:
1. Usa QRCode Monkey
2. Sube tu logo (`Logo Sin texto Degradado.png`)
3. Ajusta el tamaño al 25-30% del QR
4. El QR seguirá siendo escaneable

---

## ⚠️ Errores Comunes

### ❌ "Código QR inválido"
**Causas:**
- JSON mal formado (falta coma, comilla, etc.)
- Campos requeridos faltantes (`clientName` o `duration`)
- Comillas incorrectas (usar " no ')

**Solución:**
- Valida tu JSON en: https://jsonlint.com/
- Asegúrate de incluir todos los campos requeridos

### ❌ "Error al acceder a la cámara"
**Causas:**
- Permisos de cámara bloqueados
- HTTPS no disponible (en algunos navegadores)
- Cámara en uso por otra app

**Solución:**
- Permite el acceso a la cámara cuando el navegador lo pida
- Usa Chrome o Safari para mejor compatibilidad
- Cierra otras apps que usen la cámara

---

## 📊 Duraciones Sugeridas

| Tipo de Servicio | Duración Recomendada |
|------------------|---------------------|
| Express | 15-30 minutos |
| Estándar | 45-60 minutos |
| Premium | 90-120 minutos |
| VIP | 180+ minutos |

---

## 🔄 Actualizar QRs Existentes

Si ya tienes QRs impresos pero quieres cambiar la duración:
1. Genera un nuevo QR con la nueva duración
2. Imprime una etiqueta adhesiva con el nuevo QR
3. Pégala sobre el QR anterior

---

## 🚀 Automatización (Avanzado)

Si necesitas generar muchos QRs:

### Script Python:
```python
import qrcode
import json

# Datos del cliente
clientes = [
    {"clientName": "Cliente 1", "duration": 30, "code": "C001"},
    {"clientName": "Cliente 2", "duration": 45, "code": "C002"},
    # ... más clientes
]

for cliente in clientes:
    data = json.dumps(cliente)
    qr = qrcode.make(data)
    qr.save(f"qr_{cliente['code']}.png")
```

### Excel + Mail Merge:
1. Crea una lista de clientes en Excel
2. Usa una columna con el JSON formateado
3. Genera QRs masivamente con herramientas online
4. Imprime en lote

---

## 📞 Soporte

Si tienes problemas generando tus QRs:
1. Verifica el formato JSON con https://jsonlint.com/
2. Prueba primero con el JSON de ejemplo
3. Usa el botón "⚡ Reserva de Prueba" para verificar que la app funciona

---

**¡Listo para generar tus QRs! 🎉**

Imprime, escanea y gestiona tus reservas con Chronelia.












