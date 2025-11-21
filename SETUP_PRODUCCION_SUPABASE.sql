-- ============================================
-- CHRONELIA - SETUP DE PRODUCCIÓN
-- ============================================
-- Este script prepara la base de datos para producción
-- con el usuario admin y sin usuarios de prueba

-- 1. LIMPIAR TODOS LOS DATOS EXISTENTES
-- ============================================
-- Primero eliminamos TODOS los datos para empezar desde cero
DELETE FROM reservations;
DELETE FROM daily_stats;
DELETE FROM ai_insights;
DELETE FROM users; -- Eliminar todos los usuarios para evitar conflictos

-- 2. ACTUALIZAR ESTRUCTURA DE LA TABLA USERS (si es necesario)
-- ============================================
-- Agregar columna username si no existe (sin restricciones primero)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='users' AND column_name='username') THEN
        ALTER TABLE users ADD COLUMN username TEXT;
    END IF;
END $$;

-- Agregar columna password_hash si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='users' AND column_name='password_hash') THEN
        ALTER TABLE users ADD COLUMN password_hash TEXT;
    END IF;
END $$;

-- Crear índice único para username (después de poblar datos)
-- Se creará después de insertar el admin

-- 3. CREAR USUARIO ADMINISTRADOR
-- ============================================
INSERT INTO users (
  id,
  username,
  email,
  password_hash,
  full_name,
  role,
  active,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001', -- UUID fijo para admin
  'admin',
  'admin@chronelia.com',
  'chronelia2025', -- CAMBIAR ESTO por hash bcrypt en producción real
  'Administrador del Sistema',
  'admin',
  true,
  NOW(),
  NOW()
);

-- Ahora crear el índice único para username
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- 4. VERIFICAR CONFIGURACIÓN
-- ============================================
SELECT 
  'Usuario Administrador Creado' as status,
  username,
  email,
  full_name,
  role,
  active,
  created_at
FROM users 
WHERE username = 'admin';

-- 5. RESETEAR SECUENCIAS (si es necesario)
-- ============================================
-- Las tablas usan UUID, no hay secuencias que resetear

-- ============================================
-- INSTRUCCIONES FINALES
-- ============================================
-- 1. Ejecuta este script en el SQL Editor de Supabase
-- 2. Verifica que aparezca el usuario admin
-- 3. En la app, inicia sesión con:
--    Usuario: admin
--    Contraseña: chronelia2025
-- 4. Desde el panel admin, crea los trabajadores necesarios
-- ============================================

-- NOTA DE SEGURIDAD:
-- En un sistema real de producción, las contraseñas deben:
-- - Estar hasheadas con bcrypt, argon2 o similar
-- - Nunca almacenarse en texto plano
-- - Ser validadas con funciones de hash en el backend
-- Para este sistema simplificado, usamos comparación directa
-- pero es ALTAMENTE RECOMENDABLE implementar hashing real
-- ============================================

