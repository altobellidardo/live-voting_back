const options: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

export function formatDate (date: Date): string {
  const argentinaDateFormat = new Intl.DateTimeFormat('es-AR', options)
  const formattedDate = argentinaDateFormat.format(date)

  return formattedDate
}
