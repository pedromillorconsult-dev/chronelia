# 🚀 Inicio Rápido - Chronelia

## 📥 Instalación en 3 pasos

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Iniciar la aplicación

```bash
npm run dev
```

### 3️⃣ Abrir en el navegador

Visita: **http://localhost:5173**

---

## 🎯 Primera vez usando Chronelia

### Paso 1: Iniciar Sesión

Tienes dos cuentas de prueba:

**👑 Administrador:**
- Email: `admin@chronelia.com`
- Contraseña: cualquiera
- Acceso completo + Panel Admin

**👷 Trabajador:**
- Email: `trabajador@chronelia.com`
- Contraseña: cualquiera
- Gestión de reservas

### Paso 2: Explorar el Dashboard

Ya verás una **reserva de prueba activa**:
- **Cliente**: Ana Pérez
- **Tiempo restante**: 10 minutos
- Prueba los botones **+15 min**, **+30 min** y **Finalizar**

### Paso 3: Crear una nueva reserva

**Opción rápida:**
1. Ve a **"Escanear QR"** (menú lateral)
2. Clic en **"Crear Reserva de Prueba (45 min)"**
3. Vuelve al Dashboard para verla activa

**Con entrada manual:**
1. Ve a **"Escanear QR"**
2. Pega este JSON en el campo:
```json
{"clientName":"María López","clientEmail":"maria@email.com","duration":60}
```
3. Clic en **"Activar Reserva"**

---

## 🔔 Habilitar Notificaciones

Al abrir el Dashboard por primera vez, el navegador te pedirá permiso para mostrar notificaciones.

✅ **Acepta** para recibir alertas cuando:
- Queden **5 minutos** para finalizar
- El **tiempo se agote**

---

## 📱 Navegación Rápida

### Para Trabajadores:
| Sección | Qué hace |
|---------|----------|
| 🏠 **Dashboard** | Ver reservas activas en tiempo real |
| 📷 **Escanear QR** | Agregar nuevas reservas |
| 📊 **Estadísticas** | Ver métricas del día |
| 📜 **Historial** | Consultar reservas finalizadas |
| ⚙️ **Configuración** | Ajustar preferencias |

### Para Administradores (Adicional):
| Sección | Qué hace |
|---------|----------|
| 🛡️ **Panel Admin** | Estadísticas en tiempo real avanzadas |
| 👥 **Trabajadores** | Agregar/eliminar/gestionar personal |

---

## 💡 Tips Útiles

### ⏱️ Colores del Temporizador
- 🟢 **Verde**: Mucho tiempo restante
- 🟠 **Naranja**: Quedan entre 5-10 minutos
- 🔴 **Rojo**: Menos de 5 minutos (¡urgente!)

### ➕ Extender Tiempo
- **+15 min**: Para clientes que necesitan un poco más
- **+30 min**: Para sesiones largas

### ✅ Finalizar Reserva
- Úsalo cuando el cliente se vaya antes de tiempo
- La reserva se moverá automáticamente al historial

### 📊 Ver Estadísticas
- **Completadas hoy**: Total de reservas finalizadas
- **Promedio**: Duración media de las reservas
- **Tiempo total**: Suma de todos los minutos usados

---

## 🎨 Interfaz

### Menú Lateral
- Clic en el icono **☰** (arriba izquierda) para contraer/expandir

### Tarjetas de Reserva
Cada tarjeta muestra:
- 👤 Nombre del cliente
- 📧 Email
- ⏱️ Tiempo restante (grande y con color)
- 📊 Barra de progreso
- 🔘 Botones de acción

---

## 🐛 Solución de Problemas

### ❌ No se muestra la cámara para escanear QR
- Verifica que tu navegador tenga permisos de cámara
- Usa Chrome, Edge o Safari (Firefox puede tener limitaciones)

### ❌ No llegan las notificaciones
- Verifica que hayas dado permiso en el navegador
- Revisa la configuración de notificaciones de tu sistema operativo

### ❌ Error al instalar dependencias
```bash
# Limpia e instala de nuevo
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Soporte

¿Necesitas ayuda? Revisa el **README.md** completo para documentación detallada.

---

**¡Listo para gestionar tus reservas! 🎉**

