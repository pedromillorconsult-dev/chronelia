import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import useStore from '@/store/useStore'
import { toast } from 'sonner'
import jsQR from 'jsqr'

export default function QRScannerModal({ isOpen, onClose }) {
  const { addReservation, user } = useStore()
  const [scanning, setScanning] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const scanIntervalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setProcessing(false)
      setCameraError(null)
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setScanning(true)
        
        // Iniciar escaneo cuando el video esté listo
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play()
          startScanning()
        }
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error)
      setCameraError(error.message)
      toast.error('Error al acceder a la cámara', {
        description: 'Por favor, permite el acceso a la cámara en tu navegador',
      })
    }
  }

  const stopCamera = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    setScanning(false)
  }

  const startScanning = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    
    if (!canvas || !video) return

    const ctx = canvas.getContext('2d')
    
    scanIntervalRef.current = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA && !processing) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        })
        
        if (code) {
          processQRCode(code.data)
        }
      }
    }, 300)
  }

  const processQRCode = (qrData) => {
    if (processing) return
    
    setProcessing(true)
    
    try {
      const data = JSON.parse(qrData)
      
      if (!data.clientName || !data.duration) {
        throw new Error('Datos incompletos en el QR')
      }

      addReservation({
        clientName: data.clientName,
        clientEmail: data.clientEmail || 'sin-email@ejemplo.com',
        qrCode: data.code || qrData,
        totalDuration: data.duration * 60,
        groupSize: data.groupSize || 1,
        worker: user?.user_metadata?.full_name || user?.email || 'Trabajador',
      })

      toast.success('✅ ¡Reserva activada!', {
        description: `${data.clientName} - ${data.duration} minutos`,
        duration: 4000,
      })

      // Pequeño delay para mostrar el feedback antes de cerrar
      setTimeout(() => {
        stopCamera()
        onClose()
      }, 800)
    } catch (error) {
      toast.error('❌ Código QR inválido', {
        description: 'El código no tiene el formato correcto. Asegúrate de que el QR contenga un JSON válido.',
        duration: 5000,
      })
      setTimeout(() => {
        setProcessing(false)
      }, 2000)
    }
  }

  const handleTestReservation = () => {
    const testData = {
      clientName: 'Cliente Test ' + Math.floor(Math.random() * 100),
      clientEmail: 'test@chronelia.com',
      code: 'TEST' + Date.now(),
      duration: 30,
      groupSize: 2,
    }
    processQRCode(JSON.stringify(testData))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-background rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-pink-500 to-purple-600">
            <h2 className="text-2xl font-bold text-white">Escanear QR</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Scanner */}
          <div className="p-6">
            {cameraError ? (
              <div className="text-center py-12">
                <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">Error al acceder a la cámara</p>
                <p className="text-xs text-muted-foreground">{cameraError}</p>
                <Button 
                  onClick={startCamera}
                  className="mt-4"
                  variant="outline"
                >
                  Reintentar
                </Button>
              </div>
            ) : scanning ? (
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative overflow-hidden rounded-2xl border-4 border-primary shadow-lg aspect-video"
                >
                  {/* Video element */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Canvas oculto para procesar frames */}
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                  />
                  
                  {/* Overlay de escaneo */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-64 h-64">
                      {/* Esquinas del marco */}
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white rounded-br-lg" />
                      
                      {/* Línea de escaneo animada */}
                      <motion.div
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                        animate={{
                          top: ['0%', '100%', '0%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="text-center mt-4">
                  {processing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Apunta la cámara al código QR
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
                <p className="text-muted-foreground">Iniciando cámara...</p>
              </div>
            )}
          </div>

          {/* Footer con botón de prueba */}
          <div className="p-6 border-t bg-muted/30">
            <Button
              onClick={handleTestReservation}
              variant="secondary"
              className="w-full"
              size="lg"
              disabled={processing}
            >
              <Zap className="h-5 w-5 mr-2" />
              Crear Reserva de Prueba (30 min)
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Para probar sin código QR
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
