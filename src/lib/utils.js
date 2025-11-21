import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

export function getTimeColor(remainingSeconds, totalSeconds) {
  const percentage = (remainingSeconds / totalSeconds) * 100
  if (percentage <= 17) return 'text-red-600' // 5 minutos o menos en una reserva de 30 min
  if (percentage <= 33) return 'text-orange-500'
  return 'text-green-600'
}

export function getProgressColor(remainingSeconds, totalSeconds) {
  const percentage = (remainingSeconds / totalSeconds) * 100
  if (percentage <= 17) return 'bg-red-500'
  if (percentage <= 33) return 'bg-orange-500'
  return 'bg-green-500'
}












