export const formatDate = (date, format = 'short') => {
  const dateObj = new Date(date)
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date'
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
  }
  
  return new Intl.DateTimeFormat('en-US', options[format] || options.short).format(dateObj)
}

export const formatRelativeTime = (date) => {
  const dateObj = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now - dateObj) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

export const formatTime = (date) => {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

export const formatDateTime = (date) => {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

export const isToday = (date) => {
  const dateObj = new Date(date)
  const today = new Date()
  return dateObj.toDateString() === today.toDateString()
}

export const isYesterday = (date) => {
  const dateObj = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return dateObj.toDateString() === yesterday.toDateString()
}

export const addDays = (date, days) => {
  const dateObj = new Date(date)
  dateObj.setDate(dateObj.getDate() + days)
  return dateObj
}

export const subtractDays = (date, days) => {
  const dateObj = new Date(date)
  dateObj.setDate(dateObj.getDate() - days)
  return dateObj
}

export const getDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
