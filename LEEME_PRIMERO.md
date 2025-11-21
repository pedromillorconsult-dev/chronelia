# 👋 ¡LÉEME PRIMERO! - Chronelia

¡Bienvenido a **Chronelia**! Tu aplicación de gestión de reservas con QR está lista para usar.

---

## 🎯 ¿Qué es Chronelia?

Chronelia es una aplicación web profesional para gestionar reservas de clientes que llegan con códigos QR. Permite:

- ✅ Escanear códigos QR para activar reservas
- ⏱️ Controlar el tiempo de cada cliente en tiempo real
- 🔔 Recibir alertas cuando falten 5 minutos
- ➕ Extender el tiempo de reserva
- 📊 Ver estadísticas del día
- 📜 Consultar historial completo
- 🎨 Interfaz moderna y responsive

---

## 🚀 Inicio Rápido (3 pasos)

### Paso 1: Instalar

#### Opción A - Con script (Recomendado para Windows)
Doble clic en:
- `instalar.bat` (para CMD)
- `instalar.ps1` (para PowerShell)

#### Opción B - Manual
Abre la terminal en esta carpeta y ejecuta:
```bash
npm install
```

### Paso 2: Iniciar

#### Opción A - Con script (Recomendado para Windows)
Doble clic en:
- `iniciar.bat` (para CMD)
- `iniciar.ps1` (para PowerShell)

#### Opción B - Manual
```bash
npm run dev
```

### Paso 3: Abrir

Abre tu navegador en: **http://localhost:5173**

**Usuario**: Cualquier email (ejemplo: admin@chronelia.com)  
**Contraseña**: Cualquier contraseña

---

## 📚 Documentación Incluida

He creado varios archivos de ayuda para ti:

| Archivo | Para qué sirve |
|---------|----------------|
| **INICIO_RAPIDO.md** | Guía paso a paso para tu primera vez |
| **README.md** | Documentación completa del proyecto |
| **EJEMPLOS_QR.md** | Códigos QR de prueba listos para usar |
| **NOTA_LOGO.md** | Cómo usar tu logo personalizado |
| **COMANDOS_UTILES.md** | Referencia de comandos y solución de problemas |

---

## 🎓 Tu Primera Sesión

1. **Inicia la app** (ver arriba)
2. **Inicia sesión** con cualquier email/contraseña
3. En el **Dashboard** verás una reserva de prueba:
   - Cliente: Ana Pérez
   - Tiempo restante: 10 minutos
4. **Prueba los botones**:
   - `+15 min` / `+30 min` para extender
   - `Finalizar` para completar la reserva
5. Ve a **"Escanear QR"** y crea una reserva de prueba
6. Explora **Estadísticas** e **Historial**

---

## 📱 Funcionalidades Principales

### 🏠 Dashboard
- Ver todas las reservas activas
- Temporizador en tiempo real con colores
- Extender tiempo o finalizar reservas
- Estadísticas rápidas

### 📷 Escanear QR
- Activar cámara para escanear
- Entrada manual de código
- Botón de reserva de prueba rápida

### 📊 Estadísticas
- Reservas completadas del día
- Clientes activos en tiempo real
- Tiempo promedio y total
- Actividad en vivo

### 📜 Historial
- Ver todas las reservas finalizadas
- Filtros: Hoy, Ayer, Última semana
- Búsqueda por nombre o email
- Estadísticas del período

### ⚙️ Configuración
- Perfil de usuario
- Activar/desactivar notificaciones
- Configurar tiempo de alerta
- Duración predeterminada

---

## 🔔 Notificaciones

La app te alertará:
- ⏰ **5 minutos antes** de que termine una reserva
- 🔴 **Al finalizar** el tiempo

**Importante**: Acepta los permisos de notificación del navegador cuando te lo pida.

---

## 🎨 Tu Logo Personalizado

Veo que tienes el archivo **"Logo Sin texto Degradado.png"** en la carpeta.

Para usarlo, lee el archivo **NOTA_LOGO.md** donde explico paso a paso cómo reemplazar el logo actual con el tuyo.

---

## 📋 Códigos QR de Prueba

Para probar la funcionalidad de escáner sin generar QRs reales:

1. Ve a **"Escanear QR"**
2. Abre el archivo **EJEMPLOS_QR.md**
3. Copia cualquier JSON de ejemplo
4. Pégalo en el campo de "Entrada Manual"
5. Clic en **"Activar Reserva"**

O simplemente usa el botón **"Crear Reserva de Prueba"**.

---

## 🎨 Colores y Diseño

La app usa una paleta de colores degradado:
- 🩷 **Rosa**: #FF2E7E
- 💜 **Morado**: #6C47FF

Es completamente responsive:
- 📱 Móvil
- 📱 Tablet
- 💻 Desktop

