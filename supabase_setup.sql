-- SCRIPT DE CONFIGURACIÓN PARA CHRONELIA EN SUPABASE
-- Copia y pega este script completo en el SQL Editor de Supabase

-- CREAR EXTENSIÓN PARA UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLA DE USUARIOS (Workers y Admins)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'worker')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLA DE CLIENTES
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLA DE RESERVAS
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  qr_code TEXT,
  total_duration INTEGER NOT NULL,
  actual_duration INTEGER,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')),
  extensions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLA DE ESTADÍSTICAS DIARIAS
CREATE TABLE IF NOT EXISTS daily_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  total_reservations INTEGER DEFAULT 0,
  completed_reservations INTEGER DEFAULT 0,
  cancelled_reservations INTEGER DEFAULT 0,
  total_time INTEGER DEFAULT 0,
  average_duration INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLA DE RECOMENDACIONES IA
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL,
  data JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- ÍNDICES PARA MEJORAR RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_start_time ON reservations(start_time);
CREATE INDEX IF NOT EXISTS idx_reservations_worker_id ON reservations(worker_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- TRIGGERS PARA ACTUALIZAR updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_daily_stats_updated_at ON daily_stats;
CREATE TRIGGER update_daily_stats_updated_at BEFORE UPDATE ON daily_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- INSERTAR USUARIOS DE PRUEBA
INSERT INTO users (email, full_name, role, active) VALUES
  ('admin@chronelia.com', 'Administrador', 'admin', true),
  ('trabajador@chronelia.com', 'Juan Trabajador', 'worker', true)
ON CONFLICT (email) DO NOTHING;

-- HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD (permitir acceso público para desarrollo)
-- NOTA: En producción, estas políticas deben ser más restrictivas

-- Limpiar políticas existentes
DROP POLICY IF EXISTS "Allow public read access" ON users;
DROP POLICY IF EXISTS "Allow public insert" ON users;
DROP POLICY IF EXISTS "Allow public update" ON users;
DROP POLICY IF EXISTS "Allow public delete" ON users;

DROP POLICY IF EXISTS "Allow public read access" ON customers;
DROP POLICY IF EXISTS "Allow public insert" ON customers;
DROP POLICY IF EXISTS "Allow public update" ON customers;
DROP POLICY IF EXISTS "Allow public delete" ON customers;

DROP POLICY IF EXISTS "Allow public read access" ON reservations;
DROP POLICY IF EXISTS "Allow public insert" ON reservations;
DROP POLICY IF EXISTS "Allow public update" ON reservations;
DROP POLICY IF EXISTS "Allow public delete" ON reservations;

DROP POLICY IF EXISTS "Allow public read access" ON daily_stats;
DROP POLICY IF EXISTS "Allow public insert" ON daily_stats;
DROP POLICY IF EXISTS "Allow public update" ON daily_stats;
DROP POLICY IF EXISTS "Allow public delete" ON daily_stats;

DROP POLICY IF EXISTS "Allow public read access" ON ai_insights;
DROP POLICY IF EXISTS "Allow public insert" ON ai_insights;
DROP POLICY IF EXISTS "Allow public update" ON ai_insights;
DROP POLICY IF EXISTS "Allow public delete" ON ai_insights;

-- Crear políticas nuevas
CREATE POLICY "Allow public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON users FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON customers FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON customers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON customers FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON reservations FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON reservations FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON reservations FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON daily_stats FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON daily_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON daily_stats FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON daily_stats FOR DELETE USING (true);

CREATE POLICY "Allow public read access" ON ai_insights FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON ai_insights FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON ai_insights FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON ai_insights FOR DELETE USING (true);


