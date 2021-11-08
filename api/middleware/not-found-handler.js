const ApiError = require('../exceptions/api-error')

/**
 * Handles requests to nonexistent end-points.
 */
const notFoundHandler = (req, res, next) => {
    return next(ApiError.NotFound('Requested resource not found'))
}

module.exports = notFoundHandler
