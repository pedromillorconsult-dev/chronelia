import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, User, Mail, Plus, CheckCircle, AlertCircle, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { formatTime, getTimeColor, getProgressColor } from '@/lib/utils'
import useStore from '@/store/useStore'
import { toast } from 'sonner'
import { notifyReservationEnding, notifyReservationFinished } from '@/lib/notifications'

export default function ReservationCard({ reservation }) {
  const [timeLeft, setTimeLeft] = useState(reservation.remainingTime)
  const { updateReservationTime, markAsNotified, extendReservation, finishReservation } = useStore()

  useEffect(() => {
    setTimeLeft(reservation.remainingTime)
  }, [reservation.remainingTime])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        const newTime = timeLeft - 1
        setTimeLeft(newTime)
        updateReservationTime(reservation.id, newTime)

        // Notificación cuando quedan 5 minutos
        if (newTime === 300 && !reservation.notified) {
          markAsNotified(reservation.id)
          toast.warning(`⏰ ${reservation.clientName}`, {
            description: 'Quedan 5 minutos para finalizar la reserva',
            duration: 10000,
          })
          
          // Notificación nativa con sonido personalizado
          notifyReservationEnding(reservation.clientName)
        }

        // Tiempo agotado
        if (newTime === 0) {
          toast.error(`⏱️ ${reservation.clientName}`, {
            description: 'El tiempo de reserva ha finalizado',
            duration: 10000,
          })
          
          // Notificación nativa con sonido personalizado
          notifyReservationFinished(reservation.clientName)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, reservation, updateReservationTime, markAsNotified])

  const handleExtend = (minutes) => {
    extendReservation(reservation.id, minutes)
    toast.success('Tiempo extendido', {
      description: `Se agregaron ${minutes} minutos adicionales`,
    })
  }

  const handleFinish = () => {
    finishReservation(reservation.id)
    toast.success('Reserva finalizada', {
      description: `${reservation.clientName} ha sido marcado como completado`,
    })
  }

  const progress = (timeLeft / reservation.totalDuration) * 100
  const progressColor = getProgressColor(timeLeft, reservation.totalDuration)
  const timeColor = getTimeColor(timeLeft, reservation.totalDuration)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <Card className="overflow-hidden">
        <div className={`h-2 ${progressColor}`} />
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-base md:text-lg font-semibold truncate">{reservation.clientName}</h3>
                {timeLeft <= 300 && timeLeft > 0 && (
                  <Badge variant="warning">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Urgente
                  </Badge>
                )}
                {timeLeft === 0 && (
                  <Badge variant="destructive">
                    Finalizado
                  </Badge>
                )}
              </div>
              <div className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                  <span className="truncate">{reservation.clientEmail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                  <span className="truncate">{reservation.worker}</span>
                </div>
                {reservation.groupSize && reservation.groupSize > 1 && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="font-medium">{reservation.groupSize} personas</span>
                  </div>
                )}
              </div>
            </div>
            <div className={`text-2xl md:text-3xl font-bold ${timeColor} self-end md:self-start`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <Progress value={progress} indicatorClassName={progressColor} className="mb-3 md:mb-4" />

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExtend(15)}
              disabled={timeLeft === 0}
              className="flex-1 text-xs md:text-sm"
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              +15
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExtend(30)}
              disabled={timeLeft === 0}
              className="flex-1 text-xs md:text-sm"
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              +30
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleFinish}
              className="flex-1 text-xs md:text-sm"
            >
              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden sm:inline">Finalizar</span>
              <span className="sm:hidden">Fin</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

