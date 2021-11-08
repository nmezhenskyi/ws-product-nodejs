const redisClient = require('../common/redis-client')
const ApiError = require('../exceptions/api-error')

const {
   WINDOW_SIZE,
   WINDOW_REQUEST_LIMIT
} = require('../common/constants')

/**
 * Middleware for rate-limiting routes by ip.
 */
const rateLimiter = async (req, res, next) => {
   try {
      if (!redisClient) {
         return next(ApiError.InternalError('Redis connection failed'))
      }

      const key = `${req.ip}:${(new Date).getMinutes()}`

      const [[, requestsCount]] = await redisClient
         .multi()
         .incr(key)
         .expire(key, WINDOW_SIZE)
         .exec()

      if (requestsCount > WINDOW_REQUEST_LIMIT) {
         return next(ApiError.TooManyRequests(
            'You have exceeded the allowed number of requests. Try again later.'
         ))
      }

      return next()
   }
   catch (err) {
      return next(err)
   }
}

module.exports = rateLimiter
