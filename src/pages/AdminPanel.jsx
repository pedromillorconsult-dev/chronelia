import { motion } from 'framer-motion'
import {
  Users,
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import useStore from '@/store/useStore'
import { formatTime } from '@/lib/utils'

export default function AdminPanel() {
  const { activeReservations, reservationHistory, workers } = useStore()

  // Estadísticas en tiempo real
  const today = new Date().toDateString()
  const todayReservations = reservationHistory.filter(
    (res) => new Date(res.endTime).toDateString() === today
  )

  const activeWorkers = workers.filter((w) => w.active).length
  const totalWorkers = workers.length
  const totalActiveReservations = activeReservations.length
  const urgentReservations = activeReservations.filter(
    (res) => res.remainingTime <= 300 && res.remainingTime > 0
  ).length

  // Reservas por trabajador
  const reservationsByWorker = activeReservations.reduce((acc, res) => {
    acc[res.worker] = (acc[res.worker] || 0) + 1
    return acc
  }, {})

  // Estadísticas del día
  const todayCompleted = todayReservations.length
  const totalTimeToday = todayReservations.reduce(
    (acc, res) => acc + res.actualDuration,
    0
  )
  const avgDuration = todayCompleted > 0 ? totalTimeToday / todayCompleted : 0

  const stats = [
    {
      title: 'Trabajadores Activos',
      value: `${activeWorkers}/${totalWorkers}`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+2 esta semana',
    },
    {
      title: 'Reservas Activas',
      value: totalActiveReservations,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: 'En tiempo real',
    },
    {
      title: 'Reservas Urgentes',
      value: urgentReservations,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '< 5 minutos',
    },
    {
      title: 'Completadas Hoy',
      value: todayCompleted,
      icon: CheckCircle2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: `${Math.floor(avgDuration / 60)} min promedio`,
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto px-3 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Control y monitoreo en tiempo real
          </p>
        </div>
        <Badge variant="default" className="hidden sm:inline-flex">
          <Activity className="h-3 w-3 mr-1" />
          En vivo
        </Badge>
      </div>

      {/* Estadísticas principales */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 space-y-0">
                <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mb-2`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <CardTitle className="text-sm md:text-base">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actividad en tiempo real */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Reservas activas por trabajador */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Reservas por Trabajador</CardTitle>
            <CardDescription>Distribución actual de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(reservationsByWorker).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay reservas activas</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(reservationsByWorker).map(([worker, count]) => (
                  <div
                    key={worker}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {worker.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm md:text-base">{worker}</p>
                        <p className="text-xs text-muted-foreground">
                          {count} {count === 1 ? 'reserva' : 'reservas'}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs md:text-sm">
                      {count}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Estado de trabajadores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Estado de Trabajadores</CardTitle>
            <CardDescription>Personal disponible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workers.slice(0, 5).map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm">
                        {worker.name.charAt(0)}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          worker.active ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">{worker.name}</p>
                      <p className="text-xs text-muted-foreground">{worker.email}</p>
                    </div>
                  </div>
                  <Badge variant={worker.active ? 'success' : 'secondary'} className="text-xs">
                    {worker.active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reservas activas en detalle */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Reservas Activas en Tiempo Real</CardTitle>
          <CardDescription>Monitoreo de todos los clientes actuales</CardDescription>
        </CardHeader>
        <CardContent>
          {activeReservations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No hay reservas activas en este momento</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeReservations.map((res) => (
                <div
                  key={res.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 rounded-lg border hover:bg-muted/30 transition-colors gap-2"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-sm md:text-base">{res.clientName}</p>
                      {res.remainingTime <= 300 && res.remainingTime > 0 && (
                        <Badge variant="warning" className="text-xs">Urgente</Badge>
                      )}
                      {res.remainingTime === 0 && (
                        <Badge variant="destructive" className="text-xs">Expirado</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-muted-foreground">
                      <span>👤 {res.worker}</span>
                      <span>📧 {res.clientEmail}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <div className="text-right">
                      <p
                        className={`text-xl md:text-2xl font-bold ${
                          res.remainingTime <= 300
                            ? 'text-red-600'
                            : res.remainingTime <= 600
                            ? 'text-orange-500'
                            : 'text-green-600'
                        }`}
                      >
                        {formatTime(res.remainingTime)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        de {Math.floor(res.totalDuration / 60)} min
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rendimiento del día */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Eficiencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tasa de completado</span>
                <span className="font-bold text-green-600">
                  {activeReservations.length + todayCompleted > 0
                    ? Math.round(
                        (todayCompleted /
                          (activeReservations.length + todayCompleted)) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Promedio de duración</span>
                <span className="font-bold">{Math.floor(avgDuration / 60)} min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Tiempo Total Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-purple-600">
              {Math.floor(totalTimeToday / 3600)}h {Math.floor((totalTimeToday % 3600) / 60)}m
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              En {todayCompleted} reservas completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Tendencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl md:text-3xl font-bold text-green-600">+{todayCompleted}</p>
                <p className="text-xs md:text-sm text-muted-foreground">vs. ayer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}