---

## ⚡ Tecnologías Usadas

- **React 18** - Framework moderno
- **Vite** - Build tool súper rápido
- **TailwindCSS** - Estilos modernos
- **Framer Motion** - Animaciones fluidas
- **Zustand** - Gestión de estado
- **React Router** - Navegación
- **Sonner** - Notificaciones elegantes
- **Lucide React** - Iconos modernos

---

## 🐛 ¿Problemas?

### La app no inicia
```bash
# Reinstala dependencias
npm install
```

### Puerto 5173 ocupado
El servidor se iniciará automáticamente en otro puerto disponible.

### No aparece la cámara
- Verifica permisos del navegador
- Usa Chrome, Edge o Safari (mejor compatibilidad)

### Más ayuda
Lee **COMANDOS_UTILES.md** para solución de problemas comunes.

---

## 📦 Estructura del Proyecto

```
Chronelia/
├── 📄 LEEME_PRIMERO.md        ← Estás aquí
├── 📄 INICIO_RAPIDO.md        ← Guía de inicio
├── 📄 README.md               ← Documentación completa
├── 📄 EJEMPLOS_QR.md          ← Códigos QR de prueba
├── 📄 NOTA_LOGO.md            ← Cómo usar tu logo
├── 📄 COMANDOS_UTILES.md      ← Comandos y soluciones
│
├── 🔧 instalar.bat/ps1        ← Scripts de instalación
├── 🚀 iniciar.bat/ps1         ← Scripts de inicio rápido
│
├── 📦 package.json            ← Dependencias del proyecto
├── ⚙️ vite.config.js          ← Configuración de Vite
├── 🎨 tailwind.config.js      ← Configuración de Tailwind
│
├── 📁 public/
│   └── logo.svg               ← Logo de la app
│
├── 📁 src/
│   ├── App.jsx                ← Componente principal
│   ├── main.jsx               ← Punto de entrada
│   ├── index.css              ← Estilos globales
│   │
│   ├── 📁 components/
│   │   ├── layout/            ← Header, Sidebar, Layout
│   │   ├── ui/                ← Botones, Cards, Inputs
│   │   └── ReservationCard.jsx
│   │
│   ├── 📁 pages/
│   │   ├── Login.jsx          ← Pantalla de login
│   │   ├── Dashboard.jsx      ← Dashboard principal
│   │   ├── QRScanner.jsx      ← Escáner QR
│   │   ├── Statistics.jsx     ← Estadísticas
│   │   ├── History.jsx        ← Historial
│   │   └── Settings.jsx       ← Configuración
│   │
│   ├── 📁 lib/
│   │   ├── utils.js           ← Funciones útiles
│   │   └── supabase.js        ← Auth (modo demo)
│   │
│   └── 📁 store/
│       └── useStore.js        ← Estado global
│
└── 📁 node_modules/           ← Dependencias (se crean al instalar)
```

---

## 🎯 Próximos Pasos

### Ahora mismo:
1. ✅ Instala la app (`instalar.bat` o `npm install`)
2. ✅ Iníciala (`iniciar.bat` o `npm run dev`)
3. ✅ Explora la interfaz
4. ✅ Prueba crear reservas

### Después:
- 📖 Lee **INICIO_RAPIDO.md** para más detalles
- 🎨 Personaliza el logo (ver **NOTA_LOGO.md**)
- 🔧 Configura Supabase si quieres autenticación real
- 🚀 Haz deploy a producción (Vercel/Netlify)

---

## 💬 Características Destacadas

### ✨ Ya Incluidas
- ✅ Reserva de prueba precargada (Ana Pérez, 10 min restantes)
- ✅ Sistema de notificaciones (visual + navegador)
- ✅ Temporizadores en tiempo real
- ✅ Colores dinámicos según tiempo restante
- ✅ Animaciones suaves
- ✅ Diseño responsive completo
- ✅ Modo demo (funciona sin backend)

### 🔮 Futuras (Sugerencias)
- Integración completa con Supabase
- Generador de códigos QR
- Exportar estadísticas a PDF
- Sistema de roles (admin/trabajador)
- Modo oscuro
- Multi-idioma

---

## 📞 Necesitas Ayuda?

1. **Primero**: Lee los archivos de documentación
2. **Problemas técnicos**: Consulta **COMANDOS_UTILES.md**
3. **Sobre el logo**: Lee **NOTA_LOGO.md**
4. **Ejemplos QR**: Abre **EJEMPLOS_QR.md**

---

## 🎉 ¡Todo Listo!

La aplicación **Chronelia** está completamente funcional y lista para usar.

**Siguiente paso**: Ejecuta `instalar.bat` o `npm install`

---

**Desarrollado con ❤️ para Osvaldo**

*Versión 1.0.0 - Octubre 2025*











