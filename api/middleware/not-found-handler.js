const notFoundHandler = (req, res) => {
    return res.status(404).send('Requested resource not found')
}

module.exports = notFoundHandler
