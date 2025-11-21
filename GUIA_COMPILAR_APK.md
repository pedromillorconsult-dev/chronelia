# 📱 Guía Completa para Compilar Chronelia como APK

Esta guía te ayudará a convertir la aplicación web Chronelia en una APK instalable para dispositivos Android.

---

## 🎯 Requisitos Previos

Antes de compilar el APK, necesitas instalar:

### 1. **Java Development Kit (JDK) 17**
- Descarga e instala JDK 17 desde: https://adoptium.net/
- Verifica la instalación: `java -version`
- Debe mostrar versión 17 o superior

### 2. **Android Studio**
- Descarga desde: https://developer.android.com/studio
- Durante la instalación, asegúrate de instalar:
  - Android SDK
  - Android SDK Platform-Tools
  - Android SDK Build-Tools
  - Android Emulator (opcional, para probar)

### 3. **Configurar Variables de Entorno**

Después de instalar Android Studio, configura estas variables:

**Windows (PowerShell):**
```powershell
# Reemplaza con tu ruta de instalación
$env:ANDROID_HOME = "C:\Users\TuUsuario\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\platform-tools"
$env:PATH += ";$env:ANDROID_HOME\tools"
```

**Para hacerlo permanente:**
1. Panel de Control → Sistema → Configuración avanzada del sistema
2. Variables de entorno
3. Agregar nueva variable de sistema: `ANDROID_HOME` con la ruta del SDK
4. Editar `Path` y agregar:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`

---

## 🔨 Proceso de Compilación

### **Opción 1: Compilar APK Debug (Más Rápido - Para Pruebas)**

Esta opción genera un APK no firmado que puedes instalar directamente en tu dispositivo.

#### Paso 1: Compilar el proyecto web
```bash
npm run build
```

#### Paso 2: Sincronizar con Android
```bash
npx cap sync android
```

#### Paso 3: Abrir en Android Studio
```bash
npx cap open android
```

#### Paso 4: En Android Studio
1. Espera a que Gradle termine de sincronizar
2. Ve a: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Espera a que termine (puede tardar varios minutos la primera vez)
4. Cuando termine, aparecerá una notificación con "locate" → Click ahí
5. ¡Listo! Tu APK está en: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Paso 5: Instalar en tu dispositivo
1. Copia el archivo APK a tu teléfono
2. Abre el archivo APK en tu teléfono
3. Permite "Instalar desde fuentes desconocidas" si te lo pide
4. ¡Instala y listo!

---

### **Opción 2: Compilar APK Release (Para Producción)**

Esta opción genera un APK firmado y optimizado para distribuir.

#### Paso 1: Generar una clave de firma

```bash
# Navega a la carpeta android
cd android

