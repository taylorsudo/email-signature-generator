import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ensureHttpsUrl = (url: string): string => {
  const trimmed = url?.trim() ?? ''
  if (!trimmed) {
    return ''
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export const stripUrlProtocol = (url: string): string => {
  return (url ?? '').trim().replace(/^https?:\/\//i, '')
}
