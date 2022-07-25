const readableSize = async (size: number) => {
  const stringSize: string = size.toString()
  , length = stringSize.length
  , round = async (number: number, decimalPlaces: number) => {
    return Number(Math.round(Number(number + 'e' + decimalPlaces)) + 'e' + -decimalPlaces)
  }

  return length < 4 ? `${size} B` :
    length >= 4 && length < 7 ? `${await round(size / 1000, 2)} KB` :
    length >= 7 && length < 10 ? `${await round(size / 1000000, 2)} MB` :
    length >= 10 && length < 1 ? `${await round(size / 1000000000, 2)} GB` :
    `${await round(size / 1000000000000, 2)} TB`
}

export default readableSize