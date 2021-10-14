const errorHandler = (err, req, res, next) => {
   console.error(err)
   return res.status(500).json({ error: 'Internal error' })
}

module.exports = errorHandler
