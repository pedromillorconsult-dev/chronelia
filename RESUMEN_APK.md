# 📱 Resumen Rápido - Compilar APK

## ⚡ Inicio Rápido (3 pasos)

### 1️⃣ Requisitos (Instalar una sola vez)
- **Java JDK 17**: https://adoptium.net/
- **Android Studio**: https://developer.android.com/studio

### 2️⃣ Compilar
```bash
# Ejecuta el script automático
compilar-apk.bat
```

O manualmente:
```bash
npm run build
npx cap sync android
npx cap open android
```

### 3️⃣ En Android Studio
1. Espera a que cargue
2. Click en: **Build → Build APK(s)**
3. Cuando termine: Click en "locate"
4. Tu APK está en: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 Instalar en tu Teléfono

### Opción A: Por USB
1. Habilita "Depuración USB" en tu teléfono
2. Conecta el cable USB
3. Ejecuta: `adb install android/app/build/outputs/apk/debug/app-debug.apk`

### Opción B: Por archivo
1. Copia `app-debug.apk` a tu teléfono (WhatsApp, cable, etc.)
2. Abre el archivo APK desde tu teléfono
3. Permite "Instalar desde fuentes desconocidas"
4. ¡Instala!

---

## 🔄 Actualizar APK después de cambios

```bash
npm run build:android
npx cap open android
# En Android Studio: Build → Build APK(s)
```

---

## 🆘 Problemas Comunes

**"JAVA_HOME not set"**
→ Instala JDK 17 y reinicia la terminal

**"SDK location not found"**
→ Crea `android/local.properties`:
```
sdk.dir=C:\\Users\\TuUsuario\\AppData\\Local\\Android\\Sdk
```

**"Gradle sync failed"**
→ Android Studio: File → Invalidate Caches → Restart

**La cámara no funciona en el APK**
→ En el teléfono: Configuración → Apps → Chronelia → Permisos → Permitir cámara

---

## 📚 Documentación Completa

Para información detallada: **[GUIA_COMPILAR_APK.md](GUIA_COMPILAR_APK.md)**

---

## 📊 Información del APK

- **Nombre del paquete**: `com.chronelia.app`
- **Tamaño aproximado**: 10-15 MB (debug) / 8-12 MB (release)
- **Versión actual**: 1.0.0
- **Permisos requeridos**: Internet, Cámara

---

## 🎯 Comandos Útiles

```bash
# Compilar web + sincronizar
npm run build:android

# Abrir Android Studio
npm run open:android

# Solo sincronizar
npm run sync:android

# Ver logs de Android
adb logcat | findstr Chronelia
```

---

**¿Listo para probar?** Ejecuta `compilar-apk.bat` y sigue las instrucciones. 🚀












