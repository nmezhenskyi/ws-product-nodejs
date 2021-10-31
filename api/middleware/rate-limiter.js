const moment = require('moment')
const redisClient = require('../common/redis-client')

const {
   WINDOW_SIZE,
   MAX_WINDOW_REQUEST_COUNT,
   WINDOW_LOG_INTERVAL
} = require('../common/constants')

/**
 * Middleware for rate-limiting routes by ip.
 */
const rateLimiter = (req, res, next) => {
   try {
      if (!redisClient) throw new Error('Redis connection failed')

      // Fetch records of current user by IP address, returns null if no records are found:
      redisClient.get(req.ip, (err, record) => {
         if (err) throw err

         const currentRequestTime = moment()

         // No record for current user yet:
         if (!record) {
            let newRecord = []
            let requestLog = {
               requestTimeStamp: currentRequestTime.unix(),
               requestCount: 1
            }

            newRecord.push(requestLog)
            redisClient.set(req.ip, JSON.stringify(newRecord))

            return next()
         }

         // Record for current user has been found:
         let data = JSON.parse(record)
         let windowStartTimeStamp = moment()
            .subtract(WINDOW_SIZE, 'hours')
            .unix()

         let requestsWithinWindow = data.filter(entry => {
            return entry.requestTimeStamp > windowStartTimeStamp
         })

         let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
            return accumulator + entry.requestCount
         }, 0)

         // Reject the request if rate limit is reached
         if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
            return res.status(429).json({
               error: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE} hours limit.`
            })
         }
            
         let lastRequestLog = data[data.length - 1]
         let currentIntervalStart = currentRequestTime
            .subtract(WINDOW_LOG_INTERVAL, 'hours')
            .unix()

         if (lastRequestLog.requestTimeStamp > currentIntervalStart) {
            lastRequestLog.requestCount++
            data[data.length - 1] = lastRequestLog
         }
         else {
            data.push({
               requestTimeStamp: currentRequestTime.unix(),
               requestCount: 1
            })
         }

         redisClient.set(req.ip, JSON.stringify(data))
         return next()
      })
   }
   catch (err) {
      return next(err)
   }
}

module.exports = rateLimiter
