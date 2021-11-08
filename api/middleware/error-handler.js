const ApiError = require('../exceptions/api-error')

/**
 * Error handling middleware for the whole API.
 */
const errorHandler = (err, req, res, next) => {
   console.error(err)

   if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message })
   }
   
   return res.status(500).json({ message: err.message })
}

module.exports = errorHandler
