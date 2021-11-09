/**
 * Formats string with number to USD currency representation.
 * 
 * @param {*} str Input string.
 * @returns Formatted string.
 */
export const toUSD = (str) => {
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
   })
   return formatter.format(str)
}

/**
 * Formats string with number to include commas between thousands.
 * 
 * @param {*} str Input string.
 * @returns Formatted string.
 */
export const toFormattedNumber = (str) => {
   return Number(str).toLocaleString('en-US')
}
