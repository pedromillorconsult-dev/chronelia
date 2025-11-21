import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UserPlus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Mail,
  Calendar,
  Search,
  Lock,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import useStore from '@/store/useStore'
import { toast } from 'sonner'

export default function Workers() {
  const { workers, addWorker, removeWorker, toggleWorkerStatus } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newWorker, setNewWorker] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const handleAddWorker = (e) => {
    e.preventDefault()
    if (newWorker.name && newWorker.username && newWorker.email && newWorker.password) {
      addWorker(newWorker)
      toast.success('Trabajador agregado', {
        description: `${newWorker.name} ha sido añadido al sistema`,
      })
      setNewWorker({ name: '', username: '', email: '', password: '' })
      setShowAddForm(false)
    }
  }

  const handleRemoveWorker = (id, name) => {
    if (confirm(`¿Estás seguro de eliminar a ${name}?`)) {
      removeWorker(id)
      toast.success('Trabajador eliminado', {
        description: `${name} ha sido eliminado del sistema`,
      })
    }
  }

  const handleToggleStatus = (id, name, currentStatus) => {
    toggleWorkerStatus(id)
    toast.success(
      currentStatus ? 'Trabajador desactivado' : 'Trabajador activado',
      {
        description: `${name} ahora está ${currentStatus ? 'inactivo' : 'activo'}`,
      }
    )
  }

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4 md:space-y-6 max-w-6xl mx-auto px-3 md:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Gestión de Trabajadores</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Administra el equipo de trabajo
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="w-full md:w-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          Agregar Trabajador
        </Button>
      </div>

      {/* Formulario agregar trabajador */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Nuevo Trabajador</CardTitle>
                <CardDescription>Completa la información del nuevo miembro</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddWorker} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre Completo</label>
                      <Input
                        placeholder="Ej: Carlos Ramírez"
                        value={newWorker.name}
                        onChange={(e) =>
                          setNewWorker({ ...newWorker, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre de Usuario</label>
                      <Input
                        type="text"
                        placeholder="carlosr"
                        value={newWorker.username}
                        onChange={(e) =>
                          setNewWorker({ ...newWorker, username: e.target.value.toLowerCase().replace(/\s/g, '') })
                        }
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Sin espacios ni caracteres especiales
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="carlos@chronelia.com"
                      value={newWorker.email}
                      onChange={(e) =>
                        setNewWorker({ ...newWorker, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Contraseña
                    </label>
                    <Input
                      type="password"
                      placeholder="Contraseña para acceso del trabajador"
                      value={newWorker.password}
                      onChange={(e) =>
                        setNewWorker({ ...newWorker, password: e.target.value })
                      }
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Mínimo 6 caracteres. El trabajador usará este email y contraseña para iniciar sesión.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      Guardar Trabajador
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{workers.length}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                {workers.filter((w) => w.active).length}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gray-600">
                {workers.filter((w) => !w.active).length}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Inactivos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de trabajadores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Trabajadores ({filteredWorkers.length})</CardTitle>
          <CardDescription>Lista completa del personal</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredWorkers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No se encontraron trabajadores</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredWorkers.map((worker, index) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 md:p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {worker.name.charAt(0)}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            worker.active ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-sm md:text-base truncate">
                            {worker.name}
                          </p>
                          <Badge
                            variant={worker.active ? 'success' : 'secondary'}
                            className="text-xs flex-shrink-0"
                          >
                            {worker.active ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-xs md:text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{worker.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span>
                              {new Date(worker.createdAt).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end md:self-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleToggleStatus(worker.id, worker.name, worker.active)
                        }
                        className="text-xs md:text-sm"
                      >
                        {worker.active ? (
                          <>
                            <ToggleRight className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Desactivar</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Activar</span>
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveWorker(worker.id, worker.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}








