import { create } from 'zustand'
import { syncReservation, syncWorker, removeWorkerFromCloud, syncDailyStats } from '@/lib/syncHelpers'

// Generar UUID v4 válido
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const useStore = create((set, get) => ({
  // Auth state
  user: null,
  setUser: (user) => set({ user }),
  
  // Workers management
  workers: [
    {
      id: '1',
      name: 'Juan Trabajador',
      email: 'trabajador@chronelia.com',
      role: 'worker',
      active: true,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'María Empleada',
      email: 'maria@chronelia.com',
      role: 'worker',
      active: true,
      createdAt: new Date(),
    },
  ],
  
  addWorker: async (worker) => {
    const newWorker = {
      ...worker,
      id: generateUUID(),
      role: 'worker',
      active: true,
      createdAt: new Date(),
    }
    
    // Actualizar estado local
    set((state) => ({
      workers: [...state.workers, newWorker]
    }))
    
    // Sincronizar con Supabase
    await syncWorker(newWorker)
  },
  
  removeWorker: async (id) => {
    // Actualizar estado local
    set((state) => ({
      workers: state.workers.filter((w) => w.id !== id)
    }))
    
    // Eliminar de Supabase
    await removeWorkerFromCloud(id)
  },
  
  toggleWorkerStatus: async (id) => {
    const worker = get().workers.find((w) => w.id === id)
    if (worker) {
      const updatedWorker = { ...worker, active: !worker.active }
      
      // Actualizar estado local
      set((state) => ({
        workers: state.workers.map((w) =>
          w.id === id ? updatedWorker : w
        )
      }))
      
      // Sincronizar con Supabase
      await syncWorker(updatedWorker)
    }
  },
  
  // Sidebar state
  sidebarOpen: typeof window !== 'undefined' && window.innerWidth >= 768 ? true : false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  // Reservas activas
  activeReservations: [
    {
      id: '1',
      clientName: 'Ana Pérez',
      clientEmail: 'ana.perez@email.com',
      qrCode: 'QR123456',
      totalDuration: 1800, // 30 minutos en segundos
      remainingTime: 600, // 10 minutos restantes
      startTime: new Date(Date.now() - 20 * 60 * 1000), // Empezó hace 20 min
      worker: 'Trabajador Demo',
      groupSize: 2,
      status: 'active',
      notified: false,
    }
  ],
  
  // Historial de reservas
  reservationHistory: [],
  
  // Estadísticas del día
  todayStats: {
    completedReservations: 0,
    averageDuration: 0,
    totalTime: 0,
  },
  
  // Agregar reserva desde QR
  addReservation: async (reservationData) => {
    const newReservation = {
      ...reservationData,
      id: generateUUID(),
      startTime: new Date(),
      remainingTime: reservationData.totalDuration,
      status: 'active',
      notified: false,
    }
    
    // Actualizar estado local
    set((state) => ({
      activeReservations: [...state.activeReservations, newReservation]
    }))
    
    // Sincronizar con Supabase
    await syncReservation(newReservation)
  },
  
  // Actualizar tiempo restante
  updateReservationTime: (id, remainingTime) => {
    set((state) => ({
      activeReservations: state.activeReservations.map((res) =>
        res.id === id ? { ...res, remainingTime } : res
      )
    }))
  },
  
  // Marcar como notificada (5 minutos)
  markAsNotified: (id) => {
    set((state) => ({
      activeReservations: state.activeReservations.map((res) =>
        res.id === id ? { ...res, notified: true } : res
      )
    }))
  },
  
  // Extender reserva
  extendReservation: async (id, additionalMinutes) => {
    const reservation = get().activeReservations.find((res) => res.id === id)
    if (reservation) {
      const additionalSeconds = additionalMinutes * 60
      const updatedReservation = {
        ...reservation,
        totalDuration: reservation.totalDuration + additionalSeconds,
        remainingTime: reservation.remainingTime + additionalSeconds,
        notified: false,
        extensions: (reservation.extensions || 0) + 1
      }
      
      // Actualizar estado local
      set((state) => ({
        activeReservations: state.activeReservations.map((res) =>
          res.id === id ? updatedReservation : res
        )
      }))
      
      // Sincronizar con Supabase
      await syncReservation(updatedReservation)
    }
  },
  
  // Finalizar reserva
  finishReservation: async (id) => {
    const reservation = get().activeReservations.find((res) => res.id === id)
    if (reservation) {
      const finishedReservation = {
        ...reservation,
        status: 'completed',
        endTime: new Date(),
        actualDuration: Math.floor((new Date() - reservation.startTime) / 1000),
      }
      
      // Actualizar estado local
      set((state) => ({
        activeReservations: state.activeReservations.filter((res) => res.id !== id),
        reservationHistory: [finishedReservation, ...state.reservationHistory],
      }))
      
      // Sincronizar con Supabase
      await syncReservation(finishedReservation)
      
      // Actualizar estadísticas
      get().updateTodayStats()
    }
  },
  
  // Actualizar estadísticas del día
  updateTodayStats: () => {
    const history = get().reservationHistory
    const today = new Date().toDateString()
    const todayReservations = history.filter(
      (res) => new Date(res.endTime).toDateString() === today
    )
    
    if (todayReservations.length > 0) {
      const totalTime = todayReservations.reduce((acc, res) => acc + res.actualDuration, 0)
      const averageDuration = Math.floor(totalTime / todayReservations.length)
      
      set({
        todayStats: {
          completedReservations: todayReservations.length,
          averageDuration,
          totalTime,
        }
      })
    }
  },
}))

export default useStore