# Genera el keystore (archivo de claves)
keytool -genkey -v -keystore chronelia-release.keystore -alias chronelia -keyalg RSA -keysize 2048 -validity 10000
```

Te pedirá:
- **Contraseña del keystore**: Elige una y guárdala (¡IMPORTANTE!)
- **Nombre, organización, etc.**: Completa los datos
- **Contraseña de la clave**: Usa la misma que el keystore

**⚠️ IMPORTANTE:** Guarda el archivo `chronelia-release.keystore` y la contraseña en un lugar seguro. ¡Las necesitarás para futuras actualizaciones!

#### Paso 2: Configurar Gradle

Edita el archivo `android/app/build.gradle`:

Busca la sección `android {` y agrega ANTES de `buildTypes`:

```gradle
signingConfigs {
    release {
        storeFile file('chronelia-release.keystore')
        storePassword 'TU_CONTRASEÑA_KEYSTORE'
        keyAlias 'chronelia'
        keyPassword 'TU_CONTRASEÑA_CLAVE'
    }
}
```

Luego en `buildTypes`, modifica `release`:

```gradle
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

#### Paso 3: Compilar APK Release

```bash
cd android
./gradlew assembleRelease
```

#### Paso 4: Obtener el APK

El APK estará en:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🚀 Compilación Rápida (Sin Android Studio)

Si solo quieres el APK sin abrir Android Studio:

```bash
# 1. Compilar web
npm run build

# 2. Sincronizar
npx cap sync android

# 3. Compilar APK debug
cd android
./gradlew assembleDebug

# El APK estará en: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📦 Scripts NPM Personalizados

He agregado estos scripts al `package.json` para facilitar el proceso:

```bash
# Compilar web y sincronizar con Android
npm run build:android

# Abrir proyecto en Android Studio
npm run open:android

# Compilar APK directamente
npm run build:apk
```

---

## 🔍 Solución de Problemas

### Error: "JAVA_HOME not set"
- Instala JDK 17 y configura la variable `JAVA_HOME`

### Error: "SDK location not found"
- Crea el archivo `android/local.properties`:
```
sdk.dir=C:\\Users\\TuUsuario\\AppData\\Local\\Android\\Sdk
```

### Error: "Gradle sync failed"
- Abre Android Studio
- Ve a: File → Invalidate Caches → Invalidate and Restart

### APK no se instala en el teléfono
- Verifica que permitiste "Fuentes desconocidas"
- Configuración → Seguridad → Permitir instalación de apps desconocidas

### La cámara no funciona en el APK
- Verifica que el `AndroidManifest.xml` tenga los permisos de cámara (ya configurado)
- En el teléfono, ve a Configuración → Apps → Chronelia → Permisos → Permitir cámara

---

## 📲 Instalar APK en el Teléfono

### Método 1: Por cable USB
1. Habilita "Depuración USB" en tu teléfono (Configuración → Opciones de desarrollador)
2. Conecta el teléfono a la PC
3. Ejecuta:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Método 2: Por archivo
1. Copia el APK a tu teléfono (WhatsApp, Drive, cable USB, etc.)
2. Abre el archivo APK desde el explorador de archivos
3. Instala la app

---

## 🎨 Personalizar Icono y Nombre

### Cambiar icono de la app

1. Prepara tu logo en formato PNG (512x512 px recomendado)
2. Usa Android Studio:
   - Abre el proyecto: `npx cap open android`
   - Clic derecho en `res` → New → Image Asset
   - Sube tu logo y genera todos los tamaños

### Cambiar nombre de la app

Edita `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">Chronelia</string>
```

---

## 📊 Tamaño Estimado del APK

- **Debug APK**: ~10-15 MB
- **Release APK**: ~8-12 MB (optimizado)

---

## 🔄 Actualizar la APK

Cuando hagas cambios en tu código:

```bash
# 1. Compilar web
npm run build

# 2. Sincronizar
npx cap sync android

# 3. Compilar nuevo APK
cd android
./gradlew assembleDebug
```

**⚠️ IMPORTANTE:** Para actualizar una app ya instalada, debes:
- Usar la misma clave de firma (keystore)
- Incrementar el `versionCode` en `android/app/build.gradle`

---

## 📱 Probar en Emulador

Si quieres probar sin dispositivo físico:

```bash
# Abrir Android Studio
npx cap open android

# En Android Studio, click en el botón "Run" (triángulo verde)
# Selecciona un emulador o crea uno nuevo
```

---

## ✅ Resumen Ejecutivo

**Para generar el APK rápidamente:**

```bash
# Paso 1: Asegúrate de tener JDK 17 y Android Studio instalados
java -version

# Paso 2: Compilar
npm run build

# Paso 3: Sincronizar
npx cap sync android

# Paso 4: Abrir en Android Studio
npx cap open android

# Paso 5: En Android Studio → Build → Build APK(s)
```

**El APK estará en:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🆘 Soporte

Si tienes problemas:
1. Verifica que JDK 17 esté instalado: `java -version`
2. Verifica que Android SDK esté configurado: `echo $ANDROID_HOME` (Linux/Mac) o `echo %ANDROID_HOME%` (Windows)
3. Revisa los logs en Android Studio (pestaña "Build")
4. Limpia el proyecto: `cd android && ./gradlew clean`

---

## 📚 Recursos Adicionales

- [Documentación de Capacitor](https://capacitorjs.com/)
- [Guía de Android Studio](https://developer.android.com/studio/intro)
- [Publicar en Google Play](https://support.google.com/googleplay/android-developer/answer/9859152)

---

**¡Listo!** Ahora tienes todo lo necesario para compilar Chronelia como una APK instalable en Android. 🚀











