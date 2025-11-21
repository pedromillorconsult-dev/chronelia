# 🌐 Desplegar Chronelia en Vercel (Acceso desde Internet)

## ✨ ¿Por qué Vercel?

- ✅ **100% Gratis**
- ✅ **Acceso desde cualquier lugar** con una URL única
- ✅ **Prueba en tu móvil** sin cables ni configuración
- ✅ **Actualización automática** cuando haces cambios
- ✅ **Setup en 3 minutos**

---

## 🚀 Pasos para Desplegar

### **Paso 1: Crear cuenta en Vercel**

1. Ve a: https://vercel.com/signup
2. Click en **"Continue with GitHub"** (o email si prefieres)
3. Autoriza Vercel para acceder a tu cuenta

### **Paso 2: Subir el proyecto a GitHub**

Si no tienes el proyecto en GitHub aún:

```bash
# 1. Inicializa Git (si no está inicializado)
git init

# 2. Agrega todos los archivos
git add .

# 3. Haz un commit
git commit -m "Chronelia app - primera versión"

# 4. Crea un repositorio en GitHub
# Ve a https://github.com/new
# Nombre: Chronelia
# Público o Privado (tu eliges)
# NO inicialices con README

# 5. Conecta tu repositorio local con GitHub
git remote add origin https://github.com/TU_USUARIO/Chronelia.git
git branch -M main
git push -u origin main
```

### **Paso 3: Importar en Vercel**

1. En Vercel, click en **"Add New..."** → **"Project"**
2. Selecciona tu repositorio **"Chronelia"**
3. Click en **"Import"**

### **Paso 4: Configurar el proyecto**

Vercel detectará automáticamente que es un proyecto Vite, pero verifica:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install --legacy-peer-deps`

### **Paso 5: Deploy**

1. Click en **"Deploy"**
2. Espera 2-3 minutos
3. ¡Listo! 🎉

Vercel te dará una URL como:
```
https://chronelia.vercel.app
```

---

## 📱 Usar en tu Móvil

1. Abre tu móvil
2. Ve a la URL que te dio Vercel
3. **Android**: Chrome → Menú → "Agregar a pantalla de inicio"
4. **iOS**: Safari → Compartir → "Añadir a pantalla de inicio"

¡Ya tienes Chronelia como una app en tu teléfono! 🎉

---

## 🔄 Actualizar la App

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de cambios"
git push
```

Vercel detectará los cambios y **actualizará automáticamente** la app en 2-3 minutos.

---

## 🆘 Si no quieres usar GitHub

### **Opción alternativa: Vercel CLI**

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Para producción
vercel --prod
```

---

## 📊 Ventajas vs Expo Go

| Característica | Expo Go | Vercel |
|----------------|---------|--------|
| **Setup** | Requiere React Native | ✅ Funciona ahora |
| **Costo** | Gratis | ✅ Gratis |
| **Acceso** | Solo red local | ✅ Internet global |
| **Cámara** | ✅ Funciona | ✅ Funciona |
| **Conversión** | Requiere rehacer app | ✅ Ya está lista |
| **Tiempo** | Días de trabajo | ✅ 3 minutos |

---

## 🎯 Resumen

**Lo más rápido:**
1. Usa la URL local: `http://192.168.1.246:5173/`

**Lo más profesional:**
1. Sube a GitHub
2. Conecta con Vercel
3. ¡Accede desde cualquier lugar!

---

**¿Prefieres que te ayude con el deploy en Vercel?** 🚀












