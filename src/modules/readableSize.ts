export default (size: number) => {
  const length = size.toString().length
  const round = (value: number, decimalPlaces: number) => {
    value = Math.round(Number(value + 'e' + decimalPlaces))
    return Number(value + 'e' + -decimalPlaces)
  }

  if (length < 4) return `${size} B`
  if (length >= 4 && length < 7) return `${round(size / 1000, 2)} KB`
  if (length >= 7 && length < 10) return `${round(size / 1000000, 2)} MB`
  if (length >= 10 && length < 13) return `${round(size / 1000000000, 2)} GB`
  if (length >= 13) return `${round(size / 1000000000000, 2)} TB`
}