export const dateFormat = (string) => {
  const tz = 3
  const date = new Date(string)
  date.setHours( date.getHours() + tz );
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return `${("0"+date.getDate()).slice(-2)}/${date.getMonth()+1}/${date.getFullYear()}`
  } else {
    return '-'
  }
}

export const dateField = () => {
  const date = new Date( )
  return `${date.getFullYear()}-${date.getMonth()+1}-${("0"+date.getDate()).slice(-2)}`
}
