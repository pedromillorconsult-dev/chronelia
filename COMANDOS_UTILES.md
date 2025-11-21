# ⚡ Comandos Útiles - Chronelia

Referencia rápida de comandos para el desarrollo y mantenimiento de Chronelia.

---

## 🚀 Comandos Principales

### Instalación
```bash
# Instalar dependencias
npm install

# Instalar y ejecutar automáticamente (Windows)
.\instalar.bat
# o
.\instalar.ps1
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Iniciar con script (Windows)
.\iniciar.bat
# o
.\iniciar.ps1

# El servidor estará en:
# http://localhost:5173
```

### Producción
```bash
# Construir para producción
npm run build

# Preview del build
npm run preview

# El preview estará en:
# http://localhost:4173
```

---

## 🧹 Comandos de Limpieza

### Limpiar cache de npm
```bash
npm cache clean --force
```

### Reinstalar dependencias
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Windows CMD
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Limpiar build
```bash
# Windows PowerShell
Remove-Item -Recurse -Force dist

# Windows CMD
rmdir /s /q dist
```

---

## 🔍 Comandos de Información

### Ver versión de dependencias
```bash
npm list --depth=0
```

### Ver versiones de Node y npm
```bash
node --version
npm --version
```

### Ver scripts disponibles
```bash
npm run
```

---

## 🐛 Solución de Problemas

### Error: "Puerto 5173 ya está en uso"
```bash
# Windows: Encontrar proceso usando el puerto
netstat -ano | findstr :5173

# Matar el proceso (reemplaza PID con el número que obtuviste)
taskkill /PID <PID> /F

# O simplemente cambia el puerto en vite.config.js:
# server: { port: 3000 }
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
npm install
```

### Error de permisos en Windows
```bash
# Ejecuta PowerShell como Administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "ENOENT" o archivos no encontrados
```bash
# Verifica que estés en la carpeta correcta
cd "d:\1TB\Nueva carpeta\Proyectos\Osvaldo\Chronelia\App"

# Verifica que exista package.json
dir package.json
```

### Error: "Module not found: Error: Can't resolve '@/...'"
```bash
# Asegúrate de que existe jsconfig.json
# Si no existe, créalo con:
# {
#   "compilerOptions": {
#     "baseUrl": ".",
#     "paths": { "@/*": ["./src/*"] }
#   }
# }
```

---

## 📦 Gestión de Dependencias

### Actualizar dependencias
```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas (cuidado, puede romper cosas)
npm update

# Actualizar una específica
npm update <nombre-paquete>
```

### Agregar nuevas dependencias
```bash
# Dependencia de producción
npm install <paquete>

# Dependencia de desarrollo
npm install -D <paquete>
```

### Desinstalar dependencias
```bash
npm uninstall <paquete>
```

---

## 🌐 Comandos de Red

### Ver IP local
```bash
# Windows
ipconfig

# Busca "Dirección IPv4" en tu adaptador de red
# Ejemplo: 192.168.1.100
```

### Acceder desde otro dispositivo
1. Encuentra tu IP local (ej: 192.168.1.100)
2. Inicia el servidor: `npm run dev`
3. En otro dispositivo conectado a la misma red:
   - Abre: `http://192.168.1.100:5173`

Para configurar esto automáticamente, edita `vite.config.js`:
```js
export default defineConfig({
  server: {
    host: '0.0.0.0', // Permite acceso desde la red local
    port: 5173,
  }
})
```

---

## 🔐 Configuración de Supabase (Opcional)

### Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Obtén las credenciales

### Configurar en Chronelia
Crea o edita el archivo `.env`:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

Reinicia el servidor:
```bash
npm run dev
```

---

## 📊 Scripts de Package.json

Los scripts disponibles en `package.json`:

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Ejecuta linter (si está configurado) |

---

## 🎨 Personalización Rápida

### Cambiar puerto del servidor
Edita `vite.config.js`:
```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Cambia 5173 por el puerto que prefieras
  },
})
```

### Cambiar colores principales
Edita `src/index.css`, sección `:root`:
```css
--primary: 262 83% 58%; /* Cambia estos valores HSL */
```

### Cambiar nombre de la app
1. `index.html`: Cambia el `<title>`
2. `package.json`: Cambia el `"name"`
3. `src/components/layout/Header.jsx`: Cambia "Chronelia"
4. `src/pages/Login.jsx`: Cambia "Chronelia"

---

## 🚀 Deploy en Producción

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### GitHub Pages
1. Edita `vite.config.js`:
```js
export default defineConfig({
  base: '/nombre-repositorio/',
  // ... resto de config
})
```
2. Build: `npm run build`
3. Sube la carpeta `dist/` a GitHub Pages

---

## 📝 Comandos Git (si usas control de versiones)

```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Commit
git commit -m "Mensaje descriptivo"

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/chronelia.git

# Push
git push -u origin main
```

---

## 🔧 Herramientas Útiles

### VS Code Extensions (Recomendadas)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

### Extensiones de Navegador
- React Developer Tools
- Redux DevTools (si usas Redux)

---

## 📞 Ayuda Adicional

Si encuentras problemas no listados aquí:

1. **Revisa los logs del error** en la terminal
2. **Busca el error** en Google o Stack Overflow
3. **Verifica las versiones** de Node.js y npm
4. **Reinstala dependencias** (suele resolver el 80% de problemas)
5. **Lee la documentación** oficial de [Vite](https://vitejs.dev) o [React](https://react.dev)

---

**¡Feliz desarrollo! 🎉**











