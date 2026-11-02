import type { TripPlan } from '@/types'

export interface SavedTripPlan {
  id: string
  savedAt: string
  plan: TripPlan
}

const STORAGE_KEY = 'trippilot.saved-plans.v1'
const LEGACY_STORAGE_KEY = 'wayfarer.saved-plans.v1'

export function listSavedPlans(): SavedTripPlan[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function saveTripPlan(plan: TripPlan): SavedTripPlan[] {
  const current = listSavedPlans()
  const id = `${plan.city}-${plan.start_date}-${plan.end_date}`
  const saved = { id, savedAt: new Date().toISOString(), plan }
  const next = [saved, ...current.filter(item => item.id !== id)].slice(0, 12)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function deleteTripPlan(id: string): SavedTripPlan[] {
  const next = listSavedPlans().filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function importTripPlan(raw: string): TripPlan {
  const value = JSON.parse(raw) as TripPlan
  if (!value?.city || !Array.isArray(value.days) || !value.start_date || !value.end_date) {
    throw new Error('文件不是有效的旅行方案')
  }
  return value
}
