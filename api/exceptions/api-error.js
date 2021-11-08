/**
 * Represents an API error.
 * 
 * Contains status code for the response and error message.
 */
class ApiError extends Error {
    /**
     * HTTP Response Status Code.
     */
    status

    constructor(status, message) {
        super(message)
        this.status = status
    }

    static NotFound(message) {
        return new ApiError(404, message)
    }

    static TooManyRequests(message) {
        return new ApiError(429, message)
    }

    static InternalError(message) {
        return new ApiError(500, message)
    }
}

module.exports = ApiError
