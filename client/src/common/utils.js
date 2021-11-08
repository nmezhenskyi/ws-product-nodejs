/**
 * Converts user input string to valid regular expression.
 * 
 * @param {*} str Input string.
 * @returns Regular expression.
 */
export const escapeStringRegExp = (str) => {
   const specialChars = /[|\\{}()[\]^$+*?.]/g
   return str.replace(specialChars, '\\$&')
}
