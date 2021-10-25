const pg = require('pg')

const pool = new pg.Pool()

const queryHandler = (req, res, next) => {
    pool.query(req.sqlQuery).then((r) => {
        return res.json(r.rows || [])
    }).catch(next)
}

module.exports = queryHandler
