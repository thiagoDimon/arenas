import i18n from '@/plugins/i18n'

function getFormattedDate (date, time) {
  if (!date || !time) {
    return ''
  }

  const dateTimeString = `${date}T${time}`
  const dateObj = new Date(dateTimeString)

  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()

  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')

  const formattedDate = `${day}/${month}/${year}`
  const formattedTime = `${hours}:${minutes}`

  return i18n.global.t('datetime', { date: formattedDate, time: formattedTime })
}

export { getFormattedDate }
