/**
 * Convert date object to string format
 * @param {Date} date 
 */
export const dateToString = date => (new Date(parseInt(date))).toLocaleString()

/**
 * Convert timestamp of date to valid input type="date" format yyyy-MM-dd 
 * @param {Number} date 
 */
export const dateToForm = date => (new Date(parseInt(date))).toISOString().slice(0, -5)

/**
 * Convert string to date
 * @param {String} date string 
 */
export const stringToDate = (string) => {}