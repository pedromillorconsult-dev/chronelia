# ⚠️ Error: JAVA_HOME no está configurado

## 🔧 Solución Rápida

### Opción 1: Configurar JAVA_HOME temporalmente (para esta sesión)

```powershell
# Primero, encuentra dónde está instalado Java
$javaPath = (Get-Command java -ErrorAction SilentlyContinue).Source
Write-Host "Java encontrado en: $javaPath"

# Si Java está instalado en la ubicación común, usa esto:
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# Verifica que funcione
java -version
```

### Opción 2: Configurar JAVA_HOME permanentemente (recomendado)

#### Método A: Con PowerShell (ejecutar como Administrador)

```powershell
# Reemplaza con tu ruta de instalación de JDK
$javaHome = "C:\Program Files\Eclipse Adoptium\jdk-17.0.x-hotspot"

# Configurar JAVA_HOME como variable de sistema
[Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "Machine")

# Agregar al PATH
$path = [Environment]::GetEnvironmentVariable("PATH", "Machine")
[Environment]::SetEnvironmentVariable("PATH", "$path;$javaHome\bin", "Machine")

Write-Host "✅ JAVA_HOME configurado correctamente"
Write-Host "⚠️ Reinicia la terminal para aplicar cambios"
```

#### Método B: Interfaz Gráfica (Manual)

1. **Buscar dónde está instalado Java:**
   - Abre una terminal y ejecuta: `where java`
   - Busca algo como: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\bin\java.exe`
   - La carpeta JAVA_HOME es todo MENOS `\bin\java.exe`

2. **Configurar variables de entorno:**
   - Presiona `Windows + R`
   - Escribe: `sysdm.cpl` y presiona Enter
   - Ve a la pestaña **"Opciones avanzadas"**
   - Click en **"Variables de entorno..."**

3. **Crear JAVA_HOME:**
   - En "Variables del sistema", click en **"Nueva..."**
   - **Nombre**: `JAVA_HOME`
   - **Valor**: La ruta de tu JDK (ej: `C:\Program Files\Eclipse Adoptium\jdk-17.0.10-hotspot`)
   - Click en **"Aceptar"**

4. **Agregar al PATH:**
   - En "Variables del sistema", busca **"Path"** y selecciónala
   - Click en **"Editar..."**
   - Click en **"Nuevo"**
   - Agrega: `%JAVA_HOME%\bin`
   - Click en **"Aceptar"** en todas las ventanas

5. **Reiniciar la terminal** y verificar:
   ```bash
   java -version
   echo %JAVA_HOME%
   ```

---

## 🔍 ¿Dónde está mi instalación de Java?

Ejecuta estos comandos para encontrarla:

```powershell
# Buscar java.exe
where java

# Buscar instalaciones de JDK
Get-ChildItem "C:\Program Files" -Directory -Filter "*jdk*" -Recurse -ErrorAction SilentlyContinue

# Buscar en Eclipse Adoptium (común)
Get-ChildItem "C:\Program Files\Eclipse Adoptium" -ErrorAction SilentlyContinue

# Buscar en otras ubicaciones comunes
Get-ChildItem "C:\Program Files\Java" -ErrorAction SilentlyContinue
Get-ChildItem "C:\Program Files (x86)\Java" -ErrorAction SilentlyContinue
```

---

## ✅ Verificar que todo funcione

```bash
# Debe mostrar la versión de Java
java -version

# Debe mostrar la ruta del JDK
echo %JAVA_HOME%

# Debe mostrar el compilador de Java
javac -version
```

---

## 🚀 Después de configurar JAVA_HOME

Una vez configurado, cierra y abre una nueva terminal, y ejecuta:

```bash
# Método 1: Usar el script automático
compilar-apk.bat

# Método 2: Comandos manuales
npm run build
npx cap sync android
cd android
.\gradlew.bat assembleDebug
```

El APK estará en: `android\app\build\outputs\apk\debug\app-debug.apk`

---

## 📝 Notas

- Necesitas **JDK 17 o superior** (no solo JRE)
- Si instalaste Java recientemente, **reinicia tu PC** para que los cambios tomen efecto
- Si usas Android Studio, este a veces instala su propio JDK en:
  - `C:\Program Files\Android\Android Studio\jbr`
  - Puedes usar ese también

---

## 🆘 Si nada funciona

**Reinstala JDK 17:**
1. Descarga desde: https://adoptium.net/
2. Durante la instalación, marca: "Set JAVA_HOME variable" y "Add to PATH"
3. Reinicia tu PC
4. Abre una terminal nueva y verifica: `java -version`











