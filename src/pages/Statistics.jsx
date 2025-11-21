import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Activity,
  Timer,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import useStore from '@/store/useStore'
import { formatTime } from '@/lib/utils'

export default function Statistics() {
  const { todayStats, activeReservations, reservationHistory } = useStore()

  const today = new Date().toDateString()
  const todayReservations = reservationHistory.filter(
    (res) => new Date(res.endTime).toDateString() === today
  )

  const totalActiveTime = activeReservations.reduce(
    (acc, res) => acc + (res.totalDuration - res.remainingTime),
    0
  )

  const avgDuration = todayStats.averageDuration || 0
  const completedToday = todayStats.completedReservations || 0
  const totalTimeToday = todayStats.totalTime || 0

  const stats = [
    {
      title: 'Reservas Completadas',
      value: completedToday,
      icon: CheckCircle,
      description: 'Finalizadas hoy',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Clientes Activos',
      value: activeReservations.length,
      icon: Users,
      description: 'En el local ahora',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Duración Promedio',
      value: `${Math.floor(avgDuration / 60)} min`,
      icon: Timer,
      description: 'Por reserva',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Tiempo Total',
      value: `${Math.floor(totalTimeToday / 3600)}h ${Math.floor((totalTimeToday % 3600) / 60)}m`,
      icon: Clock,
      description: 'Acumulado hoy',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas del Día</h1>
        <p className="text-muted-foreground">
          Resumen de actividad y métricas de rendimiento
        </p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actividad actual */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actividad en Tiempo Real</CardTitle>
            <CardDescription>Estado actual de las reservas activas</CardDescription>
          </CardHeader>
          <CardContent>
            {activeReservations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No hay reservas activas en este momento</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeReservations.map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{res.clientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {res.worker}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatTime(res.remainingTime)}
                      </p>
                      <Badge
                        variant={
                          res.remainingTime <= 300
                            ? 'warning'
                            : res.remainingTime <= 0
                            ? 'destructive'
                            : 'success'
                        }
                      >
                        {res.remainingTime <= 0
                          ? 'Finalizado'
                          : res.remainingTime <= 300
                          ? 'Urgente'
                          : 'Activo'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen Diario</CardTitle>
            <CardDescription>Métricas acumuladas del día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tasa de finalización
                    </p>
                    <p className="text-lg font-semibold">
                      {activeReservations.length + completedToday > 0
                        ? Math.round(
                            (completedToday /
                              (activeReservations.length + completedToday)) *
                              100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tiempo activo total
                    </p>
                    <p className="text-lg font-semibold">
                      {formatTime(totalActiveTime)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Reservas totales
                    </p>
                    <p className="text-lg font-semibold">
                      {activeReservations.length + completedToday}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Últimas reservas completadas */}
      {todayReservations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Últimas Reservas Completadas Hoy</CardTitle>
            <CardDescription>
              Historial de reservas finalizadas en el día
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todayReservations.slice(0, 5).map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{res.clientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(res.endTime).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {Math.floor(res.actualDuration / 60)} minutos
                    </p>
                    <Badge variant="success">Completado</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}











