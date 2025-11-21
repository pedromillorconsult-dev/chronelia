import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Filter, TrendingUp, AlertCircle, Lightbulb, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { generateRecommendations, getRecommendationColor, getPriorityBadge } from '@/lib/aiRecommendations'
import useStore from '@/store/useStore'
import { useNavigate } from 'react-router-dom'

export default function Recommendations() {
  const store = useStore()
  const navigate = useNavigate()
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  // Generar recomendaciones
  const allRecommendations = generateRecommendations(store)

  // Aplicar filtros
  const filteredRecommendations = allRecommendations.filter(rec => {
    const categoryMatch = filterCategory === 'all' || rec.category === filterCategory
    const priorityMatch = filterPriority === 'all' || rec.priority === filterPriority
    return categoryMatch && priorityMatch
  })

  // Obtener categorías únicas
  const categories = ['all', ...new Set(allRecommendations.map(r => r.category))]
  const priorities = ['all', 'critical', 'high', 'medium', 'low']

  // Estadísticas de recomendaciones
  const stats = {
    total: allRecommendations.length,
    critical: allRecommendations.filter(r => r.priority === 'critical').length,
    high: allRecommendations.filter(r => r.priority === 'high').length,
    alerts: allRecommendations.filter(r => r.type === 'alert').length,
    insights: allRecommendations.filter(r => r.type === 'insight').length,
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

  const getCategoryIcon = (category) => {
    const icons = {
      demanda: '📊',
      capacidad: '👥',
      eficiencia: '⚡',
      rendimiento: '🎯',
      personal: '👔',
      clientes: '💎',
      urgente: '🔔',
      predicción: '🔮',
      marketing: '📢',
      horario: '🕐',
      mejora: '📈'
    }
    return icons[category] || '💡'
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <h1 className="text-3xl font-bold tracking-tight">Recomendaciones IA</h1>
          </div>
          <p className="text-muted-foreground">
            Insights inteligentes generados automáticamente para optimizar tu negocio
          </p>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Recomendaciones activas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Críticas</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.critical}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención inmediata
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.alerts}</div>
            <p className="text-xs text-muted-foreground">
              Situaciones a vigilar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insights</CardTitle>
            <Lightbulb className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{stats.insights}</div>
            <p className="text-xs text-muted-foreground">
              Oportunidades detectadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle>Filtros</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Categoría</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className="text-xs"
                >
                  {category === 'all' ? '🔍 Todas' : `${getCategoryIcon(category)} ${category}`}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Prioridad</label>
            <div className="flex flex-wrap gap-2">
              {priorities.map(priority => {
                const badge = priority === 'all' 
                  ? { label: 'Todas', class: 'bg-gray-500' }
                  : getPriorityBadge(priority)
                return (
                  <Button
                    key={priority}
                    variant={filterPriority === priority ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterPriority(priority)}
                    className="text-xs"
                  >
                    <Badge variant="secondary" className={`mr-1 ${badge.class} text-xs`}>
                      {badge.label}
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de recomendaciones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {filteredRecommendations.length} Recomendación(es)
          </h2>
          {(filterCategory !== 'all' || filterPriority !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilterCategory('all')
                setFilterPriority('all')
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>

        {filteredRecommendations.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                No hay recomendaciones para estos filtros
              </CardTitle>
              <CardDescription>
                Intenta ajustar los filtros o vuelve más tarde para ver nuevas recomendaciones.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecommendations.map((recommendation, index) => {
              const priorityBadge = getPriorityBadge(recommendation.priority)
              
              return (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className={`border-l-4 ${getRecommendationColor(recommendation.type)} h-full flex flex-col`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{recommendation.icon}</span>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg mb-2">
                            {recommendation.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${priorityBadge.class}`}
                            >
                              {priorityBadge.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                              {getCategoryIcon(recommendation.category)}
                              {recommendation.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-1 flex flex-col">
                      <CardDescription className="text-sm">
                        {recommendation.description}
                      </CardDescription>

                      {recommendation.insights && recommendation.insights.length > 0 && (
                        <div className="bg-background/50 rounded-lg p-3 space-y-2 flex-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            📊 Datos clave:
                          </p>
                          {recommendation.insights.map((insight, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              <span className="text-primary font-medium">•</span>
                              <span className="text-muted-foreground flex-1">{insight}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {recommendation.action && (
                        <Button
                          size="sm"
                          onClick={() => handleAction(recommendation.actionType)}
                          className="w-full mt-auto"
                        >
                          {recommendation.action}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Info adicional */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <CardTitle>¿Cómo funciona la IA?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Análisis en tiempo real:</strong> El sistema analiza constantemente 
            tus reservas activas, historial, trabajadores y patrones de comportamiento.
          </p>
          <p>
            <strong className="text-foreground">Predicciones inteligentes:</strong> Utiliza machine learning 
            para predecir demanda futura y detectar oportunidades de negocio.
          </p>
          <p>
            <strong className="text-foreground">Recomendaciones personalizadas:</strong> Las sugerencias se adaptan 
            a tu negocio específico y mejoran con el tiempo a medida que se recopilan más datos.
          </p>
          <p className="pt-2 text-xs">
            💡 <strong>Tip:</strong> Revisa estas recomendaciones diariamente para optimizar tu operación 
            y maximizar ingresos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}



