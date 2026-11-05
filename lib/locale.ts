export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export type Localized<T> = Record<Locale, T>

export function pick<T>(value: Localized<T>, locale: Locale = defaultLocale): T {
  return value[locale] ?? value[defaultLocale]
}
