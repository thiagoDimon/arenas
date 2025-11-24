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

function changeLanguage (language) {
  i18n.global.locale.value = language
  localStorage.setItem('language', language)
  window.location.reload()
}

function isValidUserName (name) {
  if (!name || typeof name !== 'string') {
    return false
  }

  const trimmedName = name.trim()
  if (trimmedName === '') {
    return false
  }

  const lowerName = trimmedName.toLowerCase()
  const invalidPatterns = ['null', 'null null', 'nullnull']

  if (invalidPatterns.includes(lowerName)) {
    return false
  }

  const withoutNull = trimmedName.replace(/null/gi, '').trim()
  if (withoutNull === '') {
    return false
  }

  return true
}

export { changeLanguage, getFormattedDate, isValidUserName }
