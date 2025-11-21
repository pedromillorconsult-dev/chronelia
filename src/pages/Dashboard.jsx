import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Clock, Activity, MessageCircle, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import ReservationCard from '@/components/ReservationCard'
import RecommendationCards from '@/components/RecommendationCards'
import AIChat from '@/components/AIChat'
import useStore from '@/store/useStore'
import { initNotifications, createNotificationChannels } from '@/lib/notifications'

export default function Dashboard() {
  const { activeReservations, user } = useStore()
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  const isAdmin = user?.user_metadata?.role === 'admin'

  useEffect(() => {
    // Inicializar notificaciones con sonido personalizado
    const setupNotifications = async () => {
      await initNotifications()
      await createNotificationChannels()
    }
    setupNotifications()
  }, [])

  const activeCount = activeReservations.length
  const urgentCount = activeReservations.filter(
    (res) => res.remainingTime <= 300 && res.remainingTime > 0
  ).length
  const totalTime = activeReservations.reduce(
    (acc, res) => acc + res.remainingTime,
    0
  )

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto px-3 md:px-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Gestiona las reservas activas en tiempo real
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{activeCount}</div>
            <p className="text-xs text-muted-foreground">
              En el local
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Urgentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-orange-500">{urgentCount}</div>
            <p className="text-xs text-muted-foreground">
              &lt; 5 minutos
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Tiempo Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">
              {Math.floor(totalTime / 60)} min
            </div>
            <p className="text-xs text-muted-foreground">
              Acumulado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recomendaciones IA */}
      <RecommendationCards />

      {/* Lista de reservas activas */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Reservas Activas</h2>
        {activeReservations.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg">No hay reservas activas</CardTitle>
              <CardDescription className="text-sm">
                Escanea un código QR para comenzar una nueva reserva
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {activeReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Panel inferior deslizable - Chat IA (solo admin) */}
      {isAdmin && (
        <>
          {/* Botón inferior para abrir chat */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
          >
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full py-4 flex items-center justify-center gap-2 text-white font-medium hover:bg-black/10 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Consultar Asistente IA</span>
              <ChevronUp className="h-5 w-5 animate-pulse" />
            </button>
          </motion.div>

          {/* Chat IA deslizable */}
          <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
      )}
    </div>
  )
}

