# 📱 Guía Paso a Paso: Compilar APK en Android Studio

## 🎯 PASO 1: Abrir Android Studio

### Opción A: Desde la aplicación
1. Abre **Android Studio** desde el menú de Windows
2. Si te muestra proyectos recientes, NO hagas click en ninguno todavía
3. Ve al **PASO 2**

### Opción B: Desde la terminal
1. Ejecuta este comando:
```bash
npx cap open android
```
2. Espera a que Android Studio se abra
3. Ve al **PASO 2**

---

## 🎯 PASO 2: Abrir el Proyecto

### Si Android Studio muestra la pantalla de bienvenida:

1. Click en **"Open"** (o "Abrir")
2. Navega a: `D:\1TB\Nueva carpeta\Proyectos\Osvaldo\Chronelia\App\android`
3. Selecciona la carpeta **"android"**
4. Click en **"OK"**

### Si ya tienes Android Studio abierto con otro proyecto:

1. **File** → **Open...** (o `Ctrl + O`)
2. Navega a: `D:\1TB\Nueva carpeta\Proyectos\Osvaldo\Chronelia\App\android`
3. Selecciona la carpeta **"android"**
4. Click en **"OK"**
5. Si pregunta "Open in new window?", elige **"This Window"**

---

## 🎯 PASO 3: Esperar la Sincronización de Gradle

**ESTO ES MUY IMPORTANTE - NO HAGAS NADA HASTA QUE TERMINE**

### ¿Qué verás?

1. En la parte inferior derecha verás un mensaje: **"Gradle sync in progress..."**
2. O una barra de progreso que dice: **"Building 'Chronelia' Gradle project info..."**

### ¿Cuánto tarda?

- **Primera vez**: 5-15 minutos (descarga dependencias)
- **Siguientes veces**: 1-3 minutos

### ¿Cómo saber que terminó?

- El mensaje desaparece
- En la parte inferior dice: **"Gradle build finished in X s"**
- O verás: **"BUILD SUCCESSFUL"** en la pestaña "Build"

### ⚠️ Si hay errores:

**Error: "SDK location not found"**
1. Ve a: **File** → **Project Structure** → **SDK Location**
2. Asegúrate de que apunte a: `C:\Users\TU_USUARIO\AppData\Local\Android\Sdk`
3. Click en **"Apply"** y **"OK"**
4. **File** → **Sync Project with Gradle Files**

**Error: "Could not resolve all dependencies"**
1. **File** → **Invalidate Caches...** → **Invalidate and Restart**
2. Espera a que reinicie y vuelva a sincronizar

**Error: "JAVA_HOME"**
1. **File** → **Project Structure** → **SDK Location** → **JDK location**
2. Selecciona el JDK instalado (debe ser JDK 17+)
3. Click en **"Apply"** y **"OK"**

---

## 🎯 PASO 4: Compilar la APK

### Una vez que Gradle terminó de sincronizar:

1. Ve al menú superior: **Build**
2. Click en: **Build Bundle(s) / APK(s)**
3. Click en: **Build APK(s)**

   O usa el atajo de teclado: `Ctrl + Shift + A` → escribe "Build APK" → Enter

### ¿Qué verás?

1. En la parte inferior aparecerá: **"Building..."**
2. Verás el progreso: `Gradle build running 1/3: app:compileDebugJavaWithJavac`
3. Espera entre **2-5 minutos**

### ¿Cómo saber que terminó?

- Aparece una **notificación verde** en la esquina inferior derecha
- Dice: **"APK(s) generated successfully"**
- Te da dos opciones: **"locate"** y **"analyze"**

---

## 🎯 PASO 5: Encontrar tu APK

### Opción A: Desde la notificación (más fácil)

1. En la notificación verde, click en **"locate"**
2. Se abrirá el explorador de archivos
3. Verás el archivo: **`app-debug.apk`**
4. ¡Este es tu APK! 🎉

### Opción B: Manualmente

1. Abre el explorador de archivos
2. Navega a:
```
D:\1TB\Nueva carpeta\Proyectos\Osvaldo\Chronelia\App\android\app\build\outputs\apk\debug\
```
3. Verás el archivo: **`app-debug.apk`**
4. Tamaño aproximado: **10-15 MB**

---

## 🎯 PASO 6: Instalar en tu Teléfono

### Método 1: Por Cable USB (Recomendado)

**A. Preparar el teléfono:**
1. En tu teléfono Android, ve a: **Ajustes**
2. **Acerca del teléfono** → Toca 7 veces en **"Número de compilación"**
3. Aparecerá: "Ahora eres un desarrollador"
4. Regresa a **Ajustes** → **Opciones de desarrollador**
5. Activa: **"Depuración USB"**

**B. Conectar y instalar:**
1. Conecta tu teléfono al PC con el cable USB
2. En tu teléfono, acepta: "Permitir depuración USB desde este equipo"
3. En la terminal de tu PC, ejecuta:
```bash
cd "D:\1TB\Nueva carpeta\Proyectos\Osvaldo\Chronelia\App"
adb install android\app\build\outputs\apk\debug\app-debug.apk
```
4. Si funciona, verás: **"Success"**

