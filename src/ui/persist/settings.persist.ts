import { Settings } from '../../shared/types'

export const defaultSettings: Settings = {
  delimiter: ',',
  attempts: 5,
  sleepBetweenWalletFrom: 30,
  sleepBetweenWalletTo: 60,
  sleepBetweenAttemptFrom: 5,
  sleepBetweenAttemptTo: 10,
  mixWallets: true,
}

const cache: { value?: Settings } = {}

export function updateSettings(update: Partial<Settings>) {
  cache.value = { ...getSettings(), ...update }
  localStorage.setItem('settings', JSON.stringify(cache.value))
}

export function getSettings(): Settings {
  if (cache.value === undefined) {
    const raw = localStorage.getItem('settings')
    cache.value = raw ? JSON.parse(raw) : defaultSettings
  }
  return cache.value
}
