/** Os links em profile.ts estão guardados sem protocolo (ex.: github.com/...). */
export function toHref(value: string) {
  return /^https?:\/\//.test(value) ? value : `https://${value}`
}

export function stripProtocol(value: string) {
  return value.replace(/^https?:\/\//, '')
}
