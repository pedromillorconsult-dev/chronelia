import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import useStore from '@/store/useStore'

export default function Layout() {
  const { sidebarOpen, user } = useStore()
  const isAdmin = user?.user_metadata?.role === 'admin'
  const isWorker = !isAdmin

  return (
    <div className="min-h-screen">
      <Header />
      {/* Sidebar: Admin siempre, Trabajador solo en desktop */}
      {(isAdmin || isWorker) && (
        <div className={isWorker ? 'hidden md:block' : ''}>
          <Sidebar />
        </div>
      )}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-0'
        } mt-16 p-3 md:p-6 ${isWorker ? 'pb-24 md:pb-6' : ''}`}
      >
        <Outlet />
      </main>
      {/* Bottom Nav: Solo trabajadores en móvil */}
      {isWorker && <BottomNav />}
    </div>
  )
}

