import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { generateRecommendations, getRecommendationColor, getPriorityBadge } from '@/lib/aiRecommendations'
import useStore from '@/store/useStore'

export default function RecommendationCards() {
  const store = useStore()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })
  const [dismissedIds, setDismissedIds] = useState([])
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  // Solo mostrar recomendaciones a administradores
  const isAdmin = store.user?.user_metadata?.role === 'admin'
  
  if (!isAdmin) {
    return null // No mostrar nada si no es admin
  }

  // Generar recomendaciones y filtrar las descartadas
  const recommendations = generateRecommendations(store)
  
  // Limitar a máximo 5 recomendaciones y excluir descartadas
  const displayedRecommendations = useMemo(() => 
    recommendations.filter(rec => !dismissedIds.includes(rec.id)).slice(0, 5),
    [recommendations.length, dismissedIds.length]
  )

  useEffect(() => {
    console.log('🔄 [DEBUG] useEffect ejecutado. Cantidad de tarjetas:', displayedRecommendations.length)
    
    // Limpiar intervalo anterior si existe
    if (intervalRef.current) {
      console.log('🧹 [DEBUG] Limpiando intervalo anterior')
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Auto-scroll cada 20 segundos SOLO si hay más de 1 tarjeta
    if (displayedRecommendations.length > 1) {
      console.log('✅ [DEBUG] Configurando auto-scroll: 20 segundos por tarjeta')
      console.log('📊 [DEBUG] Total de tarjetas:', displayedRecommendations.length)
      
      intervalRef.current = setInterval(() => {
        console.log('⏭️  [AUTO-SCROLL] Cambiando a siguiente recomendación')
        setCurrentIndex((prev) => {
          const next = prev === displayedRecommendations.length - 1 ? 0 : prev + 1
          console.log(`📍 [AUTO-SCROLL] De ${prev} a ${next}`)
          return next
        })
      }, 20000) // 20 segundos
    } else {
      console.log('⚠️  [DEBUG] Solo hay 1 tarjeta, no se configura auto-scroll')
    }

    return () => {
      if (intervalRef.current) {
        console.log('🧹 [DEBUG] Limpiando intervalo en cleanup')
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [displayedRecommendations.length])

  if (displayedRecommendations.length === 0) {
    return null
  }

  const resetAutoScroll = () => {
    // Pausar auto-scroll cuando el usuario interactúa manualmente
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    // Reiniciar después de 20 segundos
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === displayedRecommendations.length - 1 ? 0 : prev + 1
      )
    }, 20000)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? displayedRecommendations.length - 1 : prev - 1
    )
    resetAutoScroll()
  }

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === displayedRecommendations.length - 1 ? 0 : prev + 1
    )
    resetAutoScroll()
  }

  // Touch handlers para swipe en móvil (horizontal para navegar, vertical para descartar)
  const handleTouchStart = (e) => {
    setTouchStart({ 
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const handleTouchMove = (e) => {
    setTouchEnd({ 
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return
    
    const distanceX = touchStart.x - touchEnd.x
    
    // Solo swipe horizontal: navegar entre recomendaciones
    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }

    setTouchStart({ x: 0, y: 0 })
    setTouchEnd({ x: 0, y: 0 })
  }

  const handleDismiss = () => {
    const currentRec = displayedRecommendations[currentIndex]
    setDismissedIds(prev => [...prev, currentRec.id])
    
    toast.success('Recomendación descartada', {
      description: 'No la volverás a ver en esta sesión',
      duration: 3000,
    })

    // Si había más recomendaciones, mover al siguiente o anterior
    if (displayedRecommendations.length > 1) {
      if (currentIndex >= displayedRecommendations.length - 1) {
        setCurrentIndex(Math.max(0, currentIndex - 1))
      }
    }
    
    resetAutoScroll()
  }

  const handleAction = (actionType) => {
    const routes = {
      dashboard: '/',
      stats: '/stats',
      history: '/history',
      workers: '/workers',
      settings: '/settings',
      promotion: '/settings',
      marketing: '/settings'
    }

    if (routes[actionType]) {
      navigate(routes[actionType])
    }
  }

  const currentRecommendation = displayedRecommendations[currentIndex]
  const priorityBadge = getPriorityBadge(currentRecommendation.priority)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg md:text-xl font-semibold">Recomendaciones IA</h2>
        </div>
        {store.user?.user_metadata?.role === 'admin' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/recommendations')}
            className="text-xs md:text-sm"
          >
            Ver todas
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <div 
        ref={containerRef}
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1.0] // Curva de animación suave
            }}
          >
            <Card className={`border-l-4 ${getRecommendationColor(currentRecommendation.type)} relative`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-2xl">{currentRecommendation.icon}</span>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base md:text-lg line-clamp-1">
                        {currentRecommendation.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${priorityBadge.class}`}
                        >
                          {priorityBadge.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize">
                          {currentRecommendation.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Botón para descartar */}
                  <motion.button
                    onClick={handleDismiss}
                    className="h-8 w-8 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Descartar recomendación"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                  </motion.button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-sm">
                  {currentRecommendation.description}
                </CardDescription>

                {currentRecommendation.insights && currentRecommendation.insights.length > 0 && (
                  <div className="bg-background/50 rounded-lg p-3 space-y-1">
                    {currentRecommendation.insights.slice(0, 3).map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground flex-1">{insight}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 pt-2">
                  {currentRecommendation.action && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        size="sm"
                        onClick={() => handleAction(currentRecommendation.actionType)}
                        className="text-xs"
                      >
                        {currentRecommendation.action}
                      </Button>
                    </motion.div>
                  )}
                  
                  {displayedRecommendations.length > 1 && (
                      <div className="flex items-center gap-2 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                        onClick={handlePrevious}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {displayedRecommendations.map((_, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => {
                              setCurrentIndex(idx)
                              resetAutoScroll()
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentIndex 
                                ? 'w-6 bg-primary' 
                                : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Ir a recomendación ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:scale-110 transition-transform duration-200"
                        onClick={handleNext}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {displayedRecommendations.length > 1 && (
          <div className="text-center mt-2 space-y-1">
            <span className="text-xs text-muted-foreground block">
              {currentIndex + 1} de {displayedRecommendations.length} recomendaciones
            </span>
            <span className="text-xs text-muted-foreground/70 block">
              Desliza ← → para navegar • Toca ✕ para descartar
            </span>
          </div>
        )}
        {displayedRecommendations.length === 1 && (
          <div className="text-center mt-2">
            <span className="text-xs text-muted-foreground/70 block">
              Toca ✕ para descartar
            </span>
          </div>
        )}
      </div>
    </div>
  )
}


