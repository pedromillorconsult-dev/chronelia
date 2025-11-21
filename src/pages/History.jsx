import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import useStore from '@/store/useStore'
import { formatTime } from '@/lib/utils'

export default function History() {
  const { reservationHistory } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('all')

  const filteredHistory = reservationHistory.filter((res) => {
    const matchesSearch =
      res.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const resDate = new Date(res.endTime).toDateString()
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

    let matchesDate = true
    if (filterDate === 'today') matchesDate = resDate === today
    if (filterDate === 'yesterday') matchesDate = resDate === yesterday
    if (filterDate === 'week') {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      matchesDate = new Date(res.endTime).getTime() >= weekAgo
    }

    return matchesSearch && matchesDate
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Historial de Reservas</h1>
        <p className="text-muted-foreground">
          Consulta el registro completo de reservas finalizadas
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterDate('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterDate === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterDate('today')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterDate === 'today'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Hoy
              </button>
              <button
                onClick={() => setFilterDate('yesterday')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterDate === 'yesterday'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Ayer
              </button>
              <button
                onClick={() => setFilterDate('week')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterDate === 'week'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Última semana
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de reservas */}
      {filteredHistory.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No hay reservas</CardTitle>
            <CardDescription>
              {searchTerm || filterDate !== 'all'
                ? 'No se encontraron reservas con los filtros aplicados'
                : 'Aún no hay reservas finalizadas en el historial'}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((reservation, index) => (
            <motion.div
              key={reservation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          {reservation.clientName}
                        </h3>
                        <Badge variant="success">Completado</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{reservation.clientEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{reservation.worker}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(reservation.endTime).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(reservation.startTime).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}{' '}
                            -{' '}
                            {new Date(reservation.endTime).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-1">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Duración</p>
                        <p className="text-lg font-semibold">
                          {Math.floor(reservation.actualDuration / 60)} min
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Reservado</p>
                        <p className="text-lg font-semibold">
                          {Math.floor(reservation.totalDuration / 60)} min
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Resumen */}
      {filteredHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {filteredHistory.length}
                </p>
                <p className="text-sm text-muted-foreground">Total de reservas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {Math.floor(
                    filteredHistory.reduce((acc, res) => acc + res.actualDuration, 0) /
                      60
                  )}{' '}
                  min
                </p>
                <p className="text-sm text-muted-foreground">Tiempo total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {filteredHistory.length > 0
                    ? Math.floor(
                        filteredHistory.reduce((acc, res) => acc + res.actualDuration, 0) /
                          filteredHistory.length /
                          60
                      )
                    : 0}{' '}
                  min
                </p>
                <p className="text-sm text-muted-foreground">Promedio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {Math.max(
                    ...filteredHistory.map((res) => Math.floor(res.actualDuration / 60)),
                    0
                  )}{' '}
                  min
                </p>
                <p className="text-sm text-muted-foreground">Máximo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}












