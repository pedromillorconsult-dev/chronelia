# 🎨 Nota sobre el Logo de Chronelia

## Logo Actual

El proyecto incluye un logo SVG generado automáticamente en `public/logo.svg` que representa:
- Un reloj/cronómetro estilizado
- Colores degradados de rosa a morado (#FF2E7E → #6C47FF)
- Diseño minimalista y moderno

Este logo se muestra en:
- ✅ Pantalla de inicio de sesión
- ✅ Encabezado (header) de la aplicación
- ✅ Favicon del navegador
- ✅ Notificaciones del sistema

---

## 🔄 Usar tu Logo Personalizado

Si quieres usar tu propio logo (encontré "Logo Sin texto Degradado.png" en la raíz del proyecto), sigue estos pasos:

### Opción 1: Reemplazar el SVG

1. **Convierte tu PNG a SVG** (opcional pero recomendado):
   - Usa herramientas como [Convertio](https://convertio.co/es/png-svg/)
   - O mantén el formato PNG

2. **Reemplaza el archivo**:
   ```bash
   # Si es SVG:
   cp "Logo Sin texto Degradado.svg" public/logo.svg
   
   # Si es PNG:
   cp "Logo Sin texto Degradado.png" public/logo.png
   ```

3. **Actualiza las referencias** (si usas PNG en lugar de SVG):

   En `index.html`:
   ```html
   <!-- Cambiar esta línea: -->
   <link rel="icon" type="image/svg+xml" href="/logo.svg" />
   
   <!-- Por esta: -->
   <link rel="icon" type="image/png" href="/logo.png" />
   ```

   En `src/components/layout/Header.jsx`:
   ```jsx
   // Cambiar esta línea:
   <img src="/logo.svg" alt="Chronelia" className="h-10 w-10" />
   
   // Por esta:
   <img src="/logo.png" alt="Chronelia" className="h-10 w-10" />
   ```

   En `src/pages/Login.jsx`:
   ```jsx
   // Cambiar esta línea:
   src="/logo.svg"
   
   // Por esta:
   src="/logo.png"
   ```

   En `src/components/ReservationCard.jsx` (línea de notificaciones):
   ```jsx
   // Cambiar esta línea:
   icon: '/logo.svg',
   
   // Por esta:
   icon: '/logo.png',
   ```

### Opción 2: Usar ambos logos

Puedes mantener ambos y cambiar solo en lugares específicos:

1. **Coloca tu logo**:
   ```bash
   cp "Logo Sin texto Degradado.png" public/logo-custom.png
   ```

2. **Actualiza solo donde quieras**:
   - Header: `<img src="/logo-custom.png" ... />`
   - Login: `<img src="/logo-custom.png" ... />`
   - Mantén el SVG para el favicon

---

## 🎯 Tamaños Recomendados

Para mejor visualización:

- **Header**: 40x40px (actual)
- **Login**: 96x96px (actual)
- **Favicon**: 32x32px o 64x64px

Si tu logo es más grande, el navegador lo escalará automáticamente, pero es mejor optimizarlo.

---

## 🛠️ Optimización del Logo

Si tu PNG es muy pesado, puedes optimizarlo:

### Online:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

### Comando (si tienes ImageMagick):
```bash
magick "Logo Sin texto Degradado.png" -resize 200x200 -quality 85 public/logo-optimized.png
```

---

## 📐 Ajustar Tamaño del Logo

Si el logo se ve muy grande o pequeño:

### En el Header (`src/components/layout/Header.jsx`):
```jsx
// Actual:
<img src="/logo.svg" alt="Chronelia" className="h-10 w-10" />

// Más grande (h-12 = 48px):
<img src="/logo.svg" alt="Chronelia" className="h-12 w-12" />

// Más pequeño (h-8 = 32px):
<img src="/logo.svg" alt="Chronelia" className="h-8 w-8" />
```

### En el Login (`src/pages/Login.jsx`):
```jsx
// Actual:
<img src="/logo.svg" className="h-24 w-24" />

// Más grande (h-32 = 128px):
<img src="/logo.svg" className="h-32 w-32" />
```

---

## 🎨 Mantener el Degradado

Si tu logo ya tiene el degradado rosa-morado, ¡perfecto! 
Si no, puedes:

1. Editar el SVG con Inkscape o Figma
2. Aplicar el degradado CSS (solo funciona con SVG inline)
3. Usar el logo como está (recomendado)

---

## ✅ Checklist de Cambio de Logo

- [ ] Copiar nuevo logo a `public/`
- [ ] Actualizar `index.html` (favicon)
- [ ] Actualizar `src/components/layout/Header.jsx`
- [ ] Actualizar `src/pages/Login.jsx`
- [ ] Actualizar `src/components/ReservationCard.jsx` (notificaciones)
- [ ] Probar la aplicación
- [ ] Verificar que se vea bien en móvil

---

**Nota**: Si necesitas ayuda para cambiar el logo, avísame y te guío paso a paso.