### Método 2: Por WhatsApp/Email

1. Envíate el archivo **`app-debug.apk`** por WhatsApp, Email, o Telegram
2. En tu teléfono, descarga el archivo
3. Abre el archivo APK
4. Si dice "Instalación bloqueada", ve a:
   - **Ajustes** → **Seguridad**
   - Activa: **"Permitir instalación de apps desconocidas"** para WhatsApp (o la app que uses)
5. Vuelve al APK y abre de nuevo
6. Click en **"Instalar"**
7. ¡Listo! 🎉

### Método 3: Por Google Drive

1. Sube el **`app-debug.apk`** a Google Drive
2. En tu teléfono, abre Drive y descarga el APK
3. Abre el archivo desde "Descargas"
4. Permite la instalación (igual que el método 2)
5. Click en **"Instalar"**

---

## 🎯 PASO 7: Verificar que Funcione

### Al abrir Chronelia en tu teléfono:

1. Deberías ver la pantalla de login
2. Prueba con:
   - **Admin**: `admin@chronelia.com` / cualquier contraseña
   - **Trabajador**: `trabajador@chronelia.com` / cualquier contraseña

3. **Probar la cámara:**
   - Como trabajador, presiona el botón central de **"Escanear"**
   - Permite el acceso a la cámara cuando te lo pida
   - Apunta a un código QR de prueba
   - O usa el botón: **"Crear Reserva de Prueba"**

---

## 🔍 Verificación de Errores Comunes

### "App no instalada" o "Error de análisis"
- **Causa**: APK corrupto o incompatible
- **Solución**: Vuelve a compilar desde Android Studio

### "La cámara no funciona"
- **Causa**: Permisos no otorgados
- **Solución**: 
  - **Ajustes** → **Apps** → **Chronelia** → **Permisos**
  - Activa: **"Cámara"**

### "No se puede abrir la app"
- **Causa**: Android muy antiguo (< 7.0)
- **Solución**: La app requiere Android 7.0 o superior

### APK muy grande (> 50 MB)
- **Causa**: Compilación incorrecta
- **Solución**: Asegúrate de compilar **"Build APK"** no "Build Bundle"

---

## 📊 Información del APK Generado

| Característica | Valor |
|----------------|-------|
| **Nombre del archivo** | `app-debug.apk` |
| **Tamaño** | ~10-15 MB |
| **Versión** | 1.0 |
| **Min. Android** | 7.0 (API 24) |
| **Permisos** | Internet, Cámara |
| **Nombre en el teléfono** | Chronelia |
| **Paquete** | com.chronelia.app |

---

## 🆘 Problemas en Android Studio

### Android Studio no abre el proyecto

1. **Cierra Android Studio completamente**
2. Ve a: `D:\1TB\Nueva carpeta\Proyectos\Osvaldo\Chronelia\App\android`
3. Elimina estas carpetas (si existen):
   - `.gradle`
   - `build`
   - `app/build`
4. Abre Android Studio de nuevo
5. **File** → **Open** → selecciona la carpeta `android`

### Gradle sync falla constantemente

1. **File** → **Invalidate Caches...** → **Invalidate and Restart**
2. Cuando reinicie: **File** → **Sync Project with Gradle Files**
3. Si persiste, verifica tu conexión a internet (descarga dependencias)

### "Build failed" al compilar

1. Ve a la pestaña **"Build"** en la parte inferior
2. Lee el error específico
3. Errores comunes:
   - **"Failed to find target..."** → Instala el Android SDK correcto en SDK Manager
   - **"Execution failed for task..."** → Limpia el proyecto: **Build** → **Clean Project**

---

## 🎬 Resumen Visual del Proceso

```
1. Abrir Android Studio
        ↓
2. File → Open → Seleccionar carpeta "android"
        ↓
3. ⏱️ ESPERAR que Gradle termine (mensaje "BUILD SUCCESSFUL")
        ↓
4. Build → Build Bundle(s) / APK(s) → Build APK(s)
        ↓
5. ⏱️ ESPERAR compilación (2-5 minutos)
        ↓
6. 🎉 Notificación verde → Click en "locate"
        ↓
7. 📱 Copiar app-debug.apk a tu teléfono
        ↓
8. ✅ Instalar en el teléfono
```

---

## 💡 Consejos Finales

✅ **Primera compilación**: Es normal que tarde 10-20 minutos
✅ **No cierres Android Studio** mientras compila
✅ **Asegúrate de tener internet** (descarga dependencias)
✅ **Guarda el APK** en un lugar seguro
✅ **La cámara solo funciona** en dispositivos físicos (no en emuladores)

---

## 🚀 Próxima Vez (Mucho Más Rápido)

Si haces cambios en el código:

1. `npm run build` (en la terminal)
2. Abrir Android Studio (ya con el proyecto cargado)
3. **Build** → **Build APK(s)**
4. Listo en ~2 minutos

---

**¿Estás listo?** ¡Abre Android Studio y sigue estos pasos! 🎉

Si tienes algún problema en algún paso específico, dime en cuál paso te quedaste y te ayudo. 💪











