/**
 * Window size for requests in hours.
 */
const WINDOW_SIZE = 24
/**
 * Maximum number of requests allowed for each user in a single window.
 */
const MAX_WINDOW_REQUEST_COUNT = 10
/**
 * Interval between windows in hours.
 */
const WINDOW_LOG_INTERVAL = 1

module.exports = {
   WINDOW_SIZE,
   MAX_WINDOW_REQUEST_COUNT,
   WINDOW_LOG_INTERVAL
}
