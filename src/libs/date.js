export const dateFormat = (string) => {
  const date = new Date(string)
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return `${("0"+date.getDate()).slice(-2)}/${date.getMonth()+1}/${date.getFullYear()}`
  } else {
    return '-'
  }
}
